import Phaser, { Physics } from "phaser";

export type LargeFloorTween =
  | Phaser.Tweens.Tween
  | Phaser.Types.Tweens.TweenBuilderConfig
  | Phaser.Types.Tweens.TweenChainBuilderConfig
  | Phaser.Tweens.TweenChain;
export type LargeFloorConfig = {
  textureA: string;
  textureB: string;
  textureC?: string
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
  large: number;
  rotated?: boolean;
  gap: number;
  planeta?: number;
  inverted?: boolean;
  invertedOffset?: number
};
// Scene in class
class LargeFloor extends Phaser.GameObjects.Container {
  isJumping = false;
  scene: Phaser.Scene;
  group: Phaser.Physics.Arcade.Group;
  parts: Phaser.Physics.Arcade.Sprite[];
  gap: number = 0;
  constructor(
    scene: Phaser.Scene,
    config: LargeFloorConfig,
    group: Phaser.Physics.Arcade.Group,
    frame?: string | number | undefined
  ) {
    super(scene, config.pos.x, config.pos.y);
    this.parts = [];
    const rota = config.rotated ?? false;
    this.scene = scene;
    this.group = group;
    const width = config.width ?? 403;
    const height = config.height ?? 93;
    const fix = config.fix ?? 13;
    this.gap = config.gap

    //Intercalates the two textures
    if (config.textureC) {
      if (config.planeta === 2) {
        for (let index = 1; index <= config.large; index++) {

          if (index === 1) {
            const s = scene.add.sprite(index * width + this.gap + 13, 0, config.textureA);
            this.add(s).setDepth(9)
          } else if (index === config.large) {
            const s = scene.add.sprite(index * width + this.gap + 65, 0, config.textureC);
            this.add(s).setDepth(9)
          } else {
            const s = scene.add.sprite(index * width + this.gap + 40, 15, config.textureB);
            this.add(s)
            if (config.scale) {
              s.setScale(config.scale?.width + 0.64, config.scale?.height + 0.66)
            }
          }

        }
      }else if(config.planeta === 4){
        for (let index = 1; index <= config.large; index++) {

          if (index === 1) {
            const s = scene.add.sprite(index * width + this.gap + 13, 0, config.textureA);
            this.add(s).setDepth(9)
          } else if (index === config.large) {
            const s = scene.add.sprite(index * width + this.gap + 65, 0, config.textureC);
            this.add(s).setDepth(9)
          } else {
            const s = scene.add.sprite(index * width + this.gap + 42, 0, config.textureB);
            this.add(s)
            if (config.scale) {
              s.setScale(config.scale?.width + 0.34, config.scale?.height +0.30)
            }
          }

        }
      }
       else {
        for (let index = 1; index <= config.large; index++) {

          if (index === 1) {
            const s = scene.add.sprite(index * width + this.gap, 0, config.textureA);
            this.add(s).setDepth(9)
          } else if (index === config.large) {
            const s = scene.add.sprite(index * width + this.gap, 0, config.textureC);
            this.add(s).setDepth(9)
          } else {
            const s = scene.add.sprite(index * width + this.gap, 15, config.textureB);
            this.add(s)
          }

        }
      }

    } else {
      for (let index = 0; index < config.large; index++) {
        const t = index % 2 == 0 ? config.textureA : config.textureB;
        const s = scene.add.sprite(index * width + this.gap, 0, t);
        this.add(s)
        this.sendToBack(s)
      }
    }


    //Set scale
    if (config.scale) {
      this.setScale(config.scale.width, config.scale.height);
    }

    //Set depth and add floor to world
    //this.setDepth(10);
    scene.add.existing(this);
    this.group.add(this);

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
        body.setSize(height + fix, width * config.large);
        this.setRotation(Math.PI / 2);
      } else if (config.inverted && config.invertedOffset) {
        body.setSize(width * config.large + fix, height + fix).setOffset(config.invertedOffset, -130);
        this.setRotation(Math.PI);
      }
      else {
        body.setSize(width * config.large + fix, height + fix).setOffset(-160, -130);
      }

    }
  }
}

export default LargeFloor;
