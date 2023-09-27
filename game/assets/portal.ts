import Phaser from "phaser";
export type PortalTween =
    | Phaser.Tweens.Tween
    | Phaser.Types.Tweens.TweenBuilderConfig
    | Phaser.Types.Tweens.TweenChainBuilderConfig
    | Phaser.Tweens.TweenChain;
export type portalConfig = {
    spriteSheet: string,
    width: number,
    height: number,
    pos: { x: number, y: number },
    scene: Phaser.Scene,
    collected?: Boolean,
    tween?: Partial<PortalTween>
    frames: number[],
}

class portal extends Phaser.GameObjects.Container {
    isJumping = false;
    scene: Phaser.Scene;
    gap: number = 0;
    constructor(
        scene: Phaser.Scene,
        config: portalConfig,
        group: Phaser.Physics.Arcade.Group,
        frame?: string | number | undefined
    ) {
        super(scene, config.pos.x, config.pos.y);

        this.scene = config.scene
        this.width = config.width
        this.height = config.height
        this.x = config.pos.x
        this.y = config.pos.y

        const p = scene.add.sprite(this.x, this.y, config.spriteSheet).setSize(this.width, this.height).setDepth(9)


        if (!config.collected) {
            p.setTint(0xff0000)
        }
        if (this.body) {
            const body = this.body as Phaser.Physics.Arcade.Body
            body.setImmovable(true)
            body.setSize(this.width, this.height)
        }
        scene.add.existing(this);
        const portFrames = this.scene.anims.generateFrameNumbers(config.spriteSheet, {
            frames: config.frames
        })
        const portAnimConfig = {
            key: config.spriteSheet,
            frames: portFrames,
            frameRate: 24,
            repeat: -1
        }
        p.anims.create(portAnimConfig);
        p.anims.play(config.spriteSheet, true)

        if (config.tween) {
            const tween = this.scene.tweens.add({
                ...config.tween,
                targets: p,
            });
        }

    }

}
export default portal