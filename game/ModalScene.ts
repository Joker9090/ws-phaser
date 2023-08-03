import Phaser, { GameObjects } from "phaser";
//import Tutorial from "./maps/Tutorial";
import UI, { UIConfig } from "./assets/UI";
import TextBox from "./assets/TextBox";
//import Game from "./Game";
import EventsCenter from "./EventsCenter";
import MultiBar from "./assets/MultiBar";

export default class ModalScene extends Phaser.Scene {
  circuloA?: Phaser.GameObjects.Image;
  circuloB?: Phaser.GameObjects.Image;

  conteinerA?: Phaser.GameObjects.Container;
  conteinerB?: Phaser.GameObjects.Container;

  constructor() {
    super({ key: "ModalScene" });
    
    
  }
  preload() {
  }


  createInformationModal = (textInfo: string) => {

    
    const backgroundModal = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2 - 200, "InformationModal").setDepth(90).setScale(1.2);
    const principalTitle = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2 - 185,"InformationTitle").setDepth(91);

    const principalTitleText = this.add.text(this.game.canvas.width/2,this.game.canvas.height/2 - 185, "Information",{fontSize: "18px", color: "#B6DFE9"}).setDepth(92).setOrigin(0.5);



    console.log("modal tutorial background: ", backgroundModal.height, backgroundModal.width);

    const textInfoModal = this.add.text(this.game.canvas.width/2,this.game.canvas.height/2 + 125,""+textInfo).setDepth(92).setOrigin(0.5);

    const buttonImage = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2 + 225,"Information3").setDepth(91);

    const buttonText = this.add.text(this.game.canvas.width/2,this.game.canvas.height/2 + 225, "Continue",{fontSize: "26px", color: "#B6DFE9"}).setDepth(92).setOrigin(0.5);


  }

  createTutorialModal = (textInfo: string) => {

    const backgroundModal = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2, "TutorialModal").setDepth(90);
    const principalImg = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2 - 215, "TutorialTitle").setDepth(91);
    //const middleImage = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2 + 150, "");

    console.log("modal tutorial background: ", backgroundModal.height, backgroundModal.width);

    const textInfoModal = this.add.text(this.game.canvas.width/2,this.game.canvas.height/2 + 125,""+textInfo).setDepth(92).setOrigin(0.5);

    const buttonImage = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2 + 225,"TutorialContinueButton").setDepth(91);

    const buttonText = this.add.text(this.game.canvas.width/2,this.game.canvas.height/2 + 225, "Continue",{fontSize: "26px", color: "#B6DFE9"}).setDepth(92).setOrigin(0.5);

  }

  createLevelReward = (title: string ,content: number) => {
    const backgroundModal = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2,"LevelRewardmodal").setDepth(90);
    const textTitle = this.add.text(this.game.canvas.width/2 - 80,this.game.canvas.height/2 - 220,title,{fontSize: "40px", color: "#B6DFE9"}).setDepth(92);

    this.circuloA = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2 - 15,"LevelRewardAnim1").setDepth(91).setOrigin(0.5);
    this.circuloB = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2 - 15,"LevelRewardAnim2").setDepth(91).setOrigin(0.5);

    //agregar animacion de las luces de atras AQUI

    if(title == "Lvl.up"){

      console.log("Entro lvl up ");
      let a = content.toString();
      const icon = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2,"LevelRewardlevel").setDepth(92);
      const lvlText = this.add.text(this.game.canvas.width/2,this.game.canvas.height/2,""+a,{fontSize: "40px", color: "#B6DFE9"}).setDepth(92).setOrigin(0.5);

      //agregar boton

      //add to conteiner
      this.conteinerA?.add([
        backgroundModal,
        textTitle,
        this.circuloA,
        this.circuloB,
        icon,
        lvlText]);

        return this.circuloA;

    } else {
      console.log("Entro reward ");
      let a = content.toString();
      const icon = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2,"LevelRewardcoins").setDepth(92);

      const iconQty = this.add.image(this.game.canvas.width/2 - 140,this.game.canvas.height/2 + 100,"LevelRewardcoinsQty").setDepth(92);

      const qtyText = this.add.text(this.game.canvas.width/2 - 145,this.game.canvas.height/2 + 90,""+a,{fontSize: "40px", color: "##F1D69E"}).setDepth(92).setOrigin(0.5);

      this.conteinerB?.add([
        backgroundModal,
        textTitle,
        this.circuloA,
        this.circuloB,
        icon,
        iconQty,
        qtyText
      ])

      //agregar boton

    }
  }

  testAnim = (obj:any) => {
    this.tweens.add({
      targets: obj,
      props: {
          scaleX: { value: 0, duration: 1000, yoyo: true },
          texture: { value: 'front', duration: 0, delay: 1000 }
      },
      ease: 'Linear'
  });
  }



  create(this: ModalScene, data: { type: string, content: number, textInfo?: string }) {

    //let div = document.getElementById('game-container');
    //if(div)div.style.backgroundColor = "#4488AA";

    //this.cameras.main.setAlpha(0.5);
    console.log("Data a ModalScene: ", data);


    this.cameras.main.fadeIn(3000, 0, 0, 0)
    
    //const newFont = new FontFace("BERNHC","/game/newAssets/fonts/BERNHC.ttf")

    switch (data.type) {
      case "Information":
        if(data.textInfo) {
          const infoModal = this.createInformationModal(data.textInfo);
        }
      break;
      case "tutorial":
        if(data.textInfo) {
          const tutorialModal = this.createTutorialModal(data.textInfo);
        }
      
      break;
      case "Lvl.up":
        const levelUpCard = this.createLevelReward(data.type,data.content);
        //this.testAnim(levelUpCard);
      break;
      case "Reward":
        const rewardCard = this.createLevelReward(data.type,data.content);
        //this.testAnim(rewardCard);
      break;
    
      default:
        break;
    }

    

    /**SCENE HANDLER */

    //EventsCenter.on("levelUp",this.levelUp, this);

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
    if(this.circuloA && this.circuloB) {
      this.circuloA.rotation += 0.001;
      this.circuloB.rotation -= 0.001;
    }

  };
};
