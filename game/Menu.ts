import Phaser from "phaser";
import ContainerCredits from "./containersMenu/containerCredits";
import containerInitial from "./containersMenu/containerInitial";
import containerPlay from "./containersMenu/containerPlay";
import containerSettings from "./containersMenu/containerSettings";
import containerCode from "./containersMenu/containerCode";
import MasterManager from "./MasterManager";
import containerAlbum from "./containersMenu/containerAlbum";


class MenuScene extends Phaser.Scene {
    width: number = window.innerWidth;
    height: number = window.innerHeight;
    containerInitial?: Phaser.GameObjects.Container & { resize: Function};
    centralPointInitial: { x: number, y: number } = { x: this.width / 2, y: this.height / 2 };

    containerCredits?: Phaser.GameObjects.Container  & { resize: Function};
    centralPointCredits: { x: number, y: number } = { x: this.width / 2 - this.width, y: this.height / 2 };

    containerPlay?: Phaser.GameObjects.Container  & { resize: Function};
    centralPointPlay: { x: number, y: number } = { x: this.width / 2 + this.width, y: this.height / 2 };

    containerSettings?: containerSettings  & { resize: Function};
    centralPointSettings: { x: number, y: number } = { x: this.width / 2, y: this.height / 2 + this.height };

    containerCode?: Phaser.GameObjects.Container  & { resize: Function, setDefaultStatusOfElements: Function};
    centralPointCode: { x: number, y: number } = { x: this.width / 2 + this.width * 2, y: this.height / 2 }
    containerCodeRendered: boolean = false;

    containerAlbum?: Phaser.GameObjects.Container  & { resize: Function};
    containerAlbumRendered: boolean = false;

    background?: Phaser.GameObjects.Image;
    masterManagerScene?: MasterManager;
    constructor() {
        super({ key: "MenuScene" });
    }


    create() {
        console.log("MenuScene created");
        this.background = this.add.image(window.innerWidth / 2, window.innerHeight, "menuBackground").setOrigin(0.5, 1).setAlpha(0.8)
        // background is 1880 x 540
        const screenRatio = window.innerWidth / window.innerHeight;
        const backgroundRatio = this.background.width / this.background.height;
        // try to always fit height but also the final background width need to be at least 3 times screen width
      
        const scaleW = window.innerWidth / this.background.width * 3;
        this.background.setScale(scaleW).setOrigin(0.5, 1);
        if(this.background.height * scaleW < window.innerHeight) {
            // if the background height is less than the screen height, scale it to fit the height
            const scaleH = window.innerHeight / this.background.height;
            this.background.setScale(scaleH).setOrigin(0.5, 1);
        }


        // position background bottom center if the screen

        
       
        // set viewport and camera position
        this.cameras.main.setViewport(-this.width, 0, this.width * 3, this.height)
        this.cameras.main.centerOn(this.centralPointInitial.x, this.centralPointInitial.y)

        this.masterManagerScene = this.game.scene.getScene(
            "MasterManager"
        ) as MasterManager;
        if (!this.masterManagerScene.scene.isActive())
            this.scene.launch("MasterManager").sendToBack();


        this.masterManagerScene.playMusic("menuBgMusic", true)
        this.containerInitial = new containerInitial(this, {
            x: this.width / 2,
            y: this.height / 2,
            panToCredits: this.centralPointCredits,
            panToPlay: this.centralPointPlay,
            panToSettings: this.centralPointSettings,
            changeContainer: () => {
                if (this.containerInitial && this.containerAlbum) {
                    this.changeContainer(this.containerInitial, this.containerAlbum)
                }
            }
        })




        this.containerPlay = new containerPlay(this, {
            x: this.width + this.width / 2,
            y: this.height / 2,
            panToInitial: this.centralPointInitial,
            panToCode: this.centralPointCode,
            changeContainer: () => {
                if (this.containerPlay && this.containerCode) {
                    this.changeContainer(this.containerPlay, this.containerCode)
                }
            }
        })

        // this.containerSettings = new containerSettings(this, {
        //     x: this.width / 2,
        //     y: this.height / 2,
        //     panToInitial: this.centralPointInitial
        // }).setVisible(false)
        // this.containerSettings.settingsModal.setScale(scaleBy());
        this.containerCodeRendered = false
        this.containerCode = new containerCode(this, {
            x: this.width * 1.5,
            y: this.height / 2,
            panToInitial: this.centralPointInitial,
            changeContainer: () => {
                if (this.containerCode && this.containerPlay) {
                    this.changeContainer(this.containerCode, this.containerPlay)
                }
            }
        }).setVisible(false)
        this.containerCode.setScale(scaleBy())

        this.containerAlbumRendered = false
        this.containerAlbum = new containerAlbum(this, {
            x: 0,
            y: 0,
            panToInitial: this.centralPointInitial,
            panToCode: this.centralPointCode,
            changeContainer: () => {
                if (this.containerAlbum && this.containerInitial) {
                    this.changeContainer(this.containerAlbum, this.containerInitial)
                }
            }
        }).setVisible(false)

        this.events.removeAllListeners('shutdown')
        this.resize();

        window.addEventListener('resize', () => {
            // restart scene on resize
            this.scene.restart();
        });

        // Remove listeners on shutdown to avoid memory leaks
        this.events.once('shutdown', () => {
            window.removeEventListener('resize', this.resize);
        });
    }

    createCreditsContainer() {
        if (this.containerCredits) {
            this.destroyContainer(this.containerCredits)
        }
        this.containerCredits = new ContainerCredits(this, {
            x: -this.width / 2,
            y: this.height / 2,
            panToInitial: this.centralPointInitial
        })
        this.containerCredits.setScale(scaleBy());
    }


    destroyContainer(container: Phaser.GameObjects.Container) {
        container.removeAll(true)
        container.destroy()
    }

    changeContainer(from: Phaser.GameObjects.Container, to: Phaser.GameObjects.Container) {
        let circle: Phaser.GameObjects.Arc
        // check this.scene.cameras.main with configPans and create a switch
        // centralPointInitial
        // centralPointCredits
        // centralPointPlay
        // centralPointSettings
        // centralPointCode

                  circle = this.add.circle(from.x, from.y, 100, 0x010101).setAlpha(0.5).setScale(0).setOrigin(0.5, 0.5)

        circle.setInteractive()

        const diagonal = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);
        const finalScale = diagonal / (circle.radius * 2)
        from.scene.tweens.add({
            targets: circle,
            alpha: 1,
            ease: 'Power2',
            duration: 300,
        });
        from.scene.tweens.add({
            targets: circle,
            scale: finalScale * 2,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                from.setVisible(false)
                to.setVisible(true)
                if (to instanceof containerAlbum && !this.containerAlbumRendered) {
                    // Este delay controla cuanto tardan en aparecer las figuritas
                    this.time.delayedCall(900, () => {
                        to.updateElements()
                    })
                    this.containerAlbumRendered = true
                    this.containerCode?.setDefaultStatusOfElements()
                    this.containerCodeRendered = false
                } else if (to instanceof containerCode && !this.containerCodeRendered) {
                    this.time.delayedCall(700, () => {
                        to.animateElements()
                    })
                    this.containerCodeRendered = true
                } else {
                    this.containerCode?.setDefaultStatusOfElements()
                    this.containerCodeRendered = false
                }
                from.scene.tweens.add({
                    targets: circle,
                    scale: 0,
                    duration: 1500,
                    ease: 'Power2',
                    onComplete: () => {
                        circle.destroy()

                    }
                })
                 from.scene.tweens.add({
                    targets: circle,
                    alpha: 0.5,
                    delay: 1250,
                    duration: 150,
                    ease: 'Power2',
                    onComplete: () => {

                    }
                })
            }
        });
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        // Update central points
        this.centralPointInitial = { x: this.width / 2, y: this.height / 2 };
        this.centralPointCredits = { x: this.width / 2 - this.width, y: this.height / 2 };
        this.centralPointPlay = { x: this.width / 2 + this.width, y: this.height / 2 };
        this.centralPointSettings = { x: this.width / 2, y: this.height / 2 + this.height };
        this.centralPointCode = { x: this.width / 2 + this.width * 2, y: this.height / 2 };

        // Update background
        this.background?.setPosition(this.width / 2, this.height);

        // Update camera
        this.cameras.cameras.map(camera => {
            camera.setViewport(-this.width, 0, this.width * 3, this.height);
            camera.centerOn(this.centralPointInitial.x, this.centralPointInitial.y);
        });
        // this.cameras.main.setViewport(-this.width, 0, this.width * 3, this.height);
        // this.cameras.main.centerOn(this.centralPointInitial.x, this.centralPointInitial.y);

        // Resize and reposition containers
        this.containerInitial?.resize(scaleBy())
        this.containerCredits?.resize(scaleBy())
        this.containerPlay?.resize(scaleBy())
        this.containerSettings?.resize(scaleBy())
        this.containerCode?.resize(scaleBy())
        this.containerAlbum?.resize(scaleBy())
        // this.containerPlay?.setPosition(this.width + this.width / 2, this.height / 2).setScale(scaleBy());
        // this.containerSettings?.setPosition(this.width / 2, this.height / 2 + this.height).setScale(scaleBy());
        // this.containerCode?.setPosition(this.width * 1.5, this.height / 2).setScale(scaleBy());
        // this.containerAlbum?.setPosition(0, 0).setScale(scaleBy());
    }


    update() {
    }
}

export const scaleBy = (isBackground: boolean = false) => {
    const gameObjectScaler = {
        x: window.innerWidth / 1920,
        y: window.innerHeight / 1080,
    };
    if (window.innerWidth > 1920 && !isBackground) {
        return (
            gameObjectScaler.x > gameObjectScaler.y
                ? gameObjectScaler.y
                : gameObjectScaler.x
        )
    } else {
        return (
            gameObjectScaler.x < gameObjectScaler.y
                ? gameObjectScaler.y
                : gameObjectScaler.x
        )
    }
}

export default MenuScene;
