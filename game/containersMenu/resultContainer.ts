import Phaser from "phaser";
import { ContainerMenuConfigType, resultContainerConfigType } from "../Types";
import MasterManager from "../MasterManager";
import containerSettings from "./containerSettings";
import MenuScene from "../Menu";

class resultContainer extends Phaser.GameObjects.Container {
    width: number = window.innerWidth;
    height: number = window.innerHeight;
    masterManager?: MasterManager;
    collText?: string;
    coinCount?: number;
    lifes?: number;
    victory?: boolean
    modal?:Phaser.GameObjects.Image
    resultTitle?: Phaser.GameObjects.Image;
    resultAstro?: Phaser.GameObjects.Image;
    item?:Phaser.GameObjects.Image;
    contenedorReloj?:Phaser.GameObjects.Image;
    deaths?:Phaser.GameObjects.Image;
    container?:Phaser.GameObjects.Container;
    continueButton?: Phaser.GameObjects.Image
    retryButton?: Phaser.GameObjects.Image
    homeButton?:Phaser.GameObjects.Image
    constructor(scene: Phaser.Scene, config: resultContainerConfigType) {
        super(scene, config.x, config.y)
        const offsetY = 100
            this.collText = config.collText,
            this.coinCount = config.coinCount ?? 1,
            this.lifes = config.lifes,
            this.victory = config.victory
        let masterManagerScene = scene.game.scene.getScene("MasterManager") as MasterManager;
        if (!masterManagerScene) {
            this.masterManager = new MasterManager();
            this.scene.scene.add("MasterManager", this.masterManager, true);
        } else {
            this.masterManager = masterManagerScene;
            // this.scene.scene.launch("MasterManager");
        }
        
        if(this.victory){
            scene.time.paused = true
            scene.add.text(window.innerWidth / 2 -20, window.innerHeight / 2 -130, `${this.collText} / ${this.coinCount + 1}`).setFontSize(45).setFontFamily('arcade').setDepth(3);
            this.resultAstro = scene.add.image(window.innerWidth / 2, window.innerHeight / 2 -310, 'resultVictoryAstro').setDepth(1)
            this.modal = scene.add.image(window.innerWidth/2,window.innerHeight/2,"resultModal").setDepth(2).setScale(0.9)
            this.resultTitle = scene.add.image(window.innerWidth / 2, window.innerHeight / 2 - 190, 'resultVictory').setScale(0.9).setDepth(3)
            var texture = "itemPlaneta" + config.planeta
            this.item = scene.add.image(window.innerWidth / 2 -80, window.innerHeight / 2 - 110,texture).setDepth(3),
           
           
            this.contenedorReloj = scene.add.image(window.innerWidth /2, window.innerHeight/2 -10, 'contenedorReloj')
            scene.add.text(window.innerWidth /2, window.innerHeight/2 -10, "hola" ).setFontSize(20).setFontFamily('arcade').setDepth(3)

            this.deaths = scene.add.image(window.innerWidth/2 -40, window.innerHeight/2 + 110, "deaths")
            this.continueButton = scene.add.image (window.innerWidth /2 -100, window.innerHeight/2 + 200 , "resultContinue").setDepth(4).setInteractive()
            this.retryButton = scene.add.image (window.innerWidth /2 +100, window.innerHeight/2 + 200, "resultRetry").setDepth(4).setInteractive()
            scene.add.text(window.innerWidth/2 + 15, window.innerHeight/2 + 85, "3").setFontSize(45).setFontFamily('arcade').setDepth(3)
            scene.add.rectangle(window.innerWidth / 2, window.innerHeight / 2, 1, window.innerHeight, 0xffffff).setDepth(3);
            this.homeButton = scene.add.image(window.innerWidth/2 -250, window.innerHeight/2 + 200, "botonHome").setScale(0.7).setInteractive()

            this.retryButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, ()=>{
                this.retryButton?.setTexture("resultRetryHover")
            })
            this.retryButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
                this.retryButton?.setTexture("resultRetry")

            })
            this.retryButton.on("pointerdown", ()=>{
                this.retryButton?.setTexture("resultRetryPressed")
                
            })
            this.retryButton.on("pointerup",()=>{
                this.retryButton?.setTexture("resultRetryHover")
            })

            this.continueButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, ()=>{
                this.continueButton?.setTexture("resultContinueHover")
            })
            this.continueButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
                this.continueButton?.setTexture("resultContinue")

            })
            this.continueButton.on("pointerdown", ()=>{
                this.continueButton?.setTexture("resultContinuePressed")
                
            })
            this.continueButton.on("pointerup",()=>{
                this.continueButton?.setTexture("resultContinueHover")
            })


            this.homeButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, ()=>{
                this.homeButton?.setTexture("botonHomeHover")
            })
            this.homeButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
                this.homeButton?.setTexture("botonHome")

            })
            this.homeButton.on("pointerdown", ()=>{
                this.homeButton?.setTexture("botonHomePressed")
                
            })
            this.homeButton.on("pointerup",()=>{
                this.homeButton?.setTexture("botonHomeHover")
            })


            
            const assets = [
                this.resultAstro,
                this.modal,
                this.resultTitle
            ]
            this.container?.add(assets)
        }
        console.log("entro")



        // const arr = [

        // ]

        // this.add(arr)
        scene.add.existing(this)
    }


}
export default resultContainer;