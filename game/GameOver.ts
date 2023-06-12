import Phaser from 'phaser';

export default class GameOver extends Phaser.Scene {
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    music?: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
    constructor() {
        super({ key: 'GameOver' });

    };

    init() {
        this.cursors = this.input.keyboard?.createCursorKeys();
    };

    /*Debug
    preload() {
        this.load.image("background", "game/background.png");
    };
    */

    create() {
        /* Audio */
        this.music = this.sound.add('songLose').setVolume(0.3);
        this.music.play();

        this.physics.world.setBounds(0, 0, 5000, 2500);
        this.add.image(900, 500, "background").setScale(.7);
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, "You've lost! Very mal culiao!!", { fontSize: '32px' })
            .setOrigin(0.5)
            .setScale(1);
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 200, "Press SPACE to play again", { fontSize: '22px' })
            .setOrigin(0.5)
            .setScale(1);
    };

    update() {
        if (this.cursors) {
            const space = this.cursors.space;
            /*Space*/
            space.on('down', () => {
                this.music?.stop;
                this.scene.stop;
                this.scene.start("Menu");
            });
            /*
            if (space.isDown) {
                this.music?.stop;
                this.scene.sleep()
                this.scene.start("Menu");
            };
            */
        };
    };
};

