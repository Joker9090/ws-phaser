import Phaser, { GameObjects } from "phaser";
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
    screenBlack: Phaser.GameObjects.Rectangle;
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
    scaledContainer?: Phaser.GameObjects.Container;
    dinamicPosition:boolean = false;
    scaleFactor:number =( window.innerWidth/1920 )*0.9
    finalScale?:number;
    childArray: Phaser.GameObjects.GameObject[] = [];
    constructor(scene: MenuScene | Game | CinematographyModular, config: ContainerMenuConfigType, changeContainer?: () => void, changeVisible?: () => void, settingsButtonUi?: Phaser.GameObjects.Image) {
        super(scene, config.x, config.y)
        if(config.dinamicPosition){
            this.dinamicPosition = true
        }
        this.scene = scene
        this.modal = scene.add.image(0, 0, "settingsModal").setScale(.9);
        // this.scene.tweens.add({
        //     targets: this.modal,
        //     duration: 500,
        //     scale: 0.9,
        //     ease: 'Bounce.easeOut',
        // })
        // this.modal.setOrigin(0.5);
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

        this.screenBlack = scene.add.rectangle(0, 0, window.innerWidth, window.innerHeight + 200, 0x000000, 0.5).setInteractive();
        this.settingsModal = this.scene.add.container(0,0).setScale(0);

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
            const scene = this.scene;
            const { scale } = this.getScaleValue();
            const background =  scene.add.rectangle(0, 0, window.innerWidth / scale, (window.innerHeight + 200) / scale, 0x000000, 0.5).setInteractive();
            const modal = this.scene.add.image(0, 0, "codeModal")
            const cross = this.scene.add.image(-120, 140, "settingsCross")
            const check = this.scene.add.image(80, 140, "settingsCheck")
            const text = this.scene.add.text(-190, -150, `Quit game?`, {
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
                this.pressCross()
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
                const gameScene = this.scene.scene.get("Game") as Game;
                gameScene.cameraNormal = true
                gameScene.checkPoint === 0
                if (this.scene.scene.key !== 'MenuScene') {
                    this.scene.sound.stopAll()
                    const multiScene = new MultiScene("MenuScene", undefined);
                    const scene = this.scene.scene.add("MultiScene", multiScene, true);
                    this.scene.scene.start("MultiScene").bringToTop("MultiScene");
                } else {
                    this.destroyChildren(true)
                    this.destroy()
                }
                if (changeContainer) {
                    changeContainer()
                } if (changeVisible) {
                    changeVisible()
                }
                group.forEach(item => item.destroy());
                
            })
            this.settingsModal.add(group)
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
            this.animationOfModal(false)
            this.destroyChildren(true)
        this.destroy()
            // destroy()
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

      


        this.sliderMusic = this.createSlider(scene, -30 , -170 , (value) => {
            this.masterManager.changeVolume(value, 'music');
        }, this.volumeMusic);

        this.sliderSound = this.createSlider(scene, -30 , -70 , (value) => {
            this.masterManager.changeVolume(value, 'sound');
        }, this.volumeSound);

        this.sliderBrightness = this.createSlider(scene, -30 , 30, (value) => {
            this.masterManager.changeBrightness(1 - value);
        }, 1 - this.darkness);



        this.childArray = [
            this.modal,
            this.quitGame,
            this.cross,
            this.check,
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
        ]
        this.childArray.forEach((element) => {
            this.settingsModal.add(element);
            // if (element instanceof Phaser.GameObjects.Image || element instanceof Phaser.GameObjects.Text) {
            //     // element.setScale(element.scaleX * this.scaleFactor , element.scaleY * this.scaleFactor );
            //     // element.setPosition(element.x * this.scaleFactor , element.y * this.scaleFactor );
            // }
        });
        
       
       
        // console.log("container scael from create",this.settingsModal.scale, "finalScale from create:", finalScale) 
        // this.settingsModal.setScale(finalScale)
        this.scene.scale.on("resize", this.resizeElements, this);
                // ignore main camera
        // this.scene.cameras.main.ignore(this.settingsModal);
        console.log(this.settingsModal, 'settings from creator')
       this.resizeElements.bind(this)()
        
        console.log(this.settingsModal.scale, 'scale from creator')
        this.setPosition(this.width / 2, this.height / 2);
        this.animationOfModal(true);
        this.scene.cameras.cameras.map(camera => {
            if (camera !== this.scene.cameras.main && camera.name !== "backgroundCamera") return camera
            camera.ignore(this.settingsModal);
            camera.ignore(this.screenBlack);
            this.childArray.forEach((element) => {
                if (element instanceof Phaser.GameObjects.Image || element instanceof Phaser.GameObjects.Text) {
                    camera.ignore(element);
                }
            })
        })
    } 

    pressCross() {
        this.cross.setTexture('settingsCrossHover')
        this.masterManager.playSound('buttonSound', false)
        if (this.scene instanceof Game) {
            this.masterManager.resumeGame()
        }
        this.settingsButtonUi?.setVisible(true)
        this.animationOfModal(false);
        this.destroyChildren(true)
        this.destroy()
    }
    
    destroyChildren(withRemoveAll: boolean = false) {
        this.childArray.forEach((element) => {
            if (element instanceof Phaser.GameObjects.Image || element instanceof Phaser.GameObjects.Text) {
                element.destroy();
            }
        });
        this.sliderMusic.slider.destroy();
        this.sliderSound.slider.destroy();
        this.sliderBrightness.slider.destroy();
        this.screenBlack.destroy();
        this.settingsModal.destroy();
        if(withRemoveAll) super.removeAll(true);
    }
    isMobile() {
        return window.innerWidth <= 768;
    }
    getScaleValue() {
        const isMobile = this.isMobile();
        const width = window.innerWidth;
        const height = window.innerHeight;
        const proportionWidth = isMobile ? 1920 : 1920;
        const proportionHeight = isMobile ? 1080 : 1080;
        let newScaleX = width / proportionWidth;
        let newScaleY = height / proportionHeight;
        console.log("newScaleX", newScaleX, "newScaleY", newScaleY, "width", width, "height", height)
       return {
            scale: (newScaleX > newScaleY) ? newScaleX : newScaleY,
            width: width,
            height: height
        }

    }

    resizeElements() {
        const { scale: newScale, width, height } = this.getScaleValue();
        if (!this.settingsModal) return

        // window.test = this
        this.setScale(newScale)
       
        if(this.screenBlack){
            // this.screenBlack.setPosition(width / 2, height / 2)
            this.screenBlack.setScale(width, height)
            this.settingsModal.setPosition(width / 2, height / 2);
        }
       
        // this.scene?.cameras.cameras.map(camera => {
        //     if (camera === this.scene.cameras.main) return camera
        //     if( camera.name === 'backgroundCamera') return camera
        //     console.log("camera", camera, "position");
        //     // camera.setViewport(0,0, width, height);
        //     // center on 0, 0
        // });
    }

    animationOfModal(open: boolean = true) {
        // a su vez, aca tmb se setea el scale, y esto es parte de una animation,
        // cuando la animacion ocurre, es como que durante muchisimos frames, se setean los valores que indican la animacion
        // entonces esto overridea el scale original que queriamos poner del settings modal para que se vea bien
        const { scale } = this.getScaleValue();
        // this.settingsModal.setScale(open ? 0 : scale )
        // final value
        
        this.scene.tweens.add({
            targets: this.settingsModal,
            duration: 500,
            scale: open ? scale : 0,
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
        this.destroyChildren(true)
        this.destroy()

    }
    createSlider(
        scene: Phaser.Scene,
        x: number,
        y: number,
        onChange: (value: number) => void,
        initialValue: number
      ) {
          const slider = scene.add.container(x, y);
          const barWidth = 280; // el ancho total utilizable del slider
          const halfBar = barWidth / 2;
      
          const bar = scene.add.image(0, 0, 'settingsSlider').setOrigin(0.5).setScale(0.8);
      
          const fillBar = scene.add.rectangle(-halfBar, 0, 0, 24,  0x00dedf).setOrigin(0, 0.5)
      
          const fillBarStart = scene.add.image(-halfBar, 0, 'fillBarStart').setOrigin(0.5).setScale(0.8);
      
          const control = scene.add.circle(-halfBar + initialValue * barWidth , 0, 13, 0xffffff) .setOrigin(0.5)
      
          control.setInteractive({ draggable: true });
      
          control.on('pointerover', () => {
              control.setScale(1.2);
          });
      
          control.on('pointerout', () => {
              control.setScale(1.0);
          });
      
          // Inicializa el fillBar con el valor inicial
          fillBar.width = (control.x + halfBar);
      
          control.on('drag', (_: any, dragX: number) => {
              const minX = -halfBar;
              const maxX = halfBar;
              control.x = Phaser.Math.Clamp(dragX, minX, maxX);
              console.log(control.x, "control x", fillBar.width, "fillbar width")
              // Actualiza el fillBar y calcula el nuevo valor (de 0 a 1)
              const normalizedValue = (control.x + halfBar ) / barWidth;
              fillBar.width = control.x + halfBar -7;
      
              onChange(normalizedValue);
          });
      
          control.on('pointerdown', () => {
              this.masterManager.playSound('buttonSound', false);
          });
      
          control.setDepth(10);
          slider.add([bar, fillBarStart, fillBar, control]);
          this.settingsModal.add(slider);
      
          return { slider, control, fillBar };
      }
      resize(newValue: number) {
        this.setScale(newValue);
      }
      

}
export default containerSettings;