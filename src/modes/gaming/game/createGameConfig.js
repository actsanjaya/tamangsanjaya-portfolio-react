import Phaser from 'phaser'
import { WORLD_SIZE, worldZones } from './data/worldZones.js'
import { BootScene } from './scenes/BootScene.js'
import { WorldScene } from './scenes/WorldScene.js'

export function createGameConfig({ callbacks, parent }) {
  const config = {
    type: Phaser.AUTO,
    parent,
    width: 1120,
    height: 680,
    backgroundColor: '#020817',
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
      },
    },
    scale: {
      mode: Phaser.Scale.RESIZE,
      parent,
      width: 1120,
      height: 680,
    },
    render: {
      antialias: true,
      pixelArt: false,
      roundPixels: false,
    },
    scene: [
      BootScene,
      new WorldScene({
        callbacks,
        zones: worldZones,
      }),
    ],
    title: 'Actuarial City',
    worldSize: WORLD_SIZE,
  }

  return {
    config,
    create: () => new Phaser.Game(config),
  }
}
