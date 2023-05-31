import Phaser from "phaser";

class Player extends Phaser.Physics.Arcade.Sprite {
  isJumping: boolean = false
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: number) {
    super(scene, x, y, texture, frame)

    this.createAnims(scene);

    this.setScale(0.7)
    // Agregar el player al mundo visual
    scene.add.existing(this)
    // Agregar el player al mundo fisico
    scene.physics.add.existing(this)

    this.setCollideWorldBounds(true);
    if(this.body) {
      const body = (this.body as Phaser.Physics.Arcade.Body)
      body.onWorldBounds = true;
      //tamaño que cropea la img con fisicas
      this.body.setSize(35,90,true);
      this.setOffset(30,10);
    }
  }

  createAnims(scene: Phaser.Scene) {
    
    const monchiIddleFrames = scene.anims.generateFrameNumbers("character", { start: 40, end: 43 })
    const monchiJumpFrames = scene.anims.generateFrameNumbers("character", { start: 48, end: 55 })
    const monchiMoveFrames = scene.anims.generateFrameNumbers("character", { start: 80, end: 85 })
    
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
    const monchiIddleConfig = {
      key: "monchiIddle",
      frames: monchiIddleFrames,
      frameRate: 7,
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
        //this.setOffset(40,-5);
        this.setOffset(30,10);

        /* Play animation */
        if(!this.isJumping) this.anims.play('monchiMove', true);
      }

      /* Right*/
      else if (right.isDown) {
        this.setVelocityX(160);
        this.setFlipX(false)
        //this.setOffset(60,-5);
        this.setOffset(30,10);

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