import Phaser from 'phaser';
import Scene1 from './Scene1';

export default class GameOver extends Phaser.Scene {
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor() {
        super({ key: 'GameOver' });
        
    };

    init() {
        this.cursors = this.input.keyboard?.createCursorKeys();
    };

    preload() {
        this.load.image("background" , "game/background.png");
    };

    create() {
        this.add.image(900,500,"background").setScale(.7);
        this.add.text(625, 300, "You've lose! Very mal culiao!!")
        .setOrigin(0.5)
        .setScale(2);
        this.add.text(625, 500, "Press SPACE to play again")
        .setOrigin(0.5)
        .setScale(1);
    };

    update() {
        if (this.cursors){
            const space = this.cursors.space;
            /*Space*/
            if (space.isDown) {
                this.scene.switch("Menu");
            };
        };
    };
};

