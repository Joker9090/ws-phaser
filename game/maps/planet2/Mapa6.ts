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
import colors from "@/game/assets/PlatformColors";

class Mapa5 {
    isJumping = false;
    // debugGraphics: Phaser.GameObjects.Graphics;
    scene: Game;
    worldSize = {
        width: 10000,
        height: 3000,
    };
    cameraBounds = {
        x: 0,
        y: 0,
        width: 4600,
        height: 1630,
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

    fireballGroup?: Phaser.Physics.Arcade.Group;
    coin?: Phaser.Physics.Arcade.Group;
    portal?: Phaser.Physics.Arcade.Group;
    aura?: Phaser.Physics.Arcade.Group;
    movingFloor?: Phaser.Physics.Arcade.Group;
    movingFloorRot?: Phaser.Physics.Arcade.Group;

    amountLifes: number = 0;
    sideGrav: boolean = false;
    goingBack: boolean = false;
    pisoGoBack?: Phaser.GameObjects.Sprite;
    monchi?: Player;
    startingPoint = {
        x: 2750, //500
        y: 1000, //800
    };
    checkPoint1 = {
        x: 1600, //500
        y: 600, //800
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
    // nextScene: string | undefined = 'cine_2_movie_1';
    nextScene: string | undefined = undefined;
    postalCode: string | undefined = undefined

    background: Phaser.GameObjects.Image;
    backgroundStars: Phaser.GameObjects.Image;
    background2: Phaser.GameObjects.Image;
    background3: Phaser.GameObjects.Image;
    background4: Phaser.GameObjects.Image;
    background5: Phaser.GameObjects.Image;
    background6: Phaser.GameObjects.Image;
    background7: Phaser.GameObjects.Image;
    frontground1: Phaser.GameObjects.Image;
    frontground2: Phaser.GameObjects.Image;
    frontground3: Phaser.GameObjects.Image;
    frontground4: Phaser.GameObjects.Image;
    frontground5: Phaser.GameObjects.Image;
    frontground6: Phaser.GameObjects.Image;
    hueso1: Phaser.GameObjects.Image;
    hueso2: Phaser.GameObjects.Image;
    hueso3: Phaser.GameObjects.Image;
    mountain1: Phaser.GameObjects.Image;
    mountain2: Phaser.GameObjects.Image;
    mountain3: Phaser.GameObjects.Image;
    mountain4: Phaser.GameObjects.Image;
    mountain5: Phaser.GameObjects.Image;
  
    backgroundsBack: Phaser.GameObjects.Image[];
    backgroundsMiddle: Phaser.GameObjects.Image[];
    backgroundsFront: Phaser.GameObjects.Image[];
    originalPositionsBackgroundsBack: {x: number, y:number}[]
  originalPositionsBackgroundsMiddle: {x: number, y:number}[]
  originalPositionsBackgroundsFront: {x: number, y:number}[]
  
    UIItemToGrab: string = 'comida';
    UIItemScale?: number ;

    cristal?: Floor;
    collected: Boolean = false;
    endPortal?: Floor;

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
        .image(this.startingPoint.x, this.startingPoint.y, "p1backgroundDia")
        .setOrigin(0.5, 0.5);
      this.backgroundStars = this.scene.add
        .image(this.startingPoint.x, this.startingPoint.y, "p1Stars")
        .setOrigin(0.5, 0.5)
        .setAlpha(0);
      this.background2 = this.scene.add
        .image(this.startingPoint.x, this.startingPoint.y, "p1backgroundNoche")
        .setOrigin(0.5, 0.5)
        .setAlpha(0);
      this.background3 = this.scene.add
        .image(this.startingPoint.x, this.startingPoint.y, "p1capaOscuridad")
        .setOrigin(0.5, 0.5)
        .setAlpha(0);
      this.scene.tweens.add({
        targets: [this.background2, this.background3, this.backgroundStars],
        alpha: 1,
        yoyo: true,
        duration: 30000,
        loop: -1,
        ease: "ease",
      });
      this.scene.tweens.add({
        targets: [this.background],
        alpha: 0,
        yoyo: true,
        duration: 30000,
        loop: -1,
        ease: "ease",
      });
      this.background4 = this.scene.add
        .image(this.startingPoint.x, this.startingPoint.y + 830, "frontground1p1")
        .setOrigin(1, 1)
        .setScale(1);
      this.background5 = this.scene.add
        .image(
          this.startingPoint.x - 5,
          this.startingPoint.y + 830,
          "frontground1p1"
        )
        .setOrigin(0, 1)
        .setScale(1)
        .setFlipX(true);
      this.background6 = this.scene.add
        .image(
          this.startingPoint.x - 5 + this.background5.width,
          this.startingPoint.y + 830,
          "frontground1p1"
        )
        .setOrigin(0, 1)
        .setScale(1)
        .setFlipX(false);
      this.background7 = this.scene.add
        .image(
          this.background6.x - 5 + this.background6.width,
          this.startingPoint.y + 830,
          "frontground1p1"
        )
        .setOrigin(0, 1)
        .setScale(1)
        .setFlipX(true);
      this.frontground1 = this.scene.add
        .image(this.startingPoint.x, this.startingPoint.y + 830, "frontground2p1")
        .setOrigin(1, 1)
        .setScale(1);
      this.frontground2 = this.scene.add
        .image(
          this.startingPoint.x - 5,
          this.startingPoint.y + 830,
          "frontground2p1"
        )
        .setOrigin(0, 1)
        .setScale(1)
        .setFlipX(true);
      this.frontground3 = this.scene.add
        .image(
          this.startingPoint.x - 5 + this.frontground2.width,
          this.startingPoint.y + 830,
          "frontground2p1"
        )
        .setOrigin(0, 1)
        .setScale(1);

      this.frontground4 = this.scene.add
        .image(
          this.frontground3.width - 5 + this.frontground3.x,
          this.startingPoint.y + 830,
          "frontground2p1"
        )
        .setOrigin(0, 1)
        .setScale(1);
      this.frontground5 = this.scene.add
        .image(
          this.frontground4.width - 5 + this.frontground4.x,
          this.startingPoint.y + 830,
          "frontground2p1"
        )
        .setOrigin(0, 1)
        .setScale(1);
      this.frontground6 = this.scene.add
        .image(
          this.frontground5.width - 5 + this.frontground5.x,
          this.startingPoint.y + 830,
          "frontground2p1"
        )
        .setOrigin(0, 1)
        .setScale(1);
      this.hueso1 = this.scene.add
        .image(this.startingPoint.x, this.startingPoint.y + 930, "huesoFrontp1")
        .setOrigin(0.5, 1)
        .setScale(1);
      this.hueso2 = this.scene.add
        .image(2700, this.startingPoint.y + 980, "huesoFrontp1")
        .setOrigin(0.5, 1)
        .setScale(1)
        .setFlipX(true)
        .setScale(0.8);
      this.hueso3 = this.scene.add
        .image(3600, this.startingPoint.y + 920, "huesoFrontp1")
        .setOrigin(0.5, 1)
        .setScale(0.9);
      // this.background7 = this.scene.add
      //     .image(this.startingPoint.x - 5 + this.background6.x, this.startingPoint.y + 530, "frontground1p1")
      // .setOrigin(0, 1).setScale(1).setFlipX(true);
      this.mountain1 = this.scene.add.image(
        200,
        this.startingPoint.y + 500,
        "montaña1p1"
      );
      this.mountain2 = this.scene.add.image(
        1100,
        this.startingPoint.y + 520,
        "montaña2p1"
      );
      this.mountain3 = this.scene.add
        .image(2300, this.startingPoint.y + 400, "montaña3p1")
        .setScale(1.3);
      this.mountain4 = this.scene.add
        .image(3400, this.startingPoint.y + 520, "montaña4p1")
        .setScale(1.1);
      this.mountain5 = this.scene.add
        .image(4000, this.startingPoint.y + 500, "montaña5p1")
        .setScale(0.81);
  
      this.backgroundsBack = [
        this.background,
        this.background2,
        this.backgroundStars,
        this.background3,
      ];
      this.backgroundsMiddle = [
        this.background4,
        this.background5,
        this.background6,
        this.background7,
        this.mountain1,
        this.mountain2,
        this.mountain3,
        this.mountain4,
        this.mountain5,
        this.frontground1,
        this.frontground2,
        this.frontground3,
        this.frontground4,
        this.frontground5,
        this.frontground6,
      ];
      this.backgroundsFront = [this.hueso1, this.hueso2, this.hueso3];
  
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
        this.backgroundStars,
        this.background3,
        this.background4,
        this.background5,
        this.background6,
        this.background7,
        this.mountain1,
        this.mountain2,
        this.mountain3,
        this.mountain4,
        this.mountain5,
        this.frontground1,
        this.frontground2,
        this.frontground3,
        this.frontground4,
        this.frontground5,
        this.frontground6,
      ]);
  
      this.frontContainer.add([this.hueso1, this.hueso2, this.hueso3]);
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
    }

    addColliders() {
        if (this.scene.monchi) {
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
                    () => {
                      if(this.scene.monchi?.body?.touching.up || this.scene.monchi?.body?.touching.down){
                        this.scene.changeGravity(true, 1000, 3)
                      }
                        // this.scene.checkPoint = 1
                    },
                    () => true,
                    this.scene
                );
            if (this.pisos3)
                this.scene.physics.add.collider(
                    this.scene.monchi,
                    this.pisos3,
                    () => {
                        if (this.scene.checkPoint === 0) {
                            this.scene.rotateCam(true, 10);
                            this.scene.checkPoint = 1
                        }
                    },
                    () => true,
                    this.scene
                );
            if (this.coin)
                this.scene.physics.add.overlap(
                    this.scene.monchi,
                    this.coin,
                    () => this.scene.touchItem("coin"),
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
                    (player, floor) => {
                      //@ts-ignore
                      const originalY = floor.y
                      setTimeout(() => {
                        //@ts-ignore
                        if (floor.y > 1000) {
                          //@ts-ignore
                          // floor.setVelocityY(500)
                          this.scene.tweens.add({
                            //@ts-ignore
                            targets: [floor],
                            y: originalY + 200,
                            duration: 1000,
                            ease: 'ease', 
                            onComplete: () => {
                              this.scene.tweens.add({
                                //@ts-ignore
                                targets: [floor],
                                y: originalY,
                                duration: 1000,
                                ease: 'ease', 
                                onComplete: () => {
                                  //@ts-ignore
                                  floor.body.enable = true;
                                },
                              });
                            },
                            onStart: () => {
                              //@ts-ignore
                              floor.body.enable = false;
                            },
                          });
                        } else {
                               //@ts-ignore
                          // floor.setVelocityY(500)
                          this.scene.tweens.add({
                            //@ts-ignore
                            targets: [floor],
                            y: originalY - 200,
                            duration: 1000,
                            ease: 'ease', 
                            onComplete: () => {
                              this.scene.tweens.add({
                                //@ts-ignore
                                targets: [floor],
                                y: originalY,
                                duration: 1000,
                                ease: 'ease', 
                                onComplete: () => {
                                  //@ts-ignore
                                  floor.body.enable = true;
                                },
                              });
                            },
                            onStart: () => {
                              //@ts-ignore
                              floor.body.enable = false;
                            },
                          });
                        }
                      }, 400);
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
                        this.scene.moveCameraOffset("up", false)
                      }
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
      this.scene.lateralCameraOffset("left", false, this.cameraBounds.width - 1400, 1,1000);
        this.scene.monchi?.setFlipX(true)
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
        this.aura = this.scene.physics.add.group({ allowGravity: false, immovable: true })
        this.portal = this.scene.physics.add.group({ allowGravity: false });


        const p1Config: FloorConfig = {
            pos: { x: 2750, y: 1350 },
            texture: "pSimple1p1",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 30,
        };
        const p1 = new Floor(this.scene, p1Config, this.pisos);

        const p2Config: FloorConfig = {
            pos: { x: 2450, y: 1300 },
            texture: "pSimple2p1",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 30,
        };
        const p2 = new Floor(this.scene, p2Config, this.pisos4);

        const fireball1Config: FloorConfig = {
            spriteSheet: "meteoritop1",
            texture: "meteoritop1",
            pos: { x: 2350, y: 0 }, // 500 1580
            width: 100,
            height: 100,
            tween: {
                duration: 7000,
                repeat: -1,
                y: "+=2000",
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        };
        const fireball = new Floor(this.scene, fireball1Config, this.fireballGroup).setScale(0.5)

        const p3Config: FloorConfig = {
            pos: { x: 2200, y: 1200 },
            texture: "pSimple1p1",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 30,
        };
        const p3 = new Floor(this.scene, p3Config, this.pisos4).setFlipX(true);

        const fireball2Config: FloorConfig = {
            spriteSheet: "meteoritop1",
            texture: "meteoritop1",
            pos: { x: 2050, y: 1900 }, // 500 1580
            width: 100,
            height: 100,
            tween: {
                delay: 2500,
                duration: 7000,
                repeat: -1,
                y: "-=1900",
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        };
        const fireball2 = new Floor(this.scene, fireball2Config, this.fireballGroup).setScale(0.5).setFlipY(true)

        const p4Config: FloorConfig = {
            pos: { x: 1900, y: 1100 },
            texture: "pSimple2p1",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 30,
        };
        const p4 = new Floor(this.scene, p4Config, this.pisos4);

        const fireball3Config: FloorConfig = {
            spriteSheet: "meteoritop1",
            texture: "meteoritop1",
            pos: { x: 1750, y: 0 }, // 500 1580
            width: 100,
            height: 100,
            tween: {
                duration: 7000,
                delay: 3333,
                repeat: -1,
                y: "+=2000",
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        };
        const fireball3 = new Floor(this.scene, fireball3Config, this.fireballGroup).setScale(0.5)

        const p5Config: FloorConfig = {
            pos: { x: 1600, y: 1100 },
            texture: "pSimple2p1",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 30,
        };
        const p5 = new Floor(this.scene, p5Config, this.pisos2).setFlipX(true).setTint(colors.gravity);

        const p6Config: FloorConfig = {
            pos: { x: 1600, y: 500 },
            texture: "pSimple2p1",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 30,
        };
        const p6 = new Floor(this.scene, p6Config, this.pisos3).setFlipY(true).setTint(colors.rotate);

        const p7Config: FloorConfig = {
            pos: { x: 1200, y: 500 },
            texture: "pSimple2p1",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 30,
        };
        const p7 = new Floor(this.scene, p7Config, this.pisos2).setFlipY(true).setTint(colors.gravity);

        const p10Config: FloorConfig = {
          pos: { x: 1210, y: 1100 },
          texture: "pSimple2p1",
          scale: { width: 0.7, height: 0.7 },
          width: 140,
          height: 30,
        };
        const p10 = new Floor(this.scene, p10Config, this.pisos5);

        const p11Config: FloorConfig = {
          pos: { x: 1200, y: 1500 },
          texture: "pSimple2p1",
          scale: { width: 0.7, height: 0.7 },
          width: 140,
          height: 30,
          animation: {
            xAxis: {
              xDistance: 250,
              xVel: 200
            }
          },
        };
        const p11 = new Floor(this.scene, p11Config, this.pisos);

        // const p12Config: FloorConfig = {
        //   pos: { x: 1100, y: 1500 },
        //   texture: "pSimple2p1",
        //   scale: { width: 0.7, height: 0.7 },
        //   width: 140,
        //   height: 30,
        // };
        // const p12 = new Floor(this.scene, p12Config, this.pisos);

        // const p13Config: FloorConfig = {
        //   pos: { x: 1400, y: 1300 },
        //   texture: "pSimple2p1",
        //   scale: { width: 0.7, height: 0.7 },
        //   width: 140,
        //   height: 30,
        //   animation: {
        //     yAxis: {
        //       yDistance: 300,
        //       yVel: 200
        //     }
        //   }
        // };
        // const p13 = new Floor(this.scene, p13Config, this.pisos);

        // this.scene.tweens.add({
        //     duration: 3000,
        //     paused: false,
        //     yoyo: true,
        //     repeat: -1,
        //     targets: p7.body?.velocity,
        //     x: '+=400',
        // })

        const p8Config: FloorConfig = {
            pos: { x: 600, y: 600 },
            texture: "pSimple1p1",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 30,
        };
        const p8 = new Floor(this.scene, p8Config, this.pisos).setFlipY(true)

        const p9Config: LargeFloorIslandConfig = {
            textureA: "longFloorLeftp1",
            textureB: "longFloorMiddleBp1",
            textureC: "longFloorRightp1",
            pos: { x: 1600, y: 1500 },
            width: {
                textureA: 120,
                textureB: 45,
                textureC: 122,
            },
            scale: { width: 0.7, height: -0.7 },
            height: 89,
            large: 8,
            rotated: true,
        };

        const p9 = new LargeFloorIsland(this.scene, p9Config, this.pisos);

        //Portal, Coin and Asteroids
        const portalConfig: FloorConfig = {
            texture: "cuevap1",
            pos: { x: 1800, y: 1400 },
            width: 100,
            height: 100,
        };
        const port = new Floor(this.scene, portalConfig, this.portal).setDepth(99).setScale(0.5);

        this.endPortal = port

        const coinConfig: FloorConfig = {
            texture: "comida",
            pos: { x: 1210, y: 660 },
            scale: { width: 0.5, height: 0.5 },
            width: 10,
            height: 18,
            fix: 10,
        };

        this.cristal = new Floor(this.scene, coinConfig, this.coin).setBodySize(140, 180);
        const cloudsGroup = this.scene.add.group()

        const c1Config: AsteroidGeneratorConfig = {
            texture: "nube1p1",
            x: 0,
            y: 500,
            delayed: 100,
            direction: 0,
            group: cloudsGroup,
            velocity: 20,
            scale: 1,
            depth: 99,
        };
        const c1 = new AsteroidGenerator(this.scene, c1Config);
        c1.start();

        const c2Config: AsteroidGeneratorConfig = {
            texture: "nube2p1",
            x: 3000,
            y: 600,
            delayed: 100,
            direction: 1,
            group: cloudsGroup,
            velocity: 30,
            scale: 1,
            depth: 99,
        };
        const c2 = new AsteroidGenerator(this.scene, c2Config);
        c2.start();

        const mapObjects = cloudsGroup.getChildren().concat(
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
export default Mapa5;
