import Phaser from "phaser";
import AsteroidGenerator, {
    AsteroidGeneratorConfig,
} from "../../assets/AsteroidGenerator";
import Floor, { FloorConfig } from "../../assets/Floor";
import LargeFloor, { LargeFloorConfig } from "../../assets/LargeFloor";
import Game from "../../Game";
import UIScene from "../../UIScene";
import EventsCenter from "../../EventsCenter";
import Player from "@/game/assets/Player";
// Scene in class
class sMapa1 {
    isJumping = false;
    debugGraphics: Phaser.GameObjects.Graphics;
    scene: Game;
    worldSize = {
        width: 4500,
        height: 3000,
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
    pisos5?: Phaser.Physics.Arcade.Group
    movingFloor?: Phaser.Physics.Arcade.Group;
    movingFloorRot?: Phaser.Physics.Arcade.Group;
    coin?: Phaser.Physics.Arcade.Group;
    portal?: Phaser.Physics.Arcade.Group;
    lifesGroup?: Phaser.GameObjects.Group;
    changer?: Phaser.GameObjects.Image;
    portalInit?: Phaser.Physics.Arcade.Group;
    fireballGroup?: Phaser.Physics.Arcade.Group;
    background: Phaser.GameObjects.Image
    background2: Phaser.GameObjects.Image
    background3: Phaser.GameObjects.Image
    background4: Phaser.GameObjects.Image
    background5: Phaser.GameObjects.Image
    background6: Phaser.GameObjects.Image
    aura?: Phaser.Physics.Arcade.Group;
    UIScene?: UIScene;
    monchi: Player;
    startingPoint = {
        x: 400, //400
        y: 1490, //140
    };
    checkPointPos = {
        x: 400,
        y: 1490,
    };

    sideGrav: boolean = false;
    goingBack: any;
    cristal?: Floor;

    constructor(scene: Game, monchi: Player) {
        this.scene = scene;
        this.monchi = monchi;
        this.UIScene = this.scene.game.scene.getScene("UIScene") as UIScene;

        /* World size*/
        this.scene.physics.world.setBounds(
            0,
            0,
            this.worldSize.width,
            this.worldSize.height
        );

        /* Debug */
        this.debugGraphics = this.scene.add.graphics();
        this.debugGraphics.fillStyle(0x00ff00, 0.5);
        this.debugGraphics.fillRect(
            0,
            0,
            this.worldSize.width,
            this.worldSize.height
        );
        /* Debug */


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
    }
    // scaleBg() {
    //   if (this.scene.cameras.main.displayWidth >= 2000) {
    //     this.background.displayHeight = this.scene.cameras.main.displayHeight * 1.6
    //     this.background.displayWidth = this.scene.cameras.main.displayWidth * 1.6
    //     this.background2.displayHeight = this.scene.cameras.main.displayHeight * 1.6
    //     this.background2.displayWidth = this.scene.cameras.main.displayWidth * 1.6
    //     this.background3.displayHeight = this.scene.cameras.main.displayHeight * 1.6
    //     this.background3.displayWidth = this.scene.cameras.main.displayWidth * 1.6
    //     this.background4.displayHeight = this.scene.cameras.main.displayHeight * 1.6
    //     this.background4.displayWidth = this.scene.cameras.main.displayWidth * 1.6
    //     this.background5.displayHeight = this.scene.cameras.main.displayHeight * 1.6
    //     this.background5.displayWidth = this.scene.cameras.main.displayWidth * 1.6
    //     this.background6.displayHeight = this.scene.cameras.main.displayHeight * 1.6
    //     this.background6.displayWidth = this.scene.cameras.main.displayWidth * 1.6
    //   } else {
    //     return null
    //   }
    // }
    animateBackground(player: Phaser.GameObjects.Sprite) {
        const { x, y } = this.startingPoint;
        const { x: x2, y: y2 } = player;
        const calcDiffX = (x2 - x) / 1//mas grande menos movimiento
        const calcDiffY = (y2 - y - this.scene.cameras.main.displayHeight / 6) / 1;
        this.background.setPosition(x + calcDiffX, y + calcDiffY);
        this.background2.setPosition(x + calcDiffX, y + calcDiffY);
        this.background3.setPosition(x + calcDiffX, y + calcDiffY);
        this.background4.setPosition(x + calcDiffX, y + calcDiffY);
        this.background5.setPosition(x + calcDiffX, y + calcDiffY);
        this.background6.setPosition(x + calcDiffX, y + calcDiffY);
        // this.background7.setPosition(x + calcDiffX, y + calcDiffY);
        // this.background8.setPosition(x + calcDiffX, y + calcDiffY);
    }

    createMap(data: { level: number; lifes: number }) {
        console.log("cameras", this.scene.cameras.main)
        EventsCenter.emit("gravityArrow", "down");
        this.pisos = this.scene.physics.add.group({ allowGravity: false });
        this.pisosBack = this.scene.physics.add.group({ allowGravity: false });
        this.pisos2 = this.scene.physics.add.group({ allowGravity: false });
        this.pisos3 = this.scene.physics.add.group({ allowGravity: false });
        this.pisos4 = this.scene.physics.add.group({ allowGravity: false });
        this.pisos5 = this.scene.physics.add.group({ allowGravity: false });

        this.movingFloor = this.scene.physics.add.group({ allowGravity: false });
        this.movingFloorRot = this.scene.physics.add.group({ allowGravity: false });
        this.coin = this.scene.physics.add.group({ allowGravity: false });
        this.portal = this.scene.physics.add.group({ allowGravity: false });
        this.fireballGroup = this.scene.physics.add.group({ allowGravity: false });
        this.portalInit = this.scene.physics.add.group({ allowGravity: false });
        this.aura = this.scene.physics.add.group({ allowGravity: false, immovable: true })
        const aura = this.scene.add.sprite(this.startingPoint.x + 900, this.startingPoint.y - 1200, "auraTuto").setScale(0.6)
        this.aura.add(aura)
        this.scene.tweens.add({
            targets: aura,
            alpha: 0.4,
            duration: 1000,
            yoyo: true,
            repeat: -1
        })
        // this.scene.cameras.main.setZoom(0.2)
        // this.scene.cameras.main.shake(2000, 0.05);
        /* Platforms */

        const portalInicioConfig: FloorConfig = {
            texture: "portal",
            pos: { x: 390, y: 1300 },
            scale: { width: 0.1, height: 0.1 },
            width: 1000,
            height: 1500,
        };

        const portInicio = new Floor(
            this.scene,
            portalInicioConfig,
            this.portalInit
        ).setDepth(1);

        const p1Config: LargeFloorConfig = {
            textureA: "plataformaLarga2",
            textureB: "plataformaLarga2",
            pos: { x: this.startingPoint.x, y: this.startingPoint.y + 120 },
            scale: { width: 0.7, height: 0.7 },
            fix: 25,
            gap: 0,
            width: 380,
            height: 50,
            large: 4,
        }
        const p1 = new LargeFloor(this.scene, p1Config, this.pisos)

        const p2Config: LargeFloorConfig = {
            textureA: "plataformaLarga2",
            textureB: "plataformaLarga2",
            pos: { x: this.startingPoint.x + 1200, y: this.startingPoint.y - 200 },
            scale: { width: 0.7, height: 0.7 },
            fix: 25,
            gap: 0,
            width: 380,
            height: 50,
            large: 4,
            rotated: true,
        }

        const p2 = new LargeFloor(this.scene, p2Config, this.pisos)

        // const p3Config: LargeFloorConfig = {
        //     textureA: "plataformaLarga2",
        //     textureB: "plataformaLarga2",
        //     pos: { x: this.startingPoint.x, y: this.startingPoint.y + 600 },
        //     scale: { width: 0.7, height: 0.7 },
        //     fix: 25,
        //     gap: 0,
        //     width: 380,
        //     height: 50,
        //     large: 2,
        //     rotated: true,
        // }

        // const p3 = new LargeFloor(this.scene, p3Config, this.pisos)

        const p4Config: LargeFloorConfig = {
            textureA: "plataformaLarga2",
            textureB: "plataformaLarga2",
            pos: { x: this.startingPoint.x + 800, y: this.startingPoint.y + 1000 },
            scale: { width: 0.7, height: 0.7 },
            fix: 25,
            gap: 0,
            width: 380,
            height: 50,
            large: 1,
            rotated: true,
        }

        const p4 = new LargeFloor(this.scene, p4Config, this.pisos)

        const p5Config: LargeFloorConfig = {
            textureA: "plataformaLarga2",
            textureB: "plataformaLarga2",
            pos: { x: this.startingPoint.x + 1800, y: this.startingPoint.y + 300 },
            scale: { width: 0.7, height: 0.7 },
            fix: 25,
            gap: 0,
            width: 380,
            height: 50,
            large: 3,
            rotated: true,
        }

        const p5 = new LargeFloor(this.scene, p5Config, this.pisos)

        const p6Config: LargeFloorConfig = {
            textureA: "plataformaLarga2",
            textureB: "plataformaLarga2",
            pos: { x: this.startingPoint.x + 1800, y: this.startingPoint.y - 900 },
            scale: { width: 0.7, height: 0.7 },
            fix: 25,
            gap: 0,
            width: 380,
            height: 50,
            large: 3,
            rotated: true,
        }

        const p6 = new LargeFloor(this.scene, p6Config, this.pisos)

        const p7Config: LargeFloorConfig = {
            textureA: "plataformaLarga2",
            textureB: "plataformaLarga2",
            pos: { x: this.startingPoint.x + 800, y: this.startingPoint.y - 1200 },
            scale: { width: 0.7, height: 0.7 },
            fix: 25,
            gap: 0,
            width: 380,
            height: 50,
            large: 1,
            rotated: true,
        }

        const p7 = new LargeFloor(this.scene, p7Config, this.pisos)
        /* Portal, Coin, Fireball and Asteroids */

        const fireballConfig: FloorConfig = {
            texture: "fireball",
            pos: { x: this.startingPoint.x + 500, y: this.startingPoint.y }, // 500 1580
            scale: { width: 0.2, height: 0.2 },
            width: 200,
            height: 200,
            fix: 250,
            tween: {
                duration: 1000,
                paused: false,
                yoyo: true,
                repeat: -1,
                y: "+=400",
            },
        };
        const fireball = new Floor(this.scene, fireballConfig, this.fireballGroup)
            .setAngularVelocity(30)
        // .setOffset(220, 100);

        const fireballConfig2: FloorConfig = {
            texture: "fireball",
            pos: { x: this.startingPoint.x + 1090, y: this.startingPoint.y + 50 },
            scale: { width: 0.2, height: 0.2 },
            width: 200,
            height: 200,
            fix: 250,
            tween: {
                duration: 1000,
                paused: false,
                yoyo: true,
                repeat: -1,
                x: "+=1000",
            }
        };
        const fireball2 = new Floor(this.scene, fireballConfig2, this.fireballGroup)
            .setAngularVelocity(30)
        // .setOffset(220, 100);
        const portalConfig: FloorConfig = {
            texture: "portal",
            pos: { x: this.startingPoint.x + 1000, y: this.startingPoint.y + 1000 },
            scale: { width: 0.1, height: 0.1 },
            width: 1000,
            height: 1500,
        };

        const port = new Floor(this.scene, portalConfig, this.portal)
            .setRotation(Math.PI / 2)
            .setSize(1400, 800);

        const c1Config: AsteroidGeneratorConfig = {
            texture: "asteroid",
            x: -100,
            y: 150 + 1700,
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
            y: 150 + 800,
            delayed: 100,
            direction: 1,
            velocity: 100,
            scale: 0.5,
            depth: 1,
        };
        const c2 = new AsteroidGenerator(this.scene, c2Config);
        c2.start();
        const coinConfig: FloorConfig = {
            texture: "coin",
            pos: { x: this.startingPoint.x + 900, y: this.startingPoint.y - 1200 },
            scale: { width: 0.15, height: 0.15 },
            width: 10,
            height: 18,
            fix: 10,
        };

        this.cristal = new Floor(this.scene, coinConfig, this.coin).setBodySize(140, 180);

        // this.scene.cameras.main.shake(2000, 0.01);
    }

    addColliders() {
        if (this.scene.monchi) {
            if (this.fireballGroup)
                this.scene.physics.add.collider(
                    this.scene.monchi,
                    this.fireballGroup,
                    () => this.scene.losePlanet2Level1(),
                    () => true,
                    this.scene
                );
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
                    (a, b) => this.scene.float(a, b, 300),
                    () => true,
                    this.scene
                );
            if (this.pisos4)
                this.scene.physics.add.collider(
                    this.scene.monchi,
                    this.pisos4,
                    this.scene.noFloat,
                    () => true,
                    this.scene
                );
            if (this.pisos3)
                this.scene.physics.add.collider(
                    this.scene.monchi,
                    this.pisos3,
                    () => {
                        this.scene.rotateCam(10);
                        console.log(this.pisos3);
                    },
                    () => true,
                    this.scene
                );
            if (this.pisos5)
                this.scene.physics.add.collider(
                    this.scene.monchi,
                    this.pisos5,
                    (a, b) => {
                        this.scene.floatnRotate(a, b, 10);
                        console.log(this.pisos3);
                    },
                    () => true,
                    this.scene
                );
            if (this.movingFloor)
                this.scene.physics.add.collider(
                    this.scene.monchi,
                    this.movingFloor,
                    this.scene.movingFloorsGrav,
                    () => true,
                    this.scene
                );
            if (this.coin)
                this.scene.physics.add.overlap(
                    this.scene.monchi,
                    this.coin,
                    this.scene.coinCollected,
                    () => true,
                    this.scene
                );
            if (this.portal)
                this.scene.physics.add.overlap(
                    this.scene.monchi,
                    this.portal,
                    this.scene.winSMapa1,
                    () => true,
                    this.scene
                );
        }
    }

    update() {
        let firstChange = false;
        if (this.scene.monchi) {
            if (
                this.scene.monchi.x > 1000
            ) {
                this.sideGrav = true;
                firstChange = true;
            }
            if (this.sideGrav) {
                this.scene.physics.world.gravity.y = 0;
                if (firstChange) {
                    // hitbox vago de costado
                    this.scene.monchi
                        .setRotation(-Math.PI / 2)
                    // .setSize(300, 200)
                    // .setOffset(80, 120);
                    firstChange = false;
                }
            }
        }
        if (this.scene.monchi) {
            if (this.scene.monchi.y > 1100) {
                this.coin?.setVisible(true);
            }
        }
        // this.scaleBg()
        if (this.scene.cursors) {
            if (this.scene.monchi) {
                if (this.sideGrav) {
                    this.scene.monchi.checkSideGravity(this.scene.cursors);
                } else {
                    this.scene.monchi.checkMove(this.scene.cursors);
                }
                if (this) this.animateBackground(this.scene.monchi);

            }
        }
    }

}



export default sMapa1;
