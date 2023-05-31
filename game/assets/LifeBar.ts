import Phaser, { Physics } from "phaser";

export type AntorchaTween = Phaser.Tweens.Tween | Phaser.Types.Tweens.TweenBuilderConfig | Phaser.Types.Tweens.TweenChainBuilderConfig | Phaser.Tweens.TweenChain
export type LifeBarConfig = {
    x: number,
    y:number,
    sprite:string,
    spriteContainer: string,

}
// Scene in class
class LifeBar extends Phaser.Physics.Arcade.Sprite {
  scene: Phaser.Scene;
  lifeMask?:Phaser.GameObjects.Image;
  //group: Phaser.Physics.Arcade.Group;
  
  constructor(scene: Phaser.Scene, config: LifeBarConfig,group?: Phaser.Physics.Arcade.Group , frame?: string | number | undefined) {
    super(scene, config.x, config.y, config.sprite)
    this.scene = scene;
    //this.group = group;
    
    //const s = scene.add.sprite(config.x,config.y,config.sprite);
    const greenBar = this.scene.add.image((config.x /2+config.x /9) , (config.y +(config.y/2.2)),config.sprite).setScale(0.1,0.1).setDepth(2);
    const greenBarMask = this.scene.add.image((config.x/2+config.x /9) , (config.y +(config.y/2.2)),config.sprite).setScale(0.1,0.1).setDepth(2);
    greenBarMask.visible = false;
    greenBarMask.defaultPipeline;
    greenBarMask.resetPipeline;
    greenBarMask.setScrollFactor(0,0);
    greenBar.defaultPipeline;
    greenBar.resetPipeline;
    greenBar.setScrollFactor(0,0);
    //this.UIGame = this.add.image((this.game.canvas.width -(this.game.canvas.width - 82)) , this.game.canvas.height + 86,"healthBarWithAlpha").setScale(0.1,0.1).setDepth(9);
    const lifeContainer = this.scene.add.image((config.x/2+config.x /9 -7) , (config.y +(config.y/2.2)),config.spriteContainer).setScale(0.1,0.1).setDepth(9);
    
    //this.UIGame.
    lifeContainer.defaultPipeline;
    lifeContainer.resetPipeline;
    lifeContainer.setScrollFactor(0,0);
    //greenBar.scaleX = 0.03
    //greenBar.setOrigin(1.1,0.5)
    greenBar.mask = new Phaser.Display.Masks.BitmapMask(this.scene, greenBarMask);
    this.lifeMask = greenBarMask;
    //greenBarMask.x -= 35;
    //greenBarMask.x= 200;

    scene.add.existing(this)

  }

  updateBar(scene:Phaser.Scene, value: number){
    if(this.lifeMask){
      if(value < 0){
        this.lifeMask.x += value;
        //this.greenBar.mask.x += value;
      }else {
        this.lifeMask.x -= value;
      }

    }

  }
}
export default LifeBar