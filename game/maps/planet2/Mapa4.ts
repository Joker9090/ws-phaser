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

class Mapa4 {
    isJumping = false;
    // debugGraphics: Phaser.GameObjects.Graphics;
    scene: Game;
    worldSize = {
        width: 10000,
        height: 1820,
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
    // no float + rotate cam
    pisos5?: Phaser.Physics.Arcade.Group;

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
    checkPoint1 = {
        x: 1700, //500
        y: 600, //800
    };
    loseConfig: loseConfigFromMapType = [
        {
            positions: this.startingPoint,
            cameraDirection: "NORMAL",
            PlayerDirection: "NORMAL",
            gravityDown: true
        },
        {
            positions: this.checkPoint1,
            cameraDirection: "ROTATED",
            PlayerDirection: "ROTATED",
            gravityDown: false
        },
    ];
    nextScene: string | undefined = 'postal1_planeta2';

    background: Phaser.GameObjects.Image;
    backgroundStars: Phaser.GameObjects.Image;
    background2: Phaser.GameObjects.Image;
    background3: Phaser.GameObjects.Image;
    background4: Phaser.GameObjects.Image;
    background5: Phaser.GameObjects.Image;
    // background6: Phaser.GameObjects.Image;
    // background7: Phaser.GameObjects.Image;
    // mountain1: Phaser.GameObjects.Image;
    // mountain2: Phaser.GameObjects.Image;
    // mountain3: Phaser.GameObjects.Image;
    mountain4: Phaser.GameObjects.Image;
    mountain5: Phaser.GameObjects.Image;
    // mountain6: Phaser.GameObjects.Image;

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
            .image(this.startingPoint.x, this.startingPoint.y, "p1backgroundDia")
            .setOrigin(0.5, 0.5)
        this.backgroundStars = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "p1backgroundDia")
            .setOrigin(0.5, 0.5)
        this.background2 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "p1backgroundNoche")
            .setOrigin(0.5, 0.5)
        this.background3 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "p1capaOscuridad")
            .setOrigin(0.5, 0.5)
        this.background4 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y + 530, "frontground1p1")
            .setOrigin(1, 1).setScale(1);
        this.background5 = this.scene.add
            .image(this.startingPoint.x - 5, this.startingPoint.y + 530, "frontground1p1")
            .setOrigin(0, 1).setScale(1).setFlipX(true);
        // this.background6 = this.scene.add
        //     .image(this.startingPoint.x - 5 + this.background5.x, this.startingPoint.y + 530, "frontground1p1")
        //     .setOrigin(0, 1).setScale(1)
        // this.background7 = this.scene.add
        //     .image(this.startingPoint.x - 5 + this.background6.x, this.startingPoint.y + 530, "frontground1p1")
        // .setOrigin(0, 1).setScale(1).setFlipX(true);
        this.mountain4 = this.scene.add.image(200, this.startingPoint.y + 500, "montaña1p1")
        this.mountain5 = this.scene.add.image(1100, this.startingPoint.y + 520, "montaña2p1")

        // this.mountain1 = this.scene.add.image(this.startingPoint.x + this.background5.width - 15, this.startingPoint.y - 370 + 300, "montaña3").setScale(1.2)
        // this.mountain2 = this.scene.add.image(this.startingPoint.x - 70, this.startingPoint.y + 350 + 500, "montaña5").setScale(1.4)
        // this.mountain3 = this.scene.add.image(1400, this.startingPoint.y + 770, "montaña3").setScale(1.3)
        // this.mountain6 = this.scene.add.image(this.startingPoint.x + this.background5.width + this.background6.width - 15, this.startingPoint.y + 770, "montaña5").setOrigin(0.5, 0).setScale(1.3)

        this.mapContainer.add([
            this.background,
            this.background2,
            this.backgroundStars,
            this.background3,
            this.background4,
            this.background5,
            // this.background6,
            // this.background7,
            this.mountain4,
            this.mountain5,
        ])

        this.frontContainer.add([
            // this.mountain1,
            // this.mountain2,
            // this.mountain3,
            // this.mountain6
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
        this.backgroundStars.setPosition(x + calcDiffBX, y + calcDiffBY);
        this.background.setPosition(x + calcDiffBX, y + calcDiffBY);
        this.background2.setPosition(x + calcDiffBX, y + calcDiffBY);
        this.background3.setPosition(x + calcDiffBX, y + calcDiffBY);
        // // animation frontgrounds
        const { ajusteFX, ajusteFY } = { ajusteFX: 4, ajusteFY: 2 }
        const calcDiffFX = (x2 - x) / ajusteFX
        const calcDiffFY = (y2 - y) / ajusteFY;
        this.background4.setPosition(x + calcDiffFX, y + offsetLevel + 470 + calcDiffFY);
        this.background5.setPosition(x + calcDiffFX, y + offsetLevel + 470 + calcDiffFY);
        // this.background6.setPosition(x + this.background5.width - 15 + calcDiffFX, y + offsetLevel + 470 + calcDiffFY);
        // this.background7.setPosition(x + this.background5.width + this.background6.width - 15 + calcDiffFX, y + offsetLevel + 470 + calcDiffFY);
        this.mountain4.setPosition(-200 + calcDiffFX, y + offsetLevel + calcDiffFY)
        this.mountain5.setPosition(1100 + calcDiffFX, y + offsetLevel + calcDiffFY)
        // // // animation front mountains
        // const { ajusteFMX, ajusteFMY } = { ajusteFMX: 20, ajusteFMY: 30 }
        // const calcDiffFMX = -(x2 - x) / ajusteFMX
        // const calcDiffFMY = -(y2 - y) / ajusteFMY;
        // this.mountain1.setPosition(this.startingPoint.x + this.background5.width - 85 + calcDiffFMX, y + offsetLevel2 + 320 + calcDiffFMY)
        // this.mountain2.setPosition(this.startingPoint.x - 270 + calcDiffFMX, y + offsetLevel2 + 350 + calcDiffFMY)
        // this.mountain3.setPosition(1100 + calcDiffFMX, y + offsetLevel2 + 470 + calcDiffFMY)
        // this.mountain6.setPosition(x + this.background5.width + this.background6.width - 15 + calcDiffFMX, y + 470 + offsetLevel2 + calcDiffFMY)
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
                        this.scene.changeGravity(true, 1000, 3)
                        // this.scene.checkPoint = 1
                    },
                    () => true,
                    this.scene
                );
            if (this.pisos3)
                this.scene.physics.add.collider(
                    this.scene.monchi,
                    this.pisos3,
                    () => {
                        if (this.scene.checkPoint === 0) {
                            this.scene.rotateCam(true, 10);
                            this.scene.checkPoint = 1
                        }
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
                    () => {
                        this.scene.touchItem("fireball")
                        this.scene.monchi?.setVelocity(0)
                    },
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
                        this.scene.changeGravity(false, 1000, 3)
                        // this.scene.rotateCam(false, 10)
                        // this.scene.checkPoint = 0
                    },
                    () => true,
                    this.scene
                );
            if (this.pisos5)
                this.scene.physics.add.collider(
                    this.scene.monchi,
                    this.pisos5,
                    () => {
                        this.scene.canRot = true // medio hack, revisar lógica
                        this.scene.changeGravity(false, 1000, 3)
                        this.scene.rotateCam(false, 10)
                        // this.scene.checkPoint = 0
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
        this.pisos5 = this.scene.physics.add.group({ allowGravity: false });
        this.amountLifes = data.lifes;
        this.coin = this.scene.physics.add.group({ allowGravity: false });
        this.aura = this.scene.physics.add.group({ allowGravity: false, immovable: true })
        this.portal = this.scene.physics.add.group({ allowGravity: false });





        const p1Config: FloorConfig = {
            pos: { x: 600, y: 1100 },
            texture: "pSimple1p1",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 50,
        };
        const p1 = new Floor(this.scene, p1Config, this.pisos);

        const p2Config: FloorConfig = {
            pos: { x: 800, y: 1400 },
            texture: "pSimple2p1",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 50,
        };
        const p2 = new Floor(this.scene, p2Config, this.pisos2).setTint(Phaser.Display.Color.GetColor(255, 101, 0));

        const fireball1Config: FloorConfig = {
            spriteSheet: "meteoritop1",
            texture: "meteoritop1",
            pos: { x: 950, y: 0 }, // 500 1580
            width: 100,
            height: 100,
            tween: {
                duration: 5000,
                repeat: -1,
                y: "+=1500",
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        };
        const fireball = new Floor(this.scene, fireball1Config, this.fireballGroup).setScale(0.5)

        const p3Config: FloorConfig = {
            pos: { x: 1100, y: 400 },
            texture: "pSimple1p1",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 50,
        };
        const p3 = new Floor(this.scene, p3Config, this.pisos4).setFlipX(true).setFlipY(true).setTint(Phaser.Display.Color.GetColor(255, 101, 0));

        const fireball2Config: FloorConfig = {
            spriteSheet: "meteoritop1",
            texture: "meteoritop1",
            pos: { x: 1250, y: 1900 }, // 500 1580
            width: 100,
            height: 100,
            tween: {
                delay: 2500,
                duration: 5000,
                repeat: -1,
                y: "-=1900",
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        };
        const fireball2 = new Floor(this.scene, fireball2Config, this.fireballGroup).setScale(0.5).setFlipY(true)

        const p4Config: FloorConfig = {
            pos: { x: 1400, y: 1400 },
            texture: "pSimple2p1",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 50,
        };
        const p4 = new Floor(this.scene, p4Config, this.pisos2).setTint(Phaser.Display.Color.GetColor(255, 101, 0));

        const fireball3Config: FloorConfig = {
            spriteSheet: "meteoritop1",
            texture: "meteoritop1",
            pos: { x: 1550, y: 0 }, // 500 1580
            width: 100,
            height: 100,
            tween: {
                duration: 5000,
                delay: 3333,
                repeat: -1,
                y: "+=1500",
            },
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        };
        const fireball3 = new Floor(this.scene, fireball3Config, this.fireballGroup).setScale(0.5)

        const p5Config: FloorConfig = {
            pos: { x: 1600, y: 400 },
            texture: "pSimple2p1",
            scale: { width: 1.7, height: 0.7 },
            width: 140,
            height: 50,
        };
        const p5 = new Floor(this.scene, p5Config, this.pisos3).setFlipX(true).setFlipY(true).setTint(Phaser.Display.Color.GetColor(255, 101, 255));

        const p6Config: FloorConfig = {
            pos: { x: 1900, y: 450 },
            texture: "pSimple1p1",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 50,
        };
        const p6 = new Floor(this.scene, p6Config, this.pisos).setFlipY(true)

        const p7Config: FloorConfig = {
            pos: { x: 2400, y: 450 },
            texture: "pSimple2p1",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 50,
        };
        const p7 = new Floor(this.scene, p7Config, this.pisos).setFlipY(true).setVelocity(400, 0)

        this.scene.tweens.add({
            duration: 3000,
            paused: false,
            yoyo: true,
            repeat: -1,
            targets: p7.body?.velocity,
            x: "-=800",
        })

        const p8Config: LargeFloorIslandConfig = {
            textureA: "longFloorLeftp1",
            textureB: "longFloorMiddleAp1",
            textureC: "longFloorRightp1",
            pos: { x: 3000, y: 500 },
            width: {
                textureA: 120,
                textureB: 45,
                textureC: 122,
            },
            scale: { width: 0.7, height: 0.7 },
            height: 89,
            large: 15,
            rotated: true
        };
        const p8 = new LargeFloorIsland(this.scene, p8Config, this.pisos);

        const p9Config: FloorConfig = {
            pos: { x: 3800, y: 490 },
            texture: "pSimple1p1",
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 50,
        };
        const p9 = new Floor(this.scene, p9Config, this.pisos5).setFlipY(true).setTint(Phaser.Display.Color.GetColor(255, 101, 0));

        const p10Config: LargeFloorIslandConfig = {
            textureA: "longFloorLeftp1",
            textureB: "longFloorMiddleBp1",
            textureC: "longFloorRightp1",
            pos: { x: 3700, y: 1250 },
            width: {
                textureA: 120,
                textureB: 45,
                textureC: 122,
            },
            scale: { width: 0.7, height: 0.7 },
            height: 89,
            large: 20,
            rotated: false
        };
        const p10 = new LargeFloorIsland(this.scene, p10Config, this.pisos);

        //Portal, Coin and Asteroids
        const portalConfig: FloorConfig = {
            texture: "cuevap1",
            pos: { x: 4200, y: 1130 },
            width: 100,
            height: 100,
        };
        const port = new Floor(this.scene, portalConfig, this.portal).setDepth(99).setScale(0.7)
        this.endPortal = port

        const coinConfig: FloorConfig = {
            texture: "comida",
            pos: { x: 2150, y: 600 },
            scale: { width: 0.5, height: 0.5 },
            width: 10,
            height: 18,
            fix: 10,
        };
        this.cristal = new Floor(this.scene, coinConfig, this.coin).setBodySize(140, 180);

        const c1Config: AsteroidGeneratorConfig = {
            texture: "nube1p1",
            x: 0,
            y: 500,
            delayed: 100,
            direction: 0,
            velocity: 20,
            scale: 1,
            depth: 99,
        };
        const c1 = new AsteroidGenerator(this.scene, c1Config);
        c1.start();

        const c2Config: AsteroidGeneratorConfig = {
            texture: "nube2p1",
            x: 3000,
            y: 600,
            delayed: 100,
            direction: 1,
            velocity: 30,
            scale: 1,
            depth: 99,
        };
        const c2 = new AsteroidGenerator(this.scene, c2Config);
        c2.start();

        const mapObjects =
            this.movingFloor.getChildren().concat(
                this.movingFloorRot.getChildren(),
                this.fireballGroup.getChildren(),
                this.pisos.getChildren(),
                this.pisosBack.getChildren(),
                this.pisos2.getChildren(),
                this.pisos3.getChildren(),
                this.pisos4.getChildren(),
                this.pisos5.getChildren(),
                this.coin.getChildren(),
                this.aura.getChildren(),
                this.portal.getChildren(),
            )
        this.mapContainer.add(mapObjects)
        this.scene.UICamera?.ignore(this.mapContainer)

    }
    update() {
        if (this.scene.monchi) this.animateBackground(this.scene.cameras.main.midPoint);
    }
}
export default Mapa4;
