import Phaser from "phaser";
import LifeBar from "./MultiBar";
import hitZone from "./hitZone";
import EventsCenter from "../EventsCenter";
import MultiBar from "./MultiBar";


export type HitboxType = Phaser.GameObjects.Rectangle & { id: string }


enum WeaponType { SWORD }

class Weapon {
  type: WeaponType;
  scene: Phaser.Scene;
  player: Player;
  hitboxes: HitboxType[] = [];
  hits: number = 0;

  constructor(scene: Phaser.Scene, player: Player, weaponType: WeaponType) {
    this.type = weaponType;
    this.scene = scene;
    this.player = player;
  }


  attack(callbackAttack: Function) {
    switch (this.type) {
      case WeaponType.SWORD:
        this.swordHit();
        this.scene.time.delayedCall(800, callbackAttack, [], this);
        break;
      default:
        callbackAttack()
      // nothing
    }
  }

  /* SWORD HIT */
  swordHit() {
    this.hits++;
    const id = "SWORD-" + this.hits;
    const { x, y } = this.player;
    const direction = (this.player.flipX) ? -20 : 20;
    const hitbox = this.scene.add.rectangle(x + direction, y, 50, 10, 0xfff, 0.5) as HitboxType;


    this.scene.tweens.add({
      targets: hitbox,
      yoyo: true,
      repeat: -1,
      x: +100,
      duration: 2000
    });

    hitbox.id = id;
    this.hitboxes.push(hitbox);
    this.scene.add.existing(hitbox);
    this.scene.time.delayedCall(1000, () => {
      let newHitboxes = []
      for (let index = 0; index < this.hitboxes.length; index++) {
        const h = this.hitboxes[index];
        if (h.id == id) h.destroy()
        else newHitboxes.push(h)
      }
      console.log(newHitboxes.map(h => h.id))
      this.hitboxes = [...newHitboxes];
    }, [], this);
  }
}

class Player extends Phaser.Physics.Arcade.Sprite {
  isJumping: boolean = false
  isAttacking: boolean = false
  sprite: string = '';
  life: number = 100;
  playerLvl: number = 1;
  playerExp: number = 0;
  playerStamin: number = 0;
  rechargeStamin: number = 0.1;
  powerDischargeNeed: number = 50;
  weapon?: Weapon;
  // swordHitBox: hitZone;

  constructor(scene: Phaser.Scene, x: number, y: number, sprite: string, frame: number) {
    super(scene, x, y, sprite, frame)

    this.createAnims(scene, sprite);
    this.sprite = sprite;

    this.setScale(0.3)
    // Agregar el player al mundo visual
    scene.add.existing(this)
    // Agregar el player al mundo fisico
    scene.physics.add.existing(this)

    /**Darknes implementation */
    //this.setPipeline('Light2D');

    this.setCollideWorldBounds(true);
    if (this.body) {
      const body = (this.body as Phaser.Physics.Arcade.Body)
      body.onWorldBounds = true;
      //this.body.setSize(800, 800, true); // GOOOD!
      this.body.setSize((this.width/2 - 150),(this.height/2))
      this.body.setOffset(220, 280);

    }

    this.weapon = new Weapon(scene, this, WeaponType.SWORD);
    this.setDepth(10);
    // this.swordHitBox = new hitZone(scene,100,100,32,64,0xffffff,0.5);

  }



  createAnims(scene: Phaser.Scene, sprite: string) {

    const knightIdleFrames = scene.anims.generateFrameNumbers(sprite, { start: 37, end: 41 });// done
    //const knightJumpFrames = scene.anims.generateFrameNumbers("knight", {frames: [6,7,8,9,10,11]});
    const knightJumpFrames = scene.anims.generateFrameNumbers(sprite, { start: 5, end: 10 });
    const knightMoveFrames = scene.anims.generateFrameNumbers(sprite, { start: 19, end: 35 });// done
    const knightDeadFrames = scene.anims.generateFrameNumbers(sprite, { start: 50, end: 65 });//done
    const knightDmgFrames = scene.anims.generateFrameNumbers(sprite, { start: 43, end: 48 });//done
    const knightDefFrames = scene.anims.generateFrameNumbers(sprite, { start: 24, end: 28 });
    const knightAttackFrames = scene.anims.generateFrameNumbers(sprite, { start: 0, end: 18 });// done

    const knightJumpConfig = {
      key: `${sprite}Jump`,
      frames: knightJumpFrames,
      frameRate: 6,
      repeat: 0,
    }

    const knightMoveConfig = {
      key: `${sprite}Move`,
      frames: knightMoveFrames,
      frameRate: 15,
      repeat: 0,
      //yoyo: true,
    }

    const knightIdleFramesConfig = {
      key: `${sprite}IdleFrames`,
      frames: knightIdleFrames,
      frameRate: 6,
      repeat: -1,
    }

    const knightDeadFramesConfig = {
      key: `${sprite}DeadFrames`,
      frames: knightDeadFrames,
      frameRate: 15,
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
      frameRate: 25,
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

  dead() {
    this.setVelocityX(0);
    this.anims.play(`${this.sprite}DeadFrames`, true);
    //this.Onstate = "dead";
  }

  checkPowerNeed() {
    if(this.powerDischargeNeed <= this.playerStamin ) {
      EventsCenter.emit("powerNeed", true);
    } else EventsCenter.emit("powerNeed", false);
  }

  reLoadStamin() {
    if(this.playerStamin < 100 && (this.playerStamin += this.rechargeStamin) < 100 ) {
      this.playerStamin += this.rechargeStamin;
      this.checkPowerNeed();
      EventsCenter.emit("staminaUpdate",this.playerStamin);
    }else if ((this.playerStamin += this.rechargeStamin) >= 100) {
      this.playerStamin = 100;
      this.checkPowerNeed();
      EventsCenter.emit("staminaUpdate",this.playerStamin);
    }
  }

  dischargeHability (spent: number) {
    // reemplazar por  this.powerDischargeNeed ??
    if(spent <= this.playerStamin) {
      //disparador de habilidad q tenga puesta
      EventsCenter.emit("staminaUpdate", ((spent)* -1));
    }else {
      console.log("No tiene suficiente estamina : ", this.playerStamin);
    }

  }

  giveExperience(moreExp: number = 10) {
    this.playerExp += moreExp;
    if(this.playerExp >= 100) {
      this.playerLvl += 1;
      this.playerExp = 0;
      EventsCenter.emit("levelUp",this.playerLvl);
      EventsCenter.emit("expUpdate",this.playerExp);
    } else {
      EventsCenter.emit("expUpdate",this.playerExp)
      //setBarNew
    }
  }

  getLife() {
    return this.life;
  }

  setLife(a:number) {
    this.life = a;
  }

  receivedDamage(dmgRecieved: number) {

    this.loseLife(dmgRecieved);
    if (this.life == 0) {
      EventsCenter.emit("lifeUpdate",-100) 
      this.dead();
    } else {
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
  }

  loseLife(dmgRecieved: number) {
    //const dmg = 10;
    //const dmg ? dmgRecieved : 10;

    this.life -= dmgRecieved;
    EventsCenter.emit("lifeUpdate",(dmgRecieved * -1)) 
    console.log("Vida del caballero: " + this.life);

  }

  takeLife(lifeBar: MultiBar) {
    //const moreLife = 10;
    if (lifeBar.fullBar) {
      if (this.life < 100) {
        this.life += 10;
        if (lifeBar.x + 10 > 100) {
          lifeBar.setBar(lifeBar.fullBar)
        } else lifeBar.updateBar(10);
      } else if (this.life >= 100) {
        //this.life = 99;
        //lifeBar.setBar(this.life);
      }
      console.log("takelife : " + this.life);

    }
  }

  idle() {
    console.log("idle")
    this.isJumping = false;
    //this.setVelocityX(0);
    //this.setVelocityY(0);
    if (!this.isAttacking) this.play(`${this.sprite}IdleFrames`);
  }

  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.setVelocityY(-450);
      this.setVelocityX(10);
      this.play(`${this.sprite}Jump`, true);
      this.scene.time.delayedCall(800, this.idle, [], this);
    }
  }

  doAnimationAttack(attackType: WeaponType) {
    switch (attackType) {
      case WeaponType.SWORD:
        this.play(`${this.sprite}AttackFrames`, true);
        break;
      default:
      // nothing
    }
  }

  attack() {
    if (!this.isAttacking && this.weapon) {
      console.log("attack");
      this.isAttacking = true;

      this.doAnimationAttack(this.weapon.type)
      this.weapon.attack(() => {
        console.log("[Debug] this.weapon.attack", this.isAttacking, this)
        this.isAttacking = false;
      });

      //this.swordHitBox.attackBox((this.x),(this.y),this.flipX, 10)
      //this.setVelocityY(-730);
    }
  }

  checkMove(cursors?: Phaser.Types.Input.Keyboard.CursorKeys | undefined) {


    /* Keywords press */
    if (cursors) {
      const { left, right, up, space } = cursors;

      /* Up / Juamp */
      if (up.isDown && this.body && this.body.touching.down) {
        /* Play animation */
        //this.anims.play(`${this.sprite}Jump`, true);
        this.jump()
      }


      /* Left*/
      if (left.isDown) {
        this.setVelocityX(-170);
        this.setFlipX(true)
        //this.scene.sound.play("playerWalk");

        /* Play animation */
        if (!this.isJumping) this.anims.play(`${this.sprite}Move`, true);
      }

      /* Right*/
      else if (right.isDown) {
        this.setVelocityX(170);
        this.setFlipX(false)
        //this.scene.sound.play("playerWalk");

        /* Play animation */
        if (!this.isJumping) this.anims.play(`${this.sprite}Move`, true);
      } else if (space.isDown) {
        this.attack();

      }


      /* Nothing */
      else {
        this.setVelocityX(0)
        if (!this.isAttacking && !this.isJumping) this.anims.play(`${this.sprite}IdleFrames`, true);
      }



    }
  }
}

export default Player