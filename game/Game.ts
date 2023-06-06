
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
  lifes: number = 3;

  music?: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
  canWin: boolean = false;
  canRot: boolean = true;

  normalito: boolean = true;
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


  float() {
    if (this.monchi) {
      this.monchi.setBounce(0.1);
      this.monchi.setGravityY(-2000);
      this.time.delayedCall(1000, () => {
        this.monchi?.setFlipY(true);
        this.gravityDown = false;
        this.monchi?.body?.setOffset(70, 0);
        this.monchi?.setBounceY(0);
      });
    }
  };

  rotateCam(){
    this.normalito = false;
    if (this.canRot) {
      let rotation = 0;
      for (let i = 0; i < 25; i++) {
        this.time.delayedCall(10 * i, () => ((rotate) => {
          this.cameras.main.setRotation(rotate);
        })(3.1415 * i / 24));
        if (i == 24) { this.canRot = false };
      };
    };
  };

  noFloat(){
    this.normalito = true;
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
    this.normalito = true;
    this.scene.sleep();
    this.scene.switch("GameOver");
  };

  lose(){
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
      this.normalito = true;
      this.monchi.x = this.startingPoint.x;
      this.monchi.y = this.startingPoint.y;
      (this.map?.UIg?.getChildren()[this.lifes - 1] as Phaser.GameObjects.Image)
        .setVisible(false);
    } else if (this.lifes != 0 && this.checkPoint == 1 && this.monchi) {
      this.monchi.x = this.checkPointPos.x;
      this.monchi.y = this.checkPointPos.y;
      (this.map?.UIg?.getChildren()[this.lifes - 1] as Phaser.GameObjects.Image)
        .setVisible(false);
    }
  };

  win(){
    if (this.canWin && this.monchi) {
      this.lifes = 3;
      if(this.music) this.music.stop()
      this.normalito = true;
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
    console.log("coinCollected", this.map)
    if (this.map?.coin) {
      this.map.portal?.setTint(0x00ff00);
      this.canWin = true;
      this.map.coin.setVisible(false);
      this.map.coin.clear(true);
      (this.map.UIg?.getChildren()[3] as Phaser.GameObjects.Image).clearTint();
    };
  };


  create(this: Game, data: { level: number, lifes: number }) {

    switch (data.level) {
      case 1:
        this.map = new Mapa1(this);
        break;
      case 2:
        this.map = new Mapa2(this);
        break;
      default:
        this.map = new Mapa1(this);
        break;
    }
    if (data.lifes) this.lifes = data.lifes;
    this.map.createMap(data);

    /* Audio */
    
    this.music = this.sound.add('song')
    // music.play()

    /* Controls */
    this.cursors = this.input.keyboard?.createCursorKeys();
    const { x, y } = this.map.startingPoint;
    this.monchi = new Player(this, x, y, "character", 2);
    this.canWin = false;
    this.canRot = true;

    /* Camera */
    this.cameras.main.startFollow(this.monchi);


    const timeTrack = () => {
      this.startTime = this.time.now
      this.textTime = this.add.text(this.cameras.main.width / 2, 35, 'Time: 0', { fontSize: '32px' }).setScrollFactor(0, 0);
    };
    timeTrack()

    //colliders+
    this.map.addColliders()
    
    this.physics.world.on('worldbounds', (body: Phaser.Physics.Arcade.Sprite, top: boolean, down: boolean, left: boolean, right: boolean) => {
      if (down || top || left || right) this.lose();
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