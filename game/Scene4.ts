import Phaser from "phaser";
import { text } from "stream/consumers";
import player from "./assets/Player";
import gameState from "./assets/GameState";
import MapHandler from "./maps/MapHandler";
import Ui from "./UiScene";
import { mapConfig } from "./maps/MapHandler";
import SceneEvents from "./events/EventCenter";
import Menu from "./Menu";


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
    player?: player;
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    score?: Phaser.GameObjects.Text
    x: number = 100
    y: number = 620
    map!: MapHandler
    ui?: Phaser.Scene
    menu?: Menu

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
    restart() {
        this.scene.restart()
    }
    launchMenu() {
        const config = { scene: this, score: gameState.score }
        this.scene.start("Menu", { scene: this, score: gameState.score })
        this.scene.pause()
        gameState.score = 0
        console.log("ENTRO")

    }
    create() {
        const newY = this.game.canvas.getBoundingClientRect().height / 2
        const newx = this.game.canvas.getBoundingClientRect().width / 4
        this.player = new player(this, newx, newY, "run", 0)
        let health = this.player.health
        this.scene.run("Ui",{health:health})


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
            if (down || top) this.launchMenu()


        }, this);

        /* MAP */
        const mapConfig = {
            player: this.player,
            sawsY: { top: this.cameras.main.height - 90, bottom: this.cameras.main.height - 40 },
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

        
        if (this.player && health) {
            this.physics.add.overlap(this.player, saws, (player, saw) => {
                saw.destroy()
                --health
                SceneEvents.emit("updateHealth", health)
                console.log("ouch from scene", health)
                if (health <= 0) {
                    this.launchMenu()
                }
            })
            this.physics.add.overlap(this.player, diamonds, (player, diamond) => {
                gameState.score += 1
                diamond.destroy()
            })
            this.physics.add.overlap(this.player, groundGroup, (player, platform) => {
                const p = (player as player)
                const pl = platform
                console.log("ACAAAA", p)
                if (p._direction == "up") p.down()
                else if (p._direction == "down") p.up()
                pl.destroy()
            })
        }




    }



    update(time: number, delta: number, cursors?: Phaser.Types.Input.Keyboard.CursorKeys | undefined) {

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