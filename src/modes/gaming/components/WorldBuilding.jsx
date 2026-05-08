export function WorldBuilding({ bounds, building, isNearby, onOpen }) {
  return (
    <button
      aria-label={`Explore ${building.name}`}
      className={`worldBuilding theme-${building.theme} ${isNearby ? 'isNearby' : ''}`}
      onClick={() => onOpen(building)}
      style={{
        height: `${(building.size.height / bounds.height) * 100}%`,
        left: `${(building.position.x / bounds.width) * 100}%`,
        top: `${(building.position.y / bounds.height) * 100}%`,
        width: `${(building.size.width / bounds.width) * 100}%`,
      }}
      type="button"
    >
      <span className="buildingRoof"></span>
      <span className="buildingIcon">{building.icon}</span>
      <strong>{building.name}</strong>
      <small>{building.shortPrompt}</small>
    </button>
  )
}
