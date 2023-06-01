import Phaser from "phaser";
import Player from "./Player";

export type PatrolConfig = {
  x:number,
  delay:number,
  enemyDetect:boolean,
  anim?: string,
  flip?:boolean,
}

class Enemy extends Phaser.Physics.Arcade.Sprite {
  isJumping: boolean = false
  isAttacking: boolean = false
  isPatrol: boolean = false;
  isEnemyInFront: boolean = false
  patrolConfig?: PatrolConfig;
  life:number = 3;
  Onstate?: string = "pasive";
  sprite: string = '';

  constructor(scene: Phaser.Scene, x: number, y: number, sprite: string, frame: number,life?: number) {
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
    if(this.body) {
      const body = (this.body as Phaser.Physics.Arcade.Body)
      body.onWorldBounds = true;
      //this.body.setSize(35,80,true); // GOOOD!
      this.body.setSize(35, 65, true); // GOOOD!
      this.body.setOffset(20, 20);
    }
  }

  createAnims(scene: Phaser.Scene, sprite: string) {

    const skeletonIdleFrames = scene.anims.generateFrameNumbers(sprite,{start:0 , end: 5});
    //const skeletonWalkFrames = scene.anims.generateFrameNumbers("skeleton", {frames: [6,7,8,9,10,11]});
    const skeletonWalkFrames = scene.anims.generateFrameNumbers(sprite, {start: 6, end:11});
    const skeletonMoveFrames = scene.anims.generateFrameNumbers(sprite, { start:10 , end: 15 });
    const skeletonDeadFrames = scene.anims.generateFrameNumbers(sprite,{start:18 , end: 23});
    const skeletonDmgFrames = scene.anims.generateFrameNumbers(sprite,{start:24 , end: 25});
    const skeletonDefFrames = scene.anims.generateFrameNumbers(sprite,{start:30 , end: 34});
    const skeletonAttackFrames = scene.anims.generateFrameNumbers(sprite,{start:36 , end: 41});
    const skeletonDeadFrame = scene.anims.generateFrameNumbers(sprite,{frames:[22]})

    const skeletonWalkConfig = {
      key: `${sprite}Walk`,
      frames: skeletonWalkFrames,
      frameRate: 10,
      repeat: -1,
    }

    const skeletonMoveConfig = {
      key: `${sprite}Move`,
      frames: skeletonMoveFrames,
      frameRate: 10,
      repeat: -1,
    }

    const skeletonIdleFramesConfig = {
      key: `${sprite}IdleFrames`,
      frames: skeletonIdleFrames,
      frameRate: 3,
      repeat: -1,
    }

    const skeletonDeadFramesConfig = {
      key: `${sprite}DeadFrames`,
      frames: skeletonDeadFrames,
      frameRate: 15,
      //duration:500,
      repeat: 0,
    }

    const skeletonDeadFrameConfig = {
      key:`${sprite}DeadFrame`,
      frames: skeletonDeadFrame,
      //frameRate:15,
      //repeat: -1,

    }

    const skeletonDmgFramesConfig = {
      key: `${sprite}DmgFrames`,
      frames: skeletonDmgFrames,
      frameRate: 10,
      repeat: 0,
    }

    const skeletonDefFramesConfig = {
      key: `${sprite}DefFrames`,
      frames: skeletonDefFrames,
      frameRate: 10,
      repeat: 0,
    }

    const skeletonAttackFramesConfig = {
      key: `${sprite}AttackFrames`,
      frames: skeletonAttackFrames,
      frameRate: 15,
      repeat: 0,
    }

    scene.anims.create(skeletonWalkConfig);
    scene.anims.create(skeletonMoveConfig);
    scene.anims.create(skeletonIdleFramesConfig);
    scene.anims.create(skeletonDeadFramesConfig);
    scene.anims.create(skeletonDmgFramesConfig);
    scene.anims.create(skeletonDefFramesConfig);
    scene.anims.create(skeletonAttackFramesConfig);
    scene.anims.create(skeletonDeadFrameConfig);

    
    //this.play(`${sprite}IdleFrames`);
 
    
  }

  idle() {
    this.isJumping = false;
    this.isAttacking = false;
    //this.setVelocityX(0);
    //this.setVelocityY(0);
    this.play(`${this.sprite}IdleFrames`);
  }

  jump() {
    if(!this.isJumping) {
      this.isJumping = true;
      this.play(`${this.sprite}Walk`,false);
      this.setVelocityY(-730);
      this.scene.time.delayedCall(600, this.idle, [], this);
    }
  }

  updateState(newState: string, config?:[]) {
    switch (newState) {
      case "idle":
        
        break;
      case "attack":
        
        break;
      case "patrol":
        
        break;
      case "dead":
        
        break;
    
      default:
        break;
    }
  }

  enemyAround(target:Player,maxRange: number) {
    const dx = this.x - target.x;
    const dy = this.y - target.y;
    //console.log("enemy around dx value: "+dx);
    if (Math.abs(dx) < maxRange && Math.abs(dy) < 20) {
      //enemy.setVelocityX(Math.sign(dx) * SPEED);
      this.isEnemyInFront = true;
      this.setVelocityX(0);
      //console.log("enemy around state from skeleton: "+this.isEnemyInFront);
    } else if(Math.abs(dx) > maxRange&& Math.abs(dy) > 20){
      this.isEnemyInFront = false;
      //if(this.patrolConfig) {
        //this.patrolConfig.flip = this.flipX;
        //this.patrol(this.patrolConfig);
      //}
    }

  }

  corposeStay(){
    this.anims.play(`${this.sprite}DeadFrame`, true);
  }



  dead(){
    this.setVelocityX(0);
    this.anims.play(`${this.sprite}DeadFrames`, true);
    this.Onstate = "dead";
  }
  getRandomIntInclusive(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  receiveDamage() {
    const posibility = this.getRandomIntInclusive(3,10);
    console.log("posibility: "+posibility);
    if(posibility <= 2) {
      this.anims.play('skeletonDefFrames', true);
      //this.scene.time.delayedCall(600, this.patrol, [this.patrolConfig], this);
    }else {
      this.anims.play('skeletonDmgFrames', true);
      this.life= this.life - 1;
      console.log("cantidad de vidas ske: "+this.life);
      if(this.life == 0) {
        this.dead();
      }
      //this.attack();skeletonDmgFrames
    }

  }


  patrol(_patrolConfig:PatrolConfig){
    console.log("patrol log: "+_patrolConfig.x+_patrolConfig.delay+_patrolConfig.flip);
    if(this.Onstate != "dead"){
      this.isPatrol = true;
      if(_patrolConfig.flip != null ||_patrolConfig.flip != undefined)this.flipX = _patrolConfig.flip;    
      if(_patrolConfig.enemyDetect){
        if(!this.isEnemyInFront){
          if(!this.flipX) {
            this.setVelocityX(_patrolConfig.x);
            //_patrolConfig.flip = true;
            const newPatrolConfig = _patrolConfig;
            newPatrolConfig.flip = true;
            this.anims.play(`${this.sprite}Walk`, true);
            this.scene.time.delayedCall(_patrolConfig.delay, this.patrol, [newPatrolConfig], this);
          }else {
            this.setVelocityX(-_patrolConfig.x);
            this.flipX = true;
            //_patrolConfig.flip = true;
            const newPatrolConfig = _patrolConfig;
            newPatrolConfig.flip = false;
            this.anims.play(`${this.sprite}Walk`, true);
            this.scene.time.delayedCall(_patrolConfig.delay, this.patrol, [newPatrolConfig], this);
          }
        } else {
          this.isPatrol = false;
          this.attack();
  
        }
      }else {
        this.anims.play(`${this.sprite}Walk`, true);
      }

    }

  }
  attack() {
    //if(!this.isAttacking) {
      this.isAttacking = true;
      this.setVelocityX(0);
      this.flipX = !this.flipX;
      //this.setVelocityY(-730);
      this.anims.play(`${this.sprite}AttackFrames`, true);
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
        if(!this.isJumping) this.anims.play(`${this.sprite}Move`, true);
      }

      /* Right*/
      else if (right.isDown) {
        this.setVelocityX(160);
        this.setFlipX(false)

        /* Play animation */
        if(!this.isJumping) this.anims.play(`${this.sprite}Move`, true);
      }else if (space.isDown) {
        this.attack();

      }

      /* Nothing */
      else {
        this.setVelocityX(0)
        this.anims.play(`${this.sprite}IdleFrames`,true);
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