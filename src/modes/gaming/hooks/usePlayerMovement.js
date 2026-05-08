import { useEffect, useRef, useState } from 'react'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export function usePlayerMovement({
  bounds,
  disabled = false,
  initialPosition,
  pressedKeys,
  speed,
}) {
  const [direction, setDirection] = useState('down')
  const [isMoving, setIsMoving] = useState(false)
  const [playerPosition, setPlayerPosition] = useState(initialPosition)
  const animationFrameRef = useRef(null)
  const lastFrameTimeRef = useRef(null)
  const positionRef = useRef(initialPosition)

  useEffect(() => {
    positionRef.current = playerPosition
  }, [playerPosition])

  useEffect(() => {
    if (disabled) {
      const frameId = window.requestAnimationFrame(() => {
        setIsMoving(false)
      })
      lastFrameTimeRef.current = null
      return () => window.cancelAnimationFrame(frameId)
    }

    const tick = (timestamp) => {
      const lastFrameTime = lastFrameTimeRef.current ?? timestamp
      const deltaSeconds = Math.min((timestamp - lastFrameTime) / 1000, 0.05)
      lastFrameTimeRef.current = timestamp

      let dx = 0
      let dy = 0

      if (pressedKeys.has('arrowup') || pressedKeys.has('w')) dy -= 1
      if (pressedKeys.has('arrowdown') || pressedKeys.has('s')) dy += 1
      if (pressedKeys.has('arrowleft') || pressedKeys.has('a')) dx -= 1
      if (pressedKeys.has('arrowright') || pressedKeys.has('d')) dx += 1

      if (dx !== 0 || dy !== 0) {
        const length = Math.hypot(dx, dy)
        const normalizedX = dx / length
        const normalizedY = dy / length
        const nextPosition = {
          x: clamp(
            positionRef.current.x + normalizedX * speed * deltaSeconds,
            36,
            bounds.width - 36,
          ),
          y: clamp(
            positionRef.current.y + normalizedY * speed * deltaSeconds,
            42,
            bounds.height - 42,
          ),
        }

        positionRef.current = nextPosition
        setPlayerPosition(nextPosition)
        setIsMoving(true)

        if (Math.abs(normalizedX) > Math.abs(normalizedY)) {
          setDirection(normalizedX > 0 ? 'right' : 'left')
        } else {
          setDirection(normalizedY > 0 ? 'down' : 'up')
        }
      } else {
        setIsMoving(false)
      }

      animationFrameRef.current = window.requestAnimationFrame(tick)
    }

    animationFrameRef.current = window.requestAnimationFrame(tick)

    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current)
      }
      lastFrameTimeRef.current = null
    }
  }, [bounds.height, bounds.width, disabled, pressedKeys, speed])

  const moveBy = (dx, dy) => {
    const nextPosition = {
      x: clamp(positionRef.current.x + dx, 36, bounds.width - 36),
      y: clamp(positionRef.current.y + dy, 42, bounds.height - 42),
    }

    positionRef.current = nextPosition
    setPlayerPosition(nextPosition)

    if (Math.abs(dx) > Math.abs(dy)) {
      setDirection(dx > 0 ? 'right' : 'left')
    } else if (dy !== 0) {
      setDirection(dy > 0 ? 'down' : 'up')
    }
  }

  return {
    direction,
    isMoving,
    moveBy,
    playerPosition,
  }
}
