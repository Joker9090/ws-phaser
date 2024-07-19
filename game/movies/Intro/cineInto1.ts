import Phaser from "phaser";
import Ticker, { TickerJob } from '../Ticker'
import DialogueManager from '../DialogueManager'
import CinematographyModular from "@/game/Cinematography-modular";

class cineIntro1 {
  ticker: Ticker;
  cine: CinematographyModular;
  nextCine: boolean = false;
  //assets
  background3?: Phaser.GameObjects.Image;
  background2?: Phaser.GameObjects.Image;
  background1?: Phaser.GameObjects.Image;
  darkness?: Phaser.GameObjects.Image;
  ship?: Phaser.GameObjects.Image;
  shipOverImage?: Phaser.GameObjects.Image;
  shipZoom?: Phaser.GameObjects.Image;
  shipZoomOn?: Phaser.GameObjects.Image;
  planet?: Phaser.GameObjects.Image;
  // controllers
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  nextText?: Phaser.GameObjects.Text;


  constructor(cine: CinematographyModular) {
    this.cine = cine
    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
    this.playCine()
  }

  playCine(this: cineIntro1) {
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


    this.background3 = this.cine.add.image(0, 0, 'backgroundGlow').setOrigin(0.5, 0.5);
    this.background2 = this.cine.add.image(0, 0, 'backgronudClouds').setOrigin(0.5, 0.5);
    this.background1 = this.cine.add.image(0, 0, 'backgroundStars').setOrigin(0.5, 0.5);
    this.darkness = this.cine.add.image(0, 0, 'darkness').setOrigin(0.5, 0.5);
    this.planet = this.cine.add.image(0, 0, 'planet').setOrigin(0.5, 0.5).setPosition(-800, -400);
    this.ship = this.cine.add.image(0, 0, 'shipOff')
      .setOrigin(0.5, 0.5);
    this.shipOverImage = this.cine.add.image(0, 0, 'shipOn')
      .setOrigin(0.5, 0.5);
    this.shipZoom = this.cine.add.image(0, 300, 'naveZoom')
      .setOrigin(0.5, 0.5).setVisible(false).setScale(0.7);
    this.shipZoomOn = this.cine.add.image(0, 300, 'naveZoomOn')
      .setOrigin(0.5, 0.5).setVisible(false).setScale(0.7);



    const container = this.cine.add.container(middlePoint.x, middlePoint.y).setSize(1920, 927)
    container.add([
      this.background3,
      this.background2,
      this.background1,
      this.darkness,
      this.planet,
      this.ship,
      this.shipOverImage,
      this.shipZoom,
      this.shipZoomOn,
    ])
    container.setScale(gameObjectScaler.x < gameObjectScaler.y ? gameObjectScaler.y : gameObjectScaler.x)
    // const DialogueScene = this.game.scene.getScene("DialogueManager");
    // this.scene.launch(DialogueScene)

    const camera = this.cine.cameras.main
    camera.postFX.addVignette(0.5, 0.5, 0.8);

    // // ADD JOBS
    this.ticker.addJob(new TickerJob(0, 10, (job) => {
      this.cine.tweens.add({
        targets: [camera],
        alpha: 1,
        duration: 1000,
        ease: 'linear',
      });
      this.cine.tweens.add({
        targets: [this.background1, this.background2, this.background3],
        scale: 1.2,
        duration: 30000,
        ease: 'linear',
        loop: 0
      });
    }, false));

    this.ticker.addJob(new TickerJob(1, 100, (job) => {
      this.cine.tweens.add({
        targets: [this.shipOverImage, this.shipZoomOn],
        alpha: 0,
        duration: 2500,
        ease: 'expo.out',
        loop: -1
      });
    }, false));

    this.ticker.addJob(new TickerJob(2, 500, (job) => {
      this.cine.tweens.add({
        targets: [this.ship, this.shipOverImage],
        angle: "+=5",
        x: "+=10",
        y: "-=15",
        duration: 3000,
        ease: 'Linear',
        yoyo: false,
        loop: 0
      });
    }, false));

    this.ticker.addJob(new TickerJob(3, 500, (job) => {
      this.cine.tweens.add({
        targets: camera,
        zoom: 1.7,
        duration: 6000,
        ease: 'Linear'
      });
    }, false));
    this.ticker.addJob(new TickerJob(4, 6500, (job) => {
      camera.stopFollow()
    }, false));
    this.ticker.addJob(new TickerJob(5, 6500, (job) => {
      camera.setZoom(1)
      this.planet?.setVisible(false)
      this.shipOverImage?.setVisible(false)
      this.ship?.setVisible(false)
      this.shipZoom?.setVisible(true)
      this.shipZoomOn?.setVisible(true)
      this.cine.tweens.add({
        targets: [this.background1, this.background2, this.background3],
        x: "-=15",
        y: "+=20",
        duration: 4000,
        ease: 'cubic',
        loop: -1,
        yoyo: true
      });
      this.cine.tweens.add({
        targets: camera,
        scrollY: "+=10",
        duration: 4000,
        delay: 500,
        ease: 'linear',
        loop: -1,
        yoyo: true
      });
    }, false));
    this.ticker.addJob(new TickerJob(6, 10500, (job) => {
      this.nextCine = true
    }, false));
    this.nextText = this.cine.add.text(middlePoint.x * 2 - 300, middlePoint.y * 2 - 300, "SPACE TO CONTINUE", {
      fontSize: 50,
      backgroundColor: "red"
    })
    this.nextText.setVisible(false).setOrigin(1).setScrollFactor(0)

  }


  update(this: cineIntro1, time: number, delta: number) {
    if (this.nextCine) this.cine.scene.restart({ keyname: "cine_intro_2" })
  }
}

export default cineIntro1;




