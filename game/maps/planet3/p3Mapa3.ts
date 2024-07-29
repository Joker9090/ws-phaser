import Phaser from "phaser";
import Floor, { FloorConfig } from "../../assets/Floor";
import Game from "../../Game";
import Player from "@/game/assets/Player";
import portal, { portalConfig } from "@/game/assets/portal";
// Scene in class
class p3Mapa3 {
    isJumping = false;
    debugGraphics: Phaser.GameObjects.Graphics;
    scene: Game;
    worldSize = {
        width: 4500,
        height: 3800,
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
    endPortal?: Floor;

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
        this.background9.setPosition(x - 700 + calcDiffX, y + calcDiffY + 200).setScale(2).setDepth(2);
        this.background10.setPosition(x - 400 + calcDiffX, y + calcDiffY + 300).setScale(2).setDepth(2);
        this.background11.setPosition(x + calcDiffX - 300, y + calcDiffY + 800);
        this.background12.setPosition(x + calcDiffX + 200, y + calcDiffY - 200).setScale(2);
        this.background13.setPosition(x + calcDiffX + 111, y + calcDiffY - 150).setScale(2);
        this.background14.setPosition(x + calcDiffX + 320, y + calcDiffY);

        // this.background6.setPosition(x + calcDiffX, y + calcDiffY);
        // this.background7.setPosition(x + calcDiffX, y + calcDiffY);
        // this.background8.setPosition(x + calcDiffX, y + calcDiffY);
    }

    createMap(data: { level: number; lifes: number }) {
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
        const aura = this.scene.add.sprite(1680, 1500, "auraLvl2").setScale(0.6)
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
            spriteSheet: "portal3",
            pos: { x: 390, y: 1300 },
            // scale: { width: 0.1, height: 0.1 },
            width: 100,
            height: 200,
            scene: this.scene,
            collected: true,
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]
        };

        const portInicio = new portal(
            this.scene,
            portalInicioConfig,
            this.portalInit
        ).setDepth(3);

        const p1Config: FloorConfig = {
            texture: "plataformaLvl2",
            pos: { x: this.startingPoint.x, y: this.startingPoint.y + 120 },
            scale: { width: 0.3, height: 0.7 },
            fix: 25,
            width: 340,
            height: 50,
        }
        const p1 = new Floor(this.scene, p1Config, this.pisos)

        const p2Config: FloorConfig = {
            texture: "plataformaLvl2",
            pos: { x: this.startingPoint.x + 200, y: this.startingPoint.y + 120 },
            scale: { width: 0.3, height: 0.7 },
            fix: 25,
            width: 340,
            height: 50,
        }
        const p2 = new Floor(this.scene, p2Config, this.pisos).setVelocityY(300)
        this.scene.tweens.add({
            duration: 3500,
            paused: false,
            yoyo: true,
            repeat: -1,
            targets: p2.body?.velocity,
            y: "-=600",
        })


        const p3Config: FloorConfig = {
            texture: "plataformaLvl2",
            pos: { x: this.startingPoint.x + 400, y: this.startingPoint.y - 300 },
            scale: { width: 0.3, height: 0.7 },
            fix: 25,
            width: 340,
            height: 50,
        }
        const p3 = new Floor(this.scene, p3Config, this.pisos)

        const p4Config: FloorConfig = {
            texture: "plataformaLvl2",
            pos: { x: this.startingPoint.x + 800, y: this.startingPoint.y - 300 },
            scale: { width: 0.3, height: 0.7 },
            fix: 25,
            width: 340,
            height: 50,
        }
        const p4 = new Floor(this.scene, p4Config, this.pisos).setVelocityX(300)
        this.scene.tweens.add({
            duration: 2300,
            paused: false,
            yoyo: true,
            repeat: -1,
            targets: p4.body?.velocity,
            x: "-=600",
        })


        const p5Config: FloorConfig = {
            texture: "plataformaLvl2",
            pos: { x: this.startingPoint.x + 1290, y: this.startingPoint.y - 150 },
            scale: { width: 0.3, height: 0.7 },
            fix: 25,
            width: 340,
            height: 50,
        }
        const p5 = new Floor(this.scene, p5Config, this.pisos).setVelocityY(400)
        this.scene.tweens.add({
            duration: 2500,
            paused: false,
            yoyo: true,
            repeat: -1,
            targets: p5.body?.velocity,
            y: "-=800",
        })
        const p6Config: FloorConfig = {
            texture: "plataformaLvl2",
            pos: { x: this.startingPoint.x + 1690, y: this.startingPoint.y - 10 },
            scale: { width: 0.3, height: 0.7 },
            fix: 25,
            width: 340,
            height: 50,
        }
        const p6 = new Floor(this.scene, p6Config, this.pisos).setVelocityX(400)
        this.scene.tweens.add({
            duration: 2500,
            paused: false,
            yoyo: true,
            repeat: -1,
            targets: p6.body?.velocity,
            x: "-=800",
        })


        const p7Config: FloorConfig = {
            texture: "plataformaLvl2",
            pos: { x: this.startingPoint.x + 1900, y: this.startingPoint.y + 250 },
            scale: { width: 0.3, height: 0.7 },
            fix: 25,
            width: 340,
            height: 50,
        }
        const p7 = new Floor(this.scene, p7Config, this.pisos)
        /* Portal, Coin, Fireball and Asteroids */

        // const fireballConfig: FloorConfig = {
        //     texture: "fireball",
        //     pos: { x: this.startingPoint.x + 1300, y: this.startingPoint.y - 120 }, // 500 1580
        //     scale: { width: 0.2, height: 0.2 },
        //     width: 200,
        //     height: 200,
        //     fix: 250,
        //     tween: {
        //         duration: 1800,
        //         paused: false,
        //         yoyo: true,
        //         repeat: -1,
        //         y: "-=500",
        //     },
        // };
        // const fireball = new Floor(this.scene, fireballConfig, this.fireballGroup)
        //     .setAngularVelocity(30)
        // // .setOffset(220, 100);

        const portalConfig: FloorConfig = {
            spriteSheet: "portal3",
            texture: "portal3",
            pos: { x: this.startingPoint.x + 1990, y: this.startingPoint.y + 100 },
            // scale: { width: 0.1, height: 0.1 },
            width: 100,
            height: 100,
            // scene: this.scene,
            // collected: this.collected,
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]
        };

        const port = new Floor(this.scene, portalConfig, this.portal).setDepth(3);
        this.endPortal = port

        // const c1Config: AsteroidGeneratorConfig = {
        //     texture: "asteroid",
        //     x: -100,
        //     y: 150 + 1700,
        //     delayed: 100,
        //     direction: 0,
        //     velocity: 100,
        //     scale: 0.7,
        //     depth: 1,
        // };
        // const c1 = new AsteroidGenerator(this.scene, c1Config);
        // c1.start();

        // const c2Config: AsteroidGeneratorConfig = {
        //     texture: "asteroid2",
        //     x: 3000,
        //     y: 150 + 800,
        //     delayed: 100,
        //     direction: 1,
        //     velocity: 100,
        //     scale: 0.5,
        //     depth: 1,
        // };
        // const c2 = new AsteroidGenerator(this.scene, c2Config);
        // c2.start();
        const coinConfig: FloorConfig = {
            texture: "cristalLvl2",
            pos: { x: 1680, y: 1500 },
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
                    () => this.scene.winLevel(9),
                    () => true,
                    this.scene
                );
        }
    }

    update() {

        if (!this.goingBack) {
            if (this.scene.monchi && this.scene.cameraNormal) {
                this.scene.monchi.checkMove(this.scene.cursors);
            } else if (this.scene.monchi && this.scene.cameraNormal == false) {
                this.scene.monchi?.checkMoveRot(this.scene.cursors);
            }
        } else if (this.goingBack) {
            if (this.scene.monchi)
                this.scene.monchi.setY(1700 - this.scene.monchi.displayHeight);
        }
        if (this.scene.monchi) this.animateBackground(this.scene.monchi);
    }

}



export default p3Mapa3;
