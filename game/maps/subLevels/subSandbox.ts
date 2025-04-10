import Game from "@/game/Game";
import MapCreator from "../sandbox/MapCreator";
import Player from "@/game/assets/Player";
import { GamePlayDataType } from "@/game/Types";
import colors from "@/game/assets/PlatformColors";

class subSandbox extends MapCreator {
    constructor(scene: Game, player: Player, data?: GamePlayDataType) {
        super(scene, player, data);
        this.scene = scene;
        this.player = player;
        this.worldSize = {
            width: 5000,
            height: 2000,
          };
          this.cameraBounds = {
            x: 0,
            y: 0,
            width: 5000,
            height: 1300,
          };
    
        this.scene.physics.world.setBounds(
          0,
          0,
          this.worldSize.width,
          this.worldSize.height
        );
    
        this.player.setPlayerWithTank(true);
      }

      createMap(data: { level: number; lifes: number }) {
        this.mapContainer = this.scene.add.container();
        const { width, height } = this.ratioReference;
        const { width: farWidth, height: farHeight } = this.farBackgroundReference;
        const downScaledMiddleWidth = width * 0.7;
        const downScaledFrontWidth = width * 0.5;
    
        const backImage = this.scene.textures.get("background0P1").getSourceImage()
        this.backSize = { width: backImage.width, height: backImage.height }
    
        this.backgroundsBack = [
          this.scene.add.image(-this.startingPoint.x, this.worldSize.height, "gradient").setOrigin(0, 1),
          this.scene.add.image(-this.startingPoint.x + farWidth, this.worldSize.height, "gradient").setOrigin(0, 1),
          this.scene.add.image(-this.startingPoint.x, this.worldSize.height, "stars").setOrigin(0, 1),
          this.scene.add.image(-this.startingPoint.x + farWidth, this.worldSize.height, "stars").setOrigin(0, 1),
          this.scene.add.image(-this.startingPoint.x, this.worldSize.height - 200, "curvedVector").setOrigin(0, 1),
          this.scene.add.image(-this.startingPoint.x + farWidth, this.worldSize.height - 200, "curvedVector2").setOrigin(0, 1),
        ]
    
        this.backgroundsMiddle = [
          this.scene.add.image(-this.startingPoint.x, this.startingPoint.y - 50, "middleCombo").setOrigin(0, 1).setScale(0.7),
          this.scene.add.image(-this.startingPoint.x + downScaledMiddleWidth, this.startingPoint.y - 50, "middleCombo2").setOrigin(0, 1).setScale(0.7),
          this.scene.add.image(-this.startingPoint.x + (downScaledMiddleWidth * 2), this.startingPoint.y - 50, "middleCombo3").setOrigin(0, 1).setScale(0.7),
          this.scene.add.image(-this.startingPoint.x + (downScaledMiddleWidth * 3), this.startingPoint.y - 50, "middleCombo4").setOrigin(0, 1).setScale(0.7),
          this.scene.add.image(-this.startingPoint.x + (downScaledMiddleWidth * 4), this.startingPoint.y - 50, "middleCombo2").setOrigin(0, 1).setScale(0.7),
          this.scene.add.image(-this.startingPoint.x + (downScaledMiddleWidth * 5), this.startingPoint.y - 50, "middleCombo2").setOrigin(0, 1).setScale(0.7),
        ]
    
        this.backgroundsFront = [
            this.scene.add.image(-this.startingPoint.x, this.startingPoint.y + 550, "frontCombo").setOrigin(0, 1).setScale(0.5),
            this.scene.add.image(-this.startingPoint.x + downScaledFrontWidth, this.startingPoint.y + 550, "frontCombo2").setOrigin(0, 1).setScale(0.5),
            this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 2), this.startingPoint.y + 550, "frontCombo3").setOrigin(0, 1).setScale(0.5),
            this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 3), this.startingPoint.y + 550, "frontCombo4").setOrigin(0, 1).setScale(0.5),
            this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 4), this.startingPoint.y + 550, "frontCombo2").setOrigin(0, 1).setScale(0.5),
            this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 5), this.startingPoint.y + 550, "frontCombo2").setOrigin(0, 1).setScale(0.5),
        ]
    
        this.createBackgrounds(this.backgroundsBack, this.backgroundsMiddle, this.backgroundsFront);
        
        // this.frontContainer.add(this.backgroundsFront);
        //this.mapContainer.add(this.backgroundsBack.concat(this.backgroundsMiddle).concat(this.backgroundsFront));
        this.scene.UICamera?.ignore(this.mapContainer);
        this.scene.UICamera?.ignore(this.frontContainer);
    
        this.scene.player?.setDepth(9999999999999);
    
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
          withTextureToAbove: false,
          texture: "plataformaNuevaA",
          textureA: "plataformaNuevaLargaA",
          textureB: "plataformaNuevaLargaB",
          textureC: "plataformaNuevaLargaC",
          scale: { width: 0.7, height: 0.7 },
          rotated: false,
          type: "largeFloor",
        };
    
        const baseCristalConf = {
          type: "collectable",
          texture: "cristal2",
          scale: { width: 0.7, height: 0.7 },
          width: 10,
          height: 18,
          fix: 10,
        }

        const otherSceneConf: GamePlayDataType =  {
          level: 999,
          lifes: this.scene.lifes ? this.scene.lifes : 3,
          loadKey: ["Postales", "Cinemato1", "Cinemato2"],
          startingPositionFromOtherScene: {
            x: 1800,
            y: 1000,
          },
        }

        const mapPlatforms = [
          // platforms
    
        //   {
        //     ...basePlatformsConfig, pos: { x: 1000, y: 1000 }, colors: [colors.gravity], group: this.gravityTile
        //   },
          // largePlatforms
          {
            ...baseLargePlatformsConf,
            pos: { x: 300, y: 1200 },
            width: {
              textureA: 90,
              textureB: 67,
              textureC: 115,
            }, // Adjusted to match the expected type in mapFloorConfig
            height: 127,
            large: 90,
            group: this.floor,
            withTextureToAbove: true,
          },
          {
            ...baseLargePlatformsConf,
            pos: { x: 600, y: 800 },
            width: {
              textureA: 90,
              textureB: 67,
              textureC: 115,
            }, // Adjusted to match the expected type in mapFloorConfig
            height: 127,
            large: 20,
            group: this.floor
          },
          //portal
          { type: "subPortal",  x: 3600, y: 200, version: 1, sameScene: false, group: this.teleport, otherSceneConf: otherSceneConf },

          //meteorites

    
          // collectables
          // {...baseCristalConf, pos: { x: 500, y: 300 }, group: this.invincible, flipX: true, colors: [0xff0000]},
          //  {...baseCristalConf, pos: { x: 3900, y: 1000 }, group: this.invincible, flipX: true, colors: [0xff0000]},
          // {...baseCristalConf, pos: { x: 500, y: 600 }, group: this.coin, texture: "cristal3", width: 140, height: 180},
        ]

        const platformsRow = new Array(5).fill(0).map((_, i) => {
          return {
            ...basePlatformsConfig,
            pos: { x: 2200 + i * 200, y: 500 },
          };
        });

        this.createPlatforms(mapPlatforms.concat(platformsRow as any[]));
        
        this.scene.UICamera?.ignore(this.floor!);
        this.scene.UICamera?.ignore(this.mapContainer)
        this.scene.UICamera?.ignore(this.frontContainer)
        this.scene.UICamera?.ignore(this.gravityTile!)
        this.scene.UICamera?.ignore(this.backContainer)
        this.scene.UICamera?.ignore(this.middleContainer)
        this.scene.UICamera?.ignore(this.frontContainer)
    
    
        if (this.scene.physics.world.debugGraphic) {
          this.scene.UICamera?.ignore(this.scene.physics.world.debugGraphic);
        }
    
      }

      update() {
        /* Attach background anim */
        // if (this.scene.player) this.animateBackground(this.scene.player);
        if (this.scene.player)
          this.animateBackground(this.scene.cameras.main.midPoint);
      }
}

export default subSandbox;