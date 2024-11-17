import Phaser from "phaser";

class MenuScene extends Phaser.Scene {
    width: number = window.innerWidth;
    height: number = window.innerHeight;
    containerInitial?: Phaser.GameObjects.Container;
    centralPointInitial: number[] = [this.width / 2, this.height / 2];
    containerCredits?: Phaser.GameObjects.Container;
    centralPointCredits: number[] = [this.width / 2 - this.width, this.height / 2];
    containerPlay?: Phaser.GameObjects.Container;
    centralPointPlay: number[] = [this.width / 2 + this.width, this.height / 2];


    constructor() {
        super({ key: "MenuScene" });
        console.log(this, "THIS")
    }
    
    create() {
        this.cameras.main.setViewport(-this.width, 0, this.width * 3, this.height)
        this.containerInitial = this.add.container(this.centralPointInitial[0], this.centralPointInitial[1])
        this.containerCredits = this.add.container(this.centralPointCredits[0], this.centralPointCredits[1])
        this.containerPlay = this.add.container(this.centralPointPlay[0], this.centralPointPlay[1])
        const rectInitial = this.add.rectangle(0, 0, this.width, this.height, 0xff0000, 0.5)
        const rectCredits = this.add.rectangle(0, 0, this.width, this.height, 0x00ff00, 0.5)
        const rectPlay = this.add.rectangle(0, 0, this.width, this.height, 0x0000ff, 0.5)
        // when i click on rect center de camera in the other container
        rectInitial.setInteractive().on('pointerdown', () => {
            this.cameras.main.pan(this.centralPointCredits[0], this.centralPointCredits[1], 1000, 'Expo', true)
        })
        rectCredits.setInteractive().on('pointerdown', () => {
            this.cameras.main.pan(this.centralPointPlay[0], this.centralPointPlay[1], 1000, 'Expo', true)
        })
        rectPlay.setInteractive().on('pointerdown', () => {
            this.cameras.main.pan(this.centralPointInitial[0], this.centralPointInitial[1], 1000, 'Expo', true)
        })
        this.containerInitial.add(rectInitial)
        this.containerCredits.add(rectCredits)
        this.containerPlay.add(rectPlay)
        
    }

    update() {
    }
}

export default MenuScene;
