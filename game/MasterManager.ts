import Phaser from "phaser";
import MultiScene from "./MultiScene";
import Ticker from "./movies/Ticker";
import Game from "./Game";

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
  volumeMusic: number = 0.2;
  volumeSound: number = 0.2;
  brightness: number = 0;
  MAX_VOLUME: number = 0.4;
  MAX_DARKNESS: number = 0.3;
  constructor() {
    super({ key: "MasterManager" });
    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);

  }

  preload() {

  }

  stopMusic() {
    if (this.music) {
      this.music.stop();
      this.music.destroy;
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
        this.volumeMusic = volume > this.MAX_VOLUME ? this.MAX_VOLUME : volume;
        if (this.music) {
          this.music.setVolume(volume);
        }
        break;
      case "sound":
        this.volumeSound = volume > this.MAX_VOLUME ? this.MAX_VOLUME : volume;
        if (this.sound) {
          this.sound.setVolume(volume);
        }
        break;
    }
  }

  playSound(name: string, loop: boolean = false) {
    this.sounds = this.sound.add(name, {
      volume: this.volumeSound,
      loop: loop,
    });
    this.sounds.play();
  }

  playMusic(name: string, loop: boolean = false) {
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
    this.brightness = value
    this.brightnessScreen?.setAlpha( 0.3 * value);
  }

  create() {
    this.brightnessScreen = this.add.rectangle(window.innerWidth/2, window.innerHeight/2, window.innerWidth + 200, window.innerHeight + 200, 0x000000, 1).setAlpha(0);
  }

  update() {
    this.scene.bringToTop("MasterManager");
  }
}
