import { Button } from '../../../components/ui/Button.jsx'
import {
  keyboardInstructions,
  refinedGestureInstructions,
} from '../data/gesturePortfolioData.js'

export function GestureTutorial({ mode, onBack, onContinue }) {
  const continueLabel =
    mode === 'gesture' ? 'Start Calibration' : 'Enter Command Center'

  return (
    <section className="gestureStage gestureTutorial" aria-labelledby="gesture-tutorial-title">
      <div className="gestureStageHeader">
        <span className="gestureKicker">Control Tutorial</span>
        <h1 id="gesture-tutorial-title">Learn the command gestures.</h1>
        <p>
          Gesture Mode is optional. Every action below also works with keyboard,
          mouse, and touch, so the experience remains accessible without camera.
        </p>
      </div>

      <div className="gestureInstructionGrid">
        {refinedGestureInstructions.map((item) => (
          <article className="gestureInstructionCard" key={item.gesture}>
            <span className="gestureSignal">{item.signal}</span>
            <div>
              <h2>{item.gesture}</h2>
              <p>{item.action}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="keyboardFallbackPanel">
        <h2>Keyboard fallback</h2>
        <div className="keyboardGrid">
          {keyboardInstructions.map((item) => (
            <span key={item.key}>
              <kbd>{item.key}</kbd>
              {item.action}
            </span>
          ))}
        </div>
      </div>

      <div className="gestureActionRow">
        <Button onClick={onContinue}>{continueLabel}</Button>
        <Button onClick={onBack} variant="secondary">
          Back
        </Button>
      </div>
    </section>
  )
}
