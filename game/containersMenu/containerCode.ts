import Phaser from "phaser";
import { ContainerMenuConfigType } from "../Types";

class containerCode extends Phaser.GameObjects.Container {

    width: number = window.innerWidth;
    height: number = window.innerHeight;
    modal: Phaser.GameObjects.Image;
    input: any;
    title: Phaser.GameObjects.Text;
    
   

    constructor(scene: Phaser.Scene, config: ContainerMenuConfigType) {
        super(scene, config.x, config.y)
        const offsetY = 100
        let writable = false
        this.title = this.scene.add.text(-70, -190, 'Code', {
            fontSize: 17,
            color: "#00feff",
            stroke: "#00feff",
            align: "center",
            fontFamily: "Arcade",
            wordWrap: {
                width: this.width * 0.9,
            },
        }).setFontSize('60px');
        this.modal = scene.add.image(0, 0, "codeModal").setScale(0.9);
        this.modal.setOrigin(0.5);
        this.input = scene.add.rectangle(-260 , 0, this.modal.width * 0.6, 80, 57055).setOrigin(0, 0.5);
        this.input.setInteractive()
        this.input.on('pointerDown',()=>{
            writable = true
        })


        const arr = [
            this.modal,
            this.input,
            this.title
        ]

        this.add(arr)
        scene.add.existing(this)
    }

}
export default containerCode;