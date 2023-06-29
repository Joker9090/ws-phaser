import Phaser from 'phaser';
import BetweenScenes, { BetweenScenesStatus } from './BetweenScenes';
import MusicManager from './MusicManager';


export default class Intro extends Phaser.Scene {
  noswarText?: Phaser.GameObjects.Text;
  spaceText?: Phaser.GameObjects.Text;
  studiosText?: Phaser.GameObjects.Text;
  noswarLogo?: Phaser.GameObjects.Image;
  container?: Phaser.GameObjects.Container;
  progressParam: number = 0;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  finishIntro: boolean = false;


  constructor() {
    super({ key: 'Intro' });
  };

  init() {
    this.cursors = this.input.keyboard?.createCursorKeys();
  };
  /*
      preload() {
          this.load.image("logoNoswar", "game/logo.png");
      };
  */

  create() {

    this.cameras.main.setBackgroundColor(Phaser.Display.Color.GetColor(30, 30, 30))
    /* Audio */
    const getMusicManagerScene = this.game.scene.getScene("MusicManager") as MusicManager;
    if (!getMusicManagerScene.scene.isActive()) this.scene.launch("MusicManager").sendToBack();
    else {
      getMusicManagerScene.playMusic("songMenu");
    };
    const { width, height } = this.cameras.main;
    this.container = this.add.container(width / 2, height / 2).setDepth(999);
    this.noswarText = this.add.text(
      width / 2,
      height / 2,
      "NOSWAR",
      {
        fontFamily: 'Arcade',
        fontSize: '160px',
        color: '#c3c5c3',
        shadow: {
          offsetX: 10,
          offsetY: 10,
          color: "black",
          blur: 5,
        },
      },
    ).setOrigin(0.5).setDepth(99);
    this.studiosText = this.add.text(
      -(width + this.container.width + 10),
      height / 2,
      "studios",
      {
        fontFamily: 'Arcade',
        fontSize: '30px',
        color: '#c3c5c3',
        shadow: {
          offsetX: 10,
          offsetY: 10,
          color: "#c3c5c3",
          blur: 5,
        },
      },
    ).setOrigin(0.5).setDepth(99);
    this.container.setPosition(0, height + this.container.height + 10);
    this.container.add(this.noswarText);
    this.noswarLogo = this.add.image(0, 0, "logoNoswar").setOrigin(0).setScale(.5).setDepth(9);
    this.noswarLogo.setPosition(this.cameras.main.width - this.noswarLogo.width / 3.2, 0);
    this.spaceText = this.add.text(width / 2, height / 2 + 200, "Press SPACE to continue").setOrigin(0.5).setAlpha(0);
    this.container.add(this.spaceText);

    /* TWEEN LOGO */
    this.tweens.addCounter({
      from: 0,
      to: 0.7,
      duration: 3000,
      ease: window.Phaser.Math.Easing.Bounce.InOut,
      yoyo: false,
      repeat: 0,
      onUpdate: (tween) => {
        const value = tween.getValue();
        this.noswarLogo?.setRotation(value);
      },
      onComplete: () => {
        this.logoAnim()
      }
    });
    /* TWEEN SPACE TO CONTINUE */
    this.tweens.addCounter({
      from: -1,
      to: 1,
      duration: 6500,
      ease: window.Phaser.Math.Easing.Linear,
      yoyo: false,
      repeat: 0,
      onUpdate: (tween) => {
        const value = tween.getValue();
        if (value >= 0) this.spaceText?.setAlpha(value);
        if (value >= 0.2) this.finishIntro = true;
      },
      onComplete: () => {
        this.pressAnim();
      }
    });
    /* TWEEN NOSWAR TEXT */
    this.tweens.addCounter({
      from: width + this.container.width + 10,
      to: 0,
      duration: 3000,
      ease: window.Phaser.Math.Easing.Bounce.InOut,
      yoyo: false,
      repeat: 0,
      onUpdate: (tween) => {
        const value = tween.getValue();
        this.container?.setPosition(value, 0);
      },
      onComplete: () => {
        this.upDownAnim()
      }
    });
    /* TWEEN STUDIOS */
    this.tweens.addCounter({
      from: -(width + this.container.width + 300),
      to: width / 2,
      duration: 3000,
      ease: window.Phaser.Math.Easing.Bounce.InOut,
      yoyo: false,
      repeat: 0,
      onUpdate: (tween) => {
        if (this.noswarText) {
          const value = tween.getValue();
          this.studiosText?.setPosition(value, height / 2 + this.noswarText.height / 1.2);
        };
      }
    });
    this.container.add(this.studiosText);
  };

  logoAnim() {
    this.tweens.addCounter({
      from: 0,
      to: this.cameras.main.height / 2,
      duration: 6000,
      ease: window.Phaser.Math.Easing.Bounce.InOut,
      yoyo: true,
      repeat: -1,
      onUpdate: (tween) => {
        const value = tween.getValue();
        this.noswarLogo?.setPosition(this.cameras.main.width - this.noswarLogo.width / 3.2, value);
      }
    });
  };

  pressAnim() {
    this.tweens.addCounter({
      from: 1,
      to: 0.2,
      duration: 2000,
      ease: window.Phaser.Math.Easing.Linear,
      yoyo: true,
      repeat: -1,
      onUpdate: (tween) => {
        const value = tween.getValue();
        this.spaceText?.setAlpha(value)
      }
    });
  };

  upDownAnim() {
    this.tweens.addCounter({
      from: 0,
      to: 15,
      duration: 3000,
      ease: window.Phaser.Math.Easing.Linear,
      yoyo: true,
      repeat: -1,
      onUpdate: (tween) => {
        const value = tween.getValue();
        this.container?.setPosition(0, value);
      }
    });
  };

  makeTransition(sceneName: string, data: any) {
    const getBetweenScenesScene = this.game.scene.getScene("BetweenScenes") as BetweenScenes
    if (getBetweenScenesScene) getBetweenScenesScene.changeSceneTo(sceneName, data)
    else this.scene.start(sceneName, data);
    this.time.delayedCall(1000,()=>{
      this.scene.stop()
    })
  }

  update() {
    if (this.finishIntro) {
      this.noswarText?.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);
      if (this.noswarText) this.studiosText?.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2 + this.noswarText.height / 1.2);
      if (this.spaceText) this.spaceText?.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2 + 200);
      if (this.cursors) {
        if (this.cursors.space.isDown) {
          this.makeTransition("Menu", {"data": 1})
        }
      };
      if (this.cameras.main.width < this.cameras.main.height) {
        this.container?.setScale(this.cameras.main.width / this.cameras.main.height)
        this.noswarLogo?.setScale(.5 * this.cameras.main.width / this.cameras.main.height)
      } else if (this.cameras.main.width >= this.cameras.main.height) {
        this.container?.setScale(1)
        this.noswarLogo?.setScale(.5)
      }
    };
  };
};

