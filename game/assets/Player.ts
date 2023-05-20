import Phaser from "phaser";

class Player extends Phaser.Physics.Arcade.Sprite {
  isJumping: boolean = false
  isAttacking: boolean = false
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: number) {
    super(scene, x, y, texture, frame)

    this.createAnims(scene);

    this.setScale(1)
    // Agregar el player al mundo visual
    scene.add.existing(this)
    // Agregar el player al mundo fisico
    scene.physics.add.existing(this)

    /**Darknes implementation */
    this.setPipeline('Light2D');

    this.setCollideWorldBounds(true);
    if (this.body) {
      const body = (this.body as Phaser.Physics.Arcade.Body)
      body.onWorldBounds = true;
      this.body.setSize(35, 80, true); // GOOOD!

    }
  }

  createAnims(scene: Phaser.Scene) {

    const knightIdleFrames = scene.anims.generateFrameNumbers("knight", { start: 0, end: 3 });
    //const knightJumpFrames = scene.anims.generateFrameNumbers("knight", {frames: [6,7,8,9,10,11]});
    const knightJumpFrames = scene.anims.generateFrameNumbers("knight", { start: 6, end: 11 });
    const knightMoveFrames = scene.anims.generateFrameNumbers("knight", { start: 10, end: 15 });
    const knightDeadFrames = scene.anims.generateFrameNumbers("knight", { start: 18, end: 23 });
    const knightDmgFrames = scene.anims.generateFrameNumbers("knight", { start: 19, end: 20 });
    const knightDefFrames = scene.anims.generateFrameNumbers("knight", { start: 24, end: 28 });
    const knightAttackFrames = scene.anims.generateFrameNumbers("knight", { start: 30, end: 34 });

    const knightJumpConfig = {
      key: "knightJump",
      frames: knightJumpFrames,
      frameRate: 6,
      repeat: 0,
    }

    const knightMoveConfig = {
      key: "knightMove",
      frames: knightMoveFrames,
      frameRate: 10,
      repeat: 0,
    }

    const knightIdleFramesConfig = {
      key: "knightIdleFrames",
      frames: knightIdleFrames,
      frameRate: 3,
      repeat: -1,
    }

    const knightDeadFramesConfig = {
      key: "knightDeadFrames",
      frames: knightDeadFrames,
      frameRate: 10,
      repeat: 0,
    }

    const knightDmgFramesConfig = {
      key: "knightDmgFrames",
      frames: knightDmgFrames,
      frameRate: 10,
      repeat: 0,
    }

    const knightDefFramesConfig = {
      key: "knightDefFrames",
      frames: knightDefFrames,
      frameRate: 10,
      repeat: 0,
    }

    const knightAttackFramesConfig = {
      key: "knightAttackFrames",
      frames: knightAttackFrames,
      frameRate: 15,
      repeat: 0,
    }

    scene.anims.create(knightJumpConfig)
    scene.anims.create(knightMoveConfig)
    scene.anims.create(knightIdleFramesConfig)
    scene.anims.create(knightDeadFramesConfig)
    scene.anims.create(knightDmgFramesConfig)
    scene.anims.create(knightDefFramesConfig)
    scene.anims.create(knightAttackFramesConfig)

    this.play("knightIdleFrames");

  }

  idle() {
    console.log("idle")
    this.isJumping = false;
    this.setVelocityX(0);
    this.setVelocityY(0);
    if (!this.isAttacking) this.play("knightIdleFrames");
  }

  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.play("knightJump", false);
      this.setVelocityY(-730);
      this.scene.time.delayedCall(600, this.idle, [], this);
    }
  }
  attack() {
    if (!this.isAttacking) {
      console.log("attack")
      this.isAttacking = true;
      this.play("knightAttackFrames", true);
      //this.setVelocityY(-730);
      this.scene.time.delayedCall(600, () => {
        this.isAttacking = false;

        // this.idle()
      }, [], this);
    }
  }

  checkMove(cursors?: Phaser.Types.Input.Keyboard.CursorKeys | undefined) {
    

    /* Keywords press */
    if (cursors) {
      const { left, right, up, space } = cursors;
      /* Left*/
      if (left.isDown) {
        this.setVelocityX(-160);
        this.setFlipX(true)

        /* Play animation */
        if (!this.isJumping) this.anims.play('knightMove', true);
      }

      /* Right*/
      else if (right.isDown) {
        this.setVelocityX(160);
        this.setFlipX(false)

        /* Play animation */
        if (!this.isJumping) this.anims.play('knightMove', true);
      } else if (space.isDown) {
        this.attack();

      }

      /* Nothing */
      else {
        this.setVelocityX(0)
        if(!this.isAttacking) this.anims.play("knightIdleFrames", true);
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