import Phaser, { Game } from "phaser";

// Scene in class
class TextBox extends Phaser.GameObjects.Container {
  width: number;
  height: number;
  x: number;
  y: number;
  bordeGlow?: Phaser.GameObjects.Image;
  fondoDegrade?: Phaser.GameObjects.Image;
  lineaAbajo?: Phaser.GameObjects.Image;
  lineaArriba?: Phaser.GameObjects.Image;
  lineaDer?: Phaser.GameObjects.Image;
  lineaIzq?: Phaser.GameObjects.Image;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    heigth: number,
  ) {
    super(scene);
    this.scene = scene;
    this.width = width;
    this.height = heigth;
    this.x = x;
    this.y = y;


    this.bordeGlow = this.scene.add.image(0, 0, "bordeGlow").setOrigin(0)
    this.fondoDegrade = this.scene.add.image(0, 0, "fondoDegrade").setOrigin(0)
    this.lineaArriba = this.scene.add.image(0, 0, "lineaArriba").setOrigin(0).setVisible(false)
    this.lineaDer = this.scene.add.image(0, 0, "lineaDer").setOrigin(1,0).setVisible(false)
    this.lineaIzq = this.scene.add.image(0, 0, "lineaIzq").setOrigin(0).setVisible(false)
    this.lineaAbajo = this.scene.add.image(0, 0, "lineaAbajo").setOrigin(0,1).setVisible(false)

    

  const assets = [
      this.fondoDegrade,
      this.bordeGlow,
      this.lineaAbajo,
      this.lineaArriba,
      this.lineaDer,
      this.lineaIzq,
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
}
export default TextBox;
