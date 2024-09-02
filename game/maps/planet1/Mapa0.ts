import Phaser, { Physics } from "phaser";
import AsteroidGenerator, {
  AsteroidGeneratorConfig,
} from "../../assets/AsteroidGenerator";
import Floor, { FloorConfig } from "../../assets/Floor";

import LargeFloor, { LargeFloorConfig } from "../../assets/LargeFloor";
import Game from "../../Game";

import Player from "../../assets/Player";
import portal, { portalConfig } from "../../assets/portal";
import { Children } from "react";
import { loseConfigFromMapType } from "@/game/Types";

class Mapa0 {
  isJumping = false;
  // debugGraphics: Phaser.GameObjects.Graphics;
  scene: Game;
  worldSize = {
    width: 10000,
    height: 1300,
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

  amountLifes: number = 0;
  sideGrav: boolean = false;
  goingBack: boolean = false;
  pisoGoBack?: Phaser.GameObjects.Sprite;
  monchi?: Player;
  startingPoint = {
    x: 500, //500
    y: 800, //800
  };

  loseConfig: loseConfigFromMapType = [
    {
      positions: { x: 500, y: 800 },
      cameraDirection: "NORMAL",
      PlayerDirection: "NORMAL",
      gravityDown: true
    },
  ];
  nextScene: string | undefined = undefined;

  background: Phaser.GameObjects.Image;
  background2: Phaser.GameObjects.Image;
  background3: Phaser.GameObjects.Image;
  background4: Phaser.GameObjects.Image;
  background5: Phaser.GameObjects.Image;
  background6: Phaser.GameObjects.Image;
  mountain1: Phaser.GameObjects.Image;
  mountain2: Phaser.GameObjects.Image;
  mountain3: Phaser.GameObjects.Image;
  mountain4: Phaser.GameObjects.Image;
  mountain5: Phaser.GameObjects.Image;

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

    this.mapContainer = this.scene.add.container()

    this.background = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "background0P1")
      .setOrigin(0.5, 0.5).setScale(1.8);
    this.background2 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "background1P1")
      .setOrigin(0.5, 0.5).setScale(1.8);
    this.background3 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "backgroundStars")
      .setOrigin(0.5, 0.5).setScale(1.8);
    this.background4 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y + 470, "frontGround1")
      .setOrigin(1, 1).setScale(1);
    this.background5 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y + 470, "frontGround2")
      .setOrigin(0, 1).setScale(1);
    this.background6 = this.scene.add
      .image(this.startingPoint.x + this.background5.width - 15, this.startingPoint.y + 470, "frontGround1")
      .setOrigin(0, 1).setScale(1);

    this.mountain1 = this.scene.add.image(this.startingPoint.x + this.background5.width - 15, this.startingPoint.y + 370, "montaña3")
    this.mountain2 = this.scene.add.image(this.startingPoint.x - 70, this.startingPoint.y + 350, "montaña5")
    this.mountain3 = this.scene.add.image(1200, this.startingPoint.y + 470, "montaña3").setVisible(false)
    this.mountain4 = this.scene.add.image(-400, this.startingPoint.y, "montaña3");
    this.mountain5 = this.scene.add.image(1100, this.startingPoint.y, "montaña5");

    this.mapContainer.add([
      this.background,
      this.background2,
      this.background3,
      this.mountain4,
      this.mountain5,
      this.background4,
      this.background5,
      this.background6,
      this.mountain1,
      this.mountain2,
      this.mountain3,
    ])
  }

  animateBackground(player: Phaser.GameObjects.Sprite) {
    const { x, y } = this.startingPoint;
    const { x: x2, y: y2 } = player;
    // animation backgrounds statics
    const { ajusteBX, ajusteBY } = { ajusteBX: 1.1, ajusteBY: 1.1 }
    const calcDiffBX = (x2 - x) / ajusteBX
    const calcDiffBY = (y2 - y) / ajusteBY;
    this.background.setPosition(x + calcDiffBX, y + calcDiffBY);
    this.background2.setPosition(x + calcDiffBX, y + calcDiffBY);
    this.background3.setPosition(x + calcDiffBX, y + calcDiffBY);
    // // animation frontgrounds
    const { ajusteFX, ajusteFY } = { ajusteFX: 4, ajusteFY: 2 }
    const calcDiffFX = (x2 - x) / ajusteFX
    const calcDiffFY = (y2 - y) / ajusteFY;
    this.background4.setPosition(x + calcDiffFX, y + 470 + calcDiffFY);
    this.background5.setPosition(x + calcDiffFX, y + 470 + calcDiffFY);
    this.background6.setPosition(x + this.background5.width - 15 + calcDiffFX, y + 470 + calcDiffFY);
    this.mountain4.setPosition(-400 + calcDiffFX, this.startingPoint.y + calcDiffFY)
    this.mountain5.setPosition(1100 + calcDiffFX, this.startingPoint.y + calcDiffFY)
    this.mountain1.setPosition(this.startingPoint.x + this.background5.width - 85 + calcDiffFX, this.startingPoint.y + 320 + calcDiffFY)
    this.mountain2.setPosition(this.startingPoint.x -70 + calcDiffFX, this.startingPoint.y + 350 + calcDiffFY)
    this.mountain3.setPosition(1200 + calcDiffFX, this.startingPoint.y + 470 + calcDiffFY)
  }

  addColliders() {
    if (this.scene.monchi) {
      if (this.portal) this.portal.setTint(0xff0000);
      if (this.pisos)
        this.scene.physics.add.collider(
          this.scene.monchi,
          this.pisos,
          this.scene.touch,
          () => true,
          this.scene
        );
      if (this.coin)
        this.scene.physics.add.overlap(
          this.scene.monchi,
          this.coin,
          () => this.scene.touchItem("coin"),
          () => true,
          this.scene
        );
      if (this.portal)
        this.scene.physics.add.overlap(
          this.scene.monchi,
          this.portal,
          () => this.scene.win(),
          () => true,
          this.scene
        );
    }
  }

  createMap(data: { level: number; lifes: number }) {
    this.movingFloor = this.scene.physics.add.group({ allowGravity: false });
    this.movingFloorRot = this.scene.physics.add.group({ allowGravity: false });
    this.pisos = this.scene.physics.add.group({ allowGravity: false });
    this.pisosBack = this.scene.physics.add.group({ allowGravity: false });
    this.pisos2 = this.scene.physics.add.group({ allowGravity: false });
    this.pisos3 = this.scene.physics.add.group({ allowGravity: false });
    this.pisos4 = this.scene.physics.add.group({ allowGravity: false });
    this.amountLifes = data.lifes;
    this.coin = this.scene.physics.add.group({ allowGravity: false });
    this.aura = this.scene.physics.add.group({ allowGravity: false, immovable: true })
    this.portal = this.scene.physics.add.group({ allowGravity: false });
    const aura = this.scene.add.sprite(1500, 600, "auraTuto").setScale(0.6)
    this.aura.add(aura)


    this.scene.tweens.add({
      targets: aura,
      alpha: 0.4,
      duration: 1000,
      yoyo: true,
      repeat: -1
    })


    const p1Config: LargeFloorConfig = {
      textureA: "plataformaNuevaA",
      textureB: "plataformaNuevaA",
      pos: { x: 300, y: 1200 },
      scale: { width: 0.6, height: 0.6 },
      large: 25,
      gap: 0,
      planeta: 1
    };
    const p1 = new LargeFloor(this.scene, p1Config, this.pisos);

    const p2Config: FloorConfig = {
      texture: "plataformaNuevaA",
      pos: { x: 900, y: 1050 },
      scale: { width: 0.6, height: 0.6 },
      fix: 25,
      width: 140,
      height: 50,
    };
    const p2 = new Floor(this.scene, p2Config, this.pisos);

    const p3Config: FloorConfig = {
      texture: "plataformaNuevaA",
      pos: { x: 1100, y: 900 },
      scale: { width: 0.6, height: 0.6 },
      fix: 25,
      width: 140,
      height: 50,
    };
    const p3 = new Floor(this.scene, p3Config, this.pisos);

    const p4Config: FloorConfig = {
      texture: "plataformaNuevaA",
      pos: { x: 1300, y: 750 },
      scale: { width: 0.6, height: 0.6 },
      fix: 25,
      width: 140,
      height: 50,
    };
    const p4 = new Floor(this.scene, p4Config, this.pisos);


    //Portal, Coin and Asteroids
    const portalConfig: FloorConfig = {
      spriteSheet: "portal1",
      texture: "portal1",
      pos: { x: 2400, y: 1100 }, // x: 2400
      width: 100,
      height: 100,
      frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]
    };
    const port = new Floor(this.scene, portalConfig, this.portal).setDepth(99);
    this.endPortal = port

    const coinConfig: FloorConfig = {
      texture: "coin",
      pos: { x: 1500, y: 600 },
      scale: { width: 0.15, height: 0.15 },
      width: 10,
      height: 18,
      fix: 10,
    };
    this.cristal = new Floor(this.scene, coinConfig, this.coin).setBodySize(140, 180);

    const c1Config: AsteroidGeneratorConfig = {
      texture: "asteroid",
      x: -100,
      y: 1700,
      delayed: 100,
      direction: 0,
      velocity: 100,
      scale: 0.7,
      depth: 1,
    };
    const c1 = new AsteroidGenerator(this.scene, c1Config);
    c1.start();

    const c2Config: AsteroidGeneratorConfig = {
      texture: "asteroid2",
      x: 3000,
      y: 800,
      delayed: 100,
      direction: 1,
      velocity: 100,
      scale: 0.5,
      depth: 1,
    };
    const c2 = new AsteroidGenerator(this.scene, c2Config);
    c2.start();

    const mapObjects =
      this.movingFloor.getChildren().concat(
        this.movingFloorRot.getChildren(),
        this.pisos.getChildren(),
        this.pisosBack.getChildren(),
        this.pisos2.getChildren(),
        this.pisos3.getChildren(),
        this.pisos4.getChildren(),
        this.coin.getChildren(),
        this.aura.getChildren(),
        this.portal.getChildren(),
        this.aura.getChildren(),
      )
    this.mapContainer.add(mapObjects)
    this.mapContainer.add([
      this.mountain1,
      this.mountain2,
      this.mountain3
    ])
    this.scene.UICamera?.ignore(this.mapContainer)

  }
  update() {
    /* Attach background anim */
    if (this.scene.monchi) this.animateBackground(this.scene.monchi);
  }
}
export default Mapa0;
