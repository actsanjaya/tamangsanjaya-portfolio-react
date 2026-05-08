export function InteractionPrompt({ nearbyBuilding }) {
  if (!nearbyBuilding) {
    return (
      <div className="interactionPrompt isIdle">
        Move near a building to explore portfolio zones.
      </div>
    )
  }

  return (
    <div className="interactionPrompt">
      Press <kbd>Enter</kbd> to explore <strong>{nearbyBuilding.name}</strong>
    </div>
  )
}
