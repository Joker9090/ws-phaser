import Phaser from 'phaser';
import Tutorial from './maps/Tutorial'
import EventsCenter from './EventsCenter';
import TextBox from './assets/TextBox';

export default class TutorialText extends Phaser.Scene {
  tutorialTextBox?: TextBox;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  gameScene?: Phaser.Scene;
  TutorialMap?: Tutorial;
  PosXUI?: number;
  PosYUI?: number;
  signNumber?: number;
  heartsQty?: number;

  constructor() {
    super({ key: 'TutorialText' });
  };

  init() {
    this.cursors = this.input.keyboard?.createCursorKeys();
    this.gameScene = this.game.scene.getScene("Game");
  };

  DisplayText(param: number) {
    if (param == 0) {
      this.tutorialTextBox?.setTextBox('Orange platforms are special since they activate special effects... Press space to continue');
    } else if (param == 1) {
      this.tutorialTextBox?.setTextBox("Coins are needed in order to win the game, you can see if you've collected it here next to your lifes!");
      this.signNumber = 1;
    } else if (param == 2) {
      this.tutorialTextBox?.setTextBox("The gravity arrow points to where the gravity is pulling, this allows you to know to where you will be falling!!!!");
      this.signNumber = 2;
    } else if (param == 3) {
      this.tutorialTextBox?.setPosition(this.cameras.main.width / 2 - 350, this.cameras.main.height / 2 - 100);
      this.tutorialTextBox?.setTextBox("Be careful with fireballs, they can kill you and you'll lose a life");
    };
  };




  create() {
    const { width, height } = this.cameras.main;
    const textPosY = (height / 2) - 100;
    const textPosX = (width / 2) + 350;
    /* TEXT BOX */
    this.tutorialTextBox = new TextBox(this, textPosX, textPosY, "textBox", 400);
    /* EVENTES RECIEVER */
    EventsCenter.on('float', () => this.DisplayText(0), this);
    EventsCenter.on('coin', () => this.DisplayText(1), this);
    EventsCenter.on('noFloat', () => this.DisplayText(2), this);
    EventsCenter.on('fire', () => this.DisplayText(3), this);
  };

  update() {
    if (this.tutorialTextBox?.visible) {
      if (this.cursors) {
        if (this.cursors.space.isDown) {
          this.gameScene?.scene.resume();
          EventsCenter.emit('closeSign', this.signNumber);
          if (this.tutorialTextBox) this.tutorialTextBox?.setVisible(false);
        };
      };
    };
  };
};

