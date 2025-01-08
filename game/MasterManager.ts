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
  MAX_VOLUME: number = 0.6;
  MAX_DARKNESS: number = 0.3;
  imagenesAlbum: string[] = []
  codigos: { codigo: string, mapa:number, imagenes:string[] }[] = []
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
        this.volumeMusic = volume ;
        if (this.music) {
          this.music.setVolume(volume * this.MAX_VOLUME);
        }
        break;
      case "sound":
        this.volumeSound = volume;
        if (this.sound) {
          this.sound.setVolume(volume*this.MAX_VOLUME);
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
  pauseGame(){
    const gameScene = this.scene.get("Game");
    if (gameScene) {
        gameScene.physics.world.pause(); 
        gameScene.tweens.pauseAll(); 
        gameScene.input.enabled = true; 
        gameScene.time.paused = true
    }
  }
  resumeGame(){
    const gameScene = this.scene.get("Game");
    if (gameScene) {
        gameScene.physics.world.resume(); 
        gameScene.tweens.resumeAll(); 
        gameScene.input.enabled = true; 
        gameScene.time.paused = false
    }
  }
 
  enterCode(code?:string,){
    let codeFound = false;
    this.codigos.forEach(c => {
      if(c.codigo  === code ){
        this.imagenesAlbum = c.imagenes
          const multiScene = new MultiScene("Game", { level: c.mapa, lifes: 3, loadKey: ["GamePlay1", "GamePlay2", "GamePlay3"] });
          const scene = this.scene.add("MultiScene", multiScene, true);
          this.scene.start("MultiScene").bringToTop("MultiScene");
          this.scene.stop("MenuScene");
          codeFound = true;
      }
      if(!codeFound){
        console.log("no perro")
      }
    }); 
  }

  create() {
    this.brightnessScreen = this.add.rectangle(window.innerWidth/2, window.innerHeight/2, window.innerWidth + 200, window.innerHeight + 200, 0x000000, 1).setAlpha(0);
    this.codigos = this.cache.json.get('codigos');
    this.registry.set('codigos', this.codigos)
  }

  update() {
    this.scene.bringToTop("MasterManager");
  }

}
