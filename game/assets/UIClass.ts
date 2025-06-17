import Phaser, { GameObjects, Textures } from "phaser";
import UI, { UIConfig } from "./UI";
import Game from "../Game";
import containerSettings from "../containersMenu/containerSettings";
import CinematographyModular from "../movies/Cinematography-modular";
import ContainerCredits from "../containersMenu/containerCredits";
import MasterManager from "../MasterManager";
import resultContainer from "../containersMenu/resultContainer";

export default class UIClass {
  scene: Game | CinematographyModular;
  lifesGroup?: Phaser.GameObjects.Group;
  gravityArrow?: Phaser.GameObjects.Image;
  coinUI?: Phaser.GameObjects.Image;
  uiContainer?: Phaser.GameObjects.Image;
  uiIndicator?: Phaser.GameObjects.Image;
  settings?: Phaser.GameObjects.Image;
  UIboundsCoin: number = 0;
  UIboundsArrow: number = 0;
  UIboundsHeart: number = 0;
  ArrowOriginalPos?: number;
  CoinOriginalPos?: number;
  timeLevel: number = 0;
  timerText?: Phaser.GameObjects.Text;
  minutes: number = 0;
  //TEST COLLECTABLES
  collText?: Phaser.GameObjects.Text;
  collected: number=0;

  container: Phaser.GameObjects.Container;
  progressParam: number = 0;
  settingsVisible: boolean = false;
  settingsModal: containerSettings |undefined = undefined 
  quitGame?: Phaser.GameObjects.Image
  cross?: Phaser.GameObjects.Image
  check?: Phaser.GameObjects.Image
  album?: Phaser.GameObjects.Image
  brightness?: Phaser.GameObjects.Image
  brightnessFull?: Phaser.GameObjects.Image
  _sound?: Phaser.GameObjects.Image
  _soundFull?: Phaser.GameObjects.Image
  music?: Phaser.GameObjects.Image
  musicFull?: Phaser.GameObjects.Image
  title?: Phaser.GameObjects.Text
  albumText?: Phaser.GameObjects.Text
  musicSlider: any;
  soundSlider: any;
  brigthSlider: any;
  masterManager: MasterManager;

  constructor(scene: Game | CinematographyModular, level: number, lifes: number, time: number) {
    this.scene = scene
    this.container = this.scene.add.container(-window.innerWidth, 0);

    this.scene.tweens.add({
      targets: this.container,
      x: 0,
      duration: 1300,
      delay:1000,
      ease: 'Bounce.easeOut'
    })

    this.createUIContainer({ level, lifes, time })

    let masterManagerScene = scene.game.scene.getScene("MasterManager") as MasterManager;
    if (!masterManagerScene) {
      this.masterManager = new MasterManager();
      this.scene.scene.add("MasterManager", this.masterManager, true);
    } else {
      this.masterManager = masterManagerScene;
      // this.scene.scene.launch("MasterManager");
    }
  }

  createUI(lifes: number) {
    let quantityLifes = 0;
    let xpos = 0;
    if (lifes) {
      if (this.scene instanceof Game) {
        for (let i = 0; i < lifes; i++) {
          quantityLifes += 1;
          xpos = 205 + i * 50;
          const lifeConfig: UIConfig = {
            texture: "uiLifeSection",
            pos: { x: xpos, y: 90 },
            scale: 0.9,
          };
          const coras = new UI(this.scene, lifeConfig, this.lifesGroup)
          this.container.add(coras);
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
        this.uiIndicator = new UI(this.scene, uiIndicator);
        this.uiContainer = new UI(this.scene, uiContainer);
        this.container.add(this.uiContainer);
        this.container.add(this.uiIndicator);

        const coinConf: UIConfig = {
          pos: { x: lifes + 95, y: 70 },
          //@ts-ignore
          texture: this.scene.map?.UIItemToGrab,
          scale: this.scene.map?.UIItemScale ? this.scene.map?.UIItemScale : 0.55,
        };
        this.coinUI = new UI(this.scene, coinConf);
          //.setTint(Phaser.Display.Color.GetColor(0, 0, 0));

        this.container.add(this.coinUI);
      }
      const settingsConf: UIConfig = {
        texture: "settingsButton",
        pos: { x: window.innerWidth - 70, y: 50 },
        scale: 0.9,
      };
      this.settings = new UI(this.scene, settingsConf);
      this.settings.setInteractive()
      // const bg = this.scene.add.rectangle(0, 0, window.innerWidth, window.innerHeight, 0x000000, 0.3).setVisible(false).setOrigin(0);
      // this.container.add(bg);
      // this.container.add(this.settings);

      this.settings.on('pointerup', () => {
        this.toggleSettings()
      })
    }
    this.scene.input.keyboard?.on('keydown-ESC', () => {
      this.toggleSettings();
    });

    this.scene.scale.on("resize", ()=>{
      this.resizeElements()
    })
    console.log(window.innerHeight / 1920, 'data22')
    this.resizeElements();
  }

  resizeElements(){
    const scaleFactor = window.innerHeight / 1920;
    // console.log("scaleFactor", scaleFactor)
    this.container.setScale(scaleFactor + 0.5);
    this.container.setPosition(0, 0);
    this.uiContainer?.setPosition(200, 70);
    this.settings?.setScale(scaleFactor + 0.5);
    this.settings?.setPosition(window.innerWidth - 50, 50)
    // if(window.innerWidth < 768){
    // }
    // else{
    //   this.settings?.setPosition(window.innerWidth - 70, 70)
      
    // }
  }

  toggleSettings() {
    if(this.scene.canWin){
      if (this.settingsVisible) {
        this.container.each((child: any) => {
          if (child instanceof containerSettings) {
            child.crossPress()
            this.settingsModal = undefined
          }else if(child instanceof UI){
            child.setVisible(true)
          }
        })
        this.collText?.setVisible(true)
        this.settingsVisible = false
      } else {
        this.settingsModal = new containerSettings(this.scene, { x: window.innerWidth / 2, y: window.innerHeight / 2, dinamicPosition:true }, undefined, () => { this.settingsVisible = !this.settingsVisible }, this.settings)
        this.masterManager.playSound('buttonSound', false)
        this.masterManager.pauseGame()
        this.settings?.setVisible(false)
        this.container.each((child: any) => {
          if(child  instanceof UI){ {
              child.setVisible(false)
            }
          } 
        })
        this.collText?.setVisible(false)
        // this.container.add(this.settingsModal)
        this.settingsVisible = true
      }
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

  loseLife(lifes: number) {
    // Remove the object with the highest x position
    this.scene.cameras.main.flash(700, 255, 19, 30, true);
    if (this.lifesGroup) {
      if (lifes !== 0) {
        let lifeToTheRight = null;
        let highestX = Number.NEGATIVE_INFINITY;
        for (let i = 0; i < this.lifesGroup.getLength(); i++) {
          const child = this.lifesGroup.getChildren()[i] as Phaser.GameObjects.Image;
          if (child.x > highestX) {
            lifeToTheRight = child;
            highestX = child.x;
          }
        }
        lifeToTheRight?.destroy()
      }
    }
  };


  createUIContainer(this: UIClass, data: { level: number; lifes: number, time: number }) {

    this.lifesGroup = this.scene.add.group();
    this.createUI(data.lifes);
    this.timeLevel = 0;
    if (this.scene instanceof Game) {
      this.collected = this.scene.collectedItems.length || 0;
    }
    // checkeo si estoy en game o cinemato 
    if (this.scene instanceof Game) {
      this.minutes = 0,
      this.timeLevel = 0
      //HIDE TIMER
      /*this.timerText = this.scene.add
        .text(300, 50, `0${this.minutes}:0${this.timeLevel}`, { fontSize: "32px" })
        .setOrigin(0.5, 0.5)
        .setScrollFactor(0, 0)
        .setDepth(100)
        .setSize(50, 50)
        .setPosition(250, 55);*/
      
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
      //HIDE TIMER
      //this.container.add([this.timerText]);

      this.collText = this.scene.add
        .text(250, 57.5, `${this.collected}`, { fontSize: "32px" })//.text(150, 150, `${this.collected}`, { fontSize: "32px" })
        .setOrigin(0.5, 0.5)
        .setScrollFactor(0, 0)
        .setDepth(100)
        .setSize(50, 50);
      this.container.add([this.collText]);
    }
    this.scene.cameras.main.ignore(this.container)
    this.scene.cameras.getCamera('backgroundCamera')?.ignore(this.container);
    this.scene.cameras.getCamera('backgroundCamera')?.ignore(this.lifesGroup);
  }
  sumCollectable(){
    this.collected++;
    this.collText?.setText(`${this.collected}`);
  }

  update() {

  };
};

