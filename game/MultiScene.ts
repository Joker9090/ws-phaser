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
import Player from "./assets/Player";

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
    // this.load.image("gameTitle", "/menu/initial/gameTitle.png");
    // this.load.image("fondoCarga", "/menu/initial/fondoCarga.png");
    
    // this.load.spritesheet("player",  "/game/player/playerSpriteSheet.png",  { frameWidth: 200, frameHeight: 200 });

 
    this.assetLoaderClass = new AssetsLoader(this, ["BaseLoad","Cinemato0", "Cinemato1", "Cinemato2", "Cinemato3","GamePlay1", "GamePlay2", "GamePlay3"]);
    this.assetLoaderClass.runPreload(() => {
      if (this.scenekey) {
        this.makeTransition(this.scenekey, this.sceneData ?? undefined);
      } else {

          this.makeTransition("CinematographyMod", { keyname: "cine_2_movie_4", loadKey: ["Postales","Cinemato0", "Cinemato1", "Cinemato2", "Cinemato3"]});
          // this.makeTransition("Game", { level:1, lifes: 3, loadKey: ["GamePlay1", "GamePlay2", "GamePlay3", "Postales","Cinemato0", "Cinemato1", "Cinemato2", "Cinemato3", "Postales"] });

          // this.makeTransition("CinematographyMod", { keyname: "cine_3_movie_1", loadKey: ["Postales","Cinemato0", "Cinemato1", "Cinemato2", "Cinemato3"]});
          // this.makeTransition("Game", { level:999, lifes: 3, loadKey: ["GamePlay1", "GamePlay2", "GamePlay3", "Postales","Cinemato0", "Cinemato1", "Cinemato2", "Cinemato3", "Postales"] });

          //  this.makeTransition("MenuScene", undefined);
          //  this.makeTransition("TestScene", undefined);
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

  update() {
    if (this.activeScene) this.activeScene.update();
  }
}
