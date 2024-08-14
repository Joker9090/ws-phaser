import Phaser from "phaser";
import Ticker, { TickerJob } from "../Ticker";
import DialogueManager from "../DialogueManager";
import CinematographyModular from "@/game/movies/Cinematography-modular";

class cineIntro2 {
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
  radarInnerCircle2B?: Phaser.GameObjects.Image;
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

  nextText?: Phaser.GameObjects.Text;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(cine: CinematographyModular) {
    this.cine = cine;
    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
    this.playCine();
  }

  playCine(this: cineIntro2) {
    // START ticker
    this.cine.time.addEvent({
      delay: this.ticker.ms,
      callback: this.ticker.runTicker,
      loop: true,
    });

    // this.cursors = this.input.keyboard?.createCursorKeys();

    // const DialogueScene = this.game.scene.getScene("DialogueManager");
    // this.scene.launch(DialogueScene)

    const middlePoint = {
      x: this.cine.cameras.main.displayWidth / 2,
      y: this.cine.cameras.main.displayHeight / 2,
    };

    const gameObjectScaler = {
      x: window.innerWidth / 1920,
      y: window.innerHeight / 927,
    };

    this.background3 = this.cine.add.image(0, 0, "fondo3").setOrigin(0.5);
    this.background2 = this.cine.add.image(0, 0, "fondo2").setOrigin(0.5);
    this.background1 = this.cine.add.image(0, 0, "fondo1").setOrigin(0.5);
    this.planetScene2 = this.cine.add
      .image(800, 300, "planetScene2")
      .setOrigin(1, 0.8)
      .setScale(1.4);
    this.part1SetUp = this.cine.add
      .image(0, 0, "part1SetUp")
      .setOrigin(0.5)
      .setSize(window.innerWidth, window.innerHeight);
    this.part2SetUp = this.cine.add
      .image(0, 0, "part2SetUp")
      .setOrigin(0.5)
      .setVisible(false);
    // panelControl

    this.radarInnerCircle1 = this.cine.add
      .image(0, 0, "radarInnerCircle1")
      .setOrigin(0.5);
    this.radarInnerCircle2 = this.cine.add
      .image(0, 0, "radarInnerCircle2")
      .setOrigin(0.5);
    this.radarInnerCircle2B = this.cine.add
      .image(0, 0, "radarInnerCircle2B")
      .setOrigin(1, 0);
    this.radarInnerCircle3 = this.cine.add
      .image(0, 0, "radarInnerCircle3")
      .setOrigin(1, 0.5);
    this.radarSearcher = this.cine.add
      .image(0, 0, "radarSearcher")
      .setOrigin(0.5);
    this.radarCross = this.cine.add.image(0, 0, "radarCross").setOrigin(0.5);
    this.planetOnRadar = this.cine.add
      .image(0, 0, "planetOnRadar")
      .setOrigin(0.5);
    this.titleTopLeft = this.cine.add
      .image(-540, -350, "titleTopLeft")
      .setOrigin(0.5);
    this.titleTopRight = this.cine.add
      .image(650, -350, "titleTopRight")
      .setOrigin(1, 0.5);
    this.titleBottomLeft = this.cine.add
      .image(-540, 150, "titleBottomLeft")
      .setOrigin(0.5);
    this.titleBottomRight = this.cine.add
      .image(650, 150, "titleBottomRight")
      .setOrigin(1, 0.5);
    this.textSelectorLeft1 = this.cine.add
      .image(-480, -100, "textSelectorFull")
      .setOrigin(0.5);
    this.textSelectorLeft2 = this.cine.add
      .image(-600, -100, "textSelectorEmpty")
      .setOrigin(0.5);
    this.textSelectorRight1 = this.cine.add
      .image(480, -100, "textSelectorFull")
      .setOrigin(0.5);
    this.textSelectorRight2 = this.cine.add
      .image(600, -100, "textSelectorEmpty")
      .setOrigin(0.5);
    this.subTextTopLeft = this.cine.add
      .image(-520, -220, "subTextTopLeft")
      .setOrigin(0.5)
      .setFlipX(true);
    this.subTextTopRight = this.cine.add
      .image(650, -220, "subTextTopRight")
      .setOrigin(1, 0.5)
      .setFlipY(true);
    this.subTextBottomRight = this.cine.add
      .image(650, 350, "subTextBottomRight")
      .setOrigin(1, 0.5);
    this.subTextBottomLeft = this.cine.add
      .image(-540, 200, "subTextBottomLeft")
      .setOrigin(0.5);
    this.circle1 = this.cine.add.image(-625, 300, "circle1").setOrigin(0.5);
    this.barraCircle1 = this.cine.add
      .image(0, 0, "barraCircle1")
      .setOrigin(0.5);
    this.circle2 = this.cine.add.image(-500, 300, "circle2").setOrigin(1, 0.5);
    this.barraCircle2 = this.cine.add
      .image(300, 0, "barraCircle2")
      .setOrigin(0.5);
    this.circle3 = this.cine.add.image(-375, 300, "circle3").setOrigin(0.5);
    this.barraCircle3 = this.cine.add
      .image(0, 0, "barraCircle3")
      .setOrigin(0.5);
    this.backgroundPanel = this.cine.add
      .image(0, 70, "backgroundPanel")
      .setOrigin(0.5);

    const barra1 = this.cine.add
      .image(650, 250, "barFull")
      .setScale(1, 0.5)
      .setOrigin(0.5, 0);
    const barra1B = this.cine.add.image(650, 250, "barEmpty")
    // dark mas over all scene
    const darkMask = this.cine.add.rectangle(
      0,
      0,
      window.innerWidth,
      window.innerHeight,
      0,
      0.3
    );

    const assetsScenes = [
      this.background3,
      this.background2,
      this.background1,
      this.planetScene2,
      this.part1SetUp,
      this.part2SetUp,

      this.backgroundPanel,
      this.radarInnerCircle1,
      this.radarInnerCircle2,
      this.radarInnerCircle2B,
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
      // this.barraCircle1,
      this.circle2,
      // this.barraCircle2,
      this.circle3,
      // this.barraCircle3,
      barra1,
      barra1B,

      darkMask,
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
    camera.postFX.addVignette(0.5, 0.5, 0.8);

    const spaceshipAmbientSoundEffect = this.cine.sound.add("spaceshipAmbient");
    spaceshipAmbientSoundEffect.setVolume(1.5);
    spaceshipAmbientSoundEffect.play();

    const part1 = (job: TickerJob) => {
      this.dialogue = new DialogueManager(
        this.cine,
        [
          "I've decided to shut down all systems except life support and navigation to buy myself some time.",
          "Although it seems like I'm in uncharted waters, who knows where I've ended up.",
        ],
        [""],
        [
          {
            delay: 1000,
            keepAlive: 2000,
          },
          {
            delay: 500,
            keepAlive: 2000,
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
      this.cine.tweens.add({
        targets: [
          this.background1,
          this.background2,
          this.background3,
          this.planetScene2,
        ],
        scale: 1.3,
        duration: 45000,
        ease: "linear",
      });
      const tween1 = this.cine.tweens.add({
        targets: [
          this.background1,
          this.background2,
          this.background3,
          this.planetScene2,
          this.planetScene2,
        ],
        x: "-=200",
        duration: 45000,
        ease: "linear",
      });
      const tween2 = this.cine.tweens.add({
        targets: [camera],
        zoom: 1.3,
        duration: 60000,
        ease: "linear",
      });

      const dialogueListener = (newState: string, nextText?: string) => {
        if (newState === "CONTINUE") {
          tween1.destroy();
          tween2.destroy();
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
        [
          "Supplies are running out... Maybe I'll have enough for 3 more days if I'm lucky. Fuel levels aren't very encouraging either, if I don't do something soon I could be adrift and things could get a bit complicated.	",
          "The radar has detected a planet in the vicinity that seems to have a possible energy source, I will go investigate it. Wish me luck Dan.",
        ],
        [""],
        [
          {
            delay: 500,
            keepAlive: 300000,
          },
        ]
      );

      this.dialogue?.play();
      this.part1SetUp?.setVisible(false);
      this.part2SetUp?.setVisible(true);
      this.planetScene2?.setPosition(-400, 300);
      camera.setZoom(1);
      const tween2 = this.cine.tweens.add({
        targets: camera,
        zoom: 1.3,
        scrollY: 0,
        duration: 60000,
        ease: "ease",
        loop: 0,
        yoyo: false,
      });
      const tween1 = this.cine.tweens.add({
        targets: [
          this.background1,
          this.background2,
          this.background3,
          this.planetScene2,
          this.planetScene2,
        ],
        x: "-=200",
        duration: 45000,
        ease: "linear",
      });
      const dialogueListener = (newState: string, nextText?: string) => {
        if (newState === "CONTINUE") {
          tween2.destroy();
        } else if (newState === "FINISHED") {
          this.ticker.deleteJob(job.id);
        }
      };
      this.dialogue?.killState(dialogueListener);
      this.dialogue?.getState(dialogueListener);
    };

    const part3 = (job: TickerJob) => {
      this.dialogue = new DialogueManager(
        this.cine,
        ["text danger"],
        [""],
        [
          {
            delay: 500,
            keepAlive: 3000,
          },
        ]
      );

      this.dialogue?.play();
      this.part2SetUp?.setVisible(false);
      camera.setZoom(1);
      this.cine.tweens.add({
        targets: camera,
        zoom: 1.3,
        scrollY: 0,
        duration: 60000,
        ease: "ease",
        loop: 0,
        yoyo: false,
      });
      const tween1 = this.cine.tweens.add({
        targets: [
          this.background1,
          this.background2,
          this.background3,
          this.planetScene2,
          this.planetScene2,
        ],
        x: "-=200",
        duration: 45000,
        ease: "linear",
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

    const part4 = (job: TickerJob) => {
      this.dialogue = new DialogueManager(
        this.cine,
        ["text danger"],
        [""],
        [
          {
            delay: 500,
            keepAlive: 3000,
          },
        ]
      );

      this.dialogue?.play();
      this.part2SetUp?.setVisible(false);
      camera.setZoom(1);
      this.cine.tweens.add({
        targets: camera,
        zoom: 1.3,
        scrollY: 0,
        duration: 60000,
        ease: "ease",
        loop: 0,
        yoyo: false,
      });
      const tween1 = this.cine.tweens.add({
        targets: [
          this.background1,
          this.background2,
          this.background3,
          this.planetScene2,
          this.planetScene2,
        ],
        x: "-=200",
        duration: 45000,
        ease: "linear",
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

    // this.ticker.addJob(
    //   new TickerJob(1, 10, part1, false, undefined, true, (job: TickerJob) => {
    //     this.ticker.addNextJob(
    //       new TickerJob(
    //         2,
    //         0,
    //         part2,
    //         false,
    //         undefined,
    //         true,
    //         (job: TickerJob) => {
    //           this.ticker.addNextJob(
    //             new TickerJob(
    //               3,
    //               0,
    //               part3,
    //               false,
    //               undefined,
    //               true,
    //               (job: TickerJob) => {
    //                 this.ticker.addNextJob(
    //                   new TickerJob(
    //                     4,
    //                     0,
    //                     part4,
    //                     false,
    //                     undefined,
    //                     true,
    //                     (job: TickerJob) => {
    //                       spaceshipAmbientSoundEffect.stop();
    //                       this.nextCine = true;
    //                     }
    //                   )
    //                 );
    //               }
    //             )
    //           );
    //         }
    //       )
    //     );
    //   })
    // );
  }

  update(this: cineIntro2, time: number, delta: number) {
    if (this.dialogue) this.dialogue.update();
    if (this.nextCine) this.cine.scene.restart({ keyname: "cine_intro_3" });
  }
}

export default cineIntro2;
