import Phaser from "phaser";
import AsteroidGenerator, {
  AsteroidGeneratorConfig,
} from "../assets/AsteroidGenerator";
import Floor, { FloorConfig } from "../assets/Floor";
import LargeFloor, { LargeFloorConfig } from "../assets/LargeFloor";
import Game from "../Game";
import UIScene from "../UIScene";
// Scene in class
class Mapa2 {
  isJumping = false;
  debugGraphics: Phaser.GameObjects.Graphics;
  scene: Game;
  worldSize = {
    width: 3500,
    height: 3000,
  };
  pisos?: Phaser.Physics.Arcade.Group;
  coin?: Phaser.Physics.Arcade.Group;
  portal?: Phaser.Physics.Arcade.Group;
  lifesGroup?: Phaser.GameObjects.Group;
  changer?: Phaser.GameObjects.Image;
  portalInit?: Phaser.Physics.Arcade.Group;
  fireballGroup?: Phaser.Physics.Arcade.Group;

  UIScene?: UIScene;

  startingPoint = {
    x: 400, //400
    y: 290, //140
  };
  checkPointPos = {
    x: 600,
    y: 140,
  };
  backgroundLayer1?: Phaser.GameObjects.Image;
  backgroundLayer2?: Phaser.GameObjects.Image;
  backgroundLayer3?: Phaser.GameObjects.Image;
  backgroundLayer4?: Phaser.GameObjects.Image;
  backgroundLayer5?: Phaser.GameObjects.Image;
  backgroundLayer6?: Phaser.GameObjects.Image;
  backgroundLayer7?: Phaser.GameObjects.Image;
  backgroundLayer8?: Phaser.GameObjects.Image;
  sideGrav: boolean = false;

  constructor(scene: Game) {
    this.scene = scene;
    this.UIScene = this.scene.game.scene.getScene("UIScene") as UIScene;

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
    this.backgroundLayer1 = this.scene.add.image(this.startingPoint.x, this.startingPoint.y, "background").setOrigin(0.5, 0.5);
    this.backgroundLayer2 = this.scene.add.image(this.startingPoint.x, this.startingPoint.y, "background").setOrigin(0.5, 0.5);
    this.backgroundLayer3 = this.scene.add.image(this.startingPoint.x, this.startingPoint.y, "background").setOrigin(0.5, 0.5);
    this.backgroundLayer4 = this.scene.add.image(this.startingPoint.x, this.startingPoint.y, "background").setOrigin(0.5, 0.5);
    this.backgroundLayer5 = this.scene.add.image(this.startingPoint.x, this.startingPoint.y, "background").setOrigin(0.5, 0.5);
    this.backgroundLayer6 = this.scene.add.image(this.startingPoint.x, this.startingPoint.y, "background").setOrigin(0.5, 0.5);
    this.backgroundLayer7 = this.scene.add.image(this.startingPoint.x, this.startingPoint.y, "background").setOrigin(0.5, 0.5);
    this.backgroundLayer8 = this.scene.add.image(this.startingPoint.x, this.startingPoint.y, "background").setOrigin(0.5, 0.5);
  }

  animateBackground(player: Phaser.GameObjects.Sprite) {
    const { x, y } = this.startingPoint;
    const { x: x2, y: y2 } = player;
    const calcDiffX = (x2 - x) / 1.2;
    const calcDiffY = (y2 - y) / 1.2;
    this.backgroundLayer1?.setPosition(x + calcDiffX + 10, y + calcDiffY);
    this.backgroundLayer2?.setPosition(x + calcDiffX + 35, y + calcDiffY);
    this.backgroundLayer3?.setPosition(x + calcDiffX + 60, y + calcDiffY);
    this.backgroundLayer4?.setPosition(x + calcDiffX + 45, y + calcDiffY);
    this.backgroundLayer5?.setPosition(x + calcDiffX + 30, y + calcDiffY);
    this.backgroundLayer6?.setPosition(x + calcDiffX + 15, y + calcDiffY);
    this.backgroundLayer7?.setPosition(x + calcDiffX + 30, y + calcDiffY);
    this.backgroundLayer8?.setPosition(x + calcDiffX + 22, y + calcDiffY);
  }

  createMap(data: { level: number; lifes: number }) {

    this.backgroundLayer1 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "lvl1bg1")
      .setOrigin(0.5, 0.5)
      .setScale(8, 8);
    this.backgroundLayer2 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "lvl1bg2")
      .setOrigin(0.5, 0.5)
      .setScale(8, 8);
    this.backgroundLayer3 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "lvl1bg3")
      .setOrigin(0.5, 0.5)
      .setScale(8, 8);
    this.backgroundLayer4 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "lvl1bg4")
      .setOrigin(0.5, 0.5)
      .setScale(8, 8);
    this.backgroundLayer5 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "lvl1bg5")
      .setOrigin(0.5, 0.5)
      .setScale(8, 8);
    this.backgroundLayer6 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "lvl1bg6")
      .setOrigin(0.5, 0.5)
      .setScale(8, 8);
    this.backgroundLayer7 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "lvl1bg7")
      .setOrigin(0.5, 0.5)
      .setScale(8, 8);
    this.backgroundLayer8 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "lvl1bg8")
      .setOrigin(0.5, 0.5)
      .setScale(8, 8);

    this.pisos = this.scene.physics.add.group({ allowGravity: false });
    this.coin = this.scene.physics.add.group({ allowGravity: false });
    this.portal = this.scene.physics.add.group({ allowGravity: false });
    this.fireballGroup = this.scene.physics.add.group({ allowGravity: false });
    this.portalInit = this.scene.physics.add.group({ allowGravity: false });
    // this.scene.cameras.main.setZoom(0.2)
    /* Platforms */




    const p1Config: LargeFloorConfig = {
      textureA: "plataformaLarga",
      gap: 0,
      textureB: "plataformaLarga",
      large: 4,
      pos: { x: 370, y: 150 + 300 },
      scale: { width: 0.5, height: 0.7 },
      rotated: false,
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
    };
    const p3 = new LargeFloor(this.scene, p3Config, this.pisos);

    const p4Config: LargeFloorConfig = {
      textureA: "plataformaLarga",
      textureB: "plataformaLarga",
      gap: 0,
      large: 3,
      pos: { x: 1400, y: 150 + 1130 },
      scale: { width: 0.7, height: 0.7 },
      rotated: true,
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
    };
    const p13 = new LargeFloor(this.scene, p13Config, this.pisos);
    /* Portal, Coin, Fireball and Asteroids */

    const portalConfig: FloorConfig = {
      texture: "portal",
      pos: { x: 2220, y: 150 + 2150 },
      scale: { width: 0.1, height: 0.1 },
      width: 1000,
      height: 1500,
    };

    const port = new Floor(this.scene, portalConfig, this.portal)
      .setRotation(Math.PI / 2)
      .setSize(1400, 800);

    const portalInicioConfig: FloorConfig = {
      texture: "portal",
      pos: { x: 400, y: 150 + 150 },
      scale: { width: 0.1, height: 0.1 },
      width: 1000,
      height: 1500,
    };

    const portInicio = new Floor(
      this.scene,
      portalInicioConfig,
      this.portalInit
    ).setDepth(1);

    const fireballConfig: FloorConfig = {
      texture: "fireball",
      pos: { x: 1910, y: 150 + 1450 }, // 500 1580
      scale: { width: 0.2, height: 0.2 },
      width: 400,
      height: 400,
      fix: 250,
      tween: {
        duration: 800,
        paused: false,
        yoyo: true,
        repeat: -1,
        y: "-=200",
      },
    };
    const fireball = new Floor(this.scene, fireballConfig, this.fireballGroup)
      .setAngularVelocity(30)
      .setOffset(220, 100);

    const coinConfig: FloorConfig = {
      texture: "coin",
      pos: { x: 1000, y: 105 + 1250 }, // 500 1580
      scale: { width: 1, height: 1 },
      width: 50,
      height: 120,
      fix: 0,
    };
    const coin = new Floor(this.scene, coinConfig, this.coin).setVisible(true);

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

    this.scene.cameras.main.shake(2000, 0.01);
  }

  addColliders() {
    if (this.scene.monchi) {
      if (this.fireballGroup)
        this.scene.physics.add.collider(
          this.scene.monchi,
          this.fireballGroup,
          this.scene.loseLevel2,
          () => true,
          this.scene
        );
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
          this.scene.coinCollected,
          () => true,
          this.scene
        );
      if (this.portal)
        this.scene.physics.add.overlap(
          this.scene.monchi,
          this.portal,
          () => this.scene.win("Congrats! You've finished the tutorial"),
          () => true,
          this.scene
        );
    }
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

export default Mapa2;
