import Phaser, { GameObjects, Physics } from "phaser";
import AsteroidGenerator, {
    AsteroidGeneratorConfig,
} from "../../assets/AsteroidGenerator";
import Floor, { FloorConfig } from "../../assets/Floor";

import LargeFloor, { LargeFloorConfig } from "../../assets/LargeFloor";
import Game from "../../Game";

import Player from "../../assets/Player";
import portal, { portalConfig } from "../../assets/portal";
import { Children } from "react";
import { loseConfigFromMapType } from "@/game/Types";
import LargeFloorIsland, { LargeFloorIslandConfig } from "@/game/assets/LargeFloorIsland";

class Mapa8 {
    isJumping = false;
    // debugGraphics: Phaser.GameObjects.Graphics;
    scene: Game;
    worldSize = {
        width: 10000,
        height: 1820,
    };
    cameraBounds = {
        x: 0,
        y: -200,
        width: 8000,
        height: 2000
    }
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
    fireballGroup?: Phaser.Physics.Arcade.Group;
    coin?: Phaser.Physics.Arcade.Group;
    EmptyCoin?: Phaser.Physics.Arcade.Group;
    EmptyCristal?: Floor;
    auraImage?:Floor;
    portal?: Phaser.Physics.Arcade.Group;
    aura?: Phaser.Physics.Arcade.Group;
    movingFloor?: Phaser.Physics.Arcade.Group;
    graphic?:any;
    movingFloorRot?: Phaser.Physics.Arcade.Group;
    amountLifes: number = 0;
    sideGrav: boolean = false;
    goingBack: boolean = false;
    pisoGoBack?: Phaser.GameObjects.Sprite;
    monchi?: Player;
    startingPoint = {
        x: 2700, //500
        y: 1000, //800
    };
    checkPoint1 = {
        x: 4250, y: 800
       
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
            cameraDirection: "ROTATED",
            PlayerDirection: "ROTATED",
            gravityDown: false
        },
    ];
    nextScene: string | undefined = undefined;
    background: Phaser.GameObjects.Image;

    background2: Phaser.GameObjects.Image;
    background3: Phaser.GameObjects.Image;
    background4: Phaser.GameObjects.Image;
    background5: Phaser.GameObjects.Image;
    frontground1: Phaser.GameObjects.Image;
    frontground2: Phaser.GameObjects.Image;
    frontground3: Phaser.GameObjects.Image;
    frontground4: Phaser.GameObjects.Image;
    frontground5: Phaser.GameObjects.Image;
    frontground6: Phaser.GameObjects.Image;
    hueso1: Phaser.GameObjects.Image;
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
    UIItemToGrab: string = 'uiItemp3';
    UIItemScale?: number = 0.3;
  
      cristal?: Floor;
      collected: Boolean = false;
      endPortal?: Floor;
      cameraNormal?: boolean;
      isFloating: boolean = false;
  
      mapContainer: Phaser.GameObjects.Container;
      frontContainer: Phaser.GameObjects.Container;
  
      constructor(scene: Game, monchi: Player) {
          this.scene = scene;
          this.monchi = monchi;
  
          /* World size*/
          this.scene.physics.world.setBounds(
              0,
              0,
              this.worldSize.width,
              this.worldSize.height
          );
  
          this.mapContainer = this.scene.add.container()
          this.frontContainer = this.scene.add.container().setDepth(999999999999)
  
          this.background = this.scene.add
          .image(this.startingPoint.x, this.startingPoint.y, "p3Gradiant")
          .setOrigin(0.5, 0.5);
     
        this.background2 = this.scene.add
          .image(this.startingPoint.x, this.startingPoint.y, "p1backgroundNoche")
          .setOrigin(0.5, 0.5)
          .setAlpha(0);
        this.background3 = this.scene.add
          .image(this.startingPoint.x, this.startingPoint.y, "p1capaOscuridad")
          .setOrigin(0.5, 0.5)
          .setAlpha(0);
        this.background4 = this.scene.add
          .image(this.startingPoint.x, this.startingPoint.y + 500, "background3p3")
          .setOrigin(0.5, 0.5)
          .setAlpha(1)
          .setScale(2);
        this.background5 = this.scene.add
          .image(this.startingPoint.x + this.background4.width * 1.9 + 191 , this.startingPoint.y + 500, "background3p3")
          .setOrigin(0.5, 0.5)
          .setAlpha(1)
          .setScale(2);    
      
       
        this.frontground1 = this.scene.add
          .image(this.startingPoint.x, this.startingPoint.y + 730, "background2p3")
          .setOrigin(1, 1)
          .setScale(1);
        this.frontground2 = this.scene.add
          .image(
            this.startingPoint.x - 5,
            this.startingPoint.y + 730,
            "background2p3"
          )
          .setOrigin(0, 1)
          .setScale(1)
          .setFlipX(true);
  
        this.frontground3 = this.scene.add
          .image(
            this.frontground2.width - 5 + this.frontground2.x,
            this.startingPoint.y + 730,
            "background2p3"
          )
          .setOrigin(0, 1)
          .setScale(1);
        this.frontground4 = this.scene.add
          .image(
            this.frontground3.width - 5 + this.frontground3.x,
            this.startingPoint.y + 730,
            "background2p3"
          )
          .setOrigin(0, 1)
          .setScale(1);
        this.frontground5 = this.scene.add
          .image(
            this.frontground4.width - 5 + this.frontground4.x,
            this.startingPoint.y + 730,
            "background2p3"
          )
          .setOrigin(0, 1)
          .setScale(1);
        this.frontground6 = this.scene.add
          .image(
            this.frontground5.width - 5 + this.frontground5.x,
            this.startingPoint.y + 730,
            "background2p3"
          )
          .setOrigin(0, 1)
          .setScale(1);
        this.hueso1 = this.scene.add
          .image(this.startingPoint.x, this.startingPoint.y + 700, "planta1p3")
          .setOrigin(0.5, 1)
          .setScale(0.5);
        this.hueso2 = this.scene.add
          .image(3000, this.startingPoint.y + 700, "planta2p3")
          .setOrigin(0.5, 1)
          .setScale(1)
          .setFlipX(true)
          .setScale(0.4);
        this.hueso3 = this.scene.add
          .image(4650, this.startingPoint.y + 700, "planta1p3")
          .setOrigin(0.5, 1)
          .setScale(1,0.7);

          this.hueso4 = this.scene.add
          .image(this.startingPoint.x * 1.6, this.startingPoint.y + 700, "planta3p3")
          .setOrigin(0.5, 1)
          .setScale(0.5);
        this.hueso5 = this.scene.add
          .image(3000 * 2.1, this.startingPoint.y + 700, "planta2p3")
          .setOrigin(0.5, 1)
          .setScale(1)
          .setFlipX(true)
          .setScale(0.4);
        this.hueso6 = this.scene.add
          .image(4650* 2.5, this.startingPoint.y + 700, "planta3p3")
          .setOrigin(0.5, 1)
          .setScale(1,0.7);
        this.mountain1 = this.scene.add.image(
          200,
          this.startingPoint.y + 500,
          "montaña1p3"
        );
        this.mountain2 = this.scene.add.image(
          1100,
          this.startingPoint.y + 520,
          "montaña2p3"
        );
        this.mountain3 = this.scene.add
          .image(2300, this.startingPoint.y + 400, "montaña3p3")
          .setScale(1.3);
        this.mountain4 = this.scene.add
          .image(3400, this.startingPoint.y + 520, "montaña2p3")
          .setScale(1.1);
        this.mountain5 = this.scene.add
          .image(4000, this.startingPoint.y + 500, "montaña1p3")
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
          this.background4,
          this.background5,
          this.frontground1,
          this.frontground2,
          this.frontground3,
          this.frontground4,
          this.frontground5,
          this.frontground6,
          this.hueso1,
          this.hueso2,
          this.hueso3,
          this.hueso4,
          this.hueso5,
          this.hueso6,
        
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
    
        this.mapContainer.add([
          this.background,
          this.background2,
          this.background3,
          this.mountain1,
          this.mountain2,
          this.mountain3,
          this.mountain4,
          this.mountain5,
          
        ]);
        
        this.frontContainer.add([this.frontground1,
            this.background4,
            this.background5,
            this.frontground2,
            this.frontground3,
            this.frontground4,
            this.frontground5,
            this.frontground6,
            this.hueso1,
            this.hueso2,
            this.hueso3,
            this.hueso4,
            this.hueso5,
            this.hueso6,
          ]);
      }
   
      updatePositionsRelativeToCamera = (
        originalPos: { x: number; y: number }[],
        images: Phaser.GameObjects.Image[],
        camera: Phaser.Cameras.Scene2D.Camera,
        fixedPoint: { x: number; y: number },
        ponderation: { fixX: number; fixY: number }
      ) => {
        const offsetX = (camera.midPoint.x - fixedPoint.x) / ponderation.fixX;
        const offsetY = (camera.midPoint.y - fixedPoint.y)/ ponderation.fixY;
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
        if (this.scene.monchi) {
            if (this.pisos)
                this.scene.physics.add.collider(
                    this.scene.monchi,
                    this.pisos,
                    () => {
                        this.scene.touch()
                    },
                    () => true,
                    this.scene
                );
            if (this.pisos2)
                this.scene.physics.add.collider(
                    this.scene.monchi,
                    this.pisos2,
                    () => {
                      if(this.scene.monchi?.body?.touching.up || this.scene.monchi?.body?.touching.down){
                        this.scene.changeGravity(true, 1000, 3);
                      }
                        console.log("ENTRO ACA")
                        //this.background2.setPosition(this.startingPoint.x, this.startingPoint.y + 320)
                        //this.background4.setPosition(this.startingPoint.x, this.startingPoint.y + 320)
                    },
                    () => true,
                    this.scene
                );
            if (this.pisos3)
                this.scene.physics.add.collider(
                    this.scene.monchi,
                    this.pisos3,
                    () => {
                        this.scene.rotateCam(true, 10);
                    },
                    () => true,
                    this.scene
                );
            if (this.coin)
                this.scene.physics.add.overlap(
                    this.scene.monchi,
                    this.coin,
                    () => {
                        this.scene.touchItem("coin")
                        this.EmptyCoin?.setVisible(true)
                        this.scene.checkPoint = 1
                    },
                    () => true,
                    this.scene
                );
            if (this.fireballGroup)
                this.scene.physics.add.overlap(
                    this.scene.monchi,
                    this.fireballGroup,
                    () => {
                        this.scene.touchItem("fireball")
                        this.scene.monchi?.setVelocity(0)
                    },
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
            if (this.pisos4)
                this.scene.physics.add.collider(
                    this.scene.monchi,
                    this.pisos4,
                    () => {
                        if(this.scene.checkPoint === 0 && this.scene.monchi){
                            this.scene.checkPoint = 1
                        }
                    },
                    () => true,
                    this.scene
                );
            if (this.pisos5)
                this.scene.physics.add.collider(
                    this.scene.monchi,
                    this.pisos5,
                    () => {
                      if(this.scene.monchi?.body?.touching.up || this.scene.monchi?.body?.touching.down){
                        this.scene.changeGravity(true, 1000, 3);
                      }
                        // this.scene.checkPoint = 0
                    },
                    () => true,
                    this.scene
                );
            if (this.movingFloor)
                this.scene.physics.add.collider(
                    this.scene.monchi,
                    this.movingFloor,
                    () => {
                        this.scene.touch()
                    },
                    () => true,
                    this.scene
                );
            if (this.movingFloorRot)
                this.scene.physics.add.collider(
                    this.scene.monchi,
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
        this.movingFloor = this.scene.physics.add.group({ allowGravity: false });
        this.movingFloorRot = this.scene.physics.add.group({ allowGravity: false });
        this.pisos = this.scene.physics.add.group({ allowGravity: false });
        this.pisosBack = this.scene.physics.add.group({ allowGravity: false });
        this.pisos2 = this.scene.physics.add.group({ allowGravity: false });
        this.pisos3 = this.scene.physics.add.group({ allowGravity: false });
        this.fireballGroup = this.scene.physics.add.group({ allowGravity: false });
        this.pisos4 = this.scene.physics.add.group({ allowGravity: false });
        this.pisos5 = this.scene.physics.add.group({ allowGravity: false });
        this.amountLifes = data.lifes;
        this.coin = this.scene.physics.add.group({ allowGravity: false });
        this.EmptyCoin = this.scene.physics.add.group({allowGravity:false}).setVisible(false)
        this.aura = this.scene.physics.add.group({ allowGravity: false, immovable: true })
        this.portal = this.scene.physics.add.group({ allowGravity: false });


        const p1Config: FloorConfig = {
            pos: {  x: 2700, y: 1200,},
            texture: "pSimple1p3",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 50,
        };

        const p1 = new Floor (this.scene, p1Config, this.pisos);

        const p2Config:FloorConfig = {
            pos: {  x: 3300, y: 1200,},
            texture: "pSimple1p3",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 50,
            animation:{
                xAxis:{
                    xDistance:650,
                    xVel:200
                }
            }
        };

        const p2 = new Floor (this.scene, p2Config, this.pisos3).setTint(Phaser.Display.Color.GetColor(255, 101, 255));

    
        const p3Config:FloorConfig = {
            pos: {  x: 3900, y: 1200,},
            texture: "pSimple1p3",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 50,
        };

        const p3 = new Floor (this.scene, p3Config, this.pisos2).setTint(Phaser.Display.Color.GetColor(255, 101, 0));


        const p4Config:FloorConfig = {
            pos: {  x: 3900, y: 700,},
            texture: "pSimple1p3",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 50,
        };

        const p4 = new Floor (this.scene, p4Config, this.pisos).setFlipY(true);

        const p5config:FloorConfig = {
            pos: {  x: 4250, y: 700,},
            texture: "pSimple1p3",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 50,
        };

        const p5 = new Floor (this.scene, p5config, this.pisos).setFlipY(true);


        const p6config:FloorConfig = {
            pos: {  x: 4800, y: 700,},
            texture: "pSimple1p3",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 50,
            animation:{
                xAxis:{
                    xDistance:620,
                    xVel:150
                }
            }
        };

        const p6 = new Floor (this.scene, p6config, this.pisos2).setFlipY(true).setTint(Phaser.Display.Color.GetColor(255, 101, 0));

        const p8config:FloorConfig = {
            pos: {  x: 4850, y: 1200,},
            texture: "pSimple1p3",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 50,
            animation:{
                xAxis:{
                    xDistance:620,
                    xVel:150
                }
            }
        };

        const p8 = new Floor (this.scene, p8config, this.pisos)


        const p9config:FloorConfig = {
            pos: {  x: 5400, y: 1200,},
            texture: "pSimple1p3",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 50,
        };

        const p9 = new Floor (this.scene, p9config, this.pisos2).setTint(Phaser.Display.Color.GetColor(255, 101, 0));

        const p10config:FloorConfig = {
            pos: {  x: 5400, y: 700,},
            texture: "pSimple1p3",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 50,
        };
        const p10 = new Floor (this.scene, p10config, this.pisos4).setFlipY(true);

        const p11config:FloorConfig = {
            pos: {  x: 5750, y: 700,},
            texture: "pSimple1p3",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 50,
        };
        const p11 = new Floor (this.scene, p11config, this.pisos2).setFlipY(true).setTint(Phaser.Display.Color.GetColor(255, 101, 0));

        const p12config:FloorConfig = {
            pos: {  x: 5750, y: 1200,},
            texture: "pSimple1p3",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 50,
        };
        
        const p12 = new Floor (this.scene, p12config, this.pisos)
        
        
        // // 
        // const p13config:FloorConfig = {
        //     pos: {  x: 5990, y: 1100,},
        //     texture: "pSimple1p3",
        //     scale: { width: 0.7, height: 0.7 },
        //     width: 140,
        //     height: 50,
        // };
        
        // const p13 = new Floor(this.scene, p13config, this.pisos2).setTint(Phaser.Display.Color.GetColor(255,101,0))
        
        const ptestconfig:FloorConfig = {
            pos: {   x: 5990, y: 1250 },
            texture: "pSimple1p3",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 50,
        };

        const ptest = new Floor (this.scene, ptestconfig, this.pisos5).setTint(Phaser.Display.Color.GetColor(255, 101, 0));

        const p14Config: LargeFloorIslandConfig = {
            textureA: "longFloorLeftp3",
            textureB: "longFloorMiddlep3",
            textureC: "longFloorRightp3",
            pos: { x: 5970, y: 540 },
            width: {
                textureA: 110,
                textureB: 140,
                textureC: 122,
            },
            scale: { width: 0.7, height: 0.7 },
            height: 89,
            large: 10,
            rotated: true,
        };

        const p14 = new LargeFloorIsland(this.scene, p14Config, this.pisos);
        const portalConfig: FloorConfig = {
            texture: "cuevap3",
            pos: { x: 6500, y: 625 },
            width: 100,
            height: 100,
        };
        const port = new Floor(this.scene, portalConfig, this.portal).setDepth(99).setScale(0.7).setFlipY(true)

        this.endPortal = port

        
        const coinConfig: FloorConfig = {
            texture: "plantap3",
            pos: {  x: 4850, y: 1130},
            scale: { width: 0.5, height: 0.5 },
            width: 10,
            height: 18,
            fix: 10,
            animation:{
                xAxis:{
                    xDistance:620,
                    xVel:150
                }
            }
        };

        this.cristal = new Floor(this.scene, coinConfig, this.coin).setBodySize(140, 180)
        const emptyCoinConfig: FloorConfig = {
            texture: "plantaVaciap3",
            pos: {  x: 4850, y: 1130},
            scale: { width: 0.5, height: 0.5 },
            width: 10,
            height: 18,
            fix: 10,
            animation:{
                xAxis:{
                    xDistance:620,
                    xVel:150
                }
            }
        };

        this.EmptyCristal = new Floor(this.scene, emptyCoinConfig, this.EmptyCoin).setBodySize(140, 180);
        const auraConfig: FloorConfig = {
            texture: "brilloPlantap3",
            pos: {  x: 4850, y: 1130},
            scale: { width: 0.5, height: 0.5 },
            width: 10,
            height: 18,
            fix: 10,
            animation:{
                xAxis:{
                    xDistance:620,
                    xVel:150
                }
            }
        };

        this.auraImage = new Floor(this.scene, auraConfig, this.aura).setBodySize(140, 180);

        const fireballConfig: FloorConfig = {
            spriteSheet: "meteoritop3",
            texture: "meteorito",
            pos: { x: 2850, y: 0 }, // 500 1580
            width: 100,
            height: 100,
            tween: {
              duration: 4000,
              repeat: -1,
              delay:Math.random() * 1000,
              y: "+=2500",
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        };
        const fireball = new Floor(this.scene, fireballConfig, this.fireballGroup).setScale(0.5)    


        const fireball2Config: FloorConfig = {
            spriteSheet: "meteoritop3",
            texture: "meteorito",
            pos: { x: 5200, y: 0 }, // 500 1580
            width: 100,
            height: 100,
            tween: {
              duration: 4000,
              repeat: -1,
              delay:Math.random() * 1200,
              y: "+=2800",
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          };
        const fireball2 = new Floor(this.scene, fireball2Config, this.fireballGroup).setScale(0.5)    
        const bubblesGroup = this.scene.add.group()

        const b1Config: AsteroidGeneratorConfig = {
            texture: "burbujap3",
            x: this.startingPoint.x,
            y: this.startingPoint.y,
            delayed: 50,
            direction: 1,
            velocity: 15,
            tweenScale:true,
            scaleTweenDuration:3000,
            scale: 1,
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
            delayed: 50,
            direction: 1,
            velocity: 15,
            depth:-99,
            scale: 1,
            tweenScale:true,
            scaleTweenDuration:3000,
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

        this.scene.tweens.add({
            alpha: { from: 1, to: 0.2 }, 
            duration: 1500, 
            yoyo: true, 
            repeat: -1, 
            ease: 'Sine.easeInOut', 
            targets: this.auraImage,
        })
    
        
        console.log(bubblesGroup, "bubblesGroup")

        const mapObjects =
            bubblesGroup.getChildren().concat(
                this.movingFloor.getChildren(),
                this.movingFloorRot.getChildren(),
                this.fireballGroup.getChildren(),
                this.pisos.getChildren(),
                this.pisosBack.getChildren(),
                this.pisos2.getChildren(),
                this.pisos3.getChildren(),
                this.pisos4.getChildren(),
                this.pisos5.getChildren(),
                this.coin.getChildren(),
                this.aura.getChildren(),
                this.portal.getChildren(),
            )
        this.mapContainer.add(mapObjects)
        this.scene.UICamera?.ignore(this.mapContainer)

    }
    update() {
        if (this.scene.monchi) this.animateBackground();
    }
}
export default Mapa8;
