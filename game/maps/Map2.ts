import Phaser, { Scale } from "phaser";
import player from "../assets/Player";
import spikes, { spikeConfig } from "../assets/Spikes";
class Map2 {
  scene: Phaser.Scene
  debugGraphics: Phaser.GameObjects.Graphics
  speed: number
  spikes?: Phaser.Physics.Arcade.Group
  floors?: Phaser.Physics.Arcade.Group

  config: {
    w: number,
    h: number
  } = {
      w: 3000,
      h: 1000
    }
  constructor(scene: Phaser.Scene, speed: number,) {
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
    const background = this.scene.add.image(0, 0, "background").setOrigin(0, 0)
    background.displayWidth = this.config.w
    background.displayHeight = this.config.h
    this.spikes = this.scene.physics.add.group({ allowGravity: false, immovable: true })


    const spikeConfig: spikeConfig = {
      scale: { width: 1, heigth: 1 },
      texture: "spikes",
      large: 32,
      //width:576,
      //height:324, 
      pos: { x: 20, y: 100 },
      //scale: {width: 1,height: 1,},
      //fix:-9,

    }


    const newSpike = new spikes(this.scene, this.spikes, spikeConfig);

    this.spikes.addMultiple([newSpike])

    return this.spikes
  }

}

export default Map2;