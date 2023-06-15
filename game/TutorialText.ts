import Phaser from 'phaser';
import Tutorial from './maps/Tutorial'
import EventsCenter from './EventsCenter';
import TextBox from './assets/TextBox';

export default class TutorialText extends Phaser.Scene {
  tutorialTextBox?: TextBox;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  gameScene?: Phaser.Scene;
  UIRectangle1?: Phaser.GameObjects.Rectangle;
  UIRectangle2?: Phaser.GameObjects.Rectangle;
  TutorialMap?: Tutorial;
  PosXUI?: number;
  PosYUI?: number;
  heartsQty?: number;

  constructor() {
    super({ key: 'TutorialText' });
  };

  init() {
    this.cursors = this.input.keyboard?.createCursorKeys();
    this.gameScene = this.game.scene.getScene("Game");
  };

  DisplayText(param: number) {
    if (param < 4) {
      this.gameScene?.scene.pause();
      this.tutorialTextBox?.setVisible(true);
    }
    if (param == 0) {
      this.tutorialTextBox?.setTextBox('Orange platforms are special since they activate special effects... Press space to continue');
      //delete this.TutorialMap?.pisoFloat?.hasEvent
    } else if (param == 1) {
      this.tutorialTextBox?.setTextBox("Coins are needed in order to win the game, you can see if you've collected it here next to your lifes!");
      this.UIRectangle1?.setVisible(true);
      //delete this.TutorialMap?.pisoCoin?.hasEvent
    } else if (param == 2) {
      this.tutorialTextBox?.setTextBox("The gravity arrow points to where the gravity is pulling, this allows you to know to where you will be falling!!!!");
      this.UIRectangle2?.setVisible(true);
      //delete this.TutorialMap?.pisoNoFloat?.hasEvent
    } else if (param == 3) {
      this.tutorialTextBox?.setTextBox("Be careful with fireballs, they can kill you and you'll lose a life");
      //delete this.TutorialMap?.pisoNoFloat?.hasEvent
    };
  };




  create(/* {song} */) {
    const { width, height } = this.cameras.main;
    const textPosY = (height / 2) - 100;
    const textPosX = (width / 2) + 350;

    /* TEXT BOX */
    this.tutorialTextBox = new TextBox(this, textPosX, textPosY, "textBox", 400);

    /* MARCADOR DE UI */

    this.PosXUI = 90
    this.PosYUI = 35
    console.log(this.PosXUI, this.PosYUI)
    this.UIRectangle1 = this.add.rectangle(this.PosXUI, this.PosYUI, 300, 75, Phaser.Display.Color.GetColor(255, 0, 20), 0.4).setOrigin(0).setVisible(false).setScrollFactor(0);
    this.UIRectangle2 = this.add.rectangle(this.PosXUI + 310, this.PosYUI, 60, 75, Phaser.Display.Color.GetColor(255, 0, 20), 0.4).setOrigin(0).setVisible(false).setScrollFactor(0);
    //window.test = this.UIRectangle2

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
          if (this.tutorialTextBox) this.tutorialTextBox?.setVisible(false);
          this.UIRectangle1?.setVisible(false);
          this.UIRectangle2?.setVisible(false);
        };
      };
    }
  };
};

