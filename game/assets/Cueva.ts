import Phaser from "phaser";

class Cueva extends Phaser.Physics.Arcade.Sprite {
  sprite: Phaser.GameObjects.Sprite
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, textureB: string) {
    super(scene, x, y, texture)

    scene.add.existing(this)
    // Agregar Cueva al mundo fisico
    scene.physics.add.existing(this)

    //this.setCollideWorldBounds(true);
    this.setDepth(8);
    this.sprite = scene.add.sprite(x+10,y-70,textureB).setScale(0.2).setDepth(9)
  }
}

export default Cueva