import Phaser from "phaser";
import EventsCenter from "./EventsCenter";
import BetweenScenes from "./BetweenScenes";

export default class DataManager extends Phaser.Scene {
  menuAnim?: boolean;
  constructor() {
    super({ key: "DataManager" });
  }

  preload() {}

  create() {
    /* UI SCENE  */
    this.menuAnim = false;
  }

  update() {
    if (this.game.scene.getScene("Menu").scene.isActive()) this.menuAnim = true;
  }
}
