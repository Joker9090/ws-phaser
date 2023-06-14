import Phaser from "phaser";
import Game from "./Scene4";

class Menu extends Phaser.Scene {
    private score?: number;
    private message: string;
    otherScene?: Phaser.Scene;

    constructor(score: number, message: string, otherScene?: Phaser.Scene) {
        super({ key: "Menu" });
        this.score = score;
        this.message = message;
        this.otherScene = otherScene
    }

    create(a: { scene: Game, score: number }) {
        const y = this.cameras.main.height / 2;
        const x = this.cameras.main.width / 2;
        const width = 300;
        const height = 50;

        console.log(a, "AB")

        var text = this.add.text(x - 5, y + 50, 'Reset', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5).setDepth(3);
        var text = this.add.text(x - 5, y - 130, 'GAME OVER', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5).setDepth(3);

        var text = this.add.text(x - 10, y - 50, `FInal Score:${a.score}`, {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5).setDepth(3);

        var rect = this.add.rectangle(x - 5, y + 50, width, height, 246390).setDepth(2);
        rect.setStrokeStyle(2, 0xffffff);
        this.add.image(x, y, "menu").setScale(2);
        console.log(this.scene.restart, "otherscene")

        rect.setInteractive();
        rect.on("pointerup", () => {
            this.scene.stop("Menu")
            a.scene.restart()
            
            console.log("restart")
        });
    }
}

export default Menu;
