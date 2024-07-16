import Phaser from "phaser";
import Ticker, { TickerJob } from '../Ticker'
import DialogueManager from '../DialogueManager'

class IntroMovie7 extends Phaser.Scene {
  ticker: Ticker;

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


  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  // controllers
  nextText?: Phaser.GameObjects.Text;

  constructor() {
    super({ key: "IntroScene7" });

    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
  }

  preload(this: Phaser.Scene) {
    this.load.image("Piso", "/movies/intro/scene7/Piso.png")
    this.load.image("fondo1", "/movies/intro/scene7/FondoCapa1.png")
    this.load.image("fondo2", "/movies/intro/scene7/FondoCapa2.png")
    this.load.image("fondo3", "/movies/intro/scene7/FondoCapa3.png")
    this.load.image("AstroFrenteCorte", "/movies/intro/scene7/AStroFrenteCorte.png")
    this.load.image("AstroPerfilCorte", "/movies/intro/scene7/AstroPerfilCorte.png")
    this.load.image("VidrioVisor", "/movies/intro/scene7/VidrioVisor.png")
    this.load.image("VidrioVisorView", "/movies/intro/scene7/VidrioVisorView.png")
  }

  scaleImage(image: Phaser.GameObjects.Image) {
    image.displayHeight = this.cameras.main.displayHeight
    image.displayWidth = this.cameras.main.displayWidth
    image.y = this.cameras.main.displayHeight / 2
    image.x = this.cameras.main.displayWidth / 2
  }

  create(this: IntroMovie7, { level }: any) {
    console.log("SCENE 7")

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

    const gameObjectScaler = {
      x: window.innerWidth / 1920,
      y: window.innerHeight / 927,
    }

    this.background3 = this.add.image(0, 0, "fondo3").setOrigin(0.5)
    this.background2 = this.add.image(0, 0, "fondo2").setOrigin(0.5)
    this.background1 = this.add.image(0, 0, "fondo1").setOrigin(0.5)
    this.AstroFrenteCorte = this.add.image(0, 0, "AstroFrenteCorte").setOrigin(0.5)
    this.VidrioVisor = this.add.image(-30, 0, "VidrioVisor").setOrigin(0.5)
    this.VidrioVisorView = this.add.image(-30, 0, "VidrioVisorView").setOrigin(0.5)
    this.VidrioVisor2 = this.add.image(92, 0, "VidrioVisor").setOrigin(0.5).setAlpha(0)
    this.VidrioVisorView2 = this.add.image(92, 0, "VidrioVisorView").setOrigin(0.5).setAlpha(0)
    this.AstroPerfilCorte = this.add.image(-30, 0, "AstroPerfilCorte").setOrigin(0.5).setAlpha(0)
    this.Piso = this.add.image(0, 0, "Piso").setOrigin(0.5, 0.5)


    // const DialogueScene = this.game.scene.getScene("DialogueManager");
    // this.scene.launch(DialogueScene)
    const container = this.add.container(middlePoint.x, middlePoint.y).setSize(1920, 927)
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
    const camera = this.cameras.main
    camera.postFX.addVignette(0.5, 0.5, 0.8);
    // ADD JOBS
    this.ticker.addJob(new TickerJob(1, 100, (job) => {
      this.tweens.add({
        targets: this.cameras.main,
        zoom: 1.5,
        duration: 30000,
        ease: 'lienar',
        loop: -1,
        yoyo: true,
      });
      this.tweens.add({
        targets: [this.background1, this.background2, this.background3],
        scale: 1.5,
        duration: 30000,
        ease: 'lienar',
        loop: -1,
        yoyo: true,
      });
    }, false));

    this.ticker.addJob(new TickerJob(2, 2500, (job) => {
      
        this.tweens.add({
          targets: [this.AstroFrenteCorte, this.VidrioVisorView, this.VidrioVisor],
          alpha: 0,
          duration: 1500,
          ease: 'linear',
        });
        this.tweens.add({
          targets: [this.AstroPerfilCorte, this.VidrioVisorView2, this.VidrioVisor2],
          alpha: 1,
          duration: 1500,
          ease: 'linear',
        });
      }, false));

    this.nextText = this.add.text(middlePoint.x * 2, middlePoint.y * 2, "SPACE TO CONTINUE", {
      fontSize: 50,
      backgroundColor: "red"
    })
    this.nextText.setVisible(false).setOrigin(1).setScrollFactor(0)
  }


  update(this: IntroMovie7, time: number, delta: number) {
    if (time > 10000) {
      this.nextText?.setVisible(true)
      if (this.cursors) {
        if (this.cursors.space.isDown) {
          const IntroScene8 = this.game.scene.getScene("IntroScene8");
          this.scene.launch(IntroScene8).bringToTop("IntroScene8")
          this.scene.stop()
        }
      }
    }
  }
}

export default IntroMovie7;




