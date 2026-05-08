import { useState } from 'react'

export function GestureStatusHUD({
  cameraStatus,
  confidence,
  cooldownActive,
  currentGesture,
  handDetected,
  isFallback,
  onExit,
  palmHoldProgress,
  pinchState,
  pointerActive,
  pointerPosition,
  rawGesture,
  scrollActive,
  scrollDelta,
}) {
  const [showDebug, setShowDebug] = useState(false)

  return (
    <aside className="gestureStatusHUD" aria-label="Gesture mode status">
      <div>
        <span>Camera</span>
        <strong>{cameraStatus === 'active' ? 'Active' : 'Off'}</strong>
      </div>
      <div>
        <span>Hand</span>
        <strong>{handDetected ? 'Detected' : 'Not Detected'}</strong>
      </div>
      <div>
        <span>Gesture</span>
        <strong>{currentGesture}</strong>
      </div>
      <div>
        <span>Confidence</span>
        <strong>{Math.round(confidence * 100)}%</strong>
      </div>
      <div>
        <span>Mode</span>
        <strong>{isFallback ? 'Fallback' : 'Gesture'}</strong>
      </div>
      <div>
        <span>Pointer</span>
        <strong>{pointerActive ? 'Active' : 'Hidden'}</strong>
      </div>
      <div>
        <span>Cooldown</span>
        <strong>{cooldownActive ? 'Active' : 'Ready'}</strong>
      </div>
      <div>
        <span>Scroll</span>
        <strong>{scrollActive ? 'Active' : 'Off'}</strong>
      </div>
      <div>
        <span>Pinch</span>
        <strong>{pinchState}</strong>
      </div>
      <div>
        <span>Palm Hold</span>
        <strong>{Math.round(palmHoldProgress * 100)}%</strong>
      </div>
      {showDebug ? (
        <div className="gestureDebugPanel">
          <span>Debug</span>
          <small>Raw: {rawGesture}</small>
          <small>Cooldown: {cooldownActive ? 'Active' : 'Ready'}</small>
          <small>Scroll: {scrollActive ? `${Math.round(scrollDelta)}px` : 'off'}</small>
          <small>Pinch: {pinchState}</small>
          <small>Hand: {handDetected ? 'true' : 'false'}</small>
          <small>Confidence: {Math.round(confidence * 100)}%</small>
          <small>
            Pointer:{' '}
            {pointerPosition
              ? `${Math.round(pointerPosition.x)}, ${Math.round(pointerPosition.y)}`
              : 'hidden'}
          </small>
        </div>
      ) : null}
      <button
        className="gestureTinyButton"
        onClick={() => setShowDebug((value) => !value)}
        type="button"
      >
        {showDebug ? 'Hide Debug' : 'Debug'}
      </button>
      <button className="gestureTinyButton" onClick={onExit} type="button">
        Exit Gesture Mode
      </button>
    </aside>
  )
}
