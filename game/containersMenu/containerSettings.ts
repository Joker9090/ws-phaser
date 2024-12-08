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
    title: Phaser.GameObjects.Text;
    brightnessText: Phaser.GameObjects.Text;
    soundText: Phaser.GameObjects.Text;
    musicText: Phaser.GameObjects.Text;
    albumText: Phaser.GameObjects.Text;
    // settingsButton: Phaser.GameObjects.Image;

    constructor(scene: Phaser.Scene, config: ContainerMenuConfigType) {
        super(scene, config.x, config.y)
        const offsetY = 100

        this.modal = scene.add.image(0, 0, "settingsModal").setScale(0.9);
        this.modal.setOrigin(0.5);


        this.title = this.scene.add.text(-70, -420, 'Settings', {
            fontSize: 17,
            color: "#00feff",
            stroke: "#00feff",
            align: "center",
            fontFamily: "Arcade",
            wordWrap: {
                width: this.width * 0.9,
            },
        }).setFontSize('60px');


        this.quitGame = scene.add.image(-40, 250, 'settingsQuitGame');
        this.quitGame.setOrigin(0.5);

        this.cross = scene.add.image(-90, 350, 'settingsCross').setScale(0.8);
        this.cross.setOrigin(0.5);

        this.check = scene.add.image(10, 350, 'settingsCheck').setScale(0.8);
        this.check.setOrigin(0.5);

        this.album = scene.add.image(-this.modal.width / 2 + 120, 150, "settingsAlbum");
        this.album.setOrigin(0.5);
        this.albumText = scene.add.text(-this.modal.width / 2 + 150, 130, 'Album', {
            fontSize: 30,
            color: "#00feff",
            stroke: "#00feff",
            align: "center",
            fontFamily: "Arcade",
            wordWrap: {
                width: this.width * 0.9,
            },
        });

        this.brightness = scene.add.image(-this.modal.width / 2 + 120, 30, "settingsBrightness");
        this.brightness.setOrigin(0.5);
        this.brightnessFull = scene.add.image(this.modal.width / 2 - 180, 30, "settingsBrightnessFull");
        this.brightnessFull.setOrigin(0.5);


        this.sound = scene.add.image(-this.modal.width / 2 + 120, -70, "settingsSound");
        this.sound.setOrigin(0.5);
        this.soundFull = scene.add.image(this.modal.width / 2 - 180, -70, "settingsSoundFull");
        this.soundFull.setOrigin(0.5);


        this.musicText = scene.add.text(-this.modal.width / 2 + 100, -235, 'Music', {
            fontSize: 30,
            color: "#00feff",
            stroke: "#00feff",
            align: "center",
            fontFamily: "Arcade",
            wordWrap: {
                width: this.width * 0.9,
            },
        });
        this.music = scene.add.image(-this.modal.width / 2 + 120, -170, "settingsSound");
        this.music.setOrigin(0.5);
        this.musicFull = scene.add.image(this.modal.width / 2 - 180, -170, "settingsSoundFull");
        this.musicFull.setOrigin(0.5);

        this.soundText = scene.add.text(-this.modal.width / 2 + 100, -125, 'Sound', {
            fontSize: 30,
            color: "#00feff",
            stroke: "#00feff",
            align: "center",
            fontFamily: "Arcade",
            wordWrap: {
                width: this.width * 0.9,
            },
        });
        this.brightnessText = scene.add.text(-this.modal.width / 2 + 100, -35, 'Brightness', {
            fontSize: 30,
            color: "#00feff",
            stroke: "#00feff",
            align: "center",
            fontFamily: "Arcade",
            wordWrap: {
                width: this.width * 0.9,
            },
        });


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
            this.title,
            this.brightnessText,
            this.soundText,
            this.musicText,
            this.albumText,
        ]

        this.add(arr)
        scene.add.existing(this)
        // Crear sliders
        this.createSlider(scene, -30, -170, (value) => {
            console.log("Music Slider Value:", value);
        });

        this.createSlider(scene, -30, -70, (value) => {
            console.log("Sound Slider Value:", value);
        });

        this.createSlider(scene, -30, 30, (value) => {
            console.log("Brightness Slider Value:", value);
        });

        scene.add.existing(this);
    }

    createSlider(scene: Phaser.Scene, x: number, y: number, onChange: (value: number) => void) {
        // Crear contenedor para el slider
        const slider = scene.add.container(x, y);

        // Crear barra del slider
        const bar = scene.add.image(0, 0, 'settingsSlider').setOrigin(0.5).setScale(0.8);
        const control = scene.add.circle(-140, 0, 17, 0x00feff).setOrigin(0.5);
        const fillBar = scene.add.rectangle(-140, 0, 0, 28, 0x00feff).setOrigin(0, 0.5);


        slider.add([bar, control, fillBar]);

        control.setInteractive({ draggable: true });

        // Evento para arrastrar el control
        control.on("drag", (pointer, dragX) => {
            control.x = Phaser.Math.Clamp(dragX, -140, 140);
            const value = Phaser.Math.Clamp((control.x + 200) / 400, 0, 1); // Valor entre 0 y 1
            fillBar.width = control.x + 150;
            onChange(value);
        });

        this.add(slider);
    }
}
export default containerSettings;