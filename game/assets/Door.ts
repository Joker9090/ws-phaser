import Phaser, { Physics } from "phaser";


// Scene in class
class Door extends Phaser.Physics.Arcade.Sprite {
  scene: Phaser.Scene;
  //group: Phaser.Physics.Arcade.Group;
  isActiveToTravel: boolean = false;
  constructor(scene: Phaser.Scene, x: number, y: number, sprite: string,isActiveToTravel: boolean ) {
    super(scene, x, y, sprite)
    this.scene = scene;
    //this.group = group;
    scene.add.existing(this);
    this.isActiveToTravel = isActiveToTravel;

    scene.physics.add.existing(this, true)
    //emmiter <-
    this.setPipeline('Light2D');
        
    
  }

}
export default Door