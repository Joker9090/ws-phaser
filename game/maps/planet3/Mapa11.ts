import Phaser, { GameObjects, Physics, Time } from "phaser";
import AsteroidGenerator, {
    AsteroidGeneratorConfig,
} from "../../assets/AsteroidGenerator";
import Floor, { FloorConfig } from "../../assets/Floor";

import LargeFloor, { LargeFloorConfig } from "../../assets/LargeFloor";
import Game from "../../Game";

import Player from "../../assets/Player";
import portal, { portalConfig } from "../../assets/portal";
import { Children } from "react";
import { GamePlayDataType, loseConfigFromMapType } from "@/game/Types";
import LargeFloorIsland, { LargeFloorIslandConfig } from "@/game/assets/LargeFloorIsland";
import colors from "@/game/assets/PlatformColors";
import MasterManager from "@/game/MasterManager";

class Mapa11 {
    isJumping = false;
    // debugGraphics: Phaser.GameObjects.Graphics;
    scene: Game;
    worldSize = {
        width: 10000,
        height: 1800,
    };
    cameraBounds = {
        x: 0,
        y: 0,
        width: 3600,
        height: 1330,
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
    // no float + rotate cam
    pisos5?: Phaser.Physics.Arcade.Group;

    pisos6?: Phaser.Physics.Arcade.Group;

    fireballGroup?: Phaser.Physics.Arcade.Group;
    coin?: Phaser.Physics.Arcade.Group;
    EmptyCoin?: Phaser.Physics.Arcade.Group;
    EmptyCristal?: Floor;
    portal?: Phaser.Physics.Arcade.Group;
    aura?: Phaser.Physics.Arcade.Group;
    auraImage?:Floor;
    movingFloor?: Phaser.Physics.Arcade.Group;
    movingFloorRot?: Phaser.Physics.Arcade.Group;

    t1?:Phaser.Tweens.Tween;
    p3?:Floor;
    amountLifes: number = 0;
    sideGrav: boolean = false;
    goingBack: boolean = false;
    pisoGoBack?: Phaser.GameObjects.Sprite;
    player?: Player;
    startingPoint = {
        x: 1000, //500
        y: 800, //800
    };
    checkPoint1 = {
        x: 2600, //500
        y: 1000, //800
    };
    loseConfig: loseConfigFromMapType = [
        {
            positions: this.startingPoint,
            cameraDirection: "NORMAL",
            PlayerDirection: "NORMAL",
            gravityDown: true
        },
        {
            positions: this.checkPoint1,
            cameraDirection: "NORMAL",
            PlayerDirection: "NORMAL",
            gravityDown: true
        },
    ];
    nextScene: string | undefined = undefined;
  postalCode: string | undefined = undefined

  masterManager?: MasterManager;
  background: Phaser.GameObjects.Image;
  background2: Phaser.GameObjects.Image;
  background3: Phaser.GameObjects.Image;
  background4: Phaser.GameObjects.Image;
  // background5: Phaser.GameObjects.Image;  
  frontground1: Phaser.GameObjects.Image;
  frontground2: Phaser.GameObjects.Image;
  frontground3: Phaser.GameObjects.Image;
  frontground4: Phaser.GameObjects.Image;
  frontground5: Phaser.GameObjects.Image;
  frontground6: Phaser.GameObjects.Image;
  // hueso1: Phaser.GameObjects.Image;
  hueso2: Phaser.GameObjects.Image;
  hueso3: Phaser.GameObjects.Image;
  hueso4: Phaser.GameObjects.Image;
  hueso5: Phaser.GameObjects.Image;
  hueso6: Phaser.GameObjects.Image;
  mountain1: Phaser.GameObjects.Image;
  mountain2: Phaser.GameObjects.Image;
  mountain3: Phaser.GameObjects.Image;
  mountain4: Phaser.GameObjects.Image;
  mountain5: Phaser.GameObjects.Image;
  normal:boolean = true
  backgroundsBack: Phaser.GameObjects.Image[];
  backgroundsMiddle: Phaser.GameObjects.Image[];
  backgroundsFront: Phaser.GameObjects.Image[];
  originalPositionsBackgroundsBack: {x: number, y:number}[]
  originalPositionsBackgroundsMiddle: {x: number, y:number}[]
  originalPositionsBackgroundsFront: {x: number, y:number}[]
  invincibilityTimer?: Time.TimerEvent
  invincible?: Phaser.Physics.Arcade.Group;
    
  background4OriginalPos: {x: number, y:number}

    UIItemToGrab: string = 'uiItemp3';
    UIItemScale?: number = 0.3;

    cristal?: Floor;
    collected: Boolean = false;
    endPortal?: Floor;

    isFloating: boolean = false;

    mapContainer: Phaser.GameObjects.Container;
    frontContainer: Phaser.GameObjects.Container;

  
    constructor(scene: Game, player: Player, data?: GamePlayDataType) {
      this.scene = scene;
      this.player = player;
    
      /* World size*/
      this.scene.physics.world.setBounds(
        0,
        0,
        this.worldSize.width,
        this.worldSize.height
      );
  
      this.mapContainer = this.scene.add.container()
      this.frontContainer = this.scene.add.container().setDepth(999999999999)
      const frontBackgroundsContainer = this.scene.add.container(0,0)
      const backBackgroundsContainer = this.scene.add.container(0,0)
      this.background = this.scene.add
        .image(this.startingPoint.x, this.startingPoint.y, "p3Gradiant")
        .setOrigin(0.5, 0.5).setScale(1.5)
  
      this.background2 = this.scene.add
        .image(this.startingPoint.x, this.startingPoint.y, "p1backgroundNoche")
        .setOrigin(0.5, 0.5)
        .setAlpha(0);
      this.background3 = this.scene.add
        .image(this.startingPoint.x, this.startingPoint.y, "p1capaOscuridad")
        .setOrigin(0.5, 0.5)
        .setAlpha(0);
        this.background4 = this.scene.add
        .image(this.startingPoint.x, this.startingPoint.y + 280, "background3p3")
        .setOrigin(0.5, 0.5)
        .setAlpha(1)
        .setScale(4,2);
      // this.background5 = this.scene.add
      //   .image(this.startingPoint.x + this.background4.width * 2 , this.startingPoint.y + 280, "background3p3")
      //   .setOrigin(0.5, 0.5)
      //   .setAlpha(1)
      //   .setScale(2);
  
      this.frontground1 = this.scene.add
        .image(this.startingPoint.x, this.startingPoint.y + 600, "background2p3")
        .setOrigin(1, 1)
        .setScale(1);
      this.frontground2 = this.scene.add
        .image(
          this.startingPoint.x - 5,
          this.startingPoint.y + 600,
          "background2p3"
        )
        .setOrigin(0, 1)
        .setScale(1)
        .setFlipX(true);
  
      this.frontground3 = this.scene.add
        .image(
          this.frontground2.width - 5 + this.frontground2.x,
          this.startingPoint.y + 600,
          "background2p3"
        )
        .setOrigin(0, 1)
        .setScale(1);
      this.frontground4 = this.scene.add
        .image(
          this.frontground3.width - 5 + this.frontground3.x,
          this.startingPoint.y + 600,
          "background2p3"
        )
        .setOrigin(0, 1)
        .setScale(1);
      this.frontground5 = this.scene.add
        .image(
          this.frontground4.width - 5 + this.frontground4.x,
          this.startingPoint.y + 600,
          "background2p3"
        )
        .setOrigin(0, 1)
        .setScale(1);
      this.frontground6 = this.scene.add
        .image(
          this.frontground5.width - 5 + this.frontground5.x,
          this.startingPoint.y + 600,
          "background2p3"
        )
        .setOrigin(0, 1)
        .setScale(1);
      // this.hueso1 = this.scene.add
      //   .image(this.startingPoint.x, this.startingPoint.y + 570, "planta1p3")
      //   .setOrigin(0.5, 1)
      //   .setScale(0.5);
      this.hueso2 = this.scene.add
        .image(1000, this.startingPoint.y + 550, "planta2p3")
        .setOrigin(0.5, 1)
        .setFlipX(true)
        .setScale(0.4);
      this.hueso3 = this.scene.add
        .image(1450, this.startingPoint.y + 550, "planta1p3")
        .setOrigin(0.5, 1)
        .setScale(0.3);
  
      this.hueso4 = this.scene.add
        .image(2000, this.startingPoint.y + 540, "planta2p3")
        .setOrigin(0.5, 1)
        .setScale(0.4);
      this.hueso5 = this.scene.add
        .image(2400, this.startingPoint.y + 540, "planta1p3")
        .setOrigin(0.5, 1)
        .setScale(1)
        .setFlipX(true)
        .setScale(0.4);
      this.hueso6 = this.scene.add
        .image(4650 * 2.5, this.startingPoint.y + 700, "planta3p3")
        .setOrigin(0.5, 1)
        .setScale(1, 0.7);
      this.mountain1 = this.scene.add.image(
        200,
        this.startingPoint.y + 300,
        "montaña1p3"
      );
      this.mountain2 = this.scene.add.image(
        1100,
        this.startingPoint.y + 320,
        "montaña2p3"
      );
      this.mountain3 = this.scene.add
        .image(2300, this.startingPoint.y + 300, "montaña3p3")
        .setScale(1.3);
      this.mountain4 = this.scene.add
        .image(3400, this.startingPoint.y + 220, "montaña2p3")
        .setScale(1.1);
      this.mountain5 = this.scene.add
        .image(4000, this.startingPoint.y + 300, "montaña1p3")
        .setScale(0.81);
  
      this.backgroundsBack = [
        this.background,
        this.background2,
        this.background3,
      ];
      this.backgroundsMiddle = [
        this.mountain1,
        this.mountain2,
        this.mountain3,
        this.mountain4,
        this.mountain5,
        // this.hueso1,
        this.hueso2,
        this.hueso3,
        this.hueso4,
        this.hueso5,
        this.hueso6,
        this.frontground1,
        this.frontground2,
        this.frontground3,
        this.frontground4,
        this.frontground5,
        this.frontground6,
        this.background4,
        // this.background5
        
      ];
      this.backgroundsFront = [
        
  
      ];
  
      // animation backgrounds statics
      this.originalPositionsBackgroundsBack = this.backgroundsBack.map(
        (img: Phaser.GameObjects.Image) => {
          return { x: img.x, y: img.y };
        }
      );
      this.originalPositionsBackgroundsMiddle = this.backgroundsMiddle.map(
        (img: Phaser.GameObjects.Image) => {
          return { x: img.x, y: img.y };
        }
      );
      this.originalPositionsBackgroundsFront = this.backgroundsFront.map(
        (img: Phaser.GameObjects.Image) => {
          return { x: img.x, y: img.y };
        }
      );
      this.background4OriginalPos = { x: this.background4.x, y: this.background4.y };
  
      backBackgroundsContainer.add([
        this.background,
        this.background2,
        this.background3,
        this.mountain1,
        this.mountain2,
        this.mountain3,
        this.mountain4,
        this.mountain5,
      ]);
      this.mapContainer.add([
       backBackgroundsContainer
      ])
      frontBackgroundsContainer.add([this.frontground1,
        this.background4,
        // this.background5,
        this.frontground1,
        this.frontground2,
        this.frontground3,
        this.frontground4,
        this.frontground5,
        this.frontground6,
        // this.hueso1,
        this.hueso2,
        this.hueso3,
        this.hueso4,
        this.hueso5,
        this.hueso6,
      ]);
      this.frontContainer.add([
        frontBackgroundsContainer
      ])
    }
  
    updatePositionsRelativeToCamera = (
      originalPos: { x: number; y: number }[],
      images: Phaser.GameObjects.Image[],
      camera: Phaser.Cameras.Scene2D.Camera,
      fixedPoint: { x: number; y: number },
      ponderation: { fixX: number; fixY: number }
    ) => {
      const offsetX = (camera.midPoint.x - fixedPoint.x) / ponderation.fixX;
      const offsetY = (camera.midPoint.y - fixedPoint.y) / ponderation.fixY;
      images.forEach((image, index) => {
        image.setPosition(
          (originalPos[index].x + offsetX),
          (originalPos[index].y + offsetY)
        );
      });
    };
  
    animateBackground() {
      this.updatePositionsRelativeToCamera(
        this.originalPositionsBackgroundsBack,
        this.backgroundsBack,
        this.scene.cameras.main,
        { x: this.startingPoint.x, y: this.startingPoint.y },
        { fixX: 1.1, fixY: 1.1 }
      );
      this.updatePositionsRelativeToCamera(
        [this.background4OriginalPos],
        [this.background4],
        this.scene.cameras.main,
        { x: this.startingPoint.x, y: this.startingPoint.y },
        { fixX: 1.1, fixY: 5 }
      );
      this.updatePositionsRelativeToCamera(
        this.originalPositionsBackgroundsMiddle,
        this.backgroundsMiddle,
        this.scene.cameras.main,
        { x: this.startingPoint.x, y: this.startingPoint.y },
        { fixX: 2, fixY: 4 }
      );
      this.updatePositionsRelativeToCamera(
        this.originalPositionsBackgroundsFront,
        this.backgroundsFront,
        this.scene.cameras.main,
        { x: this.startingPoint.x, y: this.startingPoint.y },
        { fixX: -20, fixY: -30 }
      );
    };
  
    
    addColliders() {
        if (this.scene.player) {
            if (this.pisos)
                this.scene.physics.add.collider(
                    this.scene.player,
                    this.pisos,
                    this.scene.touch,
                    () => true,
                    this.scene
                );
            if (this.pisos2)
                this.scene.physics.add.collider(
                    this.scene.player,
                    this.pisos2,
                    () => {
                      if(this.scene.player?.body?.touching.up || this.scene.player?.body?.touching.down){
                      
                        this.scene.changeGravity(true, 1000, 3)
                      }
                   
                    },
                    () => true,
                    this.scene
                );
            if (this.pisos3)
                this.scene.physics.add.collider(
                 
                    this.scene.player,
                    this.pisos3,
                    () => {
              this.scene.touch()

                        this.scene.rotateCam(true, 10);
                        //if (this.scene.checkPoint === 1) {
                        //  this.scene.canRot = true
                          //  this.scene.checkPoint = 2
                        // }
                    },
                    () => true,
                    this.scene
                );
            if (this.coin)
                this.scene.physics.add.overlap(
                    this.scene.player,
                    this.coin,
                    () => {
                      this.scene.touchItem("coin")
                      this.scene.checkPoint = 1
                      if(this.t1){
                        this.t1.play();
                        this.p3?.setVelocityY(150)
                        this.p3?.setY(850)
                      }
                    },
                    () => true,
                    this.scene
                );
            if (this.fireballGroup)
                this.scene.physics.add.overlap(
                    this.scene.player,
                    this.fireballGroup,
                    () => {
                        this.scene.touchItem("fireball")
                        this.scene.player?.setVelocity(0)
                    },
                    () => true,
                    this.scene
                );
            if (this.portal)
                this.scene.physics.add.overlap(
                    this.scene.player,
                    this.portal,
                    () => this.scene.win(),
                    () => true,
                    this.scene
                );
                if (this.pisos4)
                  this.scene.physics.add.collider(
                    this.scene.player,
                    this.pisos4,
                    (player, floor) => {
                    },
                    () => true,
                    this.scene
                  );
            if (this.pisos5)
                this.scene.physics.add.collider(
                    this.scene.player,
                    this.pisos5,
                    () => {
                      this.scene.rotateCam(false, 10);
              this.scene.touch()

                        // this.scene.checkPoint = 0
                    },
                    () => true,
                    this.scene
                );
                if (this.pisos6)
                  this.scene.physics.add.collider(
                      this.scene.player,
                      this.pisos6,
                      () => {
                        
                      },
                      () => true,
                      this.scene
                  );
            if (this.movingFloor)
                this.scene.physics.add.collider(
                    this.scene.player,
                    this.movingFloor,
                    () => {
                        this.scene.touch()
                    },
                    () => true,
                    this.scene
                );
            if (this.movingFloorRot)
                this.scene.physics.add.collider(
                    this.scene.player,
                    this.movingFloorRot,
                    () => {
                        this.scene.touch()
                    },
                    () => true,
                    this.scene
                );
        }
    }
  
    createMap(data: { level: number; lifes: number }) {
      
      this.scene.player?.setFlipX(true)
      // this.scene.lateralCameraOffset("right", false, this.cameraBounds.width, 1, 2000 );


        this.movingFloor = this.scene.physics.add.group({ allowGravity: false });
        this.movingFloorRot = this.scene.physics.add.group({ allowGravity: false });
        this.pisos = this.scene.physics.add.group({ allowGravity: false });
        this.pisosBack = this.scene.physics.add.group({ allowGravity: false });
        this.pisos2 = this.scene.physics.add.group({ allowGravity: false });
        this.pisos3 = this.scene.physics.add.group({ allowGravity: false });
        this.fireballGroup = this.scene.physics.add.group({ allowGravity: false });
        this.pisos4 = this.scene.physics.add.group({ allowGravity: false });
        this.pisos5 = this.scene.physics.add.group({ allowGravity: false });
        this.pisos6 = this.scene.physics.add.group({ allowGravity: false });
        this.amountLifes = data.lifes;
        this.aura = this.scene.physics.add.group({ allowGravity: false, immovable: true })
        this.EmptyCoin = this.scene.physics.add.group({allowGravity:false}).setVisible(false)
        this.coin = this.scene.physics.add.group({ allowGravity: false });
        this.aura = this.scene.physics.add.group({ allowGravity: false, immovable: true })
        this.portal = this.scene.physics.add.group({ allowGravity: false });


        const p1Config: FloorConfig = {
            texture: "pSimple1p3",
            pos: { x: 1000, y: -100 + 1000 },
            scale: { width: 0.7, height: 0.7 },
            height: 20,
            rotated: false,
        };

        const p1 = new Floor(this.scene, p1Config, this.pisos)


        const p2Config: FloorConfig = {
          texture: "pSimple1p3",
          pos: { x: 1350, y: -100 + 1000 },
          scale: { width: 0.7, height: 0.7 },
          height: 20,
          rotated: false,
      };

      const p2 = new Floor(this.scene, p2Config, this.pisos)

      const p3Config: FloorConfig = {
        texture: "pSimple1p3",
        pos: { x: 1650, y: -100 + 855 },
        scale: { width: 0.7, height: 0.7 },
        height: 20,
        rotated: false,
    };

    const p3 = new Floor(this.scene, p3Config, this.pisos2).setTint(colors.gravity)

    const p4Config: FloorConfig = {
      texture: "pSimple1p3",
      pos: { x: 1650, y: -100 + 400 },
      scale: { width: 0.7, height: 0.7 },
      height: 20,
      inverted:true,
      rotated: false,
  };

  const p4 = new Floor(this.scene, p4Config, this.pisos)

  const p5Config: FloorConfig = {
    texture: "pSimple1p3",
    pos: { x: 1900, y: -100 + 580 },
    scale: { width: 0.7, height: 0.7 },
    height: 20,
    inverted:true,
    rotated: false,
};

const p5 = new Floor(this.scene, p5Config, this.pisos)

const p6Config: LargeFloorIslandConfig = {
  textureA: "longFloorLeftp3",
  textureB: "longFloorMiddlep3",
  textureC: "longFloorRightp3",
  pos: { x: 2100, y: -100 + 750 },
  width: {
    textureA: 110,
    textureB: 140,
    textureC: 145,
  },
  scale: { width: 0.7, height: -0.7 },
  height: 90,
  rotated:false,
  large: 4,
};

const p6 = new LargeFloorIsland(this.scene, p6Config, this.pisos);

const p7Config: FloorConfig = {
  texture: "pSimple1p3",
  pos: { x: 2600, y: -100 + 580 },
  scale: { width: 0.7, height: 0.7 },
  height: 20,
  inverted:true,
  rotated: false,
};

const p7 = new Floor(this.scene, p7Config, this.pisos2).setTint(colors.gravity)

const p8Config: FloorConfig = {
  texture: "pSimple1p3",
  pos: { x: 2580, y: -100 + 1210 },
  scale: { width: 1, height: 0.7 },
  height: 20,
  
  rotated: false,
};

const p8 = new Floor(this.scene, p8Config, this.pisos3).setTint(colors.rotate);

const p9Config: FloorConfig = {
  texture: "pSimple1p3",
  pos: { x: 2940, y: -100 + 1210 },
  scale: { width: 1, height: 0.7 },
  height: 20,
  rotated: false,
};

const p9 = new Floor(this.scene, p9Config, this.pisos2).setTint(colors.gravity)

const p10Config: FloorConfig = {
  texture: "pDoblep3",
  pos: { x: 3100, y: -100 + 580 },
  scale: { width: 1.5, height: 0.7 },
  height: 20,
  width:100,
  rotated: false,
  inverted:true,
};

const p10 = new Floor(this.scene, p10Config, this.pisos2).setTint(colors.gravity)

const p11Config: FloorConfig = {
  texture: "pSimple1p3",
  pos: { x: 3260, y: -100 + 1080 },
  scale: { width: 1, height: 0.7 },
  height: 20,
  rotated: false,
};

const p11 = new Floor(this.scene, p11Config, this.pisos2).setTint(colors.gravity)




const p13Config: LargeFloorIslandConfig = {
  textureA: "longFloorLeftp3",
  textureB: "longFloorMiddlep3",
  textureC: "longFloorRightp3",
  pos: { x: 3160, y: -100 + 180},
  width: {
    textureA: 110,
    textureB: 140,
    textureC: 145,
  },
  scale: { width: 0.7, height: 0.7 },
  height: 20,
  rotated: false,
  large: 6,
};

const p13 = new LargeFloorIsland(this.scene, p13Config, this.pisos);

      const fireballConfig: FloorConfig = {
          spriteSheet: "meteoritop3",
          texture: "meteorito",
          pos: { x: 1500, y:  + 0 }, // 500 1580
          width: 100,
          height: 100,
          tween: {
            duration: 4000,
            repeat: -1,
            y: "+=2500",
            delay:Math.random() * 1150
          },
          frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      };
      const fireball = new Floor(this.scene, fireballConfig, this.fireballGroup).setScale(0.5)   

      const fireball2Config: FloorConfig = {
        spriteSheet: "meteoritop3",
        texture: "meteorito",
        pos: { x: 2050, y: 0 }, // 500 1580
        width: 100,
        height: 100,
        tween: {
          duration: 4000,
          delay:500,
          repeat: -1,
          y: "+=2500",
        },
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
    const fireball2 = new Floor(this.scene, fireball2Config, this.fireballGroup).setScale(0.5)   

    const fireball3Config: FloorConfig = {
      spriteSheet: "meteoritop3",
      texture: "meteorito",
      pos: { x: 2700, y: 0 }, // 500 1580
      width: 100,
      height: 100,
      tween: {
        duration: 4000,
        delay:300,
        repeat: -1,
        y: "+=2500",
      },
      frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  };
  const fireball3 = new Floor(this.scene, fireball3Config, this.fireballGroup).setScale(0.5)
        //Portal, Coin and Asteroids
        const portalConfig: FloorConfig = {
            texture: "cuevap3",
            pos: { x:3300, y: -100 +250 },
            width: 90,
            height: 90,
            inverted:true
        };
        const port = new Floor(this.scene, portalConfig, this.portal).setScale(0.5)

        this.endPortal = port

        const coinConfig: FloorConfig = {
          texture: "plantap3",
          pos: { x: 2540, y: -100 +1140 },
            scale: { width: 0.5, height: 0.5 },
            width: 10,
            height: 18,
            fix: 10,
        };
        this.cristal = new Floor(this.scene, coinConfig, this.coin).setBodySize(140, 180);

        const emptyCoinConfig: FloorConfig = {
          texture: "plantaVaciap3",
          pos: { x: 2540, y: -100 +1140 },
          scale: { width: 0.5, height: 0.5 },
          width: 10,
          height: 18,
          fix: 10,
        };
      this.EmptyCristal = new Floor(this.scene, emptyCoinConfig, this.EmptyCoin).setBodySize(140, 180);

        const auraConfig: FloorConfig = {
        texture: "brilloPlantap3",
        pos: { x: 2540, y: -100 +1140 },
         scale: { width: 0.5, height: 0.5 },
         width: 10,
         height: 18,
         fix: 10,
        };

        this.auraImage = new Floor(this.scene, auraConfig, this.aura).setBodySize(140, 180);
        this.scene.tweens.add({
          alpha: { from: 1, to: 0.2 }, 
          duration: 1500, 
          yoyo: true, 
          repeat: -1, 
          ease: 'Sine.easeInOut', 
          targets: this.auraImage,
        })

        const bubblesGroup = this.scene.add.group()
        const c1Config: AsteroidGeneratorConfig = {
          texture: "nube1p3",
          x: 0,
          y: 1000,
          delayed: 60,
          direction: 0,
          velocity: 20,
          scale: 1,
          depth: 99,
          amount:5,
          spawnRange: {
            x: 4,
            y: 1
          }
      };
      const c1 = new AsteroidGenerator(this.scene, c1Config);
      c1.start();

      const c2Config: AsteroidGeneratorConfig = {
          texture: "nube2p3",
          x: 3000,
          y: 600,
          delayed: 60,
          direction: 1,
          velocity: 30,
          scale: 1,
          depth: 99,
          amount:5,
          spawnRange: {
            x: 4,
            y: 1
          }
      };
      const c2 = new AsteroidGenerator(this.scene, c2Config);
      c2.start();
        const b1Config: AsteroidGeneratorConfig = {
            texture: "burbujap3",
            x: this.startingPoint.x,
            y: this.startingPoint.y,
            delayed: 30,
            direction: 1,
            velocity: 15,
            scale: 1,
            tweenScale: true,
            scaleTweenDuration: 3000,
            group: bubblesGroup,
            upStraigth: true,
            amount:40,
            spawnRange: {
                x:4,
                y:1
            }
          };
          const b1 = new AsteroidGenerator(this.scene, b1Config);
          b1.start();

          const b2Config: AsteroidGeneratorConfig = {
            texture: "burbujap3",
            x: this.startingPoint.x + 3300,
            y: this.startingPoint.y,
            delayed: 30,
            direction: 1,
            velocity: 15,
            tweenScale: true,
            scaleTweenDuration: 3000,
            depth:-99,
            scale: 1,
            group: bubblesGroup,
            upStraigth: true,
            amount:40,
            spawnRange: {
                x:2,
                y:1
            }
          };
          const b2 = new AsteroidGenerator(this.scene, b2Config);
          b2.start();

        const mapObjects =
            bubblesGroup.getChildren().concat(
                this.movingFloorRot.getChildren(),
                this.fireballGroup.getChildren(),
                this.pisos.getChildren(),
                this.pisosBack.getChildren(),
                this.pisos2.getChildren(),
                this.pisos3.getChildren(),
                this.pisos4.getChildren(),
                this.pisos5.getChildren(),
                this.pisos6.getChildren(),
                this.coin.getChildren(),
                this.aura.getChildren(),
                this.portal.getChildren(),
            )
        this.mapContainer.add(mapObjects)
        this.scene.UICamera?.ignore(this.mapContainer)

    }
    update() {
        if (this.scene.player) this.animateBackground();
    }
}
export default Mapa11;
