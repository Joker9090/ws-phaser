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
    titleBottomLeft?: Phaser.GameObjects.Image;
    titleBottomRight?: Phaser.GameObjects.Image;
    textSelectorLeft1?: Phaser.GameObjects.Image;
    textSelectorLeft2?: Phaser.GameObjects.Image;
    textSelectorRight1?: Phaser.GameObjects.Image;
    textSelectorRight2?: Phaser.GameObjects.Image;
    subTextTopLeft?: Phaser.GameObjects.Image;
    subTextTopRight?: Phaser.GameObjects.Image;
    subTextBottomRight?: Phaser.GameObjects.Image;
    subTextBottomLeft?: Phaser.GameObjects.Image;
    circle1?: Phaser.GameObjects.Image;
    barraCircle1?: Phaser.GameObjects.Image;
    circle2?: Phaser.GameObjects.Image;
    barraCircle2?: Phaser.GameObjects.Image;
    circle3?: Phaser.GameObjects.Image;
    barraCircle3?: Phaser.GameObjects.Image;
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
            .image(0, 0, "radarInnerCircle1")
            .setOrigin(0.5)
            .setScale(0.8)
            .setPosition(0, -90);
        this.radarInnerCircle2 = this.cine.add
            .image(0, 0, "radarInnerCircle2")
            .setOrigin(0.5)
            .setScale(0.8)
            .setPosition(0, -90);


        this.popUpFood = this.cine.add
            .image(-80, -130, "comidaPopUp")
            .setOrigin(0, 1)
            .setScale(0)

        this.extraStars = this.cine.add
            .image(-80, -130, "extraStars")
            .setOrigin(0.5)
            .setScale(0)
        this.popUpPlanet = this.cine.add
            .image(-80, -130, "planetaPopUp")
            .setOrigin(1, 0)
            .setScale(0)

        this.radarInnerCircle3 = this.cine.add
            .image(0, 0, "radarInnerCircle3")
            .setOrigin(1, 0.5)
            .setScale(0.8)
            .setPosition(0, -90);

        this.radarSearcher = this.cine.add
            .image(-80, -130, "radarSearcher")
            .setOrigin(0.5)
            .setScale(0.7);

        this.radarCross = this.cine.add
            .image(0, 0, "radarCross")
            .setScale(0.7)
            .setPosition(0, -90);

        this.planetOnRadar = this.cine.add
            .image(-80, -130, "planetOnRadar")
            .setOrigin(0.5)
            .setVisible(false);
        this.titleTopLeft = this.cine.add
            .image(-390, -350, "titleTopLeft")
            .setOrigin(0.5)
            .setScale(0.7);

        this.titleTopRight = this.cine.add
            .image(480, -350, "titleTopRight-red")
            .setOrigin(1, 0.5)
            .setScale(0.7);

        this.titleBottomLeft = this.cine.add
            .image(-390, 0, "titleBottomLeft-red")
            .setOrigin(0.5)
            .setScale(0.7);

        this.titleBottomRight = this.cine.add
            .image(480, 0, "titleBottomRight-red")
            .setOrigin(1, 0.5)
            .setScale(0.7);

        this.textSelectorLeft1 = this.cine.add
            .image(-350, -180, "textSelectorFull-red")
            .setOrigin(0.5)
            .setScale(0.7);

        this.textSelectorLeft2 = this.cine.add
            .image(-430, -180, "textSelectorEmpty-red")
            .setOrigin(0.5)
            .setScale(0.7);

        this.textSelectorRight1 = this.cine.add
            .image(450, -180, "textSelectorFull-red")
            .setOrigin(0.5)
            .setScale(0.7);

        this.textSelectorRight2 = this.cine.add
            .image(370, -180, "textSelectorEmpty-red")
            .setOrigin(0.5)
            .setScale(0.7);

        this.subTextTopLeft = this.cine.add
            .image(-465, -260, "subTextTopLeft")
            .setOrigin(0, 0.5)
            .setFlipX(true)
            .setScale(0.7);

        this.subTextTopRight = this.cine.add
            .image(485, -270, "subTextTopLeft2-red")
            .setOrigin(1, 0.5)
            .setFlipX(true)
            .setScale(0.7);

        this.subTextBottomRight = this.cine.add
            .image(490, 190, "subTextBottomRight-red")
            .setOrigin(1, 0.5)
            .setScale(0.9, 1)
            .setScale(0.7);
        this.subTextBottomLeft = this.cine.add
            .image(-390, 30, "subTextBottomLeft-red")
            .setOrigin(0.5)
            .setScale(0.7);

        this.circle1 = this.cine.add
            .image(-430, 130, "circle1-red")
            .setOrigin(0.5)
            .setScale(0.7);

        this.circle2 = this.cine.add
            .image(-350, 130, "circle2")
            .setOrigin(1, 0.5)
            .setScale(0.7);

        this.circle3 = this.cine.add
            .image(-270, 130, "circle3-red")
            .setOrigin(0.5)
            .setScale(0.7);

        this.barraCircle1 = this.cine.add
            .image(-430, 180, "textSelectorEmpty-red")
            .setOrigin(0.5)
            .setScale(0.7);

        const fillBarraCircle1 = this.cine.add
            .image(-430, 180, "textSelectorFull-red")
            .setOrigin(0.5)
            .setScale(0);

        this.barraCircle2 = this.cine.add
            .image(-350, 180, "textSelectorEmpty")
            .setOrigin(0.5)
            .setScale(0.7);

        const fillBarraCircle2 = this.cine.add
            .image(-350, 180, "textSelectorFull")
            .setOrigin(0.5)
            .setScale(0);

        this.barraCircle3 = this.cine.add
            .image(-270, 180, "textSelectorEmpty-red")
            .setOrigin(0.5)
            .setScale(0.7);

        const fillBarraCircle3 = this.cine.add
            .image(-270, 180, "textSelectorFull-red")
            .setOrigin(0.5)
            .setScale(0);

        const arrow1Left = this.cine.add
            .image(-340, -90, "arrowEmpty-red")
            .setOrigin(0.5);
        const arrow1LeftFull = this.cine.add
            .image(-340, -90, "arrowFull-red")
            .setOrigin(0.5)
            .setFlipX(true);
        const arrow2Left = this.cine.add
            .image(-380, -90, "arrowEmpty-red")
            .setOrigin(0.5);
        const arrow3Left = this.cine.add
            .image(-420, -90, "arrowEmpty-red")
            .setOrigin(0.5);
        const arrow4eft = this.cine.add
            .image(-460, -90, "arrowEmpty-red")
            .setOrigin(0.5);
        const arrow1Right = this.cine.add
            .image(340, -90, "arrowEmpty-red")
            .setOrigin(0.5)
            .setFlipX(true);
        const arrow1RightFull = this.cine.add
            .image(340, -90, "arrowFull-red")
            .setOrigin(0.5)
            .setFlipX(false);
        const arrow2Right = this.cine.add
            .image(380, -90, "arrowEmpty-red")
            .setOrigin(0.5)
            .setFlipX(true);
        const arrow3Right = this.cine.add
            .image(420, -90, "arrowEmpty-red")
            .setOrigin(0.5)
            .setFlipX(true);
        const arrow4Right = this.cine.add
            .image(460, -90, "arrowEmpty-red")
            .setOrigin(0.5)
            .setFlipX(true);
        const leftScreen = this.cine.add
            .image(775, -100, "leftScreen")
            .setOrigin(0.5)
            .setFlipX(true);
        const rightScreen = this.cine.add
            .image(-765, -100, "rightScreen")
            .setOrigin(0.5)
            .setFlipX(true);
        this.backgroundPanel = this.cine.add
            .image(0, 70, "backgroundPanel")
            .setOrigin(0.5);
        let marker = 0;
        setInterval(() => {
            if (marker === 0) {
                marker = 1;
                arrow1LeftFull.setPosition(-460, -90);
                arrow1RightFull.setPosition(460, -90);
            } else if (marker === 1) {
                marker = 2;
                arrow1LeftFull.setPosition(-420, -90);
                arrow1RightFull.setPosition(420, -90);
            } else if (marker === 2) {
                marker = 3;
                arrow1LeftFull.setPosition(-380, -90);
                arrow1RightFull.setPosition(380, -90);
            } else if (marker === 3) {
                marker = 0;
                arrow1LeftFull.setPosition(-340, -90);
                arrow1RightFull.setPosition(340, -90);
            }
        }, 500);
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
                .setRotation(- Math.PI / 2);
            barrasArr.push(barra);
        }

        const darkMask = this.cine.add.rectangle(
            0,
            0,
            window.innerWidth,
            window.innerHeight,
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
            this.titleBottomLeft,
            this.titleBottomRight,
            this.textSelectorLeft1,
            this.textSelectorLeft2,
            this.textSelectorRight1,
            this.textSelectorRight2,
            this.subTextTopLeft,
            this.subTextTopRight,
            this.subTextBottomRight,
            this.subTextBottomLeft,
            this.circle1,
            this.barraCircle1,
            this.circle2,
            this.barraCircle2,
            this.circle3,
            this.barraCircle3,
            fillBarraCircle1,
            fillBarraCircle2,
            fillBarraCircle3,
            arrow1Left,
            arrow2Left,
            arrow3Left,
            arrow1Right,
            arrow2Right,
            arrow3Right,
            arrow1LeftFull,
            arrow1RightFull,
            leftScreen,
            rightScreen,
            darkMask,
            arrow4eft,
            arrow4Right,
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
                        audios: ["key01","key01", "key02"],
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

            this.cine.tweens.add({
                targets: [camera],
                zoom: 1.2,
                duration: 9000,
                ease: "ease",
            });

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
                targets: [this.circle3],
                rotation: -Math.PI * 2,
                duration: 35000,
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
                targets: [this.titleTopLeft, this.titleBottomRight],
                alpha: 0.7,
                ease: "Power3",
                yoyo: true,
                duration: 5500,
                repeat: -1,
            });
            this.cine.tweens.add({
                targets: [this.titleTopRight, this.titleBottomLeft],
                alpha: 0.7,
                ease: "Power1",
                yoyo: true,
                duration: 1700,
                repeat: -1,
            });
            this.cine.tweens.add({
                targets: fillBarraCircle1,
                scale: 0.7,
                ease: "Power1",
                duration: 1700,
                repeat: -1,
            });
            this.cine.tweens.add({
                targets: fillBarraCircle2,
                scale: 0.7,
                ease: "Power1",
                duration: 2700,
                delay: 500,
                yoyo: true,
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
                targets: [this.radarSearcher, this.planetOnRadar, this.popUpFood, this.popUpPlanet],
                x: "+=200",
                ease: "ease",
                duration: 4324,
                repeat: -1,
                yoyo: true,
            });
            const t2 = this.cine.tweens.add({
                targets: [this.radarSearcher, this.planetOnRadar, this.popUpFood, this.popUpPlanet],
                y: "+=150",
                ease: "ease",
                duration: 1333,
                yoyo: true,
                repeat: -1,
            });
            this.cine.tweens.add({
                targets: [this.popUpPlanet, this.popUpFood],
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
            // this.cine.tweens.add({
            //     targets: [this.popUpFood, this.extraStars],
            //     scale: 1,
            //     ease: "Power1",
            //     delay: 3000,
            //     duration: 700,
            // });
            this.cine.tweens.add({
                targets: [this.popUpFood, this.popUpPlanet, this.extraStars, this.planetOnRadar],
                alpha: 0.7,
                ease: "expo",
                delay: 2700,
                duration: 700,
                loop: -1, 
                yoyo: true,
            });
            this.cine.tweens.add({
                targets: fillBarraCircle3,
                scale: 0.7,
                ease: "Power1",
                delay: 1500,
                duration: 700,
                repeat: -1,
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
