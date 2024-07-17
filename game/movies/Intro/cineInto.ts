import Phaser from "phaser";
import Ticker, { TickerJob } from '../Ticker'
import DialogueManager from '../DialogueManager'
import CinematographyModular from "@/game/Cinematography-modular";

class cineIntro {
  ticker: Ticker;

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
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  // controllers
  nextText?: Phaser.GameObjects.Text;

  constructor() {
    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
  }

  playCine(this: cineIntro, { cine }: { cine: CinematographyModular}) {
    console.log("SCENE 1")
    // START ticker
    cine.time.addEvent({
      delay: this.ticker.ms,
      callback: this.ticker.runTicker,
      loop: true,
    });

    // cine.cursors = this.input.keyboard?.createCursorKeys();

    const middlePoint = {
      x: 10, // this.cameras.main.displayWidth / 2,
      y: 10 // this.cameras.main.displayHeight / 2,
    };

    const gameObjectScaler = {
      x: window.innerWidth / 1920,
      y: window.innerHeight / 927,
    }


    this.background3 = cine.add.image(0, 0, 'backgroundGlow').setOrigin(0.5, 0.5);
    this.background2 = cine.add.image(0, 0, 'backgronudClouds').setOrigin(0.5, 0.5);
    this.background1 = cine.add.image(0, 0, 'backgroundStars').setOrigin(0.5, 0.5);
    this.darkness = cine.add.image(0, 0, 'darkness').setOrigin(0.5, 0.5);
    this.planet = cine.add.image(0, 0, 'planet').setOrigin(0.5, 0.5).setPosition(-800, -400);
    this.ship = cine.add.image(0, 0, 'shipOff')
      .setOrigin(0.5, 0.5);
    this.shipOverImage = cine.add.image(0, 0, 'shipOn')
      .setOrigin(0.5, 0.5);
    this.shipZoom = cine.add.image(0, 300, 'naveZoom')
      .setOrigin(0.5, 0.5).setVisible(false).setScale(0.7);
    this.shipZoomOn = cine.add.image(0, 300, 'naveZoomOn')
      .setOrigin(0.5, 0.5).setVisible(false).setScale(0.7);
     
    

    const container = cine.add.container(middlePoint.x, middlePoint.y).setSize(1920, 927)
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

    const camera = cine.cameras.main
    camera.postFX.addVignette(0.5, 0.5, 0.8);

    // // ADD JOBS
    this.ticker.addJob(new TickerJob(0, 10, (job) => {
      cine.tweens.add({
        targets: [camera],
        alpha: 1,
        duration: 1000,
        ease: 'linear',
      });
      cine.tweens.add({
        targets: [this.background1, this.background2, this.background3],
        scale: 1.2,
        duration: 30000,
        ease: 'linear',
        loop: 0
      });
    }, false));

    this.ticker.addJob(new TickerJob(1, 100, (job) => {
      cine.tweens.add({
        targets: [this.shipOverImage, this.shipZoomOn],
        alpha: 0,
        duration: 2500,
        ease: 'expo.out',
        loop: -1
      });
    }, false));

    this.ticker.addJob(new TickerJob(2, 500, (job) => {
      cine.tweens.add({
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
      cine.tweens.add({
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
      // this.tweens.add({
      //   targets: [this.shipZoom, this.shipZoomOn],
      //   y: "-=5",
      //   duration: 3429,
      //   ease: 'ease',
      //   loop: -1,
      //   yoyo: true
      // });
      // this.tweens.add({
      //   targets: [this.shipZoom, this.shipZoomOn],
      //   x: "+=5",
      //   duration: 1420,
      //   ease: 'ease',
      //   loop: -1,
      //   yoyo: true
      // });
      cine.tweens.add({
        targets: [this.background1, this.background2, this.background3],
        x: "-=15",
        y: "+=20",
        duration: 4000,
        ease: 'cubic',
        loop: -1,
        yoyo: true
      });
      cine.tweens.add({
        targets: camera,
        scrollY: "+=10",
        duration: 4000,
        delay: 500,
        ease: 'linear',
        loop: -1,
        yoyo: true
      });
    }, false));

    this.nextText = cine.add.text(middlePoint.x * 2 - 300, middlePoint.y * 2 - 300, "SPACE TO CONTINUE", {
      fontSize: 50,
      backgroundColor: "red"
    })
    this.nextText.setVisible(false).setOrigin(1).setScrollFactor(0)

  }


  update(cine: CinematographyModular, time: number, delta: number) {
    if (time > 10000) {
      this.nextText?.setVisible(true)
      if (this.cursors) {
        if (this.cursors.space.isDown) {
          const IntroScene2 = cine.game.scene.getScene("IntroScene2");
          cine.scene.launch(IntroScene2).bringToTop("IntroScene2")
          cine.scene.stop()
        }
      }
    }
  }
}

export default cineIntro;




