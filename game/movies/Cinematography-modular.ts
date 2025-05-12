import Phaser from "phaser";
import { CinematoDataType } from "../Types";
import Ticker from "./Ticker";
import cineIntro1 from "./Intro/cineInto1";
import cineIntro2 from "./Intro/cineIntro2";
import cineIntro3 from "./Intro/cineIntro3";
import cineIntro4 from "./Intro/cineIntro4";
import cineIntro5 from "./Intro/cineIntro5";
import cineIntro6 from "./Intro/cineIntro6";
import cineIntro7 from "./Intro/cineIntro7";
import MasterManager from "../MasterManager";
import cineIntro2B from "./Intro/cineIntro2B";
import cineIntro2C from "./Intro/cineIntro2C";
import postalManager from "./postalManager";
import HoldableButton from "../assets/buttonHolder";
import cineMovie1 from "./Cinemato1/cineMovie1";
import cineMovie2 from "./Cinemato1/cineMovie2";
import cineMovie3 from "./Cinemato1/cineMovie3";
import cineMovie4 from "./Cinemato1/cineMovie4";
import cineMovie5 from "./Cinemato1/cineMovie5";
import cineMovie6 from "./Cinemato1/cineMovie6";
import cineMovie7 from "./Cinemato1/cineMovie7";
import cineMovie8 from "./Cinemato1/cineMovie8";
import cineMovie9 from "./Cinemato1/cineMovie9";
import cine2Movie1 from "./Cinemato2/cine2Movie1";
import cine2Movie2 from "./Cinemato2/cine2Movie2";
import cine2Movie3 from "./Cinemato2/cine2Movie3";
import cine2Movie4 from "./Cinemato2/cine2Movie4";
import cine2Movie5 from "./Cinemato2/cine2Movie5";
import cine2Movie6 from "./Cinemato2/cine2Movie6";
import cine3Movie1 from "./Cinemato3/cine3Movie1";
import cine3Movie2 from "./Cinemato3/cine3Movie2";
import cine3Movie3 from "./Cinemato3/cine3Movie3";
import cine3Movie4 from "./Cinemato3/cine3Movie4";
import cine3Movie5 from "./Cinemato3/cine3Movie5";
import MultiScene from "../MultiScene";
import UIClass from "../assets/UIClass";
import cine2Movie4b from "./Cinemato2/cine2Movie4b";

class CinematographyModular extends Phaser.Scene {
  canWin:boolean =true;
  ticker: Ticker;
  playingCine: cineIntro1 | any;
  nextLevel?: number | undefined;
  code?: string | undefined;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  holdableButton?: HoldableButton;
  keyname?:string;
  UIcontainer?: Phaser.GameObjects.Container;
    UIClass?: UIClass;
    UICamera?: Phaser.Cameras.Scene2D.Camera;
   graphics?: Phaser.GameObjects.Graphics;
   enabled:boolean = false;
  constructor() {
    super({ key: "CinematographyMod" });

    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
  }

  onGameBlur() {
    console.log(this.playingCine, "playingCine")
    //this.scene.pause()
    this.pauseDialogue()
  }

  onGameResume() {
    console.log(this.playingCine, "playingCine", 'focus')
    //this.scene.resume()
    this.resumeDialogue()
  }

  create(this: CinematographyModular,{ keyname, lifes,code }: CinematoDataType) {
    this.time.delayedCall(4000,()=>this.enabled = true)
    this.game.events.on("blur", this.onGameBlur, this);
    this.game.events.on("focus", this.onGameResume, this);

    const isPostal = keyname.includes("postal");
    this.cursors = this.input.keyboard?.createCursorKeys();
    this.keyname = keyname
    this.holdableButton = new HoldableButton(
      this,
      50,
      50,
      20,
      0xffffff,
      "#ffffff66",
      () => {
        if(!(this.playingCine instanceof postalManager)){
          this.playingCine.stopDialogue(); 
          this.playingCine = null;
        }
        const multiScene = new MultiScene("Game", { level: this.nextLevel ? this.nextLevel : 0, lifes: lifes ? lifes : 3, loadKey: ['GamePlay1'] });
        const scene = this.scene.add("MultiScene", multiScene, true);
        this.scene.start("MultiScene").bringToTop("MultiScene");
        this.sound.stopAll();
        this.scene.stop("CinematographyMod");  
      },
      isPostal
    ).setDepth(999999999)
    this.holdableButton.text?.setDepth(999999999).setVisible(false);
    this.holdableButton?.graphics.setDepth(999999999);

    /* Audio */
    const getMasterManagerScene = this.game.scene.getScene(
      "MasterManager"
    ) as MasterManager;
    if (!getMasterManagerScene.scene.isActive()) {
      this.scene.launch("MasterManager").sendToBack();
    } else {
    }



      this.events.addListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
          getMasterManagerScene.pauseCinemato(this.playingCine, this.playingCine.timeEvent)
        } else {
          // this.masterManagerScene?.resumeGame();
        }
      })

      window.addEventListener("blur", () => {
        // this.masterManagerScene?.pauseGame();
      });
    
      window.addEventListener("focus", () => {
          // this.masterManagerScene?.resumeGame();
      });
      

    switch (keyname) {
      case "cine_intro_1":
        this.playingCine = new cineIntro1(this);
        this.nextLevel = 0;
        break;
      case "cine_intro_2":
        this.playingCine = new cineIntro2(this);
        this.nextLevel = 0;
        break;
      case "cine_intro_2B":
        this.playingCine = new cineIntro2B(this);
        this.nextLevel = 0;
        break;
      case "cine_intro_2C":
        this.playingCine = new cineIntro2C(this);
        this.nextLevel = 0;
        break;
      case "cine_intro_3":
        this.playingCine = new cineIntro3(this);
        this.nextLevel = 0;
        break;
      case "cine_intro_4":
        this.playingCine = new cineIntro4(this);
        this.nextLevel = 0;
        break;
      case "cine_intro_5":
        this.playingCine = new cineIntro5(this);
        this.nextLevel = 0;
        break;
      case "cine_intro_6":
        this.playingCine = new cineIntro6(this);
        this.nextLevel = 0;
        break;
      case "cine_intro_7":
        this.playingCine = new cineIntro7(this);
        this.nextLevel = 0;
        break;
      case "cine_movie_1":
        this.playingCine = new cineMovie1(this);
        this.nextLevel = 4
        break;
      case "cine_movie_2":
        this.playingCine = new cineMovie2(this);
        this.nextLevel = 4
        break;
      case "cine_movie_3":
        this.playingCine = new cineMovie3(this);
        this.nextLevel = 4
        break;
      case "cine_movie_4":
        this.playingCine = new cineMovie4(this);
        this.nextLevel = 4
        break;
      case "cine_movie_5":
        this.playingCine = new cineMovie5(this);
        this.nextLevel = 4
        break;
      case "cine_movie_6":
        this.playingCine = new cineMovie6(this);
        this.nextLevel = 4
        break;
      case "cine_movie_7":
        this.playingCine = new cineMovie7(this);
        this.nextLevel = 4
        break;
      case "cine_movie_8":
        this.playingCine = new cineMovie8(this);
        this.nextLevel = 4
        break;
      case "cine_movie_9":
        this.playingCine = new cineMovie9(this);
        this.nextLevel = 4
        break;
      case "cine_2_movie_1":
        this.playingCine = new cine2Movie1(this);
        this.nextLevel = 8
        break;
      case "cine_2_movie_2":
        this.playingCine = new cine2Movie2(this);
        // this.nextLevel = 8
        break;
      case "cine_2_movie_3":
        this.playingCine = new cine2Movie3(this);
        // this.nextLevel = 8
        break;
      case "cine_2_movie_4":
        this.playingCine = new cine2Movie4(this);
        // this.nextLevel = 8
        break;
      case "cine_2_movie_4b":
        this.playingCine = new cine2Movie4b(this);
        // this.nextLevel = 8
        break;
      case "cine_2_movie_5":
        this.playingCine = new cine2Movie5(this);
        // this.nextLevel = 8
        break;
      case "cine_2_movie_6":
        this.playingCine = new cine2Movie6(this);
        // this.nextLevel = 8
        break;
      case "cine_3_movie_1":
        this.playingCine = new cine3Movie1(this);
        // this.nextLevel = 0
        break;
      case "cine_3_movie_2":
        this.playingCine = new cine3Movie2(this);
        // this.nextLevel = 0
        break;
      case "cine_3_movie_3":
        this.playingCine = new cine3Movie3(this);
        // this.nextLevel = 0
        break;
      case "cine_3_movie_4":
        this.playingCine = new cine3Movie4(this);
        // this.nextLevel = 0
        break;
      case "cine_3_movie_5":
        this.playingCine = new cine3Movie5(this);
        // this.nextLevel = 0
        break;
      case "postal1_planeta1":
        this.playingCine = new postalManager(this, "postal1Planeta1", 1, lifes);
        this.nextLevel = 1;
        break;
      case "postal2_planeta1":
        this.playingCine = new postalManager(this, "postal2Planeta1", 3, lifes);
        this.nextLevel = 3;
        break;
      case "postal1_planeta2":
        this.playingCine = new postalManager(this, "postal1Planeta2", 5, lifes);
        this.nextLevel = 5;

        break;
      case "postal2_planeta2":
        this.playingCine = new postalManager(this, "postal2Planeta2", 7, lifes);
        this.nextLevel = 7;

        break;
      case "postal1_planeta3":
        this.playingCine = new postalManager(this, "postal1Planeta3", 9, lifes);
        this.nextLevel = 9;

        break;
      case "postal2_planeta3":
        this.playingCine = new postalManager(this, "postal2Planeta3", 11, lifes);
        this.nextLevel = 11;

        break;
      default:
    }
      this.UICamera = this.cameras.add(
          0,
          0,
          window.innerWidth,
          window.innerHeight
      );
      // this.UIClass = new UIClass(this, this.nextLevel ? this.nextLevel : 0, lifes ? lifes : 3, 0);
  }
  pauseDialogue(){
    if (this.playingCine?.dialogue) 
      this.playingCine.dialogue.stop();
    // this.playingCine.dialogue.stopAudio();
  }

  resumeDialogue(){
    if (this.playingCine?.dialogue) 
      this.playingCine.dialogue.resume();
    // this.playingCine.dialogue.resumeAudio();
  }
  update(time: number, delta: number) {
    if (this.playingCine.update) this.playingCine.update(this, time, delta);
    if(this.keyname?.includes("cine")){
      this.holdableButton?.update();
      this.holdableButton?.text?.setVisible(true)
    }else if (this.enabled){
      this.holdableButton?.text?.setVisible(true)
      this.holdableButton?.update();
    }
  }

}

export default CinematographyModular;
