import { Suspense, lazy, useCallback, useEffect, useMemo, useState } from 'react'
import { BuildingContentPanel } from './components/BuildingContentPanel.jsx'
import { WORLD_SIZE, worldZones } from './game/data/worldZones.js'
import './gamingMode.css'

const ActuarialWorldGame = lazy(() =>
  import('./game/ActuarialWorldGame.jsx').then((module) => ({
    default: module.ActuarialWorldGame,
  })),
)

function ActuarialWorldHud({ nearbyZone, onReturnDefault }) {
  return (
    <aside className="gameHUD actuarialWorldHud" aria-label="Actuarial World HUD">
      <div>
        <span>Mode</span>
        <strong>Actuarial City</strong>
      </div>
      <div>
        <span>Move</span>
        <strong>WASD / Arrow Keys</strong>
      </div>
      <div>
        <span>Explore</span>
        <strong>Enter near a zone</strong>
      </div>
      <div>
        <span>Close</span>
        <strong>Esc</strong>
      </div>
      <div className="actuarialWorldNearby">
        <span>Nearby Zone</span>
        <strong>{nearbyZone?.name ?? 'Move toward a glowing zone'}</strong>
      </div>
      <button onClick={onReturnDefault} type="button">
        Return to Default Mode
      </button>
    </aside>
  )
}

function ActuarialWorldMiniMap({ nearbyZone }) {
  return (
    <aside className="miniMap actuarialWorldMiniMap" aria-label="World zones map">
      <span className="miniMapTitle">Zone Map</span>
      <div className="miniMapSurface">
        {worldZones.map((zone) => (
          <span
            className={`miniMapBuilding theme-${zone.theme}${
              nearbyZone?.id === zone.id ? ' isNearby' : ''
            }`}
            key={zone.id}
            style={{
              left: `${(zone.position.x / WORLD_SIZE.width) * 100}%`,
              top: `${(zone.position.y / WORLD_SIZE.height) * 100}%`,
            }}
            title={zone.name}
          />
        ))}
        <span className="miniMapPlayer" style={{ left: '50%', top: '55%' }} />
      </div>
      <p>Camera follows your avatar. Bright dots are explorable zones.</p>
    </aside>
  )
}

export function GamingMode({ onNavigate }) {
  const [activeZoneId, setActiveZoneId] = useState(null)
  const [nearbyZoneId, setNearbyZoneId] = useState(null)

  const activeZone = useMemo(
    () => worldZones.find((zone) => zone.id === activeZoneId) ?? null,
    [activeZoneId],
  )
  const nearbyZone = useMemo(
    () => worldZones.find((zone) => zone.id === nearbyZoneId) ?? null,
    [nearbyZoneId],
  )

  const openZone = useCallback((zoneId) => {
    setActiveZoneId(zoneId)
  }, [])

  const closeZone = useCallback(() => {
    setActiveZoneId(null)
  }, [])

  const handleZoneFocus = useCallback((zoneId) => {
    setNearbyZoneId(zoneId)
  }, [])

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeZone()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [closeZone])

  return (
    <main className="site gamingExperience" id="top">
      <section className="gamingIntro">
        <div>
          <span className="gameKicker">Gaming Mode Beta</span>
          <h1>Actuarial World</h1>
          <p>
            A futuristic portfolio city where actuarial labs, valuation towers,
            dashboards, and app portals become explorable locations.
          </p>
        </div>
      </section>

      <section className="gamingLayout actuarialWorldLayout">
        <ActuarialWorldHud
          nearbyZone={nearbyZone}
          onReturnDefault={() => onNavigate('/default')}
        />

        <div className="gameWorldPanel actuarialWorldPanel">
          <div className="actuarialWorldDesktopNote">
            Best experienced on desktop with keyboard. Tap glowing buildings to
            open zones on touch devices.
          </div>
          <Suspense
            fallback={
              <div className="actuarialWorldLoading">
                Loading Phaser world...
              </div>
            }
          >
            <ActuarialWorldGame
              isPanelOpen={Boolean(activeZone)}
              onZoneActivate={openZone}
              onZoneFocus={handleZoneFocus}
            />
          </Suspense>
          <div
            className={`interactionPrompt${nearbyZone ? '' : ' isIdle'}`}
            aria-live="polite"
          >
            {nearbyZone ? (
              <>
                <kbd>Enter</kbd> Explore {nearbyZone.name}
              </>
            ) : (
              'Move near a glowing zone to explore'
            )}
          </div>
        </div>

        <ActuarialWorldMiniMap nearbyZone={nearbyZone} />
      </section>

      <BuildingContentPanel building={activeZone} onClose={closeZone} />
    </main>
  )
}
