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
    this.setDepth(8);
    this.sprite = scene.add.sprite(x,y, texture, frame)

  }

  createFireworks(scene: Phaser.Scene) {

    const FireworksFrames = scene.anims.generateFrameNumbers("firework")

    const fireworksConfig = {
      key: "fireworksFrames",
      frames: {
        start: 0,
        end: 29 },
      //frameRate: 30,
      repeat: 0,
    }

  }
}

export default Fireworks