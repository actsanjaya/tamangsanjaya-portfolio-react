import Phaser from 'phaser'
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
import roadCorner from '../../../../assets/gaming/road-corner.png'
import roadHorizontal from '../../../../assets/gaming/road-horizontal.png'
import roadIntersection from '../../../../assets/gaming/road-intersection.png'
import roadTJunction from '../../../../assets/gaming/road-t-junction.png'
import roadTile from '../../../../assets/gaming/road-tile.png'
import roadVertical from '../../../../assets/gaming/road-vertical.png'

export const GAME_ASSET_KEYS = {
  automationFactoryBuilding: 'building-automation-factory',
  contactOfficeBuilding: 'building-contact-office',
  dashboardStudioBuilding: 'building-dashboard-studio',
  groundTile: 'ground-tile',
  homeBaseBuilding: 'building-home-base',
  playerIdle: 'player-idle',
  projectHubBuilding: 'building-project-hub',
  ragLibraryBuilding: 'building-rag-library',
  roadCorner: 'road-corner',
  roadHorizontal: 'road-horizontal',
  roadIntersection: 'road-intersection',
  roadTJunction: 'road-t-junction',
  roadTile: 'road-tile',
  roadVertical: 'road-vertical',
  skillsLabBuilding: 'building-skills-lab',
  valuationTowerBuilding: 'building-valuation-tower',
}

export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene')
  }

  preload() {
    this.load.image(GAME_ASSET_KEYS.automationFactoryBuilding, automationFactoryBuilding)
    this.load.image(GAME_ASSET_KEYS.contactOfficeBuilding, contactOfficeBuilding)
    this.load.image(GAME_ASSET_KEYS.dashboardStudioBuilding, dashboardStudioBuilding)
    this.load.image(GAME_ASSET_KEYS.groundTile, groundTile)
    this.load.image(GAME_ASSET_KEYS.homeBaseBuilding, homeBaseBuilding)
    this.load.image(GAME_ASSET_KEYS.playerIdle, playerIdle)
    this.load.image(GAME_ASSET_KEYS.projectHubBuilding, projectHubBuilding)
    this.load.image(GAME_ASSET_KEYS.ragLibraryBuilding, ragLibraryBuilding)
    this.load.image(GAME_ASSET_KEYS.roadCorner, roadCorner)
    this.load.image(GAME_ASSET_KEYS.roadHorizontal, roadHorizontal)
    this.load.image(GAME_ASSET_KEYS.roadIntersection, roadIntersection)
    this.load.image(GAME_ASSET_KEYS.roadTJunction, roadTJunction)
    this.load.image(GAME_ASSET_KEYS.roadTile, roadTile)
    this.load.image(GAME_ASSET_KEYS.roadVertical, roadVertical)
    this.load.image(GAME_ASSET_KEYS.skillsLabBuilding, skillsLabBuilding)
    this.load.image(GAME_ASSET_KEYS.valuationTowerBuilding, valuationTowerBuilding)
  }

  create() {
    this.scene.start('WorldScene')
  }
}
