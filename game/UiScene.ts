import Phaser from "phaser";
import player from "./assets/Player";
import SceneEvents from "./events/EventCenter";

class Ui extends Phaser.Scene {
    hearts?: Phaser.GameObjects.Group
    quantity: number = 2
    constructor() {
        super({ key: "Ui" })
    }

    create() {
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

        const updateHealth = () => {
            const hearts = this.hearts.getChildren() ; // Get an array of heart objects
            const fullHeartTexture = this.textures.get("fullHeart");
            const emptyHeartTexture = this.textures.get("emptyHeart");

            for (let i = 0; i < hearts.length; i++) {
                const heart = hearts[i];

                if (heart.texture.key === "fullHeart") {
                    heart.setTexture(emptyHeartTexture); // Change the texture to emptyHeart
                    break; // Change only one heart at a time
                }
            }

            // Check if all hearts are changed, then reset them back to fullHeart
            const allHeartsEmpty = hearts.every((heart) => heart.texture.key === "emptyHeart");

            if (allHeartsEmpty) {
                hearts.forEach((heart) => heart.setTexture(fullHeartTexture));
            }
        }


        SceneEvents.on("updateHealth", updateHealth, this)

    }

}

export default Ui


// tinte corazon perdido
// hearts.setTint(681995)