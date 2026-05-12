import { GAME_ASSET_KEYS } from '../scenes/BootScene.js'

const BUILDING_ASSET_KEYS = {
  automationFactoryBuilding: GAME_ASSET_KEYS.automationFactoryBuilding,
  contactOfficeBuilding: GAME_ASSET_KEYS.contactOfficeBuilding,
  dashboardStudioBuilding: GAME_ASSET_KEYS.dashboardStudioBuilding,
  homeBaseBuilding: GAME_ASSET_KEYS.homeBaseBuilding,
  projectHubBuilding: GAME_ASSET_KEYS.projectHubBuilding,
  ragLibraryBuilding: GAME_ASSET_KEYS.ragLibraryBuilding,
  skillsLabBuilding: GAME_ASSET_KEYS.skillsLabBuilding,
  valuationTowerBuilding: GAME_ASSET_KEYS.valuationTowerBuilding,
}

const getBuildingDisplaySize = ({ height, width, zone }) => ({
  height: zone.asset?.display?.height ?? height + 92,
  width: zone.asset?.display?.width ?? width + 88,
})

const drawWindowGrid = ({ graphics, height, width, zone }) => {
  graphics.fillStyle(0xdff7ff, 0.24)
  const columns = Math.max(3, Math.floor(width / 48))
  const rows = Math.max(2, Math.floor(height / 48))
  const startX = -((columns - 1) * 36) / 2
  const startY = -height / 2 + 48

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      graphics.fillRoundedRect(startX + column * 36 - 8, startY + row * 28, 16, 10, 3)
    }
  }

  graphics.lineStyle(2, zone.color, 0.34)
  graphics.strokeRoundedRect(-width / 2 + 22, -height / 2 + 22, width - 44, height - 44, 16)
}

const drawEntrance = ({ graphics, height, width, zone }) => {
  graphics.fillStyle(0x020817, 0.88)
  graphics.lineStyle(2, zone.color, 0.72)
  graphics.fillRoundedRect(-24, height / 2 - 42, 48, 42, 8)
  graphics.strokeRoundedRect(-24, height / 2 - 42, 48, 42, 8)
  graphics.fillStyle(zone.color, 0.18)
  graphics.fillRoundedRect(-width / 2 + 22, height / 2 - 16, width - 44, 18, 8)
}

const drawBuildingDetails = ({ graphics, height, width, zone }) => {
  graphics.fillStyle(zone.color, 0.58)
  graphics.lineStyle(2, zone.color, 0.38)

  if (zone.buildingType === 'tower') {
    for (let level = 0; level < 6; level += 1) {
      graphics.fillRoundedRect(-width / 2 + 38, -height / 2 + 42 + level * 34, width - 76, 9, 4)
    }
    graphics.strokeCircle(0, -height / 2 + 30, 18)
    return
  }

  if (zone.buildingType === 'factory') {
    graphics.fillRoundedRect(width / 2 - 70, -height / 2 - 34, 32, 48, 8)
    graphics.fillRoundedRect(width / 2 - 32, -height / 2 - 46, 26, 60, 8)
    for (let node = 0; node < 4; node += 1) {
      const x = -width / 2 + 52 + node * 54
      graphics.fillCircle(x, 26, 8)
      if (node < 3) graphics.lineBetween(x + 12, 26, x + 42, 26)
    }
    return
  }

  if (zone.buildingType === 'studio') {
    graphics.fillStyle(0x38bdf8, 0.22)
    graphics.fillRoundedRect(-width / 2 + 32, -height / 2 + 42, width - 64, 58, 12)
    graphics.lineStyle(2, zone.color, 0.5)
    graphics.strokeRoundedRect(-width / 2 + 32, -height / 2 + 42, width - 64, 58, 12)
    for (let bar = 0; bar < 5; bar += 1) {
      graphics.fillStyle(zone.color, 0.58)
      graphics.fillRoundedRect(-width / 2 + 48 + bar * 38, -height / 2 + 82 - bar * 7, 18, 22 + bar * 7, 5)
    }
    return
  }

  if (zone.buildingType === 'library') {
    for (let row = 0; row < 4; row += 1) {
      graphics.strokeRoundedRect(-width / 2 + 36, -height / 2 + 46 + row * 24, width - 72, 11, 4)
    }
    graphics.fillRoundedRect(-width / 2 + 26, -height / 2 + 18, width - 52, 18, 6)
    return
  }

  if (zone.buildingType === 'hub') {
    graphics.lineStyle(4, zone.color, 0.56)
    graphics.strokeCircle(0, 4, 48)
    graphics.strokeCircle(0, 4, 70)
    graphics.fillStyle(0x020817, 0.82)
    graphics.fillCircle(0, 4, 34)
    return
  }

  if (zone.buildingType === 'office') {
    graphics.lineStyle(3, zone.color, 0.5)
    graphics.strokeCircle(0, -height / 2 + 44, 22)
    graphics.strokeCircle(0, -height / 2 + 44, 38)
    graphics.lineBetween(0, -height / 2 + 44, 0, -height / 2 + 86)
    return
  }

  if (zone.buildingType === 'lab') {
    for (let module = 0; module < 4; module += 1) {
      graphics.fillRoundedRect(-width / 2 + 42 + module * 42, -height / 2 + 54, 26, 26, 8)
    }
    graphics.strokeCircle(width / 2 - 48, height / 2 - 54, 24)
    return
  }

  graphics.strokeRoundedRect(-width / 2 + 44, -height / 2 + 48, width - 88, 46, 14)
}

export function drawBuilding(scene, zone) {
  const width = zone.size.width
  const height = zone.size.height
  const container = scene.add.container(zone.position.x, zone.position.y)
  const buildingAssetKey = BUILDING_ASSET_KEYS[zone.asset?.building]
  const hasBuildingAsset = buildingAssetKey && scene.textures.exists(buildingAssetKey)
  const glow = scene.add.graphics()
  const plaza = scene.add.graphics()
  const shadow = scene.add.graphics()
  const body = scene.add.graphics()
  const roof = scene.add.graphics()
  const details = scene.add.graphics()

  glow.fillStyle(zone.color, 0.12)
  glow.fillRoundedRect(-width / 2 - 30, -height / 2 - 30, width + 60, height + 70, 36)
  glow.lineStyle(1, zone.color, 0.28)
  glow.strokeRoundedRect(-width / 2 - 34, -height / 2 - 34, width + 68, height + 78, 38)

  plaza.fillStyle(0x172b42, 0.86)
  plaza.lineStyle(1, 0x8fdcff, 0.12)
  plaza.fillRoundedRect(-width / 2 - 26, height / 2 - 10, width + 52, 58, 18)
  plaza.strokeRoundedRect(-width / 2 - 26, height / 2 - 10, width + 52, 58, 18)

  shadow.fillStyle(0x000000, 0.28)
  shadow.fillRoundedRect(-width / 2 + 22, -height / 2 + 34, width + 18, height + 16, 18)

  let buildingAsset = null

  if (hasBuildingAsset) {
    const displaySize = getBuildingDisplaySize({ height, width, zone })
    buildingAsset = scene.add
      .image(zone.asset?.offsetX ?? 0, zone.asset?.offsetY ?? 0, buildingAssetKey)
      .setDisplaySize(displaySize.width, displaySize.height)
    details.fillStyle(zone.color, 0.26)
    details.fillCircle(0, height / 2 - 24, 44)
    details.lineStyle(2, zone.color, 0.52)
    details.strokeCircle(0, height / 2 - 24, 58)
  } else {
    body.fillStyle(0x06142e, 0.98)
    body.lineStyle(2, zone.color, 0.76)
    body.fillRoundedRect(-width / 2, -height / 2, width, height, 18)
    body.strokeRoundedRect(-width / 2, -height / 2, width, height, 18)
    body.fillStyle(0x0b1b35, 0.88)
    body.fillRoundedRect(-width / 2 + 12, -height / 2 + 20, width - 24, height - 26, 14)

    roof.fillStyle(zone.color, 0.28)
    roof.lineStyle(1, 0xf8fbff, 0.3)
    roof.fillRoundedRect(-width / 2 + 22, -height / 2 - 24, width - 44, 34, 14)
    roof.strokeRoundedRect(-width / 2 + 22, -height / 2 - 24, width - 44, 34, 14)

    drawWindowGrid({ graphics: details, height, width, zone })
    drawBuildingDetails({ graphics: details, height, width, zone })
    drawEntrance({ graphics: details, height, width, zone })
  }

  const sign = scene.add
    .text(0, -height / 2 - 48, zone.name, {
      align: 'center',
      color: '#f8fbff',
      fontFamily: 'Inter, Arial, sans-serif',
      fontSize: '19px',
      fontStyle: '800',
      stroke: '#06142e',
      strokeThickness: 4,
      wordWrap: { width: width + 50 },
    })
    .setOrigin(0.5)

  const subtitle = scene.add
    .text(0, height / 2 + 22, zone.subtitle.toUpperCase(), {
      align: 'center',
      color: '#91e5ff',
      fontFamily: 'Inter, Arial, sans-serif',
      fontSize: '10px',
      fontStyle: '900',
    })
    .setOrigin(0.5)

  const hitZone = scene.add
    .zone(0, 0, width + 34, height + 44)
    .setInteractive({ useHandCursor: true })

  hitZone.on('pointerdown', () => scene.activateZone(zone))

  container.add([
    glow,
    plaza,
    shadow,
    body,
    roof,
    ...(buildingAsset ? [buildingAsset] : []),
    details,
    sign,
    subtitle,
    hitZone,
  ])
  container.setDepth(zone.position.y)

  return { container, glow, roof: buildingAsset ?? roof, zone }
}
