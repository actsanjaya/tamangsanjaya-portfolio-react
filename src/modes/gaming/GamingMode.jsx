import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BuildingContentPanel } from './components/BuildingContentPanel.jsx'
import { GameHUD } from './components/GameHUD.jsx'
import { GameWorld } from './components/GameWorld.jsx'
import { MiniMap } from './components/MiniMap.jsx'
import { useKeyboardControls } from './hooks/useKeyboardControls.js'
import { usePlayerMovement } from './hooks/usePlayerMovement.js'
import { useWorldInteraction } from './hooks/useWorldInteraction.js'
import {
  INTERACTION_DISTANCE,
  PLAYER_SPEED,
  PLAYER_START,
  WORLD_BOUNDS,
  portfolioBuildings,
} from './worldConfig.js'
import './gamingMode.css'

export function GamingMode({ onNavigate }) {
  const [activeBuildingId, setActiveBuildingId] = useState(null)
  const nearbyBuildingRef = useRef(null)
  const activeBuilding = useMemo(
    () => portfolioBuildings.find((building) => building.id === activeBuildingId),
    [activeBuildingId],
  )
  const isInsideBuilding = Boolean(activeBuilding)

  const openBuilding = useCallback((building) => {
    setActiveBuildingId(building.id)
  }, [])

  const closeBuilding = useCallback(() => {
    setActiveBuildingId(null)
  }, [])

  const pressedKeys = useKeyboardControls({
    disabled: isInsideBuilding,
    onEnter: () => {
      if (!activeBuildingId && nearbyBuildingRef.current) {
        openBuilding(nearbyBuildingRef.current)
      }
    },
    onEscape: closeBuilding,
  })

  const { direction, isMoving, moveBy, playerPosition } = usePlayerMovement({
    bounds: WORLD_BOUNDS,
    disabled: isInsideBuilding,
    initialPosition: PLAYER_START,
    pressedKeys,
    speed: PLAYER_SPEED,
  })

  const { nearbyBuilding } = useWorldInteraction({
    buildings: portfolioBuildings,
    interactionDistance: INTERACTION_DISTANCE,
    playerPosition,
  })

  useEffect(() => {
    nearbyBuildingRef.current = nearbyBuilding
  }, [nearbyBuilding])

  return (
    <main className="site gamingExperience" id="top">
      <section className="gamingIntro">
        <div>
          <span className="gameKicker">Gaming Mode Beta</span>
          <h1>Explore Sanjaya&apos;s portfolio city.</h1>
          <p>
            Move through an original retro-inspired actuarial-tech city. Each
            building opens a different part of the portfolio.
          </p>
        </div>
      </section>

      <section className="gamingLayout">
        <GameHUD
          nearbyBuilding={nearbyBuilding}
          onReturnDefault={() => onNavigate('/default')}
        />

        <GameWorld
          bounds={WORLD_BOUNDS}
          buildings={portfolioBuildings}
          direction={direction}
          isMoving={isMoving}
          nearbyBuilding={nearbyBuilding}
          onOpenBuilding={openBuilding}
          onTouchMove={moveBy}
          playerPosition={playerPosition}
        />

        <MiniMap
          bounds={WORLD_BOUNDS}
          buildings={portfolioBuildings}
          playerPosition={playerPosition}
        />
      </section>

      <BuildingContentPanel building={activeBuilding} onClose={closeBuilding} />
    </main>
  )
}
