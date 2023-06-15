import Phaser from 'phaser';
import TextBox from './assets/TextBox';
export default class Sandbox extends Phaser.Scene {

  constructor() {
    super({ key: 'Sandbox' });
  };

  create() {
    const text = this.add.text(
      300,
      150,
      'Orange platforms are special since they activate special effects... Press space to continue',
      {
        fontFamily: 'Arcade',
      })
      .setOrigin(.5)
      .setScrollFactor(0)
      .setDepth(200)
      .setSize(50, 50);


    const text2 = new TextBox(this, 500, 500, "textBox", 400).setVisible(true);
  };

};

