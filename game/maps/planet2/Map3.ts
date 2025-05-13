import Game from "@/game/Game";
import MapCreator from "../sandbox/MapCreator";
import Player from "@/game/assets/Player";
import { GamePlayDataType } from "@/game/Types";
import colors from "@/game/assets/PlatformColors";
import { group } from "console";

class Map3 extends MapCreator {
   
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
        this.player.setPlayerFlying(false);
        this.player.tankGraphics?.clear();

        this.worldSize = {
            width: 10000,
            height: 3000,
          };
          this.cameraBounds = {
            x: 0,
            y: 100,
            width: 10000,
            height: 2800,
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
            y: this.worldSize.height - 1200, //800
          };
          this.UIItemToGrab="comida";
    }

    createMap(data: { level: number; lifes: number }) {
        this.mapContainer = this.scene.add.container();
        this.coin = this.scene.physics.add.group({ allowGravity: false });
        this.pisosBack = this.scene.physics.add.group({ allowGravity: false });
        this.flyingPiso = this.scene.physics.add.group({ allowGravity: false, immovable: true });
        this.portal = this.scene.physics.add.group({ allowGravity: false });
        this.player?.setPlayerWithTank(true);
        this.player?.setPlayerFlying(false);
        this.player?.tankGraphics?.clear()
        // const backImage = this.scene.textures.get("background0P1").getSourceImage()
        // this.backSize = { width: backImage.width, height: backImage.height }
        this.loseConfig=[
            { positions: { x: this.startingPoint.x , y: this.startingPoint.y },
              cameraDirection: "NORMAL",
              PlayerDirection: "NORMAL",
              gravityDown: true
              ,
            },
          ]
        const { width, height } = this.ratioReference;
    const { width: farWidth, height: farHeight } = this.farBackgroundReference;
    const downScaledMiddleWidth = width * 0.7;
    const downScaledFrontWidth = width * 0.5;

    this.backgroundsBack = [
      this.scene.add.image(0, 0, "p1backgroundNoche").setOrigin(0.5),
      this.scene.add.image(0, 0, "p1Stars").setOrigin(0.5),
      this.scene.add.image(0, 0, "p1capaOscuridad").setOrigin(0.5),
    ]
    
    /*this.backgroundsMiddle = [
      this.scene.add.image(-this.startingPoint.x, this.cameraBounds.height+100, "middleCombo").setOrigin(0, 1).setScale(0.7),
      this.scene.add.image(-this.startingPoint.x + downScaledMiddleWidth, this.cameraBounds.height+100, "middleCombo2").setOrigin(0, 1).setScale(0.7),
      this.scene.add.image(-this.startingPoint.x + (downScaledMiddleWidth * 2), this.cameraBounds.height+100, "middleCombo3").setOrigin(0, 1).setScale(0.7),
      this.scene.add.image(-this.startingPoint.x + (downScaledMiddleWidth * 3), this.cameraBounds.height+100, "middleCombo4").setOrigin(0, 1).setScale(0.7),
      this.scene.add.image(-this.startingPoint.x + (downScaledMiddleWidth * 4), this.cameraBounds.height+100, "middleCombo2").setOrigin(0, 1).setScale(0.7),
      this.scene.add.image(-this.startingPoint.x + (downScaledMiddleWidth * 5), this.cameraBounds.height+100, "middleCombo2").setOrigin(0, 1).setScale(0.7),
      this.scene.add.image(-this.startingPoint.x + (downScaledMiddleWidth * 6), this.cameraBounds.height+100, "middleCombo").setOrigin(0, 1).setScale(0.7),
      this.scene.add.image(-this.startingPoint.x + (downScaledMiddleWidth * 7), this.cameraBounds.height+100, "middleCombo2").setOrigin(0, 1).setScale(0.7),
      this.scene.add.image(-this.startingPoint.x + (downScaledMiddleWidth * 8), this.cameraBounds.height+100, "middleCombo3").setOrigin(0, 1).setScale(0.7),
      this.scene.add.image(-this.startingPoint.x + (downScaledMiddleWidth * 9), this.cameraBounds.height+100, "middleCombo4").setOrigin(0, 1).setScale(0.7),
    ]*/
    
    this.backgroundsFront = [
          this.scene.add.image(-this.startingPoint.x, this.cameraBounds.height+100, "montaña1p1").setOrigin(0, 1).setScale(0.5),
          this.scene.add.image(-this.startingPoint.x + downScaledFrontWidth, this.cameraBounds.height+100, "montaña2p1").setOrigin(0, 1).setScale(0.5),
          this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 2), this.cameraBounds.height+100, "huesoFrontp1").setOrigin(0, 1).setScale(0.5),
          this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 3), this.cameraBounds.height+100, "montaña4p1").setOrigin(0, 1).setScale(0.5),
          this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 4), this.cameraBounds.height+100, "montaña5p1").setOrigin(0, 1).setScale(0.5),
          this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 5), this.cameraBounds.height+100, "montaña3p1").setOrigin(0, 1).setScale(0.5),
        ]
    this.backgroundsMiddle = this.createBgRow(100, this.cameraBounds.height+100, ["frontground1p1", "middleCombo2", "frontground1p1", "middleCombo4"], width, 0.7),
    
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

        const baseLargePlatformsConf = {
            withTextureToAbove: true,
            texture: "plataformaNuevaA",
            textureA: "platform_izq",
            textureB: "platform_center",
            textureC: "platform_der",
            textureFill: ["fill_texture", "fill_texture2", "fill_texture3"],
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
            //fix: 10,
        }

        const baseDangerConf = {
            type: "danger",
            texture: "Enemy",
            scale: { width: 0.6, height: 0.6 },
            width: 150,
            height: 150,
            attackSpriteSheet: "EnemyAttack",
            particleSpriteSheet: "EnemyParticles",
            group: this.obstacle,
            color:0xff9600, 
        }

        const baseFireballConf = {
            type: "fireball",
            spriteSheet: "meteoritop1",
            texture: "meteoritop1",
            width: 100,
            height: 100,
            group: this.firegroup,
            scale: { width: 0.5, height: 0.5 },
            
            // frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        }
        const subLvl1Conf: GamePlayDataType = {
            level: 20301,
            lifes: this.scene.lifes ? this.scene.lifes : 3,
            loadKey: ["Postales", "Cinemato1", "Cinemato2"],
            startingPositionFromOtherScene: {
                x: 0,
                y: 400,
            },
        }
        const subLvl2Conf: GamePlayDataType = {
            level: 20301,
            lifes: this.scene.lifes ? this.scene.lifes : 3,
            loadKey: ["Postales", "Cinemato1", "Cinemato2"],
            startingPositionFromOtherScene: {
                x: 0,
                y: 800,
            },
        }
        const mapPlatforms = [
            {...baseLargePlatformsConf, pos: { x: 0, y: this.worldSize.height - 200 }, large: 10,group: this.floor},
            { ...baseCristalConf, pos: { x: 90, y:  this.worldSize.height - 400 }, group: this.coin, texture: "comida", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseCristalConf, pos: { x: 90, y:  this.worldSize.height - 600 }, group: this.coin, texture: "comida", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseCristalConf, pos: { x: 90, y:  this.worldSize.height - 800 }, group: this.coin, texture: "comida", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseCristalConf, pos: { x: 290, y:  this.worldSize.height - 400 }, group: this.coin, texture: "comida", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseCristalConf, pos: { x: 290, y:  this.worldSize.height - 600 }, group: this.coin, texture: "comida", width: 140, height: 180, aura: 'auraTuto' },

            { ...baseLongPlatformsConf, pos: { x: 0, y:  this.worldSize.height - 1000 },large: 20, },
            { ...baseDangerConf, pos: { x: 950, y:  this.worldSize.height - 1070 }, width: 150, height: 150 ,
                patrol:{
                patrolType:"LinealX",
                distance:250,
                speed: 80,
                attackInterval:0,
            }},
            { ...baseCristalConf, pos: { x: 950, y:  this.worldSize.height - 1400 }, group: this.coin, texture: "comida", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseDangerConf, pos: { x: 1350, y:  this.worldSize.height - 1070 }, width: 150, height: 150,
                patrol:{
                patrolType:"LinealX",
                distance:250,
                speed: 80,
                attackInterval:0,
            } },
            { ...baseCristalConf, pos: { x: 1600, y:  this.worldSize.height - 1400 }, group: this.coin, texture: "comida", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseDangerConf, pos: { x: 1750, y:  this.worldSize.height - 1070 }, width: 150, height: 150 ,
                patrol:{
                patrolType:"LinealX",
                distance:250,
                speed: 80,
                attackInterval:0,
            }},
            { ...baseCristalConf, pos: { x: 2250, y:  this.worldSize.height - 1400 }, group: this.coin, texture: "comida", width: 140, height: 180, aura: 'auraTuto' },
            { ...basePlatformsConfig, pos: { x: 1750, y: this.worldSize.height - 400 }, 
                animation: {
                    xAxis: {
                        xDistance: 300,
                        xVel: 80
                    }
            }},
            { ...basePlatformsConfig, pos: { x: 2650, y: this.worldSize.height - 1200 }, group: this.fallingTile },
            { ...baseCristalConf, pos: { x: 2650, y:  this.worldSize.height - 1400 }, group: this.coin, texture: "comida", width: 140, height: 180, aura: 'auraTuto' },        
            { ...basePlatformsConfig, pos: { x: 2550, y: this.worldSize.height - 400 } } ,
            { ...basePlatformsConfig, pos: { x: 3000, y: this.worldSize.height - 1200 } },
            { ...baseCristalConf, pos: { x: 3000, y:  this.worldSize.height - 1400 }, group: this.coin, texture: "comida", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseLongPlatformsConf, pos: { x: 3300, y:  this.worldSize.height - 1000 },large: 10},
            { ...baseDangerConf, pos: { x: 3400, y:  this.worldSize.height - 1070 }, width: 150, height: 150 ,
                patrol:{
                patrolType:"LinealX",
                distance:350,
                speed: 80,
                attackInterval:0,
            }},
            { ...baseDangerConf, pos: { x: 3800, y:  this.worldSize.height - 1070 }, width: 150, height: 150 ,
                patrol:{
                patrolType:"LinealX",
                distance:150,
                speed: 80,
                attackInterval:0,
            }},
            
            { ...baseCristalConf, pos: { x: 2650, y:  this.worldSize.height - 800 }, group: this.coin, texture: "comida", width: 140, height: 180, aura: 'auraTuto' },
            { ...basePlatformsConfig, pos: { x: 3400, y: this.worldSize.height - 200 },
                animation:{
                    xAxis:{
                        xDistance:600,
                        xVel:80
                    }
            }},
            { ...basePlatformsConfig, pos: { x: 3400, y: this.worldSize.height - 1400 },
                animation:{
                    yAxis:{
                        yDistance:500,
                        yVel:80
                    }
            }},
            { ...basePlatformsConfig, pos: { x: 3750, y: this.worldSize.height - 1600 },group: this.fallingTile },
            { ...baseCristalConf, pos: { x: 3750, y:  this.worldSize.height - 1800 }, group: this.coin, texture: "comida", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseLongPlatformsConf, pos: { x: 3900, y:  this.worldSize.height - 400 },large: 10},            
            { ...basePlatformsConfig, pos: { x: 4300, y: this.worldSize.height - 1600 },group: this.fallingTile },
            { ...baseCristalConf, pos: { x: 4300, y:  this.worldSize.height - 1800 }, group: this.coin, texture: "comida", width: 140, height: 180, aura: 'auraTuto' },
            { ...basePlatformsConfig, pos: { x: 4700, y: this.worldSize.height - 1600 },group: this.fallingTile },
            { ...baseFireballConf, pos: { x: 5150, y:  0}, tween: { duration: 5000, repeat: -1, y: "+=3000"}, rotated: false},
            { ...basePlatformsConfig, pos: { x: 5200, y: this.worldSize.height - 1400 } },
            { ...basePlatformsConfig, pos: { x: 5200, y: this.worldSize.height - 600 },group: this.fallingTile },
            { ...basePlatformsConfig, pos: { x: 5500, y: this.worldSize.height - 800 },group: this.fallingTile },
            { ...baseLongPlatformsConf, pos: { x: 5700, y:  this.worldSize.height - 1000 },large: 5},
            { ...baseCristalConf, pos: { x: 5850, y:  this.worldSize.height - 1150 }, group: this.coin, texture: "comida", width: 140, height: 180, aura: 'auraTuto' },
            { type: "subPortal",  x: 6100, y: this.worldSize.height - 1500, version: 1, sameScene: false, group: this.teleport, otherSceneConf: subLvl1Conf },
            {...baseLargePlatformsConf, pos: { x: 6200, y: this.worldSize.height - 400 }, large: 10 ,group: this.floor},
            { ...baseCristalConf, pos: { x: 6550, y:  this.worldSize.height - 550 }, group: this.coin, texture: "comida", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseDangerConf, pos: { x: 6300, y:  this.worldSize.height - 470 }, width: 150, height: 150},
            { ...baseDangerConf, pos: { x: 6800, y:  this.worldSize.height - 470 }, width: 150, height: 150},
            { ...baseCristalConf, pos: { x: 6750, y:  this.worldSize.height - 1250 }, group: this.coin, texture: "comida", width: 140, height: 180, aura: 'auraTuto' },
            { ...basePlatformsConfig, pos: { x: 7000, y: this.worldSize.height - 1150 }},
            { ...basePlatformsConfig, pos: { x: 7000, y: this.worldSize.height - 1450 }},
            { ...baseCristalConf, pos: { x: 7350, y:  this.worldSize.height - 1600 }, group: this.coin, texture: "comida", width: 140, height: 180, aura: 'auraTuto' },
            { ...basePlatformsConfig, pos: { x: 7300, y: this.worldSize.height - 750 }},
            { ...basePlatformsConfig, pos: { x: 7700, y: this.worldSize.height - 1700 },group: this.fallingTile },
            { ...basePlatformsConfig, pos: { x: 7700, y: this.worldSize.height - 1000 }},
            { type: "subPortal",  x: 8100, y: this.worldSize.height - 1850, version: 1, sameScene: false, group: this.teleport, otherSceneConf: subLvl1Conf },
            { ...basePlatformsConfig, pos: { x: 8200, y: this.worldSize.height - 1300 },
                animation:{
                    xAxis:{
                        xDistance:500,
                        xVel:80
                    }
            }},
            { ...baseCristalConf, pos: { x: 8450, y:  this.worldSize.height - 1400 }, group: this.coin, texture: "comida", width: 140, height: 180, aura: 'auraTuto' },
            { ...basePlatformsConfig, pos: { x: 8600, y: this.worldSize.height - 1300 },
                animation:{
                    yAxis:{
                        yDistance:500,
                        yVel:80
                    }
            }},

            { ...baseFireballConf, pos: { x: 8850, y:  0}, tween: { duration: 5000, repeat: -1, y: "+=3000"}, rotated: false},
            { ...baseFireballConf, pos: { x: 9050, y:  0}, tween: { duration: 5000, repeat: -1, y: "+=3000"}, rotated: false},
            {...baseLargePlatformsConf, pos: { x: 9400, y: this.worldSize.height - 500 }, large: 10 ,group: this.floor},

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

export default Map3;