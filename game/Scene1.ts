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
  }

  collectStar(star: any) {
    this.score += 200
    this.scoreText.setText("points: " + this.score)
    star.destroy()
    // if (stars.countActive(true) === 0) {
    //   stars.children.iterate(function (child: any) { stars.ennableBody(true, true) })
    // }
    this.speed += 1500
    console.log(this.speed)

  }

  lose() {
    console.log("lose", this.touchable)
    if (this.currentLife && this.touchable) {
      this.touchable = false
      this.currentLife -= 30
      console.log(this.currentLife, "vida")
      this.berserk?.setVelocityY(-100)
      setTimeout(() => {
        this.touchable = true
      }, 3000)
    }


  }

  create(this: Scene1) {
    this.map = new Map0(this, this.speed)
    this.add.image(1000, 400, "background").setScale(6)
    let x = 150
    let y = 620
    const { width, height } = this.game.canvas
    this.score = 0
    this.scoreText = this.add.text(20, 20, `points: ${this.score}`, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: 40 }).setDepth(1);

    const [floor, diamonds, saws] = this.map.createMap()
    this.diamonds = diamonds;

    this.berserk = new player(this, x, y, "run", 0)

    this.physics.add.collider(this.berserk, floor)
    this.physics.add.collider(this.berserk, saws, () => this.lose())

    this.cursors = this.input.keyboard?.createCursorKeys()

    this.physics.world.on('worldbounds', (body: Phaser.Physics.Arcade.Sprite, top: boolean, down: boolean, left: boolean, right: boolean) => {
      if (down || top) this.lose()
    }, this);
    this.cameras.main.setBounds(0, 0, 2500, 1000);
    this.cameras.main.startFollow(this.berserk, true)
    this.cameras.main.setZoom(0.9);


    this.life = this.add.tileSprite(width - 15, height - 82, 340, 140, "life").setOrigin(1, 0.5)
    this.lifeFilling = this.add.tileSprite(width - 15, height - 82, 340, 140, "lifeFilling").setOrigin(1, 0.5)
    this.lifeFilling.setCrop(0, 0, 0, 140)
    const graphics = this.add.graphics()


  }

  update() {

    if (this.lifeFilling) this.lifeFilling.setCrop(0, 0, 340 * this.currentLife / this.maxLife, 140)



    if (this.currentLife === 0) {
      this.scene.restart()
    }

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