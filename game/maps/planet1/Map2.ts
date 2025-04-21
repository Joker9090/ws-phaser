import Game from "@/game/Game";
import MapCreator from "../sandbox/MapCreator";
import Player from "@/game/assets/Player";
import { GamePlayDataType } from "@/game/Types";
import colors from "@/game/assets/PlatformColors";
import { group } from "console";

class Map2 extends MapCreator {
    constructor(scene: Game, player: Player, data?: GamePlayDataType) {
        super(scene, player, data);
        this.scene = scene;
        this.player = player;

        this.worldSize = {
            width: 10000,
            height: 2000,
        };
        this.cameraBounds = {
            x: 0,
            y: 0,
            width: 10000,
            height: 2000,
        };

        this.startingPoint = {
            x: 500, //500
            y: this.worldSize.height-200, //800
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

        const mapPlatforms = [
            {
                ...baseLargePlatformsConf,
                pos: { x: 0, y: 1200 },
                width: {
                    textureA: 90,
                    textureB: 67,
                    textureC: 115,
                },
                height: 127,
                large: 20,
                group: this.floor
            },
            {
                ...baseLargePlatformsConf,
                pos: { x: 1300, y: 1200 },
                width: {
                    textureA: 90,
                    textureB: 67,
                    textureC: 115,
                },
                height: 127,
                large: 20,
                group: this.floor
            },
            { ...baseDangerConf, pos: { x: 1700, y: 1150 }, width: 170, height: 170, animation:{ xAxis:{ xDistance:400, xVel:150 } }, },
            { ...basePlatformsConfig, pos: { x: 2100, y: 1000 } },
            { ...basePlatformsConfig, pos: { x: 2500, y: 800 } },
            { ...basePlatformsConfig, pos: { x: 3100, y: 800 } },
            {
                ...basePlatformsConfig, pos: { x: 3600, y: 800 }, animation: {
                    xAxis: {
                        xDistance: 200,
                        xVel: 100
                    }
                }
            },
            {
                ...baseLargePlatformsConf,
                pos: { x: 3800, y: 800 },
                width: {
                    textureA: 90,
                    textureB: 67,
                    textureC: 115,
                },
                height: 127,
                large: 15,
                group: this.floor
            },
            { ...baseDangerConf, pos: { x: 4150, y: 750 }, width: 170, height: 170, animation:{ xAxis:{ xDistance:400, xVel:150 } }, },
            { ...baseCristalConf, pos: { x: 4150, y: 750 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            {
                ...basePlatformsConfig, pos: { x: 4800, y: 1000 }, animation: {
                    xAxis: {
                        xDistance: 200,
                        xVel: 100
                    }
                }
            },
            {
                ...basePlatformsConfig, pos: { x: 5300, y: 1000 }, animation: {
                    xAxis: {
                    xDistance: 200,
                    xVel: 100
                    }
                }
            },
            

            // { ...baseDangerConf, pos: { x: 9350, y: 950 }, width: 170, height: 170, animation:{ xAxis:{ xDistance:350, xVel:150 } }, },
            // { type: "finalPortal", pos: { x: 9900, y: 900 }, texture: "plataformaFinalP1", width: 100, height: 100, group: this.portal }

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
            this.animateBackground(this.scene.cameras.main.midPoint);
    }

}

export default Map2;
