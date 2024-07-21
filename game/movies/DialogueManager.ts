import Phaser from "phaser";

// Scene in class
class DialogueManager {
  scene: Phaser.Scene;
  texts: string[];
  audios: string[];
  stateFunctions: Function[] = [];
  activeAudio?:
    | Phaser.Sound.NoAudioSound
    | Phaser.Sound.HTML5AudioSound
    | Phaser.Sound.WebAudioSound;

  holder?: Phaser.GameObjects.Graphics;
  screenHeigth: number = window.innerHeight;
  screenWidth: number = window.innerWidth;
  borderRounder: number = 50;
  textDisplayed?: Phaser.GameObjects.Text;
  continueText?: Phaser.GameObjects.Text;
  container?: Phaser.GameObjects.Container;
  tweenContinue?: Phaser.Tweens.Tween;
  textCounter: number = 0;
  textCounterMax?: number;
  canChangeText: boolean = false;
  state: string = "STOP"; // PLAY ;

  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  constructor(scene: Phaser.Scene, texts: string[], audios: string[]) {
    this.scene = scene;
    this.textCounter = 0;
    this.cursors = this.scene.input.keyboard?.createCursorKeys();
    this.audios = audios;
    this.texts = texts;
    this.textCounterMax = this.texts.length;

    this.container = this.scene.add
      .container()
      .setSize(this.screenWidth * 0.8, this.screenHeigth * 0.15);
    this.container.setPosition(
      (this.screenWidth * 0.2) / 2,
      this.screenHeigth * 0.8
    );
    this.holder = this.scene.add.graphics();
    this.holder.fillStyle(0xffffff, 1);
    this.holder.fillRoundedRect(
      0,
      0,
      this.screenWidth * 0.8,
      this.screenHeigth / 9,
      this.borderRounder
    );
    this.textDisplayed = this.scene.add.text(40, 40, "", {
      color: "black",
      wordWrap: {
        width: this.screenWidth * 0.8 - 40,
      },
    });
    this.continueText = this.scene.add
      .text(this.container.width / 2, 80, "Press SPACE to continue", {
        color: "black",
      })
      .setVisible(false)
      .setOrigin(0.5);
    this.tweenContinue = this.scene.tweens.add({
      targets: this.continueText,
      alpha: 1,
      loop: -1,
      duration: 5000,
      ease: "Linear",
    });
    this.container
      .add([this.holder, this.textDisplayed, this.continueText])
      .setScrollFactor(0, 0);
    this.scene.cameras.main.ignore(this.container);
  }

  getState(fn: Function) {
    //add function to an array, later will be called in each text  change, or when the text is finished
    this.stateFunctions.push(fn);
  }

  killState(fn: Function) {
    //remove function from array
    const index = this.stateFunctions.indexOf(fn);
    if (index > -1) {
      this.stateFunctions.splice(index, 1);
    }
  }
  
  play() {
    this.state = "PLAY";
    this.textBuilder(this.texts[this.textCounter], 100);
  }

  stop() {
    this.state = "STOP";
    this.stopAudio();
  }

  continueWithNextText() {
    if (this.textCounterMax) {
      if (this.textCounter < this.textCounterMax) {
        this.canChangeText = false;
        this.textDisplayed?.setText("");
        this.continueText?.setVisible(false);
        this.textBuilder(this.texts[this.textCounter], 100);
      } else {
        this.stateFunctions.forEach((fn) => {
          fn("FINISHED");
        });
        this.container?.destroy();
      }
    }
  }

  update() {
    if (this.canChangeText) {
      if (this.cursors) {
        if (this.cursors.space.isDown) {
          this.stateFunctions.forEach((fn) => {
            fn("CONTINUE", this.texts[this.textCounter]);
          });
          this.continueWithNextText();
        }
      }
    }
  }

  nextText() {
    this.continueText?.setVisible(true);
    this.textCounter += 1;
    this.canChangeText = true;
    this.stateFunctions.forEach((fn) => {
      fn("CANCONTINUE");
    });
  }

  textBuilder(text: string, deltaTime: number = 100) {
    const letters = text.split("");
    if (this.textDisplayed) {
      this.showText(
        this.textDisplayed,
        letters,
        0,
        deltaTime,
        this.showText,
        this.nextText.bind(this)
      );
      this.stateFunctions.forEach((fn) => {
        fn("WRITING => '" + text + "'");
      });
    }
  }

  showText(
    target: Phaser.GameObjects.Text,
    message: string[],
    index: number = 0,
    interval: number,
    callBack: Function,
    onFinish: Function
  ) {
    if (this.state === "STOP") return;
    if (index === 0) this.playAudio(this.audios[this.textCounter]);
    if (index < message.length) {
      const self = this;
      target.setText(target.text + message[index]);
      setTimeout(() => {
        index++;
        callBack.bind(self)(
          target,
          message,
          index,
          interval,
          callBack,
          onFinish
        );
      }, interval);
    } else {
      onFinish();
    }
  }

  stopAudio() {
    if (this.activeAudio) {
      this.activeAudio.stop();
      this.activeAudio.destroy;
    }
  }

  playAudio(name: string) {
    if (this.activeAudio) {
      this.activeAudio.stop();
    }
    this.activeAudio = this.scene.sound.add(name).setVolume(1);
    this.activeAudio.play();
  }
}

export default DialogueManager;
