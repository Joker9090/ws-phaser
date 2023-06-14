import Phaser from 'phaser';
import eventsCenter from './EventCenter';
import MusicManager from './MusicManager';

export default class MainMenuScene extends Phaser.Scene {


    constructor() {
        super({ key: 'Menu' });
    };

    init() {
    };

    create() {  
      
      const background = this.add.sprite(0,0,"background"); //.setScale(0.2,0.2);
      // this.scene.launch("Menu2")
      
      /*
      const scene2 = this.game.scene.getScene("MusicManager") as MusicManager
      this.scene.launch(scene2, { song: "songMenu" })
      */
     
    };

};

