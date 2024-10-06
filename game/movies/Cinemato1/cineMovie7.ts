import Phaser from "phaser";
import Ticker, { TickerJob } from "../Ticker";
import DialogueManager from "../DialogueManager";
import CinematographyModular from "@/game/movies/Cinematography-modular";

class cineMovie7 {
  ticker: Ticker;
  cine: CinematographyModular;
  nextCine: boolean = false;
  dialogue?: DialogueManager;
  //assets
  backgroundAcelerar?: Phaser.GameObjects.Image;
  barraColorEmpty?: Phaser.GameObjects.Image;
  barraColorFull?: Phaser.GameObjects.Image;
  brazoAcelerar?: Phaser.GameObjects.Image;
  lucesPrendidasAcelerar?: Phaser.GameObjects.Image;
  palanca?: Phaser.GameObjects.Image;
  graphics?: Phaser.GameObjects.Graphics;
  mask?: Phaser.Display.Masks.GeometryMask;
  // controllers
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(cine: CinematographyModular) {
    this.cine = cine;
    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
    this.playCine();
  }

  playCine(this: cineMovie7) {
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

    this.backgroundAcelerar = this.cine.add
      .image(0, 0, "backgroundAcelerar")
      .setOrigin(0.5);
    this.barraColorEmpty = this.cine.add
      .image(100, 0, "barraColorEmpty")
      .setOrigin(0.5);
    this.barraColorFull = this.cine.add
      .image(100, 0, "barraColorFull")
      .setOrigin(0.5);
    this.lucesPrendidasAcelerar = this.cine.add
      .image(0, 0, "lucesPrendidasAcelerar")
      .setOrigin(0.5)
      .setVisible(true);
    this.palanca = this.cine.add.image(-165, 350, "palanca").setOrigin(0.5);
    this.brazoAcelerar = this.cine.add.image(-180, 350, "brazoAcelerar").setOrigin(0.5, 0.08);

    this.graphics = this.cine.add.graphics();
    this.graphics.fillStyle(0xffffff, 0);
    this.graphics.fillRect(0, 0, window.innerWidth, window.innerHeight);
    this.mask = this.graphics.createGeometryMask();
    this.mask.invertAlpha = true;

    this.barraColorFull.setMask(this.mask);

    const changeMaskHeight = (newHeight: number) => {
      this.graphics?.clear();
      this.graphics?.fillStyle(0xffffff, 0);
      this.graphics?.fillRect(0, 0, window.innerWidth, newHeight);
    };

    const gameObjects = [
      this.backgroundAcelerar,
      this.barraColorEmpty,
      this.barraColorFull,
      this.lucesPrendidasAcelerar,
      this.palanca,
      this.brazoAcelerar,
    ];

    const darkMask = this.cine.add.rectangle(
      0,
      0,
      window.innerWidth,
      window.innerHeight,
      0,
      0.3
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

    const part1 = (job: TickerJob) => {
      this.dialogue = new DialogueManager(
        this.cine,
        ["Engage!"],
        [""],
        [
          {
            delay: 4000,
            keepAlive: 2000,
          },
        ],
        90
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
        duration: 20000,
        ease: "ease",
      });

      this.cine.tweens.add({
        targets: [this.lucesPrendidasAcelerar],
        alpha: 0.2,
        duration: 1500,
        loop: -1,
        ease: "expo",
      });

      this.cine.tweens.add({
          targets: [ this.palanca, this.brazoAcelerar ],
          y: -350,
          duration: 3500,
          onUpdate: (e)=>{
           changeMaskHeight(window.innerHeight * (1 - e.progress))
          },
          ease: "ease.in",
      });
      this.cine.tweens.add({
        targets: [ this.brazoAcelerar ],
        y: 350,
        x: -300,
        delay: 3700,
        duration: 3500,
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

  update(this: cineMovie7, time: number, delta: number) {
    if (this.dialogue) this.dialogue.update();
    if (this.nextCine) this.cine.scene.restart({ keyname: "cine_movie_1" });
  }
}

export default cineMovie7;
