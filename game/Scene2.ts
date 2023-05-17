
import Phaser from "phaser";
import Player from "./assets/Player";
import Mapa from "./maps/Mapa1";

// Scene in class
class Scene2 extends Phaser.Scene {
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys
  monchi?: Player
  graphics?: Phaser.GameObjects.Graphics
  map?: Mapa;

  preload(this: Phaser.Scene) {
    this.load.tilemapTiledJSON('map', 'game/maps/map_2.json');
    this.load.image('tileset', 'game/maps/tilemaps.png');
  }


  create(this: Scene2) {
    const levelConfig: Phaser.Types.Tilemaps.TilemapConfig = {
      key: `map`,
      tileHeight: 100,
      tileWidth: 100,
    }

    const map = this.make.tilemap(levelConfig);
    const tiles = map.addTilesetImage('tilemaps',"tileset",100,100);
    console.log("tiles",tiles)
    if(tiles)  map.createLayer("test",tiles,0,0)
    // map.createLayer("test", 'tileset',0,0);

    // console.log("tiles", map.getTileLayerNames())
    // console.log("tiles", map.getTileAt)
    
    // map.tiles.forEach((t,index) => {
    //   console.log("tile",t)
    //   if(index == 0) this.cameras.main.startFollow(t)
    // })
    // this.cameras.main.setPosition(0,0)
    // this.add.sprite(0,0,"tileset")
  }

  update(this: Scene2) {

  }
}

export default Scene2 