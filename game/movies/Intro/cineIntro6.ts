import Phaser from "phaser";
import Ticker, { TickerJob } from '../Ticker'
import DialogueManager from '../DialogueManager'
import CinematographyModular from "@/game/movies/Cinematography-modular";


class cineIntro6 {
  ticker: Ticker;
  nextCine: boolean = false;
  cine: CinematographyModular;
  dialogue?: DialogueManager;

  //assets
  background3?: Phaser.GameObjects.Image;
  background2?: Phaser.GameObjects.Image;
  background1?: Phaser.GameObjects.Image;
  Piso?: Phaser.GameObjects.Image;
  AstroFrenteCorte?: Phaser.GameObjects.Image;
  AstroFrenteEntero?: Phaser.GameObjects.Image;
  AstroPerfilCorte?: Phaser.GameObjects.Image;
  AstroPerfilEntero?: Phaser.GameObjects.Image;
  VidrioVisor?: Phaser.GameObjects.Image;
  VidrioVisorView?: Phaser.GameObjects.Image;
  VidrioVisor2?: Phaser.GameObjects.Image;
  VidrioVisorView2?: Phaser.GameObjects.Image;
  // controllers
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  nextText?: Phaser.GameObjects.Text;

  constructor(cine: CinematographyModular) {
    this.cine = cine
    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
    this.playCine()
  }

  playCine(this: cineIntro6) {
    // START ticker
    this.cine.time.addEvent({
      delay: this.ticker.ms,
      callback: this.ticker.runTicker,
      loop: true,
    });

    // this.cine.cursors = this.input.keyboard?.createCursorKeys();

    const middlePoint = {
      x: this.cine.cameras.main.displayWidth / 2,
      y: this.cine.cameras.main.displayHeight / 2,
    };

    const gameObjectScaler = {
      x: window.innerWidth / 1920,
      y: window.innerHeight / 927,
    }


    this.background3 = this.cine.add.image(0, 0, "fondo3").setOrigin(0.5)
    this.background2 = this.cine.add.image(0, 0, "fondo2").setOrigin(0.5)
    this.background1 = this.cine.add.image(0, 0, "fondo1").setOrigin(0.5)
    this.AstroFrenteCorte = this.cine.add.image(0, 0, "AstroFrenteCorte").setOrigin(0.5)
    this.VidrioVisor = this.cine.add.image(-30, 0, "VidrioVisor").setOrigin(0.5)
    this.VidrioVisorView = this.cine.add.image(-30, 0, "VidrioVisorView").setOrigin(0.5)
    this.VidrioVisor2 = this.cine.add.image(92, 0, "VidrioVisor").setOrigin(0.5).setAlpha(0)
    this.VidrioVisorView2 = this.cine.add.image(92, 0, "VidrioVisorView").setOrigin(0.5).setAlpha(0)
    this.AstroPerfilCorte = this.cine.add.image(-30, 0, "AstroPerfilCorte").setOrigin(0.5).setAlpha(0)
    this.Piso = this.cine.add.image(0, 0, "PisoScene6").setOrigin(0.5, 0.5)


    // const DialogueScene = this.game.scene.getScene("DialogueManager");
    // this.scene.launch(DialogueScene)
    const container = this.cine.add.container(middlePoint.x, middlePoint.y).setSize(1920, 927)
    container.add([
      this.background3,
      this.background2,
      this.background1,
      this.Piso,
      this.AstroFrenteCorte,
      this.AstroPerfilCorte,
      this.VidrioVisorView,
      this.VidrioVisor,
      this.VidrioVisorView2,
      this.VidrioVisor2,
    ])
    container.setScale(gameObjectScaler.x < gameObjectScaler.y ? gameObjectScaler.y : gameObjectScaler.x)
    const camera = this.cine.cameras.main
    camera.postFX.addVignette(0.5, 0.5, 0.8);

    const cameraDialogue = this.cine.cameras.add(
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );
    cameraDialogue.ignore(container);

    const part1 = (job: TickerJob) => {
      this.dialogue = new DialogueManager(
        this.cine,
        [
          "This planet is pretty strange... I've never seen something like this place...",
        ],
        ["cineIntro6_1"],
        [
          {
            delay: 5000,
            keepAlive: 1500,
          },
        ]
      );
      this.dialogue?.play()

      this.cine.tweens.add({
        targets: camera,
        zoom: 1.5,
        duration: 120000,
        ease: 'lienar',
        loop: -1,
        yoyo: true,
      });
      this.cine.tweens.add({
        targets: [this.background1, this.background2, this.background3],
        scale: 1.5,
        duration: 120000,
        ease: 'lienar',
        loop: -1,
        yoyo: true,
      });
      this.cine.tweens.add({
        targets: [this.AstroFrenteCorte, this.VidrioVisorView, this.VidrioVisor],
        alpha: 0,
        duration: 3500,
        delay: 10000,
        ease: 'linear',
      });
      this.cine.tweens.add({
        targets: [this.background2],
        x: '+=200',
        duration: 20000,
        delay: 0,
        loop: -1,
        ease: 'linear',
      });
      this.cine.tweens.add({
        targets: [this.AstroPerfilCorte, this.VidrioVisorView2, this.VidrioVisor2],
        alpha: 1,
        delay: 10000,
        duration: 3500,
        ease: 'linear',
      });

      const dialogueListener = (newState: string, nextText?: string) => {
        if (newState === "CONTINUE") {
        } else if (newState === "FINISHED") {
          // this.ticker.deleteJob(job.id);
        }
      };
      this.dialogue?.killState(dialogueListener);
      this.dialogue?.getState(dialogueListener);
    }

    this.ticker.addJob(
      new TickerJob(
        1,
        10,
        part1,
        false,
        20000,
        true,
        (job: TickerJob) => {
          this.nextCine = true;
        }
      )
    );
  }


  update(this: cineIntro6, time: number, delta: number) {
    if (this.dialogue) this.dialogue.update();
    if (this.nextCine) this.cine.scene.restart({ keyname: "cine_intro_7" })

  }
}

export default cineIntro6;




