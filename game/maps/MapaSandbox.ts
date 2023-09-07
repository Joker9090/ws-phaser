import Phaser, { Physics } from "phaser";
import Floor, { FloorConfig } from "../assets/Floor";
import Player from "../assets/Player";
import Sandbox from "../Sandbox";
import LargeFloor, { LargeFloorConfig } from "../assets/LargeFloor";

class MapaSandbox {
  debugGraphics: Phaser.GameObjects.Graphics;
  worldSize = {
    width: 10000,
    height: 2500,
  };
  monchi?: Player;
  startingPoint = {
    x: 800,
    y: 300,
  };
  checkPointPos = {
    x: 3000,
    y: 750,
  };
  background: Phaser.GameObjects.Image;
  scene: Sandbox;
  movingFloor?: Phaser.Physics.Arcade.Sprite;
  staticFloor?: Phaser.Physics.Arcade.Sprite;
  pisos?: Phaser.Physics.Arcade.Group;
  pisosMov?: Phaser.Physics.Arcade.Group;
  piso2?: Phaser.GameObjects.Sprite
  constructor(scene: Sandbox, monchi: Player) {
    this.scene = scene;
    this.monchi = monchi;
    /* World size*/
    this.scene.physics.world.setBounds(
      0,
      0,
      this.worldSize.width,
      this.worldSize.height
    );

    /* Debug */
    this.debugGraphics = this.scene.add.graphics();
    this.debugGraphics.fillStyle(0x00ff00, 0.5);
    this.debugGraphics.fillRect(
      0,
      0,
      this.worldSize.width,
      this.worldSize.height
    );
    /* Debug */

    this.background = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "lvl1bg1")
      .setOrigin(0.5, 0.5);
  }

  addColliders() {
    if (this.scene.monchi) {
      if (this.pisosMov) {
        this.scene.physics.add.collider(this.scene.monchi, this.pisosMov);
      }
      if (this.pisos)
      {
          this.scene.physics.add.collider(this.scene.monchi, this.pisos);
      }
      if (this.piso2)
      {
          this.scene.physics.add.collider(this.scene.monchi, this.piso2);
      }
    }
  }

  createMap() {
    this.pisos = this.scene.physics.add.group({ allowGravity: false });
    this.pisosMov = this.scene.physics.add.group({ allowGravity: false });
    this.piso2 = this.scene.physics.add.sprite(500,600,"plataformaLarga2")
    .setGravityY(-1000)
    .setImmovable(true)
    .setVelocityX(100)
    
  
    
    const p1Config: LargeFloorConfig = {
      textureA: "plataformaLarga2",
      textureB: "plataformaLarga2",
      large: 5,
      pos: { x: 500, y: 800 },
      scale: { width: 1, height: 0.7 },
      width: 390,
      height: 50,
      gap: 20,
    };
    const p1 = new LargeFloor(this.scene, p1Config, this.pisos);
    const p2Config: FloorConfig = {
      texture: "plataformaLarga2",
      pos: { x: 500, y: 600 },
      scale: { width: 0.5, height: 0.7 },
      fix: 25,
      width: 390,
      height: 50,
      tween: {
        duration: 4500,
        paused: false,
        yoyo: true,
        repeat: -1,
        x: "-=500",
      },
    };
    const p2 = new Floor(this.scene, p2Config, this.pisosMov);
  }
  update() {
    if (this.scene.monchi) this.scene.monchi.checkMove(this.scene.cursors);
  }
}

export default MapaSandbox;
