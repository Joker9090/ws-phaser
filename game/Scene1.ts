
import Phaser from "phaser";
import Player from "./assets/Player";
import Mapa from "./maps/Mapa1";

// Scene in class
class Scene1 extends Phaser.Scene {
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys
  monchi?: Player
  graphics?: Phaser.GameObjects.Graphics
  map?: Mapa
  preload(this: Phaser.Scene) {
    /* Load assets for game */
    this.load.spritesheet("character", "/game/character.png", { frameWidth: 220, frameHeight: 162 });
    this.load.image("background", "/game/background.png");
    this.load.image("plataformaA", "/game/platform1.png");
    this.load.image("plataformaB", "/game/platform1B.png");
    this.load.image("plataforma2", "/game/platform2.png");
    this.load.image("cloud", "/game/cloud.png");
  }


  create(this: Scene1) {
    this.map = new Mapa(this);
    this.map.createMap();
    const { x, y } = this.map.startingPoint;
    this.monchi = new Player(this, x, y, "character", 2); // this.physics.add.sprite(100, 100, "character", 2).setScale(0.5);

    /* Camera */
    this.cameras.main.startFollow(this.monchi)


    const touch = () => {
      if (this.monchi) this.monchi.idle()
    }

    const lose = () => {
      this.scene.restart()
    }

    if (this.map.pisos) this.physics.add.collider(this.monchi, this.map.pisos, touch);

    this.physics.world.on('worldbounds', (body: Phaser.Physics.Arcade.Sprite, top: boolean, down: boolean, left: boolean, right: boolean) => {
      if (down) lose()
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