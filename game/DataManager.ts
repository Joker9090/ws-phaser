import Phaser from "phaser";
import EventsCenter from "./EventsCenter";
import BetweenScenes from "./BetweenScenes";
import LevelMap from "./deprecatedAssets/LevelMap";

export default class DataManager extends Phaser.Scene {
  menuAnim?: boolean;
  planetShow: number = 0;
  levelMap?: LevelMap;
  constructor() {
    super({ key: "DataManager" });
  }

  preload() { }

  create() {
  
    /* UI SCENE  */
    this.menuAnim = false;

  
  }

  update() {
    if (this.game.scene.getScene("Menu").scene.isActive()) this.menuAnim = true;
  }
}
