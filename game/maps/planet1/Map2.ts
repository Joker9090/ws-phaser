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
            x: 600, //500
            y: this.worldSize.height - 700, //800
          };
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
        const downScaledMiddleWidth = width * 0.7;
        const downScaledFrontWidth = width * 0.5;

        // this.backgroundsBack = [
        //     this.scene.add.image(0, this.worldSize.height, "background0P1").setOrigin(0, 1).setScale(1.3),
        //     this.scene.add.image(0, this.worldSize.height, "backgroundStars").setOrigin(0, 1).setScale(1.3),
        //     this.scene.add.image(0 + backImage.width, this.worldSize.height, "background0P1").setOrigin(0, 1),
        //     this.scene.add.image(0 + backImage.width, this.worldSize.height, "backgroundStars").setOrigin(0, 1),
        //     this.scene.add.image(0 + (backImage.width * 2), this.worldSize.height, "background0P1").setOrigin(0, 1),
        //     this.scene.add.image(0 + (backImage.width * 2), this.worldSize.height, "backgroundStars").setOrigin(0, 1),
        // ]

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
            { ...basePlatformsConfig, pos: { x: 1100, y: this.worldSize.height - 600 }, colors: [colors.falling], group: this.fallingTile }, //TIENE QUE SER PLATAFORMA QUE SE CAE
            { ...baseCristalConf, pos: { x: 1400, y:  this.worldSize.height - 800 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
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
            { ...baseCristalConf, pos: { x: 2100, y:  this.worldSize.height - 400 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
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
            { ...baseFireballConf, pos: { x: 4500, y: this.worldSize.height - 800 }, tween: { duration: 1400, repeat: -1, x: "-=600", yoyo: true  }, rotated: true },
            { ...baseCristalConf, pos: { x: 4000, y:  this.worldSize.height - 1000 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseCristalConf, pos: { x: 4400, y:  this.worldSize.height - 1000 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },

            { ...basePlatformsConfig, pos: { x: 4200, y: this.worldSize.height - 1200 } }, 
            { ...baseCristalConf, pos: { x: 4450, y:  this.worldSize.height - 1400 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            { ...basePlatformsConfig, pos: { x: 4700, y: this.worldSize.height - 1200 }, colors: [colors.falling], group: this.fallingTile  }, //TIENE QUE SER PLATAFORMA QUE SE CAE
            {
                ...baseLargePlatformsConf,
                pos: { x: 5300, y: this.worldSize.height - 1200 },
                width: {
                    textureA: 90,
                    textureB: 67,
                    textureC: 115,
                },
                height: 127,
                large: 10,
                group: this.floor
            },
            { ...baseCristalConf, pos: { x: 5400, y:  this.worldSize.height - 1400 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseFireballConf, pos: { x: 5800, y: this.worldSize.height - 1300 }, tween: { duration: 1500, repeat: -1, x: "-=500", yoyo: true  }, rotated: true },
            { ...baseCristalConf, pos: { x: 5700, y:  this.worldSize.height - 1400 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },


            { ...basePlatformsConfig, pos: { x: 6300, y: this.worldSize.height - 1200 }, colors: [colors.falling], group: this.fallingTile  }, //TIENE QUE SER PLATAFORMA QUE SE CAE
            { ...basePlatformsConfig, pos: { x: 6700, y: this.worldSize.height - 1200 }, colors: [colors.falling], group: this.fallingTile  }, //TIENE QUE SER PLATAFORMA QUE SE CAE
            { ...basePlatformsConfig, pos: { x: 7100, y: this.worldSize.height - 1200 }, colors: [colors.falling], group: this.fallingTile  }, //TIENE QUE SER PLATAFORMA QUE SE CAE
            {
                ...baseLargePlatformsConf,
                pos: { x: 7400, y: this.worldSize.height - 400 },
                width: {
                    textureA: 90,
                    textureB: 67,
                    textureC: 115,
                },
                height: 127,
                large: 25,
                group: this.floor
            },
            { ...baseDangerConf, pos: { x: 7750, y: this.worldSize.height - 550 }, width: 170, height: 170, animation:{ yAxis:{ yDistance:200, yVel:200 } }, },
            { ...baseCristalConf, pos: { x: 7750, y:  this.worldSize.height - 750 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },
            { ...baseDangerConf, pos: { x: 8200, y: this.worldSize.height - 550 }, width: 170, height: 170, animation:{ yAxis:{ yDistance:200, yVel:300 } }, },
            { ...baseCristalConf, pos: { x: 8200, y:  this.worldSize.height - 750 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },

            { ...baseFireballConf, pos: { x: 9000, y:  this.worldSize.height - 1300 }, tween: { duration: 1600, repeat: -1, y: "+=1000", yoyo: true  }, rotated: false },
            { ...baseCristalConf, pos: { x: 9100, y:  this.worldSize.height - 900 }, group: this.coin, texture: "cristal3", width: 140, height: 180, aura: 'auraTuto' },

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
            { type: "finalPortal", pos: { x: 9700, y: this.worldSize.height - 800 }, texture: "plataformaFinalP1", width: 100, height: 100, group: this.portal }
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

export default Map2;
