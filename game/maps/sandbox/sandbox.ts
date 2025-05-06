import Phaser, { Physics, Time } from "phaser";
import AsteroidGenerator, {
  AsteroidGeneratorConfig,
} from "../../assets/AsteroidGenerator";
import Floor, { FloorConfig } from "../../assets/Floor";
import Collectable, { CollectableConfig } from "../../assets/Collectable";
import Game from "../../Game";
import Player from "../../assets/Player";
import { GamePlayDataType, loseConfigFromMapType } from "@/game/Types";
import LargeFloorIsland, {
  LargeFloorIslandConfig,
} from "@/game/assets/LargeFloorIsland";
import MagicZone, { ZoneConfig } from "@/game/assets/MagicZone";
import Teleport from "@/game/assets/Teleport";
import colors from "@/game/assets/PlatformColors";
import MapCreator from "./MapCreator";
import { group } from "console";


class Sandbox extends MapCreator {
  pisosBack?: Phaser.Physics.Arcade.Group;
  // coinAura?: Phaser.GameObjects.Sprite;
  invincible?: Phaser.Physics.Arcade.Group;
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
  UIItemToGrab: string = "cristal3";
  UIItemScale?: number;
  cristal?: Floor;
  collected: Boolean = false;
  rotate?: boolean = true;

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

    this.worldSize = {
      width: 10000,
      height: 1800,
    };
    this.cameraBounds = {
      x: 0,
      y: 100,
      width: 10000,
      height: 1600,
    };
    this.scene.physics.world.setBounds(
      0,
      0,
      this.worldSize.width,
      this.worldSize.height
    );
    this.scene.cameras.main.setBounds(
      this.cameraBounds.x,
      this.cameraBounds.y,
      this.cameraBounds.width,
      this.cameraBounds.height
    );

    this.startingPoint = {
      x: 500, //500
      y: this.worldSize.height - 600, //800
    };

    // this.startingPoint =  { x: 5500, y: 1100 }
  }

  createMap(data: { level: number; lifes: number }) {
    this.mapContainer = this.scene.add.container();
    this.teleport = this.scene.physics.add.group({ allowGravity: false });
    this.movingFloor = this.scene.physics.add.group({ allowGravity: false });
    this.movingFloorRot = this.scene.physics.add.group({ allowGravity: false });
    this.pisosBack = this.scene.physics.add.group({ allowGravity: false });
    this.firegroup = this.scene.physics.add.group({ allowGravity: false });
    this.amountLifes = data.lifes;
    this.coin = this.scene.physics.add.group({ allowGravity: false });
    this.invincible = this.scene.physics.add.group({ allowGravity: false });
    this.aura = this.scene.physics.add.group({ allowGravity: false, immovable: true })
    this.portal = this.scene.physics.add.group({ allowGravity: false });
    this.flyingPiso = this.scene.physics.add.group({ allowGravity: false, immovable: true });
    this.coinAura = this.scene.add.sprite(1700, 800, "auraTuto").setScale(0.6)

    const { width, height } = this.ratioReference;
    const { width: farWidth, height: farHeight } = this.farBackgroundReference;
    const downScaledMiddleWidth = width * 0.7;
    const downScaledFrontWidth = width * 0.5;

    this.backgroundsBack = [
      this.scene.add.image(0, 0, "gradient").setOrigin(0.5),
      this.scene.add.image(0, 0, "stars").setOrigin(0.5),
      this.scene.add.image(0, 300, "curvedVector").setOrigin(0.5),
    ]
    
    this.backgroundsMiddle = [
      this.scene.add.image(-this.startingPoint.x, this.cameraBounds.height+100, "middleCombo").setOrigin(0, 1).setScale(0.7),
      this.scene.add.image(-this.startingPoint.x + downScaledMiddleWidth, this.cameraBounds.height+100, "middleCombo2").setOrigin(0, 1).setScale(0.7),
      this.scene.add.image(-this.startingPoint.x + (downScaledMiddleWidth * 2), this.cameraBounds.height+100, "middleCombo3").setOrigin(0, 1).setScale(0.7),
      this.scene.add.image(-this.startingPoint.x + (downScaledMiddleWidth * 3), this.cameraBounds.height+100, "middleCombo4").setOrigin(0, 1).setScale(0.7),
      this.scene.add.image(-this.startingPoint.x + (downScaledMiddleWidth * 4), this.cameraBounds.height+100, "middleCombo2").setOrigin(0, 1).setScale(0.7),
      this.scene.add.image(-this.startingPoint.x + (downScaledMiddleWidth * 5), this.cameraBounds.height+100, "middleCombo2").setOrigin(0, 1).setScale(0.7),
    ]
    
    this.backgroundsFront = [
      this.scene.add.image(-this.startingPoint.x, this.cameraBounds.height+100, "frontCombo").setOrigin(0, 1).setScale(0.5),
      this.scene.add.image(-this.startingPoint.x + downScaledFrontWidth, this.cameraBounds.height+100, "frontCombo2").setOrigin(0, 1).setScale(0.5),
      this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 2), this.cameraBounds.height+100, "frontCombo3").setOrigin(0, 1).setScale(0.5),
      this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 3), this.cameraBounds.height+100, "frontCombo4").setOrigin(0, 1).setScale(0.5),
      this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 4), this.cameraBounds.height+100, "frontCombo2").setOrigin(0, 1).setScale(0.5),
      this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 5), this.cameraBounds.height+100, "frontCombo2").setOrigin(0, 1).setScale(0.5),
    ]
    
    this.createBackgrounds(this.backgroundsBack, this.backgroundsMiddle, this.backgroundsFront);
    
    const bgContainer = this.scene.add.container(0, 0, this.backgroundsBack);
    this.scene.UICamera?.ignore(bgContainer);
    this.scene.cameras.main.ignore(bgContainer);


    this.scene.UICamera?.ignore(this.mapContainer);
    this.scene.UICamera?.ignore(this.frontContainer);
    this.scene.player?.setDepth(999);
    

    const basePlatformsConfig = {
      withTextureToAbove: true,
      texture: "plataformaNuevaA",
      scale: { width: 0.7, height: 0.7 },
      rotated: false,
      type: "floor",
      width: 140,
      height: 40
    }

    const baseLargePlatformsConf = {
      withTextureToAbove: true,
      texture: "plataformaNuevaA",
      textureA: "platform_izq_p2",
      textureB: "platform_center_p2",
      textureC: "platform_der_p2",
      textureFill: ["fill_texture_p2", "fill_texture2_p2", "fill_texture3_p2", "fill_texture4_p2"],
      width: {
        textureA: 96,
        textureB: 96,
        textureC: 96,
      },
      height: 96,
      scale: { width: 1, height: 1 },
      rotated: false,
      type: "largeFloor",
    };

    const baseCristalConf = {
      type: "collectable",
      texture: "shield",
      scale: { width: 0.7, height: 0.7 },
      width: 10,
      height: 18,
      fix: 10,
    }

    // const intermitentFloorArray = new Array(3).fill(globalPlatformsConfig).map((element, index) => {
    //   return {
    //     ...element,
    //     pos: { x: element.pos.x + (index * 300), y: 800 },
    //   }
    // })
    const otherSceneConf: GamePlayDataType = {
      level: 666,
      lifes: this.scene.lifes ? this.scene.lifes : 3,
      loadKey: ["Postales", "Cinemato1", "Cinemato2"],
      startingPositionFromOtherScene: {
        x: 2000,
        y: 800,
      },
    }
    const mapPlatforms = [
      // platforms
      {
        ...basePlatformsConfig, pos: { x: 1000, y: 1000 }, colors: [colors.falling], group: this.fallingTile
      },
      { ...basePlatformsConfig, pos: { x: 1000, y: 600 }, flipY: true, colors: [colors.falling], group: this.fallingTile },
      { ...basePlatformsConfig, pos: { x: 1400, y: 600 }, group: this.gravityTile, colors: [colors.gravity], flipY: true },
      { ...basePlatformsConfig, pos: { x: 1400, y: 1000 } },
      { ...basePlatformsConfig, pos: { x: 2200, y: 1000 }, rotate: true, group: this.rotationTile, colors: [colors.rotate] },
      { ...basePlatformsConfig, pos: { x: 2500, y: 1000 }, rotate: false, group: this.rotationTile, colors: [colors.rotate] },
      {
        ...basePlatformsConfig, pos: { x: 5200, y: 800 }, animation: {
          xAxis: {
            xDistance: 200,
            xVel: 100
          }
        }
      },
      {
        ...basePlatformsConfig, pos: { x: 5800, y: 750 }, animation: {
          yAxis: {
            yDistance: 600,
            yVel: 200
          }
        }
      },
      // largePlatforms
      {
        ...baseLargePlatformsConf,
        pos: { x: 300, y: this.worldSize.height-400 },
        large: 50,
        group: this.floor
      },
      {
        // ...globalPlatformsConfig,
        ...baseLargePlatformsConf,
        withTextureToAbove: false,
        pos: { x: 6000, y: 500 },
        large: 30,
        group: this.floor
      },

      // collectables
      {...baseCristalConf, pos: { x: this.startingPoint.x + 50, y: 1000 }, group: this.invincible, flipX: true, shield: 'auraAnim'},
      {...baseCristalConf, pos: { x: 3900, y: 1000 }, group: this.invincible, flipX: true, shield: 'auraAnim'},
      {...baseCristalConf, pos: { x: 1700, y: 800 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto'},
    
      //portales
      { type: "subPortal",  x: 2000, y: 800, version: 1, sameScene: false, group: this.teleport, otherSceneConf: otherSceneConf },
      { type: "finalPortal", pos: { x: 5500, y: 1300 }, texture: "plataformaFinalP1", width: 100, height: 100, group: this.portal }
    
    ]
    
    this.createPlatforms(mapPlatforms)
    const getAllTilemapsAndLargeFloors = () => {
      const tileSprites = this.scene.children.list.filter(
        (child: any) => child
      );

      const largeFloors = this.floor?.getChildren().filter(
      (child) => child instanceof LargeFloorIsland
      );

      return { tileSprites, largeFloors };
    };

    const { tileSprites, largeFloors } = getAllTilemapsAndLargeFloors();
    console.log("Tilemaps:", tileSprites);
    console.log("Large Floors:", largeFloors);
   
    // const teleport_1 = new Teleport(this.scene, { x: 2000, y: 800, version: 1, sameScene: false, group: this.teleport, otherSceneConf: otherSceneConf })
 
    this.scene.tweens.add({
      targets: this.coinAura,
      alpha: 0.4,
      duration: 1000,
      yoyo: true,
      repeat: -1
    })

    // const portalConfig: FloorConfig = {
    //   pos: { x: 6600, y: 1090 }, // x: 2400
    //   texture: "plataformaFinalP1",
    //   // scale: {width: 0.7, height: 0.7},
    //   width: 100,
    //   height: 100,
    // };
    // const port = new Floor(this.scene, portalConfig, this.portal);
   
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
    const text = this.scene.add.text(4250, 500, "testeo cristal invincible", {
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

    const fireball3Config: FloorConfig = {
      spriteSheet: "meteorito",
      texture: "meteorito",
      pos: { x: this.startingPoint.x + 200, y: this.startingPoint.y - 600 }, // 500 1580
      width: 100,
      height: 100,
      rotated: true, // rotated define si esta en vertical o horizontal
      tween: {
        yoyo: true,
        duration: 1500,
        repeat: -1,
        delay: Math.random() * 1000,
        x: "-=500", // esto define en que eje se desplaza y cuanto, + o - definen la direccion de dicho eje
        onYoyo: () => {
          this.scene.tweens.add({
            targets: fireball3,
            rotation: fireball3.rotation + Math.PI, // Rota 180 grados
            duration: 200, // Duración de la rotación en milisegundos
            ease: "Linear",
          });
        },
        onRepeat: () => {
          this.scene.tweens.add({
            targets: fireball3,
            rotation: fireball3.rotation + Math.PI, // Rota 180 grados
            duration: 200, // Duración de la rotación en milisegundos
            ease: "Linear",
          });
        },
      },
      frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
      const fireball3 = new Floor(this.scene, fireball3Config, this.firegroup).setScale(0.5)

    this.scene.UICamera?.ignore(this.floor!);
    this.scene.UICamera?.ignore(this.portal);
    this.scene.UICamera?.ignore(this.pisosBack)
    this.scene.UICamera?.ignore(this.firegroup)
    this.scene.cameras.getCamera('backgroundCamera')?.ignore(this.firegroup)
    this.scene.UICamera?.ignore(this.aura)
    this.scene.UICamera?.ignore(this.invincible)
    this.scene.UICamera?.ignore(this.mapContainer)
    this.scene.UICamera?.ignore(this.frontContainer)
    this.scene.UICamera?.ignore(this.teleport)
    this.scene.UICamera?.ignore(this.coin)
    this.scene.UICamera?.ignore(this.coinAura!)
    this.scene.UICamera?.ignore(this.gravityTile!)
    this.scene.UICamera?.ignore(this.backContainer)
    this.scene.UICamera?.ignore(this.middleContainer)
    this.scene.UICamera?.ignore(this.frontContainer)

    this.cameraIgnore()


    if (this.scene.physics.world.debugGraphic) {
      this.scene.UICamera?.ignore(this.scene.physics.world.debugGraphic);
    }
  }

  update() {
    /* Attach background anim */
    // if (this.scene.player) this.animateBackground(this.scene.player);
    // if (this.scene.player)
      // if (this.scene.initialScroll.x === 0 && this.scene.initialScroll.y === 0) this.setInitialScroll(this.scene.cameras.main.scrollX, this.scene.cameras.main.scrollY);
      // this.animateBackground();
  }
}
export default Sandbox;
