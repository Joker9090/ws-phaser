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
import { loseConfigFromMapType } from "@/game/Types";
import LargeFloorIsland, { LargeFloorIslandConfig } from "@/game/assets/LargeFloorIsland";
import colors from "@/game/assets/PlatformColors";
// import MasterManager from "@/game/MasterManager";

class Mapa7 {
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
  player?: Player;
  startingPoint = {
    x: 2700, //500
    y: 1000, //800
  };
  checkPoint1 = {
    x: 1800, //500
    y: 800, //800
  };
  checkPoint2 = {
    x: 1850, //500
    y: 1200, //800
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
      PlayerDirection: "ROTATED",
      gravityDown: false
    },
    {
      positions: this.checkPoint2,
      cameraDirection: "NORMAL",
      PlayerDirection: "NORMAL",
      gravityDown: true
    },
  ];
  nextScene: string | undefined = 'postal2_planeta2';
  postalCode: string | undefined = 'postl4'
  // masterManager: MasterManager
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
  invincibilityTimer?: Time.TimerEvent
    invincible?: Phaser.Physics.Arcade.Group;
  
  backgroundsBack: Phaser.GameObjects.Image[];
  backgroundsMiddle: Phaser.GameObjects.Image[];
  backgroundsFront: Phaser.GameObjects.Image[];
  originalPositionsBackgroundsBack: { x: number, y: number }[]
  originalPositionsBackgroundsMiddle: { x: number, y: number }[]
  originalPositionsBackgroundsFront: { x: number, y: number }[]

  UIItemToGrab: string = 'comida';
  UIItemScale?: number;
  cristal?: Floor;
  collected: Boolean = false;
  endPortal?: Floor;

  isFloating: boolean = false;

  mapContainer: Phaser.GameObjects.Container;
  frontContainer: Phaser.GameObjects.Container;

  constructor(scene: Game, player: Player) {
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
    const backBackgroundsContainer = this.scene.add.container(0, -150)
    const frontBackgroundsContainer = this.scene.add.container(0, -150)
    // let masterManagerScene = scene.game.scene.getScene("MasterManager") as MasterManager;
    // if (!masterManagerScene) {
    //   this.masterManager = new MasterManager();
    //   this.scene.scene.add("MasterManager", this.masterManager, true);
    // } else {
    //   this.masterManager = masterManagerScene;
    // }
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
        this.frontground2.width - 5 + this.frontground2.x,
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

    backBackgroundsContainer.add([
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
    this.mapContainer.add(backBackgroundsContainer)

    frontBackgroundsContainer.add([this.hueso1, this.hueso2, this.hueso3]);
    this.frontContainer.add(frontBackgroundsContainer)
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
          (player, floor) => {
            if (this.scene.player?.body?.touching.up || this.scene.player?.body?.touching.down) {
              if (this.scene.checkPoint === 0 && (floor as Floor).body?.touching.up) {
                this.scene.changeGravity(true, 1000, 3);
                (floor as Floor).setTint(0xffffff);
                this.scene.checkPoint = 1
              } else if (this.scene.checkPoint === 1) {
                this.scene.checkPoint = 2
              }
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
            if (this.scene.checkPoint === 1) {
              this.scene.rotateCam(true, 10);
            }
          },
          () => true,
          this.scene
        );
      if (this.coin)
        this.scene.physics.add.overlap(
          this.scene.player,
          this.coin,
          () => this.scene.touchItem("coin"),
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
          () =>{
            // this.masterManager.imagenesDesbloqueadas =  ["planeta1_figu1", "planeta1_figu2", "planeta2_figu1", "planeta2_figu2"];
            this.scene.win()
          } ,
          () => true,
          this.scene
        );
      if (this.pisos4)
        this.scene.physics.add.collider(
          this.scene.player,
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
          this.scene.player,
          this.pisos5,
          () => {
            if (this.scene.player?.body?.touching.up || this.scene.player?.body?.touching.down) {
              this.scene.canRot = true // medio hack, revisar lógica
              this.scene.rotateCam(false, 10)
              this.scene.changeGravity(false, 1000, 3)
              this.scene.touch()
              // this.scene.checkPoint = 0
            }
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
    // this.scene.lateralCameraOffset("left", false, this.cameraBounds.width, 1, 1000);
    this.scene.player?.setFlipX(true)
    // this.masterManager.imagenesDesbloqueadas =  ["planeta1_figu1", "planeta1_figu2", "planeta2_figu1", "planeta2_figu2"];
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


    const p1Config: LargeFloorIslandConfig = {
      textureA: "longFloorLeftp1",
      textureB: "longFloorMiddleBp1",
      textureC: "longFloorRightp1",
      pos: { x: 2600, y: 1350 },
      width: {
        textureA: 120,
        textureB: 45,
        textureC: 122,
      },
      scale: { width: 0.7, height: 0.7 },
      height: 110,
      large: 20,
      rotated: false,
    };

    const p1 = new LargeFloorIsland(this.scene, p1Config, this.pisos);

    const p2Config: FloorConfig = {
      pos: { x: 2200, y: 1350 },
      texture: "pSimple2p1",
      scale: { width: 0.7, height: 0.7 },
      width: 140,
      height: 30,
      animation: {
        xAxis: {
          xDistance: 400,
          xVel: 150
        }
      }
    };
    const p2 = new Floor(this.scene, p2Config, this.pisos);

    const fireball1Config: FloorConfig = {
      spriteSheet: "meteoritop1",
      texture: "meteoritop1",
      pos: { x: 2050, y: 3000 }, // 500 1580
      width: 100,
      height: 100,
      tween: {
        duration: 7000,
        repeat: -1,
        y: "-=3000",
      },
      frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
    const fireball = new Floor(this.scene, fireball1Config, this.fireballGroup).setScale(0.5).setFlipY(true)

    const p3Config: FloorConfig = {
      pos: { x: 1800, y: 1350 },
      texture: "pSimple2p1",
      scale: { width: 0.7, height: 0.7 },
      width: 140,
      height: 30,
    };
    const p3 = new Floor(this.scene, p3Config, this.pisos2).setFlipX(false).setTint(colors.gravity);

    const p4Config: FloorConfig = {
      pos: { x: 1800, y: 600 },
      texture: "pSimple1p1",
      scale: { width: 0.7, height: 0.7 },
      width: 140,
      height: 30,
    };
    const p4 = new Floor(this.scene, p4Config, this.pisos).setFlipX(true).setFlipY(true)

    const fireball2Config: FloorConfig = {
      spriteSheet: "meteoritop1",
      texture: "meteoritop1",
      pos: { x: 1650, y: 0 }, // 500 1580
      width: 100,
      height: 100,
      tween: {
        delay: 2500,
        duration: 7000,
        repeat: -1,
        y: "+=2900",
      },
      frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
    const fireball2 = new Floor(this.scene, fireball2Config, this.fireballGroup).setScale(0.5)

    const p5Config: FloorConfig = {
      pos: { x: 1300, y: 600 },
      texture: "pSimple1p1",
      scale: { width: 0.7, height: 0.7 },
      width: 140,
      height: 30,
      animation: {
        xAxis: {
          xDistance: 600,
          xVel: 200
        }
      }

    };
    const p5 = new Floor(this.scene, p5Config, this.pisos).setFlipX(true).setFlipY(true)

    const p6Config: FloorConfig = {
      pos: { x: 800, y: 600 },
      texture: "pSimple2p1",
      scale: { width: 0.7, height: 0.7 },
      width: 140,
      height: 30,
    };
    const p6 = new Floor(this.scene, p6Config, this.pisos3).setTint(colors.rotate).setFlipY(true);

    const fireball3Config: FloorConfig = {
      spriteSheet: "meteoritop1",
      texture: "meteoritop1",
      pos: { x: 650, y: 0 }, // 500 1580
      width: 100,
      height: 100,
      tween: {
        duration: 7000,
        repeat: -1,
        y: "+=2000",
      },
      frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
    const fireball3 = new Floor(this.scene, fireball3Config, this.fireballGroup).setScale(0.5)

    const p7Config: FloorConfig = {
      pos: { x: 500, y: 600 },
      texture: "pSimple1p1",
      scale: { width: 0.7, height: 0.7 },
      width: 140,
      height: 30,
    };
    const p7 = new Floor(this.scene, p7Config, this.pisos5).setFlipY(true).setTint(colors.gravity);

    const p8Config: LargeFloorIslandConfig = {
      textureA: "longFloorLeftp1",
      textureB: "longFloorMiddleAp1",
      textureC: "longFloorRightp1",
      pos: { x: 400, y: 1350 },
      width: {
        textureA: 120,
        textureB: 45,
        textureC: 122,
      },
      scale: { width: 0.7, height: 0.7 },
      height: 110,
      large: 15,
      rotated: false,
    };

    const p8 = new LargeFloorIsland(this.scene, p8Config, this.pisos);

    const p9Config: FloorConfig = {
      pos: { x: 1200, y: 1350 },
      texture: "pSimple1p1",
      scale: { width: 0.7, height: 0.7 },
      width: 140,
      height: 30,
    };
    const p9 = new Floor(this.scene, p9Config, this.pisos4).setFlipY(false)

    const p10Config: FloorConfig = {
      pos: { x: 1500, y: 1350 },
      texture: "pSimple2p1",
      scale: { width: 0.7, height: 0.7 },
      width: 140,
      height: 30,
    };
    const p10 = new Floor(this.scene, p10Config, this.pisos4).setFlipY(false)

    // const p7Config: FloorConfig = {
    //     pos: { x: 1100, y: 500 },
    //     texture: "pSimple2p1",
    //     scale: { width: 1.7, height: 0.7 },
    //     width: 140,
    //     height: 30,
    // };
    // const p7 = new Floor(this.scene, p7Config, this.pisos).setFlipY(true).setVelocityX(-200)

    // this.scene.tweens.add({
    //     duration: 3000,
    //     paused: false,
    //     yoyo: true,
    //     repeat: -1,
    //     targets: p7.body?.velocity,
    //     x: '+=400',
    // })

    // const p8Config: FloorConfig = {
    //     pos: { x: 600, y: 600 },
    //     texture: "pSimple1p1",
    //     scale: { width: 0.7, height: 0.7 },
    //     width: 140,
    //     height: 30,
    // };
    // const p8 = new Floor(this.scene, p8Config, this.pisos).setFlipY(true)



    //Portal, Coin and Asteroids
    const portalConfig: FloorConfig = {
      texture: "cuevap1",
      pos: { x: 3100, y: 1220 },
      width: 100,
      height: 100,
    };
    const port = new Floor(this.scene, portalConfig, this.portal).setDepth(99).setScale(0.7)

    this.endPortal = port

    const coinConfig: FloorConfig = {
      texture: "comida",
      pos: { x: 1300, y: 750 },
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
      y: 700,
      delayed: 100,
      group: cloudsGroup,
      direction: 0,
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
      group: cloudsGroup,
      direction: 1,
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
    if (this.scene.player) this.animateBackground();
  }
}
export default Mapa7;
