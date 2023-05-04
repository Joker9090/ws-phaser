import Phaser from "phaser";

class Map0 {
  scene: Phaser.Scene
  debugGraphics: Phaser.GameObjects.Graphics
  config: {
    w: number,
    h: number
  } = {
    w: 2000,
    h: 1000
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
    const p2 = this.scene.physics.add.sprite(400, 670, "plataformaB").setScale(0.5);
    const p3 = this.scene.physics.add.sprite(600, 570, "plataformaA").setScale(0.6);
    const p4 = this.scene.physics.add.sprite(900, 470, "plataformaB").setScale(0.7);
    const p5 = this.scene.physics.add.sprite(1250, 370, "plataformaA").setScale(0.8);
    const p6 = this.scene.physics.add.sprite(1650, 870, "plataformaA").setScale(0.8);
    floor.addMultiple([p1,p2,p3,p4,p5,p6])
    const finishFloor = this.scene.physics.add.group({allowGravity: false, immovable: true})
    finishFloor.add(p6)
    return [floor, finishFloor] ; 
    
  }

}

export default Map0;