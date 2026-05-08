import { InteractionPrompt } from './InteractionPrompt.jsx'
import { PlayerAvatar } from './PlayerAvatar.jsx'
import { WorldBuilding } from './WorldBuilding.jsx'

export function GameWorld({
  bounds,
  buildings,
  direction,
  isMoving,
  nearbyBuilding,
  onOpenBuilding,
  onTouchMove,
  playerPosition,
}) {
  return (
    <section className="gameWorldPanel" aria-label="Explorable portfolio city">
      <div
        className="gameWorld"
        style={{
          '--world-height': `${bounds.height}px`,
          '--world-width': `${bounds.width}px`,
        }}
      >
        <div className="worldRoad roadHorizontal"></div>
        <div className="worldRoad roadVertical"></div>
        <div className="worldPlaza"></div>

        {buildings.map((building) => (
          <WorldBuilding
            bounds={bounds}
            building={building}
            isNearby={nearbyBuilding?.id === building.id}
            key={building.id}
            onOpen={onOpenBuilding}
          />
        ))}

        <PlayerAvatar
          bounds={bounds}
          direction={direction}
          isMoving={isMoving}
          position={playerPosition}
        />
      </div>

      <InteractionPrompt nearbyBuilding={nearbyBuilding} />

      <div className="touchControls" aria-label="Touch movement controls">
        <button onClick={() => onTouchMove(0, -48)} type="button">
          Up
        </button>
        <div>
          <button onClick={() => onTouchMove(-48, 0)} type="button">
            Left
          </button>
          <button onClick={() => onTouchMove(48, 0)} type="button">
            Right
          </button>
        </div>
        <button onClick={() => onTouchMove(0, 48)} type="button">
          Down
        </button>
      </div>
    </section>
  )
}
