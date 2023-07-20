import Phaser, { GameObjects } from "phaser";
//import Tutorial from "./maps/Tutorial";
import UI, { UIConfig } from "./assets/UI";
import TextBox from "./assets/TextBox";
//import Game from "./Game";
import EventsCenter from "./EventsCenter";

export default class UIScene extends Phaser.Scene {
  tutorialTextBox?: TextBox;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  //gameScene?: Game;
  //TutorialMap?: Tutorial;
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

  ContenedorBarra?: Phaser.GameObjects.Image;

  constructor() {
    super({ key: "UIScene" });
    
  }

  create(this: UIScene, data: { level: number }) {
    this.containerText = this.add.container(0, 0);
    this.containerLeft = this.add.container(0, 0);
    this.containerRight = this.add.container(0, 0);
    //this.gameScene = this.game.scene.getScene("Game") as Game;
    this.lifesGroup = this.add.group();
    //this.createUI(data.lifes);
    console.log("Entro UI SCENE");
    this.ContenedorBarra = this.add.image(300,700,"ContenedorBarra").setDepth(1);

    const graph = new Phaser.Geom.Rectangle(20,20,500,50)

  

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
    /*
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
    EventsCenter.on("closeSign", this.closeSign, this);*/
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
