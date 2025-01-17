import Phaser from "phaser";
import { ContainerMenuConfigType } from "../Types";
import MenuScene, { scaleBy } from "../Menu";
import containerSettings from "./containerSettings";
import MasterManager from "../MasterManager";


class containerInitial extends Phaser.GameObjects.Container {

    width: number = window.innerWidth;
    height: number = window.innerHeight;
    creditsButton: Phaser.GameObjects.Image;
    gameTitle: Phaser.GameObjects.Image;
    logoNoswar: Phaser.GameObjects.Image;
    playButton: Phaser.GameObjects.Image;
    scoreButton: Phaser.GameObjects.Image;
    albumButton: Phaser.GameObjects.Image;
    settingsButton: Phaser.GameObjects.Image;
    settingsVisible = false
    arr: (Phaser.GameObjects.Image | containerSettings)[];
    masterManager: MasterManager

    scene: MenuScene;
    constructor(scene: MenuScene, config: ContainerMenuConfigType) {
        super(scene, config.x, config.y)
        this.scene = scene
        const offsetY = 100

        let masterManagerScene = scene.game.scene.getScene("MasterManager") as MasterManager;
        if (!masterManagerScene) {
            this.masterManager = new MasterManager();
            this.scene.scene.add("MasterManager", this.masterManager, true);
        } else {
            this.masterManager = masterManagerScene;
            // this.scene.scene.launch("MasterManager");
        }
    



        this.playButton = scene.add.image(this.width / 2, this.height / 2 + offsetY, "playButton");
        this.playButton.setInteractive();
        this.playButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            this.playButton.setTexture('playButtonHover');
        });
        this.playButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            this.playButton.setTexture('playButton');
        });
        this.playButton.on('pointerdown', () => {
            this.playButton.setTexture('playButtonPressed')
            
        })
        this.playButton.on('pointerup', () => {
            if(config.panToPlay){
                this.scene.cameras.main.pan(config.panToPlay.x, config.panToPlay.y, 1000, 'Expo', true)
                this.scene.sound.play('buttonSound')

            }
            this.playButton.setTexture('playButtonHover')
        })


        this.creditsButton = scene.add.image(0, 0, "creditsButton")
        this.creditsButton.setPosition(this.width/2 -130, this.playButton.y + this.creditsButton.height + this.playButton.height/2 + offsetY)

        this.creditsButton.setInteractive();
        this.creditsButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            this.creditsButton.setTexture('creditsButtonHover');
        });
        this.creditsButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            this.creditsButton.setTexture('creditsButton');
        });
        this.creditsButton.on('pointerup', () => {
            this.creditsButton.setTexture('creditsButtonHover')
            if(config.panToCredits){
                this.scene.cameras.main.pan(config.panToCredits.x, config.panToCredits.y, 1000, 'Expo', true)
            this.scene.sound.play('buttonSound')

            }

        })

        this.creditsButton.on('pointerdown', () => {
            this.creditsButton.setTexture('creditsButtonPressed')
        })
        this.albumButton = scene.add.image(0, 0, "albumButton")
        this.albumButton.setPosition(this.width/2 + this.creditsButton.width - 80, this.playButton.y + this.creditsButton.height + this.playButton.height/2 + offsetY)

        this.albumButton.setInteractive();
        this.albumButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            this.albumButton.setTexture('albumButtonHover');
        });
        this.albumButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            this.albumButton.setTexture('albumButton');
        });
        this.albumButton.on('pointerup', () => {
            this.albumButton.setTexture('albumButtonHover')
            this.scene.sound.play('buttonSound')
            if(config.changeContainer){
                config.changeContainer()
            }

        })

        this.albumButton.on('pointerdown', () => {
            this.albumButton.setTexture('albumButtonPressed')
            if(config.panToCredits){
                // this.scene.cameras.main.pan(config.panToCredits.x, config.panToCredits.y, 1000, 'Expo', true)
            }
        })

        this.gameTitle = scene.add.image(0, 0, "gameTitle")
        this.gameTitle.setPosition(this.width/2, (this.playButton.y - this.playButton.height/2)/2)
        if(window.innerWidth < 1400){
            this.gameTitle.setScale(0.7)
        }

        this.scoreButton = scene.add.image(0, 0, "scoreButton")
        this.scoreButton.setInteractive()
        this.scoreButton.setPosition(this.scoreButton.width, this.scoreButton.height).setVisible(false)

        this.scoreButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, ()=>{
            this.scoreButton.setTexture('scoreButtonHover')
        })
        
        this.scoreButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, ()=>{
            this.scoreButton.setTexture('scoreButton')
        })
        this.scoreButton.on("pointerdown", ()=>{
            this.scoreButton.setTexture('scoreButtonPressed')
        })
        this.scoreButton.on("pointerup", ()=>{
            this.scoreButton.setTexture('scoreButtonHover')
            this.scene.sound.play('buttonSound')

        })

        this.settingsButton = scene.add.image(0, 0, "settingsButton")
        this.settingsButton.setPosition(this.width - this.settingsButton.width, this.settingsButton.height).setScrollFactor(1)
        this.settingsButton.setInteractive()
        this.settingsButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, ()=>{
            this.settingsButton.setTexture('settingsButtonHover')
        })
        
        this.settingsButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, ()=>{
            this.settingsButton.setTexture('settingsButton')
        })

        this.settingsButton.on("pointerdown", ()=>{
            this.settingsButton.setTexture('settingsButtonPressed')
        })
        this.settingsButton.on("pointerup", ()=>{
            console.log(this.settingsVisible, "visible from menu")
            this.toggleSettings()
            this.scene.sound.play('buttonSound')
            this.settingsButton.setTexture('settingsButtonHover')
        })
        this.scene.input.keyboard?.on('keydown-ESC', () => {
            console.log(this.settingsVisible, "visible from menu")
            this.toggleSettings();
        });
        this.logoNoswar = scene.add.image(0, 0, "logoNoswar")
        this.logoNoswar.setPosition(this.width - this.logoNoswar.width, this.height - this.logoNoswar.height)

        this.arr = [
            this.creditsButton, 
            this.gameTitle, 
            this.playButton, 
            this.scoreButton, 
            this.settingsButton, 
            this.logoNoswar,
            this.albumButton
        ]

        this.add(this.arr) 
        scene.add.existing(this)
    }

    toggleSettings(){
        if(this.settingsVisible){
          this.settingsVisible = false
          this.arr.forEach((child:any)=>{
            if(child instanceof containerSettings){
              child.crossPress()
            }
          })
          this.settingsButton?.setVisible(true)

        }else{
          const settingsModal = new containerSettings(this.scene, {x:window.innerWidth/2,y:window.innerHeight/2},undefined, ()=>{this.settingsVisible = !this.settingsVisible},this.settingsButton)
          this.masterManager.playSound('buttonSound', false)
          this.settingsButton?.setVisible(false)
          this.arr.push(settingsModal)
          this.settingsVisible = true
        }
      }
}
export default containerInitial;