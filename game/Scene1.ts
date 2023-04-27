
import Phaser from "phaser";
// Scene in class
class Scene1 extends Phaser.Scene {
  preload(this: Phaser.Scene) {
    this.load.spritesheet("character", "/game/character.png", { frameWidth: 220, frameHeight: 162 });
    this.load.image("plataformaA", "/game/platform1.png");
    this.load.image("this.player.setVelocityY(-330);plataformaB", "/game/platform1B.png");
  }


  create(this: Phaser.Scene) {

    const monchi = this.physics.add.sprite(100, 100, "character", 2).setScale(0.5);
    const monchiForwardsFrames = this.anims.generateFrameNumbers("character", { frames: [0, 1, 2, 3, 2, 1, 0] })
    const monchiForwardsConfig = {
      key: "monchiForwards",
      frames: monchiForwardsFrames,
      frameRate: 10,
      repeat: 0,
    }
    this.anims.create(monchiForwardsConfig)


    const plataforma1 = this.physics.add.sprite(100, 270, "plataformaA").setScale(0.7);
    plataforma1.body.allowGravity = false;
    plataforma1.body.setImmovable(true);

    this.physics.add.collider(monchi, plataforma1);


    const plataforma2 = this.physics.add.sprite(500, 570, "plataformaA").setScale(0.7);
    plataforma2.body.allowGravity = false;
    plataforma2.body.setImmovable(true);


    const stop = () => {
      monchi.setVelocityX(0);
    }

    this.physics.add.collider(monchi, plataforma2, stop);

    const tween = this.tweens.add({
      targets: plataforma2,
      paused: false,
      yoyo: true,
      repeat: -1,
      y: "-=200"
    })

    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      monchi.play("monchiForwards");
      monchi.setVelocityX(150);
      monchi.setVelocityY(-330);
    })



  }

  update(this: Phaser.Scene) {

  }

}

export default Scene1 