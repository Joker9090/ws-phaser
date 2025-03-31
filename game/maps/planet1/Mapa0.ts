import Phaser, { Physics } from "phaser";
import AsteroidGenerator, {
  AsteroidGeneratorConfig,
} from "../../assets/AsteroidGenerator";
import Floor, { FloorConfig } from "../../assets/Floor";
//Collectable
import Collectable, { CollectableConfig } from "../../assets/Collectable";

import LargeFloor, { LargeFloorConfig } from "../../assets/LargeFloor";
import Game from "../../Game";

import Player from "../../assets/Player";
import portal, { portalConfig } from "../../assets/portal";
import { Children } from "react";
import { GamePlayDataType, loseConfigFromMapType } from "@/game/Types";
import LargeFloorIsland, {
  LargeFloorIslandConfig,
} from "@/game/assets/LargeFloorIsland";
import TextBox from "@/game/assets/TextBox";
import MasterManager from "@/game/MasterManager";
import { TURBO_TRACE_DEFAULT_MEMORY_LIMIT } from "next/dist/shared/lib/constants";
import { cp } from "fs";

class Mapa0 {
  isJumping = false;
  // debugGraphics: Phaser.GameObjects.Graphics;
  scene: Game;
  worldSize = {
    width: 6000,
    height: 2000,
  };
  cameraBounds = {
    x: 0,
    y: 0,
    width: 6000,
    height: 1850,
  };
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
//Fireball
  fireballGroup?: Phaser.Physics.Arcade.Group;


  coin?: Phaser.Physics.Arcade.Group;
  //TEST COLLECTABLES
  collectables?: Phaser.Physics.Arcade.Group;

  portal?: Phaser.Physics.Arcade.Group;
  aura?: Phaser.Physics.Arcade.Group;
  movingFloor?: Phaser.Physics.Arcade.Group;
  movingFloorRot?: Phaser.Physics.Arcade.Group;
  p13!: Phaser.GameObjects.Sprite;
  amountLifes: number = 0;
  sideGrav: boolean = false;
  goingBack: boolean = false;
  pisoGoBack?: Phaser.GameObjects.Sprite;
  player?: Player;
  startingPoint = {
    x: 500, //500
    y: 400, //800
  };

  loseConfig: loseConfigFromMapType = [
    {
      positions: { x: 500, y: 800 },
      cameraDirection: "NORMAL",
      PlayerDirection: "NORMAL",
      gravityDown: true,
    },
  ];
  nextScene: string | undefined = "postal1_planeta1";
  postalCode: string | undefined = "postl1";

  background: Phaser.GameObjects.Image;
  background2: Phaser.GameObjects.Image;
  background3: Phaser.GameObjects.Image;
  background4: Phaser.GameObjects.Image;
  background5: Phaser.GameObjects.Image;
  background6: Phaser.GameObjects.Image;
  background7: Phaser.GameObjects.Image;
  background8: Phaser.GameObjects.Image;
  background9: Phaser.GameObjects.Image;
  
  //background10: Phaser.GameObjects.Image;
  mountain1: Phaser.GameObjects.Image;
  mountain2: Phaser.GameObjects.Image;
  mountain3: Phaser.GameObjects.Image;
  mountain4: Phaser.GameObjects.Image;
  mountain5: Phaser.GameObjects.Image;
  

  backgroundsBack: Phaser.GameObjects.Image[];
  backgroundsMiddle: Phaser.GameObjects.Image[];
  backgroundsFront: Phaser.GameObjects.Image[];

  originalPositionsBackgroundsBack: {x: number, y:number}[]
  originalPositionsBackgroundsMiddle: {x: number, y:number}[]
  originalPositionsBackgroundsFront: {x: number, y:number}[]

  UIItemToGrab: string = "cristal3";
  UIItemScale?: number;
  cristal?: Floor;
  collected: Boolean = false;
  endPortal?: Floor;

  backContainer: Phaser.GameObjects.Container;
  middleContainer: Phaser.GameObjects.Container;
  frontContainer: Phaser.GameObjects.Container;
  mapContainer:Phaser.GameObjects.Container;
  masterManager: MasterManager;
  textTutorial1?: TextBox;
  textTutorial2?: TextBox;
  tutorialStep: number = 0;

  constructor(scene: Game, player: Player, data?: GamePlayDataType) {
    this.scene = scene;
    this.player = player;

    //Tank
    this.player.setPlayerWithTank(true);

    /* World size*/
    this.scene.physics.world.setBounds(
      0,
      0,
      this.worldSize.width,
      this.worldSize.height
    );
/*
this.frontContainer = this.scene.add.container().setDepth(999999999999);
const backBackgroundsContainer = this.scene.add.container() 
const frontBackgroundsContainer = this.scene.add.container() 
*/

this.backContainer = this.scene.add.container();
this.middleContainer = this.scene.add.container();
this.mapContainer = this.middleContainer;
this.frontContainer = this.scene.add.container().setDepth(999999999999);

  // Set the origin point of the containers to { x: 0, y: worldSize.height }
  const originPoint ={x: 0, y:0};//{ x: 0, y: this.worldSize.height };
  this.backContainer.setPosition(originPoint.x, originPoint.y);
  this.middleContainer.setPosition(originPoint.x, originPoint.y);
  this.frontContainer.setPosition(originPoint.x, originPoint.y);

    let masterManagerScene = scene.game.scene.getScene("MasterManager") as MasterManager;
    if (!masterManagerScene) {
      this.masterManager = new MasterManager();
      this.scene.scene.add("MasterManager", this.masterManager, true);
    } else {
      this.masterManager = masterManagerScene;
    }
    
    this.background = this.scene.add.image(0,this.worldSize.height, "background0P1").setOrigin(0,1).setScale(1.3);
    this.background2 = this.scene.add.image(0,this.worldSize.height , "background1P1").setOrigin(0,1).setScale(1.3);
    this.background3 = this.scene.add.image(0,this.worldSize.height , "backgroundStars").setOrigin(0,1);
    this.background4 = this.scene.add.image(this.background.width, this.worldSize.height, "background0P1").setOrigin(0,1).setScale(1.3);
    this.background5 =  this.scene.add.image(this.background.width,this.worldSize.height +275, "background1P1").setOrigin(0,1).setScale(1.3);
    this.background6 =  this.scene.add.image(this.background3.width, this.worldSize.height, "backgroundStars").setOrigin(0,1);
    
    this.background7 = this.scene.add.image(-20, this.worldSize.height, "frontGround1").setOrigin(0,1).setScale(1.3);
    this.background8 = this.scene.add.image(this.background7.width*1.3-20, this.worldSize.height, "frontGround2").setOrigin(0,1).setScale(1.3);
    this.background9 = this.scene.add.image(this.background8.x + this.background8.width*1.3-22, this.worldSize.height, "frontGround1").setOrigin(0,1).setScale(1.3);
    
    //this.background10 = this.scene.add.image(this.background9.x + this.background9.width-20, 1274, "frontGround2").setScale(1.3);
    this.mountain1 = this.scene.add.image( 600, this.worldSize.height, "montaña1").setOrigin(0,1);
    this.mountain2 = this.scene.add.image( 1600, this.worldSize.height, "montaña2").setOrigin(0,1);
    this.mountain3 = this.scene.add.image( 2400, this.worldSize.height, "montaña3").setOrigin(0,1);
    this.mountain4 = this.scene.add.image( 3100,this.worldSize.height, "montaña4").setOrigin(0,1);
    this.mountain5 = this.scene.add.image( 3800, this.worldSize.height, "montaña5").setOrigin(0,1);
    
    this.backgroundsBack = [
      this.background,
      this.background2,
      this.background3,
      this.background4,
      this.background5,
      this.background6
    ];
    this.backgroundsMiddle = [
      /*this.mountain4,
      this.mountain5,*/
      this.background7,
      this.background8,
      this.background9,
      //this.background10
    ];
    this.backgroundsFront = [
      this.mountain1,
      this.mountain2,
      this.mountain3,
      this.mountain4,
      this.mountain5,
      ];
    this.originalPositionsBackgroundsBack = this.backgroundsBack.map(
            (img: Phaser.GameObjects.Image) => {
              return { x: img.x, y: img.y };
            }
          );
    this.originalPositionsBackgroundsMiddle = this.backgroundsMiddle.map(
            (img: Phaser.GameObjects.Image) => {
              return { x: img.x, y: img.y };
            }
          );
    this.originalPositionsBackgroundsFront = this.backgroundsFront.map(
            (img: Phaser.GameObjects.Image) => {
              return { x: img.x, y: img.y };
            }
          );

    //frontBackgroundsContainer.add([this.mountain1, this.mountain2, this.mountain3]);
    //this.mapContainer.add(backBackgroundsContainer)
    //this.frontContainer.add(frontBackgroundsContainer)

    // Add containers to the map container
    this.backContainer.add(this.backgroundsBack);
    this.middleContainer.add(this.backgroundsMiddle);
    this.frontContainer.add(this.backgroundsFront);

  // Add mapContainer and frontContainer to the scene
  this.scene.add.existing(this.backContainer);
  this.scene.add.existing(this.middleContainer);
  this.scene.add.existing(this.frontContainer);
  }
  updateContainerPositionRelativeToCamera(
    container: Phaser.GameObjects.Container,
    camera: Phaser.Cameras.Scene2D.Camera,
    fixedPoint: { x: number; y: number },
    ponderation: { fixX: number; fixY: number }
  ) {
    const offsetX = (camera.scrollX - fixedPoint.x) / ponderation.fixX;
    const offsetY = (camera.scrollY - fixedPoint.y) / ponderation.fixY;
    // Update the container's position
    container?.setPosition(fixedPoint.x+offsetX, fixedPoint.y+offsetY,0,0);
  }

  updatePositionsRelativeToCamera = (
      originalPos: { x: number; y: number }[],
      images: Phaser.GameObjects.Image[],
      camera: Phaser.Cameras.Scene2D.Camera,
      fixedPoint: { x: number; y: number },
      ponderation: { fixX: number; fixY: number }
    ) => {
      const offsetX = (camera.midPoint.x - fixedPoint.x) / ponderation.fixX;
      const offsetY = (camera.midPoint.y - fixedPoint.y)/ ponderation.fixY;
      images.forEach((image, index) => {
        image.setPosition(
          (originalPos[index].x + offsetX),
          (originalPos[index].y + offsetY) 
        );
      });
    };
  animateBackground(player: Phaser.GameObjects.Sprite | Phaser.Math.Vector2) {
    this.updateContainerPositionRelativeToCamera(
      this.backContainer,
      this.scene.cameras.main,
      { x: -this.background.width*2, y: -this.background.height*2 },
      { fixX:1.1, fixY: 1.1 }
    );
this.updateContainerPositionRelativeToCamera(
    this.middleContainer,
    this.scene.cameras.main,
    { x: -this.background7.width*0.5, y: -this.background7.height*1.75 },
    { fixX:2, fixY:2 }
  );

  this.updateContainerPositionRelativeToCamera(
    this.frontContainer,
    this.scene.cameras.main,
    { x: 0, y: 0 },
    { fixX: -20, fixY: -30 }
  );


    /*
      this.updatePositionsRelativeToCamera(
      this.originalPositionsBackgroundsBack,
      this.backgroundsBack,
      this.scene.cameras.main,
      { x: 0, y: 0 },//{ x: this.startingPoint.x, y: this.startingPoint.y },
      { fixX: 1.1, fixY: 1.1 }
    );
    this.updatePositionsRelativeToCamera(
      this.originalPositionsBackgroundsMiddle,
      this.backgroundsMiddle,
      this.scene.cameras.main,
      { x: 0, y: 0 },//{ x: this.startingPoint.x, y: this.startingPoint.y },
      { fixX: 2, fixY: 4 }
    );
    this.updatePositionsRelativeToCamera(
      this.originalPositionsBackgroundsFront,
      this.backgroundsFront,
      this.scene.cameras.main,
      { x: 0, y: 0 },//{ x: this.startingPoint.x, y: this.startingPoint.y },
      { fixX: -20, fixY: -30 }
    );
    */
  }

  addColliders() {
    if (this.scene.player) {
      if (this.pisos)
        this.scene.physics.add.collider(
          this.scene.player,
          this.pisos,
          ()=>{
            this.scene.touch()
          },
          
          () => true,
          this.scene
        );
      if (this.coin)
        this.scene.physics.add.overlap(
          this.scene.player,
          this.coin,
          () => {
            if (this.tutorialStep === 2) {
              this.tutorialStep = 3;
              this.textTutorial2?.setVisible(true);
            }
            this.scene.touchItem("coin");
          },
          () => true,
          this.scene
        );
      if(this.collectables){
        this.scene.physics.add.overlap(
          this.scene.player,
          this.collectables,
          (player, collectable) => {
            this.scene.touchItem("collectable");
            collectable.destroy();
          },
          () => true,
          this.scene
        );
      };
      if (this.pisos2) {
        this.scene.physics.add.collider(
          this.scene.player,
          this.pisos2,
          () => {
            this.scene.touch();
            if (this.tutorialStep === 2) {
              this.scene.stopMov = true;
              this.tutorialStep = 3;
              this.textTutorial2?.setVisible(true);
            }
          },

          () => true,
          this.scene
        );
      }if (this.pisos4) {
        this.scene.physics.add.collider(
          this.scene.player,
          this.pisos4,
          () => {
          this.scene.touchItem("fireball");
          this.scene.player?.setVelocity(0);
        },
        () => true,
        this.scene
        );
      }
      if (this.fireballGroup)
      this.scene.physics.add.overlap(
        this.scene.player,
        this.fireballGroup,
        () => {
          this.scene.touchItem("fireball");
          this.scene.player?.setVelocity(0);
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
            this.scene.changeScene(obj) // data
            // this.scene.win()
          },
          () => true,
          this.scene
        );
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
    this.fireballGroup = this.scene.physics.add.group({ allowGravity: false });
    this.amountLifes = data.lifes;
    this.coin = this.scene.physics.add.group({ allowGravity: false });
    //TEST COLLECTABLES
    this.collectables= this.scene.physics.add.group({allowGravity:false});
    this.aura = this.scene.physics.add.group({
      allowGravity: false,
      immovable: true,
    });
    this.portal = this.scene.physics.add.group({ allowGravity: false });
    //const aura = this.scene.add.sprite(3700, 300, "auraTuto").setScale(0.6);
    //this.aura.add(aura);

    this.textTutorial1 = new TextBox(
      this.scene,
      "It doesn't seem like a dangerous planet. I hope to find a source of energy to continue my journey.",
      600,
      1300,
      300
    ).setVisible(false);

    this.textTutorial2 = new TextBox(
      this.scene,
      "A source of energy! Now I can continue my journey across the planet.",
      3800,
      500,
      400
    ).setVisible(false);

    this.frontContainer.add([this.textTutorial1, this.textTutorial2]);

    this.scene.UICamera?.ignore(this.textTutorial1);
    //aura Tween
    /*this.scene.tweens.add({
      targets: aura,
      alpha: 0.4,
      duration: 1000,
      yoyo: true,
      repeat: -1,
    });*/

    const p1Config: LargeFloorIslandConfig = {
      textureA: "plataformaNuevaLargaA",
      textureB: "plataformaNuevaLargaB",
      textureC: "plataformaNuevaLargaC",
      pos: { x: 200, y: 1800 },
      width: {
        textureA: 90,
        textureB: 67,
        textureC: 115,
      },
      scale: { width: 0.7, height: 0.7 },
      height: 127,
      large: 45,
      rotated: false,
    };
    const p1 = new LargeFloorIsland(this.scene, p1Config, this.pisos);
    //PlatformsRama
    const p2Config: LargeFloorIslandConfig = {
      textureA: "plataformaNuevaLargaA",
      textureB: "plataformaNuevaLargaB",
      textureC: "plataformaNuevaLargaC",
      pos: { x: 2940, y: 1500 },
      width: {
        textureA: 90,
        textureB: 67,
        textureC: 115,
      },
      scale: { width: 0.7, height: 0.7 },
      height: 127,
      large: 40,
      rotated: false,
    };
    const p2 = new LargeFloorIsland(this.scene, p2Config, this.pisos);

    const p3Config: LargeFloorIslandConfig = {
      textureA: "plataformaNuevaLargaA",
      textureB: "plataformaNuevaLargaB",
      textureC: "plataformaNuevaLargaC",
      pos: { x: 3400, y: 450 },
      width: {
        textureA: 90,
        textureB: 67,
        textureC: 115,
      },
      scale: { width: 0.7, height: 0.7 },
      height: 127,
      large: 10,
      rotated: false,
    };
    const p3 = new LargeFloorIsland(this.scene, p3Config,this.pisos2);
    
    const p4Config: FloorConfig = {
    texture: "plataformaNuevaA",
    pos: { x: 900, y: 1630 },
    fix: 25,
    scale: { width: 0.7, height: 0.7 },
    width: 140,
    height: 50,
    };
    const p4 = new Floor(this.scene, p4Config, this.pisos).setFlipX(true);
    
    const p5Config: FloorConfig = {
    pos: { x: 1100, y: 1520 },
    texture: "plataformaNuevaA",
    fix: 25,
    scale: { width: 0.7, height: 0.7 },
    width: 140,
    height: 50,
    };
    const p5 = new Floor(this.scene, p5Config, this.pisos);

  const p6Config: FloorConfig = {
    texture: "plataformaNuevaA",
    pos: { x: 1800, y: 1630 },
    fix: 25,
    scale: { width: 0.7, height: 0.7 },
    width: 140,
    height: 50,
  };
  const p6 = new Floor(this.scene, p6Config, this.pisos).setFlipX(true);
  
  const p7Config: FloorConfig = {
    pos: { x: 2100, y: 1520 },
    texture: "plataformaNuevaA",
    fix: 25,
    scale: { width: 0.7, height: 0.7 },
    width: 140,
    height: 50,
  };
  const p7 = new Floor(this.scene, p7Config, this.pisos);
  
  const p8Config: FloorConfig = {
    texture: "plataformaNuevaA",
    pos: { x: 1900, y: 1340 },
    fix: 25,
    scale: { width: 0.7, height: 0.7 },
    width: 140,
    height: 50,
  };
  const p8 = new Floor(this.scene, p8Config, this.pisos).setFlipX(true);

  const p9Config: FloorConfig = {
  texture: "plataformaNuevaA",
    pos: { x: 3200, y: 1330 },
    fix: 25,
    scale: { width: 0.7, height: 0.7 },
    width: 140,
    height: 50,
  }
  const p9 = new Floor(this.scene, p9Config, this.pisos);

  const p10Config: FloorConfig = {
  texture: "plataformaNuevaA",
    pos: { x: 3600, y: 1100 },
    fix: 25,
    scale: { width: 0.7, height: 0.7 },
    width: 140,
    height: 50,
  }
  const p10 = new Floor(this.scene, p10Config, this.pisos).setFlipX(true);

  const p11Config: FloorConfig = {
  texture: "plataformaNuevaA",
    pos: { x: 4200, y: 760 },
    fix: 25,
    scale: { width: 0.7, height: 0.7 },
    width: 140,
    height: 50,
  }
  const p11 = new Floor(this.scene, p11Config, this.pisos);

  const p12Config: FloorConfig = {
  texture: "plataformaNuevaA",
    pos: { x: 2700, y: 1500 },
    fix: 25,
    scale: { width: 0.7, height: 0.7 },
    width: 140,
    height: 50,
  }
  const p12 = new Floor(this.scene, p12Config, this.pisos).setFlipX(true);

  const boxConfig: FloorConfig = {
  texture: "plataformaNuevaA",
    pos: {x: 1500, y: 1740 },
    fix: 25,
    scale: { width: 0.7, height: 0.7 },
    width: 140,
    height: 50,
  }
  const box = new Floor(this.scene, boxConfig, this.pisos4).setFlipX(true);
  box.setTint(0xff0000);
    //Portal, Coin and Asteroids
    const portalConfig: FloorConfig = {
      pos: { x: 4640, y: 1390 }, // x: 2400
      texture: "plataformaFinalP1",
      // scale: {width: 0.7, height: 0.7},
      width: 100,
      height: 100,
    };
    const port = new Floor(this.scene, portalConfig, this.portal).setDepth(99);
    this.endPortal = port;
    //TEST COLLECTABLES

    const coinConfig: CollectableConfig = {
      texture: "cristal3",
      pos: { x: 3700, y: 300 },
      scale: { width: 0.7, height: 0.7 },
      width: 40,
      height: 18,
      fix: 10,
      aura:"auraTuto",
    };
    this.cristal = new Collectable(this.scene, coinConfig, this.collectables).setBodySize(
      140,
      180
    );
    this.scene.canWin=true;//Portal is constantly ON
    const coll1Config: CollectableConfig = {
      texture: "cristal3",
      pos: { x: 900, y: 1500 },
      scale: { width: 0.7, height: 0.7 },
      width: 40,
      height: 18,
      fix: 25,
      aura:"auraTuto",
    }
    const coll1 = new Collectable(this.scene, coll1Config, this.collectables).setBodySize(140,180);

    const coll2Config: CollectableConfig = {
      texture: "cristal3",
      pos: { x: 1100, y: 1400 },
      scale: { width: 0.7, height: 0.7 },
      width: 40,
      height: 18,
      fix: 25,
      aura:"auraTuto",
    }
    const coll2 = new Collectable(this.scene, coll2Config, this.collectables).setBodySize(140,180);

    const coll3Config: CollectableConfig = {
      texture: "cristal3",
      pos: { x:1300, y: 1300 },
      scale: { width: 0.7, height: 0.7 },
      width: 40,
      height: 18,
      fix: 25,
      aura:"auraTuto",
    }
    const coll3 = new Collectable(this.scene, coll3Config, this.collectables).setBodySize(140,180);

    const coll4Config: CollectableConfig = {
      texture: "cristal3",
      pos: { x: 1800, y: 1500 },
      scale: { width: 0.7, height: 0.7 },
      width: 40,
      height: 18,
      fix: 25,
      aura:"auraTuto",
    }
    const coll4 = new Collectable(this.scene, coll4Config, this.collectables).setBodySize(140,180);

    const coll5Config: CollectableConfig = {
      texture: "cristal3",
      pos: { x: 2100, y: 1400 },
      scale: { width: 0.7, height: 0.7 },
      width: 40,
      height: 18,
      fix: 25,
      aura:"auraTuto",
    }
    const coll5 = new Collectable(this.scene, coll5Config, this.collectables).setBodySize(140,180);

    const coll6Config: CollectableConfig = {
      texture: "cristal3",
      pos: { x: 1900, y: 1140 },
      scale: { width: 0.7, height: 0.7 },
      width: 40,
      height: 18,
      fix: 25,
      aura:"auraTuto",
    }
    const coll6 = new Collectable(this.scene, coll6Config, this.collectables).setBodySize(140,180);

    const coll7Config: CollectableConfig = {
      texture: "cristal3",
      pos: { x: 2500, y: 950 },
      scale: { width: 0.7, height: 0.7 },
      width: 40,
      height: 18,
      fix: 25,
      aura:"auraTuto",
    }
    const coll7 = new Collectable(this.scene, coll7Config, this.collectables).setBodySize(140,180);
//Fireballs
    const fireball1Config: FloorConfig = {
      spriteSheet: "meteorito",
      texture: "meteorito",
      pos: { x: 2000, y: 0 }, // 500 1580
      width: 100,
      height: 100,
      tween: {
        duration: 3000,
        repeat: -1,
        y: "+=2000",
      },
      frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
    const fireball1 = new Floor( this.scene, fireball1Config, this.fireballGroup).setScale(0.5);

    const fireball2Config: FloorConfig = {
      spriteSheet: "meteorito",
      texture: "meteorito",
      pos: { x: 2900, y: 0 }, // 500 1580
      width: 100,
      height: 100,
      tween: {
        duration: 5000,
        repeat: -1,
        y: "+=2000",
      },
      frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
    const fireball2 = new Floor( this.scene, fireball2Config, this.fireballGroup).setScale(0.5);


    const cloudsGroup = this.scene.add.group();

    const c1Config: AsteroidGeneratorConfig = {
      texture: "nube1",
      x: 100,//x: -400,
      y: 800,
      delayed: 70,
      direction: 1,
      velocity: 20,
      scale: 1,
      depth: 99,
      group: cloudsGroup,
    };
    const c1 = new AsteroidGenerator(this.scene, c1Config);
    c1.start();

    const c2Config: AsteroidGeneratorConfig = {
      texture: "nube3",
      x: 100,//x: -400,
      y: 1200,
      delayed: 70,
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
      x: 100,//x: -400,
      y: 500,
      delayed: 100,
      direction: 1,
      velocity: 10,
      scale: 1.2,
      group: cloudsGroup,
      depth: 99,
    };
    const c3 = new AsteroidGenerator(this.scene, c3Config);
    c3.start();

    const mapObjects = cloudsGroup.getChildren()
      .concat(
        this.movingFloor.getChildren(),
        this.movingFloorRot.getChildren(),
        this.pisos.getChildren(),
        this.pisosBack.getChildren(),
        this.pisos2.getChildren(),
        this.pisos3.getChildren(),
        this.pisos4.getChildren(),
        this.fireballGroup.getChildren(),
        this.coin.getChildren(),
        this.portal.getChildren(),
        this.aura.getChildren(),
        this.collectables?.getChildren(),
      );
    //this.mapContainer.add(mapObjects);
    this.scene.UICamera?.ignore(mapObjects);
    this.scene.UICamera?.ignore(this.backContainer);
    this.scene.UICamera?.ignore(this.middleContainer);
    this.scene.UICamera?.ignore(this.frontContainer);
  }

  update() {
    if (this.scene.cursors?.space.isDown && this.scene.stopMov) {
      this.scene.stopMov = false;
      if (this.tutorialStep === 1 || this.tutorialStep === 3)
        this.tutorialStep++;
        this.textTutorial1?.setVisible(false);
      if (this.textTutorial2?.visible) this.textTutorial2?.setVisible(false);
    }

    if (this.scene.player?.body?.touching.down && this.tutorialStep === 0) {
      this.tutorialStep = 1;
      this.textTutorial1?.setVisible(true);
      this.scene.stopMov = true;
      console.log("ACACA")
    }

    /* Attach background anim */
    // if (this.scene.player) this.animateBackground(this.scene.player);
    if (this.scene.player)
      this.animateBackground(this.scene.cameras.main.midPoint);
  }
}
export default Mapa0;
