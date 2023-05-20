import Phaser from "phaser";

export type CloudGeneratorConfig = {
  texture: string
  x:number,
  y: number,
  delayed:number,
  direction: 0 | 1,
  randomnes: number,
  startWith: number,
  depth?:number,
}
// Scene in class
class CloudGenerator  {
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

  calcRandom() {
    const a = this.config.randomnes * 3
    return window.Phaser.Math.Between(a,20 + (0.5 - a)) / 10
  }

  randomTime() {
    const delayedTime = Math.ceil(this.config.delayed * this.calcRandom())
    return delayedTime;
  }

  randomVelocity() {
    const velocity = 20
    let value = Math.ceil((velocity * this.calcRandom()))
    if (this.config.direction) value = value * -1
    return value;
  }

  run() {
    this.createCloud(this.config.x,this.config.y)  
    this.scene.time.delayedCall(this.randomTime(), this.run, [], this);
  }

  createCloud(x: number,y: number) {
    const cloud = this.scene.physics.add.sprite(x,y, this.config.texture)
    if(this.config.depth) cloud.setDepth( this.config.depth)
    cloud.setScale(0.1 + this.calcRandom())
    this.clouds.add(cloud)
    cloud.setVelocityX(this.randomVelocity());
  }

  createFirst() {
    for (let index = 0; index < this.config.startWith; index++) {
      const r = this.calcRandom()
      this.createCloud(this.scene.physics.world.bounds.width * r,this.config.y)
    }
  }
  start() {
    this.run()
    if(this.config.startWith) this.createFirst()
  }

}

export default CloudGenerator 