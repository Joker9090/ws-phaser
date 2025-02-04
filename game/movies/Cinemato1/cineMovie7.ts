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
    // sound & music
    this.cine.sound.add("C2_12").setVolume(0.25).play()
    setTimeout(() => {
      this.cine.sound.add("C2_3").setVolume(0.25).play()
  }, 2500)
  }
  stopDialogue(){
     this.dialogue?.stop();
      this.dialogue?.destroyContainer();
    this.dialogue = undefined;
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
    this.brazoAcelerar = this.cine.add.image(-270, 350, "brazoAcelerar").setOrigin(0.5, 0.08);

    this.graphics = this.cine.add.graphics();
    this.graphics.fillStyle(0xffffff, 0);
    this.graphics.fillRect(0, 0, window.innerWidth, window.innerHeight);
    this.mask = this.graphics.createGeometryMask();
    this.mask.invertAlpha = true;

    this.barraColorFull.setMask(this.mask);

    const changeMaskHeight = (parameter: number) => {
      let heightConversion = 1
      switch (true) {
        case (parameter >= 0 && parameter < 0.15):
          heightConversion = 0;
          break;
        case (parameter >= 0.15 && parameter < 0.26):
            heightConversion = 0.15;
            break;
        case (parameter >= 0.26 && parameter < 0.38):
            heightConversion = 0.26;
            break;
        case (parameter >= 0.38 && parameter < 0.50):
            heightConversion = 0.38;
            break;
        case (parameter >= 0.50 && parameter < 0.62):
            heightConversion = 0.50;
            break;
        case (parameter >= 0.62 && parameter < 0.74):
            heightConversion = 0.62;
            break;
        case (parameter >= 0.74 && parameter < 0.86):
            heightConversion = 0.74;
            break;
        case (parameter >= 0.86 && parameter < 0.98):
            heightConversion = 0.86;
            break;
        case (parameter >= 0.98 && parameter <= 1):
            heightConversion = 0.98;
            break;
      }
      this.graphics?.clear();
      this.graphics?.fillStyle(0xffffff, 0);
      this.graphics?.fillRect(0, 0, window.innerWidth, window.innerHeight*heightConversion);
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
      window.innerWidth*2,
      window.innerHeight*2,
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
    // camera.postFX.addVignette(0.5, 0.5, 0.8);

    const part1 = (job: TickerJob) => {
      this.dialogue = new DialogueManager(
        this.cine,
        ["activating warp!"],
        [""],
        [
          {
            delay: 1000,
            withTapping: {
              audios: ["key01","key01", "key02"],
              count: 8,
              delay: 180,
            },
            keepAlive: 1250,
            position: {
              width: 400
            }
          },
        ],
        80
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
        targets: [this.lucesPrendidasAcelerar],
        alpha: 0.2,
        duration: 1500,
        loop: -1,
        ease: "expo",
      });

      this.cine.tweens.add({
          targets: [ this.palanca, this.brazoAcelerar ],
          y: -350,
          duration: 3000,
          onUpdate: (e)=>{
           changeMaskHeight((1 - e.progress))
          //  changeMaskHeight(window.innerHeight * 0.14)
          },
          ease: "ease.in",
      });
      this.cine.tweens.add({
        targets: [ this.brazoAcelerar ],
        y: 350,
        x: -300,
        delay: 3100,
        duration: 2500,
        ease: "ease",
    });

    };

    this.ticker.addJob(
      new TickerJob(1, 10, part1, false, 4500, true, (job: TickerJob) => {
        // soundChangeScene.stop()
        this.nextCine = true;
      })
    );
  }

  update(this: cineMovie7, time: number, delta: number) {
    if (this.dialogue) this.dialogue.update();
    if (this.nextCine) this.cine.scene.restart({ keyname: "cine_movie_8" });
  }
}

export default cineMovie7;
