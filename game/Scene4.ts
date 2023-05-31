import Phaser from "phaser";
import { text } from "stream/consumers";
import player from "./assets/Player";
import gameState from "./assets/GameState";
import Map0 from "./maps/Map0";

const createPlatform = (group: Phaser.GameObjects.Group, spriteWidth: number, texture: string, dist: number) => {
    let _dist = dist ?? 0

    const platform = group.create(spriteWidth + _dist, gameState.sceneHeigth, texture).setOrigin(0, 1).setScale(0.5)
    if (texture === "plataforma1" || texture === "plataforma2" || texture === "plataforma3") {
        platform.setImmovable(true)
        platform.setSize(platform.displayWidth * 2, platform.displayHeigh - 50)
    }
    switch (texture) {
        case ("plataforma1" || "plataforma2" || "plataforma3"):
            platform.setDepth(2);
            break;
        case 'plateau':
            platform.setDepth(1);
            break;
        default:
    }
}

const updatePlatform = (group: Phaser.GameObjects.Group, spriteWidth: number, texture: string, dist: number) => {
    let _dist = dist ?? 0
    const child = group.get(spriteWidth - _dist, gameState.sceneHeigth, texture);
    child.setVisible(true);
    child.setActive(true);
    switch (texture) {
        case ("plataforma1" || "plataforma2" || "plataforma3"):
            child.setDepth(2);
            break;
        case 'plateau':
            child.setDepth(1);
            break;
        default:
    }
}
const moveBackgroundPlatform = (group: any, platformWidth: number, myTexture: "string", scrollFactor: number) => {
    group.children.iterate((child: any) => {
        child.x -= scrollFactor;
        if (child.x < -(child.displayWidth)) {
            group.killAndHide(child);
            updatePlatform(group, platformWidth, myTexture, scrollFactor);
        }
    });
};

class game extends Phaser.Scene {
    map?: Map0
    secondTimer: number;
    healthTimer: number;
    missileScore: number;
    timer: number;
    health: number = 120;
    player!: player;
    groundGroup?: any
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    saws!: Phaser.GameObjects.Group
    sawCreationTime?: Phaser.Time.TimerEvent;
    diamondCreationTime?: Phaser.Time.TimerEvent;
    diamonds!: Phaser.Physics.Arcade.Group;
    jumpTimes!: number
    jump!: number
    createMissile: Function
    x: number = 100
    y: number = 620
    upPlatformCreationTime!: Phaser.Time.TimerEvent;
    downPlatformCreationTime!: Phaser.Time.TimerEvent;
    text?: Phaser.GameObjects.Text
    constructor() {
        super({ key: 'Game' });
        // add timer
        this.timer = 0;
        this.secondTimer = 0;
        this.healthTimer = 0;
        this.missileScore = 0;
        this.createMissile = () => console.log("inicio")
    }


    preload(this: game) {
        this.load.spritesheet("run", "/game/Run.png", { frameWidth: 128, frameHeight: 128 })
        this.load.image("plataforma1", "/game/platform1.png")
        this.load.image("plataforma2", "/game/platform2.png")
        this.load.image("plataforma3", "/game/platform1B.png")
        this.load.image("saw", "/game/sierra5.png")
        this.load.image("background", "/game/background.png")
        this.load.image("diamond", "/game/diamante2.png")
        this.load.image("life", "/game/life.png")
        this.load.image("lifeFilling", "/game/lifeRelleno.png")
        this.load.image("close", "/game/close.png")
        this.load.image("spikes", "/game/spikes.png")
        this.load.image("fDspikes", "/game/faceDownSpikes.png")
       
    }

    create() {
        this.health = 100
        this.player = new player(this, this.x, this.y, "run", 0)
        this.player.setGravity(0, 0)
        this.text = this.add.text(10, 90, 'Score', {
            fontFamily: 'guardians',
            fontSize: '48px',
            color: '#ffffff'
          });



        this.add.image(1000, 400, "background").setScale(6).setScrollFactor(0).setDepth(-1)
        if (this.input.keyboard) {
            this.cursors = this.input.keyboard?.createCursorKeys();
        }
        this.physics.world.on('worldbounds', (body: Phaser.Physics.Arcade.Sprite, top: boolean, down: boolean, left: boolean, right: boolean) => {
            if (down || top) this.scene.restart()
        }, this);

        // this.physics.add.collider(this.player, floor)



        // saws
        this.saws = this.physics.add.group();

        const createSaw = () => {
            const y = Phaser.Math.Between(210, 880)
            const saw = this.saws.create(this.cameras.main.width + 100, y, "saw").setGravityY(0).setScale(0.7)
            saw.setVelocityX(-300)
            saw.setDepth(6)
            saw.body.setSize(saw.displayWidth - 35, saw.displayHeight - 35)
            // saw.setSize(saw.displayWidth - 10, saw.displayHeigh - 10)

            this.tweens.add({
                targets: saw,
                angle: 3600,
                yoyo: true,
                repeat: -1
            })
        }
        this.sawCreationTime = this.time.addEvent({
            callback: createSaw,
            delay: Phaser.Math.Between(1600, 2000),
            callbackScope: this,
            loop: true
        })

        // diamonds

        this.diamonds = this.physics.add.group()
        const createDiamond = () => {
            const y = Phaser.Math.Between(210, 880)
            const diamond = this.diamonds.create(this.cameras.main.width + 100, y, "diamond").setGravityY(0).setScale(0.7)
            diamond.setVelocityX(-300)
            diamond.setDepth(6)
            diamond.body.setSize(diamond.displayWidth + 35, diamond.displayHeight + 30)

        }


        this.diamondCreationTime = this.time.addEvent({
            callback: createDiamond,
            delay: Phaser.Math.Between(2500, 2900),
            callbackScope: this,
            loop: true
        })
        this.physics.add.overlap(this.saws, this.diamonds, (saw, singleDiamond) => {
            singleDiamond.destroy();
            saw.destroy()
        })


        // platforms

        this.groundGroup = this.physics.add.group()

        const createUpPlatform = () => {
            const y = 200
            const upPlatform = this.groundGroup.create(this.cameras.main.width + 90, y, "plataforma3").setGravityY(0).setScale(0.7)
            upPlatform.setVelocityX(Phaser.Math.Between(-300, -350))
            upPlatform.setDepth(6)

            upPlatform.body.setSize(upPlatform.displayWidth - 35, upPlatform.displayHeight - 35)

        }
        this.upPlatformCreationTime = this.time.addEvent({
            callback: createUpPlatform,
            delay: Phaser.Math.Between(1600, 2000),
            callbackScope: this,
            loop: true
        })

        const createDownPlatform = () => {
            const y = 890
            const downPlatform = this.groundGroup.create(this.cameras.main.width + 90, y, "plataforma3").setGravityY(0).setScale(0.7)
            downPlatform.setVelocityX(Phaser.Math.Between(-300, -250))
            downPlatform.setDepth(6)
            downPlatform.body.setSize(downPlatform.displayWidth - 35, downPlatform.displayHeight - 35)

        }
        this.downPlatformCreationTime = this.time.addEvent({
            callback: createDownPlatform,
            delay: Phaser.Math.Between(1600, 2000),
            callbackScope: this,
            loop: true
        })
        this.physics.add.overlap(this.saws, this.groundGroup, (saw, floor) => {
            saw.destroy();
        })
        this.physics.add.overlap(this.diamonds, this.groundGroup, (diamond, floor) => {
            diamond.destroy();
        })

        if (this.player) {
            this.physics.add.overlap(this.player, this.saws, (player, saw) => {
                this.scene.restart()
                gameState.score = 0
            })
            this.physics.add.overlap(this.player, this.diamonds, (player, diamond) => {
                gameState.score += 1
                diamond.destroy()
            })
        }
        // estos dos reducen vida progresivamente a -1 cada 500ms 
        const reduceHealthTimely = () => {
            this.health -= 1;
            this.healthTimer = 0;

        };


        // this.time.addEvent({
        //     callback: reduceHealthTimely,
        //     delay: 500,
        //     loop: true,
        //     callbackScope: this,
        // });


    }



    update(time: number, delta: number, cursors?: Phaser.Types.Input.Keyboard.CursorKeys | undefined) {
        // if (this.health <= 0) {
        //     this.scene.stop()
        //   
        //     this.scene.restart()
        // }


        // if (cursors) {
        //     const { left, right, up, down, space } = cursors
        //     console.log(cursors, "cursors")
        //     // this.player?.anims.play("run", true)



        //     this.timer += delta;
        //     // every four missiles you jump on +1 to health and back to misile score of 0
        //     if (this.missileScore >= 1) {
        //         this.health += 1;
        //         this.missileScore -= 1;
        //     }
        //     // moves misile your way
        //     //  this.missileGroup.children.iterate((child) => {
        //     //    child.x -= 5;
        //     // });


        //     // checks time and every 5 seconds triggers the create missile function
        //     this.timer += delta;
        //     if (this.timer >= 500) {

        //         this.timer = 0;
        //     }


        //     // does the same with the second timer keeping two separate spawn rates
        //     this.secondTimer += delta;
        //     if (this.secondTimer >= 700) {

        //         this.secondTimer = 0;
        //     }

        //     // checks the up key, makes you jump and changes the jump count acordingly
        //     if (Phaser.Input.Keyboard.JustDown(up)) {
        //         if (this.player.body?.touching.down || this.jump < this.jumpTimes && (this.jump > 0)) {
        //             this.player.setVelocityY(-400)
        //             this.jump += 1
        //             if (this.player.body?.touching.down) {
        //                 this.jump = 0
        //             }
        //         }
        //     }
        //     if (down.isDown) {
        //         if (!this.player.body?.touching.down) {
        //             this.player.setGravityY(1300)
        //         }
        //     }
        //     if (this.player.body?.touching.down) {
        //         this.player.setGravityY(800)
        //     }
        // }
        if (this.player) {
            this.player.checkMove(this.cursors)
            this.physics.add.collider(this.groundGroup, this.player)
        }
        if (this.text) {
        this.text.setText(`Score ${gameState.score}`)
        }
    }

}
export default game