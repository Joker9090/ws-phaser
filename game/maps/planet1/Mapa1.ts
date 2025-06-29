import Phaser, { Physics, Time } from "phaser";
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
import colors from "@/game/assets/PlatformColors";
import MasterManager from "@/game/MasterManager";

class Mapa1 {
  scene: Game;
  worldSize = {
    width: 10000,
    height: 2500,
  };
  cameraBounds = {
    x: 0,
    y: 0,
    width: 3700,
    height: 1450
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
  invincibilityTimer?: Time.TimerEvent
  invincible?: Phaser.Physics.Arcade.Group;

  amountLifes: number = 0;
  sideGrav: boolean = false;
  goingBack: boolean = false;
  pisoGoBack?: Phaser.GameObjects.Sprite;
  player?: Player;
  startingPoint = {
    x: 500, //500
    y: 800, //800
  };
  checkPointPos1 = {
    x: 1800,
    y: 1000,
  };

  loseConfig: loseConfigFromMapType = [
    {
      positions: this.startingPoint,
      cameraDirection: "NORMAL",
      PlayerDirection: "NORMAL",
      gravityDown: true
    },
    {
      positions: this.checkPointPos1,
      cameraDirection: "NORMAL",
      PlayerDirection: "ROTATED",
      gravityDown: false
    },
  ];
  nextScene: string | undefined = undefined;
  postalCode: string | undefined = undefined;
  masterManager?: MasterManager;
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
  UIItemToGrab: string = 'cristal2';
  UIItemScale?: number ;

  cristal?: Floor;
  collected: Boolean = false;
  endPortal?: Floor;

  isFloating: boolean = false;

  mapContainer: Phaser.GameObjects.Container;
  frontContainer: Phaser.GameObjects.Container;

  textTutorial1?: TextBox;
  textTutorial2?: TextBox;
  tutorialStep: number = 0;
  constructor(scene: Game, player: Player, data?: GamePlayDataType) {
    this.scene = scene;
    this.player = player;
  
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

  animateBackground(player: Phaser.GameObjects.Sprite | Phaser.Math.Vector2) {
    const offsetLevel = 300
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
    this.background4.setPosition(x + calcDiffFX, y + offsetLevel + 470 + calcDiffFY);
    this.background5.setPosition(x + calcDiffFX, y + offsetLevel + 470 + calcDiffFY);
    this.background6.setPosition(x + this.background5.width - 15 + calcDiffFX, y + offsetLevel + 470 + calcDiffFY);
    this.mountain4.setPosition(-200 + calcDiffFX, y + offsetLevel + calcDiffFY)
    this.mountain5.setPosition(1100 + calcDiffFX, y + offsetLevel + calcDiffFY)
    // // animation front mountains
    const { ajusteFMX, ajusteFMY } = { ajusteFMX: 20, ajusteFMY: 30 }
    const calcDiffFMX = -(x2 - x) / ajusteFMX
    const calcDiffFMY = -(y2 - y) / ajusteFMY;
    this.mountain1.setPosition(this.startingPoint.x + this.background5.width - 85 + calcDiffFMX, y + offsetLevel + 320 + calcDiffFMY)
    this.mountain2.setPosition(this.startingPoint.x - 270 + calcDiffFMX, y + offsetLevel + 350 + calcDiffFMY)
    this.mountain3.setPosition(1100 + calcDiffFMX, y + offsetLevel + 470 + calcDiffFMY)
  }

  addColliders() {
    if (this.scene.player) {
      if (this.pisos)
        this.scene.physics.add.collider(
          this.scene.player,
          this.pisos,
          () => { 
            if (this.tutorialStep === 2) {
              setTimeout(() => {
                this.textTutorial2?.setVisible(true);
                this.scene.stopMov = true;
                this.tutorialStep = 3;
              }, 300);
            }
          },
          () => true,
          this.scene
        );
      if (this.pisos2)
        this.scene.physics.add.collider(
          this.scene.player,
          this.pisos2,
          () => {
            if (this.tutorialStep === 0) {
              setTimeout(() => {
                this.tutorialStep = 1
                this.textTutorial1?.setVisible(true)
                this.scene.stopMov=true
              }, 300)
            }
            if(this.scene.player?.body?.touching.up || this.scene.player?.body?.touching.down){   
              this.scene.changeGravity(true, 1000)
              this.isFloating = true
              this.scene.checkPoint = 1
            }
            
          },
          () => true,
          this.scene
        );
      if (this.coin)
        this.scene.physics.add.overlap(
          this.scene.player,
          this.coin,
          () => {
            this.scene.touchItem("coin")
          },
          () => true,
          this.scene
        );
      if (this.portal)
        this.scene.physics.add.overlap(
          this.scene.player,
          this.portal,
          () => {
            const obj: GamePlayDataType =  {
              level: 0,
              lifes: this.scene.lifes ? this.scene.lifes : 3,
              loadKey: ["Postales", "Cinemato1", "Cinemato2"],
              startingPositionFromOtherScene: {
                x: this.player!.x,
                y: this.player!.y,
              },
            }
            this.scene.changeScene(obj)
            // this.scene.win()
          },
          () => true,
          this.scene
        );

      if (this.movingFloor)
        this.scene.physics.add.collider(
          this.scene.player,
          this.movingFloor,
          () => { },
          () => true,
          this.scene
        );
    }
  }

  createMap(data: { level: number; lifes: number }) {
    // this.scene.lateralCameraOffset("right", false, this.cameraBounds.width, 0.7, 1500);

    this.movingFloor = this.scene.physics.add.group({ allowGravity: false });
    this.movingFloorRot = this.scene.physics.add.group({ allowGravity: false });
    this.pisos = this.scene.physics.add.group({ allowGravity: false });
    this.pisosBack = this.scene.physics.add.group({ allowGravity: false });
    this.pisos2 = this.scene.physics.add.group({ allowGravity: false });
    this.pisos3 = this.scene.physics.add.group({ allowGravity: false });
    this.pisos4 = this.scene.physics.add.group({ allowGravity: false });
    this.amountLifes = data.lifes;
    this.coin = this.scene.physics.add.group({ allowGravity: false });
    this.aura = this.scene.physics.add.group({ allowGravity: false, immovable: true })
    this.portal = this.scene.physics.add.group({ allowGravity: false });
    const aura = this.scene.add.sprite(2300, 350, "auraTuto").setScale(0.6)
    this.aura.add(aura)


    this.textTutorial1 = new TextBox(
      this.scene,
      "What's happening??!!",
      2000,
      1200,
      300
    ).setVisible(false)

    this.textTutorial2 = new TextBox(
      this.scene,
      "It seems like gravity reverses when I step on that kind of rock, I better record this.",
      2000,
      400,
      400
    ).setVisible(false)


    this.frontContainer.add([
      this.textTutorial1,
      this.textTutorial2
    ])

    this.scene.tweens.add({
      targets: aura,
      alpha: 0.4,
      duration: 1000,
      yoyo: true,
      repeat: -1
    })

    const p1Config: FloorConfig = {
      pos: { x: 500, y: 1400 },
      texture: "plataformaNuevaA",
      scale: { width: 0.7, height: 0.7 },
      width: 140,
      height: 50,
    };
    const p1 = new Floor(this.scene, p1Config, this.pisos).setFlipX(true);

    // const p2Config: FloorConfig = {
    //   texture: "plataformaNuevaA",
    //   pos: { x: 800, y: 1400 },
    //   scale: { width: 1, height: 0.7 },
    //   width: 170,
    //   height: 50,
    //   tween: {
    //     duration: 4500,
    //     paused: false,
    //     yoyo: true,
    //     repeat: -1,
    //     y: "-=400",
    //   },
    // };
    // const p2 = new Floor(this.scene, p2Config, this.movingFloor);

    const p2Config: FloorConfig = {
      pos: { x: 800, y: 1200 },
      texture: "plataformaNuevaA",
      scale: { width: 0.7, height: 0.7 },
      width: 140,
      height: 50,
      animation:{
        yAxis:{
          yDistance:300,
          yVel:100
        }
      }
    };
    const p2 = new Floor(this.scene, p2Config, this.movingFloor);

   

    const p5Config: FloorConfig = {
      pos: { x: 1100, y: 1100 }, // 1100 800
      texture: "plataformaNuevaA",
      scale: { width: 0.7, height: 0.7 },
      width: 140,
      height: 50,
    };
    const p5 = new Floor(this.scene, p5Config, this.pisos).setFlipX(true);

    const p7Config: FloorConfig = {
      pos: { x: 1600, y: 1300 },
      texture: "plataformaNuevaA",
      scale: { width: 0.7, height: 0.7 },
      width: 140,
      height: 50,
    };
    const p7 = new Floor(this.scene, p7Config, this.pisos);

    const p8Config: LargeFloorIslandConfig = {
      textureA: "plataformaNuevaLargaA",
      textureB: "plataformaNuevaLargaB",
      textureC: "plataformaNuevaLargaC",
      pos: { x: 1300, y: 1200 },
      width: {
        textureA: 90,
        textureB: 67,
        textureC: 115,
      },
      scale: { width: 0.7, height: 0.7 },
      height: 127,
      large: 4,
      rotated: false
    };
    const p8 = new LargeFloorIsland(this.scene, p8Config, this.pisos);

    const p9Config: FloorConfig = {
      pos: { x: 1800, y: 1400 },
      texture: "plataformaNuevaA",
      scale: { width: 0.7, height: 0.7 },
      width: 140,
      height: 50,

    };
    const p9 = new Floor(this.scene, p9Config, this.pisos2).setTint(
     colors.gravity
    ).setFlipX(true);


    const p10Config: LargeFloorIslandConfig = {
      textureA: "plataformaNuevaLargaA",
      textureB: "plataformaNuevaLargaB",
      textureC: "plataformaNuevaLargaC",
      pos: { x: 1600, y: 100 },
      width: {
        textureA: 90,
        textureB: 67,
        textureC: 115,
      },
      scale: { width: 0.7, height: 0.7 },
      height: 90,
      large: 40,
      rotated: true
    };
    const p10 = new LargeFloorIsland(this.scene, p10Config, this.pisos)

    const portalConfig: FloorConfig = {
      texture: "plataformaFinalP1",
      pos: { x: 3200, y: 210 },
      width: 100,
      height: 100,
    };
    const port = new Floor(this.scene, portalConfig, this.portal).setDepth(99).setFlipY(true);
    this.endPortal = port

    const coinConfig: FloorConfig = {
      texture: "cristal2",
      pos: { x: 2300, y: 350 },
      scale: { width: 0.7, height: 0.7 },
      width: 40,
      height: 18,
      fix: 10,
    };
    this.cristal = new Floor(this.scene, coinConfig, this.coin).setBodySize(140, 180);
    const cloudsGroup = this.scene.add.group()

    const c1Config: AsteroidGeneratorConfig = {
      texture: "nube1",
      x: 0,
      y: 500,
      delayed: 100,
      direction: 0,
      velocity: 20,
      scale: 1,
      group: cloudsGroup,
      depth: 99,
    };
    const c1 = new AsteroidGenerator(this.scene, c1Config);
    c1.start();

    const c2Config: AsteroidGeneratorConfig = {
      texture: "nube3",
      x: 3000,
      y: 600,
      delayed: 100,
      direction: 1,
      velocity: 30,
      scale: 1,
      group: cloudsGroup,
      depth: 99,
    };
    const c2 = new AsteroidGenerator(this.scene, c2Config);
    c2.start();

    const c3Config: AsteroidGeneratorConfig = {
      texture: "nube5",
      x: -1000,
      y: 300,
      delayed: 1600,
      direction: 0,
      velocity: 10,
      scale: 1.2,
      group: cloudsGroup,
      depth: 99,
    };
    const c3 = new AsteroidGenerator(this.scene, c3Config);
    c3.start();

    const mapObjects =
      cloudsGroup.getChildren().concat(
        this.movingFloor.getChildren(),
        this.movingFloorRot.getChildren(),
        this.pisos.getChildren(),
        this.pisosBack.getChildren(),
        this.pisos2.getChildren(),
        this.pisos3.getChildren(),
        this.pisos4.getChildren(),
        this.coin.getChildren(),
        this.aura.getChildren(),
        this.portal.getChildren(),
        this.aura.getChildren(),
      )
    this.mapContainer.add(mapObjects)
    this.mapContainer.setDepth(999)

    this.scene.UICamera?.ignore(this.frontContainer)
    this.scene.UICamera?.ignore(this.mapContainer)

  }
  update() {
    if (this.scene.cursors?.space.isDown && this.scene.stopMov) {
      this.scene.stopMov = false;
      if (this.tutorialStep === 1 || this.tutorialStep === 3)
        this.tutorialStep++;
      this.textTutorial1?.setVisible(false);
      if (this.textTutorial2?.visible) this.textTutorial2?.setVisible(false);
    }

    if (this.scene.player?.body?.touching.down && this.tutorialStep === 1) {
      this.tutorialStep = 1;
      this.textTutorial1?.setVisible(true);
      // this.scene.scene.pause()
      this.scene.stopMov = true;
    }
    /* Attach controls to player */
    if (this.scene.player) this.animateBackground(this.scene.cameras.main.midPoint);
  }
}
export default Mapa1;
