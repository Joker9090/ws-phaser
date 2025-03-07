import Phaser, { Physics } from "phaser";
import AsteroidGenerator, {
  AsteroidGeneratorConfig,
} from "../../assets/AsteroidGenerator";
import Floor, { FloorConfig } from "../../assets/Floor";

import LargeFloor, { LargeFloorConfig } from "../../assets/LargeFloor";
import Game from "../../Game";

import Player from "../../assets/Player";
import portal, { portalConfig } from "../../assets/portal";
import { Children } from "react";
import { GamePlayDataType, loseConfigFromMapType } from "@/game/Types";
import LargeFloorIsland, { LargeFloorIslandConfig } from "@/game/assets/LargeFloorIsland";
import TextBox from "@/game/assets/TextBox";
import MagicZone, { ZoneConfig } from "@/game/assets/MagicZone";

class Sandbox {
  isJumping = false;
  // debugGraphics: Phaser.GameObjects.Graphics;
  scene: Game;
  worldSize = {
    width: 10000,
    height: 1300,
  };
  cameraBounds = {
    x: 0,
    y: 0,
    width: 2700,
    height: 1300
  }
  // normales
  pisos?: Phaser.Physics.Arcade.Group;
  // de vuelta al inicio
  pisosBack?: Phaser.Physics.Arcade.Group;
  // float
  pisos2?: Phaser.Physics.Arcade.Group;
  // rotyate cam
  pisos3?: Phaser.Physics.Arcade.Group;
  //  no float
  pisos4?: Phaser.Physics.Arcade.Group;
  coin?: Phaser.Physics.Arcade.Group;
  portal?: Phaser.Physics.Arcade.Group;
  aura?: Phaser.Physics.Arcade.Group;
  movingFloor?: Phaser.Physics.Arcade.Group;
  movingFloorRot?: Phaser.Physics.Arcade.Group;
  p13!: Phaser.GameObjects.Sprite;
  amountLifes: number = 0;
  sideGrav: boolean = false;
  goingBack: boolean = false;
  pisoGoBack?: Phaser.GameObjects.Sprite;
  firegroup?: Phaser.Physics.Arcade.Group;
  player?: Player;
  startingPoint = {
    x: 500, //500
    y: 800, //800
  };

  loseConfig: loseConfigFromMapType = [
    {
      positions: { x: 500, y: 800 },
      cameraDirection: "NORMAL",
      PlayerDirection: "NORMAL",
      gravityDown: true
    },
  ];
  nextScene: string | undefined = 'postal1_planeta1';
  postalCode: string | undefined = 'adjns'


  background: Phaser.GameObjects.Image;
  background2: Phaser.GameObjects.Image;
  background3: Phaser.GameObjects.Image;
  background4: Phaser.GameObjects.Image;
  background5: Phaser.GameObjects.Image;
  background6: Phaser.GameObjects.Image;
  mountain1: Phaser.GameObjects.Image;
  mountain2: Phaser.GameObjects.Image;
  mountain3: Phaser.GameObjects.Image;
  mountain4: Phaser.GameObjects.Image;
  mountain5: Phaser.GameObjects.Image;
  UIItemToGrab: string = 'cristal3';
  UIItemScale?: number ;
  cristal?: Floor;
  collected: Boolean = false;
  endPortal?: Floor;

  mapContainer: Phaser.GameObjects.Container;
  frontContainer: Phaser.GameObjects.Container;

  constructor(scene: Game, player: Player, data?: GamePlayDataType) {
    this.scene = scene;
    this.player = player;
     
    // this.player.setPlayerWithTank(true)
   

    // add delayed call
    // this.scene.time.delayedCall(4000, () => {
    //   this.player!.setGravityOnPlayer(500)
    //   this.player!.setTintMask(0x00ff00)
    //   this.scene.time.delayedCall(4000, () => {
    //     this.player!.setTintMask(0xff0000)

    //     this.player!.setGravityOnPlayer(1000)
    //     this.player!.setGravityOnPlayerX(2000)

    //   });
    // });

    /* World size*/
    this.scene.physics.world.setBounds(
      0,
      0,
      this.worldSize.width,
      this.worldSize.height
    );

    this.mapContainer = this.scene.add.container()
    this.frontContainer = this.scene.add.container().setDepth(999999999999)

    this.background = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "background0P1")
      .setOrigin(0.5, 0.5)
    this.background2 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "background1P1")
      .setOrigin(0.5, 0.5)
    this.background3 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "backgroundStars")
      .setOrigin(0.5, 0.5)
    this.background4 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y + 470, "frontGround1")
      .setOrigin(1, 1).setScale(1);
    this.background5 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y + 470, "frontGround2")
      .setOrigin(0, 1).setScale(1);
    this.background6 = this.scene.add
      .image(this.startingPoint.x + this.background5.width - 15, this.startingPoint.y + 470, "frontGround1")
      .setOrigin(0, 1).setScale(1);

    this.mountain1 = this.scene.add.image(this.startingPoint.x + this.background5.width - 15, this.startingPoint.y - 370, "montaña3")
    this.mountain2 = this.scene.add.image(this.startingPoint.x - 70, this.startingPoint.y + 350, "montaña5")
    this.mountain3 = this.scene.add.image(1200, this.startingPoint.y + 470, "montaña3")
    this.mountain4 = this.scene.add.image(200, this.startingPoint.y, "montaña2")
    this.mountain5 = this.scene.add.image(1100, this.startingPoint.y, "montaña4")

    this.mapContainer.add([
      this.background,
      this.background2,
      this.background3,
      this.mountain4,
      this.mountain5,
      this.background4,
      this.background5,
      this.background6,

    ])

    this.frontContainer.add([
      this.mountain1,
      this.mountain2,
      this.mountain3,
    ])
  }

  animateBackground(player: Phaser.GameObjects.Sprite | Phaser.Math.Vector2 ) {
    const { x, y } = this.startingPoint;
    const { x: x2, y: y2 } = player;

    // animation backgrounds statics
    const { ajusteBX, ajusteBY } = { ajusteBX: 1.1, ajusteBY: 1.1 }
    const calcDiffBX = (x2 - x) / ajusteBX
    const calcDiffBY = (y2 - y) / ajusteBY;
    this.background.setPosition(x + calcDiffBX, y + calcDiffBY);
    this.background2.setPosition(x + calcDiffBX, y + calcDiffBY);
    this.background3.setPosition(x + calcDiffBX, y + calcDiffBY);
    // // animation frontgrounds
    const { ajusteFX, ajusteFY } = { ajusteFX: 4, ajusteFY: 2 }
    const calcDiffFX = (x2 - x) / ajusteFX
    const calcDiffFY = (y2 - y) / ajusteFY;
    this.background4.setPosition(x + calcDiffFX, y + 570 + calcDiffFY);
    this.background5.setPosition(x + calcDiffFX, y + 570 + calcDiffFY);
    this.background6.setPosition(x + this.background5.width - 15 + calcDiffFX, y + 570 + calcDiffFY);
    this.mountain4.setPosition(-200 + calcDiffFX, this.startingPoint.y + calcDiffFY)
    this.mountain5.setPosition(1100 + calcDiffFX, this.startingPoint.y + calcDiffFY)
    // // animation front mountains
    const { ajusteFMX, ajusteFMY } = { ajusteFMX: 20, ajusteFMY: 30 }
    const calcDiffFMX = -(x2 - x) / ajusteFMX
    const calcDiffFMY = -(y2 - y) / ajusteFMY;
    this.mountain1.setPosition(this.startingPoint.x + this.background5.width - 85 + calcDiffFMX, this.startingPoint.y + 320 + calcDiffFMY)
    this.mountain2.setPosition(this.startingPoint.x - 270 + calcDiffFMX, this.startingPoint.y + 350 + calcDiffFMY)
    this.mountain3.setPosition(1100 + calcDiffFMX, this.startingPoint.y + 470 + calcDiffFMY)
  }

  addColliders() {
    if (this.scene.player) {
      if (this.pisos)
        this.scene.physics.add.collider(
          this.scene.player,
          this.pisos,
          this.scene.touch,
          () => true,
          this.scene
        );
      if (this.coin)
        this.scene.physics.add.overlap(
          this.scene.player,
          this.coin,
          () => {
            
          },
          () => true,
          this.scene
        );
      if (this.portal)
        this.scene.physics.add.overlap(
          this.scene.player,
          this.portal,
          () => this.scene.win(),
          () => true,
          this.scene
        );
      if(this.firegroup){
        this.scene.physics.add.overlap(
          this.scene.player,
          this.firegroup,
          () => {
            if(!this.player?.invincible ){
              this.scene.touchItem("fireball")
              this.scene.player?.setVelocity(0)
            }
          }, 
          () => true,
          this.scene
        )
      }  
    }
  }

  createMap(data: { level: number; lifes: number }) {
    this.movingFloor = this.scene.physics.add.group({ allowGravity: false });
    this.movingFloorRot = this.scene.physics.add.group({ allowGravity: false });
    this.pisos = this.scene.physics.add.group({ allowGravity: false });
    this.pisosBack = this.scene.physics.add.group({ allowGravity: false });
    this.pisos2 = this.scene.physics.add.group({ allowGravity: false });
    this.pisos3 = this.scene.physics.add.group({ allowGravity: false });
    this.pisos4 = this.scene.physics.add.group({ allowGravity: false });
    this.firegroup = this.scene.physics.add.group({ allowGravity: false });
    this.amountLifes = data.lifes;
    this.coin = this.scene.physics.add.group({ allowGravity: false });
    this.aura = this.scene.physics.add.group({ allowGravity: false, immovable: true })
    this.portal = this.scene.physics.add.group({ allowGravity: false });
    const aura = this.scene.add.sprite(1500, 600, "auraTuto").setScale(0.6)
    this.aura.add(aura)



    this.scene.tweens.add({
      targets: aura,
      alpha: 0.4,
      duration: 1000,
      yoyo: true,
      repeat: -1
    })


    const pAConfig: LargeFloorIslandConfig = {
      withTextureToAbove: true,
      textureA: "plataformaNuevaLargaA",
      textureB: "plataformaNuevaLargaB",
      textureC: "plataformaNuevaLargaC",
      pos: { x: 900, y: 800 },
      width: {
        textureA: 90,
        textureB: 67,
        textureC: 115,
      },
      scale: { width: 0.7, height: 0.7 },
      height: 127,
      large: 30,
      rotated: false
    };
    const pA = new LargeFloorIsland(this.scene, pAConfig, this.pisos);


    const p1Config: LargeFloorIslandConfig = {
      withTextureToAbove: true,

      textureA: "plataformaNuevaLargaA",
      textureB: "plataformaNuevaLargaB",
      textureC: "plataformaNuevaLargaC",
      pos: { x: 300, y: 1200 },
      width: {
        textureA: 90,
        textureB: 67,
        textureC: 115,
      },
      scale: { width: 0.7, height: 0.7 },
      height: 127,
      large: 50,
      rotated: false
    };
    const p1 = new LargeFloorIsland(this.scene, p1Config, this.pisos);

    
    const p2Config: FloorConfig = {
      texture: "plataformaNuevaA",
      pos: { x: 900, y: 1020 },
      fix: 25,
      scale: { width: 0.7, height: 0.7 },
      width: 140,
      height: 50,
      animation: {
        xAxis: {
          xDistance: 200,
          xVel: 100
        },
        yAxis: {
          yDistance: 200,
          yVel: -100
        }
      }
    };
    const p2 = new Floor(this.scene, p2Config, this.pisos).setFlipX(true);


    // const mapObjects =
    // this.movingFloor.getChildren().concat(
    //     this.movingFloorRot.getChildren(),
    //     this.pisos.getChildren(),
    //     this.pisosBack.getChildren(),
    //     this.pisos2.getChildren(),
    //     this.pisos3.getChildren(),
    //     this.pisos4.getChildren(),
    //     this.coin.getChildren(),
    //     this.aura.getChildren(),
    //     this.portal.getChildren(),
    //     this.aura.getChildren(),
    //   )
    // this.mapContainer.add(mapObjects)
    // this.mapContainer.setDepth(10)

    this.scene.UICamera?.ignore(this.mapContainer)
    this.scene.UICamera?.ignore(this.frontContainer)

    const zoneAConfig: ZoneConfig = {
      x: 800,
      y: 0,
      width: 200,
      height: 10000,
      color: 0xffffff,
      alpha: 0.2,
      detectOnTouch: (player: Player, zone: MagicZone) => {
        // player.setPlayerFlying(true)

        // se setea un state invincible true con esta funcion que a su vez setea el color del efecto 
        // luego en el collider se checkea que valor tiene esa property
        player.setPlayerInvicinible(true)
      },
      detectOnExit: (player: Player, zone: MagicZone) => {
        // player.setPlayerFlying(false)
        //le puse un delay para que tengas un tiempo fuera del glow donde aun tenes el efecto, esto se setea por zona y no es necesario 
        this.scene.time.delayedCall(2000, () => {
          player.setPlayerInvicinible(false)
        })
      },
      effect: (zone: MagicZone) => {
        // add fx to the zone
        zone.graphics.postFX.addBlur(1,0,0,8,0xffffff,1);
       // move the zone
        this.scene.tweens.add({
          targets: zone.graphics,
          x: "-=100",
          duration: 10000,
          yoyo: true,
          repeat: -1
        })
      
      }
    }
    const zoneA = new MagicZone(this.scene,zoneAConfig)

    const fireballConfig: FloorConfig = {
      spriteSheet: "meteoritop3",
      texture: "meteorito",
      pos: { x: 1000, y: 0 }, // 500 1580
      width: 100,
      height: 100,
      tween: {
        duration: 4000,
        repeat: -1,
        delay: Math.random() * 1000,
        y: "+=2500",
      },
      frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
    const fireball = new Floor(this.scene, fireballConfig, this.firegroup).setScale(0.5)
  }



  update() {
    /* Attach background anim */
    // if (this.scene.player) this.animateBackground(this.scene.player);
    if (this.scene.player) this.animateBackground(this.scene.cameras.main.midPoint);

  }
}
export default Sandbox;
