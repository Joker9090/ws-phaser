import Phaser from "phaser";

// Scene in class
export type DialogConfig = {
  keepAlive: number
  delay: number
  position?: {
    x: number,
    y: number,
    width: number
  }
};
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
  borderRounder: number = 20;
  textDisplayed?: Phaser.GameObjects.Text;
  continueText?: Phaser.GameObjects.Text;
  container?: Phaser.GameObjects.Container;
  tweenContinue?: Phaser.Tweens.Tween;
  textCounter: number = 0;
  textCounterMax?: number;
  canChangeText: boolean = false;
  state: string = "STOP"; // PLAY ;
  config: DialogConfig[] = [];
  timeBetweenLetters: number = 70;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  gameObjectsScaler?: {
    x: number,
    y: number
  }

  constructor(
    scene: Phaser.Scene,
    texts: string[],
    audios: string[],
    config?: DialogConfig[],
    timeBetweenLetters?: number,
  ) {
    this.scene = scene;
    this.cursors = this.scene.input.keyboard?.createCursorKeys();

    this.texts = texts;
    this.textCounter = 0;
    this.textCounterMax = this.texts.length;

    this.audios = audios;

    this.config = config || [];
    this.timeBetweenLetters = timeBetweenLetters || 70;

    this.gameObjectsScaler = {
      x: window.innerWidth / 1920,
      y: window.innerHeight / 927,
    };


  }

  calculateHeigth(text: string, width: number | undefined) {
    const temporalText = this.scene.add.text(0, 0, text, {
      fixedWidth: width ? width : this.screenWidth * 0.8,
      fontSize: 20,
      lineSpacing: 24,
      padding: {
        x: 20,
        y: 20
      },
      color: "black",
      stroke: 'black',
      wordWrap: {
        width: width ? width * 0.8 : this.screenWidth * 0.8 - 80,
      },
    }).setVisible(false)
    const textHeight = temporalText.height
    return textHeight
  }


  createContainer(text: string, config?: DialogConfig) {
    this.container = this.scene.add
      .container()

    this.container.setPosition(
      config?.position?.x ? config?.position?.x : (this.screenWidth * 0.2) / 2,
      config?.position?.y ? config?.position?.y : this.screenHeigth * 0.75
    );

    this.textDisplayed = this.scene.add.text(40, 40, "", {
      fontSize: 20,
      lineSpacing: 15,
      padding: {
        x: 20,
        y: 10
      },
      color: "black",
      stroke: 'black',
      align: "center",
      fixedWidth: config?.position?.width ? config?.position?.width : this.screenWidth * 0.8,
      fixedHeight: this.calculateHeigth(text, config?.position?.width),
      wordWrap: {
        width: config?.position?.width ? config?.position?.width * 0.8 : this.screenWidth * 0.8 - 80,
      },
    });

    const graphics = this.scene.add.graphics()
    graphics.fillStyle(0xe0e1dd, 0.8);
    graphics.lineStyle(5, 0x1b263b, 0.8)
    graphics.strokeRoundedRect(
      this.textDisplayed.x,
      this.textDisplayed.y - 10,
      this.textDisplayed.width,
      this.textDisplayed.height,
      this.borderRounder
    )
    graphics.fillRoundedRect(
      this.textDisplayed.x,
      this.textDisplayed.y - 10,
      this.textDisplayed.width,
      this.textDisplayed.height,
      this.borderRounder
    );

    // Use the rounded rectangle as a mask for the text

    this.container
      .add([graphics, this.textDisplayed])
      .setVisible(false);

    if (this.gameObjectsScaler) {
      this.container.setScale(
        this.gameObjectsScaler.x < this.gameObjectsScaler.y
          ? this.gameObjectsScaler.y
          : this.gameObjectsScaler.x
      );
    }

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
    // if dely exist, call delayed
    this.createContainer(this.texts[this.textCounter], this.config[this.textCounter])
    if (this.config[this.textCounter] && this.config[this.textCounter].delay) {
      setTimeout(() => {
        this.state = "PLAY";
        this.container?.setVisible(true);
        this.textBuilder(this.texts[this.textCounter], this.timeBetweenLetters);
      }, this.config[this.textCounter].delay);
    } else {
      this.state = "PLAY";
      this.container?.setVisible(true);
      this.textBuilder(this.texts[this.textCounter], this.timeBetweenLetters);
    }
  }

  stop() {
    this.state = "STOP";
    this.stopAudio();
  }

  destroyContainer() {
    // this.container?.getAll().forEach((el)=>el.destroy())
    this.container?.destroy()
  }

  continueWithNextText() {
    this.canChangeText = false;
    if (this.textCounterMax) {
      if (this.textCounter < this.textCounterMax) {
        if (
          this.config[this.textCounter] &&
          this.config[this.textCounter].delay
        ) {
          this.destroyContainer()
          this.createContainer(this.texts[this.textCounter], this.config[this.textCounter])
          // this.continueText?.setVisible(false);
          // hide text container
          this.container?.setVisible(false);
          setTimeout(() => {
            this.container?.setVisible(true);
            this.textDisplayed?.setText("");
            this.textBuilder(this.texts[this.textCounter], this.timeBetweenLetters);
          }, this.config[this.textCounter].delay);
        } else {
          this.destroyContainer()
          this.createContainer(this.texts[this.textCounter], this.config[this.textCounter])
          this.textDisplayed?.setText("");
          // this.continueText?.setVisible(false);
          this.textBuilder(this.texts[this.textCounter], this.timeBetweenLetters);
        }
      } else {
        if (
          this.config[this.textCounter] &&
          this.config[this.textCounter].delay
        ) {
          setTimeout(() => {
            this.stateFunctions.forEach((fn) => {
              fn("FINISHED");
            });
            this.container?.destroy();
          }, this.config[this.textCounter].delay);
        } else {
          this.stateFunctions.forEach((fn) => {
            fn("FINISHED");
          });
          this.container?.destroy();
        }
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
    // if keep alive config, not show continue text
    if (
      this.config[this.textCounter] &&
      this.config[this.textCounter].keepAlive
    ) {
      // change text afget keepalive config time
      setTimeout(() => {
        this.textCounter += 1;
        this.textDisplayed?.setText("");
        this.stateFunctions.forEach((fn) => {
          fn("CONTINUE", this.texts[this.textCounter]);
        });
        this.continueWithNextText();
      }, this.config[this.textCounter].keepAlive);
      return;
    }

    // this.continueText?.setVisible(true);
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
