import Phaser from "phaser";

// Scene in class
class TextBox extends Phaser.GameObjects.Container {
  rectanguleText?: Phaser.GameObjects.Sprite;
  tutorialText?: Phaser.GameObjects.Text;
  widthText: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    widthText: number
  ) {
    super(scene);
    this.scene = scene;
    this.widthText = widthText;
    /* TEXT BOX */
    this.tutorialText = this.scene.add
      .text(0, 0, "", {
        fontFamily: "Arcade",
        fontSize: "30px",
        wordWrap: { width: widthText, useAdvancedWrap: true },
      })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(200);

    /* HEIGHT OF TEXT */
    const textHeight = this.tutorialText.height;
    /* DIMENSIONS OF SPRITE BOX */
    const spriteHeight = 120;
    const spriteWidth = 570;

    /* SIZE OF BOX WITH TEXT */
    const boxWidth = widthText / spriteWidth;
    const boxHeight = textHeight / spriteHeight;
    this.rectanguleText = this.scene.add
      .sprite(0, 0, texture)
      .setScrollFactor(0)
      .setDepth(190)
      .setScale(boxWidth, boxHeight);
    this.add([this.rectanguleText, this.tutorialText]);
    this.setDepth(210);
    scene.add.existing(this);
    this.setPosition(x, y);
    this.setVisible(false);
    //window.test = this
  }

  setTextBox(textToDisplay: string) {
    if (this.tutorialText) {
      this.tutorialText?.setText(textToDisplay);
      const textHeight = this.tutorialText.height;
      const spriteHeight = 120;
      const spriteWidth = 500;
      const boxWidth = this.widthText / spriteWidth;
      const boxHeight = textHeight / spriteHeight;
      this.rectanguleText?.setScale(boxWidth, boxHeight);
    }
  }
}
export default TextBox;
