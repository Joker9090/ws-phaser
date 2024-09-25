import Phaser from "phaser";
import Ticker, { TickerJob } from "../Ticker";
import DialogueManager from "../DialogueManager";
import CinematographyModular from "@/game/movies/Cinematography-modular";

class cineMovie3 {
    ticker: Ticker;
    cine: CinematographyModular;
    nextCine: boolean = false;
    dialogue?: DialogueManager;
    //assets

    // controllers
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(cine: CinematographyModular) {
        this.cine = cine;
        const tickerMS = 100;
        this.ticker = new Ticker(tickerMS);
        this.playCine();
        // music
        this.cine.sound.add("introSoundEffect1").setVolume(0.25).play()
        this.cine.sound.add("introSoundEffect2").setVolume(0.25).play()
    }

    playCine(this: cineMovie3) {

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

        // this.background = this.cine.add
        //   .image(0, 0, "backgronudClouds")
        //   .setOrigin(0.5, 0.5)
        //   .setScale(1.4);


        // const gameObjects = [
        //   this.background3,
        // ];

        const darkMask = this.cine.add.rectangle(
            0,
            0,
            window.innerWidth,
            window.innerHeight,
            0,
            1
        );

        const container = this.cine.add
            .container(middlePoint.x, middlePoint.y)
            .setSize(1920, 927);

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

            //   const tween1 = this.cine.tweens.add({
            //     targets: [this.shipOverImage, this.shipZoomOn],
            //     alpha: 0,
            //     duration: 5000,
            //     ease: "expo.out",
            //     loop: -1,
            //   });


        };


        const part2 = (job: TickerJob) => {

            this.dialogue = new DialogueManager(
                this.cine,
                ["Emergency log number 325..."],
                ["intro1audio1"],
                [
                    {
                        delay: 500,
                        keepAlive: 1000,
                    },
                ],
                90
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
        };


        this.ticker.addJob(
            new TickerJob(1, 10, part1, false, 6000, true, (job: TickerJob) => {
                this.ticker.addNextJob(
                    new TickerJob(
                        2,
                        0,
                        part2,
                        false,
                        undefined,
                        true,
                        (job: TickerJob) => {
                            // soundChangeScene.stop()
                            this.nextCine = true;
                        }
                    )
                );
            })
        );
    }

    update(this: cineMovie3, time: number, delta: number) {
        if (this.dialogue) this.dialogue.update();
        if (this.nextCine) this.cine.scene.restart({ keyname: "cine_movie_4" });
    }
}

export default cineMovie3;
