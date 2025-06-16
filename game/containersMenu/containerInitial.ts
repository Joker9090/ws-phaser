import Phaser from "phaser";
import { ContainerMenuConfigType } from "../Types";
import MenuScene, { scaleBy } from "../Menu";
import containerSettings from "./containerSettings";
import MasterManager from "../MasterManager";


class containerInitial extends Phaser.GameObjects.Container {

    width: number = window.innerWidth;
    height: number = window.innerHeight;
    creditsButton: Phaser.GameObjects.Image;
    gameTitle: Phaser.GameObjects.Image;
    logoNoswar: Phaser.GameObjects.Image;
    playButton: Phaser.GameObjects.Image;
    scoreButton: Phaser.GameObjects.Image;
    albumButton: Phaser.GameObjects.Image;
    settingsButton: Phaser.GameObjects.Image;
    settingsVisible = false
    arr: (Phaser.GameObjects.Image | containerSettings)[];
    masterManager: MasterManager
    scene: MenuScene;
    constructor(scene: MenuScene, config: ContainerMenuConfigType) {
        super(scene, config.x, config.y)
        this.scene = scene
        const offsetY = 100
        let masterManagerScene = scene.game.scene.getScene("MasterManager") as MasterManager;
        if (!masterManagerScene) {
            this.masterManager = new MasterManager();
            this.scene.scene.add("MasterManager", this.masterManager, true);
        } else {
            this.masterManager = masterManagerScene;
            // this.scene.scene.launch("MasterManager");
        }


        this.playButton = scene.add.image(0, 120, "playButton").setAlpha(0);
        this.playButton.setInteractive();
        this.playButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            this.playButton.setTexture('playButtonHover');
        });
        this.playButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            this.playButton.setTexture('playButton');
        });
        this.playButton.on('pointerdown', () => {
            this.playButton.setTexture('playButtonPressed')

        })
        this.playButton.on('pointerup', () => {
            if (config.panToPlay) {
                this.scene.cameras.main.pan(config.panToPlay.x, config.panToPlay.y, 1000, 'Expo', true)
                this.masterManager.playSound('buttonSound', false)
                this.scene.containerPlay?.setVisible(true)
            }
            this.playButton.setTexture('playButtonHover')
        })
        this.scene.tweens.add({
            targets: this.playButton,
            alpha: 1,
            duration: 1000,
            delay: 1000,
            onComplete: () => {
                this.playButton.setAlpha(1)
            },
            ease: 'ease',
        })
        this.creditsButton = scene.add.image(0, 0, "creditsButton")
        const finalYCredits = 330
        this.creditsButton.setPosition(window.innerWidth <= 1024 ? -this.creditsButton.width/2 + 80 : -this.creditsButton.width/2 - 40, this.height/2 + 300)
        this.scene.tweens.add({
            targets: this.creditsButton,
            y: finalYCredits,
            duration: 1000 + Math.random() * 300,
            delay: 1000,
            ease: 'bounce',
        })
        this.creditsButton.setInteractive();
        this.creditsButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            this.creditsButton.setTexture('creditsButtonHover');
        });
        this.creditsButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            this.creditsButton.setTexture('creditsButton');
        });
        this.creditsButton.on('pointerup', () => {
            this.creditsButton.setTexture('creditsButtonHover')
            if (config.panToCredits) {
                this.scene.time.delayedCall(600, this.scene.createCreditsContainer, [], this.scene)
                this.scene.cameras.main.pan(config.panToCredits.x, config.panToCredits.y, 1000, 'Expo', true)
                this.masterManager.playSound('buttonSound', false)
            }

        })

        this.creditsButton.on('pointerdown', () => {
            this.creditsButton.setTexture('creditsButtonPressed')
        })
        this.albumButton = scene.add.image(0, 0, "albumButton").setVisible(window.innerWidth > 1024);
        this.albumButton.setPosition(this.albumButton.width/2 + 40, this.height/2  + 300)
        this.scene.tweens.add({
            targets: this.albumButton,
            y: finalYCredits,
            duration: 1000 + Math.random() * 300,
            delay: 1000,
            ease: 'bounce',
        })
        // this.scene.tweens.add({
        //     targets: this.albumButton,
        //     x: this.width / 2 - 130,
        //     duration: 1000,
        //     delay: 1000,
        //     ease: 'bounce',
        // })
        this.albumButton.setInteractive();
        this.albumButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            this.albumButton.setTexture('albumButtonHover');
        });
        this.albumButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            this.albumButton.setTexture('albumButton');
        });
        this.albumButton.on('pointerup', () => {
            this.albumButton.setTexture('albumButtonHover')
            this.masterManager.playSound('buttonSound', false)
            console.log(this.scene.containerAlbum, "containerAlbum")
            if (config.changeContainer) {
                config.changeContainer()
            }

        })

        this.albumButton.on('pointerdown', () => {
            this.albumButton.setTexture('albumButtonPressed')
            if (config.panToCredits) {
                // this.scene.cameras.main.pan(config.panToCredits.x, config.panToCredits.y, 1000, 'Expo', true)
            }
        })

        this.gameTitle = scene.add.image(0, 0, "gameTitle")
        this.gameTitle.setPosition(0, -this.height / 2 - this.gameTitle.height/2 - 100)
        if (window.innerWidth < 1400) {
            this.gameTitle.setScale(0.7)
        }
        this.scene.tweens.add({
            targets: this.gameTitle,
            y: -230,
            duration: 1000,
            delay: 1000,
            ease: 'ease',
        })

        this.scoreButton = scene.add.image(0, 0, "scoreButton")
        this.scoreButton.setInteractive()
        this.scoreButton.setPosition(this.scoreButton.width, this.scoreButton.height).setVisible(false)

        this.scoreButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            this.scoreButton.setTexture('scoreButtonHover')
        })

        this.scoreButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            this.scoreButton.setTexture('scoreButton')
        })
        this.scoreButton.on("pointerdown", () => {
            this.scoreButton.setTexture('scoreButtonPressed')
        })
        this.scoreButton.on("pointerup", () => {
            this.scoreButton.setTexture('scoreButtonHover')
            this.masterManager.playSound('buttonSound', false)

        })

        this.settingsButton = scene.add.image(0, 0, "settingsButton").setOrigin(1,0)
        this.settingsButton.setPosition(this.width/2 + 100, -this.height/2 + 20).setScrollFactor(1)
        this.scene.tweens.add({
            targets: this.settingsButton,
            x: this.width/2 - 20,
            duration: 600,
            delay: 300*Math.random() + 700,
            ease: 'ease',
        })
        this.settingsButton.setInteractive()
        this.settingsButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            this.settingsButton.setTexture('settingsButtonHover')
        })

        this.settingsButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            this.settingsButton.setTexture('settingsButton')
        })

        this.settingsButton.on("pointerdown", () => {
            this.settingsButton.setTexture('settingsButtonPressed')
        })
        this.settingsButton.on("pointerup", () => {
            console.log(this.settingsVisible, "visible from menu")
            this.toggleSettings()
            this.masterManager.playSound('buttonSound', false)
            this.settingsButton.setTexture('settingsButtonHover')
        })

        // TO DO: SETTINGS BUTTON DEPRECATED
        this.settingsButton.setVisible(false)
        this.settingsButton.setInteractive(false);

        this.scene.input.keyboard?.on('keydown-ESC', () => {
            console.log(this.settingsVisible, "visible from menu")
            if(!this.scene.containerAlbum?.visible && !this.scene.containerCredits?.visible && !this.scene.containerPlay?.visible && !this.scene.containerCode?.visible){
                this.toggleSettings();
            }
        });
        this.logoNoswar = scene.add.image(0, 0, "logoNoswar").setOrigin(1, 1)
        this.logoNoswar.setPosition(this.width/2 + 100, this.height/2 - 20)
        console.log(this.logoNoswar, "LOGO NOSWAR")
        this.scene.tweens.add({
            targets: this.logoNoswar,
            x: this.width/2 - 20,
            duration: 1000,
            delay: 300*Math.random() + 700,
            onComplete: () => {
                this.scene.tweens.add({ 
                    targets: this.logoNoswar,
                    y: '-=30',
                    duration: 600,
                    delay: 800,
                    repeat: -1,
                    hold: 500*Math.random() ,
                    yoyo: true,
                    ease: 'bounce'
                })
            },
            ease: 'ease',
        })
        this.arr = [
            this.creditsButton,
            this.gameTitle,
            this.playButton,
            this.scoreButton,
            this.settingsButton,
            this.logoNoswar,
            this.albumButton
        ]

        this.add(this.arr)
        scene.add.existing(this)
    }

    toggleSettings() {
        if (this.settingsVisible) {
            this.settingsVisible = false
            this.arr.forEach((child: any) => {
                if (child instanceof containerSettings) {
                    child.crossPress()
                }
            })
            this.settingsButton?.setVisible(true)

        } else {
            const settingsModal = new containerSettings(this.scene, { x: window.innerWidth / 2, y: window.innerHeight / 2,dinamicPosition:true }, undefined, () => { this.settingsVisible = !this.settingsVisible }, this.settingsButton)
            this.settingsButton?.setVisible(false)
            this.arr.push(settingsModal)
            this.settingsVisible = true
        }
    }
}
export default containerInitial;