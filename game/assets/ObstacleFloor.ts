import Phaser from "phaser";
import Game from "../Game";

export type ObstacleFloorConfig = {
  texture: string | Phaser.Textures.Texture;
  width?: number;
  height?: number;
  fix?: number;
  pos: {
    x: number;
    y: number;
  };
  scale?: {
    width: number;
    height: number;
  };
  friction?: number;
  rotated?: boolean;
  inverted?: boolean;
  spriteSheet?: string;
  frames?: number[]
};

// Scene in class
class ObstacleFloor extends Phaser.GameObjects.Container {
  isJumping = false;
  scene: Game;
  hasEvent?: string;
  group: Phaser.Physics.Arcade.Group;
  rotate: boolean = false;
  config: ObstacleFloorConfig;
  constructor(
    scene: Game,
    config: any,
    group: Phaser.Physics.Arcade.Group,
    frame?: string | number | undefined

  ) {
    super(scene, config.pos.x, config.pos.y, config.texture);
    this.scene = scene;
    this.group = group;
    this.rotate = config.rotate;
    this.config = config;
    const width = config.width ?? 120;
    const height = config.height ? config.height * config.large : 20;
    const fix = 0;
    const rota = config.rotated ?? false;
    const invrt = config.inverted ?? false
    const friction = config.friction ?? 1;
    if (config.scale) {
      this.setScale(config.scale.width, config.scale.height);
    }
    /* Floor add to physic world */
    scene.physics.add.existing(this);
    /* Floor add to scene */
    scene.add.existing(this);

    this.setDepth(10);
    this.group?.add(this);

    if (this.body) {
      const body = this.body as Phaser.Physics.Arcade.Body;
      body.setImmovable(true);
      // hitboxes largefloors
      if (rota) {
        // body.setOffset(-50, -200);
      } else {
        // body.setOffset(-200, -50);
      }

      if (rota && body) {
        body.setSize(height + fix, width);
        // this.setRotation(Math.PI / 2);
      } else {
        console.log("body", body, width, height);
        body.setSize(width + fix, height + fix);
      }

      if (invrt && body) {
        // body.setSize(height, width);
        this.setRotation(Math.PI);
      } else {
        body.setSize(width + fix, height + fix);
      }
    }

    for (let index = 0; index < config.large; index++) {
        let t: string;
      
        if (index === 0) {
          t = config.textureA; // Top tile
        } else if (index === config.large - 1) {
          t = config.textureC; // Bottom tile
        } else {
          // Random middle tile
          const rand = Phaser.Math.Between(0, config.textureB.length - 1);
          t = config.textureB[rand];
        }
      
        // Calculate Y position
        const y =
          index === 0
            ? 0
            : index === config.large - 1
            ? (config.large - 2) * config.height + config.height
            : (index - 1) * config.height + config.height
      
        const s = scene.add.sprite(0, y, t).setOrigin(0); // origin at top center
      
        if (config.rotated) s.setFlipY(true);
        this.add(s);
      }
      

    if (config.scale) {
      this.setScale(config.scale.width, config.scale.height)
    }
  }

  DoDamage(){
    if(this.scene.player?.isDead===false){
      //console.log("[Danger] DoDamage animation started");
      this.scene.player!.isDead = true;
      this.scene.time.delayedCall(0, () => {
        this.scene.player!.isDead = false;
        this.scene.touchItem("fireball");
      });
    }
  }

  isTouchingplayer() {
    const player = this.scene.player;
  
    // Verificar si player está en contacto con esta plataforma
    if (!player || !player.body) return false;
  
    const playerBottom = player.y + player.height / 2;
    const playerTop = player.y - player.height / 2;
    const platformTop = this.y - this.height / 2;
    const platformBottom = this.y + this.height / 2;
  
    return (
      (playerBottom >= platformTop && playerTop <= platformBottom) &&
      Math.abs(player.x - this.x) < this.width / 2 // player está alineado horizontalmente con la plataforma
    );
  }
  // update() {
  //   this.animation()
  // }

}
export default ObstacleFloor;
