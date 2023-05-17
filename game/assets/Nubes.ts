import Phaser from "phaser";

class Nube extends Phaser.Physics.Arcade.Sprite {
  sprite: Phaser.GameObjects.Sprite
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, scale?: number, mirrorX: boolean) {
    super(scene, x, y, texture, scale)

    scene.add.existing(this)
    // Agregar el Nube al mundo fisico
    //scene.physics.add.existing(this)
    //this.setCollideWorldBounds(true);
    this.setDepth(3);
    this.sprite = scene.add.sprite(x,y,texture).setScale(scale).setFlipX(mirrorX)
  }
}

export default Nube