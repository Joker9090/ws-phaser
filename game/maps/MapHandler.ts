import Phaser from "phaser";
import gameState from "../assets/GameState";
import { MarkOptions } from "perf_hooks";
import player from "../assets/Player";


export type mapConfig = {
  // textures: string[]
  player: player
  sawsY: { top: number, bottom: number }
  diamondsY: { top: number, bottom: number }
  initialDelay: number
  scale?: {
    width: number,
    height: number,
  },
  flip?: boolean
}

class MapHandler {
  config: mapConfig
  timer: number = 0
  secondTimer: number = 0
  saws!: Phaser.GameObjects.Group
  sawCreationTime?: Phaser.Time.TimerEvent;
  spikes!: Phaser.GameObjects.Group
  spikesCreationTime!: Phaser.Time.TimerEvent
  diamonds!: Phaser.GameObjects.Group
  diamondCreationTime?: Phaser.Time.TimerEvent;
  groundGroup!: Phaser.GameObjects.Group;
  upPlatformCreationTime!: Phaser.Time.TimerEvent;
  downPlatformCreationTime!: Phaser.Time.TimerEvent;
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene, config: mapConfig) {
    this.config = config
    this.timer = 0;
    this.scene = scene;
    this.secondTimer = 0;
  }

  createSaw() {
    const y = Phaser.Math.Between(this.scene.cameras.main.height - 300, this.scene.cameras.main.height -1300)
    const saw = this.saws.create(this.scene.cameras.main.width + 100, y, "saw").setGravityY(0).setScale(0.7)
    saw.setVelocityX(-300)
    saw.setDepth(6)
    saw.body.setSize(saw.displayWidth - 35, saw.displayHeight - 35)
    // saw.setSize(saw.displayWidth - 10, saw.displayHeigh - 10)

    this.scene.tweens.add({
      targets: saw,
      angle: 3600,
      yoyo: true,
      repeat: -1
    })
  }

  createSpikes() {
    const y = 10
    const spike = this.spikes.create(this.scene.cameras.main.width + 100, y, "spikes").setGravityY(0).setScale(0.7)
    spike.setVelocityX(-300)
    spike.setDepth(6)
    spike.body.setSize(spike.displayWidth - 35, spike.displayHeight - 35)
    spike.setFlipX(true)
    // saw.setSize(saw.displayWidth - 10, saw.displayHeigh - 10)
  }

  createDiamond() {
    const { top, bottom } = this.config.diamondsY
    const y = Phaser.Math.Between(top, bottom)
    const diamond = this.diamonds.create(this.scene.cameras.main.width + 100, y, "diamond").setGravityY(0).setScale(0.7)
    diamond.setVelocityX(-300)
    diamond.setDepth(6)
    diamond.body.setSize(diamond.displayWidth + 35, diamond.displayHeight + 30)
  }

  createUpPlatform() {
    const offset = this.scene.cameras.main.height - 100
    const y = this.scene.cameras.main.height - offset
    const upPlatform = this.groundGroup.create(this.scene.cameras.main.width + 90, y, "plataforma3").setGravityY(0).setScale(0.7)
    upPlatform.setVelocityX(-300)
    upPlatform.setDepth(6)
    upPlatform.body.setSize(upPlatform.displayWidth - 35, upPlatform.displayHeight - 35)

  }

  createDownPlatform() {
    const y = this.scene.cameras.main.height - 70
    const downPlatform = this.groundGroup.create(this.scene.cameras.main.width + 90, y, "plataforma3").setGravityY(0).setScale(0.7)
    downPlatform.setVelocityX(-300)
    downPlatform.setDepth(6)
    downPlatform.body.setSize(downPlatform.displayWidth - 35, downPlatform.displayHeight - 35)

  }

  createSawMachine() {
    this.createSaw()
    const t = this.config.initialDelay - Phaser.Math.Between(100, 400)
    console.log("SAW t", t)
    this.scene.time.delayedCall(t, this.createSawMachine, undefined, this)
  }
  createDiamondMachine() {
    this.createDiamond()
    const t = this.config.initialDelay + Phaser.Math.Between(100, 700)

    this.scene.time.delayedCall(t, this.createDiamondMachine, undefined, this)
  }
  createSpikeMachine() {
    this.createSpikes
    const t = 10
    this.scene.time.delayedCall(t, this.createSpikeMachine, undefined, this)
  }

  createUpPlatformMachine() {
    this.createUpPlatform()
    const t = this.config.initialDelay + Phaser.Math.Between(100, 700)
    this.scene.time.delayedCall(t, this.createDiamondMachine, undefined, this)
  }
  createDownPlatformMachine() {
    this.createDownPlatform()
    const t = this.config.initialDelay + Phaser.Math.Between(100, 700)

    this.scene.time.delayedCall(t, this.createDiamondMachine, undefined, this)
  }

  createMap() {
    this.scene.add.image(1000, 400, "background").setScale(6).setScrollFactor(0).setDepth(-1)
    // saws
    this.saws = this.scene.physics.add.group();
    this.scene.time.delayedCall(this.config.initialDelay, this.createSawMachine, undefined, this)
    this.scene.time.delayedCall(this.config.initialDelay, this.createUpPlatformMachine, undefined, this)
    this.scene.time.delayedCall(this.config.initialDelay, this.createDownPlatformMachine, undefined, this)



    /*
    this.sawCreationTime = this.scene.time.addEvent({
      callback: this.createSaw,
      delay: this.config.initialDelay + Phaser.Math.Between(400, 700),
      callbackScope: this,
      loop: true
    })
    */

    // spikes
    this.spikes = this.scene.physics.add.group();
    this.scene.time.delayedCall(this.config.initialDelay, this.createSpikeMachine, undefined, this)
    // dimonds

    this.diamonds = this.scene.physics.add.group()
    this.scene.time.delayedCall(this.config.initialDelay, this.createDiamondMachine, undefined, this)



    this.groundGroup = this.scene.physics.add.group()
    this.upPlatformCreationTime = this.scene.time.addEvent({
      callback: this.createUpPlatform,
      delay: this.config.initialDelay + Phaser.Math.Between(400, 700),
      callbackScope: this,
      loop: true
    })
    this.downPlatformCreationTime = this.scene.time.addEvent({
      callback: this.createDownPlatform,
      delay: this.config.initialDelay + Phaser.Math.Between(400, 700),
      callbackScope: this,
      loop: true
    })
  }

}

export default MapHandler

