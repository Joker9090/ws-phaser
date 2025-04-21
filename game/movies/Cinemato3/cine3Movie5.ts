import Phaser from "phaser";
import Ticker, { TickerJob } from "../Ticker";
import DialogueManager from "../DialogueManager";
import CinematographyModular from "@/game/movies/Cinematography-modular";

class cine3Movie5 {
  ticker: Ticker;
  cine: CinematographyModular;
  nextCine: boolean = false;
  dialogue?: DialogueManager;
  //assets
  
  backgroundC3S5?: Phaser.GameObjects.Image;


  // controllers
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  setPos?: Function;
  constructor(cine: CinematographyModular) {
    this.cine = cine;
    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
    this.playCine();
    // music & sound
    this.cine.sound.add("c3Final").setVolume(0.25).play();

  }

   stopDialogue(){

     this.dialogue?.stop();
      this.dialogue?.destroyContainer();
    this.dialogue = undefined;
  }

  playCine(this: cine3Movie5) {
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

    this.backgroundC3S5 = this.cine.add
      .image(0, 0, "backgroundC3S5")
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
      this.backgroundC3S5,
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
    // camera.postFX.addVignette(0.5, 0.5, 0.8);
    if (this.cine.UIcontainer !== undefined)
      camera.ignore(this.cine.UIcontainer);

    const part1 = (job: TickerJob) => {
      this.dialogue = new DialogueManager(
        this.cine,
        // [""],
        ["Dann!! Dann, is that you!? "],
        [""],
        [
          {
            delay: 2000,
            withTapping: {
              audios: ["key01", "key01", "key02"],
              count: 24,
              delay: 180,
            },
            keepAlive: 3800,
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

  update(this: cine3Movie5, time: number, delta: number) {
    if (this.dialogue) this.dialogue.update();
    if (this.nextCine) this.cine.scene.restart({ keyname: "cine_3_movie_1" });
  }
}

export default cine3Movie5;
