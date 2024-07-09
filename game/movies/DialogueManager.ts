import Phaser from "phaser";
import { text } from "stream/consumers";

// Scene in class
class DialogueManager extends Phaser.Scene {
    holder?: Phaser.GameObjects.Graphics;
    screenHeigth: number = window.innerHeight;
    screenWidth: number = window.innerWidth;
    borderRounder: number = 50;
    textDisplayed?: Phaser.GameObjects.Text;
    continueText?: Phaser.GameObjects.Text;
    container?: Phaser.GameObjects.Container;
    tweenContinue?: Phaser.Tweens.Tween;

    constructor() {
        super({ key: "DialogueManager" });

    }


    create() {
        // funcionalidades que faltan: capacidad de pausa, apretar space para next text, 
        const jsonMock = {
            first: ["Emergency ", "log ", "entry ", "number ", "325… ", "(sigh)"],
            second: ["It’s ", "been ", "over ", "45 ", "days ", "since ", "the ", "incident. ", "I ", "still ", "haven’t ", "heard ", "from ", "Dan ", "or ", "the ", "rest ", "of ", "the ", "crew…"],
            third: ["I ", "hope ", "they ", "were ", "able ", "to ", "escape ", "in ", "time. ", "(pause) ", "It ", "seems ", "like ", "I’m ", "alone ", "in ", "this ", "forgotten ", "corner ", "of ", "the ", "galaxy…"],
        }
        this.container = this.add.container().setSize(this.screenWidth * 0.8, this.screenHeigth * 0.15)
        this.container.setPosition(this.screenWidth * 0.2 / 2, this.screenHeigth * 0.8)
        this.holder = this.add.graphics()
        this.holder.fillStyle(0xffffff, 1);
        this.holder.fillRoundedRect(0, 0, this.screenWidth * 0.8, this.screenHeigth / 9, this.borderRounder)
        this.textDisplayed = this.add.text(40, 40, "", {
            color: "black"
        })
        this.continueText = this.add.text(this.container.width / 2, 80, "Press SPACE to continue", {
            color: "black"
        }).setVisible(false).setOrigin(0.5).setAlpha(0)
        this.tweenContinue = this.tweens.add({
            targets: this.continueText,
            alpha: 1,
            loop: -1,
            duration: 5000,
            ease: 'Linear',
            pause: true
        });
        this.container.add([
            this.holder,
            this.textDisplayed,
            this.continueText
        ])
        this.textBuilder(jsonMock.first, 100)
    }

    nextText() {
        this.continueText?.setVisible(true)
        this.tweenContinue?.play()
    }
    
    textBuilder(text: string[], deltaTime: number = 100) {
        const letters = text.map((e: string) => e.split("")).flat(1)
        if (this.textDisplayed) {
            this.showText(this.textDisplayed, letters, 0, deltaTime, this.showText, this.nextText)
        }
    }

    showText(target: Phaser.GameObjects.Text, message: string[], index: number = 0, interval: number, callBack: Function, onFinish: Function) {
        if (index < message.length) {
            const self = this
            target.setText(target.text + message[index])
            console.log(target.text)
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
