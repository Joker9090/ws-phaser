
import Phaser from "phaser";
import CloudGenerator, { CloudGeneratorConfig } from "./assets/CloudGenerator";

declare global {
  interface Window { PhaserAssets: any; }
}

// Scene in class
class Scene4 extends Phaser.Scene {
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys
  road?: Phaser.GameObjects.TileSprite
  powerBarEmpty?: Phaser.GameObjects.TileSprite
  powerBarFull?: Phaser.GameObjects.TileSprite
  velocity: number = 120
  maxVelocity: number = 120
  car?: Phaser.Physics.Arcade.Sprite
  carEnemy?: Phaser.Physics.Arcade.Sprite
  graphics1?: Phaser.GameObjects.Graphics
  graphics2?: Phaser.GameObjects.Graphics
  background1?: Phaser.GameObjects.TileSprite
  background2?: Phaser.GameObjects.TileSprite
  constructor() {
    super({ key: 'Scene4' })
  }
  // preload(this: Phaser.Scene) {
    
  // }

  create(this: Scene4) {
    let songLoader = this.load.audio('song', ['sounds/PeterSpacey-Glorious.mp3'])
    songLoader.on('filecomplete', () => this.sound.add('song').play())
    songLoader.start()

    this.physics.add.world.gravity.set(0, 0)
    
    const { centerX, centerY, height, width } = this.physics.world.bounds
    const { height: h, width: w } = this.game.canvas.getBoundingClientRect()

    this.background1 = this.add.tileSprite(0, 0, w * 2, h * 3.6, "nightSkyTop").setOrigin(0.5,0.5).setDepth(1)
    this.background2 = this.add.tileSprite(0, height - 330, w , 200 * -1, "nightSky").setOrigin(0,0).setDepth(1)
    this.road = this.add.tileSprite(centerX, height, Number(width), 390, "roadSide").setOrigin(0.5, 1).setDepth(3)
    this.carEnemy = this.physics.add.sprite(centerX - 80, height - 300, "carEnemy").setScale(0.09).setFlipX(true).setBounce(1,1).setMass(200).setDepth(3)
    this.car = this.physics.add.sprite(centerX, height - 180, "car").setScale(0.2).setFlipX(true).setBounce(1,1).setMass(200).setDepth(3)
    this.powerBarEmpty = this.add.tileSprite(width - 15, height - 82, 340, 140, "powerBarEmpty").setOrigin(1, 0.5).setDepth(199)
    this.powerBarFull = this.add.tileSprite(width - 15, height - 82, 340, 140, "powerBarFull").setOrigin(1, 0.5).setDepth(199)

    this.powerBarFull.setCrop(0, 0, 0, 140)
    this.cursors = this.input.keyboard?.createCursorKeys();

    // 
    this.graphics1 = this.add.graphics().setDepth(9)
    const g = this.physics.world.enable(this.graphics1);

    // left
    this.graphics1.fillStyle(0x0d3d73, 1).setAlpha(0);
    this.graphics1.fillRect(0, height - 390, width, 20);
    
    if (this.graphics1.body) {
      (this.graphics1.body as Phaser.Physics.Arcade.Body)
      .setOffset(0,height - 390)
      .setSize(width, 20, false)
      .setBounce(1,1).setMass(200)
      .setImmovable(true);
    }

    // 
    this.graphics2 = this.add.graphics().setDepth(9)
    const g2 = this.physics.world.enable(this.graphics2);

    // left
    this.graphics2.fillStyle(0x0d3d73, 1);
    this.graphics2.fillRect(0, height - 80, width, 20);
    
    if (this.graphics2.body) {
      (this.graphics2.body as Phaser.Physics.Arcade.Body)
      .setOffset(0,height-80)
      .setSize(width, 20, false)
      .setBounce(1,1).setMass(200)
      .setImmovable(true);
    }


    // this.physics.collide(this.car, this.graphics1)
    this.physics.world.addCollider(this.car, [this.graphics2,this.graphics1,this.carEnemy], () => {

    });
    this.physics.world.addCollider(this.carEnemy, [this.graphics2,this.graphics1,this.car], () => {

    });

    const c3Config: CloudGeneratorConfig = {
      texture: "cloud",
      x: -400,
      y: 200,
      delayed: 3700,
      randomnes: 2,
      direction: 0,
      startWith: 5,
      depth: 10,
    }
    const c3 = new CloudGenerator(this, c3Config)
    c3.start()
  }

  update(this: Scene4) {
    if (this.powerBarFull) this.powerBarFull.setCrop(0, 0, 340 * this.velocity / this.maxVelocity, 140)
    if (this.road) this.road.setTilePosition(this.road.tilePositionX + (this.velocity / 2), 0)
    if(this.background1) this.background1.setTilePosition(this.background1.tilePositionX + (this.velocity / 750), 0)
    if(this.background2) this.background2.setTilePosition(this.background2.tilePositionX + (this.velocity / 300), 0)
    const speed = 110;
    const angle = 0.05;
    if (this.cursors) {
      const { left, right, up, down, space } = this.cursors;
      if (left.isDown) {
        this.car?.setVelocityY(speed * -1)
        this.car?.setRotation(-angle);
      } else if (right.isDown) {
        this.car?.setVelocityY(speed)
        this.car?.setRotation(angle);
      } else {
        this.car?.setVelocityY(0)
        this.car?.setRotation(0);
      }
      if (up.isDown) {
        this.car?.setVelocityX(speed)
      } else if (down.isDown) {
        this.car?.setVelocityX(speed * -1)
      } else this.car?.setVelocityX(0)
    }
  }
}

export default Scene4 