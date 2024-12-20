import Phaser from "phaser";
import Ticker, { TickerJob } from "../Ticker";
import DialogueManager from "../DialogueManager";
import CinematographyModular from "@/game/movies/Cinematography-modular";

class cineMovie4 {
    ticker: Ticker;
    cine: CinematographyModular;
    nextCine: boolean = false;
    container?: Phaser.GameObjects.Container;
    dialogue?: DialogueManager;
    //assets
    backgroundPanel?: Phaser.GameObjects.Image;
    radarInnerCircle1?: Phaser.GameObjects.Image;
    radarInnerCircle2?: Phaser.GameObjects.Image;
    dangerSign?: Phaser.GameObjects.Image;
    radarInnerCircle3?: Phaser.GameObjects.Image;
    radarSearcher?: Phaser.GameObjects.Image;
    radarCross?: Phaser.GameObjects.Image;
    planetOnRadar?: Phaser.GameObjects.Image;
    titleTopLeft?: Phaser.GameObjects.Image;
    titleTopRight?: Phaser.GameObjects.Image;
    subTextTopLeft?: Phaser.GameObjects.Image;
    subTextBottomRight?: Phaser.GameObjects.Image;
    subTextBottomLeft?: Phaser.GameObjects.Image;
    circle1?: Phaser.GameObjects.Image;
    circle2?: Phaser.GameObjects.Image;
    barrasRightBottom?: Phaser.GameObjects.Image;
    popUpFood?: Phaser.GameObjects.Image;
    popUpPlanet?: Phaser.GameObjects.Image;
    extraStars?: Phaser.GameObjects.Image;
    // controllers
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(cine: CinematographyModular) {
        this.cine = cine;
        const tickerMS = 100;
        this.ticker = new Ticker(tickerMS);
        this.playCine();
        // sound & music
        setTimeout(() => {
            this.cine.sound.add("C2_7").setVolume(0.25).play()
        }, 500)
    }

    stopDialogue(){
        console.log('entro')
         this.dialogue?.stop();
          this.dialogue?.destroyContainer();
        this.dialogue = undefined;
      }

    playCine(this: cineMovie4) {
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
        this.radarInnerCircle1 = this.cine.add
            .image(100, 0, "innerCircle1")
            .setOrigin(0.5)
            .setPosition(10, -110);
        this.radarInnerCircle2 = this.cine.add
            .image(100, 0, "innerCircle2")
            .setOrigin(0.5)
            .setPosition(10, -110);
        this.radarInnerCircle3 = this.cine.add
            .image(100, 0, "innerCircle3")
            .setOrigin(1, 0.5)
            .setPosition(10, -110);
        this.radarInnerCircle3 = this.cine.add
            .image(100, 0, "innerCircle4")
            .setOrigin(1, 0.5)
            .setPosition(10, -110);

        this.popUpFood = this.cine.add
            .image(-80, -160, "comidaPopUp")
            .setOrigin(0, 1)
            .setScale(0)

        this.extraStars = this.cine.add
            .image(-80, -160, "extraStars")
            .setOrigin(0.5)
            .setScale(0)
        this.popUpPlanet = this.cine.add
            .image(-80, -160, "planetaPopUp")
            .setOrigin(1, 0)
            .setScale(0)


        this.radarSearcher = this.cine.add
            .image(-80, -160, "radarSearcher")
            .setOrigin(0.5)
            .setScale(0.7);

        this.radarCross = this.cine.add
            .image(70, 0, "radarCross")
            .setScale(0.65)
            .setPosition(10, -110);

        this.planetOnRadar = this.cine.add
            .image(-80, -160, "planetOnRadar")
            .setOrigin(0.5)
            .setVisible(false);
        this.titleTopLeft = this.cine.add
            .image(-370, -285, "textTopLeftc1")
            .setOrigin(0.5)
            .setScale(0.8);
        const textRedRight = this.cine.add
            .image(480, -50, "textTopRightc1")
            .setOrigin(1, 0.5)
            .setScale(0.8)
            .setFlipY(true);

        this.titleTopRight = this.cine.add
            .image(480, -300, "textTopRightc1")
            .setOrigin(1, 0.5)
            .setScale(1);

        this.barrasRightBottom = this.cine.add
            .image(-360, 10, "barrasRojas")
            .setOrigin(0.5)

        this.circle1 = this.cine.add
            .image(-270, 130, "circleBottomRight")
            .setOrigin(0.5)

        this.circle2 = this.cine.add
            .image(-400, 130, "circleBottomRight")
            .setOrigin(0.5)
            .setRotation(Math.PI / 4)

        const bottomText = this.cine.add
            .image(20, 185, "bottomText")
            .setOrigin(0.5)

        const circle1right = this.cine.add
            .image(-445, -90, "circle1c1")
            .setOrigin(0.5);
        const circle2right = this.cine.add
            .image(-385, -90, "circle2c1")
            .setOrigin(1, 0.5);
        const circle3right = this.cine.add
            .image(-325, -90, "circle3c1")
            .setOrigin(0.5, 0.5);

        this.cine.tweens.add({
            targets: [circle1right, circle3right],
            rotation: Math.PI * 2,
            duration: 3000,
            loop: -1,

        })
        this.cine.tweens.add({
            targets: [circle2right],
            rotation: -Math.PI * 2,
            duration: 3000,
            loop: -1,

        })
        const textMiddleBlue = this.cine.add
            .image(420, -160, "textBluec1")
            .setOrigin(0.5)
            .setFlipX(true);
        const textTopBlue = this.cine.add
            .image(190, -350, "textBluec1")
            .setOrigin(0.5)
            .setFlipY(true);

        const latScreen1 = this.cine.add
            .image(-785, -20, "latScreen1")
            .setOrigin(0.5)
            .setFlipX(true);
        const latScreen2 = this.cine.add
            .image(-645, -220, "latScreen2")
            .setOrigin(0.5)
            .setFlipX(true);
        const latScreen3 = this.cine.add
            .image(-765, 120, "latScreen3")
            .setOrigin(0.5)
            .setFlipX(true);
        this.cine.tweens.add({
            targets: [latScreen3],
            rotation: -Math.PI * 2,
            duration: 15000,
            loop: -1,
        })
        const latScreen4 = this.cine.add
            .image(-765, -330, "latScreen4")
            .setOrigin(0.5)
            .setFlipX(true);
        this.cine.tweens.add({
            targets: [latScreen4],
            rotation: Math.PI * 2,
            duration: 25000,
            loop: -1,
        })
        const latScreen5 = this.cine.add
            .image(-765, -150, "latScreen5")
            .setOrigin(0.5)
            .setFlipX(true);
        this.cine.tweens.add({
            targets: [latScreen5],
            rotation: -Math.PI * 2,
            duration: 30000,
            loop: -1,
        })

        const latScreenRight1 = this.cine.add
            .image(720, 50, "latScreenRight1")
            .setOrigin(0.5);
        const latScreenRight2 = this.cine.add
            .image(790, -250, "latScreenRight2")
            .setOrigin(0.5);
        const latScreenRight3 = this.cine.add
            .image(830, -30, "latScreenRight3")
            .setOrigin(0.5);
        const latScreenRight4 = this.cine.add
            .image(830, 120, "latScreenRight4")
            .setOrigin(0.5);

        this.backgroundPanel = this.cine.add
            .image(0, 70, "backgroundPanel")
            .setOrigin(0.5);
        let marker = 0;
        const barrasAzules = this.cine.add
        .image(375, 110, "barrasAzules")
        .setOrigin(0.5);

        const barrasObject = {
            firstPos: 290,
            amount: 8,
            offset: 22,
        };
        const barrasArr: Phaser.GameObjects.Image[] = [];
        const barrasContArr: Phaser.GameObjects.Image[] = [];
        for (let i = 0; i < barrasObject.amount; i++) {
            const barra = this.cine.add
                .image(
                    475,
                    150 - i * 15,
                    "barFull"
                )
                .setScale(0.65, 0.8)
                .setOrigin(0.5, 1)
                .setRotation(- Math.PI / 2)
                .setFlipY(true)
                .setVisible(false)
            barrasArr.push(barra);
        }

        const darkMask = this.cine.add.rectangle(
            0,
            0,
            window.innerWidth*2,
            window.innerHeight*2,
            0,
            0.3
        );

        const assetsScenes = [
            this.backgroundPanel,
            this.radarInnerCircle1,
            this.radarInnerCircle2,
            this.radarInnerCircle3,
            this.radarSearcher,
            this.titleTopLeft,
            this.titleTopRight,
            barrasAzules,
            textRedRight,
            this.circle2,
            this.circle1,
            this.barrasRightBottom,
            bottomText,
            circle1right,
            circle2right,
            circle3right,
            latScreen1,
            latScreen2,
            latScreen3,
            latScreen4,
            latScreen5,
            latScreenRight1,
            latScreenRight2,
            latScreenRight3,
            latScreenRight4,
            darkMask,
            textMiddleBlue,
            textTopBlue,
            this.extraStars,
            this.popUpFood,
            this.popUpPlanet,
            this.planetOnRadar,
            this.radarCross,
        ];

        // this.tintGroup(images)

        this.container = this.cine.add
            .container(middlePoint.x, middlePoint.y)
            .setSize(1920, 927);
        this.container.add(assetsScenes.concat(barrasArr, barrasContArr));
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

        const part1 = (job: TickerJob) => {

            this.dialogue = new DialogueManager(
                this.cine,
                [
                    "Oh, great! Next planet looks promising"
                ],
                [""],
                [
                    {
                        delay: 3500,
                        withTapping: {
                            audios: ["key01", "key01", "key02"],
                            count: 16,
                            delay: 180,
                        },
                        keepAlive: 1050,
                        position: {
                            width: 750
                        }
                    },
                ],
                80
            );
            this.dialogue?.play();

            // this.cine.tweens.add({
            //     targets: [camera],
            //     zoom: 1.2,
            //     duration: 9000,
            //     ease: "ease",
            // });

            this.cine.tweens.add({
                targets: [this.radarInnerCircle1],
                rotation: Math.PI * 2,
                duration: 4500,
                ease: "ease",
                loop: -1,
            });
            this.cine.tweens.add({
                targets: [this.radarInnerCircle2, this.circle2],
                rotation: Math.PI * 2,
                duration: 15000,
                ease: "ease",
                loop: -1,
            });
            this.cine.tweens.add({
                targets: [this.circle1],
                rotation: -Math.PI * 2,
                duration: 35000,
                ease: "ease",
                loop: -1,
            });
            this.cine.tweens.add({
                targets: [this.circle2],
                rotation: -Math.PI * 2,
                duration: 25000,
                ease: "ease",
                loop: -1,
            });
            this.cine.tweens.add({
                targets: [this.radarInnerCircle3, this.circle1],
                rotation: -Math.PI * 2,
                duration: 23000,
                ease: "ease",
                loop: -1,
            });
            this.cine.tweens.add({
                targets: this.subTextTopLeft,
                alpha: 0.9,
                flipY: true,
                yoyo: true,
                duration: 5500,
                delay: 3000,
                repeat: -1,
            });
            this.cine.tweens.add({
                targets: [this.titleTopLeft],
                alpha: 0.7,
                ease: "Power3",
                yoyo: true,
                duration: 5500,
                repeat: -1,
            });
            this.cine.tweens.add({
                targets: [this.titleTopRight],
                alpha: 0.7,
                ease: "Power1",
                yoyo: true,
                duration: 1700,
                repeat: -1,
            });

            let counter = 0;
            this.cine.tweens.add({
                targets: [this.radarSearcher, this.planetOnRadar],
                scale: 0.6,
                rotation: 2 * Math.PI,
                ease: "Power1",
                duration: 2700,
                yoyo: true,
                repeat: -1,
            });
            this.cine.tweens.add({
                targets: [this.planetOnRadar],
                alpha: 0.5,
                ease: "Power1",
                duration: 2700,
                yoyo: true,
                repeat: -1,
            });
            const t1 = this.cine.tweens.add({
                targets: [this.radarSearcher, this.planetOnRadar, this.popUpFood, this.popUpPlanet, this.extraStars],
                x: "+=200",
                ease: "ease",
                duration: 4324,
                repeat: -1,
                yoyo: true,
            });
            const t2 = this.cine.tweens.add({
                targets: [this.radarSearcher, this.planetOnRadar, this.popUpFood, this.popUpPlanet, this.extraStars],
                y: "+=150",
                ease: "ease",
                duration: 1333,
                yoyo: true,
                repeat: -1,
            });
            this.cine.tweens.add({
                targets: [this.popUpPlanet, this.popUpFood, this.extraStars],
                scale: 0.9,
                ease: "Power1",
                delay: 3000,
                onStart: () => {
                    this.cine.sound.add("C2_8").setVolume(0.25).play()
                    t1.stop()
                    t2.stop()
                    this.planetOnRadar?.setVisible(true)
                },
                duration: 700,
            });


            for (let i = 0; i < barrasArr.length; i++) {
                const randomNumberInRange = (min: number, max: number) =>
                    Math.random() * (max - min) + min;
                this.cine.tweens.add({
                    targets: barrasArr[i],
                    scaleY: randomNumberInRange(0, 0.7),
                    duration: randomNumberInRange(0, 0.7) * 5000 + 5000,
                    ease: "ease",
                    loop: -1,
                    yoyo: true,
                });
            }

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
            new TickerJob(1, 10, part1, false, undefined, true, (job: TickerJob) => {
                this.nextCine = true;
            })
        );
    }

    update(this: cineMovie4, time: number, delta: number) {
        if (this.dialogue) this.dialogue.update();
        if (this.nextCine) this.cine.scene.restart({ keyname: "cine_movie_5" });
    }
}

export default cineMovie4;
