
import Phaser from "phaser";

import Player from "./assets/Player";

import Mapa1 from "./maps/Mapa1";
import Mapa2 from "./maps/Mapa2";
import Tutorial from "./maps/Tutorial";

// Scene in class
class Game extends Phaser.Scene {
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  monchi?: Player;
  graphics?: Phaser.GameObjects.Graphics;
  map?: Mapa1 | Mapa2;
  lifes?: number;
  levelIs?: number;
  timeLevel: number = 0;

  music?: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
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

  constructor() {
    super({ key: 'Game' });
  };

  /*  
  */
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

  touch() {
    if (this.monchi) {
      this.monchi.idle();
      this.monchi.setVelocityX(0); //check if working properly
    };
  };


  float(time: number) {
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
    if (this.music) this.music.stop();
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
    if (this.canWin && this.monchi) {
      if (this.music) this.music.stop();
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

  coinCollected() {
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

  noFloatTutorial() {
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
        this.noFloatTutorial();
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
        this.float(0);
        this.cameraNormal = true;
        this.canRot = true;
        this.rotateCam(0);
        if (this.map) this.monchi.x = this.map.checkPointPos.x;
        if (this.map) this.monchi.y = this.map.checkPointPos.y;
      } else if (this.lifes != 0 && this.checkPoint == 1 && this.monchi && this.cameraNormal) {
        this.float(0);
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

  create(this: Game, data: { level: number, lifes: number }) {

    /* DEBUG DE NIVEL */
    //data.level = 2
    //data.lifes = 3
    /* DEBUG DE NIVEL */

    /* CHOSE LEVEL, LIFES AND AUDIO */
    switch (data.level) {
      case 0:
        this.map = new Tutorial(this);
        this.music = this.sound.add('songTutorial').setVolume(0.3);
        break;
      case 1:
        this.map = new Mapa1(this);
        this.music = this.sound.add('songLevel1').setVolume(0.3);
        break;
      case 2:
        this.map = new Mapa2(this);
        this.music = this.sound.add('songLevel2').setVolume(0.3);
        break;
      default:
        this.map = new Mapa1(this);
        this.music = this.sound.add('songLevel1').setVolume(0.3);
        break;
    };

    if (data.level == 0) {
      this.levelIs = 0;
      this.monchi?.setVelocity(300, 0);
    };

    /* CREATE MAP AND LFIES */
    if (data.lifes) this.lifes = data.lifes;
    this.map.createMap(data);

    /* SET AUDIO */
    this.music.play();

    /* CONTROLS */
    this.cursors = this.input.keyboard?.createCursorKeys();
    const { x, y } = this.map.startingPoint;
    this.monchi = new Player(this, x, y, "character", 2);
    this.canWin = false;
    this.canRot = true;

    /* CAMERAS */
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
  };
};

export default Game;