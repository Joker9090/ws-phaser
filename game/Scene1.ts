import Phaser from "phaser"
import Map0 from "./maps/Map0"
import player from "./assets/Player"
class Scene1 extends Phaser.Scene {
  berserk?: player
  map?: Map0
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys

  preload(this: Scene1) {
    this.load.spritesheet("run", "/game/Run.png", { frameWidth: 128, frameHeight: 128 })
    this.load.image("plataforma1", "/game/platform1.png")
    this.load.image("plataforma2", "/game/platform1B.png")
  }
  create(this: Scene1) {
    this.map = new Map0(this)
    const floor = this.map.createMap()
    this.berserk = new player(this,240,220,"run",0)


    this.physics.add.collider(this.berserk,floor)
    this.cursors = this.input.keyboard?.createCursorKeys()

    this.cameras.main.startFollow(this.berserk)

  }

  update() {
    if (this.berserk) this.berserk.checkMove(this.cursors)
  }
}

export default Scene1