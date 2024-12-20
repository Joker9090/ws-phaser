import Phaser from "phaser";
import Ticker, { TickerJob } from "../Ticker";
import DialogueManager from "../DialogueManager";
import CinematographyModular from "@/game/movies/Cinematography-modular";

class cineMovie6 {
  ticker: Ticker;
  cine: CinematographyModular;
  nextCine: boolean = false;
  dialogue?: DialogueManager;
  //assets
  backgroundPressButton?: Phaser.GameObjects.Image;
  backgroundButtonsOn?: Phaser.GameObjects.Image;
  buttonsOnA?: Phaser.GameObjects.Image;
  buttonsOnB?: Phaser.GameObjects.Image;
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
    // music & sound
    this.cine.sound.add("C2_10").setVolume(0.25).play()
    setTimeout(() => {
      this.cine.sound.add("C2_11").setVolume(0.25).play()
    }, 1000)

  }

  stopDialogue(){
    console.log('entro')
     this.dialogue?.stop();
      this.dialogue?.destroyContainer();
    this.dialogue = undefined;
  }

  playCine(this: cineMovie6) {
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

    this.backgroundPressButton = this.cine.add
      .image(0, 0, "backgroundPressButton")
      .setOrigin(0.5);
    this.buttonsOnA = this.cine.add
      .image(0, 0, "buttonsOnA")
      .setOrigin(0.5);
    this.buttonsOnB = this.cine.add
      .image(0, 0, "buttonsOnB")
      .setOrigin(0.5);
    this.brazoPressButton = this.cine.add
      .image(300, -500, "brazoPressButton")
      .setOrigin(0, 0.5);
    this.pinkButton = this.cine.add
      .image(-50, -60, "pinkButton")
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
      (0.9, 0.44);


    const gameObjects = [
      this.backgroundPressButton,
      this.buttonsOnA,
      this.buttonsOnB,
      this.violetButton,
      this.pinkButton,
      this.brazoPressButton,
    ];

    this.mask = this.graphics.createGeometryMask();
    this.mask?.setShape(graphg);

    this.mask.geometryMask.setPosition(middlePoint.x, middlePoint.y)
    this.violetButton.setMask(this.mask);
    this.pinkButton.setMask(this.mask);

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

    const part1 = (job: TickerJob) => {
      this.dialogue = new DialogueManager(
        this.cine,
        ["Power core is stable..."],
        ["", ""],
        [
          {
            delay: 1000,
            withTapping: {
              audios: ["key01", "key01", "key02"],
              count: 12,
              delay: 180,
            },
            keepAlive: 1250,
            position: {
              width: 450
            }
          },
        ],
        80
      );
      this.dialogue?.play();
      this.cine.tweens.add({
        targets: [this.brazoPressButton],
        x: -350,
        y: -275,
        delay: 0,
        duration: 2000,
        onComplete: () => {
          // this.violetButton?.setTint(0xff0000)
        },
        ease: "ease",
        yoyo: true
      });
      this.cine.tweens.add({
        targets: [this.buttonsOnA],
        alpha: 0,
        delay: 0,
        duration: 733,
        loop: -1,
        ease: "expo",
      });
      this.cine.tweens.add({
        targets: [this.buttonsOnB],
        alpha: 0,
        delay: 1000,
        duration: 589,
        loop: -1,
        ease: "expo",
      });
      this.cine.tweens.add({
        targets: [this.violetButton, this.pinkButton],
        y: 0,
        delay: 1500,
        duration: 500,
        onComplete: () => {
          this.violetButton?.setVisible(false)
          this.pinkButton?.setVisible(true)
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

  update(this: cineMovie6, time: number, delta: number) {
    if (this.dialogue) this.dialogue.update();
    if (this.nextCine) this.cine.scene.restart({ keyname: "cine_movie_7" });
  }
}

export default cineMovie6;
