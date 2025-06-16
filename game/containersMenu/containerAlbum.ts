import Phaser from "phaser";
import { ContainerMenuConfigType } from "../Types";
import MultiScene from "../MultiScene";
import MenuScene, { scaleBy } from "../Menu";
import MasterManager from "../MasterManager";
import Figuritas from "../assets/Figurita";

class containerAlbum extends Phaser.GameObjects.Container {

    width: number = window.innerWidth;
    height: number = window.innerHeight;
    background: Phaser.GameObjects.Image;
    backButton: Phaser.GameObjects.Image;
    banner: Phaser.GameObjects.Image;
    title: Phaser.GameObjects.Text;
    masterManager: MasterManager;
    figuritas: Figuritas[] = [];
    arr: Phaser.GameObjects.GameObject[] = [...this.figuritas]
    spacing:number = this.width / 3;
    start:number = 0;
    end:number = 2;
    step:number = 2
    imagenes: string[] = ["planeta1_figu1", "planeta1_figu2", "planeta2_figu1", "planeta2_figu2", "planeta3_figu1", "planeta3_figu2"]


    constructor(scene: Phaser.Scene, config: ContainerMenuConfigType) {
        super(scene, config.x, config.y)
        let masterManagerScene = scene.game.scene.getScene("MasterManager") as MasterManager;
        if (!masterManagerScene) {
            this.masterManager = new MasterManager();
            this.scene.scene.add("MasterManager", this.masterManager, true);
        } else {
            this.masterManager = masterManagerScene;
        }

        this.background = scene.add.image(this.width / 2, this.height / 2, "backgroundAlbum").setScale(scaleBy(true))
        // this.background.setInteractive()
        this.banner = scene.add.image(this.width / 2, this.height / 6, "bannerAlbum")
        let nivel = 1;
        this.title = this.scene.add.text(100, 120 , `Level ${nivel}`, {
            color: "#00feff",
            stroke: "#00feff",
            align: "center",
            fontFamily: "Arcade",
            fontSize: 65,
            wordWrap: {
            width: this.width * 0.9,
            },
        })
        this.backButton = scene.add.image(0, 0, "playBackButton")
        this.backButton.setPosition(this.backButton.width, this.height - this.backButton.height)
        this.backButton.setInteractive().on('pointerdown', () => {
            this.backButton.setTexture('playBackButtonPressed')
        })
        this.backButton.on('pointerup', () => {
            this.backButton.setTexture('playBackButton')
            this.masterManager.playSound('buttonSound', false)
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


        
        const nextButton = this.scene.add.image(this.width - 100, this.height / 1.7, "backButton").setInteractive().setScale(0.8).setVisible(this.end < this.imagenes.length);
        nextButton.on("pointerup", () => {
            if (this.end < this.imagenes.length) {
                this.start += this.step;
                this.end += this.step;
                nivel += 1
                this.title.setText(`Level ${nivel}`)
                this.masterManager.playSound('buttonSound', false)
                this.updateElements();
                nextButton.setTexture('backButton')
            }
            nextButton.setVisible(this.end < this.imagenes.length);
            prevButton.setVisible(this.start > 0);
        });
        nextButton.setInteractive().on('pointerdown', () => {
            nextButton.setTexture('backButtonPressed')
        })

        nextButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            nextButton.setTexture('backButtonHover')
        })
        nextButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            nextButton.setTexture('backButton')
        })



        const prevButton = this.scene.add.image(100, this.height / 1.7, "playBackButton").setInteractive().setScale(0.8).setVisible(this.start > 0);
        prevButton.on("pointerup", () => {
            if (this.start > 0) {
                this.start -= this.step;
                this.end -= this.step;
                nivel -= 1
                this.title.setText(`Level ${nivel}`)
                this.masterManager.playSound('buttonSound', false)
                this.updateElements();
                prevButton.setTexture('playBackButton')
            }
            nextButton.setVisible(this.end < this.imagenes.length);
            prevButton.setVisible(this.start > 0);
        });
        prevButton.setInteractive().on('pointerdown', () => {
            prevButton.setTexture('playBackButtonPressed')
        })
        prevButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            prevButton.setTexture('playBackButtonHover')
        })
        prevButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            prevButton.setTexture('playBackButton')
        })

        // arr.push(nextButton, prevButton)

        this.add([
            this.background,
            this.backButton,
            this.banner,
            this.title,
            nextButton,
            prevButton
        ])

        // this.updateFiguritas();

        // this.add(arr)
        scene.add.existing(this)
    }
    updateElements = () => {
        this.figuritas.forEach((figurita) => figurita.destroy());
        this.figuritas = [];
        let posX = this.width / 3;
        const { width } = this.scene.scale;
        const scale = width / 1920;
        const showFiguritas = this.imagenes.slice(this.start, this.end);
        showFiguritas.forEach((child, index) => {
            const isUnlocked = this.masterManager.imagenesDesbloqueadas.includes(child);
            const figurita = new Figuritas(this.scene, posX * (index + 1), this.height / 1.7, child, isUnlocked).setScale(0).setAlpha(0.8);
            this.scene.tweens.add({
            targets: figurita,
            scale: scale,
            duration: 500,
            delay: 400 * index,
            ease: 'Bounce.easeOut'
            });
            this.figuritas.push(figurita);
        });      
        this.add(this.figuritas)
    };
    download(){
        console.log("hola hola")
    }
}
export default containerAlbum;