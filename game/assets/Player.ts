import Phaser from "phaser";
import Game from "../Game";

// Scene in class
class Player extends Phaser.Physics.Arcade.Sprite {
  isJumping = false;
  isRotating = false;
  scene: Game;

  constructor(
    scene: Game,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    frame?: string | number | undefined
  ) {
    super(scene, x, y, texture);
    this.scene = scene;
    /* Monchi animations */
    const monchiJumpFrames = scene.anims.generateFrameNumbers("player", {
      frames: Array.from({ length: 12 }, (_, i) => i + 36),
    });
    const monchiJumpConfig = {
      key: "monchiJump",
      frames: monchiJumpFrames,
      frameRate: 12,
      repeat: 0,
    };
    const monchiMoveFrames = scene.anims.generateFrameNumbers("player", {
      frames: Array.from({ length: 12 }, (_, i) => i + 48),
    });
    const monchiMoveConfig = {
      key: "monchiMove",
      frames: monchiMoveFrames,
      frameRate: 12,
      repeat: 0,
    };
    const monchiIdleFrames = scene.anims.generateFrameNumbers("player", {
      frames: Array.from({ length: 12 }, (_, i) => i + 24),
    });
    const monchiIdleConfig = {
      key: "monchiIdle",
      frames: monchiIdleFrames,
      frameRate: 12,
      repeat: 0,
    }
    const monchiRotateFrames = scene.anims.generateFrameNumbers("player", {
      frames: Array.from({ length: 24 }, (_, i) => i),
    });
    const monchiRotateBackFrames = scene.anims.generateFrameNumbers("player", {
      frames: Array.from({ length: 24 }, (_, i) => i).reverse(),
    });
    const monchiRotateConfig = {
      key: "monchiRotate",
      frames: monchiRotateFrames,
      frameRate: 24,
      repeat: 0,
    }
    const monchiRotateBackConfig = {
      key: "monchiRotateBack",
      frames: monchiRotateBackFrames,
      frameRate: 24,
      repeat: 0,
    }

    console.log("frames", monchiRotateFrames, monchiRotateBackFrames)

    /* Monchi animations */
    scene.anims.create(monchiJumpConfig);
    scene.anims.create(monchiMoveConfig);
    scene.anims.create(monchiIdleConfig);
    scene.anims.create(monchiRotateConfig);
    scene.anims.create(monchiRotateBackConfig);


    /* Monchi add to physic world */
    scene.physics.add.existing(this);

    /* Monchi change size and bounce */
    this.body?.setSize(100, 150);
    this.body?.setOffset(50, 30);
    this.setScale(0.7)
    this.setBounce(0);
    this.setDepth(999);


    /* Monchi add to scene */
    scene.add.existing(this);
    this.scene.UICamera?.ignore(this)

    /* Monchi Collission with end of map */
    this.setCollideWorldBounds(true);
    if (this.body) {
      const body = this.body as Phaser.Physics.Arcade.Body;
      body.onWorldBounds = true;
    }
  }

  idle() {
    this.isJumping = false;
    this.isRotating = false
  }

  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.play("monchiJump");
      this.setVelocityY(-630);
      this.scene.time.delayedCall(1200, this.idle, [], this);
    }
  }

  jumpBack() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.play("monchiJump");
      this.setVelocityY(630);
      this.scene.time.delayedCall(1200, this.idle, [], this);
    }
  }

  rotate(float?: boolean) {
      if (!this.isRotating){
        this.isRotating = true
        if (!float) {
          this.play("monchiRotate");
          this.scene.time.delayedCall(2400, this.idle, [], this);
        } else {
          this.play("monchiRotateBack");
          this.scene.time.delayedCall(2400, this.idle, [], this);
        }
      }
  }

  checkMove(cursors?: Phaser.Types.Input.Keyboard.CursorKeys | undefined, float: boolean = false) {
    if (float) this.setFlipY(true)
    else this.setFlipY(false)
    /* Keywords press */
    if (cursors) {
      const { left, right, up, space } = cursors;
      /* Left*/
      if (left.isDown) {
        this.setVelocityX(-160);
        this.setFlipX(true);
        if (!this.isJumping && !this.isRotating) this.anims.play("monchiMove", true);
      } else if (right.isDown) {
        /* Right*/
        this.setVelocityX(160);
        this.setFlipX(false);
        if (!this.isJumping && !this.isRotating) this.anims.play("monchiMove", true);
      }
      else {
        this.setVelocityX(0);
        if (!this.isJumping && !this.isRotating) this.anims.play("monchiIdle", true);
      }
      /* Up / Jump */
      if (up.isDown || space.isDown) {
        if (this.body && this.body.touching.down) {
          this.jump();
        }
        if (this.body && this.body.touching.up) {
          this.jumpBack();
        }
      }
    }
  }

  checkMoveRot(cursors?: Phaser.Types.Input.Keyboard.CursorKeys | undefined) {
    /* Keywords press */
    if (cursors) {
      const { left, right, up, space } = cursors;
      /* Left*/
      if (left.isDown) {
        this.setVelocityX(160);
        this.setFlipX(false);
        if (!this.isJumping && !this.isRotating) this.anims.play("monchiMove", true);
      } else if (right.isDown) {
        /* Right*/
        this.setVelocityX(-160);
        this.setFlipX(true);
        if (!this.isJumping && !this.isRotating) this.anims.play("monchiMove", true);
      } else {
        /* Nothing */
        this.setVelocityX(0);
        if (!this.isJumping && !this.isRotating) this.anims.play("monchiIdle", true);
      }
      /* Up / Jump */
      if (up.isDown || space.isDown) {
        if (this.body && this.body.touching.down) {
          this.jump();
        }
        if (this.body && this.body.touching.up) {
          this.jumpBack();
        }
      }
    }
  }

  checkSideGravity(
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys | undefined
  ) {
    /* Keywords press */
    if (cursors) {
      const { up, down, left, right } = cursors;
      const velocity = 300;
      if (up.isDown) {
        this.setVelocityY(-velocity);
        this.setFlipX(false);
        if (!this.isJumping && !this.isRotating) this.anims.play("monchiMove", true);
      } else if (down.isDown && this.body) {
        this.setVelocityY(velocity);
        this.setFlipX(true);
        if (!this.isJumping && !this.isRotating) this.anims.play("monchiMove", true);
      } else {
        this.setVelocityY(0);
        if (!this.isJumping && !this.isRotating) this.anims.play("monchiIdle", true);
      }
      if (left.isDown) {
        this.scene.physics.world.gravity.x = -1000;
        this.setFlipY(true);
      } else if (right.isDown) {
        this.scene.physics.world.gravity.x = 1000;
        this.setFlipY(false);
      }
    }
  }

  checkMoveCreative(
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys | undefined
  ) {
    /* Keywords press */
    const velo = 400;
    this.scene.physics.world.gravity.y = 0;
    if (cursors) {
      const { left, right, up, down, space } = cursors;
      /* Left*/
      if (left.isDown) {
        this.setVelocityX(-velo);
      } else if (right.isDown) {

        /* Right*/
        this.setVelocityX(velo);
      } else if (down.isDown) {

        /* Up*/
        this.setVelocityY(velo);
      } else if (up.isDown) {
        /* Down*/
        this.setVelocityY(-velo);
      } else {
        /* Stop*/
        this.setVelocityY(0);
        this.setVelocityX(0);

      }
    }
  }
}

export default Player;
