import { type } from "os";
import Phaser from "phaser";


export type spikeConfig = {
    texture: string,
    width?: number,
    heigth?: number
    pos: {
        x: number,
        y: number
    },
    scale: {
        width: number,
        heigth: number
    }
    large: number,
    offsetValue?: number
}

class Spikes extends Phaser.GameObjects.Container {
    scene: Phaser.Scene;
    group: Phaser.Physics.Arcade.Group
    parts: Phaser.Physics.Arcade.Sprite[]
    constructor(scene: Phaser.Scene, group: Phaser.Physics.Arcade.Group, config: spikeConfig) {
        super(scene, config.pos.x, config.pos.y)
        this.parts = []
        this.scene = scene
        this.group = group
        const width = config.width ?? 30
        const heigth = config.heigth ?? 25
        const offsetValue = config.offsetValue ?? 40

        for (let index = 0; index < config.large; index++) {
            const t = config.texture
            const s = scene.add.sprite(index * width, 0, t)
        }

        if (config.scale) {
            this.setScale(config.scale.width, config.scale.heigth)
        }

        this.setSize((width * config.scale.width), heigth)

        scene.add.existing(this);
        this.group.add(this)

        this.group.add(this)


        if (this.body) {
            const body = (this.body as Phaser.Physics.Arcade.Body)
            body.setImmovable(true)
            body.setOffset(((config.large - 1) / 2) * width, heigth * -1 + (offsetValue + 2))
        }

    }
}
export default Spikes