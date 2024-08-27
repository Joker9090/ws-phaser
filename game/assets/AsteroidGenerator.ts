import Phaser from "phaser";
import Game from "../Game";

export type AsteroidGeneratorConfig = {
  texture: string;
  x: number;
  y: number;
  delayed: number;
  direction: 0 | 1;
  scale: number;
  velocity: number;
  depth?: number;
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
    return window.Phaser.Math.Between(6, 9) / 10;
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
    this.createAsteroid(this.config.x, this.config.y);
    this.scene.time.delayedCall(this.randomTime(), this.run, [], this);
  }

  createAsteroid(x: number, y: number) {
    const asteroid = this.scene.physics.add.sprite(x, y, this.config.texture);
    if (this.config.depth) asteroid.setDepth(this.config.depth);
    asteroid.setScale(this.config.scale * this.randomProp());
    this.asteroids.add(asteroid);
    this.scene.UICamera?.ignore(asteroid)
    asteroid.setVelocityX(this.randomVelocity());
  }

  start() {
    this.run();
  }
}

export default AsteroidGenerator;
