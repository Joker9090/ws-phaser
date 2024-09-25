import Phaser from "phaser";
import MultiScene from "./MultiScene";
import Ticker from "./movies/Ticker";
import Game from "./Game";

export default class MasterManager extends Phaser.Scene {
  music?:
    | Phaser.Sound.NoAudioSound
    | Phaser.Sound.HTML5AudioSound
    | Phaser.Sound.WebAudioSound;
  menuAnim?: boolean;
  planetShow: number = 0;
  multiScene?: MultiScene;
  ticker: Ticker;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  GameScene?: Game;
  constructor() {
    super({ key: "MasterManager" });
    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);

  }

  preload() {
  }

  manageGameSceneTutorial() {
    if (this.cursors?.space.isDown && this.GameScene?.scene.isPaused()){
      this.GameScene.scene.resume()
      //@ts-ignore
      if (this.GameScene.map.tutorialStep === 1) this.GameScene.map.tutorialStep = 2
       //@ts-ignore
       if (this.GameScene.map.tutorialStep === 3) this.GameScene.map.tutorialStep = 4
    }
  }

  stopMusic() {
    if (this.music) {
      this.music.stop();
      this.music.destroy;
    }
  }

  playMusic(name: string) {
    if (this.music) {
      this.music.stop();
    }
    this.music = this.sound.add(name).setVolume(0.3);
    this.music.play();
  }

  playSoundsIntro() {
    const introSoundEffect1Music = this.sound.add("introSoundEffect1").setVolume(0.25)
    const introSoundEffect2Music = this.sound.add("introSoundEffect2").setVolume(0.25)
    const introSoundEffect3Music = this.sound.add("introSoundEffect3").setVolume(0.25)
    const introSoundEffect4Music = this.sound.add("introSoundEffect4").setVolume(0.25)
    const introSoundEffect5Music = this.sound.add("introSoundEffect5").setVolume(0.25)
    const introSoundEffect6Music = this.sound.add("introSoundEffect6").setVolume(0.25)
    const introSoundEffect7Music = this.sound.add("introSoundEffect7").setVolume(0.25)
    const introSoundEffect8Music = this.sound.add("introSoundEffect8").setVolume(0.25)
    const introSoundEffect9Music = this.sound.add("introSoundEffect9").setVolume(0.25)
  }

  create(/* {song} */) {
    this.cursors = this.input.keyboard?.createCursorKeys();
    this.GameScene = this.game.scene.getScene("Game") as Game;
    this.menuAnim = false;
    this.multiScene = this.game.scene.getScene("MultiScene") as MultiScene
  }

  update() {
    if (this.multiScene?.scenekey === "menu") {
      this.menuAnim = true;
    }
    this.manageGameSceneTutorial()
  }
}
