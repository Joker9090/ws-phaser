import Phaser from "phaser";
import Player from "./assets/Player";
import Mapa1 from "./maps/Mapa1";
import Mapa2 from "./maps/Mapa2";

import p2Mapa1 from "./maps/planet2/p2Mapa1";

import MusicManager from "./MusicManager";
import BetweenScenes, { BetweenScenesStatus } from "./BetweenScenes";
import p2Mapa2 from "./maps/planet2/p2Mapa2";
import p2Mapa3 from "./maps/planet2/p2Mapa3";
import p3Mapa1 from "./maps/planet3/p3Mapa1";
import p3Mapa2 from "./maps/planet3/p3Mapa2";
import p3Mapa3 from "./maps/planet3/p3Mapa3";
import sMapa1 from "./maps/sun/sMapa1";
import sMapa2 from "./maps/sun/sMapa2";
import sMapa3 from "./maps/sun/sMapa3";
import UIClass from "./UIClass";
import MapaTest from "./maps/mapTest";

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

  checkPoint: number = 1;
  stagePoint: any = 0;
  cameraWidth: number = 0;
  cameraHeight: number = 0;

  mapShown: boolean = false;
  TutorialTextScene?: Phaser.Scene;

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
      y: -(this.cameraHeight / 2 - 100),
      duration: 1000,
      ease: "ease"
    })
  }

  changeGravity(float: boolean, time: number) {
    if (this.monchi) {
      switch (float) {
        case true:
          this.monchi.setGravityY(-2000);
          // monchi anim de darse vuelta, change de offset
          // change de gravity arrow
          this.time.delayedCall(time, () => {
            this.monchi?.setFlipY(true);
            this.gravityDown = false;
            this.monchi?.body?.setOffset(0, 70);
            this.monchi?.setBounceY(0);
          });
          break;
        case false:
          this.monchi.setGravityY(1000);
          // monchi anim de darse vuelta, change de offset
          // change de gravity arrow
          this.time.delayedCall(time, () => {
            this.monchi?.setFlipY(true);
            this.gravityDown = false;
            this.monchi?.body?.setOffset(0, 70);
            this.monchi?.setBounceY(0);
          });
          break;
      }
    }
  }

  rotateCam(time: number) {
    this.cameraNormal = false;
    if (this.canRot) {
      if (!this.gravityDown) {
      }
      for (let i = 0; i < 25; i++) {
        this.time.delayedCall(time * i, () =>
          ((rotate) => {
            this.cameras.main.setRotation(rotate);
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
      this.cameraNormal = true;
      this.checkPoint = 0;
      this.canWin = false;
      this.canNextLevel = false;
      this.makeTransition("LevelMap", {});
    }
    // next level refacotrear
    if (this.canNextLevel && this.monchi) {
      this.timeLevel = 0;
      this.cameraNormal = true;
      this.checkPoint = 0;
      this.canWin = false;
      this.canNextLevel = false;
      let nextLevel = 1
      if (nextLevel === 3) {

        this.makeTransition("LevelMap", { stagePoint: 1 });
      } else if (nextLevel === 6) {

        this.makeTransition("LevelMap", { stagePoint: 2 });
      } else if (nextLevel === 9) {

        this.makeTransition("LevelMap", { stagePoint: 3 });
      }
      else if (nextLevel === 12) {
        this.makeTransition("Won", { stagePoint: 3 });
      }
      else {
        this.makeTransition("Game", { level: nextLevel, lifes: 3 });
      }
    }
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
          // this.portal.clearTint()
        }
        break;
      case "fireball":

        break;
    }
  }

  lose(config: any) {
    if (this.lifes) {
      this.lifes -= 1;
      if (this.lifes == 0) {
        this.lifes = 3;
        this.cameraNormal = true;
        this.checkPoint = 0;
        this.timeLevel = 0;
        this.canWin = false;
        this.canNextLevel = false;
        this.makeTransition("GameOver", {});
      } else if (this.lifes > 0 && this.monchi) {
        this.monchi?.setFlipY(false);
        this.monchi?.setBounceY(0);
        this.gravityDown = true;
        this.monchi?.body?.setOffset(0, 100);
        this.cameras.main.setRotation(0);
        this.monchi?.setGravity(0);
        this.cameraNormal = true;
        this.canRot = true;
        if (this.map) this.monchi.x = this.map.startingPoint.x;
        if (this.map) this.monchi.y = this.map.startingPoint.y;
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
    const getMusicManagerScene = this.game.scene.getScene(
      "MusicManager"
    ) as MusicManager;
    if (!getMusicManagerScene.scene.isActive())
      this.scene.launch("MusicManager").sendToBack();
    else if (this.levelIs == 0) {
      getMusicManagerScene.playMusic("songTutorial");
    } else if (this.levelIs == 1) {
      getMusicManagerScene.playMusic("songLevel1");
    } else if (this.levelIs == 2) {
      getMusicManagerScene.playMusic("songLevel2");
    }



    /* UI SCENE  */

    this.UICamera = this.cameras.add(0,0,window.innerWidth, window.innerHeight)
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
        this.lose("config")
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
          if (getMusicManagerScene.music?.key !== "songMenu")
            getMusicManagerScene.stopMusic()
          getMusicManagerScene.playMusic("songMenu")
        },
        this
      );

      setTimeout(()=>{
        this.UIClass?.rotateArrow("left")
        this.UIClass?.loseLife(2)
      }, 5000)
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
