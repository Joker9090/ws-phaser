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


  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  // controllers
  nextText?: Phaser.GameObjects.Text;

  constructor() {
    super({ key: "IntroScene7" });

    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
  }

  preload(this: Phaser.Scene) {
    this.load.image("fondo1", "/movies/intro/scene6/FondoCapa1.png")
    this.load.image("fondo2", "/movies/intro/scene6/FondoCapa2.png")
    this.load.image("fondo3", "/movies/intro/scene6/FondoCapa3.png")
    this.load.image("Piso", "/movies/intro/scene6/Piso.png")
    this.load.image("AstroFrenteCorte", "/movies/intro/scene6/AStroFrenteCorte.png")
    this.load.image("AstroFrenteEntero", "/movies/intro/scene6/AstroFrenteEntero.png")
    this.load.image("AstroPerfilCorte", "/movies/intro/scene6/AstroPerfilCorte.png")
    this.load.image("AstroPerfilEntero", "/movies/intro/scene6/AstroPerfilEntero.png")
    this.load.image("VidrioVisor", "/movies/intro/scene6/VidrioVisor.png")
  }

  scaleImage(image: Phaser.GameObjects.Image) {
    image.displayHeight = this.cameras.main.displayHeight
    image.displayWidth = this.cameras.main.displayWidth
    image.y = this.cameras.main.displayHeight / 2
    image.x = this.cameras.main.displayWidth / 2
  }

  create(this: IntroMovie7, { level }: any) {
    console.log("SCENE 3")

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



    this.background3 = this.add.image(middlePoint.x, middlePoint.y, "fondo3").setOrigin(0.5)
    this.background2 = this.add.image(middlePoint.x, middlePoint.y, "fondo2").setOrigin(0.5)
    this.background1 = this.add.image(middlePoint.x, middlePoint.y, "fondo1").setOrigin(0.5)
    this.Piso = this.add.image(middlePoint.x, middlePoint.y * 2, "Piso").setOrigin(0.5)
    // this.AstroFrenteCorte = this.add.image(100, middlePoint.y - 120, "PiernaTrasera").setOrigin(0.5, 0).setRotation(Math.PI / 6)
    // this.AstroFrenteEntero = this.add.image(100, middlePoint.y, "Cuerpo").setOrigin(0.5, 1)
    // this.AstroPerfilCorte = this.add.image(100, middlePoint.y - 120, "PiernaDelantera").setOrigin(0.5, 0).setRotation(-Math.PI / 6)
    // this.AstroPerfilEntero = this.add.image(100, middlePoint.y - 549, "BrazoDelantero").setOrigin(0.5, 0).setRotation(-Math.PI / 6)
    // this.VidrioVisor = this.add.image(100, middlePoint.y - 549, "BrazoDelantero").setOrigin(0.5, 0).setRotation(-Math.PI / 6)


    // const DialogueScene = this.game.scene.getScene("DialogueManager");
    // this.scene.launch(DialogueScene)

    // ADD JOBS
    this.ticker.addJob(new TickerJob(1, 100, (job) => {
      // this.tweens.add({
      //   targets: [this.Cuerpo, this.BrazoDelantero, this.PiernaDelantera, this.PiernaTrasera],
      //   y: "+=50",
      //   duration: 1500,
      //   ease: 'ease',
      //   loop: -1,
      //   yoyo: true,
      // });
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




