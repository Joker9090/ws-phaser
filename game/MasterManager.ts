import Phaser from "phaser";
import MultiScene from "./MultiScene";
import Ticker from "./movies/Ticker";
import Game from "./Game";
import CODES from "../public/game/codigos.json"
import CinematographyModular from "./movies/Cinematography-modular";
import UI from "./assets/UI";


export type enterCodeType = {
  type: 'planeta',
  codigo: string,
  imagenes: string[],
  mapa: number
} | {
  type: 'postal',
  codigo: string,
  imagenes: string[],
  postalKey: string
}

export default class MasterManager extends Phaser.Scene {
  music?:
    | Phaser.Sound.NoAudioSound
    | Phaser.Sound.HTML5AudioSound
    | Phaser.Sound.WebAudioSound;
  sounds?:
    | Phaser.Sound.NoAudioSound
    | Phaser.Sound.HTML5AudioSound
    | Phaser.Sound.WebAudioSound;
  menuAnim?: boolean;
  planetShow: number = 0;
  multiScene?: MultiScene;
  ticker: Ticker;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  GameScene?: Game;
  brightnessScreen?: Phaser.GameObjects.Rectangle;
  volumeMusic: number = this.music?.volume || 0.2;
  volumeSound: number = this.sounds?.volume || 0.5;
  brightness: number = 0.5;
  MAX_VOLUME: number = 0.6;
  MAX_DARKNESS: number = 0.3;
  imagenesDesbloqueadas: string[] = ["planeta1_figu1"]
  codigos: { type: string, codigo: string, postalKey: string, mapa: number, imagenes: string[] }[] = []
  constructor() {
    super({ key: "MasterManager" });
    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
    console.log("JOTA MUSIC", this.volumeMusic, "JOTA SOUND", this.volumeSound, "JOTA SOUND 2", this.sound)
  }

  preload() {

  }

  stopMusic() {
    if (this.music) {
      this.music.stop();
      console.log(this.music, "jp music destroy")
      if (this.music) this.music.destroy();
      console.log(this.music, "jp music destroy2")
    }
  }

  stopSounds() {
    if (this.sounds) {
      this.sounds.stop();
      this.sounds.destroy;
    }
  }


  changeVolume(volume: number, type: "music" | "sound") {

    switch (type) {
      case "music":
        this.volumeMusic = volume;
        if (this.music) {
          this.music.setVolume(volume * this.MAX_VOLUME < 0.1 ? 0 : volume * this.MAX_VOLUME);
        }
        break;
      case "sound":
        this.volumeSound = volume;
        if (this.sounds) {
          console.log(this.sounds.volume, "joaco2", volume * this.MAX_VOLUME < 0.1 ? 0 : volume * this.MAX_VOLUME, volume, this.MAX_VOLUME)
          this.sounds.setVolume(volume * this.MAX_VOLUME < 0.1 ? 0 : volume * this.MAX_VOLUME);
          console.log(this.sounds, "joaco1")
        }
        break;
    }
  }

  playSound(name: string, loop: boolean = false, baseVolume?: number, duration?: number) {
    this.sounds = this.sound.add(name, {
      volume: baseVolume ? this.volumeSound * baseVolume : this.volumeSound,
      loop: loop,
    });
    
    this.sounds.play();
    if (duration) {
      this.time.delayedCall(duration, () => {
        if (!this.sounds?.isPlaying || this.sounds?.volume === 0) return;
        this.tweens.add({
            targets: this.sounds,
            volume: 0,
            duration: 200,
            onUpdate: (tween, target) => {
              if (
          !target ||
          typeof target.volume !== 'number' ||
          target.manager == null
        ) {
          tween.stop();
        }
            },
            onComplete: () => {
              this.sounds?.stop();
              // this.sounds?.destroy();
            }
          });
        });
    }
    console.log(this.volumeSound, "JOTA SOUNDS FROM FUNCTION")
  }

  playMusic(name: string, loop: boolean = false) {

    console.log(this.volumeMusic, "from master")
    if (this.music) {
      this.music.stop();
    }
    this.music = this.sound.add(name, {
      volume: this.volumeMusic,
      loop: loop
    });
    this.music.play();
  }

  changeBrightness(value: number) {
    console.log(this.cameras.main)
    this.brightness = value
    // this.cameras.main.setAlpha(1.3 - value)
    this.brightnessScreen?.setAlpha(0.3 * value);
  }
  pauseGame() {
    if (this.scene) {
      const gameScene = this.scene.get("Game");
      if (gameScene) {
        this.time.delayedCall(300, () => {
          gameScene.physics?.world?.pause();
          // gameScene.tweens.pauseAll();
          gameScene.input.enabled = true;
          gameScene.time.paused = true
        }, [], this)
      }
    }
  }
  resumeFromBlur() {
    if (this.scene && this.scene.get) {
      const gameScene = this.scene?.get("Game");

    if (gameScene ) {
      const settingsVisible = (gameScene as Game).UIClass?.settingsVisible
      if (!settingsVisible) {
        this.time.delayedCall(600, () => {
          gameScene.physics?.world?.resume();
          // gameScene.tweens.resumeAll();
          gameScene.input.enabled = true;
          gameScene.time.paused = false;
          window.removeEventListener("blur", this.resumeFromBlur);
        }, [], this)
      }

    }
  }
  }
  resumeGame() {
    if (this.scene && this.scene.get) {
      const gameScene = this.scene?.get("Game");
    if (gameScene) {
      // (gameScene as Game).UIClass?.settingsModal?.animationOfModal(false); // Async runner condition! borro
      (gameScene as Game).UIClass?.container.each((child: any) => {
        if (child instanceof UI) {
          {
            child.setVisible(true)
          }
        }
      });
      (gameScene as Game).UIClass?.collText?.setVisible(true)
     
      this.time.delayedCall(500, () => {
        gameScene.physics?.world?.resume();
        // gameScene.tweens.resumeAll();
        gameScene.input.enabled = true;
        gameScene.time.paused = false
      
      }, [], this)
    }
    }
  }

  pauseCinemato(cine: CinematographyModular, timeEvent: Phaser.Time.TimerEvent) {
    // timeEvent.paused = true;
    // cine.scene.pause(); 
  }

  enterCode(code: string, error: Phaser.GameObjects.Text) {
    console.log("ARIEL ENTRO ACA 00000", code)
    const codeFound: enterCodeType | undefined = (CODES.CODES as enterCodeType[]).find(c => c.codigo === code)
    if (!codeFound) {
      error.setVisible(true)
    } else {
      if (codeFound.type === "planeta") {
        this.imagenesDesbloqueadas = codeFound.imagenes
        const multiScene1 = new MultiScene("Game", { level: codeFound.mapa, lifes: 3, loadKey: ["GamePlay1", "GamePlay2", "GamePlay3"] });
        this.scene.add("MultiScene", multiScene1, true);
        this.scene.start("MultiScene").bringToTop("MultiScene");
        this.scene.stop("MenuScene");
      } else if (codeFound.type === "postal") {
        this.imagenesDesbloqueadas = codeFound.imagenes
        const multiScene2 = new MultiScene("CinematographyMod", { keyname: codeFound.postalKey, loadKey: ["Postales"], code: codeFound.codigo });
        this.scene.add("MultiScene", multiScene2, true);
        this.scene.start("MultiScene").bringToTop("MultiScene");
        this.scene.stop("MenuScene");
      }
    }

  }

  create() {
    this.brightnessScreen = this.add.rectangle(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth * 4, window.innerHeight * 4, 0x000000, 1).setAlpha(0);
  }

  update() {
    this.scene.bringToTop("MasterManager");
  }

}
