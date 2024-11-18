import Phaser from "phaser";
import { ContainerMenuConfigType } from "../Types";

class containerPlay extends Phaser.GameObjects.Container {

    width: number = window.innerWidth;
    height: number = window.innerHeight;
    gameTitle: Phaser.GameObjects.Image;
    newGameButton: Phaser.GameObjects.Image;
    enterCodeButton: Phaser.GameObjects.Image;
    backButton: Phaser.GameObjects.Image;

    constructor(scene: Phaser.Scene, config: ContainerMenuConfigType) {
        super(scene, config.x, config.y)

        const offsetY = 100
        this.newGameButton = scene.add.image(this.width/2, this.height/2 + offsetY, "newGameButton")
        this.newGameButton.setInteractive().on('pointerdown', () => {
            if(config.panToPlay){
                this.scene.cameras.main.pan(config.panToPlay.x, config.panToPlay.y, 1000, 'Expo', true)
            }
        })
        this.enterCodeButton = scene.add.image(0, 0, "enterCodeButton")
        this.enterCodeButton.setPosition(this.width/2, this.newGameButton.y + this.enterCodeButton.height + this.newGameButton.height/2)
        this.enterCodeButton.setInteractive().on('pointerdown', () => {
            console.log("ENTER CODE")
        })
        
        this.gameTitle = scene.add.image(0, 0, "gameTitle")
        this.gameTitle.setPosition(this.width/2, (this.newGameButton.y - this.newGameButton.height/2)/2)

        this.backButton = scene.add.image(0, 0, "backButton").setRotation(Math.PI)
        this.backButton.setPosition(this.backButton.width, this.height - this.backButton.height)
        this.backButton.setInteractive().on('pointerdown', () => {
            if(config.panToInitial){
                this.scene.cameras.main.pan(config.panToInitial.x, config.panToInitial.y, 1000, 'Expo', true)
            }
        })


        const arr = [
            this.enterCodeButton, 
            this.gameTitle, 
            this.newGameButton, 
            this.backButton, 
        ]

        this.add(arr)
        scene.add.existing(this)
    }
}
export default containerPlay;