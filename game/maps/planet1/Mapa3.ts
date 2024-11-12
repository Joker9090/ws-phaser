import Phaser, { Physics } from "phaser";
import AsteroidGenerator, {
    AsteroidGeneratorConfig,
} from "../../assets/AsteroidGenerator";
import Floor, { FloorConfig } from "../../assets/Floor";

import LargeFloor, { LargeFloorConfig } from "../../assets/LargeFloor";
import Game from "../../Game";

import Player from "../../assets/Player";
import portal, { portalConfig } from "../../assets/portal";
import { Children } from "react";
import { loseConfigFromMapType } from "@/game/Types";
import LargeFloorIsland, { LargeFloorIslandConfig } from "@/game/assets/LargeFloorIsland";

class Mapa3 {
    isJumping = false;
    // debugGraphics: Phaser.GameObjects.Graphics;
    scene: Game;
    worldSize = {
        width: 10000,
        height: 1520,
    };
    cameraBounds = {
        x: 0,
        y: -200,
        width: 6000,
        height: 2000
      }
    // normales
    pisos?: Phaser.Physics.Arcade.Group;
    // de vuelta al inicio
    pisosBack?: Phaser.Physics.Arcade.Group;
    // float
    pisos2?: Phaser.Physics.Arcade.Group;
    // rotyate cam
    pisos3?: Phaser.Physics.Arcade.Group;
    //  no float
    pisos4?: Phaser.Physics.Arcade.Group;
    fireballGroup?: Phaser.Physics.Arcade.Group;
    coin?: Phaser.Physics.Arcade.Group;
    portal?: Phaser.Physics.Arcade.Group;
    aura?: Phaser.Physics.Arcade.Group;
    movingFloor?: Phaser.Physics.Arcade.Group;
    movingFloorRot?: Phaser.Physics.Arcade.Group;
    
    amountLifes: number = 0;
    sideGrav: boolean = false;
    goingBack: boolean = false;
    pisoGoBack?: Phaser.GameObjects.Sprite;
    monchi?: Player;
    startingPoint = {
        x: 600, //500
        y: 800, //800
    };
    checkPointPos1 = {
        x: 1800,
        y: 600,
    };
    checkPointPos2 = {
        x: 3000,
        y: 900,
    };

    loseConfig: loseConfigFromMapType = [
        {
            positions: this.startingPoint,
            cameraDirection: "NORMAL",
            PlayerDirection: "NORMAL",
            gravityDown: true
        },
        {
            positions: this.checkPointPos1,
            cameraDirection: "NORMAL",
            PlayerDirection: "ROTATED",
            gravityDown: false
        },
        {
            positions: this.checkPointPos2,
            cameraDirection: "NORMAL",
            PlayerDirection: "ROTATED",
            gravityDown: false
        },
    ];
    nextScene: string | undefined = 'cine_movie_1';

    background: Phaser.GameObjects.Image;
    background2: Phaser.GameObjects.Image;
    background3: Phaser.GameObjects.Image;
    background4: Phaser.GameObjects.Image;
    background5: Phaser.GameObjects.Image;
    background6: Phaser.GameObjects.Image;
    background7: Phaser.GameObjects.Image;
    mountain1: Phaser.GameObjects.Image;
    mountain2: Phaser.GameObjects.Image;
    mountain3: Phaser.GameObjects.Image;
    mountain4: Phaser.GameObjects.Image;
    mountain5: Phaser.GameObjects.Image;
    mountain6: Phaser.GameObjects.Image;
    UIItemToGrab: string = 'cristal1';


    cristal?: Floor;
    collected: Boolean = false;
    endPortal?: Floor;

    isFloating: boolean = false;

    mapContainer: Phaser.GameObjects.Container;
    frontContainer: Phaser.GameObjects.Container;

    constructor(scene: Game, monchi: Player) {
        this.scene = scene;
        this.monchi = monchi;

        /* World size*/
        this.scene.physics.world.setBounds(
            0,
            0,
            this.worldSize.width,
            this.worldSize.height
        );

        this.mapContainer = this.scene.add.container()
        this.frontContainer = this.scene.add.container().setDepth(999999999999)

        this.background = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "background0P1")
            .setOrigin(0.5, 0.5)
        this.background2 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "background1P1")
            .setOrigin(0.5, 0.5)
        this.background3 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "backgroundStars")
            .setOrigin(0.5, 0.5)
        this.background4 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y + 470, "frontGround1")
            .setOrigin(1, 1).setScale(1);
        this.background5 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y + 470, "frontGround2")
            .setOrigin(0, 1).setScale(1);
        this.background6 = this.scene.add
            .image(this.startingPoint.x + this.background5.width - 15, this.startingPoint.y + 470, "frontGround1")
            .setOrigin(0, 1).setScale(1);
        this.background7 = this.scene.add
            .image(this.startingPoint.x + this.background5.width + this.background6.width - 15, this.startingPoint.y + 470, "frontGround2")
            .setOrigin(0, 1).setScale(1);

        this.mountain1 = this.scene.add.image(this.startingPoint.x + this.background5.width - 15, this.startingPoint.y - 370 + 300, "montaña3").setScale(1.2)
        this.mountain2 = this.scene.add.image(this.startingPoint.x - 70, this.startingPoint.y + 350 + 500, "montaña5").setScale(1.4)
        this.mountain3 = this.scene.add.image(1200, this.startingPoint.y + 770, "montaña3").setScale(1.3)
        this.mountain4 = this.scene.add.image(200, this.startingPoint.y, "montaña2")
        this.mountain5 = this.scene.add.image(1100, this.startingPoint.y, "montaña4")
        this.mountain6 = this.scene.add.image(this.startingPoint.x + this.background5.width + this.background6.width - 15, this.startingPoint.y + 770, "montaña5").setOrigin(0.5,0).setScale(1.3)

        this.mapContainer.add([
            this.background,
            this.background2,
            this.background3,
            this.mountain4,
            this.mountain5,
            this.background4,
            this.background5,
            this.background6,
            this.background7
        ])

        this.frontContainer.add([
            this.mountain1,
            this.mountain2,
            this.mountain3,
            this.mountain6
        ])
    }

    animateBackground(player: Phaser.GameObjects.Sprite | Phaser.Math.Vector2) {
        const offsetLevel = 400
        const offsetLevel2 = 300
        const { x, y } = this.startingPoint;
        const { x: x2, y: y2 } = player;
        // animation backgrounds statics
        const { ajusteBX, ajusteBY } = { ajusteBX: 1.1, ajusteBY: 1.1 }
        const calcDiffBX = (x2 - x) / ajusteBX
        const calcDiffBY = (y2 - y) / ajusteBY;
        this.background.setPosition(x + calcDiffBX, y + calcDiffBY);
        this.background2.setPosition(x + calcDiffBX, y + calcDiffBY);
        this.background3.setPosition(x + calcDiffBX, y + calcDiffBY);
        // // animation frontgrounds
        const { ajusteFX, ajusteFY } = { ajusteFX: 4, ajusteFY: 2 }
        const calcDiffFX = (x2 - x) / ajusteFX
        const calcDiffFY = (y2 - y) / ajusteFY;
        this.background4.setPosition(x + calcDiffFX, y + offsetLevel + 470 + calcDiffFY);
        this.background5.setPosition(x + calcDiffFX, y + offsetLevel + 470 + calcDiffFY);
        this.background6.setPosition(x + this.background5.width - 15 + calcDiffFX, y + offsetLevel + 470 + calcDiffFY);
        this.background7.setPosition(x + this.background5.width + this.background6.width - 15 + calcDiffFX, y + offsetLevel + 470 + calcDiffFY);
        this.mountain4.setPosition(-200 + calcDiffFX, y + offsetLevel + calcDiffFY)
        this.mountain5.setPosition(1100 + calcDiffFX, y + offsetLevel + calcDiffFY)
        // // animation front mountains
        const { ajusteFMX, ajusteFMY } = { ajusteFMX: 20, ajusteFMY: 30 }
        const calcDiffFMX = -(x2 - x) / ajusteFMX
        const calcDiffFMY = -(y2 - y) / ajusteFMY;
        this.mountain1.setPosition(this.startingPoint.x + this.background5.width - 85 + calcDiffFMX, y + offsetLevel2 + 320 + calcDiffFMY)
        this.mountain2.setPosition(this.startingPoint.x - 270 + calcDiffFMX, y + offsetLevel2 + 350 + calcDiffFMY)
        this.mountain3.setPosition(1100 + calcDiffFMX, y + offsetLevel2 + 470 + calcDiffFMY)
        this.mountain6.setPosition(x + this.background5.width + this.background6.width - 15 + calcDiffFMX, y +470 + offsetLevel2 + calcDiffFMY)
    }

    addColliders() {
        if (this.scene.monchi) {
            if (this.pisos)
                this.scene.physics.add.collider(
                    this.scene.monchi,
                    this.pisos,
                    this.scene.touch,
                    () => true,
                    this.scene
                );
            if (this.pisos2)
                this.scene.physics.add.collider(
                    this.scene.monchi,
                    this.pisos2,
                    () => {
                        this.scene.changeGravity(true, 1000, 1)
                        this.scene.checkPoint = 1
                    },
                    () => true,
                    this.scene
                );
            if (this.pisos3)
                this.scene.physics.add.collider(
                    this.scene.monchi,
                    this.pisos3,
                    () => {
                            this.scene.rotateCam(true, 10);
                            this.scene.checkPoint = 2
                    },
                    () => true,
                    this.scene
                );
            if (this.coin)
                this.scene.physics.add.overlap(
                    this.scene.monchi,
                    this.coin,
                    () => this.scene.touchItem("coin"),
                    () => true,
                    this.scene
                );
            if (this.fireballGroup)
                this.scene.physics.add.overlap(
                    this.scene.monchi,
                    this.fireballGroup,
                    () => this.scene.touchItem("fireball"),
                    () => true,
                    this.scene
                );
            if (this.portal)
                this.scene.physics.add.overlap(
                    this.scene.monchi,
                    this.portal,
                    () => this.scene.win(),
                    () => true,
                    this.scene
                );
            if (this.pisos4)
                this.scene.physics.add.collider(
                    this.scene.monchi,
                    this.pisos4,
                    () => {
                        this.scene.canRot = true // medio hack, revisar lógica
                        this.scene.changeGravity(false, 1000, 2)
                        this.scene.rotateCam(false, 10)
                        if (this.cristal?.visible) {
                            this.scene.checkPoint = 0
                        }
                    },
                    () => true,
                    this.scene
                );
            if (this.movingFloor)
                this.scene.physics.add.collider(
                    this.scene.monchi,
                    this.movingFloor,
                    () => {
                        this.scene.touch()
                    },
                    () => true,
                    this.scene
                );
            if (this.movingFloorRot)
                this.scene.physics.add.collider(
                    this.scene.monchi,
                    this.movingFloorRot,
                    () => {
                        this.scene.touch()
                    },
                    () => true,
                    this.scene
                );
        }
    }

    createMap(data: { level: number; lifes: number }) {

        this.movingFloor = this.scene.physics.add.group({ allowGravity: false });
        this.movingFloorRot = this.scene.physics.add.group({ allowGravity: false });
        this.pisos = this.scene.physics.add.group({ allowGravity: false });
        this.pisosBack = this.scene.physics.add.group({ allowGravity: false });
        this.pisos2 = this.scene.physics.add.group({ allowGravity: false });
        this.pisos3 = this.scene.physics.add.group({ allowGravity: false });
        this.fireballGroup = this.scene.physics.add.group({ allowGravity: false });
        this.pisos4 = this.scene.physics.add.group({ allowGravity: false });
        this.amountLifes = data.lifes;
        this.coin = this.scene.physics.add.group({ allowGravity: false });
        this.aura = this.scene.physics.add.group({ allowGravity: false, immovable: true })
        this.portal = this.scene.physics.add.group({ allowGravity: false });
        const aura = this.scene.add.sprite(500, 1580, "auraTuto").setScale(0.6)
        this.aura.add(aura)


        this.scene.tweens.add({
            targets: aura,
            alpha: 0.4,
            duration: 1000,
            yoyo: true,
            repeat: -1
        })

        const p1Config: FloorConfig = {
            pos: { x: 600, y: 900 },
            texture: "plataformaNuevaA",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 50,
        };
        const p1 = new Floor(this.scene, p1Config, this.pisos);

        const p2Config: FloorConfig = {
            pos: { x: 850, y: 1100 },
            texture: "plataformaNuevaA",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 50,
            // tween: {
            //     duration: 4500,
            //     paused: false,
            //     yoyo: true,
            //     repeat: -1,
            //     y: "-=800",
            // },
        };
        const p2 = new Floor(this.scene, p2Config, this.movingFloor).setVelocityY(-300);

        this.scene.tweens.add({
            duration: 3000,
            paused: false,
            yoyo: true,
            repeat: -1,
            targets: p2.body?.velocity,
            y: "+=600",
        })

        const p3Config: FloorConfig = {
            pos: { x: 600, y: 1300 },
            texture: "plataformaNuevaA",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 50,
        };
        const p3 = new Floor(this.scene, p3Config, this.pisos).setFlipX(true);

        const p5Config: FloorConfig = {
            pos: { x: 1100, y: 1100 }, // 1100 800
            texture: "plataformaNuevaA",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 50,
        };
        const p5 = new Floor(this.scene, p5Config, this.pisos);

        const p7Config: FloorConfig = {
            pos: { x: 1600, y: 1300 },
            texture: "plataformaNuevaA",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 50,
        };
        const p7 = new Floor(this.scene, p7Config, this.pisos);

        const p8Config: LargeFloorIslandConfig = {
            textureA: "plataformaNuevaLargaA",
            textureB: "plataformaNuevaLargaB",
            textureC: "plataformaNuevaLargaC",
            pos: { x: 1200, y: 1200 },
            width: {
                textureA: 90,
                textureB: 67,
                textureC: 115,
            },
            scale: { width: 0.7, height: 0.7 },
            height: 127,
            large: 4,
            rotated: false
        };
        const p8 = new LargeFloorIsland(this.scene, p8Config, this.pisos);

        const p9Config: FloorConfig = {
            pos: { x: 1800, y: 1400 },
            texture: "plataformaNuevaA",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 50,

        };
        const p9 = new Floor(this.scene, p9Config, this.pisos2).setTint(
            Phaser.Display.Color.GetColor(255, 101, 0)
        ).setFlipX(true);

        // const p4Config: LargeFloorConfig = {
        //     textureA: "plataformaLarga2",
        //     textureB: "plataformaLarga2",
        //     large: 7,
        //     gap: 0,
        //     pos: { x: 1500, y: 100 },
        //     fix: -20,
        //     scale: { width: 0.7, height: 0.7 },
        //     planeta: 1
        // };
        // const p4 = new LargeFloor(this.scene, p4Config, this.pisos);


        const p10Config: LargeFloorIslandConfig = {
            textureA: "plataformaNuevaLargaA",
            textureB: "plataformaNuevaLargaB",
            textureC: "plataformaNuevaLargaC",
            pos: { x: 1600, y: 350 },
            width: {
                textureA: 90,
                textureB: 67,
                textureC: 115,
            },
            scale: { width: 0.7, height: 0.7 },
            height: 127,
            large: 20,
            rotated: true
        };
        const p10 = new LargeFloorIsland(this.scene, p10Config, this.pisos)

        const p11Config: FloorConfig = {
            pos: { x: 2800, y: 400 },
            texture: "plataformaNuevaA",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 50,
        };
        const p11 = new Floor(this.scene, p11Config, this.pisos).setFlipY(true);

        const p12Config: FloorConfig = {
            pos: { x: 3000, y: 550 },
            texture: "plataformaNuevaA",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 50,
        };
        const p12 = new Floor(this.scene, p12Config, this.pisos).setFlipY(true).setFlipX(true);

        const p13Config: FloorConfig = {
            pos: { x: 3400, y: 450 }, //3550 700
            texture: "plataformaNuevaA",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 50,
        };
        const p13 = new Floor(this.scene, p13Config, this.pisos3).setTint(
            Phaser.Display.Color.GetColor(255, 101, 0)
        ).setVelocityX(150).setFlipY(true);

        this.scene.tweens.add({
            duration: 4500,
            paused: false,
            yoyo: true,
            repeat: -1,
            targets: p13.body?.velocity,
            x: "-=300",
        })

        // const p14Config: LargeFloorConfig = {
        //     textureA: "plataformaLarga",
        //     textureB: "plataformaLarga",
        //     large: 2,
        //     pos: { x: 4800, y: 1700 },
        //     gap: 0,
        //     scale: { width: 0.7, height: 0.7 },
        //     planeta: 1

        // };
        // const p14 = new LargeFloor(this.scene, p14Config, this.pisos);

        const p14Config: LargeFloorIslandConfig = {
            textureA: "plataformaNuevaLargaA",
            textureB: "plataformaNuevaLargaB",
            textureC: "plataformaNuevaLargaC",
            pos: { x: 4700, y: 1400 },
            width: {
                textureA: 90,
                textureB: 67,
                textureC: 115,
            },
            scale: { width: 0.7, height: 0.7 },
            height: 127,
            large: 20,
            rotated: false
        };
        const p14 = new LargeFloorIsland(this.scene, p14Config, this.pisos)

        const p15Config: FloorConfig = {
            pos: { x: 3800, y: 500 },
            texture: "plataformaNuevaA",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 50,
        };
        const p15 = new Floor(this.scene, p15Config, this.pisos).setFlipY(true).setFlipX(true);

        const p16Config: FloorConfig = {
            pos: { x: 4050, y: 450 },
            texture: "plataformaNuevaA",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 50,
        };
        const p16 = new Floor(this.scene, p16Config, this.pisos).setFlipY(true);

        const p17Config: FloorConfig = {
            pos: { x: 4300, y: 525 },
            texture: "plataformaNuevaA",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 50,
            // tween: {
            //     duration: 5000,
            //     paused: false,
            //     yoyo: true,
            //     repeat: -1,
            //     y: "+=500",
            // },
        };
        const p17 = new Floor(this.scene, p17Config, this.movingFloorRot).setFlipY(true).setVelocityY(150);

        this.scene.tweens.add({
            duration: 3000,
            paused: false,
            yoyo: true,
            repeat: -1,
            targets: p17.body?.velocity,
            y: "-=300",
        })

        const p18Config: FloorConfig = {
            pos: { x: 4600, y: 600 },
            texture: "plataformaNuevaA",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 50,
        };
        const p18 = new Floor(this.scene, p18Config, this.pisos).setFlipY(true).setFlipX(true);

        const p19Config: FloorConfig = {
            pos: { x: 4900, y: 500 },
            texture: "plataformaNuevaA",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 50,
        };
        const p19 = new Floor(this.scene, p19Config, this.pisos4).setTint(
            Phaser.Display.Color.GetColor(255, 101, 0)
        ).setFlipY(true);

        //Portal, Coin and Asteroids
        const portalConfig: FloorConfig = {
            texture: "plataformaFinalP1",
            pos: { x: 5400, y: 1290 },
            width: 100,
            height: 100,
        };
        const port = new Floor(this.scene, portalConfig, this.portal).setDepth(99)
        this.endPortal = port

        const coinConfig: FloorConfig = {
            texture: "cristal1",
            pos: { x: 600, y: 1200 },
            scale: { width: 0.7, height: 0.7 },
            width: 10,
            height: 18,
            fix: 10,
        };
        this.cristal = new Floor(this.scene, coinConfig, this.coin).setBodySize(140, 180).setDepth(9999);
        const cloudsGroup = this.scene.add.group()

        const c1Config: AsteroidGeneratorConfig = {
            texture: "nube1",
            x: 0,
            y: 500,
            delayed: 100,
            direction: 0,
            velocity: 20,
            scale: 1,
      group: cloudsGroup,
            depth: 99,
        };
        const c1 = new AsteroidGenerator(this.scene, c1Config);
        c1.start();

        const c2Config: AsteroidGeneratorConfig = {
            texture: "nube3",
            x: 3000,
            y: 600,
            delayed: 100,
            direction: 1,
            velocity: 30,
            scale: 1,
      group: cloudsGroup,
            depth: 99,
        };
        const c2 = new AsteroidGenerator(this.scene, c2Config);
        c2.start();

        const c3Config: AsteroidGeneratorConfig = {
            texture: "nube5",
            x: -1000,
            y: 300,
            delayed: 1600,
            direction: 0,
            velocity: 10,
            scale: 1.2,
      group: cloudsGroup,
            depth: 99,
        };
        const c3 = new AsteroidGenerator(this.scene, c3Config);
        c3.start();



        const mapObjects =
            cloudsGroup.getChildren().concat(
                this.movingFloor.getChildren(),
                this.movingFloorRot.getChildren(),
                this.pisos.getChildren(),
                this.pisosBack.getChildren(),
                this.pisos2.getChildren(),
                this.pisos3.getChildren(),
                this.pisos4.getChildren(),
                this.coin.getChildren(),
                this.aura.getChildren(),
                this.portal.getChildren(),
            )
        this.mapContainer.add(mapObjects)
        this.mapContainer.setDepth(999)
        this.scene.UICamera?.ignore(this.mapContainer)
    this.scene.UICamera?.ignore(this.frontContainer)


    }
    update() {
        if (this.scene.monchi) this.animateBackground(this.scene.cameras.main.midPoint);
    }
}
export default Mapa3;
