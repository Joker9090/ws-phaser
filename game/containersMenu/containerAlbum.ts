import Phaser from "phaser";
import { ContainerMenuConfigType } from "../Types";
import MultiScene from "../MultiScene";
import MenuScene from "../Menu";
import MasterManager from "../MasterManager";
import Figuritas from "../assets/Figurita";

class containerAlbum extends Phaser.GameObjects.Container {

    width: number = window.innerWidth;
    height: number = window.innerHeight;
    background: Phaser.GameObjects.Image;
    backButton: Phaser.GameObjects.Image;
    banner:Phaser.GameObjects.Image;
    title: Phaser.GameObjects.Text;
    masterManager: MasterManager


    constructor(scene: Phaser.Scene, config: ContainerMenuConfigType) {
        super(scene, config.x, config.y)

 
        let masterManagerScene = scene.game.scene.getScene("MasterManager") as MasterManager;
        if (!masterManagerScene) {
            this.masterManager = new MasterManager();
            this.scene.scene.add("MasterManager", this.masterManager, true);
        } else {
            this.masterManager = masterManagerScene;
            this.scene.scene.launch("MasterManager");
        }
        this.background = scene.add.image(this.width/2, this.height /2, "backgroundAlbum")
        // this.background.setInteractive()
        this.banner = scene.add.image(this.width/2, this.height /6, "bannerAlbum")
        this.title = this.scene.add.text(0,0,"Album", {
            color: "#00feff",
            stroke: "#00feff",
            align: "center",
            fontFamily: "Arcade",
            wordWrap: {
                width: this.width * 0.9,
            },
        }).setFontSize('60px').setVisible(false)
        this.backButton = scene.add.image(0, 0, "playBackButton")
        this.backButton.setPosition(this.backButton.width, this.height - this.backButton.height)
        this.backButton.setInteractive().on('pointerdown', () => {
            this.backButton.setTexture('playBackButtonPressed')
        })
        this.backButton.on('pointerup', () => {
            this.backButton.setTexture('playBackButton')
            this.scene.sound.play('buttonSound')
            if (config.changeContainer) {
                config.changeContainer()
            }

        })
        this.backButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            this.backButton.setTexture('playBackButtonHover')
        })
        this.backButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            this.backButton.setTexture('playBackButton')
        })
    


        const arr: Phaser.GameObjects.GameObject[] = [
            this.background,
            this.backButton, 
            this.banner,
            this.title
        ]
        let posX = this.width/4.5; 
        const spacing = 800;
      
        this.masterManager.imagenesAlbum.forEach(data => {
            const figurita = new Figuritas(scene, posX, this.height / 1.7, data).setScale(0.8).setAlpha(0.8);
            arr.push(figurita);
            posX += spacing;
        });

        this.add(arr)
        scene.add.existing(this)
    }
}
export default containerAlbum;