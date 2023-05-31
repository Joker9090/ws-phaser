
import Phaser from "phaser";
import CloudGenerator, { CloudGeneratorConfig } from "../assets/CloudGenerator";
import Floor, { FloorConfig } from "../assets/Floor";
import LargeFloor, { LargeFloorConfig } from "../assets/LargeFloor";
// Scene in class
class Mapa {
  isJumping = false;
  debugGraphics: Phaser.GameObjects.Graphics;
  scene: Phaser.Scene;
  worldSize = {
    width: 10000,
    height: 2500,
  };
  pisos?: Phaser.Physics.Arcade.Group
  pisos2?: Phaser.Physics.Arcade.Group
  pisos3?: Phaser.Physics.Arcade.Group
  pisos4?: Phaser.Physics.Arcade.Group
  coin?: Phaser.Physics.Arcade.Group
  portal?: Phaser.Physics.Arcade.Group
  movingFloor?:  Phaser.Physics.Arcade.Group
  movingFloorRot?:  Phaser.Physics.Arcade.Group

  startingPoint = {
    x: 500, //500
    y: 800, //800
  };
  background: Phaser.GameObjects.Image
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
  }

  animateBackground(player: Phaser.GameObjects.Sprite) {
    const { x, y } = this.startingPoint
    const { x: x2, y: y2 } = player
    const calcDiffX = (x2 - x) / 1.2
    const calcDiffY = (y2 - y) / 1.2

    this.background.setPosition((x + calcDiffX),(y + calcDiffY))
    /* 
    const tween = this.scene.tweens.add({
      duration: 500,
      targets: this.background,
      x: (x + calcDiffX),
      y: (y + calcDiffY)
    })
    */
    
  }

  createMap() {
    this.movingFloor = this.scene.physics.add.group({ allowGravity: false })
    this.movingFloorRot = this.scene.physics.add.group({ allowGravity: false })
    this.pisos = this.scene.physics.add.group({ allowGravity: false });
    this.pisos2 = this.scene.physics.add.group({ allowGravity: false });
    this.pisos3 = this.scene.physics.add.group({ allowGravity: false });
    this.coin = this.scene.physics.add.group({ allowGravity: false });
    this.portal = this.scene.physics.add.group({ allowGravity: false });
    this.pisos4 = this.scene.physics.add.group({ allowGravity: false });

    const p1Config: FloorConfig = {
      texture: "plataformaA",
      pos: { x: 500, y: 1000, },
      scale: { width: 0.7, height: 0.7, }
    }
    const p1 = new Floor(this.scene, p1Config, this.pisos)

    const p2Config: FloorConfig = {
      texture: "plataformaA",
      pos: { x: 800, y: 1800, },
      scale: { width: 0.7, height: 0.7, },
      tween: {
        duration: 4500,
        paused: false,
        yoyo: true,
        repeat: -1,
        y: "-=1000"
      }
    }
    const p2 = new Floor(this.scene, p2Config, this.movingFloor)

    const p3Config: FloorConfig = {
      texture: "plataformaA",
      pos: { x: 500, y: 1700, },
      scale: { width: 0.7, height: 0.7, },

    }
    const p3 = new Floor(this.scene, p3Config, this.pisos)


    const p5Config: FloorConfig = {
      texture: "plataforma2",
      pos: { x: 700, y: 1000, }, // 1100 800
      scale: { width: 0.1, height: 0.1, },
      width: 2400, 
      height: 100,
    }
    const p5 = new Floor(this.scene, p5Config, this.pisos)
    
    
    const p6Config: FloorConfig = {
      texture: "plataforma2",
      pos: { x: 1300, y: 1200, },
      scale: { width: 0.05, height: 0.05, },
      width: 2400,
      height: 100,

    }
    const p6 = new Floor(this.scene, p6Config, this.pisos)

    const p7Config: FloorConfig = {
      texture: "plataformaA",
      pos: { x: 1600, y: 1500, },
      scale: { width: 0.7, height: 0.7, },
      width: 200,
      height: 100,

    }
    const p7 = new Floor(this.scene, p7Config, this.pisos)

    const p8Config: FloorConfig = {
      texture: "plataforma2",
      pos: { x: 1300, y: 1200, },
      scale: { width: 0.15, height: 0.1, },
      width: 2400,
      height: 100,

    }
    const p8 = new Floor(this.scene, p8Config, this.pisos)
    // this.scene.physics.add.sprite(0,0,"plataformaB")

    const p9Config: FloorConfig = {
      texture: "plataformaA",
      pos: { x: 1800, y: 1800, },
      scale: { width: 1, height: 0.7, },
      width: 200,
      height: 100,

    }
    const p9 = new Floor(this.scene, p9Config, this.pisos2)

    const p4Config: LargeFloorConfig = {
      textureA: "plataformaA",
      textureB: "plataformaB",
      large: 7,
      pos: { x: 1500, y: 100, },
      scale: { width: 0.7, height: 0.7, },

    }

    const p4 = new LargeFloor(this.scene, p4Config, this.pisos)

    const p10Config: FloorConfig = {
      texture: "plataformaB",
      pos: { x: 2600, y: 250, },
      scale: { width: 0.85, height: 0.8, },
      width: 200,
      height: 50,

    }
    const p10 = new Floor(this.scene, p10Config, this.pisos)

    const p11Config: FloorConfig = {
      texture: "plataformaB",
      pos: { x: 2800, y: 400, },
      scale: { width: 0.85, height: 0.8, },
      width: 200,
      height: 50,

    }
    const p11 = new Floor(this.scene, p11Config, this.pisos)

    const p12Config: FloorConfig = {
      texture: "plataformaB",
      pos: { x: 3000, y: 550, },
      scale: { width: 0.85, height: 0.8, },
      width: 200,
      height: 50,

    }
    const p12 = new Floor(this.scene, p12Config, this.pisos)

    const p13Config: FloorConfig = {
      texture: "plataformaA",
      pos: { x: 3550, y: 700, },
      scale: { width: 0.7, height: 0.7, },
      tween: {
        duration: 5000,
        paused: false,
        yoyo: true,
        repeat: -1,
        x: "-=350"
      }
    }
    const p13 = new Floor(this.scene, p13Config, this.pisos3)

    const p14Config: LargeFloorConfig = {
      textureA: "plataformaA",
      textureB: "plataformaB",
      large: 5,
      pos: { x: 4800, y: 1700, },
      scale: { width: 0.7, height: 0.7, },

    }

    const p14 = new LargeFloor(this.scene, p14Config, this.pisos)

    const p15Config: FloorConfig = {
      texture: "plataformaB",
      pos: { x: 3800, y: 500, },
      scale: { width: 0.7, height: 0.7, },
    }
    const p15 = new Floor(this.scene, p15Config, this.pisos)

    const p16Config: FloorConfig = {
      texture: "plataformaB",
      pos: { x: 4000, y: 300, },
      scale: { width: 0.8, height: 0.7, },
    }
    const p16 = new Floor(this.scene, p16Config, this.pisos)

    const p17Config: FloorConfig = {
      texture: "plataformaB",
      pos: { x: 4300, y: 100, },
      scale: { width: 0.8, height: 0.7, },
      tween: {
        duration: 5000,
        paused: false,
        yoyo: true,
        repeat: -1,
        y: "+=500"
      }
    }
    const p17 = new Floor(this.scene, p17Config, this.movingFloorRot)

    const p18Config: FloorConfig = {
      texture: "plataformaB",
      pos: { x: 4600, y: 600, },
      scale: { width: 0.8, height: 0.7, },
    }
    const p18 = new Floor(this.scene, p18Config, this.pisos)


    const p19Config: FloorConfig = {
      texture: "plataformaB",
      pos: { x: 4900, y: 300, },
      scale: { width: 0.8, height: 0.7, },
    }
    const p19 = new Floor(this.scene, p19Config, this.pisos4)
//portal monedas y asteroides

    const portalConfig: FloorConfig = {
      texture: "portal",
      pos: { x: 5400, y: 1590, },
      scale: { width: 0.1, height: 0.1, },
      width: 1000,
      height: 1500,

    }
    const port = new Floor(this.scene, portalConfig, this.portal)

    const coinConfig: FloorConfig = {
      texture: "coin",
      pos: { x: 500, y: 1580, },
      scale: { width: 0.1, height: 0.1, },
      width: 450,
      height: 600,
      fix: 100,

    }
    const coin = new Floor(this.scene, coinConfig, this.coin)

    const c1Config: CloudGeneratorConfig = {
      texture: "asteroid",
      x: -100,
      y: 1700,
      delayed: 100,
      direction: 0,
      velocity: 100,
      scale: .70,
      depth: 1,
    }
    const c1 = new CloudGenerator(this.scene, c1Config)
    c1.start()

    const c2Config: CloudGeneratorConfig = {
      texture: "asteroid2",
      x: 3000,
      y: 800,
      delayed: 100,
      direction: 1,
      velocity: 100,
      scale: .50,
      depth: 1,
    }
    const c2 = new CloudGenerator(this.scene, c2Config)
    c2.start()
  }

}

export default Mapa 