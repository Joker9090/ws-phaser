import Phaser from 'phaser';

import EventsCenter from './EventsCenter';



export default class Sandbox extends Phaser.Scene {
    /* map */
    background?: Phaser.GameObjects.Image;
    container?: Phaser.GameObjects.Container;
    /* controls */
    EscKeyboard?: Phaser.Input.Keyboard.Key;
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    
    constructor() {
        super({ key: 'Sandbox' });
    };

    init() {
        this.cursors = this.input.keyboard?.createCursorKeys();
    };

    preload() {
    
    };

  
    create() {
       
    };

   


    update() {

    };
};

