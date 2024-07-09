import Phaser from "phaser";
import Ticker, { TickerJob } from '../Ticker'
import DialogueManager from '../DialogueManager'

class IntroMovie1 extends Phaser.Scene {
  ticker: Ticker;

  //assets
  background3?: Phaser.GameObjects.Image;
  background2?: Phaser.GameObjects.Image;
  background1?: Phaser.GameObjects.Image;
  darkness?: Phaser.GameObjects.Image;
  ship?: Phaser.GameObjects.Image;
  shipOverImage?: Phaser.GameObjects.Image;
  planet?: Phaser.GameObjects.Image;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;


  // controllers
  nextText?: Phaser.GameObjects.Text;

  constructor() {
    super({ key: "IntroScene1" });

    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
  }

  preload(this: Phaser.Scene) {
    this.load.image("backgroundStars", "/movies/intro/scene1/fondo1.png")
    this.load.image("backgronudClouds", "/movies/intro/scene1/fondo2.png")
    this.load.image("backgroundGlow", "/movies/intro/scene1/fondo3.png")
    this.load.image("planet", "/movies/intro/scene1/planeta.png")
    this.load.image("darkness", "/movies/intro/scene1/viñeta.png")
    this.load.image("shipOn", "/movies/intro/scene1/naveOn.png")
    this.load.image("shipOff", "/movies/intro/scene1/naveOff.png")
  }

  scaleImage(image: Phaser.GameObjects.Image) {
    image.displayHeight = this.cameras.main.displayHeight
    image.displayWidth = this.cameras.main.displayWidth
    image.y = this.cameras.main.displayHeight / 2
    image.x = this.cameras.main.displayWidth / 2
  }

  create(this: IntroMovie1, { level }: any) {
    console.log("SCENE 1")
    // START ticker
    this.time.addEvent({
      delay: this.ticker.ms,
      callback: this.ticker.runTicker,
      loop: true,
    });
    this.cursors = this.input.keyboard?.createCursorKeys();

    const middlePoint = {
      x: this.cameras.main.displayWidth / 2,
      y: this.cameras.main.displayHeight / 2,
    };

    this.background3 = this.add.image(middlePoint.x, middlePoint.y, 'backgroundGlow').setOrigin(0.5, 0.5);
    this.background2 = this.add.image(middlePoint.x, middlePoint.y, 'backgronudClouds').setOrigin(0.5, 0.5);
    this.background1 = this.add.image(middlePoint.x, middlePoint.y, 'backgroundStars').setOrigin(0.5, 0.5);
    this.darkness = this.add.image(middlePoint.x, middlePoint.y, 'darkness').setOrigin(0.5, 0.5);
    this.planet = this.add.image(middlePoint.x - 200, 0, 'planet').setOrigin(0.8, 0.5)
    this.ship = this.add.image(middlePoint.x , middlePoint.y, 'shipOff')
      .setOrigin(0.5, 0.5);
    this.shipOverImage = this.add.image(middlePoint.x , middlePoint.y, 'shipOn')
      .setOrigin(0.5, 0.5);

    const camera = this.cameras.main.setAlpha(0)
    camera.startFollow(this.ship)

    // const DialogueScene = this.game.scene.getScene("DialogueManager");
    // this.scene.launch(DialogueScene)

    // // ADD JOBS
    this.ticker.addJob(new TickerJob(0, 100, (job) => {
      this.tweens.add({
        targets: [camera],
        alpha: 1,
        duration: 1000,
        ease: 'linear',
      });
      this.tweens.add({
        targets: [this.background1,this.background2,this.background3],
        scale: 1.2,
        duration: 30000,
        ease: 'linear',
        loop: 0
      });
    }, false));

    this.ticker.addJob(new TickerJob(1, 100, (job) => {
      this.tweens.add({
        targets: this.shipOverImage,
        alpha: 0,
        duration: 2500,
        ease: 'expo.out',
        loop: -1
      });
    }, false));

    this.ticker.addJob(new TickerJob(2, 500, (job) => {
      this.tweens.add({
        targets: [this.ship, this.shipOverImage],
        angle: "+=5",
        x: "+=10",
        y: "-=15",
        duration: 3000,
        ease: 'Linear',
        yoyo: true,
        loop: 0
      });
    }, false));

    this.ticker.addJob(new TickerJob(3, 500, (job) => {
      this.tweens.add({
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
        camera.setZoom(1.5)
        this.planet?.setVisible(false)
        this.tweens.add({
          targets: [this.ship, this.shipOverImage],
          y: "-=5",
          duration: 3429,
          ease: 'ease',
          loop: -1,
          yoyo:true
        });
        this.tweens.add({
          targets: [this.ship, this.shipOverImage],
          x: "+=5",
          duration: 1420,
          ease: 'ease',
          loop: -1,
          yoyo:true
        });
        this.tweens.add({
          targets: [this.background1,this.background2,this.background3],
          x: "-=15",
          y: "+=20",
          duration: 4000,
          ease: 'cubic',
          loop: -1,
          yoyo:true
        });
        this.tweens.add({
          targets: camera,
          scrollY: "+=10",
          duration: 4000,
          delay: 500,
          ease: 'linear',
          loop: -1,
          yoyo:true
        });
    }, false));

    this.nextText = this.add.text(middlePoint.x*2 - 300, middlePoint.y*2 - 300, "SPACE TO CONTINUE", {
      fontSize: 50,
      backgroundColor: "red"
    })
    this.nextText.setVisible(false).setOrigin(1).setScrollFactor(0)

  }


  update(this: IntroMovie1, time: number, delta: number) {
    if (time > 10000) {
      this.nextText?.setVisible(true)
      if (this.cursors) {
        if (this.cursors.space.isDown) {
          const IntroScene2 = this.game.scene.getScene("IntroScene2");
          this.scene.launch(IntroScene2).bringToTop("IntroScene2")
          this.scene.stop()
        }
      }
    }
  }
}

export default IntroMovie1;




