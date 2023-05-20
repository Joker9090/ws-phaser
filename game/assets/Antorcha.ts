import Phaser, { Physics } from "phaser";

export type AntorchaTween = Phaser.Tweens.Tween | Phaser.Types.Tweens.TweenBuilderConfig | Phaser.Types.Tweens.TweenChainBuilderConfig | Phaser.Tweens.TweenChain
export type AntorchaConfig = {
    x: number,
    y:number,
    sprite:string,

}
// Scene in class
class Antorcha extends Phaser.Physics.Arcade.Sprite {
  scene: Phaser.Scene;
  //group: Phaser.Physics.Arcade.Group;
  constructor(scene: Phaser.Scene, config: AntorchaConfig,group?: Phaser.Physics.Arcade.Group , frame?: string | number | undefined) {
    super(scene, config.x, config.y, config.sprite)
    this.scene = scene;
    //this.group = group;
    scene.add.existing(this)
    //const s = scene.add.sprite(config.x,config.y,config.sprite);
    /**Darknes implementation */
    
    //this.group.add(this)
    this.createAnims(scene,config);
    //const antorchaFrames = scene.anims.generateFrameNumbers("antorcha", { start: 0, end: 3 });

    //const antorchaIdleFramesConfig = {
    //  key: "antorchaIdleFrames",
    // frames: antorchaFrames,
    //  frameRate: 4,
    //  repeat: -1,
    //}
    //scene.anims.create(antorchaIdleFramesConfig)
    //this.play("antorchaIdleFrames");
    this.setPipeline('Light2D');
        
    
  }

  createAnims(scene: Phaser.Scene,config:AntorchaConfig){
    const antorchaFrames = scene.anims.generateFrameNumbers(config.sprite, { start: 0, end: 3 });

    const antorchaIdleFramesConfig = {
      key: "antorchaIdleFrames",
      frames: antorchaFrames,
      frameRate: 8,
      repeat: -1,
    }
    scene.anims.create(antorchaIdleFramesConfig)
    this.play("antorchaIdleFrames");

    /*     scene.tweens.add({
            targets: this,
            alphaTopLeft: { value: 1, duration: 5000, ease: 'Power1' },
            alphaBottomRight: { value: 1, duration: 10000, ease: 'Power1' },
            alphaBottomLeft: { value: 1, duration: 5000, ease: 'Power1', delay: 5000 },
            yoyo: true,
            loop: -1

        }); */
  }
}
export default Antorcha