import Phaser from "phaser";
import MasterManager from "./MasterManager";
import BetweenScenes, { BetweenScenesStatus } from "./BetweenScenes";
import WonClass from "./multiScenes/won";
import LoseClass from "./multiScenes/lose";
import MenuClass from "./multiScenes/menu";
import LevelClass from "./multiScenes/levels";
import CreditsClass from "./multiScenes/credits";
import AssetsLoader from "./multiScenes/assetsLoader";


export default class MultiScene extends Phaser.Scene {
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  scenekey?: string;
  getMasterManagerScene?: MasterManager;
  activeScene?: WonClass | LoseClass | MenuClass | LevelClass | CreditsClass;
  assetLoaderClass?: AssetsLoader;
  sceneData?: { text?: string};

  constructor() {
    super({ key: "MultiScene" });
  }

  init(data: { text: string }) {
    this.cursors = this.input.keyboard?.createCursorKeys();
    if (data.text) {
      this.sceneData = data
    } else this.sceneData = undefined
  }

  preload(){
        if (this.sceneData === undefined){
          this.assetLoaderClass = new AssetsLoader(this)
          this.assetLoaderClass.runPreload()
        }
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
    /* Audio */
    this.getMasterManagerScene = this.game.scene.getScene(
      "MasterManager"
    ) as MasterManager;
    if (!this.getMasterManagerScene.scene.isActive())
      this.scene.launch("MasterManager").sendToBack();


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
