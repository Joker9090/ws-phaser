
import Phaser from "phaser";
import AsteroidGenerator, { AsteroidGeneratorConfig } from "../assets/AsteroidGenerator";
import Floor, { FloorConfig } from "../assets/Floor";
import LargeFloor, { LargeFloorConfig } from "../assets/LargeFloor";
import Game from "../Game";
import UIScene from "../UIScene"
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

  UIScene?: UIScene

  startingPoint = {
    x: 400, //400
    y: 140, //140
  };
  checkPointPos = {
    x: 600,
    y: 140,
  };
  background: Phaser.GameObjects.Image;
  sideGrav: boolean = false;

  constructor(scene: Game) {
    this.scene = scene;
    this.UIScene = this.scene.game.scene.getScene("UIScene") as UIScene

    /* World size*/
    this.scene.physics.world.setBounds(0, 0, this.worldSize.width, this.worldSize.height);

    /* Debug */
    this.debugGraphics = this.scene.add.graphics();
    this.debugGraphics.fillStyle(0x00ff00, 0.5);
    this.debugGraphics.fillRect(0, 0, this.worldSize.width, this.worldSize.height);
    /* Debug */
    this.background = this.scene.add.image(this.startingPoint.x, this.startingPoint.y, "background").setOrigin(0.5, 0.5);
  };

  animateBackground(player: Phaser.GameObjects.Sprite) {
    const { x, y } = this.startingPoint;
    const { x: x2, y: y2 } = player;
    const calcDiffX = (x2 - x) / 1.2;
    const calcDiffY = (y2 - y) / 1.2;
    this.background.setPosition((x + calcDiffX), (y + calcDiffY));
  };

  createMap(data: { level: number, lifes: number }) {

    this.pisos = this.scene.physics.add.group({ allowGravity: false });
    this.coin = this.scene.physics.add.group({ allowGravity: false });
    this.portal = this.scene.physics.add.group({ allowGravity: false });
    this.fireballGroup = this.scene.physics.add.group({ allowGravity: false });
    this.portalInit = this.scene.physics.add.group({ allowGravity: false });


    /* Platforms */

    const p1Config: LargeFloorConfig = {
      textureA: "plataformaA",
      textureB: "plataformaB",
      large: 5,
      pos: { x: 400, y: 300, },
      scale: { width: 0.7, height: 0.7, },
      rotated: false
    };
    const p1 = new LargeFloor(this.scene, p1Config, this.pisos);

    const p2Config: LargeFloorConfig = {
      textureA: "plataformaA",
      textureB: "plataformaB",
      large: 5,
      pos: { x: 1400, y: 100, },
      scale: { width: 0.7, height: 0.7, },
      rotated: true,
    };
    const p2 = new LargeFloor(this.scene, p2Config, this.pisos);

    const p3Config: LargeFloorConfig = {
      textureA: "plataformaA",
      textureB: "plataformaB",
      large: 7,
      pos: { x: 1045, y: 360, },
      scale: { width: 0.7, height: 0.7, },
      rotated: true,
    };
    const p3 = new LargeFloor(this.scene, p3Config, this.pisos);

    const p4Config: LargeFloorConfig = {
      textureA: "plataformaA",
      textureB: "plataformaB",
      large: 5,
      pos: { x: 1400, y: 1130, },
      scale: { width: 0.7, height: 0.7, },
      rotated: true,
    };
    const p4 = new LargeFloor(this.scene, p4Config, this.pisos);

    const p5Config: LargeFloorConfig = {
      textureA: "plataformaA",
      textureB: "plataformaB",
      large: 5,
      pos: { x: 720, y: 1870, },
      scale: { width: 0.7, height: 0.7, },
      rotated: false,
    };
    const p5 = new LargeFloor(this.scene, p5Config, this.pisos);


    const p6Config: LargeFloorConfig = {
      textureA: "plataformaA",
      textureB: "plataformaB",
      large: 7,
      pos: { x: 590, y: 1300, },
      scale: { width: 0.7, height: 0.7, },
      rotated: true,
    };
    const p6 = new LargeFloor(this.scene, p6Config, this.pisos);

    const p7Config: LargeFloorConfig = {
      textureA: "plataformaA",
      textureB: "plataformaB",
      large: 12,
      pos: { x: 200, y: 1000, },
      rotated: true,
      scale: { width: 0.7, height: 0.7, },
    };
    const p7 = new LargeFloor(this.scene, p7Config, this.pisos);

    const p8Config: LargeFloorConfig = {
      textureA: "plataformaA",
      textureB: "plataformaB",
      large: 4,
      pos: { x: 900, y: 2200, },
      scale: { width: 0.7, height: 0.7, },
      rotated: true,
    };
    const p8 = new LargeFloor(this.scene, p8Config, this.pisos);


    const p9Config: LargeFloorConfig = {
      textureA: "plataformaA",
      textureB: "plataformaB",
      large: 4,
      pos: { x: 1200, y: 1970, },
      scale: { width: 0.7, height: 0.7, },
      rotated: true,
    };
    const p9 = new LargeFloor(this.scene, p9Config, this.pisos);


    const p10Config: LargeFloorConfig = {
      textureA: "plataformaA",
      textureB: "plataformaB",
      large: 4,
      pos: { x: 1500, y: 2200, },
      scale: { width: 0.7, height: 0.7, },
      rotated: true,
    };
    const p10 = new LargeFloor(this.scene, p10Config, this.pisos);

    const p11Config: LargeFloorConfig = {
      textureA: "plataformaA",
      textureB: "plataformaB",
      large: 7,
      pos: { x: 1900, y: 1600, },
      scale: { width: 0.7, height: 0.7, },
      rotated: true,
    };
    const p11 = new LargeFloor(this.scene, p11Config, this.pisos);

    const p12Config: LargeFloorConfig = {
      textureA: "plataformaA",
      textureB: "plataformaB",
      large: 7,
      pos: { x: 2300, y: 1350, },
      scale: { width: 0.7, height: 0.7, },
      rotated: true,
    };
    const p12 = new LargeFloor(this.scene, p12Config, this.pisos);


    /* Portal, Coin, Fireball and Asteroids */

    const portalConfig: FloorConfig = {
      texture: "portal",
      pos: { x: 2220, y: 2150, },
      scale: { width: 0.1, height: 0.1, },
      width: 1000,
      height: 1500,
    };

    const port = new Floor(this.scene, portalConfig, this.portal)
      .setRotation(Math.PI / 2)
      .setSize(1400, 800);

    const portalInicioConfig: FloorConfig = {
      texture: "portal",
      pos: { x: 400, y: 150, },
      scale: { width: 0.1, height: 0.1, },
      width: 1000,
      height: 1500,
    };

    const portInicio = new Floor(this.scene, portalInicioConfig, this.portalInit).setDepth(1);

    const fireballConfig: FloorConfig = {
      texture: "fireball",
      pos: { x: 1910, y: 1450, }, // 500 1580
      scale: { width: .2, height: .2, },
      width: 400,
      height: 400,
      fix: 250,
      tween: {
        duration: 800,
        paused: false,
        yoyo: true,
        repeat: -1,
        y: "-=200"
      }
    };
    const fireball = new Floor(this.scene, fireballConfig, this.fireballGroup)
      .setAngularVelocity(30)
      .setOffset(220, 100);

    const coinConfig: FloorConfig = {
      texture: "coin",
      pos: { x: 1000, y: 350, }, // 500 1580
      scale: { width: 0.1, height: 0.1, },
      width: 450,
      height: 600,
      fix: 100,
    };
    const coin = new Floor(this.scene, coinConfig, this.coin)
      .setVisible(false);

    const c1Config: AsteroidGeneratorConfig = {
      texture: "asteroid",
      x: -100,
      y: 1700,
      delayed: 100,
      direction: 0,
      velocity: 100,
      scale: .70,
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
      scale: .50,
      depth: 1,
    };
    const c2 = new AsteroidGenerator(this.scene, c2Config);
    c2.start();
  };


  addColliders() {
    if (this.scene.monchi) {
      if (this.fireballGroup) this.scene.physics.add.collider(this.scene.monchi, this.fireballGroup, this.scene.loseLevel2, () => true, this.scene)
      if (this.portal) this.portal.setTint(0xff0000);
      if (this.pisos) this.scene.physics.add.collider(this.scene.monchi, this.pisos, this.scene.touch, () => true, this.scene);
      if (this.coin) this.scene.physics.add.overlap(this.scene.monchi, this.coin, this.scene.coinCollected, () => true, this.scene);
      if (this.portal) this.scene.physics.add.overlap(this.scene.monchi, this.portal, () => this.scene.win("Congrats! You've finished the tutorial"), () => true, this.scene);

    }

  }

  update() {
    let firstChange = false

    if (this.scene.monchi) {
      if (this.scene.monchi.x > 1000 && this.scene.monchi.x < 1200 && this.scene.monchi.y < 236) {
        this.sideGrav = true;
        firstChange = true;
      };
      if (this.sideGrav) {
        this.scene.physics.world.gravity.y = 0
        if (firstChange) {
          this.scene.monchi.setRotation(-Math.PI / 2).setSize(110, 73).setOffset(80, 40);
          firstChange = false;
        }
      }
    };
    if (this.scene.monchi) {
      if (this.scene.monchi.y > 1100) {
        this.coin?.setVisible(true);
      };
    };
    if (this.scene.cursors) {
      if (this.scene.monchi) {
        if (this.sideGrav) {
          this.scene.monchi.checkSideGravity(this.scene.cursors);
        } else if (this.scene.timeLevel < 7) {
          this.scene.monchi.setVelocityX(200); 
          this.scene.cameras.main.shake(1400,0.01);
        }
        else if (this.scene.timeLevel >= 7) {
          //this.scene.monchi.setVelocityX(0)
          this.scene.monchi.checkMove(this.scene.cursors);
        }
        if (this) this.animateBackground(this.scene.monchi);
      };

    };

  };
};

export default Mapa2;