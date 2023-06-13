import Phaser from 'phaser';
import MusicTracks from "./MusicManager";

export default class WonScene extends Phaser.Scene {
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    music?: MusicTracks;
    constructor() {
        super({ key: 'Won' });

    };

    init() {
        this.cursors = this.input.keyboard?.createCursorKeys();
    };

    /*Debug
    preload() {
        this.load.image("background", "game/background.png");
    };
    */

    create(this: WonScene, data: { text: string }) {
        /* Audio */
        this.music = new MusicTracks(this);
        this.music.playMusic('songWon');


        this.physics.world.setBounds(0, 0, 5000, 2500);
        this.add.image(900, 500, "background").setScale(.7);
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, data.text, { fontSize: '35px' })
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

