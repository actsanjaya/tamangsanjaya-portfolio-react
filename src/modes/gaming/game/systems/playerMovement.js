export const getMovementVector = ({ cursors, inputState, keys }) => {
  const vector = { x: 0, y: 0 }
  const isLeftPressed = inputState?.left || cursors?.left?.isDown || keys?.left?.isDown
  const isRightPressed =
    inputState?.right || cursors?.right?.isDown || keys?.right?.isDown
  const isUpPressed = inputState?.up || cursors?.up?.isDown || keys?.up?.isDown
  const isDownPressed =
    inputState?.down || cursors?.down?.isDown || keys?.down?.isDown

  if (isLeftPressed) vector.x -= 1
  if (isRightPressed) vector.x += 1
  if (isUpPressed) vector.y -= 1
  if (isDownPressed) vector.y += 1

  const length = Math.hypot(vector.x, vector.y)
  if (length > 0) {
    vector.x /= length
    vector.y /= length
  }

  return vector
}

export const getDirectionFromVector = (vector, fallback = 'down') => {
  if (Math.abs(vector.x) > Math.abs(vector.y)) {
    return vector.x > 0 ? 'right' : 'left'
  }

  if (vector.y !== 0) {
    return vector.y > 0 ? 'down' : 'up'
  }

  return fallback
}

export const clampPosition = ({ bounds, position }) => ({
  x: Math.max(36, Math.min(bounds.width - 36, position.x)),
  y: Math.max(36, Math.min(bounds.height - 36, position.y)),
})
