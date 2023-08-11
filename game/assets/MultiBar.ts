import Phaser, { Physics } from "phaser";

export type AntorchaTween = Phaser.Tweens.Tween | Phaser.Types.Tweens.TweenBuilderConfig | Phaser.Types.Tweens.TweenChainBuilderConfig | Phaser.Tweens.TweenChain
export type MultiBarConfig = {
    x: number,
    y:number,
    sprite:string,
    spriteContainer: string,
    startFull: boolean,
    scale?:number,
    addContainer?: Phaser.GameObjects.Container,

}
// Scene in class
class MultiBar extends Phaser.GameObjects.Container {
  scene: Phaser.Scene;
  lifeMask?:Phaser.GameObjects.Image;
  fullBar?: number;
  scaleForBar?: number = 0.6;
  testBar?: Phaser.GameObjects.Image;
  //group: Phaser.Physics.Arcade.Group;
  
  constructor(scene: Phaser.Scene, config: MultiBarConfig,group?: Phaser.Physics.Arcade.Group , frame?: string | number | undefined) {
    super(scene, config.x, config.y)
    this.scene = scene;
    //this.group = group;
    if(config.scale) this.scaleForBar = config.scale;
    //const s = scene.add.sprite(config.x,config.y,config.sprite);
    const greenBar = this.scene.add.image((config.x /2+config.x /9) , (config.y +(config.y/2.2)),config.sprite).setScale(this.scaleForBar).setDepth(2).setOrigin(0);
    const greenBarMask = this.scene.add.image((config.x/2+config.x /9) , (config.y +(config.y/2.2)),config.sprite).setScale(this.scaleForBar).setDepth(2).setOrigin(0);
    greenBarMask.visible = false;
    greenBarMask.defaultPipeline;
    greenBarMask.resetPipeline;
    greenBarMask.setScrollFactor(0,0);
    greenBar.defaultPipeline;
    greenBar.resetPipeline;
    greenBar.setScrollFactor(0,0);
    //this.UIGame = this.add.image((this.game.canvas.width -(this.game.canvas.width - 82)) , this.game.canvas.height + 86,"healthBarWithAlpha").setScale(0.1,0.1).setDepth(9);
    const lifeContainer = this.scene.add.image((config.x/2+config.x /9 -7) , (config.y +(config.y/2.2)),config.spriteContainer).setScale(this.scaleForBar).setDepth(1).setOrigin(0);
    
    //this.UIGame.
    lifeContainer.defaultPipeline;
    lifeContainer.resetPipeline;
    lifeContainer.setScrollFactor(0,0);
    //greenBar.scaleX = 0.03
    //greenBar.setOrigin(1.1,0.5)
    greenBar.mask = new Phaser.Display.Masks.BitmapMask(this.scene, greenBarMask);
    
    this.testBar = greenBar;

    this.lifeMask = greenBarMask;
    this.fullBar = this.lifeMask.x;
    if(!config.startFull) {
      this.lifeMask.x = 0;
    }
    //greenBarMask.x -= 35;
    //greenBarMask.x= 200;

    if(config.addContainer) {
      config.addContainer.add([
      greenBar,
      greenBarMask,
      lifeContainer])
    }
    scene.add.existing(this)

  }

  toggleDisabled(isActive: boolean){
    console.log("llega: ",isActive);
    let newSprite = "";
    if(!isActive && this.lifeMask){
      newSprite = "SettingsBarraVolumenApagado";

    }else {
      newSprite = "SettingsBarraVolumenEncendido";
    }

    console.log("Sprite es : ",newSprite);
    this.scene.tweens.add({
      targets: [this.testBar],
      props: {
          texture: { value: newSprite, duration: 0, delay: 50 }
      },
      ease: 'Linear'
    });

  }

  updateBar(value: number){
    // en music y sound 85 de lifemask por click
    if(this.lifeMask && this.fullBar){
      console.log("LIFEBAR lifemask pre value: ",this.lifeMask.x);
      if(value > 0){
        console.log("entro if");
        const a = (this.fullBar / 100) * value;
        if((this.lifeMask.x + a) > this.fullBar) this.lifeMask.x = this.fullBar
        else this.lifeMask.x += a;
        //this.greenBar.mask.x += value;
      }else {
        console.log("entro else");
        const a = ((this.fullBar / 100) * value) * -1;
        if((this.lifeMask.x - a) < 511) this.lifeMask.x = 511;
        else this.lifeMask.x -= a;
      }
      //const a = (this.fullBar / 100) * value; 
      //const b = this.lifeMask.x - a;
      //console.log("LIFEBAR CHEQUEO ",a);
      //console.log("LIFEBAR CHEQUEO2 ",b);
      console.log("LIFEBAR lifemask post value: ",this.lifeMask.x);

    }

  }
  
  setBarNew(value: number) {
    if(this.fullBar && this.lifeMask){
      const a = (this.fullBar / 100) * value
      if(a < 0) this.lifeMask.x = 0;
      else this.lifeMask.x = a;
    }

  }

  setBar(value: number){
    if(this.lifeMask){
      console.log("lifemask value default:",this.lifeMask.x)
      this.lifeMask.x = value;
    }
  }
}
export default MultiBar