import Phaser from "phaser";
import MasterManager from "./MasterManager";
import BetweenScenes, { BetweenScenesStatus } from "./BetweenScenes";
import WonClass from "./multiScenes/won";
import LoseClass from "./multiScenes/lose";
import MenuClass from "./multiScenes/menu";
import LevelClass from "./multiScenes/levels";
import CreditsClass from "./multiScenes/credits";
import AssetsLoader, { SceneKeys } from "./multiScenes/assetsLoader";
import CinematographyModular from "./movies/Cinematography-modular";
import Game from "./Game";
import { CinematoDataType, GamePlayDataType } from "./Types";

export default class MultiScene extends Phaser.Scene {
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  scenekey?: string;
  getMasterManagerScene?: MasterManager;
  activeScene?: WonClass | LoseClass | MenuClass | LevelClass | CreditsClass;
  assetLoaderClass?: AssetsLoader;
  sceneData?: GamePlayDataType | CinematoDataType | undefined;



  constructor(scenekey?: string, sceneData?: GamePlayDataType | CinematoDataType, loadKey?: string) {
    super({ key: "MultiScene" });
    this.scenekey = scenekey;
    this.sceneData = sceneData;
  }


  preload() {
      this.assetLoaderClass = new AssetsLoader(this, ["BaseLoad"]);
      this.assetLoaderClass.runPreload(() => {
        if(this.scenekey) {
          console.log("ENTRO ACA 1", this.sceneData)
          this.makeTransition(this.scenekey, this.sceneData ?? undefined);
        } else {
          console.log("ENTRO ACA 2")
          // intro
          this.makeTransition("CinematographyMod", { keyname: "cine_intro_1", loadKey: ["Cinemato2", "Cinemato1", "Cinemato0"] });
          // this.makeTransition("Game", { level: 6, lifes: 3, loadKey: ["GamePlay1", "GamePlay2"] });
        }
      });
  }

  makeTransition(sceneName: string, data: GamePlayDataType | CinematoDataType | undefined) {
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

  // create(this: MultiScene, data: { text: string }) {
  //   this.scenekey = data.text;
  //   // /* Audio */
  //   // this.getMasterManagerScene = this.game.scene.getScene(
  //   //   "MasterManager"
  //   // ) as MasterManager;
  //   // if (!this.getMasterManagerScene.scene.isActive())
  //   //   this.scene.launch("MasterManager").sendToBack();

  //   switch (this.scenekey) {
  //     case "win":
  //       this.activeScene = new WonClass(this);
  //       break;

  //     case "lose":
  //       this.activeScene = new LoseClass(this);
  //       break;

  //     case "menu":
  //       this.activeScene = new MenuClass(this);
  //       break;

  //     case "levels":
  //       this.activeScene = new LevelClass(this);
  //       break;

  //     case "credits":
  //       this.activeScene = new CreditsClass(this);
  //       break;
  //   }
  // }

  update() {
    if (this.activeScene) this.activeScene.update();
  }
}
