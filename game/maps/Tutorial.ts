
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
  coin?: Phaser.Physics.Arcade.Group;
  portal?: Phaser.Physics.Arcade.Group;
  lifesGroup?: Phaser.GameObjects.Group;
  changer?: Phaser.GameObjects.Image;
  portalInit?: Phaser.Physics.Arcade.Group;
  fireballGroup?: Phaser.Physics.Arcade.Group;
  gravityArrow?: Phaser.GameObjects.Image;
  coinUI?: Phaser.GameObjects.Image;
  startingPoint = {
    x: 100, //400
    y: 1800, //140
  };
  checkPointPos = {
    x: 400, 
    y: 140, 
  };
  background: Phaser.GameObjects.Image;
  sideGrav: boolean = false;
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
        pos: { x: 0, y: 2000, },
        scale: { width: 0.7, height: 0.7, },
        rotated: false
      };
      const p0 = new LargeFloor(this.scene, p0Config, this.pisos);
      const p1Config: LargeFloorConfig = {
          textureA: "plataformaA",
          textureB: "plataformaB",
          large: 2,
          pos: { x: 400, y: 1800, },
          scale: { width: 0.7, height: 0.7, },
          rotated: false
        };
        const p1 = new LargeFloor(this.scene, p1Config, this.pisos);
        
        const p2Config: LargeFloorConfig = {
            textureA: "plataformaA",
            textureB: "plataformaB",
            large: 3,
            pos: { x: 700, y: 1600, },
            scale: { width: 0.7, height: 0.7, },
            rotated: false,
        };
        const p2 = new LargeFloor(this.scene, p2Config, this.pisos);
        /*

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
    */

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


    const fireballConfig: FloorConfig = {
      texture: "fireball",
      pos: { x: 310, y: 1850, }, // 500 1580
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


    /* UI */
    this.createUI(data.lifes)
  };


  addColliders() {
    if (this.scene.monchi) {
      if (this.fireballGroup) this.scene.physics.add.collider(this.scene.monchi,this.fireballGroup, this.scene.loseLevel2, () => true, this.scene)
      if (this.portal) this.portal.setTint(0xff0000);
      if (this.pisos) this.scene.physics.add.collider(this.scene.monchi, this.pisos, this.scene.touch, () => true, this.scene);
      if (this.coin) this.scene.physics.add.overlap(this.scene.monchi, this.coin, this.scene.coinCollected, () => true, this.scene);
      if (this.portal) this.scene.physics.add.overlap(this.scene.monchi, this.portal, this.scene.win, () => true, this.scene);
    }

  }

  update() {
    //console.log(this.scene.canWin, "can win", this.scene.nextLevel, "next level")
    //modo creative
    if (this.scene.textTime && this.scene.monchi) {
      this.scene.textTime.setText('X: ' + Math.floor(this.scene.monchi.x) + ' Y: ' + Math.floor(this.scene.monchi.y));
    };

    //
    if(this.coinUI){
      if (this.scene.canWin || this.scene.nextLevel){
        this.coinUI?.clearTint();
      };
    };

    let firstChange = false
    if(this.scene.monchi){
      if(this.scene.monchi.x > 1000 && this.scene.monchi.x < 1200 && this.scene.monchi.y < 236){
        this.sideGrav = true;
        firstChange = true
      };
      if(this.sideGrav){
        this.scene.physics.world.gravity.y = 0
        if(firstChange){
          this.scene.monchi.setRotation(-Math.PI/2).setSize(110,73).setOffset(80,40);
          firstChange = false;
          this.gravityArrow?.setRotation(0)
        }
      }
    };
    if (this.scene.monchi){
      if(this.scene.monchi.y > 1100){
        this.coin?.setVisible(true);
      };
    };
    if (this.scene.cursors) {
      if (this.scene.monchi) {
        if(this.sideGrav){
          this.scene.monchi.checkSideGravity(this.scene.cursors);
        } else {
         this.scene.monchi.checkMove(this.scene.cursors);
        }
        if (this) this.animateBackground(this.scene.monchi);
      };

    };
  };

};

export default Tutorial 