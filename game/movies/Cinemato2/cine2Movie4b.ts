import Phaser from "phaser";
import Ticker, { TickerJob } from "../Ticker";
import DialogueManager from "../DialogueManager";
import CinematographyModular from "@/game/movies/Cinematography-modular";

class cine2Movie4b {
    ticker: Ticker;
    cine: CinematographyModular;
    nextCine: boolean = false;
    dialogue?: DialogueManager;
    //assets

    // controllers
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(cine: CinematographyModular) {
        this.cine = cine;
        const tickerMS = 100;
        this.ticker = new Ticker(tickerMS);
        this.playCine();
        // music & music
        this.cine.time.delayedCall(1000, () => {
          this.cine.sound.add("landing").setVolume(0.25).play();          
          this.cine.sound.add("music").setVolume(0.25).play();          
        })
        
    }

    stopDialogue(){
       this.dialogue?.stop();
        this.dialogue?.destroyContainer();
      this.dialogue = undefined;
    }

    playCine(this: cine2Movie4b) {
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
            },
            false,
            4000,
            true,
            (job: TickerJob) => {
              // spaceshipCrashSoundEffect.stop()
              this.nextCine = true;
            }
          )
        );
      }
      
    update(this: cine2Movie4b, time: number, delta: number) {
        if (this.dialogue) this.dialogue.update();
        if (this.nextCine) this.cine.scene.restart({ keyname: "cine_2_movie_5" });

    }
}

export default cine2Movie4b;
