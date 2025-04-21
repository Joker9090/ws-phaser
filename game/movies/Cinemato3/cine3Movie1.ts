import Phaser from "phaser";
import Ticker, { TickerJob } from "../Ticker";
import DialogueManager from "../DialogueManager";
import CinematographyModular from "@/game/movies/Cinematography-modular";

class cine3Movie1 {
  ticker: Ticker;
  cine: CinematographyModular;
  nextCine: boolean = false;
  dialogue?: DialogueManager;
  //assets
  backgroundC3S1?: Phaser.GameObjects.Image;
  bubblesC3S1?: Phaser.GameObjects.Image;
  cloud1C3S1?: Phaser.GameObjects.Image;
  cloud2C3S1?: Phaser.GameObjects.Image;
  shipAndAstro?: Phaser.GameObjects.Image;
  shipLightsC3S1?: Phaser.GameObjects.Image;
  starsC3S1?: Phaser.GameObjects.Image;
  treeFrontC3S1?: Phaser.GameObjects.Image;
  timeEvent?: Phaser.Time.TimerEvent

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
    this.cine.time.delayedCall(1100, ()=>{
      this.cine.sound.add("c3Background").setVolume(0.7).play()
    })


  }

  stopDialogue() {
    this.dialogue?.stop();
    this.dialogue?.destroyContainer();
    this.dialogue = undefined;
  }

  playCine(this: cine3Movie1) {
   this.timeEvent = this.cine.time.addEvent({
      delay: this.ticker.ms,
      callback: this.ticker.runTicker,
      loop: true,
    });
    // this.cine.time.delayedCall(1000, () => {
    //   timeEvent.paused = true;
    //   this.cine.scene.pause();
    //   console.log("entro timeout", timeEvent)
    // }, [], this)
    // this.cine.time.delayedCall(3000, () => {
    //   timeEvent.paused = false;
    //   this.cine.scene.resume();
    //   console.log("entro timeout 2", timeEvent)
    // }, [], this)
    this.cursors = this.cine.input.keyboard?.createCursorKeys();

    const middlePoint = {
      x: this.cine.cameras.main.displayWidth / 2,
      y: this.cine.cameras.main.displayHeight / 2,
    };

    const gameObjectScaler = {
      x: window.innerWidth / 1920,
      y: window.innerHeight / 927,
    };

    this.backgroundC3S1 = this.cine.add
      .image(0, 0, "backgroundC3S1")
      .setOrigin(0.5);
    this.bubblesC3S1 = this.cine.add
      .image(0, 200, "bubblesC3S1")
      .setOrigin(0.5)
    this.cloud1C3S1 = this.cine.add
      .image(300, -300, "cloud1C3S1")
      .setOrigin(0.5)
      .setScale(1.5, 1.2);
    this.cloud2C3S1 = this.cine.add
      .image(-300, -150, "cloud2C3S1")
      .setOrigin(0.5)
      .setScale(1.5, 1.2);
    this.shipAndAstro = this.cine.add
      .image(0, 0, "shipAndAstro")
      .setOrigin(0.5);
    this.shipLightsC3S1 = this.cine.add
      .image(0, 0, "shipLightsC3S1")
      .setOrigin(0.5);
    this.starsC3S1 = this.cine.add
      .image(0, 0, "starsC3S1")
      .setOrigin(0.5);
    this.treeFrontC3S1 = this.cine.add
      .image(0, 0, "treeFrontC3S1")
      .setOrigin(0.5);

    const gameObjects = [
      this.backgroundC3S1,
      this.starsC3S1,
      this.cloud1C3S1,
      this.cloud2C3S1,
      this.bubblesC3S1,
      this.shipAndAstro,
      this.shipLightsC3S1,
      this.treeFrontC3S1,
    ];

    // this.cine.cameras.main.zoom = 0.5

    const darkMask = this.cine.add.rectangle(
      0,
      0,
      window.innerWidth * 2,
      window.innerHeight * 2,
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
    // camera.postFX.addVignette(0.5, 0.5, 0.8);
    if (this.cine.UIcontainer !== undefined)
      camera.ignore(this.cine.UIcontainer);

    const part1 = (job: TickerJob) => {
      this.dialogue = new DialogueManager(
        this.cine,
        ["I hope you guys are ok... where do you think I should go now Dann?"],
        [""],
        [
          {
            delay: 1500,
            withTapping: {
              audios: ["key01", "key01", "key02"],
              count: 28,
              delay: 180,
            },

            keepAlive: 3800,
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
        zoom: 1.3,
        scrollX: -200,
        scrollY: 85,
        delay: 0,
        duration: 17000,
        ease: "ease",
      });

      this.cine.tweens.add({
        targets: [this.bubblesC3S1],
        y: '-=100',
        delay: 0,
        duration: 17000,
        ease: "ease",
      });
      this.cine.tweens.add({
        targets: [this.bubblesC3S1],
        x: '+=9',
        delay: 0,
        yoyo: true,
        loop: -1,
        duration: 7000,
        ease: "ease",
      });
      this.cine.tweens.add({
        targets: [this.cloud1C3S1],
        x: '+=600',
        delay: 0,
        duration: 40000,
        ease: "ease",
      });
      this.cine.tweens.add({
        targets: [this.cloud2C3S1],
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

  update(this: cine3Movie1, time: number, delta: number) {
    if (this.dialogue) this.dialogue.update();
    if (this.nextCine) this.cine.scene.restart({ keyname: "cine_3_movie_2" });
  }
}

export default cine3Movie1;
