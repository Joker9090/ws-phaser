import Phaser from "phaser";
import MusicManager from "./MusicManager";
import BetweenScenes, { BetweenScenesStatus } from "./BetweenScenes";
import WonClass from "./multiScenes/won";
import LoseClass from "./multiScenes/lose";
import MenuClass from "./multiScenes/menu";
import LevelClass from "./multiScenes/levels";
import CreditsClass from "./multiScenes/credits";


export default class MultiScene extends Phaser.Scene {
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  scenekey?: string;
  getMusicManagerScene?: MusicManager;
  activeScene?: WonClass | LoseClass | MenuClass | LevelClass | CreditsClass;


  constructor() {
    super({ key: "MultiScene" });
  }

  init() {
    this.cursors = this.input.keyboard?.createCursorKeys();
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

  create(this: MultiScene, data: { text: string }) {
    this.scenekey = data.text
    console.log("ARIEL DATA EN CREATE DE MULTISCENE", data)
    /* Audio */
    this.getMusicManagerScene = this.game.scene.getScene(
      "MusicManager"
    ) as MusicManager;
    if (!this.getMusicManagerScene.scene.isActive())
      this.scene.launch("MusicManager").sendToBack();


    switch (this.scenekey) {
      case "win":
        this.activeScene = new WonClass(this)
        break;

      case "lose":
        this.activeScene = new LoseClass(this)
        break;

      case "menu":
        this.activeScene = new MenuClass(this)
        break;

      case "levels":
        this.activeScene = new LevelClass(this)
        break;

      case "credits":
        this.activeScene = new CreditsClass(this)
        break;
    }
  }



  update() {
    if (this.activeScene) this.activeScene.update()
  }
} 
