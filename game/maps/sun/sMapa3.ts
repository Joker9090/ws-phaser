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
import portal, { portalConfig } from "@/game/assets/portal";
// Scene in class
class sMapa3 {
    isJumping = false;
    debugGraphics: Phaser.GameObjects.Graphics;
    scene: Game;
    worldSize = {
        width: 4500,
        height: 4000,
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
    background7: Phaser.GameObjects.Image
    background8: Phaser.GameObjects.Image
    background9: Phaser.GameObjects.Image
    background10: Phaser.GameObjects.Image
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
    collected: Boolean = false;

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
            .image(this.startingPoint.x, this.startingPoint.y, "bgSun1")
            .setOrigin(0.5, 0.5).setScale(1.8);
        this.background2 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "bgSun2")
            .setOrigin(0.5, 0.5).setScale(1.8);
        this.background3 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "bgSun3")
            .setOrigin(0.5, 0.5).setScale(1.8);
        this.background4 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "bgSun4")
            .setOrigin(0.5, 0.5).setScale(1.8);
        this.background5 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "planetaSun1")
            .setOrigin(0.5, 0.5).setScale(0.9);
        this.background6 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "planetaSun2")
            .setOrigin(0.5, 0.5);
        this.background7 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "planetaSun3")
            .setOrigin(0.5, 0.5);
        this.background8 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "planetaSun4")
            .setOrigin(0.5, 0.5).setScale(0.7);
        this.background9 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "sol")
            .setOrigin(0.5, 0.5).setScale(0.7);
        this.background10 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "brilloSol")
            .setOrigin(0.5, 0.5).setScale(0.7);
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
        this.background5.setPosition(x + calcDiffX - 900, y + calcDiffY + 100);
        this.background6.setPosition(x + calcDiffX, y + calcDiffY - 300);
        this.background7.setPosition(x + calcDiffX - 100, y + calcDiffY - 180);
        this.background8.setPosition(x + calcDiffX + 1000, y + calcDiffY - 200);
        this.background9.setPosition(x + calcDiffX, y + calcDiffY + 700);
        this.background10.setPosition(x + calcDiffX, y + calcDiffY + 700);

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
        const aura = this.scene.add.sprite(this.startingPoint.x + 1680, this.startingPoint.y + 1000, "auraTuto").setScale(0.6)
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

        const portalInicioConfig: portalConfig = {
            spriteSheet: "portal4",
            pos: { x: 390, y: 1300 },
            // scale: { width: 0.1, height: 0.1 },
            width: 1000,
            height: 1500,
            scene: this.scene,
            collected: true
        };

        const portInicio = new portal(
            this.scene,
            portalInicioConfig,
            this.portalInit
        ).setDepth(1);

        const p1Config: FloorConfig = {
            texture: "plataformaSun",
            pos: { x: this.startingPoint.x, y: this.startingPoint.y + 120 },
            scale: { width: 0.7, height: 0.7 },
            fix: 60,
            width: 280,
            height: 80,
        }
        const p1 = new Floor(this.scene, p1Config, this.pisos)

        const p2Config: FloorConfig = {
            texture: "plataformaSun",
            pos: { x: this.startingPoint.x + 800, y: this.startingPoint.y + 120 },
            scale: { width: 0.7, height: 0.7 },
            fix: 60,
            width: 60,
            height: 280,
            rotated: true
        }
        const p2 = new Floor(this.scene, p2Config, this.pisos)

        const p3Config: FloorConfig = {
            texture: "plataformaSun",
            pos: { x: this.startingPoint.x + 300, y: this.startingPoint.y + 490 },
            scale: { width: 0.7, height: 0.7 },
            fix: 60,
            width: 60,
            height: 280,
            rotated: true
        }
        const p3 = new Floor(this.scene, p3Config, this.pisos)

        const p4Config: FloorConfig = {
            texture: "plataformaSun",
            pos: { x: this.startingPoint.x + 800, y: this.startingPoint.y + 790 },
            scale: { width: 0.7, height: 0.7 },
            fix: 60,
            width: 60,
            height: 280,
            rotated: true
        }
        const p4 = new Floor(this.scene, p4Config, this.pisos)

        const p5Config: FloorConfig = {
            texture: "plataformaSun",
            pos: { x: this.startingPoint.x + 300, y: this.startingPoint.y + 1290 },
            scale: { width: 0.7, height: 0.7 },
            fix: 60,

            width: 60,
            height: 280,

            rotated: true
        }
        const p5 = new Floor(this.scene, p5Config, this.pisos)

        // const p6Config: LargeFloorConfig = {
        //     gap: -350,
        //     textureA: "plataformaInicioSun",
        //     textureB: "plataformaMedioSun",
        //     textureC: "plataformaFinSun",
        //     pos: { x: this.startingPoint.x + 380, y: this.startingPoint.y + 1490 },
        //     scale: { width: 0.7, height: 0.7 },
        //     fix: 25,
        //     width: 100,
        //     height: 150,
        //     large: 3,
        //     rotated: true,
        //     planeta: 4
        // }
        // const p6 = new LargeFloor(this.scene, p6Config, this.pisos)

        const p7Config: LargeFloorConfig = {
            textureA: "plataformaInicioSun",
            textureB: "plataformaMedioSun",
            textureC: "plataformaFinSun",
            pos: { x: this.startingPoint.x + 1380, y: this.startingPoint.y + 90 },
            scale: { width: 0.7, height: 0.7 },
            fix: 25,
            gap: -350,
            width: 300,
            height: 150,
            large: 4,
            rotated: true,
            planeta: 4
        }
        const p7 = new LargeFloor(this.scene, p7Config, this.pisos)


        const p8Config: FloorConfig = {
            texture: "plataformaSun",
            pos: { x: this.startingPoint.x + 1880, y: this.startingPoint.y },
            scale: { width: 0.7, height: 0.7 },
            fix: 60,
            width: 50,
            height: 280,
            rotated: true
        }
        const p8 = new Floor(this.scene, p8Config, this.pisos)

        const p9Config: LargeFloorConfig = {
            textureA: "plataformaInicioSun",
            textureB: "plataformaMedioSun",
            textureC: "plataformaFinSun",
            pos: { x: this.startingPoint.x + 1490, y: this.startingPoint.y + 1200 },
            scale: { width: 0.7, height: 0.7 },
            fix: 25,
            gap: -350,
            width: 300,
            height: 150,
            large: 3,
            rotated: true,
            planeta: 4
        }
        const p9 = new LargeFloor(this.scene, p9Config, this.pisos)

        const p10Config: LargeFloorConfig = {
            textureA: "plataformaInicioSun",
            textureB: "plataformaMedioSun",
            textureC: "plataformaFinSun",
            pos: { x: this.startingPoint.x + 2390, y: this.startingPoint.y + 700 },
            scale: { width: 0.7, height: 0.7 },
            fix: 25,
            gap: -350,
            width: 300,
            height: 150,
            large: 3,
            rotated: true,
            planeta: 4
        }
        const p10 = new LargeFloor(this.scene, p10Config, this.pisos)

        const p11Config: FloorConfig = {
            texture: "plataformaSun",
            pos: { x: this.startingPoint.x + 2990, y: this.startingPoint.y - 300 },
            scale: { width: 0.7, height: 0.7 },
            fix: 60,
            width: 50,
            height: 280,
            rotated: true
        }
        const p11 = new Floor(this.scene, p11Config, this.pisos)

        /* Portal, Coin, Fireball and Asteroids */


        const fireballConfig: FloorConfig = {
            texture: "fireball",
            pos: { x: this.startingPoint.x + 500, y: this.startingPoint.y + 1400 }, // 500 1580
            scale: { width: 0.2, height: 0.2 },
            width: 200,
            height: 200,
            fix: 250,
            tween: {
                duration: 1600,
                paused: false,
                yoyo: true,
                repeat: -1,
                y: "-=1300",
            },
        };
        const fireball = new Floor(this.scene, fireballConfig, this.fireballGroup)
            .setAngularVelocity(30)


        const fireballConfig2: FloorConfig = {
            texture: "fireball",
            pos: { x: this.startingPoint.x + 1100, y: this.startingPoint.y }, // 500 1580
            scale: { width: 0.2, height: 0.2 },
            width: 200,
            height: 200,
            fix: 250,
            tween: {
                duration: 1700,
                paused: false,
                yoyo: true,
                repeat: -1,
                y: "+=1300",
            },
        };
        const fireball2 = new Floor(this.scene, fireballConfig2, this.fireballGroup)
            .setAngularVelocity(30)
        // .setOffset(220, 100);


        const fireballConfig3: FloorConfig = {
            texture: "fireball",
            pos: { x: this.startingPoint.x + 1600, y: this.startingPoint.y }, // 500 1580
            scale: { width: 0.2, height: 0.2 },
            width: 200,
            height: 200,
            fix: 250,
            tween: {
                duration: 1800,
                paused: false,
                yoyo: true,
                repeat: -1,
                y: "+=1300",
            },
        };
        const fireball3 = new Floor(this.scene, fireballConfig3, this.fireballGroup)
            .setAngularVelocity(30)


        const fireballConfig4: FloorConfig = {
            texture: "fireball",
            pos: { x: this.startingPoint.x + 2300, y: this.startingPoint.y }, // 500 1580
            scale: { width: 0.2, height: 0.2 },
            width: 200,
            height: 200,
            fix: 250,
            tween: {
                duration: 1790,
                paused: false,
                yoyo: true,
                repeat: -1,
                y: "+=1300",
            },
        };
        const fireball4 = new Floor(this.scene, fireballConfig4, this.fireballGroup)
            .setAngularVelocity(30)
        const portalConfig: FloorConfig = {
            texture: "portal",
            pos: { x: this.startingPoint.x + 2830, y: this.startingPoint.y - 300 },
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
            pos: { x: this.startingPoint.x + 1680, y: this.startingPoint.y + 1000 },
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
                    () => this.scene.lose(),
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
                    () => this.scene.winLevel(12),
                    () => true,
                    this.scene
                );
        }
    }

    update() {
        let firstChange = false;
        if (this.scene.monchi) {
            if (
                this.scene.monchi.x > 470
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





export default sMapa3;
