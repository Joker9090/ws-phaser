import Phaser, { Physics } from "phaser";
import AsteroidGenerator, {
  AsteroidGeneratorConfig,
} from "../assets/AsteroidGenerator";
import Floor, { FloorConfig } from "../assets/Floor";
import LargeFloor, { LargeFloorConfig } from "../assets/LargeFloor";
import Game from "../Game";
import UIScene from "../UIScene";
import Player from "../assets/Player";

class Mapa1 {
  isJumping = false;
  debugGraphics: Phaser.GameObjects.Graphics;
  scene: Game;
  worldSize = {
    width: 10000,
    height: 2500,
  };
  pisos?: Phaser.Physics.Arcade.Group;
  pisosBack?: Phaser.Physics.Arcade.Group;
  pisos2?: Phaser.Physics.Arcade.Group;
  pisos3?: Phaser.Physics.Arcade.Group;
  pisos4?: Phaser.Physics.Arcade.Group;
  coin?: Phaser.Physics.Arcade.Group;
  portal?: Phaser.Physics.Arcade.Group;
  movingFloor?: Phaser.Physics.Arcade.Group;
  movingFloorRot?: Phaser.Physics.Arcade.Group;
  p13!: Floor;
  UIScene?: UIScene;
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
  background?: Phaser.GameObjects.Image;

  constructor(scene: Game, monchi: Player) {
    this.scene = scene;
    this.monchi = monchi;

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
      .image(this.startingPoint.x, this.startingPoint.y, "lvl1bg1")
      .setOrigin(0.5, 0.5)
      .setScale(8, 8);
    this.background = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "lvl1bg2")
      .setOrigin(0.5, 0.5)
      .setScale(8, 8);
    this.background = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "lvl1bg3")
      .setOrigin(0.5, 0.5)
      .setScale(8, 8);
    this.background = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "lvl1bg4")
      .setOrigin(0.5, 0.5)
      .setScale(8, 8);
    this.background = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "lvl1bg5")
      .setOrigin(0.5, 0.5)
      .setScale(8, 8);
    this.background = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "lvl1bg6")
      .setOrigin(0.5, 0.5)
      .setScale(8, 8);
    this.background = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "lvl1bg7")
      .setOrigin(0.5, 0.5)
      .setScale(8, 8);
    this.background = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "lvl1bg8")
      .setOrigin(0.5, 0.5)
      .setScale(8, 8);
  }

  animateBackground(player: Phaser.GameObjects.Sprite) {
    const { x, y } = this.startingPoint;
    const { x: x2, y: y2 } = player;
    const calcDiffX = (x2 - x) / 1.2;
    const calcDiffY = (y2 - y) / 1.2;
    this.background?.setPosition(x + calcDiffX, y + calcDiffY);
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
          (a, b) => this.scene.float(a, b, 1000),
          () => true,
          this.scene
        );
      if (this.pisos3)
        this.scene.physics.add.collider(
          this.scene.monchi,
          this.pisos3,
          () => {
            this.scene.rotateCam(10);
            console.log(this.pisos3);
          },
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
          this.scene.goNextLevel,
          () => true,
          this.scene
        );
      if (this.pisos4)
        this.scene.physics.add.collider(
          this.scene.monchi,
          this.pisos4,
          this.scene.noFloat,
          () => true,
          this.scene
        );
      if (this.pisosBack)
        this.scene.physics.add.collider(
          this.scene.monchi,
          this.pisosBack,
          //()=>{},
          this.scene.goBack,
          () => true,
          this.scene
        );
      //if (this.pisoGoBack) this.scene.physics.add.collider(this.scene.monchi, this.pisoGoBack, this.scene.goBack, () => true, this.scene);
      if (this.movingFloor)
        this.scene.physics.add.collider(
          this.scene.monchi,
          this.movingFloor,
          this.scene.movingFloorsGrav,
          () => true,
          this.scene
        );
      if (this.movingFloorRot)
        this.scene.physics.add.collider(
          this.scene.monchi,
          this.movingFloorRot,
          this.scene.movingFloorsGravRot,
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
    this.coin = this.scene.physics.add.group({ allowGravity: false });
    this.portal = this.scene.physics.add.group({ allowGravity: false });
    this.pisos4 = this.scene.physics.add.group({ allowGravity: false });

    this.amountLifes = data.lifes;

    const p1Config: FloorConfig = {
      texture: "plataformaLarga2",
      pos: { x: 500, y: 1000 },
      scale: { width: 0.4, height: 0.7 },
      // fix: 20,
      width: 390,
      height: 50,
    };
    const p1 = new Floor(this.scene, p1Config, this.pisos);

    const p2Config: FloorConfig = {
      texture: "plataformaLarga2",
      pos: { x: 800, y: 1800 },
      scale: { width: 0.5, height: 0.7 },
      fix: 25,
      width: 390,
      height: 50,
      tween: {
        duration: 4500,
        paused: false,
        yoyo: true,
        repeat: -1,
        y: "-=1000",
      },
    };
    const p2 = new Floor(this.scene, p2Config, this.movingFloor);

    const p3Config: FloorConfig = {
      texture: "plataformaA",
      pos: { x: 500, y: 1700 },
      scale: { width: 0.7, height: 0.7 },
      fix: 25,
      width: 140,
      height: 50,
    };
    const p3 = new Floor(this.scene, p3Config, this.pisos);

    const p5Config: FloorConfig = {
      texture: "plataformaA",
      pos: { x: 1100, y: 800 }, // 1100 800
      scale: { width: 0.7, height: 0.7 },
      width: 140,
      height: 50,
    };
    const p5 = new Floor(this.scene, p5Config, this.pisos);

    // const p6Config: FloorConfig = {
    //   texture: "plataformaB",
    //   pos: { x: 1000, y: 1500 },
    //   scale: { width: 0.05, height: 0.05 },
    //   width: 2400,
    //   height: 100,
    // };
    const p6Config: LargeFloorConfig = {
      textureA: "plataformaLarga2",
      textureB: "plataformaLarga2",
      pos: { x: 1000, y: 1500 },
      scale: { width: 0.3, height: 0.5 },
      // width: 2400,
      // height: 100,
      large: 1,
      gap: 0,
    };
    const p6 = new LargeFloor(this.scene, p6Config, this.pisos);

    const p7Config: FloorConfig = {
      texture: "plataformaA",
      pos: { x: 1600, y: 1500 },
      scale: { width: 0.7, height: 0.7 },
      fix: 25,
      width: 140,
      height: 50,
    };
    const p7 = new Floor(this.scene, p7Config, this.pisos);

    // const p8Config: FloorConfig = {
    //   texture: "plataformaLarga",
    //   pos: { x: 1300, y: 1200 },
    //   scale: { width: 1, height: 0.1 },
    //   fix: 20,
    //   width: 2400,
    //   height: 100,

    // };
    const p8Config: LargeFloorConfig = {
      textureA: "plataformaLarga2",
      textureB: "plataformaLarga2",
      large: 1,
      pos: { x: 1300, y: 1200 },
      scale: { width: 0.7, height: 0.7 },
      rotated: false,
      gap: 0,
      fix: 0,
    };
    const p8 = new LargeFloor(this.scene, p8Config, this.pisos);

    const p9Config: FloorConfig = {
      texture: "plataformaA",
      pos: { x: 1800, y: 1800 },
      scale: { width: 1.2, height: 0.7 },
      fix: 10,
      width: 180,
      height: 50,
    };
    const p9 = new Floor(this.scene, p9Config, this.pisos2).setTint(
      Phaser.Display.Color.GetColor(255, 101, 0)
    );

    const p4Config: LargeFloorConfig = {
      textureA: "plataformaLarga2",
      textureB: "plataformaLarga2",
      large: 7,
      gap: 0,
      fix: -20,
      pos: { x: 1500, y: 100 },
      scale: { width: 0.7, height: 0.7 },
    };

    const p4 = new LargeFloor(this.scene, p4Config, this.pisos);

    const p10Config: FloorConfig = {
      texture: "plataformaB",
      pos: { x: 2600, y: 250 },
      scale: { width: 1, height: 0.8 },
      fix: 25,
      width: 140,
      height: 90,
    };

    const p10 = new Floor(this.scene, p10Config, this.pisos);

    const p11Config: FloorConfig = {
      texture: "plataformaA",
      pos: { x: 2800, y: 400 },
      scale: { width: 1, height: 0.8 },
      fix: 25,
      width: 140,
      height: 90,
    };
    const p11 = new Floor(this.scene, p11Config, this.pisos);

    const p12Config: FloorConfig = {
      texture: "plataformaB",
      pos: { x: 3000, y: 550 },
      scale: { width: 1, height: 0.8 },
      fix: 25,
      width: 140,
      height: 90,
    };
    const p12 = new Floor(this.scene, p12Config, this.pisos);
    // p13 here

    // p13 here
    const p14Config: LargeFloorConfig = {
      textureA: "plataformaLarga",
      textureB: "plataformaLarga",
      large: 2,
      gap: 0,
      pos: { x: 4800, y: 1700 },
      // pos: { x: 500, y: 600 },
      scale: { width: 0.7, height: 0.7 },
    };
    const p14 = new LargeFloor(this.scene, p14Config, this.pisos);

    const pBackConfig: FloorConfig = {
      texture: "plataformaA",
      pos: { x: 4500, y: 1700 },
      // pos: { x: 500, y: 600 },

      fix: 20,
      width: 150,
      height: 90,
      scale: { width: 1, height: 1 },
      tween: {
        duration: 10000,
        paused: true,
        yoyo: true,
        repeat: -1,
        x: "-=4000",
      },
    };
    const pBack = new Floor(this.scene, pBackConfig, this.pisosBack).setTint(
      Phaser.Display.Color.GetColor(255, 101, 0)
    );
    pBack.setFrictionX(1)

    //this.pisoGoBack = this.scene.physics.add.sprite(4500, 1700, "plataformaA").setScale(0.7).setTint(Phaser.Display.Color.GetColor(255, 101, 0));

    const p15Config: FloorConfig = {
      texture: "plataformaB",
      pos: { x: 3800, y: 500 },
      // pos: { x: 500, y: 600 },

      fix: 20,
      width: 150,
      height: 90,
      scale: { width: 1, height: 0.7 },
    };
    const p15 = new Floor(this.scene, p15Config, this.pisos);

    const p16Config: FloorConfig = {
      texture: "plataformaA",
      pos: { x: 4000, y: 300 },
      // pos: { x: 500, y: 600 },
      fix: 10,
      width: 170,
      height: 90,
      scale: { width: 1, height: 0.7 },
    };
    const p16 = new Floor(this.scene, p16Config, this.pisos);

    const p17Config: FloorConfig = {
      texture: "plataformaB",
      // 4300 100
      // pos: { x: 500, y: 600 },
      pos: { x: 4300, y: 100 },
      scale: { width: 1, height: 0.7 },
      fix: 20,
      width: 150,
      height: 90,
      tween: {
        duration: 5000,
        paused: false,
        yoyo: true,
        repeat: -1,
        y: "+=500",
      },
    };
    const p17 = new Floor(this.scene, p17Config, this.movingFloorRot);

    const p18Config: FloorConfig = {
      texture: "plataformaB",
      pos: { x: 4600, y: 600 },
      // pos: { x: 300, y: 500 },
      fix: 20,
      width: 150,
      height: 50,
      scale: { width: 1, height: 0.7 },
    };
    const p18 = new Floor(this.scene, p18Config, this.pisos);

    const p19Config: FloorConfig = {
      texture: "plataformaB",
      pos: { x: 4900, y: 300 },
      // pos: { x: 300, y: 700 },
      fix: 20,
      width: 150,
      height: 90,
      scale: { width: 1, height: 1 },
    };
    const p19 = new Floor(this.scene, p19Config, this.pisos4).setTint(
      Phaser.Display.Color.GetColor(255, 101, 0)
    );

    //Portal, Coin and Asteroids
    const portalConfig: FloorConfig = {
      texture: "portal",
      pos: { x: 5400, y: 1590 },
      scale: { width: 0.1, height: 0.1 },
      width: 1000,
      height: 1500,
    };
    const port = new Floor(this.scene, portalConfig, this.portal);

    const coinConfig: FloorConfig = {
      texture: "coin",
      pos: { x: 500, y: 1580 },
      scale: { width: 1, height: 0.5 },
      width: 50,
      height: 120,
      fix: 0,
    };

    const coin = new Floor(this.scene, coinConfig, this.coin);

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

    const p13Config: FloorConfig = {
      texture: "plataformaB",
      pos: { x: 3550, y: 700 }, //3550 700
      scale: { width: 0.7, height: 0.7 },
      fix: 25,
      width: 140,
      height: 90,
      tween: {
        duration: 5000,
        paused: false,
        yoyo: true,
        repeat: -1,
        x: "-=350",
      },
    };
    const p13 = new Floor(this.scene, p13Config, this.pisos3).setTint(
      Phaser.Display.Color.GetColor(0, 0, 0)
    );
    this.p13 = p13;
    console.log(this.scene.monchi, "monchi");
    this.p13.setFrictionX(1);

  }
  update() {
    this.p13.setFrictionX(1);
    /* Attach controls to player */
    if (!this.goingBack) {
      if (this.scene.monchi && this.scene.cameraNormal) {
        this.scene.monchi.checkMove(this.scene.cursors);
      } else if (this.scene.monchi && this.scene.cameraNormal == false) {
        this.scene.monchi?.checkMoveRot(this.scene.cursors);
      }
    } else if (this.goingBack) {
      if (this.scene.monchi)
        this.scene.monchi.setY(1700 - this.scene.monchi.displayHeight);
    }
    if (this.scene.monchi) this.animateBackground(this.scene.monchi);
  }
}

export default Mapa1;
