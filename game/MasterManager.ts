import Phaser from "phaser";
import MultiScene from "./MultiScene";
import Ticker from "./movies/Ticker";
import Game from "./Game";
import CODES from "../public/game/codigos.json"


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
  volumeMusic: number = 0.2;
  volumeSound: number = 0.2;
  brightness: number = 0.5;
  MAX_VOLUME: number = 0.6;
  MAX_DARKNESS: number = 0.3;
  imagenesAlbum: string[] = []
  codigos: { type: string, codigo: string, postalKey: string, mapa: number, imagenes: string[] }[] = []
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
        this.volumeMusic = volume;
        if (this.music) {
          this.music.setVolume(volume * this.MAX_VOLUME < 0.1 ? 0 : volume * this.MAX_VOLUME);
        }
        break;
      case "sound":
        this.volumeSound = volume;
        if (this.sounds) {
          this.sounds.setVolume(volume * this.MAX_VOLUME < 0.1 ? 0 : volume * this.MAX_VOLUME);
          console.log(this.sounds.volume)
        }
        break;
    }
  }

  playSound(name: string, loop: boolean = false) {
    this.sounds = this.sound.add(name, {
      volume: this.sounds?.volume,
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
    console.log(this.cameras.main)
    this.brightness = value
    // this.cameras.main.setAlpha(1.3 - value)
    this.brightnessScreen?.setAlpha(0.3 * value);
  }
  pauseGame() {
    const gameScene = this.scene.get("Game");
    if (gameScene) {
      gameScene.physics.world.pause();
      gameScene.tweens.pauseAll();
      gameScene.input.enabled = true;
      gameScene.time.paused = true
    }
  }
  resumeGame() {
    const gameScene = this.scene.get("Game");
    if (gameScene) {
      gameScene.physics.world.resume();
      gameScene.tweens.resumeAll();
      gameScene.input.enabled = true;
      gameScene.time.paused = false
    }
  }



  enterCode(code: string, error: Phaser.GameObjects.Text) {
    console.log("ARIEL ENTRO ACA 00000", code)
    const codeFound: enterCodeType | undefined = (CODES.CODES as enterCodeType[]).find(c => c.codigo === code)
    if (!codeFound) {
      error.setVisible(true)
    } else {      
      if (codeFound.type === "planeta") {
        this.imagenesAlbum = codeFound.imagenes
        const multiScene1 = new MultiScene("Game", { level: codeFound.mapa, lifes: 3, loadKey: ["GamePlay1", "GamePlay2", "GamePlay3"] });
        this.scene.add("MultiScene", multiScene1, true);
        this.scene.start("MultiScene").bringToTop("MultiScene");
        this.scene.stop("MenuScene");
      } else if (codeFound.type === "postal") {
        this.imagenesAlbum = codeFound.imagenes
        const multiScene2 = new MultiScene("CinematographyMod", { keyname: codeFound.postalKey, loadKey: ["Postales"], code: code });
        this.scene.add("MultiScene", multiScene2, true);
        this.scene.start("MultiScene").bringToTop("MultiScene");
        this.scene.stop("MenuScene");
      }
    }
      
  }

  create() {
    this.brightnessScreen = this.add.rectangle(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth + 200, window.innerHeight + 200, 0x000000, 1).setAlpha(0);
    // this.codigos = this.cache.json.get('codigos');
    // this.registry.set('codigos', this.codigos)
  }

  update() {
    this.scene.bringToTop("MasterManager");
  }

}
