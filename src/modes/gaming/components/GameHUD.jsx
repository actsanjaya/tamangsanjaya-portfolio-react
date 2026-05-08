export function GameHUD({ nearbyBuilding, onReturnDefault }) {
  return (
    <aside className="gameHUD" aria-label="Gaming mode controls">
      <div>
        <span>Current Mode</span>
        <strong>Gaming Mode</strong>
      </div>
      <div>
        <span>Move</span>
        <strong>WASD / Arrow keys</strong>
      </div>
      <div>
        <span>Explore</span>
        <strong>Enter</strong>
      </div>
      <div>
        <span>Exit Panel</span>
        <strong>Esc</strong>
      </div>
      <div>
        <span>Nearby</span>
        <strong>{nearbyBuilding?.name ?? 'None'}</strong>
      </div>
      <button onClick={onReturnDefault} type="button">
        Return to Default Mode
      </button>
    </aside>
  )
}
