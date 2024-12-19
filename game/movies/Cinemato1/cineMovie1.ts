import Phaser from "phaser";
import Ticker, { TickerJob } from "../Ticker";
import DialogueManager from "../DialogueManager";
import CinematographyModular from "@/game/movies/Cinematography-modular";

class cineMovie1 {
    ticker: Ticker;
    cine: CinematographyModular;
    nextCine: boolean = false;
    dialogue?: DialogueManager;
    //assets
    backgroundCine1?: Phaser.GameObjects.Image;
    starsBackground?: Phaser.GameObjects.Image;
    nightSkyBg?: Phaser.GameObjects.Image;
    naveWithLights?: Phaser.GameObjects.Image;
    naveSinLights?: Phaser.GameObjects.Image;
    nubeBg1?: Phaser.GameObjects.Image;
    nubeBg2?: Phaser.GameObjects.Image;
    nubeBg3?: Phaser.GameObjects.Image;
    nubeCielo?: Phaser.GameObjects.Image;
    // controllers
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(cine: CinematographyModular) {
        this.cine = cine;
        const tickerMS = 100;
        this.ticker = new Ticker(tickerMS);
        this.playCine();
        // music
        this.cine.sound.add("C2_1").setVolume(0.25).play()

    }

    playCine(this: cineMovie1) {

        this.cine.time.addEvent({
            delay: this.ticker.ms,
            callback: this.ticker.runTicker,
            loop: true,
        });

        this.cursors = this.cine.input.keyboard?.createCursorKeys();

        const middlePoint = {
            x: this.cine.cameras.main.displayWidth / 2,
            y: this.cine.cameras.main.displayHeight / 2,
        };

        const gameObjectScaler = {
            x: window.innerWidth / 1920,
            y: window.innerHeight / 927,
        };

        this.nightSkyBg = this.cine.add.image(0, 0, "nightSkyBg").setOrigin(0.5)
        this.starsBackground = this.cine.add.image(0, 0, "starsBackground").setOrigin(0.5)
        this.nubeCielo = this.cine.add.image(-500, 0, "nubeCielo").setOrigin(0.5).setScale(2, 1)
        this.nubeBg3 = this.cine.add.image(-250, middlePoint.y - 200, "nubeBg3").setOrigin(0.5, 1).setScale(1.3)
        this.nubeBg2 = this.cine.add.image(100, middlePoint.y - 200, "nubeBg2").setOrigin(0.5, 1).setScale(1.3)
        this.nubeBg1 = this.cine.add.image(-200, middlePoint.y - 200, "nubeBg1").setOrigin(0.5, 1).setScale(1.5)
        this.backgroundCine1 = this.cine.add.image(0, middlePoint.y + 150, "backgroundCine1").setOrigin(0.5, 1)
        this.naveSinLights = this.cine.add.image(0, 0, "naveSinLights").setOrigin(0.5).setScale(0.8)
        this.naveWithLights = this.cine.add.image(0, 0, "naveWithLights").setOrigin(0.5).setAlpha(0).setScale(0.8)

        const darkMask = this.cine.add.rectangle(
            0,
            0,
            window.innerWidth*2,
            window.innerHeight*2,
            0,
            0.3
        ).setOrigin(0.5);

        const gameObjects = [
            this.nightSkyBg,
            this.starsBackground,
            this.nubeCielo,
            this.nubeBg3,
            this.nubeBg2,
            this.nubeBg1,
            this.backgroundCine1,
            this.naveWithLights,
            this.naveSinLights,
            darkMask
        ];


        const container = this.cine.add
            .container(middlePoint.x, middlePoint.y)
            .setSize(1920, 927);
        container.add(gameObjects)
        container.setScale(
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
        cameraDialogue.ignore(container);

        const camera = this.cine.cameras.main;
        camera.postFX.addVignette(0.5, 0.5, 0.8);

        const part1 = (job: TickerJob) => {
            this.dialogue = new DialogueManager(
                this.cine,
                ["This energy source is amazing!"],
                [""],
                [
                    {
                        delay: 1000,
                        withTapping: {
                            audios: ["key01", "key01", "key02"],
                            count: 12,
                            delay: 180,
                        },
                        keepAlive: 1250,
                        position: {
                            width: 600
                        }
                    },
                ],
                80
            );
            this.dialogue?.play();


            const dialogueListener = (newState: string, nextText?: string) => {
                if (newState === "CONTINUE") {
                } else if (newState === "FINISHED") {
                    this.ticker.deleteJob(job.id);
                }
            };
            this.dialogue?.killState(dialogueListener);
            this.dialogue?.getState(dialogueListener);
            this.cine.tweens.add({
                targets: [camera],
                zoom: 1.15,
                duration: 30000,
                ease: "ease",
            });
            this.cine.tweens.add({
                targets: [this.starsBackground],
                scale: 1.15,
                duration: 30000,
                ease: "ease",
            });
            this.cine.tweens.add({
                targets: [this.naveWithLights],
                alpha: 0.7,
                duration: 2500,
                ease: "ease",
                loop: -1,
                yoyo: true
            });


            this.cine.tweens.add({
                targets: [this.nubeCielo],
                x: 500,
                duration: 30000,
                ease: "linear",
            });

            this.cine.tweens.add({
                targets: [this.nubeBg1, this.nubeBg3],
                x: 250,
                duration: 50000,
                ease: "linear",
            });

            this.cine.tweens.add({
                targets: [this.nubeBg2],
                x: -250,
                duration: 50000,
                ease: "linear",
            });

        };

        this.ticker.addJob(
            new TickerJob(1, 10, part1, false, undefined, true, (job: TickerJob) => {
                // soundChangeScene.stop()
                this.nextCine = true;
            })
        );
    }

    update(this: cineMovie1, time: number, delta: number) {
        if (this.dialogue) this.dialogue.update();
        if (this.nextCine) this.cine.scene.restart({ keyname: "cine_movie_2" });
    }
}

export default cineMovie1;
