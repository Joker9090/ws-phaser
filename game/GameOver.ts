import Phaser from 'phaser';

import MusicManager from './MusicManager';

export default class GameOver extends Phaser.Scene {
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

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

    create(this: GameOver) {
        /* Audio */
        /* Audio */

        const getMusicManagerScene = this.game.scene.getScene("MusicManager") as MusicManager
        if (!getMusicManagerScene.scene.isActive()) this.scene.launch("MusicManager").sendToBack();
        else {
            getMusicManagerScene.playMusic("songLose")
        }

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
                this.scene.start("Menu");
            });
        };
    };
};

