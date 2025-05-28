import Phaser from "phaser";
import Game from "../Game";

export type CollectableTween =
  | Phaser.Tweens.Tween
  | Phaser.Types.Tweens.TweenBuilderConfig
  | Phaser.Types.Tweens.TweenChainBuilderConfig
  | Phaser.Tweens.TweenChain;
export type CollectableConfig = {
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
  }
  pos: {
    x: number;
    y: number;
  };
  scale?: {
    width: number;
    height: number;
  };
  aura?: string | Phaser.Textures.Texture;
  auraColor?: number;
  shield?: string | Phaser.Textures.Texture;

  tween?: Partial<CollectableTween>;
  friction?: number;
  rotated?: boolean;
  inverted?: boolean;
  spriteSheet?: string;
  frames?: number[]
};

// Scene in class
class Collectable extends Phaser.Physics.Arcade.Sprite {
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
  };
  aura?: Phaser.GameObjects.Sprite;
  auraColor?: number;
  shield?: Phaser.GameObjects.Sprite;
  soundKey?: string;
  constructor(
    scene: Game,
    config: CollectableConfig,
    group: Phaser.Physics.Arcade.Group,
    frame?: string | number | undefined,
  ) {
    super(scene, config.pos.x, config.pos.y, config.texture);
    this.scene = scene;
    this.group = group;
    this.soundKey = config.shield ? 'shield' : 'collect';
    const width = config.width ?? 120;
    const height = config.height ?? 108;
    const fix = config.fix ?? -20;
    const rota = config.rotated ?? false;
    const invrt = config.inverted ?? false
    const friction = config.friction ?? 1;
    
    if (config.scale) {
      this.setScale(config.scale.width, config.scale.height);
    }
    scene.physics.add.existing(this);
    scene.add.existing(this);

    this.setDepth(10);
    this.body?.setSize(width, height).setOffset(fix, 0);
    this.setBounce(0);
    this.group.add(this);
    this.setImmovable(true);
    this.setCollideWorldBounds(true);
    if(config.aura) {
      this.aura = scene.add.sprite(config.pos.x, config.pos.y, config.aura).setScale(0.6);
      this.scene.UICamera?.ignore(this.aura)
      if (config.auraColor) {
        this.aura.setTint(config.auraColor);
      }
    }
    
    this.scene.tweens.add({
      targets: this.aura,
      alpha: 0.4,
      duration: 1000,
      yoyo: true,
      repeat: -1,
    });

    if (config.shield) {
      console.log("[Collectable] shield");
      this.shield = scene.add.sprite(config.pos.x, config.pos.y, config.shield);
      this.shield.setDepth(999);
      this.shield.setScale(0.6);
      this.shield.setAlpha(0.8);
      this.shield.setVisible(true);
      const invincibleAuraFrames = scene.anims.generateFrameNumbers("auraAnim", {
      frames: Array.from({ length: 6 }, (_, i) => i),
      });

      const invincibleAuraConfig = {
        key: "auraAnim",
        frames: invincibleAuraFrames,
        frameRate: 12,
        repeat: -1,
      };
      scene.anims.create(invincibleAuraConfig);
      this.shield?.anims.play("auraAnim");
      this.shield?.anims.setRepeat(-1);
    }
  }
  turnTo(value:boolean):void{
    console.log("invincible? turnTo", value);
    this.setVisible(value),
    this.aura?.setVisible(value),
    this.shield?.setVisible(value)
    if(this.shield && value){
      this.shield?.anims.play("auraAnim")
      this.shield?.anims.setRepeat(-1);
    }
  }
  // Override the destroy method
  destroyItem(fromScene?: boolean): void {
    // Call the OnDestroy method for cleanup
    this.aura?.destroy();
    this.shield?.destroy();
    // Call the parent class's destroy method
    super.destroy(fromScene);
  }
}
export default Collectable;
