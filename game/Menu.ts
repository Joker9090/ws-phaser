import Phaser from 'phaser';
import MusicTracks from "./MusicManager";
export default class MainMenuScene extends Phaser.Scene {

    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    buttons: Phaser.GameObjects.Image[] = [];
    selectedButtonIndex: number = 0;
    buttonSelector!: Phaser.GameObjects.Image;
    monchi?: Phaser.GameObjects.Sprite;
    progress: number = 0;
    music?: MusicTracks;

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

    create() {
        /* Audio */
        this.music = new MusicTracks(this);
        this.music.playMusic('songMenu');

        //window.scene = this

        /* Main Scene Menu */
        this.physics.world.setBounds(0, 0, 5000, 2500);
        this.add.image(900, 500, "background").setScale(.7);
        this.monchi = this.add.sprite(100, 700, "monchi", 1).setScale(.5);
        let { width, height } = this.scale
        if (this.game.config.canvas) {
            const size = this.game.config.canvas.getBoundingClientRect();
            width = size.width;
            height = size.height;
        }

        const [widthButton, heightButton] = [250, 100];

        // Tutorial button
        const Tutorial = this.add.image(width / 2, height / 2 - 100, 'glass').setDisplaySize(widthButton, heightButton);
        //window.tutorial = Tutorial
        this.add.text(Tutorial.x, Tutorial.y, 'Tutorial').setOrigin(0.5);

        // Play level 1 button
        const PlayLevel1 = this.add.image(Tutorial.x, Tutorial.y + Tutorial.displayHeight + 10, 'glass').setDisplaySize(widthButton, heightButton);
        this.add.text(PlayLevel1.x, PlayLevel1.y, 'Start level 1').setOrigin(0.5);

        // Play level 2 button
        const PlayLevel2 = this.add.image(PlayLevel1.x, PlayLevel1.y + PlayLevel1.displayHeight + 10, 'glass').setDisplaySize(widthButton, heightButton);
        this.add.text(PlayLevel2.x, PlayLevel2.y, 'Start level 2').setOrigin(0.5);


        this.buttons = [Tutorial, PlayLevel1, PlayLevel2];
        this.buttonSelector = this.add.image(0, 0, 'cursor').setScale(.1).setRotation(-1);
        this.selectButton(0);

        Tutorial.on('selected', () => {
            this.scene.stop();
            this.scene.start("Game", { level: 0, lifes: 8 });
            this.selectedButtonIndex = 0
        });

        PlayLevel1.on('selected', () => {
            this.scene.stop();
            this.scene.start("Game", { level: 1, lifes: 8 });
            this.selectedButtonIndex = 0
        });

        PlayLevel2.on('selected', () => {
            this.scene.stop();
            this.scene.start("Game", { level: 2, lifes: 8 });
            this.selectedButtonIndex = 0
        });

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            PlayLevel1.off('selected')
        });
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            PlayLevel2.off('selected')
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
        //window.tutorial.setPosition(this.cameras.main.width/2,this.cameras.main.height/2);

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

