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

        this.worldSize = {
            width: 10000,
            height: 2000,
          };
          this.cameraBounds = {
            x: 0,
            y: 100,
            width: 10000,
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
    }

    createMap(data: { level: number; lifes: number }) {
        this.mapContainer = this.scene.add.container();
        this.coin = this.scene.physics.add.group({ allowGravity: false });
        this.pisosBack = this.scene.physics.add.group({ allowGravity: false });
        this.flyingPiso = this.scene.physics.add.group({ allowGravity: false, immovable: true });
        this.portal = this.scene.physics.add.group({ allowGravity: false });

        const backImage = this.scene.textures.get("background0P1").getSourceImage()
        this.backSize = { width: backImage.width, height: backImage.height }

        const { width, height } = this.ratioReference;
        const downScaledMiddleWidth = width * 0.7;
        const downScaledFrontWidth = width * 0.5;

        this.backgroundsBack = [
            this.scene.add.image(0, this.worldSize.height, "background0P1").setOrigin(0, 1).setScale(1.3),
            this.scene.add.image(0, this.worldSize.height, "backgroundStars").setOrigin(0, 1).setScale(1.3),
            this.scene.add.image(0 + backImage.width, this.worldSize.height, "background0P1").setOrigin(0, 1),
            this.scene.add.image(0 + backImage.width, this.worldSize.height, "backgroundStars").setOrigin(0, 1),
            this.scene.add.image(0 + (backImage.width * 2), this.worldSize.height, "background0P1").setOrigin(0, 1),
            this.scene.add.image(0 + (backImage.width * 2), this.worldSize.height, "backgroundStars").setOrigin(0, 1),
        ]

        this.backgroundsMiddle = [
            this.scene.add.image(-this.startingPoint.x, this.worldSize.height, "middleCombo").setOrigin(0, 1).setScale(0.7),
            this.scene.add.image(-this.startingPoint.x + downScaledMiddleWidth, this.worldSize.height, "middleCombo2").setOrigin(0, 1).setScale(0.7),
            this.scene.add.image(-this.startingPoint.x + (downScaledMiddleWidth * 2), this.worldSize.height, "middleCombo3").setOrigin(0, 1).setScale(0.7),
            this.scene.add.image(-this.startingPoint.x + (downScaledMiddleWidth * 3), this.worldSize.height, "middleCombo4").setOrigin(0, 1).setScale(0.7),
            this.scene.add.image(-this.startingPoint.x + (downScaledMiddleWidth * 4), this.worldSize.height, "middleCombo2").setOrigin(0, 1).setScale(0.7),
            this.scene.add.image(-this.startingPoint.x + (downScaledMiddleWidth * 5), this.worldSize.height, "middleCombo2").setOrigin(0, 1).setScale(0.7),
        ]

        this.backgroundsFront = [
            this.scene.add.image(this.startingPoint.x + this.backSize.width - 15, this.worldSize.height, "montaña3"),
            this.scene.add.image(this.startingPoint.x - 70, this.worldSize.height, "montaña5"),
            this.scene.add.image(1200, this.worldSize.height, "montaña3")
        ]

        this.createBackgrounds(this.backgroundsBack, this.backgroundsMiddle, this.backgroundsFront);

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
            texture: "shield",
            scale: { width: 0.7, height: 0.7 },
            width: 10,
            height: 18,
            fix: 10,
        }

        const baseDangerConf = {
            type: "danger",
            texture: "Enemy",
            scale: { width: 1, height: 1 },
            attackSpriteSheet: "EnemyAttack",
            particleSpriteSheet: "EnemyParticles",
            group: this.obstacle,
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
                pos: { x: 0, y: this.worldSize.height - 600 },
                width: {
                    textureA: 90,
                    textureB: 67,
                    textureC: 115,
                },
                height: 127,
                large: 15,
                group: this.floor
            },
            { ...basePlatformsConfig, pos: { x: 1100, y: this.worldSize.height - 600 } }, //TIENE QUE SER PLATAFORMA QUE SE CAE
            {
                ...baseLargePlatformsConf,
                pos: { x: 1600, y: this.worldSize.height - 200 },
                width: {
                    textureA: 90,
                    textureB: 67,
                    textureC: 115,
                },
                height: 127,
                large: 40,
                group: this.floor
            },
            { ...baseDangerConf, pos: { x: 2100, y: this.worldSize.height - 250 }, width: 170, height: 170, animation:{ xAxis:{ xDistance:500, xVel:350 } }, },
            { ...baseDangerConf, pos: { x: 2600, y: this.worldSize.height - 500 }, width: 170, height: 170, animation:{ yAxis:{ yDistance:500, yVel:400 } }, },
            { ...baseDangerConf, pos: { x: 3000, y: this.worldSize.height - 450 }, width: 170, height: 170, animation:{ yAxis:{ yDistance:350, yVel:350 } }, },
            {
                ...baseLargePlatformsConf,
                pos: { x: 3800, y: this.worldSize.height - 500 },
                width: {
                    textureA: 90,
                    textureB: 67,
                    textureC: 115,
                },
                height: 127,
                large: 15,
                group: this.floor
            },
            { ...basePlatformsConfig, pos: { x: 4200, y: this.worldSize.height - 1200 } }, 
            { ...basePlatformsConfig, pos: { x: 4700, y: this.worldSize.height - 1200 } }, //TIENE QUE SER PLATAFORMA QUE SE CAE
            {
                ...baseLargePlatformsConf,
                pos: { x: 5200, y: this.worldSize.height - 1200 },
                width: {
                    textureA: 90,
                    textureB: 67,
                    textureC: 115,
                },
                height: 127,
                large: 15,
                group: this.floor
            },
            { ...basePlatformsConfig, pos: { x: 6300, y: this.worldSize.height - 1200 } }, //TIENE QUE SER PLATAFORMA QUE SE CAE
            { ...basePlatformsConfig, pos: { x: 6700, y: this.worldSize.height - 1200 } }, //TIENE QUE SER PLATAFORMA QUE SE CAE
            { ...basePlatformsConfig, pos: { x: 7100, y: this.worldSize.height - 1200 } }, //TIENE QUE SER PLATAFORMA QUE SE CAE
            {
                ...baseLargePlatformsConf,
                pos: { x: 7400, y: this.worldSize.height - 400 },
                width: {
                    textureA: 90,
                    textureB: 67,
                    textureC: 115,
                },
                height: 127,
                large: 30,
                group: this.floor
            },
            // ACA VA DANGER
            {
                ...baseLargePlatformsConf,
                pos: { x: 9200, y: this.worldSize.height - 700 },
                width: {
                    textureA: 90,
                    textureB: 67,
                    textureC: 115,
                },
                height: 127,
                large: 15,
                group: this.floor
            },

            // { ...baseCristalConf, pos: { x: 700, y:  this.worldSize.height - 200 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            

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
