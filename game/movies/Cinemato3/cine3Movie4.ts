import Phaser from "phaser";
import Ticker, { TickerJob } from "../Ticker";
import DialogueManager from "../DialogueManager";
import CinematographyModular from "@/game/movies/Cinematography-modular";

class cine3Movie4 {
    ticker: Ticker;
    cine: CinematographyModular;
    nextCine: boolean = false;
    container?: Phaser.GameObjects.Container;
    dialogue?: DialogueManager;
    //assets
    astroC3S4?: Phaser.GameObjects.Image;
    astroFrontC4S4?: Phaser.GameObjects.Image;
    background1C3S4?: Phaser.GameObjects.Image;
    background2C3S4?: Phaser.GameObjects.Image;
    shipLightC3S4?: Phaser.GameObjects.Image;
    ship?: Phaser.GameObjects.Image;
    background1?: Phaser.GameObjects.Image;
    background2?: Phaser.GameObjects.Image;
    background3?: Phaser.GameObjects.Image;
    background4?: Phaser.GameObjects.Image;
    frontGround?: Phaser.GameObjects.Image;
    stars?: Phaser.GameObjects.Image;
    // controllers
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(cine: CinematographyModular) {
        this.cine = cine;
        const tickerMS = 100;
        this.ticker = new Ticker(tickerMS);
        this.playCine();
        // sound & music
        // setTimeout(() => {
        //     this.cine.sound.add("C2_7").setVolume(0.25).play()
        // }, 500)
        this.cine.sound.add("c3Radio2").setVolume(0.5).play()


    }

    stopDialogue() {
        this.dialogue?.stop();
        this.dialogue?.destroyContainer();
        this.dialogue = undefined;
    }

    playCine(this: cine3Movie4) {
        // START ticker
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
        this.astroC3S4 = this.cine.add
            .image(100, 100, "astroC3S4")
            .setOrigin(0.5)
            .setPosition(30, 0)
            .setAlpha(0);
        this.astroFrontC4S4 = this.cine.add
            .image(100, 100, "astroFrontC4S4")
            .setOrigin(0.5)
            .setPosition(30, 0);
      
        this.ship = this.cine.add
            .image(0, 0, "shipC3S4")
            .setOrigin(0.5)
        this.background1 = this.cine.add
            .image(0, 0, "backgroundPart1C3S4")
            .setOrigin(0.5)
        this.background2 = this.cine.add
            .image(0, 0, "backgroundPart2C3S4")
            .setOrigin(0.5)
        this.background3 = this.cine.add
            .image(0, 400, "backgroundPart3C3S4")
            .setOrigin(0.5)
        this.background4 = this.cine.add
            .image(0, 0, "backgroundPart4C3S4")
            .setOrigin(0.5)
        this.frontGround = this.cine.add
            .image(0,180, "frontGroundS3")
            .setOrigin(0.5)
        this.stars = this.cine.add
            .image(0, 0, "starsS3")
            .setOrigin(0.5)

        this.shipLightC3S4 = this.cine.add
            .image(0, 0, "shipLightC3S4")
            .setOrigin(0.5)

        const darkMask = this.cine.add.rectangle(
            0,
            0,
            window.innerWidth * 2,
            window.innerHeight * 2,
            0,
            0.3
        );

        const assetsScenes = [
            this.background4,
            this.stars,
            this.background1,
            this.background2,
            this.background3,
            this.frontGround,
            this.shipLightC3S4,
            this.ship,
            this.astroC3S4,
            this.astroFrontC4S4,
            darkMask
        ];

        // this.tintGroup(images)

        this.container = this.cine.add
            .container(middlePoint.x, middlePoint.y)
            .setSize(1920, 927);
        this.container.setScale(
            gameObjectScaler.x < gameObjectScaler.y
                ? gameObjectScaler.y
                : gameObjectScaler.x
        );
        this.container.add(assetsScenes);

        const cameraDialogue = this.cine.cameras.add(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );
        cameraDialogue.ignore(this.container);

        const camera = this.cine.cameras.main;
        // camera.postFX.addVignette(0.5, 0.5, 0.8);

        const part1 = (job: TickerJob) => {

            this.dialogue = new DialogueManager(
                this.cine,
                ["Wait... what?!"],
                [],//["intro1audio1"],
                [
                    {
                        delay: 0,
                        withTapping: {
                            audios: ["key01", "key01", "key02"],
                            count: 15,
                            delay: 180,
                        },
                        keepAlive: 1000,
                        position: {
                            width: 500
                        }
                    },
                ],
                90
            );
            this.dialogue?.play();

            this.cine.tweens.add({
                targets: [this.astroFrontC4S4],
                scale: 1,
                delay: 0,
                duration: 2500,
                onComplete: () => {
                    this.cine.tweens.add({
                        targets: [this.astroFrontC4S4],
                        alpha: 0,
                        delay: 0,
                        duration: 300,
                        ease: "ease",
                    });
                    this.cine.tweens.add({
                        targets: [this.astroC3S4],
                        alpha: 1,
                        delay: 0,
                        duration: 300,
                        ease: "ease",
                    });
                },
                ease: "bounce",
            });
            this.cine.tweens.add({
                targets:this.shipLightC3S4,
                alpha:0,
                duration:1000,
                yoyo:true,
                loop:-1
            })
            const dialogueListener = (newState: string, nextText?: string) => {
                if (newState === "CONTINUE") {
                } else if (newState === "FINISHED") {
                    this.ticker.deleteJob(job.id);
                }
            };
            this.dialogue?.killState(dialogueListener);
            this.dialogue?.getState(dialogueListener);
        };

        const part2 = (job: TickerJob) => {

            this.dialogue = new DialogueManager(
                this.cine,
                ["Dann!"],
                [""],
                [{
                    delay: 100,
                    withTapping: {
                        audios: ["key01", "key01", "key02"],
                        count: 5,
                        delay: 180,
                    },
                    keepAlive: 1500,
                    position: {
                        width: 300,
                    },

                }],
                80
            );
            this.dialogue?.play();

            this.cine.tweens.add({
                targets: [this.astroFrontC4S4],
                scale: 1,
                delay: 0,
                duration: 2000,
                onComplete: () => {
                    this.cine.tweens.add({
                        targets: [this.astroFrontC4S4],
                        alpha: 0,
                        delay: 0,
                        duration: 300,
                        ease: "ease",
                    });
                    this.cine.tweens.add({
                        targets: [this.astroC3S4],
                        alpha: 1,
                        delay: 0,
                        duration: 300,
                        ease: "ease",
                    });
                },
                ease: "bounce",
            });

            const dialogueListener = (newState: string, nextText?: string) => {
                if (newState === "CONTINUE") {
                } else if (newState === "FINISHED") {
                    this.ticker.deleteJob(job.id);
                }
            };
            this.dialogue?.killState(dialogueListener);
            this.dialogue?.getState(dialogueListener);
        };


        this.ticker.addJob(
            new TickerJob(1, 10, part1, false, 500, false, (job: TickerJob) => {
                this.ticker.addNextJob(
                    new TickerJob(
                        2,
                        10,
                        part2,
                        false,
                        undefined,
                        true,
                        (job: TickerJob) => {
                            this.nextCine = true
                        }
                    )
                );
            })
        );


    }

    update(this: cine3Movie4, time: number, delta: number) {
        if (this.dialogue) this.dialogue.update();
        if (this.nextCine) this.cine.scene.restart({ keyname: "cine_3_movie_5" });
    }
}

export default cine3Movie4;
