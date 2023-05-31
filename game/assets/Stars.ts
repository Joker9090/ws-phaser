import Phaser from "phaser";

class Stars extends Phaser.Physics.Arcade.Sprite {
  sprite: Phaser.GameObjects.Sprite
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: number) {
    super(scene, x, y, texture, frame)

    scene.add.existing(this)
    // Agregar el Stars al mundo fisico
    //scene.physics.add.existing(this)

    //this.setCollideWorldBounds(true);
    this.createStars(scene);
    this.setDepth(14);
    this.sprite = scene.add.sprite(x,y, texture, frame)

  }

  playStars(callback: Function) {
    this.play("StarsAnim")
    this.scene.time.delayedCall(800, callback, [], this);
  }
  
  createStars(scene: Phaser.Scene) {

    const StarsFrames = this.scene.anims.generateFrameNumbers("stars", { start: 0, end: 6 })

    const StarsConfig = {
      key: "StarsAnim",
      frames: StarsFrames,
      //frameRate: 30,
      repeat: 0,
    }
    scene.anims.create(StarsConfig)


  }
}

export default Stars