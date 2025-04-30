import Game from "@/game/Game";
import MapCreator from "../sandbox/MapCreator";
import Player from "@/game/assets/Player";
import { GamePlayDataType } from "@/game/Types";
import colors from "@/game/assets/PlatformColors";

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
            width: 11800,
            height: 2000,
          };
          this.cameraBounds = {
            x: 0,
            y: 100,
            width: 11800,
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
            x: 6900, //500
            y: this.worldSize.height - 900, //800
          };
    }

    createMap(data: { level: number; lifes: number }) {
        this.mapContainer = this.scene.add.container();
        this.coin = this.scene.physics.add.group({ allowGravity: false });
        this.pisosBack = this.scene.physics.add.group({ allowGravity: false });
        this.flyingPiso = this.scene.physics.add.group({ allowGravity: false, immovable: true });
        this.portal = this.scene.physics.add.group({ allowGravity: false });

        const { width, height } = this.ratioReference;
        const downScaledMiddleWidth = width * 0.7;
        const downScaledFrontWidth = width * 0.5;

        const bgContainerArr = [
            this.scene.add.image(0, 0, "gradient").setOrigin(0.5),
            this.scene.add.image(0, 0, "stars").setOrigin(0.5),
            this.scene.add.image(0, 300, "curvedVector").setOrigin(0.5),
          ]
          const bgContainer = this.scene.add.container(0, 0, bgContainerArr);
          this.scene.UICamera?.ignore(bgContainer);
          const newMainCamera = this.scene.cameras.add(0, 0, window.innerWidth, window.innerHeight, true, "mainCamera");
          // this.scene.children.sendToBack(bgContainer);
          this.scene.cameras.main.ignore(bgContainer);

        this.backgroundsMiddle = [
            this.scene.add.image(-this.startingPoint.x, this.cameraBounds.height + 100, "middleCombo").setOrigin(0, 1).setScale(0.7),
            this.scene.add.image(-this.startingPoint.x + downScaledMiddleWidth, this.cameraBounds.height + 100, "middleCombo2").setOrigin(0, 1).setScale(0.7),
            this.scene.add.image(-this.startingPoint.x + (downScaledMiddleWidth * 2), this.cameraBounds.height + 100, "middleCombo3").setOrigin(0, 1).setScale(0.7),
            this.scene.add.image(-this.startingPoint.x + (downScaledMiddleWidth * 3), this.cameraBounds.height + 100, "middleCombo4").setOrigin(0, 1).setScale(0.7),
            this.scene.add.image(-this.startingPoint.x + (downScaledMiddleWidth * 4), this.cameraBounds.height + 100, "middleCombo2").setOrigin(0, 1).setScale(0.7),
            this.scene.add.image(-this.startingPoint.x + (downScaledMiddleWidth * 5), this.cameraBounds.height + 100, "middleCombo2").setOrigin(0, 1).setScale(0.7),
        ]

        this.backgroundsFront = [
            this.scene.add.image(this.startingPoint.x + this.backSize.width - 15, this.cameraBounds.height + 100, "montaña3"),
            this.scene.add.image(this.startingPoint.x - 70, this.cameraBounds.height + 100, "montaña5"),
            this.scene.add.image(1200, this.cameraBounds.height + 100, "montaña3")
        ]

        this.createBackgrounds(this.backgroundsBack, this.backgroundsMiddle, this.backgroundsFront);

        this.scene.UICamera?.ignore(this.mapContainer);
        this.scene.UICamera?.ignore(this.frontContainer);

        this.scene.player?.setDepth(9999999999999);

        const basePlatformsConfig = {
            withTextureToAbove: true,
            texture: "pSimple1p1",
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
        const otherSceneConf: GamePlayDataType = {
            level: 20101,
            lifes: this.scene.lifes ? this.scene.lifes : 3,
            loadKey: ["Postales", "Cinemato1", "Cinemato2"],
            startingPositionFromOtherScene: {
              x: 300,
              y: 800,
            },
        }

        const mapPlatforms = [
            {
                ...baseLargePlatformsConf,
                pos: { x: 0, y: this.worldSize.height - 400 },
                large: 8,
                group: this.floor
            },
            { ...baseFireballConf, pos: { x: 500, y: this.worldSize.height - 100 }, tween: { duration: 2000, repeat: -1, y: "-=1000", yoyo: false  }, rotated: false },


            {
                ...baseLargePlatformsConf,
                pos: { x: 750, y: this.worldSize.height - 200 },
                large: 13,
                group: this.floor
            },
            { ...baseDangerConf, pos: { x: 800, y: this.worldSize.height - 250 }, width: 170, height: 170, patrol:{
                    patrolType: "LinealX",
                    distance: 600,
                    speed: 200,
                    attackInterval: 0,
                }
            },
            { ...baseDangerConf, pos: { x: 1200, y: this.worldSize.height - 250 }, width: 170, height: 170, patrol:{
                    patrolType: "LinealX",
                    distance: 700,
                    speed: 250,
                    attackInterval: 0,
                }
            },
            { ...baseCristalConf, pos: { x: 1100, y: this.worldSize.height - 600 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseCristalConf, pos: { x: 1650, y: this.worldSize.height - 600 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },


            {
                ...baseLargePlatformsConf,
                pos: { x: 2000, y: this.worldSize.height - 400 },
                large: 8,
                group: this.floor
            },
            { ...baseFireballConf, pos: { x: 2400, y: this.worldSize.height - 100 }, tween: { duration: 2000, repeat: -1, y: "-=1000", yoyo: false  }, rotated: false },


            { ...basePlatformsConfig, pos: { x: 3100, y:  this.worldSize.height - 600 } },
            { ...baseFireballConf, pos: { x: 3300, y: this.worldSize.height - 200 }, tween: { duration: 2000, repeat: -1, y: "-=1200", yoyo: false  }, rotated: false },

            { ...basePlatformsConfig, pos: { x: 3500, y: this.worldSize.height - 800 }, colors: [colors.falling], group: this.fallingTile },
            { ...baseCristalConf, pos: { x: 3500, y: this.worldSize.height - 900 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },

            { ...basePlatformsConfig, pos: { x: 3800, y: this.worldSize.height - 600 }, colors: [colors.falling], group: this.fallingTile },
            { ...baseCristalConf, pos: { x: 3800, y: this.worldSize.height - 700 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },

            { ...basePlatformsConfig, pos: { x: 4200, y: this.worldSize.height - 600 }, colors: [colors.falling], group: this.fallingTile },
            { ...baseCristalConf, pos: { x: 4200, y: this.worldSize.height - 700 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },

            { ...basePlatformsConfig, pos: { x: 4600, y: this.worldSize.height - 600 }, colors: [colors.falling], group: this.fallingTile },
            { ...baseCristalConf, pos: { x: 4600, y: this.worldSize.height - 700 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },

            { ...basePlatformsConfig, pos: { x: 4000, y: this.worldSize.height - 900 }, colors: [colors.falling], group: this.fallingTile },
            { ...baseCristalConf, pos: { x: 4000, y: this.worldSize.height - 1000 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },

            { ...basePlatformsConfig, pos: { x: 4400, y: this.worldSize.height - 900 }, colors: [colors.falling], group: this.fallingTile },
            { ...baseCristalConf, pos: { x: 4400, y: this.worldSize.height - 1000 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },

            
            {
                ...baseLargePlatformsConf,
                pos: { x: 4900, y: this.worldSize.height - 700 },
                large: 5,
                group: this.floor
            },
            { ...baseDangerConf, pos: { x: 5000, y: this.worldSize.height - 750 }, width: 170, height: 170 },
            { ...baseDangerConf, pos: { x: 5150, y: this.worldSize.height - 750 }, width: 170, height: 170 },
            { ...baseDangerConf, pos: { x: 5300, y: this.worldSize.height - 750 }, width: 170, height: 170 },
            
            {
                ...baseLargePlatformsConf,
                pos: { x: 5350, y: this.worldSize.height - 500 },
                large: 8,
                group: this.floor
            },
            { ...baseCristalConf, pos: { x: 5600, y: this.worldSize.height - 800 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseCristalConf, pos: { x: 5750, y: this.worldSize.height - 1000 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseCristalConf, pos: { x: 5900, y: this.worldSize.height - 800 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },


            {
                ...basePlatformsConfig, pos: { x: 6100, y: this.worldSize.height - 900 }, animation: {
                    yAxis: {
                        yDistance: 500,
                        yVel: 400
                    }
                }
            },

            {
                ...baseLargePlatformsConf,
                pos: { x: 6400, y: this.worldSize.height - 1400 },
                large: 7,
                group: this.floor,
                withTextureToAbove: false,
            },
            { type: "subPortal",  x: 6600, y: this.worldSize.height - 1500, version: 1, sameScene: false, group: this.teleport, otherSceneConf: otherSceneConf },

            {
                ...baseLargePlatformsConf,
                pos: { x: 6800, y: this.worldSize.height - 500 },
                large: 10,
                group: this.floor
            },
            { ...baseCristalConf, pos: { x: 7000, y: this.worldSize.height - 700 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseCristalConf, pos: { x: 7300, y: this.worldSize.height - 900 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseCristalConf, pos: { x: 7600, y: this.worldSize.height - 700 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },

            
            {
                ...baseLargePlatformsConf,
                pos: { x: 8200, y: this.worldSize.height - 600 },
                large: 12,
                group: this.floor,
                withTextureToAbove: false,
            },
            { ...baseDangerConf, pos: { x: 8400, y: this.worldSize.height - 650 }, width: 170, height: 170, patrol:{
                patrolType: "LinealY",
                distance: 300,
                speed: 100,
                attackInterval: 0,
              }
            },
            { ...baseCristalConf, pos: { x: 8550, y: this.worldSize.height - 700 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseCristalConf, pos: { x: 8650, y: this.worldSize.height - 700 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseDangerConf, pos: { x: 8800, y: this.worldSize.height - 650 }, width: 170, height: 170, patrol:{
                patrolType: "LinealY",
                distance: 300,
                speed: 150,
                attackInterval: 0,
              }
            },
            { ...baseCristalConf, pos: { x: 8950, y: this.worldSize.height - 700 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseCristalConf, pos: { x: 9050, y: this.worldSize.height - 700 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseDangerConf, pos: { x: 9200, y: this.worldSize.height - 650 }, width: 170, height: 170, patrol:{
                patrolType: "LinealY",
                distance: 300,
                speed: 200,
                attackInterval: 0,
              }
            },


            {
                ...baseLargePlatformsConf,
                pos: { x: 8300, y: this.worldSize.height - 1000 },
                large: 10,
                group: this.floor,
                withTextureToAbove: false,
            },
            { ...basePlatformsConfig, pos: { x: 9900, y:  this.worldSize.height - 600 } },
            { ...baseCristalConf, pos: { x: 10200, y: this.worldSize.height - 400 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },

            { ...basePlatformsConfig, pos: { x: 10500, y:  this.worldSize.height - 600 } },
            { ...baseCristalConf, pos: { x: 10800, y: this.worldSize.height - 400 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },


            {
                ...baseLargePlatformsConf,
                pos: { x: 11100, y: this.worldSize.height - 400 },
                large: 7,
                group: this.floor,
            },
            { type: "finalPortal", pos: { x: 11550, y: this.worldSize.height - 500 }, texture: "plataformaFinalP1", width: 100, height: 100, group: this.portal }

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
        if (this.scene.player)
            if (this.scene.initialScroll.x === 0 && this.scene.initialScroll.y === 0) this.setInitialScroll(this.scene.cameras.main.scrollX, this.scene.cameras.main.scrollY);
            this.animateBackground();
    }

}

export default Map1;
