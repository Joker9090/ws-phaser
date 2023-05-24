
import Phaser from "phaser";

import Floor, { FloorConfig } from "../assets/Floor";
import LargeFloor, { LargeFloorConfig } from "../assets/LargeFloor";
// Scene in class
class Mapa {
  isJumping = false;
  debugGraphics: Phaser.GameObjects.Graphics;
  scene: Phaser.Scene;
  worldSize = {
    width: 10000,
    height: 1200,
  };
  pisos?: Phaser.Physics.Arcade.Group
  startingPoint = {
    x: 100,
    y: 700
  };
  background: Phaser.GameObjects.Image
  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    /* World size*/
    this.scene.physics.world.setBounds(0, 0, this.worldSize.width, this.worldSize.height);

    /* Debug */
    this.debugGraphics = this.scene.add.graphics();
    this.debugGraphics.fillStyle(0x00ff00, 0.5);
    this.debugGraphics.fillRect(0, 0, this.worldSize.width, this.worldSize.height);
    /* Debug */
    this.background = this.scene.add.image(this.startingPoint.x, this.startingPoint.y, "background").setOrigin(0.5, 0.5);
  }

  animateBackground(player: Phaser.GameObjects.Sprite) {
    const { x, y } = this.startingPoint
    const { x: x2, y: y2 } = player
    const calcDiffX = (x2 - x) / 1.2
    const calcDiffY = (y2 - y) / 1.2

    this.background.setPosition((x + calcDiffX),(y + calcDiffY))
    /* 
    const tween = this.scene.tweens.add({
      duration: 500,
      targets: this.background,
      x: (x + calcDiffX),
      y: (y + calcDiffY)
    })
    */
    
  }

  createMap() {

    this.pisos = this.scene.physics.add.group({ allowGravity: false });

    const p1Config: FloorConfig = {
      texture: "plataformaA",
      pos: { x: 100, y: 900, },
      scale: { width: 0.7, height: 0.7, }
    }
    const p1 = new Floor(this.scene, p1Config, this.pisos)

    const p2Config: FloorConfig = {
      texture: "plataformaA",
      pos: { x: 500, y: 600, },
      scale: { width: 0.7, height: 0.7, },
      tween: {
        paused: false,
        yoyo: true,
        repeat: -1,
        y: "-=200"
      }
    }
    const p2 = new Floor(this.scene, p2Config, this.pisos)

    const p3Config: FloorConfig = {
      texture: "plataformaA",
      pos: { x: 300, y: 570, },
      scale: { width: 0.3, height: 0.3, },

    }
    const p3 = new Floor(this.scene, p3Config, this.pisos)

    const p4Config: LargeFloorConfig = {
      textureA: "plataformaA",
      textureB: "plataformaB",
      large: 10,
      pos: { x: 340, y: 900, },
      scale: { width: 0.7, height: 0.7, },

    }

    const p4 = new LargeFloor(this.scene, p4Config, this.pisos)

    const p5Config: FloorConfig = {
      texture: "plataforma2",
      pos: { x: 1000, y: 900, },
      scale: { width: 0.1, height: 0.1, },
      width: 2400,
      height: 100,
      tween: {
        duration: 5000,
        paused: false,
        yoyo: true,
        repeat: -1,
        y: "-=400"
      }
    }
    const p5 = new Floor(this.scene, p5Config, this.pisos)
    const p6Config: FloorConfig = {
      texture: "plataforma2",
      pos: { x: 800, y: 500, },
      scale: { width: 0.05, height: 0.05, },
      width: 2400,
      height: 100,

    }
    const p6 = new Floor(this.scene, p6Config, this.pisos)
    // this.scene.physics.add.sprite(0,0,"plataformaB")
  }

}

export default Mapa 