import Phaser from "phaser";
import { ContainerMenuConfigType } from "../Types";
import MultiScene from "../MultiScene";
import MenuScene from "../Menu";

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
            this.newGameButton.setTexture('newGameButtonPressed')
        })
        this.newGameButton.on('pointerup',()=>{
            this.scene.sound.play('buttonSound')
            this.newGameButton.setTexture('newGameButtonHover')
            const multiScene = new MultiScene("CinematographyMod", { keyname: 'cine_intro_1',  loadKey: ["Cinemato0"] });
            const scene = this.scene.scene.add("MultiScene", multiScene, true);
            this.scene.scene.start("MultiScene").bringToTop("MultiScene");
        })
        this.newGameButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,()=>{
            this.newGameButton.setTexture('newGameButtonHover')
        })
        this.newGameButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
            this.newGameButton.setTexture('newGameButton')
        })

        this.enterCodeButton = scene.add.image(0, 0, "enterCodeButton")
        this.enterCodeButton.setPosition(this.width/2, this.newGameButton.y + this.enterCodeButton.height + this.newGameButton.height/2)
        this.enterCodeButton.setInteractive().on('pointerdown', () => {
            this.enterCodeButton.setTexture('enterCodeButtonPressed')
         
        })
        this.enterCodeButton.on('pointerup',()=>{
            this.enterCodeButton.setTexture('enterCodeButtonHover')
            if (config.changeContainer) {
                config.changeContainer();
                this.scene.sound.play('buttonSound')

            }
        })
        this.enterCodeButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,()=>{
            this.enterCodeButton.setTexture('enterCodeButtonHover')
        })
        this.enterCodeButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
            this.enterCodeButton.setTexture('enterCodeButton')
        })
        
        this.gameTitle = scene.add.image(0, 0, "gameTitle")
        this.gameTitle.setPosition(this.width/2, (this.newGameButton.y - this.newGameButton.height/2)/2)

        this.backButton = scene.add.image(0, 0, "playBackButton")
        this.backButton.setPosition(this.backButton.width, this.height - this.backButton.height)
        this.backButton.setInteractive().on('pointerdown', () => {
            this.backButton.setTexture('playBackButtonPressed')
        })
        this.backButton.on('pointerup',()=>{
            this.backButton.setTexture('playBackButton')
            this.scene.sound.play('buttonSound')
            if (config.panToInitial) {
                this.scene.cameras.main.pan(config.panToInitial.x, config.panToInitial.y, 1000, 'Expo', true)
            }

        })
        this.backButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, ()=>{
            this.backButton.setTexture('playBackButtonHover')
        })
        this.backButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, ()=>{
            this.backButton.setTexture('playBackButton')
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