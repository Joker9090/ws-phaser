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

class game extends Phaser.Scene {

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
    spikes!: Phaser.Physics.Arcade.Group
    jumpTimes!: number
    jump!: number
    createMissile: Function
    x: number = 100
    y: number = 620
    upPlatformCreationTime!: Phaser.Time.TimerEvent;
    downPlatformCreationTime!: Phaser.Time.TimerEvent;
    text?: Phaser.GameObjects.Text
    map!: MapHandler
    constructor() {
        super({key:"game"})
        // add Scen
        this.timer = 0;
        this.secondTimer = 0;
        this.healthTimer = 0;
        this.missileScore = 0;
        this.createMissile = () => console.log("inicio")
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
        const mapConfig = {
            player: this.player,
            sawsY: { top: 230, bottom: 880 },
            diamondsY: { top: 230, bottom: 880 },
            initialDelay: 1300
        }
        this.map = new MapHandler(mapConfig)

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
            this.physics.add.collider(this.groundGroup, this.player)
        }
        if (this.text) {
            this.text.setText(`Score ${gameState.score}`)
        }
    }

}
export default game