import Phaser, { GameObjects, Textures } from "phaser";
import UI, { UIConfig } from "./UI";
import Game from "../Game";
import containerSettings from "../containersMenu/containerSettings";

export default class UIClass {
  scene: Game;
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
  container: Phaser.GameObjects.Container;
  progressParam: number = 0;
  settingsVisible:boolean = false;
  settingsModal?:Phaser.GameObjects.Image
  quitGame?:Phaser.GameObjects.Image
  cross?:Phaser.GameObjects.Image
  check?:Phaser.GameObjects.Image
  album?:Phaser.GameObjects.Image
  brightness?:Phaser.GameObjects.Image
  brightnessFull?:Phaser.GameObjects.Image
  _sound?:Phaser.GameObjects.Image
  _soundFull?:Phaser.GameObjects.Image
  music?:Phaser.GameObjects.Image
  musicFull?:Phaser.GameObjects.Image
  title?:Phaser.GameObjects.Text
  albumText?:Phaser.GameObjects.Text
  musicSlider:any;
  soundSlider:any;
  brigthSlider:any;

  constructor(scene: Game, level: number, lifes: number, time: number) {
    this.scene = scene
    this.container = this.scene.add.container(0,0);
    this.createUIContainer({ level, lifes, time })
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
        const coras = new UI(this.scene, lifeConfig, this.lifesGroup)
       
        this.container.add(coras);
      }
      const settings: UIConfig = {
        texture: "settingsButton",
        pos: { x: window.innerWidth - 100, y: 70 },
        scale: 0.9,
      };
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
      this.settings = new UI(this.scene, settings);
      this.settings.setInteractive()
      const bg = this.scene.add.rectangle(0,0,window.innerWidth,window.innerHeight,0x000000, 0.3).setVisible(false).setOrigin(0);
      const testContainer = new containerSettings(this.scene, {x:-window.innerWidth/2,y:window.innerHeight/2})
      this.container.add(bg);
      this.settings.on('pointerup',()=>{
        this.settingsVisible = !this.settingsVisible
        bg.setVisible(!bg.visible)
        this.scene.tweens.add({
          targets:testContainer,
          x:testContainer.x < 0 ? window.innerWidth/2 : -window.innerWidth/2,
          duration:600,
          ease:'bounce'
        })
        if (this.settingsVisible ) {
          // if (!this.scene.graphics) {
          //     this.scene.graphics = this.scene.add.graphics();
          // }
          
         
     
        //   this.settingsModal =  this.scene.add.image(window.innerWidth / 2, window.innerHeight / 2, "settingsModal").setScale(0.9);
        //   this.title = this.scene.add.text(window.innerWidth / 2.2, 50, 'Settings', {
        //     fontSize: 17,
        //     color: "#00feff",
        //     stroke: "#00feff",
        //     align: "center",
        //     fontFamily: "Arcade",
        //     wordWrap: {
        //         width: window.innerWidth * 0.9,
        //     },
        //   }).setFontSize('60px');
        //   this.quitGame = this.scene.add.image(window.innerWidth / 2.1 + 20 , 750, 'settingsQuitGame');
        //   this.quitGame.setOrigin(0.5);
        //   this.quitGame.setInteractive()
        //   this.quitGame.on('pointerdown',()=>{
        //     if(this.quitGame)
        //     this.quitGame.setTexture('settingsQuitGamePressed')
        //   })
        //   this.quitGame.on('pointerup',()=>{
        //     if(this.quitGame)
        //     this.quitGame.setTexture('settingQuitGameHover')
        //   })
        //   this.quitGame.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,()=>{
        //     if(this.quitGame)
        //     this.quitGame.setTexture('settingQuitGameHover')
        //   })
        //   this.quitGame.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
        //     if(this.quitGame)
        //     this.quitGame.setTexture('settingsQuitGame')
        //   })
        //   this.cross = this.scene.add.image(window.innerWidth / 2.2 , 850, 'settingsCross').setScale(0.8);
        //   this.cross.setOrigin(0.5);
        //   this.cross.setInteractive();
        //   this.cross.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,()=>{
        //     if(this.cross)
        //       this.cross.setTexture('settingsCrossHover')
        //   })
        //   this.cross.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
        //     if(this.cross)
        //       this.cross.setTexture('settingsCross')
        //   })
        //   this.cross.on('pointerdown',()=>{
        //     if(this.cross)
        //       this.cross.setTexture('settingsCrossPessed')
        //   })
        //   this.cross.on('pointerup',()=>{
        //     if(this.cross)
        //       this.cross.setTexture('settingsCrossHover')
        //       // this.volume = this.scene.sound.volume
        //       // if (config.panToInitial) {
        //       //     this.scene.cameras.main.pan(config.panToInitial.x, config.panToInitial.y, 1000, 'Expo', true)
        //       // }
        //   })
        //   this.check = this.scene.add.image(window.innerWidth / 1.9 -10, 850, 'settingsCheck').setScale(0.8);
          
        //  this.check.setOrigin(0.5);
        //  this.check.setInteractive();
        //  this.check.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,()=>{
        //   if(this.check)
        //     this.check.setTexture('settingsCheckHover')
        //  })
        //  this.check.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
        //   if(this.check)
        //     this.check.setTexture('settingsCheck')
        //  })
        //   this.check.on('pointerdown',()=>{
        //   if(this.check)
        //     this.check.setTexture('settingsCheckPressed')
        //   })
        //   this.check.on('pointerup',()=>{
        //   if(this.check)
        //     this.check.setTexture('settingsCheckHover')
        //     // const volume = parseFloat((this.volume ?? '').toString());
        //     // if (!isNaN(volume) && volume !== this.scene.sound.volume) { 
        //     //     this.scene.sound.volume = volume < 0.55 ? 0 : Math.min(1, Math.max(0, volume));
        //     // }
        //     // if (config.panToInitial) {
        //     //     this.scene.cameras.main.pan(config.panToInitial.x, config.panToInitial.y, 1000, 'Expo', true)
        //     // }
        //   })
        //   this.album = this.scene.add.image(window.innerWidth / 3 + 120, 650, "settingsAlbum");
        //   this.album.setOrigin(0.5);
        //   this.albumText = this.scene.add.text(window.innerWidth / 3 + 150, 630, 'Album', {
        //       fontSize: 30,
        //       color: "#00feff",
        //       stroke: "#00feff",
        //       align: "center",
        //       fontFamily: "Arcade",
        //       wordWrap: {
        //           width: window.innerWidth * 0.9,
        //       },
        //   });
        //   this.brightness = this.scene.add.image(window.innerWidth / 3 + 80,  520, "settingsBrightness");
        //   this.brightness.setOrigin(0.5);
        //   this.brightnessFull = this.scene.add.image(window.innerWidth / 2 + 160,  520, "settingsBrightnessFull");
        //   this.brightnessFull.setOrigin(0.5);

        //   this._sound = this.scene.add.image(window.innerWidth / 3 + 80, 380, "settingsSound");
        //   this._sound.setOrigin(0.5);
        //   this._soundFull = this.scene.add.image(window.innerWidth / 2 + 160, 380, "settingsSoundFull");
        //   this._soundFull.setOrigin(0.5);

        //   this.music = this.scene.add.image(window.innerWidth / 3 + 80, 240, "settingsSound");
        //   this.music.setOrigin(0.5);
        //   this.musicFull = this.scene.add.image(window.innerWidth / 2 + 160, 240, "settingsSoundFull");
        //   this.musicFull.setOrigin(0.5);

        //  this.musicSlider = this.createSlider(this.scene, window.innerWidth / 2 -30, 520,(value) => {
        //     // this.volume = value * 100
        //     // console.log("Music Slider Value:", this.volume);
        //   });
          

        // this.soundSlider = this.createSlider(this.scene, window.innerWidth / 2 -30, 380,(value) => {
        //     // this.volume = value * 100
        //     // console.log("Music Slider Value:", this.volume);
        // });

        // this.brigthSlider =  this.createSlider(this.scene, window.innerWidth / 2 -30, 240,(value) => {
        //     console.log("Brightness Slider Value:", value);
        // })

        } else {
          if (this.scene.graphics) {
              this.scene.graphics.clear();
              // if(this.settingsModal && this.title){
              //   this.settingsModal.destroy();
              //   this.title.destroy();
              //   this.quitGame?.destroy()
              //   this.album?.destroy()
              //   this.albumText?.destroy()
              //   this.brightness?.destroy()
              //   this.brightnessFull?.destroy()
              //   this._sound?.destroy()
              //   this._soundFull?.destroy()
              //   this.music?.destroy()
              //   this.musicFull?.destroy()
              //   this.cross?.destroy()
              //   this.check?.destroy()
              //   const container = (this.musicSlider.slider as Phaser.GameObjects.Container)
              //   container.setVisible(false)
              // }
              
          }
      }
        console.log(this.settingsVisible)
      })

      this.container.add(this.uiContainer);
      this.container.add(this.uiIndicator);
      // this.container.add(this.settings);



      const coinConf: UIConfig = {
        pos: { x: lifes + 95, y: 70 },
        //@ts-ignore
        texture: this.scene.map?.UIItemToGrab,
        scale: this.scene.map?.UIItemScale ? this.scene.map?.UIItemScale : 0.55,
      };
      this.coinUI = new UI(this.scene, coinConf)
        .setTint(Phaser.Display.Color.GetColor(0, 0, 0));

      this.container.add(this.coinUI);
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

