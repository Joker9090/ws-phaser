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
    aspasVent?: Phaser.GameObjects.Image;
    backgroundComerdor?: Phaser.GameObjects.Image;
    brazoDer?: Phaser.GameObjects.Image;
    brazoIzq?: Phaser.GameObjects.Image;
    noodleCup?: Phaser.GameObjects.Image;
    vent?: Phaser.GameObjects.Image;
    lucesComedor?: Phaser.GameObjects.Image;
    luz1?: Phaser.GameObjects.Image;
    luz2?: Phaser.GameObjects.Image;
    luz3?: Phaser.GameObjects.Image;
    vent2?: Phaser.GameObjects.Image;
    aspasVent2?: Phaser.GameObjects.Image;
    vent3?: Phaser.GameObjects.Image;
    aspasVent3?: Phaser.GameObjects.Image;
    // controllers
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(cine: CinematographyModular) {
        this.cine = cine;
        const tickerMS = 100;
        this.ticker = new Ticker(tickerMS);
        this.playCine();
        // sound & music
        setTimeout(() => {
            this.cine.sound.add("C2_2").setVolume(0.25).play()
        }, 500)
        setTimeout(() => {
            this.cine.sound.add("C2_6").setVolume(0.7).play()
        }, 2500)
    }
    stopDialogue(){
         this.dialogue?.stop();
          this.dialogue?.destroyContainer();
        this.dialogue = undefined;
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
            y: window.innerHeight / 1080,
        };

        this.backgroundComerdor = this.cine.add.image(0, 0, "backgroundComerdor").setOrigin(0.5)
        this.brazoDer = this.cine.add.image(450, middlePoint.y + 50, "brazoDer").setOrigin(0.5, 1)
        this.brazoIzq = this.cine.add.image(-550, middlePoint.y + 100, "brazoIzq").setOrigin(0.5, 1)
        this.noodleCup = this.cine.add.image(100, 200, "noodleCup").setOrigin(0.5)
        // this.lucesComedor = this.cine.add.image(0, 0, "lucesComedor").setOrigin(0.5)
        this.luz1 = this.cine.add.image(0, 0, "luz1").setOrigin(0.5)
        this.luz2 = this.cine.add.image(0, 0, "luz2").setOrigin(0.5)
        this.luz3 = this.cine.add.image(0, 0, "luz3").setOrigin(0.5)
        this.aspasVent = this.cine.add.image(647, -250, "aspasVent").setOrigin(0.5)
        this.vent = this.cine.add.image(647, -250, "vent").setOrigin(0.5)
        this.aspasVent2 = this.cine.add.image(647, 0, "aspasVent").setOrigin(0.5)
        this.vent2 = this.cine.add.image(647, 0, "vent").setOrigin(0.5)
        this.aspasVent3 = this.cine.add.image(647, 250, "aspasVent").setOrigin(0.5)
        this.vent3 = this.cine.add.image(647, 250, "vent").setOrigin(0.5)

        const gameObjects = [
            this.backgroundComerdor,
            // this.lucesComedor,
            this.luz1,
            this.luz2,
            this.luz3,
            this.vent,
            this.aspasVent,
            this.vent2,
            this.aspasVent2,
            this.vent3,
            this.aspasVent3,
            this.noodleCup,
            this.brazoDer,
            this.brazoIzq,
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
                ["Now I should worry about getting some food."],
                [""],
                [
                    {
                      delay: 1000,
                      withTapping: {
                        audios: ["key01","key01", "key02"],
                        count: 18,
                        delay: 180,
                      },
                      keepAlive: 1250,
                      position: {
                        width: 800
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
                zoom: 1.1,
                duration: 30000,
                ease: "ease",
            });

            this.cine.tweens.add({
                targets: [this.luz1],
                alpha: 0.1,
                delay: 300,
                duration: 666,
                loop: -1,
                ease: "expo",
            });

            
            this.cine.tweens.add({
                targets: [this.luz2],
                alpha: 0.1,
                duration: 555,
                loop: -1,
                ease: "expo",
            });

            
            this.cine.tweens.add({
                targets: [this.luz3],
                delay: 100,
                alpha: 0.1,
                duration: 333,
                loop: -1,
                ease: "expo",
            });

            this.cine.tweens.add({
                targets: [this.aspasVent2, this.aspasVent3, this.aspasVent],
                rotation: Math.PI*2,
                duration: 3000,
                loop: -1,
                ease: "ease",
            });

            this.cine.tweens.add({
                targets: [this.brazoDer],
                rotation: Math.PI/6,
                y: '+=100',
                duration: 18000,
                loop: 0,
                ease: "ease",
            });
            this.cine.tweens.add({
                targets: [this.brazoIzq],
                y: '+=100',
                x: '-=200',
                duration: 13000,
                loop: 0,
                ease: "ease",
            });
        };



        this.ticker.addJob(
            new TickerJob(1, 10, part1, false, undefined, true, (job: TickerJob) => {
                // soundChangeScene.stop()
                this.nextCine = true;
            })
        );
    }

    update(this: cineMovie3, time: number, delta: number) {
        if (this.dialogue) this.dialogue.update();
        if (this.nextCine) this.cine.scene.restart({ keyname: "cine_movie_4" });
    }
}

export default cineMovie3;
