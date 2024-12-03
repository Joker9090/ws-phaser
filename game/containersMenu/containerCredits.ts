import Phaser from "phaser";
import { ContainerMenuConfigType } from "../Types";



class ContainerCredits extends Phaser.GameObjects.Container {

    width: number = window.innerWidth;
    height: number = window.innerHeight;
    backButton: Phaser.GameObjects.Image;
    credits_barto: Phaser.GameObjects.Image;
    credits_clari: Phaser.GameObjects.Image;
    credits_hache: Phaser.GameObjects.Image;
    credits_jeimi: Phaser.GameObjects.Image;
    credits_joaco: Phaser.GameObjects.Image;
    credits_lu: Phaser.GameObjects.Image;
    credits_mai: Phaser.GameObjects.Image;
    credits_nano: Phaser.GameObjects.Image;
    creditsTitle: Phaser.GameObjects.Image;


    constructor(scene: Phaser.Scene, config: ContainerMenuConfigType) {
        super(scene, config.x, config.y)

        this.backButton = scene.add.image(0, 0, "backButton")
        this.credits_barto = scene.add.image(0, 0, "credits_barto").setAlpha(0.5)
        this.credits_clari = scene.add.image(0, 0, "credits_clari").setAlpha(0.5)
        this.credits_hache = scene.add.image(0, 0, "credits_hache").setAlpha(0.5)
        this.credits_jeimi = scene.add.image(0, 0, "credits_jeimi").setAlpha(0.5)
        this.credits_joaco = scene.add.image(0, 0, "credits_joaco").setAlpha(0.5)
        this.credits_lu = scene.add.image(0, 0, "credits_lu").setAlpha(0.5)
        this.credits_mai = scene.add.image(0, 0, "credits_mai").setAlpha(0.5)
        this.credits_nano = scene.add.image(0, 0, "credits_nano").setAlpha(0.5)
        this.creditsTitle = scene.add.image(0, 0, "creditsTitle").setAlpha(1)

        const creditsArray = [
            this.credits_lu,
            this.credits_hache,
            this.credits_barto,
            this.credits_nano,
            this.credits_jeimi,
            this.credits_mai,
            this.credits_joaco,
            this.credits_clari,
        ]
        this.setPositionCredits(creditsArray)
        this.handleInteractive(creditsArray)

        const creditsPosY = (this.credits_nano.y - this.creditsTitle.height) / 2
        this.add(creditsArray.concat([this.backButton, this.creditsTitle]))

        this.creditsTitle.setPosition(this.width / 2, creditsPosY).setOrigin(0.5, 0)
        this.backButton.setPosition(this.width - this.backButton.width, this.height - this.backButton.height)
        this.backButton.setInteractive().on('pointerdown', () => {
            this.backButton.setTexture('backButtonPressed')
        })
        this.backButton.setInteractive().on('pointerup', () => {
            this.backButton.setTexture('backButtonHover')
            if (config.panToInitial) {
                this.scene.cameras.main.pan(config.panToInitial.x, config.panToInitial.y, 1000, 'Expo', true)
            }
        })
        this.backButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, ()=>{
            this.backButton.setTexture('backButtonHover')
        }) 
        this.backButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, ()=>{
            this.backButton.setTexture('backButton')
        })

        scene.add.existing(this)
    }

    setPositionCredits(arr: Phaser.GameObjects.Image[]) {
        const width = arr[0].width
        const height = arr[0].height
        let firstPosX = 0
        let firstPosY = 0
        let paddingX = (this.width - 4 * width) / 5
        let paddingY = (this.height - 2 * height) / 3
        const maxPaddingX = 80
        const maxPaddingY = 80
        if (paddingX > maxPaddingX) {
            paddingX = maxPaddingX
            firstPosX = (this.width - paddingX * 3 - 4 * width) / 2
        }
        if (paddingY > maxPaddingY) {
            paddingY = maxPaddingY
            firstPosY = (this.height - paddingY - 2 * height) / 2
        }

        arr.forEach((element: Phaser.GameObjects.Image, index: number) => {
            element.setOrigin(0)
            if (index < 4) {
                element.setPosition(firstPosX + index * (width + paddingX), firstPosY)
            } else {
                element.setPosition(firstPosX + (index - 4) * (width + paddingX), firstPosY + height + paddingY)
            }
        })
    }

    handleInteractive(arr: Phaser.GameObjects.Image[]) {
        arr.forEach((element: Phaser.GameObjects.Image) => {
            element.setInteractive()
            element.on('pointerover', () => {
                element.setAlpha(1)
            })
            element.on('pointerout', () => {
                element.setAlpha(0.5)
            })
            element.on('shutdown', () => {
                element.off('pointerover')
                element.off('pointerout')
            })
        })
    }


}
export default ContainerCredits;