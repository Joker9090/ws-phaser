import Phaser from "phaser";

class Player extends Phaser.Physics.Arcade.Sprite {
  isJumping: boolean = false
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: number) {
    super(scene, x, y, texture, frame)

    this.createAnims(scene);

    this.setScale(0.5)
    // Agregar el player al mundo visual
    scene.add.existing(this)
    // Agregar el player al mundo fisico
    scene.physics.add.existing(this)

    this.setCollideWorldBounds(true);
    if(this.body) {
      const body = (this.body as Phaser.Physics.Arcade.Body)
      body.onWorldBounds = true;
      //tamaño que cropea la img con fisicas
      this.body.setSize(50,160,true);
      this.setOffset(60,-5);
    }
  }

  createAnims(scene: Phaser.Scene) {
    
    // const monchiMoveFrames = scene.anims.generateFrameNumbers("character", { frames: [0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1] })
    const monchiJumpFrames = scene.anims.generateFrameNumbers("character", { start: 28, end: 44 })
    const monchiMoveFrames = scene.anims.generateFrameNumbers("character", { start: 0, end: 19 })
    const monchiIddleFrames = scene.anims.generateFrameNumbers("character", { start: 48, end: 57 })
    
    const monchiJumpConfig = {
      key: "monchiJump",
      frames: monchiJumpFrames,
      //frameRate: 12,
      repeat: 0,
    }
    const monchiMoveConfig = {
      key: "monchiMove",
      frames: monchiMoveFrames,
      frameRate: 50,
      repeat: 0,
    }
    const monchiIddleConfig = {
      key: "monchiIddle",
      frames: monchiIddleFrames,
      frameRate: 14,
      repeat: 0,
    }
    
    scene.anims.create(monchiJumpConfig)
    scene.anims.create(monchiMoveConfig)
    scene.anims.create(monchiIddleConfig)
    
  }

  idle() {
    this.isJumping = false;
    this.play("monchiIddle");
    this.setVelocityX(0);
    this.setVelocityY(0);
  }

  jump() {
    if(!this.isJumping) {
      this.isJumping = true;
      this.play("monchiJump");
      this.setVelocityY(-530);
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
        this.setOffset(40,-5);

        /* Play animation */
        if(!this.isJumping) this.anims.play('monchiMove', true);
      }

      /* Right*/
      else if (right.isDown) {
        this.setVelocityX(160);
        this.setFlipX(false)
        //this.setOffset(40,20);
        this.setOffset(60,-5);

        /* Play animation */
        if(!this.isJumping) this.anims.play('monchiMove', true);
      }

      /* Nothing */
      else {
        this.anims.play('monchiIddle', true);
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