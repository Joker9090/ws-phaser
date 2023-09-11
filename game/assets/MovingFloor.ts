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
    group?: Phaser.GameObjects.Group;
    x: number = 0;

    constructor(
        scene: Phaser.Scene,
        config: MovingFloorConfig,
        group?: Phaser.GameObjects.Group,
        frame?: string | number | undefined

    ) {
        super(scene, config.pos.x, config.pos.y, config.texture);
        this.scene = scene;
        this.group = group;
        const width = config.width ?? 120;
        const height = config.height ?? 108;

        if (config) {
            if (config.scale) this.setScale(config.scale.width, config.scale.height);
            if (config.pos) this.x = config.pos.x
            console.log(this.x)
        }
        
        /* Floor add to physic world */
        //scene.physics.add.existing(this);

        /* Floor add to scene */
        scene.physics.add.sprite(500, 600, "plataformaLarga2").setGravityY(-1000).setImmovable(true).setVelocityX(10)
        //scene.add.existing(this);
        this.setDepth(10)
        .setSize(width, height)
        
        
        this.group?.add(this);
        


        if (config.tween) {
            const tween = this.scene.tweens.add({
                ...config.tween,
                targets: this,
            });
        }
    }
}

export default MovingFloor