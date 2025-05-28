import Phaser, { Physics } from "phaser";
import Game from "../Game";

export type LargeFloorTween = Phaser.Tweens.Tween | Phaser.Types.Tweens.TweenBuilderConfig | Phaser.Types.Tweens.TweenChainBuilderConfig | Phaser.Tweens.TweenChain
export type LargeFloorIslandConfig = {
  withTextureToAbove?: boolean,
  textureA: string,
  textureB: string,
  textureC: string,
  textureFill?: string[],
  width: {
    textureA: number,
    textureB: number,
    textureC: number,
  }, // width of middle asset
  height?: number,
  fix?: number,
  pos: {
    x: number,
    y: number
  },
  scale?: {
    width: number,
    height: number,
  },
  large: number,
  rotated: boolean,
  type?: string,
  fillBehind?: boolean,
  flipY?: boolean,
}
// Scene in class
class LargeFloorIsland extends Phaser.GameObjects.Container {
  isJumping = false;
  scene: Game;
  group: Phaser.Physics.Arcade.Group;
  parts: Phaser.Physics.Arcade.Sprite[];
  constructor(scene: Game, config: LargeFloorIslandConfig, group: Phaser.Physics.Arcade.Group, frame?: string | number | undefined, velocity?: number) {
    super(scene, config.pos.x, config.pos.y)
    this.parts = [];
    this.scene = scene;
    this.group = group;
    const height = config.height ?? 20;

    const sizeWidth = config.width.textureA + config.width.textureC + config.width.textureB * (config.large - 2)

  
   


    for (let index = 0; index < config.large; index++) {

      const t = index === 0 ? config.textureA : index === config.large - 1 ? config.textureC : config.textureB

      const lastTilePos = (config.large - 2) * config.width.textureB + config.width.textureA
      const s = scene.add.sprite(
        index === 0 ? 0 : index === config.large - 1 ? lastTilePos : (index - 1)*config.width.textureB + config.width.textureA,
        0,
        t).setOrigin(0, 0.5)
      
      if (config.flipY) s.setFlipY(true)
      this.add(s)

    }



    this.setSize(sizeWidth - 90, height - 40)
    scene.add.existing(this);
    this.group.add(this)
    if (this.body) {
      const body = (this.body as Phaser.Physics.Arcade.Body)
      body.setImmovable(true)
      //body.setOffset(sizeWidth/2 - 30, 10)
      body.setOffset(sizeWidth/2-35 , 10)
      body.setSize(sizeWidth, height - 40)     
    }
    if (config.scale) {
      this.setScale(config.scale.width, config.scale.height)
    }

    // Overlap tiles by 1px to avoid micro gaps
    if (config.withTextureToAbove && config.textureFill && config.textureFill?.length && config.large) {
      const tileWidth = config.width.textureA;
      const tileHeight = tileWidth; // Ajusta si no es cuadrado
      const areaWidth = tileWidth * config.large;
      const startX = config.pos.x;
      const startY = config.pos.y - 6;
      let areaHeight = 2000
      if (this.scene.map?.cameraBounds) {
        areaHeight = this.scene.map.cameraBounds.y + this.scene.map.cameraBounds.height - startY;
      }
      // const areaHeight = (this.scene.map?.cameraBounds.y + this.scene.map?.cameraBounds.height) - startY;
      console.log(areaHeight, 'start', this.scene.map?.cameraBounds);

      const fillSprite = scene.add.renderTexture(startX, startY, areaWidth, areaHeight).setOrigin(0, 0);
    
      const tilesX = Math.ceil(areaWidth / tileWidth);
      const tilesY = Math.ceil(areaHeight / tileHeight);
    
      Array.from({ length: tilesY }).forEach((_, y) => {
        Array.from({ length: tilesX }).forEach((_, x) => {
          const randomTexture = config.textureFill![Math.floor(Math.random() * config.textureFill!.length)];
          fillSprite.draw(randomTexture, x * tileWidth, y * tileHeight);
        });
      });
    
      console.log(this.originX, this.originY, 'origin');
    
      if (config.scale) {
        fillSprite.setScale(config.scale.width, config.scale.height);
      }
    
      this.add(fillSprite);
      this.setDepth(1);
      fillSprite.setDepth(config.fillBehind ? 0 : 2); // Ensure it is behind the asset
      scene.add.existing(fillSprite);
      console.log(this.depth, fillSprite.depth, 'depth');
    
      if (this.scene.UICamera) this.scene.UICamera.ignore(fillSprite);
    
      // Opcional: Fondo negro dibujado con Graphics
      // const graphics = scene.add.graphics();
      // graphics.fillStyle(0x152226, 1);
      // if (config.scale) {
      //   graphics.fillRect(
      //     config.pos.x + tileWidth,
      //     config.pos.y,
      //     (sizeWidth * config.scale.width) - config.width.textureC - tileWidth,
      //     1000
      //   );
      // } else {
      //   graphics.fillRect(
      //     config.pos.x + tileWidth,
      //     config.pos.y,
      //     sizeWidth - config.width.textureC - tileWidth,
      //     1000
      //   );
      // }
      // if (this.scene.UICamera) this.scene.UICamera.ignore(graphics);
    }
    

      if(this.scene.UICamera) this.scene.UICamera.ignore(this)
      
    


  }
}
export default LargeFloorIsland;