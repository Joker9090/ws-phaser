import Phaser from "phaser";

class Map0 {
  scene: Phaser.Scene
  debugGraphics: Phaser.GameObjects.Graphics
  config: {
    w: number,
    h: number
  } = {
    w: 2000,
    h: 500
  }
  constructor(scene: Phaser.Scene) {
    this.scene = scene
    
    this.scene.physics.world.setBounds(0,0,this.config.w,this.config.h)

    /* Debug */
    this.debugGraphics = this.scene.add.graphics();
    this.debugGraphics.fillStyle(0x00ff, 0.5);
    this.debugGraphics.fillRect(0, 0, this.config.w, this.config.h);
    /* Debug */

  }

  createMap() {
    const floor = this.scene.physics.add.group({ allowGravity: false, immovable: true }) 
    const p1 = this.scene.physics.add.sprite(100, 470, "plataformaA").setScale(0.7);
    const p2 = this.scene.physics.add.sprite(400, 470, "plataformaA").setScale(0.3);
    floor.addMultiple([p1,p2])

    return floor; 
    
  }

}

export default Map0;