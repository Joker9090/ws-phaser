import Phaser from "phaser";

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
  scene: Phaser.Scene;
  hasEvent?: string;
  group: Phaser.Physics.Arcade.Group;
  constructor(
    scene: Phaser.Scene,
    config: FloorConfig,
    group: Phaser.Physics.Arcade.Group,
    frame?: string | number | undefined

  ) {
    super(scene, config.pos.x, config.pos.y, config.texture);
    this.scene = scene;
    this.group = group;
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
    this.group.add(this);
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
      } else {
        body.setSize(width + fix, height + fix);
      }
    }


  }

}

export default Floor;
