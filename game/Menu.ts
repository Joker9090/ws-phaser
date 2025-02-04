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
    containerInitial?: Phaser.GameObjects.Container;
    centralPointInitial: { x: number, y: number } = { x: this.width / 2, y: this.height / 2 };

    containerCredits?: Phaser.GameObjects.Container;
    centralPointCredits: { x: number, y: number } = { x: this.width / 2 - this.width, y: this.height / 2 };

    containerPlay?: Phaser.GameObjects.Container;
    centralPointPlay: { x: number, y: number } = { x: this.width / 2 + this.width, y: this.height / 2 };

    containerSettings?: containerSettings;
    centralPointSettings: { x: number, y: number } = { x: this.width / 2, y: this.height / 2 + this.height };

    containerCode?: Phaser.GameObjects.Container;
    centralPointCode: { x: number, y: number } = { x: this.width / 2 + this.width * 2, y: this.height / 2 }

    containerAlbum?: Phaser.GameObjects.Container;
    containerAlbumRendered: boolean = false;

    background?: Phaser.GameObjects.Image;
    masterManagerScene?: MasterManager;
    constructor() {
        super({ key: "MenuScene" });
    }


    create() {
        this.background = this.add.image(window.innerWidth / 2, window.innerHeight / 2, "menuBackground").setOrigin(0.5, 0.5)
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
    // createAlbumContainer() {
    //     if (this.containerAlbum) {
    //         this.destroyContainer(this.containerAlbum)
    //     }
    //     this.containerAlbum = new containerAlbum(this, {
    //         x: 0,
    //         y: 0,
    //         panToInitial: this.centralPointInitial,
    //         panToCode: this.centralPointCode,
    //         changeContainer: () => {
    //             if (this.containerAlbum && this.containerInitial) {
    //                 this.changeContainer(this.containerAlbum, this.containerInitial)
    //             }
    //         }
    //     })
    //     this.containerAlbum.setScale(scaleBy());
    // }

    destroyContainer(container: Phaser.GameObjects.Container) {
        container.removeAll(true)
        container.destroy()
    }

    changeContainer(from: Phaser.GameObjects.Container, to: Phaser.GameObjects.Container) {
        const circle = from.scene.add.circle(window.innerWidth, window.innerHeight, 1, 0x000, 1)
        circle.setInteractive()
        const diagonal = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);
        const finalScale = diagonal / (circle.radius * 2)
        from.scene.tweens.add({
            targets: circle,
            scale: finalScale * 2,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                from.setVisible(false)
                to.setVisible(true)
                if(to instanceof containerAlbum && !this.containerAlbumRendered){
                    // Este delay controla cuanto tardan en aparecer las figuritas
                    this.time.delayedCall(900, () => {
                        to.updateElements()
                    })
                    this.containerAlbumRendered = true
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
            }
        });
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
