import Phaser from "phaser";
import Player from "./Player";
import hitZone from "./hitZone";
import MultiBar from "./MultiBar";

export type PatrolConfig = {
  x:number,
  delay:number,
  enemyDetect:boolean,
  anim?: string,
  flip?:boolean,
}

export class EnemyFactory extends Phaser.Physics.Arcade.Sprite {
  isJumping: boolean = false
  isAttacking: boolean = false
  isPatrol: boolean = false;
  followingWho?: Phaser.GameObjects.Sprite;
  isEnemyInFront: boolean = false
  patrolConfig?: PatrolConfig;
  life: number = 100;
  lifeBar?: MultiBar;
  Onstate?: string = "pasive";
  sprite: string = '';
  newHitBox: hitZone;
  rangeX: number = 100;
  rangeY: number = 100;

  constructor(scene: Phaser.Scene, x: number, y: number, sprite: string, frame: number, hitzone: hitZone, life?: number) {
    super(scene, x, y, sprite, frame)
    this.newHitBox = hitzone;
    this.sprite = sprite;

  }

  patrol(_patrolConfig:PatrolConfig){
    //console.log("Boss flip: ", _patrolConfig.flip, this.flipX);
      this.patrolConfig = _patrolConfig;
    //console.log("patrol log: "+_patrolConfig.x+_patrolConfig.delay+_patrolConfig.flip);
    if(this.Onstate != "dead"){
      this.isPatrol = true;
      if(_patrolConfig.flip != null ||_patrolConfig.flip != undefined)this.flipX = _patrolConfig.flip;    
      if(_patrolConfig.enemyDetect){
        if(!this.isEnemyInFront){
          if(this.flipX) {
            this.setVelocityX(_patrolConfig.x);
            //_patrolConfig.flip = true;
            const newPatrolConfig = _patrolConfig;
            newPatrolConfig.flip = false;
            this.anims.play(`${this.sprite}Walk`, true);
            this.scene.time.delayedCall(_patrolConfig.delay, this.patrol, [newPatrolConfig], this);
          }else {
            this.setVelocityX(-_patrolConfig.x);
            this.flipX = false;
            //_patrolConfig.flip = true;
            const newPatrolConfig = _patrolConfig;
            newPatrolConfig.flip = true;
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
    if (!this.isAttacking) {
      console.log("attack enemyBoss");
      // this.newHitBox.attackBox((this.x),(this.y),!this.flipX, 20)
      this.isAttacking = true;
      this.flipX = !this.flipX;
      console.log("`${this.sprite}AttackFrames`",`${this.sprite}AttackFrames`)
      this.play(`${this.sprite}AttackFrames`, true);
      //this.setVelocityY(-730);
      this.scene.time.delayedCall(600, () => {
        console.log("ENTRO ACA ??",this)

        this.isAttacking = false;
        this.isPatrol = true;
        this.isEnemyInFront = false;
        if(this.patrolConfig) {
          
          this.scene.time.delayedCall(this.patrolConfig.delay, this.patrol, [this.patrolConfig], this);
        }
        // this.idle()
      }, [], this);
    }
  }


  createAnims(scene: Phaser.Scene, sprite: string) {

    const enemyBossIdleFrames = scene.anims.generateFrameNumbers(sprite,{start:0 , end: 7});// done
    //const enemyBossWalkFrames = scene.anims.generateFrameNumbers("enemyBoss", {frames: [6,7,8,9,10,11]});
    const enemyBossWalkFrames = scene.anims.generateFrameNumbers(sprite, {start: 16, end:23});
    const enemyBossMoveFrames = scene.anims.generateFrameNumbers(sprite, { start:16 , end: 23 });
    const enemyBossDeadFrames = scene.anims.generateFrameNumbers(sprite,{start:32 , end: 39});
    const enemyBossDmgFrames = scene.anims.generateFrameNumbers(sprite,{start:24 , end: 31});
    const enemyBossDefFrames = scene.anims.generateFrameNumbers(sprite,{start:0 , end: 0});
    const enemyBossAttackFrames = scene.anims.generateFrameNumbers(sprite,{start:8 , end: 15});// done
    const enemyBossDeadFrame = scene.anims.generateFrameNumbers(sprite,{frames:[1]})

    const enemyBossWalkConfig = {
      key: `${sprite}Walk`,
      frames: enemyBossWalkFrames,
      frameRate: 8,
      repeat: -1,
    }

    const enemyBossMoveConfig = {
      key: `${sprite}Move`,
      frames: enemyBossMoveFrames,
      frameRate: 8,
      repeat: -1,
    }

    const enemyBossIdleFramesConfig = {
      key: `${sprite}IdleFrames`,
      frames: enemyBossIdleFrames,
      frameRate: 3,
      repeat: -1,
    }

    const enemyBossDeadFramesConfig = {
      key: `${sprite}DeadFrames`,
      frames: enemyBossDeadFrames,
      frameRate: 15,
      //duration:500,
      repeat: 0,
    }

    const enemyBossDeadFrameConfig = {
      key:`${sprite}DeadFrame`,
      frames: enemyBossDeadFrame,
      //frameRate:15,
      //repeat: -1,

    }

    const enemyBossDmgFramesConfig = {
      key: `${sprite}DmgFrames`,
      frames: enemyBossDmgFrames,
      frameRate: 10,
      repeat: 0,
    }

    const enemyBossDefFramesConfig = {
      key: `${sprite}DefFrames`,
      frames: enemyBossDefFrames,
      frameRate: 10,
      repeat: 0,
    }

    const enemyBossAttackFramesConfig = {
      key: `${sprite}AttackFrames`,
      frames: enemyBossAttackFrames,
      frameRate: 15,
      repeat: 0,
    }

    scene.anims.create(enemyBossWalkConfig);
    scene.anims.create(enemyBossMoveConfig);
    scene.anims.create(enemyBossIdleFramesConfig);
    scene.anims.create(enemyBossDeadFramesConfig);
    scene.anims.create(enemyBossDmgFramesConfig);
    scene.anims.create(enemyBossDefFramesConfig);
    scene.anims.create(enemyBossAttackFramesConfig);
    scene.anims.create(enemyBossDeadFrameConfig);

    
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

  enemyAround(target:Phaser.GameObjects.Sprite, maxRangeX: number, maxRangeY: number) {
    console.log("depth esqueleto ",this.depth);
    const dx = this.x - target.x;
    const dy = this.y - target.y;
    if (Math.abs(dx) < maxRangeX && Math.abs(dy) < maxRangeY) {
      this.isEnemyInFront = true;
      this.setVelocityX(0);
    } else if(Math.abs(dx) > maxRangeX && Math.abs(dy) > maxRangeY){
      this.isEnemyInFront = false;
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


  dmgAsWeapon (weaponDmg: number = 1) {
    let newLife = this.life - weaponDmg;
    console.log("EnemyBoss life: ", newLife);
    if(newLife <= 0) {
      this.life = 0;
      this.dead();
    } else {
      this.life = newLife;
      this.anims.play(`${this.sprite}DmgFrames`, true);
    }

  }

  receiveDamage() {
    const posibility = this.getRandomIntInclusive(3,10);
    console.log("posibility: "+posibility);
    if(posibility <= 2) {
      this.anims.play('enemyBossDefFrames', true);
      //this.scene.time.delayedCall(600, this.patrol, [this.patrolConfig], this);
    }else {
      this.anims.play('enemyBossDmgFrames', true);
      this.life= this.life - 1;
      console.log("cantidad de vidas ske: "+this.life);
      if(this.life == 0) {
        this.dead();
      }
      //this.attack();enemyBossDmgFrames
    }

  }

  updatePositionLifeBar () {
    if(this.lifeBar) {
      this.lifeBar.x = this.x;
      this.lifeBar.y = this.y - 15;
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

  update() {
    // console.log("entro update boss");
    // this.updatePositionLifeBar();
  }
}



class EnemyBoss extends EnemyFactory {
  rangeX: number = 200;
  rangeY: number = 20;

  constructor(scene: Phaser.Scene, x: number, y: number, sprite: string, frame: number,life?: number) {
    super(scene, x, y, sprite, frame, new hitZone(scene,150,150,32,64,0xfafa,0.5))

    this.createAnims(scene,sprite);

    this.sprite = sprite;
    this.setScale(0.5)
    this.flipX = true;
    // Agregar el player al mundo visual
    scene.add.existing(this)
    // Agregar el player al mundo fisico
    scene.physics.add.existing(this)

    /**Darknes implementation */
    //this.setPipeline('Light2D');

    this.setCollideWorldBounds(true);
    if(this.body) {
      const body = (this.body as Phaser.Physics.Arcade.Body)
      body.onWorldBounds = true;
      //this.body.setSize(35,80,true); // GOOOD!
      this.body.setSize(200, 385, true); // GOOOD!
      this.body.setOffset(200, 90);
    }

    const LifeConfig = {
      x: this.x,
      y: this.y - 15,
      sprite: "barraVidaenemigos-front",
      spriteContainer: "barraVidaenemigos-back",
      startFull: true,
    }

    this.lifeBar = new MultiBar(scene, LifeConfig);
  }


}

export default EnemyBoss