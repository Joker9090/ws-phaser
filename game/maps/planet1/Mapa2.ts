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
import LargeFloorIsland, { LargeFloorIslandConfig } from "@/game/assets/LargeFloorIsland";

class Mapa2 {
  isJumping = false;
  // debugGraphics: Phaser.GameObjects.Graphics;
  scene: Game;
  worldSize = {
    width: 10000,
    height: 1350,
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
  nextScene: string | undefined = 'postal2_planeta1';

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
  frontContainer: Phaser.GameObjects.Container;
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
    this.frontContainer = this.scene.add.container().setDepth(999999999999)

    this.background = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "background0P1")
      .setOrigin(0.5, 0.5)
    this.background2 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "background1P1")
      .setOrigin(0.5, 0.5)
    this.background3 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "backgroundStars")
      .setOrigin(0.5, 0.5)
    this.background4 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y + 470, "frontGround1")
      .setOrigin(1, 1).setScale(1);
    this.background5 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y + 470, "frontGround2")
      .setOrigin(0, 1).setScale(1);
    this.background6 = this.scene.add
      .image(this.startingPoint.x + this.background5.width - 15, this.startingPoint.y + 470, "frontGround1")
      .setOrigin(0, 1).setScale(1);

    this.mountain1 = this.scene.add.image(this.startingPoint.x + this.background5.width - 15, this.startingPoint.y - 370, "montaña3")
    this.mountain2 = this.scene.add.image(this.startingPoint.x - 70, this.startingPoint.y + 350, "montaña5")
    this.mountain3 = this.scene.add.image(1200, this.startingPoint.y + 470, "montaña3")
    this.mountain4 = this.scene.add.image(200, this.startingPoint.y, "montaña2")
    this.mountain5 = this.scene.add.image(1100, this.startingPoint.y, "montaña4")

    this.mapContainer.add([
      this.background,
      this.background2,
      this.background3,
      this.mountain4,
      this.mountain5,
      this.background4,
      this.background5,
      this.background6,

    ])

    this.frontContainer.add([
      this.mountain1,
      this.mountain2,
      this.mountain3,
    ])
  }

  animateBackground(player: Phaser.GameObjects.Sprite) {
    const offsetLevel = 150
    const { x, y } = this.startingPoint;
    const { x: x2, y: y2 } = player;
    // animation backgrounds statics
    const { ajusteBX, ajusteBY } = { ajusteBX: 1.1, ajusteBY: 1.1 }
    const calcDiffBX = (x2 - x) / ajusteBX
    const calcDiffBY = (y2 - y) / ajusteBY;
    this.background.setPosition(x + calcDiffBX, y  + calcDiffBY);
    this.background2.setPosition(x + calcDiffBX, y  + calcDiffBY);
    this.background3.setPosition(x + calcDiffBX, y  + calcDiffBY);
    // // animation frontgrounds
    const { ajusteFX, ajusteFY } = { ajusteFX: 4, ajusteFY: 2 }
    const calcDiffFX = (x2 - x) / ajusteFX
    const calcDiffFY = (y2 - y ) / ajusteFY;
    this.background4.setPosition(x + calcDiffFX, y + offsetLevel + 470 + calcDiffFY);
    this.background5.setPosition(x + calcDiffFX, y + offsetLevel + 470 + calcDiffFY);
    this.background6.setPosition(x + this.background5.width - 15 + calcDiffFX, y + offsetLevel + 470 + calcDiffFY);
    this.mountain4.setPosition(-200 + calcDiffFX, y + offsetLevel + calcDiffFY)
    this.mountain5.setPosition(1100 + calcDiffFX, y + offsetLevel + calcDiffFY)
    // // animation front mountains
    const { ajusteFMX, ajusteFMY } = { ajusteFMX: 20, ajusteFMY: 30 }
    const calcDiffFMX = -(x2 - x) / ajusteFMX
    const calcDiffFMY = -(y2 - y) / ajusteFMY;
    this.mountain1.setPosition(this.startingPoint.x + this.background5.width - 85 + calcDiffFMX, y + offsetLevel + 320 + calcDiffFMY)
    this.mountain2.setPosition(this.startingPoint.x - 270 + calcDiffFMX, y + offsetLevel + 350 + calcDiffFMY)
    this.mountain3.setPosition(1100 + calcDiffFMX, y + offsetLevel + 470 + calcDiffFMY)
  }

  addColliders() {
    if (this.scene.monchi) {
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
          () => this.scene.changeGravity(true, 1000, 3),
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


    // const p1Config: LargeFloorConfig = {
    //   textureA: "plataformaLarga2",
    //   textureB: "plataformaLarga2",
    //   pos: { x: 300, y: 1200 },
    //   scale: { width: 0.6, height: 0.6 },
    //   large: 5,
    //   gap: 0,
    //   planeta: 1
    // };
    // const p1 = new LargeFloor(this.scene, p1Config, this.pisos);

    const p1Config: LargeFloorIslandConfig = {
      textureA: "plataformaNuevaLargaA",
      textureB: "plataformaNuevaLargaB",
      textureC: "plataformaNuevaLargaC",
      pos: { x: 300, y: 1200 },
      width: {
        textureA: 90,
        textureB: 67,
        textureC: 115,
      },
      scale: {width: 0.7, height: 0.7},
      height: 127,
      large: 9,
      rotated: false
    };
    const p1 = new LargeFloorIsland(this.scene, p1Config, this.pisos);
    
    const p2Config: FloorConfig = {
      pos: { x: 900, y: 1050 },
      texture: "plataformaNuevaA",
      fix: 25,
      scale: {width: 0.7, height: 0.7},
      width: 140,
      height: 50,
    };
    const p2 = new Floor(this.scene, p2Config, this.pisos);

    const p3Config: FloorConfig = {
      pos: { x: 1100, y: 900 },
      texture: "plataformaNuevaA",
      fix: 25,
      scale: {width: 0.7, height: 0.7},
      width: 140,
      height: 50,
    };
    const p3 = new Floor(this.scene, p3Config, this.pisos);

    const p4Config: FloorConfig = {
      pos: { x: 1300, y: 750 },
      texture: "plataformaNuevaA",
      fix: 25,
      scale: {width: 0.7, height: 0.7},
      width: 140,
      height: 50,
    };
    const p4 = new Floor(this.scene, p4Config, this.pisos3);
    p4.setTint(
      Phaser.Display.Color.GetColor(255, 101, 0)
    );

    const p5Config: FloorConfig = {
      pos: { x: 1600, y: 750 },
      texture: "plataformaNuevaA",
      fix: 25,
      scale: {width: 0.7, height: 0.7},
      width: 140,
      height: 50,
    };
    const p5 = new Floor(this.scene, p5Config, this.pisos2);
    p5.setTint(
      Phaser.Display.Color.GetColor(255, 101, 101)
    );

    const p6Config: LargeFloorIslandConfig = {
      textureA: "plataformaNuevaLargaA",
      textureB: "plataformaNuevaLargaB",
      textureC: "plataformaNuevaLargaC",
      pos: { x: 1200, y: 200 },
      width: {
        textureA: 90,
        textureB: 67,
        textureC: 115,
      },
      scale: {width: 0.7, height: 0.7},
      height: 127,
      large: 13,
      rotated: true
    };
    const p6 = new LargeFloorIsland(this.scene, p6Config, this.pisos);

    
    const p7Config: LargeFloorIslandConfig = {
      textureA: "plataformaNuevaLargaA",
      textureB: "plataformaNuevaLargaB",
      textureC: "plataformaNuevaLargaC",
      pos: { x: 2000, y: 200 },
      width: {
        textureA: 90,
        textureB: 67,
        textureC: 115,
      },
      scale: {width: 0.7, height: 0.7},
      height: 127,
      large: 20,
      rotated: true
    };
    const p7 = new LargeFloorIsland(this.scene, p7Config, this.pisos);
    //Portal, Coin and Asteroids
    const portalConfig: FloorConfig = {
      pos: { x: 2600, y: 310 }, // x: 2400
      texture: "plataformaFinalP1",
      // scale: {width: 0.7, height: 0.7},
      width: 100,
      height: 100,
    };
    const port = new Floor(this.scene, portalConfig, this.portal).setDepth(99).setFlipY(true);
    this.endPortal = port

    const coinConfig: FloorConfig = {
      texture: "cristal2",
      pos: { x: 1450, y: 600 },
      scale: {width: 0.7, height: 0.7},
      width: 40,
      height: 18,
      fix: 10,
    };
    this.cristal = new Floor(this.scene, coinConfig, this.coin).setBodySize(140, 180);

    const c1Config: AsteroidGeneratorConfig = {
      texture: "nube1",
      x: 0,
      y: 500,
      delayed: 100,
      direction: 0,
      velocity: 20,
      scale: 1,
      depth: 99,
    };
    const c1 = new AsteroidGenerator(this.scene, c1Config);
    c1.start();

    const c2Config: AsteroidGeneratorConfig = {
      texture: "nube3",
      x: 3000,
      y: 600,
      delayed: 100,
      direction: 1,
      velocity: 30,
      scale: 1,
      depth: 99,
    };
    const c2 = new AsteroidGenerator(this.scene, c2Config);
    c2.start();

    const c3Config: AsteroidGeneratorConfig = {
      texture: "nube5",
      x: -1000,
      y: 300,
      delayed: 1600,
      direction: 0,
      velocity: 10,
      scale: 1.2,
      depth: 99,
    };
    const c3 = new AsteroidGenerator(this.scene, c3Config);
    c3.start();
    const fireballConfig: FloorConfig = {
      spriteSheet: "meteorito",
      texture: "meteorito",
      pos: { x: 1900, y: -600 }, // 500 1580
      width: 100,
      height: 100,
      tween: {
        duration: 5000,
        repeat: -1,
        y: "+=2500",
    },
      frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
    const fireball = new Floor(this.scene, fireballConfig, this.fireballGroup).setScale(0.5)


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
