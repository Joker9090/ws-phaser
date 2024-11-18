import Phaser from "phaser";
import { ContainerMenuConfigType } from "../Types";

class containerInitial extends Phaser.GameObjects.Container {

    width: number = window.innerWidth;
    height: number = window.innerHeight;
    creditsButton: Phaser.GameObjects.Image;
    gameTitle: Phaser.GameObjects.Image;
    logoNoswar: Phaser.GameObjects.Image;
    playButton: Phaser.GameObjects.Image;
    scoreButton: Phaser.GameObjects.Image;
    settingsButton: Phaser.GameObjects.Image;

    constructor(scene: Phaser.Scene, config: ContainerMenuConfigType) {
        super(scene, config.x, config.y)

        const offsetY = 100
        this.playButton = scene.add.image(this.width/2, this.height/2 + offsetY, "playButton")
        this.playButton.setInteractive().on('pointerdown', () => {
            if(config.panToPlay){
                this.scene.cameras.main.pan(config.panToPlay.x, config.panToPlay.y, 1000, 'Expo', true)
            }
        })
        console.log(this.playButton.width, this.playButton.height, "PLAY BUTTON")
        this.creditsButton = scene.add.image(0, 0, "creditsButton")
        this.creditsButton.setPosition(this.width/2, this.playButton.y + this.creditsButton.height + this.playButton.height/2 + offsetY)
        this.creditsButton.setInteractive().on('pointerdown', () => {
            if(config.panToCredits){
                this.scene.cameras.main.pan(config.panToCredits.x, config.panToCredits.y, 1000, 'Expo', true)
            }
        })
        
        this.gameTitle = scene.add.image(0, 0, "gameTitle")
        this.gameTitle.setPosition(this.width/2, (this.playButton.y - this.playButton.height/2)/2)

        this.scoreButton = scene.add.image(0, 0, "scoreButton")
        this.scoreButton.setPosition(this.scoreButton.width, this.scoreButton.height)

        this.settingsButton = scene.add.image(0, 0, "settingsButton")
        this.settingsButton.setPosition(this.width - this.settingsButton.width, this.settingsButton.height).setScrollFactor(1)

        this.logoNoswar = scene.add.image(0, 0, "logoNoswar")
        this.logoNoswar.setPosition(this.width - this.logoNoswar.width, this.height - this.logoNoswar.height)

        const arr = [
            this.creditsButton, 
            this.gameTitle, 
            this.playButton, 
            this.scoreButton, 
            this.settingsButton, 
            this.logoNoswar
        ]

        this.add(arr)
        scene.add.existing(this)
    }
}
export default containerInitial;