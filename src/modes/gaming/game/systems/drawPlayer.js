import { GAME_ANIMATION_KEYS, GAME_ASSET_KEYS } from '../scenes/BootScene.js'

const PLAYER_SPRITE_SIZE = {
  height: 92,
  width: 70,
}

export function createPlayerAvatar(scene, start) {
  const container = scene.add.container(start.x, start.y)
  container.setDepth(2000)
  const hasPlayerAsset = scene.textures.exists(GAME_ASSET_KEYS.playerIdle)

  const trail = scene.add.graphics()
  const aura = scene.add.graphics()
  const shadow = scene.add.ellipse(0, 26, 54, 22, 0x000000, 0.36)
  const body = scene.add.graphics()
  const head = scene.add.graphics()
  const sprite = hasPlayerAsset
    ? scene.add
        .sprite(0, -12, GAME_ASSET_KEYS.playerIdle)
        .setDisplaySize(PLAYER_SPRITE_SIZE.width, PLAYER_SPRITE_SIZE.height)
    : null
  sprite?.setOrigin(0.5, 0.5)
  const direction = scene.add.triangle(0, -34, 0, -13, -10, 8, 10, 8, 0xf8fbff, 0.96)

  container.add([
    trail,
    aura,
    shadow,
    body,
    head,
    ...(sprite ? [sprite] : []),
    direction,
  ])

  return {
    aura,
    body,
    container,
    direction,
    head,
    shadow,
    sprite,
    trail,
    usesWalkAnimation: scene.anims.exists(GAME_ANIMATION_KEYS.playerWalk),
    usesSprite: hasPlayerAsset,
  }
}

export function redrawPlayerAvatar({ directionName, isMoving, parts, scene }) {
  const pulseScale = isMoving ? 1 + Math.sin(scene.time.now / 90) * 0.045 : 1

  parts.trail.clear()
  if (isMoving) {
    parts.trail.fillStyle(0x38bdf8, 0.1)
    parts.trail.fillEllipse(0, 30, 84, 28)
    parts.trail.lineStyle(2, 0x8fdcff, 0.16)
    parts.trail.strokeEllipse(0, 30, 104, 36)
  }

  parts.aura.clear()
  parts.aura.lineStyle(2, 0x38bdf8, isMoving ? 0.48 : 0.28)
  parts.aura.strokeCircle(0, 0, 35 * pulseScale)
  parts.aura.lineStyle(1, 0x8fdcff, 0.22)
  parts.aura.strokeCircle(0, 0, 45 * pulseScale)

  if (parts.usesSprite) {
    parts.body.clear()
    parts.head.clear()
    if (isMoving && parts.usesWalkAnimation) {
      if (
        !parts.sprite.anims.isPlaying ||
        parts.sprite.anims.currentAnim?.key !== GAME_ANIMATION_KEYS.playerWalk
      ) {
        parts.sprite.play(GAME_ANIMATION_KEYS.playerWalk)
      }
    } else {
      if (parts.sprite.anims.isPlaying) {
        parts.sprite.stop()
      }
      if (parts.sprite.texture.key !== GAME_ASSET_KEYS.playerIdle) {
        parts.sprite.setTexture(GAME_ASSET_KEYS.playerIdle)
      }
    }

    parts.sprite.setDisplaySize(
      PLAYER_SPRITE_SIZE.width * pulseScale,
      PLAYER_SPRITE_SIZE.height * pulseScale,
    )
    parts.sprite.setY(-12 + (isMoving ? Math.sin(scene.time.now / 110) * 2 : 0))
  } else {
    parts.body.clear()
    parts.body.fillStyle(0x0b63f6, 0.42)
    parts.body.fillRoundedRect(-15, -3, 30, 36, 14)
    parts.body.fillStyle(0x0b1b35, 0.92)
    parts.body.lineStyle(3, 0x8fdcff, 0.88)
    parts.body.fillRoundedRect(-13, -6, 26, 35, 12)
    parts.body.strokeRoundedRect(-13, -6, 26, 35, 12)
    parts.body.fillStyle(0xf8fbff, 0.85)
    parts.body.fillRoundedRect(-7, 3, 14, 4, 2)
    parts.body.fillStyle(0x111827, 0.9)
    parts.body.fillRoundedRect(-16, 24, 12, 8, 4)
    parts.body.fillRoundedRect(4, 24, 12, 8, 4)

    parts.head.clear()
    parts.head.fillStyle(0xf1c7a7, 1)
    parts.head.lineStyle(2, 0xf8fbff, 0.64)
    parts.head.fillCircle(0, -24, 16)
    parts.head.strokeCircle(0, -24, 16)
    parts.head.fillStyle(0x09090b, 0.96)
    parts.head.fillCircle(-6, -34, 8)
    parts.head.fillCircle(4, -36, 9)
    parts.head.fillRoundedRect(-11, -25, 22, 5, 3)
    parts.body.setScale(pulseScale)
    parts.head.setScale(pulseScale)
  }

  parts.direction.setRotation(
    {
      down: Math.PI,
      left: -Math.PI / 2,
      right: Math.PI / 2,
      up: 0,
    }[directionName],
  )
}
