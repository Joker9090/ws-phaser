import Phaser from "phaser";
import AsteroidGenerator, {
  AsteroidGeneratorConfig,
} from "../../assets/AsteroidGenerator";
import Floor, { FloorConfig } from "../../assets/Floor";
import LargeFloor, { LargeFloorConfig } from "../../assets/LargeFloor";
import Game from "../../Game";

import portal, { portalConfig } from "../../assets/portal";
import { loseConfigFromMapType } from "@/game/Types";
// Scene in class
class Mapa4 {
  isJumping = false;
  scene: Game;
  worldSize = {
    width: 3500,
    height: 3000,
  };
  nextScene: string | undefined = undefined;

  startingPoint = {
    x: 400, //400
    y: 290, //140
  };
  checkPointPos1 = {
    x: 600,
    y: 140,
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
      cameraDirection: "NORMAL",
      PlayerDirection: "ROTATED",
      gravityDown: false
    },
  ];

  pisos?: Phaser.Physics.Arcade.Group;
  coin?: Phaser.Physics.Arcade.Group;
  portal?: Phaser.Physics.Arcade.Group;
  lifesGroup?: Phaser.GameObjects.Group;
  changer?: Phaser.GameObjects.Image;
  portalInit?: Phaser.Physics.Arcade.Group;
  fireballGroup?: Phaser.Physics.Arcade.Group;
  background: Phaser.GameObjects.Image
  background2: Phaser.GameObjects.Image
  background3: Phaser.GameObjects.Image
  background4: Phaser.GameObjects.Image
  background5: Phaser.GameObjects.Image
  background6: Phaser.GameObjects.Image
  aura?: Phaser.Physics.Arcade.Group;
  endPortal?: Floor;
  sideGrav: boolean = false;
  collected: any;

  mapContainer: Phaser.GameObjects.Container;

  constructor(scene: Game) {
    this.scene = scene;

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
    const calcDiffX = (x2 - x) / 1//mas grande menos movimiento
    const calcDiffY = (y2 - y - this.scene.cameras.main.displayHeight / 6) / 1;
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
      // if (this.pisos2)
      //   this.scene.physics.add.collider(
      //     this.scene.monchi,
      //     this.pisos2,
      //     () => {
      //       this.scene.changeGravity(true, 1000)
      //       this.scene.checkPoint = 1
      //     },
      //     () => true,
      //     this.scene
      //   );
      // if (this.pisos3)
      //   this.scene.physics.add.collider(
      //     this.scene.monchi,
      //     this.pisos3,
      //     () => {
      //       if (this.scene.checkPoint === 1) {
      //         this.scene.rotateCam(true, 10);
      //         this.scene.checkPoint = 2
      //       }

      //     },
      //     () => true,
      //     this.scene
      //   );
      if (this.coin)
        this.scene.physics.add.overlap(
          this.scene.monchi,
          this.coin,
          () => this.scene.touchItem("coin"),
          () => true,
          this.scene
        );
      if (this.fireballGroup)
        this.scene.physics.add.overlap(
          this.scene.monchi,
          this.fireballGroup,
          () => this.scene.touchItem("fireball"),
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
      // if (this.pisos4)
      //   this.scene.physics.add.collider(
      //     this.scene.monchi,
      //     this.pisos4,
      //     () => {
      //       this.scene.canRot = true // medio hack, revisar lógica
      //       this.scene.changeGravity(false, 1000)
      //       this.scene.rotateCam(false, 10)
      //       this.scene.checkPoint = 0
      //     },
      //     () => true,
      //     this.scene
      //   );
      // if (this.movingFloor)
      //   this.scene.physics.add.collider(
      //     this.scene.monchi,
      //     this.movingFloor,
      //     () => {
      //       this.scene.touch()
      //     },
      //     () => true,
      //     this.scene
      //   );
      // if (this.movingFloorRot)
      //   this.scene.physics.add.collider(
      //     this.scene.monchi,
      //     this.movingFloorRot,
      //     () => {
      //       this.scene.touch()
      //     },
      //     () => true,
      //     this.scene
      //   );
    }
  }

  createMap(data: { level: number; lifes: number }) {
    this.pisos = this.scene.physics.add.group({ allowGravity: false });
    this.coin = this.scene.physics.add.group({ allowGravity: false });
    this.portal = this.scene.physics.add.group({ allowGravity: false });
    this.fireballGroup = this.scene.physics.add.group({ allowGravity: false });
    this.portalInit = this.scene.physics.add.group({ allowGravity: false });
    this.aura = this.scene.physics.add.group({ allowGravity: false, immovable: true })
    const aura = this.scene.add.sprite(1000, 1355, "auraTuto").setScale(0.6)
    this.aura.add(aura)
    this.scene.tweens.add({
      targets: aura,
      alpha: 0.4,
      duration: 1000,
      yoyo: true,
      repeat: -1
    })
    
    /* Platforms */

    const p1Config: LargeFloorConfig = {
      textureA: "plataformaLarga",
      gap: 0,
      textureB: "plataformaLarga",
      large: 10,
      pos: { x: 370, y: 150 + 300 },
      scale: { width: 0.5, height: 0.7 },
      rotated: false,
      planeta: 1

    };
    const p1 = new LargeFloor(this.scene, p1Config, this.pisos);

    const p2Config: LargeFloorConfig = {
      textureA: "plataformaLarga",
      textureB: "plataformaLarga",
      gap: 0,
      large: 3,
      pos: { x: 1400, y: 150 + 100 },
      scale: { width: 0.7, height: 0.7 },
      rotated: true,
      planeta: 1

    };
    const p2 = new LargeFloor(this.scene, p2Config, this.pisos);

    const p3Config: LargeFloorConfig = {
      textureA: "plataformaLarga",
      gap: 0,
      textureB: "plataformaLarga",
      large: 4,
      pos: { x: 1045, y: 150 + 460 },
      scale: { width: 0.7, height: 0.7 },
      rotated: true,
      planeta: 1

    };
    const p3 = new LargeFloor(this.scene, p3Config, this.pisos);

    const p4Config: LargeFloorConfig = {
      textureA: "plataformaLarga",
      textureB: "plataformaLarga",
      gap: 0,
      large: 3,
      pos: { x: 1400, y: 1370 },
      scale: { width: 0.7, height: 0.7 },
      rotated: true,
      planeta: 1

    };
    const p4 = new LargeFloor(this.scene, p4Config, this.pisos);

    const p5Config: LargeFloorConfig = {
      textureA: "plataformaLarga",
      gap: 0,
      textureB: "plataformaLarga",
      large: 3,
      pos: { x: 720, y: 150 + 1970 },
      scale: { width: 0.7, height: 0.7 },
      rotated: false,
      planeta: 1

    };
    const p5 = new LargeFloor(this.scene, p5Config, this.pisos);

    const p6Config: LargeFloorConfig = {
      textureA: "plataformaLarga",
      gap: 0,
      textureB: "plataformaLarga",
      large: 4,
      pos: { x: 590, y: 150 + 1400 },
      scale: { width: 0.7, height: 0.7 },
      rotated: true,
      planeta: 1

    };
    const p6 = new LargeFloor(this.scene, p6Config, this.pisos);

    const p7Config: LargeFloorConfig = {
      textureA: "plataformaLarga",
      gap: 0,
      textureB: "plataformaLarga",
      large: 7,
      pos: { x: 200, y: 150 + 1000 },
      rotated: true,
      scale: { width: 0.7, height: 0.7 },
      planeta: 1

    };
    const p7 = new LargeFloor(this.scene, p7Config, this.pisos);

    const p8Config: LargeFloorConfig = {
      textureA: "plataformaLarga",
      gap: 0,
      textureB: "plataformaLarga",
      large: 2,
      pos: { x: 900, y: 150 + 2300 },
      scale: { width: 0.7, height: 0.7 },
      rotated: true,
      planeta: 1

    };
    const p8 = new LargeFloor(this.scene, p8Config, this.pisos);

    const p9Config: LargeFloorConfig = {
      textureA: "plataformaLarga",
      gap: 0,
      textureB: "plataformaLarga",
      large: 1,
      pos: { x: 1200, y: 150 + 2100 },
      scale: { width: 0.7, height: 0.7 },
      rotated: true,
      planeta: 1

    };
    const p9 = new LargeFloor(this.scene, p9Config, this.pisos).setDepth(0);

    const p10Config: LargeFloorConfig = {
      textureA: "plataformaLarga",
      gap: 0,
      textureB: "plataformaLarga",
      large: 2,
      pos: { x: 1500, y: 150 + 2300 },
      scale: { width: 0.7, height: 0.7 },
      rotated: true,
      planeta: 1

    };
    const p10 = new LargeFloor(this.scene, p10Config, this.pisos);

    const p11Config: LargeFloorConfig = {
      textureA: "plataformaLarga",
      gap: 0,
      textureB: "plataformaLarga",
      large: 4,
      pos: { x: 1900, y: 150 + 1600 },
      scale: { width: 0.7, height: 0.7 },
      rotated: true,
      planeta: 1

    };
    const p11 = new LargeFloor(this.scene, p11Config, this.pisos);

    const p12Config: LargeFloorConfig = {
      textureA: "plataformaLarga",
      gap: 0,
      textureB: "plataformaLarga",
      large: 2,
      pos: { x: 2300, y: 150 + 1350 },
      scale: { width: 0.7, height: 0.7 },
      rotated: true,
      planeta: 1
    };
    const p12 = new LargeFloor(this.scene, p12Config, this.pisos);
    const p13Config: LargeFloorConfig = {
      textureA: "plataformaLarga",
      gap: 0,
      textureB: "plataformaLarga",
      large: 2,
      pos: { x: 2300, y: 150 + 2050 },
      scale: { width: 0.7, height: 0.7 },
      rotated: true,
      planeta: 1
    };
    const p13 = new LargeFloor(this.scene, p13Config, this.pisos);
    /* Portal, Coin, Fireball and Asteroids */

    // const portalConfig: FloorConfig = {
    //   texture: "portal",
    //   pos: { x: 2220, y: 150 + 2150 },
    //   scale: { width: 0.1, height: 0.1 },
    //   width: 1000,
    //   height: 1500,
    // };
    const portalConfig: FloorConfig = {
      spriteSheet: "portal1",
      texture: "portal1",
      width: 200,
      height: 100,
      pos: { x: 2220, y: 150 + 2150 },
      // scene: this.scene,
      // collected: this.collected,
      frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]
    }
    const port = new Floor(this.scene, portalConfig, this.portal).setRotation(Math.PI / 2);
    this.endPortal = port


    const fireballConfig: FloorConfig = {
      spriteSheet: "meteorito",
      texture: "meteorito",
      pos: { x: this.worldSize.width + 200, y: 1700 }, // 500 1580
      // scale: { width: 0.2, height: 0.2 },
      width: 200,
      height: 100,
      // fix: 250,

      tween: {
        duration: 1900,
        paused: false,
        // yoyo: true,
        repeat: -1,
        x: "-=4000",
        scaleX: 0,
        scaleY: 0
      },
      // scene: this.scene,
      frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
    const fireball = new Floor(this.scene, fireballConfig, this.fireballGroup).setRotation(Math.PI / 2)

    const coinConfig: FloorConfig = {
      texture: "coin",
      pos: { x: 1000, y: 1355 }, // 500 1580
      scale: { width: 0.15, height: 0.15 },
      width: 10,
      height: 18,
      fix: 10,
    };
    const coin = new Floor(this.scene, coinConfig, this.coin).setVisible(true).setBodySize(140, 180);

    const c1Config: AsteroidGeneratorConfig = {
      texture: "asteroid",
      x: -100,
      y: 150 + 1700,
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
      y: 150 + 800,
      delayed: 100,
      direction: 1,
      velocity: 100,
      scale: 0.5,
      depth: 1,
    };
    const c2 = new AsteroidGenerator(this.scene, c2Config);
    c2.start();

    const mapObjects =
    this.pisos.getChildren().concat(
        this.coin.getChildren(),
        this.aura.getChildren(),
        this.portal.getChildren(),
        this.aura.getChildren(),
    )
this.mapContainer.add(mapObjects)
this.scene.UICamera?.ignore(this.mapContainer)
  }

  update() {
    let firstChange = false;
    if (this.scene.monchi) {
      if (
        this.scene.monchi.x > 1000 &&
        this.scene.monchi.x < 1200 &&
        this.scene.monchi.y < 386
      ) {
        this.sideGrav = true;
        firstChange = true;
      }
      if (this.sideGrav) {
        this.scene.physics.world.gravity.y = 0;
        if (firstChange) {
          // hitbox vago de costado
          this.scene.monchi
            .setRotation(-Math.PI / 2)
          // .setSize(300, 200)
          // .setOffset(80, 120);
          firstChange = false;
        }
      }
    }
    if (this.scene.monchi) {
      if (this.scene.monchi.y > 1100) {
        this.coin?.setVisible(true);
      }
    }
    // this.scaleBg()
    if (this.scene.cursors) {
      if (this.scene.monchi) {
        if (this.sideGrav) {
          this.scene.monchi.checkSideGravity(this.scene.cursors);
        } else if (this.scene.timeLevel < 4) {
          this.scene.monchi.setVelocityX(0);
          this.scene.monchi.setDepth(0);
        } else if (this.scene.timeLevel >= 4 && this.scene.timeLevel <= 8) {
          this.scene.monchi.setVelocityX(200)
        } else {
          this.scene.monchi.checkMove(this.scene.cursors);
        }
        if (this) this.animateBackground(this.scene.monchi);

      }
    }
  }

}

export default Mapa4;
