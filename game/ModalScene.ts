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

  card1?: string;
  card2?: string;
  card3?: string;
  cardsArray?: Phaser.GameObjects.Image[];
  cardOptions: string[] = ["cardUpDmg","cardUpHeal","cardUpStamin"];

  constructor() {
    super({ key: "ModalScene" });
    
    
  }
  preload() {
  }


  createInformationModal = (textInfo: string) => {

    
    const backgroundModal = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2 - 200, "InformationModal").setDepth(90).setScale(1.2);
    const principalTitle = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2 - 185,"InformationTitle").setDepth(91);

    const principalTitleText = this.add.text(this.game.canvas.width/2,this.game.canvas.height/2 - 185, "Information",{fontFamily: "Enchanted Land",fontSize: "18px", color: "#B6DFE9"}).setDepth(92).setOrigin(0.5);



    console.log("modal tutorial background: ", backgroundModal.height, backgroundModal.width);

    const textInfoModal = this.add.text(this.game.canvas.width/2,this.game.canvas.height/2 + 125,""+textInfo).setDepth(92).setOrigin(0.5);

    const buttonImage = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2 + 225,"Information3").setDepth(91);

    const buttonText = this.add.text(this.game.canvas.width/2,this.game.canvas.height/2 + 225, "Continue",{fontFamily: "Enchanted Land",fontSize: "26px", color: "#B6DFE9"}).setDepth(92).setOrigin(0.5);


  }

  createTutorialModal = (textInfo: string) => {

    const backgroundModal = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2, "TutorialModal").setDepth(90);
    const principalImg = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2 - 215, "TutorialTitle").setDepth(91);
    //const middleImage = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2 + 150, "");

    console.log("modal tutorial background: ", backgroundModal.height, backgroundModal.width);

    const textInfoModal = this.add.text(this.game.canvas.width/2,this.game.canvas.height/2 + 125,""+textInfo).setDepth(92).setOrigin(0.5);

    const buttonImage = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2 + 225,"TutorialContinueButton").setDepth(91);

    const buttonText = this.add.text(this.game.canvas.width/2,this.game.canvas.height/2 + 225, "Continue",{fontFamily: "Enchanted Land",fontSize: "26px", color: "#B6DFE9"}).setDepth(92).setOrigin(0.5);

  }

  getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
  }

 

  resetLevelCard = () => {
    this.conteinerA?.removeAll(true);
  }

  sendResponseCard = (cardSelected: number,card: Phaser.GameObjects.Image) => {

    console.log("sendResponseCard: ",cardSelected);

    const posibility = this.getRandomInt(3);
    console.log("random es : ",posibility);
    if(posibility >= 3) { //cardUpTroll
      this.testAnim(card,"cardUpTroll");
      //limpiar resto de las cargas y emitir un evento
    } else {
      this.testAnim(card,this.cardOptions[cardSelected]);
      //limpiar resto de las cargas y emitir un evento
    }

    
    if(this.cardsArray) {
      for (let i = 0; i < this.cardsArray.length; i++) {
        this.cardsArray[i].setInteractive(false);    
      }

    }



  }


  createCardsBack = (cardsNumber: number) => {

    const positionArray = [(this.game.canvas.width / 4),(this.game.canvas.width / 2),(this.game.canvas.width - (this.game.canvas.width / 4))];
    const marginInMonitorW = (this.game.canvas.width / 4);
    console.log("ancho total: ",this.game.canvas.width);
    for (let i = 0; i < positionArray.length; i++) {
      const card = this.add.image(positionArray[i],this.game.canvas.height/2, "cardDown");
      //if(i == 0) card.setOrigin(0,-0.5);
      //else if(i == 2) card.setOrigin(0,0.5);
      console.log("position x : ",positionArray[i]);

      card.setInteractive();


      card.on('pointerdown', () => {
        // Transition to next scene
        //this.testAnim(backgroundModal,"TutorialModal");
        this.input.setDefaultCursor('pointer');

        this.sendResponseCard(i,card);

      });

      card.on('pointerover', () => {
        //buttonContainer.setTintFill(0x11001110, 1);
        //buttonText.setColor("#F9F8F7")
        this.input.setDefaultCursor('pointer');
      });

      card.on('pointerout', () => {
        //buttonContainer.setTintFill("#F1D69E", 1);
        //buttonText.setColor("#F1D69E")
        this.input.setDefaultCursor('default');
      });


      this.cardsArray?.push(card);
    }

    

    //const posibility = this.getRandomIntInclusive(0,3);
    //if(posibility == 1) {

    //}
  }

  createLevelReward = (title: string ,content: number, qty?: number) => {
    const backgroundModal = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2,"LevelRewardmodal").setDepth(90);
    

    this.circuloA = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2 - 15,"LevelRewardAnim1").setDepth(91).setOrigin(0.5);
    this.circuloB = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2 - 15,"LevelRewardAnim2").setDepth(91).setOrigin(0.5);

    //agregar animacion de las luces de atras AQUI

    if(title == "Lvl.up"){
      const textTitle = this.add.text(this.game.canvas.width/2,this.game.canvas.height/2 - 240,title,{fontFamily: "Enchanted Land",fontSize: "70px", color: "#B6DFE9"}).setDepth(92).setOrigin(0.5,0);
      console.log("Entro lvl up ");
      let a = content.toString();
      const icon = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2,"LevelRewardlevel").setDepth(92);
      const lvlText = this.add.text(this.game.canvas.width/2 + 3,this.game.canvas.height/2 - 10,""+a,{fontFamily: "Enchanted Land",fontSize: "70px", color: "#B6DFE9"}).setDepth(92).setOrigin(0.5);

      //agregar boton
      const buttonContainer = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2 + 150,"LevelRewardButtonClaimContinue").setDepth(92);
      buttonContainer.setInteractive();
      const buttonText = this.add.text(this.game.canvas.width/2 + 3,this.game.canvas.height/2 + 148, "Continue",{fontFamily: "Enchanted Land",fontSize: "42px", color: "##F1D69E"}).setDepth(92).setOrigin(0.5);
      buttonText.setColor("#F1D69E");

      //button functions
      buttonContainer.on('pointerdown', () => {
        // Transition to next scene
        //this.testAnim(backgroundModal,"TutorialModal");
        this.resetLevelCard();
        this.createCardsBack(content);

      });

      buttonContainer.on('pointerover', () => {
        //buttonContainer.setTintFill(0x11001110, 1);
        buttonText.setColor("#F9F8F7")
        this.input.setDefaultCursor('pointer');
      });

      buttonContainer.on('pointerout', () => {
        //buttonContainer.setTintFill("#F1D69E", 1);
        buttonText.setColor("#F1D69E")
        this.input.setDefaultCursor('default');
      });




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
      const textTitle = this.add.text(this.game.canvas.width/2 - 80,this.game.canvas.height/2 - 240,title,{fontFamily: "Enchanted Land",fontSize: "68px", color: "#B6DFE9"}).setDepth(92);
      let a = content.toString();
      const icon = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2,"LevelRewardcoins").setDepth(92);

      const iconQty = this.add.image(this.game.canvas.width/2 - 140,this.game.canvas.height/2 + 100,"LevelRewardcoinsQty").setDepth(92);

      const qtyText = this.add.text(this.game.canvas.width/2 - 145,this.game.canvas.height/2 + 90,""+a,{fontFamily: "Enchanted Land",fontSize: "52px", color: "##F1D69E"}).setDepth(92).setOrigin(0.5);

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

  testAnim = (obj:any, frontOfCard: string) => {
    this.tweens.add({
      targets: obj,
      props: {
          scaleX: { value: 0, duration: 1000, yoyo: true },
          texture: { value: frontOfCard, duration: 0, delay: 1000 }
      },
      ease: 'Linear'
    });
  }



  create(this: ModalScene, data: { type: string, content: number,qty?: number, textInfo?: string }) {

    //let div = document.getElementById('game-container');
    //if(div)div.style.backgroundColor = "#4488AA";
    //const buttonBox = this.add.rectangle(this.sys.scale.width / 2, this.sys.scale.height - 100, 290, 50, 0x000000, 1);
    //this.cameras.main.setAlpha(0.5);
    console.log("Data a ModalScene: ", data);


    this.cameras.main.fadeIn(3000, 0, 0, 0)
    
    

    switch (data.type) {
      case "testForNew":

        break;
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
        if(data.qty){
          const rewardCard = this.createLevelReward(data.type,data.content,data.qty);
        }
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
