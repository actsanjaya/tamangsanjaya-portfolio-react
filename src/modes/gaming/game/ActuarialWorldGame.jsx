import { useEffect, useId, useRef, useState } from 'react'
import { createGameConfig } from './createGameConfig.js'

const createInputState = () => ({
  down: false,
  enter: false,
  left: false,
  right: false,
  up: false,
})

const keyToInput = {
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowUp: 'up',
  Enter: 'enter',
  KeyA: 'left',
  KeyD: 'right',
  KeyS: 'down',
  KeyW: 'up',
}

const isEditableTarget = (target) => {
  const element = target instanceof HTMLElement ? target : null
  if (!element) return false

  return Boolean(
    element.closest('input, textarea, select, [contenteditable="true"]'),
  )
}

export function ActuarialWorldGame({ isPanelOpen, onZoneActivate, onZoneFocus }) {
  const containerRef = useRef(null)
  const gameRef = useRef(null)
  const inputStateRef = useRef(createInputState())
  const containerId = useId().replaceAll(':', '-')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!containerRef.current) return undefined

    const game = createGameConfig({
      callbacks: {
        onZoneActivate,
        onZoneFocus,
      },
      parent: containerId,
    }).create()

    gameRef.current = game
    game.registry.set('inputState', inputStateRef.current)
    setIsLoading(false)

    return () => {
      game.destroy(true)
      gameRef.current = null
    }
  }, [containerId, onZoneActivate, onZoneFocus])

  useEffect(() => {
    gameRef.current?.registry.set('panelOpen', isPanelOpen)
  }, [isPanelOpen])

  useEffect(() => {
    const updateInputState = (event, isPressed) => {
      const inputName = keyToInput[event.code]
      if (!inputName || isEditableTarget(event.target)) return

      event.preventDefault()
      inputStateRef.current = {
        ...inputStateRef.current,
        [inputName]: isPressed,
      }
      gameRef.current?.registry.set('inputState', inputStateRef.current)
    }

    const handleKeyDown = (event) => updateInputState(event, true)
    const handleKeyUp = (event) => updateInputState(event, false)
    const handleBlur = () => {
      inputStateRef.current = createInputState()
      gameRef.current?.registry.set('inputState', inputStateRef.current)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('blur', handleBlur)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('blur', handleBlur)
    }
  }, [])

  return (
    <div className="actuarialWorldCanvasShell">
      {isLoading ? (
        <div className="actuarialWorldLoading">Initializing Actuarial World...</div>
      ) : null}
      <div
        className="actuarialWorldCanvas"
        id={containerId}
        ref={containerRef}
      />
    </div>
  )
}
