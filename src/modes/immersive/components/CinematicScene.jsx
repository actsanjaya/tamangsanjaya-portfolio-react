export function CinematicScene({
  isActive,
  onNavigate,
  scene,
}) {
  return (
    <section
      aria-hidden={isActive ? undefined : true}
      aria-labelledby={`cinematic-${scene.id}-title`}
      className={`cinematicScene cinematicScene-${scene.id} tone-${scene.textTone}${
        isActive ? ' isActive' : ''
      }`}
      inert={isActive ? undefined : true}
    >
      <img
        alt=""
        aria-hidden="true"
        className="cinematicSceneBackground"
        draggable="false"
        src={scene.background}
      />
      <div className="cinematicSceneShade" aria-hidden="true" />
      <div className="cinematicSceneGrain" aria-hidden="true" />

      <div className="cinematicSceneContent">
        <span className="cinematicSceneNumber">{scene.number}</span>
        <h1 id={`cinematic-${scene.id}-title`}>{scene.headline}</h1>
        <p>{scene.supporting}</p>

        {scene.actions ? (
          <div className="cinematicActions" aria-label="Immersive mode actions">
            {scene.actions.map((action) => (
              <button
                className={`cinematicAction cinematicAction-${action.variant}`}
                key={action.label}
                onClick={() => onNavigate(action.to)}
                type="button"
              >
                {action.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
