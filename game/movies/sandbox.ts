import Phaser from "phaser";
import Ticker, { TickerJob } from './Ticker'

class SandBox extends Phaser.Scene {
    ticker: Ticker;

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

        console.log(window.innerWidth, window.innerHeight, "ARIEl")
        const gameObjectScaler = {
            x: window.innerWidth / 1920,
            y: window.innerHeight / 927,
        }

        const lights = {
            right: {
                x: middlePoint.x + 503 *gameObjectScaler.x,
                y: middlePoint.y / 2 + 47*gameObjectScaler.y ,
            },
            left: {
                x: middlePoint.x - 503 *gameObjectScaler.x,
                y: middlePoint.y / 2 + 52 *gameObjectScaler.y
            }
        };
        console.log(lights)
        console.log(503 *gameObjectScaler.x)

        this.naveCapaTrasera = this.add.image(middlePoint.x, middlePoint.y, "naveCapaTrasera").setOrigin(0.5)

        
        this.alarmaRojaOn = this.add.image(lights.right.x, lights.right.y, "alarmaRojaOn").setOrigin(0.5)
        
        this.alarmaVerdeOn = this.add.image(lights.left.x,lights.left.y,"alarmaVerdeOn").setOrigin(0.5)
        
        this.naveCapaTrasera.setScale(gameObjectScaler.x, gameObjectScaler.y)
        this.alarmaRojaOn.setScale(gameObjectScaler.x, gameObjectScaler.y)
        this.alarmaVerdeOn.setScale(gameObjectScaler.x, gameObjectScaler.y)
    }



    update(this: SandBox, time: number, delta: number) {

    }
}
export default SandBox;




