import Phaser from "phaser";
import MultiScene from "./MultiScene";

export default class MasterManager extends Phaser.Scene {
  music?:
    | Phaser.Sound.NoAudioSound
    | Phaser.Sound.HTML5AudioSound
    | Phaser.Sound.WebAudioSound;
    menuAnim?: boolean;
    planetShow: number = 0;
    multiScene?: MultiScene;

  constructor() {
    super({ key: "MasterManager" });
  }

  preload(){

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
    this.music = this.sound.add(name).setVolume(0.5);
    this.music.play();
  }

  create(/* {song} */) {
    this.menuAnim = false;
    this.multiScene = this.game.scene.getScene("MultiScene") as MultiScene
  }

  update() {
    if (this.multiScene?.scenekey === "menu") {
      this.menuAnim = true;
    }
  }
}
