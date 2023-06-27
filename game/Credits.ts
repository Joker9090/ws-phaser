import Phaser from 'phaser';
import PictureCredits from './assets/PictureCredits'
import EventsCenter from './EventsCenter';
import TextBox from './assets/TextBox';



export default class Credits extends Phaser.Scene {
    /* map */
    background?: Phaser.GameObjects.Image;
    picture1?: Phaser.GameObjects.Container;
    picture2?: Phaser.GameObjects.Container;
    picture3?: Phaser.GameObjects.Container;
    spaceship?: Phaser.GameObjects.Image;
    /* controls */
    EscKeyboard?: Phaser.Input.Keyboard.Key;
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    personTextBox1?: TextBox;
    personTextBox2?: TextBox;
    personTextBox3?: TextBox;
    constructor() {
        super({ key: 'Credits' });
    };

    init() {
        this.cursors = this.input.keyboard?.createCursorKeys();
    };

    preload() {
        this.load.image("backgroundLevelMap", "game/backgroundLevelMap.png");
        this.load.image("spaceship", "game/spaceship.png");
        this.load.image("pictureBox", "game/pictureCredits.png");
        this.load.image("ari", "game/ari.png");
        this.load.image("flor", "game/flor.png");
        this.load.image("barto", "game/barto.png");
        this.load.image("textBox", "game/textBox.png");
    };


    create() {
        /* Controls */
        this.background = this.add.image(1000, 500, "backgroundLevelMap").setScale(1.3);
        this.EscKeyboard = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        const { width, height } = this.cameras.main;

        this.picture1 = new PictureCredits(this, width / 5, height * 1.5 / 4, "ari", "pictureBox", .15).setDepth(99);
        this.picture2 = new PictureCredits(this, width / 2, height * 1.5 / 4, "flor", "pictureBox", .15).setDepth(99);
        this.picture3 = new PictureCredits(this, width * 4 / 5, height * 1.5 / 4, "barto", "pictureBox", .15).setDepth(99);


        this.personTextBox1 = new TextBox(this, width / 5, height * 3 / 4, "textBox", 400).setDepth(99).setVisible(true);
        this.personTextBox1.setTextBox("Nano - Developer");
        this.personTextBox2 = new TextBox(this, width / 2, height * 3 / 4, "textBox", 400).setDepth(99).setVisible(true);
        this.personTextBox2.setTextBox("Flor - Graphics Designer");
        this.personTextBox3 = new TextBox(this, width * 4 / 5, height * 3 / 4, "textBox", 400).setDepth(99).setVisible(true);
        this.personTextBox3.setTextBox("???? - Developer");

        this.physics.world.setBounds(0, 0, 5000, 2500);
        this.add.text(width / 2, height / 14, "CREDITS", { fontSize: '70px', fontFamily: 'arcade', color: '#c3c5c3' }).setOrigin(0.5);
        this.add.text(width / 2, height - height / 10, "Press SPACE or ESC to go to Menu", { fontSize: '22px', fontFamily: 'arcade', color: '#c3c5c3' }).setOrigin(0.5);
        this.spaceship = this.add.image(-100, height + 100, "spaceship").setDepth(9).setRotation(0).setScale(0.5).setAlpha(.5);
    };




    update() {
        if (this.spaceship) {
            this.spaceship.x = this.spaceship.x + .8;
            this.spaceship.y = this.spaceship.y - .30;
            if (this.spaceship.x == this.cameras.main.width) {
                this.spaceship.x = -100
                this.spaceship.y = this.cameras.main.height + 100
            }
        };
        if (this.EscKeyboard) this.EscKeyboard.on("down", () => {
            EventsCenter.emit('gameOver', true)
            this.scene.start("Menu");
        });
        if (this.cursors) this.cursors.space.on("down", () => {
            EventsCenter.emit('gameOver', true)
            this.scene.start("Menu");
        });
    };
};
