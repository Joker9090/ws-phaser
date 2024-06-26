import Phaser from "phaser";
import Ticker, { TickerJob } from './Ticker'
import DialogueManager from './DialogueManager'

class IntroMovie extends Phaser.Scene {
  ticker: Ticker;

  //assets
  background3?: Phaser.GameObjects.Image;
  background2?: Phaser.GameObjects.Image;
  background1?: Phaser.GameObjects.Image;
  darkness?: Phaser.GameObjects.Image;
  ship?: Phaser.GameObjects.Image;
  planet?: Phaser.GameObjects.Image;

  // controllers
  shipCanChangeTexture: boolean = true;

  constructor() {
    super({ key: "IntroMovie" });

    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
  }

  preload(this: Phaser.Scene) {
    this.load.image("backgroundStars", "/game/movies/scene1/fondo1.png")
    this.load.image("backgronudClouds", "/game/movies/scene1/fondo2.png")
    this.load.image("backgroundGlow", "/game/movies/scene1/fondo3.png")
    this.load.image("planet", "/game/movies/scene1/planeta.png")
    this.load.image("darkness", "/game/movies/scene1/viñeta.png")
    this.load.image("shipOn", "/game/movies/scene1/naveOn.png")
    this.load.image("shipOff", "/game/movies/scene1/naveOff.png")
  }

  scaleImage(image: Phaser.GameObjects.Image) {
    image.displayHeight = this.cameras.main.displayHeight
    image.displayWidth = this.cameras.main.displayWidth
    image.y = this.cameras.main.displayHeight / 2
    image.x = this.cameras.main.displayWidth / 2
  }

  shipLights() {
    this.shipCanChangeTexture = false
    const randomTime = Math.random()*2 + 4
    setTimeout(()=>{
      console.log(randomTime, "random time")
      if (this.ship?.texture as unknown as string === "shipOn"){
        console.log("entro aca 1")
        this.ship?.setTexture("shipOff")
      } else {
        console.log("entro aca 2")
        this.ship?.setTexture("shipOn")
      }
      this.shipCanChangeTexture = true
      this.shipLights()
    }, randomTime)
  }

  create(this: IntroMovie, { level }: any) {
    // START ticker
    this.time.addEvent({
      delay: this.ticker.ms,
      callback: this.ticker.runTicker,
      loop: true,
    });

    const middlePoint = {
      x: this.cameras.main.displayWidth / 2,
      y: this.cameras.main.displayHeight / 2,
    };

    this.background3 = this.add.image(middlePoint.x, middlePoint.y, 'backgroundGlow').setOrigin(0.5, 0.5);
    this.background2 = this.add.image(middlePoint.x, middlePoint.y, 'backgronudClouds').setOrigin(0.5, 0.5);
    this.background1 = this.add.image(middlePoint.x, middlePoint.y, 'backgroundStars').setOrigin(0.5, 0.5);
    this.darkness = this.add.image(middlePoint.x, middlePoint.y, 'darkness').setOrigin(0.5, 0.5);

    this.ship = this.add.image(middlePoint.x + 200, middlePoint.y, 'shipOn')
      .setOrigin(0.5, 0.5)
      .setScale(1.5);
    this.planet = this.add.image(200, 400, 'planet').setOrigin(0.5, 0.5)



    const DialogueScene = this.game.scene.getScene("DialogueManager");
    if (!DialogueScene.scene.isActive())
      this.scene.launch(DialogueScene).bringToTop();

    // // ADD JOBS
    // this.ticker.addJob(new TickerJob(1, 100, (job) => {
    //   this.tweens.add({
    //     targets: background,
    //     x: middlePoint.x + 100,
    //     y: middlePoint.x + 200,
    //     duration: 25000,
    //     ease: 'Linear'
    //   });
    // }, false));

    this.ticker.addJob(new TickerJob(2, 500, (job) => {
      this.tweens.add({
        targets: this.ship,
        // y: -1,
        angle: 5,
        duration: 25000,
        ease: 'Linear'
      });
    }, false));

    const camera = this.cameras.main
    this.ticker.addJob(new TickerJob(3, 100, (job) => {
      this.tweens.add({
        targets: camera,
        zoom: 1.2,
        duration: 20000,
        ease: 'Linear'
      });
    }, false));

    // this.ticker.addJob(new TickerJob(3, 9000, (job) => {
    //   this.tweens.add({
    //     targets: ship,
    //     alpha: 0,
    //     duration: 1000,
    //     ease: 'Linear'
    //   });
    // }, false));


  }


  update(this: IntroMovie, time: number, delta: number) {
  }
}

export default IntroMovie;




