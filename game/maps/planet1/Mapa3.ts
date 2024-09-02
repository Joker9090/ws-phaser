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

class Mapa3 {
    isJumping = false;
    // debugGraphics: Phaser.GameObjects.Graphics;
    scene: Game;
    worldSize = {
        width: 10000,
        height: 2500,
    };
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
        x: 500, //500
        y: 800, //800
    };
    checkPointPos1 = {
        x: 1800,
        y: 300,
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
            cameraDirection: "ROTATED",
            PlayerDirection: "ROTATED",
            gravityDown: false
        },
    ];
    nextScene: string | undefined = 'postal2_planeta1';

    background: Phaser.GameObjects.Image;
    background2: Phaser.GameObjects.Image;
    background3: Phaser.GameObjects.Image;
    background4: Phaser.GameObjects.Image;
    background5: Phaser.GameObjects.Image;
    background6: Phaser.GameObjects.Image;
    cristal?: Floor;
    collected: Boolean = false;
    endPortal?: Floor;

    mapContainer: Phaser.GameObjects.Container;

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

        this.background = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "newBg1")
            .setOrigin(0.5, 0.5).setScale(1.8);
        this.background2 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "newBg2")
            .setOrigin(0.5, 0.5).setScale(1.8);
        this.background3 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "newBg3")
            .setOrigin(0.5, 0.5).setScale(1.8);
        this.background4 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "newBg4")
            .setOrigin(0.5, 0.5).setScale(1.8);
        this.background5 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "newBg5")
            .setOrigin(0.5, 0.5).setScale(1.8);
        this.background6 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "newBg6")
            .setOrigin(0.5, 0.5).setScale(1.8);
        this.mapContainer.add([
            this.background,
            this.background2,
            this.background3,
            this.background4,
            this.background5,
            this.background6,
        ])
    }

    animateBackground(player: Phaser.GameObjects.Sprite) {
        const { x, y } = this.startingPoint;
        const { x: x2, y: y2 } = player;
        const calcDiffX = (x2 - x) / 1
        const calcDiffY = (y2 - y - this.scene.cameras.main.displayHeight / 6) / 1.3;
        this.background.setPosition(x + calcDiffX, y + calcDiffY);
        this.background2.setPosition(x + calcDiffX, y + calcDiffY);
        this.background3.setPosition(x + calcDiffX, y + calcDiffY);
        this.background4.setPosition(x + calcDiffX, y + calcDiffY);
        this.background5.setPosition(x + calcDiffX, y + calcDiffY);
        this.background6.setPosition(x + calcDiffX, y + calcDiffY);
    }

    addColliders() {
        if (this.scene.monchi) {
            if (this.portal) this.portal.setTint(0xff0000);
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
                        this.scene.changeGravity(true, 1000)
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
                        if (this.scene.checkPoint === 1) {
                            this.scene.rotateCam(true, 10);
                            this.scene.checkPoint = 2
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
                        this.scene.changeGravity(false, 1000)
                        this.scene.rotateCam(false, 10)
                        this.scene.checkPoint = 0
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
            texture: "plataformaLarga2",
            pos: { x: 500, y: 1000 },
            scale: { width: 0.4, height: 0.7 },
            width: 390,
            height: 50,
        };
        const p1 = new Floor(this.scene, p1Config, this.pisos);

        const p2Config: FloorConfig = {
            texture: "plataformaLarga2",
            pos: { x: 800, y: 1800 },
            scale: { width: 0.5, height: 0.7 },
            fix: 25,
            width: 390,
            height: 50,
            tween: {
                duration: 4500,
                paused: false,
                yoyo: true,
                repeat: -1,
                y: "-=1000",
            },
        };
        const p2 = new Floor(this.scene, p2Config, this.movingFloor);

        const p3Config: FloorConfig = {
            texture: "plataformaA",
            pos: { x: 500, y: 1700 },
            scale: { width: 0.7, height: 0.7 },
            fix: 25,
            width: 140,
            height: 50,
        };
        const p3 = new Floor(this.scene, p3Config, this.pisos);

        const p5Config: FloorConfig = {
            texture: "plataformaA",
            pos: { x: 1100, y: 800 }, // 1100 800
            scale: { width: 0.7, height: 0.7 },
            width: 140,
            height: 50,
        };
        const p5 = new Floor(this.scene, p5Config, this.pisos);

        const p6Config: LargeFloorConfig = {
            textureA: "plataformaLarga2",
            textureB: "plataformaLarga2",
            pos: { x: 1000, y: 1500 },
            scale: { width: 0.3, height: 0.5 },
            large: 1,
            gap: 0,
            planeta: 1
        };
        const p6 = new LargeFloor(this.scene, p6Config, this.pisos);

        const p7Config: FloorConfig = {
            texture: "plataformaA",
            pos: { x: 1600, y: 1500 },
            scale: { width: 0.7, height: 0.7 },
            fix: 25,
            width: 140,
            height: 50,
        };
        const p7 = new Floor(this.scene, p7Config, this.pisos);

        const p8Config: LargeFloorConfig = {
            textureA: "plataformaLarga2",
            textureB: "plataformaLarga2",
            large: 1,
            pos: { x: 1300, y: 1200 },
            scale: { width: 0.7, height: 0.7 },
            rotated: false,
            gap: 0,
            fix: 0,
            planeta: 1
        };
        const p8 = new LargeFloor(this.scene, p8Config, this.pisos);

        const p9Config: FloorConfig = {
            texture: "plataformaA",
            pos: { x: 1800, y: 1800 },
            scale: { width: 1.2, height: 0.7 },
            fix: 10,
            width: 180,
            height: 50,
        };
        const p9 = new Floor(this.scene, p9Config, this.pisos2).setTint(
            Phaser.Display.Color.GetColor(255, 101, 0)
        );

        const p4Config: LargeFloorConfig = {
            textureA: "plataformaLarga2",
            textureB: "plataformaLarga2",
            large: 7,
            gap: 0,
            fix: -20,
            pos: { x: 1500, y: 100 },
            scale: { width: 0.7, height: 0.7 },
            planeta: 1

        };

        const p4 = new LargeFloor(this.scene, p4Config, this.pisos);

        const p10Config: FloorConfig = {
            texture: "plataformaB",
            pos: { x: 2600, y: 250 },
            scale: { width: 1, height: 0.8 },
            fix: 25,
            width: 140,
            height: 50,
        };

        const p10 = new Floor(this.scene, p10Config, this.pisos);

        const p11Config: FloorConfig = {
            texture: "plataformaA",
            pos: { x: 2800, y: 400 },
            scale: { width: 1, height: 0.8 },
            fix: 25,
            width: 140,
            height: 50,
        };
        const p11 = new Floor(this.scene, p11Config, this.pisos);

        const p12Config: FloorConfig = {
            texture: "plataformaB",
            pos: { x: 3000, y: 550 },
            scale: { width: 1, height: 0.8 },
            fix: 25,
            width: 140,
            height: 50,
        };
        const p12 = new Floor(this.scene, p12Config, this.pisos);

        const p13Config: FloorConfig = {
            texture: "plataformaB",
            pos: { x: 3400, y: 700 }, //3550 700
            scale: { width: 0.7, height: 0.7 },
            fix: 25,
            width: 140,
            height: 50,
        };
        const p13 = new Floor(this.scene, p13Config, this.pisos3).setTint(
            Phaser.Display.Color.GetColor(255, 101, 0)
        ).setVelocityX(150);

        this.scene.tweens.add({
            duration: 4500,
            paused: false,
            yoyo: true,
            repeat: -1,
            targets: p13.body?.velocity,
            x: "-=300",
        })

        const p14Config: LargeFloorConfig = {
            textureA: "plataformaLarga",
            textureB: "plataformaLarga",
            large: 2,
            gap: 0,
            pos: { x: 4800, y: 1700 },
            scale: { width: 0.7, height: 0.7 },
            planeta: 1

        };
        const p14 = new LargeFloor(this.scene, p14Config, this.pisos);

        const p15Config: FloorConfig = {
            texture: "plataformaB",
            pos: { x: 3800, y: 500 },
            fix: 20,
            width: 150,
            height: 50,
            scale: { width: 1, height: 0.7 },
        };
        const p15 = new Floor(this.scene, p15Config, this.pisos);

        const p16Config: FloorConfig = {
            texture: "plataformaA",
            pos: { x: 4000, y: 300 },
            fix: 10,
            width: 170,
            height: 50,
            scale: { width: 1, height: 0.7 },
        };
        const p16 = new Floor(this.scene, p16Config, this.pisos);

        const p17Config: FloorConfig = {
            texture: "plataformaB",
            pos: { x: 4300, y: 100 },
            scale: { width: 1, height: 0.7 },
            fix: 20,
            width: 150,
            height: 50,
            tween: {
                duration: 5000,
                paused: false,
                yoyo: true,
                repeat: -1,
                y: "+=500",
            },
        };
        const p17 = new Floor(this.scene, p17Config, this.movingFloorRot);

        const p18Config: FloorConfig = {
            texture: "plataformaB",
            pos: { x: 4600, y: 600 },
            fix: 20,
            width: 150,
            height: 50,
            scale: { width: 1, height: 0.7 },
        };
        const p18 = new Floor(this.scene, p18Config, this.pisos);

        const p19Config: FloorConfig = {
            texture: "plataformaB",
            pos: { x: 4900, y: 300 },
            fix: 20,
            width: 150,
            height: 50,
            scale: { width: 1, height: 1 },
        };
        const p19 = new Floor(this.scene, p19Config, this.pisos4).setTint(
            Phaser.Display.Color.GetColor(255, 101, 0)
        );

        //Portal, Coin and Asteroids
        const portalConfig: FloorConfig = {
            spriteSheet: "portal1",
            texture: "portal1",
            pos: { x: 5400, y: 1590 },
            width: 100,
            height: 100,
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]
        };
        const port = new Floor(this.scene, portalConfig, this.portal).setDepth(99);
        this.endPortal = port

        const coinConfig: FloorConfig = {
            texture: "coin",
            pos: { x: 500, y: 1580 },
            scale: { width: 0.15, height: 0.15 },
            width: 10,
            height: 18,
            fix: 10,
        };
        this.cristal = new Floor(this.scene, coinConfig, this.coin).setBodySize(140, 180);

        const c1Config: AsteroidGeneratorConfig = {
            texture: "asteroid",
            x: -100,
            y: 1700,
            delayed: 100,
            direction: 0,
            velocity: 100,
            scale: 0.7,
            depth: 1,
        };
        const c1 = new AsteroidGenerator(this.scene, c1Config);
        c1.start();

        const c2Config: AsteroidGeneratorConfig = {
            texture: "asteroid2",
            x: 3000,
            y: 800,
            delayed: 100,
            direction: 1,
            velocity: 100,
            scale: 0.5,
            depth: 1,
        };
        const c2 = new AsteroidGenerator(this.scene, c2Config);
        c2.start();

      

        const mapObjects =
            this.movingFloor.getChildren().concat(
                this.movingFloorRot.getChildren(),
                this.pisos.getChildren(),
                this.pisosBack.getChildren(),
                this.pisos2.getChildren(),
                this.pisos3.getChildren(),
                this.pisos4.getChildren(),
                this.coin.getChildren(),
                this.aura.getChildren(),
                this.portal.getChildren(),
                this.aura.getChildren(),
            )
        this.mapContainer.add(mapObjects)
        this.scene.UICamera?.ignore(this.mapContainer)

    }
    update() {
        /* Attach background anim */
        if (this.scene.monchi) this.animateBackground(this.scene.monchi);
    }
}
export default Mapa3;
