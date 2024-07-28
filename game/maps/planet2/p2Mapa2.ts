import Phaser from "phaser";
import UIScene from "@/game/UIScene";
import Player from "@/game/assets/Player";
import Game from "@/game/Game";
import Floor, { FloorConfig } from "@/game/assets/Floor";
import LargeFloor, { LargeFloorConfig } from "@/game/assets/LargeFloor";
import portal, { portalConfig } from "@/game/assets/portal";

class p2Mapa2 {
    isJumping = false;
    scene: Game;
    worldSize = {
        width: 6500,
        height: 6500
    };
    checkPointPos = {
        x: 400,
        y: 1490,
    };
    pisos?: Phaser.Physics.Arcade.Group;
    pisosBack?: Phaser.Physics.Arcade.Group;
    endPortal?: Floor;
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
    background7: Phaser.GameObjects.Image
    background8: any;

    aura?: Phaser.Physics.Arcade.Group;
  
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
    collected: Boolean = true;
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
            .image(this.startingPoint.x, this.startingPoint.y, "bg1Lvl1")
            .setOrigin(0.5, 0.5).setScale(1, 1.7);
        this.background2 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "bg2Lvl1")
            .setOrigin(0.5, 0.5).setScale(1, 1.7);
        this.background3 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "bg3Lvl1")
            .setOrigin(0.5, 0.5).setScale(1, 1.7);
        this.background4 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "bg4Lvl1")
            .setOrigin(0.5, 0.5).setScale(1, 1.7);
        this.background5 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "bg5Lvl1")
            .setOrigin(0.5, 0.5).setScale(1, 1.7);
        this.background6 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "bg6Lvl1")
            .setOrigin(0.5, 0.5).setScale(1, 1.7);
        this.background7 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "filtroFondo")
            .setOrigin(0.5, 0.5).setScale(1, 1.7);
    }
    animateBackground(player: Phaser.GameObjects.Sprite) {
        const { x, y } = this.startingPoint;
        const { x: x2, y: y2 } = player;
        const calcDiffX = (x2 - x) / 1//mas grande menos movimiento
        const calcDiffY = (y2 - y - this.scene.cameras.main.displayHeight / 6) / 1;
        this.background.setPosition(x + calcDiffX, y + calcDiffY);
        this.background2.setPosition(x + calcDiffX, y + calcDiffY);
        this.background3.setPosition(x + calcDiffX + 600, y + calcDiffY);
        this.background4.setPosition(x + calcDiffX - 500, y + calcDiffY);
        this.background5.setPosition(x + calcDiffX, y + calcDiffY).setDepth(2);
        this.background6.setPosition(x + calcDiffX - 800, y + calcDiffY + 220).setScale(0.7).setDepth(3);
        this.background7.setPosition(x + calcDiffX, y + calcDiffY).setDepth(4);
        this.background8.setPosition(x + calcDiffX - 900, y + calcDiffY + 700).setDepth(2);
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
                    () => this.scene.winLevel(5),
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
        const aura = this.scene.add.sprite(this.startingPoint.x + 100, this.startingPoint.y - 1220, "auraLvl1").setScale(0.6)
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

        const portalInicioConfig: portalConfig = {
            spriteSheet: "portal2",
            pos: { x: this.startingPoint.x - 50, y: this.startingPoint.y + 100 },
            // scale: { width: 0.1, height: 0.1 },
            width: 800,
            height: 1400,
            collected: true,
            scene: this.scene,
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]
        };

        const portInicio = new portal(
            this.scene,
            portalInicioConfig,
            this.portalInit
        ).setDepth(1);


        const bottomConfig: LargeFloorConfig = {
            pos: { x: -100, y: this.startingPoint.y + 800 },
            textureA: "texturaPiso",
            textureB: "texturaPiso",
            scale: { width: 0.5, height: 0.5 },
            rotated: false,
            width: 234,
            height: 246,
            gap: -320,
            fix: 0,
            large: this.scene.cameras.main.width,
            planeta: 2,
            noBody: true
        };
        this.background8 = new LargeFloor(this.scene, bottomConfig, this.pisos)

        const p1Config: FloorConfig = {
            texture: "plataformaLvl1",
            pos: { x: startingPoint.x, y: startingPoint.y + 350 },
            scale: { width: 0.5, height: 0.7 },
            rotated: false,
            width: 400,
            height: 110,
            fix: 100
        };
        const p1 = new Floor(this.scene, p1Config, this.pisos);
        const p2Config: FloorConfig = {
            texture: "plataformaLvl1",
            rotated: true,
            scale: { width: 0.8, height: 0.7 },
            width: 120,
            height: 400,
            fix: 100,
            // inverted:true,
            pos: { x: startingPoint.x + 700, y: startingPoint.y - 90 },
            // scale: { width: 0.5, height: 0.7 },
        };
        const p2 = new Floor(this.scene, p2Config, this.pisos).setFlipY(true);
        const p3Config: FloorConfig = {
            texture: "plataformaLvl1",
            pos: { x: startingPoint.x + 200, y: startingPoint.y - 620 },
            scale: { width: 0.3, height: 0.3 },
            width: 245,
            height: 425,
            rotated: true,
            // rotated: true,
        };
        const p3 = new Floor(this.scene, p3Config, this.pisos);
        const p4Config: FloorConfig = {
            texture: "plataformaLvl1",
            pos: { x: startingPoint.x + 200, y: startingPoint.y - 1020 },
            scale: { width: 0.3, height: 0.3 },
            width: 245,
            height: 425,
            rotated: true,
            // rotated: true,
        };
        const p4 = new Floor(this.scene, p4Config, this.pisos);

        const p5Config: FloorConfig = {
            texture: "plataformaLvl1",
            pos: { x: startingPoint.x + 1300, y: startingPoint.y - 1120 },
            scale: { width: 0.3, height: 0.3 },
            width: 245,
            height: 425,
            rotated: true,
        };
        const p5 = new Floor(this.scene, p5Config, this.pisos);

        const p6Config: FloorConfig = {
            texture: "plataformaLvl1",
            pos: { x: startingPoint.x + 1600, y: startingPoint.y - 620 },
            scale: { width: 0.3, height: 0.3 },
            width: 245,
            height: 425,
            rotated: true,
        };
        const p6 = new Floor(this.scene, p6Config, this.pisos);

        const p7Config: FloorConfig = {
            texture: "plataformaLvl1",
            pos: { x: startingPoint.x + 1000, y: startingPoint.y - 320 },
            scale: { width: 0.3, height: 0.3 },
            width: 245,
            height: 425,
            rotated: true,
        };
        const p7 = new Floor(this.scene, p7Config, this.pisos);

        const p8Config: FloorConfig = {
            texture: "plataformaLvl1",
            pos: { x: startingPoint.x + 1800, y: startingPoint.y + 80 },
            scale: { width: 0.3, height: 0.3 },
            width: 245,
            height: 425,
            rotated: true,
            // inverted:true
        };
        const p8 = new Floor(this.scene, p8Config, this.pisos).setFlipY(true);

        const fireballConfig: FloorConfig = {
            spriteSheet: "meteorito",
            texture: "meteorito",
            pos: { x: this.worldSize.width + 200, y: startingPoint.y - 980 }, // 500 1580
            // scale: { width: 0.2, height: 0.2 },
            width: 200,
            height: 100,
            // fix: 250,
            // scene: this.scene,
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            tween: {
                duration: 2900,
                paused: false,
                // yoyo: true,
                repeat: -1,
                x: "-=6500",
                scaleX: 0.3,
                scaleY: 0.3
            },
        };

        const fireball = new Floor(this.scene, fireballConfig, this.fireballGroup).setRotation(Math.PI / 2).setScale(2)
        // .setAngularVelocity(30)
        // .setOffset(220, 100);

        const coinConfig: FloorConfig = {
            texture: "cristalLvl1",
            pos: { x: this.startingPoint.x + 100, y: this.startingPoint.y - 1220, },
            scale: { width: 0.15, height: 0.15 },
            width: 10,
            height: 18,
            fix: 10,
        };

        this.cristal = new Floor(this.scene, coinConfig, this.coin).setBodySize(140, 180);

        const portalConfig: FloorConfig = {
            spriteSheet: "portal2",
            texture: "portal2",
            pos: { x: startingPoint.x + 1600, y: startingPoint.y - 80 },
            // scale: { width: 0.1, height: 0.1 },
            width: 100,
            height: 200,
            // scene: this.scene,
            // collected: this.collected,
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]
        };

        const port = new Floor(this.scene, portalConfig, this.portal);

        this.endPortal = port


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