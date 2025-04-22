import Game from "@/game/Game";
import MapCreator from "../sandbox/MapCreator";
import Player from "@/game/assets/Player";
import { GamePlayDataType } from "@/game/Types";
import colors from "@/game/assets/PlatformColors";

class MapaTest extends MapCreator {
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
    }

    createMap(data: { level: number; lifes: number }) {
        this.mapContainer = this.scene.add.container();
        this.coin = this.scene.physics.add.group({ allowGravity: false });
        this.pisosBack = this.scene.physics.add.group({ allowGravity: false });
        this.flyingPiso = this.scene.physics.add.group({ allowGravity: false, immovable: true });


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
            this.scene.add.image(-this.startingPoint.x, this.startingPoint.y, "middleCombo").setOrigin(0, 1).setScale(0.7),
            this.scene.add.image(-this.startingPoint.x + downScaledMiddleWidth, this.startingPoint.y, "middleCombo2").setOrigin(0, 1).setScale(0.7),
            this.scene.add.image(-this.startingPoint.x + (downScaledMiddleWidth * 2), this.startingPoint.y, "middleCombo3").setOrigin(0, 1).setScale(0.7),
            this.scene.add.image(-this.startingPoint.x + (downScaledMiddleWidth * 3), this.startingPoint.y, "middleCombo4").setOrigin(0, 1).setScale(0.7),
            this.scene.add.image(-this.startingPoint.x + (downScaledMiddleWidth * 4), this.startingPoint.y, "middleCombo2").setOrigin(0, 1).setScale(0.7),
            this.scene.add.image(-this.startingPoint.x + (downScaledMiddleWidth * 5), this.startingPoint.y, "middleCombo2").setOrigin(0, 1).setScale(0.7),
        ]

        this.backgroundsFront = [
            this.scene.add.image(this.startingPoint.x + this.backSize.width - 15, this.worldSize.height - 700, "montaña3"),
            this.scene.add.image(this.startingPoint.x - 70, this.worldSize.height - 700, "montaña5"),
            this.scene.add.image(1200, this.worldSize.height - 700, "montaña3")
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
                large: 25,
                group: this.floor
            },
            { ...basePlatformsConfig, pos: { x: 800, y: 1000 } },
            { ...basePlatformsConfig, pos: { x: 1100, y: 850 } },
            { ...baseCristalConf, pos: { x: 1100, y: 750 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseCristalConf, pos: { x: 1500, y: 700 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            {
                ...baseLargePlatformsConf,
                pos: { x: 1650, y: 1200 },
                width: {
                    textureA: 90,
                    textureB: 67,
                    textureC: 115,
                },
                height: 127,
                large: 15,
                group: this.floor
            },
            { ...basePlatformsConfig, pos: { x: 1850, y: 1000 } },
            { ...baseCristalConf, pos: { x: 2025, y: 800 }, group: this.coin, texture: "cristal3", width: 140, height: 180 },
            { ...basePlatformsConfig, pos: { x: 2200, y: 1000 } },
            { ...basePlatformsConfig, pos: { x: 2600, y: 1000 } },
            {
                ...baseLargePlatformsConf,
                pos: { x: 2700, y: 1000 },
                width: {
                    textureA: 90,
                    textureB: 67,
                    textureC: 115,
                },
                height: 127,
                large: 15,
                group: this.floor
            },
            { ...basePlatformsConfig, pos: { x: 3400, y: 600 } },
            {
                ...baseLargePlatformsConf,
                pos: { x: 3900, y: 600 },
                width: {
                    textureA: 90,
                    textureB: 67,
                    textureC: 115,
                },
                height: 127,
                large: 15,
                group: this.floor
            },
            { ...basePlatformsConfig, pos: { x: 4100, y: 400 } },
            { ...baseCristalConf, pos: { x: 4100, y: 300 }, group: this.coin, texture: "cristal3", width: 140, height: 180 },
            { ...basePlatformsConfig, pos: { x: 4500, y: 400 } },
            { ...baseCristalConf, pos: { x: 4500, y: 300 }, group: this.coin, texture: "cristal3", width: 140, height: 180 },
            { ...basePlatformsConfig, pos: { x: 5200, y: 600 } },
            {
                ...baseLargePlatformsConf,
                pos: { x: 5400, y: 700 },
                width: {
                    textureA: 90,
                    textureB: 67,
                    textureC: 115,
                },
                height: 127,
                large: 15,
                group: this.floor
            },
            { ...baseCristalConf, pos: { x: 5750, y: 500 }, group: this.coin, texture: "cristal3", width: 140, height: 180 },

            {
                ...baseLargePlatformsConf,
                pos: { x: 6500, y: 400 },
                width: {
                    textureA: 90,
                    textureB: 67,
                    textureC: 115,
                },
                height: 127,
                large: 15,
                group: this.floor
            },
            { ...basePlatformsConfig, pos: { x: 6600, y: 1000 } },
            { ...baseCristalConf, pos: { x: 6800, y: 700 }, group: this.coin, texture: "cristal3", width: 140, height: 180 },
            { ...basePlatformsConfig, pos: { x: 7000, y: 1000 } },
            { ...baseCristalConf, pos: { x: 7200, y: 700 }, group: this.coin, texture: "cristal3", width: 140, height: 180 },
            { ...basePlatformsConfig, pos: { x: 7400, y: 1000 } },

            { ...baseCristalConf, pos: { x: 7600, y: 200 }, group: this.coin, texture: "cristal3", width: 140, height: 180 },
            { ...basePlatformsConfig, pos: { x: 8000, y: 400 } },
            { ...basePlatformsConfig, pos: { x: 8300, y: 700 } },
            { ...baseCristalConf, pos: { x: 8300, y: 600 }, group: this.coin, texture: "cristal3", width: 140, height: 180 },

            { ...basePlatformsConfig, pos: { x: 8000, y: 1000 } },
            { ...basePlatformsConfig, pos: { x: 8600, y: 1000 } },






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
            this.animateBackground();
    }

}

export default MapaTest;
