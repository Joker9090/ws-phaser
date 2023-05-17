import Phaser from "phaser";
import LargeFloor, { LargeFloorConfig } from "../assets/LargeFloor";

class Map2 {
  scene: Phaser.Scene
  pisos?: Phaser.Physics.Arcade.Group
  //debugGraphics: Phaser.GameObjects.Graphics
  config: {
    w: number,
    h: number
  } = {
    w: 3000,
    h: 1000
  }
  constructor(scene: Phaser.Scene) {
    this.scene = scene
    
    
    this.scene.physics.world.setBounds(0,0,this.config.w,this.config.h)

    /* Debug */
    //this.debugGraphics = this.scene.add.graphics();
    //this.debugGraphics.fillStyle(0x00ff, 0.5);
    //this.debugGraphics.fillRect(0, 0, this.config.w, this.config.h);
    /* Debug */

  }

  createMap() {
    const background = this.scene.add.image(0, 0, "sky").setOrigin(0,0);
    // Based on your game size, it may "stretch" and distort.
    background.displayWidth = this.config.w;
    background.displayHeight = this.config.h;

    //const nube1 = this.scene.add.image(200,200,"nubee").setScale(0.6).setOrigin(0.5,0.5);

    //const nube2 = this.scene.add.image(1200,180,"nubee");
    //const tree = this.scene.add.image(1830,300,"tree").setOrigin(0.5,0.5).setScale(0.7);
    //const crystal = this.scene.add.image(1730,350,"crystal").setOrigin(0.5,0.5).setScale(0.7);
    
    this.pisos = this.scene.physics.add.group({ allowGravity: false, immovable: true });

    
    const LargeFloorConfigg: LargeFloorConfig = {
      textureA: "plataformaA",
      textureB: "plataformaB",
      large: 6,
      //width:576,
      //height:324, 
      pos: {x: 120,y: 1000},
      //scale: {width: 1,height: 1,},
      //fix:-9,
      
    }

    const LargeFloorConfigg2: LargeFloorConfig = {
      textureA: "plataformaA",
      textureB: "plataformaB",
      large: 4,
      //width:576,
      //height:324, 
      pos: {x: 1600,y: 1000},
      //scale: {width: 1,height: 1,},
      //fix:-9,
      
    }

    const newFloor = new LargeFloor(this.scene,LargeFloorConfigg,this.pisos);
    const newFloor2 = new LargeFloor(this.scene,LargeFloorConfigg2,this.pisos);
    //const p1 = this.scene.physics.add.sprite(100, 470, "plataformaA").setScale(0.7);
    //const p2 = this.scene.physics.add.sprite(400, 470, "plataformaA").setScale(0.3);
    //const p3 = this.scene.physics.add.sprite(700, 500, "plataformaA").setScale(0.3);
    //const p4 = this.scene.physics.add.sprite(1200, 500, "plataformaA").setScale(0.3);
    //const p5 = this.scene.physics.add.sprite(950, 300, "plataformaA").setScale(0.7);
    //const p6 = this.scene.physics.add.sprite(200, 400, "plataformaA").setScale(0.3);
    //const p7 = this.scene.physics.add.sprite(1750, 400, "plataformaA").setScale(0.7);



/*     this.scene.tweens.add({
      targets: p3,
      y: 300,
      duration: 2000,
      repeat: -1,
      hold: 500,
      yoyo:true,
      repeatDelay: 500,
      ease: 'linear'
    });

    this.scene.tweens.add({
      targets: p4,
      y: 300,
      duration: 1500,
      repeat: -1,
      hold: 500,
      yoyo:true,
      repeatDelay: 500,
      ease: 'linear'
    });

    this.scene.tweens.add({
      targets: p6,
      x: "+=300",
      duration: 2000,
      repeat: -1,
      hold: 800,
      yoyo:true,
      repeatDelay: 500,
      ease: 'linear'
    });

    p6.hasForce = true; */



    
    this.pisos.addMultiple([newFloor,newFloor2])

    return this.pisos; 
    
  }

}

export default Map2;