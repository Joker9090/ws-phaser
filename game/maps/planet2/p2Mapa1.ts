import Phaser from "phaser";
import Floor, { FloorConfig } from "../../assets/Floor";
import LargeFloor, { LargeFloorConfig } from "../../assets/LargeFloor";
import Game from "../../Game";
import Player from "@/game/assets/Player";
// Scene in class
class p2Mapa1 {
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
    background8: any;
    aura?: Phaser.Physics.Arcade.Group;
    nextScene: string | undefined = undefined;
  
    monchi: Player;
    endPortal?: Floor;

    startingPoint = {
        x: 400, //400
        y: 1490, //1490
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

    createMap(data: { level: number; lifes: number }) {
        this.pisos = this.scene.physics.add.group({ allowGravity: false });
        this.pisosBack = this.scene.physics.add.group({ allowGravity: false });
        this.pisos2 = this.scene.physics.add.group({ allowGravity: false });
        this.pisos3 = this.scene.physics.add.group({ allowGravity: false });
        this.pisos4 = this.scene.physics.add.group({ allowGravity: false });
        this.movingFloor = this.scene.physics.add.group({ allowGravity: false });
        this.movingFloorRot = this.scene.physics.add.group({ allowGravity: false });
        this.coin = this.scene.physics.add.group({ allowGravity: false });
        this.portal = this.scene.physics.add.group({ allowGravity: false });
        this.fireballGroup = this.scene.physics.add.group({ allowGravity: false });
        this.portalInit = this.scene.physics.add.group({ allowGravity: false });
        this.aura = this.scene.physics.add.group({ allowGravity: false, immovable: true })
        const aura = this.scene.add.sprite(2970, 1000, "auraLvl1").setScale(0.6).setDepth(99)

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
            spriteSheet: "portal2",
            texture: "portal2",
            pos: { x: 400, y: 1300 },
            // scale: { width: 0.1, height: 0.1 },
            width: 100,
            height: 100,
            // collected: true,
            // scene: this.scene,
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]
        };

        const portInicio = new Floor(
            this.scene,
            portalInicioConfig,
            this.portalInit
        ).setDepth(3);

        const bottomConfig: LargeFloorConfig = {
            pos: { x: -100, y: this.startingPoint.y + 600 },
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
        const p1Config: LargeFloorConfig = {
            pos: { x: 370, y: 1650 },
            textureA: "plataformaInicioLvl1",
            textureB: "plataformaMedioLvl1",
            textureC: "plataformaFinLvl1",
            scale: { width: 0.5, height: 0.5 },
            rotated: false,
            width: 234,
            height: 246,
            gap: -320,
            fix: 0,
            large: 4,
            planeta: 2
        };
        const p1 = new LargeFloor(this.scene, p1Config, this.pisos).setDepth(9);



        const p2Config: FloorConfig = {
            texture: "plataformaLvl1",
            pos: { x: 1070, y: 1850 },
            scale: { width: 0.3, height: 0.3 },
            width: 425,
            height: 245
            // rotated: false,
        };
        const p2 = new Floor(this.scene, p2Config, this.pisos);

        const p3Config: FloorConfig = {
            texture: "plataformaLvl1",
            pos: { x: 1420, y: 2050 },
            scale: { width: 0.3, height: 0.3 },
            width: 425,
            height: 245
            // rotated: false,
        };
        const p3 = new Floor(this.scene, p3Config, this.pisos2).setTint(
            Phaser.Display.Color.GetColor(255, 101, 0)
        );


        const p4Config: LargeFloorConfig = {
            pos: { x: 1490, y: 870 },
            textureA: "plataformaInicioLvl1",
            textureB: "plataformaMedioLvl1",
            textureC: "plataformaFinLvl1",
            scale: { width: 0.5, height: 0.5 },
            rotated: false,
            width: 234,
            height: 246,
            gap: -320,
            fix: 0,
            large: 3,
            planeta: 2,
            invertedOffset: -560,
            inverted: true
        };
        const p4 = new LargeFloor(this.scene, p4Config, this.pisos);

        const p5Config: FloorConfig = {
            texture: "plataformaLvl1",
            pos: { x: 1800, y: 870 },
            scale: { width: 0.3, height: 0.3 },
            width: 425,
            height: 245,
            inverted: true
        };
        const p5 = new Floor(this.scene, p5Config, this.pisos);

        const p6Config: FloorConfig = {
            texture: "plataformaLvl1",
            pos: { x: 2470, y: 900 }, //3550 700
            scale: { width: 0.3, height: 0.3 },
            width: 425,
            height: 205,
            inverted: true
        };
        const p6 = new Floor(this.scene, p6Config, this.pisos).setTint(
            Phaser.Display.Color.GetColor(255, 101, 0)
        ).setVelocityX(400);
        this.scene.tweens.add({
            duration: 4500,
            paused: false,
            yoyo: true,
            repeat: -1,
            targets: p6.body?.velocity,
            x: "-=800",
        })

        const p7Config: FloorConfig = {
            texture: "plataformaLvl1",
            pos: { x: 3170, y: 1050 },
            scale: { width: 0.3, height: 0.3 },
            width: 425,
            height: 245,
            inverted: true
        };
        const p7 = new Floor(this.scene, p7Config, this.pisos);



        const p8Config: FloorConfig = {
            texture: "plataformaLvl1",
            pos: { x: 3570, y: 850 },
            scale: { width: 0.3, height: 0.3 },
            width: 425,
            height: 245,
            inverted: true
        };
        const p8 = new Floor(this.scene, p8Config, this.pisos4).setTint(
            Phaser.Display.Color.GetColor(255, 101, 0)
        );


        const p9Config: FloorConfig = {
            texture: "plataformaLvl1",
            pos: { x: 3570, y: 2850 },
            // pos: { x: this.startingPoint.x, y: this.startingPoint.y },
            // pos: { x: this.startingPoint.x - 110, y: this.startingPoint.y - 200 },
            scale: { width: 0.8, height: 0.8 },
            fix: 130,
            width: 400,
            height: 90,
        };
        const p9 = new Floor(this.scene, p9Config, this.pisos);




        /* Portal, Coin, Fireball and Asteroids */

        const fireballConfig: FloorConfig = {
            spriteSheet: "meteorito",
            texture: "meteorito",
            pos: { x: this.worldSize.width + 100, y: 980 }, // 500 1580
            // scale: { width: 0.2, height: 0.2 },
            width: 200,
            height: 100,
            // fix: 250,
            // scene: this.scene,
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            tween: {
                duration: 4500,
                paused: false,
                // yoyo: true,
                repeat: -1,
                x: "-=4800",
                scaleX: 0, scaleY: 0
            },
        };
        const fireball = new Floor(this.scene, fireballConfig, this.fireballGroup).setRotation(Math.PI / 2).setScale(0.5)
        //     .setAngularVelocity(30)


        const portalConfig: FloorConfig = {
            spriteSheet: "portal2",
            texture: "portal2",

            pos: { x: 4000, y: 2750 },
            // scale: { width: 0.1, height: 0.1 },
            width: 100,
            height: 100,
            // collected: this.collected,
            // scene: this.scene,
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]
        };

        const port = new Floor(this.scene, portalConfig, this.portal).setDepth(99);
        this.endPortal = port

        const coinConfig: FloorConfig = {
            texture: "cristalLvl1",
            // pos: { x: 2300, y: 1100 },
            pos: { x: 2970, y: 1000 },
            scale: { width: 0.15, height: 0.15 },
            width: 10,
            height: 18,
            fix: 10,
        };

        this.cristal = new Floor(this.scene, coinConfig, this.coin)

        // this.scene.cameras.main.shake(2000, 0.01);
    }

    // addColliders() {
    //     if (this.scene.monchi) {
    //         if (this.fireballGroup)
    //             this.scene.physics.add.collider(
    //                 this.scene.monchi,
    //                 this.fireballGroup,
    //                 () => this.scene.lose(),
    //                 () => true,
    //                 this.scene
    //             );
    //         if (this.portal) this.portal.setTint(0xff0000);
    //         if (this.pisos)
    //             this.scene.physics.add.collider(
    //                 this.scene.monchi,
    //                 this.pisos,
    //                 this.scene.touch,
    //                 () => true,
    //                 this.scene
    //             );
    //         if (this.pisos2)
    //             this.scene.physics.add.collider(
    //                 this.scene.monchi,
    //                 this.pisos2,
    //                 (a, b) => this.scene.float(a, b, 600),
    //                 () => true,
    //                 this.scene
    //             );
    //         if (this.pisos4)
    //             this.scene.physics.add.collider(
    //                 this.scene.monchi,
    //                 this.pisos4,
    //                 this.scene.noFloat,
    //                 () => true,
    //                 this.scene
    //             );
    //         if (this.pisos3)
    //             this.scene.physics.add.collider(
    //                 this.scene.monchi,
    //                 this.pisos3,
    //                 () => {
    //                     this.scene.rotateCam(10);
    //                 },
    //                 () => true,
    //                 this.scene
    //             );
    //         if (this.movingFloor)
    //             this.scene.physics.add.collider(
    //                 this.scene.monchi,
    //                 this.movingFloor,
    //                 this.scene.movingFloorsGrav,
    //                 () => true,
    //                 this.scene
    //             );
    //         if (this.coin)
    //             this.scene.physics.add.overlap(
    //                 this.scene.monchi,
    //                 this.coin,
    //                 this.scene.coinCollected,
    //                 () => true,
    //                 this.scene
    //             );
    //         if (this.portal)
    //             this.scene.physics.add.overlap(
    //                 this.scene.monchi,
    //                 this.portal,
    //                 () => this.scene.winLevel(4),
    //                 () => true,
    //                 this.scene
    //             );
    //     }
    // }

    update() {
        let firstChange = false;

        if (!this.goingBack) {
            if (this.scene.monchi && this.scene.cameraNormal) {
                this.scene.monchi.checkMove(this.scene.cursors);
            } else if (this.scene.monchi && this.scene.cameraNormal == false) {
                // this.scene.monchi?.checkMoveRot(this.scene.cursors);
            }
        } else if (this.goingBack) {
            if (this.scene.monchi)
                this.scene.monchi.setY(1700 - this.scene.monchi.displayHeight);
        }
        if (this.scene.monchi) this.animateBackground(this.scene.monchi);
    }
    // sideGravFunction(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {

    //   if (cursors) {
    //     const { up, down, left, right } = cursors
    //     const velocity = 300
    //     if (up.isDown){}
    //   }
    // }
}

export default p2Mapa1;
