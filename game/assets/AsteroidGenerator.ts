import Phaser, { GameObjects } from "phaser";
import Game from "../Game";

export type AsteroidGeneratorConfig = {
  texture: string;
  x: number;
  y: number;
  delayed: number;
  direction: 0 | 1;
  scale: number;
  tweenScale?: boolean
  scaleTweenDuration?: number,
  velocity: number;
  depth?: number;
  group?: Phaser.GameObjects.Group;
  amount?: number;
  upStraigth?: boolean;
  spawnRange?: {
    x: number,
    y: number
  }
};

class AsteroidGenerator {
  asteroids: Phaser.Physics.Arcade.Group;
  scene: Game;
  config: AsteroidGeneratorConfig;

  constructor(scene: Game, config: AsteroidGeneratorConfig) {
    this.scene = scene;
    this.config = config;
    this.asteroids = this.scene.physics.add.group({ allowGravity: false });
  }

  randomProp() {
    return window.Phaser.Math.Between(4, 9) / 10;
  }

  randomTime() {
    const delayedTime =
      Math.ceil(this.config.delayed * 1000) * this.randomProp();
    return delayedTime;
  }

  randomVelocity() {
    let value = Math.ceil(this.config.velocity * this.randomProp());
    if (this.config.direction) value = value * -1;
    return value;
  }

  run() {
    this.runCreation();
    this.scene.time.delayedCall(this.randomTime(), this.run, [], this);
  }

  createAsteroid(x: number, y: number) {
    const asteroid = this.scene.physics.add.sprite(x, y, this.config.texture);
    if (this.config.depth) this.asteroids.setDepth(this.config.depth);
    if (this.config.group) this.config.group.add(asteroid)
    console.log(this.scene.map?.mapContainer.list.length,"lngth")
  // @ts-ignore
    this.scene.map?.mapContainer.list.sort((a:Phaser.GameObjects,b:Phaser.GameObjects)=>{return (a.texture === this.config.texture)})
    asteroid.setScale( this.config.tweenScale ? 0.001 : this.config.scale * this.randomProp());

    this.asteroids.add(asteroid);
    this.scene.UICamera?.ignore(asteroid)
    if (this.config.upStraigth) {
      asteroid.setVelocityY(this.randomVelocity());
    } else {
      asteroid.setVelocityX(this.randomVelocity());
    }
    if (this.config.tweenScale && this.config.scale > 0 && this.config.scaleTweenDuration) {
      this.scene.tweens.add({
        targets: asteroid,
        scale: 1  * this.randomProp(),
        delay: 1000 + 1000*Math.random(),
        duration: 1000 + this.config.scaleTweenDuration * Math.random(),
        ease: 'ease'
      })
    }
    
  }

  runCreation() {
    if (this.config.amount) {
      if (this.config.spawnRange) {
        for (let i = 0; i < this.config.amount; i++) {
          const randomX = this.config.x + (Math.random() - 0.5) * this.config.spawnRange.x * 1000;
          const randomY = this.config.y + (Math.random() - 0.5) * this.config.spawnRange.y * 1000;
          this.createAsteroid(randomX, randomY)
        }
      } else {
        for (let i = 0; i < this.config.amount; i++) {
          const randomX = this.config.x + (Math.random() - 0.5) * 1;
          const randomY = this.config.y + (Math.random() - 0.5) * 1;
          this.createAsteroid(randomX, randomY)
        }
      }

    } else {
      this.createAsteroid(this.config.x, this.config.y)
    }
  }

  start() {
    this.run();
  }
}

export default AsteroidGenerator;
