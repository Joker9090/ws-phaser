import Phaser from "phaser";
export type MoovingFloorTween =
    | Phaser.Tweens.Tween
    | Phaser.Types.Tweens.TweenBuilderConfig
    | Phaser.Types.Tweens.TweenChainBuilderConfig
    | Phaser.Tweens.TweenChain;
export type MovingFloorConfig = {
    texture: string | Phaser.Textures.Texture;
    width?: number;
    height?: number;
    fix?: number;
    pos: {
        x: number;
        y: number;
    };
    scale?: {
        width: number;
        height: number;
    };
    tween?: Partial<MoovingFloorTween>;
    friction?: number;
};


class MovingFloor extends Phaser.GameObjects.Sprite {
    isJumping = false;
    scene: Phaser.Scene;
    hasEvent?: string;
    group: Phaser.Physics.Arcade.Group;
    constructor(
        scene: Phaser.Scene,
        config: MovingFloorConfig,
        group: Phaser.Physics.Arcade.Group,
        frame?: string | number | undefined

    ) {
        super(scene, config.pos.x, config.pos.y, config.texture);

        this.scene = scene;
        this.group = group;
        const width = config.width ?? 120;
        const height = config.height ?? 108;
        const fix = config.fix ?? 20;
        const friction = config.friction ?? 1;
        if (config.scale) {
            this.setScale(config.scale.width, config.scale.height);
        }
        /* Floor add to physic world */
        scene.physics.add.existing(this);

        /* Floor add to scene */
        scene.add.existing(this);
        this.setDepth(10);
        this.setSize(width, height);
        if (this.body instanceof Phaser.Physics.Arcade.Body) {
            this.body.setImmovable(true);
            console.log("lo es")
        }
        // this.body?.gameObject.setOffset(fix, 0)
        // this.body?.gameObject.setBounce(0);
        this.group.add(this);
        // this.body?.gameObject.setImmovable(true);
        // this.body?.gameObject.setCollideWorldBounds(true);
        // if (friction) this.body?.gameObject.setFriction(friction)


        if (config.tween) {
            const tween = this.scene.tweens.add({
                ...config.tween,
                targets: this,
            });
        }
    }
}

export default MovingFloor