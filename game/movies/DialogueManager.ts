import Phaser from "phaser";

// Scene in class
class DialogueManager extends Phaser.Scene {
    holder?: Phaser.GameObjects.Graphics;
    screenHeigth: number = window.innerHeight;
    screenWidth: number = window.innerWidth;
    borderRounder: number = 50;


    constructor() {
        super({ key: "DialogueManager" });


        const textTest = ["Hola", "como", "andas"]

        

    }
    create(){

        this.holder = this.add.graphics()
        this.holder.fillStyle(0x00ff00, 1);
        this.holder.fillRoundedRect(this.screenWidth*0.1, this.screenHeigth - this.screenHeigth/8, this.screenHeigth*0.8, this.screenHeigth/9, this.borderRounder);
       
    }
    
    textBuilder(text: string[]) { }


}
export default DialogueManager;
