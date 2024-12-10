import Phaser from "phaser";
import { ContainerMenuConfigType } from "../Types";

class containerCode extends Phaser.GameObjects.Container {

    width: number = window.innerWidth;
    height: number = window.innerHeight;
    modal: Phaser.GameObjects.Image;
    input: any
    
   

    constructor(scene: Phaser.Scene, config: ContainerMenuConfigType) {
        super(scene, config.x, config.y)
        const offsetY = 100
        let writable = false

        this.modal = scene.add.image(0, 0, "settingsModal").setScale(0.9);
        this.modal.setOrigin(0.5);
        this.input = scene.add.rectangle(-220 , 0, this.modal.width * 0.6, 30, 57055).setOrigin(0, 0.5);


        const arr = [
            this.modal,
            this.input
        ]

        this.add(arr)
        scene.add.existing(this)
    }

}
export default containerCode;