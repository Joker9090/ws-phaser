import Phaser from "phaser";
import Ticker, { TickerJob } from '../Ticker'
import DialogueManager from '../DialogueManager'
import CinematographyModular from "@/game/movies/Cinematography-modular";


class cineIntro3 {
  ticker: Ticker;
  cine: CinematographyModular
  nextCine: boolean = false;

  // controllers
  nextText?: Phaser.GameObjects.Text;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;


  constructor(cine: CinematographyModular) {
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

    // const spaceshipCrashSoundEffect = this.cine.sound.add("spaceshipCrash")
    // spaceshipCrashSoundEffect.play()
    
    this.ticker.addJob(
      new TickerJob(
        1,
        10,
        () => { 
          const audio = this.cine.sound.add("introSoundEffect8").setVolume(0.55)
          audio.play()
          setTimeout(() => {
            const audio2 = this.cine.sound.add("introSoundEffect9").setVolume(0.55)
            audio2.play()
          },3000)
        },
        false,
        6000,
        true,
        (job: TickerJob) => {
          // spaceshipCrashSoundEffect.stop()
          this.nextCine = true;
        }
      )
    );
  }


  update(this: cineIntro3, time: number, delta: number) {
    if (this.nextCine) this.cine.scene.restart({ keyname: "cine_intro_4" })

  }
}

export default cineIntro3;




