import Phaser from "phaser";
import Ticker, { TickerJob } from '../Ticker'
import DialogueManager from '../DialogueManager'
import CinematographyModular from "@/game/Cinematography-modular";


class cineIntro2 {
  ticker: Ticker;
  container?: Phaser.GameObjects.Container;
  nextCine: boolean = false;
  cine: CinematographyModular

  background3?: Phaser.GameObjects.Image;
  background2?: Phaser.GameObjects.Image;
  background1?: Phaser.GameObjects.Image;
  planetScene2?: Phaser.GameObjects.Image;
  alarmaRojaOn?: Phaser.GameObjects.Image;
  alarmaRojaOff?: Phaser.GameObjects.Image;
  alarmaVerdeOn?: Phaser.GameObjects.Image;
  alarmaVerdeOff?: Phaser.GameObjects.Image;
  luzAlarmaRoja?: Phaser.GameObjects.Image;
  luzAlarmaVerde?: Phaser.GameObjects.Image;
  naveCapaTrasera?: Phaser.GameObjects.Image;
  naveCapaDelantera?: Phaser.GameObjects.Image;
  marcoVentana?: Phaser.GameObjects.Image;
  vidrioVentana?: Phaser.GameObjects.Image;
  LuzPanelRojo?: Phaser.GameObjects.Image;
  LuzPanelVerde?: Phaser.GameObjects.Image;
  LuzPanelRojo2?: Phaser.GameObjects.Image;
  LuzPanelVerde2?: Phaser.GameObjects.Image;

  nextText?: Phaser.GameObjects.Text;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(cine : CinematographyModular) {
    this.cine = cine
    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
    this.playCine()
  }


  playCine(this: cineIntro2) {
    // START ticker
    this.cine.time.addEvent({
      delay: this.ticker.ms,
      callback: this.ticker.runTicker,
      loop: true,
    });

    // this.cursors = this.input.keyboard?.createCursorKeys();

    // const DialogueScene = this.game.scene.getScene("DialogueManager");
    // this.scene.launch(DialogueScene)

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
    this.planetScene2 = this.cine.add.image(0, 0, "planetScene2").setOrigin(1, 0.8)
    this.naveCapaTrasera = this.cine.add.image(0, 0, "naveCapaTrasera").setOrigin(0.5)
    this.marcoVentana = this.cine.add.image(0, 0, "marcoVentana").setOrigin(0.5, 0.75)
    this.vidrioVentana = this.cine.add.image(0, 0, "vidrioVentana").setOrigin(0.5, 0.75)
    this.naveCapaDelantera = this.cine.add.image(0, 100, "naveCapaDelantera").setOrigin(0.5, 0)
    this.luzAlarmaRoja = this.cine.add.image(503, -185, "luzAlarmaRoja").setOrigin(0.5)
    this.alarmaRojaOff = this.cine.add.image(503, -185, "alarmaRojaOff").setOrigin(0.5)
    this.alarmaRojaOn = this.cine.add.image(503, -185, "alarmaRojaOn").setOrigin(0.5)
    this.luzAlarmaVerde = this.cine.add.image(-503, -180, "luzAlarmaVerde").setOrigin(0.5)
    this.alarmaVerdeOff = this.cine.add.image(-503, -180, "alarmaVerdeOff").setOrigin(0.5)
    this.alarmaVerdeOn = this.cine.add.image(-503, -180, "alarmaVerdeOn").setOrigin(0.5)
    this.LuzPanelRojo = this.cine.add.image(620, 252, "LuzPanelRojo").setOrigin(0.5).setScale(1, 0.95)
    this.LuzPanelVerde = this.cine.add.image(- 620, 252, "LuzPanelVerde").setOrigin(0.5).setScale(1, 0.95)


    const assetsScenes = 
      [
        this.background3,
        this.background2,
        this.background1,
        this.planetScene2,
        this.naveCapaTrasera,
        this.marcoVentana,
        this.vidrioVentana,
        this.naveCapaDelantera,
        this.luzAlarmaRoja,
        this.alarmaRojaOff,
        this.alarmaRojaOn,
        this.luzAlarmaVerde,
        this.alarmaVerdeOff,
        this.alarmaVerdeOn,
        this.LuzPanelRojo,
        this.LuzPanelVerde,
      ]

    this.container = this.cine.add.container(middlePoint.x, middlePoint.y).setSize(1920, 927)
    this.container.add(assetsScenes)
    this.container.setScale(gameObjectScaler.x < gameObjectScaler.y ? gameObjectScaler.y : gameObjectScaler.x)


    const camera = this.cine.cameras.main
    camera.postFX.addVignette(0.5, 0.5, 0.8);



    // let timerController = 0

    // ADD ALL SCENES
    this.ticker.addJob(new TickerJob(100, 10, (job) => {
      // timerController = this.ticker.time
      this.cine.tweens.add({
        targets: [this.background1, this.background2, this.background3, this.planetScene2],
        scale: 1.3,
        duration: 30000,
        ease: 'linear',
      });
      this.cine.tweens.add({
        targets: [this.background1, this.background2, this.background3, this.planetScene2],
        x: "-=200",
        duration: 30000,
        ease: 'linear',
      });
    }, false));

    // ADD JOBS SCENE 2
    this.ticker.addJob(new TickerJob(1, 100, (job) => {
      camera.setZoom(2).scrollY = 200
      this.cine.tweens.add({
        targets: this.luzAlarmaRoja,
        rotation: 2 * Math.PI,
        duration: 1500,
        ease: 'linear',
        loop: -1,
      });
      this.cine.tweens.add({
        targets: this.luzAlarmaRoja,
        scale: 0,
        duration: 500,
        ease: 'linear',
        loop: -1,
        yoyo: true
      });
      this.cine.tweens.add({
        targets: this.alarmaRojaOn,
        alpha: 0.8,
        duration: 500,
        ease: 'linear',
        loop: -1,
        yoyo: true
      });

      this.cine.tweens.add({
        targets: this.LuzPanelRojo,
        alpha: 0.6,
        duration: 700,
        ease: 'expo.out',
        loop: -1,
        yoyo: true
      });

      this.cine.tweens.add({
        targets: this.LuzPanelVerde,
        alpha: 0.6,
        duration: 800,
        ease: 'expo.out',
        loop: -1,
        yoyo: true
      });
      this.cine.tweens.add({
        targets: this.luzAlarmaVerde,
        rotation: 2 * Math.PI,
        duration: 1700,
        ease: 'linear',
        loop: -1,

      });
      this.cine.tweens.add({
        targets: this.luzAlarmaVerde,
        scale: 0,
        duration: 600,
        ease: 'linear',
        loop: -1,
        yoyo: true
      });
      this.cine.tweens.add({
        targets: this.alarmaVerdeOn,
        alpha: 0.8,
        duration: 600,
        ease: 'linear',
        loop: -1,
        yoyo: true
      });
    }, false, 4800));

    this.ticker.addJob(new TickerJob(3, 2000, (job) => {
      // this.cameras.main.setZoom(1.5).scrollY = 100
      this.cine.tweens.add({
        targets: camera,
        zoom: 1.5,
        scrollY: 100,
        duration: 800,
        ease: 'ease',
        loop: 0,
        yoyo: false
      });
    }, false, 4800));

    this.ticker.addJob(new TickerJob(4, 4000, (job) => {
      // this.cameras.main.setZoom(1).scrollY = 0
      this.cine.tweens.add({
        targets: camera,
        zoom: 1,
        scrollY: 0,
        duration: 800,
        ease: 'ease',
        loop: 0,
        yoyo: false
      });
    }, false, 4800));

    this.ticker.addJob(new TickerJob(6, 5000, (job) => {
      this.nextCine = true
    }, false));

    this.nextText = this.cine.add.text(middlePoint.x * 2, middlePoint.y * 2, "SPACE TO CONTINUE", {
      fontSize: 50,
      backgroundColor: "red"
    })
    this.nextText.setVisible(false).setOrigin(1).setScrollFactor(0)
  }



  update(this : cineIntro2, time: number, delta: number) {
    if (this.nextCine) this.cine.scene.restart({ keyname: "cine_intro_3" })
    
  }
}

export default cineIntro2;



