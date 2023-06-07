import Phaser from "phaser";
import { text } from "stream/consumers";
import player from "./assets/Player";
import gameState from "./assets/GameState";
import MapHandler from "./maps/MapHandler";
import { mapConfig } from "./maps/MapHandler";


const plataformas = ["plataforma3", "plataforma2", "plataforma1"]
const updatePlatform = (group: Phaser.GameObjects.Group, spriteWidth: number, texture: string, dist: number) => {
    let _dist = dist ?? 0
    const child = group.get(spriteWidth - _dist, gameState.sceneHeigth, texture);
    child.setVisible(true);
    child.setActive(true);
    switch (texture) {
        case "plataforma3":
        case "plataforma2":
        case "plataforma1":
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

class Game extends Phaser.Scene {
    secondTimer: number;
    healthTimer: number;
    missileScore: number;
    timer: number;
    health: number = 120;
    player?: player;
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    score?: Phaser.GameObjects.Text
    x: number = 100
    y: number = 620
    map!: MapHandler
    constructor() {
        super({ key: "game" })
        // add Scene
        this.timer = 0;
        this.secondTimer = 0;
        this.healthTimer = 0;
        this.missileScore = 0;
        this.createMissile()
    }


    createMissile() {
        console.log("inicio")
    }

    create() {
        this.health = 100
        /* Player */
        const newY = this.game.canvas.getBoundingClientRect().height / 2
        const newx = this.game.canvas.getBoundingClientRect().width / 4

        this.player = new player(this, newx, newY, "run", 0)


        this.player.setGravity(0, 0)

        /* Mas Modular */
        this.score = this.add.text(10, 90, 'Score', {
            fontFamily: 'guardians',
            fontSize: '48px',
            color: '#ffffff'
        });

        /* AL MAP HANDLER */
   

        /* Controls */
        if (this.input.keyboard) {
            this.cursors = this.input.keyboard?.createCursorKeys();
        }

        /* World Collider, pero podria ir dentro del mapHandler */
        this.physics.world.on('worldbounds', (body: Phaser.Physics.Arcade.Sprite, top: boolean, down: boolean, left: boolean, right: boolean) => {
            if (down || top) this.scene.restart()
        }, this);

        /* MAP */
        const mapConfig = {
            player: this.player,
            sawsY: { top: 230, bottom: 880 },
            diamondsY: { top: 230, bottom: 880 },
            initialDelay: 1300
        }
        this.map = new MapHandler(this, mapConfig)

        this.map.createMap();

        // COLLIDERS!
        const { saws, spikes, diamonds, groundGroup } = this.map;

        this.physics.add.overlap(saws, groundGroup, (saw, floor) => {
            saw.destroy();
        })
        this.physics.add.overlap(diamonds, groundGroup, (diamond, floor) => {
            diamond.destroy();
        })
        this.physics.add.overlap(diamonds, groundGroup, (diamond, floor) => {
            diamond.destroy();
        })
        this.physics.add.overlap(this.map.saws, this.map.diamonds, (saw, singleDiamond) => {
            singleDiamond.destroy();
            saw.destroy()
        })


        if (this.player) {
            this.physics.add.overlap(this.player, saws, (player, saw) => {
                this.scene.restart()
                gameState.score = 0
            })
            this.physics.add.overlap(this.player, diamonds, (player, diamond) => {
                gameState.score += 1
                diamond.destroy()
            })
            this.physics.add.overlap(this.player, groundGroup, (player, platform) => {
                const p = (player as player)
                console.log("ACAAAA", p)
                if (p._direction == "up") p.down()
                else if (p._direction == "down") p.up()
            })
        }


        // estos dos reducen vida progresivamente a -1 cada 500ms 
        // const reduceHealthTimely = () => {
        //     this.health -= 1;
        //     this.healthTimer = 0;

        // };


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
            this.physics.add.collider(this.map.groundGroup, this.player)
        }
        if (this.score) {
            this.score.setText(`Score ${gameState.score}`)
        }

    }

}
export default Game