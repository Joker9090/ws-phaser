import Phaser from "phaser";
import Floor, { FloorConfig } from "../assets/Floor";
import LargeFloor, { LargeFloorConfig } from "../assets/LargeFloor";
class map1 {
    isJumping: boolean = false
    debugGraphics?: Phaser.GameObjects.Graphics
    scene: Phaser.Scene
    worldSize = {
        w: 20000,
        h: 2000
    }
    floors?: Phaser.Physics.Arcade.Group
    startingPoint = {
        x: 200,
        y: 1400
    }
    background?: Phaser.GameObjects.Image
    constructor(scene: Phaser.Scene) {
        this.scene = scene
        this.scene = scene;

        /* World size*/
        this.scene.physics.world.setBounds(0, 0, this.worldSize.w, this.worldSize.h);

        /* Debug */
        this.debugGraphics = this.scene.add.graphics();
        this.debugGraphics.fillStyle(0x00ff00, 0.5);
        this.debugGraphics.fillRect(0, 0, this.worldSize.w, this.worldSize.h);
    }

    animateBackground(player: Phaser.GameObjects.Sprite) {
        const { x, y } = this.startingPoint
        const { x: x2, y: y2 } = player
        const calcDiffx = (x2 - x) / 1.2
        const calcDiffy = (y2 - y) / 1.2

        this.background?.setPosition((x - calcDiffx), (y - calcDiffy))

    }

    createMap() {
        this.floors = this.scene?.physics.add.group({ allowGravity: false, immovable: true })

        const f1Config: FloorConfig = {
            texture: "plataformaA",
            pos: { x: 100, y: 900, },
            scale: { width: 0.7, height: 0.7, }
        }

        const f1 = new Floor(this.scene, f1Config, this.floors)


        const p2Config: FloorConfig = {
            texture: "plataformaA",
            pos: { x: 500, y: 600, },
            scale: { width: 0.7, height: 0.7, },
            tween: {
                paused: false,
                yoyo: true,
                repeat: -1,
                y: "-=200"
            }
        }
        const p2 = new Floor(this.scene, p2Config, this.floors)

        const p3Config: FloorConfig = {
            texture: "plataformaA",
            pos: { x: 300, y: 570, },
            scale: { width: 0.3, height: 0.3, },
        }
        const p3 = new Floor(this.scene, p3Config, this.floors)

        const p4Config: LargeFloorConfig = {
            textureA: "plataformaA",
            textureB: "plataformaB",
            large: 10,
            pos: { x: 340, y: 900, },
            scale: { width: 0.7, height: 0.7, },

        }

        const p4 = new LargeFloor(this.scene, p4Config, this.floors)

        const p5Config: FloorConfig = {
            texture: "plataforma2",
            pos: { x: 1000, y: 900, },
            scale: { width: 0.1, height: 0.1, },
            width: 2400,
            height: 100,
            tween: {
                duration: 5000,
                paused: false,
                yoyo: true,
                repeat: -1,
                y: "-=400"
            }
        }
        const p5 = new Floor(this.scene, p5Config, this.floors)
        const p6Config: FloorConfig = {
            texture: "plataforma2",
            pos: { x: 800, y: 500, },
            scale: { width: 0.05, height: 0.05, },
            width: 2400,
            height: 100,

        }
        const p6 = new Floor(this.scene, p6Config, this.floors)

    }
}