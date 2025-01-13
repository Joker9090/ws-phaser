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

        this.background = scene.add.image(this.width / 2, this.height / 2, "backgroundAlbum").setScale(scaleBy(true))
        // this.background.setInteractive()
        this.banner = scene.add.image(this.width / 2, this.height / 6, "bannerAlbum")
        let nivel = 1;
        this.title = this.scene.add.text(this.width / 8, this.height / 8, `Level ${nivel}`, {
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


        const arr: Phaser.GameObjects.GameObject[] = [...this.figuritas]

        const spacing = this.width / 3;
        let start = 0;
        let end = 2;
        let step = 2

        const updateFiguritas = () => {
            // Limpiar las figuritas actuales
            this.figuritas.forEach((figurita) => figurita.destroy());
            this.figuritas = [];
            let posX = this.width / 3;
            const showFiguritas = this.masterManager.imagenesAlbum.slice(start, end);
            showFiguritas.forEach((data, index) => {
                const figurita = new Figuritas(scene, posX * (index +1), this.height / 1.7, data).setScale(0.8).setAlpha(0.8);
                
                this.figuritas.push(figurita);
                // posX += spacing;
            });
            this.add(this.figuritas)
            // console.log(arr, this.figuritas, "ARR AND FIG ARIEL")
            // arr.concat([...this.figuritas]);
            // console.log(arr, "ARR ARIEL")
            // this.add(arr)
            // console.log(this, "CONTAINER ALBUM ARIEL IN UPDATE")
        };

        const nextButton = this.scene.add.image(this.width - 80, this.height / 1.7, "backButton").setInteractive();
        nextButton.on("pointerup", () => {
            if (end < this.masterManager.imagenesAlbum.length) {
                start += step;
                end += step;
                nivel += 1
                this.title.setText(`Level ${nivel}`)
                updateFiguritas();
            }
        });
        nextButton.setInteractive().on('pointerdown', () => {
            nextButton.setTexture('backButtonPressed')
        })
        nextButton.on('pointerup', () => {
            nextButton.setTexture('backButton')
            this.scene.sound.play('buttonSound')
        })
        nextButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            nextButton.setTexture('backButtonHover')
        })
        nextButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            nextButton.setTexture('backButton')
        })



        const prevButton = this.scene.add.image(100, this.height / 1.7, "playBackButton").setInteractive();
        prevButton.on("pointerup", () => {
            if (start > 0) {
                start -= step;
                end -= step;
                nivel -= 1
                this.title.setText(`Level ${nivel}`)
                updateFiguritas();
            }
        });
        prevButton.setInteractive().on('pointerdown', () => {
            prevButton.setTexture('playBackButtonPressed')
        })
        prevButton.on('pointerup', () => {
            prevButton.setTexture('playBackButton')
            this.scene.sound.play('buttonSound')
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

        updateFiguritas();

        // this.add(arr)
        scene.add.existing(this)
    }

    download(){
        console.log("hola hola")
    }
}
export default containerAlbum;