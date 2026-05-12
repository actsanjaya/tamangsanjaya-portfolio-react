import { useCallback, useEffect, useRef, useState } from 'react'
import { CinematicScene } from './components/CinematicScene.jsx'
import { immersiveScenes } from './immersiveData.js'
import './immersiveMode.css'

const TRANSITION_LOCK_MS = 920
const WHEEL_DEADZONE = 28
const TOUCH_DEADZONE = 58

const clampSceneIndex = (index) =>
  Math.max(0, Math.min(index, immersiveScenes.length - 1))

const isInteractiveTarget = (target) => {
  const element = target instanceof HTMLElement ? target : null
  if (!element) return false

  return Boolean(
    element.closest(
      'a, button, input, textarea, select, summary, [contenteditable="true"]',
    ),
  )
}

export function ImmersiveMode({ onNavigate }) {
  const viewportRef = useRef(null)
  const activeSceneRef = useRef(0)
  const isTransitioningRef = useRef(false)
  const transitionTimeoutRef = useRef(null)
  const touchStartRef = useRef(null)
  const [activeScene, setActiveScene] = useState(0)

  const releaseTransitionLock = useCallback(() => {
    if (transitionTimeoutRef.current) {
      window.clearTimeout(transitionTimeoutRef.current)
    }

    transitionTimeoutRef.current = window.setTimeout(() => {
      isTransitioningRef.current = false
      transitionTimeoutRef.current = null
    }, TRANSITION_LOCK_MS)
  }, [])

  const goToScene = useCallback(
    (nextIndex) => {
      const clampedIndex = clampSceneIndex(nextIndex)

      if (
        clampedIndex === activeSceneRef.current ||
        isTransitioningRef.current
      ) {
        return
      }

      isTransitioningRef.current = true
      activeSceneRef.current = clampedIndex
      setActiveScene(clampedIndex)
      releaseTransitionLock()
    },
    [releaseTransitionLock],
  )

  useEffect(() => {
    activeSceneRef.current = activeScene
  }, [activeScene])

  useEffect(
    () => () => {
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current)
      }
    },
    [],
  )

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return undefined

    const handleWheel = (event) => {
      event.preventDefault()

      if (
        Math.abs(event.deltaY) < WHEEL_DEADZONE ||
        isTransitioningRef.current
      ) {
        return
      }

      goToScene(activeSceneRef.current + (event.deltaY > 0 ? 1 : -1))
    }

    viewport.addEventListener('wheel', handleWheel, { passive: false })
    return () => viewport.removeEventListener('wheel', handleWheel)
  }, [goToScene])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        return
      }

      if (event.key === 'Escape') {
        event.preventDefault()
        onNavigate('/default')
        return
      }

      if (isInteractiveTarget(event.target)) {
        return
      }

      if (
        event.key === 'ArrowDown' ||
        event.key === 'PageDown' ||
        event.key === ' '
      ) {
        event.preventDefault()
        goToScene(activeSceneRef.current + 1)
        return
      }

      if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault()
        goToScene(activeSceneRef.current - 1)
        return
      }

      if (event.key === 'Home') {
        event.preventDefault()
        goToScene(0)
        return
      }

      if (event.key === 'End') {
        event.preventDefault()
        goToScene(immersiveScenes.length - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToScene, onNavigate])

  const handleTouchStart = (event) => {
    const touch = event.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchEnd = (event) => {
    if (!touchStartRef.current || isTransitioningRef.current) return

    const touch = event.changedTouches[0]
    const deltaY = touchStartRef.current.y - touch.clientY
    const deltaX = touchStartRef.current.x - touch.clientX
    touchStartRef.current = null

    if (
      Math.abs(deltaY) < TOUCH_DEADZONE ||
      Math.abs(deltaY) < Math.abs(deltaX) * 1.2
    ) {
      return
    }

    goToScene(activeSceneRef.current + (deltaY > 0 ? 1 : -1))
  }

  return (
    <main className="immersiveMode">
      <div
        aria-label="Immersive cinematic portfolio scenes"
        className="cinematicViewport"
        onTouchEnd={handleTouchEnd}
        onTouchStart={handleTouchStart}
        ref={viewportRef}
      >
        {immersiveScenes.map((scene, index) => (
          <CinematicScene
            isActive={activeScene === index}
            key={scene.id}
            onNavigate={onNavigate}
            scene={scene}
          />
        ))}

        <div className="cinematicHint" aria-hidden="true">
          <span>Scroll to continue</span>
        </div>
      </div>
    </main>
  )
}
