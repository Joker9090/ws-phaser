import Phaser from "phaser";

export default class MusicManager extends Phaser.Scene {
  music?:
    | Phaser.Sound.NoAudioSound
    | Phaser.Sound.HTML5AudioSound
    | Phaser.Sound.WebAudioSound;

  constructor() {
    super({ key: "MusicManager" });
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
    // this.playMusic("deepSpace1");
  }
}
