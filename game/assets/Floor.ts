import Phaser from "phaser";

export type FloorTween = Phaser.Tweens.Tween | Phaser.Types.Tweens.TweenBuilderConfig | Phaser.Types.Tweens.TweenChainBuilderConfig | Phaser.Tweens.TweenChain
export type FloorConfig = {
  texture: string | Phaser.Textures.Texture
  width?: number,
  height?: number,
  fix?: number,
  velocityX?: number,
  velocityY?: number,
  pos: {
    x: number,
    y: number
  },
  scale? : {
    width: number,
    height: number,
  },
  tween?: Partial<FloorTween> 
}
// Scene in class
class Floor extends Phaser.Physics.Arcade.Sprite {
  isJumping = false;
  scene: Phaser.Scene;
  group: Phaser.Physics.Arcade.Group;
  constructor(scene: Phaser.Scene, config: FloorConfig, group: Phaser.Physics.Arcade.Group,  frame?: string | number | undefined) {
    super(scene,config.pos.x,config.pos.y,config.texture,config.velocityX)
    this.scene = scene;
    this.group = group;
    const width = config.width ?? 230
    const height = config.height ?? 40;
    const velocityX = config.velocityX ?? 25
    const fix = config.fix ?? 25

    if(config.scale) {
      this.setScale(config.scale.width, config.scale.height)
    }

    /* Piso add to physic world */
    scene.physics.add.existing(this);
    
    /* Piso add to scene */
    scene.add.existing(this);
    
    this.setSize(width,height).setOffset(fix,30)
    this.setVelocityX(velocityX)
    
    this.group.add(this)

    this.setImmovable(true)

    this.setDepth(19)

    if(config.tween) {
        const tween = this.scene.tweens.add({
          ...config.tween,
          targets: this
        })
    }
  }

}

export default Floor 