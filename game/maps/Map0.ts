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
    const swords = this.scene.physics.add.group({ allowGravity: false, immovable: true, allowRotation: true })

    const p1 = this.scene.physics.add.sprite(100, 870, "plataforma1").setScale(0.7).setBodySize(240, 100)
    const p2 = this.scene.physics.add.sprite(300, 870, "plataforma1").setScale(0.3).setBodySize(240, 100)
    const p3 = this.scene.physics.add.sprite(600, 770, "plataforma2").setScale(0.6).setBodySize(240, 100)
    const p4 = this.scene.physics.add.sprite(1000, 670, "plataforma1").setScale(1).setBodySize(240, 100)
    const p5 = this.scene.physics.add.sprite(450, 770, "plataforma2").setScale(0.4).setBodySize(240, 100)
    const p6 = this.scene.physics.add.sprite(1300, 560, "plataforma2").setScale(0.9).setBodySize(240, 100)

    const s1 = this.scene.physics.add.sprite(680, 700, "sword").setScale(0.8)
    const s2 = this.scene.physics.add.sprite(1200, 600, "sword").setScale(0.7)
    const s3 = this.scene.physics.add.sprite(1600, 200, "sword").setScale(0.8)
    const s4 = this.scene.physics.add.sprite(360, 100, "sword").setScale(0.8)

    floor.addMultiple([p1, p2, p3, p4, p5, p6])
    swords.addMultiple([s1, s2, s3, s4])

    // goal.addMultiple([star, star2, star3])

    this.stars = this.scene.add.group()
    this.swords = this.scene.physics.add.group({ allowGravity: false, immovable: true })

    this.stars.createMultiple([
      { key: 'star', quantity: 1, setXY: { x: 800, y: 300, } },
      { key: 'star', quantity: 2, setXY: { x: 600, y: 500, stepX: 1000 } }
    ]);
    // this.swords.createMultiple([
    //   { key: 'sword', quantity: 3, setXY: { x: 750, y: 500, stepX: 400 } }
    // ]);
    this.swords.allowRotation
    this.scene.tweens.add({
      targets: p5,
      y: "-=550",
      duration: 2000,
      repeat: -1,
      hold: 500,
      yoyo: true,
      repeatDelay: 500,
      ease: "circularInOut"
    });
    this.scene.tweens.add({
      targets: s3,
      x: "-=550",
      duration: 1500,
      repeat: -1,
      hold: 100,
      yoyo: true,
      repeatDelay: 500,
      ease: "circularInOut"
    });
    this.scene.tweens.add({
      targets: s4,
      x: "+=550",
      duration: 1500,
      repeat: -1,
      hold: 100,
      yoyo: true,
      repeatDelay: 500,
      ease: "circularInOut"
    });
    this.scene.tweens.add({
      targets: s2,
      y: "-=550",
      duration: 1500,
      repeat: -1,
      hold: 100,
      yoyo: true,
      repeatDelay: 500,
      ease: "circularInOut"
    });
    this.scene.tweens.add({
      targets: s1,
      y: "-=650",
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
    return [floor, this.stars, swords];

  }

}

export default Map0;