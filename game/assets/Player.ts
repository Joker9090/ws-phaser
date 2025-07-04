import Phaser from "phaser";
import Game from "../Game";
import MultiScene from "../MultiScene";
import PreLoadScene from "../PreLoadScene";
import MapCreator from "@/game/maps/sandbox/MapCreator";

// Scene in class
class Player extends Phaser.Physics.Arcade.Sprite {
  touchedFloor: boolean = false;
  gravityGroup: Phaser.Physics.Arcade.Group;
  isJumping: boolean = false;
  isRotating: boolean = false;
  playerState: "NORMAL" | "ROTATED" = "NORMAL";
  cameraState: "NORMAL" | "ROTATED" = "NORMAL";
  canTp: boolean = true;
  isDead: boolean = false;

  scene: Game |MultiScene | PreLoadScene;
  gravityAnimSprite?: Phaser.GameObjects.Sprite;
  invincible: boolean = false;
  isFlying: boolean = false;
  withTank: boolean = false;
  tankGraphics?: Phaser.GameObjects.Graphics;
  //tank smoke
  tankAnimSprite?: Phaser.GameObjects.Sprite;

  auraAnimSprite?:Phaser.GameObjects.Sprite;
  gravity: number = 1000;
  gravityX: number = 0;
  tank: {
    fuel: number,
    isCharging: number,
    fuelLimit: number,
    consume: number,
    chargeValue: number,

    fuelConditionToStart: number,
    extraJumpAt?: number
  } = {
    fuel: 300,
    isCharging: 0,
    fuelLimit: 300,
    fuelConditionToStart: 120,
    chargeValue: 2,
    consume: 70,
    extraJumpAt: 300
  }

  constructor(
    scene: Game |MultiScene | PreLoadScene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    frame?: string | number | undefined
  ) {
    super(scene, x, y, texture);
    this.scene = scene;
    /* player animations */
    this.setOrigin()
    let frameRate = 20

    //tank smoke
    this.tankAnimSprite = this.scene.add.sprite(this.x, this.y, "tankActivate").setSize(0.8,0.8);
    this.tankAnimSprite.setVisible(false).setDepth(900);

    this.auraAnimSprite = this.scene.add.sprite(this.x, this.y, "invincibleAura");
    this.auraAnimSprite.setScale(0.7, 1.1);
    this.auraAnimSprite.setAlpha(0.8);
    this.auraAnimSprite.setVisible(false);

    const playerJumpFrames = scene.anims.generateFrameNumbers("player", {
      frames: Array.from({ length: 12 }, (_, i) => i + 36),
    });
    const playerJumpConfig = {
      key: "playerJump",
      frames: playerJumpFrames,
      frameRate: frameRate,
      repeat: 0,
    };

    const playerFlyingFrames = scene.anims.generateFrameNumbers("player", {
      frames: Array.from({ length: 5 }, (_, i) => i + 42),
    });
    const playerFlyingConfig = {
      key: "flyingAnimKey",
      frames: playerFlyingFrames,
      frameRate: 5,
      repeat: 0,
    };
    

    const playerMoveFrames = scene.anims.generateFrameNumbers("player", {
      frames: Array.from({ length: 12 }, (_, i) => i + 48),
    });
    const playerMoveConfig = {
      key: "playerMove",
      frames: playerMoveFrames,
      frameRate: frameRate,
      repeat: 0,
    };
    const playerLoaderConfig ={
      key: "playerLoader",
      frames: playerMoveFrames,
      frameRate: frameRate,
      repeat: -1,
    }
    const playerIdleFrames = scene.anims.generateFrameNumbers("player", {
      frames: Array.from({ length: 12 }, (_, i) => i + 24),
    });
    const playerIdleConfig = {
      key: "playerIdle",
      frames: playerIdleFrames,
      frameRate: frameRate,
      repeat: 0,
    }
    const playerRotateFrames = scene.anims.generateFrameNumbers("player", {
      frames: Array.from({ length: 24 }, (_, i) => i),
    });
    const playerRotateReverseFrames = scene.anims.generateFrameNumbers("player", {
      frames: (Array.from({ length: 24 }, (_, i) => i)).reverse(),
    });

    const playerRotate1Config = {
      key: "playerRotate1",
      frames: playerRotateReverseFrames,
      frameRate: frameRate,
      repeat: 0,
    }

    const playerRotate2Config = {
      key: "playerRotate2",
      frames: playerRotateReverseFrames,
      frameRate: frameRate * 2,
      repeat: 0,
    }

    const playerRotate3Config = {
      key: "playerRotate3",
      frames: playerRotateReverseFrames,
      frameRate: frameRate * 3,
      repeat: 0,
    }

    const playerRotateReverseConfig = {
      key: "playerRotateReverse",
      frames: playerRotateReverseFrames,
      frameRate: frameRate * 2,
      repeat: 0,
    }

    const gravityAnimFrames = scene.anims.generateFrameNumbers("gravityAnim", {
      frames: Array.from({ length: 10 }, (_, i) => i),
    });
    const gravityAnimConfig = {
      key: "gravityAnimKey",
      frames: gravityAnimFrames,
      frameRate: frameRate,
      repeat: 0,
    };

    //TANK SMOKE
    const tankActivateFrames = scene.anims.generateFrameNumbers("tankActivate", {
      frames: Array.from({ length: 6 }, (_, i) => i),
    });

    const tankActivateConfig = {
      key: "tankActivateAnim",
      frames: tankActivateFrames,
      frameRate: frameRate*1.2,
      repeat: 0,
    };

    const gravityActiveFrames= scene.anims.generateFrameNumbers("floatingSmoke",{
      frames: Array.from({length:10}, (_, i) => i),
    });
    const gravityActiveConfig = {
      key: "gravityActiveAnim",
      frames: gravityActiveFrames,
      frameRate: frameRate*1.2,
      repeat: -1,
    };

    const invincibleAuraFrames = scene.anims.generateFrameNumbers("auraAnim", {
      frames: Array.from({ length: 6 }, (_, i) => i),
    });

    const invincibleAuraConfig = {
      key: "auraAnim",
      frames: invincibleAuraFrames,
      frameRate: 12,
      repeat: -1,
    };

    /* player animations */
    scene.anims.create(playerJumpConfig);
    scene.anims.create(playerFlyingConfig)
    scene.anims.create(playerMoveConfig);
    scene.anims.create(playerLoaderConfig);
    scene.anims.create(playerIdleConfig);
    scene.anims.create(playerRotate1Config);
    scene.anims.create(playerRotate2Config);
    scene.anims.create(playerRotate3Config);
    scene.anims.create(playerRotateReverseConfig);
    scene.anims.create(gravityAnimConfig);
    //TANK SMOKE
    scene.anims.create(gravityActiveConfig);
    scene.anims.create(tankActivateConfig);
    scene.anims.create(invincibleAuraConfig);

    /* player add to physic world */
    

    this.gravityGroup = this.scene.physics.add.group({ 
      allowGravity: this.isFlying ? false : true,
    });
    this.gravityGroup.add(this);
    /* player add to scene */

    scene.add.existing(this);
    //@ts-ignore

    /* player change size and bounce */
    this.body?.setSize(50, 150);
    this.body?.setOffset(-5, 40);

    this.setScale(.7)
    this.setBounce(0);
    this.setDepth(999);
   

    this.gravityAnimSprite = this.scene.add.sprite(this.x, this.y, "gravityAnim", 0).setVisible(false).setDepth(999);
    if (this.scene instanceof Game) {
      this.scene.UICamera?.ignore(this);
      this.scene.cameras.getCamera('backgroundCamera')?.ignore(this);
      this.scene.UICamera?.ignore(this.gravityAnimSprite);
      this.scene.cameras.getCamera('backgroundCamera')?.ignore(this.gravityAnimSprite);
      this.scene.UICamera?.ignore(this.tankAnimSprite);
      this.scene.cameras.getCamera('backgroundCamera')?.ignore(this.tankAnimSprite);
      this.scene.UICamera?.ignore(this.auraAnimSprite);
      this.scene.cameras.getCamera('backgroundCamera')?.ignore(this.auraAnimSprite);
    }
    
    // this.scene.add.rectangle(this.x, this.y, 100, 100, 0xffffff).setVisible(true)
    /* player Collission with end of map */
    this.setCollideWorldBounds(true);
    if (this.body) {
      const body = this.body as Phaser.Physics.Arcade.Body;
      body.onWorldBounds = true;
    }
  }

  setPlayerWithTank(value: boolean) {
    this.withTank = value
  }

  setGravityOnPlayer(value: number) {
    this.gravity = value
    this.gravityGroup.world.gravity.y = value
  }

  setTintMask(value: number) {
    this.setTint(value)
  }
  clearTintMask() {
    this.clearTint()
  }
  setGravityOnPlayerX(value: number) {
    this.gravityX = value
    this.scene.physics.world.gravity.x = value
  }

  setPlayerFlying(value: boolean) {
    this.isFlying = value
    this.gravityGroup.world.gravity.y = value ? 0 : this.gravity
    this.setAcceleration(0, 0)
    if(value ==true){
      if (!this.tankAnimSprite)return;
      this.tankAnimSprite.setVisible(true);
      this.tankAnimSprite.anims.play("gravityActiveAnim");

      this.tankAnimSprite.on("animationupdate", () => {
      if (this.tankAnimSprite) {
        this.scene.cameras.getCamera('backgroundCamera')?.ignore(this.tankAnimSprite);
        if (this.scene instanceof Game) this.scene.UICamera?.ignore(this.tankAnimSprite);
      }
      let xF = this.x - 17;
      if (this.flipX) xF = this.x + 17;
        this.tankAnimSprite?.setPosition(xF, this.y + 100);
      });
    } else {
      if (!this.tankAnimSprite)return;
      this.tankAnimSprite.setVisible(false);
    }
  }
  setCameraState(state: "NORMAL" | "ROTATED") {
    this.cameraState = state
  }

  setPlayerState(state: "NORMAL" | "ROTATED") {
    this.playerState = state
  }

  setPlayerInvicinible(value: boolean) {
    this.invincible = value
    if(this.invincible==true){
      console.log("[Player] Invincible")
      this.auraAnimSprite?.setVisible(true).setDepth(this.depth + 1);
      if (this.auraAnimSprite) {
        this.scene.cameras.getCamera('backgroundCamera')?.ignore(this.auraAnimSprite);
        if (this.scene instanceof Game) this.scene.UICamera?.ignore(this.auraAnimSprite);
      }
      this.auraAnimSprite?.anims.play("auraAnim");
      this.auraAnimSprite?.on("animationupdate", () => {
        this.auraAnimSprite?.setPosition(this.x, this.y);
      });
    }else{
      this.auraAnimSprite?.setVisible(false);
    }
  }

  idle() {
    this.isJumping = false;
    this.isRotating = false
  }

  drawTank(){
    if(this.tankGraphics) this.tankGraphics.clear()
    else this.tankGraphics = this.scene.add.graphics()
    this.tankGraphics.fillStyle(0x000000, 1)
    const gameScene = this.scene as Game
    if (gameScene.UICamera) gameScene.UICamera.ignore(this.tankGraphics);
    if (gameScene.cameras.getCamera('backgroundCamera')) gameScene.cameras.getCamera('backgroundCamera')?.ignore(this.tankGraphics);

    let barSize = 100
    let barDistance = 75
    let barHeight = 13
    const limit0 = (this.tank.fuel - this.tank.fuelConditionToStart < 0) ? 0 : this.tank.fuel - this.tank.fuelConditionToStart
    const equivalent = (limit0 * barSize) / (this.tank.fuelLimit - this.tank.fuelConditionToStart)
    this.tankGraphics.fillRoundedRect(this.x - (barSize / 2), (this.playerState === "NORMAL" ? this.y - barDistance : this.y + barDistance), barSize, barHeight,5)
    this.tankGraphics.fillStyle(0xff0000, 0.9)
    if(this.tank.extraJumpAt) {
      this.tankGraphics.fillStyle(0xffffff, 0.9)
    }
    this.tankGraphics.fillRoundedRect(this.x - (barSize / 2), (this.playerState === "NORMAL" ? this.y - barDistance : this.y + barDistance), equivalent , barHeight,5)
    this.tankGraphics.setDepth(99)
  }
  //TANK SMOKE
  activateTankAnimation() {
  if (!this.tankAnimSprite||this.isFlying===true) return;
  this.scene.cameras.getCamera('backgroundCamera')?.ignore(this.tankAnimSprite);
  if (this.scene instanceof Game) this.scene.UICamera?.ignore(this.tankAnimSprite);
  /*let xF = this.x - 10;
    if (this.flipX) xF = this.x + 10;
    this.tankAnimSprite.setPosition(xF, this.y + 10);*/

  // Make the sprite visible and play the animation
  this.tankAnimSprite.setFlipY(this.playerState === "ROTATED");
  this.tankAnimSprite.setVisible(true);
  this.tankAnimSprite.anims.play("tankActivateAnim");
  // Update the position of the sprite based on the player's position

  this.tankAnimSprite.on("animationupdate", () => {
    let xF = this.x - 15;
    if (this.flipX) xF = this.x + 15;
    this.tankAnimSprite?.setPosition(xF, (this.playerState === "NORMAL" ? this.y + 60 : this.y - 60));
    // this.tankAnimSprite?.setFlipY(this.playerState === "ROTATED");
  });
  
  // Hide the sprite after the animation completes
  this.tankAnimSprite.on("animationcomplete", () => {
    this.tankAnimSprite?.setVisible(false);
  });
}
  // agregar varable isGrounded
  jump() {
    const condition = this.playerState === 'NORMAL' ? this.body?.touching.down : this.body?.touching.up
    console.log("jumping", this.withTank )
    if(this.withTank){
      if(this.tank.fuel > this.tank.consume && this.tank.fuel > this.tank.fuelConditionToStart){
        let jumpForce = 750;
        // if velocity is 0, start with setVelocity, otherwise increment actual velocity less
        if (this.body?.velocity.y === 0 || this.tank.extraJumpAt) {
          if(this.tank.extraJumpAt && this.tank.fuel > this.tank.consume){
             //Tank smoke
            this.activateTankAnimation();
            let value = this.tank.extraJumpAt
            this.tank.extraJumpAt = 0;
            //delay call to 300 ms to make the jump more fluid
            this.scene.time.delayedCall(value, () => {
              this.tank.extraJumpAt = value;
            });
            this.tank.fuel -= this.tank.consume
            this.tank.isCharging = 0;
          }
          this.setVelocityY(this.playerState === 'NORMAL' ? -jumpForce : jumpForce);
        } else {
          // this.tank.fuel -= this.tank.consume
          //@ts-ignore
          // this.setVelocityY(this.body?.velocity.y * 1.02)
          
        }

        // check if is player is jumping
        if (this.anims.currentAnim?.key !== "playerJump") {
          this.isJumping = true;
          this.anims.play("playerJump",true).once('animationcomplete', this.idle);
        }
       
      }
      
    } else {
      
      if (!this.isJumping && condition) {
        let jumpForce = 700;

        this.isJumping = true;
        this.anims.play("playerJump",true).once('animationcomplete', this.idle);
        this.setVelocityY(this.playerState === 'NORMAL' ? -jumpForce : jumpForce);
      }
    }
  }

  rotate(speed: 1 | 2 | 3 = 2) {
    if (!this.isRotating) {
      console.log("rotating", this.isRotating)
      this.isRotating = true
      this.gravityAnimSprite?.setVisible(true)
      this.gravityAnimSprite?.anims.play("gravityAnimKey").once('animationcomplete', () => this.gravityAnimSprite?.setVisible(false))
      this.setPlayerState(this.playerState === 'NORMAL' ? 'ROTATED' : 'NORMAL')
      this.anims.play(speed === 1 ? 'playerRotate1' : speed === 2 ? 'playerRotate2' : 'playerRotate3').once('animationcomplete', this.idle)
    }
  }

  touchingFeet(collidingWthith: Phaser.Physics.Arcade.Sprite) {
    return (this.body?.touching.down && this.playerState === "NORMAL") || // !collidingWthith.flipY && this.playerState === "NORMAL") ||
    (this.body?.touching.up && this.playerState === "ROTATED") //collidingWthith.flipY && this.playerState === "ROTATED")
  }

  checkMove(cursors?: Phaser.Types.Input.Keyboard.CursorKeys | undefined) {
    const scene = this.scene as Game
    let velocity = 300;
    let mobileVelocity = { x: scene.normalizedDragX * 350, y: scene.normalizedDragY * 350 };
    this.gravityAnimSprite?.setPosition(this.x, this.y)
    if(this.isFlying) {
      this.body?.setOffset(75,40)
      this.checkFly(cursors)
      return
    }
    if(this.withTank){
      this.drawTank()
      if(this.tank.isCharging){
        this.tank.fuel += this.tank.isCharging
        if(this.tank.fuel > this.tank.fuelLimit) this.tank.fuel = this.tank.fuelLimit
      }
    }
    if (this.playerState === "ROTATED") {
      this.body?.setOffset(75,10)
      this.setFlipY(true)
    }
    else if (this.playerState === "NORMAL") {
      this.body?.setOffset(75,40)
      this.setFlipY(false)
    }
    /* Keywords press */
    if (cursors) {
      const { left, right, up, space } = cursors;
      const isGrounded = this.playerState === "NORMAL" ? this.body?.touching.down : this.body?.touching.up;
      // @ts-ignore
      const masterVolume = this.scene.masterManagerScene.volumeSound;
      /* Left*/
      if (!isGrounded || this.isDead) {
        this.scene.sound.stopByKey('walk');
        this.scene.sound.removeByKey('walk');
      }
      if (!this.isDead) {
        if (left.isDown) {
          if ((!this.scene.sound.get('walk') || !this.scene.sound.get('walk')?.isPlaying) && isGrounded) {

        this.scene.sound.play('walk', { volume: masterVolume, loop: true });
        }
        if (scene.isTouchDevice) {
          this.setVelocityX(this.cameraState === 'NORMAL' ? mobileVelocity.x : -mobileVelocity.x);
        } else {
          this.setVelocityX(this.cameraState === 'NORMAL' ? -velocity : velocity);
        }
        if (!this.isJumping && !this.isRotating) this.anims.play("playerMove", true);
        this.setFlipX(this.cameraState === 'NORMAL' ? true : false);
      } else if (right.isDown) {
        // Only play the walk sound if it's not already playing
        if ((!this.scene.sound.get('walk') || !this.scene.sound.get('walk')?.isPlaying) && isGrounded) {
          this.scene.sound.play('walk', { volume: masterVolume, loop: true });
        }

        /* Right*/
        if (scene.isTouchDevice) {
          this.setVelocityX(this.cameraState === 'NORMAL' ? mobileVelocity.x : -mobileVelocity.x);
        } else {
          this.setVelocityX(this.cameraState === 'NORMAL' ? velocity : -velocity);
        }
        this.setFlipX(this.cameraState === 'NORMAL' ? false : true);
        if (!this.isJumping && !this.isRotating) this.anims.play("playerMove", true);
      } else {
        this.scene.sound.stopByKey('walk');
        this.scene.sound.removeByKey('walk');
        this.setVelocityX(0);
        if (!this.isJumping && !this.isRotating) this.anims.play("playerIdle", true);
      }
      /* Up / Jump */
      if ((up.isDown || space.isDown) && this.scene instanceof Game && !this.scene.isTouchDevice) {
        this.jump()
      }
    }
    }
  }
  moveOnLoader(){
    this.anims.play("playerLoader", true)
  }

  checkFly(cursors?: Phaser.Types.Input.Keyboard.CursorKeys | undefined) {
    //console.log("[Player] FlyingMode CheckFly");
    let velocity = 500;
    let limit = 500;
    /* Keywords press */
    const checkAcelerationLimit = (axis: 'x' | 'y') => {
      if(this.body && this.body.velocity){
        if(this.body.velocity[axis] > 0 && this.body.velocity[axis] > limit) this.body.velocity[axis] = limit
        if(this.body.velocity[axis] < 0 && this.body.velocity[axis] < -limit) this.body.velocity[axis] = -limit
      }
    }
    if (cursors) {
      const { left, right, up, down, space } = cursors;
      /* Left*/
      this.setMass(1)
      const flip = this.cameraState === "NORMAL" ? 1 : -1;
      const setAnim = () => {
        if (!this.isJumping && !this.isRotating) this.anims.play("flyingAnimKey", true);
      };

      if (left.isDown) {
        this.setAccelerationX(-velocity * flip);
        this.setFlipX(flip === 1);
        setAnim();
      } else if (right.isDown) {
        this.setAccelerationX(velocity * flip);
        this.setFlipX(flip !== 1);
        setAnim();
      } else {
        this.setAccelerationX(0);
        setAnim();
      }

      if (up.isDown) {
        this.setAccelerationY(-velocity);
      } else if (down.isDown) {
        this.setAccelerationY(velocity);
      } else {
        this.setAccelerationY(0);
        setAnim();
      }

      checkAcelerationLimit('x');
      checkAcelerationLimit('y');
      
    }
  }
  
  checkSideGravity(
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys | undefined
  ) {

    /* Keywords press */
    if (cursors) {
     
      const { up, down, left, right } = cursors;
      const velocity = 300;
      const gravity = this.gravity;
      if (up.isDown) {
        this.setVelocityY(-velocity);
        this.setFlipX(false);
        if (!this.isJumping && !this.isRotating) this.anims.play("playerMove", true);
      } else if (down.isDown && this.body) {
        this.setVelocityY(velocity);
        this.setFlipX(true);
        if (!this.isJumping && !this.isRotating) this.anims.play("playerMove", true);
      } else {
        this.setVelocityY(0);
        if (!this.isJumping && !this.isRotating) this.anims.play("playerIdle", true);
      }
      if (left.isDown) {
        this.scene.physics.world.gravity.x = -gravity;
        this.setFlipY(true);
      } else if (right.isDown) {
        this.scene.physics.world.gravity.x = gravity;
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
