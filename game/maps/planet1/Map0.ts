import Game from "@/game/Game";
import MapCreator from "../sandbox/MapCreator";
import Player from "@/game/assets/Player";
import { GamePlayDataType } from "@/game/Types";
import colors from "@/game/assets/PlatformColors";
import { group } from "console";

class Map0 extends MapCreator {
   
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
            x: 100,
            y: 100,
            width: 9800,
            height: 1800,
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
          this.nextScene= "postal1_planeta1";
            this.postalCode = "postl1";
    }

    createMap(data: { level: number; lifes: number }) {
        this.mapContainer = this.scene.add.container();
        this.coin = this.scene.physics.add.group({ allowGravity: false });
        this.pisosBack = this.scene.physics.add.group({ allowGravity: false });
        this.flyingPiso = this.scene.physics.add.group({ allowGravity: false, immovable: true });
        this.portal = this.scene.physics.add.group({ allowGravity: false });

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
    
    this.backgroundsMiddle = this.createBgRow(100, this.cameraBounds.height+100, ["middleCombo", "middleCombo2", "middleCombo3", "middleCombo4"], width, 0.7),
    
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

        this.scene.player?.setDepth(9999999999999);

        const basePlatformsConfig = {
            withTextureToAbove: false,
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
            fix: -20,
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
            
            // frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        }

        const mapPlatforms = [
            {
                ...baseLargePlatformsConf,
                pos: { x: 0, y: this.worldSize.height - 200 },
                large: 20,
                group: this.floor
            },
            { ...baseDangerConf, pos: { x: 950, y:  this.worldSize.height - 250 }, width: 150, height: 150,
             patrol:{
                    patrolType: "LinealX",
                    distance: 50,
                    speed: 20,
                    attackInterval: 0,
                }
            },
            { ...basePlatformsConfig, pos: { x: 800, y:  this.worldSize.height - 400 } },
            { ...basePlatformsConfig, pos: { x: 1100, y:  this.worldSize.height - 550 } },
            { ...baseCristalConf, pos: { x: 1100, y:  this.worldSize.height - 650 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseCristalConf, pos: { x: 1500, y:  this.worldSize.height - 650 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            // {
            //     ...baseLargePlatformsConf,
            //     pos: { x: 1650, y: this.worldSize.height - 100 },
            //     width: {
            //         textureA: 90,
            //         textureB: 67,
            //         textureC: 115,
            //     },
            //     height: 127,
            //     large: 15,
            //     group: this.floor
            // },
            { ...basePlatformsConfig, pos: { x: 2025, y: this.worldSize.height - 500 } },
            { ...baseCristalConf, pos: { x: 2025, y: this.worldSize.height - 750 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            {
                ...baseLargePlatformsConf,
                pos: { x: 2700, y: this.worldSize.height - 400 },
                large: 10,
                group: this.floor
            },
            { ...baseDangerConf, pos: { x: 2800, y: this.worldSize.height - 450 }, width: 150, height: 150, 
                patrol:{
                    patrolType: "LinealX",
                    distance: 100,
                    speed: 50,
                    attackInterval: 0,
                }, 
            },
            { ...baseDangerConf, pos: { x: 3300, y: this.worldSize.height - 450 }, width: 150, height: 150,
                patrol:{
                    patrolType: "LinealX",
                    distance: 100,
                    speed: 50,
                    attackInterval: 0,
                }
            },
            { ...basePlatformsConfig, pos: { x: 3600, y: this.worldSize.height - 600 } },
            {
                ...baseLargePlatformsConf,
                pos: { x: 3900, y: this.worldSize.height - 800 },
                large: 15,
                group: this.floor
            },
            { ...basePlatformsConfig, pos: { x: 4100, y: this.worldSize.height - 1000 } },
            { ...baseCristalConf, pos: { x: 4100, y: this.worldSize.height - 1100 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },

            { ...baseDangerConf, pos: { x: 4100, y: this.worldSize.height - 850 }, width: 170, height: 170, 
                patrol:{
                    patrolType: "LinealX",
                    distance: 500,
                    speed: 150,
                    attackInterval: 0,
                }
            },
            //replace
            //{ ...baseFireballConf, pos: { x: 4800, y: this.worldSize.height - 1250 }, tween: { duration: 5000, repeat: -1, x: "-=1000", yoyo: true  }, rotated: true },
            { ...baseDangerConf, pos: { x: 4600, y: this.worldSize.height - 1250 }, width: 170, height: 170, 
                patrol:{
                    patrolType: "LinealX",
                    distance: 500,
                    speed: 80,
                    attackInterval: 0,
                }
            },
            { ...basePlatformsConfig, pos: { x: 4500, y: this.worldSize.height - 1000 } },
            { ...baseCristalConf, pos: { x: 4500, y: this.worldSize.height - 1100 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },

            { ...basePlatformsConfig, pos: { x: 5200, y: this.worldSize.height - 1000 } },
            { ...baseFireballConf, pos: { x: 5600, y:  0 }, tween: { duration: 5000, repeat: -1, y: "+=2000"}, rotated: false },
            { ...basePlatformsConfig, pos: { x: 5950, y: this.worldSize.height - 900 } },
            { ...baseFireballConf, pos: { x: 6300, y:  0 }, tween: { duration: 5000, repeat: -1, y: "+=2000"}, rotated: false },

            { ...baseCristalConf, pos: { x: 5750, y: this.worldSize.height - 1100 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            {
                ...baseLongPlatformsConf,
                pos: { x: 6500, y: this.worldSize.height - 1300 },
                large: 15,
                group: this.floor
            },
            { ...baseDangerConf, pos: { x: 6700, y: this.worldSize.height - 1350 }, width: 170, height: 170, 
                patrol:{
                    patrolType: "LinealX",
                    distance: 400,
                    speed: 200,
                    attackInterval: 0,
                }
            },
            { ...baseCristalConf, pos: { x: 6900, y: this.worldSize.height - 1500 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },

            { ...basePlatformsConfig, pos: { x: 6600, y: this.worldSize.height - 500 } },
            { ...baseCristalConf, pos: { x: 6800, y: this.worldSize.height - 800  }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            { ...basePlatformsConfig, pos: { x: 7000, y: this.worldSize.height - 500  } },
            { ...baseCristalConf, pos: { x: 7200, y: this.worldSize.height - 800  }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            { ...basePlatformsConfig, pos: { x: 7400, y: this.worldSize.height - 500  } },

            { ...baseCristalConf, pos: { x: 7800, y: this.worldSize.height - 1500  }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            { ...basePlatformsConfig, pos: { x: 8000, y: this.worldSize.height - 1100  } },
            { ...basePlatformsConfig, pos: { x: 8300, y: this.worldSize.height - 800  } },
            { ...baseCristalConf, pos: { x: 8300, y: this.worldSize.height - 900 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },

            { ...baseFireballConf, pos: { x: 7700, y:  0 }, tween: { duration: 5000, repeat: -1, y: "+=2000"}, rotated: false },
            { ...basePlatformsConfig, pos: { x: 8000, y: this.worldSize.height - 500  } },
            // { ...basePlatformsConfig, pos: { x: 8600, y: this.worldSize.height - 400  } },
            {
                ...baseLargePlatformsConf,
                pos: { x: 9300, y: this.worldSize.height - 500  },
                large: 20,
                group: this.floor
            },
            { ...baseDangerConf, pos: { x: 9100, y: this.worldSize.height - 550  }, width: 170, height: 170,
                patrol:{
                    patrolType: "LinealX",
                    distance: 350,
                    speed: 150,
                    attackInterval: 0,
                }
            },
            { type: "finalPortal", pos: { x: 9750, y: this.worldSize.height - 600  }, texture: "plataformaFinalP1", width: 100, height: 100, group: this.portal }

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

export default Map0;
