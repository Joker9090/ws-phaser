import Phaser from "phaser";
import { text } from "stream/consumers";

export type spikeTween = Phaser.Tweens.Tween | Phaser.Types.Tweens.TweenChainBuilderConfig | Phaser.Tweens.TweenChain;

export type spikesConfig = {
    texture: string
    width: number,
    height: number,
    fix?: number,
    pos: {
        x: number,
        y: number
    },
    scale?: {
        width: number,
        height: number,
    },
    large: number,
    quantity?: number,
    flip?: boolean
}
// Scene in class
class spikes extends Phaser.GameObjects.Container {
    isJumping = false;
    scene: Phaser.Scene;
    group: Phaser.Physics.Arcade.Group;
    parts: Phaser.Physics.Arcade.Sprite[];
    constructor(scene: Phaser.Scene, config: spikesConfig, group: Phaser.Physics.Arcade.Group, frame?: string | number | undefined, quantity?: number) {
        super(scene, config.pos.x, config.pos.y)
        this.parts = [];
        this.scene = scene;
        this.group = group;

        const width = config.width ?? 210
        const height = config.height ?? 40;
        const fix = config.fix ?? 20
        for (let index = 0; index < config.large; index++) {
            const t = config.texture
            const s = scene.add.sprite(index * width, 0, t)
            this.add(s)

        }
        if (config.scale) {
            this.setScale(config.scale.width, config.scale.height)
        }
        this.setSize(width * config.large, height)

        scene.add.existing(this);
        this.group.add(this)
        if (this.body) {
            const body = (this.body as Phaser.Physics.Arcade.Body)
            body.setImmovable(true)
            // body.setOffset(((config.large - 1) / 2) * width, height * -1 + (fix / 2))

        }

        if (config.flip) {
            this.setScale(-1)
        }

    }
}
export default spikes