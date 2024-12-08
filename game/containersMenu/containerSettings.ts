import Phaser from "phaser";
import { ContainerMenuConfigType } from "../Types";

class containerSettings extends Phaser.GameObjects.Container {

    width: number = window.innerWidth;
    height: number = window.innerHeight;
    modal: Phaser.GameObjects.Image;
    quitGame: Phaser.GameObjects.Image;
    cross: Phaser.GameObjects.Image;
    check: Phaser.GameObjects.Image;
    album: Phaser.GameObjects.Image;
    brightness: Phaser.GameObjects.Image;
    brightnessFull: Phaser.GameObjects.Image;
    sound: Phaser.GameObjects.Image;
    soundFull: Phaser.GameObjects.Image;
    music: Phaser.GameObjects.Image;
    musicFull: Phaser.GameObjects.Image;
    musicSlider: Phaser.GameObjects.Image;
    soundSlider: Phaser.GameObjects.Image;
    brightnessSlider: Phaser.GameObjects.Image;

    // settingsButton: Phaser.GameObjects.Image;

    constructor(scene: Phaser.Scene, config: ContainerMenuConfigType) {
        super(scene, config.x, config.y)
        const offsetY = 100

        this.modal = scene.add.image(0, 0, "settingsModal").setScale(0.9);
        this.modal.setOrigin(0.5); 

        this.quitGame = scene.add.image(-40, 250,'settingsQuitGame');
        this.quitGame.setOrigin(0.5);

        this.cross = scene.add.image(-90, 350,'settingsCross').setScale(0.8);
        this.cross.setOrigin(0.5);

        this.check = scene.add.image(10, 350,'settingsCheck').setScale(0.8);
        this.check.setOrigin(0.5);

        this.album = scene.add.image(-this.modal.width / 2 + 100, 150, "settingsAlbum");
        this.album.setOrigin(0.5);

        this.brightness = scene.add.image(-this.modal.width / 2 + 120, 30, "settingsBrightness");
        this.brightness.setOrigin(0.5);
        this.brightnessFull = scene.add.image(this.modal.width/2 - 180, 30, "settingsBrightnessFull");
        this.brightnessFull.setOrigin(0.5);


        this.sound = scene.add.image(-this.modal.width / 2 + 120, -70, "settingsSound");
        this.sound.setOrigin(0.5);
        this.soundFull = scene.add.image(this.modal.width/2 - 180, -70, "settingsSoundFull");
        this.soundFull.setOrigin(0.5);

        this.music = scene.add.image(-this.modal.width / 2 + 120, -170, "settingsSound");
        this.music.setOrigin(0.5);
        this.musicFull = scene.add.image(this.modal.width/2 - 180, -170, "settingsSoundFull");
        this.musicFull.setOrigin(0.5);

        this.musicSlider = scene.add.image(-30, -170, "settingsSlider").setScale(0.8);
        this.musicSlider.setOrigin(0.5);

        this.soundSlider = scene.add.image(-30, -70, "settingsSlider").setScale(0.8);
        this.soundSlider.setOrigin(0.5);

        this.brightnessSlider = scene.add.image(-30, 30, "settingsSlider").setScale(0.8);
        this.brightnessSlider.setOrigin(0.5);


        const arr = [
          this.modal,
          this.quitGame,
          this.cross,
          this.check,
          this.album,
          this.brightness,
          this.brightnessFull,
          this.sound,
          this.soundFull,
          this.music,
          this.musicFull,
          this.musicSlider,
          this.soundSlider,
          this.brightnessSlider
        ]

        this.add(arr)
        scene.add.existing(this)
    }
}
export default containerSettings;