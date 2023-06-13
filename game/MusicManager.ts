import Phaser from 'phaser';
import Game from "./Game";
import GameOver from "./GameOver";
import Menu from "./Menu";
import Won from "./Won";

export default class MusicManager {
    scene: Game | GameOver | Menu | Won;
    music?: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;

    constructor(scene: Game | GameOver | Menu | Won) {
        this.scene = scene;
    };

    stopMusic() {
        if (this.music) {
            this.music.stop();
            this.music.destroy;
        };
    };

    playMusic(name: string) {
        if (this.music) {
            this.music.stop();
            this.music = this.scene.sound.add(name).setVolume(0.05);
            this.music.play();
        }
    }

    /*
    update() {
        if(this.scene.scene.key == "Game"){
            if(this.scene.levelIs == 0){
                this.stopMusic();
                this.playMusic('songTutorial');
            } else if (this.scene.levelIs == 1){
                this.stopMusic();
                this.playMusic('songLevel1');
            } else if (this.scene.levelIs == 2){
                this.stopMusic();
                this.playMusic('songLevel2');
            };
        } else if (this.scene.scene.key == "Menu") {
            this.stopMusic();
            this.playMusic('songMenu');
        } else if (this.scene.scene.key == "Won") {
            this.stopMusic();
            this.playMusic('songWib');
        } else if (this.scene.scene.key == "Lose") {
            this.stopMusic();
            this.playMusic('songLose');
        };
    };
    */
};

