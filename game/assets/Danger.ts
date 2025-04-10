import Phaser from "phaser";
import Game from "../Game";

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
  attackSpriteSheet?: string;

  particleSpriteSheet?: string;
  particleFrames?: number[]
};
class Danger extends Phaser.Physics.Arcade.Sprite {
    scene: Game;
    group: Phaser.Physics.Arcade.Group;
    animState: {
      x: 'start' | 'reverse'
      y: 'start' | 'reverse'
    } = {
      x: 'start',
      y: 'start'
    }
    particleSprite?: Phaser.GameObjects.Sprite;
    config: DangerConfig;
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
          
          // on scene update run animation with config
          scene.events.on("update", () => {
            this.IdleAnimation(config)
          })
          // remove listener if scene is stop
          scene.events.on("shutdown", () => {
            scene.events.off("update");
          })
        }
    }
    Attack(){
        if(this.config.attackSpriteSheet && this.scene.player?.isDead===false){
            console.log("[Danger] Attack animation started");
            this.scene.player!.isDead = true;
            this.anims.play("Attack",true);
            /*this.on("animationcomplete", () => {
                console.log("[Danger] Attack animation complete");
                this.scene.player!.isDead = false;
                this.scene.touchItem("fireball");
                this.setTexture(this.config.attackSpriteSheet!);
                this.setFrame(0);
            });*/
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
}
export default Danger;