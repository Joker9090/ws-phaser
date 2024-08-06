import Phaser from "phaser";
import Ticker, { TickerJob } from '../Ticker'
import DialogueManager from '../DialogueManager'
import CinematographyModular from "@/game/movies/Cinematography-modular";
import SmallObjects from "../smallObjectsFalling";


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
    this.cine = cine
    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
    this.playCine()
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
    }

    this.background3 = this.cine.add.image(0, 0, "fondo3").setOrigin(0.5)
    this.background2 = this.cine.add.image(0, 0, "fondo2").setOrigin(0.5)
    this.background1 = this.cine.add.image(0, 0, "fondo1").setOrigin(0.5)
    this.mountains = this.cine.add.image(0, 240, "mountains").setOrigin(0.5, 1)
    this.Nube1 = this.cine.add.image(0, 350, "Nube1").setOrigin(0.5, 1)
    this.Nube2 = this.cine.add.image(0, 350, "Nube2").setOrigin(0.5, 1)
    this.Nube3 = this.cine.add.image(0, 350, "Nube3").setOrigin(0.5, 1)
    this.Piso = this.cine.add.image(0, 200, "PisoNivel8").setOrigin(0.5, 0)

    const piedra1 = this.cine.add.image(-middlePoint.x + 0, -middlePoint.y - 90, "Piedra1").setScale(0.5)
    const piedra2 = this.cine.add.image(-middlePoint.x + 200, -middlePoint.y - 50, "Piedra2").setScale(0.5)
    const piedra3 = this.cine.add.image(-middlePoint.x + 400, -middlePoint.y - 250, "Piedra3").setScale(0.5)
    const piedra4 = this.cine.add.image(-middlePoint.x + 600, -middlePoint.y - 50, "Piedra4").setScale(0.5)
    const piedra5 = this.cine.add.image(-middlePoint.x + 800, -middlePoint.y - 250, "Piedra5").setScale(0.5)
    const piedra11 = this.cine.add.image(-middlePoint.x + 1000, -middlePoint.y - 50, "Piedra1").setScale(0.5)
    const piedra22 = this.cine.add.image(-middlePoint.x + 1200, -middlePoint.y - 250, "Piedra2").setScale(0.5)
    const piedra33 = this.cine.add.image(-middlePoint.x + 1400, -middlePoint.y - 350, "Piedra3").setScale(0.5)
    const piedra44 = this.cine.add.image(-middlePoint.x + 1600, -middlePoint.y - 150, "Piedra4").setScale(0.5)
    const piedra55 = this.cine.add.image(-middlePoint.x + 1800, -middlePoint.y - 70, "Piedra5").setScale(0.5)

    const Meteorito1 = this.cine.add.image(-700, -middlePoint.y - 90, "meteoritoTest").setOrigin(0.5, 0.5).setScale(0.1).setRotation(0).setFlipX(true)
    const Meteorito2 = this.cine.add.image(-600, -middlePoint.y - 90, "meteoritoTest").setOrigin(0.5, 0.5).setScale(0.1).setRotation(0).setFlipX(true)
    const Meteorito3 = this.cine.add.image(-200, -middlePoint.y - 90, "meteoritoTest").setOrigin(0.5, 0.5).setScale(0.1).setRotation(0).setFlipX(true)
    const Meteorito4 = this.cine.add.image(-900, -middlePoint.y - 90, "meteoritoTest").setOrigin(0.5, 0.5).setScale(0.1).setRotation(0).setFlipX(true)

    // const SmallObjectsConfig = {
    //   texture: ["Nube1", "Nube2"],
    //   scale: 0.2,
    //   velocity: 200,
    //   alpha: 0.7,
    // }
    // this.smallObject = new SmallObjects(this.cine, SmallObjectsConfig)

    // const DialogueScene = this.game.scene.getScene("DialogueManager");
    // this.scene.launch(DialogueScene)
    const container = this.cine.add.container(middlePoint.x, middlePoint.y).setSize(1920, 927)
    container.add([
      this.background3,
      this.background2,
      this.background1,
      Meteorito1,
      Meteorito2,
      Meteorito3,
      Meteorito4,
      this.Nube3,
      this.Nube2,
      this.Nube1,
      this.Piso,
      this.mountains,
      piedra1,
      piedra2,
      piedra3,
      piedra4,
      piedra5,
      piedra11,
      piedra22,
      piedra33,
      piedra44,
      piedra55,
    ])

    // const smallObj = new SmallObjects(this.cine)
    // const smallObjChildren = smallObj.smallObjectsGroup.getChildren()
    // container.add(smallObjChildren)
    // smallObj.start()

    container.setScale(gameObjectScaler.x < gameObjectScaler.y ? gameObjectScaler.y : gameObjectScaler.x)
    const camera = this.cine.cameras.main
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
        [
          "You would definitely love this Dan... I'm sure of that...",
        ],
        ["cineIntro7_1"],
        [
          {
            delay: 5000,
            keepAlive: 1500,
          },
        ]
      );
      this.dialogue.play()
      this.cine.tweens.add({
        targets: Meteorito1,
        x: 2000,
        scaleY: 0.3,
        y: 0,
        duration: 4500,
        ease: 'lienar',
        loop: -1,
      }); 
      this.cine.tweens.add({
        targets: Meteorito2,
        x: 2000,
        scaleY: 0.3,
        y: 0,
        delay: 2000,
        duration: 4500,
        ease: 'lienar',
        loop: -1,
      });
      this.cine.tweens.add({
        targets: Meteorito3,
        x: 2000,
        scaleY: 0.3,
        y: 0,
        delay: 1000,
        duration: 4500,
        ease: 'lienar',
        loop: -1,
      });
      this.cine.tweens.add({
        targets: Meteorito3,
        x: 2000,
        scaleY: 0.3,
        y: 0,
        delay: 1700,
        duration: 4500,
        ease: 'lienar',
        loop: -1,
      });
      this.cine.tweens.add({
        targets: camera,
        zoom: 1.5,
        duration: 160000,
        ease: 'lienar',
        loop: -1,
        yoyo: true,
      });
      this.cine.tweens.add({
        targets: [piedra1, piedra11, piedra55, piedra4],
        rotation: '+=100',
        y: 1200,
        duration: 30000,
        ease: 'ease',
      });
      this.cine.tweens.add({
        targets: [piedra2, piedra22, piedra5],
        rotation: '+=160',
        y: 1000,
        duration: 40000,
        ease: 'ease',
        delay: 2000
      });
      this.cine.tweens.add({
        targets: [piedra3, piedra33, piedra44],
        rotation: '+=80',
        y: 1100,
        duration: 45000,
        ease: 'ease',
        delay: 6000
      });
      this.cine.tweens.add({
        targets: [this.background1, this.background2, this.background3],
        scale: 1.5,
        duration: 160000,
        ease: 'lienar',
        loop: -1,
        yoyo: true,
      });
      this.cine.tweens.add({
        targets: [this.Nube1, this.Nube3],
        x: "+=200",
        duration: 80000,
        ease: 'lienar',
        loop: -1,
        yoyo: true,
      });
      this.cine.tweens.add({
        targets: [this.Nube2],
        x: "-=200",
        duration: 80000,
        ease: 'lienar',
        loop: -1,
        yoyo: true,
      });

      const dialogueListener = (newState: string, nextText?: string) => {
        if (newState === "CONTINUE") {
        } else if (newState === "FINISHED") {
          // this.ticker.deleteJob(job.id);
        }
      };
      this.dialogue?.killState(dialogueListener);
      this.dialogue?.getState(dialogueListener);
    }

    this.ticker.addJob(
      new TickerJob(
        1,
        10,
        part1,
        false,
        20000,
        true,
        (job: TickerJob) => {
          this.nextCine = true;
        }
      )
    );
  }


  update(this: cineIntro7, time: number, delta: number) {
    if (this.dialogue) this.dialogue.update();
    if (this.nextCine) this.cine.scene.restart({ keyname: "cine_intro_1" })
  }
}

export default cineIntro7;




