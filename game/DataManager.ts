import Phaser from "phaser";


export default class DataManager extends Phaser.Scene {
  menuAnim?: boolean;
  planetShow: number = 0;
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
