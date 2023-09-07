import Phaser from "phaser";
import Player from "./assets/Player";
import MapaSandbox from "./maps/MapaSandbox";

export default class Sandbox extends Phaser.Scene {

  monchi?: Player;
  map?: MapaSandbox; 
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({key: "Sandbox"});
  }

  create(this: Sandbox) {
    this.cursors = this.input.keyboard?.createCursorKeys();
    this.monchi = new Player(this, 500, 0, "character", 2);
    this.map = new MapaSandbox(this, this.monchi);
    this.map.createMap();
    this.map.addColliders()
  }

  update(){
    if (this.map) this.map.update();
  }
}
