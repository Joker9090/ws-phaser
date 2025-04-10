import Phaser from "phaser";
import Game from "../Game";
import { TURBO_TRACE_DEFAULT_MEMORY_LIMIT } from "next/dist/shared/lib/constants";

export type DangerTween =
  | Phaser.Tweens.Tween
  | Phaser.Types.Tweens.TweenBuilderConfig
  | Phaser.Types.Tweens.TweenChainBuilderConfig
  | Phaser.Tweens.TweenChain;
export type DangerConfig = {
  texture: string | Phaser.Textures.Texture;
  width?: number;
  height?: number;
  animation?: {
    xAxis?: {
      xDistance: number;
      xVel: number
    }
    yAxis?: {
      yDistance: number;
      yVel: number
    }
  }
  pos: {
    x: number;
    y: number;
  };
  scale?: {
    width: number;
    height: number;
  };
  attackBurst?:{
    xAxis?: {
      xDistance: number;
      xVel: number
    }
    yAxis?: {
      yDistance: number;
      yVel: number
    }
  };
  attackSpriteSheet?: string;
  particleSpriteSheet?: string;
  particleFrames?: number[]
};
class Danger extends Phaser.Physics.Arcade.Sprite {
    scene: Game;
    group: Phaser.Physics.Arcade.Group;
    animState: {
      x: 'start' | 'reverse',
      y: 'start' | 'reverse'
    } = {
      x: 'start',
      y: 'start'
    }
    particleSprite?: Phaser.GameObjects.Sprite;
    config: DangerConfig;
    isIdle:boolean=true;
    burstAnimState: {
      x: 'start' | 'reverse',
      y: 'start' | 'reverse'
    } = {
      x: 'start',
      y: 'start'
    }
    constructor( scene: Game, config: DangerConfig, group: Phaser.Physics.Arcade.Group){
        super(scene, config.pos.x, config.pos.y, config.texture, 0);
        this.scene = scene;
        this.group = group;
        this.config = config;
        const width = config.width ?? 120;
        const height = config.height ?? 108;
        if (config.scale) {
            this.setScale(config.scale.width, config.scale.height);
        }
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.setDepth(10);
        this.body?.setSize(width, height);
        this.setBounce(0);
        this.group?.add(this);
        this.setImmovable(true);
        this.setCollideWorldBounds(true);

        if (config.attackSpriteSheet) {
            const portFrames = this.scene.anims.generateFrameNumbers(config.attackSpriteSheet, 
                {start:0 , end: this.scene.textures.get(config.attackSpriteSheet).frameTotal - 2});
            const portAnimConfig = {
                key: "Attack",
                frames: portFrames,
                frameRate: 24,
            }
            this.anims.create(portAnimConfig);
            this.setTexture(config.attackSpriteSheet);
            this.setFrame(0);

            this.on("animationcomplete", () => {
                console.log("[Danger] Attack animation complete");
                this.scene.player!.isDead = false;
                this.scene.touchItem("fireball");
                this.setTexture(this.config.attackSpriteSheet!);
                this.setFrame(0);
            });
        }
        if (config.particleSpriteSheet) {
            this.particleSprite = scene.add.sprite(config.pos.x, config.pos.y, config.particleSpriteSheet);
            this.particleSprite.setVisible(true);
            this.particleSprite.setDepth(11);
            this.scene.add.existing(this.particleSprite);
            const partFrames= scene.anims.generateFrameNumbers(config.particleSpriteSheet, {
                start:1 , end: this.scene.textures.get(config.particleSpriteSheet).frameTotal - 2});
            const partAnimConfig = {
                key: "particleSpriteSheet",
                frames: partFrames,
                frameRate: 24,
                repeat:-1,
                yoyo:true
            }
            this.particleSprite.anims.create(partAnimConfig);
            this.particleSprite.anims.play("particleSpriteSheet");
            this.particleSprite.on("animationupdate",() => {
                this.particleSprite!.setPosition(this.x, this.y);
            })
        }
        
        if (config.animation) {
          if (config.animation.xAxis) {
            this.setVelocityX(config.animation.xAxis.xVel);
          }
          if (config.animation.yAxis) {
            this.setVelocityY(config.animation.yAxis.yVel);
          }
          
          scene.events.on("update", () => {
            if(this.isIdle){
              this.IdleAnimation(config)
            }
          })
          scene.events.on("shutdown", () => {
            scene.events.off("update");
          })

          if(config.attackBurst){
            scene.events.on("update", () => {
              if(!this.isIdle){
                this.AttackBurstAnimation(config)
              }
            })
            scene.events.on("shutdown", () => {
              scene.events.off("update");
            })
            this.startInterruption();
          }
        }
    }
    startInterruption() {
      const randomTime1 = Phaser.Math.Between(2000, 5000); 
      this.scene.time.delayedCall(randomTime1, () => {
        this.interruptIdleAnimation();
      });
    }
    interruptIdleAnimation() {
      if (this.isIdle) {
        this.isIdle = false;
        if (this.config.attackBurst?.xAxis) {
            this.setVelocityX(this.config.attackBurst.xAxis.xVel);
          }
        if (this.config.attackBurst?.yAxis) {
          this.setVelocityY(this.config.attackBurst.yAxis.yVel);
        }
        console.log("[Danger] Interrupting IdleAnimation");
        const randomTime2 = Phaser.Math.Between(2000, 5000);
        this.scene.time.delayedCall(randomTime2, () => {
          this.resumeIdleAnimation();
        });
    } 
  }
  resumeIdleAnimation() {
    console.log("[Danger] Resuming IdleAnimation");
    this.isIdle = true;
    if (this.config.animation?.xAxis) {
      this.setVelocityX(this.config.animation.xAxis.xVel);
    }
    if (this.config.animation?.yAxis) {
      this.setVelocityY(this.config.animation.yAxis.yVel);
    }
    this.startInterruption();
  }
    Attack(){
        if(this.config.attackSpriteSheet && this.scene.player?.isDead===false){
          console.log("[Danger] Attack animation started");
          this.scene.player!.isDead = true;
          this.anims.play("Attack",true);
        }
    }
    IdleAnimation = (config: DangerConfig) => {
        if (config.animation) {
          if (config.animation.xAxis) {
            if (this.x >= config.pos.x + config.animation.xAxis.xDistance / 2 && this.animState.x === 'start') {
              this.setVelocityX(-config.animation.xAxis.xVel);
              if (config.animation.yAxis) {
                this.setVelocityY(-config.animation.yAxis.yVel);
              }
              this.animState.x = 'reverse'
            } else if (this.x <= config.pos.x - config.animation.xAxis.xDistance / 2 && this.animState.x === 'reverse') {
              this.setVelocityX(config.animation.xAxis.xVel);
              if (config.animation.yAxis) {
                this.setVelocityY(config.animation.yAxis.yVel);
              }
              this.animState.x = 'start'
            } 
          } else if (config.animation.yAxis) {
            if (this.y >= config.pos.y + config.animation.yAxis.yDistance / 2 && this.animState.y === 'start') {
              this.setVelocityY(-config.animation.yAxis.yVel);
              this.animState.y = 'reverse';
            } else if (this.y <= config.pos.y - config.animation.yAxis.yDistance / 2 && this.animState.y === 'reverse') {
              this.setVelocityY(config.animation.yAxis.yVel);
              this.animState.y = 'start';
            }
          }
        }
    }
    AttackBurstAnimation = (config: DangerConfig) => {
        if (config.attackBurst) {
          if (config.attackBurst.xAxis) {
            if (this.x >= config.pos.x + config.attackBurst.xAxis.xDistance / 2 && this.burstAnimState.x === 'start') {
              this.setVelocityX(-config.attackBurst.xAxis.xVel);
              if (config.attackBurst.yAxis) {
                this.setVelocityY(-config.attackBurst.yAxis.yVel);
              }
              this.burstAnimState.x = 'reverse'
            } else if (this.x <= config.pos.x - config.attackBurst.xAxis.xDistance / 2 && this.burstAnimState.x === 'reverse') {
              this.setVelocityX(config.attackBurst.xAxis.xVel);
              if (config.attackBurst.yAxis) {
                this.setVelocityY(config.attackBurst.yAxis.yVel);
              }
              this.burstAnimState.x = 'start'
            } 
          } else if (config.attackBurst.yAxis) {
            if (this.y >= config.pos.y + config.attackBurst.yAxis.yDistance / 2 && this.burstAnimState.y === 'start') {
              this.setVelocityY(-config.attackBurst.yAxis.yVel);
              this.burstAnimState.y = 'reverse';
            } else if (this.y <= config.pos.y - config.attackBurst.yAxis.yDistance / 2 && this.burstAnimState.y === 'reverse') {
              this.setVelocityY(config.attackBurst.yAxis.yVel);
              this.burstAnimState.y = 'start';
            }
          }
        }
    }
}
export default Danger;