import { Button } from '../../../components/ui/Button.jsx'

export function GestureLanding({ errorMessage, onEnableGesture, onUseFallback }) {
  return (
    <section className="gestureLanding" aria-labelledby="gesture-landing-title">
      <div className="gestureHeroCopy">
        <span className="gestureKicker">Actuarial Command Center</span>
        <h1 id="gesture-landing-title">Gesture Mode Activated</h1>
        <p>
          Explore my technical actuarial portfolio using hand gestures, or enter
          the same command interface with mouse, keyboard, and touch.
        </p>

        <div className="gestureActionRow">
          <Button onClick={onEnableGesture}>Enable Gesture Mode</Button>
          <Button onClick={onUseFallback} variant="secondary">
            Use Mouse / Keyboard Mode
          </Button>
        </div>

        <p className="gesturePrivacyNote">
          Camera is used only for local hand detection. No image or video is
          stored or uploaded.
        </p>

        {errorMessage ? (
          <p className="gestureAlert" role="alert">
            {errorMessage}
          </p>
        ) : null}
      </div>

      <div className="gestureOrbitalPreview" aria-hidden="true">
        <span className="gestureOrbitRing"></span>
        <span className="gestureOrbitRing"></span>
        <span className="gestureOrbitRing"></span>
        <span className="gestureOrbitCore">ST</span>
      </div>
    </section>
  )
}
