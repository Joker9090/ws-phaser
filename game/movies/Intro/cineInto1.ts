import Phaser from "phaser";
import Ticker, { TickerJob } from "../Ticker";
import DialogueManager from "../DialogueManager";
import CinematographyModular from "@/game/movies/Cinematography-modular";

class cineIntro1 {
  ticker: Ticker;
  cine: CinematographyModular;
  nextCine: boolean = false;
  dialogue?: DialogueManager;
  //assets
  background3?: Phaser.GameObjects.Image;
  background2?: Phaser.GameObjects.Image;
  background1?: Phaser.GameObjects.Image;
  darkness?: Phaser.GameObjects.Image;
  ship?: Phaser.GameObjects.Image;
  shipOverImage?: Phaser.GameObjects.Image;
  shipZoom?: Phaser.GameObjects.Image;
  shipZoomOn?: Phaser.GameObjects.Image;
  planet?: Phaser.GameObjects.Image;
  // controllers
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(cine: CinematographyModular) {
    this.cine = cine;
    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
    this.cine.sound.add("introSoundEffect1").setVolume(0.25).play()
    this.cine.sound.add("introSoundEffect2").setVolume(0.25).play()
    this.playCine();
  }
  stopDialogue(notDestroy?: boolean) {
     this.dialogue?.stop();
     if(notDestroy) {
      this.dialogue?.destroyContainer();
      this.dialogue = undefined;
     }
  }
  playCine(this: cineIntro1) {
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

    this.background2 = this.cine.add
      .image(0, 0, "backgronudClouds")
      .setOrigin(0.5, 0.5)
      .setScale(1.4);
    this.background1 = this.cine.add
      .image(0, 0, "backgroundStarsMovie")
      .setOrigin(0.5, 0.5);
    this.darkness = this.cine.add.image(0, 0, "darkness").setOrigin(0.5, 0.5).setVisible(true);
    this.planet = this.cine.add
      .image(0, 0, "planet")
      .setOrigin(0.5, 0.5)
      .setPosition(-600, -0)
      .setScale(1.4).setVisible(false);
    this.ship = this.cine.add.image(0, 0, "shipOff").setOrigin(0.5, 0.5).setScale(0.3);
    this.shipOverImage = this.cine.add
      .image(0, 0, "shipOn")
      .setOrigin(0.5, 0.5)
      .setScale(0.3);
      const shipBlackMask = this.cine.add.image(0, 0, "shipOff").setOrigin(0.5, 0.5).setScale(0.3).setTint(0,0,0,0)
    this.shipZoom = this.cine.add
      .image(0, 300, "naveZoom")
      .setOrigin(0.5, 0.5)
      .setVisible(false)
      .setScale(0.7);
    this.shipZoomOn = this.cine.add
      .image(0, 300, "naveZoomOn")
      .setOrigin(0.5, 0.5)
      .setVisible(false)
      .setScale(0.7);
      const shipZoomBlackMask = this.cine.add
      .image(0, 300, "naveZoom")
      .setOrigin(0.5, 0.5)
    .setVisible(false)
    .setScale(0.7)
    .setTint(0,0,0,0);


    const brightness = 0.5;
    const gameObjects = [
      this.background3,
      this.background2,
      this.background1,
      this.planet,
      this.ship,
      this.shipOverImage,
      this.shipZoom,
      this.shipZoomOn,
    ];

    const darkMask = this.cine.add.rectangle(
      0,
      0,
      window.innerWidth*2,
      window.innerHeight*2,
      0,
      1
    );

    const container = this.cine.add
      .container(middlePoint.x, middlePoint.y)
      .setSize(1920, 927);

    container.add([
      darkMask,
      this.background2,
      this.background1,
      this.darkness,
      this.planet,
      shipBlackMask,
      this.ship,
      this.shipOverImage,
      shipZoomBlackMask,
      this.shipZoom,
      this.shipZoomOn,
    ]);

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

    // const soundChangeScene = this.cine.sound.add("soundChangeScene") // TODO ARIEL

    const camera = this.cine.cameras.main;
    camera.postFX.addVignette(0.5, 0.5, 0.8);

    const part1 = (job: TickerJob) => {

      const tween1 = this.cine.tweens.add({
        targets: [this.shipOverImage, this.shipZoomOn],
        alpha: 0,
        duration: 5000,
        ease: "expo.out",
        loop: -1,
      });

      const tween2 = this.cine.tweens.add({
        targets: camera,
        zoom: 1.5,
        duration: 120000,
        ease: "Linear",
      });

      const tween3 = this.cine.tweens.add({
        targets: [this.ship, this.shipOverImage, shipBlackMask],
        y: "+=5",
        duration: 9851,
        ease: "ease",
        yoyo: true,
        loop: -1,
      });

      const tween5 = this.cine.tweens.add({
        targets: [this.ship, this.shipOverImage, shipBlackMask],
        x: "+=10",
        duration: 5324,
        ease: "ease",
        yoyo: true,
        loop: -1,
      });

      const tween4 = this.cine.tweens.add({
        targets: [this.ship, this.shipOverImage, shipBlackMask],
        y: "-=15",
        duration: 3456,
        ease: "ease",
        yoyo: true,
        loop: -1,
      });

      
      this.cine.tweens.add({
        targets: [this.background2],
        x: "-=200",
        scale: 1.3,
        duration: 16000,
        ease: "ease",
      });

      this.cine.tweens.add({
        targets: [this.background1],
        scale: 1.3,
        duration: 16000,
        ease: "ease",
      });

      // const dialogueListener = (newState: string, nextText?: string) => {
      //   if (newState === "CONTINUE") {
      //     tween2.stop()
      //   } else if (newState === "FINISHED") {
      //     this.ticker.deleteJob(job.id);
      //   }
      // };
      // this.dialogue?.killState(dialogueListener);
      // this.dialogue?.getState(dialogueListener);
    };


    const part2 = (job: TickerJob) => {
      
      this.dialogue = new DialogueManager(
        this.cine,
        [
          "Emergency log number 325...",
        ],
        [],//["intro1audio1"],
        [
          {
            delay: 100,
            withTapping: {
              audios: ["key01", "key01", "key02"],
              count: 15,
              delay: 180,
            },
            keepAlive: 1500,
            position: {
              width: 500
            }
          },
        ], 
        90
      );
      this.dialogue?.play();

      this.shipOverImage?.setScale(0.8).setPosition(0,0);
      this.ship?.setScale(0.8).setPosition(0,0);
      shipBlackMask.setScale(0.8).setPosition(0,0);
      this.planet?.setPosition(100, -300).setScale(1.7).setRotation(Math.PI)

      const dialogueListener = (newState: string, nextText?: string) => {
        if (newState === "CONTINUE") {
        } else if (newState === "FINISHED") {
          this.ticker.deleteJob(job.id);
        }
      };
      this.dialogue?.killState(dialogueListener);
      this.dialogue?.getState(dialogueListener);
    };


    // const part3 = (job: TickerJob) => {

    //   camera.setZoom(1);
    //   this.shipOverImage?.setVisible(false);
    //   this.ship?.setVisible(false);
    //   shipBlackMask.setVisible(false)
    //   shipZoomBlackMask.setVisible(true).setScale(0.5);
    //   this.planet?.setScale(2.5).setPosition(0,0);
    //   this.shipZoom?.setVisible(true).setScale(0.5);
    //   this.shipZoomOn?.setVisible(true).setScale(0.5);

    //   this.cine.tweens.add({
    //     targets: [this.background1, this.background2],
    //     x: "-=15",
    //     y: "+=20",
    //     duration: 14000,
    //     ease: "cubic",
    //     loop: -1,
    //     yoyo: true,
    //   });

    //   const tween3 = this.cine.tweens.add({
    //     targets: [shipZoomBlackMask, this.shipZoom,this.shipZoomOn],
    //     x: "+=10",
    //     duration: 5324,
    //     ease: "ease",
    //     yoyo: true,
    //     loop: -1,
    //   });

    //   const tween5 = this.cine.tweens.add({
    //     targets: [shipZoomBlackMask, this.shipZoom,this.shipZoomOn],
    //     y: "+=10",
    //     duration: 5324,
    //     ease: "ease",
    //     yoyo: true,
    //     loop: -1,
    //   });


    //   // this.cine.tweens.add({
    //   //   targets: camera,
    //   //   scrollY: "+=10",
    //   //   duration: 14000,
    //   //   delay: 500,
    //   //   ease: "linear",
    //   //   loop: -1,
    //   //   yoyo: true,
    //   // });

    // };

    const part4 = (job: TickerJob) => {

      this.dialogue = new DialogueManager(
        this.cine,
        [
          "it's been more than 45 days since the incident...",
        ],
        [],//["intro1audio2"],
        [
          {
            delay: 500,
            withTapping: {
              audios: ["key01","key01", "key02"],
              count: 19,
              delay: 180,
            },
            keepAlive: 1250,
            position: {
              width: 1000
            }
          },
        ],
        60
      );

      this.dialogue.play();
      camera.setZoom(1);
      camera.setScroll(0, 50);
      this.planet?.setVisible(false);
      this.shipOverImage?.setVisible(false);
      this.ship?.setVisible(false);
      shipZoomBlackMask.setVisible(true).setScale(1.3).setPosition(0,700);
      this.shipZoom?.setVisible(true).setScale(1.3).setPosition(0,700);
      this.shipZoomOn?.setVisible(true).setScale(1.3).setPosition(0,700);
      
      this.cine.tweens.add({
        targets: [this.background1, this.background2, this.background3],
        x: "-=15",
        y: "+=20",
        duration: 14000,
        ease: "cubic",
        loop: -1,
        yoyo: true,
      });

      const dialogueListener = (newState: string, nextText?: string) => {
        if (newState === "FINISHED") {
          this.ticker.deleteJob(job.id);
        }
      };
      this.dialogue?.killState(dialogueListener);
      this.dialogue?.getState(dialogueListener);
    };


    const part5 = (job: TickerJob) => {
      this.cine.sound.add("introSoundEffect3").setVolume(0.5).play()

      shipZoomBlackMask.setVisible(false);
      this.shipZoom?.setVisible(false);
      this.shipZoomOn?.setVisible(false);
      this.background1?.setVisible(false);
      this.background2?.setVisible(false);
      this.background3?.setVisible(false);
      
      // soundChangeScene.play()

    };

    this.ticker.addJob(
      new TickerJob(1, 10, part1, false, 6000, true, (job: TickerJob) => {
        this.ticker.addNextJob(
          new TickerJob(
            2,
            0,
            part2,
            false,
            undefined,
            true,
            (job: TickerJob) => {
              this.ticker.addNextJob(
                new TickerJob(
                  4,
                  0,
                  part4,
                  false,
                  undefined,
                  true,
                  (job: TickerJob) => {
                    this.ticker.addNextJob(
                      new TickerJob(
                        5,
                        0,
                        part5,
                        false,
                        1500,
                        true,
                        (job: TickerJob) => {
                          // soundChangeScene.stop()
                          this.nextCine = true;
                        }
                      )
                    );
                  }
                )
              );
            }
          )
        );
      })
    );

  }

  update(this: cineIntro1, time: number, delta: number) {
    if (this.dialogue) this.dialogue.update();
    // if (this.nextCine) this.cine.scene.restart({ keyname: "cine_intro_1" });
    if (this.nextCine) this.cine.scene.restart({ keyname: "cine_intro_2" });
  }
}

export default cineIntro1;
