import Phaser from 'phaser';
import MusicManager from './MusicManager';
import TextBox from './assets/TextBox';

export default class MainMenuScene extends Phaser.Scene {

    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    buttons: Phaser.GameObjects.Image[] = [];
    selectedButtonIndex: number = 0;
    buttonSelector!: Phaser.GameObjects.Image;
    monchi?: Phaser.GameObjects.Sprite;
    progress: number = 0;
    play?: Phaser.GameObjects.Image;
    credits?: Phaser.GameObjects.Image;
    exit?: Phaser.GameObjects.Image;
    title?: Phaser.GameObjects.Text;
    textTut?: Phaser.GameObjects.Text;
    textLvl1?: Phaser.GameObjects.Text;
    textLvl2?: Phaser.GameObjects.Text;
    container?: Phaser.GameObjects.Container;
    constructor() {
        super({ key: 'Menu' });
    };

    init() {
        this.cursors = this.input.keyboard?.createCursorKeys();
    };

    /* Debug 
    preload() {
        this.load.image("background", "game/background.png");
        this.load.image("glass", "game/glass.png");
        this.load.image("cursor", "game/cursor.png");
        this.load.spritesheet("monchi", "game/character.png", { frameWidth: 220, frameHeight: 162 });
    };
    */

    button1() {
        /* animation logo after introduction */
        this.tweens.addCounter({
            from: 2000,
            to: 0,
            duration: 2000,
            ease: window.Phaser.Math.Easing.Bounce.InOut,
            yoyo: false,
            repeat: 0,
            onUpdate: (tween) => {
                const value = tween.getValue();
                if (this.play) this.play.setPosition(value,100);
                if (this.textTut) this.textTut.setPosition(value,100);
            },
            onComplete: () => {
                this.button2()
            }
        });
    };
    button2() {
        /* animation logo after introduction */
        this.tweens.addCounter({
            from: 2000,
            to: 0,
            duration: 1000,
            ease: window.Phaser.Math.Easing.Bounce.InOut,
            yoyo: false,
            repeat: 0,
            onUpdate: (tween) => {
                const value = tween.getValue();
                if(this.play){
                    if (this.credits) this.credits.setPosition(value,this.play.y + this.play.displayHeight + 10);
                    if (this.textLvl1) this.textLvl1.setPosition(value,this.play.y + this.play.displayHeight + 10);
                }
            },
            onComplete: () => {
                this.button3()
            }
        });
    };
    button3() {
        /* animation logo after introduction */
        this.tweens.addCounter({
            from: 2000,
            to: 0,
            duration: 1000,
            ease: window.Phaser.Math.Easing.Bounce.InOut,
            yoyo: false,
            repeat: 0,
            onUpdate: (tween) => {
                const value = tween.getValue();
                if(this.credits){
                    if (this.exit) this.exit.setPosition(value,this.credits.y + this.credits.displayHeight + 10);
                    if (this.textLvl2) this.textLvl2.setPosition(value,this.credits.y + this.credits.displayHeight + 10);
                }
            }
        });
    }

    create() {
        /* Audio */
        const getMusicManagerScene = this.game.scene.getScene("MusicManager") as MusicManager
        if (!getMusicManagerScene.scene.isActive()) this.scene.launch("MusicManager").sendToBack();
        else {
            getMusicManagerScene.playMusic("songMenu")
        }

        this.scene.bringToTop().resume()
        //window.scene = this

        /* Main Scene Menu */
        //this.container = this.add.container(this.game.canvas.getBoundingClientRect().width/2 ,this.game.canvas.getBoundingClientRect().height/3).setDepth(999)
        this.container = this.add.container(0,0).setDepth(999)
        this.physics.world.setBounds(0, 0, 5000, 2500);
        this.add.image(900, 500, "background").setScale(.7);
        this.monchi = this.add.sprite(100, 700, "character", 1).setScale(.5);
        let { width, height } = this.scale
        if (this.game.config.canvas) {
            const size = this.game.config.canvas.getBoundingClientRect();
            width = size.width;
            height = size.height;
        }

        const [widthButton, heightButton] = [250, 100];
        this.title = this.add.text(0,-100,"LAS AVENTURAS DE MONCHI",{fontSize: '80px', color: '#c3c5c3'},).setOrigin(0.5)
        // play button
        this.play = this.add.image(2000, 100, 'glass').setDisplaySize(widthButton, heightButton);
        //window.play = play
        this.textTut = this.add.text(this.play.x, this.play.y, 'Play').setOrigin(0.5);

        // Play level 1 button
        this.credits = this.add.image(this.play.x, this.play.y + this.play.displayHeight + 10, 'glass').setDisplaySize(widthButton, heightButton);
        this.textLvl1 = this.add.text(this.credits.x, this.credits.y, 'Credits').setOrigin(0.5);

        // Play level 2 button
        this.exit = this.add.image(this.credits.x, this.credits.y + this.credits.displayHeight + 10, 'glass').setDisplaySize(widthButton, heightButton);
        this.textLvl2 = this.add.text(this.exit.x, this.exit.y, 'Exit').setOrigin(0.5);

        
        this.buttons = [this.play, this.credits, this.exit];
        this.buttonSelector = this.add.image(0, 0, 'cursor').setScale(.1).setRotation(-1);
        this.selectButton(0);
        
        this.container.add([this.play, this.credits, this.exit, this.textLvl1, this.textLvl1, this.textLvl2, this.textTut, this.buttonSelector, this.title]);

        this.play.on('selected', () => {
            this.scene.stop();
            this.scene.start("Game", { level: 0, lifes: 3 });
            this.selectedButtonIndex = 0
        });

        this.credits.on('selected', () => {
            this.scene.stop();
            this.scene.start("Game", { level: 1, lifes: 3 });
            this.selectedButtonIndex = 0
        });

        this.exit.on('selected', () => {
            this.scene.stop();
            this.scene.start("Game", { level: 2, lifes: 3 });
            this.selectedButtonIndex = 0
        });

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.credits?.off('selected')
        });
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.exit?.off('selected')
        });
        this.button1()
    };

    selectButton(index: number) {
        const currentButton = this.buttons[this.selectedButtonIndex];
        // set the current selected button to a white tint
        currentButton.setTint(0xffffff);
        const button = this.buttons[index];
        // set the newly selected button to a green tint
        button.setTint(0x66ff7f);
        // move the hand cursor to the right edge
        this.buttonSelector.x = button.x + button.displayWidth * 0.5;
        this.buttonSelector.y = button.y + 10;
        // store the new selected index
        this.selectedButtonIndex = index;
    };

    selectNextButton(change = 1) {
        let index = this.selectedButtonIndex + change;
        // wrap the index to the front or end of array
        if (index >= this.buttons.length) {
            index = 0;
        }
        else if (index < 0) {
            index = this.buttons.length - 1;
        };
        this.selectButton(index);
    };

    confirmSelection() {
        // get the currently selected button
        const button = this.buttons[this.selectedButtonIndex];
        // emit the 'selected' event
        button.emit('selected');
    };

    update() {
        if (this.container) {
            if (this.cameras.main) {
               this.container.setPosition(this.cameras.main.width/2 ,this.cameras.main.height/3);
               if(this.cameras.main.width < this.cameras.main.height){
                   this.container.setScale(2*this.cameras.main.width / this.cameras.main.height)
               }
            }
        }

        //window.play.setPosition(this.cameras.main.width/2,this.cameras.main.height/2);
        if (this.monchi) {
            this.progress = this.progress + .0031415;
            this.monchi.x = this.monchi.x + .5;
            this.monchi.y = this.monchi.y - .25;
            this.monchi.setRotation(this.progress);
        };
        if (this.cursors) {
            const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up);
            const downJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.down);
            const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space);

            if (upJustPressed) {
                this.selectNextButton(-1);
            }
            else if (downJustPressed) {
                this.selectNextButton(1);
            }
            else if (spaceJustPressed) {
                this.confirmSelection();
            };
        };
    };
};

