import Phaser from "phaser"
import Map0 from "./maps/Map0"
import player from "./assets/Player"
import { World } from "matter"
class Scene1 extends Phaser.Scene {
  berserk?: player
  map?: Map0
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys
  stars?: any
  // goal?: Phaser.GameObjects.Sprite
  score?: any;
  scoreText?: any
  touchable: boolean = true
  preload(this: Scene1) {
    this.load.spritesheet("run", "/game/Run.png", { frameWidth: 128, frameHeight: 128 })
    this.load.image("plataforma1", "/game/platform1.png")
    this.load.image("plataforma2", "/game/platform1B .png")
    this.load.image("sword", "/game/sword.png")
    this.load.image("background", "/game/background.png")
    this.load.spritesheet("star", "/game/star.png", { frameWidth: 32, frameHeight: 32 })
  }

  collectStar(star: any) {
    this.score += 200
    this.scoreText.setText("points: " + this.score)
    star.destroy()
    // if (stars.countActive(true) === 0) {
    //   stars.children.iterate(function (child: any) { stars.ennableBody(true, true) })
    // }
  }
  
  lose() {
    console.log("lose", this.touchable)
    if (this.touchable == true && this.berserk !== undefined) {
      let x = 60
      let y = 220
      this.berserk?.setVelocityX(-300)
      this.score -= 200
      this.scoreText.setText("points: " + this.score)
      this.berserk?.setAlpha(0.5)
      this.touchable = false
      this.berserk.setPosition(x, y)

      setTimeout(() => {
        this.berserk?.setAlpha(1)
        this.touchable = true
      }, 2000)
    }
    if (this.score < 0) {
      this.scoreText.setText("YOU LOSE")
      setTimeout(() => { this.scene.restart }, 1000)
    }
  }

  create(this: Scene1) {
    this.map = new Map0(this)
    this.add.image(1000, 400, "background").setScale(6)
    let x = 60
    let y = 220
    this.score = 0
    this.scoreText = this.add.text(20, 20, `points: ${this.score}`, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: 40 }).setDepth(1);

    const [floor, stars, swords] = this.map.createMap()
    this.stars = stars;

    this.berserk = new player(this, x, y, "run", 0)



    this.physics.add.collider(this.berserk, floor)
    this.physics.add.collider(this.berserk, swords, () => this.lose())


    this.cursors = this.input.keyboard?.createCursorKeys()

    this.physics.world.on('worldbounds', (body: Phaser.Physics.Arcade.Sprite, top: boolean, down: boolean, left: boolean, right: boolean) => {
      if (down) this.lose()
    }, this);

    this.cameras.main.startFollow(this.berserk)
  }

  update() {
    if (this.berserk) {
      this.berserk.checkMove(this.cursors)
      this.stars.children.iterate((child: Phaser.GameObjects.Sprite) => { 
        if (child && this.berserk && Phaser.Geom.Rectangle.Overlaps(this.berserk.getBounds(), child.getBounds())) this.collectStar(child)
      })
    }
  }
}
export default Scene1