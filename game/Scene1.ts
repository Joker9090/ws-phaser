
import Phaser from "phaser";
import Player from "./assets/Player";
import Mapa from "./maps/Mapa1";

// Scene in class
class Scene1 extends Phaser.Scene {
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys
  monchi?: Player
  graphics?: Phaser.GameObjects.Graphics
  map?: Mapa
  canWin: boolean = false
  preload(this: Phaser.Scene) {
    /* Load assets for game */
    this.load.spritesheet("character", "/game/character.png", { frameWidth: 220, frameHeight: 162 });
    this.load.image("background", "/game/background.png");
    this.load.image("plataformaA", "/game/platform1.png");
    this.load.image("plataformaB", "/game/platform1B.png");
    this.load.image("plataforma2", "/game/platform2.png");
    this.load.image("cloud", "/game/cloud.png");
    this.load.image("coin", "/game/coin.png");
    this.load.image("portal", "/game/portal.png")
  }


  create(this: Scene1) {
    this.map = new Mapa(this);
    this.map.createMap();
    const { x, y } = this.map.startingPoint;
    this.monchi = new Player(this, x, y, "character", 2); // this.physics.add.sprite(100, 100, "character", 2).setScale(0.5);
    this.canWin = false
    /* Camera */
    this.cameras.main.startFollow(this.monchi)
    if(this.map.portal) this.map.portal.setTint(0xff0000)

    const touch = () => {
      if (this.monchi) this.monchi.idle()
    }
    const float = () => {
      if (this.monchi) {
        // this.physics.world.gravity.set(0,-1200)
        // this.monchi.setBounce()
        this.monchi.setGravityY(-1270)
      }
    }
    const noFloat = () => {
      if (this.monchi) this.monchi.setGravity(0)
    }
    const lose = () => {
      this.scene.restart()
    }
    const win = () => {
      if(this.canWin){
        //
      }
    }
    const coinCollected = () => {
      if (this.map?.coin) {
        this.map.portal?.setTint(0x00ff00);
        this.canWin = true
        this.map.coin.setVisible(false);
      }
    }
    if (this.map.pisos) this.physics.add.collider(this.monchi, this.map.pisos, touch);
    if (this.map.pisos2) this.physics.add.collider(this.monchi, this.map.pisos2, float);
    if (this.map.pisos3) this.physics.add.collider(this.monchi, this.map.pisos3, noFloat);
    if (this.map.coin) this.physics.add.overlap(this.monchi, this.map.coin, coinCollected);
    if (this.map.portal) this.physics.add.overlap(this.monchi, this.map.portal, win);

    this.physics.world.on('worldbounds', (body: Phaser.Physics.Arcade.Sprite, top: boolean, down: boolean, left: boolean, right: boolean) => {
      if (down || top) lose()
    }, this);
    //  .on('worldbounds', lose, this)

    /* Controls */
    this.cursors = this.input.keyboard?.createCursorKeys()

  }

  update(this: Scene1) {
    /* Attach controls to player */
    if (this.monchi) {
      this.monchi.checkMove(this.cursors)
      if(this.map) this.map.animateBackground(this.monchi)
    }

  }
}

export default Scene1 