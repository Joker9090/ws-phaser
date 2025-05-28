import Phaser, { Game } from "phaser";

// Scene in class
class TextBox extends Phaser.GameObjects.Container {
  width: number;
  height: number;
  x: number;
  y: number;
  text: string;
  textDisplayed?: Phaser.GameObjects.Text;
  bordeGlow?: Phaser.GameObjects.Image;
  fondoDegrade?: Phaser.GameObjects.Image;
  lineaAbajo?: Phaser.GameObjects.Image;
  lineaArriba?: Phaser.GameObjects.Image;
  lineaDer?: Phaser.GameObjects.Image;
  lineaIzq?: Phaser.GameObjects.Image;
  constructor(
    scene: Phaser.Scene,
    text: string,
    x: number,
    y: number,
    width: number,
  ) {
    super(scene);
    this.scene = scene;
    this.text = text
    this.width = width;
    this.x = x;
    this.y = y;

  
    this.textDisplayed = this.scene.add.text(0, 0, this.text, {
      fontSize: 17,
      padding: {
        x: 20,
        y: 20
      },
      color: "#34cceb",
      stroke: "#34cceb",
      align: "center",
      fontFamily: "Arcade",
      fixedWidth: this.width,
      wordWrap: {
        width: this.width*0.9,
      },
    }).setOrigin(0)

    this.height = this.textDisplayed.height

    const pressSpaceToContinue = this.scene.add.text(0, this.height, `Press ${this.scene.sys.game.device.input.touch ? "your finger" : "SPACE"} to continue`, {
      fontSize: 15,
      padding: {
        x: 20,
        y: 20
      },
      color: "#34cceb",
      stroke: "#34cceb",
      align: "center",
      fontFamily: "Arcade",
        fixedWidth: this.width,

      }
    )

    this.height = this.height + pressSpaceToContinue.height
    

    this.bordeGlow = this.scene.add.image(0,0, "bordeGlow").setOrigin(0).setDisplaySize(this.width, this.height)
    this.fondoDegrade = this.scene.add.image(0,0, "fondoDegrade").setOrigin(0).setDisplaySize(this.width, this.height)
    // this.lineaArriba = this.scene.add.image(0, 0, "lineaArriba").setOrigin(0).setVisible(false)
    // this.lineaDer = this.scene.add.image(0, 0, "lineaDer").setOrigin(1,0).setVisible(false)
    // this.lineaIzq = this.scene.add.image(0, 0, "lineaIzq").setOrigin(0).setVisible(false)
    // this.lineaAbajo = this.scene.add.image(0, 0, "lineaAbajo").setOrigin(0,1).setVisible(false)


  const assets = [
      this.fondoDegrade,
      this.bordeGlow,
      // this.lineaAbajo,
      // this.lineaArriba,
      // this.lineaDer,
      // this.lineaIzq,
      this.textDisplayed,
      pressSpaceToContinue
    ]
    
    this.add(assets)
  }

}
export default TextBox;

