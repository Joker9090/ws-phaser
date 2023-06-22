import Phaser from "phaser";
import player from "./assets/Player";
import SceneEvents from "./events/EventCenter";

class Ui extends Phaser.Scene {
  hearts?: Phaser.GameObjects.Group
  quantity: number = 2
  currentIndex: number = 0;
  constructor() {
    super({ key: "Ui" })
  }

  create() {
    this.currentIndex = 0;
    this.hearts = this.add.group({ classType: Phaser.GameObjects.Image })
    const width = this.game.canvas.getBoundingClientRect().width
    const height = this.game.canvas.getBoundingClientRect().height
    this.hearts.createMultiple({
      key: "fullHeart",
      setXY: { x: width / 30, y: height / 40, stepX: 36 },
      quantity: 2,
      setScale: { x: 2.5, y: 2.5 },
    })
    const menuButton = this.add.image(width - 60, height / 26, "menuButton").setDepth(2).setScale(0.7).setInteractive()
    const iconBG = this.add.image(width - 60, height / 26, "iconBG").setInteractive()

    menuButton.on("pointerdown", () => {
      console.log("Menu button clicked!");
    });

    iconBG.on("pointerdown", () => {
      console.log("iconBG clicked!");
    });
    const updateHealth = (health: number) => {
      if (this.hearts) {
        const hearts = this.hearts.getChildren();
        for (let index = 0; index < hearts.length; index++) {
          const heart = hearts[index] as Phaser.GameObjects.Image;
          if (index >= health) heart.setTexture("emptyHeart");
          else heart.setTexture("fullHeart");
        }
      }
    };

    SceneEvents.on("updateHealth", updateHealth, this)

  }

}

export default Ui


// tinte corazon perdido
// hearts.setTint(681995)