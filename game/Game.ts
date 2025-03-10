import Phaser from "phaser";
// MAPAS PLANETA 1
import p1Mapa0 from "./maps/planet1/Mapa0";
import p1Mapa1 from "./maps/planet1/Mapa1";
import p1Mapa2 from "./maps/planet1/Mapa2";
import p1Mapa3 from "./maps/planet1/Mapa3";
// MAPAS PLANETA 2
import p2Mapa1 from "./maps/planet2/Mapa4";
import p2Mapa2 from "./maps/planet2/Mapa5";
import p2Mapa3 from "./maps/planet2/Mapa6";
import p2Mapa4 from "./maps/planet2/Mapa7";
//MAPAS PLANETA 3
import p3Mapa1 from "./maps/planet3/Mapa8";
import p3Mapa2 from "./maps/planet3/Mapa9";
import p3Mapa3 from "./maps/planet3/Mapa10";
import p3Mapa4 from "./maps/planet3/Mapa11";
// OTRAS COSAS
import Player from "./assets/Player";
import UIClass from "./assets/UIClass";
import MasterManager from "./MasterManager";
import BetweenScenes, { BetweenScenesStatus } from "./BetweenScenes";
import { GamePlayDataType } from "./Types";
import MultiScene from "./MultiScene";
import Sandbox from "./maps/sandbox/sandbox";
import CODES from "../public/game/codigos.json";

interface CodeType {
  mapa?: number;
  imagenes?: string[];
}

export type PossibleMaps =
  | p1Mapa0
  | p1Mapa1
  | p1Mapa2
  | p1Mapa3
  | p2Mapa1
  | p2Mapa2
  | p2Mapa3
  | p2Mapa4
  | p3Mapa1
  | p3Mapa2
  | Sandbox;
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

  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  EscKeyboard?: Phaser.Input.Keyboard.Key;
  player?: Player;
  graphics?: Phaser.GameObjects.Graphics;
  map?: PossibleMaps;

  lifes?: number;
  levelIs: number = 0;
  timeLevel: number = 0;
  goingBack: boolean = false;

  canWin: boolean = false;
  canNextLevel: boolean = false;
  canRot: boolean = true;

  cameraNormal: boolean = true;
  isNormal: boolean = true;
  gravityDown: boolean = true;

  checkPoint: number = 0;
  stagePoint: any = 0;
  cameraWidth: number = 0;
  cameraHeight: number = 0;

  mapShown: boolean = false;

  loopMusic?: string;
  UIClass?: UIClass;
  UICamera?: Phaser.Cameras.Scene2D.Camera;
  masterManagerScene?: MasterManager;
  stopMov: boolean = false;
  constructor() {
    super({ key: "Game" });
  }

  init(this: Game, { stagePoint }: any) {
    if (stagePoint != undefined) this.stagePoint = stagePoint;
  }

  touch() {
    if (this.player) {
      this.player.idle();
      this.player.setVelocityX(0);
      if (this.player.withTank && this.player.body?.velocity.y === 0) {
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

  moveCameraOffset(position: "up" | "down", instant: boolean = false) {
    setTimeout(() => {
      console.log(
        "moving camera from move",
        position,
        this.cameras.main.followOffset
      );
      let newPosition = this.cameraHeight / 2 - 350;
      if (position === "up") newPosition = -newPosition;
      if (instant) {
        this.cameras.main.followOffset.y = newPosition;
      } else {
        this.tweens.add({
          targets: this.cameras.main.followOffset,
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

  changeScene(obj: GamePlayDataType){
    if (!this.scene.get("MultiScene")) {
      const multiScene = new MultiScene("Game",obj);
      const scene = this.scene.add("MultiScene", multiScene, true);
      this.scene.start("MultiScene").bringToTop("MultiScene");
      this.masterManagerScene?.stopMusic();
    }
  }

  win() {
    if (this.player && this.map) {
      console.log(this.levelIs, "LEVEL IS JOTITA");
      this.cameraNormal = true;
      if (this.map?.nextScene) {
        // if (this.levelIs === 7){
        //   const multiScene = new MultiScene("Game", { level: 4, lifes: 3 });
        //   const scene = this.scene.add("MultiScene", multiScene, true);
        //   this.scene.start("MultiScene").bringToTop("MultiScene");
        // } else {;
        const multiScene = new MultiScene("CinematographyMod", {
          keyname: this.map.nextScene,
          lifes: this.lifes ? this.lifes : 3,
          loadKey: ["Postales", "Cinemato1", "Cinemato2"],
          code: this.map.postalCode,
        });
        const scene = this.scene.add("MultiScene", multiScene, true);
        this.scene.start("MultiScene").bringToTop("MultiScene");
        this.masterManagerScene?.stopMusic();
      }
      // }
      else if (this.levelIs !== 11) {
        const multiScene = new MultiScene("Game", {
          level: this.levelIs + 1,
          lifes: this.lifes ? this.lifes : 3,
        });
        const scene = this.scene.add("MultiScene", multiScene, true);
        this.scene.start("MultiScene").bringToTop("MultiScene");
      } else {
        const multiScene = new MultiScene("MenuScene", undefined);
        const scene = this.scene.add("MultiScene", multiScene, true);
        this.scene.start("MultiScene").bringToTop("MultiScene");
        this.masterManagerScene?.stopMusic();
      }
    }

    // lógica para pasar a movie dependiendo el nivel
  }

  touchItem(item: string) {
    switch (item) {
      case "coin":
        if (this.map?.coin && this.map.endPortal) {
          this.canNextLevel = true;
          this.canWin = true;
          this.map.endPortal.setTint(0x00ff00);
          this.map.coin.setVisible(false);
          this.map.aura?.setVisible(false);
          this.map.coin.clear(true);
          this.UIClass?.coinCollected();
        }
        break;
      case "fireball":
        this.lose();
        break;
    }
  }

  lose() {
    this.canRot = true;
    if (this.map) {
      //@ts-ignore
      this.map.rotate = true;
      const config = this.map.loseConfig[this.checkPoint];
      if (this.lifes) {
        this.lifes -= 1;
        if (this.lifes === 0) {
          this.cameraNormal = true;
          this.checkPoint === 0;
          const multiScene = new MultiScene("Game", {
            level: this.levelIs,
            lifes: this.lifes ? this.lifes : 3,
          });
          const scene = this.scene.add("MultiScene", multiScene, true);
          this.scene.start("MultiScene").bringToTop("MultiScene");
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
    console.log("ARIEL TEST", data);
    this.cursorsAWSD = this.input.keyboard?.addKeys({
      w: Phaser.Input.Keyboard.KeyCodes.W,
      a: Phaser.Input.Keyboard.KeyCodes.A,
      s: Phaser.Input.Keyboard.KeyCodes.S,
      d: Phaser.Input.Keyboard.KeyCodes.D,
    });
    this.cameras.main.zoom = 1;
    // CREATIVE
    this.stopMov = false;
    this.checkPoint = 0;
    this.levelIs = data.level;
    this.lifes = data.lifes;
    this.cursors = this.input.keyboard?.createCursorKeys();
    this.time.paused = false;
    /* CHOSE LEVEL, LIFES AND AUDIO */
    switch (data.level) {
      case 999:
        this.player = new Player(this, 0, 0, "character", 2);

        this.map = new Sandbox(this, this.player!);
        // this.loopMusic = "planet0LoopMusic";
        break;
      case 0:
        this.player = new Player(this, 0, 0, "character", 2);

        this.map = new p1Mapa0(this, this.player!);
        this.loopMusic = "planet0LoopMusic";
        break;
      case 1:
        this.player = new Player(this, 0, 0, "character", 2);

        this.map = new p1Mapa1(this, this.player!);
        this.loopMusic = "planet0LoopMusic";
        if (this.masterManagerScene) {
          this.masterManagerScene.imagenesDesbloqueadas = ["planeta1_figu1"];
        }
        break;
      case 2:
        this.player = new Player(this, 0, 0, "character", 2);

        this.map = new p1Mapa2(this, this.player!);
        this.loopMusic = "planet0LoopMusic";
        if (this.masterManagerScene) {
          this.masterManagerScene.imagenesDesbloqueadas = ["planeta1_figu1"];
        }
        break;
      case 3:
        this.player = new Player(this, 0, 0, "character", 2);

        this.map = new p1Mapa3(this, this.player!);
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

        this.map = new p2Mapa1(this, this.player!);
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

        this.map = new p2Mapa2(this, this.player!);
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

        this.map = new p2Mapa4(this, this.player!);
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

        this.map = new p2Mapa3(this, this.player!);
        this.loopMusic = "planet1LoopMusic";
        if (this.masterManagerScene) {
          this.masterManagerScene.imagenesDesbloqueadas = [
            "planeta1_figu1",
            "planeta1_figu2",
            "planeta2_figu1",
            "planeta2_figu2",
          ];
        }
        break;
      case 8:
        this.player = new Player(this, 0, 0, "character", 2);

        this.map = new p3Mapa1(this, this.player!);
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

        this.map = new p3Mapa2(this, this.player!);
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

        this.map = new p3Mapa3(this, this.player!);
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

        this.map = new p3Mapa4(this, this.player!);
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
      default:
        this.player = new Player(this, 0, 0, "character", 2);
        
        this.map = new p1Mapa0(this, this.player!);
        this.loopMusic = "planet0LoopMusic";
        break;
    }
    let { x, y } = this.map.startingPoint;
    if(data.startingPositionFromOtherScene){
      x = data.startingPositionFromOtherScene.x;
      y = data.startingPositionFromOtherScene.y;
    }
    this.player.setPosition(x, y);
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
    /* UI SCENE  */

    this.UICamera = this.cameras.add(
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );
    this.UICamera?.ignore(this.player);

    this.UIClass = new UIClass(this, this.levelIs, this.lifes, this.timeLevel);

    /* CONTROLS */
    this.EscKeyboard = this.input.keyboard?.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC
    );

    
    // FINALIZA EL MAPA

    // ARRANCA EL MAPA
    this.canWin = false;
    /* CREATE MAP */
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
    this.cameras.main.zoom = 1;
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
        //@ts-ignore
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
  }

  update(this: Game) {
    if (this.player) {
    }
    if (this.cameras.main.width < this.cameras.main.height) {
      this.cameras.main.zoom =
        this.cameras.main.width / this.cameras.main.height;
    }

    if (this.player && this.map && !this.stopMov) {
      this.map.update();
      this.player.checkMove(this.cursors);
    } else {
      this.player?.setVelocity(0, 17);
      this.player?.setAcceleration(0);
      this.player?.setGravityY(0);
    }
    // CREATIVE MODE
    this.handleCameraMovement();
    if (this.map?.update) {
      this.map.update();
    }
  }
}

export default Game;
