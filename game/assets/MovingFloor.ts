import Phaser from "phaser";
import Floor from "./Floor";
import Player from "./Player";
export type MoovingFloorTween =
    | Phaser.Tweens.Tween
    | Phaser.Types.Tweens.TweenBuilderConfig
    | Phaser.Types.Tweens.TweenChainBuilderConfig
    | Phaser.Tweens.TweenChain;
export type MovingFloorConfig = {
    texture: string;
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
    player?: Player;
};


class MovingFloor extends Phaser.GameObjects.Sprite {
    isJumping = false;
    scene: Phaser.Scene;
    hasEvent?: string;
    group: Phaser.Physics.Arcade.Group;
    Floors?: Phaser.Physics.Arcade.Group
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



        this.Floors = this.scene.physics.add.group({
            key: config.texture,
            frameQuantity: 1,
            setXY: { x: config.pos.x, y: config.pos.y },
            immovable: true,
            allowGravity: false,
            frictionX: 1,

        })
        const floor = this.Floors.getChildren()
        console.log("existe el player bro", config.player)

        /* Floor add to physic world */
        floor.forEach(floor => {
            scene.physics.add.existing(floor);
        });
        scene.physics.add.collider(floor, config.player!)

        /* Floor add to scene */
        // scene.add.existing(this);


        // this.body?.gameObject.setOffset(fix, 0)
        // this.body?.gameObject.setBounce(0);
        // this.body?.gameObject.setImmovable(true);
        // this.body?.gameObject.setCollideWorldBounds(true);
        // if (friction) this.body?.gameObject.setFriction(friction)

        if (this.body instanceof Phaser.Physics.Arcade.Body) {
            this.body.setImmovable(true);
            console.log("lo es")
        }
        // this.group.add(this);
        this.setDepth(10);
        this.setSize(width, height);

        if (config.tween) {
            const tween = this.scene.tweens.add({
                ...config.tween,
                targets: this,
            });
        }
    }
}

export default MovingFloor