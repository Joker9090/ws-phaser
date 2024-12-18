import Phaser from "phaser";
import Game from "../Game";
import Floor, { FloorConfig } from "./Floor";

export type ChangeCameraFloorAreaConfig = {
    x: number
    y: number
    width: number
    height: number
}
// Scene in class
class ChangeCameraFloorArea extends Phaser.GameObjects.Rectangle {
scene: Game;
  constructor(
    scene: Game,
    config: ChangeCameraFloorAreaConfig,
    group: Phaser.Physics.Arcade.Group,

) {
      super(scene, config.x, config.y, config.width, config.height, 0x000000);
      this.scene = scene;
      this.setAlpha(0.3);
      group.add(this)
      this.scene.add.existing(this);
  }

}
export default ChangeCameraFloorArea;
