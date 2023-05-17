
import Phaser from "phaser";
import Player from "./assets/Player";
import Map0 from "./maps/Map0";
import Confetti from "./assets/Confetti";
// Scene in class
class Scene1 extends Phaser.Scene {
  monchi?: Player
  map?: Map0
  confetti?: Confetti
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys 
  cueva?: Phaser.GameObjects.Sprite
  preload(this: Scene1) {
    this.load.spritesheet("character", "/game/pinkMonster.png", { frameWidth: 32, frameHeight: 32 });
    this.load.image("plataformaA", "/game/plataformaVioleta.png");
    // this.load.image("this.player.setVelocityY(-330);plataformaB", "/game/base2.png");
    this.load.image("plataformaB", "/game/base2.png");
    this.load.image("background", '/game/background.png');
    this.load.image("nube", '/game/nube.png');
    this.load.image("nubes1", '/game/sky2.png');
    this.load.image("nubes2", '/game/backgroundClouds1.png');
    this.load.image("cueva", '/game/cuevaVioleta.png');
    this.load.image("cuevaArriba", '/game/cuevaArriba.png');
    this.load.spritesheet("firework", "/game/firework.png", { frameWidth: 256, frameHeight: 256 });
  }
  
  destroyConfetti() {

    if(this.confetti) {
      this.confetti.destroy();
      this.confetti = undefined;
    }
  }
  create(this: Scene1) {
    this.destroyConfetti();
    this.map = new Map0(this);
    //Posicion en la que arranca monchi
    this.monchi = new Player(this, 0, 0, "character", 14).setDepth(15);  

    const lose = () => {
      this.scene.restart()
    }

    const [floor, cueva] = this.map.createMap()
    this.cueva = cueva as Phaser.GameObjects.Sprite;
    this.physics.add.collider(this.monchi, floor);

    // viñeta
    this.cameras.main.startFollow(this.monchi).postFX.addVignette(0.5, 0.5, 0.8)

    this.cursors = this.input.keyboard?.createCursorKeys()


    this.physics.world.on('worldbounds', (body: Phaser.Physics.Arcade.Sprite,top: boolean,down: boolean,left: boolean,right: boolean) => {
      if(down) lose()
    },this);
  }

  update(this: Scene1) {
    if (this.monchi) {
      this.monchi.checkMove(this.cursors)
      if(this.cueva && Phaser.Geom.Rectangle.Overlaps(this.monchi.getBounds(), this.cueva.getBounds()) && !this.confetti) {
        // Si llega a la cueva, reinicia
        this.confetti = new Confetti(this, this.monchi.x, this.monchi.y, "firework")
        this.confetti.playConfetti(() => this.destroyConfetti())
        console.log("flor, esta entrando aca AAAA");
        //this.confetti.destroy()
        //this.scene.restart()
        //cueva.disableBody(true, true);

      } 

      if(this.confetti) {
        this.confetti.setPosition(this.monchi.x, this.monchi.y)
      }
    }
  }

}

export default Scene1 