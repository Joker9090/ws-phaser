import Phaser from "phaser";
import Ticker, { TickerJob } from "../Ticker";
import DialogueManager from "../DialogueManager";
import CinematographyModular from "@/game/movies/Cinematography-modular";

class cineIntro2B {
  ticker: Ticker;
  container?: Phaser.GameObjects.Container;
  nextCine: boolean = false;
  cine: CinematographyModular;
  dialogue?: DialogueManager;

  background3?: Phaser.GameObjects.Image;
  background2?: Phaser.GameObjects.Image;
  background1?: Phaser.GameObjects.Image;
  planetScene2?: Phaser.GameObjects.Image;
  // part 1
  part1SetUp?: Phaser.GameObjects.Image;
  // part 2
  part2SetUp?: Phaser.GameObjects.Image;
  // part 3
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
  // meter componenete gráfico de barras (12 barras, 12 inputs? varian por separado o hago 12 compoenntes?)
  // meter componente arrow left y right (1 componente con invert y la anim adnetor)
  part: number = 1;
  nextText?: Phaser.GameObjects.Text;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(cine: CinematographyModular) {
    this.cine = cine;
    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
    this.playCine();
  }

  changeTextureGroup(items: Phaser.GameObjects.Image[]) {
    for (let i = 0; i < items.length; i++) {
      if (i + 1 <= items.length) {
        const newText = items[i].texture.key.split("-")[0];
        items[i].setTexture(newText);
      }
    }
  }

  playCine(this: cineIntro2B) {
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
    console.log(window.innerHeight, window.innerWidth, "dimension");
    this.radarInnerCircle1 = this.cine.add
      .image(0, 0, "radarInnerCircle1-red")
      .setOrigin(0.5);
    this.radarInnerCircle2 = this.cine.add
      .image(0, 0, "radarInnerCircle2-red")
      .setOrigin(0.5);
    this.dangerSign = this.cine.add.image(0, 0, "danger2-red").setOrigin(0.5);
    this.radarInnerCircle3 = this.cine.add
      .image(0, 0, "radarInnerCircle3-red")
      .setOrigin(1, 0.5);
    this.radarSearcher = this.cine.add
      .image(-100, -100, "radarSearcher-red")
      .setOrigin(0.5);
    this.radarCross = this.cine.add
      .image(0, 0, "radarCross-red")
      .setOrigin(0.5);
    this.planetOnRadar = this.cine.add
      .image(-100, -100, "planetOnRadar")
      .setOrigin(0.5)
      .setVisible(false);
    this.titleTopLeft = this.cine.add
      .image(-540, -350, "titleTopLeft-red")
      .setOrigin(0.5);
    this.titleTopRight = this.cine.add
      .image(650, -350, "titleTopRight-red")
      .setOrigin(1, 0.5);
    this.titleBottomLeft = this.cine.add
      .image(-540, 150, "titleBottomLeft-red")
      .setOrigin(0.5);
    this.titleBottomRight = this.cine.add
      .image(650, 150, "titleBottomRight-red")
      .setOrigin(1, 0.5);
    this.textSelectorLeft1 = this.cine.add
      .image(-480, -100, "textSelectorFull-red")
      .setOrigin(0.5);
    this.textSelectorLeft2 = this.cine.add
      .image(-600, -100, "textSelectorEmpty-red")
      .setOrigin(0.5);
    this.textSelectorRight1 = this.cine.add
      .image(480, -100, "textSelectorFull-red")
      .setOrigin(0.5);
    this.textSelectorRight2 = this.cine.add
      .image(600, -100, "textSelectorEmpty-red")
      .setOrigin(0.5);
    this.subTextTopLeft = this.cine.add
      .image(-520, -220, "subTextTopLeft-red")
      .setOrigin(0.5)
      .setFlipX(true);
    this.subTextTopRight = this.cine.add
      .image(650, -220, "subTextTopLeft2-red")
      .setOrigin(1, 0.5)
      .setFlipX(true);
    this.subTextBottomRight = this.cine.add
      .image(650, 375, "subTextBottomRight-red")
      .setOrigin(1, 0.5)
      .setScale(0.9, 1);
    this.subTextBottomLeft = this.cine.add
      .image(-540, 200, "subTextBottomLeft-red")
      .setOrigin(0.5);
    this.circle1 = this.cine.add.image(-600, 300, "circle1-red").setOrigin(0.5);
    this.barraCircle1 = this.cine.add
      .image(-600, 380, "textSelectorEmpty-red")
      .setOrigin(0.5);
    const fillBarraCircle1 = this.cine.add
      .image(-600, 380, "textSelectorFull-red")
      .setOrigin(0.5)
      .setScale(0);
    this.circle2 = this.cine.add
      .image(-475, 300, "circle2-red")
      .setOrigin(1, 0.5);
    this.barraCircle2 = this.cine.add
      .image(-475, 380, "textSelectorEmpty-red")
      .setOrigin(0.5);
    const fillBarraCircle2 = this.cine.add
      .image(-475, 380, "textSelectorFull-red")
      .setOrigin(0.5)
      .setScale(0);
    this.circle3 = this.cine.add.image(-350, 300, "circle3-red").setOrigin(0.5);
    this.barraCircle3 = this.cine.add
      .image(-350, 380, "textSelectorEmpty-red")
      .setOrigin(0.5);
    const fillBarraCircle3 = this.cine.add
      .image(-350, 380, "textSelectorFull-red")
      .setOrigin(0.5)
      .setScale(0);
    this.backgroundPanel = this.cine.add
      .image(0, 70, "backgroundPanel")
      .setOrigin(0.5);
    const barrasObject = {
      firstPos: 400,
      amount: 12,
      offset: 22,
    };
    const barrasArr: Phaser.GameObjects.Image[] = [];
    const barrasContArr: Phaser.GameObjects.Image[] = [];
    for (let i = 0; i < barrasObject.amount; i++) {
      const barra = this.cine.add
        .image(
          barrasObject.firstPos + i * 20 + barrasObject.offset,
          350,
          "barFull-red"
        )
        .setScale(0.8, 0.5)
        .setOrigin(0.5, 1);
      barrasArr.push(barra);
      const barraContainer = this.cine.add
        .image(
          barrasObject.firstPos + i * 20 + barrasObject.offset,
          350,
          "barEmpty-red"
        )
        .setScale(0.8, 1)
        .setOrigin(0.5, 1);
      barrasContArr.push(barraContainer);
    }

    const darkMask = this.cine.add.rectangle(
      0,
      0,
      window.innerWidth,
      window.innerHeight,
      0,
      0.3
    );

    const images = [
      this.radarInnerCircle1,
      this.radarInnerCircle2,
      this.radarInnerCircle3,
      this.radarSearcher,
      this.radarCross,
      this.planetOnRadar,
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
      this.dangerSign,
    ];

    const assetsScenes = [
      this.backgroundPanel,
      this.radarInnerCircle1,
      this.radarInnerCircle2,
      this.radarInnerCircle3,
      this.radarSearcher,
      this.radarCross,
      this.planetOnRadar,
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
      this.dangerSign,

      darkMask,
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

    const spaceshipAmbientSoundEffect = this.cine.sound.add("spaceshipAmbient");
    spaceshipAmbientSoundEffect.setVolume(1.5);
    spaceshipAmbientSoundEffect.play();

    const part1 = (job: TickerJob) => {
      this.part = 1;
      this.dialogue = new DialogueManager(
        this.cine,
        ["primer texto para la emergencia"],
        [""],
        [
          {
            delay: 1000,
            keepAlive: 3000,
          },
        ]
      );
      this.dialogue?.play();

      this.cine.tweens.add({
        targets: [darkMask],
        alpha: 0.35,
        duration: 1500,
        ease: "ease",
        loop: -1,
        yoyo: true,
      });
      // this.cine.tweens.add({
      //   targets: [this.dangerSign],
      //   slpha: 0,
      //   duration: 200,
      //   ease: "ease",
      //   loop: -1,
      // yoyo: true,
      // });
      this.cine.tweens.add({
        targets: this.dangerSign,
        alpha: 0.99,
        duration: 1500,
        onComplete: () => {
          this.dangerSign?.setTexture("danger1-red");
        },
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
        alpha: 0.55,
        ease: "Power1",
        yoyo: true,
        duration: 1700,
        repeat: -1,
      });
      this.cine.tweens.add({
        targets: fillBarraCircle1,
        scale: 1,
        ease: "Power1",
        duration: 1700,
        repeat: -1,
      });
      this.cine.tweens.add({
        targets: fillBarraCircle2,
        scale: 1,
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
        onYoyo: () => {
          counter++;
          console.log(counter, "COUNTER");
          if (counter === 5) {
            console.log("LLEGO");
          }
        },
        yoyo: true,
        repeat: -1,
      });
      this.cine.tweens.add({
        targets: [this.planetOnRadar],
        alpha: 0.5,
        ease: "Power1",
        duration: 2700,
        onYoyo: () => {
          counter++;
          console.log(counter, "COUNTER");
          if (counter === 5) {
            console.log("LLEGO");
          }
        },
        yoyo: true,
        repeat: -1,
      });
      const t1 = this.cine.tweens.add({
        targets: [this.radarSearcher, this.planetOnRadar],
        x: "+=200",
        ease: "ease",
        duration: 4324,
        repeat: -1,
        yoyo: true,
      });
      const t2 = this.cine.tweens.add({
        targets: [this.radarSearcher, this.planetOnRadar],
        y: "+=150",
        ease: "ease",
        duration: 1333,
        yoyo: true,
        repeat: -1,
      });
      this.cine.tweens.add({
        targets: fillBarraCircle3,
        scale: 1,
        ease: "Power1",
        delay: 1500,
        duration: 700,
        repeat: -1,
      });
      this.cine.tweens.add({
        targets: this.subTextTopLeft,
        alpha: 0.9,
        yoyo: true,
        duration: 2000,
        onYoyo: () => {
          this.subTextTopLeft?.setFlipY(!this.subTextTopLeft?.flipY);
          if (
            this.textSelectorLeft1?.texture.key === "textSelectorFull-red" ||
            this.textSelectorLeft1?.texture.key === "textSelectorFull"
          ) {
            this.textSelectorLeft1.setTexture(
              this.part === 2 ? "textSelectorEmpty" : "textSelectorEmpty-red"
            );
          } else {
            this.textSelectorLeft1?.setTexture(
              this.part === 2 ? "textSelectorFull" : "textSelectorFull-red"
            );
          }
          if (
            this.textSelectorLeft2?.texture.key === "textSelectorFull-red" ||
            this.textSelectorLeft2?.texture.key === "textSelectorFull"
          ) {
            this.textSelectorLeft2.setTexture(
              this.part === 2 ? "textSelectorEmpty" : "textSelectorEmpty-red"
            );
          } else {
            this.textSelectorLeft2?.setTexture(
              this.part === 2 ? "textSelectorFull" : "textSelectorFull-red"
            );
          }
        },
        repeat: -1,
      });
      this.cine.tweens.add({
        targets: this.subTextTopRight,
        alpha: 0.9,
        yoyo: true,
        delay: 3000,
        duration: 3000,
        onYoyo: () => {
          console.log(this.part, "ARIEL PART");
          this.subTextTopRight?.setFlipY(!this.subTextTopRight?.flipY);
          if (
            this.textSelectorRight1?.texture.key === "textSelectorFull-red" ||
            this.textSelectorRight1?.texture.key === "textSelectorFull"
          ) {
            this.textSelectorRight1.setTexture(
              this.part === 2 ? "textSelectorEmpty" : "textSelectorEmpty-red"
            );
          } else {
            this.textSelectorRight2?.setTexture(
              this.part === 2 ? "textSelectorFull" : "textSelectorFull-red"
            );
          }
          if (
            this.textSelectorRight2?.texture.key === "textSelectorFull-red" ||
            this.textSelectorRight2?.texture.key === "textSelectorFull"
          ) {
            this.textSelectorRight2.setTexture(
              this.part === 2 ? "textSelectorEmpty" : "textSelectorEmpty-red"
            );
          } else {
            this.textSelectorRight2?.setTexture(
              this.part === 2 ? "textSelectorFull" : "textSelectorFull-red"
            );
          }
        },
        repeat: -1,
      });
      for (let i = 0; i < barrasArr.length; i++) {
        const randomNumber = Math.random();
        this.cine.tweens.add({
          targets: barrasArr[i],
          scaleY: randomNumber,
          duration: randomNumber * 5000 + 5000,
          ease: "ease",
          loop: -1,
          yoyo: true,
        });
      }
      const dialogueListener = (newState: string, nextText?: string) => {
        if (newState === "CONTINUE") {
          setTimeout(() => {
            t1.stop();
            t2.stop();
            this.planetOnRadar?.setVisible(true);
          }, 6000);
        } else if (newState === "FINISHED") {
          this.ticker.deleteJob(job.id);
        }
      };
      this.dialogue?.killState(dialogueListener);
      this.dialogue?.getState(dialogueListener);
    };

    const part2 = (job: TickerJob) => {
      this.part = 2;
      this.dialogue = new DialogueManager(
        this.cine,
        ["Parece q encontramo el planet"],
        [""],
        [
          {
            delay: 6000,
            keepAlive: 5000,
          },
        ]
      );

      this.dialogue?.play();
      this.changeTextureGroup(images);
      this.changeTextureGroup(barrasArr);
      this.changeTextureGroup(barrasContArr);
      this.dangerSign?.setVisible(false);
      camera.setZoom(1);

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
        this.ticker.addNextJob(
          new TickerJob(
            2,
            0,
            part2,
            false,
            undefined,
            true,
            (job: TickerJob) => {
              spaceshipAmbientSoundEffect.stop();
              this.nextCine = true;
            }
          )
        );
      })
    );
  }

  update(this: cineIntro2B, time: number, delta: number) {
    if (this.dialogue) this.dialogue.update();
    if (this.nextCine) this.cine.scene.restart({ keyname: "cine_intro_3" });
  }
}

export default cineIntro2B;
