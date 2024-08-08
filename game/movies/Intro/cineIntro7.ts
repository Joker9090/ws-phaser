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
    this.Nube1 = this.cine.add.image(0, 500, "Nube1").setOrigin(0.5, 1)
    this.Nube2 = this.cine.add.image(0, 500, "Nube2").setOrigin(0.5, 1)
    this.Nube3 = this.cine.add.image(0, 500, "Nube3").setOrigin(0.5, 1)
    this.Piso = this.cine.add.image(0, 200, "PisoNivel8").setOrigin(0.5, 0)

    const piedra1 = this.cine.add.image(-middlePoint.x -150, - 90 + 150, "Piedra3").setScale(0.45, 0.35).setRotation(102)
    const piedra2 = this.cine.add.image(-middlePoint.x -200, - 50 + 150, "Piedra3").setScale(0.45, 0.35).setRotation(140)
    const piedra3 = this.cine.add.image(-middlePoint.x -180, - 20 + 150, "Piedra3").setScale(0.45, 0.35)
    const piedra4 = this.cine.add.image(-middlePoint.x -200, - 50 + 150, "Piedra3").setScale(0.45, 0.35).setRotation(150)
    const piedra5 = this.cine.add.image(-middlePoint.x -180, - 50 + 150, "Piedra3").setScale(0.45, 0.35)
    const piedra11 = this.cine.add.image(-middlePoint.x -180, - 50 + 150, "Piedra3").setScale(0.45, 0.35)
    const piedra22 = this.cine.add.image(-middlePoint.x -150, - 40 + 150, "Piedra3").setScale(0.45, 0.35).setRotation(20)
    const piedra33 = this.cine.add.image(-middlePoint.x -200, - 30 + 150, "Piedra3").setScale(0.45, 0.35)
    const piedra44 = this.cine.add.image(-middlePoint.x -176, - 150 + 150, "Piedra3").setScale(0.45, 0.35).setRotation(60)
    const piedra55 = this.cine.add.image(-middlePoint.x -145, - 70 + 150, "Piedra3").setScale(0.45, 0.35).setRotation(240)
    const Piedra1 = this.cine.add.image(-middlePoint.x -34, - 30 + 150, "Piedra3").setScale(0.45, 0.35).setRotation(102)
    const Piedra2 = this.cine.add.image(-middlePoint.x -251, - 50 + 150, "Piedra3").setScale(0.45, 0.35).setRotation(140)
    const Piedra3 = this.cine.add.image(-middlePoint.x -23, - 20 + 150, "Piedra3").setScale(0.45, 0.35)
    const Piedra4 = this.cine.add.image(-middlePoint.x -140, - 50 + 150, "Piedra3").setScale(0.45, 0.35).setRotation(150)
    const Piedra5 = this.cine.add.image(-middlePoint.x -89, - 70 + 150, "Piedra3").setScale(0.45, 0.35)
    const Piedra11 = this.cine.add.image(-middlePoint.x -143, - 30 + 150, "Piedra3").setScale(0.45, 0.35)
    const Piedra22 = this.cine.add.image(-middlePoint.x -325, - 90 + 150, "Piedra3").setScale(0.45, 0.35).setRotation(20)
    const Piedra33 = this.cine.add.image(-middlePoint.x -119, - 30 + 150, "Piedra3").setScale(0.45, 0.35)
    const Piedra44 = this.cine.add.image(-middlePoint.x -334, - 150 + 150, "Piedra3").setScale(0.45, 0.35).setRotation(60)
    const Piedra55 = this.cine.add.image(-middlePoint.x -345, - 70 + 150, "Piedra3").setScale(0.45, 0.35).setRotation(240)

    const Meteorito1 = this.cine.add.image(-middlePoint.x - 500, -middlePoint.y + 90, "meteoritoTest").setOrigin(0.5, 0.5)
    const Meteorito2 = this.cine.add.image(-middlePoint.x - 500, -middlePoint.y + 190, "meteoritoTest").setOrigin(0.5, 0.5)
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
    const container = this.cine.add.container(middlePoint.x, middlePoint.y).setSize(1920, 927)
    container.add([
      this.background3,
      this.background2,
      this.background1,
      Meteorito1,
      Meteorito2,
      // Meteorito3,
      // Meteorito4,
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
      Piedra1,
      Piedra2,
      Piedra3,
      Piedra4,
      Piedra5,
      Piedra11,
      Piedra22,
      Piedra33,
      Piedra44,
      Piedra55,
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
        [""],
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
        scaleY: 0.5,
        scaleX: 0.7,
        y: '+=5',
        duration: 4500,
        ease: 'ease',
        loop: 0,
      }); 
      this.cine.tweens.add({
        targets: Meteorito2,
        x: 2000,
        scaleY: 0.3,
        scaleX: 0.5,
        y: '+=10',
        delay: 5000,
        duration: 6000,
        ease: 'ease',
        loop: 0,
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
        targets: [piedra1, piedra11, piedra55, piedra4, Piedra2, Piedra22, Piedra5],
        rotation: '+=2',
        x: 2000,
        duration: 42000,
        ease: 'ease',
      });
      this.cine.tweens.add({
        targets: [piedra2, piedra22, piedra5, Piedra1, Piedra11, Piedra55, Piedra4],
        rotation: '+=3',
        x: 2300,
        duration: 40000,
        ease: 'ease',
        delay: 1000
      });
      this.cine.tweens.add({
        targets: [piedra3, piedra33, piedra44, Piedra3, Piedra33, Piedra44],
        rotation: '+=5',
        x: 2100,
        duration: 45000,
        ease: 'ease',
        delay: 600
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




