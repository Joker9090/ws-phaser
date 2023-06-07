import Phaser from "phaser";
import gameState from "../assets/GameState";
import { MarkOptions } from "perf_hooks";
import player from "../assets/Player";


export type mapConfig = {
    // textures: string[]
    player: player
    sawsY: { top: number, bottom: number }
    diamondsY: { top: number, bottom: number }
    initialDelay: number
    scale?: {
        width: number,
        height: number,
    },
    flip?: boolean
}

const updatePlatform = (group: Phaser.GameObjects.Group, spriteWidth: number, texture: string, dist: number) => {
    let _dist = dist ?? 0
    const child = group.get(spriteWidth - _dist, gameState.sceneHeigth, texture);
    child.setVisible(true);
    child.setActive(true);
    switch (texture) {
        case "plataforma3":
        case "plataforma2":
        case "plataforma1":
            child.setDepth(2);
            break;
        case 'plateau':
            child.setDepth(1);
            break;
        default:
    }
}

class MapHandler extends Phaser.Scene {
    config: mapConfig
    timer: number = 0
    secondTimer: number = 0
    saws!: Phaser.GameObjects.Group
    sawCreationTime?: Phaser.Time.TimerEvent;
    spikes!: Phaser.GameObjects.Group
    spikesCreationTime!: Phaser.Time.TimerEvent
    diamonds!: Phaser.GameObjects.Group
    diamondCreationTime?: Phaser.Time.TimerEvent;
    groundGroup!: Phaser.GameObjects.Group;
    upPlatformCreationTime!: Phaser.Time.TimerEvent;
    downPlatformCreationTime!: Phaser.Time.TimerEvent;

    constructor(config: mapConfig) {
        super({ key: "mapHandler" })
        this.config = config
        this.timer = 0;
        this.secondTimer = 0;

    }
    create() {

        // saws
        this.saws = this.physics.add.group();

        const createSaw = () => {
            const y = Phaser.Math.Between(210, 880)
            const saw = this.saws.create(this.cameras.main.width + 100, y, "saw").setGravityY(0).setScale(0.7)
            saw.setVelocityX(-300)
            saw.setDepth(6)
            saw.body.setSize(saw.displayWidth - 35, saw.displayHeight - 35)
            // saw.setSize(saw.displayWidth - 10, saw.displayHeigh - 10)

            this.tweens.add({
                targets: saw,
                angle: 3600,
                yoyo: true,
                repeat: -1
            })
        }
        this.sawCreationTime = this.time.addEvent({
            callback: createSaw,
            delay:this.config.initialDelay + Phaser.Math.Between(400, 700),
            callbackScope: this,
            loop: true
        })

        // spikes
        this.spikes = this.physics.add.group();
        const createSpikes = () => {
            const y = 10
            const spike = this.spikes.create(this.cameras.main.width + 100, y, "spikes").setGravityY(0).setScale(0.7)
            spike.setVelocityX(-300)
            spike.setDepth(6)
            spike.body.setSize(spike.displayWidth - 35, spike.displayHeight - 35)
            spike.setFlipX(true)
            // saw.setSize(saw.displayWidth - 10, saw.displayHeigh - 10)
        }
        this.spikesCreationTime = this.time.addEvent({
            callback: createSpikes,
            delay: 390,
            callbackScope: this,
            loop: true
        })

        // dimonds

        this.diamonds = this.physics.add.group()
        const createDiamond = () => {
            const { top, bottom } = this.config.diamondsY
            const y = Phaser.Math.Between(top, bottom)
            const diamond = this.diamonds.create(this.cameras.main.width + 100, y, "diamond").setGravityY(0).setScale(0.7)
            diamond.setVelocityX(-300)
            diamond.setDepth(6)
            diamond.body.setSize(diamond.displayWidth + 35, diamond.displayHeight + 30)

        }
        this.diamondCreationTime = this.time.addEvent({
            callback: createDiamond,
            delay:this.config.initialDelay + Phaser.Math.Between(400, 700),
            callbackScope: this,
            loop: true
        })
        this.physics.add.overlap(this.saws, this.diamonds, (saw, singleDiamond) => {
            singleDiamond.destroy();
            saw.destroy()
        })


        this.groundGroup = this.physics.add.group()

        const createUpPlatform = () => {
            const y = 200
            const upPlatform = this.groundGroup.create(this.cameras.main.width + 90, y, "plataforma3").setGravityY(0).setScale(0.7)
            upPlatform.setVelocityX(Phaser.Math.Between(-300, -350))
            upPlatform.setDepth(6)

            upPlatform.body.setSize(upPlatform.displayWidth - 35, upPlatform.displayHeight - 35)

        }
        this.upPlatformCreationTime = this.time.addEvent({
            callback: createUpPlatform,
            delay:this.config.initialDelay + Phaser.Math.Between(400, 700),
            callbackScope: this,
            loop: true
        })

        const createDownPlatform = () => {
            const y = 890
            const downPlatform = this.groundGroup.create(this.cameras.main.width + 90, y, "plataforma3").setGravityY(0).setScale(0.7)
            downPlatform.setVelocityX(Phaser.Math.Between(-300, -250))
            downPlatform.setDepth(6)
            downPlatform.body.setSize(downPlatform.displayWidth - 35, downPlatform.displayHeight - 35)

        }
        this.downPlatformCreationTime = this.time.addEvent({
            callback: createDownPlatform,
            delay:this.config.initialDelay + Phaser.Math.Between(400, 700),
            callbackScope: this,
            loop: true
        })
        this.physics.add.overlap(this.saws, this.groundGroup, (saw, floor) => {
            saw.destroy();
        })
        this.physics.add.overlap(this.diamonds, this.groundGroup, (diamond, floor) => {
            diamond.destroy();
        })
        this.physics.add.overlap(this.diamonds, this.groundGroup, (diamond, floor) => {
            diamond.destroy();
        })
        if (this.config.player) {
            this.physics.add.overlap(this.config.player, this.saws, (player, saw) => {
                this.scene.restart()
                gameState.score = 0
            })
            this.physics.add.overlap(this.config.player, this.diamonds, (player, diamond) => {
                gameState.score += 1
                diamond.destroy()
            })
            this.physics.add.overlap(this.config.player, this.groundGroup, (player, platform) => {
                const p = (player as player)
                console.log("ACAAAA", p)
                if (p._direction == "up") p.down()
                else if (p._direction == "down") p.up()
            })
        }

    }

}

export default MapHandler