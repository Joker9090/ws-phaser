import Phaser from "phaser";
import Ticker, { TickerJob } from "../Ticker";
import DialogueManager from "../DialogueManager";
import CinematographyModular from "@/game/movies/Cinematography-modular";
import SmallObjects from "../smallObjectsFalling";
import BetweenScenes, { BetweenScenesStatus } from "@/game/BetweenScenes";
import MultiScene from "@/game/MultiScene";

class cineIntro7 {
  ticker: Ticker;
  nextCine: boolean = false;
  cine: CinematographyModular;
  dialogue?: DialogueManager;

  //assets
  background3?: Phaser.GameObjects.Image;
  background2?: Phaser.GameObjects.Image;
  background1?: Phaser.GameObjects.Image;
  Piso?: Phaser.GameObjects.Image;
  mountains?: Phaser.GameObjects.Image;
  Nube1?: Phaser.GameObjects.Image;
  Nube2?: Phaser.GameObjects.Image;
  Nube3?: Phaser.GameObjects.Image;
  smallObject?: SmallObjects;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(cine: CinematographyModular) {
    this.cine = cine;
    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
    this.playCine();
  }
  stopDialogue(){
      this.dialogue?.stop();
      this.dialogue?.destroyContainer();
      this.dialogue = undefined;
  }

  playCine(this: cineIntro7) {
    // START ticker
    this.cine.time.addEvent({
      delay: this.ticker.ms,
      callback: this.ticker.runTicker,
      loop: true,
    });

    // this.cine.cursors = this.input.keyboard?.createCursorKeys();

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
    this.mountains = this.cine.add.image(0, 240, "mountains").setOrigin(0.5, 1);
    this.Nube1 = this.cine.add.image(0, 680, "Nube1").setOrigin(0.5, 1);
    this.Nube2 = this.cine.add.image(0, 680, "Nube2").setOrigin(0.5, 1);
    this.Nube3 = this.cine.add.image(0, 680, "Nube3").setOrigin(0.5, 1);
    this.Piso = this.cine.add.image(0, 200, "PisoNivel8").setOrigin(0.5, 0);

    const piedra11 = this.cine.add
      .image(-middlePoint.x - 380, -50 + 270, "piedrita")
      .setScale(0.02);

    const piedra22 = this.cine.add
      .image(-middlePoint.x - 700, -40 + 170, "piedrita")
      .setScale(0.02)
      .setRotation(20);

    const piedra44 = this.cine.add
      .image(-middlePoint.x - 176, -150 + 170, "piedrita")
      .setScale(0.02)
      .setRotation(60);

    const piedra55 = this.cine.add
      .image(-middlePoint.x - 145, -70 + 370, "piedrita")
      .setScale(0.02)
      .setRotation(240);

    const Piedra2 = this.cine.add
      .image(-middlePoint.x - 251, -50 + 300, "piedrita")
      .setScale(0.02)
      .setRotation(140);

    const Piedra4 = this.cine.add
      .image(-middlePoint.x - 340, -50 + 270, "piedrita")
      .setScale(0.02)
      .setRotation(150);
    const Piedra5 = this.cine.add
      .image(-middlePoint.x - 89, -70 + 400, "piedrita")
      .setScale(0.02);

    const Piedra22 = this.cine.add
      .image(-middlePoint.x - 325, -90 + 480, "piedrita")
      .setScale(0.02)
      .setRotation(20);

    const Meteorito1 = this.cine.add
      .image(-500, -middlePoint.y - 190, "meteoritoTest")
      .setOrigin(0.5, 0.5)
      .setRotation(Math.PI / 6);
    const Meteorito2 = this.cine.add
      .image(-500, -middlePoint.y - 190, "meteoritoTest")
      .setOrigin(0.5, 0.5)
      .setRotation(Math.PI / 6);
    const Meteorito3 = this.cine.add
      .image(-middlePoint.x - 500, -middlePoint.y - 190, "meteoritoTest")
      .setOrigin(0.5, 0.5)
      .setRotation(Math.PI / 6);
    const Meteorito4 = this.cine.add
      .image(-middlePoint.x - 500, -middlePoint.y - 190, "meteoritoTest")
      .setOrigin(0.5, 0.5)
      .setRotation(Math.PI / 6);
    const Meteorito5 = this.cine.add
      .image(-middlePoint.x - 500, -middlePoint.y - 190, "meteoritoTest")
      .setOrigin(0.5, 0.5)
      .setRotation(Math.PI / 6);
    const Meteorito6 = this.cine.add
      .image(-middlePoint.x - 500, -middlePoint.y - 190, "meteoritoTest")
      .setOrigin(0.5, 0.5)
      .setRotation(Math.PI / 6);
    const piedraPrimerPlano1 = this.cine.add
      .image(middlePoint.x + 300, 270, "piedrita")
      .setScale(0.15);
    // const piedraPrimerPlano2 = this.cine.add.image(middlePoint.x + 300, 260, "Piedra2").setScale(0.2);
    const piedraPrimerPlano3 = this.cine.add
      .image(middlePoint.x + 300, 450, "Piedra3")
      .setScale(0.3);
    // const Meteorito3 = this.cine.add.image(-200, -middlePoint.y - 90, "meteoritoTest").setOrigin(0.5, 0.5).setScale(0.1).setFlipX(true)
    // const Meteorito4 = this.cine.add.image(-900, -middlePoint.y - 90, "meteoritoTest").setOrigin(0.5, 0.5).setScale(0.1).setFlipX(true)

    // const SmallObjectsConfig = {
    //   texture: ["Nube1", "Nube2"],
    //   scale: 0.2,
    //   velocity: 200,
    //   alpha: 0.7,
    // }
    // this.smallObject = new SmallObjects(this.cine, SmallObjectsConfig)

    // const DialogueScene = this.game.scene.getScene("DialogueManager");
    // this.scene.launch(DialogueScene)
    const container = this.cine.add
      .container(middlePoint.x, middlePoint.y)
      .setSize(1920, 927);

    const darkMask = this.cine.add
      .rectangle(0, 0,      window.innerWidth*2,
        window.innerHeight*2, 0, 1)
      .setAlpha(0);

    container.add([
      this.background3,
      this.background2,
      this.background1,
      Meteorito1,
      Meteorito2,
      Meteorito3,
      Meteorito4,
      Meteorito5,
      Meteorito6,
      this.Nube3,
      this.Nube2,
      this.Nube1,
      this.Piso,
      this.mountains,
      piedra11,
      piedra22,
      piedra44,
      piedra55,
      Piedra2,
      Piedra4,
      Piedra5,
      Piedra22,
      piedraPrimerPlano1,
      piedraPrimerPlano3,
      darkMask,
    ]);

    // const smallObj = new SmallObjects(this.cine)
    // const smallObjChildren = smallObj.smallObjectsGroup.getChildren()
    // container.add(smallObjChildren)
    // smallObj.start()

    const scale =
      gameObjectScaler.x < gameObjectScaler.y
        ? gameObjectScaler.y
        : gameObjectScaler.x;
    container.setScale(scale);

    container.setPosition(middlePoint.x, middlePoint.y);

    const camera = this.cine.cameras.main;
    camera.postFX.addVignette(0.5, 0.5, 0.8);
    const cameraDialogue = this.cine.cameras.add(
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );
    cameraDialogue.ignore(container);

    const part1 = (job: TickerJob) => {
      this.dialogue = new DialogueManager(
        this.cine,
        ["Oh Dann, you’d definitely love this..."],
        [], // ["intro7audio1"],
        [
          {
            delay: 1000,
            withTapping: {
              audios: ["key01", "key01", "key02"],
              count: 16,
              delay: 180,
            },
            keepAlive: 1000,
            position: {
              width: 650,
            },
          },
        ]
      );
      this.dialogue.play();

      Meteorito1.setPosition(-800, middlePoint.y * -1 - 300);
      Meteorito2.setPosition(-750, middlePoint.y * -1 - 250);
      Meteorito3.setPosition(-900, middlePoint.y * -1 - 250).setScale(
        Meteorito3.scale - 0.2
      );
      Meteorito4.setPosition(-1800, middlePoint.y * -1 - 300);
      Meteorito5.setPosition(-1750, middlePoint.y * -1 - 250);
      Meteorito6.setPosition(-1900, middlePoint.y * -1 - 250).setScale(
        Meteorito3.scale - 0.2
      );

      this.cine.tweens.add({
        targets: Meteorito1,
        x: "+=2000",
        y: "+=1000",
        duration: 1800,
        delay: 1000,
        ease: "ease",
        loop: 0,
        scale: 0,
        alpha: 0,
      });
      this.cine.tweens.add({
        targets: Meteorito2,
        x: "+=2000",
        y: "+=1000",
        duration: 1800,
        delay: 1900,
        ease: "ease",
        loop: 0,
        scale: 0,
        alpha: 0,
      });
      this.cine.tweens.add({
        targets: Meteorito3,
        x: "+=2000",
        y: "+=1000",
        duration: 1200,
        delay: 2400,
        ease: "ease",
        loop: 0,
        scale: 0,
        alpha: 0,
      });

      this.cine.tweens.add({
        targets: Meteorito4,
        x: "+=2000",
        y: "+=1000",
        duration: 1600,
        delay: 2200,
        ease: "ease",
        loop: 0,
        scale: 0,
        alpha: 0,
      });
      this.cine.tweens.add({
        targets: Meteorito5,
        x: "+=2000",
        y: "+=1000",
        duration: 1800,
        delay: 2500,
        ease: "ease",
        loop: 0,
        scale: 0,
        alpha: 0,
      });
      this.cine.tweens.add({
        targets: Meteorito6,
        x: "+=2000",
        y: "+=1000",
        duration: 1200,
        delay: 2900,
        ease: "ease",
        loop: 0,
        scale: 0,
        alpha: 0,
      });
      // this.cine.tweens.add({
      //   targets: Meteorito2,
      //   x: "+=100",
      //   y: "+=100",
      //   duration: 2000,
      //   delay:2000,
      //   ease: "ease",
      //   loop: 0,
      //   scale: 0.5
      // });
      // this.cine.tweens.add({
      //   targets: Meteorito1,
      //   x: 2100,
      //   y: "+=1700",
      //   duration: 3000,
      //   ease: "ease",
      //   loop: 0,
      // });
      // this.cine.tweens.add({
      //   targets: Meteorito1,
      //   scale: 0,
      //   duration: 1700,
      //   ease: "ease",
      //   loop: 0,
      // });
      // this.cine.tweens.add({
      //   targets: Meteorito2,
      //   x: 2000,
      //   y: "+=1600",
      //   delay: 1240,
      //   duration: 2600,
      //   ease: "ease",
      //   loop: 0,
      // });
      // this.cine.tweens.add({
      //   targets: Meteorito2,
      //   scale: 0,
      //   x: 1700,
      //   y: "+=1600",
      //   delay: 1200,
      //   duration: 1600,
      //   ease: "ease",
      //   loop: 0,
      // });
      // this.cine.tweens.add({
      //   targets: [
      //     piedraPrimerPlano2],
      //   x: -2000,
      //   y: '+=10',
      //   rotation: '+=1',
      //   delay: 500,
      //   duration: 41000,
      //   ease: "ease",
      //   loop: 0,
      // });
      piedraPrimerPlano3.setPosition(piedraPrimerPlano3.x - 200, piedraPrimerPlano3.y)
      piedraPrimerPlano1.setPosition(piedraPrimerPlano1.x - 200, piedraPrimerPlano1.y)
      this.cine.tweens.add({
        targets: [piedraPrimerPlano3],
        x: -2000,
        y: "+=10",
        rotation: "+=1",
        delay: 400,
        duration: 48000,
        ease: "ease",
        loop: 0,
      });
      this.cine.tweens.add({
        targets: [piedraPrimerPlano1],
        x: -2000,
        y: "-=50",
        rotation: "-=3",
        delay: 0,
        duration: 50000,
        ease: "ease",
        loop: 0,
      });
      this.cine.tweens.add({
        targets: camera,
        zoom: 1.5,
        duration: 160000,
        ease: "lienar",
        loop: -1,
        yoyo: true,
      });
      [piedra11, piedra55, Piedra2, Piedra22, Piedra5].forEach((_)=>_.setPosition(_.x + 200, _.y))
      this.cine.tweens.add({
        targets: [piedra11, piedra55, Piedra2, Piedra22, Piedra5],
        rotation: "-=1",
        x: 2000,
        duration: 50000,
        ease: "ease",
      });
      this.cine.tweens.add({
        targets: [piedra22, Piedra4],
        rotation: "+=1",
        x: 2300,
        duration: 100000,
        ease: "ease",
      });
      this.cine.tweens.add({
        targets: [piedra44],
        rotation: "+=2",
        x: 2100,
        duration: 100000,
        ease: "ease",
      });
      this.cine.tweens.add({
        targets: [this.background1, this.background2, this.background3],
        scale: 1.5,
        duration: 160000,
        ease: "lienar",
        loop: -1,
        yoyo: true,
      });
      this.cine.tweens.add({
        targets: [this.Nube1, this.Nube3],
        x: "+=200",
        duration: 80000,
        ease: "lienar",
        loop: -1,
        yoyo: true,
      });
      this.cine.tweens.add({
        targets: [this.Nube2],
        x: "-=200",
        duration: 80000,
        ease: "lienar",
        loop: -1,
        yoyo: true,
      });
      this.cine.tweens.add({
        targets: [darkMask],
        alpha: 1,
        duration: 1500,
        delay: 7500,
        onComplete:()=>{
          this.nextCine = true;
        },
        ease: "ease",
      });
      const dialogueListener = (newState: string, nextText?: string) => {
        if (newState === "CONTINUE") {
        } else if (newState === "FINISHED") {
          // this.ticker.deleteJob(job.id);
        }
      };
      this.dialogue?.killState(dialogueListener);
      this.dialogue?.getState(dialogueListener);
    };

    this.ticker.addJob(
      new TickerJob(1, 10, part1, false, undefined, true, (job: TickerJob) => {
        this.nextCine = true;
      })
    );
  }



  update(this: cineIntro7, time: number, delta: number) {
    if (this.dialogue) this.dialogue.update();
    if (this.nextCine) {
      const multiScene = new MultiScene("Game", { level: 0, lifes: 3, loadKey: ['GamePlay1'] });
      const scene = this.cine.scene.add("MultiScene", multiScene, true);
      this.cine.scene.start("MultiScene").bringToTop("MultiScene");
    }
  }
}

export default cineIntro7;
