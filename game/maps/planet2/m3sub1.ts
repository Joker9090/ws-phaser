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
            width: 5500,
            height: 2000,
          };
          this.cameraBounds = {
            x: 0,
            y: 0,
            width: 5500,
            height: 2000,
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
            x: 400, //500
            y: this.worldSize.height - 1200, //800
          };
    }

    createMap(data: { level: number; lifes: number }) {
        this.mapContainer = this.scene.add.container();
        this.coin = this.scene.physics.add.group({ allowGravity: false });
        this.pisosBack = this.scene.physics.add.group({ allowGravity: false });
        this.flyingPiso = this.scene.physics.add.group({ allowGravity: false, immovable: true });
        this.portal = this.scene.physics.add.group({ allowGravity: false });
        this.player?.setPlayerWithTank(false);
        this.player?.setPlayerFlying(true);
        this.player?.tankGraphics?.clear(),
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
      this.scene.add.image(0, 0, "curvedVector").setOrigin(0.5),
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
   this.backgroundsMiddle = this.createBgRow(100, this.cameraBounds.height+100, ["middleCombo", "middleCombo2", "middleCombo3", "middleCombo4"], width, 0.7),
    
    this.backgroundsFront = [
      this.scene.add.image(-this.startingPoint.x, this.cameraBounds.height+100, "frontCombo").setOrigin(0, 1).setScale(0.5),
      this.scene.add.image(-this.startingPoint.x + downScaledFrontWidth, this.cameraBounds.height+100, "frontCombo2").setOrigin(0, 1).setScale(0.5),
      this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 2), this.cameraBounds.height+100, "frontCombo3").setOrigin(0, 1).setScale(0.5),
      this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 3), this.cameraBounds.height+100, "frontCombo4").setOrigin(0, 1).setScale(0.5),
      this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 4), this.cameraBounds.height+100, "frontCombo2").setOrigin(0, 1).setScale(0.5),
      this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 5), this.cameraBounds.height+100, "frontCombo2").setOrigin(0, 1).setScale(0.5),
      this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 6), this.cameraBounds.height+100, "frontCombo3").setOrigin(0, 1).setScale(0.5),
      this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 7), this.cameraBounds.height+100, "frontCombo4").setOrigin(0, 1).setScale(0.5),
      this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 8), this.cameraBounds.height+100, "frontCombo2").setOrigin(0, 1).setScale(0.5),
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
        const backToLvl1Conf: GamePlayDataType = {
            level: 7,
            lifes: this.scene.lifes ? this.scene.lifes : 3,
            loadKey: ["Postales", "Cinemato1", "Cinemato2"],
            startingPositionFromOtherScene: {
                x: 6100,
                y: 1500,
            },
        }
        const backToLvl2Conf: GamePlayDataType = {
            level: 7,
            lifes: this.scene.lifes ? this.scene.lifes : 3,
            loadKey: ["Postales", "Cinemato1", "Cinemato2"],
            startingPositionFromOtherScene: {
                x: 8100,
                y: 1250,
            },
        }
        const mapPlatforms = [
            {...baseLongPlatformsConf, pos: { x: 0, y: this.worldSize.height - 2800 }, large: 30,group: this.floor},
            { ...baseCristalConf, pos: { x: 500, y:  this.worldSize.height - 1500 }, group: this.coin, texture: "comida", width: 140, height: 180, aura: 'auraTuto' },
            
            { ...baseLongPlatformsConf, pos: { x: 1000, y:  this.worldSize.height - 1000 },large: 15, },
            { ...baseCristalConf, pos: { x: 1000, y:  this.worldSize.height - 1500 }, group: this.coin, texture: "comida", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseDangerConf, pos: { x: 1000, y:  this.worldSize.height - 900 }, width: 150, height: 150},
            { ...baseDangerConf, pos: { x: 1000, y:  this.worldSize.height - 800 }, width: 150, height: 150},
            { ...baseDangerConf, pos: { x: 1000, y:  this.worldSize.height - 700 }, width: 150, height: 150},
            { ...baseDangerConf, pos: { x: 1000, y:  this.worldSize.height - 600 }, width: 150, height: 150},
            { ...baseDangerConf, pos: { x: 1000, y:  this.worldSize.height - 500 }, width: 150, height: 150},
            { ...baseDangerConf, pos: { x: 1000, y:  this.worldSize.height - 400 }, width: 150, height: 150},
            { ...baseDangerConf, pos: { x: 1000, y:  this.worldSize.height - 300 }, width: 150, height: 150},
            { ...baseDangerConf, pos: { x: 1000, y:  this.worldSize.height - 200 }, width: 150, height: 150},
            { ...baseDangerConf, pos: { x: 1000, y:  this.worldSize.height - 100 }, width: 150, height: 150},

            
            
            { ...baseDangerConf, pos: { x: 1500, y:  this.worldSize.height - 1080 }, width: 150, height: 150,patrol:{
                patrolType:"LinealY",
                distance:800,
                speed: 120,
                attackInterval:0,}
            },
            { ...baseCristalConf, pos: { x: 2000, y:  this.worldSize.height - 1500 }, group: this.coin, texture: "comida", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseCristalConf, pos: { x: 2000, y:  this.worldSize.height - 800 }, group: this.coin, texture: "comida", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseCristalConf, pos: { x: 1400, y:  this.worldSize.height - 800 }, group: this.coin, texture: "comida", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseCristalConf, pos: { x: 1200, y:  this.worldSize.height - 400 }, group: this.coin, texture: "comida", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseCristalConf, pos: { x: 1400, y:  this.worldSize.height - 200 }, group: this.coin, texture: "comida", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseDangerConf, pos: { x: 1400, y:  this.worldSize.height - 400 }, width: 150, height: 150},

            { ...baseLongPlatformsConf, pos: { x: 3000, y:  this.worldSize.height - 1000 },large: 15, },
            { type: "subPortal",  x: 2500, y: this.worldSize.height - 1700, version: 1, sameScene: false, group: this.teleport, otherSceneConf: backToLvl1Conf },
            { ...baseFireballConf, pos: { x:2650, y:  0}, tween: { duration: 3000, repeat: -1, y: "+=2000"}, rotated: false},
            { ...baseCristalConf, pos: { x: 3000, y:  this.worldSize.height - 1500 }, group: this.coin, texture: "comida", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseCristalConf, pos: { x: 3200, y:  this.worldSize.height - 700 }, group: this.coin, texture: "comida", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseDangerConf, pos: { x: 3500, y:  this.worldSize.height - 1080 }, width: 150, height: 150,
                patrol:{
                    patrolType:"LinealY",
                    distance:800,
                    speed: 120,
                    attackInterval:0,
                }
            },
            { ...baseCristalConf, pos: { x: 3700, y:  this.worldSize.height - 300 }, group: this.coin, texture: "comida", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseCristalConf, pos: { x: 4000, y:  this.worldSize.height - 700 }, group: this.coin, texture: "comida", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseFireballConf, pos: { x:3450, y:  this.worldSize.height}, tween: { duration: 3000, repeat: -1, y: "-=600"}, rotated: false},
            { ...baseFireballConf, pos: { x:3800, y:  this.worldSize.height}, tween: { duration: 3000, repeat: -1, y: "-=600"}, rotated: false},
            { ...baseDangerConf, pos: { x: 4500, y:  this.worldSize.height - 1000 }, width: 150, height: 150,patrol:{
                patrolType:"LinealX",
                distance:400,
                speed: 120,
                attackInterval:0,}
            },
            { ...baseDangerConf, pos: { x: 4900, y:  this.worldSize.height - 1000 }, width: 150, height: 150,patrol:{
                patrolType:"LinealX",
                distance:300,
                speed: 160,
                attackInterval:0,}
            },
            { ...baseDangerConf, pos: { x: 5100, y:  this.worldSize.height - 1000 }, width: 150, height: 150,patrol:{
                patrolType:"LinealX",
                distance:400,
                speed: 180,
                attackInterval:0,}
            },
            { type: "subPortal",  x: 4700, y: this.worldSize.height - 600, version: 1, sameScene: false, group: this.teleport, otherSceneConf: backToLvl2Conf },
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