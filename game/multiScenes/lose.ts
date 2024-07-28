import Phaser from "phaser";
import MultiScene from "../MultiScene";

export default class LoseClass {
  container?: Phaser.GameObjects.Container;
  background?: Phaser.GameObjects.Image;
  background2?: Phaser.GameObjects.Image;
  background3?: Phaser.GameObjects.Image;
  background4?: Phaser.GameObjects.Image;
  background5?: Phaser.GameObjects.Image;
  background6?: Phaser.GameObjects.Image;

  scene: MultiScene;

  constructor(scene: MultiScene) {
    this.scene = scene
    this.createContainer()
}


  createContainer() {
    /* Audio */

    this.container = this.scene.add.container(0, 0).setDepth(999);
    this.background = this.scene.add
      .image(this.scene.cameras.main.displayWidth / 2, this.scene.cameras.main.displayHeight / 2, "newBg1")
      .setOrigin(0.5, 0.5).setScale(1);
    this.background2 = this.scene.add
      .image(this.scene.cameras.main.displayWidth / 2, this.scene.cameras.main.displayHeight / 2, "newBg2")
      .setOrigin(0.5, 0.5).setScale(1);
    this.background3 = this.scene.add
      .image(this.scene.cameras.main.displayWidth / 2, this.scene.cameras.main.displayHeight / 2, "newBg3")
      .setOrigin(0.5, 0.5).setScale(1);
    this.background4 = this.scene.add
      .image(this.scene.cameras.main.displayWidth / 2, this.scene.cameras.main.displayHeight / 2, "newBg4")
      .setOrigin(0.5, 0.5).setScale(1);
    this.background5 = this.scene.add
      .image(this.scene.cameras.main.displayWidth / 2, this.scene.cameras.main.displayHeight / 2, "newBg5")
      .setOrigin(0.5, 0.5).setScale(1);
    this.background6 = this.scene.add
      .image(this.scene.cameras.main.displayWidth / 2, this.scene.cameras.main.displayHeight / 2, "newBg6")
      .setOrigin(0.5, 0.5).setScale(1);
    const text1 = this.scene.add
      .text(0, 0, "You've lost! Try again!", { fontSize: "32px" })
      .setOrigin(0.5)
      .setScale(1);
    const text2 = this.scene.add
      .text(0, 200, "Press SPACE to play again", { fontSize: "22px" })
      .setOrigin(0.5)
      .setScale(1);
    this.container.add([text1, text2]);

  }

  update() {
    if (this.container) {
      if (this.scene.cameras.main) {
        this.container.setPosition(
          this.scene.cameras.main.width / 2,
          this.scene.cameras.main.height / 3
        );
        if (this.scene.cameras.main.width < this.scene.cameras.main.height) {
          this.container.setScale(
            this.scene.cameras.main.width / this.scene.cameras.main.height
          );
        }
      }
    }
    if (this.scene.cursors) {
      const space = this.scene.cursors.space;
      /*Space*/
      space.on("down", () => {
        //this.scene.start("Menu");
        this.scene.makeTransition("MultiScene", { text: "menu" });

      });
    }
  }
}
