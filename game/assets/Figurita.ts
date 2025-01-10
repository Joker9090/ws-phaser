class Figuritas extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x: number, y: number, postal: string) {
      super(scene, x, y);
      const image1 = scene.add.image(0, 0, "modalFiguirita").setScale(0.8).setAlpha(0.8);
      this.add(image1);

      const image2 = scene.add.image(0, 0, postal).setScale(0.1).setAlpha(0.7);
      let clicked = false
      this.add(image2);
      image1.setInteractive()
      image1.setDepth(99)
      image1.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
        scene.tweens.add({
          targets: image1,
          scale: 0.9,
          alpha: 1,
          duration: 300,
          ease: 'Power2'
        });
        scene.tweens.add({
          targets: image2,
          scale: 0.18,
          alpha: 1,
          duration: 300,
          ease: 'Power2'
        });
      });

      image1.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
        if(!clicked){
          scene.tweens.add({
            targets: image1,
            scale: 0.8,
            alpha: 0.7,
            duration: 300,
            ease: 'Power2'
          });
          scene.tweens.add({
            targets: image2,
            scale: 0.1,
            alpha: 0.7,
            duration: 300,
            ease: 'Power2'
          });
        }
      });

      scene.add.existing(this);
  }
}

export default Figuritas