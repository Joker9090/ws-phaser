import Phaser from "phaser";
import Player from "./assets/Player";
import Mapa1 from "./maps/Mapa1";
import Mapa2 from "./maps/Mapa2";
import Tutorial from "./maps/Tutorial";
import p2Mapa1 from "./maps/planet2/p2Mapa1";

import MusicManager from "./MusicManager";
import EventsCenter from "./EventsCenter";
import UIScene from "./UIScene";
import BetweenScenes, { BetweenScenesStatus } from "./BetweenScenes";
import p2Mapa2 from "./maps/planet2/p2Mapa2";
import p2Mapa3 from "./maps/planet2/p2Mapa3";
import p3Mapa1 from "./maps/planet3/p3Mapa1";
import p3Mapa2 from "./maps/planet3/p3Mapa2";
import p3Mapa3 from "./maps/planet3/p3Mapa3";
import sMapa1 from "./maps/sun/sMapa1";
import sMapa2 from "./maps/sun/sMapa2";
import sMapa3 from "./maps/sun/sMapa3";

// Scene in class
class Game extends Phaser.Scene {
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  EscKeyboard?: Phaser.Input.Keyboard.Key;
  monchi?: Player;
  graphics?: Phaser.GameObjects.Graphics;
  map?:
    Mapa1 | Mapa2 | Tutorial |
    p2Mapa1 | p2Mapa2 | p2Mapa3 |
    p3Mapa1 | p3Mapa2 | p3Mapa3 |
    sMapa1 | sMapa2 | sMapa3;
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

  cameraWidth: number = 0;
  cameraHeight: number = 0;

  mapShown: boolean = false;
  TutorialMap?: Tutorial;
  TutorialTextScene?: Phaser.Scene;
  UIScene?: UIScene;
  constructor() {
    super({ key: "Game" });
  }

  /* PRELOAD 
   
  preload(this: Phaser.Scene) {
    this.load.spritesheet("character", "/game/character.png", { frameWidth: 220, frameHeight: 162 });
    this.load.image("background", "/game/background.png");
    this.load.image("plataformaA", "/game/platform1.png");
    this.load.image("plataformaB", "/game/platform1B.png");
    this.load.image("plataforma2", "/game/platform2.png");
    this.load.image("asteroid", "/game/asteroid.png");
    this.load.image("asteroid2", "/game/asteroid2.png");
    this.load.image("coin", "/game/coin.png");
    this.load.image("portal", "/game/portal.png");
    this.load.image("heart", "/game/heart.png");
    this.load.image("arrow", "/game/arrow.png");
    this.load.audio("song", 'sounds/monchiSpace.mp3');
    this.load.image("fireball", "/game/fireball.png");
  }
  */

  touch() {
    if (this.monchi) {
      this.monchi.idle();
      this.monchi.setVelocityX(0);
    }
  }

  float(a: any, b: any, time: number) {
    /* Event sender for tutorial */
    [a, b].map((item) => {
      if (item.hasEvent) {
        if (item.hasEvent == "Show_Tutorial_Text_1") {
          EventsCenter.emit("float", true);
          delete item.hasEvent;
        }
      }
      return item;
    });
    if (this.monchi) {

      this.monchi.setGravityY(-2000);
      this.time.delayedCall(time, () => {
        this.monchi?.setFlipY(true);
        this.gravityDown = false;
        this.monchi?.body?.setOffset(0, 70);
        this.monchi?.setBounceY(0);
        EventsCenter.emit("gravityArrow", "up");
      });
    }
  }
  floatnRotate(a: any, b: any, time: number) {
    /* Event sender for tutorial */
    [a, b].map((item) => {
      if (item.hasEvent) {
        if (item.hasEvent == "Show_Tutorial_Text_1") {
          EventsCenter.emit("float", true);
          delete item.hasEvent;
        }
      }
      return item;
    });
    if (this.monchi) {
      this.rotateCam(time)
      this.monchi.setGravityY(-2000);
      this.time.delayedCall(time, () => {
        this.monchi?.setFlipY(true);
        this.gravityDown = false;
        this.monchi?.body?.setOffset(0, 40);
        this.monchi?.setBounceY(0);
        EventsCenter.emit("gravityArrow", "up");

      });
    }
  }
  rotateCam(time: number) {
    this.cameraNormal = false;
    if (this.canRot) {
      if (!this.gravityDown) {
        EventsCenter.emit("gravityArrow", "down");
      }
      for (let i = 0; i < 25; i++) {
        this.time.delayedCall(time * i, () =>
          ((rotate) => {
            // if (i > 1 && i <= 20) {
            //   console.log(i, "acaaa")
            //   this.cameras.main.zoom = 1.3;
            // } else {
            //   this.cameras.main.zoom = 0.9;
            // }
            this.cameras.main.setRotation(rotate);
          })((Math.PI * i) / 24),
        );
        if (i == 24) {
          this.canRot = false;
        }
      }
    }
  }

  noFloat() {
    this.cameraNormal = true;
    if (this.monchi) {
      this.monchi?.setGravity(0);
      for (let i = 0; i < 25; i++) {
        this.time.delayedCall(10 * i, () =>
          ((rotate) => {
            this.cameras.main.setRotation(rotate);
          })(3.1415 + (3.1415 * i) / 24)
        );
        EventsCenter.emit("gravityArrow", "down");
      }
      this.monchi?.setFlipY(false);
      this.gravityDown = true;
      this.monchi?.body?.setOffset(70, 100);
      this.monchi?.setBounceY(0);
    }
  }

  gameOver() {
    this.lifes = 3;
    this.cameraNormal = true;
    this.checkPoint = 0;
    this.timeLevel = 0;
    this.canWin = false;
    this.canNextLevel = false;
    EventsCenter.emit("gameOver", true);
    this.makeTransition("GameOver", {});
    //this.scene.start("GameOver");
  }

  win(Phrase: string) {
    if (this.canWin && this.monchi) {
      this.cameraNormal = true;
      this.checkPoint = 0;
      this.canWin = false;
      this.canNextLevel = false;
      EventsCenter.emit("gameOver", true);
      //this.scene.start("Won", { text: Phrase });
      this.makeTransition("LevelMap", {});
    }
  }

  winTutorial() {
    if (this.canWin && this.monchi) {
      this.cameraNormal = true;
      this.checkPoint = 0;
      this.canWin = false;
      this.canNextLevel = false;
      EventsCenter.emit("gameOver", true);
      this.makeTransition("Game", { level: 1, lifes: this.lifes });
      //this.scene.restart({ level: 1, lifes: this.lifes });
      this.UIScene?.scene.restart({ level: 1, lifes: this.lifes, game: this });
    }
  }

  movingFloorsGrav() {
    this.monchi?.setVelocityY(300);
  }

  goBack() {
    if (!this.goingBack) {
      const mapa = this.map as Mapa1;
      const piso =
        mapa.pisosBack?.getChildren()[0] as Phaser.GameObjects.Sprite;
      this.goingBack = true;
      this.canRot = true;
      this.checkPoint = 0;
      if (this.monchi) var Xpos = this.monchi.x - 4500;
      if (this.monchi) {
        this.tweens.addCounter({
          from: 4500,
          to: 1100,
          duration: 5000,
          ease: window.Phaser.Math.Easing.Linear,
          yoyo: false,
          repeat: 0,
          onStart: () => {
            this.physics.world.gravity.y = 0;
          },
          onUpdate: (tween) => {
            const value = tween.getValue();
            //this.monchi?.setPosition(value + Xpos, 1617);
            piso.setPosition(value, 1700);
          },
          onComplete: () => {
            this.physics.world.gravity.y = 1000;
            this.checkPoint = 0;
          },
        });
      }
    }
  }

  movingFloorsGravRot() {
    this.monchi?.setVelocityY(-300);
  }

  coinCollected(a: any, b: any) {
    /* Event sender for tutorial */
    [a, b].map((item) => {
      if (item.hasEvent) {
        if (item.hasEvent == "Show_Tutorial_Text_2") {
          EventsCenter.emit("coin", true);
          delete item.hasEvent;
        }
      }
      return item;
    });
    if (this.levelIs == 1) {
      if (this.goingBack) {
        const mapa = this.map as Mapa1;
        const piso = mapa.pisosBack?.getChildren()[0] as Phaser.GameObjects.Sprite;
        this.tweens.addCounter({
          from: 1100,
          to: 4500,
          duration: 5000,
          ease: window.Phaser.Math.Easing.Linear,
          yoyo: false,
          repeat: 0,
          onStart: () => { },
          onUpdate: (tween) => {
            const value = tween.getValue();
            piso.setPosition(value, 1700);
          },
          onComplete: () => {
            piso.clearTint();
          },
        });
      } else if (!this.goingBack) {
        const mapa = this.map as Mapa1;
        const piso = mapa.pisosBack?.getChildren()[0] as Phaser.GameObjects.Sprite;
        piso.clearTint();
        this.goingBack = true
      };
    };

    if (this.map?.coin) {
      EventsCenter.emit("coinCollected", true);
      (
        this.map.portal?.getChildren()[0] as Phaser.GameObjects.Image
      ).clearTint();
      this.canNextLevel = true;
      this.canWin = true;
      this.map.coin.setVisible(false);
      this.map.aura?.setVisible(false)
      this.map.coin.clear(true);
    }
  }

  goNextLevel() {
    if (this.canNextLevel && this.monchi) {
      this.timeLevel = 0;
      this.cameraNormal = true;
      this.checkPoint = 0;
      EventsCenter.emit("nextLevel", true);
      this.canWin = false;
      this.canNextLevel = false;
      this.makeTransition("Game", { level: 2, lifes: this.lifes });
      this.UIScene?.scene.restart({ level: 2, lifes: this.lifes, game: this });
    }
  }

  winMapa2() {
    if (this.canNextLevel && this.monchi) {
      this.timeLevel = 0;
      this.cameraNormal = true;
      this.checkPoint = 0;
      EventsCenter.emit("nextLevel", true);
      this.canWin = false;
      this.canNextLevel = false;
      this.makeTransition("Game", { level: 3, lifes: this.lifes });
      this.UIScene?.scene.restart({ level: 3, lifes: this.lifes, game: this });
    }
  }
  winp2Mapa1() {
    if (this.canNextLevel && this.monchi) {
      this.timeLevel = 0;
      this.cameraNormal = true;
      this.checkPoint = 0;
      EventsCenter.emit("nextLevel", true);
      this.canWin = false;
      this.canNextLevel = false;
      this.makeTransition("Game", { level: 4, lifes: this.lifes });
      this.UIScene?.scene.restart({ level: 4, lifes: this.lifes, game: this });
    }
  }
  winp2Mapa2() {
    if (this.canNextLevel && this.monchi) {
      this.timeLevel = 0;
      this.cameraNormal = true;
      this.checkPoint = 0;
      EventsCenter.emit("nextLevel", true);
      this.canWin = false;
      this.canNextLevel = false;
      this.makeTransition("Game", { level: 5, lifes: this.lifes });
      this.UIScene?.scene.restart({ level: 5, lifes: this.lifes, game: this });
    }
  }
  winp2Mapa3() {
    if (this.canNextLevel && this.monchi) {
      this.timeLevel = 0;
      this.cameraNormal = true;
      this.checkPoint = 0;
      EventsCenter.emit("nextLevel", true);
      this.canWin = false;
      this.canNextLevel = false;
      this.makeTransition("Game", { level: 6, lifes: this.lifes });
      this.UIScene?.scene.restart({ level: 6, lifes: this.lifes, game: this });
    }
  }
  winp3Mapa1() {
    if (this.canNextLevel && this.monchi) {
      this.timeLevel = 0;
      this.cameraNormal = true;
      this.checkPoint = 0;
      EventsCenter.emit("nextLevel", true);
      this.canWin = false;
      this.canNextLevel = false;
      this.makeTransition("Game", { level: 7, lifes: this.lifes })
      this.UIScene?.scene.restart({ level: 7, lifes: this.lifes, game: this });
    }
  }
  winp3Mapa2() {
    if (this.canNextLevel && this.monchi) {
      this.timeLevel = 0;
      this.cameraNormal = true;
      this.checkPoint = 0;
      EventsCenter.emit("nextLevel", true);
      this.canWin = false;
      this.canNextLevel = false;
      this.makeTransition("Game", { level: 8, lifes: this.lifes })
      this.UIScene?.scene.restart({ level: 8, lifes: this.lifes, game: this });
    }
  }
  winp3Mapa3() {
    if (this.canNextLevel && this.monchi) {
      this.timeLevel = 0;
      this.cameraNormal = true;
      this.checkPoint = 0;
      EventsCenter.emit("nextLevel", true);
      this.canWin = false;
      this.canNextLevel = false;
      this.makeTransition("Game", { level: 9, lifes: this.lifes })
      this.UIScene?.scene.restart({ level: 9, lifes: this.lifes, game: this });
    }
  }
  winSMapa1() {
    if (this.canNextLevel && this.monchi) {
      this.timeLevel = 0;
      this.cameraNormal = true;
      this.checkPoint = 0;
      EventsCenter.emit("nextLevel", true);
      this.canWin = false;
      this.canNextLevel = false;
      this.makeTransition("Game", { level: 10, lifes: this.lifes })
      this.UIScene?.scene.restart({ level: 10, lifes: this.lifes, game: this });
    }
  }
  winSMapa2() {
    if (this.canNextLevel && this.monchi) {
      this.timeLevel = 0;
      this.cameraNormal = true;
      this.checkPoint = 0;
      EventsCenter.emit("nextLevel", true);
      this.canWin = false;
      this.canNextLevel = false;
      this.makeTransition("Game", { level: 11, lifes: this.lifes })
      this.UIScene?.scene.restart({ level: 11, lifes: this.lifes, game: this });
    }
  }

  winSMapa3() {
    if (this.canNextLevel && this.monchi) {
      this.timeLevel = 0;
      this.cameraNormal = true;
      this.checkPoint = 0;
      EventsCenter.emit("nextLevel", true);
      this.canWin = false;
      this.canNextLevel = false;
      this.makeTransition("LevelMap", { data: 1 })
      this.UIScene?.scene.restart({ level: 11, lifes: this.lifes, game: this });
    }
  }
  noFloatTutorial(a: any, b: any) {
    /* Event sender for tutorial */
    [a, b].map((item) => {
      if (item.hasEvent) {
        if (item.hasEvent == "Show_Tutorial_Text_3") {
          EventsCenter.emit("noFloat", true);
          EventsCenter.emit("gravityArrow", "down");
          // delete item.hasEvent;
        }
      }
      return item;
    });
    if (this.monchi) {
      this.monchi?.setGravity(0);
      this.monchi?.setFlipY(false);
      this.gravityDown = true;
      this.monchi?.body?.setOffset(70, 50);
      this.monchi?.setBounceY(0);
    }
  }

  fireballActFun(a: any, b: any) {
    /* Event sender for tutorial */
    [a, b].map((item) => {
      if (item.hasEvent) {
        if (item.hasEvent == "Show_Tutorial_Text_4") {
          EventsCenter.emit("fire", true);
          delete item.hasEvent;
        }
      }
      return item;
    });
  }

  loseLevelTutorial() {
    if (this.lifes) {
      this.lifes -= 1;
      if (this.lifes == 0) {
        this.gameOver();
      } else if (this.lifes > 0 && this.gravityDown && this.monchi) {
        EventsCenter.emit("die", this.lifes);
        if (this.map) this.monchi.x = this.map.startingPoint.x;
        if (this.map) this.monchi.y = this.map.startingPoint.y;
      } else if (this.lifes > 0 && !this.gravityDown && this.monchi) {
        EventsCenter.emit("die", this.lifes);
        if (this.map) this.monchi.x = this.map.startingPoint.x;
        if (this.map) this.monchi.y = this.map.startingPoint.y;
        if (this.monchi) {
          this.monchi.setGravityY(0);
          this.time.delayedCall(0, () => {
            this.monchi?.setFlipY(false);
            this.gravityDown = true;
            this.monchi?.body?.setOffset(70, 50);
            this.monchi?.setBounceY(0);
          });
        }
      }
    }
  }

  loseLevel1() {
    if (this.lifes) {
      this.lifes -= 1;
      if (this.lifes == 0) {
        this.gameOver();
      } else if (this.lifes > 0 && this.checkPoint == 0 && this.monchi) {
        EventsCenter.emit("die", true);
        this.monchi?.setFlipY(false);
        this.monchi?.setBounceY(0);
        this.gravityDown = true;
        this.monchi?.body?.setOffset(0, 100);
        this.cameras.main.setRotation(0);
        this.monchi?.setGravity(0);
        this.cameraNormal = true;
        if (this.map) this.monchi.x = this.map.startingPoint.x;
        if (this.map) this.monchi.y = this.map.startingPoint.y;
      } else if (
        this.lifes > 0 &&
        this.checkPoint == 1 &&
        this.monchi &&
        this.cameraNormal == false
      ) {
        EventsCenter.emit("die", this.lifes);
        this.monchi.setGravityY(-2000);
        this.time.delayedCall(0, () => {
          this.monchi?.setFlipY(true);
          this.gravityDown = false;
          this.monchi?.body?.setOffset(70, 0);
          this.monchi?.setBounceY(0);
        });
        this.cameraNormal = true;
        this.canRot = true;
        this.rotateCam(0);
        if (this.map) this.monchi.x = this.map.checkPointPos.x;
        if (this.map) this.monchi.y = this.map.checkPointPos.y;
      } else if (
        this.lifes > 0 &&
        this.checkPoint == 1 &&
        this.monchi &&
        this.cameraNormal
      ) {
        EventsCenter.emit("die", this.lifes);
        this.monchi.setGravityY(-2000);
        this.time.delayedCall(0, () => {
          this.monchi?.setFlipY(true);
          this.gravityDown = false;
          this.monchi?.body?.setOffset(70, 0);
          this.monchi?.setBounceY(0);
        });
        this.canRot = true;
        if (this.map) this.monchi.x = this.map.checkPointPos.x;
        if (this.map) this.monchi.y = this.map.checkPointPos.y;
      }
    }
  }
  losePlanet2Level1() {
    if (this.lifes) {
      this.lifes -= 1;
      if (this.lifes == 0) {
        this.gameOver();
      } else if (this.lifes > 0 && this.checkPoint == 0 && this.monchi) {
        EventsCenter.emit("die", true);
        this.monchi?.setFlipY(false);
        this.monchi?.setBounceY(0);
        this.gravityDown = true;
        this.monchi?.body?.setOffset(0, 100);
        this.cameras.main.setRotation(0);
        this.monchi?.setGravity(0);
        this.cameraNormal = true;
        if (this.map) this.monchi.x = this.map.startingPoint.x;
        if (this.map) this.monchi.y = this.map.startingPoint.y;
      } else if (
        this.lifes > 0 &&
        this.checkPoint == 1 &&
        this.monchi &&
        this.cameraNormal == false
      ) {
        EventsCenter.emit("die", this.lifes);
        this.monchi.setGravityY(-2000);
        this.time.delayedCall(0, () => {
          this.monchi?.setFlipY(true);
          this.gravityDown = false;
          this.monchi?.body?.setOffset(70, 0);
          this.monchi?.setBounceY(0);
        });
        this.cameraNormal = true;
        this.canRot = true;
        this.rotateCam(0);
        if (this.map) this.monchi.x = this.map.checkPointPos.x;
        if (this.map) this.monchi.y = this.map.checkPointPos.y;
      } else if (
        this.lifes > 0 &&
        this.checkPoint == 1 &&
        this.monchi &&
        this.cameraNormal
      ) {
        EventsCenter.emit("die", this.lifes);
        this.monchi.setGravityY(-2000);
        this.time.delayedCall(0, () => {
          this.monchi?.setFlipY(true);
          this.gravityDown = false;
          this.monchi?.body?.setOffset(70, 0);
          this.monchi?.setBounceY(0);
        });
        this.canRot = true;
        if (this.map) this.monchi.x = this.map.checkPointPos.x;
        if (this.map) this.monchi.y = this.map.checkPointPos.y;
      }
    }
  }
  // hitbox el vago en respawn
  loseLevel2() {
    if (this.lifes) {
      this.lifes -= 1;
      EventsCenter.emit("gravityArrow", "down");
      if (this.lifes == 0) {
        this.gameOver();
      } else if (this.lifes > 0 && this.checkPoint == 0 && this.monchi) {
        EventsCenter.emit("die", this.lifes);
        this.monchi.setFlipY(false);
        this.physics.world.gravity.y = 1000;
        this.monchi?.setFlipX(false);
        this.monchi.setRotation(0);
        this.cameras.main.setRotation(0);
        this.monchi.setGravityX(0);
        this.monchi.setSize(250, 300)
        if (this.map) this.map.sideGrav = false;
        if (this.map) this.monchi.x = this.map.startingPoint.x;
        if (this.map) this.monchi.y = this.map.startingPoint.y;
      } else if (this.lifes > 0 && this.checkPoint == 1 && this.monchi) {
        EventsCenter.emit("die", this.lifes);
        this.monchi.setFlipY(false);
        this.physics.world.gravity.y = 1000;
        this.monchi.setFlipX(true);
        this.monchi.setRotation(-Math.PI / 2);
        this.cameras.main.setRotation(0);
        this.monchi.setSize(300, 250)
        if (this.map) this.map.sideGrav = true;
        if (this.map) this.monchi.x = this.map.checkPointPos.x;
        if (this.map) this.monchi.y = this.map.checkPointPos.y;
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

  create(this: Game, data: { level: number; lifes: number }) {
    this.checkPoint = 0;
    /* CHOSE LEVEL, LIFES AND AUDIO */
    switch (data.level) {
      case 0:
        this.map = new Tutorial(this);
        break;
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
        this.map = new Tutorial(this);
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
    const UIScene = this.game.scene.getScene("UIScene");
    if (!UIScene.scene.isActive())
      this.scene.launch(UIScene, { ...data, game: this });

    /* TUTORIAL TEXTS SCENE */
    if (this.levelIs == 0) {
      this.TutorialTextScene = this.game.scene.getScene("TutorialText");
      this.scene.launch(this.TutorialTextScene);
    }

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
    this.cameras.main.startFollow(this.monchi);
    this.cameraWidth = this.cameras.main.width;
    this.cameraHeight = this.cameras.main.height;

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
        if (down || top || left || right) {
          if (data.level == 1) {
            this.loseLevel1();
          } else if (data.level == 2) {
            this.loseLevel2();
          } else if (data.level == 0) {
            this.loseLevelTutorial();
          }
        }
      },
      this
    );

    this.timeLevel = 0;
    var timerEvent = this.time.addEvent({
      delay: 200,
      callback: () => {
        this.timeLevel++;
        this.timeLevel = this.timeLevel;
      },
      callbackScope: this,
      loop: true,
    });

    if (this.EscKeyboard)
      this.EscKeyboard.once(
        "down",
        () => {
          this.monchi?.body?.destroy();
          this.goingBack = false;
          this.canWin = false;
          this.canNextLevel = false;
          this.canRot = true;
          EventsCenter.emit("gameOver", true);
          this.makeTransition("LevelMap", {});
          if (getMusicManagerScene.music?.key !== "songMenu")
            getMusicManagerScene.stopMusic()
          getMusicManagerScene.playMusic("songMenu")
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
