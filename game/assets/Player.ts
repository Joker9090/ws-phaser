import Phaser from "phaser";

class player extends Phaser.Physics.Arcade.Sprite {
    isJumping?: boolean = false;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: number) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.createAnims(scene, texture)
        this.setCollideWorldBounds(true)
        if (this.body) {
            const body = (this.body as Phaser.Physics.Arcade.Body)
            body.onWorldBounds = true;
            this.body.setSize(30, 85, true);
        }
    }
    createAnims(scene: Phaser.Scene, texture: string) {
        const runAnimFrames = scene.anims.generateFrameNumbers(texture, { frames: [0, 1, 2, 3, 4, 5, 0] })
        const idleAnimFrames = scene.anims.generateFrameNames(texture, { frames: [0, 1, 0] })
        const jumpAnimFrames = scene.anims.generateFrameNames(texture, { frames: [0, 1, 2, 3, 4, 5, 0] })

        const berserkMoveConfig = {
            key: "run",
            frames: runAnimFrames,
            frameRate: 10,
            repeat: -1,
        }
        const berserkIdleConfig = {
            key: "idle",
            frames: idleAnimFrames,
            frameRate: 10,
            repeat: 0,
        }
        const berserkJumpConfig = {
            key: "jump",
            frames: jumpAnimFrames,
            frameRate: 12,
            repeat: -1
        }
        scene.anims.create(berserkMoveConfig)
        scene.anims.create(berserkIdleConfig)
        scene.anims.create(berserkJumpConfig)


    }

    idle() {
        this.isJumping = false,
        this.setVelocityX(0)
        this.setVelocityY(0)
        this.play("idle")
    }
    jump() {
        if (!this.isJumping) {
            this.isJumping = true
            this.play("jump")
            this.setVelocityY(-630)
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
                if (!this.isJumping) { this.anims.play("run", true) }
            }
            else if (right.isDown) {
                this.setVelocityX(160)
                this.setFlipX(false)
                console.log("right")
                if (!this.isJumping) { this.anims.play("run", true) }
            }
            else {
                this.setVelocityX(0)
                this.setFlipX(false)
                this.anims.play("idle", true)
                console.log("idle")
            }
            if (up.isDown && this.body && this.body.touching.down) {
                this.jump()
                this.anims.play("jump", true)
                console.log("jump")
            }

        }
    }
}
export default player