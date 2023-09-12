import Phaser, { GameObjects } from "phaser";
import Tutorial from "./maps/Tutorial";
import UI, { UIConfig } from "./assets/UI";
import TextBox from "./assets/TextBox";
import Game from "./Game";
import EventsCenter from "./EventsCenter";

export default class UIScene extends Phaser.Scene {
  tutorialTextBox?: TextBox;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  gameScene?: Game;
  TutorialMap?: Tutorial;
  lifesGroup?: Phaser.GameObjects.Group;
  gravityArrow?: Phaser.GameObjects.Image;
  coinUI?: Phaser.GameObjects.Image;
  uiContainer?: Phaser.GameObjects.Image
  uiIndicator?: Phaser.GameObjects.Image
  UIboundsCoin: number = 0;
  UIboundsArrow: number = 0;
  UIboundsHeart: number = 0;
  ArrowOriginalPos?: number;
  CoinOriginalPos?: number;
  timeLevel: number = 0;
  timerText?: Phaser.GameObjects.Text;
  minutes: number = 0
  containerText?: Phaser.GameObjects.Container;
  containerLeft?: Phaser.GameObjects.Container;
  containerRight?: Phaser.GameObjects.Container;
  progressParam: number = 0;

  constructor() {
    super({ key: "UIScene" });
  }
  createUI(lifes: number) {
    let quantityLifes = 0;
    let xpos = 0;

    if (lifes) {
      for (let i = 0; i < lifes; i++) {
        quantityLifes += 1;
        xpos = 205 + i * 50;
        const lifeConfig: UIConfig = {
          texture: "uiLifeSection",
          pos: { x: xpos, y: 90 },
          scale: 0.9,
        };
        const coras = new UI(this, lifeConfig, this.lifesGroup).setScrollFactor(
          0,
          0
        );
        this.containerLeft?.add(coras);
        this.lifesGroup?.setDepth(100);
      }

      const uiContainer: UIConfig = {
        texture: "uiEmpty",
        pos: { x: 200, y: 70 },
        scale: 0.9,
      };
      const uiIndicator: UIConfig = {
        texture: "uiGravity",
        pos: { x: 100, y: 70 },
        scale: 0.9,
      };
      this.uiIndicator = new UI(this, uiIndicator).setScrollFactor(0, 0);
      this.uiContainer = new UI(this, uiContainer)
        // .setTint(Phaser.Display.Color.GetColor(0, 0, 0))
        .setScrollFactor(0, 0)
        .setDepth(100)

        // .setRotation(0.7)
        ;
      this.containerLeft?.add(this.uiContainer);
      this.containerLeft?.add(this.uiIndicator);


      const coinConf: UIConfig = {
        pos: { x: lifes + 95, y: 70 },
        texture: "coin",
        scale: 0.15,
      };
      this.CoinOriginalPos = quantityLifes * 50 + 150;
      this.coinUI = new UI(this, coinConf)
        .setTint(Phaser.Display.Color.GetColor(0, 0, 0))
        .setScrollFactor(0, 0)
        .setDepth(100)
        // .setScale(0.9)
        // .setRotation(0.7)
        ;
      this.containerLeft?.add(this.coinUI);

      // const arrowConfig: UIConfig = {
      //   texture: "fallingGuy",
      //   pos: { x: lifes * 50 + 275, y: 60 },
      //   scale: 1,
      // };
      // this.ArrowOriginalPos = quantityLifes * 50 + 250;
      // this.gravityArrow = new UI(this, arrowConfig)
      //   .setRotation(0)
      //   .setScrollFactor(0, 0)
      //   .setDepth(100)
      //   .setScale(0.1)
      //   .setTint(150, 150, 150);
      // this.containerRight?.add(this.gravityArrow);
    }
  }

  rotateArrow(direction: string) {
    if (direction == "down") {
      this.gravityArrow?.setRotation(0);
      this.uiIndicator?.setRotation(0).setPosition(98, 70);
    } else if (direction == "up") {
      this.gravityArrow?.setRotation(Math.PI);
      this.uiIndicator?.setRotation(Math.PI).setPosition(98, 70);
    } else if (direction == "left") {
      this.gravityArrow?.setRotation(Math.PI / 2);
      this.uiIndicator?.setRotation(Math.PI / 2).setPosition(95, 73);
      this.gravityArrow?.setFlipX(false);
      this.uiIndicator?.setFlipX(false);
    } else if (direction == "right") {
      this.gravityArrow?.setRotation(-Math.PI / 2);
      this.uiIndicator?.setRotation(-Math.PI / 2).setPosition(100, 73);
      this.gravityArrow?.setFlipX(true);
      this.uiIndicator?.setFlipX(true);
    }
  }

  coinCollected() {
    this.coinUI?.clearTint();
  }

  nextLevel() {
    this.timeLevel = 0;
    this.coinUI?.setTint(Phaser.Display.Color.GetColor(0, 0, 0));
  }

  loseLife(lifes: number) {
    // Remove the object with the highest x position
    this.cameras.main.flash(700, 255, 19, 30, true);
    if (this.lifesGroup) {
      if (lifes != 0) {
        let lifeToTheRight = null;
        let highestX = Number.NEGATIVE_INFINITY;
        for (let i = 0; i < this.lifesGroup.getLength(); i++) {
          const child = this.lifesGroup.getChildren()[i] as Phaser.GameObjects.Image;
          if (child.x > highestX) {
            lifeToTheRight = child;
            highestX = child.x;

            console.log(child.x, "child.x")
            console.log(lifeToTheRight, "lifeToTheRigth")
          }
        }
        // lifeToTheRight?.setTexture('uiLifeSectionEmpty');
        lifeToTheRight?.destroy()
      }
    }




    if (this.gameScene) {
      console.log("entro acá")
      if (this.gameScene.levelIs == 1) {
        if (this.gameScene.checkPoint == 0) {
          this.rotateArrow("down");
        } else if (this.gameScene.checkPoint == 1 && this.gameScene.cameraNormal) {
          this.rotateArrow("up");
        } else if (this.gameScene.checkPoint == 1 && !this.gameScene.cameraNormal) {
          this.rotateArrow("down");
        }
      } else if (this.gameScene.levelIs == 2) {
        this.rotateArrow("down");
      };
    };
  };


  // Call this function whenever you want to change the texture of the next object


  closeSign(sign: number) {
    if (sign == 1) {
      this.progressParam = 2;
    } else if (sign == 2) {
      this.progressParam = 4;
    }
  }

  showCoin() {
    this.progressParam = 1;
  }

  showArrow() {
    this.progressParam = 3;
  }

  create(this: UIScene, data: { level: number; lifes: number }) {
    this.containerText = this.add.container(0, 0);
    this.containerLeft = this.add.container(0, 0);
    this.containerRight = this.add.container(0, 0);
    this.gameScene = this.game.scene.getScene("Game") as Game;
    this.lifesGroup = this.add.group();
    this.createUI(data.lifes);



    /* TIMER */
    this.timerText = this.add
      .text(300, 50, `${this.minutes}:${this.timeLevel}`, { fontSize: "32px" })
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0, 0)
      .setDepth(100)
      .setSize(50, 50)
      .setPosition(250, 55);
    this.timeLevel = 0;
    var timerEvent = this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.timeLevel++;
        this.timerText?.setText(`${this.minutes}:${this.timeLevel}`);
        // if (this.timeLevel > 10) {
        //   minutes++
        //   this.timeLevel = 0
        //   this.timerText?.setText(`${minutes}:${this.timeLevel}`)
        // }
        this.timeLevel = this.timeLevel;
      },
      callbackScope: this,
      loop: true,
    });
    var timerEvent = this.time.addEvent({
      delay: 60000,
      callback: () => {
        this.minutes++;
        this.timeLevel = 0
        this.timerText?.setText(`${this.minutes}:${this.timeLevel}`);
        // if (this.timeLevel > 10) {
        //   minutes++
        //   this.timeLevel = 0
        //   this.timerText?.setText(`${minutes}:${this.timeLevel}`)
        // }
        this.timeLevel = this.timeLevel;
      },
      callbackScope: this,
      loop: true,
    });

    this.containerLeft.add([this.timerText]);

    this.tweens.addCounter({
      from: 0,
      to: 30,
      duration: 1000,
      ease: window.Phaser.Math.Easing.Sine.InOut,
      yoyo: true,
      repeat: -1,
      onUpdate: (tween) => {
        let originalPosition = 0;
        if (this.progressParam == 1) {
          this.containerRight?.setPosition(0, 0);
          const value = tween.getValue();
          this.containerLeft?.setPosition(0, value);
        } else if (this.progressParam == 3) {
          this.containerLeft?.setPosition(0, 0);
          const value = tween.getValue();
          this.containerRight?.setPosition(0, value);
        } else {
          this.containerLeft?.setPosition(0, 0);
          this.containerRight?.setPosition(0, 0);
        }
      },
    });

    /* SCENE HANDLER */
    EventsCenter.on("gameOver", () => {
      this.timeLevel = 0;
      EventsCenter.removeListener("gravityArrow", this.rotateArrow, this);
      EventsCenter.removeListener("die", this.loseLife, this);
      EventsCenter.removeListener("coinCollected", this.coinCollected, this);
      EventsCenter.removeListener("nextLevel", this.nextLevel, this);
      EventsCenter.removeListener("coin", this.showCoin, this);
      EventsCenter.removeListener("noFloat", this.showArrow, this);
      EventsCenter.removeListener("closeSign", this.closeSign, this);
      EventsCenter.removeListener("gameOver", this.closeSign, this);
      //EventsCenter.on('rotateCam', this.rotateArrow, this);
      this.scene.stop();
    });
    EventsCenter.on("gravityArrow", this.rotateArrow, this);
    //EventsCenter.on('rotateCam', this.rotateArrow, this);
    EventsCenter.on("die", this.loseLife, this);
    EventsCenter.on("coinCollected", this.coinCollected, this);
    EventsCenter.on("nextLevel", this.nextLevel, this);
    EventsCenter.on("coin", this.showCoin, this);
    EventsCenter.on("noFloat", this.showArrow, this);
    EventsCenter.on("closeSign", this.closeSign, this);
  }

  update() {

    // this.timerText?.setPosition(
    //   // this.cameras.main.width - this.cameras.main.width / 10,
    //   // // 50
    //   // this.cameras.main.width - this.cameras.main.width / 1.15, 45
    // );
    if (this.cameras.main.width < this.cameras.main.height) {
      // this.timerText?.setPosition(160, 100);
      this.containerLeft?.setScale(
        this.cameras.main.width / this.cameras.main.height
      );
      this.containerRight?.setScale(
        this.cameras.main.width / this.cameras.main.height
      );
      this.containerText?.setScale(
        this.cameras.main.width / this.cameras.main.height
      );
    };
  };
};

