import Phaser from "phaser";
import { ContainerMenuConfigType } from "../Types";
import MultiScene from "../MultiScene";
import MenuScene from "../Menu";
import MasterManager from "../MasterManager";

class containerPlay extends Phaser.GameObjects.Container {

    width: number = window.innerWidth;
    height: number = window.innerHeight;
    gameTitle: Phaser.GameObjects.Image;
    newGameButton: Phaser.GameObjects.Image;
    enterCodeButton: Phaser.GameObjects.Image;
    backButton: Phaser.GameObjects.Image;
    masterManager: MasterManager

    constructor(scene: Phaser.Scene, config: ContainerMenuConfigType) {
        super(scene, config.x, config.y)
        let masterManagerScene = scene.game.scene.getScene("MasterManager") as MasterManager;
        if (!masterManagerScene) {
            this.masterManager = new MasterManager();
            this.scene.scene.add("MasterManager", this.masterManager, true);
        } else {
            this.masterManager = masterManagerScene;
            // this.scene.scene.launch("MasterManager");
        }
        const offsetY = 100
        this.newGameButton = scene.add.image(0, offsetY, "newGameButton")
        this.newGameButton.setInteractive().on('pointerdown', () => {
            this.newGameButton.setTexture('newGameButtonPressed')
        })
        this.newGameButton.on('pointerup',()=>{
            this.masterManager.playSound('buttonSound', false)
            this.masterManager.stopMusic()
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
        this.enterCodeButton.setPosition(0, this.newGameButton.y + this.enterCodeButton.height + this.newGameButton.height/2)
        this.enterCodeButton.setInteractive().on('pointerdown', () => {
            this.enterCodeButton.setTexture('enterCodeButtonPressed')
         
        })
        this.enterCodeButton.on('pointerup',()=>{
            this.enterCodeButton.setTexture('enterCodeButtonHover')
            if (config.changeContainer) {
                config.changeContainer();
                this.masterManager.playSound('buttonSound', false)

            }
        })
        this.enterCodeButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,()=>{
            this.enterCodeButton.setTexture('enterCodeButtonHover')
        })
        this.enterCodeButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
            this.enterCodeButton.setTexture('enterCodeButton')
        })
        
        this.gameTitle = scene.add.image(0, 0, "gameTitle")
        this.gameTitle.setPosition(0, -200)

        this.backButton = scene.add.image(0, 0, "playBackButton")
        const width = this.backButton.width
        const height = this.backButton.height
        this.backButton.setPosition(this.width + width, this.height - height)
        // this.backButton.set
        this.backButton.setInteractive().on('pointerdown', () => {
            this.backButton.setTexture('playBackButtonPressed')
        })
        this.backButton.on('pointerup',()=>{
            this.backButton.setTexture('playBackButton')
            this.masterManager.playSound('buttonSound', false)
            this.setVisible(false)
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
            // this.backButton, 
        ]

        this.add(arr)
        // Phaser.Actions.RotateAroundDistance([this], {config}, Math.PI/200, 250);
        scene.add.existing(this)
        scene.add.existing(this.backButton)
        this.resize(scaleBy())
    }

    resize(newValue: number) {
        this?.setScale(newValue);
        console.log("ContainerCredits resize", newValue)
        this.backButton.setScale(newValue);
        // this.backButton.setPosition(this.backButton.width * newValue , this.backButton.height * newValue)
      
    }
}
export default containerPlay;


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