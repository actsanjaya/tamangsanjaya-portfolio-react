import { GAME_ASSET_KEYS } from '../scenes/BootScene.js'

const PROP_ASSET_KEYS = {
  bench: GAME_ASSET_KEYS.bench,
  lamp: GAME_ASSET_KEYS.streetLamp,
  tree: GAME_ASSET_KEYS.tree,
}

const PROP_BASE_SIZES = {
  bench: { height: 52, width: 82 },
  lamp: { height: 88, width: 48 },
  tree: { height: 92, width: 76 },
}

const CITY_PROPS = [
  { type: 'tree', x: 248, y: 260, scale: 0.9 },
  { type: 'tree', x: 326, y: 704, scale: 0.82 },
  { type: 'tree', x: 616, y: 294, scale: 0.76 },
  { type: 'tree', x: 1116, y: 238, scale: 0.78 },
  { type: 'tree', x: 1608, y: 626, scale: 0.88 },
  { type: 'tree', x: 1396, y: 950, scale: 0.84 },
  { type: 'tree', x: 514, y: 932, scale: 0.78 },
  { type: 'lamp', x: 770, y: 522, scale: 0.78 },
  { type: 'lamp', x: 1048, y: 522, scale: 0.78 },
  { type: 'lamp', x: 772, y: 682, scale: 0.78 },
  { type: 'lamp', x: 1048, y: 682, scale: 0.78 },
  { type: 'lamp', x: 900, y: 424, scale: 0.74 },
  { type: 'lamp', x: 900, y: 786, scale: 0.74 },
  { type: 'lamp', x: 1248, y: 252, scale: 0.7 },
  { type: 'bench', x: 665, y: 706, scale: 0.78 },
  { type: 'bench', x: 1005, y: 808, scale: 0.76 },
  { type: 'bench', x: 476, y: 778, scale: 0.72 },
  { type: 'bench', x: 885, y: 350, scale: 0.72 },
]

const hasTexture = (scene, key) => scene.textures.exists(key)

const drawFallbackProp = ({ graphics, prop }) => {
  if (prop.type === 'tree') {
    graphics.fillStyle(0x5b3a1d, 0.76)
    graphics.fillRoundedRect(-5, 12, 10, 22, 4)
    graphics.fillStyle(0x123524, 0.92)
    graphics.fillCircle(0, -8, 22)
    graphics.fillStyle(0x22c55e, 0.72)
    graphics.fillCircle(-9, -14, 15)
    graphics.fillCircle(11, -10, 14)
    return
  }

  if (prop.type === 'lamp') {
    graphics.lineStyle(3, 0x8aa4bf, 0.86)
    graphics.lineBetween(0, 26, 0, -24)
    graphics.fillStyle(0xfbbf24, 0.78)
    graphics.fillCircle(0, -31, 8)
    graphics.fillStyle(0xfbbf24, 0.14)
    graphics.fillCircle(0, -31, 26)
    return
  }

  graphics.fillStyle(0x10233e, 0.92)
  graphics.lineStyle(2, 0x8fdcff, 0.34)
  graphics.fillRoundedRect(-34, -10, 68, 20, 8)
  graphics.strokeRoundedRect(-34, -10, 68, 20, 8)
  graphics.lineBetween(-22, 10, -28, 28)
  graphics.lineBetween(22, 10, 28, 28)
}

const drawCityProp = (scene, prop) => {
  const container = scene.add.container(prop.x, prop.y)
  const textureKey = PROP_ASSET_KEYS[prop.type]
  const baseSize = PROP_BASE_SIZES[prop.type] ?? { height: 60, width: 60 }

  if (textureKey && hasTexture(scene, textureKey)) {
    container.add(
      scene.add
        .image(0, 0, textureKey)
        .setDisplaySize(
          baseSize.width * (prop.scale ?? 1),
          baseSize.height * (prop.scale ?? 1),
        ),
    )
  } else {
    const graphics = scene.add.graphics()
    drawFallbackProp({ graphics, prop })
    graphics.setScale(prop.scale ?? 1)
    container.add(graphics)
  }

  container.setDepth(prop.depth ?? prop.y)
  return container
}

const drawFallbackPortalMarker = ({ graphics, zone }) => {
  graphics.fillStyle(zone.color, 0.16)
  graphics.fillCircle(0, 0, 34)
  graphics.lineStyle(2, zone.color, 0.68)
  graphics.strokeCircle(0, 0, 28)
  graphics.lineStyle(1, 0xf8fbff, 0.34)
  graphics.strokeCircle(0, 0, 38)
}

const drawEntranceMarker = (scene, zone) => {
  const entrance = zone.entrance ?? zone.position
  const container = scene.add.container(entrance.x, entrance.y)
  const glow = scene.add.graphics()
  glow.fillStyle(zone.color, 0.14)
  glow.fillEllipse(0, 8, 80, 34)
  container.add(glow)

  if (hasTexture(scene, GAME_ASSET_KEYS.portalMarker)) {
    container.add(
      scene.add
        .image(0, -4, GAME_ASSET_KEYS.portalMarker)
        .setAlpha(0.76)
        .setDisplaySize(74, 58),
    )
  } else {
    const fallback = scene.add.graphics()
    drawFallbackPortalMarker({ graphics: fallback, zone })
    container.add(fallback)
  }

  container.setAlpha(0.72)
  container.setDepth(entrance.y + 2)

  return { color: zone.color, container, glow, zoneId: zone.id }
}

export function drawCityProps(scene, zones) {
  const props = CITY_PROPS.map((prop) => drawCityProp(scene, prop))
  const entranceMarkers = new Map(
    zones.map((zone) => {
      const marker = drawEntranceMarker(scene, zone)
      return [zone.id, marker]
    }),
  )

  return { entranceMarkers, props }
}
