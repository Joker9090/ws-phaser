import Phaser from "phaser";
import Cueva from "../assets/Cueva";
import CloudGenerator, { CloudGeneratorConfig } from "../assets/CloudGenerator";
import Floor, { FloorConfig } from "../assets/Floor";

class Map0 {
  scene: Phaser.Scene
  debugGraphics: Phaser.GameObjects.Graphics
  background: any;
  pisos?: Phaser.Physics.Arcade.Group
  config: {
    w: number,
    h: number
  } = {
    w: 1600,
    h: 1000
  }
  constructor(scene: Phaser.Scene) {
    this.scene = scene
    
    this.scene.physics.world.setBounds(0,0,this.config.w,this.config.h)

    /* Debug */
    this.debugGraphics = this.scene.add.graphics();
    this.debugGraphics.fillStyle(0xff4444, 0.5);
    this.debugGraphics.fillRect(0, 0, this.config.w, this.config.h);
    
    /* Debug */

    this.scene.add.graphics().fillStyle(0x619b9b, 0.5).fillRect(0, 900, this.config.w, this.config.h).setDepth(35);

  }

  createMap() {
    const floor = this.scene.physics.add.group({ allowGravity: false, immovable: true });
    const floorFall = this.scene.physics.add.group({ allowGravity: false, immovable: false });
    const background = this.scene.add.sprite(0, 250, "background").setScale(5).setDepth(0);
    const sun = this.scene.add.sprite(500, 200, "sun").setScale(0.7).setDepth(0);
    const cuevaInicio = this.scene.add.sprite(-400, 600, "cueva").setScale(1).setDepth(9);
    const cuevaInicio2 = this.scene.add.sprite(-680, 400, "cueva").setScale(1.4).setDepth(8).setTint(0x555555);
    

    //PISOS 

    this.pisos = this.scene.physics.add.group({ allowGravity: false });
    
    const p1Config: FloorConfig = {
      texture: "plataformaA",
      pos: { x: 100, y: 700, },
      scale: { width: 0.7, height: 0.7, }
    }
    
    const p3Config: FloorConfig = {
      texture: "plataformaA",
      pos: { x: 500, y: 700, },
      scale: { width: 0.7, height: 0.7, }
    }

    // pisos que se caen
    const p4Config: FloorConfig = {
      texture: "plataformaA",
      pos: { x: 700, y: 600, },
      scale: { width: 0.5, height: 0.5, }
    }

    const p5Config: FloorConfig = {
      texture: "plataformaA",
      pos: { x: 850, y: 500, },
      scale: { width: 0.5, height: 0.5, }
    }
    const p6Config: FloorConfig = {
      texture: "plataformaA",
      pos: { x: 1000, y: 450, },
      scale: { width: 0.5, height: 0.5, }
    }
    const p7Config: FloorConfig = {
      texture: "plataformaA",
      pos: { x: 1100, y: 400, },
      scale: { width: 0.5, height: 0.5, }
    }
    const p8Config: FloorConfig = {
      texture: "plataformaA",
      pos: { x: 1200, y: 350, },
      scale: { width: 0.5, height: 0.5, }
    }
    
    const p1 = new Floor(this.scene, p1Config, this.pisos)
    const p2 = this.scene.physics.add.sprite(320, 700, "plataformaA").setScale(0.6).setDepth(2).setSize(230, 40).setOffset(30,30);
    const p3 = new Floor(this.scene, p3Config, this.pisos)
    const p4 = new Floor(this.scene, p4Config, this.pisos)
    //pisos que se caen
    const p5 = new Floor(this.scene, p5Config, this.pisos)
    const p6 = new Floor(this.scene, p6Config, this.pisos)
    const p7 = new Floor(this.scene, p7Config, this.pisos)
    const p8 = new Floor(this.scene, p8Config, this.pisos)
    
    const cueva = new Cueva(this.scene,1500,600,"plataformaA","cuevaArriba")

    floor.addMultiple([p1, p2, p3, p4, p5, p6, p7, p8, cueva])
    floorFall.addMultiple([p4, p5, p6, p7, p8])

    // pisos que se mueven

    this.scene.tweens.add({
        targets: p2,
        duration:15000,
        y: "-=400",
        ease: 'Sine.inOut',
        yoyo: true,
        repeat: -1
    });

    

    //   this.scene.tweens.add({
    //     targets: p3,
    //     duration:15000,
    //     x: "-=400",
    //     ease: 'Sine.inOut',
    //     yoyo: true,
    //     repeat: -1
    // });

    // MOUNTAINS

    // const mountain1 = this.scene.add.sprite(0, 200, "mountain1").setScale(0.7).setDepth(3);
    // const mountain2 = this.scene.add.sprite(0, 360, "mountain2").setScale(0.7).setDepth(5);
    // const mountain3 = this.scene.add.sprite(0, 550, "mountain3").setScale(0.7).setDepth(6);
    
    // WAVES
    

    //NUBES

    const c1Config: CloudGeneratorConfig = {
      texture: "nube",
      x: 500,
      y: 0,
      delayed: 50000,
      randomnes: 0.9,
      direction: 1,
      startWith: -300,
      depth: 4,
    }
    const c1 = new CloudGenerator(this.scene, c1Config)
    c1.start()

    const c2Config: CloudGeneratorConfig = {
      texture: "nube",
      x: -400,
      y: -200,
      delayed: 50000,
      randomnes: 0.2,
      direction: 0,
      startWith: -100,
      depth: 2,
    }
    const c2 = new CloudGenerator(this.scene, c2Config)
    c2.start()

    const c3Config: CloudGeneratorConfig = {
      texture: "nube",
      x: -400,
      y: 100,
      delayed: 100000,
      randomnes: 2,
      direction: 0,
      startWith: -200,
      depth: 7,
    }
    const c3 = new CloudGenerator(this.scene, c3Config)
    c3.start()

    const c4Config: CloudGeneratorConfig = {
      texture: "nube",
      x: 1000,
      y: -50,
      delayed: 50000,
      randomnes: 0.9,
      direction: 1,
      startWith: -300,
      depth: 4,
    }
    const c4 = new CloudGenerator(this.scene, c4Config)
    c4.start()
    
    const c5Config: CloudGeneratorConfig = {
      texture: "nube",
      x: 1800,
      y: 50,
      delayed: 50000,
      randomnes: 0.9,
      direction: 1,
      startWith: -300,
      depth: 7,
    }
    const c5 = new CloudGenerator(this.scene, c5Config)
    c5.start()


    return [floor, cueva.sprite]; 
  }

//   
  

}

export default Map0;