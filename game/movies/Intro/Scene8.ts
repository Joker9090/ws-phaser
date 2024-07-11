import Phaser from "phaser";
import Ticker, { TickerJob } from '../Ticker'
import DialogueManager from '../DialogueManager'

class IntroMovie8 extends Phaser.Scene {
  ticker: Ticker;

  //assets
  background3?: Phaser.GameObjects.Image;
  background2?: Phaser.GameObjects.Image;
  background1?: Phaser.GameObjects.Image;
  Piso?: Phaser.GameObjects.Image;
  mountains?: Phaser.GameObjects.Image;
  Nube1?: Phaser.GameObjects.Image;
  Nube2?: Phaser.GameObjects.Image;
  Nube3?: Phaser.GameObjects.Image;


  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  // controllers
  nextText?: Phaser.GameObjects.Text;

  constructor() {
    super({ key: "IntroScene8" });

    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
  }

  preload(this: Phaser.Scene) {
    this.load.image("fondo1", "/movies/intro/scene8/FondoCapa1.png")
    this.load.image("fondo2", "/movies/intro/scene8/FondoCapa2.png")
    this.load.image("fondo3", "/movies/intro/scene8/FondoCapa3.png")
    this.load.image("mountains", "/movies/intro/scene8/Montañas.png")
    this.load.image("Nube1", "/movies/intro/scene8/Nube1.png")
    this.load.image("Nube2", "/movies/intro/scene8/Nube2.png")
    this.load.image("Nube3", "/movies/intro/scene8/Nube3.png")
    this.load.image("Piso", "/movies/intro/scene8/Piso.png")
  }

  scaleImage(image: Phaser.GameObjects.Image) {
    image.displayHeight = this.cameras.main.displayHeight
    image.displayWidth = this.cameras.main.displayWidth
    image.y = this.cameras.main.displayHeight / 2
    image.x = this.cameras.main.displayWidth / 2
  }

  create(this: IntroMovie8, { level }: any) {
    console.log("SCENE 8")

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
    this.mountains = this.add.image(0, 240, "mountains").setOrigin(0.5,1)
    this.Nube1 = this.add.image(0, 350, "Nube1").setOrigin(0.5, 1)
    this.Nube2 = this.add.image(0, 350, "Nube2").setOrigin(0.5, 1)
    this.Nube3 = this.add.image(0, 350, "Nube3").setOrigin(0.5, 1)
    this.Piso = this.add.image(0, 200, "Piso").setOrigin(0.5, 0)


    // const DialogueScene = this.game.scene.getScene("DialogueManager");
    // this.scene.launch(DialogueScene)
    const container = this.add.container(middlePoint.x, middlePoint.y).setSize(1920, 927)
    container.add([
      this.background3,
      this.background2,
      this.background1,
      this.Nube3,
      this.Nube2,
      this.Nube1,
      this.mountains,
      this.Piso,
    ])
    container.setScale(gameObjectScaler.x < gameObjectScaler.y ? gameObjectScaler.y : gameObjectScaler.x)

    // ADD JOBS
    this.ticker.addJob(new TickerJob(1, 100, (job) => {
      this.tweens.add({
        targets: this.cameras.main,
        zoom: 1.5,
        duration: 40000,
        ease: 'lienar',
        loop: -1,
        yoyo: true,
      });
      this.tweens.add({
        targets: [this.background1, this.background2, this.background3],
        scale: 1.5,
        duration: 40000,
        ease: 'lienar',
        loop: -1,
        yoyo: true,
      });
      this.tweens.add({
        targets: [this.Nube1, this.Nube3],
        x: "+=200",
        duration: 40000,
        ease: 'lienar',
        loop: -1,
        yoyo: true,
      });
      this.tweens.add({
        targets: [this.Nube2],
        x:"-=200",
        duration: 40000,
        ease: 'lienar',
        loop: -1,
        yoyo: true,
      });
    }, false));

    this.ticker.addJob(new TickerJob(2, 2500, (job) => {

      }, false));

    this.nextText = this.add.text(middlePoint.x * 2, middlePoint.y * 2, "SPACE TO CONTINUE", {
      fontSize: 50,
      backgroundColor: "red"
    })
    this.nextText.setVisible(false).setOrigin(1).setScrollFactor(0)
  }


  update(this: IntroMovie8, time: number, delta: number) {
    if (time > 10000) {
      this.nextText?.setVisible(true)
      if (this.cursors) {
        if (this.cursors.space.isDown) {
          const scenes = this.game.scene.getScenes();
          scenes.forEach((scene: Phaser.Scene)=>{
            scene.scene.restart()
          })
          const IntroScene1 = this.game.scene.getScene("IntroScene1");
          this.scene.restart(IntroScene1).bringToTop("IntroScene1");
          this.scene.stop()
        }
      }
    }
  }
}

export default IntroMovie8;




