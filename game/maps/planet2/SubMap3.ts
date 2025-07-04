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
        this.player.setPlayerFlying(false);
        this.player.tankGraphics?.clear();

        this.worldSize = {
            width: 14100,
            height: 3000,
          };
          this.cameraBounds = {
            x: 200,
            y: 200,
            width: 13900,
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
            x: 400, //500
            y: (this.cameraBounds.height + this.cameraBounds.y) - 1500, //800
          };
          this.UIItemToGrab="comida";
          this.planet = 2;
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
        const { width: farWidth, height: farHeight } = this.farBackgroundReference
        const downScaledMiddleWidth = farWidth * 0.5;

        this.backgroundsBack = [
          this.scene.add.image(0, 0, "p1backgroundNoche").setOrigin(0.5),
          this.scene.add.image(0, 0, "p1Stars").setOrigin(0.5),
          this.scene.add.image(0, 0, "p1capaOscuridad").setOrigin(0.5),

        ]
        
        this.backgroundsMiddle = [
          this.scene.add.image(0, this.cameraBounds.height+200, "middleCombo_v2_p2").setOrigin(0, 1).setScale(0.5),
          this.scene.add.image(0 + downScaledMiddleWidth, this.cameraBounds.height+200, "middleCombo_v2_p2").setOrigin(0, 1).setScale(0.5).setFlipX(true),
          this.scene.add.image(0 + (downScaledMiddleWidth * 2), this.cameraBounds.height+200, "middleCombo_v2_p2").setOrigin(0, 1).setScale(0.5),
          this.scene.add.image(0 + (downScaledMiddleWidth * 3), this.cameraBounds.height+200, "middleCombo_v2_p2").setOrigin(0, 1).setScale(0.5).setFlipX(true),
          this.scene.add.image(0 + (downScaledMiddleWidth * 4), this.cameraBounds.height+200, "middleCombo_v2_p2").setOrigin(0, 1).setScale(0.5),
          this.scene.add.image(0 + (downScaledMiddleWidth * 5), this.cameraBounds.height+200, "middleCombo_v2_p2").setOrigin(0, 1).setScale(0.5).setFlipX(true),
          this.scene.add.image(0 + (downScaledMiddleWidth * 6), this.cameraBounds.height+200, "middleCombo_v2_p2").setOrigin(0, 1).setScale(0.5),
          this.scene.add.image(0 + (downScaledMiddleWidth * 7), this.cameraBounds.height+200, "middleCombo_v2_p2").setOrigin(0, 1).setScale(0.5).setFlipX(true),
          this.scene.add.image(0 + (downScaledMiddleWidth * 8), this.cameraBounds.height+200, "middleCombo_v2_p2").setOrigin(0, 1).setScale(0.5),
          this.scene.add.image(0 + (downScaledMiddleWidth * 5), this.cameraBounds.height+200, "middleCombo_v2_p2").setOrigin(0, 1).setScale(0.5).setFlipX(true),
          this.scene.add.image(0 + (downScaledMiddleWidth * 9), this.cameraBounds.height+200, "middleCombo_v2_p2").setOrigin(0, 1).setScale(0.5),
          this.scene.add.image(0 + (downScaledMiddleWidth * 10), this.cameraBounds.height+200, "middleCombo_v2_p2").setOrigin(0, 1).setScale(0.5).setFlipX(true),
          ...this.createBgRow(200, this.cameraBounds.height+200, ["frontCombo_p2", "frontCombo2_p2", "frontCombo3_p2", "frontCombo4_p2"], width, 0.7, undefined, 0, 50),
        ]

        this.backgroundsFront = [
          ...this.createBgRow(200, this.cameraBounds.height+200, ["front_shadow_p2"], width, 0.7),
          ...this.createBgRow(200, this.cameraBounds.height+200, ["front_base_p2"], width, 0.7),
        ],
        
        this.createBackgrounds(this.backgroundsBack, this.backgroundsMiddle, this.backgroundsFront);

        const bgContainer = this.scene.add.container(0, 0, this.backgroundsBack);
        this.scene.UICamera?.ignore(bgContainer);
        this.scene.cameras.main.ignore(bgContainer);

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
            textureFill: ["fill_texture_p2", "fill_texture2_p2", "fill_texture2_p2"],
            width: {
              textureA: 96,
              textureB: 96,
              textureC: 96,
            },
            height: 96,
            scale: { width: 1, height: 1 },
            rotated: false,
            type: "largeFloor",
            fillBehind: true
          };

        const baseCristalConf = {
            type: "collectable",
            texture: "shield",
            scale: { width: 0.7, height: 0.7 },
            width: 10,
            height: 18,
            //fix: 10,
            auraColor: 0xff9600,
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
            color: 0xff9600,
        }

        const baseFireballConf = {
            type: "fireball",
            spriteSheet: "meteoritop1",
            texture: "meteoritop1",
            width: 100,
            height: 100,
            group: this.firegroup,
            scale: { width: 0.71, height: 0.71 },
            
            // frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        }
        // const subLvl1Conf: GamePlayDataType = {
        //     level: 20201,
        //     lifes: this.scene.lifes ? this.scene.lifes : 3,
        //     loadKey: ["Postales", "Cinemato1", "Cinemato2"],
        //     startingPositionFromOtherScene: {
        //         x: 0,
        //         y: 400,
        //     },
        // }

        const mapPlatforms = [
            {
                type: "floor",
                x: 0,
                y: 0,
                width: this.worldSize.width,
                height: 40,
                texture: "pSimple1p1",
                scale: { width: 0.7, height: 0.7 },
                rotated: false,
            },
        ]
        this.createPlatforms(mapPlatforms)

        // this.scene.UICamera?.ignore(this.floor!);
        // this.scene.UICamera?.ignore(this.mapContainer)
        // this.scene.UICamera?.ignore(this.frontContainer)
        // this.scene.UICamera?.ignore(this.backContainer)
        // this.scene.UICamera?.ignore(this.middleContainer)
        // this.scene.UICamera?.ignore(this.frontContainer)
        // this.scene.UICamera?.ignore(this.coin)
        // this.scene.UICamera?.ignore(this.pisosBack)
        // this.scene.UICamera?.ignore(this.gravityTile!)
        // this.scene.UICamera?.ignore(this.firegroup!)
        // this.scene.UICamera?.ignore(this.backContainer)
        // this.scene.UICamera?.ignore(this.middleContainer)
        // this.scene.UICamera?.ignore(this.frontContainer)

        this.cameraIgnore()
    }

    update() {

    }

}

export default SubMap3;