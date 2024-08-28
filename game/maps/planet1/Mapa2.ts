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

class Mapa2 {
  isJumping = false;
  // debugGraphics: Phaser.GameObjects.Graphics;
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
  fireballGroup?: Phaser.Physics.Arcade.Group;
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
  checkPointPos1 = {
    x: 1300,
    y: 600,
  };

  loseConfig: loseConfigFromMapType = [
    {
      positions: this.startingPoint,
      cameraDirection: "NORMAL",
      PlayerDirection: "NORMAL",
      gravityDown: true
    },
    {
      positions: this.checkPointPos1,
      cameraDirection: "ROTATED",
      PlayerDirection: "NORMAL",
      gravityDown: true
    },
  ];

  background: Phaser.GameObjects.Image;
  background2: Phaser.GameObjects.Image;
  background3: Phaser.GameObjects.Image;
  background4: Phaser.GameObjects.Image;
  background5: Phaser.GameObjects.Image;
  background6: Phaser.GameObjects.Image;
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
      .image(this.startingPoint.x, this.startingPoint.y, "newBg1")
      .setOrigin(0.5, 0.5).setScale(1.8);
    this.background2 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "newBg2")
      .setOrigin(0.5, 0.5).setScale(1.8);
    this.background3 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "newBg3")
      .setOrigin(0.5, 0.5).setScale(1.8);
    this.background4 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "newBg4")
      .setOrigin(0.5, 0.5).setScale(1.8);
    this.background5 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "newBg5")
      .setOrigin(0.5, 0.5).setScale(1.8);
    this.background6 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "newBg6")
      .setOrigin(0.5, 0.5).setScale(1.8);
    this.mapContainer.add([
      this.background,
      this.background2,
      this.background3,
      this.background4,
      this.background5,
      this.background6,
    ])
  }

  animateBackground(player: Phaser.GameObjects.Sprite) {
    const { x, y } = this.startingPoint;
    const { x: x2, y: y2 } = player;
    const calcDiffX = (x2 - x) / 1
    const calcDiffY = (y2 - y - this.scene.cameras.main.displayHeight / 6) / 1.3;
    this.background.setPosition(x + calcDiffX, y + calcDiffY);
    this.background2.setPosition(x + calcDiffX, y + calcDiffY);
    this.background3.setPosition(x + calcDiffX, y + calcDiffY);
    this.background4.setPosition(x + calcDiffX, y + calcDiffY);
    this.background5.setPosition(x + calcDiffX, y + calcDiffY);
    this.background6.setPosition(x + calcDiffX, y + calcDiffY);
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
      if (this.pisos2)
        this.scene.physics.add.collider(
          this.scene.monchi,
          this.pisos2,
          () => this.scene.changeGravity(true, 1000),
          () => true,
          this.scene
        );
      if (this.pisos3)
        this.scene.physics.add.collider(
          this.scene.monchi,
          this.pisos3,
          () => {
            this.scene.rotateCam(true, 10);
            this.scene.checkPoint = 1
          },
          () => true,
          this.scene
        );
      if (this.pisos4)
        this.scene.physics.add.collider(
          this.scene.monchi,
          this.pisos4,
          () => {
            this.scene.canRot = true // medio hack, revisar lógica
            this.scene.changeGravity(false, 1000)
            this.scene.rotateCam(false, 10)
          },
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
      if (this.fireballGroup)
        this.scene.physics.add.collider(
          this.scene.monchi,
          this.fireballGroup,
          this.scene.lose,
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
    this.fireballGroup = this.scene.physics.add.group({ allowGravity: false });
    this.pisos4 = this.scene.physics.add.group({ allowGravity: false });
    this.amountLifes = data.lifes;
    this.coin = this.scene.physics.add.group({ allowGravity: false });
    this.aura = this.scene.physics.add.group({ allowGravity: false, immovable: true })
    this.portal = this.scene.physics.add.group({ allowGravity: false });
    const aura = this.scene.add.sprite(1450, 600, "auraTuto").setScale(0.6)
    this.aura.add(aura)


    this.scene.tweens.add({
      targets: aura,
      alpha: 0.4,
      duration: 1000,
      yoyo: true,
      repeat: -1
    })


    const p1Config: LargeFloorConfig = {
      textureA: "plataformaLarga2",
      textureB: "plataformaLarga2",
      pos: { x: 300, y: 1200 },
      scale: { width: 0.6, height: 0.6 },
      large: 5,
      gap: 0,
      planeta: 1
    };
    const p1 = new LargeFloor(this.scene, p1Config, this.pisos);

    const p2Config: FloorConfig = {
      texture: "plataformaA",
      pos: { x: 900, y: 1050 },
      scale: { width: 0.6, height: 0.6 },
      fix: 25,
      width: 140,
      height: 50,
    };
    const p2 = new Floor(this.scene, p2Config, this.pisos);

    const p3Config: FloorConfig = {
      texture: "plataformaA",
      pos: { x: 1100, y: 900 },
      scale: { width: 0.6, height: 0.6 },
      fix: 25,
      width: 140,
      height: 50,
    };
    const p3 = new Floor(this.scene, p3Config, this.pisos);

    const p4Config: FloorConfig = {
      texture: "plataformaA",
      pos: { x: 1300, y: 750 },
      scale: { width: 0.6, height: 0.6 },
      fix: 25,
      width: 140,
      height: 50,
    };
    const p4 = new Floor(this.scene, p4Config, this.pisos3);
    p4.setTint(
      Phaser.Display.Color.GetColor(255, 101, 0)
    );

    const p5Config: FloorConfig = {
      texture: "plataformaA",
      pos: { x: 1600, y: 750 },
      scale: { width: 0.6, height: 0.6 },
      fix: 25,
      width: 140,
      height: 50,
    };
    const p5 = new Floor(this.scene, p5Config, this.pisos2);
    p5.setTint(
      Phaser.Display.Color.GetColor(255, 101, 101)
    );

    const p6Config: LargeFloorConfig = {
      textureA: "plataformaLarga2",
      textureB: "plataformaLarga2",
      pos: { x: 1200, y: 200 },
      scale: { width: 0.6, height: 0.6 },
      large: 3,
      gap: 0,
      planeta: 1
    };
    const p6 = new LargeFloor(this.scene, p6Config, this.pisos);


    const p7Config: LargeFloorConfig = {
      textureA: "plataformaLarga2",
      textureB: "plataformaLarga2",
      pos: { x: 2100, y: 200 },
      scale: { width: 0.6, height: 0.6 },
      large: 3,
      gap: 0,
      planeta: 1
    };
    const p7 = new LargeFloor(this.scene, p7Config, this.pisos);

    //Portal, Coin and Asteroids
    const portalConfig: FloorConfig = {
      spriteSheet: "portal1",
      texture: "portal1",
      pos: { x: 2600, y: 330 }, // x: 2400
      width: 100,
      height: 100,
      frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]
    };
    const port = new Floor(this.scene, portalConfig, this.portal).setDepth(99);
    this.endPortal = port

    const coinConfig: FloorConfig = {
      texture: "coin",
      pos: { x: 1450, y: 600 },
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

    // const fireballConfig: FloorConfig = {
    //   spriteSheet: "meteorito",
    //   texture: "meteorito",
    //   pos: { x: 1900, y: -100 }, // 500 1580
    //   // scale: { width: 0.2, height: 0.2 },
    //   width: 200,
    //   height: 100,
    //   // fix: 250,

    //   tween: {
    //     duration: 1900,
    //     paused: false,
    //     // yoyo: true,
    //     repeat: -1,
    //     x: "+=2000",
    //     scaleX: 0,
    //     scaleY: 0
    //   },
    //   // scene: this.scene,
    //   frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    // };
    // const fireball = new Floor(this.scene, fireballConfig, this.fireballGroup).setRotation(Math.PI / 2)


    const mapObjects =
      this.movingFloor.getChildren().concat(
        this.movingFloorRot.getChildren(),
        this.pisos.getChildren(),
        this.fireballGroup.getChildren(),
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
    this.scene.UICamera?.ignore(this.mapContainer)

  }
  update() {
    /* Attach background anim */
    if (this.scene.monchi) this.animateBackground(this.scene.monchi);
  }
}
export default Mapa2;
