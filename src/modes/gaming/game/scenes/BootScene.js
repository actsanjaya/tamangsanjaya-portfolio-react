import Phaser from 'phaser'
import bench from '../../../../assets/gaming/bench.png'
import automationFactoryBuilding from '../../../../assets/gaming/building-automation-factory.png'
import contactOfficeBuilding from '../../../../assets/gaming/building-contact-office.png'
import dashboardStudioBuilding from '../../../../assets/gaming/building-dashboard-studio.png'
import homeBaseBuilding from '../../../../assets/gaming/building-home-base.png'
import projectHubBuilding from '../../../../assets/gaming/building-project-hub.png'
import ragLibraryBuilding from '../../../../assets/gaming/building-rag-library.png'
import skillsLabBuilding from '../../../../assets/gaming/building-skills-lab.png'
import valuationTowerBuilding from '../../../../assets/gaming/building-valuation-tower.png'
import groundTile from '../../../../assets/gaming/ground-tile.png'
import playerIdle from '../../../../assets/gaming/player-idle.png'
import playerWalk1 from '../../../../assets/gaming/player-walk-1.png'
import playerWalk2 from '../../../../assets/gaming/player-walk-2.png'
import playerWalk3 from '../../../../assets/gaming/player-walk-3.png'
import playerWalk4 from '../../../../assets/gaming/player-walk-4.png'
import portalMarker from '../../../../assets/gaming/portal-marker.png'
import roadCorner from '../../../../assets/gaming/road-corner.png'
import roadHorizontal from '../../../../assets/gaming/road-horizontal.png'
import roadIntersection from '../../../../assets/gaming/road-intersection.png'
import roadTJunction from '../../../../assets/gaming/road-t-junction.png'
import roadTile from '../../../../assets/gaming/road-tile.png'
import roadVertical from '../../../../assets/gaming/road-vertical.png'
import streetLamp from '../../../../assets/gaming/street-lamp.png'
import tree from '../../../../assets/gaming/tree.png'

export const GAME_ASSET_KEYS = {
  bench: 'bench',
  automationFactoryBuilding: 'building-automation-factory',
  contactOfficeBuilding: 'building-contact-office',
  dashboardStudioBuilding: 'building-dashboard-studio',
  groundTile: 'ground-tile',
  homeBaseBuilding: 'building-home-base',
  playerIdle: 'player-idle',
  playerWalk1: 'player-walk-1',
  playerWalk2: 'player-walk-2',
  playerWalk3: 'player-walk-3',
  playerWalk4: 'player-walk-4',
  portalMarker: 'portal-marker',
  projectHubBuilding: 'building-project-hub',
  ragLibraryBuilding: 'building-rag-library',
  roadCorner: 'road-corner',
  roadHorizontal: 'road-horizontal',
  roadIntersection: 'road-intersection',
  roadTJunction: 'road-t-junction',
  roadTile: 'road-tile',
  roadVertical: 'road-vertical',
  skillsLabBuilding: 'building-skills-lab',
  streetLamp: 'street-lamp',
  tree: 'tree',
  valuationTowerBuilding: 'building-valuation-tower',
}

export const GAME_ANIMATION_KEYS = {
  playerWalk: 'player-walk',
}

export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene')
  }

  preload() {
    this.load.image(GAME_ASSET_KEYS.bench, bench)
    this.load.image(GAME_ASSET_KEYS.automationFactoryBuilding, automationFactoryBuilding)
    this.load.image(GAME_ASSET_KEYS.contactOfficeBuilding, contactOfficeBuilding)
    this.load.image(GAME_ASSET_KEYS.dashboardStudioBuilding, dashboardStudioBuilding)
    this.load.image(GAME_ASSET_KEYS.groundTile, groundTile)
    this.load.image(GAME_ASSET_KEYS.homeBaseBuilding, homeBaseBuilding)
    this.load.image(GAME_ASSET_KEYS.playerIdle, playerIdle)
    this.load.image(GAME_ASSET_KEYS.playerWalk1, playerWalk1)
    this.load.image(GAME_ASSET_KEYS.playerWalk2, playerWalk2)
    this.load.image(GAME_ASSET_KEYS.playerWalk3, playerWalk3)
    this.load.image(GAME_ASSET_KEYS.playerWalk4, playerWalk4)
    this.load.image(GAME_ASSET_KEYS.portalMarker, portalMarker)
    this.load.image(GAME_ASSET_KEYS.projectHubBuilding, projectHubBuilding)
    this.load.image(GAME_ASSET_KEYS.ragLibraryBuilding, ragLibraryBuilding)
    this.load.image(GAME_ASSET_KEYS.roadCorner, roadCorner)
    this.load.image(GAME_ASSET_KEYS.roadHorizontal, roadHorizontal)
    this.load.image(GAME_ASSET_KEYS.roadIntersection, roadIntersection)
    this.load.image(GAME_ASSET_KEYS.roadTJunction, roadTJunction)
    this.load.image(GAME_ASSET_KEYS.roadTile, roadTile)
    this.load.image(GAME_ASSET_KEYS.roadVertical, roadVertical)
    this.load.image(GAME_ASSET_KEYS.skillsLabBuilding, skillsLabBuilding)
    this.load.image(GAME_ASSET_KEYS.streetLamp, streetLamp)
    this.load.image(GAME_ASSET_KEYS.tree, tree)
    this.load.image(GAME_ASSET_KEYS.valuationTowerBuilding, valuationTowerBuilding)
  }

  create() {
    const walkFrameKeys = [
      GAME_ASSET_KEYS.playerWalk1,
      GAME_ASSET_KEYS.playerWalk2,
      GAME_ASSET_KEYS.playerWalk3,
      GAME_ASSET_KEYS.playerWalk4,
    ]
    const hasWalkFrames = walkFrameKeys.every((key) => this.textures.exists(key))

    if (hasWalkFrames && !this.anims.exists(GAME_ANIMATION_KEYS.playerWalk)) {
      this.anims.create({
        frameRate: 8,
        frames: walkFrameKeys.map((key) => ({ key })),
        key: GAME_ANIMATION_KEYS.playerWalk,
        repeat: -1,
      })
    }

    this.scene.start('WorldScene')
  }
}
