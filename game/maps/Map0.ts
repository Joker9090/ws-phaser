import Phaser from "phaser";

class Map0 {
  scene: Phaser.Scene
  debugGraphics: Phaser.GameObjects.Graphics
  background: any;
  config: {
    w: number,
    h: number
  } = {
    w: 2400,
    h: 1000
  }
  constructor(scene: Phaser.Scene) {
    this.scene = scene
    
    this.scene.physics.world.setBounds(0,0,this.config.w,this.config.h)

    /* Debug */
    this.debugGraphics = this.scene.add.graphics();
    this.debugGraphics.fillStyle(0xffffff, 0.5);
    this.debugGraphics.fillRect(0, 0, this.config.w, this.config.h);
    
    /* Debug */

  }

  createMap() {
    const floor = this.scene.physics.add.group({ allowGravity: false, immovable: true }) 
    const p1 = this.scene.physics.add.sprite(100, 520, "plataformaA").setScale(0.7).setDepth(9);
    const p2 = this.scene.physics.add.sprite(420, 700, "plataformaA").setScale(0.5).setDepth(9);
    const p3 = this.scene.physics.add.sprite(750, 200, "plataformaA").setScale(1).setDepth(9);
    const p4 = this.scene.add.sprite(760, 120, "cuevaArriba").setScale(0.25).setDepth(8);
    const background = this.scene.add.sprite(0, 250, "background").setScale(3).setDepth(1);
    const nubes1 = this.scene.add.sprite(300, 100, "nubes1").setScale(2).setDepth(2);
    const nubes2 = this.scene.add.sprite(180, 500, "nubes2").setScale(2).setDepth(2);
    const cueva = this.scene.add.sprite(-650, 0, "cueva").setScale(1).setDepth(4);

    floor.addMultiple([p1,p2, p3])
    return floor; 
  }

//   this.tweens.add({
//     targets: p2,
//     y: 600,
//     ease: 'Sine.inOut',
//     yoyo: true,
//     repeat: -1
// });
  

}

export default Map0;