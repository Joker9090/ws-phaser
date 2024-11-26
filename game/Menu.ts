import Phaser from "phaser";
import ContainerCredits from "./containersMenu/containerCredits";
import containerInitial from "./containersMenu/containerInitial";
import containerPlay from "./containersMenu/containerPlay";

class MenuScene extends Phaser.Scene {
    width: number = window.innerWidth;
    height: number = window.innerHeight;
    containerInitial?: Phaser.GameObjects.Container;
    centralPointInitial: { x: number, y: number } = { x: this.width / 2, y: this.height / 2 };

    containerCredits?: Phaser.GameObjects.Container;
    centralPointCredits: { x: number, y: number } = { x: this.width / 2 - this.width, y: this.height / 2 };

    containerPlay?: Phaser.GameObjects.Container;
    centralPointPlay: { x: number, y: number } = { x: this.width / 2 + this.width, y: this.height / 2 };
    background?: Phaser.GameObjects.Image;

    constructor() {
        super({ key: "MenuScene" });
        console.log(this, "THIS")
    }

    create() {
        this.background = this.add.image(window.innerWidth / 2 , window.innerHeight / 2, "menuBackground").setOrigin(0.5, 0.5)
        // set viewport and camera position
        this.cameras.main.setViewport(-this.width, 0, this.width * 3, this.height)
        this.cameras.main.centerOn(this.centralPointInitial.x, this.centralPointInitial.y)

        this.containerInitial = new containerInitial(this, {
            x: 0,
            y: 0,
            panToCredits: this.centralPointCredits,
            panToPlay: this.centralPointPlay
        })

        // create credits container
        this.containerCredits = new ContainerCredits(this, {
            x: -this.width,
            y: 0,
            panToInitial: this.centralPointInitial
        })

        // create credits container
        this.containerPlay = new containerPlay(this, {
            x: this.width,
            y: 0,
            panToInitial: this.centralPointInitial
        })

        // const rectInitial = this.add.rectangle(0, 0, this.width, this.height, 0xff0000, 0.5)
        // const rectCredits = this.add.rectangle(0, 0, this.width, this.height, 0x00ff00, 0.5)
        // const rectPlay = this.add.rectangle(0, 0, this.width, this.height, 0x0000ff, 0.5)
        // // when i click on rect center de camera in the other container
        // rectInitial.setInteractive().on('pointerdown', () => {
        //     this.cameras.main.pan(this.centralPointCredits[0], this.centralPointCredits[1], 1000, 'Expo', true)
        // })
        // rectCredits.setInteractive().on('pointerdown', () => {
        //     this.cameras.main.pan(this.centralPointInitial[0], this.centralPointInitial[1], 1000, 'Expo', true)
        // })
        // rectPlay.setInteractive().on('pointerdown', () => {
        //     this.cameras.main.pan(this.centralPointInitial[0], this.centralPointInitial[1], 1000, 'Expo', true)
        // })
        // this.containerInitial.add(rectInitial)
        // this.containerCredits.add(rectCredits)
        // this.containerPlay.add(rectPlay)

        this.events.removeAllListeners('shutdown')
    }

    update() {
    }
}

export default MenuScene;
