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
import MapCreator from "./MapCreator";
import { group } from "console";

class Sandbox extends MapCreator {
  pisosBack?: Phaser.Physics.Arcade.Group;
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
    super(scene, player, data);
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



  createMap(data: { level: number; lifes: number }) {
    this.mapContainer = this.scene.add.container();
    this.frontContainer = this.scene.add.container().setDepth(999999999999);
    this.teleport = this.scene.physics.add.group({ allowGravity: false });
    this.movingFloor = this.scene.physics.add.group({ allowGravity: false });
    this.movingFloorRot = this.scene.physics.add.group({ allowGravity: false });
    this.pisosBack = this.scene.physics.add.group({ allowGravity: false });
    this.firegroup = this.scene.physics.add.group({ allowGravity: false });
    this.amountLifes = data.lifes;
    this.coin = this.scene.physics.add.group({ allowGravity: false });
    this.invencible = this.scene.physics.add.group({ allowGravity: false });
    this.aura = this.scene.physics.add.group({ allowGravity: false, immovable: true })
    this.portal = this.scene.physics.add.group({ allowGravity: false });
    this.flyingPiso = this.scene.physics.add.group({ allowGravity: false, immovable: true });
    this.coinAura = this.scene.add.sprite(1700, 800, "auraTuto").setScale(0.6)

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

    const globalPlatformsConfig = {
      withTextureToAbove: true,
      texture: "plataformaNuevaA",
      textureA: "plataformaNuevaLargaA",
      textureB: "plataformaNuevaLargaB",
      textureC: "plataformaNuevaLargaC",
      scale: { width: 0.7, height: 0.7 },
      rotated: false,
    };

    // const intermitentFloorArray = new Array(3).fill(globalPlatformsConfig).map((element, index) => {
    //   return {
    //     ...element,
    //     pos: { x: element.pos.x + (index * 300), y: 800 },
    //   }
    // })

    const platforms = [
      {
        pos: { x: 1000, y: 1000 }, colors: colors.gravity, group: this.gravityTile
      },
      { pos: { x: 1000, y: 600 }, flipY: true },
      { pos: { x: 1400, y: 600 }, group: this.gravityTile, colors: colors.gravity, flipY: true },
      { pos: { x: 1400, y: 1000 } },
      { pos: { x: 2200, y: 1000 }, rotate: true, group: this.rotationTile, colors: colors.rotate },
      { pos: { x: 2500, y: 1000 }, rotate: false, group: this.rotationTile, colors: colors.rotate },
      {
        pos: { x: 5200, y: 800 }, animation: {
          xAxis: {
            xDistance: 200,
            xVel: 100
          }
        }
      },
      {
        pos: { x: 5800, y: 750 }, animation: {
          yAxis: {
            yDistance: 600,
            yVel: 200
          }
        }
      }
    ]
    
    const largePlatforms = [
      {
        ...globalPlatformsConfig,
        pos: { x: 300, y: 1200 },
        width: {
          textureA: 90,
          textureB: 67,
          textureC: 115,
        },
        height: 127,
        large: 150,
        group: this.floor
      },
      {
        ...globalPlatformsConfig,
        pos: { x: 6000, y: 500 },
        width: {
          textureA: 90,
          textureB: 67,
          textureC: 115,
        },
        height: 127,
        large: 30,
        group: this.floor
      }
    ]
    // ].concat(intermitentFloorArray)

    platforms.forEach((element) => {
      const config: any = {
        ...element,
        ...globalPlatformsConfig
      };
      const floor = new Floor(this.scene, config, element.group ?? this.floor!);
      if (element.flipY) floor.setFlipY(true)
      if (element.colors) floor.setTint(element.colors)
      floor.setBodySize(140, 20)
      floor.setFlipY(element.flipY ?? false)
      // this.floor?.add(floor);
    });

    largePlatforms.forEach((element) => {
      const config: any = {
        ...element,
        ...globalPlatformsConfig,
      };

      const largeFloor = new LargeFloorIsland(this.scene,config,element.group ?? this.floor!
      );
    });
    
    
    
    // for (let index = 0; index < largePlatforms.length; index++) {
    //   const element = largePlatforms[index];
    //   new LargeFloorIsland(this.scene, element, this.floor!);
    // }
    
    const otherSceneConf: GamePlayDataType = {
      level: 7,
      lifes: this.scene.lifes ? this.scene.lifes : 3,
      loadKey: ["Postales", "Cinemato1", "Cinemato2"],
      startingPositionFromOtherScene: {
        x: 2750,
        y: 1000,
      },
    }
    const teleport_1 = new Teleport(this.scene, { x: 2000, y: 800, version: 1, sameScene: false, group: this.teleport, otherSceneConf: otherSceneConf })
    // const teleport_2 = new Teleport(this.scene, { x: 1000, y: 1000, version: 1, sameScene: true, group: this.teleport })

    const coinConfig: FloorConfig = {
      texture: "cristal3",
      pos: { x: 1700, y: 800 },
      scale: { width: 0.7, height: 0.7 },
      width: 40,
      height: 18,
      fix: 10,
    };
    const cristal = new Floor(this.scene, coinConfig, this.coin).setBodySize(
      140,
      180
    );
    this.coin.add(cristal)

    this.scene.tweens.add({
      targets: this.coinAura,
      alpha: 0.4,
      duration: 1000,
      yoyo: true,
      repeat: -1
    })

    const portalConfig: FloorConfig = {
      pos: { x: 6600, y: 1090 }, // x: 2400
      texture: "plataformaFinalP1",
      // scale: {width: 0.7, height: 0.7},
      width: 100,
      height: 100,
    };
    const port = new Floor(this.scene, portalConfig, this.portal);
    console.log(port, "portal");
    // this.endPortal = port;

    const invencibleConfig: FloorConfig = {
      texture: "cristal2",
      pos: { x: 3900, y: 1000 },
      scale: { width: 0.7, height: 0.7 },
      width: 10,
      height: 18,
      fix: 10,
    };
    // this.cristal = new Floor(this.scene, invencibleConfig, this.invencible);
    const invencible = new Floor(this.scene, invencibleConfig, this.invencible).setFlipX(true).setTint(0xff0000);

    const zoneAConfig: ZoneConfig = {
      x: 2700,
      y: 0,
      width: 1000,
      height: 10000,
      color: 0xffffff,
      alpha: 0.2,
      detectOnTouch: (player: Player, zone: MagicZone) => {
        this.player?.setPlayerWithTank(false)
        this.player?.setPlayerFlying(true)
        if (!this.player?.invincible) {
          this.player?.setTint(0x00ff00)
        }
        this.player?.tankGraphics?.clear()
      },
      detectOnExit: (player: Player, zone: MagicZone) => {
        this.player?.setPlayerFlying(false)
        this.player?.setPlayerWithTank(true)
        if (!this.player?.invincible) {
          this.player?.clearTint()
        }
        this.player?.drawTank()
      },
      effect: (zone: MagicZone) => {
        // add fx to the zone
        zone.graphics.postFX.addBlur(1, 0, 0, 8, 0xffffff, 1);
        // move the zone
        // this.scene.tweens.add({
        //   targets: zone.graphics,
        //   x: "-=100",
        //   duration: 10000,
        //   yoyo: true,
        //   repeat: -1
        // })

      }
    }
    const zoneA = new MagicZone(this.scene, zoneAConfig)

    const line1 = this.scene.add.rectangle(4000, 1000, 10, 1000, 0xff0000).setOrigin(0.5, 0.5);
    const line2 = this.scene.add.rectangle(5000, 1000, 10, 1000, 0xff0000).setOrigin(0.5, 0.5);
    const text = this.scene.add.text(4250, 500, "testeo cristal invencible", {
      fontSize: "32px",
      color: "#ff0000",
    }).setOrigin(0.5, 0.5);

    for (let i = 0; i < 100; i++) {
      const fireballConfig: FloorConfig = {
        spriteSheet: "meteorito",
        texture: "meteorito",
        pos: { x: 4030 + (Math.random() * 1000), y: -200 },
        width: 100,
        height: 100,
        tween: {
          duration: 3000,
          repeat: -1,
          delay: i * 200,
          y: "+=4000",
        },
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      };
      const fireball = new Floor(this.scene, fireballConfig, this.firegroup).setScale(0.5);
    }

    const fireballConfig: FloorConfig = {
      spriteSheet: "meteorito",
      texture: "meteorito",
      pos: { x: 13000, y: 400 }, // 500 1580
      width: 100,
      height: 100,
      rotated: true, //rotated define si esta en vertical o horizontal
      tween: {
        duration: 10000,
        repeat: -1,
        delay: Math.random() * 1000,
        x: "-=10000", // esto define en que eje se desplaza y cuando, + o - definen la direccion de dicho eje 
      },
      frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
    const fireball = new Floor(this.scene, fireballConfig, this.firegroup).setScale(0.5)

    // for (let index = 0; index < intermitentFloorArray.length; index++) {
    //   const element = intermitentFloorArray[index];
    //   new LargeFloorIsland(this.scene, element, this.pisos);
    // }

    this.scene.UICamera?.ignore(this.floor!);
    this.scene.UICamera?.ignore(this.portal);
    this.scene.UICamera?.ignore(this.pisosBack)
    this.scene.UICamera?.ignore(this.firegroup)
    this.scene.UICamera?.ignore(this.aura)
    this.scene.UICamera?.ignore(this.invencible)
    this.scene.UICamera?.ignore(this.mapContainer)
    this.scene.UICamera?.ignore(this.frontContainer)
    this.scene.UICamera?.ignore(this.teleport)
    this.scene.UICamera?.ignore(this.coin)
    this.scene.UICamera?.ignore(this.coinAura)
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
