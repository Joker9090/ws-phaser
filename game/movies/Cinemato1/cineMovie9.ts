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
  backgroundStars?: Phaser.GameObjects.Image;
  backgroundButtonsOn?: Phaser.GameObjects.Image;
  brazoPressButton?: Phaser.GameObjects.Image;
  pinkButton?: Phaser.GameObjects.Image;
  violetButton?: Phaser.GameObjects.Image;
  graphics?: Phaser.GameObjects.Graphics;
  mask?: Phaser.Display.Masks.GeometryMask;
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
    this.backgroundButtonsOn = this.cine.add
      .image(0, 0, "backgroundButtonsOn")
      .setOrigin(0.5);
    this.brazoPressButton = this.cine.add
      .image(300, -500, "brazoPressButton")
      .setOrigin(0, 0.5);

    this.pinkButton = this.cine.add
      .image(0, 0, "pinkButton")
      .setOrigin(0.5)
      .setVisible(false);
    this.violetButton = this.cine.add
      .image(-50, -60, "violetButton")
      .setOrigin(0.5);
    // this.violetButton = this.cine.add
    //   .image(-middlePoint.x + 300, -middlePoint.y, "violetButton")
    //   .setOrigin(0.5);

    this.graphics = this.cine.add.graphics();
    this.graphics.fillStyle(0xffffff, 0);
    const graphg = this.graphics.fillCircle(-60, -185, 350).setScale
    (0.9,0.44);
 
    console.log(this.cine);

    const gameObjects = [
    //   this.backgroundPressButton,
      this.backgroundButtonsOn,
      this.violetButton,
      // this.pinkButton,
      this.brazoPressButton,
    ];

    this.mask = this.graphics.createGeometryMask();
    this.mask?.setShape(graphg);
    console.log(this.violetButton.x, this.violetButton.y);

    this.mask.geometryMask.setPosition(middlePoint.x , middlePoint.y)
    this.violetButton.setMask(this.mask);

    const darkMask = this.cine.add.rectangle(
      0,
      0,
      window.innerWidth * 1.1,
      window.innerHeight * 1.1,
      0,
      0
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
        ["Power core is stable...", "Thrusters are ready..."],
        ["", ""],
        [
          {
            delay: 500,
            keepAlive: 1000,
          },
          {
            delay: 1500,
            keepAlive: 1000,
          },
        ],
        90
      );
        this.dialogue?.play();
      this.cine.tweens.add({
        targets: [ this.brazoPressButton ],
        x: -250,
        y: -200,
        delay: 0,
        duration: 3500,
        onComplete: ()=> {
          this.violetButton?.setTint(0xff0000)
        },
        ease: "ease",
        yoyo: true
    });
    this.cine.tweens.add({
      targets: [ this.backgroundButtonsOn ],
      alpha: 0,
      delay: 0,
      duration: 1000,
      loop: -1,
      ease: "expo",
  });
      this.cine.tweens.add({
        targets: [ this.violetButton ],
        y: 100,
        delay: 2000,
        duration: 1500,
        onComplete: ()=> {
          this.violetButton?.setTint(0xff0000)
        },
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
    if (this.nextCine) this.cine.scene.restart({ keyname: "cine_movie_9" });
  }
}

export default cineMovie9;
