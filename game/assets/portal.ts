import Phaser from "phaser";

export type portalConfig = {
    spriteSheet: string,
    width: number,
    height: number,
    pos: { x: number, y: number },
    scene: Phaser.Scene,
    collected: Boolean
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

        const p = scene.add.sprite(this.x, this.y, config.spriteSheet).setSize(this.width, this.height)
        if (!config.collected) {
            p.setTint(0xff0000)
        }
        if (this.body) {
            const body = this.body as Phaser.Physics.Arcade.Body
            body.setImmovable(true)
            body.setSize(this.width, this.height)
        }

        const portFrames = this.scene.anims.generateFrameNumbers(config.spriteSheet, {
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]
        })
        const portAnimConfig = {
            key: config.spriteSheet,
            frames: portFrames,
            frameRate: 24,
            repeat: -1
        }
        p.anims.create(portAnimConfig);
        p.anims.play(config.spriteSheet, true)

    }

}
export default portal