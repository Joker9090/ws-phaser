import Phaser, { Physics } from "phaser";

export type LargeFloorTween = Phaser.Tweens.Tween | Phaser.Types.Tweens.TweenBuilderConfig | Phaser.Types.Tweens.TweenChainBuilderConfig | Phaser.Tweens.TweenChain
export type LargeFloorIslandConfig = {
  textureA: string,
  textureB: string,
  textureC: string,
  width: {
    textureA: number,
    textureB: number,
    textureC: number,
  }, // width of middle asset
  height?: number,
  fix?: number,
  pos: {
    x: number,
    y: number
  },
  scale?: {
    width: number,
    height: number,
  },
  large: number,
  rotated: boolean,
}
// Scene in class
class LargeFloorIsland extends Phaser.GameObjects.Container {
  isJumping = false;
  scene: Phaser.Scene;
  group: Phaser.Physics.Arcade.Group;
  parts: Phaser.Physics.Arcade.Sprite[];
  constructor(scene: Phaser.Scene, config: LargeFloorIslandConfig, group: Phaser.Physics.Arcade.Group, frame?: string | number | undefined) {
    super(scene, config.pos.x, config.pos.y)
    this.parts = [];
    this.scene = scene;
    this.group = group;
    const height = config.height ?? 20;
    const fix = config.fix ?? 0


    for (let index = 0; index < config.large; index++) {

      const t = index === 0 ? config.textureA : index === config.large - 1 ? config.textureC : config.textureB

      const lastTilePos = (config.large - 1) * config.width.textureB

      const s = scene.add.sprite(
        index === 0 ? 0 : index === config.large - 1 ? lastTilePos : (index - 1)*config.width.textureB + config.width.textureA,
        0,
        t)
      this.add(s)

    }
    if (config.scale) {
      this.setScale(config.scale.width, config.scale.height)
    }

    this.setSize((config.width.textureB * config.large), height)
    scene.add.existing(this);
    this.group.add(this)
    if (this.body) {
      const body = (this.body as Phaser.Physics.Arcade.Body)
      body.setImmovable(true)
      // body.setOffset(((config.large - 1) / 2) * config.width.textureB, height * -1 + (fix / 2))
    }


  }
}
export default LargeFloorIsland;