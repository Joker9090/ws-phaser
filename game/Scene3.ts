import Phaser from "phaser";
import player from "./assets/Player";
class scene3 extends Phaser.Scene {
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys
    graphics?: Phaser.GameObjects.Graphics
    car?: Phaser.Physics.Arcade.Sprite
    road?: Phaser.GameObjects.TileSprite
    roadLeft?: Phaser.GameObjects.TileSprite
    roadRight?: Phaser.GameObjects.TileSprite
    fuel?: Phaser.Physics.Arcade.Sprite
    velocity: number = 2
    maxVelocity: number = 10
    dificulty: number = 2000
    carsCrashed: Phaser.Physics.Arcade.Sprite[] = []
    powerBarFull?: Phaser.GameObjects.TileSprite
    powerBarEmpty?: Phaser.GameObjects.TileSprite


    preload() {
        this.load.image("car", "/game/car.png")
        this.load.image("road", "/game/road.png")
        this.load.image("fuel", "/game/fuel.png");
        this.load.image("carCrashed", "/game/carCrash.png");
        this.load.image("roadLeft", "/game/roadLeft.png");
        this.load.image("roadRight", "/game/roadRight.png");
        this.load.image("powerBarFull", "/game/powerBarFull.png");
        this.load.image("powerBarEmpty", "/game/powerBarEmpty.png");
        this.load.image("cloud", "/game/cloud.png");
    }

    create() {
        const { centerX, centerY } = this.physics.world.bounds
        const { width, height } = this.game.canvas

        this.road = this.add.tileSprite(centerX, centerY, width, height, "road").setScale(1.3)

        this.roadLeft = this.add.tileSprite(-40, centerY, 30, height, "roadLeft").setOrigin(-1, 0.5)
        this.roadRight = this.add.tileSprite(width, centerY, 26, height, "roadLeft").setOrigin(-1, 0.5)
        this.powerBarEmpty = this.add.tileSprite(width - 15, height - 82, 340, 140, "powerBarEmpty").setOrigin(1, 0.5)
        this.powerBarFull = this.add.tileSprite(width - 15, height - 82, 340, 140, "powerBarFull").setOrigin(1, 0.5)
        this.powerBarFull.setCrop(0, 0, 0, 140)

        const graphics = this.add.graphics()

        this.tweens.addCounter({
            from: 0,
            to: 60,
            duration: 100,
            ease: window.Phaser.Math.Easing.Sine.InOut,
            // yoyo: true,
            repeat: -1,
            onUpdate: (tween) => {
                if (this.car) {
                    const { x, y, height } = this.car;
                    const h = y + (height / 2) - 10
                    const value = tween.getValue();
                    graphics.clear();
                    graphics.lineStyle(10, 0xFFFFF0, 1.0);
                    // left
                    graphics.beginPath();
                    graphics.moveTo(x - 20, h);
                    graphics.lineTo(x - 20, h + value);
                    graphics.closePath();
                    graphics.strokePath();

                    // right
                    graphics.beginPath();
                    graphics.moveTo(x + 20, h);
                    graphics.lineTo(x + 20, h + value);
                    graphics.closePath();
                    graphics.strokePath();


                }
            }
        })

        this.cursors = this.input.keyboard?.createCursorKeys();
        this.tweens.add({
            targets: this.car,
            duration: 100,
            paused: false,
            yoyo: true,
            repeat: -1,
            y: "-= 2"
        })

        this.time.delayedCall(this.dificulty, this.createCarCrashed, [], this)
    }

    createCarCrashed() {
        const { width } = this.physics.world.bounds
        const p = Phaser.Math.Between(60, width - 60)
        const c = this.physics.add.sprite(p, 0, "carCrashed");
        c.setVelocityY(this.velocity * 100)
        this.carsCrashed.push(c);
        this.time.delayedCall(this.dificulty, this.createCarCrashed, [], this);
    }
   
    
}
export default scene3