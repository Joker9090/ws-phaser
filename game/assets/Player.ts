import Phaser from "phaser";
import Game from "../Game";
import MultiScene from "../MultiScene";
import PreLoadScene from "../PreLoadScene";

// Scene in class
class Player extends Phaser.Physics.Arcade.Sprite {
  isJumping: boolean = false;
  isRotating: boolean = false;
  playerState: "NORMAL" | "ROTATED" = "NORMAL";
  cameraState: "NORMAL" | "ROTATED" = "NORMAL";
  scene: Game |MultiScene | PreLoadScene;
  gravityAnimSprite?: Phaser.GameObjects.Sprite;

  constructor(
    scene: Game |MultiScene | PreLoadScene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    frame?: string | number | undefined
  ) {
    super(scene, x, y, texture);
    this.scene = scene;
    /* Monchi animations */
    this.setOrigin()

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
    const monchiLoaderConfig ={
      key: "monchiLoader",
      frames: monchiMoveFrames,
      frameRate: 12,
      repeat: 1,
    }
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
    const monchiRotateReverseFrames = scene.anims.generateFrameNumbers("player", {
      frames: (Array.from({ length: 24 }, (_, i) => i)).reverse(),
    });

    const monchiRotate1Config = {
      key: "monchiRotate1",
      frames: monchiRotateReverseFrames,
      frameRate: 12,
      repeat: 0,
    }

    const monchiRotate2Config = {
      key: "monchiRotate2",
      frames: monchiRotateReverseFrames,
      frameRate: 24,
      repeat: 0,
    }

    const monchiRotate3Config = {
      key: "monchiRotate3",
      frames: monchiRotateReverseFrames,
      frameRate: 36,
      repeat: 0,
    }

    const monchiRotateReverseConfig = {
      key: "monchiRotateReverse",
      frames: monchiRotateReverseFrames,
      frameRate: 24,
      repeat: 0,
    }

    const gravityAnimFrames = scene.anims.generateFrameNumbers("gravityAnim", {
      frames: Array.from({ length: 10 }, (_, i) => i),
    });
    const gravityAnimConfig = {
      key: "gravityAnimKey",
      frames: gravityAnimFrames,
      frameRate: 10,
      repeat: 0,
    };

    /* Monchi animations */
    scene.anims.create(monchiJumpConfig);
    scene.anims.create(monchiMoveConfig);
    scene.anims.create(monchiLoaderConfig);
    scene.anims.create(monchiIdleConfig);
    scene.anims.create(monchiRotate1Config);
    scene.anims.create(monchiRotate2Config);
    scene.anims.create(monchiRotate3Config);
    scene.anims.create(monchiRotateReverseConfig);
    scene.anims.create(gravityAnimConfig);

    /* Monchi add to physic world */
    scene.physics.add.existing(this);

    /* Monchi change size and bounce */
    this.body?.setSize(100, 150);
    this.body?.setOffset(50, 40);

    this.setScale(.7)
    this.setBounce(0);
    this.setDepth(999);


    /* Monchi add to scene */
    scene.add.existing(this);
    if(this.scene instanceof Game) this.scene.UICamera?.ignore(this)
    this.gravityAnimSprite = this.scene.add.sprite(this.x, this.y, "gravityAnim", 0).setVisible(false).setDepth(999);
    if(this.scene instanceof Game)  this.scene.UICamera?.ignore(this.gravityAnimSprite)

    // this.scene.add.rectangle(this.x, this.y, 100, 100, 0xffffff).setVisible(true)
    /* Monchi Collission with end of map */
    this.setCollideWorldBounds(true);
    if (this.body) {
      const body = this.body as Phaser.Physics.Arcade.Body;
      body.onWorldBounds = true;
    }
  }

  setCameraState(state: "NORMAL" | "ROTATED") {
    this.cameraState = state
  }

  setPlayerState(state: "NORMAL" | "ROTATED") {
    this.playerState = state
  }

  idle() {
    this.isJumping = false;
    this.isRotating = false
  }
  // agregar varable isGrounded
  jump() {
    const condition = this.playerState === 'NORMAL' ? this.body?.touching.down : this.body?.touching.up
    if (!this.isJumping && condition) {
      this.isJumping = true;
      this.anims.play("monchiJump").once('animationcomplete', this.idle);
      this.setVelocityY(this.playerState === 'NORMAL' ? -630 : 630);
    }
  }

  rotate(speed: 1 | 2 | 3 = 2) {
    if (!this.isRotating) {
      this.isRotating = true
      this.gravityAnimSprite?.setVisible(true)
      this.gravityAnimSprite?.anims.play("gravityAnimKey").once('animationcomplete', () => this.gravityAnimSprite?.setVisible(false))
      this.setPlayerState(this.playerState === 'NORMAL' ? 'ROTATED' : 'NORMAL')
      this.anims.play(speed === 1 ? 'monchiRotate1' : speed === 2 ? 'monchiRotate2' : 'monchiRotate3').once('animationcomplete', this.idle)
    }
  }



  checkMove(cursors?: Phaser.Types.Input.Keyboard.CursorKeys | undefined) {
    this.gravityAnimSprite?.setPosition(this.x, this.y)
    if (this.playerState === "ROTATED") {
      this.body?.setOffset(50,0)
      this.setFlipY(true)
    }
    else if (this.playerState === "NORMAL") {
      this.body?.setOffset(50,40)
      this.setFlipY(false)
    }
    /* Keywords press */
    if (cursors) {
      const { left, right, up, space } = cursors;
      /* Left*/
      if (left.isDown) {
        this.setVelocityX(this.cameraState === 'NORMAL' ? -200 : 200);
        this.setFlipX(this.cameraState === 'NORMAL' ? true : false);
        if (!this.isJumping && !this.isRotating) this.anims.play("monchiMove", true);
      } else if (right.isDown) {
        /* Right*/
        this.setVelocityX(this.cameraState === 'NORMAL' ? 200 : -200);
        this.setFlipX(this.cameraState === 'NORMAL' ? false : true);
        if (!this.isJumping && !this.isRotating) this.anims.play("monchiMove", true);
      }
      else {
        this.setVelocityX(0);
        if (!this.isJumping && !this.isRotating) this.anims.play("monchiIdle", true);
      }
      /* Up / Jump */
      if (up.isDown || space.isDown) {
        this.jump()
      }
    }
  }
  moveOnLoader(){
    this.anims.play("monchiLoader", true)
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
