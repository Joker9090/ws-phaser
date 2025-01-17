import Phaser from "phaser";
import { ContainerMenuConfigType } from "../Types";
import CinematographyModular from "../movies/Cinematography-modular";
import MenuScene from "../Menu";
import Game from "../Game";
import MasterManager from "../MasterManager";
import MultiScene from "../MultiScene";

class containerSettings extends Phaser.GameObjects.Container {

    width: number = window.innerWidth;
    height: number = window.innerHeight;
    modal: Phaser.GameObjects.Image;
    quitGame: Phaser.GameObjects.Image;
    cross: Phaser.GameObjects.Image;
    check: Phaser.GameObjects.Image;
    // album: Phaser.GameObjects.Image;
    brightness: Phaser.GameObjects.Image;
    brightnessFull: Phaser.GameObjects.Image;
    _sound: Phaser.GameObjects.Image;
    _soundFull: Phaser.GameObjects.Image;
    music: Phaser.GameObjects.Image;
    musicFull: Phaser.GameObjects.Image;
    volumeMusic: number = 0.2;
    volumeSound: number = 0.2;
    // originalMusic: number = 0.2;
    // originalSound: number = 0.2;
    darkness: number = 0.2;
    title: Phaser.GameObjects.Text;
    brightnessText: Phaser.GameObjects.Text;
    _soundText: Phaser.GameObjects.Text;
    musicText: Phaser.GameObjects.Text;
    // albumText: Phaser.GameObjects.Text;
    volume?: number;
    scene: MenuScene | Game | CinematographyModular;
    settingsModal: Phaser.GameObjects.Container;
    // settingsButton: Phaser.GameObjects.Image;
    masterManager: MasterManager;
   
    sliderMusic: {
        slider: Phaser.GameObjects.Container,
        control: Phaser.GameObjects.Image,
        fillBar: Phaser.GameObjects.Rectangle
    };
    sliderSound: {
        slider: Phaser.GameObjects.Container,
        control: Phaser.GameObjects.Image,
        fillBar: Phaser.GameObjects.Rectangle
    };
    sliderBrightness: {
        slider: Phaser.GameObjects.Container,
        control: Phaser.GameObjects.Image,
        fillBar: Phaser.GameObjects.Rectangle
    };
    settingsButtonUi?: Phaser.GameObjects.Image

    constructor(scene: MenuScene | Game | CinematographyModular, config: ContainerMenuConfigType, changeContainer?: ()=>void,changeVisible?:()=>void,settingsButtonUi?: Phaser.GameObjects.Image) {
        super(scene, config.x, config.y)
        const offsetY = 100
        this.scene = scene
        this.modal = scene.add.image(0, 0, "settingsModal").setScale(0.9);
        this.modal.setOrigin(0.5);
        this.settingsButtonUi = settingsButtonUi

        let masterManagerScene = scene.game.scene.getScene("MasterManager") as MasterManager;
        if (!masterManagerScene) {
            this.masterManager = new MasterManager();
            this.scene.scene.add("MasterManager", this.masterManager, true);
        } else {
            this.masterManager = masterManagerScene;
            // this.scene.scene.launch("MasterManager");
        }
        this.volumeMusic = this.masterManager.volumeMusic
        this.volumeSound = this.masterManager.volumeSound
        this.darkness = this.masterManager.brightness

        const screenBlack = scene.add.rectangle(0, 0, window.innerWidth + 200, window.innerHeight + 200, 0x000000, 0.5).setInteractive();
        this.settingsModal = this.scene.add.container()

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
        this.quitGame.on('pointerdown', () => {
            this.quitGame.setTexture('settingsQuitGamePressed')
            this.masterManager.playSound('buttonSound', false)
        })
        this.quitGame.on('pointerup', () => {
            this.scene.sound.stopAll()
            this.quitGame.setTexture('settingQuitGameHover')
            this.masterManager.changeVolume(this.volumeMusic, 'music');
            this.masterManager.changeVolume(this.volumeSound, 'sound');
            if(this.scene.scene.key !== 'MenuScene'){
                const multiScene = new MultiScene("MenuScene", undefined);
                const scene = this.scene.scene.add("MultiScene", multiScene, true);
                this.scene.scene.start("MultiScene").bringToTop("MultiScene");
            }else {
                destroy()
            }
            if(changeContainer){
                changeContainer()
            }
        })

        this.quitGame.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            this.quitGame.setTexture('settingQuitGameHover')
        })
        this.quitGame.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            this.quitGame.setTexture('settingsQuitGame')
          
        })

        this.cross = scene.add.image(-90, 350, 'settingsCross').setScale(0.8);
        this.cross.setOrigin(0.5);
        this.cross.setInteractive();
        this.cross.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            this.cross.setTexture('settingsCrossHover')
        })
        this.cross.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            this.cross.setTexture('settingsCross')
        })
        this.cross.on('pointerdown', () => {
            this.cross.setTexture('settingsCrossPessed')
        })
        this.cross.on('pointerup', () => {
            if(changeVisible){
                changeVisible()
            }
            this.crossPress()
        })

        this.check = scene.add.image(10, 350, 'settingsCheck').setScale(0.8);
        this.check.setOrigin(0.5);
        this.check.setInteractive();
        this.check.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            this.check.setTexture('settingsCheckHover')
        })
        this.check.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            this.check.setTexture('settingsCheck')
        })
        this.check.on('pointerdown', () => {
            this.check.setTexture('settingsCheckPressed')
        })
        this.check.on('pointerup', () => {
            console.log(this.darkness, "darkness desde check")
            console.log("scenes", this.scene.game.scene.getScenes(), "cameras:", this.scene.cameras)
            this.check.setTexture('settingsCheckHover')
            this.masterManager.playSound('buttonSound', false)
            settingsButtonUi?.setVisible(true)
            this.masterManager.resumeGame()
            if(changeVisible){
                changeVisible()
            }
            destroy()

        })
        // this.album = scene.add.image(-this.modal.width / 2 + 120, 150, "settingsAlbum");
        // this.album.setOrigin(0.5);
        // this.albumText = scene.add.text(-this.modal.width / 2 + 150, 130, 'Album', {
        //     fontSize: 30,
        //     color: "#00feff",
        //     stroke: "#00feff",
        //     align: "center",
        //     fontFamily: "Arcade",
        //     wordWrap: {
        //         width: this.width * 0.9,
        //     },
        // });

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
        this.sliderMusic = this.createSlider(scene, -30, -170, (value) => {
            this.masterManager.changeVolume(value, 'music');
        }, this.volumeMusic);

        this.sliderSound = this.createSlider(scene, -30, -70, (value) => {
            this.masterManager.changeVolume(value, 'sound');
        }, this.volumeSound);

        this.sliderBrightness = this.createSlider(scene, -30, 30, (value) => {
            this.masterManager.changeBrightness(1 - value);
        }, 1 - this.darkness );

        const arr = [
            screenBlack,
            this.modal,
            this.quitGame,
            this.cross,
            this.check,
            // this.album,
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
            // this.albumText,
        ]

        this.settingsModal.add(arr)
        this.add([screenBlack, this.settingsModal])
        scene.add.existing(this);

        const destroy = ()=>{
            this.removeAll(true)
            this.destroy()
        }
        
    }

        crossPress(){
            this.masterManager.playSound('buttonSound', false)
            this.masterManager.changeVolume(this.volumeMusic, 'music');
            this.masterManager.changeVolume(this.volumeSound, 'sound');
            this.masterManager.changeBrightness(this.darkness);
            this.masterManager.resumeGame()
            this.settingsButtonUi?.setVisible(true)
            this.destroy()
        }

    createSlider(scene: Phaser.Scene, x: number, y: number, onChange: (value: number) => void, initialValue: number) {
        const slider = scene.add.container(x, y);
        const bar = scene.add.image(0, 0, 'settingsSlider').setOrigin(0.5).setScale(0.8);
        const fillBar = scene.add.rectangle(-140, 0, 0, 24, 57055).setOrigin(0, 0.5);
        const fillBarStart = scene.add.image(-141, 0, 'fillBarStart').setOrigin(0.5).setScale(0.8);
        const control = scene.add.image(-125, 0, 'fillBarEnd').setOrigin(0.5).setScale(0.8);
        const initialX = Phaser.Math.Clamp((initialValue* 280) - 140, -140, 140);
        fillBar.width = initialX + 140
        slider.add([bar, fillBarStart, fillBar, control]);
        control.setInteractive({ draggable: true });

        control.x = initialX;
        control.on('drag', (pointer: any, dragX: number) => {
            control.x = Phaser.Math.Clamp(dragX, -125, 142);
            const value = Phaser.Math.Clamp((control.x + 140) / 280, 0, 1);
            fillBar.width = control.x + 140;
            onChange(value);
        });
        control.on('pointerdown',()=>{
            this.masterManager.playSound('buttonSound', false)
        })


        
        control.setDepth(10);
        this.settingsModal.add(slider);
        return { slider, control, fillBar };
    }

}
export default containerSettings;