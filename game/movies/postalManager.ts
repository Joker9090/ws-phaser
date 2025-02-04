import Phaser from "phaser";
import CinematographyModular from "@/game/movies/Cinematography-modular";
import Ticker, { TickerJob } from "./Ticker";
import BetweenScenes, { BetweenScenesStatus } from "@/game/BetweenScenes";
import TextBox from "../assets/TextBox";
import MultiScene from "../MultiScene";


class postalManager {
    ticker: Ticker;
    cine: CinematographyModular
    nextCine: boolean = false;
    postal: string;
    code?: TextBox;
    codeString?:string
    nextLevel: number;
    lifes: number;
    container?: Phaser.GameObjects.Container;
    codeVisible: boolean = true;
    // controllers
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;


    constructor(cine: CinematographyModular, postal: string, nextLevel: number, lifes?: number, code?:string, loadKey?: string ) {
        this.cine = cine
        this.postal = postal
        this.nextLevel = nextLevel
        this.lifes = lifes ? lifes : 3
        this.codeString= code
        
        const tickerMS = 100;
        this.ticker = new Ticker(tickerMS);
        this.playCine()
    }



    playCine(this: postalManager) {
        this.cine.sound.add("introSoundEffect4").setVolume(0.4).play()
        this.cine.time.addEvent({
            delay: this.ticker.ms,
            callback: this.ticker.runTicker,
            loop: true,
        });

        const middlePoint = {
            x: this.cine.cameras.main.displayWidth / 2,
            y: this.cine.cameras.main.displayHeight / 2,
        };

        this.cursors = this.cine.input.keyboard?.createCursorKeys();

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
            window.innerWidth*2,
            window.innerHeight*2,
            0,
            0
        );

        this.code = new TextBox(this.cine, "Save this code to keep track of your progress: " + this.codeString, 0, 0, 500)
        const midScreen = {
            x: this.code.width / -2,
            y: this.code.height / -2
        }
        this.code.setPosition(midScreen.x , midScreen.y)

        const assetsScenes = [
            background,
            darkMask,
            this.code
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
        // camera.postFX.addVignette(0.5, 0.5, 0.8);


        this.ticker.addJob(
            new TickerJob(
                1,
                10,
                () => { },
                false,
                undefined,
                true,
                (job: TickerJob) => {
                }
            )
        );
    }



    update(this: postalManager, time: number, delta: number) {
        if (this.nextCine) {
            const multiScene = new MultiScene("Game", { level: this.nextLevel, lifes: this.lifes});
            const scene = this.cine.scene.add("MultiScene", multiScene, true);
            this.cine.scene.start("MultiScene").bringToTop("MultiScene");
          }
        if (this.codeVisible) {
            if (this.cursors?.space.isDown) this.code?.setVisible(false)
        } 
    }
}

export default postalManager;




