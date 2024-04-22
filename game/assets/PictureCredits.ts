import Phaser from "phaser";

// Scene in class
class PictureCredits extends Phaser.GameObjects.Container {
  pictureBox?: Phaser.GameObjects.Sprite;
  picture?: Phaser.GameObjects.Sprite;
  scaleBox?: number;
  randomNumber: number = 0.3;
  progress: number = 0;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    textureBox: string | Phaser.Textures.Texture,
    scaleBox: number,
    fix?: { x: number, y: number },
  ) {
    super(scene);
    this.scene = scene;
    this.progress = 0;
    this.scaleBox = scaleBox;
    this.randomNumber = this.randomProp();
    this.pictureBox = this.scene.add
      .sprite(0, 0, "personRing")
      .setOrigin(0.5);
    if (fix) {
      this.picture = this.scene.add.sprite(fix.x, fix.y, texture).setOrigin(0.5);
    } else {
      this.picture = this.scene.add.sprite(0, 0, texture).setOrigin(0.5);
    }
    this.add([this.picture, this.pictureBox]);
    scene.add.existing(this);
    this.setPosition(x, y);

    const portFrames = this.scene.anims.generateFrameNumbers("personRing", {
      frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
    })
    const portAnimConfig = {
      key: "personRing",
      frames: portFrames,
      frameRate: 24,
      repeat: -1
    }
    this.pictureBox.anims.create(portAnimConfig);
    this.pictureBox.anims.play("personRing", true)
  }
  update() {
    // if (this.pictureBox) {
    //   if (this.randomNumber) {
    //     this.progress += (Math.PI / 1000) * this.randomNumber;
    //     this.pictureBox.setRotation(this.progress);
    //   }
    // }
  }

  randomProp() {
    return window.Phaser.Math.Between(6, 9) / 10;
  }
}
export default PictureCredits;
