import Phaser, { Physics } from "phaser";

export type LargeFloorTween = Phaser.Tweens.Tween | Phaser.Types.Tweens.TweenBuilderConfig | Phaser.Types.Tweens.TweenChainBuilderConfig | Phaser.Tweens.TweenChain
export type LargeFloorConfig = {
  textureA: string 
  textureB: string
  width?: number,
  height?: number,
  fix?: number,
  pos: {
    x: number,
    y: number
  },
  scale? : {
    width: number,
    height: number,
  },
  large: number,
}
// Scene in class
class LargeFloor extends Phaser.GameObjects.Container {
  isJumping = false;
  scene: Phaser.Scene;
  group: Phaser.Physics.Arcade.Group;
  parts: Phaser.Physics.Arcade.Sprite[];
  constructor(scene: Phaser.Scene, config: LargeFloorConfig, group: Phaser.Physics.Arcade.Group,  frame?: string | number | undefined) {
    super(scene, config.pos.x, config.pos.y)
    this.parts = [];
    this.scene = scene;
    this.group = group;
    const width = config.width ?? 30
    const height = config.height ?? 25;
    const fix = config.fix ?? 40
    for (let index = 0; index < config.large; index++) {
      const t = (index  % 2 == 0) ? config.textureA : config.textureB
      const s = scene.add.sprite(index * width,0,t)
      s.setAlpha(0);
      /**Darknes implementation */
      //s.setPipeline('Light2D');
      this.add(s)
      
    }
    if(config.scale) {
      this.setScale(config.scale.width, config.scale.height)
    }
    this.setSize((width * config.large),height)
    scene.add.existing(this);
    this.group.add(this)
    if(this.body) {
      const body = (this.body as Phaser.Physics.Arcade.Body)
      body.setImmovable(true)
      body.setOffset(((config.large -1) / 2) * width,height * -1 + (fix / 2))
    }
        
    
  }
}
export default LargeFloor