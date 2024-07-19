import Phaser from "phaser";
import Ticker, { TickerJob } from '../Ticker'
import DialogueManager from '../DialogueManager'
import CinematographyModular from "@/game/Cinematography-modular";

class cineIntro3 {
  ticker: Ticker;
  cine: CinematographyModular
  nextCine: boolean = false;

  // controllers
  nextText?: Phaser.GameObjects.Text;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(cine : CinematographyModular) {
    this.cine = cine
    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
    this.playCine()
  }



  playCine(this: cineIntro3) {
   // START ticker
   this.cine.time.addEvent({
    delay: this.ticker.ms,
    callback: this.ticker.runTicker,
    loop: true,
  });

    const middlePoint = {
      x: this.cine.cameras.main.displayWidth / 2,
      y: this.cine.cameras.main.displayHeight / 2,
    };

    this.nextText = this.cine.add.text(middlePoint.x*2, middlePoint.y*2, "aca va a ir el ruido de nave chocando o algo asi", {
      fontSize: 50,
      backgroundColor: "red"
    })

    this.ticker.addJob(new TickerJob(1, 10000, (job) => {
      this.nextCine = true
    }, false));
    
    this.nextText.setVisible(true).setOrigin(1).setScrollFactor(0)
  }


  update(this : cineIntro3, time: number, delta: number) {
    if (this.nextCine) this.cine.scene.restart({ keyname: "cine_intro_4" })
    
  }
}

export default cineIntro3;




