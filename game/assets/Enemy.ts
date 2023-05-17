import Phaser from "phaser";

class Enemy extends Phaser.Physics.Arcade.Sprite {
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

    this.setCollideWorldBounds(true);
    if(this.body) {
      const body = (this.body as Phaser.Physics.Arcade.Body)
      body.onWorldBounds = true;
      this.body.setSize(35,80,true); // GOOOD!
      
    }
  }

  createAnims(scene: Phaser.Scene) {

    const skeletonIdleFrames = scene.anims.generateFrameNumbers("skeleton",{start:0 , end: 5});
    //const skeletonJumpFrames = scene.anims.generateFrameNumbers("skeleton", {frames: [6,7,8,9,10,11]});
    const skeletonJumpFrames = scene.anims.generateFrameNumbers("skeleton", {start: 6, end:11});
    const skeletonMoveFrames = scene.anims.generateFrameNumbers("skeleton", { start:10 , end: 15 });
    const skeletonDeadFrames = scene.anims.generateFrameNumbers("skeleton",{start:18 , end: 23});
    const skeletonDmgFrames = scene.anims.generateFrameNumbers("skeleton",{start:19 , end: 20});
    const skeletonDefFrames = scene.anims.generateFrameNumbers("skeleton",{start:24 , end: 28});
    const skeletonAttackFrames = scene.anims.generateFrameNumbers("skeleton",{start:36 , end: 41});

    const skeletonJumpConfig = {
      key: "skeletonJump",
      frames: skeletonJumpFrames,
      frameRate: 6,
      repeat: 0,
    }

    const skeletonMoveConfig = {
      key: "skeletonMove",
      frames: skeletonMoveFrames,
      frameRate: 10,
      repeat: 0,
    }

    const skeletonIdleFramesConfig = {
      key: "skeletonIdleFrames",
      frames: skeletonIdleFrames,
      frameRate: 3,
      repeat: -1,
    }

    const skeletonDeadFramesConfig = {
      key: "skeletonDeadFrames",
      frames: skeletonDeadFrames,
      frameRate: 10,
      repeat: 0,
    }

    const skeletonDmgFramesConfig = {
      key: "skeletonDmgFrames",
      frames: skeletonDmgFrames,
      frameRate: 10,
      repeat: 0,
    }

    const skeletonDefFramesConfig = {
      key: "skeletonDefFrames",
      frames: skeletonDefFrames,
      frameRate: 10,
      repeat: 0,
    }

    const skeletonAttackFramesConfig = {
      key: "skeletonAttackFrames",
      frames: skeletonAttackFrames,
      frameRate: 15,
      repeat: 0,
    }

    scene.anims.create(skeletonJumpConfig)
    scene.anims.create(skeletonMoveConfig)
    scene.anims.create(skeletonIdleFramesConfig)
    scene.anims.create(skeletonDeadFramesConfig)
    scene.anims.create(skeletonDmgFramesConfig)
    scene.anims.create(skeletonDefFramesConfig)
    scene.anims.create(skeletonAttackFramesConfig)

    this.play("skeletonIdleFrames");
    
  }

  idle() {
    this.isJumping = false;
    this.isAttacking = false;
    //this.setVelocityX(0);
    //this.setVelocityY(0);
    this.play("skeletonIdleFrames");
  }

  jump() {
    if(!this.isJumping) {
      this.isJumping = true;
      this.play("skeletonJump",false);
      this.setVelocityY(-730);
      this.scene.time.delayedCall(600, this.idle, [], this);
    }
  }
  attack() {
    //if(!this.isAttacking) {
      this.isAttacking = true;
      this.play("skeletonAttackFrames",true);
      //this.setVelocityY(-730);
      this.scene.time.delayedCall(600, this.idle, [], this);
    //}
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
        if(!this.isJumping) this.anims.play('skeletonMove', true);
      }

      /* Right*/
      else if (right.isDown) {
        this.setVelocityX(160);
        this.setFlipX(false)

        /* Play animation */
        if(!this.isJumping) this.anims.play('skeletonMove', true);
      }else if (space.isDown) {
        this.attack();

      }

      /* Nothing */
      else {
        this.setVelocityX(0)
        this.anims.play("skeletonIdleFrames",true);
      }

      /* Up / Juamp */

      if (up.isDown && this.body && this.body.touching.down) {
        /* Play animation */
        this.jump()
      } 
    }
  }
}

export default Enemy