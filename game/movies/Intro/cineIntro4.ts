import Phaser from "phaser";
import Ticker, { TickerJob } from '../Ticker'
import DialogueManager from '../DialogueManager'
import CinematographyModular from "@/game/movies/Cinematography-modular";


class cineIntro4 {
  ticker: Ticker;
  nextCine: boolean = false;
  cine: CinematographyModular

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


  constructor(cine : CinematographyModular) {
    this.cine = cine
    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
    this.playCine()
  }


  playCine(this: cineIntro4) {

    // START ticker
    this.cine.time.addEvent({
      delay: this.ticker.ms,
      callback: this.ticker.runTicker,
      loop: true,
    });


    const middlePoint = {
      x: this.cine.cameras.main.displayWidth / 2,
      y: this.cine.cameras.main.displayHeight / 2,
    };

    const gameObjectScaler = {
      x: window.innerWidth / 1920,
      y: window.innerHeight / 927,
    }

    this.background3 = this.cine.add.image(0, 0, "fondo3").setOrigin(0.5)
    this.background2 = this.cine.add.image(0, 0, "fondo2").setOrigin(0.5)
    this.background1 = this.cine.add.image(0, 0, "fondo1").setOrigin(0.5)
    this.SuperficiePlaneta = this.cine.add.image(0, 0, "SuperficiePlaneta").setOrigin(0.5)
    this.OpacidadDetrasDeNave = this.cine.add.image(0, 0, "OpacidadDetrasDeNave").setOrigin(0.5)
    this.NubePolvo1 = this.cine.add.image( 300,  -400, "NubePolvo1").setOrigin(0.5)
    this.NubePolvo2 = this.cine.add.image( -150,  -250, "NubePolvo2").setOrigin(0.5)
    this.NubePolvo3 = this.cine.add.image( 250,  -150, "NubePolvo3").setOrigin(0.5)
    this.NaveCerrada = this.cine.add.image(0, 0, "NaveCerrada").setOrigin(0.5)
    this.NaveCerradaLuces = this.cine.add.image(0, 0, "NaveCerradaLuces").setOrigin(0.5)
    this.NaveAbierta = this.cine.add.image( 50, 0, "NaveAbierta").setOrigin(0.5).setVisible(false)
    this.NaveAbiertaLuces = this.cine.add.image( 50, 0, "NaveAbiertaLuces").setOrigin(0.5).setVisible(false)
    this.NubePolvo4 = this.cine.add.image( 280,  300, "NubePolvo4").setOrigin(0.5)
    this.NubePolvo5 = this.cine.add.image( -290,  300, "NubePolvo5").setOrigin(0.5)
    this.PiedrasDelanteras = this.cine.add.image(0, 100, "PiedrasDelanteras").setOrigin(0.5, 0)

    const container = this.cine.add.container(middlePoint.x, middlePoint.y).setSize(1920, 927)
    container.add([
      this.background3, 
      this.background2, 
      this.background1,
      this.SuperficiePlaneta,
      this.OpacidadDetrasDeNave,
      this.NubePolvo3,
      this.NubePolvo2,
      this.NaveCerrada,
      this.NaveCerradaLuces,
      this.NaveAbierta,
      this.NaveAbiertaLuces,
      this.NubePolvo1,
      this.NubePolvo4,
      this.NubePolvo5,
      this.PiedrasDelanteras,
    ])
    container.setScale(gameObjectScaler.x < gameObjectScaler.y ? gameObjectScaler.y : gameObjectScaler.x)

    // const DialogueScene = this.game.scene.getScene("DialogueManager");
    // this.scene.launch(DialogueScene)
    const camera = this.cine.cameras.main
    camera.postFX.addVignette(0.5, 0.5, 0.8);
    // ADD JOBS
    this.ticker.addJob(new TickerJob(1, 100, (job) => {
      this.cine.tweens.add({
        targets: [this.NaveCerradaLuces, this.NaveAbiertaLuces],
        alpha: 0.2,
        duration: 2000,
        ease: 'expo.in',
        loop: -1,
      });
      this.cine.tweens.add({
        targets: camera,
        zoom: 1.3,
        duration: 160000,
        ease: 'linear',
      });
      this.cine.tweens.add({
        targets: [this.NubePolvo1, this.NubePolvo4],
        x: "+=1500",
        y: "-=200",
        duration: 160000,
        ease: 'linear',
      });
      this.cine.tweens.add({
        targets: [this.NubePolvo2, this.NubePolvo5],
        x: "-=1500",
        duration: 160000,
        ease: 'linear',
      });
      this.cine.tweens.add({
        targets: [this.NubePolvo3],
        y: "+=200",
        x: "+=1500",
        duration: 160000,
        ease: 'linear',
      });
    }, false));

    this.ticker.addJob(new TickerJob(2, 12000, (job) => {
      camera.flash(10000, 255, 255, 255, false, (camera: any, progress: number) => {
        if (progress < 0.5) {
          this.NaveCerrada?.setVisible(false)
          this.NaveCerradaLuces?.setVisible(false)
          this.NaveAbierta?.setVisible(true)
          this.NaveAbiertaLuces?.setVisible(true)
        }
      })

    }, false));

    this.ticker.addJob(new TickerJob(6, 24000, (job) => {
      container.destroy(true)
      this.nextCine = true
    }, false));

    this.nextText = this.cine.add.text(middlePoint.x * 2, middlePoint.y * 2, "SPACE TO CONTINUE", {
      fontSize: 50,
      backgroundColor: "red"
    })
    this.nextText.setVisible(false).setOrigin(1).setScrollFactor(0)
  }



  update(this : cineIntro4, time: number, delta: number) {
    if (this.nextCine) this.cine.scene.restart({ keyname: "cine_intro_5" })
    
  }
}

export default cineIntro4;




