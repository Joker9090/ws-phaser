import Phaser, { Cameras } from "phaser";
import { text } from "stream/consumers";
import player from "./assets/Player";
import gameState from "./assets/GameState";
import MapHandler from "./maps/MapHandler";
import Ui from "./UiScene";
import { mapConfig } from "./maps/MapHandler";
import SceneEvents from "./events/EventCenter";
import Menu from "./Menu";
import PauseMenu from "./PauseMenu";



const plataformas = ["plataforma3", "plataforma2", "plataforma1"]

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
    menu?: Menu;
    pauseMenu!: PauseMenu

    private backgroundMusic?: Phaser.Sound.BaseSound;
    private coinPickUp?: Phaser.Sound.BaseSound;
    private damage?: Phaser.Sound.BaseSound;
    private gameOver?: Phaser.Sound.BaseSound;
    constructor() {
        super({ key: "Game" })
        // add Scene
        this.timer = 0;
        this.secondTimer = 0;
        this.healthTimer = 0;
        this.missileScore = 0;
    }



    restart() {
        this.scene.restart()
    }
    launchMenu() {
        const config = { scene: this, score: gameState.score }
        this.scene.start("Menu", { scene: this, score: gameState.score })
        this.scene.pause()
        gameState.score = 0
    }

    create() {
        this.pauseMenu = new PauseMenu(this)

        if (this.pauseMenu && this.input.keyboard) {

            this.input.keyboard.on('keydown-P', () => {
                this.pauseMenu.open();
            });
        }
        this.cameras.main.flash()
        this.backgroundMusic = this.sound.add('BGmusic', { volume: 0.2 });
        this.backgroundMusic.play();
        this.coinPickUp = this.sound.add('CoinPickUp', { volume: 0.2 });
        this.damage = this.sound.add('Damage', { volume: 0.2 });
        this.gameOver = this.sound.add('GameOver', { volume: 0.2 });
        const newY = this.game.canvas.getBoundingClientRect().height / 2
        const newx = this.game.canvas.getBoundingClientRect().width / 4

        this.player = new player(this, newx, newY, "run", 0)
        let health = this.player.health
        this.scene.run("Ui", { health: health, scene: this })


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
            if (down || top) {
                this.gameOver?.play()
                this.backgroundMusic?.stop()
                this.launchMenu()
                --health
                console.log("barto overlap", health)
                SceneEvents.emit("updateHealth", health)
                --health
                console.log("barto overlap", health)
                SceneEvents.emit("updateHealth", health)
            }


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
        const { saws, spikes, diamonds, groundGroup, healings } = this.map;

        this.physics.add.overlap(saws, groundGroup, (saw, floor) => {
            saw.destroy();

        })

        this.physics.add.overlap(healings, this.player, (heal, player) => {
            if (health < 2) {
                ++health
                console.log("barto overlap", health)
                SceneEvents.emit("updateHealth", health)
                console.log("HEAL")
                // heal.destroy()
            }
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

        let isCooldown = false;

        this.physics.add.overlap(this.player, saws, (player, saw) => {
            if (!isCooldown) {
                console.log(isCooldown);
                this.player?.setAlpha(0.5);
                saw.destroy();
                --health;
                console.log("barto overlap", health);
                SceneEvents.emit("updateHealth", health);
                this.damage?.play();
                this.cameras.main.shake(200, 0.01);
                if (health <= 0) {
                    this.gameOver?.play();
                    this.backgroundMusic?.stop();
                    this.launchMenu();
                }
        
                // Set the cooldown
                isCooldown = true;
                setTimeout(() => {
                    this.player?.setAlpha(1)
                    isCooldown = false;
                }, 2000); // Cooldown duration in milliseconds (2 seconds)
            }
        });

        this.physics.add.overlap(this.player, diamonds, (player, diamond) => {
            const _diamond = diamond as Phaser.GameObjects.Image
            gameState.score += 1
            console.log("Diamente")
            const diamondX = _diamond.x;
            const diamondY = _diamond.y;

            this.add.particles(0, 0, 'match3', {
                x: () => {
                    return diamondX;
                },
                y: () => {
                    return diamondY;
                },
                frame: 'flare',
                speed: 200,
                lifespan: 700,
                gravityY: 200,
                scale: 0.3,
                stopAfter: 10,
            });
            diamond.destroy();
            this.coinPickUp?.play();
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