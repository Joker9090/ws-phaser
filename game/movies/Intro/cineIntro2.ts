import Phaser from "phaser";
import Ticker, { TickerJob } from '../Ticker'
import DialogueManager from '../DialogueManager'
import CinematographyModular from "@/game/movies/Cinematography-modular";



class cineIntro2 {
  ticker: Ticker;
  container?: Phaser.GameObjects.Container;
  nextCine: boolean = false;
  cine: CinematographyModular;
  dialogue?: DialogueManager;

  background3?: Phaser.GameObjects.Image;
  background2?: Phaser.GameObjects.Image;
  background1?: Phaser.GameObjects.Image;
  planetScene2?: Phaser.GameObjects.Image;
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

  nextText?: Phaser.GameObjects.Text;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(cine : CinematographyModular) {
    this.cine = cine
    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
    this.playCine()
  }


  playCine(this: cineIntro2) {
    // START ticker
    this.cine.time.addEvent({
      delay: this.ticker.ms,
      callback: this.ticker.runTicker,
      loop: true,
    });

    // this.cursors = this.input.keyboard?.createCursorKeys();

    // const DialogueScene = this.game.scene.getScene("DialogueManager");
    // this.scene.launch(DialogueScene)

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
    this.planetScene2 = this.cine.add.image(0, 0, "planetScene2").setOrigin(1, 0.8)
    this.naveCapaTrasera = this.cine.add.image(0, 0, "naveCapaTrasera").setOrigin(0.5)
    this.marcoVentana = this.cine.add.image(0, 0, "marcoVentana").setOrigin(0.5, 0.75)
    this.vidrioVentana = this.cine.add.image(0, 0, "vidrioVentana").setOrigin(0.5, 0.75)
    this.naveCapaDelantera = this.cine.add.image(0, 100, "naveCapaDelantera").setOrigin(0.5, 0)
    this.luzAlarmaRoja = this.cine.add.image(503, -185, "luzAlarmaRoja").setOrigin(0.5)
    this.alarmaRojaOff = this.cine.add.image(503, -185, "alarmaRojaOff").setOrigin(0.5)
    this.alarmaRojaOn = this.cine.add.image(503, -185, "alarmaRojaOn").setOrigin(0.5)
    this.luzAlarmaVerde = this.cine.add.image(-503, -180, "luzAlarmaVerde").setOrigin(0.5)
    this.alarmaVerdeOff = this.cine.add.image(-503, -180, "alarmaVerdeOff").setOrigin(0.5)
    this.alarmaVerdeOn = this.cine.add.image(-503, -180, "alarmaVerdeOn").setOrigin(0.5)
    this.LuzPanelRojo = this.cine.add.image(620, 252, "LuzPanelRojo").setOrigin(0.5).setScale(1, 0.95)
    this.LuzPanelVerde = this.cine.add.image(- 620, 252, "LuzPanelVerde").setOrigin(0.5).setScale(1, 0.95)


    const assetsScenes = 
      [
        this.background3,
        this.background2,
        this.background1,
        this.planetScene2,
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
      ]

    this.container = this.cine.add.container(middlePoint.x, middlePoint.y).setSize(1920, 927)
    this.container.add(assetsScenes)
    this.container.setScale(gameObjectScaler.x < gameObjectScaler.y ? gameObjectScaler.y : gameObjectScaler.x)
    const cameraDialogue = this.cine.cameras.add(
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );
    cameraDialogue.ignore(this.container);

    const camera = this.cine.cameras.main
    camera.postFX.addVignette(0.5, 0.5, 0.8);
    camera.setZoom(2).scrollY = 200

    const spaceshipAmbientSoundEffect = this.cine.sound.add("spaceshipAmbient")
    spaceshipAmbientSoundEffect.setVolume(1.5)
    spaceshipAmbientSoundEffect.play()


    const part1 = (job: TickerJob) => {
      this.dialogue = new DialogueManager(
        this.cine,
        [
          "I've decided to shut down all systems except life support and navigation to buy myself some time.", 
        ],
        ["cineIntro2_1"]
      );
      
      this.cine.tweens.add({
        targets: [this.background1, this.background2, this.background3, this.planetScene2],
        scale: 1.3,
        duration: 60000,
        ease: 'linear',
      });
      this.cine.tweens.add({
        targets: [this.background1, this.background2, this.background3, this.planetScene2],
        x: "-=200",
        duration: 60000,
        ease: 'linear',
      });
      this.cine.tweens.add({
        targets: this.luzAlarmaRoja,
        rotation: 2 * Math.PI,
        duration: 3000,
        ease: 'linear',
        loop: -1,
      });
      this.cine.tweens.add({
        targets: this.luzAlarmaRoja,
        scale: 0,
        duration: 1000,
        ease: 'linear',
        loop: -1,
        yoyo: true
      });
      this.cine.tweens.add({
        targets: this.alarmaRojaOn,
        alpha: 0.8,
        duration: 1000,
        ease: 'linear',
        loop: -1,
        yoyo: true
      });

      this.cine.tweens.add({
        targets: this.LuzPanelRojo,
        alpha: 0.6,
        duration: 1400,
        ease: 'expo.out',
        loop: -1,
        yoyo: true
      });

      this.cine.tweens.add({
        targets: this.LuzPanelVerde,
        alpha: 0.6,
        duration: 1600,
        ease: 'expo.out',
        loop: -1,
        yoyo: true
      });
      this.cine.tweens.add({
        targets: this.luzAlarmaVerde,
        rotation: 2 * Math.PI,
        duration: 3400,
        ease: 'linear',
        loop: -1,

      });
      this.cine.tweens.add({
        targets: this.luzAlarmaVerde,
        scale: 0,
        duration: 1200,
        ease: 'linear',
        loop: -1,
        yoyo: true
      });
      this.cine.tweens.add({
        targets: this.alarmaVerdeOn,
        alpha: 0.8,
        duration: 1200,
        ease: 'linear',
        loop: -1,
        yoyo: true
      });
      this.cine.tweens.add({
        targets: camera,
        zoom: 1.5,
        scrollY: 100,
        duration: 8000,
        ease: 'ease',
        delay: 5000,
        loop: 0,
        yoyo: false,
        onStart: ()=>{
           this.dialogue?.play();
        },
      });
      const dialogueListener = (newState: string, nextText?: string) => {
        if (newState === "CONTINUE") {
        } else if (newState === "FINISHED") {
          this.ticker.deleteJob(job.id);
        }
      };
      this.dialogue?.killState(dialogueListener);
      this.dialogue?.getState(dialogueListener);
    }

    const part2 = (job: TickerJob) => {
      this.dialogue = new DialogueManager(
        this.cine,
        [
          "Although it seems like I'm in uncharted waters, who knows where I've ended up."
        ],
        ["cineIntro2_2"]
      );
      
      this.dialogue?.play();
   
      this.cine.tweens.add({
        targets: camera,
        zoom: 1,
        scrollY: 0,
        duration: 8000,
        ease: 'ease',
        loop: 0,
        yoyo: false
      });
      const dialogueListener = (newState: string, nextText?: string) => {
        if (newState === "CONTINUE") {
        } else if (newState === "FINISHED") {
          this.ticker.deleteJob(job.id);
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
        undefined,
        true,
        (job: TickerJob) => {
          this.ticker.addNextJob(
            new TickerJob(
              2,
              0,
              part2,
              false,
              undefined,
              true,
              (job: TickerJob) => {
                spaceshipAmbientSoundEffect.stop()
                this.nextCine = true;
              }
            )
          );
        }
      )
    );
  }


  update(this : cineIntro2, time: number, delta: number) {
    if (this.dialogue) this.dialogue.update();
    if (this.nextCine) this.cine.scene.restart({ keyname: "cine_intro_3" })
    
  }
}

export default cineIntro2;



