import Phaser from "phaser";
import AsteroidGenerator, {
  AsteroidGeneratorConfig,
} from "../assets/AsteroidGenerator";
import Floor, { FloorConfig } from "../assets/Floor";
import LargeFloor, { LargeFloorConfig } from "../assets/LargeFloor";
import Game from "../Game";
import UIScene from "../UIScene";
import EventsCenter from "../EventsCenter";
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
  background: Phaser.GameObjects.Image
  background2: Phaser.GameObjects.Image
  background3: Phaser.GameObjects.Image
  background4: Phaser.GameObjects.Image
  background5: Phaser.GameObjects.Image
  background6: Phaser.GameObjects.Image

  UIScene?: UIScene;

  startingPoint = {
    x: 400, //400
    y: 290, //140
  };
  checkPointPos = {
    x: 600,
    y: 140,
  };

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

    this.background = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "newBg1")
      .setOrigin(0.5, 0.5);
    this.background2 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "newBg2")
      .setOrigin(0.5, 0.5);
    this.background3 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "newBg3")
      .setOrigin(0.5, 0.5);
    this.background4 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "newBg4")
      .setOrigin(0.5, 0.5);
    this.background5 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "newBg5")
      .setOrigin(0.5, 0.5);
    this.background6 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "newBg6")
      .setOrigin(0.5, 0.5);
  }
  // scaleBg() {
  //   if (this.scene.cameras.main.displayWidth > 1200) {
  //     this.background.displayHeight = this.scene.cameras.main.displayHeight + 100
  //     this.background.displayWidth = this.scene.cameras.main.displayWidth + 100
  //     this.background2.displayHeight = this.scene.cameras.main.displayHeight + 100
  //     this.background2.displayWidth = this.scene.cameras.main.displayWidth + 100
  //     this.background3.displayHeight = this.scene.cameras.main.displayHeight + 100
  //     this.background3.displayWidth = this.scene.cameras.main.displayWidth + 100
  //     this.background4.displayHeight = this.scene.cameras.main.displayHeight + 100
  //     this.background4.displayWidth = this.scene.cameras.main.displayWidth + 100
  //     this.background5.displayHeight = this.scene.cameras.main.displayHeight + 100
  //     this.background5.displayWidth = this.scene.cameras.main.displayWidth + 100
  //     this.background6.displayHeight = this.scene.cameras.main.displayHeight + 100
  //     this.background6.displayWidth = this.scene.cameras.main.displayWidth + 100
  //     this.background7.displayHeight = this.scene.cameras.main.displayHeight + 100
  //     this.background7.displayWidth = this.scene.cameras.main.displayWidth + 100
  //     this.background8.displayHeight = this.scene.cameras.main.displayHeight + 100
  //     this.background8.displayWidth = this.scene.cameras.main.displayWidth + 100
  //   } else {
  //     this.background.displayWidth = 1200
  //     this.background2.displayWidth = 1200
  //     this.background3.displayWidth = 1200
  //     this.background4.displayWidth = 1200
  //     this.background5.displayWidth = 1200
  //     this.background6.displayWidth = 1200
  //     this.background7.displayWidth = 1200
  //     this.background8.displayWidth = 1200
  //     this.background.displayHeight = this.scene.cameras.main.displayHeight + 100
  //     this.background2.displayHeight = this.scene.cameras.main.displayHeight + 100
  //     this.background3.displayHeight = this.scene.cameras.main.displayHeight + 100
  //     this.background4.displayHeight = this.scene.cameras.main.displayHeight + 100
  //     this.background5.displayHeight = this.scene.cameras.main.displayHeight + 100
  //     this.background6.displayHeight = this.scene.cameras.main.displayHeight + 100
  //     this.background7.displayHeight = this.scene.cameras.main.displayHeight + 100
  //     this.background8.displayHeight = this.scene.cameras.main.displayHeight + 100
  //   }
  // }
  animateBackground(player: Phaser.GameObjects.Sprite) {
    const { x, y } = this.startingPoint;
    const { x: x2, y: y2 } = player;
    const calcDiffX = (x2 - x) / 1//mas grande menos movimiento
    const calcDiffY = (y2 - y) / 1.1;
    this.background.setPosition(x + calcDiffX, y + calcDiffY);
    this.background2.setPosition(x + calcDiffX, y + calcDiffY);
    this.background3.setPosition(x + calcDiffX, y + calcDiffY);
    this.background4.setPosition(x + calcDiffX, y + calcDiffY);
    this.background5.setPosition(x + calcDiffX, y + calcDiffY);
    this.background6.setPosition(x + calcDiffX, y + calcDiffY);
    // this.background7.setPosition(x + calcDiffX, y + calcDiffY);
    // this.background8.setPosition(x + calcDiffX, y + calcDiffY);
  }

  createMap(data: { level: number; lifes: number }) {
    console.log("cameras", this.scene.cameras.main)
    EventsCenter.emit("gravityArrow", "down");
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

    // this.scene.cameras.main.shake(2000, 0.01);
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
  // sideGravFunction(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {

  //   if (cursors) {
  //     const { up, down, left, right } = cursors
  //     const velocity = 300
  //     if (up.isDown){}
  //   }
  // }
}

export default Mapa2;
