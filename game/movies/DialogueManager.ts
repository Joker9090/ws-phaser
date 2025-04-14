import Phaser from "phaser";
import TextBox from "../assets/TextBox";

// Scene in class

export type WithTappingConfig = {
  audios: string[];
  delay: number;
  count: number;
};
export type DialogConfig = {
  keepAlive: number;
  delay: number;
  withTapping?: WithTappingConfig;
  position?: {
    x?: number;
    y?: number;
    width?: number;
  };
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
    x: number;
    y: number;
  };
  textBox?: TextBox;
  constructor(
    scene: Phaser.Scene,
    texts: string[],
    audios?: string[],
    config?: DialogConfig[],
    timeBetweenLetters?: number
  ) {
    this.scene = scene;
    this.cursors = this.scene.input.keyboard?.createCursorKeys();

    this.texts = texts;
    this.textCounter = 0;
    this.textCounterMax = this.texts.length;

    this.audios = audios ? audios : [];

    this.config = config || [];
    this.timeBetweenLetters = timeBetweenLetters || 70;

    this.gameObjectsScaler = {
      x: window.innerWidth / 1920,
      y: window.innerHeight / 927,
    };
  }

  calculateHeigth(text: string, width: number | undefined) {
    const temporalText = this.scene.add
      .text(0, 0, text, {
        fixedWidth: width ? width : this.screenWidth * 0.8,
        fontSize: 20,
        lineSpacing: 20,
        padding: {
          x: 0,
          y: 22,
        },
        color: "black",
        stroke: "black",
        wordWrap: {
          width: width ? width * 0.8 : this.screenWidth * 0.8 - 80,
        },
      })
      .setVisible(false);
    const textHeight = temporalText.height;
    return textHeight;
  }

  createContainer(text: string, config?: DialogConfig) {
    // Destroy the previous container if it exists
    if (this.container) {
      this.container.destroy();
    }
    this.container = this.scene.add.container();

    this.textDisplayed = this.scene.add.text(0, 8, "", {
      fontSize: 20,
      lineSpacing: 15,
      padding: {
        x: 0,
        y: 14,
      },
      color: "#34cceb",
      stroke: "#34cceb",
      align: "center",
      fontFamily: "Arcade",
      fixedWidth: config?.position?.width
        ? config?.position?.width
        : this.screenWidth * 0.8,
      fixedHeight: this.calculateHeigth(text, config?.position?.width),
      wordWrap: {
        width: config?.position?.width
          ? config?.position?.width * 0.8
          : this.screenWidth * 0.8 - 80,
      },
    });

    // this.textBox = new TextBox(
    //   this.scene,
    //   this.textDisplayed.x,
    //   this.textDisplayed.y - 10,
    //   this.textDisplayed.width,
    //   this.textDisplayed.height)

    // const addSpriteMiddlePoint = (sprite: Phaser.GameObjects.Sprite) => {
    //   sprite.setPosition(
    //     this.scene.cameras.main.width / 2,
    //     this.scene.cameras.main.height / 2
    //   )
    // }

    // const sprite = this.scene.add.sprite(0, 0, "textBox").setOrigin(0.5,0.5)
    // addSpriteMiddlePoint(sprite)

    const graphics = this.scene.add.graphics();
    graphics.fillStyle(0x192224, 0.6);
    graphics.lineStyle(5, 0x34cceb, 0.6);
    graphics.strokeRoundedRect(
      this.textDisplayed.x,
      this.textDisplayed.y - 6,
      this.textDisplayed.width,
      this.textDisplayed.height,
      this.borderRounder
    );
    graphics.fillRoundedRect(
      this.textDisplayed.x,
      this.textDisplayed.y - 6,
      this.textDisplayed.width,
      this.textDisplayed.height,
      this.borderRounder
    );
    graphics.setAlpha(0);
    //tween to show the text
    this.scene.tweens.add({
      targets: graphics,
      alpha: 1,
      duration: 350,
      ease: "Linear",
      repeat: 0,
      yoyo: false,
    });

    // Use the rounded rectangle as a mask for the text

    this.container.add([graphics, this.textDisplayed]).setVisible(false);

    if (this.gameObjectsScaler) {
      const scale =
        this.gameObjectsScaler.x < this.gameObjectsScaler.y
          ? this.gameObjectsScaler.y
          : this.gameObjectsScaler.x;

      this.container.setScale(scale);

      const XcenterOfText =
        this.scene.cameras.main.width / 2 -
        (this.textDisplayed.width * scale) / 2;

      if (config?.position && config?.position.x && config?.position.y) {
        this.container
          .setPosition(
            XcenterOfText + config?.position?.x ? config?.position?.x : 0,
            this.scene.cameras.main.height / 2 + config?.position?.y
              ? config?.position?.y
              : 0
          )
          .setDepth(99);
      } else {
        this.container
          .setPosition(
            XcenterOfText,
            this.scene.cameras.main.height -
              (this.calculateHeigth(text, undefined) + 50) * scale
          )
          .setDepth(99);
      }
    } else {
      const XcenterOfText =
        this.scene.cameras.main.width / 2 - this.textDisplayed.width / 2;

      if (config?.position && config?.position.x && config?.position.y) {
        this.container
          .setPosition(
            XcenterOfText + config?.position?.x ? config?.position?.x : 0,
            this.scene.cameras.main.height / 2 + config?.position?.y
              ? config?.position?.y
              : 0
          )
          .setDepth(99);
      } else {
        this.container
          .setPosition(
            XcenterOfText,
            this.scene.cameras.main.height -
              (this.calculateHeigth(text, undefined) + 50)
          )
          .setDepth(99);
      }
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
    const texts = this.texts[this.textCounter];
    const config = this.config[this.textCounter];
    this.createContainer(texts, config);
    if (config && config.delay) {
      // setTimeout(() => {
      //   this.state = "PLAY";
      //   this.container?.setVisible(true);
      //   this.textBuilder(texts, this.timeBetweenLetters);
      //   //   this.textBuilder(texts, this.timeBetweenLetters);
      //   if (config.withTapping) {
      //     const { count, delay, audios } = config.withTapping;
      //     let left = count || 1;
      //     const randomAudio = Math.floor(Math.random() * audios.length);
      //     this.playAudio(audios[randomAudio]);
      //     left -= 1;
      //     const audioInterval = setInterval(() => {
      //       left -= 1;
      //       if (left <= 0) clearInterval(audioInterval);
      //       if (config.withTapping && audios) {
      //         const randomAudio = Math.floor(Math.random() * audios.length);
      //         this.playAudio(audios[randomAudio], 0.55);
      //       }
      //     }, delay);
      //   }
      // }, config.delay);
      this.scene.time.delayedCall(config.delay, () => {
        this.state = "PLAY";
        this.container?.setVisible(true);
        this.textBuilder(texts, this.timeBetweenLetters);
        //   this.textBuilder(texts, this.timeBetweenLetters);
        if (config.withTapping) {
          const { count, delay, audios } = config.withTapping;
          let left = count || 1;
          const randomAudio = Math.floor(Math.random() * audios.length);
          this.playAudio(audios[randomAudio]);
          left -= 1;
          // const audioInterval = setInterval(() => {
          //   left -= 1;
          //   if (left <= 0) clearInterval(audioInterval);
          //   if (config.withTapping && audios) {
          //     const randomAudio = Math.floor(Math.random() * audios.length);
          //     this.playAudio(audios[randomAudio], 0.55);
          //   }
          // }, delay);

          const audioInterval = this.scene.time.addEvent({delay:delay, loop:true, callback:()=>{
            left -= 1;
            if (left <= 0) audioInterval.destroy();
            if (config.withTapping && audios) {
              const randomAudio = Math.floor(Math.random() * audios.length);
              this.playAudio(audios[randomAudio], 0.55);
            }
          }})
        }
      },[],this)
    } else {
      this.state = "PLAY";
      this.container?.setVisible(true);
      this.textBuilder(texts, this.timeBetweenLetters);
      //this.textBuilder(texts, this.timeBetweenLetters);
    }
  }

  stop() {
    console.log("resume", this.state, this.activeAudio);

    this.state = "STOP";
    // this.stopAudio();
    this.activeAudio?.pause();
    this.activeAudio?.stop();
    // this.activeAudio?.destroy();
    // this.textDisplayed?.setText(""); // Reset the displayed text
  }
  resume() {
      console.log("resume", this.state);

      if (this.state === "STOP") {
          this.resumeAudio(); // Resume the audio if paused
          this.state = "PLAY";
          const currentText = this.textDisplayed?.text || ""; // Get the current displayed text
          const remainingText = this.texts[this.textCounter]?.slice(currentText.length); // Calculate remaining text
          this.textBuilder(remainingText ?? '', this.timeBetweenLetters); // Continue building the text
      }
  }

  destroyContainer() {
    // this.container?.getAll().forEach((el)=>el.destroy())
    this.container?.destroy();
  }

  continueWithNextText() {
    this.canChangeText = false;
    if (this.textCounterMax) {
      const texts = this.texts[this.textCounter];
      const config = this.config[this.textCounter];
      if (this.textCounter < this.textCounterMax) {
        if (config && config.delay) {
          this.destroyContainer();
          this.createContainer(texts, config);
          // this.continueText?.setVisible(false);
          // hide text container
          this.container?.setVisible(false);
          this.scene.time.delayedCall(config.delay, () => {
            this.container?.setVisible(true);
            this.textDisplayed?.setText("");
            this.textBuilder(texts, this.timeBetweenLetters);
            if (config.withTapping) {
              const { count, delay, audios } = config.withTapping;
              let left = count || 1;
              const randomAudio = Math.floor(Math.random() * audios.length);
              this.playAudio(audios[randomAudio]);
              left -= 1;
              const audioInterval = setInterval(() => {
                left -= 1;
                if (left <= 0) clearInterval(audioInterval);
                if (config.withTapping && audios) {
                  const randomAudio = Math.floor(Math.random() * audios.length);
                  this.playAudio(audios[randomAudio], 0.55);
                }
              }, delay);
            }
          },[],this)
          
          // setTimeout(() => {
          //   this.container?.setVisible(true);
          //   this.textDisplayed?.setText("");
          //   this.textBuilder(texts, this.timeBetweenLetters);
          //   if (config.withTapping) {
          //     const { count, delay, audios } = config.withTapping;
          //     let left = count || 1;
          //     const randomAudio = Math.floor(Math.random() * audios.length);
          //     this.playAudio(audios[randomAudio]);
          //     left -= 1;
          //     const audioInterval = setInterval(() => {
          //       left -= 1;
          //       if (left <= 0) clearInterval(audioInterval);
          //       if (config.withTapping && audios) {
          //         const randomAudio = Math.floor(Math.random() * audios.length);
          //         this.playAudio(audios[randomAudio], 0.55);
          //       }
          //     }, delay);
          //   }
          // }, config.delay);
        } else {
          this.destroyContainer();
          this.createContainer(texts, config);
          this.textDisplayed?.setText("");
          // this.continueText?.setVisible(false);
          this.textBuilder(texts, this.timeBetweenLetters);
        }
      } else {
        if (config && config.delay) {

          this.scene.time.delayedCall(config.delay, () => {
            this.stateFunctions.forEach((fn) => {
              fn("FINISHED");
            });
            this.container?.destroy();
          },[],this)
          // setTimeout(() => {
          //   this.stateFunctions.forEach((fn) => {
          //     fn("FINISHED");
          //   });
          //   this.container?.destroy();
          // }, config.delay);
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
      this.scene.time.delayedCall(
        this.config[this.textCounter].keepAlive,
        () => {
          this.textCounter += 1;
        this.textDisplayed?.setText("");
        this.stateFunctions.forEach((fn) => {
          fn("CONTINUE", this.texts[this.textCounter]);
        });
        this.continueWithNextText();
        }, [],this)
      // setTimeout(() => {
      //   this.textCounter += 1;
      //   this.textDisplayed?.setText("");
      //   this.stateFunctions.forEach((fn) => {
      //     fn("CONTINUE", this.texts[this.textCounter]);
      //   });
      //   this.continueWithNextText();
      // }, this.config[this.textCounter].keepAlive);
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
      target.setText((target.text + message[index]).toUpperCase());
      this.scene.time.delayedCall(
        interval,
        () => {
          index++;
          callBack.bind(self)(
            target,
            message,
            index,
            interval,
            callBack,
            onFinish
          );
        },[],this)
      
      // setTimeout(() => {
      //   index++;
      //   callBack.bind(self)(
      //     target,
      //     message,
      //     index,
      //     interval,
      //     callBack,
      //     onFinish
      //   );
      // }, interval);
    } else {
      onFinish();
    }
  }

  stopAudio() {
    if (this.activeAudio) {
      this.activeAudio.stop();
      // this.activeAudio.destroy;
    }
  }

  resumeAudio() {
      if (this.activeAudio) {
        this.activeAudio.resume();
        // this.activeAudio.destroy;
      }
    }

  playAudio(name?: string, customVolume: number = 1) {
    if (name) {
      if (this.activeAudio) {
        this.activeAudio.stop();
      }
      this.activeAudio = this.scene.sound.add(name).setVolume(customVolume);
      this.activeAudio.play();
    }
  }
}

export default DialogueManager;
