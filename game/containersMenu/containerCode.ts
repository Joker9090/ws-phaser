import Phaser from "phaser";
import { ContainerMenuConfigType } from "../Types";

class containerCode extends Phaser.GameObjects.Container {

    width: number = window.innerWidth;
    height: number = window.innerHeight;
    modal: Phaser.GameObjects.Image;
    input: any;
    displayText: Phaser.GameObjects.Text
    title: Phaser.GameObjects.Text;
    
   

    constructor(scene: Phaser.Scene, config: ContainerMenuConfigType) {
        super(scene, config.x, config.y)
        const offsetY = 100
        let writable = false
        this.title = this.scene.add.text(-230, 50, 'ENTER CODE:', {
            fontSize: 17,
            color: "#00feff",
            stroke: "#00feff",
            align: "center",
            fontFamily: "Arcade",
            wordWrap: {
                width: this.width * 0.9,
            },
        }).setFontSize('60px');
        this.modal = scene.add.image(0, 100, "codeModal").setScale(0.9);
        this.modal.setOrigin(0.5);
        this.input = scene.add.rectangle(-260 , 200, this.modal.width * 0.6, 80, 57055).setOrigin(0, 0.5);
        this.input.setInteractive()
        this.displayText = this.scene.add.text(-260 + 10, 200, '', {
            fontSize: '24px',
            color: '#000',
        }).setOrigin(0, 0.5);
        

        // this.input.keyboard.on("keydown", (e:any) => {
        //     if (this.displayText && writable) {
        //       const TextCode = this.displayText.text;
        //       if (e.keyCode === 8) {
        //         const newCode = TextCode.substring(0, TextCode.length - 1);
        //         this.displayText?.setText(newCode);
        //       } else if (e.keyCode <= 90 && e.keyCode >= 65) {
        //         const newCode = TextCode + e.key;
        //         this.displayText?.setText(newCode);
        //       } else if (e.keyCode === 13) {
        //         console.log('holi')
        //       }
        //     }
        // });
        // this.input.on('pointerDown',()=>{
        //     writable = true
        // })
        // const background = this.scene.add.image(0,0,"NOMBRE DEL ASSET").setInteractive()
        const sky = this.scene.add.image(0,innerHeight/4 -200,'codeSky').setOrigin(0.5, 0.5)
        const stars = this.scene.add.image(0,innerHeight/4 -350,'codeStars').setOrigin(0.5, 0.5)
        const background0 = this.scene.add.image(0,innerHeight/4 -200, 'codeFondo0').setInteractive().setOrigin(0.5, 0.5)
        const background1 = this.scene.add.image(0,innerHeight/4 -250, 'codeFondo1').setInteractive().setOrigin(0.5, 0.5)
        const background2 = this.scene.add.image(0,innerHeight/4 -300, 'codeFondo2').setInteractive().setOrigin(0.5, 0.5)
        const floor = this.scene.add.image(0,innerHeight/4 -150, 'codeFloor').setInteractive().setOrigin(0.5, 0.5)
        const front = this.scene.add.image(0,innerHeight/4 -250, 'codeFront').setInteractive().setOrigin(0.5, 0.5)
        const astroFront = this.scene.add.image(0,0, 'astroFront').setInteractive().setOrigin(0.5, 0.5)
        const astroBack = this.scene.add.image(0, 0, 'astroBack').setInteractive().setOrigin(0.5, 0.5)

        const arr = [
            sky,
            stars,
            background2,
            background1,
            background0,
            floor,
            front,
            astroBack,
            this.modal,
            astroFront,
            this.input,
            this.title
        ]

        this.add(arr)
        scene.add.existing(this)
    }
    

}
export default containerCode;