
import Phaser from "phaser";

import Player from "./assets/Player";

import Mapa1 from "./maps/Mapa1";
import Mapa2 from "./maps/Mapa2";

// Scene in class
class Game extends Phaser.Scene {
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  monchi?: Player;
  graphics?: Phaser.GameObjects.Graphics;
  map?: Mapa1 | Mapa2;
  lifes?: number;

  music?: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
  canWin: boolean = false;
  nextLevel: boolean = false;
  canRot: boolean = true;

  cameraNormal: boolean = true;
  gravityDown: boolean = true;

  startTime: number = 0;
  textTime?: Phaser.GameObjects.Text;
  checkPoint: number = 0;

  startingPoint = {
    x: 500,
    y: 800,
  };

  checkPointPos = {
    x: 3000,
    y: 600,
  };

  constructor() {
    super({ key: 'Game' });
  };

  // preload(this: Phaser.Scene) {

  //   this.load.spritesheet("character", "/game/character.png", { frameWidth: 220, frameHeight: 162 })
  //   this.load.image("background", "/game/background.png")
  //   this.load.image("plataformaA", "/game/platform1.png")
  //   this.load.image("plataformaB", "/game/platform1B.png")
  //   this.load.image("plataforma2", "/game/platform2.png")
  //   this.load.image("asteroid", "/game/asteroid.png")
  //   this.load.image("asteroid2", "/game/asteroid2.png")
  //   this.load.image("coin", "/game/coin.png")
  //   this.load.image("portal", "/game/portal.png")
  //   this.load.image("heart", "/game/heart.png")
  //   this.load.image("arrow", "/game/arrow.png")
  //   this.load.audio("song" , 'sounds/monchiSpace.mp3')
  // }



  touch() {
    if (this.monchi) {
      this.monchi.idle();
    };
  };


  float(time:number) {
    if (this.monchi) {
      this.monchi.setBounce(0.1);
      this.monchi.setGravityY(-2000);
      this.time.delayedCall(time, () => {
        this.monchi?.setFlipY(true);
        this.gravityDown = false;
        this.monchi?.body?.setOffset(70, 0);
        this.monchi?.setBounceY(0);
      });
    }
  };

  rotateCam(time:number){
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

  noFloat(){
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

  gameOver(){
    if(this.music) this.music.stop()
    this.lifes = 3
    this.cameraNormal = true;
    this.scene.sleep();
    this.scene.switch("GameOver");
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
        this.monchi.x = this.startingPoint.x;
        this.monchi.y = this.startingPoint.y;
      } else if (this.lifes != 0 && this.checkPoint == 1 && this.monchi && this.cameraNormal == false) {
        this.float(0);
        this.cameraNormal = true
        this.canRot = true
        this.rotateCam(0);
        this.monchi.x = this.checkPointPos.x;
        this.monchi.y = this.checkPointPos.y;
        (this.map?.lifesGroup?.getChildren()[this.lifes - 1] as Phaser.GameObjects.Image)
          .setVisible(false);
      } else if (this.lifes != 0 && this.checkPoint == 1 && this.monchi && this.cameraNormal) {
        this.float(0);
        this.canRot = true
        this.monchi.x = this.checkPointPos.x;
        this.monchi.y = this.checkPointPos.y;
      }
      if (this.lifes != 0) {
        let lifeToTheRight = null;
        let highestX = Number.NEGATIVE_INFINITY;
        for (let i = 0; i < this.lifes + 1; i++) {
          console.log(this.lifes)
          const child = (this.map?.lifesGroup?.getChildren()[i] as Phaser.GameObjects.Image);
          if (child.x > highestX) {
            lifeToTheRight = child;
            highestX = child.x;
          };
          // Remove the object with the highest x position
        }
        lifeToTheRight?.setVisible(false);
      };
    };
  }

  win(){
    if (this.canWin && this.monchi) {
      if(this.music) this.music.stop()
      this.cameraNormal = true;
      this.scene.sleep();
      this.scene.switch("Won");

    };
  };

  movingFloorsGrav(){
    this.monchi?.setVelocityY(300);
  };

  movingFloorsGravRot(){
    this.monchi?.setVelocityY(-300);
  };

  coinCollected(){
    if (this.map?.coin) {
      (this.map.portal?.getChildren()[0] as Phaser.GameObjects.Image).clearTint();
      this.nextLevel = true;
      this.map.coin.setVisible(false);
      this.map.coin.clear(true);
    };
  };

  // no ta andanding
  goNextLevel(){
    console.log("next level", this.nextLevel, this.lifes)
    if (this.nextLevel && this.monchi) {
      this.cameraNormal = true;
      this.scene.restart({ level: 2, lifes: this.lifes });
    };
  }

  create(this: Game, data: { level: number, lifes: number }) {
   

    /* CHOSE LEVEL, LIFES AND AUDIO */
    switch (data.level) {
      case 1:
        this.map = new Mapa1(this);
        this.music = this.sound.add('song').setVolume(0.3)
        break;
      case 2:
        this.map = new Mapa2(this);
        this.music = this.sound.add('song').setVolume(0.3)
        break;
      default:
        this.map = new Mapa1(this);
        this.music = this.sound.add('song').setVolume(0.3)
        break;
    }
    if (data.lifes) this.lifes = data.lifes;
    this.map.createMap(data);

    /* SET AUDIO */
    
    this.music.play()

    /* CONTROLS */
    this.cursors = this.input.keyboard?.createCursorKeys();
    const { x, y } = this.map.startingPoint;
    this.monchi = new Player(this, x, y, "character", 2);
    this.canWin = false;
    this.canRot = true;

    /* CAMERA */
    this.cameras.main.startFollow(this.monchi);


    const timeTrack = () => {
      this.startTime = this.time.now
      this.textTime = this.add.text(this.cameras.main.width / 2, 35, 'Time: 0', { fontSize: '32px' }).setScrollFactor(0, 0);
    };
    timeTrack()

    //colliders+
    this.map.addColliders()
    
    this.physics.world.on('worldbounds', (body: Phaser.Physics.Arcade.Sprite, top: boolean, down: boolean, left: boolean, right: boolean) => {
      if (down || top || left || right) this.loseLevel1();
    }, this);

  };

  update(this: Game) {
    
    if (this.monchi) {
      if (this.monchi.x > this.checkPointPos.x) {
        this.checkPoint = 1;
      };
    };

    if (this.textTime) {
      let timePassed = this.time.now - this.startTime
      this.textTime.setText('Time: ' + Math.floor(timePassed / 1000));
    };

    if(this.map) this.map.update()
  };
};

export default Game 