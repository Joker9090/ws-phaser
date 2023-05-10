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
    this.scene.physics.world.setBounds(0, 0, this.config.w, this.config.h)
    /* Debug */
    this.debugGraphics = this.scene.add.graphics();
    this.debugGraphics.fillStyle(0x00ff, 0.5);
    this.debugGraphics.fillRect(0, 0, this.config.w, this.config.h);
    /* Debug */

  }
  createMap() {
    const floor = this.scene.physics.add.group({ allowGravity: false, immovable: true })
    const goal = this.scene.physics.add.group({ allowGravity: false, immovable: true })

    const star = this.scene.physics.add.sprite(800, 370, "star").setScale(0.9)
    const p1 = this.scene.physics.add.sprite(100, 870, "plataforma1").setScale(0.7);
    const p2 = this.scene.physics.add.sprite(300, 870, "plataforma2").setScale(0.3);
    const p3 = this.scene.physics.add.sprite(600, 770, "plataforma2").setScale(0.6);
    const p4 = this.scene.physics.add.sprite(1000, 870, "plataforma2").setScale(1);
    const p5 = this.scene.physics.add.sprite(450, 770, "plataforma2").setScale(0.4);
    // p5 se va a mover
    floor.addMultiple([p1, p2, p3, p4, p5])
    goal.add(star)
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
      targets: p3,
      y: "-=500",
      duration: 2500,
      repeat: -1,
      hold: 800,
      yoyo: true,
      repeatDelay: 500,
      ease: 'linear'
    });

    return floor;

  }

}

export default Map0;