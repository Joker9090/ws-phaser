import Phaser from "phaser";
import Game from "../Game";
import EventsCenter from "../EventsCenter";
import Sandbox from "../Sandbox";

// Scene in class
class Player extends Phaser.Physics.Arcade.Sprite {
  isJumping = false;
  scene: Game | Sandbox;
  constructor(
    scene: Game | Sandbox,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    frame?: string | number | undefined
  ) {
    super(scene, x, y, texture);
    this.scene = scene;

    /* Monchi animations */
    const monchiJumpFrames = scene.anims.generateFrameNumbers("character", {
      frames: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 12]
    });

    const monchiMoveFrames = scene.anims.generateFrameNumbers("character", {
      frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    });
    const monchiIdleFrames = scene.anims.generateFrameNumbers("character", {
      frames: [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
    });
    const monchiJumpConfig = {
      key: "monchiJump",
      frames: monchiJumpFrames,
      frameRate: 20,
      repeat: 1,
    };
    const monchiMoveConfig = {
      key: "monchiMove",
      frames: monchiMoveFrames,
      frameRate: 10,
      repeat: 0,
    };

    const monchiIdleConfig = {
      key: "monchiIdle",
      frames: monchiIdleFrames,
      frameRate: 12,
      repeat: 0,
    }
    /* Monchi animations */
    scene.anims.create(monchiJumpConfig);
    scene.anims.create(monchiMoveConfig);
    scene.anims.create(monchiIdleConfig);


    /* Monchi add to physic world */
    scene.physics.add.existing(this);

    /* Monchi change size and bounce */
    this.body?.setSize(250, 300);
    this.body?.setOffset(0, 100);
    this.setScale(0.3);
    this.setBounce(0);
    this.setDepth(10);
    /* Monchi add to scene */
    scene.add.existing(this);

    /* Monchi Collission with end of map */
    this.setCollideWorldBounds(true);
    if (this.body) {
      const body = this.body as Phaser.Physics.Arcade.Body;
      body.onWorldBounds = true;
    }
  }

  idle() {
    this.isJumping = false;
    //this.setVelocityX(0);
    // this.anims.play("monchiIdle",true)
  }

  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.play("monchiJump");
      this.setVelocityY(-630);
      this.scene.time.delayedCall(600, this.idle, [], this);
    }
  }

  jumpBack() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.play("monchiJump");
      this.setVelocityY(630);
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
        this.setFlipX(true);
        this.setOffset(80, 100)
        if (this.flipY === true) {
          this.setOffset(100, 40)
        }
        if (!this.isJumping) this.anims.play("monchiMove", true);
      } else if (right.isDown) {

        /* Right*/
        this.setVelocityX(160);
        this.setOffset(0, 100)
        if (this.flipY === true) {
          this.setOffset(0, 40)
        }
        this.setFlipX(false);
        if (!this.isJumping) this.anims.play("monchiMove", true);
      }
      else {

        /* Nothing */
        /*
        else if (this.scene.levelIs == 0 && this.scene.timeLevel < 2) {
          this.setVelocityX(200);
        } else if (this.scene.levelIs == 0 && this.scene.timeLevel >= 2) {
          this.setVelocityX(0);
        }
        */
        this.setVelocityX(0);


        if (!this.isJumping) this.anims.play("monchiIdle", true);

      }

      /* Up / Jump */

      if (up.isDown && this.body && this.body.touching.down) {
        this.jump();
        EventsCenter.emit('planetShown')

        if (this.flipY) {
          this.setVelocityY(-300)
        }
      }

      if (up.isDown && this.body && this.body.touching.up) {
        this.jumpBack();
      }
    }
  }

  checkMoveRot(cursors?: Phaser.Types.Input.Keyboard.CursorKeys | undefined) {
    /* Keywords press */
    if (cursors) {
      const { left, right, up } = cursors;

      /* Left*/
      if (left.isDown) {
        this.setVelocityX(160);
        this.setFlipX(false);
        this.setOffset(5, 100);
        console.log("izquierda")
        if (!this.isJumping) this.anims.play("monchiMove", true);
      } else if (right.isDown) {

        /* Right*/
        this.setVelocityX(-160);
        this.body?.setOffset(100, 100);
        this.setFlipX(true);
        console.log("derecha")
        if (!this.isJumping) this.anims.play("monchiMove", true);
      } else {

        /* Nothing */
        this.setVelocityX(0);
        if (!this.isJumping) this.anims.play("monchiIdle", true);
      }

      /* Up / Jump */

      if (up.isDown && this.body && this.body.touching.down) {
        this.jump();
      }

      if (up.isDown && this.body && this.body.touching.up) {
        this.jumpBack();


      }
    }
  }

  checkSideGravity(
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys | undefined
  ) {
    /* Keywords press */



    if (cursors) {
      console.log(this.body?.gravity, "cursors")
      console.log(this.body?.velocity, "cursors velocity")
      const { up, down, left, right } = cursors;
      const velocity = 300;
      this.body?.setSize(300, 250)
      if (up.isDown) {
        this.setVelocityY(-velocity);
        this.setFlipX(false);
        if (!this.isJumping) this.anims.play("monchiMove", true);
        // this.setOffset(0, 100)
      } else if (down.isDown && this.body) {
        this.setVelocityY(velocity);
        this.setFlipX(true);
        // this.setScale(-0.3,0.2)
        this.body.offset.y = 40
        if (!this.isJumping) this.anims.play("monchiMove", true);
      } else {
        this.setVelocityY(0);
        if (!this.isJumping) this.anims.play("monchiIdle", true);

      }

      if (left.isDown) {
        this.setGravityX(-1300);
        console.log(this.body?.gravity, "left")
        console.log(this.body?.velocity, "left velocity")

        this.setFlipY(true);
        EventsCenter.emit("gravityArrow", "left");
        // this.setOffset(80, 90)
        // this.setOffset(300, 200);
      } else if (right.isDown) {
        this.setGravityX(1300);
        this.setFlipY(false);
        EventsCenter.emit("gravityArrow", "right");
        // this.setOffset(80, -20)
        // this.setOffset(80, 40);
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
        // this.body?.setOffset(0, 150);
      } else if (right.isDown) {

        /* Right*/
        this.setVelocityX(velo);
        // this.body?.setOffset(0, 150);
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
