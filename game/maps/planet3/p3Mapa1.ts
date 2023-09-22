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
class p3Mapa1 {
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
    background7: Phaser.GameObjects.Image
    background8: Phaser.GameObjects.Image
    background9: Phaser.GameObjects.Image
    background10: Phaser.GameObjects.Image
    background11: Phaser.GameObjects.Image
    background12: Phaser.GameObjects.Image
    background13: Phaser.GameObjects.Image
    background14: Phaser.GameObjects.Image
    background15: Phaser.GameObjects.Image
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
            .image(this.startingPoint.x, this.startingPoint.y, "bg")
            .setOrigin(0.5, 0.5).setScale(1.8);
        this.background2 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "nube1")
            .setOrigin(0.5, 0.5).setScale(1.8);
        this.background3 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "nube2")
            .setOrigin(0.5, 0.5).setScale(1.8);
        this.background4 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "nube3")
            .setOrigin(0.5, 0.5).setScale(1.8);
        this.background5 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "nube4")
            .setOrigin(0.5, 0.5).setScale(1.8);
        this.background6 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "nube5")
            .setOrigin(0.5, 0.5).setScale(1.8);
        this.background7 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "nube6")
            .setOrigin(0.5, 0.5).setScale(1.8);
        this.background8 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "nube6")
            .setOrigin(0.5, 0.5).setScale(1.8);
        this.background9 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "arbol")
            .setOrigin(0.5, 0.5).setDepth(1).setScale(0.8);
        this.background10 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "arbol2")
            .setOrigin(0.5, 0.5).setDepth(1).setScale(0.8);
        this.background11 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "pisoLvl2")
            .setOrigin(0.5, 0.5).setDepth(0);

        this.background12 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "starsLvl2")
            .setOrigin(0.5, 0.5).setDepth(0);
        this.background13 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "stars2Lvl2")
            .setOrigin(0.5, 0.5).setDepth(0);
        this.background14 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "stars3Lvl2")
            .setOrigin(0.5, 0.5).setDepth(0);
        this.background15 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "stars4Lvl2")
            .setOrigin(0.5, 0.5).setDepth(0);
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
        this.background7.setPosition(x + calcDiffX, y + calcDiffY);
        this.background8.setPosition(x + calcDiffX, y + calcDiffY);
        this.background9.setPosition(x - 700 + calcDiffX, y + calcDiffY + 200);
        this.background10.setPosition(x - 400 + calcDiffX, y + calcDiffY + 300);
        this.background11.setPosition(x + calcDiffX - 300, y + calcDiffY + 600);
        this.background12.setPosition(x + calcDiffX + 200, y + calcDiffY - 200);
        this.background13.setPosition(x + calcDiffX + 111, y + calcDiffY - 150);
        this.background14.setPosition(x + calcDiffX + 320, y + calcDiffY);

        // this.background6.setPosition(x + calcDiffX, y + calcDiffY);
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
        const aura = this.scene.add.sprite(2300, 1100, "auraTuto").setScale(0.6)
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
            pos: { x: 470, y: 1300 },
            scale: { width: 0.1, height: 0.1 },
            width: 1000,
            height: 1500,
        };

        const portInicio = new Floor(
            this.scene,
            portalInicioConfig,
            this.portalInit
        ).setDepth(1);

        const p1Config: FloorConfig = {
            pos: { x: 730, y: 1700 },
            texture: "plataformaLvl2",
            scale: { width: 1.8, height: 0.7 },
            rotated: false,
            width: 400,
            height: 110,
            // fix: 100
        };
        const p1 = new Floor(this.scene, p1Config, this.pisos);


        const p2Config: FloorConfig = {
            texture: "plataformaLvl2",
            pos: { x: 1470, y: 1850 },
            scale: { width: 0.5, height: 0.7 },
            width: 390,
            height: 50,
            rotated: false,
        };
        const p2 = new Floor(this.scene, p2Config, this.pisos2).setDepth(2).setTint(
            Phaser.Display.Color.GetColor(255, 101, 0)
        );

        const p3Config: FloorConfig = {
            texture: "plataformaLvl2",
            pos: { x: 1400, y: 450 },
            scale: { width: 0.3, height: 0.7 },
            width: 390,
            height: 50,
            rotated: false,
            inverted: true
        };
        const p3 = new Floor(this.scene, p3Config, this.pisos).setDepth(2);

        const p4Config: FloorConfig = {
            texture: "plataformaLvl2",
            pos: { x: 1700, y: 450 },
            scale: { width: 0.3, height: 0.7 },
            width: 490,
            height: 50,
            rotated: false,
            inverted: true
        };
        const p4 = new Floor(this.scene, p4Config, this.pisos).setDepth(2);
        const p5Config: FloorConfig = {
            texture: "plataformaLvl2",
            pos: { x: 2000, y: 450 },
            scale: { width: 0.3, height: 0.7 },
            width: 380,
            height: 50,
            rotated: false,
            inverted: true,
            tween: {
                duration: 2000,
                paused: false,
                yoyo: true,
                repeat: -1,
                y: "+=300",
            }
        };
        const p5 = new Floor(this.scene, p5Config, this.pisos3).setDepth(2)
        const p6Config: FloorConfig = {
            texture: "plataformaLvl2",
            pos: { x: 2300, y: 800 },
            scale: { width: 0.5, height: 0.7 },
            width: 340,
            height: 50,
            rotated: false,
            inverted: true,

        };
        const p6 = new Floor(this.scene, p6Config, this.pisos4).setDepth(2)

        // const p7Config: FloorConfig = {
        //     texture: "plataformaLarga2",
        //     pos: { x: 2350, y: 1300 },
        //     scale: { width: 0.5, height: 0.7 },
        //     width: 340,
        //     height: 50,
        //     rotated: false,
        // };
        // const p7 = new Floor(this.scene, p7Config, this.pisos)

        // const p8Config: FloorConfig = {
        //     pos: { x: 2800, y: 1100 },
        //     texture: "plataformaLvl2",
        //     scale: { width: 1.8, height: 0.7 },
        //     width: 800,
        //     height: 110,
        //     rotated: true,
        // };
        // const p8 = new Floor(this.scene, p8Config, this.pisos).setDepth(2)


        const p9Config: FloorConfig = {
            texture: "plataformaLvl2",
            pos: { x: 2700, y: 800 },
            // pos: { x: this.startingPoint.x, y: this.startingPoint.y - 600 },
            scale: { width: 0.8, height: 0.7 },
            fix: 20,
            height: 490,
            width: 110,
            rotated: true,
        };
        const p9 = new Floor(this.scene, p9Config, this.pisos).setDepth(2)

        const p12Config: FloorConfig = {
            texture: "plataformaLvl2",
            pos: { x: 2300, y: 1300 },
            // pos: { x: this.startingPoint.x, y: this.startingPoint.y - 600 },
            scale: { width: 0.8, height: 0.7 },
            fix: 20,
            height: 110,
            width: 490,
            // rotated: true,
        };
        const p12 = new Floor(this.scene, p12Config, this.pisos).setDepth(2)


        const p10Config: FloorConfig = {
            texture: "plataformaLvl2",
            pos: { x: 3200, y: 400 },
            scale: { width: 0.7, height: 0.7 },
            width: 50,
            fix: 20,
            height: 380,
            rotated: true,
        };
        const p10 = new Floor(this.scene, p10Config, this.pisos).setDepth(2)

        const p11Config: LargeFloorConfig = {
            textureA: "plataformaLvl2",
            textureB: "plataformaLvl2",
            large: 1,
            gap: 0,
            pos: { x: 3400, y: 50 },
            scale: { width: 0.7, height: 0.7 },
            width: 380,
            fix: 20,
            height: 50,
            rotated: true,
        };
        const p11 = new LargeFloor(this.scene, p11Config, this.pisos).setDepth(2)
        /* Portal, Coin, Fireball and Asteroids */

        const portalConfig: FloorConfig = {
            texture: "portal",
            pos: { x: 2900, y: 10 },
            scale: { width: 0.1, height: 0.1 },
            width: 1000,
            height: 1500,
            rotated: true
        };

        const port = new Floor(this.scene, portalConfig, this.portal).setDepth(2)
            // .setRotation(Math.PI / 2)
            .setSize(800, 1400);

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
            pos: { x: 2300, y: 1100 },
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
                    (a, b) => this.scene.float(a, b, 600),
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
                    () => this.scene.winLevel(7),
                    () => true,
                    this.scene
                );
        }
    }

    update() {
        let firstChange = false;
        if (this.scene.monchi) {
            if (
                this.scene.monchi.x > 2300
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
                } else if (this.scene.monchi && this.scene.cameraNormal == false) {
                    this.scene.monchi?.checkMoveRot(this.scene.cursors);
                }
                else {
                    this.scene.monchi.checkMove(this.scene.cursors);
                }
                if (this) this.animateBackground(this.scene.monchi);

            }
        }
        console.log(this.sideGrav, "sideG")
    }

}



export default p3Mapa1;
