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
    volumeMusic: number = 2;
    volumeSound: number = 2;
    // originalMusic: number = 0.2;
    // originalSound: number = 0.2;
    darkness: number = 0;
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
        control: Phaser.GameObjects.Arc,
        fillBar: Phaser.GameObjects.Rectangle
    };
    sliderSound: {
        slider: Phaser.GameObjects.Container,
        control: Phaser.GameObjects.Arc,
        fillBar: Phaser.GameObjects.Rectangle
    };
    sliderBrightness: {
        slider: Phaser.GameObjects.Container,
        control: Phaser.GameObjects.Arc,
        fillBar: Phaser.GameObjects.Rectangle
    };
    settingsButtonUi?: Phaser.GameObjects.Image

    constructor(scene: MenuScene | Game | CinematographyModular, config: ContainerMenuConfigType, changeContainer?: () => void, changeVisible?: () => void, settingsButtonUi?: Phaser.GameObjects.Image) {
        super(scene, config.x, config.y)
        const offsetY = 100
        this.scene = scene
        this.modal = scene.add.image(0, 0, "settingsModal").setScale(.9);
        // this.scene.tweens.add({
        //     targets: this.modal,
        //     duration: 500,
        //     scale: 0.9,
        //     ease: 'Bounce.easeOut',
        // })
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
        }).setFontSize('60px').setScale(1);
        // this.scene.tweens.add({
        //     targets: this.title,
        //     duration: 500,
        //     scale: 1,
        //     ease: 'Bounce.easeOut',
        // })

        this.quitGame = scene.add.image(-40, 250, 'settingsQuitGame');
        // this.scene.tweens.add({
        //     targets: this.quitGame,
        //     duration: 500,
        //     scale: 1,
        //     ease: 'Bounce.easeOut',
        // })
        this.quitGame.setOrigin(0.5);
        this.quitGame.setInteractive()
        this.quitGame.on('pointerdown', () => {
            this.quitGame.setTexture('settingsQuitGamePressed')
            this.masterManager.playSound('buttonSound', false)
        })
        this.quitGame.on('pointerup', () => {
            this.quitGame.setTexture('settingQuitGameHover')
            const group: any[] = []
            const background = this.scene.add.rectangle(this.scene.scale.width / 2, this.scene.scale.height / 2, this.scene.scale.width, this.scene.scale.height, 0x0000, 0.7).setInteractive()
            const modal = this.scene.add.image(this.scene.scale.width / 2, this.scene.scale.height / 4 + 300, "codeModal")
            const cross = this.scene.add.image(this.scene.scale.width / 2 - 100, this.scene.scale.height / 4 + 450, "settingsCross")
            const check = this.scene.add.image(this.scene.scale.width / 2 + 100, this.scene.scale.height / 4 + 450, "settingsCheck")
            const text = this.scene.add.text(this.scene.scale.width / 3 + 130, this.scene.scale.height / 4 + 200, `Quit game?`, {
                color: "#00feff",
                stroke: "#00feff",
                align: "center",
                fontFamily: "Arcade",
                fontSize: 60,
                wordWrap: {
                    width: this.width * 0.9,
                },
            })
            group.push(background, text, check, cross, modal)
            cross.setInteractive()
            cross.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                cross.setTexture("settingsCrossHover")
            })
            cross.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                cross.setTexture("settingsCross")
            })
            cross.on("pointerdown", () => {
                cross.setTexture("settingsCrossPessed")
            })
            cross.on("pointerup", () => {
                group.forEach((child) => {
                    child.setVisible(false)
                })
            })
            check.setInteractive()
            check.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                check.setTexture("settingsCheckHover")
            })
            check.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                check.setTexture("settingsCheck")
            })
            check.on("pointerdown", () => {
                check.setTexture("settingsCheckPressed")
            })
            check.on("pointerup", () => {
                this.masterManager.changeVolume(this.volumeMusic, 'music');
                this.masterManager.changeVolume(this.volumeSound, 'sound');
                this.masterManager.changeBrightness(this.darkness);
                this.settingsButtonUi?.setVisible(true)
                if (this.scene.scene.key !== 'MenuScene') {
                    this.scene.sound.stopAll()
                    const multiScene = new MultiScene("MenuScene", undefined);
                    const scene = this.scene.scene.add("MultiScene", multiScene, true);
                    this.scene.scene.start("MultiScene").bringToTop("MultiScene");
                } else {
                    destroy()
                }
                if (changeContainer) {
                    changeContainer()
                } if (changeVisible) {
                    changeVisible()
                }
                group.forEach(item => item.destroy());
            })

        })

        this.quitGame.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            this.quitGame.setTexture('settingQuitGameHover')
        })
        this.quitGame.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            this.quitGame.setTexture('settingsQuitGame')

        })

        this.cross = scene.add.image(-90, 350, 'settingsCross').setScale(.8);
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
            if (changeVisible) {
                changeVisible()
            }
            this.crossPress()
        })

        this.check = scene.add.image(10, 350, 'settingsCheck').setScale(.8);

        // this.scene.tweens.add({
        //     targets: [this.check, this.cross],
        //     duration: 500,
        //     scale: 0.8,
        //     ease: 'Bounce.easeOut',
        // })

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
            if (this.scene.scene.key !== 'MenuScene') {
                this.masterManager.resumeGame()
            }
            if (changeVisible) {
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

        this.brightness = scene.add.image(-this.modal.width / 2 + 120, 30, "settingsBrightness").setScale(1);
        this.brightness.setOrigin(0.5);
        this.brightnessFull = scene.add.image(this.modal.width / 2 - 180, 30, "settingsBrightnessFull").setScale(1);
        this.brightnessFull.setOrigin(0.5);


        this._sound = scene.add.image(-this.modal.width / 2 + 120, -70, "settingsSound").setScale(1);
        this._sound.setOrigin(0.5);
        this._soundFull = scene.add.image(this.modal.width / 2 - 180, -70, "settingsSoundFull").setScale(1);
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
        }).setScale(1);
        this.music = scene.add.image(-this.modal.width / 2 + 120, -170, "settingsSound").setScale(1);
        this.music.setOrigin(0.5);
        this.musicFull = scene.add.image(this.modal.width / 2 - 180, -170, "settingsSoundFull").setScale(1);
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
        }).setScale(1);
        this.brightnessText = scene.add.text(-this.modal.width / 2 + 100, -35, 'Brightness', {
            fontSize: 30,
            color: "#00feff",
            stroke: "#00feff",
            align: "center",
            fontFamily: "Arcade",
            wordWrap: {
                width: this.width * 0.9,
            },
        }).setScale(1);

        scene.add.existing(this)

        // this.scene.tweens.add({
        //     targets: [this.brightness, this.brightnessText, this.brightnessFull, this._sound, this._soundText, this._soundFull, this.music, this.musicText, this.musicFull],
        //     duration: 500,
        //     scale: 1,
        //     ease: 'Bounce.easeOut',
        // })

        this.sliderMusic = this.createSlider(scene, -30, -170, (value) => {
            this.masterManager.changeVolume(value, 'music');
        }, this.volumeMusic);

        this.sliderSound = this.createSlider(scene, -30, -70, (value) => {
            this.masterManager.changeVolume(value, 'sound');
        }, this.volumeSound);

        this.sliderBrightness = this.createSlider(scene, -30, 30, (value) => {
            this.masterManager.changeBrightness(1 - value);
        }, 1 - this.darkness);

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

        const destroy = () => {
            this.removeAll(true)
            this.destroy()
        }

        this.animationOfModal()
    }

    animationOfModal(open: boolean = true) {
        this.settingsModal.setScale(open ? 0 : 1)
        this.scene.tweens.add({
            targets: this.settingsModal,
            duration: 500,
            scale: open ? 1 : 0,
            onStart: () => {
                console.log("ENTRO ACA ARIEL")
            },
            onComplete: () => {
                console.log("ENTRO ACA ARIEL")
            },
            ease: 'Bounce.easeOut',
        })

    }

    crossPress() {
        console.log(this.volumeMusic, "from cross")
        console.log(this.volumeSound, "JOTA SOUND", this.volumeMusic, "JOTA MUSIC")
        this.masterManager.playSound('buttonSound', false)
        this.masterManager.changeVolume(this.volumeMusic, 'music');
        this.masterManager.changeVolume(this.volumeSound, 'sound');
        this.masterManager.changeBrightness(this.darkness);
        if (this.scene instanceof Game) {
            this.masterManager.resumeGame()
        }
        this.settingsButtonUi?.setVisible(true)
        this.destroy()
    }

    createSlider(scene: Phaser.Scene, x: number, y: number, onChange: (value: number) => void, initialValue: number) {
        const slider = scene.add.container(x, y);

        const bar = scene.add.image(0, 0, 'settingsSlider').setOrigin(0.5).setScale(.8);
        const fillBar = scene.add.rectangle(-140, 0, 0, 24, 57055).setOrigin(0, 0.5).setScale(1);
        const fillBarStart = scene.add.image(-141, 0, 'fillBarStart').setOrigin(0.5).setScale(.8);
        const control = scene.add.circle(-125, 0, 13, 0xffffff).setOrigin(0.5).setScale(1);


        // this.scene.tweens.add({
        //     targets: [bar, fillBarStart],
        //     duration: 500,
        //     scale: 0.8,
        //     ease: 'power2',
        // })
        // this.scene.tweens.add({
        //     targets: [fillBar, control],
        //     duration: 500,
        //     scale: 1,
        //     ease: 'power2',
        // })

        control.setInteractive({ draggable: true });
        control.on('pointerover', () => {
            control.setScale(1.2);
        });
        control.on('pointerout', () => {
            control.setScale(1.0);
        });

        const initialX = Phaser.Math.Clamp((initialValue * 280) - 140, -140, 140);
        fillBar.width = initialX + 140;
        slider.add([bar, fillBarStart, fillBar, control]);

        control.x = initialX;
        scene.input.setDraggable(control);
        control.on('drag', (pointer: any, dragX: number) => {
            control.x = Phaser.Math.Clamp(dragX, -136, 142);
            const value = Phaser.Math.Clamp((control.x + 140) / 280, 0, 1);
            fillBar.width = control.x + 140;
            onChange(value);
        });
        control.on('pointerdown', () => {
            this.masterManager.playSound('buttonSound', false);
        });

        control.setDepth(10);
        this.settingsModal.add(slider);
        return { slider, control, fillBar };
    }

}
export default containerSettings;