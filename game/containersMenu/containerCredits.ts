import Phaser from "phaser";
import { ContainerMenuConfigType } from "../Types";
import MasterManager from "../MasterManager";
import MenuScene from "../Menu";



class ContainerCredits extends Phaser.GameObjects.Container {

    width: number = window.innerWidth;
    height: number = window.innerHeight;
    backButton: Phaser.GameObjects.Image;
    // credits_barto: Phaser.GameObjects.Image;
    credits_clari: Phaser.GameObjects.Image;
    credits_hache: Phaser.GameObjects.Image;
    credits_jeimi: Phaser.GameObjects.Image;
    credits_joaco: Phaser.GameObjects.Image;
    credits_lu: Phaser.GameObjects.Image;
    // credits_mai: Phaser.GameObjects.Image;
    credits_nano: Phaser.GameObjects.Image;
    credits_rama: Phaser.GameObjects.Image;
    credits_colo: Phaser.GameObjects.Image;
    credits_juampi: Phaser.GameObjects.Image;
    creditsTitle: Phaser.GameObjects.Image;
    masterManager: MasterManager


    constructor(scene: MenuScene, config: ContainerMenuConfigType) {
        super(scene, config.x, config.y)
        // this.setSize(1920,1080)
        this.backButton = scene.add.image(0, 0, "backButton")
        // this.credits_barto = scene.add.image(0, 0, "credits_barto").setAlpha(0.5).setScale(0)
        this.credits_clari = scene.add.image(0, 0, "credits_clari").setAlpha(0.5).setScale(0)
        this.credits_hache = scene.add.image(0, 0, "credits_hache").setAlpha(0.5).setScale(0)
        this.credits_jeimi = scene.add.image(0, 0, "credits_jeimi").setAlpha(0.5).setScale(0)
        this.credits_joaco = scene.add.image(0, 0, "credits_joaco").setAlpha(0.5).setScale(0)
        this.credits_lu = scene.add.image(0, 0, "credits_lu").setAlpha(0.5).setScale(0)
        // this.credits_mai = scene.add.image(0, 0, "credits_mai").setAlpha(0.5).setScale(0)
        this.credits_nano = scene.add.image(0, 0, "credits_nano").setAlpha(0.5).setScale(0)
        this.credits_rama = scene.add.image(0, 0, "credits_rama").setAlpha(0.5).setScale(0)
        this.credits_colo = scene.add.image(0, 0, "credits_colo").setAlpha(0.5).setScale(0)
        this.credits_juampi = scene.add.image(0, 0, "credits_juampi").setAlpha(0.5).setScale(0)
        this.creditsTitle = scene.add.image(0, -this.height/2, "creditsTitle").setAlpha(1)
       
        
          let masterManagerScene = scene.game.scene.getScene("MasterManager") as MasterManager;
                if (!masterManagerScene) {
                    this.masterManager = new MasterManager();
                    this.scene.scene.add("MasterManager", this.masterManager, true);
                } else {
                    this.masterManager = masterManagerScene;
                    // this.scene.scene.launch("MasterManager");
                }

        const creditsArray = [
            this.credits_lu,
            this.credits_hache,
            // this.credits_barto,
            this.credits_nano,
            this.credits_jeimi,
            // this.credits_mai,
            this.credits_joaco,
            this.credits_clari,
            this.credits_rama,
            this.credits_colo,
            this.credits_juampi
        ]
        this.setPositionCredits(creditsArray)
        this.handleInteractive(creditsArray)

        for (let i = 0; i < creditsArray.length; i++) {
           const delay =  Math.random() * 1000
           creditsArray[i].setAlpha(0)
           this.scene.tweens.add({
               targets: creditsArray[i],
               scale: 1,
               alpha: 0.9,
               duration: 700,
               ease: 'Power2',
               delay: delay,
           })
        }
        console.log("ARIEL TRANSFORM MATRIX", creditsArray[0].getLocalTransformMatrix())

        this.creditsTitle.setAlpha(0)
        this.creditsTitle.setPosition(this.creditsTitle.x, 0)
        this.scene.tweens.add({
            targets: this.creditsTitle,
            alpha: 1,
            duration: 1000,
            ease: 'Power2',
            delay: 1000
        })
        // this.backButton.setPosition(this.width / 2, -this.height / 2 + this.backButton.height / 2 + 32)
        this.backButton.setPosition(this.width / 2 + 75, this.height / 2 - this.backButton.height / 2 - 32)
        this.backButton.setInteractive().on('pointerdown', () => {
            this.backButton.setTexture('backButtonPressed')
        })
        this.backButton.setInteractive().on('pointerup', () => {
            this.backButton.setTexture('backButtonHover')
            this.scene.time.delayedCall(1000, () => {
                scene.destroyContainer(this)
            }, [], this.scene)
            if (config.panToInitial) {
                this.scene.cameras.main.pan(config.panToInitial.x, config.panToInitial.y, 1000, 'Expo', true)
                this.masterManager.playSound('buttonSound', false)
            }
        })
        this.backButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            this.backButton.setTexture('backButtonHover')
        })
        this.backButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            this.backButton.setTexture('backButton')
        })
        
        this.add(creditsArray.concat([this.backButton, this.creditsTitle]))
        scene.add.existing(this)
    }

    setPositionCredits(arr: Phaser.GameObjects.Image[]) {
        const width = arr[0].width
        const height = arr[0].height
        const maxPaddingX = 50
        const maxPaddingY = 65
        let firstPosX = -(width + maxPaddingX) * 2
        let firstPosY = -(height + maxPaddingY )* .475
        // let paddingX = (this.width - 4 * width) / 5
        // let paddingY = (this.height - 2 * height) / 3
        // firstPosX = (this.width - maxPaddingX * 3 - 4 * width) / 2
        // firstPosY = (this.height - paddingY - 2 * height) / 2
        arr.forEach((element: Phaser.GameObjects.Image, index: number) => {
            if (index < 5) {
                element.setPosition(firstPosX + index * (width + maxPaddingX), firstPosY)
            } else {
                element.setPosition(firstPosX + (index - 4.5) * (width + maxPaddingX), firstPosY + height + maxPaddingY)
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