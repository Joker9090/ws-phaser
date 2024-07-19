import Phaser from "phaser";
import Ticker, { TickerJob } from '../Ticker'
import DialogueManager from '../DialogueManager'

export type TickerObject = {
  1?: Ticker,
  2?: Ticker,
  3?: Ticker,
  4?: Ticker,
  5?: Ticker,
  6?: Ticker,
  7?: Ticker,
}

class IntroMovie2 extends Phaser.Scene {
  //assets all scenes
  gameObjectScaler?: { x: number, y: number };
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  container?: Phaser.GameObjects.Container;
  nextText?: Phaser.GameObjects.Text;
  tickers?: TickerObject;
  assetsScenes?: Phaser.GameObjects.Image[][];
  tickerMS: number = 100;
  activeScene: number = 1

  background3?: Phaser.GameObjects.Image;
  background2?: Phaser.GameObjects.Image;
  background1?: Phaser.GameObjects.Image;
  //assets scene 1
  darkness?: Phaser.GameObjects.Image;
  ship?: Phaser.GameObjects.Image;
  shipOverImage?: Phaser.GameObjects.Image;
  shipZoom?: Phaser.GameObjects.Image;
  shipZoomOn?: Phaser.GameObjects.Image;
  planet?: Phaser.GameObjects.Image;
  //assets scene 2
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


  constructor() {
    super({ key: "IntroScene2" });

    this.tickers = {
      1: new Ticker(this.tickerMS),
      2: new Ticker(this.tickerMS),
      3: new Ticker(this.tickerMS),
      4: new Ticker(this.tickerMS),
      5: new Ticker(this.tickerMS),
      6: new Ticker(this.tickerMS),
      7: new Ticker(this.tickerMS),
    }
      ;
  }

  preload(this: Phaser.Scene) {
    // ALL SCENES
    this.load.image("fondo1", "/movies/intro/scene2/FondoCapa1.png")
    this.load.image("fondo2", "/movies/intro/scene2/FondoCapa2.png")
    this.load.image("fondo3", "/movies/intro/scene2/FondoCapa3.png")
    // SCENE 1
    this.load.image("backgroundStars", "/movies/intro/scene1/fondo1.png")
    this.load.image("backgronudClouds", "/movies/intro/scene1/fondo2.png")
    this.load.image("backgroundGlow", "/movies/intro/scene1/fondo3.png")
    this.load.image("planet", "/movies/intro/scene1/planeta.png")
    this.load.image("darkness", "/movies/intro/scene1/viñeta.png")
    this.load.image("shipOn", "/movies/intro/scene1/naveOn.png")
    this.load.image("shipOff", "/movies/intro/scene1/naveOff.png")
    this.load.image("naveZoom", "/movies/intro/scene1/NaveAstro.png")
    this.load.image("naveZoomOn", "/movies/intro/scene1/NaveAstroLuces.png")
    // SCENE 2
    this.load.image("planetScene2", "/movies/intro/scene2/planeta.png")
    this.load.image("alarmaRojaOn", "/movies/intro/scene2/AlarmaRoja.png")
    this.load.image("alarmaRojaOff", "/movies/intro/scene2/AlarmaRojaApagada.png")
    this.load.image("alarmaVerdeOn", "/movies/intro/scene2/AlarmaVerde.png")
    this.load.image("alarmaVerdeOff", "/movies/intro/scene2/AlarmaVerdeApagada.png")
    this.load.image("luzAlarmaRoja", "/movies/intro/scene2/LuzAlarmaRoja.png")
    this.load.image("luzAlarmaVerde", "/movies/intro/scene2/LuzAlarmaVerde.png")
    this.load.image("naveCapaTrasera", "/movies/intro/scene2/NaveCapaTrasera.png")
    this.load.image("naveCapaDelantera", "/movies/intro/scene2/PanelCapaDelantera.png")
    this.load.image("marcoVentana", "/movies/intro/scene2/MarcoVentana.png")
    this.load.image("vidrioVentana", "/movies/intro/scene2/VidrioVentana.png")
    this.load.image("LuzPanelRojo", "/movies/intro/scene2/LuzPanelRojo.png")
    this.load.image("LuzPanelVerde", "/movies/intro/scene2/LuzPanelVerde.png")
  }

  scaleContainer = (scene: number) => {
    if (this.container && this.assetsScenes && this.gameObjectScaler) {
      this.container.removeAll(true)
      if (!this.container) this.container = this.add.container()
      this.container.add(this.assetsScenes[scene - 1]);
      this.container.setScale(this.gameObjectScaler.x < this.gameObjectScaler.y ? this.gameObjectScaler.y : this.gameObjectScaler.x)
    }
  }

  runTickersTimers() {
    console.log("entra al runTickersTimers", this.tickers)
    if (this.tickers) {
      const keys = Object.keys(this.tickers)
      const values = Object.values(this.tickers)
      keys.forEach((key: string, index: number) => {
        if (this.activeScene && this.tickers) {
          console.log("entro acá")
          const keyNumber = key as unknown as number
          console.log("COMPARISON", keyNumber, this.activeScene)
          if (keyNumber == this.activeScene) {
            values[index].runTicker()
          }
        }
      })
    }
  }

  create(this: IntroMovie2, { level }: any) {
    // START ticker
    console.log("this tickers en create", this.tickers)
    this.time.addEvent({
      delay: this.tickerMS,
      callback: this.runTickersTimers.bind(this),
      loop: true,
    });

    this.cursors = this.input.keyboard?.createCursorKeys();

    // const DialogueScene = this.game.scene.getScene("DialogueManager");
    // this.scene.launch(DialogueScene)

    const middlePoint = {
      x: this.cameras.main.displayWidth / 2,
      y: this.cameras.main.displayHeight / 2,
    };

    this.gameObjectScaler = {
      x: window.innerWidth / 1920,
      y: window.innerHeight / 927,
    }

    {/* ITEMS ALL SCENES */ }
    this.background3 = this.add.image(0, 0, "fondo3").setOrigin(0.5)
    this.background2 = this.add.image(0, 0, "fondo2").setOrigin(0.5)
    this.background1 = this.add.image(0, 0, "fondo1").setOrigin(0.5)
    {/* ITEMS SCENE 1*/ }
    this.background3 = this.add.image(0, 0, 'backgroundGlow').setOrigin(0.5, 0.5);
    this.background2 = this.add.image(0, 0, 'backgronudClouds').setOrigin(0.5, 0.5);
    this.background1 = this.add.image(0, 0, 'backgroundStars').setOrigin(0.5, 0.5);
    this.darkness = this.add.image(0, 0, 'darkness').setOrigin(0.5, 0.5);
    this.planet = this.add.image(0, 0, 'planet').setOrigin(0.5, 0.5).setPosition(-800, -400);
    this.ship = this.add.image(0, 0, 'shipOff').setOrigin(0.5, 0.5);
    this.shipOverImage = this.add.image(0, 0, 'shipOn').setOrigin(0.5, 0.5);
    this.shipZoom = this.add.image(0, 300, 'naveZoom').setOrigin(0.5, 0.5).setVisible(false).setScale(0.7);
    this.shipZoomOn = this.add.image(0, 300, 'naveZoomOn')
      .setOrigin(0.5, 0.5).setVisible(false).setScale(0.7);
    {/* ITEMS SCENE 2*/ }
    this.planetScene2 = this.add.image(0, 0, "planetScene2").setOrigin(1, 0.8)
    this.naveCapaTrasera = this.add.image(0, 0, "naveCapaTrasera").setOrigin(0.5)
    this.marcoVentana = this.add.image(0, 0, "marcoVentana").setOrigin(0.5, 0.75)
    this.vidrioVentana = this.add.image(0, 0, "vidrioVentana").setOrigin(0.5, 0.75)
    this.naveCapaDelantera = this.add.image(0, 100, "naveCapaDelantera").setOrigin(0.5, 0)
    this.luzAlarmaRoja = this.add.image(503, -185, "luzAlarmaRoja").setOrigin(0.5)
    this.alarmaRojaOff = this.add.image(503, -185, "alarmaRojaOff").setOrigin(0.5)
    this.alarmaRojaOn = this.add.image(503, -185, "alarmaRojaOn").setOrigin(0.5)
    this.luzAlarmaVerde = this.add.image(-503, -180, "luzAlarmaVerde").setOrigin(0.5)
    this.alarmaVerdeOff = this.add.image(-503, -180, "alarmaVerdeOff").setOrigin(0.5)
    this.alarmaVerdeOn = this.add.image(-503, -180, "alarmaVerdeOn").setOrigin(0.5)
    this.LuzPanelRojo = this.add.image(620, 252, "LuzPanelRojo").setOrigin(0.5).setScale(1, 0.95)
    this.LuzPanelVerde = this.add.image(- 620, 252, "LuzPanelVerde").setOrigin(0.5).setScale(1, 0.95)


    this.assetsScenes = [
      [
        this.background3,
        this.background2,
        this.background1,
        this.darkness,
        this.planet,
        this.ship,
        this.shipOverImage,
        this.shipZoom,
        this.shipZoomOn,
      ],
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
      ],

    ]

    this.container = this.add.container(middlePoint.x, middlePoint.y).setSize(1920, 927)
    this.scaleContainer(1)

    const camera = this.cameras.main
    camera.postFX.addVignette(0.5, 0.5, 0.8);



    // let timerController = 0

    // ADD ALL SCENES
    this.tickers?.[1]?.addJob(new TickerJob(100, 10, (job) => {
      // timerController = this.ticker.time
      this.tweens.add({
        targets: [this.background1, this.background2, this.background3, this.planetScene2],
        scale: 1.3,
        duration: 30000,
        ease: 'linear',
      });
      this.tweens.add({
        targets: [this.background1, this.background2, this.background3, this.planetScene2],
        x: "-=200",
        duration: 30000,
        ease: 'linear',
      });
    }, false));

    // ADD JOBS SCENE 1
    this.tickers?.[1]?.addJob(new TickerJob(0, 10, (job) => {
      this.tweens.add({
        targets: [camera],
        alpha: 1,
        duration: 1000,
        ease: 'linear',
      });
      this.tweens.add({
        targets: [this.background1, this.background2, this.background3],
        scale: 1.2,
        duration: 30000,
        ease: 'linear',
        loop: 0
      });
    }, false, 10600));

    this.tickers?.[1]?.addJob(new TickerJob(1, 100, (job) => {
      this.tweens.add({
        targets: [this.shipOverImage, this.shipZoomOn],
        alpha: 0,
        duration: 2500,
        ease: 'expo.out',
        loop: -1
      });
    }, false, 10600));

    this.tickers?.[1]?.addJob(new TickerJob(2, 500, (job) => {
      this.tweens.add({
        targets: [this.ship, this.shipOverImage],
        angle: "+=5",
        x: "+=10",
        y: "-=15",
        duration: 3000,
        ease: 'Linear',
        yoyo: false,
        loop: 0
      });
      this.tweens.add({
        targets: camera,
        zoom: 1.7,
        duration: 6000,
        ease: 'Linear'
      });
    }, false, 10600));

    this.tickers?.[1]?.addJob(new TickerJob(5, 6500, (job) => {
      camera.stopFollow()
      camera.setZoom(1)
      this.planet?.setVisible(false)
      this.shipOverImage?.setVisible(false)
      this.ship?.setVisible(false)
      this.shipZoom?.setVisible(true)
      this.shipZoomOn?.setVisible(true)
      this.tweens.add({
        targets: [this.background1, this.background2, this.background3],
        x: "-=15",
        y: "+=20",
        duration: 4000,
        ease: 'cubic',
        loop: -1,
        yoyo: true
      });
      this.tweens.add({
        targets: camera,
        scrollY: "+=10",
        duration: 4000,
        delay: 500,
        ease: 'linear',
        loop: -1,
        yoyo: true
      });
    }, false, 10600));
    this.tickers?.[1]?.addJob(new TickerJob(6, 10500, (job) => {
      this.activeScene = 2
    }, false, 10600));

    // ADD JOBS SCENE 2
    this.tickers?.[2]?.addJob(new TickerJob(1, 100, (job) => {
      this.scaleContainer(2)
      camera.setZoom(2).scrollY = 200
      this.tweens.add({
        targets: this.luzAlarmaRoja,
        rotation: 2 * Math.PI,
        duration: 1500,
        ease: 'linear',
        loop: -1,
      });
      this.tweens.add({
        targets: this.luzAlarmaRoja,
        scale: 0,
        duration: 500,
        ease: 'linear',
        loop: -1,
        yoyo: true
      });
      this.tweens.add({
        targets: this.alarmaRojaOn,
        alpha: 0.8,
        duration: 500,
        ease: 'linear',
        loop: -1,
        yoyo: true
      });

      this.tweens.add({
        targets: this.LuzPanelRojo,
        alpha: 0.6,
        duration: 700,
        ease: 'expo.out',
        loop: -1,
        yoyo: true
      });

      this.tweens.add({
        targets: this.LuzPanelVerde,
        alpha: 0.6,
        duration: 800,
        ease: 'expo.out',
        loop: -1,
        yoyo: true
      });
      this.tweens.add({
        targets: this.luzAlarmaVerde,
        rotation: 2 * Math.PI,
        duration: 1700,
        ease: 'linear',
        loop: -1,

      });
      this.tweens.add({
        targets: this.luzAlarmaVerde,
        scale: 0,
        duration: 600,
        ease: 'linear',
        loop: -1,
        yoyo: true
      });
      this.tweens.add({
        targets: this.alarmaVerdeOn,
        alpha: 0.8,
        duration: 600,
        ease: 'linear',
        loop: -1,
        yoyo: true
      });
    }, false, 4800));

    this.tickers?.[2]?.addJob(new TickerJob(3, 2000, (job) => {
      // this.cameras.main.setZoom(1.5).scrollY = 100
      this.tweens.add({
        targets: this.cameras.main,
        zoom: 1.5,
        scrollY: 100,
        duration: 800,
        ease: 'ease',
        loop: 0,
        yoyo: false
      });
    }, false, 4800));

    this.tickers?.[2]?.addJob(new TickerJob(4, 4000, (job) => {
      // this.cameras.main.setZoom(1).scrollY = 0
      this.tweens.add({
        targets: this.cameras.main,
        zoom: 1,
        scrollY: 0,
        duration: 800,
        ease: 'ease',
        loop: 0,
        yoyo: false
      });
    }, false, 4800));



    this.nextText = this.add.text(middlePoint.x * 2, middlePoint.y * 2, "SPACE TO CONTINUE", {
      fontSize: 50,
      backgroundColor: "red"
    })
    this.nextText.setVisible(false).setOrigin(1).setScrollFactor(0)
  }


  update(this: IntroMovie2, time: number, delta: number) {
    if (time > 10000) {
      this.nextText?.setVisible(true)
      if (this.cursors) {
        if (this.cursors.space.isDown) {
          const IntroScene4 = this.game.scene.getScene("IntroScene4");
          this.scene.launch(IntroScene4).bringToTop("IntroScene4")
          this.scene.stop()
        }
      }
    }
  }
}

export default IntroMovie2;



