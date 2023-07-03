import Phaser from "phaser";

export type UIConfig = {
  texture: string | Phaser.Textures.Texture;
  pos: {
    x: number;
    y: number;
  };
  scale: number;
};

// Scene in class
class UI extends Phaser.GameObjects.Image {
  scene: Phaser.Scene;
  groupItem?: Phaser.GameObjects.Group;
  constructor(
    scene: Phaser.Scene,
    config: UIConfig,
    group?: Phaser.GameObjects.Group
  ) {
    super(scene, config.pos.x, config.pos.y, config.texture);
    this.scene = scene;
    scene.add.existing(this);
    this.setDepth(100);
    this.setScale(config.scale);
    if (group) {
      this.groupItem = group;
      this.groupItem.add(this);
    }
    
  }
}

export default UI;
