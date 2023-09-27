import Phaser, { Physics } from "phaser";

export type LargeFloorTween =
    | Phaser.Tweens.Tween
    | Phaser.Types.Tweens.TweenBuilderConfig
    | Phaser.Types.Tweens.TweenChainBuilderConfig
    | Phaser.Tweens.TweenChain;
export type bottomConfig = {
    texture: string
    width?: number;
    height?: number;
    pos: {
        x: number;
        y: number;
    };
    large: number;


};
// Scene in class
class Bottom extends Phaser.GameObjects.Container {
    isJumping = false;
    scene: Phaser.Scene;
    group: Phaser.Physics.Arcade.Group;
    parts: Phaser.Physics.Arcade.Sprite[];
    gap: number = 0;
    constructor(
        scene: Phaser.Scene,
        config: bottomConfig,
        group: Phaser.Physics.Arcade.Group,
        frame?: string | number | undefined
    ) {
        super(scene, config.pos.x, config.pos.y);
        this.parts = [];

        this.scene = scene;
        this.group = group;
        const width = config.width ?? 403;
        const height = config.height ?? 93;

  

        for (let index = 0; index < config.large; index++) {
            const t = config.texture
            const s = scene.add.sprite(index * width, config.pos.y, t);
            this.add(s)
        }


        //Set scale

    }
}

export default Bottom;
