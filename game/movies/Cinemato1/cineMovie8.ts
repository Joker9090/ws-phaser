import Phaser from "phaser";
import Ticker, { TickerJob } from "../Ticker";
import DialogueManager from "../DialogueManager";
import CinematographyModular from "@/game/movies/Cinematography-modular";
import BetweenScenes, { BetweenScenesStatus } from "@/game/BetweenScenes";

class cineMovie8 {
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
        
    }

    stopDialogue(){
       this.dialogue?.stop();
        this.dialogue?.destroyContainer();
      this.dialogue = undefined;
    }

    playCine(this: cineMovie8) {
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
            1000,
            true,
            (job: TickerJob) => {
              // spaceshipCrashSoundEffect.stop()
              this.nextCine = true;
            }
          )
        );
      }
      
    update(this: cineMovie8, time: number, delta: number) {
        if (this.dialogue) this.dialogue.update();
        if (this.nextCine) this.cine.scene.restart({ keyname: "cine_movie_9" });

    }
}

export default cineMovie8;
