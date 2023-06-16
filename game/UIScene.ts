import Phaser from 'phaser';
import Tutorial from './maps/Tutorial'
import UI, { UIConfig } from "./assets/UI";
import TextBox from './assets/TextBox';
import Game from './Game';
import EventsCenter from './EventsCenter';


export default class UIScene extends Phaser.Scene {
    tutorialTextBox?: TextBox;
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    gameScene?: Game;
    UIRectangle1?: Phaser.GameObjects.Rectangle;
    UIRectangle2?: Phaser.GameObjects.Rectangle;
    TutorialMap?: Tutorial;
    lifesGroup?: Phaser.GameObjects.Group;
    gravityArrow?: Phaser.GameObjects.Image;
    coinUI?: Phaser.GameObjects.Image;
    UIboundsCoin: number = 0;
    UIboundsArrow: number = 0;
    UIboundsHeart: number = 0;
    ArrowOriginalPos?: number;
    CoinOriginalPos?: number;
    amountLifes?: number;
    timeLevel: number = 0;
    timerText?: Phaser.GameObjects.Text;
  

    constructor() {
        super({ key: 'UIScene' });

    };

    createUI(lifes: number) {
        let quantityLifes = 0
        let xpos = 0

        if (lifes) {
            for (let i = 0; i < lifes; i++) {
                quantityLifes += 1;
                xpos = 100 + i * 50;
                const lifeConfig: UIConfig = {
                    texture: "heart",
                    pos: { x: xpos, y: 50 },
                    scale: .1
                };
                const coras = new UI(this, lifeConfig, this.lifesGroup)
                    .setScrollFactor(0, 0);
                this.lifesGroup?.setDepth(100);
            };


            const coinConf: UIConfig = {
                texture: "coin",
                pos: { x: lifes * 50 + 150, y: 50 },
                scale: .1
            };
            this.CoinOriginalPos = (quantityLifes * 50 + 150)
            this.coinUI = new UI(this, coinConf)
                .setTint(Phaser.Display.Color.GetColor(0, 0, 0))
                .setScrollFactor(0, 0)
                .setDepth(100);

            const arrowConfig: UIConfig = {
                texture: "arrow",
                pos: { x: lifes * 50 + 250, y: 50 },
                scale: .1
            };
            this.ArrowOriginalPos = (quantityLifes * 50 + 250)
            this.gravityArrow = new UI(this, arrowConfig)
                .setRotation(Math.PI / 2)
                .setScrollFactor(0, 0)
                .setDepth(100);

        };
    };

    loseLife() {
        // Remove the object with the highest x position
        if (this.gameScene?.scene.isActive && this.lifesGroup) {
            console.log("entro")
            if (this.gameScene.lifes != 0) {
                let lifeToTheRight = null;
                let highestX = Number.NEGATIVE_INFINITY;
                for (let i = 0; i < this.lifesGroup.getLength(); i++) {
                    const child = (this.lifesGroup.getChildren()[i] as Phaser.GameObjects.Image);
                    if (child.x > highestX) {
                        lifeToTheRight = child;
                        highestX = child.x;
                    };
                };
                console.log("destruye vida")
                lifeToTheRight?.destroy()
            };
        }
    }

    rotateCamera() {

    };

    coinCollected() {
        this.coinUI?.clearTint()
    };

    create(this: UIScene, data: { level: number, lifes: number, scene: Game }) {
        this.gameScene = data.scene;
        this.createUI(data.lifes);
        this.amountLifes = data.lifes;
        this.lifesGroup = this.add.group()
        /* TIMER */
        this.timerText = this.add.text(this.cameras.main.width - 120, 50, 'Time: 0', { fontSize: '32px' }).setOrigin(.5, .5).setScrollFactor(0, 0).setDepth(100).setSize(50, 50);
        var timePassed = 0;
        var timerEvent = this.time.addEvent({
            delay: 1000,
            callback: () => {
                timePassed++;
                this.timerText?.setText('Time: ' + timePassed);
                this.timeLevel = timePassed;
            },
            callbackScope: this,
            loop: true
        });

        EventsCenter.on('die', () => this.loseLife(), this); //removes 1 heart
        EventsCenter.on('coinCollected', () => this.rotateCamera(), this); // clears tint in UI coin
        EventsCenter.on('rotateGravityArrow', () => this.loseLife(), this); //has to rotate up | down | left | right
        EventsCenter.on('rotateCamera', () => this.loseLife(), this);   //has to rotate all UI and shift it to the top of the screen once it has rotated
        EventsCenter.on('resetTimer', () => this.loseLife(), this);  //has to reset timer when you lose or go to next level
    };

    update() {
        /* FUNCTIONS TO BE REPLACED WITH EVENTS LISTENERS
        
        console.log(this.gameScene?.scene.isActive)
        if (this.timerText && this.gameScene?.cameraNormal) {
            this.timerText.setPosition(this.cameras.main.width - 120, 35);
        } else if (this.timerText && this.cameraNormal == false) {
            this.timerText.setPosition(120, this.cameraHeight - 50);
        };
        if (this.gameScene?.cameraNormal == false && this.gameScene) {
            if (this.lifesGroup) {
                for (let i = 0; i < this.lifesGroup.getChildren().length; i++) {
                    (this.lifesGroup?.getChildren()[i] as Phaser.GameObjects.Image).setRotation(Math.PI);
                };
            };
            if (this.gameScene.timerText) this.gameScene.timerText.setRotation(Math.PI);
        } else if (this.lifesGroup) {
            for (let i = 0; i < this.lifesGroup.getChildren().length; i++) {
                (this.lifesGroup?.getChildren()[i] as Phaser.GameObjects.Image).setRotation(0);
            };
            if (this.gameScene?.timerText) this.gameScene.timerText.setRotation(0);
        };
        if (this.gameScene) {
            if (this.gameScene.gravityDown == false) {
                this.gravityArrow?.setRotation(-Math.PI / 2)
            } else {
                this.gravityArrow?.setRotation(Math.PI / 2)
            };

            if (this.coinUI) {
                if (this.gameScene?.canWin || this.gameScene?.canNextLevel) {
                    this.coinUI?.clearTint();
                } else {
                    this.coinUI?.setTint().setTint(Phaser.Display.Color.GetColor(0, 0, 0));
                };
            };
            if (this.gameScene?.cameraNormal == false && this.gameScene) {
                if (this.amountLifes) this.lifesGroup?.setX(this.gameScene.cameraWidth - this.amountLifes * 50 - 50, 51);
                this.lifesGroup?.setY(this.gameScene.cameraHeight - this.UIboundsHeart, 0);
                if (this.amountLifes) this.gravityArrow?.setX(this.gameScene.cameraWidth - this.amountLifes * 50 - 250);
                this.gravityArrow?.setY(this.gameScene.cameraHeight - this.UIboundsArrow + 5);
                if (this.amountLifes) this.coinUI?.setX(this.gameScene.cameraWidth - this.amountLifes * 50 - 150);
                this.coinUI?.setY(this.gameScene.cameraHeight - this.UIboundsCoin + 10);
            } else if (this.gameScene?.cameraNormal) {
                this.lifesGroup?.setX(100, 51);
                this.lifesGroup?.setY(50, 0);
                this.gravityArrow?.setX(this.ArrowOriginalPos);
                this.gravityArrow?.setY(50);
                this.coinUI?.setX(this.CoinOriginalPos);
                this.coinUI?.setY(50);
            }
            if (this.coinUI) {
                if (this.gameScene?.canWin || this.gameScene?.canNextLevel) {
                    this.coinUI?.clearTint();
                } else {
                    this.coinUI?.setTint().setTint(Phaser.Display.Color.GetColor(0, 0, 0));
                };
            };
            if (this.gameScene?.gravityDown == false) {
                (this.gravityArrow as Phaser.GameObjects.Image).setRotation(Math.PI * 3 / 2);
            } else { (this.gravityArrow as Phaser.GameObjects.Image).setRotation(Math.PI / 2) };
        };*/
    };
};

