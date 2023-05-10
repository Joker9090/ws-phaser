
import Phaser from "phaser";
import Player from "./assets/Player";
import Map0 from "./maps/Map0";
// Scene in class
class Scene1 extends Phaser.Scene {
  monchi?: Player
  map?: Map0
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys 

  preload(this: Scene1) {
    this.load.spritesheet("character", "/game/character.png", { frameWidth: 220, frameHeight: 162 });
    this.load.image("plataformaA", "/game/platform1.png");
    this.load.image("sky", "/game/background.png");
    this.load.image("nubee","/game/nube.png");
    this.load.image("crystal" ,"/game/Yellow_crystal1.png");
    this.load.image("tree","/game/tree.png");
    //this.load.image("this.player.setVelocityY(-330);plataformaB", "/game/platform1B.png");
  }


  create(this: Scene1) {

    this.map = new Map0(this);
    
    const floor = this.map.createMap()
    this.monchi = new Player(this, 100, 100, "character", 2);

    this.physics.add.collider(this.monchi, floor);
    
    this.cameras.main.startFollow(this.monchi)

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