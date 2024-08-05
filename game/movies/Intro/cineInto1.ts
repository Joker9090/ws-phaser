import Phaser from "phaser";
import Ticker, { TickerJob } from "../Ticker";
import DialogueManager from "../DialogueManager";
import CinematographyModular from "@/game/movies/Cinematography-modular";

class cineIntro1 {
  ticker: Ticker;
  cine: CinematographyModular;
  nextCine: boolean = false;
  dialogue?: DialogueManager;

  //assets
  background3?: Phaser.GameObjects.Image;
  background2?: Phaser.GameObjects.Image;
  background1?: Phaser.GameObjects.Image;
  darkness?: Phaser.GameObjects.Image;
  ship?: Phaser.GameObjects.Image;
  shipOverImage?: Phaser.GameObjects.Image;
  shipZoom?: Phaser.GameObjects.Image;
  shipZoomOn?: Phaser.GameObjects.Image;
  planet?: Phaser.GameObjects.Image;
  // controllers
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(cine: CinematographyModular) {
    this.cine = cine;
    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
    this.playCine();
  }

  playCine(this: cineIntro1) {
    // START ticker
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

    this.background3 = this.cine.add
      .image(0, 0, "backgroundGlow")
      .setOrigin(0.5, 0.5);
    this.background2 = this.cine.add
      .image(0, 0, "backgronudClouds")
      .setOrigin(0.5, 0.5);
    this.background1 = this.cine.add
      .image(0, 0, "backgroundStars")
      .setOrigin(0.5, 0.5);
    this.darkness = this.cine.add.image(0, 0, "darkness").setOrigin(0.5, 0.5);
    this.planet = this.cine.add
      .image(0, 0, "planet")
      .setOrigin(0.5, 0.5)
      .setPosition(-600, -0)
      .setScale(1.4);
    this.ship = this.cine.add.image(200, .100, "shipOff").setOrigin(0.5, 0.5).setScale(0.3);
    this.shipOverImage = this.cine.add
      .image(200, .100, "shipOn")
      .setOrigin(0.5, 0.5)
      .setScale(0.3);
    this.shipZoom = this.cine.add
      .image(0, 300, "naveZoom")
      .setOrigin(0.5, 0.5)
      .setVisible(false)
      .setScale(0.7);
    this.shipZoomOn = this.cine.add
      .image(0, 300, "naveZoomOn")
      .setOrigin(0.5, 0.5)
      .setVisible(false)
      .setScale(0.7);

    /* put all
    background3
    background2
    background1
    planet
    ship
    shipOverImage
    shipZoom
    shipZoomOn
    in an array and iterate each one to set the brightness to 0.5 (malardo)
    */

    const brightness = 0.5;
    const gameObjects = [
      this.background3,
      this.background2,
      this.background1,
      this.planet,
      this.ship,
      // this.shipOverImage,
      this.shipZoom,
      this.shipZoomOn,
    ];

    gameObjects.forEach((gameObject) => {
      gameObject.setAlpha(brightness);
    });

    const container = this.cine.add
      .container(middlePoint.x, middlePoint.y)
      .setSize(1920, 927);

    container.add([
      this.background3,
      this.background2,
      this.background1,
      this.darkness,
      this.planet,
      this.ship,
      this.shipOverImage,
      this.shipZoom,
      this.shipZoomOn,
    ]);

    container.setScale(
      gameObjectScaler.x < gameObjectScaler.y
        ? gameObjectScaler.y
        : gameObjectScaler.x
    );
    // const DialogueScene = this.game.scene.getScene("DialogueManager");
    // this.scene.launch(DialogueScene)
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
      const tween1 = this.cine.tweens.add({
        targets: [this.shipOverImage, this.shipZoomOn],
        alpha: 0,
        duration: 5000,
        ease: "expo.out",
        loop: -1,
      });

      const tween2 = this.cine.tweens.add({
        targets: camera,
        zoom: 1.3,
        duration: 120000,
        ease: "Linear",
      });

      const tween3 = this.cine.tweens.add({
        targets: [this.ship, this.shipOverImage],
        angle: "+=5",
        x: "+=10",
        y: "-=15",
        duration: 7000,
        ease: "Linear",
        yoyo: false,
        loop: 0,
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


    const part2 = (job: TickerJob) => {
      const tween3 = this.cine.tweens.add({
        targets: [this.ship, this.shipOverImage],
        x: "+=10",
        y: "-=15",
        duration: 6600,
        ease: "Linear",
        yoyo: false,
        loop: 0,
      });
      this.dialogue = new DialogueManager(
        this.cine,
        [
          "Emergency log number 325...",
        ],
        ["cineIntro1_2"],
        [
          {
            delay: 5000,
            keepAlive: 1700,
          },
        ]
      );
      this.dialogue?.play();

      this.shipOverImage?.setScale(0.5).setPosition(-350,50);
      this.ship?.setScale(0.5).setPosition(-350,50);
      this.planet?.setPosition(100, -300).setScale(1.7).setRotation(Math.PI)

      const dialogueListener = (newState: string, nextText?: string) => {
        if (newState === "CONTINUE") {
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
        [
          "I hope they've manage to escape in time. It seems like I'm alone in this forgotten corner of the galaxy...",
        ],
        ["cineIntro1_3"]
      );

      this.dialogue.play();
      camera.setZoom(1);
      this.planet?.setVisible(false);
      this.shipOverImage?.setVisible(false);
      this.ship?.setVisible(false);
      this.shipZoom?.setVisible(true);
      this.shipZoomOn?.setVisible(true);

      this.cine.tweens.add({
        targets: [this.background1, this.background2, this.background3],
        x: "-=15",
        y: "+=20",
        duration: 14000,
        ease: "cubic",
        loop: -1,
        yoyo: true,
      });

      this.cine.tweens.add({
        targets: camera,
        scrollY: "+=10",
        duration: 14000,
        delay: 500,
        ease: "linear",
        loop: -1,
        yoyo: true,
      });

      const dialogueListener = (newState: string, nextText?: string) => {
        if (newState === "FINISHED") {
          this.ticker.deleteJob(job.id);
        }
      };
      this.dialogue?.killState(dialogueListener);
      this.dialogue?.getState(dialogueListener);
    };

    this.ticker.addJob(
      new TickerJob(1, 10, part1, false, 7100, true, (job: TickerJob) => {
        this.ticker.addNextJob(
          new TickerJob(
            2,
            0,
            part2,
            false,
            undefined,
            true,
            (job: TickerJob) => {
              this.ticker.addNextJob(
                new TickerJob(
                  3,
                  0,
                  part3,
                  false,
                  undefined,
                  true,
                  (job: TickerJob) => {
                    this.nextCine = true;
                  }
                )
              );
            }
          )
        );
      })
    );
  }

  update(this: cineIntro1, time: number, delta: number) {
    if (this.dialogue) this.dialogue.update();
    if (this.nextCine) this.cine.scene.restart({ keyname: "cine_intro_2" });
  }
}

export default cineIntro1;
