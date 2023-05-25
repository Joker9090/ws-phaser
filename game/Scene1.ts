import Phaser from "phaser"
import Map0 from "./maps/Map0"
import player from "./assets/Player"
import { World } from "matter"
import { setOriginalNode } from "typescript"
class Scene1 extends Phaser.Scene {
  berserk?: player
  map?: Map0
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys
  diamonds?: any
  // goal?: Phaser.GameObjects.Sprite
  score?: any;
  scoreText?: any
  touchable: boolean = true
  speed: number = 2000
  life?: Phaser.GameObjects.TileSprite
  lifeFilling?: Phaser.GameObjects.TileSprite
  maxLife: number = 100
  currentLife: number = 100
  x?: number
  y?: number

  preload(this: Scene1) {
    this.load.spritesheet("run", "/game/Run.png", { frameWidth: 128, frameHeight: 128 })
    this.load.image("plataforma1", "/game/platform1.png")
    this.load.image("plataforma2", "/game/platform2.png")
    this.load.image("plataforma3", "/game/platform1B.png")
    this.load.image("saw", "/game/sierra5.png")
    this.load.image("background", "/game/background.png")
    this.load.image("diamond", "/game/diamante2.png")
    this.load.image("life", "/game/life.png")
    this.load.image("lifeFilling", "/game/lifeRelleno.png")
    this.load.image("close", "/game/close.png")

  }

  collectStar(star: any) {
    star.destroy()

    this.speed += 1500
    console.log(this.speed)

  }
  lose() {
    this.scene.restart()
  }
  hitSaw() {
    console.log("lose", this.touchable)
    if (this.currentLife && this.touchable === true) {
      this.touchable = false
      this.berserk?.setAlpha(0.5)
      this.currentLife -= 30
      console.log(this.currentLife, "vida")
      this.berserk?.setVelocityY(-100)
      if (this.currentLife <= 0) {
        this.lose()
        this.currentLife = 100
      }

      setTimeout(() => {
        this.touchable = true
        this.berserk?.setAlpha(1)
      }, 400)
    }


  }

  create(this: Scene1) {
    this.map = new Map0(this, this.speed)
    this.add.image(1000, 400, "background").setScale(6)

    let x = 150
    let y = 620

    const { width, height } = this.game.canvas
    const [floor, diamonds, saws] = this.map.createMap()
    this.diamonds = diamonds;

    this.berserk = new player(this, x, y, "run", 0)

    this.physics.add.collider(this.berserk, floor)
    this.physics.add.collider(this.berserk, saws, () => this.hitSaw())

    this.cursors = this.input.keyboard?.createCursorKeys()

    this.physics.world.on('worldbounds', (body: Phaser.Physics.Arcade.Sprite, top: boolean, down: boolean, left: boolean, right: boolean) => {
      if (down || top) this.lose()
    }, this);
    this.cameras.main.setBounds(0, 0, 2500, 1000);
    this.cameras.main.startFollow(this.berserk, true)
    this.cameras.main.setZoom(0.9);


    this.life = this.add.tileSprite(width - 1610, height - 930, 0, 0, "life").setOrigin(1, 0.5).setScrollFactor(0).setScale(1.2)
    this.lifeFilling = this.add.tileSprite(width - 1610, height - 916, -100, 0, "lifeFilling").setOrigin(1, 0.5).setScrollFactor(0).setScale(1.2)
    // this.lifeFilling.setCrop(0, 0, 0, 140)
    const graphics = this.add.graphics()


  }

  update() {
    this.x = this.berserk?.x
    this.y = this.berserk?.y
    // console.log(this.y, this.x)
    if (this.lifeFilling) this.lifeFilling.setCrop(0, 0, 340 * this.currentLife / this.maxLife, 140)



    if (this.berserk) {
      this.berserk.checkMove(this.cursors)
      this.diamonds.children.iterate((child: Phaser.GameObjects.Sprite) => {
        if (child && this.berserk && Phaser.Geom.Rectangle.Overlaps(this.berserk.getBounds(), child.getBounds())) this.collectStar(child)
      })
      if (this.diamonds.countActive(true) === 0) {

      }
    }
  }
}
export default Scene1