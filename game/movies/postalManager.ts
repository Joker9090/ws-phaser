import Phaser from "phaser";
import CinematographyModular from "@/game/movies/Cinematography-modular";
import Ticker, { TickerJob } from "./Ticker";
import BetweenScenes, { BetweenScenesStatus } from "@/game/BetweenScenes";


class postalManager {
    ticker: Ticker;
    cine: CinematographyModular
    nextCine: boolean = false;
    postal: string;
    nextLevel: number;
    container?: Phaser.GameObjects.Container;
    // controllers
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;


    constructor(cine: CinematographyModular, postal: string, nextLevel: number) {
        this.cine = cine
        this.postal = postal
        this.nextLevel = nextLevel
        const tickerMS = 100;
        this.ticker = new Ticker(tickerMS);
        this.playCine()
    }



    playCine(this: postalManager) {

        this.cine.time.addEvent({
            delay: this.ticker.ms,
            callback: this.ticker.runTicker,
            loop: true,
        });

        const middlePoint = {
            x: this.cine.cameras.main.displayWidth / 2,
            y: this.cine.cameras.main.displayHeight / 2,
        };

        const gameObjectScaler = {
            x: window.innerWidth / 1920,
            y: window.innerHeight / 927,
        };

        const background = this.cine.add.image(0, 0, this.postal).setOrigin(0.5);

        // panelControl


        // dark mas over all scene
        const darkMask = this.cine.add.rectangle(
            0,
            0,
            window.innerWidth,
            window.innerHeight,
            0,
            0.3
        );

        const assetsScenes = [
            background,
            darkMask,
        ];

        this.container = this.cine.add
            .container(middlePoint.x, middlePoint.y)
            .setSize(1920, 927);
        this.container.add(assetsScenes);
        this.container.setScale(
            gameObjectScaler.x < gameObjectScaler.y
                ? gameObjectScaler.y
                : gameObjectScaler.x
        );
        const cameraDialogue = this.cine.cameras.add(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );
        cameraDialogue.ignore(this.container);

        const camera = this.cine.cameras.main;
        camera.postFX.addVignette(0.5, 0.5, 0.8);


        this.ticker.addJob(
            new TickerJob(
                1,
                10,
                () => { },
                false,
                8000,
                true,
                (job: TickerJob) => {
                    this.nextCine = true;
                }
            )
        );
    }

    makeTransition(sceneName: string, data: any) {
        const getBetweenScenesScene = this.cine.game.scene.getScene(
            "BetweenScenes"
        ) as BetweenScenes;
        if (getBetweenScenesScene) {
            if (getBetweenScenesScene.status != BetweenScenesStatus.IDLE)
                return false;
            getBetweenScenesScene.changeSceneTo(sceneName, data);
            this.cine.time.delayedCall(1000, () => {
                this.cine.scene.stop();
            });
        } else {
            this.cine.scene.start(sceneName, data);
            this.cine.time.delayedCall(1000, () => {
                this.cine.scene.stop();
            });
        }
    }

    update(this: postalManager, time: number, delta: number) {
        if (this.nextCine) this.makeTransition("Game", { level: this.nextLevel, lifes: 3 });

    }
}

export default postalManager;




