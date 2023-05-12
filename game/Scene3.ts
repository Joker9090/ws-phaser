
import Phaser from "phaser";
import { pathToFileURL } from "url";
import CloudGenerator, { CloudGeneratorConfig } from "./assets/CloudGenerator";
import Player from "./assets/Player";
import Mapa from "./maps/Mapa1";

// Scene in class
class Scene3 extends Phaser.Scene {
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys
  monchi?: Player
  graphics?: Phaser.GameObjects.Graphics
  car?: Phaser.Physics.Arcade.Sprite;
  road?: Phaser.GameObjects.TileSprite;
  roadLeft?: Phaser.GameObjects.TileSprite;
  roadRight?: Phaser.GameObjects.TileSprite;
  fuel?: Phaser.Physics.Arcade.Sprite;
  velocity: number = 2;
  maxVelocity: number = 10;
  dificulty: number = 2000;
  carsCrashed: Phaser.Physics.Arcade.Sprite[] = []
  powerBarFull?: Phaser.GameObjects.TileSprite;
  powerBarEmpty?: Phaser.GameObjects.TileSprite;

  preload(this: Phaser.Scene) {
    this.load.spritesheet("car", "/game/car.png", { frameWidth: 84, frameHeight: (504 / 3) });
    //this.load.image("road", "/game/road.png");
    this.load.image("road", "/game/road2.png");
    this.load.image("fuel", "/game/fuel.png");
    this.load.image("carCrashed", "/game/carCrash.png");
    this.load.image("roadLeft", "/game/roadLeft.png");
    this.load.image("roadRight", "/game/roadRight.png");
    this.load.image("powerBarFull", "/game/powerBarFull.png");
    this.load.image("powerBarEmpty", "/game/powerBarEmpty.png");
    this.load.image("cloud", "/game/cloud.png");
    
  }


  create(this: Scene3) {
    this.physics.add.world.gravity.set(0, 0)
    const { centerX, centerY } = this.physics.world.bounds
    //const a = this.add.sprite(0,0,"road").setDepth(-1).setAlpha(0)
    const { width, height } = this.game.canvas;

    /*
    const rt = this.add.renderTexture(centerX, centerY, a.width, a.height)
    
    rt.setOrigin(0.5, 0.5);
    rt.camera.setAngle(0);
    rt.camera.setZoom(1);
    rt.camera.setPosition(0, 0);
    rt.setDepth(1)

    rt.drawFrame('road');
    */
    // this.road = this.add.sprite(centerX,centerY,"road",0)


    this.road = this.add.tileSprite(centerX, centerY, Number(width), Number(height), "road")

    this.roadLeft = this.add.tileSprite(-40, centerY, Number(30), Number(height), "roadLeft").setOrigin(-1, 0.5)
    this.roadRight = this.add.tileSprite(width, centerY, Number(26), Number(height), "roadRight").setOrigin(1, 0.5)

    this.powerBarEmpty = this.add.tileSprite(width - 15, height - 82, 340, 140, "powerBarEmpty").setOrigin(1, 0.5)
    this.powerBarFull = this.add.tileSprite(width - 15, height - 82, 340, 140, "powerBarFull").setOrigin(1, 0.5)
    this.powerBarFull.setCrop(0,0,0,140)


    const c3Config: CloudGeneratorConfig = {
      texture: "cloud",
      x: -400,
      y: 300,
      delayed: 3700,
      randomnes: 2,
      direction: 0,
      startWith: 5,
      depth: 10,
    }
    const c3 = new CloudGenerator(this, c3Config)
    c3.start()
    
    const graphics = this.add.graphics();

    this.car = this.physics.add.sprite(centerX, centerY / 0.7, "car", 0).setDepth(2)

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
      y: "-=2"
    })

    this.time.delayedCall(this.dificulty, this.createCarCrashed, [], this);

  }

  createCarCrashed() {
    const { width } = this.physics.world.bounds
    const p = Phaser.Math.Between(60, width - 60)
    const c = this.physics.add.sprite(p, 0, "carCrashed");
    c.setVelocityY(this.velocity * 100)
    this.carsCrashed.push(c);
    this.time.delayedCall(this.dificulty, this.createCarCrashed, [], this);

  }

  createFuel() {
    const { width } = this.physics.world.bounds
    if (!this.fuel) {
      const p = Phaser.Math.Between(60, width - 60)
      this.fuel = this.physics.add.sprite(p, 0, "fuel");
      this.fuel.setVelocityY(this.velocity * 100)
    }

  }

  update(this: Scene3) {
    if (this.powerBarFull) this.powerBarFull.setCrop(0,0,340 * this.velocity / this.maxVelocity,140)
    const { height } = this.physics.world.bounds
    if (this.road) this.road.setTilePosition(0, this.road.tilePositionY - this.velocity)
    if (this.roadLeft) this.roadLeft.setTilePosition(0, this.roadLeft.tilePositionY - (this.velocity + 1))
    if (this.roadRight) this.roadRight.setTilePosition(0, this.roadRight.tilePositionY - (this.velocity + 1))
    if (this.velocity <= 0) {
      console.log("Barto Lose!")
      if (this.roadLeft) this.roadLeft.setTilePosition(0, 0)
      if (this.roadRight) this.roadRight.setTilePosition(0, 0)
    }
    const speed = 110;
    const angle = 0.19;
    if (this.cursors) {
      const { left, right, up, down, space } = this.cursors;
      if (left.isDown) {
        this.car?.setVelocityX(speed * -1)
        this.car?.setRotation(-angle);
      } else if (right.isDown) {
        this.car?.setVelocityX(speed)
        this.car?.setRotation(angle);
      } else {
        this.car?.setVelocityX(0)
        this.car?.setRotation(0);
      }
      if (up.isDown) {
        this.car?.setVelocityY(speed * -1)
      } else if (down.isDown) {
        this.car?.setVelocityY(speed)
      } else this.car?.setVelocityY(0)

      if (space.isDown) {
        this.createFuel()
      }
      if (this.fuel) {
        // fuel destroy
        if (this.fuel.y > height) {
          this.fuel.destroy(true)
          this.fuel = undefined;
        }
        // grab fuel
        if (this.car && this.car.body && this.fuel && this.fuel.body && Phaser.Geom.Intersects.RectangleToRectangle(
          this.fuel.getBounds(),
          this.car.getBounds()
        )) {
          this.velocity += 1;
          this.fuel.destroy(true)
          this.fuel = undefined;
          this.carsCrashed.forEach(c => {
            if (c.body) (c.body as Phaser.Physics.Arcade.Body).setVelocityY(this.velocity * 100)
          })
        }
      }
      // Check carsCrashed
      if (this.carsCrashed.length) {
        this.carsCrashed.forEach(c => {
          // car destroy
          if (c.y > height) {
            c.destroy(true)
          }
          // car touch
          if (this.car && this.car.body && c && c.body && Phaser.Geom.Intersects.RectangleToRectangle(
            c.getBounds(),
            this.car.getBounds()
          )) {
            this.velocity -= 1;
            c.destroy(true)
          }
        })
      }

    }
  }
}

export default Scene3 