import Phaser from "phaser";
import { text } from "stream/consumers";

// Scene in class
class DialogueManager {
    scene: Phaser.Scene
    texts: string[]

    holder?: Phaser.GameObjects.Graphics;
    screenHeigth: number = window.innerHeight;
    screenWidth: number = window.innerWidth;
    borderRounder: number = 50;
    textDisplayed?: Phaser.GameObjects.Text;
    continueText?: Phaser.GameObjects.Text;
    container?: Phaser.GameObjects.Container;
    tweenContinue?: Phaser.Tweens.Tween;
    textCounter: number = 0;
    textCounterMax?: number;
    canChangeText: boolean = false;


    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    constructor(scene: Phaser.Scene, texts: string[]) {
        this.scene = scene
        this.textCounter = 0;
        this.cursors = this.scene.input.keyboard?.createCursorKeys();
        this.texts = [
            "Emergency log entry number 325… (sigh)",
            "It’s been over 45 days since the incident. I still haven’t heard from Dan or the rest of the crew…",
            "I hope they were able to escape in time. (pause) It seems like I’m alone in this forgotten corner of the galaxy…",
        ]

        this.textCounterMax = this.texts.length
        
        
        this.container = this.scene.add.container().setSize(this.screenWidth * 0.8, this.screenHeigth * 0.15)
        this.container.setPosition(this.screenWidth * 0.2 / 2, this.screenHeigth * 0.8)
        this.holder = this.scene.add.graphics()
        this.holder.fillStyle(0xffffff, 1);
        this.holder.fillRoundedRect(0, 0, this.screenWidth * 0.8, this.screenHeigth / 9, this.borderRounder)
        this.textDisplayed = this.scene.add.text(40, 40, "", {
            color: "black",
            wordWrap: {
                width: this.screenWidth * 0.8 - 40
            }
        })
        this.continueText = this.scene.add.text(this.container.width / 2, 80, "Press SPACE to continue", {
            color: "black",
        }).setVisible(false).setOrigin(0.5)
        this.tweenContinue = this.scene.tweens.add({
            targets: this.continueText,
            alpha: 1,
            loop: -1,
            duration: 5000,
            ease: 'Linear',
        });
        this.container.add([
            this.holder,
            this.textDisplayed,
            this.continueText
        ])
        this.textBuilder(this.texts[this.textCounter], 100)
}
    
    continueWithNextText () {
        if (this.textCounterMax){
            console.log("ARIEL COUNTERS", this.textCounter, this.textCounterMax)
            if (this.textCounter < this.textCounterMax){
                console.log("next")
                this.canChangeText = false
                this.textDisplayed?.setText("")
                this.continueText?.setVisible(false)
                this.textBuilder(this.texts[this.textCounter], 100)
            } else {
                console.log("destroy")
                this.container?.destroy()
            }
        } 
    }

    update(){
        if (this.canChangeText){
            if (this.cursors) {
                if (this.cursors.space.isDown) {
                  this.continueWithNextText()
                }
              }
        }
    }

    nextText() {
        this.continueText?.setVisible(true)
        this.textCounter += 1
        this.canChangeText = true

    }
    
    textBuilder(text: string, deltaTime: number = 100) {
        const letters = text.split("")
        if (this.textDisplayed) {
            this.showText(this.textDisplayed, letters, 0, deltaTime, this.showText, this.nextText.bind(this))
        }
    }

    showText(target: Phaser.GameObjects.Text, message: string[], index: number = 0, interval: number, callBack: Function, onFinish: Function) {
        if (index < message.length) {
            const self = this
            target.setText(target.text + message[index])
            setTimeout(() => {
                index++
                callBack.bind(self)(target, message, index, interval, callBack, onFinish)
            }, interval);
        } else {
            onFinish()
        }
    }
}


export default DialogueManager;
