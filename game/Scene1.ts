import Phaser from "phaser"
import Map0 from "./maps/Map0"
import player from "./assets/Player"
import { World } from "matter"
class Scene1 extends Phaser.Scene {
  berserk?: player
  map?: Map0
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys

  preload(this: Scene1) {
    this.load.spritesheet("run", "/game/run.png", { frameWidth: 128, frameHeight: 128 })
    this.load.image("plataforma1", "/game/platform1.png")
    this.load.image("plataforma2", "/game/platform1B.png")
    this.load.image("background", "/game/background.png")
    this.load.spritesheet("star", "/game/star.png", { frameWidth: 32, frameHeight: 32 })
  }
  create(this: Scene1) {
    this.map = new Map0(this)
    const floor = this.map.createMap()
    const goal = this.map.createMap()
    this.berserk = new player(this, 60, 220, "run", 0)
    this.cameras.main.startFollow(this.berserk)

    
        const lose = () => {
          this.scene.restart()
        }

    this.physics.add.collider(this.berserk, floor)
    this.physics.add.collider(this.berserk, goal)
    
    this.cursors = this.input.keyboard?.createCursorKeys()

    this.physics.world.on('worldbounds', (body: Phaser.Physics.Arcade.Sprite, top: boolean, down: boolean, left: boolean, right: boolean) => {
      if (down) lose()
    }, this);

  }

  update() {
    if (this.berserk) this.berserk.checkMove(this.cursors)
  }
}

export default Scene1