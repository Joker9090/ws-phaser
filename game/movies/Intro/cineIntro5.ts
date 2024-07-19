import Phaser from "phaser";
import Ticker, { TickerJob } from '../Ticker'
import DialogueManager from '../DialogueManager'
import CinematographyModular from "@/game/Cinematography-modular";

class cineIntro5 {
  ticker: Ticker;
  nextCine: boolean = false;
  cine: CinematographyModular

  //assets
  background3?: Phaser.GameObjects.Image;
  background2?: Phaser.GameObjects.Image;
  background1?: Phaser.GameObjects.Image;
  BrazoDelantero?: Phaser.GameObjects.Image;
  Cuerpo?: Phaser.GameObjects.Image;
  PiernaDelantera?: Phaser.GameObjects.Image;
  PiernaTrasera?: Phaser.GameObjects.Image;
  Piso?: Phaser.GameObjects.Image;
  
  // controllers
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  nextText?: Phaser.GameObjects.Text;

  constructor(cine : CinematographyModular) {
    this.cine = cine
    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
    this.playCine()
  }

  playCine(this: cineIntro5) {
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
    this.Piso = this.cine.add.image(0, -200, "Piso").setOrigin(0.5, 0)
    this.PiernaTrasera = this.cine.add.image(-600, -220, "PiernaTrasera").setOrigin(0.5, 0).setRotation(Math.PI / 6)
    this.Cuerpo = this.cine.add.image(-600, -50, "Cuerpo").setOrigin(0.5, 1)
    this.PiernaDelantera = this.cine.add.image(-600, -220, "PiernaDelantera").setOrigin(0.5, 0).setRotation(-Math.PI / 6)
    this.BrazoDelantero = this.cine.add.image(-600, - 649, "BrazoDelantero").setOrigin(0.5, 0).setRotation(-Math.PI / 6)


    const container = this.cine.add.container(middlePoint.x, middlePoint.y).setSize(1920, 927)
    container.add([
      this.background3,
      this.background2,
      this.background1,
      this.Piso,
      this.PiernaTrasera,
      this.Cuerpo,
      this.PiernaDelantera,
      this.BrazoDelantero,
    ])
    container.setScale(gameObjectScaler.x < gameObjectScaler.y ? gameObjectScaler.y : gameObjectScaler.x)

    // const DialogueScene = this.game.scene.getScene("DialogueManager");
    // this.scene.launch(DialogueScene)
    const camera = this.cine.cameras.main
    camera.postFX.addVignette(0.5, 0.5, 0.8);
    // ADD JOBS
    this.ticker.addJob(new TickerJob(1, 100, (job) => {
      this.cine.tweens.add({
        targets: [this.Cuerpo, this.BrazoDelantero, this.PiernaDelantera, this.PiernaTrasera],
        y: "+=50",
        duration: 9000,
        ease: 'ease',
        loop: -1,
        yoyo: true,
      });
      this.cine.tweens.add({
        targets: [this.BrazoDelantero, this.PiernaDelantera],
        rotation: Math.PI / 6,
        duration: 18000,
        ease: 'ease',
        loop: -1,
        yoyo: true,
      });
      this.cine.tweens.add({
        targets: [this.PiernaTrasera],
        rotation: -Math.PI / 6,
        duration: 18000,
        ease: 'ease',
        loop: -1,
        yoyo: true,
      });
      this.cine.tweens.add({
        targets: [this.Cuerpo, this.BrazoDelantero, this.PiernaDelantera, this.PiernaTrasera],
        x: "+=2500",
        duration: 40000,
        ease: 'ease',
      });
    }, false));

    this.ticker.addJob(new TickerJob(6, 40000, (job) => {
      container.destroy(true)
      this.nextCine = true
    }, false));

    this.nextText = this.cine.add.text(middlePoint.x * 2, middlePoint.y * 2, "SPACE TO CONTINUE", {
      fontSize: 50,
      backgroundColor: "red"
    })
    this.nextText.setVisible(false).setOrigin(1).setScrollFactor(0)
  }



  update(this : cineIntro5, time: number, delta: number) {
    if (this.nextCine) this.cine.scene.restart({ keyname: "cine_intro_6" })
    
  }
}

export default cineIntro5;




