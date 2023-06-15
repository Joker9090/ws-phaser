
import Phaser from "phaser";

import Player from "./assets/Player";

import Mapa1 from "./maps/Mapa1";
import Mapa2 from "./maps/Mapa2";
import Tutorial from "./maps/Tutorial";
import MusicManager from './MusicManager';
import EventsCenter from './EventsCenter';


// Scene in class
class Game extends Phaser.Scene {
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  EscKeyboard?: Phaser.Input.Keyboard.Key;
  monchi?: Player;
  graphics?: Phaser.GameObjects.Graphics;
  map?: Mapa1 | Mapa2;
  lifes?: number;
  levelIs?: number;
  timeLevel: number = 0;


  canWin: boolean = false;
  canNextLevel: boolean = false;
  canRot: boolean = true;

  cameraNormal: boolean = true;
  gravityDown: boolean = true;

  startTime: number = 0;
  timerText?: Phaser.GameObjects.Text;

  checkPoint: number = 0;

  cameraWidth: number = 0;
  cameraHeight: number = 0;

  mapShown: boolean = false;
  TutorialMap?: Tutorial;
  TutorialTextScene?: Phaser.Scene;
  constructor() {
    super({ key: 'Game' });
  };

  /*  
  
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
      this.monchi.setVelocityX(0); //check if working properly
    };
  };


  float(a: any, b: any, time: number) {
    if (this.levelIs == 0) {
      EventsCenter.emit('float', true)
    }
    /* Event sender for tutorial */
    [a, b].map(item => {
      if (item.hasEvent) {
        if (item.hasEvent == "Show_Tutorial_Text_1") {
          EventsCenter.emit('float', true)
          delete item.hasEvent
        }
      }
      return item;
    })
    if (this.monchi) {
      this.monchi.setBounce(0.1);
      this.monchi.setGravityY(-2000);
      this.time.delayedCall(time, () => {
        this.monchi?.setFlipY(true);
        this.gravityDown = false;
        this.monchi?.body?.setOffset(70, 0);
        this.monchi?.setBounceY(0);
      });
    };
  };



  rotateCam(time: number) {
    this.cameraNormal = false;
    if (this.canRot) {
      for (let i = 0; i < 25; i++) {
        this.time.delayedCall(time * i, () => ((rotate) => {
          this.cameras.main.setRotation(rotate);
        })(3.1415 * i / 24));
        if (i == 24) { this.canRot = false };
      };
    };
  };

  noFloat() {
    this.cameraNormal = true;
    if (this.monchi) {
      this.monchi?.setGravity(0);
      for (let i = 0; i < 25; i++) {
        this.time.delayedCall(10 * i, () => ((rotate) => {
          this.cameras.main.setRotation(rotate);
        })(3.1415 + 3.1415 * (i) / 24));
      };
      this.monchi?.setFlipY(false);
      this.gravityDown = true;
      this.monchi?.body?.setOffset(70, 50);
      this.monchi?.setBounceY(0);
    };
  };

  gameOver() {
    this.lifes = 3;
    this.cameraNormal = true;
    this.checkPoint = 0;
    this.scene.restart();
    this.timeLevel = 0;
    this.scene.switch("GameOver");
    this.canWin = false;
    this.canNextLevel = false;
  };


  win(Phrase: string) {
    if (this.levelIs == 0 && this.TutorialMap) {
      //(this.TutorialMap as Tutorial).pisoCoin?.hasEvent = "Show_Tutorial_Text_2"
    }
    if (this.canWin && this.monchi) {
      this.cameraNormal = true;
      this.scene.sleep();
      this.scene.start("Won", { text: Phrase });
      this.checkPoint = 0;
      this.canWin = false;
      this.canNextLevel = false;
    };
  };

  movingFloorsGrav() {
    this.monchi?.setVelocityY(300);
  };

  movingFloorsGravRot() {
    this.monchi?.setVelocityY(-300);
  };

  coinCollected(a: any, b: any) {
    /* Event sender for tutorial */
    [a, b].map(item => {
      if (item.hasEvent) {
        if (item.hasEvent == "Show_Tutorial_Text_2") {
          EventsCenter.emit('coin', true)
          delete item.hasEvent
        }
      }
      return item;
    })

    if (this.map?.coin) {
      (this.map.portal?.getChildren()[0] as Phaser.GameObjects.Image).clearTint();
      this.canNextLevel = true;
      this.canWin = true;
      this.map.coin.setVisible(false);
      this.map.coin.clear(true);
    };
  };

  goNextLevel() {
    if (this.canNextLevel && this.monchi) {
      this.cameraNormal = true;
      this.checkPoint = 0;
      this.canWin = false;
      this.canNextLevel = false;
      this.scene.restart({ level: 2, lifes: this.lifes });
    };
  };

  noFloatTutorial(a: any, b: any) {
    if (this.levelIs == 0) {
      EventsCenter.emit('noFloat', true)
    }
    /* Event sender for tutorial */
    [a, b].map(item => {
      if (item.hasEvent) {
        if (item.hasEvent == "Show_Tutorial_Text_3") {
          EventsCenter.emit('noFloat', true)
          delete item.hasEvent
        }
      }
      return item;
    })
    if (this.monchi) {
      this.monchi?.setGravity(0);
      this.monchi?.setFlipY(false);
      this.gravityDown = true;
      this.monchi?.body?.setOffset(70, 50);
      this.monchi?.setBounceY(0);
    };
  };

  loseLevelTutorial() {
    if (this.lifes) {
      this.lifes -= 1;

      if (this.lifes == 0) {
        this.gameOver();
      } else if (this.lifes != 0 && this.gravityDown && this.monchi) {
        if (this.map) this.monchi.x = this.map.startingPoint.x;
        if (this.map) this.monchi.y = this.map.startingPoint.y;
      } else if (this.lifes != 0 && this.gravityDown == false && this.monchi) {
        if (this.map) this.monchi.x = this.map.startingPoint.x;
        if (this.map) this.monchi.y = this.map.startingPoint.y;
        this.noFloatTutorial(null, null);
      };

      // Remove the object with the highest x position
      if (this.lifes != 0 && this.map?.lifesGroup) {
        let lifeToTheRight = null;
        let highestX = Number.NEGATIVE_INFINITY;
        for (let i = 0; i < this.map?.lifesGroup?.getLength(); i++) {
          const child = (this.map?.lifesGroup?.getChildren()[i] as Phaser.GameObjects.Image);
          if (child.x > highestX) {
            lifeToTheRight = child;
            highestX = child.x;
          };
        };
        lifeToTheRight?.destroy();
      };
    };
  };

  loseLevel1() {
    if (this.lifes) {
      this.lifes -= 1;

      if (this.lifes == 0) {
        this.gameOver();

      } else if (this.lifes != 0 && this.checkPoint == 0 && this.monchi) {
        this.monchi?.setFlipY(false);
        this.monchi?.setBounceY(0);
        this.gravityDown = true;
        this.monchi?.body?.setOffset(70, 50);
        this.cameras.main.setRotation(0);
        this.monchi?.setGravity(0);
        this.cameraNormal = true;
        if (this.map) this.monchi.x = this.map.startingPoint.x;
        if (this.map) this.monchi.y = this.map.startingPoint.y;

      } else if (this.lifes != 0 && this.checkPoint == 1 && this.monchi && this.cameraNormal == false) {
        this.float(null, null, 0);
        this.cameraNormal = true;
        this.canRot = true;
        this.rotateCam(0);
        if (this.map) this.monchi.x = this.map.checkPointPos.x;
        if (this.map) this.monchi.y = this.map.checkPointPos.y;
      } else if (this.lifes != 0 && this.checkPoint == 1 && this.monchi && this.cameraNormal) {
        this.float(null, null, 0);
        this.canRot = true;
        if (this.map) this.monchi.x = this.map.checkPointPos.x;
        if (this.map) this.monchi.y = this.map.checkPointPos.y;
      };

      // Remove the object with the highest x position
      if (this.lifes != 0 && this.map?.lifesGroup) {
        let lifeToTheRight = null;
        let highestX = Number.NEGATIVE_INFINITY;
        for (let i = 0; i < this.map?.lifesGroup?.getLength(); i++) {
          const child = (this.map?.lifesGroup?.getChildren()[i] as Phaser.GameObjects.Image);
          if (child.x > highestX) {
            lifeToTheRight = child;
            highestX = child.x;
          };
        };
        lifeToTheRight?.destroy()
      };
    };
  };

  loseLevel2() {
    if (this.lifes) {
      this.lifes -= 1;

      if (this.lifes == 0) {
        this.gameOver();
      } else if (this.lifes != 0 && this.checkPoint == 0 && this.monchi) {
        this.monchi?.setFlipY(false);
        this.physics.world.gravity.y = 1000;
        this.monchi?.setFlipX(false);
        this.monchi.setRotation(0).setSize(73, 110).setOffset(70, 50);
        this.cameras.main.setRotation(0);
        this.monchi?.setGravityX(0);
        if (this.map) this.map.sideGrav = false;
        if (this.map) this.monchi.x = this.map.startingPoint.x;
        if (this.map) this.monchi.y = this.map.startingPoint.y;
      } else if (this.lifes != 0 && this.checkPoint == 1 && this.monchi) {
        this.monchi?.setFlipY(false);
        this.physics.world.gravity.y = 1000;
        this.monchi?.setFlipX(false);
        this.monchi.setRotation(0).setSize(73, 110).setOffset(70, 50);
        this.cameras.main.setRotation(0);
        this.monchi?.setGravityX(0);
        if (this.map) this.map.sideGrav = false;
        if (this.map) this.monchi.x = this.map.checkPointPos.x;
        if (this.map) this.monchi.y = this.map.checkPointPos.y;
      };

      // Remove the object with the highest x position
      if (this.lifes != 0 && this.map?.lifesGroup) {
        let lifeToTheRight = null;
        let highestX = Number.NEGATIVE_INFINITY;
        for (let i = 0; i < this.map?.lifesGroup?.getLength(); i++) {
          const child = (this.map?.lifesGroup?.getChildren()[i] as Phaser.GameObjects.Image);
          if (child.x > highestX) {
            lifeToTheRight = child;
            highestX = child.x;
          };
        };
        lifeToTheRight?.destroy();
      };
    };
  };

  /*  SHOWMAP FUNCTION
  showPlatform(time: number) {
      this.monchi?.setGravityY(-2000);
      this.time.delayedCall(time, () => {
        this.monchi?.setFlipY(true);
        this.gravityDown = false;
        this.monchi?.body?.setOffset(70, 0);
        this.monchi?.setBounceY(0);
      });
    };
  };

  showMap() {
    
    if (this.mapShown == false && this.map) {
      let endPointX = 0;
      let endPointY = 0;
      let duration = 0;
      if (this.levelIs == 0 || this.levelIs == 1){
        endPointX = this.map.worldSize.width/2
        endPointY = this.map.startingPoint.y
        duration = 5000 + this.levelIs*5000
      } else if (this.levelIs == 2){
        endPointX = this.map.startingPoint.x
        endPointY = this.map.worldSize.height/2
        duration = 
      }
      const a = 2
      this.cameras.main.pan(endPointX, endPointY, 7000, 'Linear', false, (camera, progress) => {
        if(this.map) this.map.background.scrollFactorX = 0.1
        if (progress == 1) {
          this.mapShown = true;
          if(this.map) this.map.background.scrollFactorX = 1
        }
      }, this.scene);
    };
  };
  */

  create(this: Game, data: { level: number, lifes: number }) {

    this.checkPoint = 0

    /* CHOSE LEVEL, LIFES AND AUDIO */
    switch (data.level) {
      case 0:
        this.map = new Tutorial(this);
        // this.music.playMusic('songTutorial');
        break;
      case 1:
        this.map = new Mapa1(this);
        // this.music.playMusic('songLevel1');
        break;
      case 2:
        this.map = new Mapa2(this);
        // this.music.playMusic('songLevel2');
        break;
      default:
        this.map = new Tutorial(this);
        // this.music.playMusic('songTutorial');
        break;
    };

    this.levelIs = data.level;

    /* Audio */
    const getMusicManagerScene = this.game.scene.getScene("MusicManager") as MusicManager
    if (!getMusicManagerScene.scene.isActive()) this.scene.launch("MusicManager").sendToBack();
    else if (this.levelIs == 0) {
      getMusicManagerScene.playMusic("songTutorial")
    } else if (this.levelIs == 1) {
      getMusicManagerScene.playMusic("songLevel1")
    } else if (this.levelIs == 2) {
      getMusicManagerScene.playMusic("songLevel2")
    }

    this.TutorialTextScene = this.game.scene.getScene("TutorialText");
    this.scene.launch(this.TutorialTextScene);

    /* CREATE MAP AND LFIES */
    if (data.lifes) this.lifes = data.lifes;
    this.map.createMap(data);

    /* CONTROLS */
    this.EscKeyboard = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.cursors = this.input.keyboard?.createCursorKeys();
    const { x, y } = this.map.startingPoint;
    this.monchi = new Player(this, x, y, "character", 2);
    this.canWin = false;
    this.canRot = true;

    if (this.levelIs == 2 && this.monchi) {
      this.monchi.setVelocity(300, 0);
    };

    /* CAMERAS */
    this.cameras.main.zoom = 0.95
    this.cameras.main.startFollow(this.monchi);
    this.cameraWidth = this.cameras.main.width;
    this.cameraHeight = this.cameras.main.height;

    /* TIMER */
    this.timerText = this.add.text(this.cameras.main.width - 120, 35, 'Time: 0', { fontSize: '32px' }).setOrigin(.5, .5).setScrollFactor(0, 0).setDepth(100).setSize(50, 50);
    var timePassed = 0;
    var timerEvent = this.time.addEvent({
      delay: 1000,
      callback: () => {
        timePassed++;
        this.timerText?.setText('Time: ' + timePassed);
        this.timeLevel = timePassed;
      },
      callbackScope: this,
      loop: true
    });

    /* COLLIDERS */
    this.map.addColliders()

    this.physics.world.on('worldbounds', (body: Phaser.Physics.Arcade.Sprite, top: boolean, down: boolean, left: boolean, right: boolean) => {
      if (down || top || left || right) {
        if (data.level == 1) {
          this.loseLevel1();
        } else if (data.level == 2) {
          this.loseLevel2();
        } else if (data.level == 0) {
          this.loseLevelTutorial();
        };
      };
    }, this);

  };

  update(this: Game) {

    //console.log("x = ", this.monchi?.x," y = " ,this.monchi?.y )
    /*if (this.mapShown == false) {
      this.showMap()
    } else if (this.mapShown) {
    */
    if (this.monchi && this.map) {
      if (this.monchi.x > this.map.checkPointPos.x) {
        this.checkPoint = 1;
      };
    };
    if (this.timerText && this.cameraNormal) {
      this.timerText.setPosition(this.cameras.main.width - 120, 35);
    } else if (this.timerText && this.cameraNormal == false) {
      this.timerText.setPosition(120, this.cameraHeight - 50);
    };
    if (this.map) this.map.update();
    if (this.EscKeyboard) this.EscKeyboard.on("down", () => {
      this.scene.start("Menu");
    })
  };
};

export default Game;