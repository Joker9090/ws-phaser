import Phaser from "phaser";
import Ticker, { TickerJob } from "../Ticker";
import DialogueManager from "../DialogueManager";
import CinematographyModular from "@/game/movies/Cinematography-modular";

class cineMovie5 {
    ticker: Ticker;
    cine: CinematographyModular;
    nextCine: boolean = false;
    dialogue?: DialogueManager;
    //assets
    astro?: Phaser.GameObjects.Image;
    brazoCintDer?: Phaser.GameObjects.Image;
    brazoCintIzq?: Phaser.GameObjects.Image;
    cinturonDer?: Phaser.GameObjects.Image;
    cinturonIzq?: Phaser.GameObjects.Image;
    sillon?: Phaser.GameObjects.Image;
    // controllers
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(cine: CinematographyModular) {
        this.cine = cine;
        const tickerMS = 100;
        this.ticker = new Ticker(tickerMS);
        this.playCine();
        // sound & music
        this.cine.sound.add("C2_15").setVolume(0.25).play()
    }

    stopDialogue(){
         this.dialogue?.stop();
          this.dialogue?.destroyContainer();
        this.dialogue = undefined;
      }

    playCine(this: cineMovie5) {

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

        this.astro = this.cine.add.image(0, 0, "astro").setOrigin(0.5)
        this.brazoCintDer = this.cine.add.image(300, 50, "brazoCintDer").setOrigin(0, 0.5)
        this.cinturonDer = this.cine.add.image(300, 50, "cinturonDer").setOrigin(0, 0.5)
        this.cinturonIzq = this.cine.add.image(-300, 50, "cinturonIzq").setOrigin(1, 0.5)
        this.brazoCintIzq = this.cine.add.image(-300, 50, "brazoCintIzq").setOrigin(1, 0.4)
        this.sillon = this.cine.add.image(0, 0, "sillon").setOrigin(0.5)

        const gameObjects = [
            this.sillon,
            this.astro,
            this.cinturonDer,
            this.cinturonIzq,
            this.brazoCintDer,
            this.brazoCintIzq,
        ];

        const darkMask = this.cine.add.rectangle(
            0,
            0,
            window.innerWidth*2,
            window.innerHeight*2,
            0,
            0.3
        );

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
        // camera.postFX.addVignette(0.5, 0.5, 0.8);

        const part1 = (job: TickerJob) => {
            this.dialogue = new DialogueManager(
                this.cine,
                [
                    "Let’s get to it then."
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
                            width: 400
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
                targets: [this.cinturonDer, this.brazoCintDer],
                x: 50,
                y: 0,
                duration: 1000,
                ease: "ease.out",
            });

            this.cine.tweens.add({
                targets: [this.cinturonIzq, this.brazoCintIzq],
                x: 175,
                y: 0,
                duration: 1000,
                onComplete: () => {
                    this.cine.sound.add("C2_9").setVolume(0.25).play()
                },
                ease: "ease.out",
            });
            this.cine.tweens.add({
                targets: [camera],
                zoom: 1.1,
                duration: 20000,
                ease: "ease",
            });

            this.cine.tweens.add({
                targets: [this.brazoCintDer],
                x: 650,
                delay: 1000,
                y: 150,
                duration: 2000,
                ease: "ease.in",
            });

            this.cine.tweens.add({
                targets: [this.brazoCintIzq],
                y: 200,
                x: -650,
                delay: 1000,
                duration: 2000,
                ease: "ease.in",
            });
        };



        this.ticker.addJob(
            new TickerJob(1, 10, part1, false, undefined, true, (job: TickerJob) => {
                // soundChangeScene.stop()
                this.nextCine = true;
            })
        );
    }

    update(this: cineMovie5, time: number, delta: number) {
        if (this.dialogue) this.dialogue.update();
        if (this.nextCine) this.cine.scene.restart({ keyname: "cine_movie_6" });
    }
}

export default cineMovie5;
