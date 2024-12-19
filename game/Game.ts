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
import p3Mapa1 from "./maps/planet3/Mapa8"
import p3Mapa2 from "./maps/planet3/Mapa9"
import p3Mapa3 from "./maps/planet3/Mapa10"
import p3Mapa4 from "./maps/planet3/Mapa11"
// OTRAS COSAS
import Player from "./assets/Player";
import UIClass from "./assets/UIClass";
import MasterManager from "./MasterManager";
import BetweenScenes, { BetweenScenesStatus } from "./BetweenScenes";
import { GamePlayDataType } from "./Types";
import MultiScene from "./MultiScene";
import Sandbox from "./maps/sandbox/sandbox";

export type PossibleMaps = p1Mapa0 | p1Mapa1 | p1Mapa2 | p1Mapa3 |
  p2Mapa1 | p2Mapa2 | p2Mapa3 | p2Mapa4 | p3Mapa1 | Sandbox
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
  monchi?: Player;
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
    if (this.monchi) {
      this.monchi.idle();
      this.monchi.setVelocityX(0);
    }
  }

  animCameraPan(x: number, y: number, duration: number = 10000, hold: number = 1000) {
    const self = this
    this.stopMov = true;
    this.cameras.main.pan(x, y, duration / 2, "Linear", false, (cam, progress) => {
      if (progress === 1) {
        this.stopMov = false;
      }
    }, self)

    // const originalOffset = { x: this.cameras.main.followOffset.x, y: this.cameras.main.followOffset.y }
    // this.cameras.main.stopFollow();
    // const originPos = { x: this.cameras.main.midPoint.x, y: this.cameras.main.midPoint.y }
    // this.cameras.main.pan(x, y, duration / 2, "Linear", false, (cam, progress) => {
    // if (progress === 1) {
    //   console.log("Entro aca 1 ARI")
    //   this.time.delayedCall(hold, () => {
    //     console.log("Entro aca 2 ARI")

    //     this.cameras.main.pan(originPos.x, originPos.y, duration / 2, "Linear", false, (cam, progress) => {
    //       console.log("Entro aca 3 ARI")

    //       if (progress === 1) {
    //         console.log("Entro aca 4 ARI")
    //         this.cameras.main.startFollow(
    //           //@ts-ignore
    //           this.monchi,
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
    console.log('hola from offset')
    setTimeout(() => {
      let newPosition = this.cameraHeight / 2 - 200;
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

  changeGravity(float: boolean, time: number, speed?: 1 | 2 | 3) {
    if (this.monchi) {
      this.physics.world.gravity.y = this.physics.world.gravity.y <= 0 ? 1000 : -1000;
      this.moveCameraOffset(this.physics.world.gravity.y <= 0 ? "up" : "down")
      this.monchi.rotate(speed)
    }
  }

  rotateCam(isNormal: boolean, time: number) {
    if (this.cameraNormal === !isNormal) return
    if (this.monchi)
      this.monchi.setCameraState(!isNormal ? "NORMAL" : "ROTATED");
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
              console.log("ENTRA ACA 1")
              this.cameras.main.setRotation(rotate);
            } else {
              console.log("ENTRA ACA 2")
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

  win() {
    if (this.canWin && this.monchi && this.map) {
      this.cameraNormal = true;
      if (this.map?.nextScene) {
        // if (this.levelIs === 7){
        //   const multiScene = new MultiScene("Game", { level: 4, lifes: 3 });
        //   const scene = this.scene.add("MultiScene", multiScene, true);
        //   this.scene.start("MultiScene").bringToTop("MultiScene");
        // } else {;
        const multiScene = new MultiScene("CinematographyMod", { keyname: this.map.nextScene, lifes: this.lifes ? this.lifes : 3, loadKey: ["Postales", "Cinemato1", "Cinemato2"], code:this.map.postalCode });
        const scene = this.scene.add("MultiScene", multiScene, true);
        this.scene.start("MultiScene").bringToTop("MultiScene");
      }
      // }
      else {
        const multiScene = new MultiScene("Game", { level: this.levelIs + 1, lifes: this.lifes ? this.lifes : 3 });
        const scene = this.scene.add("MultiScene", multiScene, true);
        this.scene.start("MultiScene").bringToTop("MultiScene");
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
      this.map.rotate = true
      const config = this.map.loseConfig[this.checkPoint];

      console.log(config, "config")
      console.log(this.checkPoint, "checkpoint")
      if (this.lifes) {
        this.lifes -= 1;
        if (this.lifes === 0) {

          const multiScene = new MultiScene("Game", { level: this.levelIs, lifes: this.lifes ? this.lifes : 3 });
          const scene = this.scene.add("MultiScene", multiScene, true);
          this.scene.start("MultiScene").bringToTop("MultiScene");
        } else if (this.lifes > 0 && this.monchi) {
          // UI changes
          this.UIClass?.loseLife(this.lifes);
          this.UIClass?.rotateArrow(this.gravityDown ? "down" : "up");
          //agregar cambio de arrow UI

          // Player changes
          this.cameraNormal = config.cameraDirection === "NORMAL" ? true : false
          this.monchi.setCameraState(config.cameraDirection);
          this.monchi.setPlayerState(config.PlayerDirection);

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
          this.monchi.x = config.positions.x;
          this.monchi.y = config.positions.y;
        }
        this.cameraNormal = config.cameraDirection === "NORMAL" ? true : false

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

  create(
    this: Game,
    data: GamePlayDataType
  ) {
    // CREATIVE
    // this.time.delayedCall(4000, () => {
    //   this.animCameraPan(2000, 500)
    // })
    this.cursorsAWSD = this.input.keyboard?.addKeys({
      w: Phaser.Input.Keyboard.KeyCodes.W,
      a: Phaser.Input.Keyboard.KeyCodes.A,
      s: Phaser.Input.Keyboard.KeyCodes.S,
      d: Phaser.Input.Keyboard.KeyCodes.D,
    });
    this.cameras.main.zoom = 1
    // CREATIVE

    this.checkPoint = 0;
    this.levelIs = data.level;
    this.lifes = data.lifes;
    this.cursors = this.input.keyboard?.createCursorKeys();

    /* CHOSE LEVEL, LIFES AND AUDIO */
    switch (data.level) {
      case 999:
        this.map = new Sandbox(this, this.monchi!);
        // this.loopMusic = "planet0LoopMusic";
        break;
      case 0:
        this.map = new p1Mapa0(this, this.monchi!);
        this.loopMusic = "planet0LoopMusic";
        break;
      case 1:
        this.map = new p1Mapa1(this, this.monchi!);
        this.loopMusic = "planet0LoopMusic";
        break;
      case 2:
        this.map = new p1Mapa2(this, this.monchi!);
        this.loopMusic = "planet0LoopMusic";
        break;
      case 3:
        this.map = new p1Mapa3(this, this.monchi!);
        this.loopMusic = "planet0LoopMusic";
        break;
      case 4:
        this.map = new p2Mapa1(this, this.monchi!);
        this.loopMusic = "planet1LoopMusic";
        break;
      case 5:
        this.map = new p2Mapa2(this, this.monchi!);
        this.loopMusic = "planet1LoopMusic";
        break;
      case 6:
        this.map = new p2Mapa4(this, this.monchi!);
        this.loopMusic = "planet1LoopMusic";
        break;
      case 7:
        this.map = new p2Mapa3(this, this.monchi!);
        this.loopMusic = "planet1LoopMusic";
        break;
      case 8:
        this.map = new p3Mapa1(this, this.monchi!);
        this.loopMusic = "planet1LoopMusic";
        break
      case 9:
        this.map = new p3Mapa2(this, this.monchi!);
        this.loopMusic = "planet1LoopMusic";
        break
      case 10:
        this.map = new p3Mapa3(this, this.monchi!);
        this.loopMusic = "planet1LoopMusic";
        break
      case 11:
        this.map = new p3Mapa4(this, this.monchi!);
        this.loopMusic = "planet1LoopMusic";
        break
      default:
        this.map = new p1Mapa0(this, this.monchi!);
        this.loopMusic = "planet0LoopMusic";
        break;
    }

    /* Audio */
    // this.masterManagerScene = this.game.scene.getScene(
    //   "MasterManager"
    // ) as MasterManager;
    // if (!this.masterManagerScene.scene.isActive())
    //   this.scene.launch("MasterManager").sendToBack();
    // if (this.loopMusic)
    //   this.masterManagerScene.playMusic(this.loopMusic, true);
    // else {
    //   if (this.loopMusic)
    //     this.masterManagerScene.playMusic(this.loopMusic, true);
    // }
    /* UI SCENE  */

    this.UICamera = this.cameras.add(
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );
    this.UIClass = new UIClass(this, this.levelIs, this.lifes, this.timeLevel);

    /* CONTROLS */
    this.EscKeyboard = this.input.keyboard?.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC
    );


    const { x, y } = this.map.startingPoint;
    this.monchi = new Player(this, x, y, "character", 2);
    console.log(this.monchi, "MONCHI")
    this.canWin = false;
    /* CREATE MAP */
    this.map.createMap(data);
    const {
      x: boundX,
      y: boundY,
      width: boundWidth,
      height: boundHeight,
    } = this.map.cameraBounds;
    this.cameras.main.setBounds(boundX, boundY, boundWidth, boundHeight);
    /* CAMERAS */
    //this.cameras.main.zoom = 1;
    this.cameraWidth = this.cameras.main.width;
    this.cameraHeight = this.cameras.main.height;
    this.cameras.main.startFollow(
      this.monchi,
      true,
      0.1,
      0.1,
      0,
      this.cameraHeight / 2 - 200
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
    //       this.monchi?.body?.destroy();
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
    if (this.cameras.main.width < this.cameras.main.height) {
      this.cameras.main.zoom =
        this.cameras.main.width / this.cameras.main.height;
    }
    if (this.monchi && this.map && !this.stopMov) {
      this.map.update();
      this.monchi.checkMove(this.cursors);
    }
    // CREATIVE MODE
    this.handleCameraMovement();
    if (this.map?.update) {
      this.map.update();
    }
  }
}

export default Game;
