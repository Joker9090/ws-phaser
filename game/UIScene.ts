import Phaser, { GameObjects } from 'phaser';
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
    timeLevel: number = 0;
    timerText?: Phaser.GameObjects.Text;
    UIContainer?: Phaser.GameObjects.Container;


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
                this.UIContainer?.add(coras)
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
            this.UIContainer?.add(this.coinUI)

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
            this.UIContainer?.add(this.gravityArrow)
        };
    };


    rotateArrow(direction: string) {
        if (direction == "down") {
            this.gravityArrow?.setRotation(Math.PI / 2);
        } else if (direction == "up") {
            this.gravityArrow?.setRotation(-Math.PI / 2);
        } else if (direction == "left") {
            this.gravityArrow?.setRotation(Math.PI);
        } else if (direction == "right") {
            this.gravityArrow?.setRotation(0);
        }
    };


    coinCollected() {
        this.coinUI?.clearTint()
    };

    nextLevel() {
        this.timeLevel = 0;
        this.coinUI?.setTint(Phaser.Display.Color.GetColor(0, 0, 0));
    };

    loseLife(lifes: number) {
        // Remove the object with the highest x position
        this.cameras.main.flash(500,1)
        console.log("entró", lifes)
        if (this.lifesGroup) {
            if (lifes != 0) {
                let lifeToTheRight = null;
                let highestX = Number.NEGATIVE_INFINITY;
                for (let i = 0; i < this.lifesGroup.getLength(); i++) {
                    const child = (this.lifesGroup.getChildren()[i] as Phaser.GameObjects.Image);
                    if (child.x > highestX) {
                        lifeToTheRight = child;
                        highestX = child.x;
                    };
                };
                lifeToTheRight?.destroy();
            };
        };
        console.log("check", this.gameScene, "level", this.gameScene?.levelIs)
        if (this.gameScene?.checkPoint == 1 && this.gameScene.levelIs == 2){
            this.rotateArrow("down");
            console.log("entró a la rotación")
        }
    };

    closeSign(sign: number) {
        if (sign == 1) {
            this.UIRectangle1?.setVisible(false);
        } else if (sign == 2) {
            this.UIRectangle2?.setVisible(false);
        };
    };

    showCoin() {
        this.UIRectangle1?.setVisible(true);
    }

    showArrow() {
        this.UIRectangle2?.setVisible(true);
    }


    create(this: UIScene, data: { level: number, lifes: number }) {
        this.UIContainer = this.add.container(0, 0)
        console.log("Barto", data)
        this.gameScene = this.game.scene.getScene("Game") as Game
        this.lifesGroup = this.add.group();
        this.createUI(data.lifes);

        /* RED BOX TO SHOW UI */
        this.UIRectangle1 = this.add.rectangle(200, 50, 260, 60, Phaser.Display.Color.GetColor(244, 15, 15), 0.5).setVisible(false);
        this.UIRectangle2 = this.add.rectangle(400, 50, 50, 60, Phaser.Display.Color.GetColor(244, 15, 15), 0.5).setVisible(false);

        /* TIMER */
        this.timerText = this.add.text(this.cameras.main.width - 120, 50, 'Time: 0', { fontSize: '32px' }).setOrigin(.5, .5).setScrollFactor(0, 0).setDepth(100).setSize(50, 50);
        this.timeLevel = 0;
        var timerEvent = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.timeLevel++;
                this.timerText?.setText('Time: ' + this.timeLevel);
                this.timeLevel = this.timeLevel;
            },
            callbackScope: this,
            loop: true
        });
        this.UIContainer.add([this.timerText, this.UIRectangle1, this.UIRectangle2]);
        /* SCENE HANDLER */
        EventsCenter.on('gameOver', () => {
            console.log("Barto gameOver", this.gameScene)
            this.timeLevel = 0;
            EventsCenter.removeListener('gravityArrow', this.rotateArrow, this);
            EventsCenter.removeListener('die', this.loseLife, this);
            EventsCenter.removeListener('coinCollected', this.coinCollected, this);
            EventsCenter.removeListener('nextLevel', this.nextLevel, this);
            EventsCenter.removeListener('coin', this.showCoin, this);
            EventsCenter.removeListener('noFloat', this.showArrow, this);
            EventsCenter.removeListener('closeSign', this.closeSign, this);
            EventsCenter.removeListener('gameOver', this.closeSign, this);
            this.scene.stop();
        });
        EventsCenter.on('gravityArrow', this.rotateArrow, this)
        EventsCenter.on('die', this.loseLife, this);
        EventsCenter.on('coinCollected', this.coinCollected, this);
        EventsCenter.on('nextLevel', this.nextLevel, this);
        EventsCenter.on('coin', this.showCoin, this);
        EventsCenter.on('noFloat', this.showArrow, this);
        EventsCenter.on('closeSign', this.closeSign, this);
    };

    update() {
        this.timerText?.setPosition(this.cameras.main.width - this.cameras.main.width / 10, 50);
        if (this.cameras.main.width < this.cameras.main.height) {
            this.timerText?.setPosition(160, 100);
            this.UIContainer?.setScale(this.cameras.main.width / this.cameras.main.height);
        }
    };
};

