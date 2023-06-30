import Phaser from "phaser";
export type PlanetTween =
  | Phaser.Tweens.Tween
  | Phaser.Types.Tweens.TweenBuilderConfig
  | Phaser.Types.Tweens.TweenChainBuilderConfig
  | Phaser.Tweens.TweenChain;
export type PlanetConfig = {
  planetName: string;
  scalePlanet: number;
  scaleSat: number;
  texturePlanet: string | Phaser.Textures.Texture;
  textureSat: string | Phaser.Textures.Texture;
  pos: {
    x: number;
    y: number;
  };
  tween?: Partial<PlanetTween>;
};
export default class Planet extends Phaser.GameObjects.Container {
  planet?: Phaser.GameObjects.Sprite;
  sat?: Phaser.GameObjects.Sprite;
  planetName?: Phaser.GameObjects.Text;
  scalePlanet?: number;
  scaleSat?: number;

  constructor(scene: Phaser.Scene, config: PlanetConfig) {
    super(scene, config.pos.x, config.pos.y);
    this.scene = scene;

    this.planet = this.scene.add
      .sprite(0, 0, config.texturePlanet)
      .setScale(config.scalePlanet);
    this.sat = this.scene.add
      .sprite(100, 100, config.textureSat)
      .setScale(config.scaleSat);

    const planetHeight = this.planet.displayHeight;

    /* TEXT BOX */
    this.planetName = this.scene.add
      .text(0, planetHeight, config.planetName, {
        fontFamily: "Arcade",
        fontSize: "20px",
      })
      .setOrigin(0.5)
      .setDepth(999);

    scene.add.existing(this);
    if (config.tween) {
      const tween = this.scene.tweens.add({
        ...config.tween,
        targets: this,
      });
    }
  }
}
