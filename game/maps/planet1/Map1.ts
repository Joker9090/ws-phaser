import Game from "@/game/Game";
import MapCreator from "../sandbox/MapCreator";
import Player from "@/game/assets/Player";
import { GamePlayDataType } from "@/game/Types";
import colors from "@/game/assets/PlatformColors";
import { group } from "console";
import { DangerConfig } from "@/game/assets/Danger";

class Map1 extends MapCreator {
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
            height: 2000,
          };
          this.cameraBounds = {
            x: 200,
            y: 200,
            width: 9600,
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
          

    }

    createMap(data: { level: number; lifes: number }) {
        this.mapContainer = this.scene.add.container();
        this.coin = this.scene.physics.add.group({ allowGravity: false });
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
        const { width: farWidth, height: farHeight } = this.farBackgroundReference;
        const downScaledMiddleWidth = width * 0.7;
        const downScaledFrontWidth = width * 0.5;
    
        this.backgroundsBack = [
          this.scene.add.image(0, 0, "gradient").setOrigin(0.5),
          this.scene.add.image(0, 0, "stars").setOrigin(0.5),
          this.scene.add.image(0, 300, "curvedVector").setOrigin(0.5),
        ]
        
        this.backgroundsMiddle = this.createBgRow(200, this.cameraBounds.height+200, ["middleCombo", "middleCombo2", "middleCombo3", "middleCombo4"], width, 0.7),
        
        this.backgroundsFront = [
          this.scene.add.image(-this.startingPoint.x, this.cameraBounds.height+200, "frontCombo").setOrigin(0, 1).setScale(0.5),
          this.scene.add.image(-this.startingPoint.x + downScaledFrontWidth, this.cameraBounds.height+200, "frontCombo2").setOrigin(0, 1).setScale(0.5),
          this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 2), this.cameraBounds.height+200, "frontCombo3").setOrigin(0, 1).setScale(0.5),
          this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 3), this.cameraBounds.height+200, "frontCombo4").setOrigin(0, 1).setScale(0.5),
          this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 4), this.cameraBounds.height+200, "frontCombo2").setOrigin(0, 1).setScale(0.5),
          this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 5), this.cameraBounds.height+200, "frontCombo2").setOrigin(0, 1).setScale(0.5),
        ]
        
        this.createBackgrounds(this.backgroundsBack, this.backgroundsMiddle, this.backgroundsFront);
        
        const bgContainer = this.scene.add.container(0, 0, this.backgroundsBack);
        this.scene.UICamera?.ignore(bgContainer);
        this.scene.cameras.main.ignore(bgContainer);

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
            withTextureToAbove: true,
            texture: "plataformaNuevaA",
            textureA: "platform_izq",
            textureB: "platform_center",
            textureC: "platform_der",
            textureFill: ["fill_texture", "fill_texture2", "fill_texture3", "fill_texture4"],
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
        const baseLongPlatformsConf = {
            withTextureToAbove: false,
            texture: "plataformaNuevaA",
            textureA: "platform_izq",
            textureB: "platform_center",
            textureC: "platform_der",
            textureFill: ["fill_texture", "fill_texture2", "fill_texture3", "fill_texture4"],
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

        const baseDangerConf = {
            type: "danger",
            texture: "Enemy",
            scale: { width: 0.6, height: 0.6 },
            width: 170,
            height: 170,
            attackSpriteSheet: "EnemyAttack",
            particleSpriteSheet: "EnemyParticles",
            group: this.obstacle,
            color: parseInt('0x00feff'),
        }

        const baseFireballConf = {
            type: "fireball",
            spriteSheet: "meteorito",
            texture: "meteorito",
            width: 100,
            height: 100,
            group: this.firegroup,
            scale: { width: 0.5, height: 0.5 },
        }

        const mapPlatforms = [
            {
                ...baseLargePlatformsConf,
                pos: { x: 0, y: (this.cameraBounds.height + this.cameraBounds.y) - 200 },
                large: 15,
                group: this.floor
            },
            { ...baseCristalConf, pos: { x: 1100, y:  (this.cameraBounds.height + this.cameraBounds.y) - 500 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            {
                ...baseLongPlatformsConf,
                pos: { x: 1300, y: (this.cameraBounds.height + this.cameraBounds.y) - 400 },
                large: 20,
                group: this.floor
            },
            { ...baseDangerConf, pos: { x: 1450, y: (this.cameraBounds.height + this.cameraBounds.y) - 450 }, width: 170, height: 170, patrol:{
                patrolType: "LinealX",
                distance: 500,
                speed: 150,
                attackInterval: 0,
              } },
            { ...basePlatformsConfig, pos: { x: 2100, y: (this.cameraBounds.height + this.cameraBounds.y) - 600 } },
            { ...baseCristalConf, pos: { x: 2100, y:  (this.cameraBounds.height + this.cameraBounds.y) - 700 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            { ...basePlatformsConfig, pos: { x: 2500, y: (this.cameraBounds.height + this.cameraBounds.y) - 800 } },
            { ...baseCristalConf, pos: { x: 2800, y:  (this.cameraBounds.height + this.cameraBounds.y) - 1000 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseFireballConf, pos: { x: 2900, y:  0 }, tween: { duration: 5000, repeat: -1, y: "+=2000"}, rotated: false },
            { ...basePlatformsConfig, pos: { x: 3100, y: (this.cameraBounds.height + this.cameraBounds.y) - 800 } },
            { ...baseCristalConf, pos: { x: 3600, y:  (this.cameraBounds.height + this.cameraBounds.y) - 900 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            {
                ...basePlatformsConfig, pos: { x: 3600, y: (this.cameraBounds.height + this.cameraBounds.y) - 800 }, animation: {
                    xAxis: {
                        xDistance: 200,
                        xVel: 100
                    }
                }
            },
            {
                ...baseLongPlatformsConf,
                pos: { x: 4200, y: (this.cameraBounds.height + this.cameraBounds.y) - 800 },
                large: 10,
                group: this.floor
            },
            { ...baseDangerConf, pos: { x: 4250, y: (this.cameraBounds.height + this.cameraBounds.y) - 850 }, width: 170, height: 170, patrol:{
                patrolType: "LinealX",
                distance: 400,
                speed: 150,
                attackInterval: 0,
              }, },
            { ...baseCristalConf, pos: { x: 4375, y: (this.cameraBounds.height + this.cameraBounds.y) - 1050 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            {
                ...basePlatformsConfig, pos: { x: 5500, y: (this.cameraBounds.height + this.cameraBounds.y) - 600 }, animation: {
                    xAxis: {
                        xDistance: 200,
                        xVel: 100
                    }
                }
            },
            { ...baseCristalConf, pos: { x: 5050, y: (this.cameraBounds.height + this.cameraBounds.y) - 1050 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            //REPLACE
            //{ ...baseFireballConf, pos: { x: 5200, y: (this.cameraBounds.height + this.cameraBounds.y) - 800 }, tween: { duration: 2000, repeat: -1, x: "-=500", yoyo: true  }, rotated: true },
            { ...baseDangerConf, pos: { x: 5300, y: (this.cameraBounds.height + this.cameraBounds.y) - 600 }, width: 170, height: 170, 
                patrol:{
                    patrolType: "LinealY",
                    distance: 400,
                    speed:120,
                    attackInterval: 0,
                }
            },
            {
                ...basePlatformsConfig, pos: { x: 5800, y: (this.cameraBounds.height + this.cameraBounds.y) - 600 }, animation: {
                    xAxis: {
                    xDistance: 200,
                    xVel: 100
                    }
                }
            },
            // {
            //     ...basePlatformsConfig, pos: { x: 5800, y: (this.cameraBounds.height + this.cameraBounds.y) - 400 }, animation: {
            //         yAxis: {
            //             yDistance: 600,
            //             yVel: 100
            //         }
            //     }
            // },
            { ...baseCristalConf, pos: { x: 6000, y: (this.cameraBounds.height + this.cameraBounds.y) - 1000 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            //replace
            //{ ...baseFireballConf, pos: { x: 6900, y: (this.cameraBounds.height + this.cameraBounds.y) - 900 }, tween: { duration: 1500, repeat: -1, x: "-=500", yoyo: true  }, rotated: true },
            { ...baseDangerConf, pos: { x: 6900, y: (this.cameraBounds.height + this.cameraBounds.y) - 900 }, width: 170, height: 170, 
                patrol:{
                    patrolType: "LinealX",
                    distance: 200,
                    speed: 80,
                    attackInterval: 0,
                }
            },
            {
                ...baseLargePlatformsConf,
                pos: { x: 6300, y: (this.cameraBounds.height + this.cameraBounds.y) - 800 },
                large: 10,
                group: this.floor
            },
            { ...baseCristalConf, pos: { x: 6700, y: (this.cameraBounds.height + this.cameraBounds.y) - 1100 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            {
                ...basePlatformsConfig, pos: { x: 7400, y: (this.cameraBounds.height + this.cameraBounds.y) - 700 }, animation: {
                    yAxis: {
                        yDistance: 600,
                        yVel: 250
                    }
                }
            },
            { ...baseCristalConf, pos: { x: 7600, y: (this.cameraBounds.height + this.cameraBounds.y) - 1300 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            {
                ...basePlatformsConfig, pos: { x: 7800, y: (this.cameraBounds.height + this.cameraBounds.y) - 700 }, animation: {
                    yAxis: {
                        yDistance: 500,
                        yVel: 200
                    }
                }
            },
            { ...baseCristalConf, pos: { x: 8000, y: (this.cameraBounds.height + this.cameraBounds.y) - 1300 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            {
                ...basePlatformsConfig, pos: { x: 8200, y: (this.cameraBounds.height + this.cameraBounds.y) - 900 }, animation: {
                    yAxis: {
                        yDistance: 800,
                        yVel: 400
                    }
                }
            },
            { ...baseFireballConf, pos: { x: 8400, y:0 }, tween: { duration: 5000, repeat: -1, y: "+=2000"}, rotated: false },

            { ...baseDangerConf, pos: { x: 8800, y: (this.cameraBounds.height + this.cameraBounds.y) - 1250 }, width: 170, height: 170, 
                patrol:{
                    patrolType: "LinealY",
                    distance: 100,
                    speed: 80,
                    attackInterval: 0,
                }
            },
            {
                ...baseLongPlatformsConf,
                pos: { x: 8700, y: (this.cameraBounds.height + this.cameraBounds.y) - 1200 },
                large: 10,
                group: this.floor
            },
            { ...baseCristalConf, pos: { x: 8950, y: (this.cameraBounds.height + this.cameraBounds.y) - 1300 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseDangerConf, pos: { x: 9100, y: (this.cameraBounds.height + this.cameraBounds.y) - 1250 }, width: 170, height: 170,
                patrol:{
                    patrolType: "LinealY",
                    distance: 100,
                    speed: 80,
                    attackInterval: 0,
                }
            },

            {
                ...baseLargePlatformsConf,
                pos: { x: 8900, y: (this.cameraBounds.height + this.cameraBounds.y) - 300 },
                large: 25,
                group: this.floor
            },
            { ...baseCristalConf, pos: { x: 9100, y: (this.cameraBounds.height + this.cameraBounds.y) - 700 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            { type: "finalPortal", pos: { x: 9600, y: (this.cameraBounds.height + this.cameraBounds.y) - 400 }, texture: "plataformaFinalP1", width: 100, height: 100, group: this.portal }

        ]
        this.createPlatforms(mapPlatforms)

        this.scene.UICamera?.ignore(this.floor!);
        this.scene.UICamera?.ignore(this.mapContainer)
        this.scene.UICamera?.ignore(this.frontContainer)
        this.scene.UICamera?.ignore(this.backContainer)
        this.scene.UICamera?.ignore(this.middleContainer)
        this.scene.UICamera?.ignore(this.frontContainer)
        this.scene.UICamera?.ignore(this.coin)
        this.scene.UICamera?.ignore(this.pisosBack)
        this.scene.UICamera?.ignore(this.gravityTile!)

        this.scene.UICamera?.ignore(this.backContainer)
        this.scene.UICamera?.ignore(this.middleContainer)
        this.scene.UICamera?.ignore(this.frontContainer)

        this.cameraIgnore()
    }

    update() {
        /* Attach background anim */
        // if (this.scene.player) this.animateBackground(this.scene.player);
        if (this.scene.player)
            if (this.scene.initialScroll.x === 0 && this.scene.initialScroll.y === 0) this.setInitialScroll(this.scene.cameras.main.scrollX, this.scene.cameras.main.scrollY);
            this.animateBackground();
    }

}

export default Map1;
