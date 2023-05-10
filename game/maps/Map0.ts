import Phaser from "phaser";

class Map0 {
  scene: Phaser.Scene
  //debugGraphics: Phaser.GameObjects.Graphics
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

    const nube1 = this.scene.add.image(200,200,"nubee").setScale(0.6).setOrigin(0.5,0.5);

    const nube2 = this.scene.add.image(1200,180,"nubee");
    const tree = this.scene.add.image(1830,300,"tree").setOrigin(0.5,0.5).setScale(0.7);
    const crystal = this.scene.add.image(1730,350,"crystal").setOrigin(0.5,0.5).setScale(0.7);
    
    const floor = this.scene.physics.add.group({ allowGravity: false, immovable: true }) 
    const p1 = this.scene.physics.add.sprite(100, 470, "plataformaA").setScale(0.7);
    const p2 = this.scene.physics.add.sprite(400, 470, "plataformaA").setScale(0.3);
    const p3 = this.scene.physics.add.sprite(700, 500, "plataformaA").setScale(0.3);
    const p4 = this.scene.physics.add.sprite(1200, 500, "plataformaA").setScale(0.3);
    const p5 = this.scene.physics.add.sprite(950, 300, "plataformaA").setScale(0.7);
    const p6 = this.scene.physics.add.sprite(1600, 400, "plataformaA").setScale(0.3);
    const p7 = this.scene.physics.add.sprite(1750, 400, "plataformaA").setScale(0.7);



    this.scene.tweens.add({
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
      x: 1300,
      duration: 2000,
      repeat: -1,
      hold: 800,
      yoyo:true,
      repeatDelay: 500,
      ease: 'linear'
    });



    
    floor.addMultiple([p1,p2,p3,p4,p5,p6,p7])

    return floor; 
    
  }

}

export default Map0;