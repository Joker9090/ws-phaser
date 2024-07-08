import Phaser from "phaser";
import Ticker, { TickerJob } from '../Ticker'
import DialogueManager from '../DialogueManager'

class IntroMovie6 extends Phaser.Scene {
  ticker: Ticker;

  //assets
  background3?: Phaser.GameObjects.Image;
  background2?: Phaser.GameObjects.Image;
  background1?: Phaser.GameObjects.Image;
  BrazoDelantero?: Phaser.GameObjects.Image;
  Cuerpo?: Phaser.GameObjects.Image;
  PiernaDelantera?: Phaser.GameObjects.Image;
  PiernaTrasera?: Phaser.GameObjects.Image;
  Piso?: Phaser.GameObjects.Image;


  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  // controllers
  nextText?: Phaser.GameObjects.Text;

  constructor() {
    super({ key: "IntroScene6" });

    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
  }

  preload(this: Phaser.Scene) {
    this.load.image("fondo1", "/movies/intro/scene6/FondoCapa1.png")
    this.load.image("fondo2", "/movies/intro/scene6/FondoCapa2.png")
    this.load.image("fondo3", "/movies/intro/scene6/FondoCapa3.png")
    this.load.image("BrazoDelantero", "/movies/intro/scene6/BrazoDelatero.png")
    this.load.image("Cuerpo", "/movies/intro/scene6/Cuerpo.png")
    this.load.image("PiernaDelantera", "/movies/intro/scene6/PiernaDelantera.png")
    this.load.image("PiernaTrasera", "/movies/intro/scene6/PiernaTrasera.png")
    this.load.image("Piso", "/movies/intro/scene6/Piso.png")
  }

  scaleImage(image: Phaser.GameObjects.Image) {
    image.displayHeight = this.cameras.main.displayHeight
    image.displayWidth = this.cameras.main.displayWidth
    image.y = this.cameras.main.displayHeight / 2
    image.x = this.cameras.main.displayWidth / 2
  }

  create(this: IntroMovie6, { level }: any) {
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
    this.PiernaTrasera = this.add.image(100, middlePoint.y - 120, "PiernaTrasera").setOrigin(0.5, 0).setRotation(Math.PI / 6)
    this.Cuerpo = this.add.image(100, middlePoint.y, "Cuerpo").setOrigin(0.5, 1)
    this.PiernaDelantera = this.add.image(100, middlePoint.y - 120, "PiernaDelantera").setOrigin(0.5, 0).setRotation(-Math.PI / 6)
    this.BrazoDelantero = this.add.image(100, middlePoint.y - 549, "BrazoDelantero").setOrigin(0.5, 0).setRotation(-Math.PI / 6)


    // const DialogueScene = this.game.scene.getScene("DialogueManager");
    // this.scene.launch(DialogueScene)

    // ADD JOBS
    this.ticker.addJob(new TickerJob(1, 100, (job) => {
      this.tweens.add({
        targets: [this.Cuerpo, this.BrazoDelantero, this.PiernaDelantera, this.PiernaTrasera],
        y: "+=50",
        duration: 1500,
        ease: 'ease',
        loop: -1,
        yoyo: true,
      });
      this.tweens.add({
        targets: [this.BrazoDelantero, this.PiernaDelantera],
        rotation: Math.PI / 6,
        duration: 3000,
        ease: 'ease',
        loop: -1,
        yoyo: true,
      });
      this.tweens.add({
        targets: [this.PiernaTrasera],
        rotation: -Math.PI / 6,
        duration: 3000,
        ease: 'ease',
        loop: -1,
        yoyo: true,
      });
      this.tweens.add({
        targets: [this.Cuerpo, this.BrazoDelantero, this.PiernaDelantera, this.PiernaTrasera],
        x: "+=2500",
        duration: 20000,
        ease: 'ease',
      });
    }, false));

    this.nextText = this.add.text(middlePoint.x * 2, middlePoint.y * 2, "SPACE TO CONTINUE", {
      fontSize: 50,
      backgroundColor: "red"
    })
    this.nextText.setVisible(false).setOrigin(1).setScrollFactor(0)
  }


  update(this: IntroMovie6, time: number, delta: number) {
    if (time > 10000) {
      this.nextText?.setVisible(true)
      if (this.cursors) {
        if (this.cursors.space.isDown) {
          const IntroScene7 = this.game.scene.getScene("IntroScene7");
          this.scene.launch(IntroScene7).bringToTop("IntroScene7")
          this.scene.stop()
        }
      }
    }
  }
}

export default IntroMovie6;




