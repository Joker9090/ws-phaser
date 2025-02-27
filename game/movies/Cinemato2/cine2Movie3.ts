import Phaser from "phaser";
import Ticker, { TickerJob } from "../Ticker";
import DialogueManager from "../DialogueManager";
import CinematographyModular from "@/game/movies/Cinematography-modular";

class cine2Movie3 {
  ticker: Ticker;
  cine: CinematographyModular;
  nextCine: boolean = false;
  dialogue?: DialogueManager;
  //assets
  nightSky?: Phaser.GameObjects.Image;
  nightClouds?: Phaser.GameObjects.Image;
  mountainsNight?: Phaser.GameObjects.Image;
  shipLightScene3?: Phaser.GameObjects.Image;
  welderAstronaut?: Phaser.GameObjects.Image;
  welderScreen?: Phaser.GameObjects.Image;
  weldingShip?: Phaser.GameObjects.Image;
  destelloWelder?: Phaser.GameObjects.Image;


  // controllers
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  setPos?: Function;
  constructor(cine: CinematographyModular) {
    this.cine = cine;
    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
    this.playCine();
    // music & sound
    this.cine.sound.add("welder").setVolume(0.25).play();

  }
 stopDialogue(){
     this.dialogue?.stop();
      this.dialogue?.destroyContainer();
    this.dialogue = undefined;
  }
  playCine(this: cine2Movie3) {
    this.cine.time.addEvent({
      delay: this.ticker.ms,
      callback: this.ticker.runTicker,
      loop: true,
    });

    this.cursors = this.cine.input.keyboard?.createCursorKeys();

    const middlePoint = {
      x: this.cine.cameras.main.displayWidth / 2,
      y: this.cine.cameras.main.displayHeight / 2,
    };

    const gameObjectScaler = {
      x: window.innerWidth / 1920,
      y: window.innerHeight / 927,
    };

    this.nightSky = this.cine.add
      .image(0, 0, "nightSky")
      .setOrigin(0.5);
    this.nightClouds = this.cine.add
      .image(-300, 0, "nightClouds")
      .setOrigin(0.5)
      .setScale(1.5, 1.3);
    this.mountainsNight = this.cine.add
      .image(-0, 0, "mountainsNight")
      .setOrigin(0.5)
    this.shipLightScene3 = this.cine.add
      .image(0, 50, "shipLightScene3")
      .setOrigin(0.5);
    this.welderAstronaut = this.cine.add
      .image(0, 50, "welderAstronaut")
      .setOrigin(0.5);
      this.weldingShip = this.cine.add
      .image(0, 50, "weldingShip")
      .setOrigin(0.5);
      this.destelloWelder = this.cine.add
        .image(120, -210, "destelloWelder")
        .setOrigin(0.5)
        .setAlpha(0)
        .setScale(0);
    this.welderScreen = this.cine.add
      .image(0, 50, "welderScreen")
      .setOrigin(0.5)
      .setAlpha(0);

      const darkMask = this.cine.add.rectangle(
        0,
        0,
        window.innerWidth*2,
        window.innerHeight*2,
        0,
        1
      ).setAlpha(0);

    const gameObjects = [
      this.nightSky,
      this.nightClouds,
      this.mountainsNight,
      this.weldingShip,
      this.shipLightScene3,
      this.welderAstronaut,
      this.welderScreen,
      darkMask,
      this.destelloWelder,
    ];

    // this.cine.cameras.main.zoom = 0.5


    const container = this.cine.add
      .container(middlePoint.x, middlePoint.y)
      .setSize(1920, 927);

    container.add(gameObjects);

    // container.add([darkMask]);

    container.setScale(
      gameObjectScaler.x < gameObjectScaler.y
        ? gameObjectScaler.y
        : gameObjectScaler.x
    );

    const cameraDialogue = this.cine.cameras.add(
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );
    cameraDialogue.ignore(container);
    const camera = this.cine.cameras.main;
    // camera.postFX.addVignette(0.5, 0.5, 0.8);
    if (this.cine.UIcontainer !== undefined)
      camera.ignore(this.cine.UIcontainer);

    camera.zoom = 1.035870588235294 // zoom con el que queda la scene anterior

    const part1 = (job: TickerJob) => {
      this.dialogue = new DialogueManager(
        this.cine,
        ["I can't wait to leave this planet..."],
        [""],
        [
          {
            delay: 1500,
            withTapping: {
              audios: ["key01", "key01", "key02"],
              count: 18,
              delay: 180,
            },
            keepAlive: 1500,
            position: {
              width: 700,
            },
          },
        ],
        80
      );
      this.dialogue?.play();
      this.cine.tweens.add({
        targets: [camera],
        zoom: 1.1,
        delay: 0,
        duration: 17000,
        ease: "ease",
      });


      this.cine.tweens.add({
        targets: [this.shipLightScene3],
        alpha: 0,
        duration: 1000,
        yoyo: true,
        loop: -1,
        ease: "ease",
      });

      const weldingEase = (t: number) => {
        const cycleTime = 6; // Duración total del ciclo de 6 segundos
        const firstHoldTime = 1.5; // Primer tiempo de mantenido a 1 (1.5 segundos)
        const secondHoldTime = 2.5; // Segundo tiempo de mantenido a 1 (2.5 segundos)
        
        // Calculamos el tiempo dentro del ciclo (en bucle)
        const cycleProgress = (t % cycleTime);
    
        // Fase 1: De 0 a 1 (0.5s)
        if (cycleProgress < 0.5) {
            const easeIn = Math.sin((cycleProgress / 0.5) * (Math.PI / 2)); // Suaviza la subida
            return easeIn;
    
        // Fase 2: Mantener 1 durante 1.5 segundos (Primer ciclo) o 2.5 segundos (Segundo ciclo)
        } else if (cycleProgress < 0.5 + firstHoldTime) {
            return 1;
    
        // Fase 3: De 1 a 0 (0.5s)
        } else if (cycleProgress < 0.5 + firstHoldTime + 0.5) {
            const easeOut = Math.sin(((cycleProgress - 0.5 - firstHoldTime) / 0.5) * (Math.PI / 2)); // Suaviza la bajada
            return 1 - easeOut;
    
        // Fase 4: Mantener 1 durante 2.5 segundos (Segundo ciclo)
        } else if (cycleProgress < 0.5 + firstHoldTime + 0.5 + secondHoldTime) {
            return 1;
    
        // Fase 5: De 1 a 0 (0.5s)
        } else {
            const easeOut = Math.sin(((cycleProgress - (0.5 + firstHoldTime + 0.5 + secondHoldTime)) / 0.5) * (Math.PI / 2)); // Suaviza la bajada
            return 1 - easeOut;
        }
    };
    
    const weldingEase2  = (t: number) => {
      // Genera una pseudo-aleatoriedad para variar la frecuencia y duración de los destellos
      const randomSeed = Math.sin(t * 3) * 10000; // Semilla pseudo-aleatoria basada en tiempo
      const noiseValue = randomSeed - Math.floor(randomSeed); // Extrae el valor decimal para obtener un valor entre 0 y 1
  
      // Usamos el valor aleatorio para determinar el brillo (con algunos destellos más tenues)
      return noiseValue > 0.7 ? 1 : noiseValue > 0.3 ? 0.5 : 0;
  };

      this.cine.tweens.add({
        targets: [this.destelloWelder],
        alpha: 1,
        scale: 1,
        delay: 0,
        duration: 4000,
        yoyo: true,
        loop: -1,
        ease: (t: number) => weldingEase2(t),
      });
      // this.cine.tweens.add({
      //   targets: [darkMask],
      //   alpha: 0.4,
      //   delay: 0,
      //   duration: 4000,
      //   yoyo: true,
      //   loop: -1,
      //   ease: (t: number) => weldingEase2(t),
      // });
      // this.cine.tweens.add({
      //   targets: [this.destelloWelder],
      //   scale: 1,
      //   delay: 0,
      //   duration: 1500,
      //   yoyo: true,
      //   loop: -1,
      //   ease: (t: number) => weldingEase2(t),
      // });

      this.cine.tweens.add({
        targets: [this.nightClouds],
        x: '+=600',
        delay: 0,
        duration: 40000,
        ease: "ease",
      });

      this.cine.tweens.add({
        targets: [this.welderScreen],
        alpha: 1,
        delay: 0,
        duration: 400,
        loop: -1,
        ease: (t: number) => weldingEase(t),
      });

      const dialogueListener = (newState: string, nextText?: string) => {
        if (newState === "CONTINUE") {
        } else if (newState === "FINISHED") {
          this.ticker.deleteJob(job.id);
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

  update(this: cine2Movie3, time: number, delta: number) {
    if (this.dialogue) this.dialogue.update();
    if (this.nextCine) this.cine.scene.restart({ keyname: "cine_2_movie_4" });
  }
}

export default cine2Movie3;
