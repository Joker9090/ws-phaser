import Phaser from "phaser";
import MultiScene from "../MultiScene";

export default class WonClass {
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
        this.container = this.scene.add.container(window.innerWidth / 2, window.innerHeight / 2)
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

        const textWin = this.scene.add
            .text(0, 0, "¡congratulations, you've won!", { fontSize: "35px" })
            .setOrigin(0.5)
            .setScale(1);
        const textContinue = this.scene.add
            .text(0, 200, "Press SPACE to go to Menu", { fontSize: "22px" })
            .setOrigin(0.5)
            .setScale(1);
        this.container?.add([textWin, textContinue]);
    }

    update() {
        if (this.scene.cursors) {
            const space = this.scene.cursors.space;
            space.on("down", () => {
                this.scene.makeTransition("MultiScene", { text: "menu" });
            });
        }
    }
}
