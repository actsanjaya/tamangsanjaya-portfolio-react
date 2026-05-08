export function GesturePointer({
  isHovering,
  palmHoldProgress = 0,
  pointerActive,
  pointerPosition,
  pointerState,
}) {
  if (!pointerActive || !pointerPosition) {
    return null
  }

  const progressDegrees = Math.round(palmHoldProgress * 360)

  return (
    <div
      aria-hidden="true"
      className={`gesturePointer gesturePointer-${pointerState} ${
        isHovering ? 'isHovering' : ''
      }`}
      style={{
        '--hold-progress': `${progressDegrees}deg`,
        transform: `translate3d(${pointerPosition.x}px, ${pointerPosition.y}px, 0)`,
      }}
    >
      <span className="gesturePointerRing"></span>
      <span className="gesturePointerDot"></span>
    </div>
  )
}
