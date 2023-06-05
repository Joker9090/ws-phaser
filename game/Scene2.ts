
import Phaser, { DOWN } from "phaser";
import Player from "./assets/Player";
import Mapa from "./maps/Mapa2";

// Scene in class
class Scene2 extends Phaser.Scene {
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  monchi?: Player;
  graphics?: Phaser.GameObjects.Graphics;
  map?: Mapa;
  canWin: boolean = false;
  startTime: number = 0;
  textTime?: Phaser.GameObjects.Text;
  lifes: number = 3;
  checkPoint: number = 0;
  creative: boolean = true;
  startingPoint = {
    x: 500,
    y: 800,
  };

  constructor() {
    super({ key: 'Scene1' });
  };

  preload(this: Phaser.Scene) {

    this.load.spritesheet("character", "/game/character.png", { frameWidth: 220, frameHeight: 162 })
    this.load.image("background", "/game/background.png")
    this.load.image("plataformaA", "/game/platform1.png")
    this.load.image("plataformaB", "/game/platform1B.png")
    this.load.image("asteroid", "/game/asteroid.png")
    this.load.image("asteroid2", "/game/asteroid2.png")
    this.load.image("coin", "/game/coin.png")
    this.load.image("portal", "/game/portal.png")
    this.load.image("heart", "/game/heart.png")
    this.load.image("arrow", "/game/arrow.png")
    this.load.audio("song", 'sounds/monchiSpace.mp3')
  }


  create(this: Scene2) {
    /* Audio */
    //let songLoader = this.load.audio('song', ['sounds/monchiSpace.mp3'])
    //songLoader.on('filecomplete', () => this.sound.add('song').play())
    //songLoader.start()
    const music = this.sound.add('song')
    //music.play()

    //modo creative
    this.physics.world.gravity.y = 0;

    /* Controls */

    this.cursors = this.input.keyboard?.createCursorKeys();
    this.map = new Mapa(this);
    this.map.createMap();
    const { x, y } = this.map.startingPoint;
    this.monchi = new Player(this, x, y, "character", 2);
    this.canWin = false;

    /* Camera */
    this.cameras.main.startFollow(this.monchi);


    const touch = () => {
      if (this.monchi) {
        this.monchi.idle();
      };
    };

    const gameOver = () => {
      music.stop()
      this.lifes = 3
      this.scene.sleep();
      this.scene.switch("GameOver");
    };

    const lose = () => {
      this.lifes -= 1;
      if (this.lifes == 0) {
        gameOver();
      } else if (this.lifes != 0 && this.checkPoint == 0 && this.monchi) {
        this.monchi?.setFlipY(false);
        this.monchi?.setBounceY(0);
        this.monchi?.body?.setOffset(70, 50);
        this.cameras.main.setRotation(0);
        this.monchi?.setGravity(0);
        this.monchi.x = this.startingPoint.x;
        this.monchi.y = this.startingPoint.y;
        (this.map?.UIg?.getChildren()[this.lifes - 1] as Phaser.GameObjects.Image)
          .setVisible(false);
      };
    };


    const win = () => {
      if (this.canWin && this.monchi) {
        this.lifes = 3;
        music.stop()
        this.scene.sleep();
        this.scene.switch("Won");

      };
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
      this.textTime = this.add.text(this.cameras.main.width / 2, 35, 'Time: 0', { fontSize: '32px' }).setScrollFactor(0, 0);
    };
    timeTrack()

    //colliders
    if (this.map.portal) this.map.portal.setTint(0xff0000);
    //if (this.map.pisos) this.physics.add.collider(this.monchi, this.map.pisos, touch);
    if (this.map.coin) this.physics.add.overlap(this.monchi, this.map.coin, coinCollected);
    if (this.map.portal) this.physics.add.overlap(this.monchi, this.map.portal, win);


    this.physics.world.on('worldbounds', (body: Phaser.Physics.Arcade.Sprite, top: boolean, down: boolean, left: boolean, right: boolean) => {
      if (down || top || left || right) lose();
    }, this);


    //creative
    
      this.textTime = this.add.text(this.cameras.main.width/2 - 500, this.cameras.main.height/2, 'Coordenadas: ', { fontSize: '32px' }).setScrollFactor(0, 0);

  };

  update(this: Scene2) {

    //modo creative
    if (this.textTime) {
      let timePassed = this.time.now - this.startTime
      this.textTime.setText('Time: ' + Math.floor(timePassed/1000));
    };
    if (this.cursors) {

      // Creative mode controls
      if (this.monchi) {
        this.monchi.checkMoveCreative(this.cursors);
        if (this.map) this.map.animateBackground(this.monchi);
      };

    };
  };
};
export default Scene2