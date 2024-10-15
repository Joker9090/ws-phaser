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

// OTRAS COSAS
import Player from "./assets/Player";
import UIClass from "./assets/UIClass";
import MasterManager from "./MasterManager";
import BetweenScenes, { BetweenScenesStatus } from "./BetweenScenes";

export type PossibleMaps = p1Mapa0 | p1Mapa1 | p1Mapa2 | p1Mapa3 |
  p2Mapa1 | p2Mapa2 | p2Mapa3 |
  p2Mapa4
// Scene in class
export const keyCodesAWSD = {
  w: Phaser.Input.Keyboard.KeyCodes.W,
  a: Phaser.Input.Keyboard.KeyCodes.A,
  s: Phaser.Input.Keyboard.KeyCodes.S,
  d: Phaser.Input.Keyboard.KeyCodes.D
}
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

  UIClass?: UIClass;
  UICamera?: Phaser.Cameras.Scene2D.Camera;
  masterManagerScene?: MasterManager;
  constructor() {
    super({ key: "Game" });
  }

  init(this: Game, { stagePoint }: any) {
    if (stagePoint != undefined) this.stagePoint = stagePoint
  }

  touch() {
    if (this.monchi) {
      this.monchi.idle();
      this.monchi.setVelocityX(0);
    }
  }

  moveCameraOffset(position: "up" | "down", instant: boolean = false) {
    setTimeout(() => {
      let newPosition = (this.cameraHeight / 2 - 200)
      if (position === "up") newPosition = -newPosition
      if (instant) {
        this.cameras.main.followOffset.y = newPosition
      } else {
        this.tweens.add({
          targets: this.cameras.main.followOffset,
          y: newPosition,
          duration: 1000,
          ease: "ease"
        })
      }
    }, 500)
  }

  changeGravity(float: boolean, time: number, speed?: 1 | 2 | 3) {
    if (this.monchi) {
      switch (float) {
        case true:
          this.physics.world.gravity.y = -1000;
          this.moveCameraOffset("up")
          this.monchi.rotate(speed)
          break;
        case false:
          this.physics.world.gravity.y = 1000;
          this.moveCameraOffset("down")
          this.monchi.rotate(speed)
          break;
      }
    }
  }

  rotateCam(isNormal: boolean, time: number) {
    console.log("ENTRO ACA ARI 3")

    if (this.monchi) this.monchi.setCameraState(!isNormal ? 'NORMAL' : 'ROTATED')
    if (isNormal) {
      console.log("ENTRO ACA ARI 1")

      this.cameraNormal = false;
    } else {
      console.log("ENTRO ACA AR2")

      this.cameraNormal = true;
    }
    if (this.canRot) {
      if (!this.gravityDown) {
        console.log("ENTRO ACA ARI")
        for (let i = 0; i < 25; i++) {
          this.time.delayedCall(time * i, () =>
            ((rotate) => {
              if (isNormal) {
                this.cameras.main.setRotation(rotate);
              } else {
                this.cameras.main.setRotation(Math.PI - rotate);
              }
            })((Math.PI * i) / 24),
          );
          if (i == 24) {
            this.canRot = false;
          }
        }
      } else {

        for (let i = 0; i < 25; i++) {
          this.time.delayedCall(time * i, () =>
            ((rotate) => {
              if (isNormal) {
                this.cameras.main.setRotation(rotate);
              } else {
                this.cameras.main.setRotation(Math.PI - rotate);
              }
            })((Math.PI * i) / 24),
          );
          if (i == 24) {
            this.canRot = false;
          }
        }
      }
    }
  }

  win() {
    if (this.canWin && this.monchi) {
      if (this.map?.nextScene) {
        this.makeTransition("CinematographyMod", { keyname: this.map.nextScene, lifes: this.lifes });
      } else {
        this.makeTransition("Game", { level: this.levelIs + 1, lifes: this.lifes });
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
          this.map.aura?.setVisible(false)
          this.map.coin.clear(true);
          this.UIClass?.coinCollected()
        }
        break;
      case "fireball":
        this.lose()
        break;
    }
  }

  lose() {
    if (this.map) {
      //@ts-ignore
      const config = this.map.loseConfig[this.checkPoint]
      if (this.lifes) {
        this.lifes -= 1;
        if (this.lifes === 0) {
          // this.makeTransition("MultiScene", { text: 'lose' });
          this.makeTransition("Game", { level: this.levelIs, lifes: 3 });
        } else if (this.lifes > 0 && this.monchi) {
          // UI changes
          this.UIClass?.loseLife(this.lifes)
          this.UIClass?.rotateArrow(this.gravityDown ? 'down' : 'up')
          //agregar cambio de arrow UI

          // Player changes
          this.monchi.setCameraState(config.cameraDirection)
          this.monchi.setPlayerState(config.PlayerDirection)

          // Game changes
          if (config.PlayerDirection === 'NORMAL') {
            this.moveCameraOffset('down', true)
          } else {
            this.moveCameraOffset("up", true)
          }
          this.physics.world.gravity.y = config.gravityDown ? 1000 : -1000;
          config.cameraDirection === "NORMAL" ? this.cameras.main.setRotation(0) : this.cameras.main.setRotation(Math.PI)
          this.monchi.x = config.positions.x;
          this.monchi.y = config.positions.y;
        }
      }
    }
  }

  makeTransition(sceneName: string, data: any) {
    const getBetweenScenesScene = this.game.scene.getScene(
      "BetweenScenes"
    ) as BetweenScenes;
    if (getBetweenScenesScene) {
      if (getBetweenScenesScene.status != BetweenScenesStatus.IDLE)
        return false;
      getBetweenScenesScene.changeSceneTo(sceneName, data);
      this.time.delayedCall(1000, () => {
        this.scene.stop();
      });
    } else {
      this.scene.start(sceneName, data);
      this.time.delayedCall(1000, () => {
        this.scene.stop();
      });
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
  }

  create(this: Game, data: { level: number; lifes: number, stagePoint: number }) {
    // CREATIVE
    this.cursorsAWSD = this.input.keyboard?.addKeys({
      w: Phaser.Input.Keyboard.KeyCodes.W,
      a: Phaser.Input.Keyboard.KeyCodes.A,
      s: Phaser.Input.Keyboard.KeyCodes.S,
      d: Phaser.Input.Keyboard.KeyCodes.D
    });
    this.cameras.main.zoom = 0.5
    // CREATIVE

    this.checkPoint = 0;
    this.levelIs = data.level;
    this.lifes = data.lifes;
    /* CHOSE LEVEL, LIFES AND AUDIO */
    switch (data.level) {
      case 0:
        this.map = new p1Mapa0(this, this.monchi!);
        break;
      case 1:
        this.map = new p1Mapa1(this, this.monchi!);
        break;
      case 2:
        this.map = new p1Mapa2(this, this.monchi!);
        break;
      case 3:
        this.map = new p1Mapa3(this, this.monchi!);
        break;
      case 4:
        this.map = new p2Mapa1(this, this.monchi!);
        break;
      case 5:
        this.map = new p2Mapa2(this, this.monchi!);
        break;
      case 6:
        this.map = new p2Mapa3(this, this.monchi!);
        break;
      case 7:
        this.map = new p2Mapa4(this, this.monchi!);
        break;
      default:
        this.map = new p1Mapa0(this, this.monchi!);
        break;
    }


    /* Audio */
    this.masterManagerScene = this.game.scene.getScene(
      "MasterManager"
    ) as MasterManager;
    if (!this.masterManagerScene.scene.isActive())
      this.scene.launch("MasterManager").sendToBack();
    else if (this.levelIs == 0) {
      // this.masterManagerScene.playMusic("songTutorial");
    } else if (this.levelIs == 1) {
      // this.masterManagerScene.playMusic("songLevel1");
    } else if (this.levelIs == 2) {
      // this.masterManagerScene.playMusic("songLevel2");
    }

    /* UI SCENE  */

    this.UICamera = this.cameras.add(0, 0, window.innerWidth, window.innerHeight)
    this.UIClass = new UIClass(this, this.levelIs, this.lifes, this.timeLevel)

    /* CREATE MAP */
    this.map.createMap(data);
    const {
      x: boundX,
      y: boundY,
      width: boundWidth,
      height: boundHeight
    } = this.map.cameraBounds
    console.log("CAMERA BOUNDS", this.map.cameraBounds)
    this.cameras.main.setBounds(boundX, boundY, boundWidth, boundHeight)
    /* CONTROLS */
    this.EscKeyboard = this.input.keyboard?.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC
    );
    // this.cursors = this.input.keyboard?.createCursorKeys();
    this.cursors = this.input.keyboard?.createCursorKeys();

    const { x, y } = this.map.startingPoint;
    this.monchi = new Player(this, x, y, "character", 2);
    this.canWin = false;
    this.canRot = true;
    /* CAMERAS */
    this.cameras.main.zoom = 1;
    this.cameraWidth = this.cameras.main.width;
    this.cameraHeight = this.cameras.main.height;
    this.cameras.main.startFollow(this.monchi, true, 0.5, 0.5, 0, this.cameraHeight / 2 - 200);

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
        this.lose()
      },
      this
    );


    if (this.EscKeyboard)
      this.EscKeyboard.once(
        "down",
        () => {
          this.monchi?.body?.destroy();
          this.goingBack = false;
          this.canWin = false;
          this.canNextLevel = false;
          this.canRot = true;
          this.makeTransition("LevelMap", { stagePoint: this.stagePoint });
          if (this.masterManagerScene?.music?.key !== "songMenu")
            this.masterManagerScene?.stopMusic()
          this.masterManagerScene?.playMusic("songMenu")
        },
        this
      );
  }

  update(this: Game) {
    if (this.cameras.main.width < this.cameras.main.height) {
      this.cameras.main.zoom =
        this.cameras.main.width / this.cameras.main.height;
    }
    if (this.monchi && this.map) {
      this.map.update();
      this.monchi.checkMove(this.cursors)
    }
    // CREATIVE MODE
    this.handleCameraMovement(); 
  }

}

export default Game;
