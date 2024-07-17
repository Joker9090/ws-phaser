import Phaser from "phaser";
import Ticker, {TickerJob} from './movies/Ticker'
import cineIntro from "./movies/Intro/cineInto";

class CinematographyModular extends Phaser.Scene {
  ticker: Ticker;
  playingCine: cineIntro | any;
  constructor() {
    super({ key: "Cinematography" });

    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
  }

  preload(this: Phaser.Scene) {
   
  }

  scaleImage(image: Phaser.GameObjects.Image) {
    image.displayHeight = this.cameras.main.displayHeight
    image.displayWidth = this.cameras.main.displayWidth
    image.y = this.cameras.main.displayHeight / 2
    image.x = this.cameras.main.displayWidth / 2
  }

  
  create(this: CinematographyModular, { keyname }: any) {
    console.log("BARTO, Cinematography");
    switch (keyname) {
      case 'cine_intro':
        this.playingCine = new cineIntro();
        break;
      case 'cine_capsula':
        break;
    }
  }

  update(){
    if(this.playingCine.update) this.playingCine.update(this, this.ticker);
  }
}

export default CinematographyModular;




