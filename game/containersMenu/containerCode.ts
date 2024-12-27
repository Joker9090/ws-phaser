import Phaser from "phaser";
import { ContainerMenuConfigType } from "../Types";

class containerCode extends Phaser.GameObjects.Container {

    width: number = window.innerWidth;
    height: number = window.innerHeight;
    modal: Phaser.GameObjects.Image;
    input: any;
    title: Phaser.GameObjects.Text;
    backButton: Phaser.GameObjects.Image;
    textDisplay: string[] = [];
    displayText: Phaser.GameObjects.Text;
   

    constructor(scene: Phaser.Scene, config: ContainerMenuConfigType) {
        super(scene, config.x, config.y)
        const offsetY = 100
        let isTyping = false;
        let inputText = '';

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
        this.input.on('pointerup', () => {
          isTyping = true;
          inputText = '';
        });
        scene.input.keyboard?.on('keydown', (event: any) => {
          const key = event.key;
          if (/^[a-zA-Z0-9]$/.test(key) && isTyping&&this.textDisplay.length<10) {
              this.textDisplay.push(key);
              inputText = this.textDisplay.join('');
              this.displayText.setText(inputText);
          }else if(key === 'Backspace'){
              this.textDisplay.pop();
              inputText = this.textDisplay.join('');
              this.displayText.setText(inputText);
          }
        });

        this.displayText = this.scene.add.text(-230, 160, '', {
            fontSize: 70,
            color: "#00feff",
            stroke: "#00feff",
            align: "center",
            fontFamily: "Arcade",
            fixedWidth: this.input.width - 50,
            fixedHeight: this.input.height - 10,
            wordWrap: {
                width: this.width * 0.9,
            },
        });
        

     this.backButton = scene.add.image(0, 0, "playBackButton")
           this.backButton.setPosition(this.backButton.width, this.height - this.backButton.height)
           this.backButton.setInteractive().on('pointerdown', () => {
               this.backButton.setTexture('playBackButtonPressed')
           })
           this.backButton.on('pointerup',()=>{
               this.backButton.setTexture('playBackButton')
               if(config.changeContainer){
                config.changeContainer()
              }
   
           })
           this.backButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, ()=>{
               this.backButton.setTexture('playBackButtonHover')
           })
           this.backButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, ()=>{
               this.backButton.setTexture('playBackButton')
           })
   
        
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
            this.title,
            this.displayText
        ]

        this.add(arr)
        scene.add.existing(this)
    }
    

}
export default containerCode;