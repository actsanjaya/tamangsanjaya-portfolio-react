import { Button } from '../../../components/ui/Button.jsx'
import { GesturePointer } from './GesturePointer.jsx'

export function GestureCalibration({
  cameraStatus,
  confidence,
  currentGesture,
  errorMessage,
  fallbackReason,
  handDetected,
  isFallback,
  modelStatus,
  onContinue,
  onUseFallback,
  palmHoldProgress,
  pointerActive,
  pointerPosition,
  pointerState,
  videoRef,
}) {
  const isCalibrated =
    isFallback ||
    currentGesture === 'Open Palm Hold' ||
    currentGesture === 'Pinch' ||
    currentGesture === 'Point'

  return (
    <section className="gestureStage gestureCalibration" aria-labelledby="gesture-calibration-title">
      <div className="gestureStageHeader">
        <span className="gestureKicker">Calibration</span>
        <h1 id="gesture-calibration-title">Show an open palm.</h1>
        <p>
          Confirm the new gesture standard: point and move the on-screen
          pointer, pinch once, show two fingers for scroll, then hold an open
          palm until the hold ring fills. You can continue anytime.
        </p>
      </div>

      {errorMessage ? (
        <p className="gestureAlert" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <div className="calibrationGrid">
        <div className="gestureCameraSurface">
          {cameraStatus === 'active' ? (
            <video
              aria-label="Mirrored local camera preview for gesture calibration"
              autoPlay
              muted
              playsInline
              ref={videoRef}
            />
          ) : (
            <p>Camera preview is unavailable. Fallback mode remains ready.</p>
          )}
          <span className="palmTarget" aria-hidden="true">
            OPEN PALM
          </span>
          <small className="mirroredPreviewLabel">
            Mirrored preview for natural control
          </small>
        </div>

        <div className="calibrationStatusPanel">
          <h2>Detection Status</h2>
          <dl className="gestureStatusList">
            <div>
              <dt>Camera</dt>
              <dd>{cameraStatus === 'active' ? 'On' : 'Off'}</dd>
            </div>
            <div>
              <dt>Hand</dt>
              <dd>{handDetected ? 'Detected' : 'Not Detected'}</dd>
            </div>
            <div>
              <dt>Current Gesture</dt>
              <dd>{currentGesture}</dd>
            </div>
            <div>
              <dt>Palm Hold</dt>
              <dd>{Math.round(palmHoldProgress * 100)}%</dd>
            </div>
            <div>
              <dt>Model</dt>
              <dd>{modelStatus}</dd>
            </div>
            <div>
              <dt>Confidence</dt>
              <dd>{Math.round(confidence * 100)}%</dd>
            </div>
          </dl>

          {fallbackReason ? <p className="fallbackReason">{fallbackReason}</p> : null}
          {!handDetected && cameraStatus === 'active' ? (
            <p className="fallbackReason">
              Show your hand clearly inside the camera frame.
            </p>
          ) : null}

          <div className="gestureActionRow">
            <Button onClick={onContinue}>
              {isCalibrated ? 'Enter Command Center' : 'Continue Anyway'}
            </Button>
            <Button onClick={onUseFallback} variant="secondary">
              Switch to Fallback
            </Button>
          </div>
        </div>
      </div>

      <GesturePointer
        palmHoldProgress={palmHoldProgress}
        pointerActive={pointerActive}
        pointerPosition={pointerPosition}
        pointerState={pointerState}
      />
    </section>
  )
}
