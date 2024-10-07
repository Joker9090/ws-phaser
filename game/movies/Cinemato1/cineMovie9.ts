import Phaser from "phaser";
import Ticker, { TickerJob } from "../Ticker";
import DialogueManager from "../DialogueManager";
import CinematographyModular from "@/game/movies/Cinematography-modular";

class cineMovie9 {
  ticker: Ticker;
  cine: CinematographyModular;
  nextCine: boolean = false;
  dialogue?: DialogueManager;
  //assets
  backgroundEarthStars?: Phaser.GameObjects.Image;
  backgroundEarth?: Phaser.GameObjects.Image;
  planetEarth?: Phaser.GameObjects.Image;
  shipCine2Scene9?: Phaser.GameObjects.Image;
  stoneEarth1?: Phaser.GameObjects.Image;
  stoneEarth2?: Phaser.GameObjects.Image;
  stoneEarth3?: Phaser.GameObjects.Image;
  nubesEarth?: Phaser.GameObjects.Image;
  // controllers
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  setPos?: Function;
  constructor(cine: CinematographyModular) {
    this.cine = cine;
    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
    this.playCine();
    // music
  }

  playCine(this: cineMovie9) {
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

    // this.backgroundPressButton = this.cine.add
    //   .image(0, 0, "backgroundPressButton")
    //   .setOrigin(0.5);
    this.backgroundEarthStars = this.cine.add.image(0, 0, "backgroundEarthStars").setOrigin(0.5);
    this.backgroundEarth = this.cine.add.image(0, 0, "backgroundEarth").setOrigin(0.5);
    this.nubesEarth = this.cine.add.image(0, 0, "nubesEarth").setOrigin(0.5);
    this.planetEarth = this.cine.add.image(200, -200, "planetEarth").setOrigin(0.5).setScale(0.5);
    this.shipCine2Scene9 = this.cine.add.image(-200, 200, "shipCine2Scene9").setOrigin(0.5);
    this.stoneEarth1 = this.cine.add.image(-middlePoint.x - 400, -400, "stoneEarth1").setOrigin(0, 0.5);
    this.stoneEarth2 = this.cine.add.image(-middlePoint.x - 300, -200, "stoneEarth2").setOrigin(0.5);
    this.stoneEarth3 = this.cine.add.image(-middlePoint.x - 200, 0, "stoneEarth3").setOrigin(0.5);

    const gameObjects = [
      this.backgroundEarth,
      this.backgroundEarthStars,
      this.nubesEarth,
      this.planetEarth,
      this.shipCine2Scene9,
      this.stoneEarth1,
      this.stoneEarth2,
      this.stoneEarth3,
    ];

    const darkMask = this.cine.add.rectangle(
      0,
      0,
      window.innerWidth * 1.1,
      window.innerHeight * 1.1,
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
    if (this.cine.UIcontainer !== undefined) camera.ignore(this.cine.UIcontainer);

    const part1 = (job: TickerJob) => {
      this.dialogue = new DialogueManager(
        this.cine,
        ["Well, here we are... ", "This would be a lot more fun if you were here, Dann"],
        ["", ""],
        [
          {
            delay: 500,
            keepAlive: 1000,
          },
          {
            delay: 500,
            keepAlive: 1000,
          },
        ],
        90
      );
      this.dialogue?.play();
      this.cine.tweens.add({
        targets: [camera],
        zoom: 1.3,
        delay: 0,
        duration: 15000,
        onLoop: (e) => {
          console.log("ARIEL ON LOOP", e)
        },
        onYoyo: (e) => {
          console.log("ARIEL ON YOYO", e)
        },
        ease: "ease",
      });
      this.cine.tweens.add({
        targets: [this.shipCine2Scene9],
        y: '+=10',
        loop: -1,
        yoyo: true,
        // rotation: Math.PI / 8,
        delay: 0,
        duration: 6500,
        ease: "ease",
      });
      this.cine.tweens.add({
        targets: [this.stoneEarth3],
        x: middlePoint.x + 100,
        y: 50,
        rotation: Math.PI / 8,
        delay: 0,
        duration: 8500,
        ease: "ease",
      });
      this.cine.tweens.add({
        targets: [this.stoneEarth2],
        x: middlePoint.x + 100,
        y: -150,
        rotation: Math.PI / 12,
        delay: 3000,
        duration: 8500,
        ease: "ease",
      });
      this.cine.tweens.add({
        targets: [this.stoneEarth1],
        x: middlePoint.x + 100,
        y: -350,
        rotation: Math.PI / 10,
        delay: 1500,
        duration: 12500,
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

  update(this: cineMovie9, time: number, delta: number) {
    if (this.dialogue) this.dialogue.update();
    if (this.nextCine) this.cine.scene.restart({ keyname: "cine_movie_1" });
  }
}

export default cineMovie9;
