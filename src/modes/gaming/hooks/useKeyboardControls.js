import { useEffect, useState } from 'react'

const movementKeys = new Set([
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'w',
  'a',
  's',
  'd',
  'W',
  'A',
  'S',
  'D',
])

export function useKeyboardControls({ disabled = false, onEnter, onEscape } = {}) {
  const [pressedKeys, setPressedKeys] = useState(() => new Set())

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        onEnter?.()
        return
      }

      if (event.key === 'Escape') {
        onEscape?.()
        return
      }

      if (disabled || !movementKeys.has(event.key)) {
        return
      }

      event.preventDefault()
      setPressedKeys((keys) => {
        const nextKeys = new Set(keys)
        nextKeys.add(event.key.toLowerCase())
        return nextKeys
      })
    }

    const handleKeyUp = (event) => {
      if (!movementKeys.has(event.key)) {
        return
      }

      setPressedKeys((keys) => {
        const nextKeys = new Set(keys)
        nextKeys.delete(event.key.toLowerCase())
        return nextKeys
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [disabled, onEnter, onEscape])

  useEffect(() => {
    if (disabled) {
      const frameId = window.requestAnimationFrame(() => {
        setPressedKeys(new Set())
      })

      return () => window.cancelAnimationFrame(frameId)
    }

    return undefined
  }, [disabled])

  return pressedKeys
}
