import Phaser, { Physics } from "phaser";
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
import LargeFloorIsland, {
  LargeFloorIslandConfig,
} from "@/game/assets/LargeFloorIsland";
import TextBox from "@/game/assets/TextBox";
import MagicZone, { ZoneConfig } from "@/game/assets/MagicZone";
import Teleport from "@/game/assets/Teleport";
import colors from "@/game/assets/PlatformColors";

class Sandbox {
  isJumping = false;
  // debugGraphics: Phaser.GameObjects.Graphics;
  scene: Game;
  worldSize = {
    width: 10000,
    height: 2000,
  };
  cameraBounds = {
    x: 0,
    y: 0,
    width: 10000,
    height: 1300,
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
  coin?: Phaser.Physics.Arcade.Group;
  coinAura?: Phaser.GameObjects.Sprite;
  invencible?: Phaser.Physics.Arcade.Group;
  portal?: Phaser.Physics.Arcade.Group;
  teleport?: Phaser.Physics.Arcade.Group;
  aura?: Phaser.Physics.Arcade.Group;
  movingFloor?: Phaser.Physics.Arcade.Group;
  movingFloorRot?: Phaser.Physics.Arcade.Group;
  flyingPiso?: Phaser.Physics.Arcade.Group;
  p13!: Phaser.GameObjects.Sprite;
  amountLifes: number = 0;
  sideGrav: boolean = false;
  goingBack: boolean = false;
  pisoGoBack?: Phaser.GameObjects.Sprite;
  firegroup?: Phaser.Physics.Arcade.Group;
  player?: Player;
  startingPoint = {
    x: 500, //500
    y: 800, //800
  };

  loseConfig: loseConfigFromMapType = [
    {
      positions: { x: 500, y: 800 },
      cameraDirection: "NORMAL",
      PlayerDirection: "NORMAL",
      gravityDown: true,
    },
  ];
  nextScene: string | undefined = "postal1_planeta1";
  postalCode: string | undefined = "adjns";

  background?: Phaser.GameObjects.Image;
  background2?: Phaser.GameObjects.Image;
  background3?: Phaser.GameObjects.Image;
  background4?: Phaser.GameObjects.Image;
  background5?: Phaser.GameObjects.Image;
  background6?: Phaser.GameObjects.Image;
  mountain1?: Phaser.GameObjects.Image;
  mountain2?: Phaser.GameObjects.Image;
  mountain3?: Phaser.GameObjects.Image;
  mountain4?: Phaser.GameObjects.Image;
  mountain5?: Phaser.GameObjects.Image;
  UIItemToGrab: string = "cristal3";
  UIItemScale?: number;
  cristal?: Floor;
  collected: Boolean = false;
  endPortal?: Floor;
  rotate?: boolean = true;
  mapContainer?: Phaser.GameObjects.Container;
  frontContainer?: Phaser.GameObjects.Container;

  constructor(scene: Game, player: Player, data?: GamePlayDataType) {
    this.scene = scene;
    this.player = player;

    this.scene.physics.world.setBounds(
      0,
      0,
      this.worldSize.width,
      this.worldSize.height
    );

    this.player.setPlayerWithTank(true);

    // add delayed call
    // this.scene.time.delayedCall(4000, () => {
    //   this.player!.setGravityOnPlayer(500)
    //   this.player!.setTintMask(0x00ff00)
    //   this.scene.time.delayedCall(4000, () => {
    //     this.player!.setTintMask(0xff0000)

    //     this.player!.setGravityOnPlayer(1000)
    //     this.player!.setGravityOnPlayerX(2000)

    //   });
    // });

    /* World size*/
  }

  animateBackground(player: Phaser.GameObjects.Sprite | Phaser.Math.Vector2) {
    const { x, y } = this.startingPoint;
    const { x: x2, y: y2 } = player;

    // animation backgrounds statics
    const { ajusteBX, ajusteBY } = { ajusteBX: 1.1, ajusteBY: 1.1 };
    const calcDiffBX = (x2 - x) / ajusteBX;
    const calcDiffBY = (y2 - y) / ajusteBY;
    this.background?.setPosition(x + calcDiffBX, y + calcDiffBY);
    this.background2?.setPosition(x + calcDiffBX, y + calcDiffBY);
    this.background3?.setPosition(x + calcDiffBX, y + calcDiffBY);
    // // animation frontgrounds
    const { ajusteFX, ajusteFY } = { ajusteFX: 4, ajusteFY: 2 };
    const calcDiffFX = (x2 - x) / ajusteFX;
    const calcDiffFY = (y2 - y) / ajusteFY;
    this.background4?.setPosition(x + calcDiffFX, y + 570 + calcDiffFY);
    this.background5?.setPosition(x + calcDiffFX, y + 570 + calcDiffFY);
    this.background6?.setPosition(
      x + this.background5!.width - 15 + calcDiffFX,
      y + 570 + calcDiffFY
    );
    this.mountain4?.setPosition(
      -200 + calcDiffFX,
      this.startingPoint.y + calcDiffFY
    );
    this.mountain5?.setPosition(
      1100 + calcDiffFX,
      this.startingPoint.y + calcDiffFY
    );
    // // animation front mountains
    const { ajusteFMX, ajusteFMY } = { ajusteFMX: 20, ajusteFMY: 30 };
    const calcDiffFMX = -(x2 - x) / ajusteFMX;
    const calcDiffFMY = -(y2 - y) / ajusteFMY;
    this.mountain1?.setPosition(
      this.startingPoint.x + this.background5!.width - 85 + calcDiffFMX,
      this.startingPoint.y + 320 + calcDiffFMY
    );
    this.mountain2?.setPosition(
      this.startingPoint.x - 270 + calcDiffFMX,
      this.startingPoint.y + 350 + calcDiffFMY
    );
    this.mountain3?.setPosition(
      1100 + calcDiffFMX,
      this.startingPoint.y + 470 + calcDiffFMY
    );
  }

  // if (this.scene.player?.body?.touching.up || this.scene.player?.body?.touching.down) {
  //   this.scene.changeGravity(true, 1000, 3);
  // }

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
            if (
              this.scene.player?.body?.touching.up ||
              this.scene.player?.body?.touching.down
            ) {
              this.scene.changeGravity(true, 1000, 3);
            }
            //this.background2.setPosition(this.startingPoint.x, this.startingPoint.y + 320)
            //this.background4.setPosition(this.startingPoint.x, this.startingPoint.y + 320)
          },
          () => true,
          this.scene
        );
      if (this.pisos3)
        this.scene.physics.add.collider(
          this.scene.player,
          this.pisos3,
          () => {
            this.scene.rotateCam(true, 10);
          },
          () => true,
          this.scene
        );
      if (this.pisos4)
        this.scene.physics.add.collider(
          this.scene.player,
          this.pisos4,
          () => {
            this.scene.rotateCam(false, 10);
          },
          () => true,
          this.scene
        );
      if (this.coin)
        this.scene.physics.add.overlap(
          this.scene.player,
          this.coin,
          (a, b) => {
            b.destroy();
            this.coinAura?.destroy();
          },
          () => true,
          this.scene
        );
      if (this.invencible) {
        this.scene.physics.add.overlap(
          this.scene.player,
          this.invencible,
          () => {
            if (!this.player?.invincible) {
              this.player?.setPlayerInvicinible(true);
              this.invencible?.setVisible(false);
              this.scene.time.delayedCall(20000, () => {
                this.player?.setPlayerInvicinible(false);
                this.invencible?.setVisible(true);
              });
            }
          },
          () => true,
          this.scene
        );
      }
      if (this.portal)
        this.scene.physics.add.overlap(
          this.scene.player,
          this.portal,
          () => {
            // const obj: GamePlayDataType =  {
            //   level: 999,
            //   lifes: this.scene.lifes ? this.scene.lifes : 3,
            //   loadKey: ["Postales", "Cinemato1", "Cinemato2"],
            //   startingPositionFromOtherScene: {
            //     x: this.player!.x,
            //     y: this.player!.y,
            //   },
            // }
            // this.scene.changeScene(obj) // data
            this.scene.win();
          },
          () => true,
          this.scene
        );
      if (this.firegroup) {
        this.scene.physics.add.overlap(
          this.scene.player,
          this.firegroup,
          () => {
            if (!this.player?.invincible) {
              this.scene.touchItem("fireball");
              this.scene.player?.setVelocity(0);
            }
          },
          () => true,
          this.scene
        );
      }
      if (this.teleport)
        this.scene.physics.add.collider(
          this.scene.player,
          this.teleport,
          (a, b) => {
            const tp = b as Teleport;
            tp.trigger();
          },
          () => true,
          this.scene
        );
    }
  }

  // createMap(data: { level: number; lifes: number }) {

  //   this.movingFloor = this.scene.physics.add.group({ allowGravity: false });
  //   this.movingFloorRot = this.scene.physics.add.group({ allowGravity: false });
  //   this.pisos = this.scene.physics.add.group({ allowGravity: false });
  //   this.pisosBack = this.scene.physics.add.group({ allowGravity: false });
  //   this.pisos2 = this.scene.physics.add.group({ allowGravity: false });
  //   this.pisos3 = this.scene.physics.add.group({ allowGravity: false });
  //   this.pisos4 = this.scene.physics.add.group({ allowGravity: false });
  //   this.firegroup = this.scene.physics.add.group({ allowGravity: false });
  //   this.amountLifes = data.lifes;
  //   this.coin = this.scene.physics.add.group({ allowGravity: false });
  //   this.invencible = this.scene.physics.add.group({ allowGravity: false });
  //   this.aura = this.scene.physics.add.group({ allowGravity: false, immovable: true })
  //   this.portal = this.scene.physics.add.group({ allowGravity: false });
  //   this.teleport = this.scene.physics.add.group({ allowGravity: false });
  //   this.flyingPiso = this.scene.physics.add.group({ allowGravity: false, immovable: true });
  //   this.coinAura = this.scene.add.sprite(1500, 600, "auraTuto").setScale(0.6)

  //   const coinConfig: FloorConfig = {
  //     texture: "cristal3",
  //     pos: { x: 1500, y: 600 },
  //     scale: { width: 0.7, height: 0.7 },
  //     width: 40,
  //     height: 18,
  //     fix: 10,
  //   };
  //   const cristal = new Floor(this.scene, coinConfig, this.coin).setBodySize(
  //     140,
  //     180
  //   );
  //   this.coin.add(cristal)

  //   this.scene.tweens.add({
  //     targets: this.coinAura,
  //     alpha: 0.4,
  //     duration: 1000,
  //     yoyo: true,
  //     repeat: -1
  //   })

  //   const portalConfig: FloorConfig = {
  //     pos: { x: 6400, y: 1090 }, // x: 2400
  //     texture: "plataformaFinalP1",
  //     // scale: {width: 0.7, height: 0.7},
  //     width: 100,
  //     height: 100,
  //   };
  //   const port = new Floor(this.scene, portalConfig, this.portal).setDepth(99);
  //   this.endPortal = port;

  //   const otherSceneConf: GamePlayDataType =  {
  //       level: 7,
  //       lifes: this.scene.lifes ? this.scene.lifes : 3,
  //       loadKey: ["Postales", "Cinemato1", "Cinemato2"],
  //       startingPositionFromOtherScene: {
  //         x: 2750,
  //         y: 1000,
  //       },
  //     }

  //   const teleport_1 = new Teleport(this.scene, { x: 500, y: 800, version: 1, sameScene: false, group: this.teleport, otherSceneConf: otherSceneConf })
  //   // const teleport_2 = new Teleport(this.scene, { x: 1000, y: 1000, version: 1, sameScene: true, group: this.teleport })

  //   const pAConfig: LargeFloorIslandConfig = {
  //     withTextureToAbove: true,
  //     textureA: "plataformaNuevaLargaA",
  //     textureB: "plataformaNuevaLargaB",
  //     textureC: "plataformaNuevaLargaC",
  //     pos: { x: 900, y: 800 },
  //     width: {
  //       textureA: 90,
  //       textureB: 67,
  //       textureC: 115,
  //     },
  //     scale: { width: 0.7, height: 0.7 },
  //     height: 127,
  //     large: 30,
  //     rotated: false
  //   };
  //   // const pA = new LargeFloorIsland(this.scene, pAConfig, this.pisos);

  //   const p1Config: LargeFloorIslandConfig = {
  //     withTextureToAbove: true,
  //     textureA: "plataformaNuevaLargaA",
  //     textureB: "plataformaNuevaLargaB",
  //     textureC: "plataformaNuevaLargaC",
  //     pos: { x: 300, y: 1200 },
  //     width: {
  //       textureA: 90,
  //       textureB: 67,
  //       textureC: 115,
  //     },
  //     scale: { width: 0.7, height: 0.7 },
  //     height: 127,
  //     large: 200,
  //     rotated: false
  //   };
  //   const p1 = new LargeFloorIsland(this.scene, p1Config, this.pisos);

  //   const p2Config: FloorConfig = {
  //     pos: { x: 1000, y: 900 },
  //     texture: "pSimple1p3",
  //     scale: { width: 0.7, height: 0.7 },
  //     width: 140,
  //     height: 20,
  //   }
  //   const p2 = new Floor(this.scene, p2Config, this.pisos2).setTint(colors.gravity)

  //   const p3config: FloorConfig = {
  //     pos: { x: 1000, y: 400 },
  //     texture: "pSimple1p3",
  //     scale: { width: 0.7, height: 0.7 },
  //     width: 140,
  //     height: 20,
  //   }
  //   const p3 = new Floor(this.scene, p3config, this.pisos).setFlipY(true)

  //   const p4config: FloorConfig = {
  //     pos: { x: 1400, y: 400 },
  //     texture: "pSimple1p3",
  //     scale: { width: 0.7, height: 0.7 },
  //     width: 140,
  //     height: 20,
  //   }

  //   const p4 = new Floor(this.scene, p4config, this.pisos2).setFlipY(true).setTint(colors.gravity)

  //   const p5config: FloorConfig = {
  //     pos: { x: 1400, y: 900 },
  //     texture: "pSimple1p3",
  //     scale: { width: 0.7, height: 0.7 },
  //     width: 140,
  //     height: 20,
  //   }

  //   const p5 = new Floor(this.scene, p5config, this.pisos)

  //   const p6config: FloorConfig = {
  //     pos: { x: 2000, y: 900 },
  //     texture: "pSimple1p3",
  //     scale: { width: 0.7, height: 0.7 },
  //     width: 140,
  //     height: 20
  //   }

  //   const p6 = new Floor(this.scene, p6config, this.pisos3).setTint(colors.rotate)

  //   const p7config: FloorConfig = {
  //     pos: { x: 2300, y: 900 },
  //     texture: "pSimple1p3",
  //     scale: { width: 0.7, height: 0.7 },
  //     width: 140,
  //     height: 20
  //   }

  //   const p7 = new Floor(this.scene, p7config, this.pisos4).setTint(colors.rotate)

  //   const invencibleConfig: FloorConfig = {
  //     texture: "cristal2",
  //     pos: { x: 3900, y: 1000 },
  //     scale: { width: 0.7, height: 0.7 },
  //     width: 10,
  //     height: 18,
  //     fix: 10,
  //   };
  //   // this.cristal = new Floor(this.scene, invencibleConfig, this.invencible);
  //   const invencible = new Floor(this.scene, invencibleConfig, this.invencible).setFlipX(true).setTint(0xff0000);

  //   const line1 = this.scene.add.rectangle(4000, 1000, 10, 1000, 0xff0000).setOrigin(0.5, 0.5);
  //   const line2 = this.scene.add.rectangle(5000, 1000, 10, 1000, 0xff0000).setOrigin(0.5, 0.5);
  //   const text = this.scene.add.text(4250, 500, "testeo cristal invencible", {
  //     fontSize: "32px",
  //     color: "#ff0000",
  //   }).setOrigin(0.5, 0.5);
  //   // const mapObjects =
  //   // this.movingFloor.getChildren().concat(
  //   //     this.movingFloorRot.getChildren(),
  //   //     // this.invencible.getChildren(),
  //   //     this.pisosBack.getChildren(),
  //   //     // this.pisos2.getChildren(),
  //   //     // this.pisos3.getChildren(),
  //   //     // this.pisos4.getChildren(),
  //   //     // this.pisos.getChildren(),
  //   //     this.coin.getChildren(),
  //   //     this.aura.getChildren(),
  //   //     this.portal.getChildren(),
  //   //     this.aura.getChildren(),
  //   //     this.firegroup.getChildren(),
  //   //   )
  //   // this.mapContainer.add(mapObjects)
  //   // this.mapContainer.setDepth(10);

  //   const zoneAConfig: ZoneConfig = {
  //     x: 2700,
  //     y: 0,
  //     width: 1000,
  //     height: 10000,
  //     color: 0xffffff,
  //     alpha: 0.2,
  //     detectOnTouch: (player: Player, zone: MagicZone) => {
  //       this.player?.setPlayerWithTank(false)
  //       this.player?.setPlayerFlying(true)
  //       if (!this.player?.invincible) {
  //         this.player?.setTint(0x00ff00)
  //       }
  //       this.player?.tankGraphics?.clear()
  //     },
  //     detectOnExit: (player: Player, zone: MagicZone) => {
  //       this.player?.setPlayerFlying(false)
  //       this.player?.setPlayerWithTank(true)
  //       if (!this.player?.invincible) {
  //         this.player?.clearTint()
  //       }
  //       this.player?.drawTank()
  //     },
  //     effect: (zone: MagicZone) => {
  //       // add fx to the zone
  //       zone.graphics.postFX.addBlur(1, 0, 0, 8, 0xffffff, 1);
  //       // move the zone
  //       // this.scene.tweens.add({
  //       //   targets: zone.graphics,
  //       //   x: "-=100",
  //       //   duration: 10000,
  //       //   yoyo: true,
  //       //   repeat: -1
  //       // })

  //     }
  //   }
  //   const zoneA = new MagicZone(this.scene, zoneAConfig)

  //   // const zoneBConfig: ZoneConfig = {
  //   //   x: 1700,
  //   //   y: 0,
  //   //   width: 800,
  //   //   height: 10000,
  //   //   color: 0xffffff,
  //   //   alpha: 0.2,
  //   //   detectOnTouch: (player: Player, zone: MagicZone) => {
  //   //     if(this.player){
  //   //       this.player.setGravityOnPlayerX(10000)
  //   //       // this.player.setGravityOnPlayer(0)
  //   //     }
  //   //   },
  //   //   detectOnExit: (player: Player, zone: MagicZone) => {
  //   //     if(this.player){
  //   //       this.player.setGravityOnPlayerX(0)
  //   //       // this.player.setGravityOnPlayer(1000)
  //   //     }
  //   //   },
  //   //   effect: (zone: MagicZone) => {
  //   //     // add fx to the zone
  //   //     zone.graphics.postFX.addBlur(1,0,0,8,0xffffff,1);
  //   //     // move the zone
  //   //     // this.scene.tweens.add({
  //   //     //   targets: zone.graphics,
  //   //     //   x: "-=100",
  //   //     //   duration: 10000,
  //   //     //   yoyo: true,
  //   //     //   repeat: -1
  //   //     // })

  //   //   }
  //   // }
  //   // const zoneB = new MagicZone(this.scene,zoneBConfig)
  //   // this.scene.UICamera?.ignore(zoneA)

  //   for (let i = 0; i < 100; i++) {
  //     const fireballConfig: FloorConfig = {
  //     spriteSheet: "meteoritop3",
  //     texture: "meteorito",
  //     pos: { x: 4000 + i * 10, y: -200 }, // 500 1580
  //     width: 100,
  //     height: 100,
  //     tween: {
  //       duration: 3000,
  //       repeat: -1,
  //       delay: Math.random() * 1000,
  //       y: "+=4000",
  //     },
  //     frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  //     };
  //     const fireball = new Floor(this.scene, fireballConfig, this.firegroup).setScale(0.5)
  //   }
  //   const p8config: FloorConfig = {
  //     pos: { x: 5200, y: 900 },
  //     texture: "pSimple1p3",
  //     scale: { width: 0.7, height: 0.7 },
  //     width: 140,
  //     height: 20,
  //     animation:{
  //       xAxis:{
  //         xDistance:200,
  //         xVel:100
  //       }
  //     }
  //   }

  //   const p8 = new Floor(this.scene, p8config, this.pisos)

  //   const p9config: FloorConfig = {
  //     pos: { x: 5800, y: 900 },
  //     texture: "pSimple1p3",
  //     scale: { width: 0.7, height: 0.7 },
  //     width: 140,
  //     height: 20,
  //     animation:{
  //       yAxis:{
  //         yDistance:200,
  //         yVel:100
  //       }
  //     }
  //   }

  //   const p9 = new Floor(this.scene, p9config, this.pisos)

  //   const fireball2Config: FloorConfig = {
  //     spriteSheet: "meteoritop3",
  //     texture: "meteorito",
  //     pos: { x: -0, y: 800 }, // 500 1580
  //     width: 100,
  //     rotated: true,
  //     height: 100,
  //     tween: {
  //       duration: 3000,
  //       repeat: -1,
  //       delay: Math.random() * 1000,
  //       x: "+=4000",
  //     },
  //     frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  //   };
  //   // const fireball2 = new Floor(this.scene, fireball2Config, this.firegroup).setScale(0.5).setFlipY(true)

  //   this.scene.UICamera?.ignore(this.pisos)
  //   this.scene.UICamera?.ignore(this.pisos2)
  //   this.scene.UICamera?.ignore(this.pisos3)
  //   this.scene.UICamera?.ignore(this.pisos4)
  //   this.scene.UICamera?.ignore(this.pisosBack)
  //   this.scene.UICamera?.ignore(this.firegroup)
  //   this.scene.UICamera?.ignore(this.aura)
  //   this.scene.UICamera?.ignore(this.invencible)
  //   this.scene.UICamera?.ignore(this.mapContainer)
  //   this.scene.UICamera?.ignore(this.frontContainer)
  //   this.scene.UICamera?.ignore(this.teleport)
  //   this.scene.UICamera?.ignore(this.coin)
  //   this.scene.UICamera?.ignore(this.coinAura)
  // }

  createMap(data: { level: number; lifes: number }) {
    this.mapContainer = this.scene.add.container();
    this.frontContainer = this.scene.add.container().setDepth(999999999999);

    this.background = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "background0P1")
      .setOrigin(0.5, 0.5);
    this.background2 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "background1P1")
      .setOrigin(0.5, 0.5);
    this.background3 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "backgroundStars")
      .setOrigin(0.5, 0.5);
    this.background4 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y + 470, "frontGround1")
      .setOrigin(1, 1)
      .setScale(1);
    this.background5 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y + 470, "frontGround2")
      .setOrigin(0, 1)
      .setScale(1);
    this.background6 = this.scene.add
      .image(
        this.startingPoint.x + this.background5.width - 15,
        this.startingPoint.y + 470,
        "frontGround1"
      )
      .setOrigin(0, 1)
      .setScale(1);

    this.mountain1 = this.scene.add.image(
      this.startingPoint.x + this.background5.width - 15,
      this.startingPoint.y - 370,
      "montaña3"
    );
    this.mountain2 = this.scene.add.image(
      this.startingPoint.x - 70,
      this.startingPoint.y + 350,
      "montaña5"
    );
    this.mountain3 = this.scene.add.image(
      1200,
      this.startingPoint.y + 470,
      "montaña3"
    );
    this.mountain4 = this.scene.add.image(
      200,
      this.startingPoint.y,
      "montaña2"
    );
    this.mountain5 = this.scene.add.image(
      1100,
      this.startingPoint.y,
      "montaña4"
    );

    this.mapContainer.add([
      this.background,
      this.background2,
      this.background3,
      this.mountain4,
      this.mountain5,
      this.background4,
      this.background5,
      this.background6,
    ]);

    this.frontContainer.add([this.mountain1, this.mountain2, this.mountain3]);

    this.scene.UICamera?.ignore(this.mapContainer);
    this.scene.UICamera?.ignore(this.frontContainer);

    this.pisos = this.scene.physics.add.group({ allowGravity: false });

    // const p1Config: LargeFloorIslandConfig = {
    //   withTextureToAbove: true,
    //   textureA: "plataformaNuevaLargaA",
    //   textureB: "plataformaNuevaLargaB",
    //   textureC: "plataformaNuevaLargaC",
    //   pos: { x: 300, y: 1200 },
    //   width: {
    //     textureA: 90,
    //     textureB: 67,
    //     textureC: 115,
    //   },
    //   scale: { width: 0.7, height: 0.7 },
    //   height: 127,
    //   large: 20,
    //   rotated: false,
    // };

    const globalPlatformsConfig = {
      withTextureToAbove: true,
      textureA: "plataformaNuevaLargaA",
      textureB: "plataformaNuevaLargaB",
      textureC: "plataformaNuevaLargaC",
      scale: { width: 0.7, height: 0.7 },
      rotated: false,
    };


    const intermitentFloor = {
      ...globalPlatformsConfig,
      pos: { x: 700, y: 800 },
      width: {
        textureA: 90,
        textureB: 67,
        textureC: 115,
      },
      height: 127,
      large: 5,
    }


    const intermitentFloorArray = new Array(8).fill(intermitentFloor).map((element, index) => {
      return {
        ...element,
        pos: { x: element.pos.x + (index * 300), y: 800 },
      }
    })
    
    const platforms = [
      {
        ...globalPlatformsConfig,
        pos: { x: 300, y: 1200 },
        width: {
          textureA: 90,
          textureB: 67,
          textureC: 115,
        },
        height: 127,
        large: 50,
      },
    ].concat(intermitentFloorArray)




    for (let index = 0; index < platforms.length; index++) {
      const element = platforms[index];
      new LargeFloorIsland(this.scene, element, this.pisos);
    }

    this.scene.UICamera?.ignore(this.pisos);

    this.scene.UICamera?.ignore(this.scene.physics.world.debugGraphic);
  }

  update() {
    /* Attach background anim */
    // if (this.scene.player) this.animateBackground(this.scene.player);
    if (this.scene.player)
      this.animateBackground(this.scene.cameras.main.midPoint);
  }
}
export default Sandbox;
