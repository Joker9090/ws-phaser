import Phaser from "phaser";
import Player from "./Player";
import hitZone from "./hitZone";
import MultiBar from "./MultiBar";
import { loadComponents } from "next/dist/server/load-components";

export type PatrolConfig = {
  x:number,
  delay:number,
  enemyDetect:boolean,
  anim?: string,
  flip?:boolean,
}

class EnemyFly extends Phaser.Physics.Arcade.Sprite {
  isJumping: boolean = false
  isAttacking: boolean = false
  isPatrol: boolean = false;
  isEnemyInFront: boolean = false
  patrolConfig?: PatrolConfig;
  life:number = 3;
  lifeBar?: MultiBar;
  Onstate?: string = "pasive";
  sprite: string = '';
  newHitBox: hitZone;
  rangeX: number = 80;
  rangeY: number = 10;

  constructor(scene: Phaser.Scene, x: number, y: number, sprite: string, frame: number,life?: number) {
    super(scene, x, y, sprite, frame)

    this.createAnims(scene,sprite);

    
    this.sprite = sprite;
    this.setScale(0.3)
    // Agregar el player al mundo visual
    scene.add.existing(this)
    
    const LifeConfig = {
      x: x,
      y: y - 15,
      sprite: "barraVidaenemigos-front",
      spriteContainer: "barraVidaenemigos-back",
      startFull: true,
    }
    this.lifeBar = new MultiBar(scene, LifeConfig);
    // Agregar el player al mundo fisico
    scene.physics.add.existing(this)

    /**Darknes implementation */
    //this.setPipeline('Light2D');

    this.setCollideWorldBounds(true);
    if(this.body) {
      const body = (this.body as Phaser.Physics.Arcade.Body)
      body.onWorldBounds = true;
      //this.body.setSize(35,80,true); // GOOOD!
      this.body.setSize(55, 265, true); // GOOOD!
      this.body.setOffset(200, 170);
    }

  
 
    const newContainer = scene.add.container(0,0, [this,this.lifeBar]);



    this.newHitBox = new hitZone(scene,150,150,32,64,0xfafa,0.5);
  }

  createAnims(scene: Phaser.Scene, sprite: string) {

    const enemyFlyIdleFrames = scene.anims.generateFrameNumbers(sprite,{start:0 , end: 5});// done
    //const enemyFlyWalkFrames = scene.anims.generateFrameNumbers("enemyFly", {frames: [6,7,8,9,10,11]});
    const enemyFlyWalkFrames = scene.anims.generateFrameNumbers(sprite, {start: 0, end:5});
    const enemyFlyMoveFrames = scene.anims.generateFrameNumbers(sprite, { start:0 , end: 0 });
    const enemyFlyDeadFrames = scene.anims.generateFrameNumbers(sprite,{start:18 , end: 23});
    const enemyFlyDmgFrames = scene.anims.generateFrameNumbers(sprite,{start:12 , end: 17});//done
    const enemyFlyDefFrames = scene.anims.generateFrameNumbers(sprite,{start:0 , end: 0});
    const enemyFlyAttackFrames = scene.anims.generateFrameNumbers(sprite,{start:6 , end: 11});// done
    const enemyFlyDeadFrame = scene.anims.generateFrameNumbers(sprite,{start:18 , end: 23})//done

    const enemyFlyWalkConfig = {
      key: `${sprite}Walk`,
      frames: enemyFlyWalkFrames,
      frameRate: 10,
      repeat: -1,
    }

    const enemyFlyMoveConfig = {
      key: `${sprite}Move`,
      frames: enemyFlyMoveFrames,
      frameRate: 10,
      repeat: -1,
    }

    const enemyFlyIdleFramesConfig = {
      key: `${sprite}IdleFrames`,
      frames: enemyFlyIdleFrames,
      frameRate: 3,
      repeat: -1,
    }

    const enemyFlyDeadFramesConfig = {
      key: `${sprite}DeadFrames`,
      frames: enemyFlyDeadFrames,
      frameRate: 12,
      //duration:500,
      repeat: 0,
    }

    const enemyFlyDeadFrameConfig = {
      key:`${sprite}DeadFrame`,
      frames: enemyFlyDeadFrame,
      //frameRate:15,
      //repeat: -1,

    }

    const enemyFlyDmgFramesConfig = {
      key: `${sprite}DmgFrames`,
      frames: enemyFlyDmgFrames,
      frameRate: 10,
      repeat: 0,
    }

    const enemyFlyDefFramesConfig = {
      key: `${sprite}DefFrames`,
      frames: enemyFlyDefFrames,
      frameRate: 10,
      repeat: 0,
    }

    const enemyFlyAttackFramesConfig = {
      key: `${sprite}AttackFrames`,
      frames: enemyFlyAttackFrames,
      frameRate: 15,
      repeat: 0,
    }

    scene.anims.create(enemyFlyWalkConfig);
    scene.anims.create(enemyFlyMoveConfig);
    scene.anims.create(enemyFlyIdleFramesConfig);
    scene.anims.create(enemyFlyDeadFramesConfig);
    scene.anims.create(enemyFlyDmgFramesConfig);
    scene.anims.create(enemyFlyDefFramesConfig);
    scene.anims.create(enemyFlyAttackFramesConfig);
    scene.anims.create(enemyFlyDeadFrameConfig);

    
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
    console.log("depth esqueleto ",this.depth);
    const dx = this.x - target.x;
    const dy = this.y - target.y;
    //console.log("EnemyFly around dx value: "+dx);
    if (Math.abs(dx) < maxRange && Math.abs(dy) < 2) {
      //EnemyFly.setVelocityX(Math.sign(dx) * SPEED);
      this.isEnemyInFront = true;
      this.setVelocityX(0);
      //console.log("EnemyFly around state from enemyFly: "+this.isEnemyInFront);
    } else if(Math.abs(dx) > maxRange&& Math.abs(dy) > 2){
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
    // DESTROY ?
  }
  getRandomIntInclusive(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  dmgAsWeapon (weaponDmg: number = 1) {
    let newLife = this.life - weaponDmg;
    console.log("EnemyFly life: ", newLife);
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
      this.anims.play('enemyFlyDefFrames', true);
      //this.scene.time.delayedCall(600, this.patrol, [this.patrolConfig], this);
    }else {
      this.anims.play(`${this.sprite}DmgFrames`, true);
      //this.anims.play('enemyFlyDmgFrames', true);
      this.life= this.life - 1;
      console.log("cantidad de vidas ske: "+this.life);
      if(this.life == 0) {
        this.dead();
      }
      //this.attack();enemyFlyDmgFrames
    }

  }

  updatePositionLifeBar () {
    if(this.lifeBar) {
      this.lifeBar.x = this.x;
      this.lifeBar.y = this.y - 15;
    }
  }


  patrol(_patrolConfig:PatrolConfig){
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
            //this.updatePositionLifeBar();
            this.scene.time.delayedCall(_patrolConfig.delay, this.patrol, [newPatrolConfig], this);
          }else {
            this.setVelocityX(-_patrolConfig.x);
            this.flipX = false;
            //_patrolConfig.flip = true;
            const newPatrolConfig = _patrolConfig;
            newPatrolConfig.flip = true;
            this.anims.play(`${this.sprite}Walk`, true);
            //this.updatePositionLifeBar();
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
      console.log("attack enemyFly");
      this.newHitBox.attackBox((this.x),(this.y),!this.flipX, 20)
      this.isAttacking = true;
      this.flipX = !this.flipX;
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
    console.log("entro update fly");
    this.updatePositionLifeBar();
  }
}

export default EnemyFly