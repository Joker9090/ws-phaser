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
  UIboundsCoin: number = 0;
  UIboundsArrow: number = 0;
  UIboundsHeart: number = 0;
  ArrowOriginalPos?: number;
  CoinOriginalPos?: number;
  timeLevel: number = 0;
  timerText?: Phaser.GameObjects.Text;
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
        xpos = 100 + i * 50;
        const lifeConfig: UIConfig = {
          texture: "heart",
          pos: { x: xpos, y: 50 },
          scale: 0.1,
        };
        const coras = new UI(this, lifeConfig, this.lifesGroup).setScrollFactor(
          0,
          0
        );
        this.containerLeft?.add(coras);
        this.lifesGroup?.setDepth(100);
      }

      const coinConf: UIConfig = {
        texture: "coin",
        pos: { x: lifes * 50 + 150, y: 50 },
        scale: 0.1,
      };
      this.CoinOriginalPos = quantityLifes * 50 + 150;
      this.coinUI = new UI(this, coinConf)
        .setTint(Phaser.Display.Color.GetColor(0, 0, 0))
        .setScrollFactor(0, 0)
        .setDepth(100);
      this.containerLeft?.add(this.coinUI);

      const arrowConfig: UIConfig = {
        texture: "fallingGuy",
        pos: { x: lifes * 50 + 275, y: 50 },
        scale: 0.1,
      };
      this.ArrowOriginalPos = quantityLifes * 50 + 250;
      this.gravityArrow = new UI(this, arrowConfig)
        .setRotation(0)
        .setScrollFactor(0, 0)
        .setDepth(100);
      this.containerRight?.add(this.gravityArrow);
    }
  }

  rotateArrow(direction: string) {
    if (direction == "down") {
      this.gravityArrow?.setRotation(0);
    } else if (direction == "up") {
      this.gravityArrow?.setRotation(Math.PI);
    } else if (direction == "left") {
      this.gravityArrow?.setRotation(Math.PI/2);
    } else if (direction == "right") {
      this.gravityArrow?.setRotation(-Math.PI/2);
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
          const child = this.lifesGroup.getChildren()[
            i
          ] as Phaser.GameObjects.Image;
          if (child.x > highestX) {
            lifeToTheRight = child;
            highestX = child.x;
          }
        }
        lifeToTheRight?.destroy();
      }
    }
    if (this.gameScene){
      console.log("entro acá")
      if (this.gameScene.levelIs == 1){
        if (this.gameScene.checkPoint == 0){
          this.rotateArrow("down");
        } else if(this.gameScene.checkPoint == 1 && this.gameScene.cameraNormal){
          this.rotateArrow("up");
        } else if(this.gameScene.checkPoint == 1 && !this.gameScene.cameraNormal){
          this.rotateArrow("down");
        }
      } else if (this.gameScene.levelIs == 2) {
        this.rotateArrow("down");
      };
    };
  };

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
      .text(this.cameras.main.width - 120, 50, "Time: 0", { fontSize: "32px" })
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0, 0)
      .setDepth(100)
      .setSize(50, 50);
    this.timeLevel = 0;
    var timerEvent = this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.timeLevel++;
        this.timerText?.setText("Time: " + this.timeLevel);
        this.timeLevel = this.timeLevel;
      },
      callbackScope: this,
      loop: true,
    });
    
    this.containerText.add([this.timerText]);

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

    this.timerText?.setPosition(
      this.cameras.main.width - this.cameras.main.width / 10,
      50
    );
    if (this.cameras.main.width < this.cameras.main.height) {
      this.timerText?.setPosition(160, 100);
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

