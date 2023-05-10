
import Phaser from "phaser";
import Player from "./assets/Player";
import Map0 from "./maps/Map0";
// Scene in class
class Scene1 extends Phaser.Scene {
  monchi?: Player
  map?: Map0
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys 

  preload(this: Scene1) {
    this.load.spritesheet("character", "/game/spritesheetCat.png", { frameWidth: 110, frameHeight: 200 });
    this.load.image("plataformaA", "/game/base1.png");
    this.load.image("this.player.setVelocityY(-330);plataformaB", "/game/base2.png");
    this.load.image("background", '/game/sky1.png');
    this.load.image("nubes1", '/game/sky2.png');
    this.load.image("nubes2", '/game/sky3.png');
    this.load.image("cueva", '/game/cueva.png');
    this.load.image("cuevaArriba", '/game/cuevaArriba.png');
    
  }


  create(this: Scene1) {

    this.map = new Map0(this);
    this.monchi = new Player(this, 0, 100, "character", 14).setDepth(10);
    
    const floor = this.map.createMap()

    this.physics.add.collider(this.monchi, floor);
    
    this.cameras.main.startFollow(this.monchi).postFX.addVignette(0.5, 0.5, 0.7)

    this.cursors = this.input.keyboard?.createCursorKeys()

    const lose = () => {
      this.scene.restart()
    }

    this.physics.world.on('worldbounds', (body: Phaser.Physics.Arcade.Sprite,top: boolean,down: boolean,left: boolean,right: boolean) => {
      if(down) lose()
    },this);
  }

  update(this: Scene1) {
    if (this.monchi) this.monchi.checkMove(this.cursors)
  }

}

export default Scene1 