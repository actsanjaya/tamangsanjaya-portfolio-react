import Phaser from 'phaser'
import { WORLD_SIZE } from '../data/worldZones.js'
import { GAME_ASSET_KEYS } from '../scenes/BootScene.js'

const ROAD_SEGMENTS = [
  { x: 120, y: 535, width: 1560, height: 132, radius: 44, type: 'horizontal' },
  { x: 832, y: 90, width: 136, height: 938, radius: 44, type: 'vertical' },
  { x: 300, y: 315, width: 340, height: 96, radius: 34, type: 'horizontal' },
  { x: 1180, y: 300, width: 340, height: 96, radius: 34, type: 'horizontal' },
  { x: 1260, y: 690, width: 360, height: 102, radius: 36, type: 'horizontal' },
  { x: 250, y: 760, width: 440, height: 100, radius: 36, type: 'horizontal' },
]

const ROAD_NODES = [
  {
    height: 184,
    key: 'roadIntersection',
    width: 184,
    x: 900,
    y: 601,
  },
  {
    height: 136,
    key: 'roadTJunction',
    rotation: Math.PI,
    width: 136,
    x: 900,
    y: 363,
  },
  {
    height: 136,
    key: 'roadTJunction',
    width: 136,
    x: 900,
    y: 741,
  },
  {
    height: 118,
    key: 'roadCorner',
    rotation: Math.PI / 2,
    width: 118,
    x: 640,
    y: 363,
  },
  {
    height: 118,
    key: 'roadCorner',
    rotation: Math.PI,
    width: 118,
    x: 1180,
    y: 348,
  },
]

export const ROAD_CONNECTIONS = [
  ['home-base', 'contact-portal'],
  ['home-base', 'skills-lab'],
  ['skills-lab', 'project-hub'],
  ['project-hub', 'automation-factory'],
  ['automation-factory', 'contact-portal'],
  ['project-hub', 'dashboard-control-room'],
  ['dashboard-control-room', 'valuation-tower'],
  ['dashboard-control-room', 'rag-library'],
]

const hasTexture = (scene, key) => scene.textures.exists(key)

const getRoadTextureKey = (scene, roadType) => {
  if (roadType === 'vertical' && hasTexture(scene, GAME_ASSET_KEYS.roadVertical)) {
    return GAME_ASSET_KEYS.roadVertical
  }

  if (roadType === 'horizontal' && hasTexture(scene, GAME_ASSET_KEYS.roadHorizontal)) {
    return GAME_ASSET_KEYS.roadHorizontal
  }

  return hasTexture(scene, GAME_ASSET_KEYS.roadTile) ? GAME_ASSET_KEYS.roadTile : null
}

const drawFallbackRoad = ({ graphics, road }) => {
  graphics.fillStyle(0x111827, 0.96)
  graphics.fillRoundedRect(road.x, road.y, road.width, road.height, road.radius)
}

const drawTexturedRoad = ({ road, scene, textureKey }) =>
  scene.add
    .tileSprite(
      road.x + road.width / 2,
      road.y + road.height / 2,
      road.width,
      road.height,
      textureKey,
    )
    .setAlpha(0.92)
    .setDepth(0.22)

const drawRoadNode = ({ fallbackGraphics, node, scene }) => {
  const textureKey = GAME_ASSET_KEYS[node.key]
  if (textureKey && hasTexture(scene, textureKey)) {
    scene.add
      .image(node.x, node.y, textureKey)
      .setAlpha(0.94)
      .setDepth(0.34)
      .setDisplaySize(node.width, node.height)
      .setRotation(node.rotation ?? 0)
    return
  }

  fallbackGraphics.fillStyle(0x111827, 0.95)
  fallbackGraphics.fillRoundedRect(
    node.x - node.width / 2,
    node.y - node.height / 2,
    node.width,
    node.height,
    34,
  )
  fallbackGraphics.lineStyle(2, 0x314765, 0.72)
  fallbackGraphics.strokeRoundedRect(
    node.x - node.width / 2,
    node.y - node.height / 2,
    node.width,
    node.height,
    34,
  )
}

export function drawCityGround(scene) {
  const background = scene.add.graphics()
  background.fillGradientStyle(0x07101f, 0x0b1b35, 0x06142e, 0x020817, 1)
  background.fillRect(0, 0, WORLD_SIZE.width, WORLD_SIZE.height)
  background.setDepth(-6)

  const groundTile = hasTexture(scene, GAME_ASSET_KEYS.groundTile)
    ? scene.add
        .tileSprite(
          WORLD_SIZE.width / 2,
          WORLD_SIZE.height / 2,
          WORLD_SIZE.width,
          WORLD_SIZE.height,
          GAME_ASSET_KEYS.groundTile,
        )
        .setAlpha(0.64)
        .setDepth(-5)
    : null

  const districtGlow = scene.add.graphics()
  districtGlow.setDepth(-4)
  districtGlow.fillStyle(0x0b63f6, 0.1)
  districtGlow.fillCircle(900, 600, 520)
  districtGlow.fillStyle(0x38bdf8, 0.08)
  districtGlow.fillCircle(1320, 330, 300)
  districtGlow.fillStyle(0xfbbf24, 0.06)
  districtGlow.fillCircle(690, 600, 300)
  districtGlow.fillStyle(0xf472b6, 0.06)
  districtGlow.fillCircle(360, 820, 270)

  const blocks = scene.add.graphics()
  blocks.setDepth(-3)
  blocks.fillStyle(0x0d2238, 0.46)
  blocks.lineStyle(1, 0x8fdcff, 0.08)
  for (let x = 130; x < WORLD_SIZE.width - 180; x += 310) {
    for (let y = 150; y < WORLD_SIZE.height - 160; y += 240) {
      blocks.fillRoundedRect(x, y, 210, 132, 24)
      blocks.strokeRoundedRect(x, y, 210, 132, 24)
    }
  }

  const grid = scene.add.graphics()
  grid.setDepth(-2)
  grid.lineStyle(1, 0x38bdf8, 0.07)

  for (let x = 0; x <= WORLD_SIZE.width; x += 64) {
    grid.lineBetween(x, 0, x, WORLD_SIZE.height)
  }

  for (let y = 0; y <= WORLD_SIZE.height; y += 64) {
    grid.lineBetween(0, y, WORLD_SIZE.width, y)
  }

  return { background, blocks, districtGlow, grid, groundTile }
}

export function drawRoadNetwork(scene, zones) {
  const sidewalks = scene.add.graphics()
  const roads = scene.add.graphics()
  const markings = scene.add.graphics()
  const pipes = scene.add.graphics()
  sidewalks.setDepth(0.1)
  roads.setDepth(0.3)
  markings.setDepth(0.36)
  pipes.setDepth(0.37)

  ROAD_SEGMENTS.forEach((road) => {
    const roadTextureKey = getRoadTextureKey(scene, road.type)

    sidewalks.fillStyle(0x172b42, 0.9)
    sidewalks.fillRoundedRect(
      road.x - 16,
      road.y - 16,
      road.width + 32,
      road.height + 32,
      road.radius + 10,
    )

    if (roadTextureKey) {
      drawTexturedRoad({ road, scene, textureKey: roadTextureKey })
    } else {
      drawFallbackRoad({ graphics: roads, road })
    }

    roads.lineStyle(2, 0x314765, 0.72)
    roads.strokeRoundedRect(road.x, road.y, road.width, road.height, road.radius)
  })

  ROAD_NODES.forEach((node) => {
    drawRoadNode({ fallbackGraphics: roads, node, scene })
  })

  markings.lineStyle(4, 0xf8fbff, 0.28)
  for (let x = 210; x < 1600; x += 96) {
    markings.lineBetween(x, 601, x + 42, 601)
  }
  for (let y = 155; y < 1000; y += 92) {
    markings.lineBetween(900, y, 900, y + 40)
  }

  markings.lineStyle(2, 0x38bdf8, 0.26)
  markings.strokeCircle(900, 600, 118)
  markings.strokeCircle(900, 600, 90)

  ROAD_CONNECTIONS.forEach(([fromId, toId]) => {
    const fromZone = zones.find((zone) => zone.id === fromId)
    const toZone = zones.find((zone) => zone.id === toId)
    if (!fromZone || !toZone) return

    const from = fromZone.entrance ?? fromZone.position
    const to = toZone.entrance ?? toZone.position
    const midX = (from.x + to.x) / 2
    const midY = (from.y + to.y) / 2 - 42
    const curve = new Phaser.Curves.QuadraticBezier(
      new Phaser.Math.Vector2(from.x, from.y),
      new Phaser.Math.Vector2(midX, midY),
      new Phaser.Math.Vector2(to.x, to.y),
    )
    const points = curve.getPoints(24)

    pipes.lineStyle(12, 0x06142e, 0.58)
    pipes.strokePoints(points, false)
    pipes.lineStyle(3, 0x38bdf8, 0.3)
    pipes.strokePoints(points, false)
  })

  return { markings, pipes, roads, sidewalks }
}

export function drawCityProps(scene) {
  const props = scene.add.graphics()

  const trees = [
    [240, 250],
    [300, 700],
    [620, 300],
    [1110, 230],
    [1600, 620],
    [1390, 940],
    [510, 930],
  ]
  trees.forEach(([x, y]) => {
    props.fillStyle(0x123524, 0.9)
    props.fillCircle(x, y, 18)
    props.fillStyle(0x22c55e, 0.68)
    props.fillCircle(x - 7, y - 5, 13)
    props.fillCircle(x + 8, y - 2, 12)
    props.fillStyle(0x5b3a1d, 0.72)
    props.fillRoundedRect(x - 4, y + 12, 8, 18, 3)
  })

  const lamps = [
    [765, 525],
    [1045, 525],
    [765, 675],
    [1045, 675],
    [900, 430],
    [900, 780],
  ]
  lamps.forEach(([x, y]) => {
    props.lineStyle(3, 0x8aa4bf, 0.8)
    props.lineBetween(x, y, x, y - 26)
    props.fillStyle(0xfbbf24, 0.72)
    props.fillCircle(x, y - 31, 7)
    props.fillStyle(0xfbbf24, 0.12)
    props.fillCircle(x, y - 31, 24)
  })

  return props
}
