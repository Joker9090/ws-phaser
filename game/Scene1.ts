
import Phaser, { DOWN } from "phaser";
import Player from "./assets/Player";
import Mapa from "./maps/Mapa1";
import Mapa2 from "./maps/Mapa2";
import Floor from "./assets/Floor";

// Scene in class
class Scene1 extends Phaser.Scene {
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  monchi?: Player;
  graphics?: Phaser.GameObjects.Graphics;
  map?: Mapa;
  canWin: boolean = false;
  canRot: boolean = true;
  normalito: boolean = true;
  gravityDown: boolean = true;
  startTime: number = 0;
  textTime?: Phaser.GameObjects.Text;
  lifes: number = 3;
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
    super({ key: 'Scene1' });
  };

  preload(this: Phaser.Scene) {

    this.load.spritesheet("character", "/game/character.png", { frameWidth: 220, frameHeight: 162 })
    this.load.image("background", "/game/background.png")
    this.load.image("plataformaA", "/game/platform1.png")
    this.load.image("plataformaB", "/game/platform1B.png")
    this.load.image("plataforma2", "/game/platform2.png")
    this.load.image("asteroid", "/game/asteroid.png")
    this.load.image("asteroid2", "/game/asteroid2.png")
    this.load.image("coin", "/game/coin.png")
    this.load.image("portal", "/game/portal.png")
    this.load.image("heart", "/game/heart.png")
    this.load.image("arrow", "/game/arrow.png")
    this.load.audio("song" , 'sounds/monchiSpace.mp3')
  }


  create(this: Scene1) {
    /* Audio */
    const music = this.sound.add('song').setVolume(0.1)
    music.play()

    /* Controls */
    this.cursors = this.input.keyboard?.createCursorKeys();
    this.map = new Mapa(this);
    this.map.createMap();
    const { x, y } = this.map.startingPoint;
    this.monchi = new Player(this, x, y, "character", 2);
    this.canWin = false;
    this.canRot = true;
    /* Camera */
    this.cameras.main.startFollow(this.monchi);



    const touch = () => {
      if (this.monchi) {
        this.monchi.idle();
      };
    };


    const float = () => {
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

    const rotateCam = () => {
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


    const noFloat = () => {
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

    const gameOver = () => {
      music.stop()
      this.lifes = 3
      this.normalito = true;
      this.scene.sleep();
      this.scene.switch("GameOver");
    };

    const lose = () => {
      this.lifes -= 1;
      if (this.lifes == 0) {
        gameOver();
      } else if(this.lifes != 0 && this.checkPoint == 0 && this.monchi){
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
        } else if (this.lifes != 0 && this.checkPoint == 1 && this.monchi){
        this.monchi.x = this.checkPointPos.x;
        this.monchi.y = this.checkPointPos.y;
        (this.map?.UIg?.getChildren()[this.lifes - 1] as Phaser.GameObjects.Image)
        .setVisible(false);
        }
      };


    const win = () => {
      if (this.canWin && this.monchi) {
        this.lifes = 3;
        music.stop()
        this.normalito = true;
        this.scene.sleep();
        this.scene.switch("Won");

      };
    };

    const movingFloorsGrav = () => {
      this.monchi?.setVelocityY(300);
    };

    const movingFloorsGravRot = () => {
      this.monchi?.setVelocityY(-300);
    };

    const coinCollected = () => {
      if (this.map?.coin) {
        this.map.portal?.setTint(0x00ff00);
        this.canWin = true;
        this.map.coin.setVisible(false);
        this.map.coin.clear(true);
        (this.map.UIg?.getChildren()[3] as Phaser.GameObjects.Image).clearTint();
      };
    };

    const timeTrack = () => {
      this.startTime = this.time.now
      this.textTime = this.add.text(this.cameras.main.width/2, 35, 'Time: 0', { fontSize: '32px' }).setScrollFactor(0, 0);
    };
    timeTrack()

    //colliders
    if (this.map.portal) this.map.portal.setTint(0xff0000);
    if (this.map.pisos) this.physics.add.collider(this.monchi, this.map.pisos, touch);
    if (this.map.pisos2) this.physics.add.collider(this.monchi, this.map.pisos2, float);
    if (this.map.pisos3) this.physics.add.collider(this.monchi, this.map.pisos3, rotateCam);
    if (this.map.coin) this.physics.add.overlap(this.monchi, this.map.coin, coinCollected);
    if (this.map.portal) this.physics.add.overlap(this.monchi, this.map.portal, win);
    if (this.map.pisos4) this.physics.add.collider(this.monchi, this.map.pisos4, noFloat);
    if (this.map.movingFloor) this.physics.add.collider(this.monchi, this.map.movingFloor, movingFloorsGrav);
    if (this.map.movingFloorRot) this.physics.add.collider(this.monchi, this.map.movingFloorRot, movingFloorsGravRot);

    this.physics.world.on('worldbounds', (body: Phaser.Physics.Arcade.Sprite, top: boolean, down: boolean, left: boolean, right: boolean) => {
      if (down || top || left || right) lose();
    }, this);
  };

  update(this: Scene1) {
    if(this.monchi){
      if(this.monchi.x > this.checkPointPos.x){
        this.checkPoint = 1;
      };
    };

    if (this.textTime) {
      let timePassed = this.time.now - this.startTime
      this.textTime.setText('Time: ' + Math.floor(timePassed/1000));
    };

    if (this.gravityDown === false) {
      (this.map?.UIg?.getChildren()[4] as Phaser.GameObjects.Image).setRotation(Math.PI * 3 / 2);
    } else { (this.map?.UIg?.getChildren()[4] as Phaser.GameObjects.Image).setRotation(Math.PI / 2) };

    /* Attach controls to player */
    if (this.monchi && this.normalito) {
      this.monchi.checkMove(this.cursors);
      if (this.map) this.map.animateBackground(this.monchi);
    }
    else if (this.monchi && this.normalito == false) {
      this.monchi?.checkMoveRot(this.cursors);
      if (this.map) this.map.animateBackground(this.monchi);
    };
    if (this.map?.UIg && this.normalito == false) {
      //console.log("entro")
      for (let i = 0; i < 4; i++) {
        (this.map?.UIg?.getChildren()[i] as Phaser.GameObjects.Image)
          .setRotation(Math.PI);
      };
    } else {
      for (let i = 0; i < 4; i++) {
        (this.map?.UIg?.getChildren()[i] as Phaser.GameObjects.Image)
          .setRotation(0);
      };
    };
  };
};

export default Scene1 