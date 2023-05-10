import Phaser from "phaser";
class map0 {
  scene: Phaser.Scene
  debugGraphics?: Phaser.GameObjects.Graphics
  config: {
    w: number,
    h: number
  } = { w: 2000, h: 600 }
  constructor(scene: Phaser.Scene) {
    this.scene = scene
    this.scene.physics.world.setBounds(0, 0, this.config.w, this.config.h)
  }

  createMap() {
    const floor = this.scene.physics.add.group({ allowGravity: false, immovable: true })

    const finish = this.scene.physics.add.group({ allowGravity: false, immovable: true })
    const p1 = this.scene.physics.add.sprite(240, 420, "plataforma1")
    const p2 = this.scene.physics.add.sprite(520, 620, "plataforma2")
    const p3 = this.scene.physics.add.sprite(725, 520, "plataforma1")
    const p4 = this.scene.physics.add.sprite(1020, 620, "plataforma2")
    const p5 = this.scene.physics.add.sprite(1435, 620, "plataforma1")
    const f1 = this.scene.physics
    floor?.addMultiple([p1, p2, p3, p4, p5])
    return floor
  }
}
export default map0