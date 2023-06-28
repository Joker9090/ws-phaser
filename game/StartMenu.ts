import Phaser from "phaser";
import Game from "./Scene4";

class StartMenu extends Phaser.Scene {
    private score?: number;
    private message: string;
    otherScene?: Phaser.Scene;

    constructor(score: number, message: string, otherScene?: Phaser.Scene) {
        super({ key: "StartMenu" });
        this.score = score;
        this.message = message;
        this.otherScene = otherScene
    }

    create(a: { scene: Game, score: number }) {
        const y = this.cameras.main.height / 2;
        const x = this.cameras.main.width / 2;
        const width = 300;
        const height = 50;


        var text = this.add.text(x - 20, y - 250, 'Who tf keeps throwing saws at me', {
            fontSize: '34px',
            fontFamily: 'Arial',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5).setDepth(10);

        

        var text = this.add.text(x , y - 220, 'and the quest to find out why a robot picks up diamonds', {
            fontSize: '15px',
            fontFamily: 'Arial',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5).setDepth(10);

        var text = this.add.text(x - 5, y - 150, 'Warning!', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#B40404',
            align: 'center',
        }).setOrigin(0.5).setDepth(3);

        var text = this.add.text(x - 5, y - 120, 'Some cases may require a resolution change from your part', {
            fontSize: '14px',
            fontFamily: 'Arial',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5).setDepth(3);
        // var text = this.add.text(x - 10, y - 50, `FInal Score:${a.score}`, {
        //     fontSize: '24px',
        //     fontFamily: 'Arial',
        //     color: '#ffffff',
        //     align: 'center'
        // }).setOrigin(0.5).setDepth(3);
        var logo = this.add.image(x -100, y + 140, "logo").setScale(0.05).setDepth(10)

        var text = this.add.text(x + 100, y + 190, 'Start Game', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5).setDepth(3);
        var rect = this.add.rectangle(x + 100, y + 190, width / 2, height, 246390).setDepth(2);
        rect.setStrokeStyle(2, 0xffffff);
        this.add.image(x, y, "menu").setScale(2.9);
        console.log(this.scene.restart, "otherscene")


        // var rect = this.add.rectangle(x - 10, y -50, width *1.3, height +60, 0xff0000,0.3).setDepth(2);


        var text = this.add.text(x + 5, y + 30, 'Use up and down cursor keys to change direction '
            , {
                fontSize: '17px',
                fontFamily: 'Arial',
                color: '#ffffff',
                align: 'center'
            }).setOrigin(0.5).setDepth(3);
        var text = this.add.text(x + 5, y + 60, 'Use P to pause '
            , {
                fontSize: '17px',
                fontFamily: 'Arial',
                color: '#ffffff',
                align: 'center'
            }).setOrigin(0.5).setDepth(3);


        rect.setInteractive();
        rect.on("pointerup", () => {
            this.scene.stop("StartMenu")
            this.scene.run("Game")
        });
    }
}

export default StartMenu;
