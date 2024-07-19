import Phaser from "phaser";
import Ticker, { TickerJob } from '../Ticker'
import DialogueManager from '../DialogueManager'
import CinematographyModular from "@/game/Cinematography-modular";

class cineIntro7 {
  ticker: Ticker;
  nextCine: boolean = false;
  cine: CinematographyModular

  //assets
  background3?: Phaser.GameObjects.Image;
  background2?: Phaser.GameObjects.Image;
  background1?: Phaser.GameObjects.Image;
  Piso?: Phaser.GameObjects.Image;
  mountains?: Phaser.GameObjects.Image;
  Nube1?: Phaser.GameObjects.Image;
  Nube2?: Phaser.GameObjects.Image;
  Nube3?: Phaser.GameObjects.Image;


  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  // controllers
  nextText?: Phaser.GameObjects.Text;

  constructor(cine : CinematographyModular) {
    this.cine = cine
    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
    this.playCine()
  }

  playCine(this: cineIntro7) {
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
    this.mountains = this.cine.add.image(0, 240, "mountains").setOrigin(0.5,1)
    this.Nube1 = this.cine.add.image(0, 350, "Nube1").setOrigin(0.5, 1)
    this.Nube2 = this.cine.add.image(0, 350, "Nube2").setOrigin(0.5, 1)
    this.Nube3 = this.cine.add.image(0, 350, "Nube3").setOrigin(0.5, 1)
    this.Piso = this.cine.add.image(0, 200, "PisoNivel8").setOrigin(0.5, 0)


    // const DialogueScene = this.game.scene.getScene("DialogueManager");
    // this.scene.launch(DialogueScene)
    const container = this.cine.add.container(middlePoint.x, middlePoint.y).setSize(1920, 927)
    container.add([
      this.background3,
      this.background2,
      this.background1,
      this.Nube3,
      this.Nube2,
      this.Nube1,
      this.mountains,
      this.Piso,
    ])

    container.setScale(gameObjectScaler.x < gameObjectScaler.y ? gameObjectScaler.y : gameObjectScaler.x)
    const camera = this.cine.cameras.main
    camera.postFX.addVignette(0.5, 0.5, 0.8);
    // ADD JOBS
    this.ticker.addJob(new TickerJob(1, 100, (job) => {
      this.cine.tweens.add({
        targets: camera,
        zoom: 1.5,
        duration: 40000,
        ease: 'lienar',
        loop: -1,
        yoyo: true,
      });
      this.cine.tweens.add({
        targets: [this.background1, this.background2, this.background3],
        scale: 1.5,
        duration: 40000,
        ease: 'lienar',
        loop: -1,
        yoyo: true,
      });
      this.cine.tweens.add({
        targets: [this.Nube1, this.Nube3],
        x: "+=200",
        duration: 40000,
        ease: 'lienar',
        loop: -1,
        yoyo: true,
      });
      this.cine.tweens.add({
        targets: [this.Nube2],
        x:"-=200",
        duration: 40000,
        ease: 'lienar',
        loop: -1,
        yoyo: true,
      });
    }, false));

    this.ticker.addJob(new TickerJob(6, 6000, (job) => {
      this.nextCine = true
    }, false));

    this.nextText = this.cine.add.text(middlePoint.x * 2, middlePoint.y * 2, "SPACE TO CONTINUE", {
      fontSize: 50,
      backgroundColor: "red"
    })
    this.nextText.setVisible(false).setOrigin(1).setScrollFactor(0)
  }


  update(this: cineIntro7, time: number, delta: number) {
    if (this.nextCine) this.cine.scene.restart({ keyname: "cine_intro_8" })

  }
}

export default cineIntro7;




