import Phaser from "phaser";

class Fireworks extends Phaser.Physics.Arcade.Sprite {
  sprite: Phaser.GameObjects.Sprite
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: number) {
    super(scene, x, y, texture, frame)

    scene.add.existing(this)
    // Agregar el Fireworks al mundo fisico
    //scene.physics.add.existing(this)

    //this.setCollideWorldBounds(true);
    this.createFireworks(scene);
    this.setDepth(14);
    this.sprite = scene.add.sprite(x,y, texture, frame)

  }

  playConfetti(callback: Function) {
    this.play("fireworksAnim")
    this.scene.time.delayedCall(800, callback, [], this);
  }
  
  createFireworks(scene: Phaser.Scene) {

    const FireworksFrames = scene.anims.generateFrameNumbers("firework",{ start: 0, end: 29 })

    const fireworksConfig = {
      key: "fireworksAnim",
      frames: FireworksFrames,
      //frameRate: 30,
      repeat: 0,
    }
    scene.anims.create(fireworksConfig)


  }
}

export default Fireworks