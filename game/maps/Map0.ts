import Phaser from "phaser";
import player from "../assets/Player";

class Map0 {
  scene: Phaser.Scene
  debugGraphics: Phaser.GameObjects.Graphics
  speed: number
  spikes?: Phaser.GameObjects.Sprite
  config: {
    w: number,
    h: number
  } = {
      w: 3000,
      h: 1000
    }
  constructor(scene: Phaser.Scene, speed: number) {
    this.scene = scene
    this.speed = speed
    this.scene.physics.world.setBounds(0, 0, this.config.w, this.config.h)
    /* Debug */
    this.debugGraphics = this.scene.add.graphics();
    this.debugGraphics.fillStyle(0x00ff, 0.2).setDepth(0);
    this.debugGraphics.fillRect(0, 0, this.config.w, this.config.h);
    /* Debug */

  }
  createMap() {
    var starX = Phaser.Math.Between(400, 1100);
    var starY = Phaser.Math.Between(350, 700)
    const floor = this.scene.physics.add.group({ allowGravity: false, immovable: true })
    const saws = this.scene.physics.add.group({ allowGravity: false, immovable: true, allowRotation: true })
    const diamonds = this.scene.physics.add.group({ allowGravity: false, immovable: true })
    

    const p1 = this.scene.physics.add.sprite(100, 870, "plataforma1").setBodySize(240, 100)
    const p2 = this.scene.physics.add.sprite(300, 870, "plataforma3").setBodySize(240, 100)
    const p3 = this.scene.physics.add.sprite(800, 870, "plataforma2").setBodySize(240, 100)
    const p4 = this.scene.physics.add.sprite(1200, 870, "plataforma2").setBodySize(240, 100).setDepth(1)
    const p5 = this.scene.physics.add.sprite(1400, 870, "plataforma3").setBodySize(240, 100).setDepth(1)
    const p13 = this.scene.physics.add.sprite(1590, 870, "plataforma1").setBodySize(240, 100).setDepth(0)


    const p6 = this.scene.physics.add.sprite(1890, 870, "plataforma1").setBodySize(240, 100)


    const p8 = this.scene.physics.add.sprite(100, 390, "plataforma1").setBodySize(240, 100).setFlipY(true).setScale(1.3)
    const p7 = this.scene.physics.add.sprite(300, 390, "plataforma3").setBodySize(240, 100).setScale(1.3).setFlipY(true).setDepth(1)
    const p9 = this.scene.physics.add.sprite(500, 390, "plataforma1").setBodySize(240, 100).setFlipY(true).setScale(1.3)

    const p10 = this.scene.physics.add.sprite(1200, 390, "plataforma3").setBodySize(240, 100).setScale(1.3).setFlipY(true).setDepth(1)
    const p11 = this.scene.physics.add.sprite(1000, 390, "plataforma1").setBodySize(240, 100).setFlipY(true).setScale(1.3)
    const p12 = this.scene.physics.add.sprite(1300, 390, "plataforma1").setBodySize(240, 100).setFlipY(true).setScale(1.3)

    const p14 = this.scene.physics.add.sprite(1900, 390, "plataforma3").setBodySize(240, 100).setScale(1.3).setFlipY(true).setDepth(1)
    const p15 = this.scene.physics.add.sprite(1700, 390, "plataforma1").setBodySize(240, 100).setFlipY(true).setScale(1.3)
    const p16 = this.scene.physics.add.sprite(2000, 390, "plataforma1").setBodySize(240, 100).setFlipY(true).setScale(1.3)

    const d1 = this.scene.physics.add.sprite(300, 500, "diamond")
    const d2 = this.scene.physics.add.sprite(800, 770, "diamond")

    const s1 = this.scene.physics.add.image(250, 670, "saw").setScale(0.7).setBodySize(65, 65)




    this.scene.tweens.add({
      targets: s1,
      x: 2200,
      duration: this.speed,
      yoyo: true,
      repeatDelay: 200,
      repeat: -1,
      ease: "circularInOut",
      angle: -3600
    })

    floor.addMultiple([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16])
    diamonds.addMultiple([d1, d2])
    saws.addMultiple([s1])



    return [floor, diamonds, saws];

  }

}

export default Map0;