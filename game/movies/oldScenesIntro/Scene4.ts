import Phaser from "phaser";
import Ticker, { TickerJob } from '../Ticker'
import DialogueManager from '../DialogueManager'

class IntroMovie4 extends Phaser.Scene {
 
  // controllers
  nextText?: Phaser.GameObjects.Text;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({ key: "IntroScene4" });

  }

  preload(this: Phaser.Scene) {

  }


  create(this: IntroMovie4, { level }: any) {
    console.log("SCENE 4")
    this.cursors = this.input.keyboard?.createCursorKeys();

    const middlePoint = {
      x: this.cameras.main.displayWidth / 2,
      y: this.cameras.main.displayHeight / 2,
    };

    this.nextText = this.add.text(middlePoint.x*2, middlePoint.y*2, "SPACE TO CONTINUE", {
      fontSize: 50,
      backgroundColor: "red"
    })
    
    this.nextText.setVisible(false).setOrigin(1).setScrollFactor(0)
  }


  update(this: IntroMovie4, time: number, delta: number) {
    if (time > 10000) {
      this.nextText?.setVisible(true)
      if (this.cursors) {
        if (this.cursors.space.isDown) {
          const IntroScene5 = this.game.scene.getScene("IntroScene5");
          this.scene.launch(IntroScene5).bringToTop("IntroScene5")
          this.scene.stop()
        }
      }
    }
  }
}

export default IntroMovie4;




