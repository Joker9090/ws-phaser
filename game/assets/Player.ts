import Phaser from "phaser";

class player extends Phaser.Physics.Arcade.Sprite {
    isJumping?: boolean = false;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: number) {
        super(scene, x, y, texture, frame)
    }
    createAnims(scene: Phaser.Scene) {
        const runAnim = scene.anims.generateFrameNumbers("run", { frames: [0, 1, 2, 3, 4, 5, 0] })


    }

    idle() {
        this.isJumping = false,
            this.setVelocityX(0)
        this.setVelocityY(0)
    }
    jump() {
        if (!this.isJumping) {
            this.isJumping = true
            this.play("jump")
            this.setVelocityY(-530)
            this.scene.time.delayedCall(600, this.idle, [], this);
        }
    }
    checkMove(cursors?: Phaser.Types.Input.Keyboard.CursorKeys | undefined) {
        if (cursors) {
            const { left, right, up } = cursors
            if (left.isDown) {
                this.setVelocityX(-160)
                this.setFlipX(true)
                console.log("left")
                if (!this.isJumping) { this.anims.play("move", true) }
            }
            else if (right.isDown) {
                this.setVelocityX(160)
                this.setFlipX(false)
                console.log("right")
                if (!this.isJumping) { this.anims.play("move", true) }
            }
            else {
                this.setVelocityX(0)
                this.setFlipX(false)
                this.anims.play("idle", true)
                console.log("idle")
            }
            if (up.isDown && this.body && this.body.touching.down) {
                this.jump()
                console.log("jump")
            }

        }
    }
}
export default player