import Phaser from "phaser";
import Ticker, { TickerJob } from '../Ticker'
import DialogueManager from '../DialogueManager'

class IntroMovie2 extends Phaser.Scene {
  ticker: Ticker;

  //assets
  background3?: Phaser.GameObjects.Image;
  background2?: Phaser.GameObjects.Image;
  background1?: Phaser.GameObjects.Image;
  planet?: Phaser.GameObjects.Image;
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

  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;


  // controllers
  nextText?: Phaser.GameObjects.Text;

  constructor() {
    super({ key: "IntroScene2" });

    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
  }

  preload(this: Phaser.Scene) {
    this.load.image("fondo1", "/movies/intro/scene2/FondoCapa1.png")
    this.load.image("fondo2", "/movies/intro/scene2/FondoCapa2.png")
    this.load.image("fondo3", "/movies/intro/scene2/FondoCapa3.png")
    this.load.image("planet", "/movies/intro/scene2/planeta.png")
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

  scaleImages(images: Phaser.GameObjects.Image[]) {
    images.forEach((image: Phaser.GameObjects.Image)=> {
      image.displayHeight = this.cameras.main.displayHeight
      image.displayWidth = this.cameras.main.displayWidth
      image.y = this.cameras.main.displayHeight / 2
      image.x = this.cameras.main.displayWidth / 2
    })
  }

  create(this: IntroMovie2, { level }: any) {
    console.log("SCENE 2")

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

    const lights = {
      right: {
        x: middlePoint.x + 503,
        y: middlePoint.y / 2 + 47,
      },
      left: {
        x: middlePoint.x - 503,
        y: middlePoint.y / 2 + 52
      }
    };

    this.background3 = this.add.image(middlePoint.x, middlePoint.y, "fondo3").setOrigin(0.5)
    this.background2 = this.add.image(middlePoint.x, middlePoint.y, "fondo2").setOrigin(0.5)
    this.background1 = this.add.image(middlePoint.x, middlePoint.y, "fondo1").setOrigin(0.5)
    this.planet = this.add.image(middlePoint.x, middlePoint.y, "planet").setOrigin(1, 0.8)
    this.naveCapaTrasera = this.add.image(middlePoint.x, middlePoint.y, "naveCapaTrasera").setOrigin(0.5)
    this.marcoVentana = this.add.image(middlePoint.x, middlePoint.y, "marcoVentana").setOrigin(0.5, 0.75)
    this.vidrioVentana = this.add.image(middlePoint.x, middlePoint.y, "vidrioVentana").setOrigin(0.5, 0.75)
    this.naveCapaDelantera = this.add.image(middlePoint.x, middlePoint.y * 2, "naveCapaDelantera").setOrigin(0.5, 1)
    this.luzAlarmaRoja = this.add.image(lights.right.x, lights.right.y, "luzAlarmaRoja").setOrigin(0.5)
    this.alarmaRojaOff = this.add.image(lights.right.x, lights.right.y, "alarmaRojaOff").setOrigin(0.5)
    this.alarmaRojaOn = this.add.image(lights.right.x, lights.right.y, "alarmaRojaOn").setOrigin(0.5)
    this.luzAlarmaVerde = this.add.image(lights.left.x, lights.left.y, "luzAlarmaVerde").setOrigin(0.5)
    this.alarmaVerdeOff = this.add.image(lights.left.x, lights.left.y, "alarmaVerdeOff").setOrigin(0.5)
    this.alarmaVerdeOn = this.add.image(lights.left.x, lights.left.y, "alarmaVerdeOn").setOrigin(0.5)
    this.LuzPanelRojo = this.add.image(middlePoint.x + 620, middlePoint.y + 188, "LuzPanelRojo").setOrigin(0.5).setScale(1, 0.95)
    this.LuzPanelVerde = this.add.image(middlePoint.x - 620, middlePoint.y + 188, "LuzPanelVerde").setOrigin(0.5).setScale(1, 0.95)
    this.LuzPanelRojo2 = this.add.image(middlePoint.x + 620, middlePoint.y + 188, "LuzPanelRojo").setOrigin(0.5).setScale(.7, 0.95)
    this.LuzPanelVerde2 = this.add.image(middlePoint.x - 620, middlePoint.y + 188, "LuzPanelVerde").setOrigin(0.5).setScale(.7, 0.95)

    const Images = [
      this.background3,
      this.background2,
      this.background1,
      this.planet,
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
      this.LuzPanelRojo2,
      this.LuzPanelVerde2,
    ]

    this.scaleImages(Images)
    // const DialogueScene = this.game.scene.getScene("DialogueManager");
    // this.scene.launch(DialogueScene)

    // ADD JOBS
    this.ticker.addJob(new TickerJob(1, 100, (job) => {
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
        alpha: 0.3,
        duration: 500,
        ease: 'linear',
        loop: -1,
        yoyo: true
      });
      this.tweens.add({
        targets: this.planet,
        scale: 1.3,
        duration: 30000,
        ease: 'linear',
      });
      this.tweens.add({
        targets: [this.background1, this.background2, this.background3],
        scale: 1.3,
        duration: 30000,
        ease: 'linear',
      });
      this.tweens.add({
        targets: this.LuzPanelRojo,
        alpha: 0.2,
        duration: 700,
        ease: 'expo.out',
        loop: -1,
        yoyo: true
      });
      this.tweens.add({
        targets: this.LuzPanelRojo2,
        alpha: 0.4,
        duration: 1300,
        ease: 'expo.in',
        loop: -1,

      });
      this.tweens.add({
        targets: this.LuzPanelVerde,
        alpha: 0.25,
        duration: 800,
        ease: 'expo.out',
        loop: -1,
        yoyo: true
      });
      this.tweens.add({
        targets: this.LuzPanelVerde2,
        alpha: 0.5,
        duration: 600,
        ease: 'expo.in',
        loop: -1,
      });
    }, false));

    this.ticker.addJob(new TickerJob(2, 100, (job) => {
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
        alpha: 0.3,
        duration: 600,
        ease: 'linear',
        loop: -1,
        yoyo: true
      });
    }, false));

    this.cameras.main.setZoom(1.5)

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
          const IntroScene3 = this.game.scene.getScene("IntroScene3");
          this.scene.launch(IntroScene3).bringToTop("IntroScene3")
          this.scene.stop()
        }
      }
    }
  }
}

export default IntroMovie2;



