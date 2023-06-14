import Phaser from "phaser";

class player extends Phaser.Physics.Arcade.Sprite {
  isJumping?: boolean = false;
  isAttacking?: boolean = false;
  _direction?: string = "down"
  swordHitBox?: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  gravityForce: number = 1200;
  initialVelocity: number = 2000;
  health: number = 2
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: number) {
    super(scene, x, y, texture, frame)

    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.createAnims(scene, texture)
    this.setCollideWorldBounds(true)
    this.setDepth(1)
    if (this.body) {
      const body = (this.body as Phaser.Physics.Arcade.Body)
      body.onWorldBounds = true;
      this.body.setSize(30, 60, true).setOffset(50, 70);
    }
    this.setGravityY(3270)
  }

  getHealth() {
    return this.health
  }

  createAnims(scene: Phaser.Scene, texture: string) {
    const runAnimFrames = scene.anims.generateFrameNumbers(texture, { frames: [0, 1, 2, 3, 4, 5, 0] })
    const idleAnimFrames = scene.anims.generateFrameNames(texture, { frames: [0, 1, 0] })
    const jumpAnimFrames = scene.anims.generateFrameNames(texture, { frames: [0, 1, 2, 3, 4, 5, 0] })

    const berserkMoveConfig = {
      key: "run",
      frames: runAnimFrames,
      frameRate: 10,
      repeat: -1,
    }
    const berserkIdleConfig = {
      key: "idle",
      frames: idleAnimFrames,
      frameRate: 10,
      repeat: 0,
    }
    const berserkJumpConfig = {
      key: "jump",
      frames: jumpAnimFrames,
      frameRate: 12,
      repeat: -1
    }
    scene.anims.create(berserkMoveConfig)
    scene.anims.create(berserkIdleConfig)
    scene.anims.create(berserkJumpConfig)


  }

  idle() {
    this.isJumping = false;
    this.setVelocityX(0)
    this.setVelocityY(0)
    this.play("idle")
  }


  attack() {
    if (this.isAttacking == false) {
      this.isAttacking = true
      console.log(this.isAttacking)
      setTimeout(() => {
        this.isAttacking = false
        console.log(this.isAttacking)
      }, 800)
    }
  }

  up() {
    if (this && this._direction !== undefined) {
      this.setVelocityY(this.initialVelocity * -0.3)
      this.setGravityY(this.gravityForce * -0.3)
      this._direction = "up"
      this.setFlipY(true)
      if (this.body) this.body.setOffset(50, 0)
    }
  }
  down() {
    if (this && this._direction !== undefined) {
      this.setVelocityY(this.initialVelocity * 0.3)
      this.setGravityY(this.gravityForce * 0.3)
      this._direction = "down"
      // setTimeout(() => { this.setGravityY(0) }, 200)
      this.setFlipY(false)
      if (this.body) this.body.setOffset(50, 70)
    }
  }

 

  checkMove(cursors?: Phaser.Types.Input.Keyboard.CursorKeys | undefined) {
    if (cursors) {
      const { left, right, up, down, space } = cursors


     
      if (up.isDown) {
        this.up()
      } else if (down.isDown) {
        this.down()
      }
      this.anims.play("run", true)



    }
  }
}
export default player
