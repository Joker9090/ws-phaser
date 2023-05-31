import Phaser, { Physics } from "phaser";
import Health, { HealthConfig } from "./Health";

export type UiModelConfig = {
  textureA: string,
  sceneWidth: number,
  sceneHeight: number,
  large?: number,
}
// Scene in class
class UiModel extends Phaser.GameObjects.Container {
  scene: Phaser.Scene;
  group: Phaser.Physics.Arcade.Group;
  constructor(scene: Phaser.Scene, config: UiModelConfig, group: Phaser.Physics.Arcade.Group) {
    super(scene, config.sceneWidth, config.sceneHeight)
    this.scene = scene;
    this.group = group;
    const width = config.sceneWidth / 4;
    const height = config.sceneHeight / 4;

    const barContainer = this.scene.add.sprite(config.sceneWidth, config.sceneHeight,config.textureA)




    scene.add.existing(this);
    //this.group.add(this)
        
    
  }
}
export default UiModel