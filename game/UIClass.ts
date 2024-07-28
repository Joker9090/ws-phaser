import Phaser, { GameObjects } from "phaser";
import Tutorial from "./maps/Tutorial";
import UI, { UIConfig } from "./assets/UI";
import TextBox from "./assets/TextBox";
import Game from "./Game";
import EventsCenter from "./EventsCenter";

export default class UIClass {
  scene: Game;

  lifesGroup?: Phaser.GameObjects.Group;

  gravityArrow?: Phaser.GameObjects.Image;

  coinUI?: Phaser.GameObjects.Image;

  uiContainer?: Phaser.GameObjects.Image;
  uiIndicator?: Phaser.GameObjects.Image;
  UIboundsCoin: number = 0;
  UIboundsArrow: number = 0;
  UIboundsHeart: number = 0;
  ArrowOriginalPos?: number;
  CoinOriginalPos?: number;
  timeLevel: number = 0;
  timerText?: Phaser.GameObjects.Text;
  minutes: number = 0;
  container: Phaser.GameObjects.Container;
  progressParam: number = 0;

  constructor(scene: Game, level: number, lifes: number, time: number) {
    this.scene = scene
    this.container = this.scene.add.container(0,0);
    this.createUIContainer({ level, lifes, time })
  }

  createUI(lifes: number) {
    console.log(lifes, "ARIEL LIFES")
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
        const coras = new UI(this.scene, lifeConfig, this.lifesGroup)
        // setScrollFactor(
        //   0,
        //   0
        // );
        this.container.add(coras);
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
      this.uiIndicator = new UI(this.scene, uiIndicator).setScrollFactor(0, 0);
      this.uiContainer = new UI(this.scene, uiContainer)
        // .setTint(Phaser.Display.Color.GetColor(0, 0, 0))
        .setScrollFactor(0, 0)
        .setDepth(100)

        // .setRotation(0.7)
        ;
      this.container.add(this.uiContainer);
      this.container.add(this.uiIndicator);


      const coinConf: UIConfig = {
        pos: { x: lifes + 95, y: 70 },
        texture: "coin",
        scale: 0.15,
      };
      // this.CoinOriginalPos = quantityLifes * 50 + 150;
      this.coinUI = new UI(this.scene, coinConf)
        .setTint(Phaser.Display.Color.GetColor(0, 0, 0))
        .setScrollFactor(0, 0)
        .setDepth(100)
        // .setScale(0.9)
        // .setRotation(0.7)
        ;
      this.container.add(this.coinUI);
      console.log("container en create UI", this.container)

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
    // this.timeLevel = 0;
    this.coinUI?.setTint(Phaser.Display.Color.GetColor(0, 0, 0));
  }

  loseLife(lifes: number) {
    // Remove the object with the highest x position
    this.scene.cameras.main.flash(700, 255, 19, 30, true);
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

    if (this.scene) {
      console.log("entro acá")
      if (this.scene.levelIs == 1) {
        if (this.scene.checkPoint == 0) {
          this.rotateArrow("down");
        } else if (this.scene.checkPoint == 1 && this.scene.cameraNormal) {
          this.rotateArrow("up");
        } else if (this.scene.checkPoint == 1 && !this.scene.cameraNormal) {
          this.rotateArrow("down");
        }
      } else if (this.scene.levelIs == 2) {
        this.rotateArrow("down");
      };
    };
  };


  createUIContainer(this: UIClass, data: { level: number; lifes: number, time: number }) {

    this.lifesGroup = this.scene.add.group();
    this.createUI(data.lifes);


    this.timeLevel = 0;

    /* TIMER */
    this.minutes = 0,
    this.timeLevel = 0
    this.timerText = this.scene.add
      .text(300, 50, `0${this.minutes}:0${this.timeLevel}`, { fontSize: "32px" })
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0, 0)
      .setDepth(100)
      .setSize(50, 50)
      .setPosition(250, 55);
    this.timeLevel = 0;
    this.timerText?.setText(`0${this.minutes}:0${this.timeLevel}`);
    var timerEvent = this.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        this.timeLevel++;
        if (this.minutes < 10 && this.timeLevel < 10) {
          this.timerText?.setText(`0${this.minutes}:0${this.timeLevel}`);
        } else if (this.minutes >= 10 && this.timeLevel >= 10) {
          this.timerText?.setText(`${this.minutes}:${this.timeLevel}`);
        } else if (this.minutes < 10 && this.timeLevel >= 10) {
          this.timerText?.setText(`0${this.minutes}:${this.timeLevel}`);
        } else if (this.timeLevel < 10 && this.minutes >= 10) {
          this.timerText?.setText(`${this.minutes}:0${this.timeLevel}`);
        }
        this.timeLevel = this.timeLevel;
      },
      callbackScope: this,
      loop: true,
    });
    var timerEvent = this.scene.time.addEvent({
      delay: 60000,
      callback: () => {
        this.minutes++;
        this.timeLevel = 0
        this.timerText?.setText(`${this.minutes}:${this.timeLevel}`);
        this.timeLevel = this.timeLevel;
      },
      callbackScope: this,
      loop: true,
    });

    this.container.add([this.timerText]);
    this.scene.cameras.main.ignore(this.container)

  }

  update() {

  };
};

