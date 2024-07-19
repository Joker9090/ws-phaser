import Phaser from "phaser";
import Ticker, { TickerJob } from '../Ticker'
import { DiagnosticCategory } from "typescript";
import DialogueManager from "../DialogueManager";

class SandBox extends Phaser.Scene {
    ticker: Ticker;
    dialogueManager?: DialogueManager;
    //assets
    background3?: Phaser.GameObjects.Image;
    background2?: Phaser.GameObjects.Image;
    background1?: Phaser.GameObjects.Image;
    planet?: Phaser.GameObjects.Image;
    alarmaRojaOn?: Phaser.GameObjects.Image;
    alarmaRojaOff?: Phaser.GameObjects.Image;
    alarmaVerdeOn?: Phaser.GameObjects.Image;
    alarmaVerdeOff?: Phaser.GameObjects.Image;
    luzAlarmaRoja?: Phaser.GameObjects.Image;
    luzAlarmaVerde?: Phaser.GameObjects.Image;
    naveCapaTrasera?: Phaser.GameObjects.Image;
    naveCapaDelantera?: Phaser.GameObjects.Image;
    marcoVentana?: Phaser.GameObjects.Image;
    vidrioVentana?: Phaser.GameObjects.Image;
    LuzPanelRojo?: Phaser.GameObjects.Image;
    LuzPanelVerde?: Phaser.GameObjects.Image;
    LuzPanelRojo2?: Phaser.GameObjects.Image;
    LuzPanelVerde2?: Phaser.GameObjects.Image;

    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;


    // controllers
    nextText?: Phaser.GameObjects.Text;

    constructor() {
        super({ key: "SandBox" });

        const tickerMS = 100;
        this.ticker = new Ticker(tickerMS);
    }

    preload(this: Phaser.Scene) {
        this.load.image("fondo1", "/movies/intro/scene2/FondoCapa1.png")
        this.load.image("fondo2", "/movies/intro/scene2/FondoCapa2.png")
        this.load.image("fondo3", "/movies/intro/scene2/FondoCapa3.png")
        this.load.image("planet", "/movies/intro/scene2/planeta.png")
        this.load.image("alarmaRojaOn", "/movies/intro/scene2/AlarmaRoja.png")
        this.load.image("alarmaRojaOff", "/movies/intro/scene2/AlarmaRojaApagada.png")
        this.load.image("alarmaVerdeOn", "/movies/intro/scene2/AlarmaVerde.png")
        this.load.image("alarmaVerdeOff", "/movies/intro/scene2/AlarmaVerdeApagada.png")
        this.load.image("luzAlarmaRoja", "/movies/intro/scene2/LuzAlarmaRoja.png")
        this.load.image("luzAlarmaVerde", "/movies/intro/scene2/LuzAlarmaVerde.png")
        this.load.image("naveCapaTrasera", "/movies/intro/scene2/NaveCapaTrasera.png")
        this.load.image("naveCapaDelantera", "/movies/intro/scene2/PanelCapaDelantera.png")
        this.load.image("marcoVentana", "/movies/intro/scene2/MarcoVentana.png")
        this.load.image("vidrioVentana", "/movies/intro/scene2/VidrioVentana.png")
        this.load.image("LuzPanelRojo", "/movies/intro/scene2/LuzPanelRojo.png")
        this.load.image("LuzPanelVerde", "/movies/intro/scene2/LuzPanelVerde.png")
    }

    scaleImage(images: Phaser.GameObjects.Image[]) {
        images.forEach((image: Phaser.GameObjects.Image) => {
            image.displayHeight = this.cameras.main.displayHeight
            image.displayWidth = this.cameras.main.displayWidth
            image.y = this.cameras.main.displayHeight / 2
            image.x = this.cameras.main.displayWidth / 2
        })
    }

    create(this: SandBox, { level }: any) {
        console.log("SCENE 3")

        // START ticker
        this.time.addEvent({
            delay: this.ticker.ms,
            callback: this.ticker.runTicker,
            loop: true,
        });
        this.cursors = this.input.keyboard?.createCursorKeys();

        const middlePoint = {
            x: this.cameras.main.displayWidth / 2,
            y: this.cameras.main.displayHeight / 2,
        };

        const gameObjectScaler = {
            x: window.innerWidth / 1920,
            y: window.innerHeight / 927,
        }



        this.naveCapaTrasera = this.add.image(0, 0, "naveCapaTrasera").setOrigin(0.5)


        this.alarmaRojaOn = this.add.image(0, 0, "alarmaRojaOn").setOrigin(0.5).setPosition(503, -185)

        this.alarmaVerdeOn = this.add.image(0, 0, "alarmaVerdeOn").setOrigin(0.5).setPosition(-503, -180)

        const container = this.add.container(middlePoint.x, middlePoint.y).setSize(1920, 927)
        container.add([this.naveCapaTrasera, this.alarmaRojaOn, this.alarmaVerdeOn])
        container.setScale(gameObjectScaler.x < gameObjectScaler.y ? gameObjectScaler.y : gameObjectScaler.x)
        
        this.cameras.main.postFX.addVignette(0.5, 0.5, 0.8);

        // this.dialogueManager = new DialogueManager(this, [""])
  
    }



    update(this: SandBox, time: number, delta: number) {
        if (this.dialogueManager) this.dialogueManager.update()
    }
}
export default SandBox;




