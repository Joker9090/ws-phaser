import Phaser from "phaser";
import LargeFloor, { LargeFloorConfig } from "../assets/LargeFloor";
import CloudGenerator from "../assets/CloudGenerator";
import LargeFloorIsland from "../assets/LargeFloorIsland";
import Antorcha, { AntorchaConfig } from "../assets/Antorcha";
import Health from "../assets/Health";

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
      textureA: "tile1",
      textureB: "tile3",
      large: 32,
      //width:576,
      //height:324, 
      pos: {x: 20,y: 1000},
      //scale: {width: 1,height: 1,},
      //fix:-9,
      
    }

    const LargeFloorConfigg3: LargeFloorConfig = {
      textureA: "lava1",
      textureB: "lava2",
      large: 20,
      //width:576,
      //height:324, 
      pos: {x: 1000,y: 1020},
      //scale: {width: 1,height: 1,},
      //fix:-9,
      
    }

    const LargeFloorConfigg2: LargeFloorConfig = {
      textureA: "tile1",
      textureB: "tile3",
      large: 10,
      //width:576,
      //height:324, 
      pos: {x: 1600,y: 1000},
      //scale: {width: 1,height: 1,},
      //fix:-9,
      
    }


    const LargeFloorIslandConfig = {
      textureA: "islandA",
      textureB: "islandB",
      textureC: "islandC",
      large: 10,
      //width:576,
      //height:324, 
      pos: {x: 300,y: 800},
      //scale: {width: 1,height: 1,},
      //fix:-9,
      
    }

    const LargeFloorIslandConfig2 = {
      textureA: "islandA",
      textureB: "islandB",
      textureC: "islandC",
      large: 10,
      //width:576,
      //height:324, 
      pos: {x: 800,y: 800},
      //scale: {width: 1,height: 1,},
      //fix:-9,
      
    }

    const CloudGeneratorConfig1 = {
      texture: "neblina",
      x:10,
      y: 350,
      delayed:1,
      direction: 1,
      randomnes: 0,
      startWith: 1,
    }

    //const AntorchaConfig: AntorchaConfig = {
    //  x:110,
    //  y:800,
    //  sprite:"antorcha",
    //}

    const AntorchaConfig = {
      x:110,
      y:800,
      sprite:"antorcha",
    }
    const AntorchaConfig2 = {
      x:700,
      y:650,
      sprite:"antorcha",
    }

    const HealthConfig = {
      x:150,
      y: 750,
      sprite:"heartFullUI",
      quantity: 3,
    }
    const newAntorcha = new Antorcha(this.scene,AntorchaConfig);
    const newAntorcha2 = new Antorcha(this.scene,AntorchaConfig2);
    const lightOnAntorcha = this.scene.lights.addLight(newAntorcha.x,newAntorcha.y,200).setColor(0xdc9e7c).setIntensity(0.9);
    const lightOnAntorcha2 = this.scene.lights.addLight(newAntorcha2.x,newAntorcha2.y,100).setColor(0xdc9e7c).setIntensity(0.9);

    const healths = this.scene.add.group(new Health(this.scene,HealthConfig),);
    //const nubes = new CloudGenerator(this.scene, CloudGeneratorConfig1);
    //nubes.start();
    const newLava = new LargeFloor(this.scene,LargeFloorConfigg3,this.pisos)
    const newIsland2 = new LargeFloorIsland(this.scene,LargeFloorIslandConfig2,this.pisos)
    const newIsland = new LargeFloorIsland(this.scene,LargeFloorIslandConfig,this.pisos)
    const newFloor = new LargeFloor(this.scene,LargeFloorConfigg,this.pisos);
    const newFloor2 = new LargeFloor(this.scene,LargeFloorConfigg2,this.pisos);
    //const newAntorcha = new Antorcha(this.scene,AntorchaConfig,this.pisos);
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

    /**Darknes implementation */
    background.setPipeline('Light2D');
    


    
    this.pisos.addMultiple([newFloor,newFloor2])

    return this.pisos; 
    
  }

}

export default Map2;