import Phaser from "phaser";
import Ticker, { TickerJob } from "../Ticker";
import DialogueManager from "../DialogueManager";
import CinematographyModular from "@/game/movies/Cinematography-modular";

class cine2Movie1 {
  ticker: Ticker;
  cine: CinematographyModular;
  nextCine: boolean = false;
  dialogue?: DialogueManager;
  //assets
  backgroundEarthStars?: Phaser.GameObjects.Image;
  arm1?: Phaser.GameObjects.Image;
  arm2?: Phaser.GameObjects.Image;
  astro?: Phaser.GameObjects.Image;
  backgorundMountain?: Phaser.GameObjects.Image;
  bag?: Phaser.GameObjects.Image;
  food?: Phaser.GameObjects.Image;
  skyDay?: Phaser.GameObjects.Image;
  cloudsDay?: Phaser.GameObjects.Image;


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

  playCine(this: cine2Movie1) {
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

    this.skyDay = this.cine.add
      .image(0, 0, "skyDay")
      .setOrigin(0.5);
    this.cloudsDay = this.cine.add
      .image(-300, 0, "cloudsDay")
      .setOrigin(0.5)
      .setScale(1.5, 1.3);
    this.arm1 = this.cine.add
      .image(0, 0, "arm1")
      .setOrigin(0.5);
    this.arm2 = this.cine.add
      .image(0, 0, "arm2")
      .setOrigin(0.5);
    this.astro = this.cine.add
      .image(0, 0, "astroCine2")
      .setOrigin(0.5);
    this.backgorundMountain = this.cine.add
      .image(0, 0, "backgroundMountain")
      .setOrigin(0.5);
    this.bag = this.cine.add
      .image(0, 0, "bag")
      .setOrigin(0.5);
    this.food = this.cine.add
      .image(0, 0, "food")
      .setOrigin(0.5);

    const gameObjects = [
      this.skyDay,
      this.cloudsDay,
      this.backgorundMountain,
      this.astro,
      this.food,
      this.bag,
      this.arm1,
      this.arm2,
    ];

    // this.cine.cameras.main.zoom = 0.5

    const darkMask = this.cine.add.rectangle(
      0,
      0,
      window.innerWidth*2,
      window.innerHeight*2,
      0,
      0.2
    );

    const container = this.cine.add
      .container(middlePoint.x, middlePoint.y)
      .setSize(1920, 927);

    container.add(gameObjects);

    container.add([darkMask]);

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
        ["well, this should be enough for now"],
        [""],
        [
          {
            delay: 2000,
            withTapping: {
              audios: ["key01", "key01", "key02"],
              count: 14,
              delay: 180,
            },
            keepAlive: 1500,
            position: {
              width: 700,
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
        targets: [this.astro, this.arm1, this.arm2,],
        y: '+=30',
        delay: 0,
        duration: 1000,
        yoyo: true,
        loop: -1,
        ease: "ease",
      });

      this.cine.tweens.add({
        targets: [this.bag],
        y: '+=25',
        delay: 100,
        duration: 1000,
        yoyo: true,
        loop: -1,
        ease: "ease",
      });

      this.cine.tweens.add({
        targets: [this.food],
        y: '+=20',
        delay: 100,
        duration: 1000,
        yoyo: true,
        loop: -1,
        ease: "ease",
      });

      this.cine.tweens.add({
        targets: [this.cloudsDay],
        x: '+=600',
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

  update(this: cine2Movie1, time: number, delta: number) {
    if (this.dialogue) this.dialogue.update();
    if (this.nextCine) this.cine.scene.restart({ keyname: "cine_2_movie_2" });
  }
}

export default cine2Movie1;
