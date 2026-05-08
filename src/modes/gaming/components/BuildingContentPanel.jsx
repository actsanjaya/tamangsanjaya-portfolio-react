export function BuildingContentPanel({ building, onClose }) {
  if (!building) {
    return null
  }

  return (
    <div className="buildingPanelOverlay" role="presentation">
      <section
        aria-labelledby="building-panel-title"
        aria-modal="true"
        className={`buildingContentPanel theme-${building.theme}`}
        role="dialog"
      >
        <div className="buildingPanelHeader">
          <span>{building.type}</span>
          <h2 id="building-panel-title">{building.name}</h2>
          <button aria-label="Exit building" onClick={onClose} type="button">
            Exit
          </button>
        </div>

        <p className="buildingPanelSummary">{building.summary}</p>

        <div className="buildingInventoryGrid">
          {building.contentSections.map((section) => (
            <article className="buildingInventoryCard" key={section.title}>
              <h3>{section.title}</h3>
              <p>{section.text}</p>
              <div className="buildingTagList">
                {section.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="buildingPanelFooter">
          <span>Press Esc to exit</span>
          <button onClick={onClose} type="button">
            Return to World
          </button>
        </div>
      </section>
    </div>
  )
}
