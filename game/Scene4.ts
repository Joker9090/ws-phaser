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
    map?:Map0
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
    birdGroup: any;
    jumpTimes!: number
    jump!: number
    createMissile: Function
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
        this.health = 120
        this.player = new player(this, 150, 620, "run", 0)
        this.map = new Map0(this, 2)

        const [floor, diamonds, saws] = this.map.createMap(2, "plataforma1", "plataforma2", "plataforma3", "diamond", "saw", "spikes", "fDspikes")

        this.physics.add.collider(this.player, this.groundGroup)
        // this.player.setGravityY(800)
        // this.player.setDepth(6)
        this.player.setCollideWorldBounds(true)
        this.player.setSize(this.player.width, this.player.height + 30)
        this.player.setOffset(this.player.width / 2 - 15, -10)
        if (this.input.keyboard) {
            this.cursors = this.input.keyboard?.createCursorKeys();
        }
        this.jumpTimes = 2;
        this.jump = 0


        // saws
        this.saws = this.physics.add.group();

        const createSaw = () => {
            const y = Phaser.Math.Between(100, 700)
            const saw = this.saws.create(this.cameras.main.width + 100, y, "saw").setGravityY(0).setScale(0.7)
            saw.setVelocityX(-100)
            saw.setDepth(6)
            saw.setSize(saw.displayWidth - 10, saw.displayHeigh - 10)
            console.log(saw, "saw")
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
            const y = Phaser.Math.Between(100, 700)
            const diamond = this.diamonds.create(this.cameras.main.width + 100, y, "diamond").setGravityY(0).setScale(0.7)
            diamond.setVelocityX(-100)
            diamond.setDepth(6)
            diamond.setSize(diamond.displayWidth - 10, diamond.displayHeigh - 10)
            console.log(diamond, "diamond")
        }

        this.physics.add.overlap(this.player, this.diamonds, (player, singleDiamond) => {
            singleDiamond.destroy();
            gameState.score += 1;
            this.health += 1
        })
        this.diamondCreationTime = this.time.addEvent({
            callback: createDiamond,
            delay: Phaser.Math.Between(16000, 20000),
            callbackScope: this,
            loop: true
        })


        this.diamondCreationTime = this.time.addEvent({
            callback: createDiamond,
            delay: Phaser.Math.Between(1000, 1700),
            callbackScope: this,
            loop: true,
        })

        const reduceHealthTimely = () => {
            this.health -= 1;
            this.healthTimer = 0;
        };

        this.time.addEvent({
            callback: reduceHealthTimely,
            delay: 500,
            loop: true,
            callbackScope: this,
        });


    }

    // createBirdDrop(group: Phaser.GameObjects.Group, texture: string) {
    //     if (this.birdGroup.getLength() >= 2) {
    //         const child = this.birdGroup.getChildren()[Phaser.Math.Between(0,
    //             this.birdGroup - 1)];
    //         const drop = group.create(child.x, child.y, texture).setScale(0.05);
    //         if (texture === 'spike') {
    //             drop.setScale(0.1);
    //         }
    //         drop.setGravityY(700);
    //         drop.setGravityX(0);
    //         drop.setDepth(6);
    //         drop.setBounce(1);
    //         drop.setSize(drop.width - 200, drop.height - 200);
    //     }
    // }

    update(time: number, delta: number, cursors?: Phaser.Types.Input.Keyboard.CursorKeys | undefined) {
        if (cursors) {
            const { left, right, up, down, space } = cursors
            if (this.health <= 0) {
                this.scene.stop()
                this.scene.restart()
            }
            // this.player?.anims.play("run", true)

            this.timer += delta;
            // every four missiles you jump on +1 to health and back to misile score of 0
            if (this.missileScore >= 1) {
                this.health += 1;
                this.missileScore -= 1;
            }
            // moves misile your way
            //  this.missileGroup.children.iterate((child) => {
            //    child.x -= 5;
            // });


            // checks time and every 5 seconds triggers the create missile function
            this.timer += delta;
            if (this.timer >= 500) {
                console.log("misile")
                this.timer = 0;
            }


            // does the same with the second timer keeping two separate spawn rates
            this.secondTimer += delta;
            if (this.secondTimer >= 700) {
                console.log("misile")
                this.secondTimer = 0;
            }

            // checks the up key, makes you jump and changes the jump count acordingly
            if (Phaser.Input.Keyboard.JustDown(up)) {
                if (this.player.body?.touching.down || this.jump < this.jumpTimes && (this.jump > 0)) {
                    this.player.setVelocityY(-400)
                    this.jump += 1
                    if (this.player.body?.touching.down) {
                        this.jump = 0
                    }
                }
            }
            if (down.isDown) {
                if (!this.player.body?.touching.down) {
                    this.player.setGravityY(1300)
                }
            }
            if (this.player.body?.touching.down) {
                this.player.setGravityY(800)
            }
        }
    }

}
export default game