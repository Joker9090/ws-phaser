import Phaser from "phaser";
import Ticker, { TickerJob } from "../Ticker";
import DialogueManager from "../DialogueManager";
import CinematographyModular from "@/game/movies/Cinematography-modular";

class cineMovie2 {
    ticker: Ticker;
    cine: CinematographyModular;
    nextCine: boolean = false;
    dialogue?: DialogueManager;
    //assets
    aroCondensadorBottom?: Phaser.GameObjects.Image;
    aroCondensadorTop?: Phaser.GameObjects.Image;
    brilloCondensador?: Phaser.GameObjects.Image;
    condensador?: Phaser.GameObjects.Image;
    CristalCondensador?: Phaser.GameObjects.Image;
    // controllers
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(cine: CinematographyModular) {
        this.cine = cine;
        const tickerMS = 100;
        this.ticker = new Ticker(tickerMS);
        this.playCine();
        this.cine.sound.add("C2_5").setVolume(0.25).play()
        this.cine.sound.add("C2_14").setVolume(0.25).play()

    }

    playCine(this: cineMovie2) {

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

        this.aroCondensadorBottom = this.cine.add.image(-20, -60, "aroCondensadorBottom").setOrigin(0.5)
        this.aroCondensadorTop = this.cine.add.image(-20, -60, "aroCondensadorTop").setOrigin(0.5)
        this.brilloCondensador = this.cine.add.image(0, -19, "brilloCondensador").setOrigin(0.5)
        this.condensador = this.cine.add.image(0, 0, "condensador").setOrigin(0.5)
        this.CristalCondensador = this.cine.add.image(0, 0, "CristalCondensador").setOrigin(0.5)

        const gameObjects = [
            this.condensador,
            this.aroCondensadorTop,
            this.CristalCondensador,
            this.aroCondensadorBottom,
            this.brilloCondensador,
        ];

        const darkMask = this.cine.add.rectangle(
            0,
            0,
            window.innerWidth,
            window.innerHeight,
            0,
        ).setAlpha(0.3);

        const container = this.cine.add
            .container(middlePoint.x, middlePoint.y)
            .setSize(1920, 927);

        container.add(gameObjects)

        container.add([
            darkMask,
        ]);

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
                [
                    "Come on! Please work...",
                    "Yeah! That's what I'm talking about"
                ],
                [""],
                [
                    {
                        delay: 1000,
                        withTapping: {
                            audios: ["key01", "key01", "key02"],
                            count: 12,
                            delay: 180,
                        },
                        keepAlive: 1000,
                        position: {
                            width: 600
                        }
                    },
                    {
                        delay: 1000,
                        withTapping: {
                            audios: ["key01", "key01", "key02"],
                            count: 15,
                            delay: 180,
                        },
                        keepAlive: 1000,
                        position: {
                            width: 700
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
                targets: [this.aroCondensadorBottom, this.aroCondensadorTop],
                y: 60,
                x: 40,
                duration: 2000,
                yoyo: true,
                ease: "expo.inout",
                loop: -1,
            });
            this.cine.tweens.add({
                targets: [camera],
                zoom: 1.3,
                duration: 20000,
                ease: "ease",
            });
            this.cine.tweens.add({
                targets: [darkMask],
                alpha: 1,
                delay: 7500,
                duration: 500,
                yoyo: false,
                ease: "ease",
                loop: 0,
            });
        };



        this.ticker.addJob(
            new TickerJob(1, 10, part1, false, undefined, true, (job: TickerJob) => {
                // soundChangeScene.stop()
                this.nextCine = true;
            })
        );
    }

    update(this: cineMovie2, time: number, delta: number) {
        if (this.dialogue) this.dialogue.update();
        if (this.nextCine) this.cine.scene.restart({ keyname: "cine_movie_3" });
    }
}

export default cineMovie2;
