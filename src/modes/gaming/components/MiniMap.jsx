export function MiniMap({ buildings, bounds, playerPosition }) {
  return (
    <aside className="miniMap" aria-label="Mini map">
      <span className="miniMapTitle">City Map</span>
      <div className="miniMapSurface">
        {buildings.map((building) => (
          <span
            className={`miniMapBuilding theme-${building.theme}`}
            key={building.id}
            style={{
              left: `${(building.position.x / bounds.width) * 100}%`,
              top: `${(building.position.y / bounds.height) * 100}%`,
            }}
            title={building.name}
          ></span>
        ))}
        <span
          className="miniMapPlayer"
          style={{
            left: `${(playerPosition.x / bounds.width) * 100}%`,
            top: `${(playerPosition.y / bounds.height) * 100}%`,
          }}
        ></span>
      </div>
    </aside>
  )
}
