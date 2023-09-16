import Phaser from "phaser";
import UIScene from "@/game/UIScene";
import Player from "@/game/assets/Player";
import Game from "@/game/Game";
import Floor, { FloorConfig } from "@/game/assets/Floor";
import LargeFloor, { LargeFloorConfig } from "@/game/assets/LargeFloor";

class p2Mapa2 {
    isJumping = false;
    scene: Game;
    worldSize = {
        width: 4500,
        height: 3000
    };
    checkPointPos = {
        x: 400,
        y: 1490,
    };
    pisos?: Phaser.Physics.Arcade.Group;
    pisosBack?: Phaser.Physics.Arcade.Group;
    pisos2?: Phaser.Physics.Arcade.Group;
    pisos3?: Phaser.Physics.Arcade.Group;
    pisos4?: Phaser.Physics.Arcade.Group;
    pisos5?: Phaser.Physics.Arcade.Group;
    movingFloor?: Phaser.Physics.Arcade.Group;
    movingFloorRot?: Phaser.Physics.Arcade.Group;
    coin?: Phaser.Physics.Arcade.Group;
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
    sideGrav: boolean = false;
    catcher: boolean = true;
    goingBack: any;
    cristal?: Floor;
    portal?: Phaser.Physics.Arcade.Group
    constructor(scene: Game, monchi: Player) {
        this.scene = scene;
        this.monchi = monchi
        this.scene.physics.world.setBounds(
            0,
            0,
            this.worldSize.width,
            this.worldSize.height
        );
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


    addColliders() {
        if (this.scene.monchi) {
            if (this.fireballGroup)
                this.scene.physics.add.collider(
                    this.scene.monchi,
                    this.fireballGroup,
                    this.scene.loseLevel2,
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
                    () => this.scene.winp2Mapa2,
                    () => true,
                    this.scene
                );
        }
    }

    createMap(data: { level: number, lifes: number }) {
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
        const aura = this.scene.add.sprite(this.startingPoint.x + 100, this.startingPoint.y - 1420, "auraTuto").setScale(0.6)
        this.aura.add(aura)
        this.scene.tweens.add({
            targets: aura,
            alpha: 0.4,
            duration: 1000,
            yoyo: true,
            repeat: -1
        })
        const startingPoint = this.startingPoint

        // pisos

        const portalInicioConfig: FloorConfig = {
            texture: "portal",
            pos: { x: this.startingPoint.x - 50, y: this.startingPoint.y - 100 },
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
            textureA: "plataformaLarga",
            textureB: "plataformaLarga",
            gap: 0,
            large: 2,
            pos: { x: startingPoint.x, y: startingPoint.y + 150 },
            scale: { width: 0.5, height: 0.7 },
            rotated: false,
        };
        const p1 = new LargeFloor(this.scene, p1Config, this.pisos);
        const p2Config: LargeFloorConfig = {
            textureA: "plataformaLarga",
            textureB: "plataformaLarga",
            gap: 0,
            large: 2,
            pos: { x: startingPoint.x + 700, y: startingPoint.y - 320 },
            // scale: { width: 0.5, height: 0.7 },
            rotated: true,
        };
        const p2 = new LargeFloor(this.scene, p2Config, this.pisos);
        const p3Config: FloorConfig = {
            texture: "plataformaLarga",
            pos: { x: startingPoint.x + 200, y: startingPoint.y - 820 },
            scale: { width: 1, height: 0.7 },
            rotated: true,
            width: 550,
            height: 50,
            // rotated: true,
        };
        const p3 = new Floor(this.scene, p3Config, this.pisos);
        const p4Config: FloorConfig = {
            texture: "plataformaA",
            pos: { x: startingPoint.x + 200, y: startingPoint.y - 1220 },
            scale: { width: 1, height: 0.7 },
            rotated: true,
            width: 230,
            height: 50,
            // rotated: true,
        };
        const p4 = new Floor(this.scene, p4Config, this.pisos);

        const p5Config: FloorConfig = {
            texture: "plataformaA",
            pos: { x: startingPoint.x + 1300, y: startingPoint.y - 1320 },
            scale: { width: 0.8, height: 0.7 },
            rotated: true,
            width: 150,
            height: 50,
            // rotated: true,
        };
        const p5 = new Floor(this.scene, p5Config, this.pisos);

        const p6Config: FloorConfig = {
            texture: "plataformaA",
            pos: { x: startingPoint.x + 1600, y: startingPoint.y - 820 },
            scale: { width: 0.8, height: 0.7 },
            rotated: true,
            width: 150,
            height: 50,
            // rotated: true,
        };
        const p6 = new Floor(this.scene, p6Config, this.pisos);

        const p7Config: FloorConfig = {
            texture: "plataformaA",
            pos: { x: startingPoint.x + 1000, y: startingPoint.y - 520 },
            scale: { width: 0.8, height: 0.7 },
            rotated: true,
            width: 150,
            height: 50,
            // rotated: true,
        };
        const p7 = new Floor(this.scene, p7Config, this.pisos);

        const p8Config: FloorConfig = {
            texture: "plataformaLarga2",
            // textureB: "plataformaLarga2",
            // gap: 0,
            // large: 2,
            pos: { x: startingPoint.x + 1800, y: startingPoint.y - 120 },
            scale: { width: 0.8, height: 0.7 },
            rotated: true,
            width: 480,
            height: 50,
            // rotated: true,
        };
        const p8 = new Floor(this.scene, p8Config, this.pisos);

        const fireballConfig: FloorConfig = {
            texture: "fireball",
            pos: { x: startingPoint.x + 1600, y: startingPoint.y - 1120 }, // 500 1580
            scale: { width: 0.2, height: 0.2 },
            width: 400,
            height: 400,
            fix: 250,
            tween: {
                duration: 1500,
                paused: false,
                yoyo: true,
                repeat: -1,
                x: "-=700",
            },
        };

        const fireball = new Floor(this.scene, fireballConfig, this.fireballGroup)
            .setAngularVelocity(30)
            // .setOffset(220, 100);

        const coinConfig: FloorConfig = {
            texture: "coin",
            pos: { x: startingPoint.x + 100, y: startingPoint.y - 1420 },
            scale: { width: 0.15, height: 0.15 },
            width: 10,
            height: 18,
            fix: 10,
        };

        this.cristal = new Floor(this.scene, coinConfig, this.coin).setBodySize(140, 180);

        const portalConfig: FloorConfig = {
            texture: "portal",
            pos: {x: startingPoint.x + 1600, y: startingPoint.y - 120 },
            scale: { width: 0.1, height: 0.1 },
            width: 1000,
            height: 1500,
        };

        const port = new Floor(this.scene, portalConfig, this.portal)
            // .setRotation(Math.PI / 2)
            .setSize(1400, 800);



    }


    update() {
        let firstChange = false;
        if (this.scene.monchi) {
            if (
                this.scene.monchi.x > this.startingPoint.x + 10
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

export default p2Mapa2