import Phaser from "phaser";
import Ticker, { TickerJob } from "../Ticker";
import DialogueManager from "../DialogueManager";
import CinematographyModular from "@/game/movies/Cinematography-modular";
import MultiScene from "@/game/MultiScene";

class cine2Movie6 {
  ticker: Ticker;
  cine: CinematographyModular;
  nextCine: boolean = false;
  dialogue?: DialogueManager;
  //assets

  backgroundScene5?: Phaser.GameObjects.Image;
  starsScene5?: Phaser.GameObjects.Image;
  nubesScene6?: Phaser.GameObjects.Image;
  mountainsBackgroundScene6?: Phaser.GameObjects.Image;
  bubblesScene6?: Phaser.GameObjects.Image;
  singleBubble?: Phaser.GameObjects.Image;
  neblina?: Phaser.GameObjects.Image;
  mountainFrontScene6?: Phaser.GameObjects.Image;
  shipScene6?: Phaser.GameObjects.Image;
  astronautScene6?: Phaser.GameObjects.Image;
  opacityScene6?: Phaser.GameObjects.Image;


  // controllers
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  setPos?: Function;
  constructor(cine: CinematographyModular) {
    this.cine = cine;
    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
    this.playCine();
    // music & sound
    // this.cine.sound.add("C2_4").setVolume(0.25).play();

  }
 stopDialogue(){
     this.dialogue?.stop();
      this.dialogue?.destroyContainer();
    this.dialogue = undefined;
  }
  playCine(this: cine2Movie6) {
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

    this.backgroundScene5 = this.cine.add
      .image(0, 0, "backgroundScene5")
      .setOrigin(0.5);
    this.nubesScene6 = this.cine.add
      .image(-600, 0, "nubesScene6")
      .setOrigin(0.5)
      .setScale(1.5, 1.3);
    this.starsScene5 = this.cine.add
      .image(0, 0, "starsScene5")
      .setOrigin(0.5)
    this.mountainsBackgroundScene6 = this.cine.add
      .image(0, 0, "mountainsBackgroundScene6")
      .setOrigin(0.5);
    this.bubblesScene6 = this.cine.add
      .image(0, 100, "bubblesScene6")
      .setOrigin(0.5);
    this.singleBubble = this.cine.add
      .image(window.innerWidth/4, 0, "singleBubble").setScale(1.5)
      .setOrigin(0.5);
    this.neblina = this.cine.add
      .image(0, 0, "neblina")
      .setOrigin(0.5);
    this.mountainFrontScene6 = this.cine.add
      .image(0, 0, "mountainFrontScene6")
      .setOrigin(0.5);
    this.shipScene6 = this.cine.add
      .image(0, 0, "shipScene6")
      .setOrigin(0.5);
    this.astronautScene6 = this.cine.add
      .image(0, 0, "astronautScene6")
      .setOrigin(0.5);
    this.opacityScene6 = this.cine.add
      .image(0, 0, "opacityScene6")
      .setOrigin(0.5);

    const darkMask = this.cine.add.rectangle(
      0,
      0,
      window.innerWidth * 1.5,
      window.innerHeight * 1.5,
      0,
      1
    ).setAlpha(0);

    const gameObjects = [
      this.backgroundScene5,
      this.nubesScene6,
      this.starsScene5,
      this.mountainsBackgroundScene6,
      this.neblina,
      this.mountainFrontScene6,
      this.shipScene6,
      this.bubblesScene6,
      this.singleBubble,
      this.astronautScene6,
      this.opacityScene6,
    ];

    // this.cine.cameras.main.zoom = 0.8


    const container = this.cine.add
      .container(middlePoint.x, middlePoint.y)
      .setSize(1920, 927);

    container.add(gameObjects);

    // container.add([darkMask]);

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
    if (this.cine.UIcontainer !== undefined)
      camera.ignore(this.cine.UIcontainer);

    const part1 = (job: TickerJob) => {
      this.dialogue = new DialogueManager(
        this.cine,
        ["Let's get some oxygen!"],
        [""],
        [
          {
            delay: 1500,
            withTapping: {
              audios: ["key01", "key01", "key02"],
              count: 16,
              delay: 180,
            },
            keepAlive: 1500,
            position: {
              width: 750,
            },
          },
        ],
        80
      );
      this.dialogue?.play();
      this.cine.tweens.add({
        targets: [camera],
        zoom: 1.1,
        delay: 0,
        duration: 17000,
        ease: "ease",
      });

      this.cine.tweens.add({
        targets: [this.nubesScene6],
        x: '+=600',
        delay: 0,
        duration: 40000,
        ease: "ease",
      });

      this.cine.tweens.add({
        targets: [this.bubblesScene6, this.singleBubble],
        x: '+=10',
        delay: 0,
        yoyo: true,
        duration: 2000,
        ease: "ease",
      });
      this.cine.tweens.add({
        targets: [this.bubblesScene6, this.singleBubble],
        y: '-=400',
        delay: 0,
        duration: 40000,
        ease: "ease",
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
      new TickerJob(1, 10, part1, false, undefined, true, (job: TickerJob) => {
        this.nextCine = true;
      })
    );
  }

  update(this: cine2Movie6, time: number, delta: number) {
    if (this.dialogue) this.dialogue.update();
    if (this.nextCine) {
      const multiScene = new MultiScene("Game", { level: 8, lifes: 3 });
      const scene = this.cine.scene.add("MultiScene", multiScene, true);
      this.cine.scene.start("MultiScene").bringToTop("MultiScene");
    }
  }
}

export default cine2Movie6;
