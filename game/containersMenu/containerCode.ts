import Phaser from "phaser";
import { ContainerMenuConfigType } from "../Types";
import MasterManager from "../MasterManager";
import containerSettings from "./containerSettings";
import MenuScene from "../Menu";

class containerCode extends Phaser.GameObjects.Container {

    width: number = window.innerWidth;
    height: number = window.innerHeight;
    modal: Phaser.GameObjects.Image;
    input: any;
    title: Phaser.GameObjects.Text;
    backButton: Phaser.GameObjects.Image;
    confirmButton: Phaser.GameObjects.Image;
    textDisplay: string[] = [];
    displayText: Phaser.GameObjects.Text;
    masterManager?: MasterManager;
    // settingsButton: Phaser.GameObjects.Image;
    error: Phaser.GameObjects.Text;
    astroFront?: Phaser.GameObjects.Image;
    astroBack?: Phaser.GameObjects.Image;
    writingIndicator?: Phaser.GameObjects.Rectangle;  
    constructor(scene: Phaser.Scene, config: ContainerMenuConfigType) {
        super(scene, config.x, config.y)
        const offsetY = 100
        let isTyping = false;
        let inputText = '';
        const textLength = 6
        let masterManagerScene = scene.game.scene.getScene("MasterManager") as MasterManager;
        if (!masterManagerScene) {
            this.masterManager = new MasterManager();
            this.scene.scene.add("MasterManager", this.masterManager, true);
        } else {
            this.masterManager = masterManagerScene;
            // this.scene.scene.launch("MasterManager");
        }
        this.error = this.scene.add.text(-400,-400,"Yikes, try that one again?", {
            color: "#00feff",
            stroke: "#00feff",
            align: "center",
            fontFamily: "Arcade",
            wordWrap: {
                width: this.width * 0.9,
            },
        }).setFontSize('60px').setVisible(false)
        this.title = this.scene.add.text(-230, 50, 'ENTER CODE:', {
            color: "#00feff",
            stroke: "#00feff",
            align: "center",
            fontFamily: "Arcade",
            wordWrap: {
                width: this.width * 0.9,
            },
        }).setFontSize('60px').setFontSize('60px').setScale(0);
        this.modal = scene.add.image(0, 100, "codeModal").setScale(0);
        this.modal.setOrigin(0.5);
        this.input = scene.add.rectangle(-260 , 200, this.modal.width * 0.6, 80, 57055).setOrigin(0, 0.5).setScale(0).setAlpha(0.5);
        
        this.input.setInteractive()
        this.input.on('pointerup', () => {
          isTyping = true;
          inputText = '';
          this.masterManager?.playSound('buttonSound', false)
          this.input.setAlpha(0.8);
        });
        scene.time.addEvent({
            delay: 500,
            callback: () => {
                if (this.writingIndicator && isTyping && this.textDisplay.length === 0) {
                    this.writingIndicator.setVisible(!this.writingIndicator.visible);
                }
            },
            loop: true
        });
        scene.input.keyboard?.on('keydown', (event: any) => {
          const key = event.key;
          if (/^[a-zA-Z0-9]$/.test(key) && isTyping&&this.textDisplay.length<textLength) {
              this.textDisplay.push(key);
              inputText = this.textDisplay.join('');
              this.displayText.setText(inputText);
              this.writingIndicator?.setVisible(false);
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
        this.writingIndicator = this.scene.add.rectangle(0, 200, 10, 50, 0x00feff).setOrigin(0, 0.5).setVisible(false);
       

        this.backButton = scene.add.image(0, 0, "playBackButton")
        const width = this.backButton.width
        const height = this.backButton.height
        this.backButton.setPosition(this.width + width  ,this.height - height).setDepth(1000).setAlpha(0)

           this.backButton.setInteractive().on('pointerdown', () => {
               this.backButton.setTexture('playBackButtonPressed')
           })
           this.backButton.on('pointerup',()=>{
               this.backButton.setTexture('playBackButton')
               // tween alpha 0 on backButton
                this.scene.tweens.add({
                     targets: this.backButton,
                     alpha: 0,
                     duration: 300,
                     ease: 'Power2',
                })

               this.masterManager?.playSound('buttonSound', false)
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

           this.confirmButton = scene.add.image(0, 370, "acceptButton");
      
           this.confirmButton.setInteractive();
           this.confirmButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                if(this.textDisplay.length>=textLength){
                    this.confirmButton.setTexture('acceptHover');
                }
           });
           this.confirmButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                    if(this.textDisplay.length>=textLength){
                        this.confirmButton.setTexture('acceptButton');
                    }
           });
           this.confirmButton.on('pointerdown', () => {
                if(this.textDisplay.length>=textLength){
                    this.confirmButton.setTexture('acceptPressed')
                }  
           })
           this.confirmButton.on('pointerup', () => {
               if(this.textDisplay.length>=textLength){
                    this.masterManager?.enterCode(this.textDisplay.join(''), this.error);
                    this.confirmButton.setTexture('acceptHover')
                    this.masterManager?.playSound('buttonSound', false)
                    this.scene.sound.stopAll()
                    
                }
           })

        //    this.settingsButton = scene.add.image(0, 0, "settingsButton")
        //    this.settingsButton.setPosition(900,-430 ).setScrollFactor(1)
        //    this.settingsButton.setInteractive()
        //    this.settingsButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, ()=>{
        //        this.settingsButton.setTexture('settingsButtonHover')
        //    })
        
        //    this.settingsButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, ()=>{
        //        this.settingsButton.setTexture('settingsButton')
        //    })

        //    this.settingsButton.on("pointerdown", ()=>{
        //        this.settingsButton.setTexture('settingsButtonPressed')
        //    })
        //    this.settingsButton.on("pointerup", ()=>{
        //          const settings = new containerSettings(this.scene as MenuScene, {
        //             x: this.width * 1.5,
        //             y: this.height / 2,
                
        //         }, config.changeContainer ? config.changeContainer : undefined)
        //         arr.push(settings)
        //         this.masterManager?.playSound('buttonSound', false)
        //     this.settingsButton.setTexture('settingsButtonHover')
        //      })

        const sky = this.scene.add.image(0,innerHeight/4 -200,'codeSky').setOrigin(0.5, 0.5)
        const stars = this.scene.add.image(0,innerHeight/4 -350,'codeStars').setOrigin(0.5, 0.5)
        const background0 = this.scene.add.image(0,innerHeight/4 -200, 'codeFondo0').setInteractive().setOrigin(0.5, 0.5)
        const background1 = this.scene.add.image(0,innerHeight/4 -250, 'codeFondo1').setInteractive().setOrigin(0.5, 0.5)
        const background2 = this.scene.add.image(0,innerHeight/4 -300, 'codeFondo2').setInteractive().setOrigin(0.5, 0.5)
        const floor = this.scene.add.image(0,innerHeight/4 -150, 'codeFloor').setInteractive().setOrigin(0.5, 0.5)
        const front = this.scene.add.image(0,innerHeight/4 -250, 'codeFront').setInteractive().setOrigin(0.5, 0.5)
        this.astroFront = this.scene.add.image(0,0, 'astroFront').setInteractive().setOrigin(0.5, 0.5).setScale(0)
        this.astroBack = this.scene.add.image(0, 0, 'astroBack').setInteractive().setOrigin(0.5, 0.5).setScale(0)

        const arr = [
            sky,
            stars,
            background2,
            background1,
            background0,
            floor,
            front,
            this.astroBack,
            this.modal,
            this.astroFront,
            this.input,
            this.title,
            this.displayText,
            // this.backButton,
            this.confirmButton,
            this.writingIndicator,
            // this.settingsButton,
            this.error
        ]
        
        this.add(arr)
        scene.add.existing(this)
        scene.add.existing(this.backButton)
    }
    resize(newValue: number) {
        this.setScale(newValue);
    }

    setDefaultStatusOfElements() {
        [this.modal, this.input, this.title, this.displayText, this.confirmButton, this.astroFront, this.astroBack].map((element: Phaser.GameObjects.Image) => {
            element.setScale(0);
        })
        this.backButton.setAlpha(0);
        }
    animateElements(){
        this.backButton.setAlpha(1)
        this.scene.tweens.add({
            targets:[this.modal, this.input, this.title, this.displayText, this.confirmButton, this.astroFront, this.astroBack],
            scale:1,
            duration:500,
            ease:'Bounce',

        })
    }
}
export default containerCode;