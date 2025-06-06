import Phaser from "phaser";
// MAPAS PLANETA 1
import p1Mapa0 from "./maps/planet1/Mapa0";
import p1Mapa1 from "./maps/planet1/Mapa1";
import p1Mapa2 from "./maps/planet1/Mapa2";
import p1Mapa3 from "./maps/planet1/Mapa3";

import p1Map0 from "./maps/planet1/Map0";
import p1Map1 from "./maps/planet1/Map1";
import p1Map2 from "./maps/planet1/Map2";
import p1Map3 from "./maps/planet1/Map3";
// MAPAS PLANETA 2
import p2Mapa1 from "./maps/planet2/Mapa4";
import p2Mapa2 from "./maps/planet2/Mapa5";
import p2Mapa3 from "./maps/planet2/Mapa6";
import p2Mapa4 from "./maps/planet2/Mapa7";

import p2Map0 from "./maps/planet2/Map0";
import p2Map1 from "./maps/planet2/Map1";
import p2SubMap1 from "./maps/planet2/SubMap1";
import p2SubMap2 from "./maps/planet2/SubMap2";
import p2Map2 from "./maps/planet2/Map2"
import p2m3sub1 from "./maps/planet2/m3sub1";
import p2Map3 from "./maps/planet2/Map3";
//MAPAS PLANETA 3
import p3Mapa1 from "./maps/planet3/Mapa8";
import p3Mapa2 from "./maps/planet3/Mapa9";
import p3Mapa3 from "./maps/planet3/Mapa10";
import p3Mapa4 from "./maps/planet3/Mapa11";
import p3Map1 from "./maps/planet3/Map0";
import p3Map4 from "./maps/planet3/Map3";
import p3SubMap3 from "./maps/planet3/SubMap3";
import p3Map2 from "./maps/planet3/Map1";
import p3Map3 from "./maps/planet3/Map2";
import p3SubMap1 from "./maps/planet3/SubMap1";
import p3SubMap2 from "./maps/planet3/SubMap2";
// OTRAS COSAS
import Player from "./assets/Player";
import UIClass from "./assets/UIClass";
import MasterManager from "./MasterManager";
import BetweenScenes, { BetweenScenesStatus } from "./BetweenScenes";
import { GamePlayDataType } from "./Types";
import MultiScene from "./MultiScene";
import Sandbox from "./maps/sandbox/sandbox";
import subSandbox from "./maps/subLevels/subSandbox";
import CODES from "../public/game/codigos.json";
import Collectable from "./assets/Collectable";
import MapCreator from "./maps/sandbox/MapCreator";
import resultContainer from "./containersMenu/resultContainer";




interface CodeType {
  mapa?: number;
  imagenes?: string[];
}
// a medida que los mapas pasen al nuevo modo esto se deberia poder eliminar ya que totalcoins existe en mapCreator
export type PossibleMaps =
  | (p1Mapa0 & { totalCoins?: number } & { timerText?: string })
  | (p1Mapa1 & { totalCoins?: number } & { timerText?: string })
  | (p1Mapa2 & { totalCoins?: number } & { timerText?: string })
  | (p1Mapa3 & { totalCoins?: number } & { timerText?: string })
  | (p2Mapa1 & { totalCoins?: number } & { timerText?: string })
  | (p2Mapa2 & { totalCoins?: number } & { timerText?: string })
  | (p2Mapa3 & { totalCoins?: number } & { timerText?: string })
  | (p2Mapa4 & { totalCoins?: number } & { timerText?: string })
  | (p3Mapa1 & { totalCoins?: number } & { timerText?: string })
  | (p3Mapa2 & { totalCoins?: number } & { timerText?: string })
  | Sandbox
  | p1Map0
  | p1Map1
  | p1Map2
  | p1Map3
  | p2Map2
  | p2m3sub1
  | MapCreator
  | p2Map0
  | p2Map1
  | p2SubMap1
  | p2SubMap2
  | p2Map3
  | p3Map1
  | p3Map4
  | p3SubMap3
  | p3Map2
  | p3SubMap1
  | p3SubMap2
  | p3Map3;
// Scene in class
export const keyCodesAWSD = {
  w: Phaser.Input.Keyboard.KeyCodes.W,
  a: Phaser.Input.Keyboard.KeyCodes.A,
  s: Phaser.Input.Keyboard.KeyCodes.S,
  d: Phaser.Input.Keyboard.KeyCodes.D,
};
class Game extends Phaser.Scene {
  //creative mode
  cursorsAWSD?: object;
  isTouchDevice?: boolean = false;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  EscKeyboard?: Phaser.Input.Keyboard.Key;
  player?: Player;
  touchedFloor?: boolean = false;
  graphics?: Phaser.GameObjects.Graphics;
  map?: PossibleMaps;
  joystickBase?: Phaser.GameObjects.Arc;
  joystickKnob?: Phaser.GameObjects.Arc;
  joystickPointerId: number | null = null; // Store the pointer ID for the joystick
  normalizedDragX: number = 0;
  normalizedDragY: number = 0;

  lifes?: number;
  levelIs: number = 0;
  timeLevel: number = 0;
  goingBack: boolean = false;

  canWin: boolean = true;
  canNextLevel: boolean = false;
  canRot: boolean = true;

  cameraNormal: boolean = true;
  isNormal: boolean = true;
  gravityDown: boolean = true;

  checkPoint: number = 0;
  stagePoint: any = 0;
  cameraWidth: number = 0;
  cameraHeight: number = 0;

  initialScroll: { x: number; y: number } = { x: 0, y: 0 };
  mapShown: boolean = false;
  timerText: string = '00:00'
  loopMusic?: string;
  UIClass?: UIClass;
  UICamera?: Phaser.Cameras.Scene2D.Camera;
  masterManagerScene?: MasterManager;
  stopMov: boolean = false;
  resultModal?: resultContainer;
  container?: Phaser.GameObjects.Container
  constructor() {
    super({ key: "Game" });
  }

  init(this: Game, { stagePoint }: any) {
    if (stagePoint != undefined) this.stagePoint = stagePoint;
  }

  touch() {
    //nsole.log("scene touch");
    if (this.player) {
      //nsole.log("scene touch inside Player");
      // this.initialScroll = { x: 0, y: 0 };
      this.player.idle();
      this.player.setVelocityX(0);
      if (this.player.withTank) {
        this.player.tank.isCharging = this.player.tank.chargeValue;
      }
    }
  }

  animCameraPan(
    x: number,
    y: number,
    duration: number = 10000,
    hold: number = 1000
  ) {
    const self = this;
    this.stopMov = true;
    this.cameras.main.pan(
      x,
      y,
      duration / 2,
      "Linear",
      false,
      (cam, progress) => {
        if (progress === 1) {
          this.stopMov = false;
        }
      },
      self
    );

    // const originalOffset = { x: this.cameras.main.followOffset.x, y: this.cameras.main.followOffset.y }
    // this.cameras.main.stopFollow();
    // const originPos = { x: this.cameras.main.midPoint.x, y: this.cameras.main.midPoint.y }
    // this.cameras.main.pan(x, y, duration / 2, "Linear", false, (cam, progress) => {
    // if (progress === 1) {
    //
    //   this.time.delayedCall(hold, () => {
    //

    //     this.cameras.main.pan(originPos.x, originPos.y, duration / 2, "Linear", false, (cam, progress) => {
    //

    //       if (progress === 1) {

    //         this.cameras.main.startFollow(
    //           //@ts-ignore
    //           this.player,
    //           true,
    //           0.1,
    //           0.1,
    //           originalOffset.x,
    //           originalOffset.y
    //         );
    //         this.stopMov = false;
    //       }
    //     }, self)
    //   })
    // }
    // }, self)
    // this.tweens.add({
    //   targets: this.cameras.main.followOffset,
    //   x: offsetAnim.x,
    //   y: offsetAnim.y,
    //   duration: offsetAnim.duration ? offsetAnim.duration : 1000,
    //   ease: "ease",
    //   hold: offsetAnim.hold ? offsetAnim.hold : 500,
    //   onComplete: () => {
    //     this.stopMov = false;
    //   },
    //   yoyo: true,
    // })
  }

  handleResize = () => {
    console.log("handleResize", window.innerWidth, window.innerHeight, this.game, 'game', this.cameras);

    // const width = window.innerWidth;
    // const height = window.innerHeight;
    // this.game.scale.resize(width, height);
    // this.game.scene.scenes.forEach(scene => {
    //   if (scene.cameras && scene.cameras.main) {
    //     scene.cameras.main.setSize(width, height);
    //   }
    //   if (scene.cameras) {
    //     const backgroundCamera = scene.cameras.getCamera('backgroundCamera');
    //     if (backgroundCamera) {
    //       backgroundCamera.setSize(width, height);
    //     }
    //   }
    // });
  };

  moveCameraOffset(position: "up" | "down", instant: boolean = false) {
    setTimeout(() => {
      console.log(
        "moving camera from move",
        position,
        this.cameras.main?.followOffset
      );
      let newPosition = this.cameraHeight / 2 - 350;
      if (position === "up") newPosition = -newPosition;
      if (instant && this.cameras.main) {
        this.cameras.main.followOffset.y = newPosition;
      } else {
        this.tweens.add({
          targets: this.cameras.main?.followOffset,
          y: newPosition,
          duration: 1000,
          ease: "ease",
        });
      }
    }, 500);
  }

  lateralCameraOffset(
    position: "left" | "right",
    instant: boolean = false,
    levelWidth?: number,
    zoomOut?: number,
    duration?: number,
    directionAfter?: "up" | "down"
  ) {
    let newWidth = levelWidth ? levelWidth : this.cameraWidth;
    let newduration = 4000;
    if (duration && duration !== 0) newduration = duration;

    this.time.paused = true;
    setTimeout(() => {
      if (position === "right") newWidth = -newWidth;
      if (zoomOut) this.cameras.main.zoom = zoomOut;
      if (instant) {
        this.cameras.main.followOffset.x = newWidth;
      } else {
        this.tweens.add({
          targets: this.cameras.main.followOffset,
          x: newWidth,
          duration: newduration,
          ease: "ease",
          onComplete: () => {
            this.tweens.add({
              targets: this.cameras.main.followOffset,
              x: 0,
              duration: 1000,
              ease: "ease",
              onComplete: () => {
                this.tweens.add({
                  targets: this.cameras.main,
                  zoom: 1,
                  duration: 1000,
                  ease: "ease",
                  onComplete: () => {
                    this.time.paused = false;
                    if (directionAfter) {
                      if (directionAfter) {
                        this.moveCameraOffset(directionAfter, true);
                      }
                    }
                  },
                });
              },
            });
          },
        });
      }
      console.log("moving camera", position, this.cameras.main.followOffset);
    }, 1000);
  }

  changeGravity(float: boolean, time: number, speed?: 1 | 2 | 3) {
    if (this.player) {
      console.log("changing gravity", float, this.physics.world.gravity.y);
      this.physics.world.gravity.y =
        this.physics.world.gravity.y <= 0 ? 1000 : -1000;
      this.moveCameraOffset(this.physics.world.gravity.y <= 0 ? "up" : "down");
      this.player.rotate(speed);
    }
  }

  rotateCam(isNormal: boolean, time: number) {
    console.log("rotating camera", isNormal, this.cameraNormal);
    if (this.cameraNormal === !isNormal) return;
    if (this.player)
      this.player.setCameraState(!isNormal ? "NORMAL" : "ROTATED");
    if (isNormal) {
      this.cameraNormal = false;
    } else {
      this.cameraNormal = true;
    }
    if (this.canRot) {
      for (let i = 0; i < 25; i++) {
        this.time.delayedCall(time * i, () =>
          ((rotate) => {
            if (isNormal) {
              this.cameras.main.setRotation(rotate);
            } else {
              this.cameras.main.setRotation(Math.PI - rotate);
            }
          })((Math.PI * i) / 24)
        );
        if (i == 24) {
          // this.canRot = false;
        }
      }
    }
  }

  changeScene(obj: GamePlayDataType) {
    if (!this.scene.get("MultiScene")) {
      console.log("changing scene", obj, this.scene.get("MultiScene"));
      const multiScene = new MultiScene("Game", obj);
      const scene = this.scene.add("MultiScene", multiScene, true);
      this.scene.start("MultiScene").bringToTop("MultiScene");
      this.masterManagerScene?.stopMusic();

    }
  }

  retry() {
    if (this.player) {
      this.player.isDead = false;
    }
    if (!this.scene.get("MultiScene")) {
      var multiScene = new MultiScene("Game", {
        level: this.levelIs,
        lifes: 3,
      });
      // if (this.levelIs != 0) {
        const scene = this.scene.add("MultiScene", multiScene, true);
        this.scene.start("MultiScene").bringToTop("MultiScene");
      // }
      console.log("[Game] lose(): " + this.levelIs + " , new lifes" + multiScene.sceneData?.lifes);
    } else this.scene
  }
  checkNextScene() {
    if (this.levelIs === 6) {
        const multiScene = new MultiScene("MenuScene", undefined);
        const scene = this.scene.add('MultiScene', multiScene, true);
        this.scene.start("MultiScene").bringToTop("MultiScene");
        console.log("before JP33", this.levelIs);
        return
      }
        console.log("after JP33", this.levelIs);

    if (this.levelIs === 999) {
      const multiScene = new MultiScene("Game", {
        level: 0,
        lifes: 3,
      });
      this.stopMov = true
      if (this.canWin) {
        this.canWin = false;

        if (this.input.keyboard) {
          this.input.keyboard.enabled = false;
        }
      }


      const scene = this.scene.add("MultiScene", multiScene, true);
      this.scene.start("MultiScene").bringToTop("MultiScene");
    }
    else if (this.map?.nextScene) {
      if (this.levelIs === 6) {
        const multiScene = new MultiScene("MenuScene", undefined);
        const scene = this.scene.add('MultiScene', multiScene, true);
        this.scene.start("MultiScene").bringToTop("MultiScene");
      } else {
        const multiScene = new MultiScene("CinematographyMod", {
          keyname: this.map.nextScene,
          lifes: 3,
          loadKey: ["Postales", "Cinemato1", "Cinemato2"],
        });
        const scene = this.scene.add(this.map.nextScene, multiScene, true);
        this.scene.start(this.map.nextScene).bringToTop(this.map.nextScene);
        this.masterManagerScene?.stopMusic();
      }
    }
    else if (this.levelIs !== 11) {
      const multiScene = new MultiScene("Game", {
        level: this.levelIs + 1,
        lifes: 3,
      });

      const scene = this.scene.add("MultiScene", multiScene, true);
      this.scene.start("MultiScene").bringToTop("MultiScene");
    } else {
      try {
        const multiSceneKey = "MultiScene";

        // If MultiScene exists and is active, just bring it to top and reuse it
        if (this.scene.get(multiSceneKey) && this.scene.isActive(multiSceneKey)) {
          console.warn("⚠️ MultiScene is already active — reusing it.");
          this.scene.bringToTop(multiSceneKey);
        } else {
          // If it's not active, create and start a new MultiScene instance
          const multiScene = new MultiScene("MenuScene", undefined);
          console.log("✅ jp test 1 — creating MultiScene:", multiScene);

          const scene = this.scene.add(multiSceneKey, multiScene, true);
          console.log("✅ jp test 2 — added MultiScene:", multiScene, scene);
        }

        this.masterManagerScene?.stopMusic();
        console.log("✅ jp test 3 — continued with music stop or other logic");
      } catch (e) {
        console.error("💥 Error handling MultiScene:", e);
      }
    }
  }
  win() {
    // this.initialScroll = { x: 0, y: 0 };
    // if (this.scene.get("MultiScene")) {
    //   this.scene.remove("MultiScene");
    // }
    if (this.player && this.map) {
      console.log(this.levelIs, "LEVEL IS JOTITA");
      if (this.player) {
        this.sound.stopByKey('walk');
        this.sound.removeByKey('walk');
      }
      this.masterManagerScene?.playSound('win', false, 0.5, 2000);
      this.cameraNormal = true;
      if (this.canWin) {
        this.canWin = false
        const resultConfig = {
          collText: this.UIClass?.collText?.text ?? "0",
          coinCount: this.map.totalCoins ?? 0,
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          planeta: 1,
          victory: true,
          timerText: this.timerText,
          lifes: this.lifes
        }
        this.masterManagerScene?.pauseGame()
        if (this.player && this.player.body) {
          this.player.body.gravity.y = 0;
          this.player.body.gravity.x = 0;
        }

        this.resultModal = new resultContainer(this, resultConfig);
        this.stopMov = true
        this.UICamera?.ignore(this.resultModal)
        this.cameras.getCamera('backgroundCamera')?.ignore(this.resultModal)
        if (this.resultModal.container) {
          this.cameras.getCamera('backgroundCamera')?.ignore(this.resultModal.container)
          this.cameras.main.ignore(this.resultModal.container);
        }
      }


    }

    // lógica para pasar a movie dependiendo el nivel
  }

  touchItem(item: string) {
    switch (item) {
      //TEST COLLECTABLES
      case "collectable":
        console.log("Collectable Picked");
        this.UIClass?.sumCollectable();
        break;
      case "coin":
        /*if (this.map?.coin && this.map.endPortal) {
          this.canNextLevel = true;
          this.canWin = true;
          this.map.endPortal.setTint(0x00ff00);
          this.map.coin.setVisible(false);
          this.map.aura?.setVisible(false);
          this.map.coin.clear(true);
          this.UIClass?.coinCollected();
        }*/
        this.UIClass?.sumCollectable();
        break;
      case "fireball":
        this.lose();
        break;
    }
  }

  lose() {
    console.log("[Game] lose()");
    // this.initialScroll = { x: 0, y: 0 };
    this.canRot = true;
    if (this.map) {
      //@ts-ignore
      if (this.map.resetMap) {
        //@ts-ignore
        this.map.resetMap();
      }
      //@ts-ignore
      this.map.rotate = true;
      const config = this.map.loseConfig[this.checkPoint];
      console.log("[Game] lose() config ",config);
      if (this.lifes) {
        this.lifes -= 1;
        if (this.lifes === 0) {
          if (this.player) {
            this.player.isDead = true;
            this.sound.stopByKey('walk');
            this.sound.removeByKey('walk');
          }
          this.masterManagerScene?.playSound('lose', false, 0.7, 1000);
          this.cameraNormal = true;
          this.checkPoint === 0;
          this.canWin = false
          const resultConfig = {
            collText: this.UIClass?.collText?.text ?? "0",
            coinCount: this.map.totalCoins ?? 0,
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            planeta: 1,
            victory: false,
            timerText: this.timerText,
            lifes: this.lifes
          }
          this.masterManagerScene?.pauseGame()
          if (this.player && this.player.body) {
            this.player.body.gravity.y = 0;
            this.player.body.gravity.x = 0;
          }

          this.resultModal = new resultContainer(this, resultConfig);
          this.stopMov = true
          this.UICamera?.ignore(this.resultModal)
          if (this.resultModal.container) {
            this.cameras.getCamera('backgroundCamera')?.ignore(this.resultModal.container)
            this.cameras.main.ignore(this.resultModal.container);
          }
        } else if (this.lifes > 0 && this.player) {
          // UI changes
          this.UIClass?.loseLife(this.lifes);
          this.UIClass?.rotateArrow(this.gravityDown ? "down" : "up");
          //agregar cambio de arrow UI

          // Player changes
          this.cameraNormal =
            config.cameraDirection === "NORMAL" ? true : false;
          this.player.setCameraState(config.cameraDirection);
          this.player.setPlayerState(config.PlayerDirection);

          // Game changes
          if (config.PlayerDirection === "NORMAL") {
            this.moveCameraOffset("down", true);
          } else {
            this.moveCameraOffset("up", true);
          }
          this.physics.world.gravity.y = config.gravityDown ? 1000 : -1000;
          config.cameraDirection === "NORMAL"
            ? this.cameras.main.setRotation(0)
            : this.cameras.main.setRotation(Math.PI);
          this.player.x = config.positions.x;
          this.player.y = config.positions.y;

          console.log("[Game] lose() playerPos ", this.player.x+" " + this.player.y);
        }
        this.player?.setPlayerInvicinible(false)
        this.map.invincible?.setVisible(true)
        if (this.map.invincibilityTimer) {
          this.time.removeEvent(this.map.invincibilityTimer);
        }
        if (this.map.invincible) {
          this.map.invincible.children.each((child) => {
            if (child instanceof Collectable) {
              child.turnTo(true);
            }
            return true;
          });
        }
        if(this.player?.isFlying){
          console.log("[GAME] Entra en player is flying")
          this.player?.setPlayerWithTank(false);
          this.player?.setPlayerFlying(true);
          this.player?.tankGraphics?.clear()
        }
        // this.cameraNormal = config.cameraDirection === "NORMAL" ? true : false
      }
    }
  }

  handleCameraMovement() {
    let cam = this.cameras.main;
    const cameraSpeed = 25;
    // Camera moves up
    //@ts-ignore
    if (this.cursorsAWSD?.w.isDown) {
      cam.scrollY -= cameraSpeed;
    }
    // Camera moves down
    //@ts-ignore
    if (this.cursorsAWSD?.s.isDown) {
      cam.scrollY += cameraSpeed;
    }
    // Camera moves left
    //@ts-ignore
    if (this.cursorsAWSD?.a.isDown) {
      cam.scrollX -= cameraSpeed;
    }
    // Camera moves right
    //@ts-ignore
    if (this.cursorsAWSD?.d.isDown) {
      cam.scrollX += cameraSpeed;
    }

    // console.log(
    //   "left: " + (this.cameras.main.midPoint.x - window.innerWidth/2),
    //   "right: " + (this.cameras.main.midPoint.x + window.innerWidth/2),
    //   "top: " + (this.cameras.main.midPoint.y - window.innerHeight/2),
    //   "bottom: " + (this.cameras.main.midPoint.y + window.innerHeight/2),
    // )
  }

  create(this: Game, data: GamePlayDataType) {
    // CREATIVE
    // this.time.delayedCall(4000, () => {
    //   this.animCameraPan(2000, 500)
    // })

    this.canWin = true
    this.player?.setVisible(true)
    this.player?.tankGraphics?.setVisible(true)

    this.events.on('continue', () => {
      this.checkNextScene()
    });
    this.events.on('retry', () => {
      this.retry()
    });

    this.events.on('home', () => {
      const multiScene = new MultiScene("MenuScene");
      const scene = this.scene.add("MultiScene", multiScene, true);
      this.scene.start("MultiScene").bringToTop("MultiScene");
    })

    console.log("ARIEL TEST", data);

    // timer
    let seconds = 0;
    let minutes = 0;
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        if (seconds < 59) {
          seconds++;
        } else {
          seconds = 0;
          minutes++;
        }
        this.timerText = seconds <= 9 ? `${minutes} : 0${seconds}` : `${minutes} : ${seconds}`
      },
      loop: true,
    });

    this.cursorsAWSD = this.input.keyboard?.addKeys({
      w: Phaser.Input.Keyboard.KeyCodes.W,
      a: Phaser.Input.Keyboard.KeyCodes.A,
      s: Phaser.Input.Keyboard.KeyCodes.S,
      d: Phaser.Input.Keyboard.KeyCodes.D,
    });
    this.cameras.main.zoom = 0.8;
    // CREATIVE
    this.stopMov = false;
    this.checkPoint = 0;
    this.levelIs = data.level;
    this.lifes = data.lifes;
    this.cursors = this.input.keyboard?.createCursorKeys();
    this.time.paused = false;
    this.events.addListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        this.masterManagerScene?.pauseGame();
      } else {
        if (this.canWin) {
          this.masterManagerScene?.resumeFromBlur();
        }
      }
    })

    const updateTouchDeviceStatus = () => {
      const isTouchDevice = navigator.maxTouchPoints > 0;
      console.log("isTouchDevice", isTouchDevice, navigator.maxTouchPoints);

      if (isTouchDevice) {
        console.log("Touch device detected");
        this.isTouchDevice = true; // Set a property in the Game class
      } else {
        console.log("Non-touch device detected");
        this.isTouchDevice = false; // Set a property in the Game class
        this.joystickBase?.setAlpha(0); // Hide the joystick base when not in use
        this.joystickKnob?.setAlpha(0); // Hide the joystick knob when not in use
      }
    };

    // Initial check
    updateTouchDeviceStatus();

    // Add a listener for resize events
    window.addEventListener("resize", updateTouchDeviceStatus);

    this.input.addPointer(2);

    // Add a listener for orientation change events
    this.joystickBase = this.add.circle(100, this.cameras.main.height - 100, 50, 0x888888).setScrollFactor(0).setDepth(10);
    this.joystickKnob = this.add.circle(100, this.cameras.main.height - 100, 30, 0xcccccc).setScrollFactor(0).setDepth(11);

    // const joystickKnob = this.add.circle(100, this.cameras.main.height - 100, 30, 0xcccccc).setScrollFactor(0).setDepth(11);
    this.joystickBase.setAlpha(0); // Hide the joystick base when not in use
    this.joystickKnob.setAlpha(0); // Hide the joystick knob when not in use
    let isDragging = false;

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (!this.isTouchDevice) return;

      if (pointer.x < this.cameras.main.width / 2 && pointer.y > this.cameras.main.height / 2) {
        // Sólo asignar si ningún dedo controla ya el joystick
        if (this.joystickPointerId === null) {
          this.joystickPointerId = pointer.id;
          isDragging = true;

          this.joystickBase?.setPosition(pointer.x, pointer.y);
          this.joystickKnob?.setPosition(pointer.x, pointer.y);

          this.joystickBase?.setAlpha(1);
          this.joystickKnob?.setAlpha(1);
        }
      } else if (pointer.x > this.cameras.main.width / 2 && pointer.y > this.cameras.main.height / 2) {
        // Cualquier otro dedo puede saltar
        console.log("Right bottom part touched");
        this.player?.jump();
      }
    });
    //DELETE THIS LATER
    // this.time.delayedCall(3000, () => {
    //   this.input.emit('pointerdown', {
    //     x: this.cameras.main.width / 2 + 100,
    //     y: this.cameras.main.height / 2 + 100,
    //     id: 0, // Use a unique ID for the pointer
    //   } as Phaser.Input.Pointer);
    // })

    // this.time.delayedCall(6000, () => {
    //   this.input.emit('pointerdown', {
    //     x: this.cameras.main.width / 2 + 100,
    //     y: this.cameras.main.height / 2 + 100,
    //     id: 0, // Use a unique ID for the pointer
    //   } as Phaser.Input.Pointer);
    // })

    // this.time.delayedCall(9000, () => {
    //   this.input.emit('pointerdown', {
    //     x: this.cameras.main.width / 2 + 100,
    //     y: this.cameras.main.height / 2 + 100,
    //     id: 0, // Use a unique ID for the pointer
    //   } as Phaser.Input.Pointer);
    // })

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (isDragging && this.isTouchDevice && pointer.id === this.joystickPointerId) {
        const baseX = this.joystickBase!.x;
        const baseY = this.joystickBase!.y;

        const angle = Phaser.Math.Angle.Between(baseX, baseY, pointer.x, pointer.y);
        const rawDistance = Phaser.Math.Distance.Between(baseX, baseY, pointer.x, pointer.y);
        const maxDistance = this.joystickBase!.radius;
        const deadZoneRadius = 20;

        const distance = Phaser.Math.Clamp(rawDistance, 0, maxDistance);
        const effectiveDistance = Math.max(0, distance - deadZoneRadius);

        // Drag distances in X and Y (excluding dead zone)
        const dragX = Math.cos(angle) * effectiveDistance;
        const dragY = Math.sin(angle) * effectiveDistance;

        const maxEffectiveDistance = this.joystickBase!.radius - deadZoneRadius;
        this.normalizedDragX = Phaser.Math.Clamp(dragX / maxEffectiveDistance, -1, 1);
        this.normalizedDragY = Phaser.Math.Clamp(dragY / maxEffectiveDistance, -1, 1);


        // console.log("normalizedDragX", normalizedDragX, "normalizedDragY", normalizedDragY);


        if (distance > deadZoneRadius) {
          this.joystickKnob!.setPosition(baseX + dragX, baseY + dragY);

          // Optionally set cursor keys for legacy movement handling
          this.cursors!.left.isDown = dragX < -10;
          this.cursors!.right.isDown = dragX > 10;
          this.cursors!.up.isDown = dragY < -10;
          this.cursors!.down.isDown = dragY > 10;

          // 💡 Save dragX and dragY for velocity application
          // this.playerVelocityX = dragX;
          // this.playerVelocityY = dragY;
        } else {
          this.joystickKnob!.setPosition(baseX, baseY);
          this.cursors!.left.isDown = false;
          this.cursors!.right.isDown = false;
          this.cursors!.up.isDown = false;
          this.cursors!.down.isDown = false;

          // this.playerVelocityX = 0;
          // this.playerVelocityY = 0;
        }
      }
    });

    this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      if (pointer.id === this.joystickPointerId) {
        this.joystickPointerId = null;
        isDragging = false;

        this.joystickKnob!.setPosition(this.joystickBase!.x, this.joystickBase!.y);
        this.joystickBase!.setAlpha(0);
        this.joystickKnob!.setAlpha(0);

        this.cursors!.left.isDown = false;
        this.cursors!.right.isDown = false;
        this.cursors!.up.isDown = false;
        this.cursors!.down.isDown = false;
      }
    });

    window.addEventListener("blur", () => {
      this.masterManagerScene?.pauseGame();
    });

    window.addEventListener("focus", () => {
      if (this.canWin) {
        this.masterManagerScene?.resumeFromBlur();
      }
    });
    /* CHOSE LEVEL, LIFES AND AUDIO */
    switch (data.level) {
      case 999:

        this.player = new Player(this, 0, 0, "character", 2);
        this.map = new Sandbox(this, this.player!);
        this.loopMusic = "planet0LoopMusic";
        break;
      case 666:
        this.player = new Player(this, 0, 0, "character", 2);

        this.map = new subSandbox(this, this.player!);
        this.loopMusic = "planet0LoopMusic";
        break;
      case 0:
        this.player = new Player(this, 0, 0, "character", 2);

        this.map = new p1Map0(this, this.player!);
        this.loopMusic = "planet0LoopMusic";
                if (this.masterManagerScene) {
          this.masterManagerScene.imagenesDesbloqueadas = [
            "planeta1_figu1",
            "planeta1_figu2",
          ];
        }
        break;
      case 1:
        this.player = new Player(this, 0, 0, "character", 2);

        this.map = new p1Map1(this, this.player!);
        this.loopMusic = "planet0LoopMusic";
        if (this.masterManagerScene) {
          this.masterManagerScene.imagenesDesbloqueadas = ["planeta1_figu1"];
        }
        break;
      case 2:
        this.player = new Player(this, 0, 0, "character", 2);

        this.map = new p1Map2(this, this.player!);
        this.loopMusic = "planet0LoopMusic";
        if (this.masterManagerScene) {
          this.masterManagerScene.imagenesDesbloqueadas = ["planeta1_figu1"];
        }
        break;
      case 3:
        this.player = new Player(this, 0, 0, "character", 2);

        this.map = new p1Map3(this, this.player!);
        this.loopMusic = "planet0LoopMusic";
        if (this.masterManagerScene) {
          this.masterManagerScene.imagenesDesbloqueadas = [
            "planeta1_figu1",
            "planeta1_figu2",
          ];
        }
        break;
      case 4:
        this.player = new Player(this, 0, 0, "character", 2);

        this.map = new p2Map0(this, this.player!);
        this.loopMusic = "planet1LoopMusic";
        if (this.masterManagerScene) {
          this.masterManagerScene.imagenesDesbloqueadas = [
            "planeta1_figu1",
            "planeta1_figu2",
          ];
        }
        break;
      case 5:
        this.player = new Player(this, 0, 0, "character", 2);

        this.map = new p2Map1(this, this.player!);
        this.loopMusic = "planet1LoopMusic";
        if (this.masterManagerScene) {
          this.masterManagerScene.imagenesDesbloqueadas = [
            "planeta1_figu1",
            "planeta1_figu2",
            "planeta2_figu1",
          ];
        }
        break;
      case 6:
        this.player = new Player(this, 0, 0, "character", 2);
        this.map = new p2Map2(this, this.player!);
        this.loopMusic = "planet1LoopMusic";
        if (this.masterManagerScene) {
          this.masterManagerScene.imagenesDesbloqueadas = [
            "planeta1_figu1",
            "planeta1_figu2",
            "planeta2_figu1",
          ];
        }
        break;
      case 7:
        this.player = new Player(this, 0, 0, "character", 2);

        this.map = new p2Map3(this, this.player!);
        this.loopMusic = "planet1LoopMusic";
        /*if (this.masterManagerScene) {
          this.masterManagerScene.imagenesDesbloqueadas = [
            "planeta1_figu1",
            "planeta1_figu2",
            "planeta2_figu1",
            "planeta2_figu2",
          ];
        }*/
        break;
      case 8:
        this.player = new Player(this, 0, 0, "character", 2);

        this.map = new p3Map1(this, this.player!);
        this.loopMusic = "planet3LoopMusic";
        if (this.masterManagerScene) {
          this.masterManagerScene.imagenesDesbloqueadas = [
            "planeta1_figu1",
            "planeta1_figu2",
            "planeta2_figu1",
            "planeta2_figu2",
          ];
        }
        break;
      case 9:
        this.player = new Player(this, 0, 0, "character", 2);

        this.map = new p3Map2(this, this.player!);
        this.loopMusic = "planet3LoopMusic";
        if (this.masterManagerScene) {
          this.masterManagerScene.imagenesDesbloqueadas = [
            "planeta1_figu1",
            "planeta1_figu2",
            "planeta2_figu1",
            "planeta2_figu2",
            "planeta3_figu1",
          ];
        }
        break;
      case 10:
        this.player = new Player(this, 0, 0, "character", 2);

        this.map = new p3Map3(this, this.player!);
        this.loopMusic = "planet3LoopMusic";
        if (this.masterManagerScene) {
          this.masterManagerScene.imagenesDesbloqueadas = [
            "planeta1_figu1",
            "planeta1_figu2",
            "planeta2_figu1",
            "planeta2_figu2",
            "planeta3_figu1",
          ];
        }
        break;
      case 11:
        this.player = new Player(this, 0, 0, "character", 2);

        this.map = new p3Map4(this, this.player!);
        if (this.masterManagerScene) {
          this.masterManagerScene.imagenesDesbloqueadas = [
            "planeta1_figu1",
            "planeta1_figu2",
            "planeta2_figu1",
            "planeta2_figu2",
            "planeta3_figu1",
            "planeta3_figu2",
          ];
        }
        this.loopMusic = "planet3LoopMusic";
        break;
      case 20101:
          this.player = new Player(this, 0, 0, "character", 2);

          this.map = new p2SubMap1(this, this.player!);
          this.loopMusic = "planet1LoopMusic";
          if (this.masterManagerScene) {
            this.masterManagerScene.imagenesDesbloqueadas = [
              "planeta1_figu1",
              "planeta1_figu2",
              "planeta2_figu1",
            ];
          }
          break;
      case 20201:
        this.player = new Player(this, 0, 0, "character", 2);

        this.map = new p2SubMap2(this, this.player!);
        this.player.setVelocity(0, 0);
        this.loopMusic = "planet1LoopMusic";
        // if (this.masterManagerScene) {
        //   this.masterManagerScene.imagenesDesbloqueadas = [
        //     "planeta1_figu1",
        //     "planeta1_figu2",
        //     "planeta2_figu1",
        //   ];
        // }
        break;
      case 20301:
        this.player = new Player(this, 0, 0, "character", 2);

        this.map = new p2m3sub1(this, this.player!);
        this.loopMusic = "planet1LoopMusic";
        break;
      case 30301:
        this.player = new Player(this, 0, 0, "character", 2);

        this.map = new p3SubMap3(this, this.player!);
        this.loopMusic = "planet3LoopMusic";
        break;
      case 30101:
        this.player = new Player(this, 0, 0, "character", 2);

        this.map = new p3SubMap1(this, this.player!);
        this.loopMusic = "planet3LoopMusic";
        break;
      case 30201:
        this.player = new Player(this, 0, 0, "character", 2);

        this.map = new p3SubMap2(this, this.player!);
        this.loopMusic = "planet3LoopMusic";
        break;
          
      default:
        this.player = new Player(this, 0, 0, "character", 2);

        this.map = new p1Mapa0(this, this.player!, data);
        this.loopMusic = "planet0LoopMusic";
        break;
    }

    let { x, y } = this.map.startingPoint;
    if (data.startingPositionFromOtherScene) {
      x = data.startingPositionFromOtherScene.x;
      y = data.startingPositionFromOtherScene.y;
    }
    console.log("x y", x, y);
    this.player.setPosition(x, y);
    this.player.setVelocity(0, 0);
    if (this.player.body) {
        this.player.body.gravity.y = 0;
    }
    if (this.player.body) {
        this.player.body.gravity.x = 0;
    }
    /* Audio */
    this.masterManagerScene = this.game.scene.getScene(
      "MasterManager"
    ) as MasterManager;
    if (!this.masterManagerScene.scene.isActive())
      this.scene.launch("MasterManager").sendToBack();
    if (this.loopMusic) this.masterManagerScene.playMusic(this.loopMusic, true);
    else {
      if (this.loopMusic)
        this.masterManagerScene.playMusic(this.loopMusic, true);
    }
    /* FAR BG CAMERA */

    this.cameras.add(0, 0, window.innerWidth, window.innerHeight, false, "backgroundCamera");
    // this.cameras.getCamera("backgroundCamera")?.startFollow(this.player, true, 0.1, 0.1);
    // this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

    /* CREATE NEW MAIN CAMERA TO FIX ORDER */

    this.cameras.add(0, 0, window.innerWidth, window.innerHeight, true, "mainCamera");

    /* UI SCENE  */

    this.UICamera = this.cameras.add(
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );
    this.UICamera?.ignore(this.player);
    this.player.gravityAnimSprite && this.UICamera?.ignore(this.player.gravityAnimSprite);
    this.player.tankAnimSprite && this.UICamera?.ignore(this.player.tankAnimSprite);
    this.player.auraAnimSprite && this.UICamera?.ignore(this.player.auraAnimSprite);

    this.cameras.main.ignore(this.joystickBase)
    this.cameras.main.ignore(this.joystickKnob)
    this.cameras.getCamera("backgroundCamera")?.ignore(this.joystickBase)
    this.cameras.getCamera("backgroundCamera")?.ignore(this.joystickKnob)

    this.UIClass = new UIClass(this, this.levelIs, this.lifes, this.timeLevel);

    /* CONTROLS */
    this.EscKeyboard = this.input.keyboard?.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC
    );


    // FINALIZA EL MAPA

    // ARRANCA EL MAPA

    /* CREATE MAP */
    //@ts-ignore
    this.map.createMap(data);
    console.log("rotating camera", this.cameraNormal);

    const {
      x: boundX,
      y: boundY,
      width: boundWidth,
      height: boundHeight,
    } = this.map.cameraBounds;
    this.cameras.main.setBounds(boundX, boundY, boundWidth, boundHeight);
    /* CAMERAS */
    this.cameras.main.zoom = 0.8;
    this.cameraWidth = this.cameras.main.width;
    this.cameraHeight = this.cameras.main.height;
    this.cameras.main.startFollow(
      this.player,
      false,
      0.1,
      0.1,
      0,
      this.cameraHeight / 2 - 350
    );
    // this.cameras.main.setScroll(0, 0);
    // this.initialScroll = { x: 0, y: 0 };
    /* COLLIDERS */
    //@ts-ignore
    this.map.addColliders();
    this.physics.world.on(
      "worldbounds",
      (
        body: Phaser.Physics.Arcade.Sprite,
        top: boolean,
        down: boolean,
        left: boolean,
        right: boolean
      ) => {
        if (!this.sound.get('fall')?.isPlaying) {
          this.sound.play('fall', {
            volume: 0.6 * (this.masterManagerScene?.volumeSound ?? 1),
            loop: false,
          });
          // this.scene.masterManagerScene?.playSound('fallingTile', false, 0.4);
        }
        //@ts-ignore
        console.log("worldbounds", body, top, down, left, right, this.physics.world.bounds);
        this.lose();
      },
      this
    );

    // if (this.EscKeyboard)
    //   this.EscKeyboard.once(
    //     "down",
    //     () => {
    //       this.player?.body?.destroy();
    //       this.goingBack = false;
    //       this.canWin = false;
    //       this.canNextLevel = false;
    //       this.canRot = true;
    //       this.makeTransition("LevelMap", { stagePoint: this.stagePoint });
    //       if (this.masterManagerScene?.music?.key !== "songMenu")
    //         this.masterManagerScene?.stopMusic();
    //       this.masterManagerScene?.playMusic("songMenu");
    //     },
    //     this
    //   );
    // this.initialScroll = { x: 0, y: 0 };
    // this.scale.on('resize', this.handleResize, this);
    // this.scale.setGameSize(window.innerWidth-1, window.innerHeight-1);
    // setTimeout(() => {
    //   this.handleResize();
    // }
    // , 50);
    // this.handleResize()
    // this.events.on("resize", () => setTimeout(this.handleResize, 50), this);
    // setTimeout(() => {
    //   this.handleResize();
    // }, 50);
    // if (this.isTouchDevice) {
      // const width = window.innerWidth;
      // const height = window.innerHeight;
      // this.cameras.main.setSize(height, width);
      // setTimeout(() => {
      //   this.cameras.main.setSize(width, height);
      // }, 50);
    // }
    this.cameras.main.setZoom(window.innerWidth / window.innerHeight / 3.4);

    console.log("this.cameras.main", this.cameras.main, window.innerWidth, window.innerHeight);
    this.masterManagerScene?.playSound('spawn', false, 0.5, 2000);
  }

  update(this: Game) {

    if (this.player) {
    }
    if (this.cameras.main.width < this.cameras.main.height) {
      console.log("ENTRA EN EL UPDATE CAMERAZOOM");
      this.cameras.main.zoom =
        (this.cameras.main.width / this.cameras.main.height);
    }

    if (this.player && this.map && !this.stopMov) {
      this.map.update();
      this.player.checkMove(this.cursors);
    } else {
      this.player?.setVelocity(0, 17);
      this.player?.setAcceleration(0);
      this.player?.setGravityY(0);
      if (this.player && this.player.body) {
        this.player.body.gravity.y = 0;
        this.player.body.gravity.x = 0;
      }
    }
    // CREATIVE MODE
    this.handleCameraMovement();
    if (this.map?.update) {
      this.map.update();
    }
  }
}

export default Game;
