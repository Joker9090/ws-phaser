
import Phaser from "phaser";
import Player from "./assets/Player";
import Map0 from "./maps/Map0";
import Fireworks from "./assets/Fireworks";
import Stars from "./assets/Stars";

// declare globarl {
//   interface Window { PhaserAssets: any }
// }

// Scene in class
class Scene1 extends Phaser.Scene {
  monchi?: Player
  map?: Map0
  fireworks?: Fireworks
  stars?: Stars
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys
  templo?: Phaser.GameObjects.Sprite
  wave1?: Phaser.GameObjects.TileSprite
  wave2?: Phaser.GameObjects.TileSprite
  wave3?: Phaser.GameObjects.TileSprite
  sea?: Phaser.GameObjects.TileSprite
  maxVelocity: number = 10;
  velocity: number = 1
  heartsFull?: Phaser.GameObjects.TileSprite;
  heartsEmpty?: Phaser.GameObjects.TileSprite;
  constructor() {
    super({ key: 'Scene1' })
  }

  preload(this: Scene1) {
    //this.load.spritesheet("character", "/game/spritesheetKitty2.png", { frameWidth: 150, frameHeight: 162 });
    // this.load.spritesheet("character", "/game/whiteMonster.png", { frameWidth: 100, frameHeight: 100 });
    // this.load.spritesheet("firework", "/game/firework.png", { frameWidth: 256, frameHeight: 256 });
    // this.load.image("this.player.setVelocityY(-330);plataformaB", "/game/base2.png");
    // this.load.image("plataformaA", "/game/plataformaVioleta.png");
    // this.load.image("plataformaB", "/game/base2.png");
    // this.load.image("background", '/game/sky1.png');
    // this.load.image("mountain1", "/game/mountain1.png");
    // this.load.image("mountain2", "/game/mountain2.png");
    // this.load.image("mountain3", "/game/mountain4.png");
    // this.load.image("sun", '/game/sun.png');
    // this.load.image("nube", '/game/nube.png');
    // this.load.image("templo", '/game/templo.png');
    // this.load.image("cuevaArriba", '/game/cuevaArriba.png');
    // this.load.image("wave1", '/game/wave1.png');
    // this.load.image("wave2", '/game/wave2.png');
    // this.load.image("wave3", '/game/wave3.png');
    // this.load.image("heartsFull", "/game/heartsFull.png");
    // this.load.image("heartsEmpty", "/game/heartsEmpty.png");
    // this.load.image("stars", "/game/stars.png");
    // this.load.image("sea", "/game/sea.png");
  }

  destroyFireworks() {
    if (this.fireworks) {
      this.fireworks.destroy();
      this.fireworks = undefined;
    }
  }

  create(this: Scene1) {
    const { centerX, centerY } = this.physics.world.bounds
    const { width, height } = this.game.canvas;
    console.log("flor", window.innerWidth, "x", window.innerHeight);

    const pointX = (window.innerWidth - window.innerWidth) + 10
    const pointY = (window.innerHeight - window.innerHeight) + 10

    // Corazones
    // this.heartsEmpty = this.add.tileSprite(pointX, pointY, 340, 140, "heartsEmpty").setOrigin(1, 0.5).setDepth(30)
    // this.heartsFull = this.add.tileSprite(pointX, pointY, 340, 140, "heartsFull").setOrigin(1, 0.5).setDepth(30)
    // this.heartsFull.setCrop(0,0,0,140).setDepth(30)

    // OLAS - WAVES
    this.wave1 = this.add.tileSprite(890, 900, 3500, 61, "wave1").setDepth(25)
    this.wave2 = this.add.tileSprite(890, 930, 3500, 61, "wave2").setDepth(26)
    this.wave3 = this.add.tileSprite(890, 958, 3500, 61, "wave3").setDepth(27)
    this.sea = this.add.tileSprite(890, 1230, 3500, 500, "sea").setDepth(27)

    this.destroyFireworks();
    this.map = new Map0(this);

    //Posicion en la que arranca monchi
    this.monchi = new Player(this, 100, 0, "character", 14).setDepth(20);

    // stars
    this.stars = new Stars(this, 600, 200, "stars")
    //this.stars.playStars()

    const lose = () => {
      this.scene.restart()
    }

    const [floor, templo] = this.map.createMap()

    this.templo = templo as Phaser.GameObjects.Sprite;

    // @ts-ignore
    this.physics.add.collider(this.monchi, floor);

    // viñeta
    this.cameras.main.startFollow(this.monchi).postFX.addVignette(0.5, 0.5, 0.8)

    this.cursors = this.input.keyboard?.createCursorKeys()

    this.physics.world.on('worldbounds', (body: Phaser.Physics.Arcade.Sprite, top: boolean, down: boolean, left: boolean, right: boolean) => {
      if (down) lose()
    }, this);
  }

  update(this: Scene1) {
    if (this.heartsFull) {
      this.heartsFull.setCrop(0, 0, 500, 200)
    }
    if (this.wave1) this.wave1.setTilePosition(this.wave1.tilePositionX + (this.velocity / 2), 0)
    if (this.wave2) this.wave2.setTilePosition(this.wave2.tilePositionX - (this.velocity / 4), this.wave2.tilePositionY)
    if (this.wave3) this.wave3.setTilePosition(this.wave3.tilePositionX + (this.velocity / 10), this.wave3.tilePositionY)

    if (this.monchi) {
      this.monchi.checkMove(this.cursors)
      if (this.templo && Phaser.Geom.Rectangle.Overlaps(this.monchi.getBounds(), this.templo.getBounds()) && !this.fireworks) {
        // Si llega a la cueva, reinicia
        this.fireworks = new Fireworks(this, this.monchi.x, this.monchi.y, "firework")
        this.fireworks.playFireworks(() => this.destroyFireworks())
        console.log("flor, esta entrando aca AAAA");
        //this.fireworks.destroy()
        //this.scene.restart()
        //cueva.disableBody(true, true);
      }

      if (this.fireworks) {
        this.fireworks.setPosition(this.monchi.x, this.monchi.y)
      }
    }
  }

}

export default Scene1 