import Game from "@/game/Game";
import MapCreator from "../sandbox/MapCreator";
import Player from "@/game/assets/Player";
import { GamePlayDataType } from "@/game/Types";
import colors from "@/game/assets/PlatformColors";
import { group } from "console";
import { start } from "repl";

class Map2 extends MapCreator {
   
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
            height: 3000,
          };
          this.cameraBounds = {
            x: 200,
            y: 200,
            width: 9600,
            height: 2600,
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
            x: 650, //500
            y: this.worldSize.height - 800, //800
          };

        this.UIItemToGrab= "uiItemp3";
        this.UIItemScale= 0.3;
        this.player.setPlayerFlying(false);
        this.nextScene= "postal2_planeta3";
        this.planet = 3;
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
        this.player?.setPlayerWithTank(true);
        this.player?.setPlayerFlying(false);
        this.player?.tankGraphics?.clear()
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
            withTextureToAbove: true,
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
        const meteorshowerConf = {
            type: "meteorshower",
            quantity: 10,
            spriteSheet: "meteoritop3",
            texture: "meteoritop3",
            width: 100,
            height: 100,
            group: this.firegroup,
            scale: { width: 0.71, height: 0.71 },
        }
        const subLvl1Conf: GamePlayDataType = {
            level: 30201,//TO DO change to correct
            lifes: this.scene.lifes ? this.scene.lifes : 3,
            loadKey: ["Postales", "Cinemato1", "Cinemato2"],
            startingPositionFromOtherScene: {
                x: 0,
                y: 400,
            },
        }
        const cloudConfig = {
            type: "cloudgen",
            quantity: 6,
            clouds: ["nube1","nube2","nube3","nube4","nube5"],
            group: this.cloudsGroup,
            scale: { width: 0.5, height: 0.5 },
        }
        const mapPlatforms = [
            { ...cloudConfig, pos: { x: 0, y:  (this.cameraBounds.height + this.cameraBounds.y) - 800 } },
            {...baseLargePlatformsConf, pos: { x: 200, y: (this.cameraBounds.height + this.cameraBounds.y) - 400 },
                large:6,
                group: this.floor
            },
            { ...basePlatformsConfig, pos: { x: 900, y:  (this.cameraBounds.height + this.cameraBounds.y) - 1200 } },
            { ...basePlatformsConfig, pos: { x: 1000, y:  (this.cameraBounds.height + this.cameraBounds.y) - 400 } },
            { ...baseCristalConf, pos: { x: 1150, y: (this.cameraBounds.height + this.cameraBounds.y) - 650 }, group: this.coin, aura: 'auraTuto' },
            { ...baseCristalConf, pos: { x: 1200, y: (this.cameraBounds.height + this.cameraBounds.y) - 1200 }, group: this.coin, aura: 'auraTuto' },
            { ...basePlatformsConfig, pos: { x: 1100, y:  (this.cameraBounds.height + this.cameraBounds.y) - 1400 }, group: this.gravityTile, colors: [colors.gravity] },
            { ...basePlatformsConfig, pos: { x: 1100, y:  (this.cameraBounds.height + this.cameraBounds.y) - 2200 }, flipY: true },
            { ...baseCristalConf, pos: { x: 1400, y: (this.cameraBounds.height + this.cameraBounds.y) - 2000 }, group: this.coin, aura: 'auraTuto' },
            { ...basePlatformsConfig, pos: { x: 1400, y:  (this.cameraBounds.height + this.cameraBounds.y) - 800 } },
            { ...basePlatformsConfig, pos: { x: 1600, y:  (this.cameraBounds.height + this.cameraBounds.y) - 2200 } , rotate: true , inverted: true, group: this.rotationTile, colors: [colors.rotate] },
            {...baseLongPlatformsConf, pos: { x: 1950, y: (this.cameraBounds.height + this.cameraBounds.y) - 2200 },
                large: 10,
                group: this.floor,
                flipY: true
            },

            { ... baseLargePlatformsConf, pos:{ x: 2200, y: (this.cameraBounds.height + this.cameraBounds.y) - 1000 },
                large: 4,
                group: this.floor
            },
            { ...baseDangerConf, pos: { x: 2350, y: (this.cameraBounds.height + this.cameraBounds.y) - 1900 }, width: 150, height: 150, 
                patrol:{
                    patrolType: "LinealY",
                    distance: 250,
                    speed: 200,
                    attackInterval: 0,
                }, 
            },
            {...baseLongPlatformsConf, pos: { x: 2595, y: (this.cameraBounds.height + this.cameraBounds.y) - 1400 },
                large: 10,
                group: this.floor,
                flipY: true
            },
            { ...baseCristalConf, pos: { x: 2500, y: (this.cameraBounds.height + this.cameraBounds.y) - 1800 }, group: this.coin, aura: 'auraTuto' },
            
            { ...baseDangerConf, pos: { x: 2650, y: (this.cameraBounds.height + this.cameraBounds.y) - 1900 }, width: 150, height: 150, 
                patrol:{
                    patrolType: "LinealY",
                    distance: 250,
                    speed: 200,
                    attackInterval: 0,
                }, 
            },
            { ...baseDangerConf, pos: { x: 3100, y: (this.cameraBounds.height + this.cameraBounds.y) - 1150 }, width: 150, height: 150, 
                patrol:{
                    patrolType: "LinealY",
                    distance: 250,
                    speed: 200,
                    attackInterval: 0,
                }, 
            },
            { ...baseDangerConf, pos: { x: 3200, y: (this.cameraBounds.height + this.cameraBounds.y) - 1150 }, width: 150, height: 150, 
                patrol:{
                    patrolType: "LinealY",
                    distance: 250,
                    speed: 200,
                    attackInterval: 0,
                }, 
            },

            { ...basePlatformsConfig, pos: { x: 3300, y:  (this.cameraBounds.height + this.cameraBounds.y) - 2200 },inverted: true,group: this.fallingTile, colors: [colors.falling]  },
            { ...baseCristalConf, pos: { x: 3500, y: (this.cameraBounds.height + this.cameraBounds.y) - 1800 }, group: this.coin, aura: 'auraTuto' },
            { ...basePlatformsConfig, pos: { x: 3700, y:  (this.cameraBounds.height + this.cameraBounds.y) - 2200 },inverted: true,group: this.fallingTile, colors: [colors.falling]  },
            { ...baseCristalConf, pos: { x: 3900, y: (this.cameraBounds.height + this.cameraBounds.y) - 1800 }, group: this.coin, aura: 'auraTuto' },
            { ...basePlatformsConfig, pos: { x: 4100, y:  (this.cameraBounds.height + this.cameraBounds.y) - 2200 }, flipY: true},
            { ...basePlatformsConfig, pos: { x: 5000, y: (this.cameraBounds.height + this.cameraBounds.y) - 2200 } ,animation:{
                xAxis:{
                    xDistance:700,
                    xVel:150
                }}, flipY: true
            },
            { ...baseCristalConf, pos: { x: 5000, y: (this.cameraBounds.height + this.cameraBounds.y) - 1800 }, group: this.coin, aura: 'auraTuto' },
            { ...basePlatformsConfig, pos: { x: 5700, y:  (this.cameraBounds.height + this.cameraBounds.y) - 2200 } , rotate: false , inverted: false, group: this.rotationTile, colors: [colors.rotate], flipY: true },
            { ...basePlatformsConfig, pos: { x: 6200, y:  (this.cameraBounds.height + this.cameraBounds.y) - 2400 }, flipY: true},
            
            { ...baseCristalConf, pos: { x: 6200, y: (this.cameraBounds.height + this.cameraBounds.y) - 2330 }, group: this.invincible, texture: "shield", width: 140, height: 180,fix:-10,shield:"auraAnim", aura: 'auraTuto' },
            {...baseLongPlatformsConf, pos: { x: 6600, y: (this.cameraBounds.height + this.cameraBounds.y) - 2400 },
                large: 12,
                group: this.floor,
                flipY: true
            },
            {...baseLargePlatformsConf, pos: { x: 6600, y: (this.cameraBounds.height + this.cameraBounds.y) - 600 },
                large:15,
                group: this.floor
            },

            { ...baseDangerConf, pos: { x: 6800, y: (this.cameraBounds.height + this.cameraBounds.y) - 2350 }, width: 150, height: 150, 
                patrol:{
                    patrolType: "LinealX",
                    distance: 350,
                    speed: 400,
                    attackInterval: 0,
                }, 
            },

            { ...meteorshowerConf, pos: { x: 6800, y:  0 },quantity: 35},
            { ...meteorshowerConf, pos: { x: 7500, y:  0 },quantity: 35},
            { ...baseDangerConf, pos: { x: 7300, y: (this.cameraBounds.height + this.cameraBounds.y) - 2350 }, width: 150, height: 150, 
                patrol:{
                    patrolType: "LinealX",
                    distance: 350,
                    speed: 400,
                    attackInterval: 0,
                }, 
            },
            { ...basePlatformsConfig, pos: { x: 8000, y:  (this.cameraBounds.height + this.cameraBounds.y) - 2400 } , rotate: false, group: this.gravityTile, colors: [colors.gravity], flipY: true },
            { ...basePlatformsConfig, pos: { x: 6300, y:  (this.cameraBounds.height + this.cameraBounds.y) - 1000 } },
            { ...basePlatformsConfig, pos: { x: 5800, y:  (this.cameraBounds.height + this.cameraBounds.y) - 800 },group: this.fallingTile, colors: [colors.falling]  },
            { ...baseCristalConf, pos: { x: 5500, y: (this.cameraBounds.height + this.cameraBounds.y) - 700 }, group: this.coin, aura: 'auraTuto' },
            { ...basePlatformsConfig, pos: { x: 5300, y:  (this.cameraBounds.height + this.cameraBounds.y) - 700 },group: this.fallingTile, colors: [colors.falling]  },
            { ...baseCristalConf, pos: { x: 5200, y: (this.cameraBounds.height + this.cameraBounds.y) - 600 }, group: this.coin, aura: 'auraTuto' },
            { ...basePlatformsConfig, pos: { x: 4800, y:  (this.cameraBounds.height + this.cameraBounds.y) - 600 },group: this.fallingTile, colors: [colors.falling]  },
            { ...baseCristalConf, pos: { x: 4600, y: (this.cameraBounds.height + this.cameraBounds.y) - 600 }, group: this.coin, aura: 'auraTuto' },
            {...baseLongPlatformsConf, pos: { x: 3500, y: (this.cameraBounds.height + this.cameraBounds.y) - 400 },
                large: 10,
                group: this.floor
            },
            { ...basePlatformsConfig, pos: { x: 2900, y:  (this.cameraBounds.height + this.cameraBounds.y) - 400 } , rotate: false, group: this.gravityTile, colors: [colors.gravity] },
            
            { type: "subPortal",  x: 3800, y: (this.cameraBounds.height + this.cameraBounds.y) - 800, version: 1, sameScene: false, group: this.teleport, otherSceneConf: subLvl1Conf },
            
            { type: "finalPortal", pos: { x: 2800, y: (this.cameraBounds.height + this.cameraBounds.y) - 1290  }, texture: "cuevap3", width: 100, height: 100, group: this.portal,flipY:true }

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
        this.scene.UICamera?.ignore(this.firegroup!)

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

export default Map2;
