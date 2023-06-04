import Phaser from "phaser";
import LifeBar from "./LifeBar";
import hitZone from "./hitZone";

class Player extends Phaser.Physics.Arcade.Sprite {
  isJumping: boolean = false
  isAttacking: boolean = false
  sprite: string = '';
  life: number = 100;
  swordHitBox: hitZone;
  constructor(scene: Phaser.Scene, x: number, y: number, sprite: string, frame: number) {
    super(scene, x, y, sprite, frame)

    this.createAnims(scene,sprite);
    this.sprite = sprite;

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
      this.body.setSize(35, 64, true); // GOOOD!
      this.body.setOffset(20, 20);

    }
    this.swordHitBox = new hitZone(scene,100,100,32,64,0xffffff,0.5);

  }

  createAnims(scene: Phaser.Scene,sprite:string ) {

    const knightIdleFrames = scene.anims.generateFrameNumbers(sprite, { start: 0, end: 3 });
    //const knightJumpFrames = scene.anims.generateFrameNumbers("knight", {frames: [6,7,8,9,10,11]});
    const knightJumpFrames = scene.anims.generateFrameNumbers(sprite, { start: 5, end: 10 });
    const knightMoveFrames = scene.anims.generateFrameNumbers(sprite, { start: 10, end: 14 });
    const knightDeadFrames = scene.anims.generateFrameNumbers(sprite, { start: 18, end: 23 });
    const knightDmgFrames = scene.anims.generateFrameNumbers(sprite, { start: 19, end: 20 });
    const knightDefFrames = scene.anims.generateFrameNumbers(sprite, { start: 24, end: 28 });
    const knightAttackFrames = scene.anims.generateFrameNumbers(sprite, { start: 30, end: 34 });

    const knightJumpConfig = {
      key: `${sprite}Jump`,
      frames: knightJumpFrames,
      frameRate: 6,
      repeat: 0,
    }

    const knightMoveConfig = {
      key: `${sprite}Move`,
      frames: knightMoveFrames,
      frameRate: 10,
      repeat: 0,
      //yoyo: true,
    }

    const knightIdleFramesConfig = {
      key: `${sprite}IdleFrames`,
      frames: knightIdleFrames,
      frameRate: 3,
      repeat: -1,
    }

    const knightDeadFramesConfig = {
      key: `${sprite}DeadFrames`,
      frames: knightDeadFrames,
      frameRate: 10,
      repeat: 0,
    }

    const knightDmgFramesConfig = {
      key: `${sprite}DmgFrames`,
      frames: knightDmgFrames,
      frameRate: 10,
      repeat: 0,
    }

    const knightDefFramesConfig = {
      key: `${sprite}DefFrames`,
      frames: knightDefFrames,
      frameRate: 10,
      repeat: 0,
    }

    const knightAttackFramesConfig = {
      key: `${sprite}AttackFrames`,
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

    this.play(`${sprite}IdleFrames`);

  }

  //checkSignalVital() {
  //  if(this.life <= 0) {
  //    
  //  }
  //}

  receivedDamage(dmgRecieved:number) {

    this.loseLife(dmgRecieved);

    this.scene.tweens.add({
      targets: this,
      duration: 150,
      repeat: 3,
      yoyo: true,
      alpha: 0.5,
      onStart: () => {
        //this.setTint(0xffffff);
      },
      onComplete: () => {
        this.setAlpha(1);
      },
    });
  }

  loseLife(dmgRecieved: number) {
    //const dmg = 10;
    //const dmg ? dmgRecieved : 10;

    this.life -= dmgRecieved;
    console.log("Vida del caballero: " + this.life);

  }

  takeLife(lifeBar: LifeBar) {
    //const moreLife = 10;
    if(lifeBar.fullBar) {
      if(this.life < 100) {
        this.life += 10;
        if(lifeBar.x + 10 > 100) {
          lifeBar.setBar(lifeBar.fullBar)
        }else lifeBar.setBar(lifeBar.x + 10);
      }else if(this.life >= 100) {
        //this.life = 99;
        //lifeBar.setBar(this.life);
      }
      console.log("takelife : " + this.life);

    }
  }

  idle() {
    console.log("idle")
    this.isJumping = false;
    this.setVelocityX(0);
    this.setVelocityY(0);
    if (!this.isAttacking) this.play(`${this.sprite}IdleFrames`);
  }

  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.setVelocityY(-450);
      this.setVelocityX(10);
      this.play(`${this.sprite}Jump`, true);
      this.scene.time.delayedCall(1000, this.idle, [], this);
    }
  }
  attack() {
    if (!this.isAttacking) {
      console.log("attack");
      this.swordHitBox.attackBox((this.x),(this.y),this.flipX, 10)
      this.isAttacking = true;
      this.play(`${this.sprite}AttackFrames`, true);
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

      /* Up / Juamp */
      if (up.isDown && this.body && this.body.touching.down) {
        /* Play animation */
        this.anims.play(`${this.sprite}Jump`, true);
        this.jump()
      }


      /* Left*/
      if (left.isDown) {
        this.setVelocityX(-170);
        this.setFlipX(true)

        /* Play animation */
        if (!this.isJumping) this.anims.play(`${this.sprite}Move`, true);
      }

      /* Right*/
      else if (right.isDown) {
        this.setVelocityX(170);
        this.setFlipX(false)

        /* Play animation */
        if (!this.isJumping) this.anims.play(`${this.sprite}Move`, true);
      } else if (space.isDown) {
        this.attack();

      }


      /* Nothing */
      else {
        this.setVelocityX(0)
        if(!this.isAttacking && !this.isJumping) this.anims.play(`${this.sprite}IdleFrames`, true);
      }



    }
  }
}

export default Player