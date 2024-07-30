import Phaser from "phaser";
import Player from "./assets/Player";
import Mapa1 from "./maps/Mapa1";
import Mapa2 from "./maps/Mapa2";

import p2Mapa1 from "./maps/planet2/p2Mapa1";

import MasterManager from "./MasterManager";
import BetweenScenes, { BetweenScenesStatus } from "./BetweenScenes";
import p2Mapa2 from "./maps/planet2/p2Mapa2";
import p2Mapa3 from "./maps/planet2/p2Mapa3";
import p3Mapa1 from "./maps/planet3/p3Mapa1";
import p3Mapa2 from "./maps/planet3/p3Mapa2";
import p3Mapa3 from "./maps/planet3/p3Mapa3";
import sMapa1 from "./maps/sun/sMapa1";
import sMapa2 from "./maps/sun/sMapa2";
import sMapa3 from "./maps/sun/sMapa3";
import UIClass from "./assets/UIClass";
import MapaTest from "./maps/mapTest";

export type loseConfig = {
  position: {
    x: number,
    y: number,
  }
  camera: string
  gravity: string
};

// Scene in class
class Game extends Phaser.Scene {
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  EscKeyboard?: Phaser.Input.Keyboard.Key;
  monchi?: Player;
  graphics?: Phaser.GameObjects.Graphics;
  map?:
    Mapa1 | Mapa2 |
    p2Mapa1 | p2Mapa2 | p2Mapa3 |
    p3Mapa1 | p3Mapa2 | p3Mapa3 |
    sMapa1 | sMapa2 | sMapa3 | MapaTest;
  lifes?: number;
  levelIs?: number;
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

  moveCameraOffset(position: "up" | "down") {
    let newPosition = (this.cameraHeight / 2 - 100)
    if (position === "up") newPosition = -newPosition
    this.tweens.add({
      targets: this.cameras.main.followOffset,
      y: newPosition,
      duration: 1000,
      ease: "ease"
    })
  }

  changeGravity(float: boolean, time: number) {
    if (this.monchi) {
      switch (float) {
        case true:
          this.physics.world.gravity.y = -1000;
          this.moveCameraOffset("up")
          // change de gravity arrow
          this.time.delayedCall(time, () => {
            this.monchi?.setFlipY(true);
            this.gravityDown = false;
            this.monchi?.body?.setOffset(0, 70);
          });
          break;
        case false:
          this.physics.world.gravity.y = 1000;
          this.moveCameraOffset("down")
          // change de gravity arrow
          this.time.delayedCall(time, () => {
            this.monchi?.setFlipY(false);
            this.gravityDown = true;
            this.monchi?.body?.setOffset(0, 100);
          });
          break;
      }
    }
  }

  rotateCam(isNormal: boolean, time: number) {
    if (isNormal) {
      this.cameraNormal = false;
    } else {
      this.cameraNormal = true;
    }
    if (this.canRot) {
      if (!this.gravityDown) {
      }
      for (let i = 0; i < 25; i++) {
        this.time.delayedCall(time * i, () =>
          ((rotate) => {
            if (isNormal){
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

  win() {
    if (this.canWin && this.monchi) {
      this.makeTransition("MultiScene", { text: "levels" });
    }
    // lógica para pasar a movie dependiendo el nivel
  }


  touchItem(item: string) {
    switch (item) {
      case "coin":
        if (this.map?.coin && this.map.endPortal) {

          (
            this.map.portal?.getChildren()[0] as Phaser.GameObjects.Image,
            this.map.endPortal.clearTint()
          );
          this.canNextLevel = true;
          this.canWin = true;
          this.map.coin.setVisible(false);
          this.map.aura?.setVisible(false)
          this.map.coin.clear(true);
          this.UIClass?.coinCollected()
          // this.portal.clearTint()
        }
        break;
      case "fireball":

        break;
    }
  }

  lose(config: loseConfig) {
    if (this.lifes) {
      this.lifes -= 1;
      if (this.lifes === 0) {
        this.makeTransition("MultiScene", { text: 'lose' });
      } else if (this.lifes > 0 && this.monchi) {
        this.UIClass?.loseLife(this.lifes)
        this.monchi?.setFlipY(config.gravity === "down" ? false : true);
        this.gravityDown = config.gravity === "down" ? true : false;
        this.monchi?.body?.setOffset(0, config.gravity === "down" ? 100 : 70);
        config.camera === "normal" ? this.cameras.main.setRotation(0) : this.cameras.main.setRotation(Math.PI)
        this.physics.world.gravity.y = config.gravity === "down" ? 1000 : -1000;
        this.cameraNormal = config.camera === "normal" ? true : false;
        this.canRot = config.camera === "normal" ? true : false;
        this.monchi.x = config.position.x;
        this.monchi.y = config.position.y;
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

  create(this: Game, data: { level: number; lifes: number, stagePoint: number }) {
    this.checkPoint = 0;
    /* CHOSE LEVEL, LIFES AND AUDIO */
    switch (data.level) {
      case 1:
        this.map = new Mapa1(this, this.monchi!);
        break;
      case 2:
        this.map = new Mapa2(this);
        break;
      case 3:
        this.map = new p2Mapa1(this, this.monchi!);
        break;
      case 4:
        this.map = new p2Mapa2(this, this.monchi!);
        break;
      case 5:
        this.map = new p2Mapa3(this, this.monchi!);
        break;
      case 6:
        this.map = new p3Mapa1(this, this.monchi!);
        break;
      case 7:
        this.map = new p3Mapa2(this, this.monchi!);
        break;
      case 8:
        this.map = new p3Mapa3(this, this.monchi!);
        break;
      case 9:
        this.map = new sMapa1(this, this.monchi!);
        break;
      case 10:
        this.map = new sMapa2(this, this.monchi!);
        break;
      case 11:
        this.map = new sMapa3(this, this.monchi!);
        break;
      default:
        this.map = new MapaTest(this, this.monchi!);
        break;
    }
    this.levelIs = data.level;
    this.lifes = data.lifes;

    /* Audio */
    const getMasterManagerScene = this.game.scene.getScene(
      "MasterManager"
    ) as MasterManager;
    if (!getMasterManagerScene.scene.isActive())
      this.scene.launch("MasterManager").sendToBack();
    else if (this.levelIs == 0) {
      getMasterManagerScene.playMusic("songTutorial");
    } else if (this.levelIs == 1) {
      getMasterManagerScene.playMusic("songLevel1");
    } else if (this.levelIs == 2) {
      getMasterManagerScene.playMusic("songLevel2");
    }



    /* UI SCENE  */

    this.UICamera = this.cameras.add(0, 0, window.innerWidth, window.innerHeight)
    this.UIClass = new UIClass(this, this.levelIs, this.lifes, this.timeLevel)

    /* CREATE MAP */
    this.map.createMap(data);

    /* CONTROLS */
    this.EscKeyboard = this.input.keyboard?.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC
    );
    this.cursors = this.input.keyboard?.createCursorKeys();
    const { x, y } = this.map.startingPoint;
    this.monchi = new Player(this, x, y, "character", 2);
    this.canWin = false;
    this.canRot = true;

    /* CAMERAS */
    this.cameras.main.zoom = 0.9;
    this.cameraWidth = this.cameras.main.width;
    this.cameraHeight = this.cameras.main.height;
    this.cameras.main.startFollow(this.monchi, true, 0.5, 0.5, 0, this.cameraHeight / 2 - 100);

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
        console.log("lose config ARIEL", this.map.loseConfig)
        //@ts-ignore
        this.lose(this.checkPoint ? this.map?.loseConfig.checkpoint : this.map?.loseConfig.start)
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
          if (getMasterManagerScene.music?.key !== "songMenu")
            getMasterManagerScene.stopMusic()
          getMasterManagerScene.playMusic("songMenu")
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
      if (this.monchi.x > this.map.checkPointPos.x) {
        this.checkPoint = 1;
      }
    }

    if (this.map) this.map.update();
  }
}

export default Game;
