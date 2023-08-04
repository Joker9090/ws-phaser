import Phaser, { GameObjects } from "phaser";
//import Tutorial from "./maps/Tutorial";
import UI, { UIConfig } from "./assets/UI";
import TextBox from "./assets/TextBox";
//import Game from "./Game";
import EventsCenter from "./EventsCenter";
import MultiBar from "./assets/MultiBar";

export default class UIScene extends Phaser.Scene {
  tutorialTextBox?: TextBox;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  //gameScene?: Game;
  //TutorialMap?: Tutorial;
  timeLevel: number = 0;
  timerText?: Phaser.GameObjects.Text;
  containerText?: Phaser.GameObjects.Container;
  containerLeft?: Phaser.GameObjects.Container;
  containerRight?: Phaser.GameObjects.Container;
  progressParam: number = 0;
  //playerLifeAvatarContainer?: 

  ContenedorBarra?: Phaser.GameObjects.Image;


  /**ELEMENTOS A EXPORTAR PARA USAR EVENTOS */

  contEnemysInGame?: Phaser.GameObjects.Text;
  contHeroeExp?: Phaser.GameObjects.Text;
  lifeBarInGame?: MultiBar;
  staminaBarInGame?: MultiBar;
  expBarInGame?: MultiBar;
  insigniaPoder?: Phaser.GameObjects.Image;

  constructor() {
    super({ key: "UIScene" });
    
    
  }
  preload() {
  }

  lifeUpdate = (life: number) => {
    //console.log("EMITIO VIDA arg:", life);
    this.lifeBarInGame?.updateBar(life);
  }

  staminaUpdate = (stamina: number) => {
    //console.log("EMITIO staminaUpdate arg:", stamina);
    this.staminaBarInGame?.setBarNew(stamina);
  }

  levelUp = (newLevel: number) => {
    //console.log("EMITIO LEVEL UP arg: ", newLevel);
    let a = newLevel.toString();
    if(this.contHeroeExp) (this.contHeroeExp.text && this.contHeroeExp.text.length >= 2) ? this.contHeroeExp.setText(""+a).setOrigin(0.2,0) : this.contHeroeExp.setText(""+a).setOrigin(0);
    //this.contHeroeExp?.setText(""+newLevel);
    
  }

  expUpdate = (addExp: number) => {
    //console.log("EMITIO expUpdate arg:", addExp);
    this.expBarInGame?.setBarNew(addExp);
  }

  enemysInMap = (enemyCounter: number) => {
    //console.log("EMITIO enemysInMap arg: ", enemyCounter);
    let a = enemyCounter.toString();
    if(this.contEnemysInGame) (this.contEnemysInGame.text.length >= 2) ? this.contEnemysInGame.setText(a).setOrigin(0.2,0) : this.contEnemysInGame.setText(a).setOrigin(0);
  }

  powerNeed = (active: boolean) => {
    if(active) {
      this.insigniaPoder?.setAlpha(1);
    }else {
      this.insigniaPoder?.setAlpha(0.5);
    }
  }

  powerChange = (newPower: string) => {

  }



  create(this: UIScene, data: { levelUp: string }) {

    //console.log("Data a UISCENE: ", data);
    
    //const newFont = new FontFace("BERNHC","/game/newAssets/fonts/BERNHC.ttf")
    this.containerText = this.add.container(0, 0);
    this.containerLeft = this.add.container(0, 0);
    this.containerRight = this.add.container(0, 0);
    //this.gameScene = this.game.scene.getScene("Game") as Game;

    //this.createUI(data.lifes);
    //console.log("DIMENSIONES UI", this.game.canvas.width, this.game.canvas.height);
    //console.log("Entro UI SCENE");

    /**VIDA Y AVATAR BASIC */
    const fondoAvatar = this.add.image(124,88,"fondoAvatar").setScale(0.39).setDepth(90);
    const HeroeAvatar = this.add.image(124,85,"baseAvatar").setScale(0.3).setDepth(90);
    this.ContenedorBarra = this.add.image(150,120,"ContenedorBarra").setScale(0.7).setDepth(90);
    //const HeroeExp = this.add.text(110,130, "16", {font: newFont.family, fontSize: "23px", color: "#B6DFE9"}).setDepth(1);
    this.contHeroeExp = this.add.text(120,122, "1", {fontFamily: "Enchanted Land" ,fontSize: "34px", color: "#B6DFE9"}).setOrigin(0).setDepth(90);
   

    const LifeConfig = {
      x: 380,
      y: 80,
      sprite: "BarraVida",
      spriteContainer: "FondoBarraVida",
      startFull: true,
    }
    const StaminaConfig = {
      x: 350,
      y: 110,
      sprite: "BarraPoder",
      spriteContainer: "ContenedorBarraPoder",
      startFull: true,
    }

    const ExpConfig = {
      x: (this.game.canvas.width/2)+ 180,
      y: 35,
      sprite: "ProgresoRellenop",
      spriteContainer: "ProgresoBorde",
      startFull: false,
      scale: 0.8,
      
    }

    this.lifeBarInGame = new MultiBar(this, LifeConfig);
    this.staminaBarInGame = new MultiBar(this,StaminaConfig);
    this.expBarInGame = new MultiBar(this, ExpConfig);


    /**CONTADOR ENEMIGOS BASIC */
    const contEnemys = this.add.image(this.game.canvas.width - 200,this.game.canvas.height - 100,"ContadorEnemigos").setDepth(90).setScale(0.7);
    this.contEnemysInGame = this.add.text(this.game.canvas.width - 205,this.game.canvas.height - 74, "0", {fontFamily: "Enchanted Land" ,fontSize: "28px", color: "#B6DFE9"}).setDepth(91).setOrigin(0.5);

    /**InsigniaPoder */
    this.insigniaPoder = this.add.image(110,this.game.canvas.height - 100,"InsigniaPoder").setScale(0.4).setDepth(100);

    /*
    const dmgSimu = (dmg: number) => {
      if(dmg == 10) this.lifeBarInGame?.updateBar(10);
      else if(dmg == 20) this.lifeBarInGame?.updateBar(10);
      else if(dmg == 30) this.lifeBarInGame?.updateBar(10);
      else if(dmg == 40) this.lifeBarInGame?.updateBar(10);
      else if(dmg == 50) this.lifeBarInGame?.updateBar(10);
      else if(dmg == 60) this.lifeBarInGame?.updateBar(10);
      else if(dmg == 70) this.lifeBarInGame?.updateBar(10);
      else if(dmg == 80) this.lifeBarInGame?.updateBar(10);
      else if(dmg == 90) this.lifeBarInGame?.updateBar(10);
      else if(dmg == 100) this.lifeBarInGame?.updateBar(10);
    };
    */



  

    /* TIMER */
    /*     this.timerText = this.add
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
        //dmgSimu(this.timeLevel);
        //this.expUpdate(10);
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
    }); */

    /**SCENE HANDLER */
    EventsCenter.on("lifeUpdate",this.lifeUpdate, this);
    EventsCenter.on("staminaUpdate",this.staminaUpdate, this);
    EventsCenter.on("levelUp",this.levelUp, this);
    EventsCenter.on("expUpdate",this.expUpdate, this);
    EventsCenter.on("enemysInMap",this.enemysInMap, this);
    EventsCenter.on("powerNeed", this.powerNeed, this);
    //EventsCenter.on("powerChange", () => {});

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

    /*     this.timerText?.setPosition(
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
    }; */
  };
};
