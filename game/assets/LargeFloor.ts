import Phaser, { Physics } from "phaser";

export type LargeFloorTween = Phaser.Tweens.Tween | Phaser.Types.Tweens.TweenBuilderConfig | Phaser.Types.Tweens.TweenChainBuilderConfig | Phaser.Tweens.TweenChain;
export type LargeFloorConfig = {
  textureA: string;
  textureB: string;
  width?: number;
  height?: number;
  fix?: number;
  pos: {
    x: number,
    y: number
  };
  scale?: {
    width: number,
    height: number,
  };
  large: number;
  rotated?: boolean;
}
// Scene in class
class LargeFloor extends Phaser.GameObjects.Container {
  isJumping = false;
  scene: Phaser.Scene;
  group: Phaser.Physics.Arcade.Group;
  parts: Phaser.Physics.Arcade.Sprite[];

  constructor(scene: Phaser.Scene, config: LargeFloorConfig, group: Phaser.Physics.Arcade.Group, frame?: string | number | undefined) {
    super(scene, config.pos.x, config.pos.y);
    this.parts = [];
    const rota = config.rotated ?? false;
    this.scene = scene;
    this.group = group;
    const width = config.width ?? 210;
    const height = config.height ?? 40;
    const fix = config.fix ?? 13;

    //Intercalates the two textures
    for (let index = 0; index < config.large; index++) {
      const t = (index % 2 == 0) ? config.textureA : config.textureB;
      const s = scene.add.sprite(index * width, 0, t);
      this.add(s);
    };

    //Set scale
    if (config.scale) {
      this.setScale(config.scale.width, config.scale.height);
    };

    //Set depth and add floor to world
    this.setDepth(10);
    scene.add.existing(this);
    this.group.add(this);

    if (this.body) {
      const body = (this.body as Phaser.Physics.Arcade.Body);
      body.setImmovable(true);
      if (rota) {
        body.setOffset(0, -90);
      } else {
        body.setOffset(-110, -50);
      };

      if (rota && body) {
        body.setSize(height + fix, width * config.large);
        this.setRotation(Math.PI / 2);
      } else {
        body.setSize(width * config.large + fix, height + fix);
      };
    };
  };
};

export default LargeFloor;