import { useMemo } from 'react'

const getBuildingCenter = (building) => ({
  x: building.position.x + building.size.width / 2,
  y: building.position.y + building.size.height / 2,
})

export function useWorldInteraction({
  buildings,
  interactionDistance,
  playerPosition,
}) {
  const nearbyBuilding = useMemo(() => {
    let closestBuilding = null
    let closestDistance = Infinity

    buildings.forEach((building) => {
      const center = getBuildingCenter(building)
      const distance = Math.hypot(
        playerPosition.x - center.x,
        playerPosition.y - center.y,
      )

      if (distance < closestDistance) {
        closestDistance = distance
        closestBuilding = building
      }
    })

    return closestDistance <= interactionDistance ? closestBuilding : null
  }, [buildings, interactionDistance, playerPosition.x, playerPosition.y])

  return {
    nearbyBuilding,
  }
}
