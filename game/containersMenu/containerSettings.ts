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
    _sound: Phaser.GameObjects.Image;
    _soundFull: Phaser.GameObjects.Image;
    music: Phaser.GameObjects.Image;
    musicFull: Phaser.GameObjects.Image;
    title: Phaser.GameObjects.Text;
    brightnessText: Phaser.GameObjects.Text;
    _soundText: Phaser.GameObjects.Text;
    musicText: Phaser.GameObjects.Text;
    albumText: Phaser.GameObjects.Text;
    volume?:number
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
        this.quitGame.setInteractive()
        this.quitGame.on('pointerdown',()=>{
            this.quitGame.setTexture('settingsQuitGamePressed')
        })
        this.quitGame.on('pointerup',()=>{
            this.quitGame.setTexture('settingQuitGameHover')
        })
        this.quitGame.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,()=>{
            this.quitGame.setTexture('settingQuitGameHover')
        })
        this.quitGame.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
            this.quitGame.setTexture('settingsQuitGame')
        })

        this.cross = scene.add.image(-90, 350, 'settingsCross').setScale(0.8);
        this.cross.setOrigin(0.5);
        this.cross.setInteractive();
        this.cross.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,()=>{
            this.cross.setTexture('settingsCrossHover')
        })
        this.cross.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
            this.cross.setTexture('settingsCross')
        })
        this.cross.on('pointerdown',()=>{
            this.cross.setTexture('settingsCrossPessed')
        })
        this.cross.on('pointerup',()=>{
            this.cross.setTexture('settingsCrossHover')
            this.volume = this.scene.sound.volume
            if (config.panToInitial) {
                this.scene.cameras.main.pan(config.panToInitial.x, config.panToInitial.y, 1000, 'Expo', true)
            }
        })

        this.check = scene.add.image(10, 350, 'settingsCheck').setScale(0.8);
        this.check.setOrigin(0.5);
        this.check.setInteractive();
        this.check.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,()=>{
            this.check.setTexture('settingsCheckHover')
        })
        this.check.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
            this.check.setTexture('settingsCheck')
        })
        this.check.on('pointerdown',()=>{
            this.check.setTexture('settingsCheckPressed')
        })
        this.check.on('pointerup',()=>{
            this.check.setTexture('settingsCheckHover')
            const volume = parseFloat((this.volume ?? '').toString());
            if (!isNaN(volume) && volume !== this.scene.sound.volume) { 
                this.scene.sound.volume = volume < 0.55 ? 0 : Math.min(1, Math.max(0, volume));
            }
            if (config.panToInitial) {
                this.scene.cameras.main.pan(config.panToInitial.x, config.panToInitial.y, 1000, 'Expo', true)
            }
        })
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


        this._sound = scene.add.image(-this.modal.width / 2 + 120, -70, "settingsSound");
        this._sound.setOrigin(0.5);
        this._soundFull = scene.add.image(this.modal.width / 2 - 180, -70, "settingsSoundFull");
        this._soundFull.setOrigin(0.5);


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

        this._soundText = scene.add.text(-this.modal.width / 2 + 100, -125, 'Sound', {
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

        scene.add.existing(this)
        // Crear sliders
        this.createSlider(scene, -30, -170,(value) => {
            this.volume = value * 100
            console.log("Music Slider Value:", this.volume);
        });

        this.createSlider(scene, -30, -70,(value) => {
            this.volume = value * 100
            console.log("Music Slider Value:", this.volume);
        });

        this.createSlider(scene, -30, 30,(value) => {
            console.log("Brightness Slider Value:", value);
        });




        const arr = [
            this.modal,
            this.quitGame,
            this.cross,
            this.check,
            this.album,
            this.brightness,
            this.brightnessFull,
            this._sound,
            this._soundFull,
            this.music,
            this.musicFull,
            this.title,
            this.brightnessText,
            this._soundText,
            this.musicText,
            this.albumText,
        ]

        this.add(arr)
    
        scene.add.existing(this);
    }

    createSlider( scene: Phaser.Scene,x: number,y: number, onChange: (value: number) => void ) {
        const slider = scene.add.container(x, y);
        const bar = scene.add.image(0, 0, 'settingsSlider').setOrigin(0.5).setScale(0.8);
        const fillBar = scene.add.rectangle(-140, 0, 0, 24, 57055).setOrigin(0, 0.5);
        const fillBarStart = scene.add.image(-140, 0, 'fillBarStart').setOrigin(0.5).setScale(0.8);
        const control = scene.add.image(-125, 0, 'fillBarEnd').setOrigin(0.5).setScale(0.8);


        const initialX = Phaser.Math.Clamp((this.scene.sound.volume * 280) - 140, -140, 140);
        fillBar.width = initialX + 140
        
        slider.add([bar, fillBarStart, fillBar, control]);
        control.setInteractive({ draggable: true });
    
        control.x = initialX;
        control.on('drag', (pointer: any, dragX: number) => {
            control.x = Phaser.Math.Clamp(dragX, -125, 140);
            const value = Phaser.Math.Clamp((control.x + 140) / 280, 0, 1);
            fillBar.width = control.x + 140;
            onChange(value);
        });

        control.setDepth(10);
        this.add(slider);
        return { slider, control, fillBar };
    }

}
export default containerSettings;