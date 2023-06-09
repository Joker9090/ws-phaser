
import Phaser from "phaser";

export type CloudGeneratorConfig = {
  texture: string
  x: number,
  y: number,
  delayed: number,
  direction: 0 | 1,
  scale: number,
  velocity: number,
  depth?: number,
}
// Scene in class
class CloudGenerator {
  clouds: Phaser.Physics.Arcade.Group
  isJumping = false;
  scene: Phaser.Scene;
  // group: Phaser.Physics.Arcade.Group;
  config: CloudGeneratorConfig
  constructor(scene: Phaser.Scene, config: CloudGeneratorConfig) {
    this.scene = scene;
    this.config = config;
    this.clouds = this.scene.physics.add.group({ allowGravity: false });
    /*
    if(config.tween) {
        const tween = this.scene.tweens.add({
          ...config.tween,
          targets: this
        })
      
      }
      */

  }
  randomProp() {
    return window.Phaser.Math.Between(6, 9) / 10
  }

  randomTime() {
    const delayedTime = Math.ceil(this.config.delayed * 1000) * this.randomProp()
    return delayedTime;
  }

  randomVelocity() {
    let value = Math.ceil((this.config.velocity * this.randomProp()))
    if (this.config.direction) value = value * -1
    return value;
  }

  run() {
    this.createCloud(this.config.x, this.config.y)
    this.scene.time.delayedCall(this.randomTime(), this.run, [], this);
  }

  createCloud(x: number, y: number) {
    const cloud = this.scene.physics.add.sprite(x, y, this.config.texture)
    if (this.config.depth) cloud.setDepth(this.config.depth)
    cloud.setScale(this.config.scale * this.randomProp())
    this.clouds.add(cloud)
    cloud.setVelocityX(this.randomVelocity());
  }

  start() {
    this.run()
  }

}

export default CloudGenerator 