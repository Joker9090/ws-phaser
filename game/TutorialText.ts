import Phaser from 'phaser';
import EventsCenter from './EventsCenter';


export default class TutorialText extends Phaser.Scene {
  tutorialText?: Phaser.GameObjects.Text;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  stateTut: number = 0;
  gameScene?: Phaser.Scene;
  rectanguleText?: Phaser.GameObjects.Sprite;
  constructor() {
    super({ key: 'TutorialText' });
  };

  init() {
    this.cursors = this.input.keyboard?.createCursorKeys();
    this.gameScene = this.game.scene.getScene("Game");
  };

  DisplayText() {
    if (this.stateTut < 3) {
      this.gameScene?.scene.pause();
      this.rectanguleText?.setVisible(true);
    }
    if (this.stateTut == 0) {
      this.tutorialText?.setText('Orange platforms are special since they activate special effects... Press space to continue'
      )
      this.stateTut = 1
    } else if (this.stateTut == 1) {
      this.tutorialText?.setText("Coins are needed in order to win the game, you can see if you've collected it here next to your lifes!")
      this.stateTut = 2
    } else if (this.stateTut == 2) {
      this.tutorialText?.setText("The gravity arrow points to where the gravity is pulling, this allows you to know to where you will be falling!!!!")
      this.stateTut = 3
    } else if (this.stateTut > 3) {
      this.rectanguleText?.setVisible(false);
      this.tutorialText?.setText("");
    };
  };




  create(/* {song} */) {
    const { width, height } = this.cameras.main;
    const textPosY = (height / 2) - 100
    const textPosX = (width / 2) + 50
    /* TEXT BOX */
    this.rectanguleText = this.add.sprite(textPosX, textPosY, "textBox")
      .setScrollFactor(0)
      .setDepth(200)
      .setScale(0.75, 1.4)
      .setVisible(false);



    this.tutorialText = this.add.text(
      textPosX,
      textPosY,
      '',
      { fontFamily: 'Arcade', fontSize: '30px', wordWrap: { width: 400, useAdvancedWrap: true } }
    )
      .setOrigin(.5)
      .setScrollFactor(0)
      .setDepth(200)
      .setSize(50, 50);
    EventsCenter.on('float', this.DisplayText, this);
    EventsCenter.on('coin', this.DisplayText, this);
    EventsCenter.on('noFloat', this.DisplayText, this);

  };

  update() {
    console.log(this.stateTut)
    if (this.cursors) {
      if (this.cursors.space.isDown) {
        if (this.stateTut == 0) {
          if (this.gameScene?.scene.isPaused) this.gameScene?.scene.resume();
          this.rectanguleText?.setScale(0.5, 1).setVisible(false);
          this.tutorialText?.setText('');

        } else if (this.stateTut == 1) {
          if (this.gameScene?.scene.isPaused) this.gameScene?.scene.resume();
          this.rectanguleText?.setVisible(false);
          this.tutorialText?.setText('');

        } else if (this.stateTut == 2) {
          if (this.gameScene?.scene.isPaused) this.gameScene?.scene.resume();
          this.rectanguleText?.setVisible(false);
          this.tutorialText?.setText('');

        } else if (this.stateTut == 3) {
          if (this.gameScene?.scene.isPaused) this.gameScene?.scene.resume();
          this.rectanguleText?.setVisible(false);
          this.tutorialText?.setText('');
          this.stateTut = 4
        } else {
          this.rectanguleText?.setVisible(false);
          this.tutorialText?.setText('');
        };
      };
    };
  };
};