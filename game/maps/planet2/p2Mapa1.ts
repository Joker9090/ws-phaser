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
    aura?: Phaser.Physics.Arcade.Group;
    UIScene?: UIScene;
    monchi: Player;
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
            .image(this.startingPoint.x, this.startingPoint.y, "bg1Lvl1")
            .setOrigin(0.5, 0.5);
        this.background2 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "bg2Lvl1")
            .setOrigin(0.5, 0.5);
        this.background3 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "bg3Lvl1")
            .setOrigin(0.5, 0.5);
        this.background4 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "bg4Lvl1")
            .setOrigin(0.5, 0.5);
        this.background5 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "bg5Lvl1")
            .setOrigin(0.5, 0.5);
        this.background6 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "bg6Lvl1")
            .setOrigin(0.5, 0.5);
        this.background7 = this.scene.add
            .image(this.startingPoint.x, this.startingPoint.y, "filtroFondo")
            .setOrigin(0.5, 0.5).setScale(2, 2);

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
        this.background3.setPosition(x + calcDiffX +600, y + calcDiffY).setScale(0.7);
        this.background4.setPosition(x + calcDiffX - 500, y + calcDiffY).setScale(0.7);
        this.background5.setPosition(x + calcDiffX, y + calcDiffY).setDepth(2);
        this.background6.setPosition(x + calcDiffX - 800, y + calcDiffY).setDepth(3);
        this.background7.setPosition(x + calcDiffX, y + calcDiffY).setDepth(4);


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
        this.movingFloor = this.scene.physics.add.group({ allowGravity: false });
        this.movingFloorRot = this.scene.physics.add.group({ allowGravity: false });
        this.coin = this.scene.physics.add.group({ allowGravity: false });
        this.portal = this.scene.physics.add.group({ allowGravity: false });
        this.fireballGroup = this.scene.physics.add.group({ allowGravity: false });
        this.portalInit = this.scene.physics.add.group({ allowGravity: false });
        this.aura = this.scene.physics.add.group({ allowGravity: false, immovable: true })
        const aura = this.scene.add.sprite(2970, 1100, "auraLvl1").setScale(0.6)

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
            pos: { x: 400, y: 1300 },
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
            texture: "plataformaLvl1",
            pos: { x: 570, y: 1650 },
            scale: { width: 1, height: 0.3 },
            rotated: false,
            width: 425,
            height: 245
        };
        const p1 = new Floor(this.scene, p1Config, this.pisos);



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
        const p4Config: FloorConfig = {
            texture: "plataformaLvl1",
            pos: { x: 1570, y: 1050 },
            scale: { width: 0.8, height: 0.5 },
            width: 455,
            height: 110,
            fix: 60,
            rotated: false,
            inverted: true
        };
        const p4 = new Floor(this.scene, p4Config, this.pisos);

        const p5Config: FloorConfig = {
            texture: "plataformaLvl1",
            pos: { x: 1970, y: 1050 },
            scale: { width: 0.3, height: 0.3 },
            width: 425,
            height: 245,
            inverted: true
        };
        const p5 = new Floor(this.scene, p5Config, this.pisos);

        const p6Config: FloorConfig = {
            texture: "plataformaLvl1",
            pos: { x: 2600, y: 900 }, //3550 700
            scale: { width: 0.3, height: 0.3 },
            width: 425,
            height: 205,
            inverted: true
        };
        const p6 = new Floor(this.scene, p6Config, this.pisos3).setTint(
            Phaser.Display.Color.GetColor(255, 101, 0)
        ).setVelocityX(300);
        this.scene.tweens.add({
            duration: 4500,
            paused: false,
            yoyo: true,
            repeat: -1,
            targets: p6.body?.velocity,
            x: "-=600",
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
            texture: "fireball",
            pos: { x: 3600, y: 1100 }, // 500 1580
            scale: { width: 0.2, height: 0.2 },
            width: 400,
            height: 400,
            fix: 250,
            tween: {
                duration: 4500,
                paused: false,
                yoyo: true,
                repeat: -1,
                x: "-=2300",
            },
        };
        // const fireball = new Floor(this.scene, fireballConfig, this.fireballGroup)
        //     .setAngularVelocity(30)


        const portalConfig: FloorConfig = {
            texture: "portal",
            pos: { x: 4000, y: 2750 },
            scale: { width: 0.1, height: 0.1 },
            width: 1000,
            height: 1500,
        };

        const port = new Floor(this.scene, portalConfig, this.portal)
            // .setRotation(Math.PI / 2)
            .setSize(800, 1400);

    
        const coinConfig: FloorConfig = {
            texture: "cristalLvl1",
            // pos: { x: 2300, y: 1100 },
            pos: { x: 2970, y: 1100 },
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
                    () => this.scene.winLevel(4),
                    () => true,
                    this.scene
                );
        }
    }

    update() {
        let firstChange = false;

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
    // sideGravFunction(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {

    //   if (cursors) {
    //     const { up, down, left, right } = cursors
    //     const velocity = 300
    //     if (up.isDown){}
    //   }
    // }
}

export default p2Mapa1;
