import Phaser from "phaser";
import ContainerCredits from "./containersMenu/containerCredits";
import containerInitial from "./containersMenu/containerInitial";
import containerPlay from "./containersMenu/containerPlay";
import containerSettings from "./containersMenu/containerSettings";
import containerCode from "./containersMenu/containerCode";

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
    background?: Phaser.GameObjects.Image;

    constructor() {
        super({ key: "MenuScene" });
        console.log(this, "THIS")
    }


    create() {
        this.background = this.add.image(window.innerWidth / 2, window.innerHeight / 2, "menuBackground").setOrigin(0.5, 0.5)

        // set viewport and camera position
        this.cameras.main.setViewport(-this.width, 0, this.width * 3, this.height)
        this.cameras.main.centerOn(this.centralPointInitial.x, this.centralPointInitial.y)


        const gameObjectScaler = {
            x: window.innerWidth / 1920,
            y: window.innerHeight / 1080,
        };

        const scaleBy = () => {
            if (window.innerWidth > 1920) {
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

        this.containerInitial = new containerInitial(this, {
            x: 0,
            y: 0,
            panToCredits: this.centralPointCredits,
            panToPlay: this.centralPointPlay,
            panToSettings: this.centralPointSettings,
        })
        this.containerCredits = new ContainerCredits(this, {
            x: -this.width / 2,
            y: this.height / 2,
            panToInitial: this.centralPointInitial
        })
        this.containerCredits.setScale(scaleBy());

        this.containerPlay = new containerPlay(this, {
            x: this.width,
            y: 0,
            panToInitial: this.centralPointInitial,
            panToCode: this.centralPointCode
        })

        this.containerSettings = new containerSettings(this, {
            x: this.width / 2,
            y: this.height / 2,
            panToInitial: this.centralPointInitial
        }).setVisible(false)
        this.containerSettings.settingsModal.setScale(scaleBy());

        this.containerCode = new containerCode(this, {
            x: this.width*1.5,
            y: this.height / 2,
            panToInitial: this.centralPointInitial
        }).setVisible(false)
        this.containerCode.setScale(scaleBy())

        this.events.removeAllListeners('shutdown')
    }

    update() {
    }
}

export default MenuScene;
