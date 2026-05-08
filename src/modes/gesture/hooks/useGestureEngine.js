import { useCallback, useEffect, useRef, useState } from 'react'
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision'

const WASM_ASSET_PATH =
  'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm'
const HAND_LANDMARKER_MODEL =
  'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task'

export const GESTURE_TIMING = {
  pinchActivationMs: 220,
  pinchCooldownMs: 500,
  palmHoldMs: 900,
  palmHoldCooldownMs: 1000,
  scrollActivationMs: 200,
  scrollDeadzone: 0.0025,
  scrollMaxDeltaPerFrame: 34,
  scrollScale: 1150,
  swipeCooldownMs: 700,
  swipeMaxVerticalDelta: 0.12,
  swipeMinHorizontalDelta: 0.24,
  swipeWindowMs: 560,
}

const PINCH_START_DISTANCE = 0.048
const PINCH_RELEASE_DISTANCE = 0.085
const POINTER_HIDE_GRACE_MS = 350
const POINTER_SMOOTHING = 0.22
const POINTER_DEADZONE_PX = 1.5
const SCROLL_SMOOTHING = 0.34
const STEADY_PALM_THRESHOLD = 0.065

const initialState = {
  cameraStatus: 'off',
  confidence: 0,
  cooldownActive: false,
  cursorPosition: null,
  currentGesture: 'None',
  errorMessage: '',
  fallbackReason: '',
  gestureMode: 'fallback',
  handDetected: false,
  handLandmarks: null,
  isFallback: true,
  isRunning: false,
  mode: 'fallback',
  modelStatus: 'idle',
  palmHoldProgress: 0,
  pinchState: 'idle',
  pointerActive: false,
  pointerPosition: null,
  pointerState: 'hidden',
  rawGesture: 'None',
  scrollActive: false,
  scrollDelta: 0,
}

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)
const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y)

const getPalmCenter = (landmarks) => {
  const palmPoints = [landmarks[0], landmarks[5], landmarks[9], landmarks[13], landmarks[17]]
  const total = palmPoints.reduce(
    (sum, point) => ({
      x: sum.x + point.x,
      y: sum.y + point.y,
    }),
    { x: 0, y: 0 },
  )

  return {
    x: total.x / palmPoints.length,
    y: total.y / palmPoints.length,
  }
}

const getFingerState = (landmarks) => {
  const indexExtended = landmarks[8].y < landmarks[6].y - 0.025
  const middleExtended = landmarks[12].y < landmarks[10].y - 0.025
  const ringExtended = landmarks[16].y < landmarks[14].y - 0.025
  const pinkyExtended = landmarks[20].y < landmarks[18].y - 0.025
  const thumbOpen = distance(landmarks[4], landmarks[17]) > 0.22
  const extendedCount = [
    indexExtended,
    middleExtended,
    ringExtended,
    pinkyExtended,
    thumbOpen,
  ].filter(Boolean).length

  return {
    extendedCount,
    indexExtended,
    middleExtended,
    pinkyExtended,
    ringExtended,
    thumbOpen,
  }
}

const getHandShape = (landmarks) => {
  const fingers = getFingerState(landmarks)
  const pinchDistance = distance(landmarks[4], landmarks[8])

  return {
    fingers,
    isOpenPalm: fingers.extendedCount >= 4,
    isPoint:
      fingers.indexExtended &&
      !fingers.middleExtended &&
      !fingers.ringExtended &&
      !fingers.pinkyExtended,
    isTwoFingerScroll:
      fingers.indexExtended &&
      fingers.middleExtended &&
      !fingers.ringExtended &&
      !fingers.pinkyExtended,
    pinchDistance,
    pinchConfidence: Math.max(0.72, 1 - pinchDistance / PINCH_START_DISTANCE),
  }
}

export function useGestureEngine({ interactionState = 'fallback', onGesture } = {}) {
  const videoElementRef = useRef(null)
  const streamRef = useRef(null)
  const animationFrameRef = useRef(null)
  const detectionLoopRef = useRef(null)
  const handLandmarkerRef = useRef(null)
  const interactionStateRef = useRef(interactionState)
  const onGestureRef = useRef(onGesture)
  const palmHistoryRef = useRef([])
  const pointerPositionRef = useRef(null)
  const runningRef = useRef(false)
  const timersRef = useRef({
    palmHoldCooldownUntil: 0,
    palmHoldStart: null,
    pinchConfirmed: false,
    pinchCooldownUntil: 0,
    pinchStart: null,
    scrollStart: null,
    swipeCooldownUntil: 0,
  })
  const [engineState, setEngineState] = useState(initialState)

  useEffect(() => {
    onGestureRef.current = onGesture
  }, [onGesture])

  useEffect(() => {
    interactionStateRef.current = interactionState
  }, [interactionState])

  const attachVideoRef = useCallback((element) => {
    videoElementRef.current = element

    if (element && streamRef.current) {
      element.srcObject = streamRef.current
    }
  }, [])

  const setFallbackMode = useCallback((fallbackReason, errorMessage = '') => {
    setEngineState({
      ...initialState,
      cameraStatus: 'off',
      currentGesture: 'Fallback Ready',
      errorMessage,
      fallbackReason,
      gestureMode: 'fallback',
      isFallback: true,
      isRunning: true,
      mode: 'fallback',
      modelStatus: 'fallback',
      rawGesture: 'Fallback Ready',
    })
  }, [])

  const setCooldown = useCallback((durationMs) => {
    setEngineState((state) => ({
      ...state,
      cooldownActive: true,
      pointerState: state.pointerActive ? 'cooldown' : state.pointerState,
    }))

    window.setTimeout(() => {
      setEngineState((state) => ({
        ...state,
        cooldownActive: false,
        pointerState: state.pointerActive ? 'tracking' : 'hidden',
      }))
    }, durationMs)
  }, [])

  const emitGesture = useCallback((gesture, payload = {}) => {
    const now = performance.now()
    const defaultCooldown =
      gesture === 'Open Palm Hold'
        ? {
            key: 'palmHoldCooldownUntil',
            ms: GESTURE_TIMING.palmHoldCooldownMs,
          }
        : gesture.startsWith('Open Palm Swipe')
          ? {
              key: 'swipeCooldownUntil',
              ms: GESTURE_TIMING.swipeCooldownMs,
            }
          : {
              key: 'pinchCooldownUntil',
              ms: GESTURE_TIMING.pinchCooldownMs,
            }
    const cooldownKey = payload.cooldownKey ?? defaultCooldown.key
    const cooldownMs = payload.cooldownMs ?? defaultCooldown.ms
    const cooldownUntil = timersRef.current[cooldownKey] ?? 0

    if (now < cooldownUntil) {
      setEngineState((state) => ({
        ...state,
        cooldownActive: true,
      }))
      return false
    }

    timersRef.current[cooldownKey] = now + cooldownMs
    setCooldown(cooldownMs)
    setEngineState((state) => ({
      ...state,
      confidence: payload.confidence ?? (state.mode === 'gesture' ? 0.88 : 0.78),
      currentGesture: gesture,
      rawGesture: gesture,
    }))
    onGestureRef.current?.(gesture, payload)
    return true
  }, [setCooldown])

  const closeHandLandmarker = useCallback(() => {
    handLandmarkerRef.current?.close?.()
    handLandmarkerRef.current = null
  }, [])

  const scheduleDetectionFrame = useCallback(() => {
    animationFrameRef.current = window.requestAnimationFrame(() => {
      detectionLoopRef.current?.()
    })
  }, [])

  const stopCamera = useCallback(() => {
    runningRef.current = false

    if (animationFrameRef.current) {
      window.cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null

    if (videoElementRef.current) {
      videoElementRef.current.srcObject = null
    }
  }, [])

  const resetGestureRefs = useCallback(() => {
    palmHistoryRef.current = []
    pointerPositionRef.current = null
    timersRef.current = {
      palmHoldCooldownUntil: 0,
      palmHoldStart: null,
      pinchConfirmed: false,
      pinchCooldownUntil: 0,
      pinchStart: null,
      scrollStart: null,
      swipeCooldownUntil: 0,
    }
  }, [])

  const stopGestureMode = useCallback(() => {
    stopCamera()
    closeHandLandmarker()
    resetGestureRefs()
    setEngineState(initialState)
  }, [closeHandLandmarker, resetGestureRefs, stopCamera])

  useEffect(() => {
    return () => {
      stopCamera()
      closeHandLandmarker()
    }
  }, [closeHandLandmarker, stopCamera])

  const initializeHandLandmarker = useCallback(async () => {
    if (handLandmarkerRef.current) {
      return handLandmarkerRef.current
    }

    setEngineState((state) => ({
      ...state,
      modelStatus: 'loading',
    }))

    const vision = await FilesetResolver.forVisionTasks(WASM_ASSET_PATH)
    const handLandmarker = await HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        delegate: 'GPU',
        modelAssetPath: HAND_LANDMARKER_MODEL,
      },
      minHandDetectionConfidence: 0.55,
      minHandPresenceConfidence: 0.55,
      minTrackingConfidence: 0.5,
      numHands: 1,
      runningMode: 'VIDEO',
    })

    handLandmarkerRef.current = handLandmarker
    setEngineState((state) => ({
      ...state,
      modelStatus: 'ready',
    }))
    return handLandmarker
  }, [])

  const updatePointer = useCallback((landmarks, pointerState = 'tracking') => {
    // The video preview is mirrored in CSS to feel like a selfie camera.
    // MediaPipe returns coordinates from the original, unmirrored video frame,
    // so x is inverted before mapping to viewport pixels. That keeps hand,
    // pointer, and swipe direction aligned: user moves right, pointer moves right.
    const pointerSource = landmarks[8] ?? getPalmCenter(landmarks)
    const viewportX = clamp((1 - pointerSource.x) * window.innerWidth, 0, window.innerWidth)
    const viewportY = clamp(pointerSource.y * window.innerHeight, 0, window.innerHeight)
    const previous = pointerPositionRef.current ?? { x: viewportX, y: viewportY }
    const rawDeltaX = viewportX - previous.x
    const rawDeltaY = viewportY - previous.y
    const rawDistance = Math.hypot(rawDeltaX, rawDeltaY)
    const nextPointer =
      rawDistance < POINTER_DEADZONE_PX
        ? previous
        : {
            x: previous.x + rawDeltaX * POINTER_SMOOTHING,
            y: previous.y + rawDeltaY * POINTER_SMOOTHING,
          }

    pointerPositionRef.current = nextPointer
    return {
      pointerPosition: nextPointer,
      pointerState,
    }
  }, [])

  const resetPinch = () => {
    timersRef.current.pinchStart = null
    timersRef.current.pinchConfirmed = false
  }

  const resetScroll = () => {
    timersRef.current.scrollStart = null
  }

  const resetPalmHold = () => {
    timersRef.current.palmHoldStart = null
  }

  const processLandmarks = useCallback((landmarks) => {
    const now = performance.now()
    const palmCenter = getPalmCenter(landmarks)
    const handShape = getHandShape(landmarks)
    const stateMode = interactionStateRef.current
    const commandPanelOpen = stateMode === 'commandPanel'
    const modalOpen = stateMode === 'modalOpen'
    const fallbackState = stateMode === 'fallback'
    const canNavigateSections = !commandPanelOpen && !modalOpen && !fallbackState
    const pinchConfirmed = timersRef.current.pinchConfirmed
    const pinchCandidate =
      (pinchConfirmed || !handShape.isTwoFingerScroll) &&
      (pinchConfirmed
        ? handShape.pinchDistance < PINCH_RELEASE_DISTANCE
        : handShape.pinchDistance < PINCH_START_DISTANCE)
    const pointerSnapshot = updatePointer(landmarks, 'tracking')

    const palmPoint = {
      // Mirror-corrected palm coordinates are used for swipe and scroll too.
      // This keeps physical left/right/up/down movement consistent with the UI.
      time: now,
      x: 1 - palmCenter.x,
      y: palmCenter.y,
    }

    palmHistoryRef.current = [
      ...palmHistoryRef.current.filter(
        (item) => now - item.time <= GESTURE_TIMING.swipeWindowMs,
      ),
      palmPoint,
    ]

    const oldestPalm = palmHistoryRef.current[0] ?? palmPoint
    const deltaX = palmPoint.x - oldestPalm.x
    const deltaY = palmPoint.y - oldestPalm.y
    const duration = now - oldestPalm.time
    let rawGesture = 'Point'
    let confidence = handShape.isPoint ? 0.84 : 0.62
    let palmHoldProgress = 0
    let pinchState = 'idle'
    let pointerState = pointerSnapshot.pointerState
    let scrollActive = false
    let scrollDelta = 0

    if (pinchCandidate) {
      confidence = handShape.pinchConfidence
      resetScroll()
      resetPalmHold()

      if (!timersRef.current.pinchStart) {
        timersRef.current.pinchStart = now
      }

      const pinchReady =
        now - timersRef.current.pinchStart >= GESTURE_TIMING.pinchActivationMs
      const pinchCooling = now < timersRef.current.pinchCooldownUntil

      pinchState = timersRef.current.pinchConfirmed
        ? 'confirmed'
        : pinchCooling
          ? 'cooldown'
          : 'pending'
      rawGesture = pinchState === 'pending' ? 'Pinch Pending' : 'Pinch'
      pointerState = pinchState === 'pending' ? 'pinch-pending' : 'pinch'

      if (pinchReady && !pinchCooling && !timersRef.current.pinchConfirmed) {
        emitGesture('Pinch', {
          confidence,
          cooldownKey: 'pinchCooldownUntil',
          cooldownMs: GESTURE_TIMING.pinchCooldownMs,
          source: 'mediapipe',
        })
        timersRef.current.pinchConfirmed = true
        pinchState = 'confirmed'
        rawGesture = 'Pinch'
      }
    } else if (handShape.isTwoFingerScroll && !commandPanelOpen && !modalOpen) {
      rawGesture = 'Two-Finger Scroll'
      confidence = 0.84
      resetPinch()
      resetPalmHold()

      if (!timersRef.current.scrollStart) {
        timersRef.current.scrollStart = {
          lastX: palmPoint.x,
          lastY: palmPoint.y,
          smoothedDelta: 0,
          time: now,
          wasActive: false,
        }
      }

      const scrollState = timersRef.current.scrollStart
      const verticalDelta = palmPoint.y - scrollState.lastY
      const horizontalDelta = palmPoint.x - scrollState.lastX
      const verticalDominant =
        Math.abs(verticalDelta) > Math.abs(horizontalDelta) * 1.15 ||
        Math.abs(horizontalDelta) < 0.006
      scrollState.smoothedDelta =
        scrollState.smoothedDelta * (1 - SCROLL_SMOOTHING) +
        verticalDelta * SCROLL_SMOOTHING
      scrollState.lastX = palmPoint.x
      scrollState.lastY = palmPoint.y

      scrollActive = now - scrollState.time >= GESTURE_TIMING.scrollActivationMs
      scrollState.wasActive = scrollActive

      if (
        scrollActive &&
        verticalDominant &&
        Math.abs(scrollState.smoothedDelta) >= GESTURE_TIMING.scrollDeadzone
      ) {
        scrollDelta = clamp(
          scrollState.smoothedDelta * GESTURE_TIMING.scrollScale,
          -GESTURE_TIMING.scrollMaxDeltaPerFrame,
          GESTURE_TIMING.scrollMaxDeltaPerFrame,
        )
        onGestureRef.current?.('Two-Finger Scroll', {
          confidence,
          deltaY: scrollDelta,
          source: 'mediapipe',
        })
      }
    } else if (handShape.isOpenPalm) {
      rawGesture = 'Open Palm'
      confidence = 0.88
      resetPinch()
      resetScroll()

      const recentPalm = palmHistoryRef.current.filter((item) => now - item.time <= 260)
      const firstRecentPalm = recentPalm[0] ?? palmPoint
      const steadyDistance = Math.hypot(
        palmPoint.x - firstRecentPalm.x,
        palmPoint.y - firstRecentPalm.y,
      )
      const isSteadyPalm = steadyDistance < STEADY_PALM_THRESHOLD
      const palmHoldCooling = now < timersRef.current.palmHoldCooldownUntil

      if (isSteadyPalm && !palmHoldCooling) {
        if (!timersRef.current.palmHoldStart) {
          timersRef.current.palmHoldStart = now
        }

        palmHoldProgress = clamp(
          (now - timersRef.current.palmHoldStart) / GESTURE_TIMING.palmHoldMs,
          0,
          1,
        )

        if (palmHoldProgress >= 1) {
          rawGesture = 'Open Palm Hold'
          emitGesture('Open Palm Hold', {
            confidence,
            cooldownKey: 'palmHoldCooldownUntil',
            cooldownMs: GESTURE_TIMING.palmHoldCooldownMs,
            source: 'mediapipe',
          })
          timersRef.current.palmHoldCooldownUntil =
            now + GESTURE_TIMING.palmHoldCooldownMs
          resetPalmHold()
          palmHoldProgress = 0
        }
      } else {
        resetPalmHold()
      }

      const canSwipe =
        canNavigateSections &&
        palmHoldProgress === 0 &&
        duration >= 150 &&
        duration <= GESTURE_TIMING.swipeWindowMs &&
        Math.abs(deltaX) >= GESTURE_TIMING.swipeMinHorizontalDelta &&
        Math.abs(deltaY) <= GESTURE_TIMING.swipeMaxVerticalDelta &&
        Math.abs(deltaX) > Math.abs(deltaY) * 2 &&
        now >= timersRef.current.swipeCooldownUntil

      if (canSwipe) {
        const swipeGesture = deltaX > 0 ? 'Open Palm Swipe Right' : 'Open Palm Swipe Left'
        rawGesture = swipeGesture
        confidence = Math.min(0.96, 0.72 + Math.abs(deltaX))
        emitGesture(swipeGesture, {
          confidence,
          cooldownKey: 'swipeCooldownUntil',
          cooldownMs: GESTURE_TIMING.swipeCooldownMs,
          source: 'mediapipe',
        })
        timersRef.current.swipeCooldownUntil = now + GESTURE_TIMING.swipeCooldownMs
        palmHistoryRef.current = []
      }
    } else {
      resetPinch()
      resetScroll()
      resetPalmHold()
      rawGesture = handShape.isPoint ? 'Point' : 'No Command Gesture'
    }

    setEngineState((state) => ({
      ...state,
      confidence,
      cursorPosition: pointerSnapshot.pointerPosition,
      gestureMode: stateMode,
      handDetected: true,
      handLandmarks: landmarks,
      palmHoldProgress,
      pinchState,
      pointerActive: true,
      pointerPosition: pointerSnapshot.pointerPosition,
      pointerState: state.cooldownActive ? 'cooldown' : pointerState,
      rawGesture,
      scrollActive,
      scrollDelta,
      currentGesture: rawGesture,
    }))
  }, [emitGesture, updatePointer])

  const detectionLoop = useCallback(() => {
    if (!runningRef.current) {
      return
    }

    const video = videoElementRef.current
    const handLandmarker = handLandmarkerRef.current

    if (!video || !handLandmarker || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
      scheduleDetectionFrame()
      return
    }

    try {
      const result = handLandmarker.detectForVideo(video, performance.now())
      const landmarks = result.landmarks?.[0]

      if (landmarks) {
        processLandmarks(landmarks)
      } else {
        const lastPointer = pointerPositionRef.current
        resetGestureRefs()
        setEngineState((state) => ({
          ...state,
          confidence: 0,
          cursorPosition: lastPointer,
          handDetected: false,
          handLandmarks: null,
          palmHoldProgress: 0,
          pinchState: 'idle',
          pointerActive:
            Boolean(lastPointer) &&
            state.pointerActive &&
            state.rawGesture !== 'No Hand',
          pointerPosition: lastPointer,
          pointerState: lastPointer ? 'tracking' : 'hidden',
          rawGesture: 'No Hand',
          scrollActive: false,
          scrollDelta: 0,
          currentGesture: 'No Hand',
        }))
        window.setTimeout(() => {
          setEngineState((state) => {
            if (state.handDetected || state.rawGesture !== 'No Hand') {
              return state
            }

            pointerPositionRef.current = null
            return {
              ...state,
              cursorPosition: null,
              pointerActive: false,
              pointerPosition: null,
              pointerState: 'hidden',
            }
          })
        }, POINTER_HIDE_GRACE_MS)
      }
    } catch {
      setFallbackMode(
        'Hand tracking stopped unexpectedly.',
        'Gesture detection is unavailable. You can still explore using mouse, keyboard, or touch.',
      )
      stopCamera()
      closeHandLandmarker()
      return
    }

    scheduleDetectionFrame()
  }, [
    closeHandLandmarker,
    processLandmarks,
    resetGestureRefs,
    scheduleDetectionFrame,
    setFallbackMode,
    stopCamera,
  ])

  useEffect(() => {
    detectionLoopRef.current = detectionLoop
  }, [detectionLoop])

  const startGestureMode = useCallback(async ({ cameraEnabled }) => {
    resetGestureRefs()

    if (!cameraEnabled) {
      stopCamera()
      closeHandLandmarker()
      setFallbackMode('Camera skipped by visitor.')
      return { ok: true, mode: 'fallback' }
    }

    setEngineState((state) => ({
      ...state,
      cameraStatus: 'starting',
      currentGesture: 'Initializing',
      errorMessage: '',
      fallbackReason: '',
      gestureMode: 'exploration',
      isFallback: false,
      isRunning: true,
      mode: 'gesture',
      modelStatus: 'loading',
      rawGesture: 'Initializing',
    }))

    if (!navigator.mediaDevices?.getUserMedia) {
      setFallbackMode(
        'This browser does not expose camera access.',
        'Gesture detection is unavailable. You can still explore using mouse, keyboard, or touch.',
      )
      return { ok: false, mode: 'fallback' }
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 960 },
          height: { ideal: 540 },
        },
        audio: false,
      })

      streamRef.current = stream
      if (videoElementRef.current) {
        videoElementRef.current.srcObject = stream
      }

      setEngineState((state) => ({
        ...state,
        cameraStatus: 'active',
        currentGesture: 'Loading hand tracking model',
        rawGesture: 'Loading model',
      }))

      const handLandmarker = await initializeHandLandmarker()
      handLandmarkerRef.current = handLandmarker
      runningRef.current = true
      setEngineState((state) => ({
        ...state,
        cameraStatus: 'active',
        confidence: 0,
        currentGesture: 'Show your hand clearly inside the camera frame.',
        errorMessage: '',
        fallbackReason: '',
        gestureMode: 'exploration',
        handDetected: false,
        isFallback: false,
        isRunning: true,
        mode: 'gesture',
        modelStatus: 'ready',
        rawGesture: 'Waiting for hand',
      }))

      scheduleDetectionFrame()
      return { ok: true, mode: 'gesture' }
    } catch {
      stopCamera()
      closeHandLandmarker()
      setFallbackMode(
        'Camera permission was denied, the model failed to load, or no camera was found.',
        'Gesture detection is unavailable. You can still explore using mouse, keyboard, or touch.',
      )
      return { ok: false, mode: 'fallback' }
    }
  }, [
    closeHandLandmarker,
    initializeHandLandmarker,
    resetGestureRefs,
    scheduleDetectionFrame,
    setFallbackMode,
    stopCamera,
  ])

  return {
    ...engineState,
    error: engineState.errorMessage,
    emitGesture,
    isCameraActive: engineState.cameraStatus === 'active',
    isCooldownActive: engineState.cooldownActive,
    isHandDetected: engineState.handDetected,
    startGestureMode,
    stopGestureMode,
    videoRef: attachVideoRef,
  }
}
