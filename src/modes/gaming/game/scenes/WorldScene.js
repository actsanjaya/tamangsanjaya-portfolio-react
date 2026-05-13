import Phaser from 'phaser'
import {
  INTERACTION_DISTANCE,
  PLAYER_SPEED,
  PLAYER_START,
  WORLD_SIZE,
} from '../data/worldZones.js'
import { drawBuilding } from '../systems/drawBuildings.js'
import {
  drawCityGround,
  drawRoadNetwork,
} from '../systems/drawRoads.js'
import { drawCityProps } from '../systems/drawProps.js'
import {
  createPlayerAvatar,
  redrawPlayerAvatar,
} from '../systems/drawPlayer.js'
import {
  getDistance,
  findNearbyZone,
  isPointInsideZone,
} from '../systems/interactions.js'
import {
  clampPosition,
  getDirectionFromVector,
  getMovementVector,
} from '../systems/playerMovement.js'

const PLAYER_RADIUS = 22

export class WorldScene extends Phaser.Scene {
  constructor({ callbacks, zones }) {
    super('WorldScene')
    this.callbacks = callbacks
    this.zones = zones
    this.nearbyZoneId = null
    this.playerDirection = 'down'
    this.wasEnterPressed = false
  }

  create() {
    this.cameras.main.setBackgroundColor('#07101f')
    this.cameras.main.setBounds(0, 0, WORLD_SIZE.width, WORLD_SIZE.height)
    this.physics.world.setBounds(0, 0, WORLD_SIZE.width, WORLD_SIZE.height)

    this.drawWorld()
    this.createZones()
    this.createCityProps()
    this.createPlayer()
    this.createControls()

    this.cameras.main.startFollow(this.playerContainer, true, 0.08, 0.08)
    this.cameras.main.setDeadzone(210, 150)
    this.cameras.main.setZoom(0.92)
  }

  drawWorld() {
    drawCityGround(this)
    drawRoadNetwork(this, this.zones)

    this.add
      .text(46, 42, 'ACTUARIAL CITY', {
        color: '#e6f8ff',
        fontFamily: 'Inter, Arial, sans-serif',
        fontSize: '28px',
        fontStyle: '900',
        stroke: '#06142e',
        strokeThickness: 5,
      })
      .setAlpha(0.92)
      .setScrollFactor(1)

    this.createAmbientParticles()
  }

  createAmbientParticles() {
    this.particles = []
    for (let index = 0; index < 38; index += 1) {
      const dot = this.add.circle(
        Phaser.Math.Between(80, WORLD_SIZE.width - 80),
        Phaser.Math.Between(80, WORLD_SIZE.height - 80),
        Phaser.Math.Between(2, 4),
        0x8fdcff,
        0.24,
      )
      dot.speed = Phaser.Math.FloatBetween(0.25, 0.85)
      this.particles.push(dot)
    }
  }

  createZones() {
    this.zoneObjects = this.zones.map((zone) => drawBuilding(this, zone))
  }

  createCityProps() {
    this.cityProps = drawCityProps(this, this.zones)
  }

  createPlayer() {
    this.playerParts = createPlayerAvatar(this, PLAYER_START)
    this.playerContainer = this.playerParts.container
    this.redrawPlayer(false)
  }

  redrawPlayer(isMoving = false) {
    redrawPlayerAvatar({
      directionName: this.playerDirection,
      isMoving,
      parts: this.playerParts,
      scene: this,
    })
  }

  createControls() {
    this.cursors = this.input.keyboard?.createCursorKeys?.()
    this.keys = this.input.keyboard?.addKeys?.({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    })
  }

  activateZone(zone) {
    const zoneObject = this.zoneObjects?.find((item) => item.zone.id === zone.id)
    if (zoneObject) {
      this.tweens.add({
        duration: 130,
        ease: 'Back.easeOut',
        scale: 1.08,
        targets: zoneObject.container,
        yoyo: true,
      })
    }

    this.cameras.main.flash(130, 56, 189, 248, false)
    this.callbacks.onZoneActivate?.(zone.id)
  }

  update(_time, delta) {
    if (this.registry.get('panelOpen')) {
      this.redrawPlayer(false)
      return
    }

    this.updateParticles(delta)
    this.updateInteractionInput()
    this.updatePlayer(delta)
    this.updateNearbyZone()
  }

  updateInteractionInput() {
    const inputState = this.registry.get('inputState') ?? {}
    const isEnterPressed = Boolean(inputState.enter)

    if (isEnterPressed && !this.wasEnterPressed) {
      const nearbyZone = this.zones.find((zone) => zone.id === this.nearbyZoneId)
      if (nearbyZone) {
        this.activateZone(nearbyZone)
      }
    }

    this.wasEnterPressed = isEnterPressed
  }

  updateParticles(delta) {
    this.particles.forEach((dot) => {
      dot.y -= dot.speed * (delta / 16.67)
      dot.alpha = 0.14 + Math.abs(Math.sin((this.time.now + dot.x) / 1200)) * 0.28

      if (dot.y < 40) {
        dot.y = WORLD_SIZE.height - 40
      }
    })
  }

  updatePlayer(delta) {
    const vector = getMovementVector({
      cursors: this.cursors,
      inputState: this.registry.get('inputState'),
      keys: this.keys,
    })
    const isMoving = vector.x !== 0 || vector.y !== 0
    const distance = PLAYER_SPEED * (delta / 1000)
    const current = { x: this.playerContainer.x, y: this.playerContainer.y }
    const proposed = clampPosition({
      bounds: WORLD_SIZE,
      position: {
        x: current.x + vector.x * distance,
        y: current.y + vector.y * distance,
      },
    })

    const currentCollisions = this.zones.filter((zone) =>
      isPointInsideZone({ point: current, radius: PLAYER_RADIUS, zone }),
    )
    const proposedCollisions = this.zones.filter((zone) =>
      isPointInsideZone({ point: proposed, radius: PLAYER_RADIUS, zone }),
    )
    const collides = proposedCollisions.length > 0
    const onlyExistingCollisions = proposedCollisions.every((zone) =>
      currentCollisions.includes(zone),
    )
    const movingOutOfCollision =
      currentCollisions.length > 0 &&
      onlyExistingCollisions &&
      currentCollisions.every(
        (zone) =>
          getDistance(proposed, zone.position) >= getDistance(current, zone.position),
      )

    if (!collides || movingOutOfCollision) {
      this.playerContainer.setPosition(proposed.x, proposed.y)
    }

    this.playerDirection = getDirectionFromVector(vector, this.playerDirection)
    this.redrawPlayer(isMoving)
  }

  updateNearbyZone() {
    const nearbyZone = findNearbyZone({
      interactionDistance: INTERACTION_DISTANCE,
      playerPosition: {
        x: this.playerContainer.x,
        y: this.playerContainer.y,
      },
      zones: this.zones,
    })
    const nextZoneId = nearbyZone?.id ?? null

    if (nextZoneId === this.nearbyZoneId) return

    this.nearbyZoneId = nextZoneId
    this.callbacks.onZoneFocus?.(nextZoneId)

    this.zoneObjects.forEach(({ container, glow, roof, zone }) => {
      const isNearby = zone.id === nextZoneId
      glow.alpha = isNearby ? 1 : 0.55
      glow.setScale(isNearby ? 1.08 : 1)
      roof.alpha = isNearby ? 1 : 0.78
      this.tweens.add({
        duration: 160,
        ease: 'Sine.easeOut',
        scale: isNearby ? 1.035 : 1,
        targets: container,
      })
    })

    this.cityProps?.entranceMarkers?.forEach(({ color, container, glow }, zoneId) => {
      const isNearby = zoneId === nextZoneId
      container.setAlpha(isNearby ? 1 : 0.72)
      glow.clear()
      glow.fillStyle(color, isNearby ? 0.24 : 0.12)
      glow.fillEllipse(0, 8, isNearby ? 104 : 80, isNearby ? 44 : 34)
      this.tweens.add({
        duration: 180,
        ease: 'Sine.easeOut',
        scale: isNearby ? 1.18 : 1,
        targets: container,
      })
    })
  }
}
