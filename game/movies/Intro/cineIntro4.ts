import Phaser from "phaser";
import Ticker, { TickerJob } from "../Ticker";
import DialogueManager from "../DialogueManager";
import CinematographyModular from "@/game/movies/Cinematography-modular";

class cineIntro4 {
  ticker: Ticker;
  nextCine: boolean = false;
  cine: CinematographyModular;

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
  OpacidadDetrasDeNave?: Phaser.GameObjects.Image;
  PiedrasDelanteras?: Phaser.GameObjects.Image;
  PiedrasNave?: Phaser.GameObjects.Image;
  SuperficiePlaneta?: Phaser.GameObjects.Image;
  NubePrimerPlano1?: Phaser.GameObjects.Image;
  NubePrimerPlano2?: Phaser.GameObjects.Image;
  NubePrimerPlano3?: Phaser.GameObjects.Image;
  NubePrimerPlano4?: Phaser.GameObjects.Image;

  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  // controllers
  nextText?: Phaser.GameObjects.Text;

  constructor(cine: CinematographyModular) {
    this.cine = cine;
    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
    this.playCine();
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
    };

    this.background3 = this.cine.add.image(0, 0, "fondo3").setOrigin(0.5);
    this.background2 = this.cine.add.image(0, 0, "fondo2").setOrigin(0.5);
    this.background1 = this.cine.add.image(0, 0, "fondo1").setOrigin(0.5);
    this.SuperficiePlaneta = this.cine.add
      .image(0, 0, "SuperficiePlaneta")
      .setOrigin(0.5);
    this.OpacidadDetrasDeNave = this.cine.add
      .image(0, 0, "OpacidadDetrasDeNave")
      .setOrigin(0.5);
    this.NubePolvo1 = this.cine.add
      .image(300, -400, "NubePolvo1")
      .setOrigin(0.5)
      .setAlpha(0.9).setVisible(false);
    this.NubePolvo2 = this.cine.add
      .image(-150, -250, "NubePolvo2")
      .setOrigin(0.5)
      .setScale(0.3)
      .setAlpha(0.9);

    this.NubePolvo3 = this.cine.add
      .image(250, -150, "NubePolvo3")
      .setOrigin(0.5)
      .setScale(0.3)
      .setAlpha(0.9);

    this.NaveAbierta = this.cine.add.image(50, 0, "NaveAbiertaB").setOrigin(0.5);
    this.NaveAbiertaLuces = this.cine.add
      .image(50, 0, "NaveAbiertaLucesB")
      .setOrigin(0.5);
    this.NubePolvo4 = this.cine.add
      .image(280, 300, "NubePolvo4")
      .setOrigin(0.5)
      .setScale(0.3).setAlpha(0.9);
    this.NubePolvo5 = this.cine.add
      .image(-290, 300, "NubePolvo5")
      .setOrigin(0.5)
      .setScale(0.3).setAlpha(0.9);
    this.PiedrasDelanteras = this.cine.add
      .image(0, 100, "PiedrasDelanteras")
      .setOrigin(0.5, 0);
    this.NubePrimerPlano1 = this.cine.add
      .image(-450, -150, "NubePrimerPlano")
      .setOrigin(0.5)
      .setScale(2)
      .setRotation(0)
      .setAlpha(0.9);
    this.NubePrimerPlano2 = this.cine.add
      .image(400, -150, "NubePrimerPlano")
      .setOrigin(0.5)
      .setScale(2)
      .setRotation(Math.PI / 6)
      .setAlpha(0.9);
    this.NubePrimerPlano3 = this.cine.add
      .image(-400, 150, "NubePrimerPlano")
      .setOrigin(0.5)
      .setScale(2)
      .setRotation((Math.PI * 5) / 9)
      .setAlpha(0.9);
    this.NubePrimerPlano4 = this.cine.add
      .image(400, 150, "NubePrimerPlano")
      .setOrigin(0.5)
      .setScale(2)
      .setRotation(Math.PI / 7)
      .setAlpha(0.9);

    const container = this.cine.add
      .container(middlePoint.x, middlePoint.y)
      .setSize(1920, 927);
    container.add([
      this.background3,
      this.background2,
      this.background1,
      this.SuperficiePlaneta,
      this.OpacidadDetrasDeNave,
      this.NubePolvo3,
      this.NubePolvo2,
      this.NaveAbierta,
      this.NaveAbiertaLuces,
      this.NubePolvo1,
      this.NubePolvo4,
      this.NubePolvo5,
      this.PiedrasDelanteras,
      this.NubePrimerPlano1,
      // this.NubePrimerPlano2,
      // this.NubePrimerPlano3,
      this.NubePrimerPlano4,
    ]);
    container.setScale(
      gameObjectScaler.x < gameObjectScaler.y
        ? gameObjectScaler.y
        : gameObjectScaler.x
    );

    // const DialogueScene = this.game.scene.getScene("DialogueManager");
    // this.scene.launch(DialogueScene)
    const camera = this.cine.cameras.main;
    // camera.postFX.addVignette(0.5, 0.5, 0.8);
    // ADD JOBS

    const part1 = (job: TickerJob) => {
      this.cine.tweens.add({
        targets: [this.NaveAbiertaLuces],
        alpha: 0.2,
        duration: 2000,
        ease: "expo.in",
        loop: -1,
      });
      this.cine.tweens.add({
        targets: [this.NubePrimerPlano1, this.NubePrimerPlano3],
        alpha: 0,
        x: -1000,
        duration: 10000,
        ease: "ease",
        loop: 0,
      });
      this.cine.tweens.add({
        targets: [this.NubePrimerPlano2, this.NubePrimerPlano4],
        alpha: 0,
        x: 1000,
        duration: 10000,
        ease: "ease",
        loop: 0,
      });
      this.cine.tweens.add({
        targets: camera,
        zoom: 1.3,
        duration: 160000,
        ease: "linear",
        onStart: (a) => {},
      });
      this.cine.tweens.add({
        targets: [this.NubePolvo1, this.NubePolvo4],
        x: "+=1500",
        y: "-=200",
        duration: 160000,
        ease: "linear",
      });
      this.cine.tweens.add({
        targets: [this.NubePolvo2, this.NubePolvo5],
        x: "-=1500",
        duration: 160000,
        ease: "linear",
      });
      this.cine.tweens.add({
        targets: [this.NubePolvo3],
        y: "+=200",
        x: "+=1500",
        duration: 160000,
        ease: "linear",
      });
      this.cine.tweens.add({
        targets: camera,
        scrollX: "+=1",
        duration: 1000,
        delay: 6000,
      });
    };
    this.ticker.addJob(
      new TickerJob(1, 10, part1, false, 7000, true, (job: TickerJob) => {
        this.nextCine = true;
      })
    );
  }

  update(this: cineIntro4, time: number, delta: number) {
    if (this.nextCine) this.cine.scene.restart({ keyname: "cine_intro_6" });
  }
}

export default cineIntro4;
