
import Phaser from "phaser";
import CloudGenerator, { CloudGeneratorConfig } from "../assets/CloudGenerator";
import Floor, { FloorConfig } from "../assets/Floor";
import LargeFloor, { LargeFloorConfig } from "../assets/LargeFloor";
import UI, { UIConfig } from "../assets/UI";
// Scene in class
class Mapa {
  isJumping = false;
  debugGraphics: Phaser.GameObjects.Graphics;
  scene: Phaser.Scene;
  worldSize = {
    width: 3500,
    height: 10000,
  };
  pisos?: Phaser.Physics.Arcade.Group;
  coin?: Phaser.Physics.Arcade.Group;
  portal?: Phaser.Physics.Arcade.Group;
  UIg?: Phaser.GameObjects.Group;
  changer?: Phaser.GameObjects.Image;
  portalInit?: Phaser.Physics.Arcade.Group;
  fireballGroup?: Phaser.Physics.Arcade.Group;
  startingPoint = {
    x: 400, //400
    y: 140, //140
  };
  background: Phaser.GameObjects.Image;
  constructor(scene: Phaser.Scene) {
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
    this.background.setPosition((x + calcDiffX),(y + calcDiffY));  
  };

  createMap() {

    this.pisos = this.scene.physics.add.group({ allowGravity: false });
    this.coin = this.scene.physics.add.group({ allowGravity: false });
    this.portal = this.scene.physics.add.group({ allowGravity: false });
    this.UIg = this.scene.add.group()
    this.fireballGroup = this.scene.physics.add.group({ allowGravity: false});
    this.portalInit = this.scene.physics.add.group({ allowGravity: false});
    

    //PLATAFORMS

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
      large: 4,
      pos: { x: 1400, y: 1300, },
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
    /*

    const p13Config: LargeFloorConfig = {
        textureA: "plataformaA",
        textureB: "plataformaB",
        large: 7,
        pos: { x: 1500, y: 100, },
        scale: { width: 0.7, height: 0.7, },
        rotated: true,
      };
    const p13 = new LargeFloor(this.scene, p13Config, this.pisos);


*/

    //portal monedas y asteroides

    const portalConfig: FloorConfig = {
      texture: "portal",
      pos: { x: 2220, y: 2150, },
      scale: { width: 0.1, height: 0.1, },
      width: 1000,
      height: 1500,
    };

    const port = new Floor(this.scene, portalConfig, this.portal)
    .setRotation(Math.PI/2)
    .setSize(1400,800);

    const portalInicioConfig: FloorConfig = {
      texture: "portal",
      pos: { x: 400, y: 150, },
      scale: { width: 0.1, height: 0.1, },
      width: 1000,
      height: 1500,
    };

    const portInicio = new Floor(this.scene, portalInicioConfig, this.portalInit).setDepth(15);

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
    .setOffset(220, 100) ; 

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

    //ASTEROIDS

    const c1Config: CloudGeneratorConfig = {
      texture: "asteroid",
      x: -100,
      y: 1700,
      delayed: 100,
      direction: 0,
      velocity: 100,
      scale: .70,
      depth: 1,
    };
    const c1 = new CloudGenerator(this.scene, c1Config);
    c1.start();

    const c2Config: CloudGeneratorConfig = {
      texture: "asteroid2",
      x: 3000,
      y: 800,
      delayed: 100,
      direction: 1,
      velocity: 100,
      scale: .50,
      depth: 1,
    };
    const c2 = new CloudGenerator(this.scene, c2Config);
    c2.start();

    //UI
    
    

    const lifeConfig: UIConfig = {
      texture: "heart",
      pos: { x: 150, y: 100},
      scale: .1
    };
    const lifes1 = new UI(this.scene, lifeConfig, this.UIg)
    .setScrollFactor(0, 0);


    const lifeConfig2: UIConfig = {
      texture: "heart",
      pos: { x: 200, y: 100},
      scale: .1
    };
    const lifes2 = new UI(this.scene, lifeConfig2, this.UIg)
    .setScrollFactor(0, 0);


    const lifeConfig3: UIConfig = {
      texture: "heart",
      pos: { x: 100, y: 100},
      scale: .1

    };
    const lifes3 = new UI(this.scene, lifeConfig3, this.UIg)
    .setScrollFactor(0, 0);



    const coinConf: UIConfig = {
      texture: "coin",
      pos: { x: 300, y: 100},
      scale: .1

    };
    const coinUI = new UI(this.scene, coinConf, this.UIg)
    .setTint(Phaser.Display.Color.GetColor(0, 0, 0))
    .setScrollFactor(0, 0);


    const arrowConfig: UIConfig = {
      texture: "arrow",
      pos: { x: 400 , y: 100},
      scale: .1

    };
    const arrow = new UI(this.scene, arrowConfig, this.UIg)
    .setRotation(Math.PI/2)
    .setScrollFactor(0, 0);

    this.UIg.setDepth(10);


  };

};

export default Mapa 