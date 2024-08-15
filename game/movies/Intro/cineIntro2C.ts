import Phaser from "phaser";
import Ticker, { TickerJob } from "../Ticker";
import DialogueManager from "../DialogueManager";
import CinematographyModular from "@/game/movies/Cinematography-modular";

class cineIntro2C {
  ticker: Ticker;
  container?: Phaser.GameObjects.Container;
  nextCine: boolean = false;
  cine: CinematographyModular;
  dialogue?: DialogueManager;

  background3?: Phaser.GameObjects.Image;
  background2?: Phaser.GameObjects.Image;
  background1?: Phaser.GameObjects.Image;
  planetScene2?: Phaser.GameObjects.Image;
  nave?: Phaser.GameObjects.Image;
  
  
  nextText?: Phaser.GameObjects.Text;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(cine: CinematographyModular) {
    this.cine = cine;
    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
    this.playCine();
  }

  changeTextureGroup(items: Phaser.GameObjects.Image[]) {
    for (let i = 0; i < items.length; i++) {
      if (i + 1 <= items.length) {
        const newText = items[i].texture.key.split("-")[0];
        items[i].setTexture(newText);
      }
    }
  }

  playCine(this: cineIntro2C) {
    // START ticker
    this.cine.time.addEvent({
      delay: this.ticker.ms,
      callback: this.ticker.runTicker,
      loop: true,
    });

    const middlePoint = {
      x: this.cine.cameras.main.displayWidth / 2,
      y: this.cine.cameras.main.displayHeight / 2,
    };

    const gameObjectScaler = {
      x: window.innerWidth / 1920,
      y: window.innerHeight / 927,
    };
  
    this.background3 = this.cine.add.image(0, 0, "backgroundGlow").setOrigin(0.5);
    this.background2 = this.cine.add.image(0, 0, "backgronudClouds").setOrigin(0.5);
    this.background1 = this.cine.add.image(0, 0, "backgroundStars").setOrigin(0.5);
    this.planetScene2 = this.cine.add
      .image(-100, 400, "planetScene2")
      .setOrigin(1, 0.8)
      .setScale(1);
    this.nave = this.cine.add
      .image(0, 0, "nave2C")
      .setOrigin(0.5)
      .setSize(window.innerWidth, window.innerHeight);

    const darkMask = this.cine.add.rectangle(
      0,
      0,
      window.innerWidth,
      window.innerHeight,
      0,
      0.3
    );

    const assetsScenes = [
      this.background3,
      this.background2,
      this.background1,
      this.planetScene2,
      this.nave,
      

      darkMask,
    ];

    // this.tintGroup(images)

    this.container = this.cine.add
      .container(middlePoint.x, middlePoint.y)
      .setSize(1920, 927);
    this.container.add(assetsScenes);
    this.container.setScale(
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
    cameraDialogue.ignore(this.container);

    const camera = this.cine.cameras.main;
    camera.postFX.addVignette(0.5, 0.5, 0.8);

    const spaceshipAmbientSoundEffect = this.cine.sound.add("spaceshipAmbient");
    spaceshipAmbientSoundEffect.setVolume(1.5);
    spaceshipAmbientSoundEffect.play();


    const part1 = (job: TickerJob) => {
      this.dialogue = new DialogueManager(
        this.cine,
        [
          "I will go investigate it",
        ],
        [""],
        [
          {
            delay: 6000,
            keepAlive: 5000,
          },
        ]
      );

      this.dialogue.play()
      this.cine.tweens.add({
        targets: [
          this.background1,
          this.background2,
          this.background3,
          // this.planetScene2,
        ],
        scale: 1.3,
        duration: 45000,
        ease: "linear",
      });
      const tween1 = this.cine.tweens.add({
        targets: [
          this.background1,
          this.background2,
          this.background3,
          // this.planetScene2,
          // this.planetScene2,
        ],
        x: "-=200",
        duration: 45000,
        ease: "linear",
      });
      this.cine.tweens.add({
        targets: [
          this.planetScene2
        ],
        scale: 1.2,
        x: "+=400",
        duration: 45000,
        ease: "linear",
      });
      const tween2 = this.cine.tweens.add({
        targets: [camera],
        zoom: 1.3,
        duration: 60000,
        ease: "linear",
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
        spaceshipAmbientSoundEffect.stop();
        this.nextCine = true;
      })
    );
  }

  update(this: cineIntro2C, time: number, delta: number) {
    if (this.dialogue) this.dialogue.update();
    if (this.nextCine) this.cine.scene.restart({ keyname: "cine_intro_3" });
  }
}

export default cineIntro2C;
