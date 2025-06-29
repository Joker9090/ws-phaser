import Game from "@/game/Game";
import MapCreator from "../sandbox/MapCreator";
import Player from "@/game/assets/Player";
import { GamePlayDataType } from "@/game/Types";
import colors from "@/game/assets/PlatformColors";
import { group } from "console";

class SubMap3 extends MapCreator {

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
            width: 7600,
            height: 2600,
          };
          this.cameraBounds = {
            x: 200,
            y: 200,
            width: 7000,
            height: 2200,
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
            x: 350, //500
            y: (this.cameraBounds.height + this.cameraBounds.y) / 2 - 600, //800
          };

          this.UIItemToGrab= "uiItemp3";
          this.UIItemScale= 0.3;
        //   this.nextScene= "postal1_planeta3";
        this.UIItemToGrab= "uiItemp3";
        this.planet = 3;
        this.defineItems();
    }

    defineItems() {
      const basePlatformsConfig = {
        withTextureToAbove: false,
        texture: "pSimple1p3",
        scale: { width: 0.7, height: 0.7 },
        rotated: false,
        type: "floor",
        width: 140,
        height: 40
      }

      const baseLargePlatformsConf = {
        withTextureToAbove: false,
        texture: "plataformaNuevaA",
        textureA: "platform_izq_p3",
        textureB: "platform_center_p3",
        textureC: "platform_der_p3",
        textureFill: ["fill_texture_p3", "fill_texture2_p3", "fill_texture3_p3"],
        width: {
          textureA: 96,
          textureB: 96,
          textureC: 96,
        },
        height: 96,
        scale: { width: 1, height: 1 },
        rotated: false,
        type: "largeFloor",
        fillBehind: false,
      };
      const baseLongPlatformsConf = {
        withTextureToAbove: false,
        texture: "plataformaNuevaA",
        textureA: "longFloorLeftp3",
        textureB: "longFloorMiddlep3",
        textureC: "longFloorRightp3",
        textureFill: ["fill_texture_p3", "fill_texture2_p3", "fill_texture3_p3"],
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
        texture: "plantap3",
        scale: { width: 0.7, height: 0.7 },
        width: 140,
        height: 180,
        fix: 20,
        auraColor: 0xff86f1,
      }

      const baseDangerConf = {
        type: "danger",
        texture: "Enemy",
        scale: { width: 0.6, height: 0.6 },
        width: 170,
        height: 170,
        attackSpriteSheet: "EnemyAttack",
        particleSpriteSheet: "EnemyParticles",
        group: this.obstacle,
        color: 0xff86f1,
      }

      const baseFireballConf = {
        type: "fireball",
        spriteSheet: "meteoritop3",
        texture: "meteoritop3",
        width: 100,
        height: 100,
        group: this.firegroup,
        scale: { width: 0.71, height: 0.71 },

        // frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      }

      const otherSceneConf: GamePlayDataType = {
        level: 10,
        lifes: this.scene.lifes ? this.scene.lifes : 3,
        loadKey: ["Postales", "Cinemato1", "Cinemato2"],
        startingPositionFromOtherScene: {
          x: 350,
          y: 1800,
        },
      }

      const mapPlatforms = [
        {
          ...baseLargePlatformsConf, pos: { x: 0, y: (this.cameraBounds.height + this.cameraBounds.y) / 2 },
          large: 10,
          group: this.floor
        },
        {
          ...basePlatformsConfig, pos: { x: 1000, y: (this.cameraBounds.height + this.cameraBounds.y) / 2 + 800 }, group: this.floor, animation: {
            xAxis: {
              xDistance: 700,
              xVel: 100
            }
          }
        },
        { ...baseCristalConf, pos: { x: 1000, y: (this.cameraBounds.height + this.cameraBounds.y) / 2 + 700 }, group: this.coin, aura: 'auraTuto' },
        {
          ...basePlatformsConfig, pos: { x: 1500, y: (this.cameraBounds.height + this.cameraBounds.y) / 2 }, group: this.floor, animation: {
            xAxis: {
              xDistance: 700,
              xVel: 200
            }
          }
        },
        { ...baseCristalConf, pos: { x: 1500, y: (this.cameraBounds.height + this.cameraBounds.y) / 2 - 100 }, group: this.coin, aura: 'auraTuto' },
        {
          ...basePlatformsConfig, pos: { x: 2000, y: (this.cameraBounds.height + this.cameraBounds.y) / 2 + 400 }, group: this.floor, animation: {
            xAxis: {
              xDistance: 700,
              xVel: 100
            }
          }
        },
        { ...baseCristalConf, pos: { x: 2000, y: (this.cameraBounds.height + this.cameraBounds.y) / 2 + 300 }, group: this.coin, aura: 'auraTuto' },
        {
          ...basePlatformsConfig, pos: { x: 2500, y: (this.cameraBounds.height + this.cameraBounds.y) / 2 }, group: this.floor, animation: {
            xAxis: {
              xDistance: 700,
              xVel: 200
            }
          }
        },
        { ...baseCristalConf, pos: { x: 2500, y: (this.cameraBounds.height + this.cameraBounds.y) / 2 - 100 }, group: this.coin, aura: 'auraTuto' },
        {
          ...basePlatformsConfig, pos: { x: 3000, y: (this.cameraBounds.height + this.cameraBounds.y) / 2 + 800 }, group: this.floor, animation: {
            xAxis: {
              xDistance: 700,
              xVel: 100
            }
          }
        },
        { ...baseCristalConf, pos: { x: 3000, y: (this.cameraBounds.height + this.cameraBounds.y) / 2 + 700 }, group: this.coin, aura: 'auraTuto' },
        {
          ...basePlatformsConfig, pos: { x: 3500, y: (this.cameraBounds.height + this.cameraBounds.y) / 2 + 400 }, group: this.floor, animation: {
            xAxis: {
              xDistance: 700,
              xVel: 200
            }
          }
        },
        { ...baseCristalConf, pos: { x: 3500, y: (this.cameraBounds.height + this.cameraBounds.y) / 2 + 300 }, group: this.coin, aura: 'auraTuto' },
        {
          ...basePlatformsConfig, pos: { x: 4000, y: (this.cameraBounds.height + this.cameraBounds.y) / 2 }, group: this.floor, animation: {
            xAxis: {
              xDistance: 700,
              xVel: 100
            }
          }
        },
        { ...baseCristalConf, pos: { x: 4000, y: (this.cameraBounds.height + this.cameraBounds.y) / 2 - 100 }, group: this.coin, aura: 'auraTuto' },
        {
          ...basePlatformsConfig, pos: { x: 4500, y: (this.cameraBounds.height + this.cameraBounds.y) / 2 + 400 }, group: this.floor, animation: {
            xAxis: {
              xDistance: 700,
              xVel: 200
            }
          }
        },
        { ...baseCristalConf, pos: { x: 4500, y: (this.cameraBounds.height + this.cameraBounds.y) / 2 + 300 }, group: this.coin, aura: 'auraTuto' },
        {
          ...basePlatformsConfig, pos: { x: 5000, y: (this.cameraBounds.height + this.cameraBounds.y) / 2 + 800 }, group: this.floor, animation: {
            xAxis: {
              xDistance: 700,
              xVel: 100
            }
          }
        },
        { ...baseCristalConf, pos: { x: 5000, y: (this.cameraBounds.height + this.cameraBounds.y) / 2 + 700 }, group: this.coin, aura: 'auraTuto' },
        {
          ...basePlatformsConfig, pos: { x: 5500, y: (this.cameraBounds.height + this.cameraBounds.y) / 2 + 400 }, group: this.floor, animation: {
            xAxis: {
              xDistance: 700,
              xVel: 200
            }
          }
        },
        { ...baseCristalConf, pos: { x: 5500, y: (this.cameraBounds.height + this.cameraBounds.y) / 2 + 300 }, group: this.coin, aura: 'auraTuto' },
        { ...baseFireballConf, pos: { x: 1500, y: -1000 }, tween: { duration: 2000, repeat: -1, y: "+=4000", yoyo: false }, rotated: false },
        { ...baseFireballConf, pos: { x: 3000, y: 0 }, tween: { duration: 2000, repeat: -1, y: "+=3000", yoyo: false }, rotated: false },
        { ...baseFireballConf, pos: { x: 4500, y: -1000 }, tween: { duration: 2000, repeat: -1, y: "+=4000", yoyo: false }, rotated: false },
        { ...baseFireballConf, pos: { x: 6000, y: 0 }, tween: { duration: 2000, repeat: -1, y: "+=3000", yoyo: false }, rotated: false },
        { type: "subPortal", x: 6500, y: (this.cameraBounds.height + this.cameraBounds.y) / 2, version: 1, sameScene: false, group: this.teleport, otherSceneConf: otherSceneConf },

      ]

      this.preCreateItems = mapPlatforms;
    }

    createMap(data: { level: number; lifes: number }) {
        this.mapContainer = this.scene.add.container();
        this.pisosBack = this.scene.physics.add.group({ allowGravity: false });
        this.flyingPiso = this.scene.physics.add.group({ allowGravity: false, immovable: true });
        this.portal = this.scene.physics.add.group({ allowGravity: false });
        this.loseConfig=[
            { positions: { x: this.startingPoint.x , y: this.startingPoint.y },
              cameraDirection: "NORMAL",
              PlayerDirection: "NORMAL",
              gravityDown: true
              ,
            },
          ]
        // const backImage = this.scene.textures.get("background0P1").getSourceImage()
        // this.backSize = { width: backImage.width, height: backImage.height }

         const { width, height } = this.ratioReference;
        const { width: farWidth, height: farHeight } = this.farBackgroundReference
        const downScaledMiddleWidth = farWidth * 0.5;

        this.backgroundsBack = [
            this.scene.add.image(0, 0, "p3gradient").setOrigin(0.5),
            this.scene.add.image(0, 0, "p3wave").setOrigin(0.5),
            this.scene.add.image(0, 0, "p3stars").setOrigin(0.5)
,
        ]
        
        this.backgroundsMiddle = [
          ...this.createBgRow(200, this.cameraBounds.height+200, ["middleCombo_p3", "middleCombo2_p3", "middleCombo3_p3", "middleCombo4_p3"], width, 1),
        ]

        this.backgroundsFront = [
          ...this.createBgRow(200, this.cameraBounds.height+200, ["front_shadow_p3"], width, 0.6),
          ...this.createBgRow(200, this.cameraBounds.height+200, ["front_base_p3"], width, 0.7),
        ],
        
        this.createBackgrounds(this.backgroundsBack, this.backgroundsMiddle, this.backgroundsFront);

        const bgContainer = this.scene.add.container(0, 0, this.backgroundsBack);
        this.scene.UICamera?.ignore(bgContainer);
        this.scene.cameras.main.ignore(bgContainer);

        this.scene.UICamera?.ignore(this.mapContainer);
        this.scene.UICamera?.ignore(this.frontContainer);

        this.scene.player?.setDepth(9999999999999);

        this.createPlatforms(this.preCreateItems)

        this.scene.UICamera?.ignore(this.floor!);
        this.scene.UICamera?.ignore(this.mapContainer)
        this.scene.UICamera?.ignore(this.frontContainer)
        this.scene.UICamera?.ignore(this.backContainer)
        this.scene.UICamera?.ignore(this.middleContainer)
        this.scene.UICamera?.ignore(this.frontContainer)
        this.scene.UICamera?.ignore(this.pisosBack)
        this.scene.UICamera?.ignore(this.gravityTile!)
        this.scene.UICamera?.ignore(this.firegroup!)

        this.scene.UICamera?.ignore(this.backContainer)
        this.scene.UICamera?.ignore(this.middleContainer)
        this.scene.UICamera?.ignore(this.frontContainer)

        this.cameraIgnore()
    }

    // update() {

    // }

}

export default SubMap3;
