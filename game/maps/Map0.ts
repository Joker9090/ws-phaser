import Phaser from "phaser";

class Map0 {
  scene: Phaser.Scene
  debugGraphics: Phaser.GameObjects.Graphics
  stars: any
  swords: any
  config: {
    w: number,
    h: number
  } = {
      w: 2000,
      h: 1000
    }
  constructor(scene: Phaser.Scene) {
    this.scene = scene
    this.scene.physics.world.setBounds(0, 0, this.config.w, this.config.h)
    /* Debug */
    this.debugGraphics = this.scene.add.graphics();
    this.debugGraphics.fillStyle(0x00ff, 0.5);
    this.debugGraphics.fillRect(0, 0, this.config.w, this.config.h);
    /* Debug */

  }
  createMap() {
    var starX = Phaser.Math.Between(400, 1100);
    var starY = Phaser.Math.Between(350, 700)
    const floor = this.scene.physics.add.group({ allowGravity: false, immovable: true })
    // const swords = this.scene.physics.add.group({ allowGravity: false, immovable: true, allowRotation: true })

    const p1 = this.scene.physics.add.sprite(100, 870, "plataforma1").setScale(0.7);
    const p2 = this.scene.physics.add.sprite(300, 870, "plataforma1").setScale(0.3);
    const p3 = this.scene.physics.add.sprite(600, 770, "plataforma2").setScale(0.6);
    const p4 = this.scene.physics.add.sprite(1000, 670, "plataforma1").setScale(1);
    const p5 = this.scene.physics.add.sprite(450, 770, "plataforma2").setScale(0.4);
    const p6 = this.scene.physics.add.sprite(1300, 560, "plataforma2").setScale(0.9);

   
    floor.addMultiple([p1, p2, p3, p4, p5, p6])
    // goal.addMultiple([star, star2, star3])

    this.stars = this.scene.physics.add.group({ allowGravity: false, immovable: true })
    this.swords = this.scene.physics.add.group({ allowGravity: false, immovable: true })

    this.stars.createMultiple([
      { key: 'star', quantity: 1, setXY: { x: 1000, y: 500, } },
      { key: 'star', quantity: 2, setXY: { x: 600, y: 500, stepX: 1000 } }
    ]);
    this.swords.createMultiple([
      { key: 'sword', quantity: 3, setXY: { x: 750, y: 500, stepX: 400 } }
    ]);

    this.scene.tweens.add({
      targets: p5,
      y: "-=550",
      duration: 2000,
      repeat: -1,
      hold: 500,
      yoyo: true,
      repeatDelay: 500,
      ease: 'linear'
    });
    this.scene.tweens.add({
      targets: p6,
      y: "-=250",
      duration: 2000,
      repeat: -1,
      hold: 500,
      yoyo: true,
      repeatDelay: 500,
      ease: 'linear'
    });
    this.scene.tweens.add({
      targets: p3,
      y: "-=500",
      duration: 2500,
      repeat: -1,
      hold: 800,
      yoyo: true,
      repeatDelay: 500,
      ease: 'linear'
    });
    return [floor, this.stars,this.swords];

  }

}

export default Map0;