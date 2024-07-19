import Phaser from "phaser";
import Ticker, {TickerJob} from './Ticker'
class Cinematography extends Phaser.Scene {
  ticker: Ticker;
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

  
  create(this: Cinematography, { level }: any) {
    console.log("BARTO, Cinematography");
    
    // START ticker
    this.time.addEvent({
      delay: this.ticker.ms,
      callback: this.ticker.runTicker,
      // callbackScope: this,
      loop: true,
    });


    const middlePoint = {
      x: this.cameras.main.displayWidth / 2,
      y: this.cameras.main.displayHeight / 2,
    };
    const image1 = this.add.image(middlePoint.x, middlePoint.y, 'cine_background').setOrigin(0.5, 0.5);

    const image2 = this.add.image(middlePoint.x, middlePoint.y * 3, 'cine_capsula').setOrigin(0.5, 0.5);
   
    image2.scale = 3.5;
    this.scaleImage(image1);
    image1.scale += 2.5;


    // ADD JOBS
    this.ticker.addJob(new TickerJob(1, 100, (job) => {
      this.tweens.add({
        targets: image1,
        x: middlePoint.x + 100,
        y: middlePoint.x + 200,
        duration: 25000,
        ease: 'Linear'
      });
    }, false));

    this.ticker.addJob(new TickerJob(2, 500, (job) => {
      this.tweens.add({
        targets: image2,
        y: -200,
        angle: 300,
        duration: 25000,
        ease: 'Linear'
      });
    }, false));

    this.ticker.addJob(new TickerJob(3, 9000, (job) => {
      this.tweens.add({
        targets: [image1, image2],
        alpha: 0,
        duration: 1000,
        ease: 'Linear'
      });
    }, false));

  }


  update(this: Cinematography, delta: number) {
 
  }
}

export default Cinematography;




