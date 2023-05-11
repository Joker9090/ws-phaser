import Phaser from "phaser"
import Map0 from "./maps/Map0"
import player from "./assets/Player"
import { World } from "matter"
class Scene1 extends Phaser.Scene {
  berserk?: player
  map?: Map0
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys

  // goal?: Phaser.GameObjects.Sprite

  preload(this: Scene1) {
    let points = 10
    this.load.spritesheet("run", "/game/run.png", { frameWidth: 128, frameHeight: 128 })
    this.load.image("plataforma1", "/game/platform1.png")
    this.load.image("plataforma2", "/game/platform1B.png")
    this.load.image("sword", "/game/sword.png")
    this.load.image("background", "/game/background.png")
    this.load.spritesheet("star", "/game/star.png", { frameWidth: 32, frameHeight: 32 })
    // this.add.text(0, 500,  `points: ${points}`, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
  }
  create(this: Scene1) {
    this.map = new Map0(this)
    this.add.image(1000, 400, "background").setScale(6)

    let x = 60
    let y = 220

    const [floor, stars, swords] = this.map.createMap()


    this.berserk = new player(this, x, y, "run", 0)
    // this.cameras.main.startFollow(this.berserk)


    // const touchStar = () => {
    //   this.berserk?.setX(x)
    //   this.berserk?.setY(y)
    // }
    const lose = () => {
      this.scene.restart()
    }
    const collectStar = (player: any, star: any) => {
      star.disableBody(true, true);
      if (stars.countActive(true) === 0) {
        stars.children.iterate(function (child: any) { console.log("LISTO") })
      }
    }

    this.physics.add.collider(this.berserk, floor, )
    this.physics.add.collider(this.berserk, swords,lose)
    this.physics.add.collider(this.berserk, stars, collectStar)


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