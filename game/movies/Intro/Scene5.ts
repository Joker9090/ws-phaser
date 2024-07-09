import Phaser from "phaser";
import Ticker, { TickerJob } from '../Ticker'
import DialogueManager from '../DialogueManager'

class IntroMovie5 extends Phaser.Scene {
  ticker: Ticker;

  //assets
  background3?: Phaser.GameObjects.Image;
  background2?: Phaser.GameObjects.Image;
  background1?: Phaser.GameObjects.Image;
  planet?: Phaser.GameObjects.Image;
  NubePolvo1?: Phaser.GameObjects.Image;
  NubePolvo2?: Phaser.GameObjects.Image;
  NubePolvo3?: Phaser.GameObjects.Image;
  NubePolvo4?: Phaser.GameObjects.Image;
  NubePolvo5?: Phaser.GameObjects.Image;
  NaveAbierta?: Phaser.GameObjects.Image;
  NaveAbiertaLuces?: Phaser.GameObjects.Image;
  NaveCerrada?: Phaser.GameObjects.Image;
  NaveCerradaLuces?: Phaser.GameObjects.Image;
  OpacidadDetrasDeNave?: Phaser.GameObjects.Image;
  PiedrasDelanteras?: Phaser.GameObjects.Image;
  PiedrasNave?: Phaser.GameObjects.Image;
  SuperficiePlaneta?: Phaser.GameObjects.Image;

  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  // controllers
  nextText?: Phaser.GameObjects.Text;

  constructor() {
    super({ key: "IntroScene5" });

    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
  }

  preload(this: Phaser.Scene) {
    this.load.image("fondo1", "/movies/intro/scene5/FondoCapa1.png")
    this.load.image("fondo2", "/movies/intro/scene5/FondoCapa2.png")
    this.load.image("fondo3", "/movies/intro/scene5/FondoCapa3.png")
    this.load.image("planet", "/movies/intro/scene5/PlantaDeco.png")
    this.load.image("NubePolvo1", "/movies/intro/scene5/NubePolvo1.png")
    this.load.image("NubePolvo2", "/movies/intro/scene5/NubePolvo2.png")
    this.load.image("NubePolvo3", "/movies/intro/scene5/NubePolvo3.png")
    this.load.image("NubePolvo4", "/movies/intro/scene5/NubePolvo4.png")
    this.load.image("NubePolvo5", "/movies/intro/scene5/NubePolvo5.png")
    this.load.image("NaveAbierta", "/movies/intro/scene5/NaveAbierta.png")
    this.load.image("NaveAbiertaLuces", "/movies/intro/scene5/NaveAbiertaLuces.png")
    this.load.image("NaveCerrada", "/movies/intro/scene5/NaveCerrada.png")
    this.load.image("NaveCerradaLuces", "/movies/intro/scene5/NaveCerradaLuces.png")
    this.load.image("OpacidadDetrasDeNave", "/movies/intro/scene5/OpacidadDetrasDeNave.png")
    this.load.image("PiedrasDelanteras", "/movies/intro/scene5/PiedrasDelanteras.png")
    this.load.image("PiedrasNave", "/movies/intro/scene5/PiedrasNave.png")
    this.load.image("SuperficiePlaneta", "/movies/intro/scene5/SuperficiePlaneta.png")
  }

  scaleImage(image: Phaser.GameObjects.Image) {
    image.displayHeight = this.cameras.main.displayHeight
    image.displayWidth = this.cameras.main.displayWidth
    image.y = this.cameras.main.displayHeight / 2
    image.x = this.cameras.main.displayWidth / 2
  }

  create(this: IntroMovie5, { level }: any) {
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
    this.planet = this.add.image(middlePoint.x*2*3/4, middlePoint.y - 250, "planet").setOrigin(1, 0.8)
    this.SuperficiePlaneta = this.add.image(middlePoint.x, middlePoint.y, "SuperficiePlaneta").setOrigin(0.5)
    this.OpacidadDetrasDeNave = this.add.image(middlePoint.x, middlePoint.y, "OpacidadDetrasDeNave").setOrigin(0.5)
    this.NubePolvo1 = this.add.image(middlePoint.x + 200, middlePoint.y - 300, "NubePolvo1").setOrigin(0.5)
    this.NubePolvo2 = this.add.image(middlePoint.x - 150, middlePoint.y - 250, "NubePolvo2").setOrigin(0.5)
    this.NubePolvo3 = this.add.image(middlePoint.x + 50, middlePoint.y + 100, "NubePolvo3").setOrigin(0.5)
    this.NaveCerrada = this.add.image(middlePoint.x, middlePoint.y, "NaveCerrada").setOrigin(0.5)
    this.NaveCerradaLuces = this.add.image(middlePoint.x, middlePoint.y, "NaveCerradaLuces").setOrigin(0.5)
    this.NaveAbierta = this.add.image(middlePoint.x - 50, middlePoint.y, "NaveAbierta").setOrigin(0.5).setVisible(false)
    this.NaveAbiertaLuces = this.add.image(middlePoint.x - 50, middlePoint.y, "NaveAbiertaLuces").setOrigin(0.5).setVisible(false)
    this.PiedrasNave = this.add.image(middlePoint.x , middlePoint.y + 320, "PiedrasNave").setOrigin(0.5)
    this.NubePolvo4 = this.add.image(middlePoint.x + 140, middlePoint.y +300, "NubePolvo4").setOrigin(0.5)
    this.NubePolvo5 = this.add.image(middlePoint.x - 160, middlePoint.y + 300, "NubePolvo5").setOrigin(0.5)
    this.PiedrasDelanteras = this.add.image(middlePoint.x , middlePoint.y *2, "PiedrasDelanteras").setOrigin(0.5, 1)
  
    

    // const DialogueScene = this.game.scene.getScene("DialogueManager");
    // this.scene.launch(DialogueScene)

    // ADD JOBS
      this.ticker.addJob(new TickerJob(1, 100, (job) => {
        this.tweens.add({
          targets: [this.NaveCerradaLuces, this.NaveAbiertaLuces],
          alpha:  0.2,
          duration: 500,
          ease: 'expo.in',
          loop: -1,
        });
        this.tweens.add({
          targets: [this.NubePolvo1, this.NubePolvo4],
          x:  "+=1500",
          y:  "-=200",
          duration: 80000,
          ease: 'linear',
        });
        this.tweens.add({
          targets: [this.NubePolvo2, this.NubePolvo5],
          x:  "-=1500",
          duration: 80000,
          ease: 'linear',
        });
        this.tweens.add({
          targets: [this.NubePolvo3],
          y:  "+=200",
          x:  "+=1500",
          duration: 80000,
          ease: 'linear',
        });
      }, false));

      this.ticker.addJob(new TickerJob(2, 2000, (job) => {
        this.cameras.main.flash(2000, 0, 0, 0, false, (camera : any, progress: number) => {
          if (progress < 0.5) {
            console.log("entro aca")
            this.NaveCerrada?.setVisible(false)
            this.NaveCerradaLuces?.setVisible(false)
            this.NaveAbierta?.setVisible(true)
            this.NaveAbiertaLuces?.setVisible(true)
          }
        })

      }, false));

    this.nextText = this.add.text(middlePoint.x*2, middlePoint.y*2, "SPACE TO CONTINUE", {
      fontSize: 50,
      backgroundColor: "red"
    })
    this.nextText.setVisible(false).setOrigin(1).setScrollFactor(0)
  }


  update(this: IntroMovie5, time: number, delta: number) {
    if (time > 10000) {
      this.nextText?.setVisible(true)
      if (this.cursors) {
        if (this.cursors.space.isDown) {
          const IntroScene6 = this.game.scene.getScene("IntroScene6");
          this.scene.launch(IntroScene6).bringToTop("IntroScene6")
          this.scene.stop()
        }
      }
    }
  }
}

export default IntroMovie5;




