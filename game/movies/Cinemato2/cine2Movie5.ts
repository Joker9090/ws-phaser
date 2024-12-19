import Phaser from "phaser";
import Ticker, { TickerJob } from "../Ticker";
import DialogueManager from "../DialogueManager";
import CinematographyModular from "@/game/movies/Cinematography-modular";

class cine2Movie5 {
  ticker: Ticker;
  cine: CinematographyModular;
  nextCine: boolean = false;
  dialogue?: DialogueManager;
  //assets

  backgroundScene5?: Phaser.GameObjects.Image;
  cloudScene5?: Phaser.GameObjects.Image;
  starsScene5?: Phaser.GameObjects.Image;
  BackgroundMountainScene5?: Phaser.GameObjects.Image;
  bubble1?: Phaser.GameObjects.Image;
  bubble2?: Phaser.GameObjects.Image;
  bubble3?: Phaser.GameObjects.Image;
  frontMountainScene5?: Phaser.GameObjects.Image;
  opacityScene5?: Phaser.GameObjects.Image;


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

  playCine(this: cine2Movie5) {
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
    this.cloudScene5 = this.cine.add
      .image(-600, 0, "cloudScene5")
      .setOrigin(0.5)
      .setScale(1.5, 1.3);
    this.starsScene5 = this.cine.add
      .image(-0, 0, "starsScene5")
      .setOrigin(0.5)
    this.BackgroundMountainScene5 = this.cine.add
      .image(0, 0, "BackgroundMountainScene5")
      .setOrigin(0.5);
    this.bubble1 = this.cine.add
      .image(0, 0, "bubble1")
      .setOrigin(0.5);
    this.bubble2 = this.cine.add
      .image(0, 0, "bubble2")
      .setOrigin(0.5);
    this.bubble3 = this.cine.add
      .image(0, 0, "bubble3")
      .setOrigin(0.5);
    this.frontMountainScene5 = this.cine.add
      .image(0, 0, "frontMountainScene5")
      .setOrigin(0.5);
    this.opacityScene5 = this.cine.add
      .image(0, 200, "opacityScene5")
      .setOrigin(0.5);

    const darkMask = this.cine.add.rectangle(
      0,
      0,
      window.innerWidth*2,
      window.innerHeight*2,
      0,
      1
    ).setAlpha(0);

    const gameObjects = [
      this.backgroundScene5,
      this.starsScene5,
      this.cloudScene5,
      this.BackgroundMountainScene5,
      this.bubble1,
      this.bubble2,
      this.bubble3,
      this.opacityScene5,
      this.frontMountainScene5,
      darkMask,
    ];

    // this.cine.cameras.main.zoom = 0.5


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
    camera.postFX.addVignette(0.5, 0.5, 0.8);
    if (this.cine.UIcontainer !== undefined)
      camera.ignore(this.cine.UIcontainer);

    const part1 = (job: TickerJob) => {
      this.dialogue = new DialogueManager(
        this.cine,
        ["I've never seen something like this..."],
        [""],
        [
          {
            delay: 1500,
            withTapping: {
              audios: ["key01", "key01", "key02"],
              count: 24,
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
        targets: [this.cloudScene5],
        x: '+=600',
        delay: 0,
        duration: 40000,
        ease: "ease",
      });

      this.cine.tweens.add({
        targets: [this.bubble1],
        x: '+=10',
        delay: 0,
        yoyo: true,
        duration: 2000,
        ease: "ease",
      });
      this.cine.tweens.add({
        targets: [this.bubble1],
        y: '-=400',
        delay: 0,
        duration: 40000,
        ease: "ease",
      });
      this.cine.tweens.add({
        targets: [this.bubble2],
        x: '+=7',
        delay: 0,
        yoyo: true,
        duration: 2000,
        ease: "ease",
      });
      this.cine.tweens.add({
        targets: [this.bubble2],
        y: '-=50',
        delay: 0,
        duration: 20000,
        ease: "ease",
      });
      this.cine.tweens.add({
        targets: [this.bubble3],
        x: '-=17',
        delay: 0,
        yoyo: true,
        duration: 2000,
        ease: "ease",
      });
      this.cine.tweens.add({
        targets: [this.bubble3],
        y: '-=100',
        delay: 0,
        duration: 10000,
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

  update(this: cine2Movie5, time: number, delta: number) {
    if (this.dialogue) this.dialogue.update();
    if (this.nextCine) this.cine.scene.restart({ keyname: "cine_2_movie_6" });
  }
}

export default cine2Movie5;
