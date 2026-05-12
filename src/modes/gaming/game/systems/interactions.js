export const getZoneBounds = (zone, padding = 0) => ({
  left:
    zone.position.x -
    (zone.collisionBox?.width ?? zone.size.width) / 2 -
    padding,
  right:
    zone.position.x +
    (zone.collisionBox?.width ?? zone.size.width) / 2 +
    padding,
  top:
    zone.position.y -
    (zone.collisionBox?.height ?? zone.size.height) / 2 -
    padding,
  bottom:
    zone.position.y +
    (zone.collisionBox?.height ?? zone.size.height) / 2 +
    padding,
})

export const getDistance = (a, b) => {
  const deltaX = a.x - b.x
  const deltaY = a.y - b.y
  return Math.hypot(deltaX, deltaY)
}

export const getDistanceToZoneEdge = ({ point, zone }) => {
  const bounds = zone.entrance
    ? {
        bottom: zone.entrance.y,
        left: zone.entrance.x,
        right: zone.entrance.x,
        top: zone.entrance.y,
      }
    : getZoneBounds(zone)
  const closestX = Math.max(bounds.left, Math.min(point.x, bounds.right))
  const closestY = Math.max(bounds.top, Math.min(point.y, bounds.bottom))

  return getDistance(point, { x: closestX, y: closestY })
}

export const findNearbyZone = ({ interactionDistance, playerPosition, zones }) =>
  zones
    .map((zone) => ({
      zone,
      distance: getDistanceToZoneEdge({ point: playerPosition, zone }),
    }))
    .filter(({ distance }) => distance <= interactionDistance)
    .sort((a, b) => a.distance - b.distance)[0]?.zone ?? null

export const isPointInsideZone = ({ point, radius = 0, zone }) => {
  const bounds = getZoneBounds(zone, radius)

  return (
    point.x >= bounds.left &&
    point.x <= bounds.right &&
    point.y >= bounds.top &&
    point.y <= bounds.bottom
  )
}
