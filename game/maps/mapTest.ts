import Phaser, { Physics } from "phaser";
import AsteroidGenerator, {
  AsteroidGeneratorConfig,
} from "../assets/AsteroidGenerator";
import Floor, { FloorConfig } from "../assets/Floor";

import LargeFloor, { LargeFloorConfig } from "../assets/LargeFloor";
import Game from "../Game";

import Player from "../assets/Player";
import portal, { portalConfig } from "../assets/portal";
import { Children } from "react";

class Mapa1 {
  isJumping = false;
  scene: Game;
  worldSize = {
    width: 10000,
    height: 2500,
  };
  // normales
  pisos?: Phaser.Physics.Arcade.Group;
  // de vuelta al inicio
  pisosBack?: Phaser.Physics.Arcade.Group;
  // float
  pisos2?: Phaser.Physics.Arcade.Group;
  // rotyate cam
  pisos3?: Phaser.Physics.Arcade.Group;
  //  no float
  pisos4?: Phaser.Physics.Arcade.Group;
  coin?: Phaser.Physics.Arcade.Group;
  portal?: Phaser.Physics.Arcade.Group;
  aura?: Phaser.Physics.Arcade.Group;
  movingFloor?: Phaser.Physics.Arcade.Group;
  movingFloorRot?: Phaser.Physics.Arcade.Group;
  p13!: Phaser.GameObjects.Sprite;
  nextScene: string | undefined = undefined;

  amountLifes: number = 0;
  sideGrav: boolean = false;
  goingBack: boolean = false;
  pisoGoBack?: Phaser.GameObjects.Sprite;
  monchi?: Player;
  startingPoint = {
    x: 500, //500
    y: 800, //800
  };
  checkPointPos = {
    x: 3000,
    y: 750,
  };
  background: Phaser.GameObjects.Image;
  cristal?: Floor;
  collected: Boolean = false;
  endPortal?: Floor;

  mapContainer: Phaser.GameObjects.Container;

  constructor(scene: Game, monchi: Player) {
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
    // this.debugGraphics = this.scene.add.graphics();
    // this.debugGraphics.fillStyle(0x00ff00, 0.5);
    // this.debugGraphics.fillRect(
    //   0,
    //   0,
    //   this.worldSize.width,
    //   this.worldSize.height
    // );
    /* Debug */

    this.background = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "backgroundLevelMap")
      .setOrigin(0.5, 0.5).setScale(2);
    

    this.mapContainer = this.scene.add.container()
    

  }

  animateBackground(player: Phaser.GameObjects.Sprite) {
    const { x, y } = this.startingPoint;
    const { x: x2, y: y2 } = player;
    const calcDiffX = (x2 - x) / 1//mas grande menos movimiento
    const calcDiffY = (y2 - y - this.scene.cameras.main.displayHeight / 6) / 1.3;
    this.background?.setPosition(x + calcDiffX, y + calcDiffY);
  }

  // addColliders() {
  //   if (this.scene.monchi) {
  //     if (this.portal) this.portal.setTint(0xff0000);
  //     if (this.pisos)
  //       this.scene.physics.add.collider(
  //         this.scene.monchi,
  //         this.pisos,
  //         this.scene.touch,
  //         () => true,
  //         this.scene
  //       );
  //   }
  // }

  createMap(data: { level: number; lifes: number }) {
   
    this.pisos = this.scene.physics.add.group({ allowGravity: false });

    const p1Config: FloorConfig = {
      texture: "plataformaLarga2",
      pos: { x: 500, y: 1000 },
      scale: { width: 0.4, height: 0.7 },
      // fix: 20,
      width: 390,
      height: 50,
    };
    const p1 = new Floor(this.scene, p1Config, this.pisos);

    this.mapContainer.add([
        this.background,
        
    ])
    this.mapContainer.add(this.pisos.getChildren())
    this.scene.UICamera?.ignore(this.mapContainer)
  }
  update() {
    // this.p13.setFrictionX(1);
    /* Attach controls to player */
    if (!this.goingBack) {
      if (this.scene.monchi && this.scene.cameraNormal) {
        this.scene.monchi.checkMove(this.scene.cursors);
      } else if (this.scene.monchi && this.scene.cameraNormal == false) {
        // this.scene.monchi?.checkMoveRot(this.scene.cursors);
      }
    } else if (this.goingBack) {
      if (this.scene.monchi)
        this.scene.monchi.setY(1700 - this.scene.monchi.displayHeight);
    }
    if (this.scene.monchi) this.animateBackground(this.scene.monchi);
    // this.scaleBg()
  }
}
export default Mapa1;
