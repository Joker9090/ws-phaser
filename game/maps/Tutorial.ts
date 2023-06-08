
import Phaser from "phaser";
import CloudGenerator, { CloudGeneratorConfig } from "../assets/CloudGenerator";
import Floor, { FloorConfig } from "../assets/Floor";
import LargeFloor, { LargeFloorConfig } from "../assets/LargeFloor";
import UI, { UIConfig } from "../assets/UI";
import Game from "../Game";
// Scene in class
class Tutorial {
  isJumping = false;
  debugGraphics: Phaser.GameObjects.Graphics;
  scene: Game;
  worldSize = {
    width: 5000,
    height: 2500,
  };
  pisos?: Phaser.Physics.Arcade.Group;
  pisos2?: Phaser.Physics.Arcade.Group;
  pisos3?: Phaser.Physics.Arcade.Group;
  coin?: Phaser.Physics.Arcade.Group;
  portal?: Phaser.Physics.Arcade.Group;
  lifesGroup?: Phaser.GameObjects.Group;
  changer?: Phaser.GameObjects.Image;
  portalInit?: Phaser.Physics.Arcade.Group;
  fireballGroup?: Phaser.Physics.Arcade.Group;
  gravityArrow?: Phaser.GameObjects.Image;
  coinUI?: Phaser.GameObjects.Image;
  startingPoint = {
    x: 600, //600
    y: 1800, //1800
  };
  checkPointPos = {
    x: 900,
    y: 140,
  };
  background: Phaser.GameObjects.Image;
  sideGrav: boolean = false;

  tutorialState: number = 0;


  constructor(scene: Game) {
    this.scene = scene;

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

  createUI(lifes: number) {
    let quantityLifes = 0
    let xpos = 0
    if (this.lifesGroup) {
      for (let i = 0; i < lifes; i++) {
        quantityLifes += 1;
        xpos = 100 + i * 50;
        const lifeConfig: UIConfig = {
          texture: "heart",
          pos: { x: xpos, y: 50 },
          scale: .1
        };
        const coras = new UI(this.scene, lifeConfig, this.lifesGroup)
          .setScrollFactor(0, 0);
      };
      const coinConf: UIConfig = {
        texture: "coin",
        pos: { x: quantityLifes * 50 + 150, y: 50 },
        scale: .1

      };
      this.coinUI = new UI(this.scene, coinConf)
        .setTint(Phaser.Display.Color.GetColor(0, 0, 0))
        .setScrollFactor(0, 0)
        .setDepth(100);


      const arrowConfig: UIConfig = {
        texture: "arrow",
        pos: { x: quantityLifes * 50 + 250, y: 50 },
        scale: .1

      };

      this.gravityArrow = new UI(this.scene, arrowConfig)
        .setRotation(Math.PI / 2)
        .setScrollFactor(0, 0)
        .setDepth(100);

      this.lifesGroup.setDepth(100);
    }
  }

  createMap(data: { level: number, lifes: number }) {

    this.pisos = this.scene.physics.add.group({ allowGravity: false });
    this.pisos2 = this.scene.physics.add.group({ allowGravity: false });
    this.pisos3 = this.scene.physics.add.group({ allowGravity: false });
    this.coin = this.scene.physics.add.group({ allowGravity: false });
    this.portal = this.scene.physics.add.group({ allowGravity: false });
    this.lifesGroup = this.scene.add.group()
    this.fireballGroup = this.scene.physics.add.group({ allowGravity: false });
    this.portalInit = this.scene.physics.add.group({ allowGravity: false });


    /* Platforms */
    const p0Config: LargeFloorConfig = {
      textureA: "plataformaA",
      textureB: "plataformaB",
      large: 20,
      pos: { x: 500, y: 2000, },
      scale: { width: 0.7, height: 0.7, },
      rotated: false
    };
    const p0 = new LargeFloor(this.scene, p0Config, this.pisos);
    const p1Config: LargeFloorConfig = {
      textureA: "plataformaA",
      textureB: "plataformaB",
      large: 2,
      pos: { x: 1000, y: 1850, },
      scale: { width: 0.7, height: 0.7, },
      rotated: false
    };
    const p1 = new LargeFloor(this.scene, p1Config, this.pisos);

    const p2Config: LargeFloorConfig = {
      textureA: "plataformaA",
      textureB: "plataformaB",
      large: 3,
      pos: { x: 1300, y: 1700, },
      scale: { width: 0.7, height: 0.7, },
      rotated: false,
    };
    const p2 = new LargeFloor(this.scene, p2Config, this.pisos);

    const p3Config: FloorConfig = {
      texture: "plataformaA",
      pos: { x: 1750, y: 1550, },
      scale: { width: 0.7, height: 0.7, }
    };
    const p3 = new Floor(this.scene, p3Config, this.pisos2)
      .setTint(Phaser.Display.Color.GetColor(255, 177, 0));

    const p4Config: LargeFloorConfig = {
      textureA: "plataformaA",
      textureB: "plataformaB",
      large: 5,
      pos: { x: 1500, y: 400, },
      scale: { width: 0.7, height: 0.7, },
      rotated: false,
    };
    const p4 = new LargeFloor(this.scene, p4Config, this.pisos);

    const p5Config: FloorConfig = {
      texture: "plataformaB",
      pos: { x: 2350, y: 250, },
      scale: { width: 0.7, height: 0.7, }
    };
    const p5 = new Floor(this.scene, p5Config, this.pisos3)
      .setTint(Phaser.Display.Color.GetColor(255, 177, 0));
    /*


const p6Config: LargeFloorConfig = {
  textureA: "plataformaA",
  textureB: "plataformaB",
  large: 7,
  pos: { x: 590, y: 1300, },
  scale: { width: 0.7, height: 0.7, },
  rotated: true,
};
const p6 = new LargeFloor(this.scene, p6Config, this.pisos);
*/

    /* Portal, Coin, Fireball and Asteroids */

    const portalConfig: FloorConfig = {
      texture: "portal",
      pos: { x: 3250, y: 1875, },
      scale: { width: 0.1, height: 0.1, },
      width: 1000,
      height: 1500,
    };

    const port = new Floor(this.scene, portalConfig, this.portal)
      .setSize(800, 1400);


    const fireballConfig: FloorConfig = {
      texture: "fireball",
      pos: { x: 2850, y: 1875, }, // 500 1580
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
      pos: { x: 1500, y: 450, }, // 500 1580
      scale: { width: 0.1, height: 0.1, },
      width: 450,
      height: 600,
      fix: 100,
    };
    const coin = new Floor(this.scene, coinConfig, this.coin);


    /* UI */
    this.createUI(data.lifes)
  };


  addColliders() {
    if (this.scene.monchi) {
      if (this.fireballGroup) this.scene.physics.add.collider(this.scene.monchi, this.fireballGroup, this.scene.loseLevelTutorial, () => true, this.scene);
      if (this.portal) this.portal.setTint(0xff0000);
      if (this.pisos) this.scene.physics.add.collider(this.scene.monchi, this.pisos, this.scene.touch, () => true, this.scene);
      if (this.pisos2) this.scene.physics.add.collider(this.scene.monchi, this.pisos2, () => this.scene.float(500), () => true, this.scene);
      if (this.pisos3) this.scene.physics.add.collider(this.scene.monchi, this.pisos3, this.scene.noFloatTutorial, () => true, this.scene);
      if (this.coin) this.scene.physics.add.overlap(this.scene.monchi, this.coin, this.scene.coinCollected, () => true, this.scene);
      if (this.portal) this.scene.physics.add.overlap(this.scene.monchi, this.portal, ()=>this.scene.win("Congrats! You've finished the tutorial"), () => true, this.scene);
    }

  }

  update() {
    //console.log(this.scene.canWin, "can win", this.scene.nextLevel, "next level")
    //modo creative
    /*
    if (this.scene.timerText && this.scene.monchi) {
      //this.scene.textTime.setText('X: ' + Math.floor(this.scene.monchi.x) + ' Y: ' + Math.floor(this.scene.monchi.y));
      this.scene.timerText.setText("tutorialState: " + this.tutorialState);
    };
    if (this.scene) {
      if (this.tutorialState == 0) {
        this.scene.stop();
      }
    };
    */
    if (this.scene.gravityDown == false) {
      this.gravityArrow?.setRotation(-Math.PI / 2)
    } else {
      this.gravityArrow?.setRotation(Math.PI / 2)
    };
    //
    if (this.coinUI) {
      if (this.scene.canWin || this.scene.nextLevel) {
        this.coinUI?.clearTint();
      } else {
        this.coinUI?.setTint().setTint(Phaser.Display.Color.GetColor(0, 0, 0));
      };
    };
    if (this) {
      if (this.scene.cursors) {
        this.scene.cursors.space.on("down",  () => {
          this.tutorialState += 1;
        })
      };
      if (this.scene.monchi) {
        this.scene.monchi.checkMove(this.scene.cursors);
        if (this) this.animateBackground(this.scene.monchi);
      };
    };
  };
};

export default Tutorial 