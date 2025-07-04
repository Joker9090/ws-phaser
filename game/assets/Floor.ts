import Phaser from "phaser";
import Game from "../Game";

export type FloorTween =
  | Phaser.Tweens.Tween
  | Phaser.Types.Tweens.TweenBuilderConfig
  | Phaser.Types.Tweens.TweenChainBuilderConfig
  | Phaser.Tweens.TweenChain;
export type FloorConfig = {
  texture: string | Phaser.Textures.Texture;
  width?: number;
  height?: number;
  fix?: number;
  animation?: {
    xAxis?: {
      xDistance: number;
      xVel: number
    }
    yAxis?: {
      yDistance: number;
      yVel: number
    }
    startInverted?:boolean;
  }
  pos: {
    x: number;
    y: number;
  };
  scale?: {
    width: number;
    height: number;
  };
  tween?: Partial<FloorTween>;
  friction?: number;
  rotated?: boolean;
  inverted?: boolean;
  spriteSheet?: string;
  frames?: number[]
};

// Scene in class
class Floor extends Phaser.Physics.Arcade.Sprite {
  isJumping = false;
  scene: Game;
  hasEvent?: string;
  group: Phaser.Physics.Arcade.Group;
  animState: {
    x: 'start' | 'reverse'
    y: 'start' | 'reverse'
  } = {
    x: 'start',
    y: 'start'
  }
  rotate: boolean = false;
  config: FloorConfig;
  constructor(
    scene: Game,
    config: any,
    group: Phaser.Physics.Arcade.Group,
    frame?: string | number | undefined

  ) {
    super(scene, config.pos.x, config.pos.y, config.texture);
    this.scene = scene;
    this.group = group;
    this.rotate = config.rotate;
    this.config = config;
    const width = config.width ?? 120;
    const height = config.height ?? 108;
    const fix = config.fix ?? 20;
    const rota = config.rotated ?? false;
    const invrt = config.inverted ?? false
    const friction = config.friction ?? 1;
    if (config.scale) {
      this.setScale(config.scale.width, config.scale.height);
    }
    /* Floor add to physic world */
    scene.physics.add.existing(this);
    /* Floor add to scene */
    scene.add.existing(this);

    this.setDepth(10);
    this.body?.setSize(width, height).setOffset(fix, 0);
    this.setBounce(0);
    this.group?.add(this);
    this.setImmovable(true);
    this.setCollideWorldBounds(true);

    if (friction) this.setFriction(friction)
    if (config.tween) {
      const tween = this.scene.tweens.add({
        ...config.tween,
        targets: this,
      });
    }
    if (config.spriteSheet) {
      const portFrames = this.scene.anims.generateFrameNumbers(config.spriteSheet, {
        frames: config.frames
      })
      const portAnimConfig = {
        key: config.spriteSheet,
        frames: portFrames,
        frameRate: 24,
        repeat: -1
      }
      this.anims.create(portAnimConfig);
      this.anims.play(config.spriteSheet, true)
    }

    if (this.body) {
      const body = this.body as Phaser.Physics.Arcade.Body;
      body.setImmovable(true);
      // hitboxes largefloors
      if (rota) {
        body.setOffset(-50, -200);
      } else {
        body.setOffset(-200, -50);
      }

      if (rota && body) {
        body.setSize(height + fix, width);
        this.setRotation(Math.PI / 2);
      } else {
        body.setSize(width + fix, height + fix);
      }

      if (invrt && body) {
        // body.setSize(height, width);
        this.setRotation(Math.PI);
        this.flipY = true;
      } else {
        body.setSize(width + fix, height + fix);
      }
    }

    if (config.animation) {
      if (config.animation.xAxis) {
        console.log('xAxis', config.animation.xAxis.xDistance, config.animation.xAxis.xVel, this.x, config.pos.x, config.animation.xAxis.xDistance / 2)
        this.setVelocityX(config.animation.xAxis.xVel);
        console.log(this.body?.velocity.x, this.body?.velocity.y, 'velocity')
      }
      if (config.animation.yAxis) {
        this.setVelocityY(config.animation.yAxis.yVel);
      }
      if( config.animation.startInverted) {
        this.animState.x = 'reverse';
        this.animState.y = 'reverse';
        if (config.animation.xAxis) {
          this.setVelocityX(-config.animation.xAxis.xVel);
        }
        if (config.animation.yAxis) {
          this.setVelocityY(-config.animation.yAxis.yVel);
        }
      }
      // on scene update run animation with config
      scene.events.on("update", () => {
        this.animation(config)
      })
      // remove listener if scene is stop
      scene.events.on("shutdown", () => {
        scene.events.off("update");
      })
    }
  }

  animation = (config: FloorConfig) => {
    if (config.animation) {
      if (config.animation.xAxis) {
        if (this.x >= config.pos.x + config.animation.xAxis.xDistance / 2 && this.animState.x === 'start') {
        console.log('xAxis', config.animation.xAxis.xDistance, config.animation.xAxis.xVel)
          
          this.setVelocityX(-config.animation.xAxis.xVel);
          if (config.animation.yAxis) {
            if (this.scene.player && this.scene.player.body?.touching.down){
              this.scene.player.setVelocityY(-config.animation.yAxis.yVel);
            }
            this.setVelocityY(-config.animation.yAxis.yVel);
          }
          this.animState.x = 'reverse'
        } else if (this.x <= config.pos.x - config.animation.xAxis.xDistance / 2 && this.animState.x === 'reverse') {
        console.log('xAxis', config.animation.xAxis.xDistance, config.animation.xAxis.xVel)
          
          this.setVelocityX(config.animation.xAxis.xVel);
          if (config.animation.yAxis) {
            if (this.scene.player && this.scene.player.body?.touching.down){
              this.scene.player.setVelocityY(config.animation.yAxis.yVel);
            }
            this.setVelocityY(config.animation.yAxis.yVel);
          }
          this.animState.x = 'start'
        } 
      } else if (config.animation.yAxis) {
        if (this.y >= config.pos.y + config.animation.yAxis.yDistance / 2 && this.animState.y === 'start') {
          this.setVelocityY(-config.animation.yAxis.yVel);
      
          // Aplicar velocidad al personaje solo si está tocando ESTA plataforma
          if (this.scene.player?.body?.touching.down && this.isTouchingplayer()) {
            this.scene.player.setVelocityY(-config.animation.yAxis.yVel);
          } else if (this.scene.player?.body?.touching.up && this.isTouchingplayer()) {
            this.scene.player.setVelocityY(-config.animation.yAxis.yVel);
          }
      
          this.animState.y = 'reverse';
        } else if (this.y <= config.pos.y - config.animation.yAxis.yDistance / 2 && this.animState.y === 'reverse') {
          this.setVelocityY(config.animation.yAxis.yVel);
      
          // Aplicar velocidad al personaje solo si está tocando ESTA plataforma
          if (this.scene.player?.body?.touching.down && this.isTouchingplayer()) {
            this.scene.player.setVelocityY(config.animation.yAxis.yVel);
          } else if (this.scene.player?.body?.touching.up && this.isTouchingplayer()) {
            this.scene.player.setVelocityY(config.animation.yAxis.yVel);
          }
      
          this.animState.y = 'start';
        }
      }
      

    
    }
  }
  isTouchingplayer() {
    const player = this.scene.player;
  
    // Verificar si player está en contacto con esta plataforma
    if (!player || !player.body) return false;
  
    const playerBottom = player.y + player.height / 2;
    const playerTop = player.y - player.height / 2;
    const platformTop = this.y - this.height / 2;
    const platformBottom = this.y + this.height / 2;
  
    return (
      (playerBottom >= platformTop && playerTop <= platformBottom) &&
      Math.abs(player.x - this.x) < this.width / 2 // player está alineado horizontalmente con la plataforma
    );
  }
  // update() {
  //   this.animation()
  // }

}
export default Floor;
