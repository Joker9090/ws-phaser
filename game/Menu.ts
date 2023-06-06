import Phaser from 'phaser';
import Player from "./assets/Player";

export default class MainMenuScene extends Phaser.Scene {
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    buttons: Phaser.GameObjects.Image[] = [];
    selectedButtonIndex: number = 0;
    buttonSelector!: Phaser.GameObjects.Image;
    monchi?: Phaser.GameObjects.Sprite;
    progress: number = 0;
    constructor() {
        super({ key: 'Menu' });
    };

    init() {
        this.cursors = this.input.keyboard?.createCursorKeys();
    };

    preload() {
        this.load.image("background" , "game/background.png");
        this.load.image("glass", "game/glass.png");
        this.load.image("cursor", "game/cursor.png");
        this.load.spritesheet("monchi","game/character.png",{ frameWidth: 220, frameHeight: 162 });
    };

    create() {
        /* Audio */
        //let songLoader = this.load.audio('song', ['sounds/monchiSpace.mp3'])
        //songLoader.on('filecomplete', () => this.sound.add('song').play())
        //songLoader.start()
        this.add.image(900,500,"background").setScale(.7);
        this.monchi = this.add.sprite(100,700,"monchi",1).setScale(.5);
        const { width, height } = this.scale;
        const [widthButton, heightButton] = [250,100];
        // Play button
        const playButton = this.add.image(width * 0.5, height * 0.4, 'glass').setDisplaySize(widthButton, heightButton);

        this.add.text(playButton.x, playButton.y, 'Play').setOrigin(0.5);

        // Settings button
        const settingsButton = this.add.image(playButton.x, playButton.y + playButton.displayHeight + 10, 'glass').setDisplaySize(widthButton, heightButton);

        this.add.text(settingsButton.x, settingsButton.y, 'Settings').setOrigin(0.5);

        // Credits button
        const creditsButton = this.add.image(settingsButton.x, settingsButton.y + settingsButton.displayHeight + 10, 'glass').setDisplaySize(widthButton, heightButton);

        this.add.text(creditsButton.x, creditsButton.y, 'Credits').setOrigin(0.5);
        this.buttons = [playButton, settingsButton, creditsButton];
        //this.buttons.push(settingsButton);
        //this.buttons.push(playButton);
        //this.buttons.push(creditsButton);
        this.buttonSelector = this.add.image(0, 0, 'cursor').setScale(.1).setRotation(-1);
        this.selectButton(0);

        playButton.on('selected', () => {
            this.scene.sleep();
            this.scene.start("Game", { level: 1, lifes: 1 });
            this.selectedButtonIndex = 0
        });

        settingsButton.on('selected', () => {
            console.log('settings')
        });

        creditsButton.on('selected', () => {
            console.log('credits')
        });
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            playButton.off('selected')
        });

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
        console.log(index, this.buttons.length , this.buttons)
        // wrap the index to the front or end of array
        if (index >= this.buttons.length) {
            index = 0
        }
        else if (index < 0) {
            index = this.buttons.length - 1
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
        if(this.monchi){
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

