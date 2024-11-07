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

  playMusic(name: string, volume: number = 0.4, loop: boolean = false) {
    if (this.music) {
      this.music.stop();
    }
    console.log(volume, loop, "vol and loop")
    this.music = this.sound.add(name,{
      volume: volume,
      loop: loop
    });
    this.music.play();
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
