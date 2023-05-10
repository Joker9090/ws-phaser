import Phaser from "phaser"
import Map0 from "./maps/Map0"
import player from "./assets/Player"
class Scene1 extends Phaser.Scene {
  berserk?: player
  map?: Map0
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys


  preload(this: Scene1) {
    this.load.spritesheet("run", "/public/assets/Run.png", { frameWidth: 128, frameHeight: 128 })
    this.load.image("plataforma1", "/public/game/platform1.png")
    this.load.image("plataforma2", "/public/game/platform1b.png")
  }
  create(this: Scene1) {
    this.map = new Map0(this)
    const floor = this.map.createMap()
  }
}

export default Scene1