
import Phaser from "phaser";
import Player from "./assets/Player";
import Map0 from "./maps/Map0";
import { finished } from "stream";
// Scene in class

let finishedCircuit = false

class Scene1 extends Phaser.Scene {
  monchi?: Player
  map?: Map0
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys 

  
  preload(this: Scene1) {
    this.load.spritesheet("character", "/game/character.png", { frameWidth: 220, frameHeight: 162 });
    this.load.image("plataformaA", "/game/platform1.png");
    this.load.image("plataformaB", "/game/platform1B.png");
  }


  create(this: Scene1) {

    this.map = new Map0(this)
    this.monchi = new Player(this, 100, 100, "character", 2)

    

    const [floor, finishFloor] = this.map.createMap()

    const lose = () => {
      this.scene.restart()
    }

    this.physics.add.collider(this.monchi, floor)
    //this.physics.add.collider(this.monchi, finishFloor)
    this.physics.add.collider(this.monchi, finishFloor, function () {
      finishedCircuit = true
    })

    // this.physics.overlap(this.monchi, finishFloor,() => {finishedCircuit = true})
    this.cameras.main.startFollow(this.monchi)

    this.cursors = this.input.keyboard?.createCursorKeys()

   

    this.physics.world.on('worldbounds', (body: Phaser.Physics.Arcade.Sprite,top: boolean,down: boolean,left: boolean,right: boolean) => {
      if(down) lose()
    },this);
  }

  update(this: Scene1) {
    
    if (this.monchi) {this.monchi.checkMove(this.cursors)}

    if (finishedCircuit) {console.log("ola")}
    finishedCircuit = false
  }
  
}

export default Scene1 