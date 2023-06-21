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

    resetTimer() {
        this.timeLevel = 0;
    };

    loseLife(lifes: number) {
        // Remove the object with the highest x position
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

    create(this: UIScene, data: { level: number, lifes: number, scene: Game }) {

        this.gameScene = data.scene;
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

        /* SCENE HANDLER */
        EventsCenter.on('gameOver', () => { this.scene.stop() }); //TA ANDANDO MALLLLLL

        /* EVENTS HANDLER */
        EventsCenter.on('gravityArrow', this.rotateArrow, this)
        EventsCenter.on('die', this.loseLife, this);
        EventsCenter.on('coinCollected', this.coinCollected, this);
        EventsCenter.on('resetTimer', this.resetTimer, this);
        EventsCenter.on('coin', this.showCoin, this);
        EventsCenter.on('noFloat', this.showArrow, this);
        EventsCenter.on('closeSign', this.closeSign, this);
    };

    update() {

    };
};

