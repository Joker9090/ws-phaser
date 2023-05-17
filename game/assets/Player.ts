
import Phaser from "phaser";
// Scene in class
class Player extends Phaser.Physics.Arcade.Sprite {
  isJumping = false;
  scene: Phaser.Scene;
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number | undefined) {
    super(scene,x,y,texture)
    this.scene = scene;
    /* Monchi animations */
    const monchiJumpFrames = scene.anims.generateFrameNumbers("character", { frames: [0, 1, 2, 3, 2, 1, 0] })
    const monchiMoveFrames = scene.anims.generateFrameNumbers("character", { frames: [0, 1, 0, 1, 0] })
    const monchiJumpConfig = {
      key: "monchiJump",
      frames: monchiJumpFrames,
      frameRate: 12,
      repeat: 0,
    }
    const monchiMoveConfig = {
      key: "monchiMove",
      frames: monchiMoveFrames,
      frameRate: 10,
      repeat: 0,
    }
    scene.anims.create(monchiJumpConfig)
    scene.anims.create(monchiMoveConfig)
    /* Monchi animations */

    /* Monchi add to physic world */
    scene.physics.add.existing(this);
    
    /* Monchi change size and bounce */
    this.body?.setSize(20,100)
    this.body?.setOffset(100,50)
    this.setScale(0.6)
    this.setBounce(0);

    /* Monchi add to scene */
    scene.add.existing(this);

    /* Monchi Collission with end of map */
    this.setCollideWorldBounds(true);
    if(this.body) {
      const body = (this.body as Phaser.Physics.Arcade.Body)
      body.onWorldBounds = true;
    }
  }

  idle() {
    this.isJumping = false;
    this.setVelocityX(0);
    this.setVelocityY(300);
  }

  jump() {
    if(!this.isJumping) {
      this.isJumping = true;
      this.play("monchiJump");
      this.setVelocityY(-630);
      this.scene.time.delayedCall(600, this.idle, [], this);
    }
  }

  checkMove(cursors?: Phaser.Types.Input.Keyboard.CursorKeys | undefined) {
    /* Keywords press */
    if (cursors) {
      const { left, right, up } = cursors;
      /* Left*/
      if (left.isDown) {
        this.setVelocityX(-160);
        this.setFlipX(true)

        /* Play animation */
        if(!this.isJumping) this.anims.play('monchiMove', true);
      }

      /* Right*/
      else if (right.isDown) {
        this.setVelocityX(160);
        this.setFlipX(false)

        /* Play animation */
        if(!this.isJumping) this.anims.play('monchiMove', true);
      }

      /* Nothing */
      else {
        this.setVelocityX(0)
      }

      /* Up / Juamp */

      if (up.isDown && this.body && this.body.touching.down) {
        /* Play animation */
        this.jump()
      } 
    }
  }


}

export default Player 
