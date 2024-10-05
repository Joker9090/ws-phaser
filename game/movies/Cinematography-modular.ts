import Phaser from "phaser";
import Ticker, { TickerJob } from "./Ticker";
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
import BetweenScenes, { BetweenScenesStatus } from "../BetweenScenes";
import cineMovie1 from "./Cinemato1/cineMovie1";
import cineMovie2 from "./Cinemato1/cineMovie2";
import cineMovie3 from "./Cinemato1/cineMovie3";
import cineMovie4 from "./Cinemato1/cineMovie4";
import cineMovie5 from "./Cinemato1/cineMovie5";
import cineMovie6 from "./Cinemato1/cineMovie6";
import cineMovie7 from "./Cinemato1/cineMovie7";
import cineMovie8 from "./Cinemato1/cineMovie8";


class CinematographyModular extends Phaser.Scene {
  ticker: Ticker;
  playingCine: cineIntro1 | any;
  nextLevel?: number | undefined;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  holdableButton?: HoldableButton;
  constructor() {
    super({ key: "CinematographyMod" });

    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
  }

  create(this: CinematographyModular, { keyname, lifes }: { keyname: string, lifes?: any }) {
    const isPostal = keyname.includes("postal")
    this.cursors = this.input.keyboard?.createCursorKeys();
    this.holdableButton = new HoldableButton(
      this,
      50,
      50,
      20,
      0xffffff,
      "#ffffff66",
      () => {
        this.makeTransition("Game", { level: this.nextLevel ? this.nextLevel : 0, lifes: 3 });
      },
      isPostal
    ).setDepth(999999999);
    /* Audio */
    const getMasterManagerScene = this.game.scene.getScene(
      "MasterManager"
    ) as MasterManager;
    if (!getMasterManagerScene.scene.isActive()) {
      this.scene.launch("MasterManager").sendToBack();
    } else {
    }

    switch (keyname) {
      case "cine_intro_1":
        this.playingCine = new cineIntro1(this);
        this.nextLevel = 0
        break;
      case "cine_intro_2":
        this.playingCine = new cineIntro2(this);
        this.nextLevel = 0
        break;
      case "cine_intro_2B":
        this.playingCine = new cineIntro2B(this);
        this.nextLevel = 0
        break;
      case "cine_intro_2C":
        this.playingCine = new cineIntro2C(this);
        this.nextLevel = 0
        break;
      case "cine_intro_3":
        this.playingCine = new cineIntro3(this);
        this.nextLevel = 0
        break;
      case "cine_intro_4":
        this.playingCine = new cineIntro4(this);
        this.nextLevel = 0
        break;
      case "cine_intro_5":
        this.playingCine = new cineIntro5(this);
        this.nextLevel = 0
        break;
      case "cine_intro_6":
        this.playingCine = new cineIntro6(this);
        this.nextLevel = 0
        break;
      case "cine_intro_7":
        this.playingCine = new cineIntro7(this);
        this.nextLevel = 0
        break;
      case "cine_movie_1":
        this.playingCine = new cineMovie1(this);
        // this.nextLevel = 0
        break;
      case "cine_movie_2":
        this.playingCine = new cineMovie2(this);
        // this.nextLevel = 0
        break;
      case "cine_movie_3":
        this.playingCine = new cineMovie3(this);
        // this.nextLevel = 0
        break;
      case "cine_movie_4":
        this.playingCine = new cineMovie4(this);
        // this.nextLevel = 0
        break;
      case "cine_movie_5":
        this.playingCine = new cineMovie5(this);
        // this.nextLevel = 0
        break;
      case "cine_movie_6":
        this.playingCine = new cineMovie6(this);
        // this.nextLevel = 0
        break;
      case "cine_movie_7":
        this.playingCine = new cineMovie7(this);
        // this.nextLevel = 0
        break;
      case "cine_movie_8":
        this.playingCine = new cineMovie8(this);
        // this.nextLevel = 0
        break;
      case "postal1_planeta1":
        this.playingCine = new postalManager(this, "postal1Planeta1", 1, lifes);
        this.nextLevel = 1
        break;
      case "postal2_planeta1":
        this.playingCine = new postalManager(this, "postal2Planeta1", 3, lifes);
        this.nextLevel = 3
        break;
      default:
        
    }
  }

  update(time: number, delta: number) {
    if (this.playingCine.update) this.playingCine.update(this, time, delta);
    this.holdableButton?.update()
  }

  makeTransition(sceneName: string, data: any) {
    const getBetweenScenesScene = this.game.scene.getScene(
      "BetweenScenes"
    ) as BetweenScenes;
    if (getBetweenScenesScene) {
      if (getBetweenScenesScene.status != BetweenScenesStatus.IDLE)
        return false;
      getBetweenScenesScene.changeSceneTo(sceneName, data);
      this.time.delayedCall(1000, () => {
        this.scene.stop();
      });
    } else {
      this.scene.start(sceneName, data);
      this.time.delayedCall(1000, () => {
        this.scene.stop();
      });
    }
  }
}

export default CinematographyModular;
