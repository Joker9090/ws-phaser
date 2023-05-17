import Phaser from "phaser";
import Cueva from "../assets/Cueva";
import Nube from "../assets/Nubes";

class Map0 {
  scene: Phaser.Scene
  debugGraphics: Phaser.GameObjects.Graphics
  background: any;
  config: {
    w: number,
    h: number
  } = {
    w: 2400,
    h: 800
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
    const background = this.scene.add.sprite(0, 250, "background").setScale(3).setDepth(1);
    const nubes1 = this.scene.add.sprite(300, 100, "nubes1").setScale(2).setDepth(2);
    const nubes2 = this.scene.add.sprite(180, 500, "nubes2").setScale(1).setDepth(2);
    const fondo = this.scene.add.sprite(-650, 100, "cueva").setScale(1).setDepth(4);
    
    const cueva = new Cueva(this.scene,750,400,"plataformaA","cuevaArriba")
    
    // const p4 = this.scene.add.sprite(760, 220, "cuevaArriba").setScale(0.25).setDepth(8);
    //const p3 = this.scene.physics.add.sprite(750, 200, "plataformaA").setScale(1).setDepth(9);

    const nube1 = new Nube(this.scene, 0, 0, "nube", 1, true)
    const nube2 = new Nube(this.scene, 400, 100, "nube", 0.8, true)
    const nube3 = new Nube(this.scene, 200, 200, "nube", 0.4, true)

    floor.addMultiple([p1,p2, cueva])
    this.scene.tweens.add({
        targets: p2,
        duration:8000,
        y: "-=400",
        ease: 'Sine.inOut',
        yoyo: true,
        repeat: -1
    });
    return [floor, cueva.sprite]; 
  }

//   
  

}

export default Map0;