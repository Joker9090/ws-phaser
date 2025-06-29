import Phaser from "phaser";
import Ticker, { TickerJob } from "../Ticker";
import DialogueManager from "../DialogueManager";
import CinematographyModular from "@/game/movies/Cinematography-modular";

class cine3Movie3 {
  ticker: Ticker;
  cine: CinematographyModular;
  nextCine: boolean = false;
  dialogue?: DialogueManager;
  //assets
  panelC3S3?: Phaser.GameObjects.Image;
  soundBarFullC3S3?: Phaser.GameObjects.Image;
  soundBarOpacityC3S3?: Phaser.GameObjects.Image;
  soundBarSmallC3S3?: Phaser.GameObjects.Image;
  speakerBack?: Phaser.GameObjects.Image;
  speakerCenter?: Phaser.GameObjects.Image;
  speakerMesh?: Phaser.GameObjects.Image;


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
    this.cine.sound.add("c3Radio1").setVolume(0.1).play()

    

  }
 stopDialogue(){
     this.dialogue?.stop();
      this.dialogue?.destroyContainer();
    this.dialogue = undefined;
  }
  playCine(this: cine3Movie3) {
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

    this.panelC3S3 = this.cine.add
      .image(0, 0, "panelC3S3")
      .setOrigin(0.5);
    this.soundBarFullC3S3 = this.cine.add
      .image(0, -220, "soundBarFullC3S3")
      .setOrigin(0.5)
    this.soundBarOpacityC3S3 = this.cine.add
      .image(-0, -220, "soundBarOpacityC3S3")
      .setOrigin(0.5)
    this.soundBarSmallC3S3 = this.cine.add
      .image(115, 87, "soundBarSmallC3S3")
      .setOrigin(0.5);
    this.speakerBack = this.cine.add
      .image(0, 0, "speakerBack")
      .setOrigin(0.5);
    this.speakerCenter = this.cine.add
      .image(687, -277, "speakerCenter")
      .setOrigin(0.5);
    this.speakerMesh = this.cine.add
      .image(0, 0, "speakerMesh")
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
      this.panelC3S3,
      this.soundBarFullC3S3,
      this.soundBarOpacityC3S3,
      this.soundBarSmallC3S3,
      this.speakerBack,
      this.speakerCenter,
      this.speakerMesh,
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
        
        ["Hey!...are you there?"],
        [""],
        [
          {
            delay: 3500,
            withTapping: {
              audios: ["key01", "key01", "key02"],
              count: 10,
              delay: 180,
            },
            keepAlive: 3000,
            position: {
              width: 700,
            },
          },
        ],
        80
      );
      this.dialogue?.play();
      // this.cine.tweens.add({
      //   targets: [camera],
      //   zoom: 1.1,
      //   delay: 0,
      //   duration: 17000,
      //   ease: "ease",
      // });
      this.cine.tweens.add({
        targets: [this.speakerCenter],
        scale: 1.05,
        delay: 100,
        loop: -1,
        yoyo: true,
        duration: 444,
        ease: "bounce",
      });
      this.cine.tweens.add({
        targets: [this.soundBarFullC3S3],
        scaleY: 0.3,
        delay: 0,
        yoyo: true,
        loop: -1,
        duration: 333,
        ease: "expo",
      });
      this.cine.tweens.add({
        targets: [this.soundBarOpacityC3S3],
        scaleY: 0.5,
        delay: 0,        
        yoyo: true,
        loop: -1,
        duration: 234,
        ease: "quadratic",
      });
      this.cine.tweens.add({
        targets: [this.soundBarSmallC3S3],
        scaleY: 0.9,
        delay: 0,        
        yoyo: true,
        loop: -1,
        duration: 234,
        ease: "quadratic",
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

  update(this: cine3Movie3, time: number, delta: number) {
    if (this.dialogue) this.dialogue.update();
    if (this.nextCine) this.cine.scene.restart({ keyname: "cine_3_movie_4" });
  }
}

export default cine3Movie3;
