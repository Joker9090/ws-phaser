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

  

    this.height = this.calculateHeigth(this.text, this.width)
    this.bordeGlow = this.scene.add.image(0, 0, "bordeGlow").setOrigin(0)
    this.fondoDegrade = this.scene.add.image(0, 0, "fondoDegrade").setOrigin(0)
    this.lineaArriba = this.scene.add.image(0, 0, "lineaArriba").setOrigin(0).setVisible(false)
    this.lineaDer = this.scene.add.image(0, 0, "lineaDer").setOrigin(1,0).setVisible(false)
    this.lineaIzq = this.scene.add.image(0, 0, "lineaIzq").setOrigin(0).setVisible(false)
    this.lineaAbajo = this.scene.add.image(0, 0, "lineaAbajo").setOrigin(0,1).setVisible(false)

    this.textDisplayed = this.scene.add.text(0, 0, this.text, {
      fontSize: 20,
      lineSpacing: 15,
      padding: {
        x: 20,
        y: 10
      },
      color: "#34cceb",
      stroke: "#34cceb",
      align: "center",
      fontFamily: "Arcade",
      fixedWidth: this.width,
      fixedHeight: this.height,
    })

  const assets = [
      this.fondoDegrade,
      this.bordeGlow,
      this.lineaAbajo,
      this.lineaArriba,
      this.lineaDer,
      this.lineaIzq,
      this.textDisplayed
    ]

    for(let i = 0; i < assets.length ; i++){
      if (i < 7){
        const originalWidth = assets[i].width
        const originalHeight = assets[i].height
        const scaleFactorX = this.width/originalWidth
        const scaleFactorY = this.height/originalHeight
        assets[i].setScale(scaleFactorX, scaleFactorY)
      }
    }



    this.lineaAbajo?.setPosition(0, this.bordeGlow?.height)
    this.lineaArriba?.setPosition(0,0)
    this.lineaDer?.setPosition(this.bordeGlow.width, 0)
    this.lineaIzq?.setPosition(0, 0)

    
    this.add(assets)
  }

  calculateHeigth(text: string, width: number ) {
    const temporalText = this.scene.add.text(0, 0, text, {
      fixedWidth: width,
      fontSize: 20,
      lineSpacing: 24,
      padding: {
        x: 20,
        y: 20
      },
      color: "black",
      stroke: 'black',
      wordWrap: {
        width: width,
      },
    }).setVisible(false)
    const textHeight = temporalText.height
    return textHeight
  }
}
export default TextBox;
