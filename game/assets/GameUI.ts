import Phaser, { Physics } from "phaser";
class GameUI extends Phaser.Scene {
  constructor(){
    super({ key: "gameUI",})
  }

  create() {
    const hearts = this.add.group({
      classType:Phaser.GameObjects.Sprite,
    });
    
    
    hearts.createMultiple({
        key:"heartFullUI",
        setXY:{
          x: 100,
          y: 700,
          stepX:32,
        },
        quantity:3,
    });
  }

}
export default GameUI