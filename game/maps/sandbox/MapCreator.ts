import Player from "@/game/assets/Player";
import { GamePlayDataType, loseConfigFromMapType } from "@/game/Types";
import Game from "@/game/Game";
import Teleport from "@/game/assets/Teleport";
import { GameObjects, Time } from "phaser";
import Floor, { FloorConfig } from "@/game/assets/Floor";
import LargeFloorIsland from "@/game/assets/LargeFloorIsland";
import Factory from "@/game/assets/Factory";
import Collectable from "@/game/assets/Collectable";
import Danger from "@/game/assets/Danger";


export type globalPlatformsConfigType = {
  withTextureToAbove?: boolean;
  texture?: string | Phaser.Textures.Texture;
  textureA?: string | Phaser.Textures.Texture;
  textureB?: string | Phaser.Textures.Texture;
  textureC?: string | Phaser.Textures.Texture;
  scale?: { width: number; height: number };
  rotated?: boolean;
};

export type mapFloorConfig = {
  pos?: { x: number; y: number };
  x?:number,
  y?:number,
  rotate?: boolean;
  flipY?: boolean;
  group?: Phaser.Physics.Arcade.Group;
  colors?: number[];
  width?: number | { textureA: number; textureB: number; textureC: number };
  height?: number;
  scale?: { width: number; height: number };
  
  animation?: {
    xAxis?: {
      xDistance: number;
      xVel: number;
    };
    yAxis?: {
      yDistance: number;
      yVel: number;
    };
  };


}

export type mapLargeFloorConfig = {
  pos: { x: number; y: number };
  rotate?: boolean;
  flipY?: boolean;
  group?: Phaser.Physics.Arcade.Group;
  colors?: number[];
  width?: {
    textureA: number;
    textureB: number; 
    textureC: number;
  }
  height?: number;
  scale?: { width: number; height: number };
  textureA?: string | Phaser.Textures.Texture;
  textureB?: string | Phaser.Textures.Texture;
  textureC?: string | Phaser.Textures.Texture;
  animation?: {
    xAxis?: {
      xDistance: number;
      xVel: number;
    };
    yAxis?: {
      yDistance: number;
      yVel: number;
    };
  };
}
export default class MapCreator {
  mapGroup: Phaser.Physics.Arcade.Group;
  isJumping = false;
  scene: Game;
  worldSize = {
    width: 10000,
    height: 2000,
  };
  cameraBounds = {
    x: 0,
    y: 0,
    width: 10000,
    height: 2000,
  };
  floorConf?: Phaser.Physics.Arcade.Group;
  backgroundConf?: Phaser.Physics.Arcade.Group;
  amountLifes: number = 0;
  sideGrav: boolean = false;
  goingBack: boolean = false;
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
      gravityDown: true,
    },
  ];
  backgroundsBack: Phaser.GameObjects.Image[] = [];
  backgroundsMiddle: Phaser.GameObjects.Image[] = [];
  backgroundsFront: Phaser.GameObjects.Image[] = [];
  backContainer: Phaser.GameObjects.Container;
  middleContainer: Phaser.GameObjects.Container;
  frontContainer: Phaser.GameObjects.Container;
  backSize: { width: number; height: number } = { width: 0, height: 0 };
  frontSize: { width: number; height: number } = { width: 0, height: 0 };
  middleWidth: { width: number; height: number } = { width: 0, height: 0 };
  nextScene: string | undefined = "postal1_planeta1";
  postalCode: string | undefined = "adjns";
  UIItemToGrab: string = "cristal3";
  UIItemScale?: number;
  collected: Boolean = false;
  rotate?: boolean = true;
  mapContainer?: Phaser.GameObjects.Container;
  floor?: Phaser.Physics.Arcade.Group;
  pisosBack?: Phaser.Physics.Arcade.Group;
  gravityTile?: Phaser.Physics.Arcade.Group;
  rotationTile?: Phaser.Physics.Arcade.Group;
  fallingTile?: Phaser.Physics.Arcade.Group;
  coin?: Phaser.Physics.Arcade.Group;
  coinAura?: Phaser.GameObjects.Sprite;
  invincible?: Phaser.Physics.Arcade.Group;
  portal?: Phaser.Physics.Arcade.Group;
  teleport?: Phaser.Physics.Arcade.Group;
  aura?: Phaser.Physics.Arcade.Group;
  movingFloor?: Phaser.Physics.Arcade.Group;
  movingFloorRot?: Phaser.Physics.Arcade.Group;
  flyingPiso?: Phaser.Physics.Arcade.Group;
  firegroup?: Phaser.Physics.Arcade.Group;
  obstacle?: Phaser.Physics.Arcade.Group;
  invincibilityTimer?: Time.TimerEvent
  endPortal?: Phaser.Physics.Arcade.Group;
  ratioReference: { width: number; height: number } = { width: 1920, height: 1080 };
  farBackgroundReference: { width: number; height: number } = { width: 3840, height: 2160 };
  savePoint?: {x: number; y: number};
  initialScroll:  { x: number; y: number } = { x: 0, y: 0 };

  constructor(scene: Game, player: Player, data?: GamePlayDataType) {
    this.scene = scene;
    this.player = player;
    this.mapGroup = scene.physics.add.group({
      allowGravity: false,
      immovable: true,
      collideWorldBounds: true,
    });
    this.startingPoint = {
      x: 500, //500
      y: this.worldSize.height-600, //800
    };
    this.scene.physics.world.setBounds(
      0,
      0,
      this.worldSize.width,
      this.worldSize.height
    );
    this.player.setPlayerWithTank(true);

    // this.scene.cameras.main.setPosition(
    //   0,
    //   0
    // );
    this.backContainer = this.scene.add.container();
    this.middleContainer = this.scene.add.container();
    // this.mapContainer = this.middleContainer;
    this.frontContainer = this.scene.add.container();
    // this.scene.cameras.main.midPoint.setTo(
    //   0,
    //   this.worldSize.height
    // );
    // this.scene.cameras.main.scrollX = 0;
    // this.scene.cameras.main.scrollY = 0;
    // this.setInitialScroll(0, 0);
    // const originPoint = { x: 0, y: 0 };//{ x: 0, y: this.worldSize.height };
    // this.backContainer.setPosition(originPoint.x, originPoint.y).setSize(this.worldSize.width, this.worldSize.height)
    // this.middleContainer.setPosition(originPoint.x, originPoint.y).setSize(this.worldSize.width, this.worldSize.height)
    // this.frontContainer.setPosition(originPoint.x, originPoint.y).setSize(this.worldSize.width, this.worldSize.height);
    this.createMapGroups();

  }

  // createMap() {
  //     // Logic to create a new map
  // }

  createMapGroups() {
    this.floor = this.scene.physics.add.group({ allowGravity: false, immovable: true, collideWorldBounds: true });
    this.gravityTile = this.scene.physics.add.group({ allowGravity: false, immovable: true, collideWorldBounds: true });
    this.rotationTile = this.scene.physics.add.group({ allowGravity: false, immovable: true, collideWorldBounds: true });
    this.fallingTile = this.scene.physics.add.group({ allowGravity: true, immovable: true, collideWorldBounds: true });
    this.teleport = this.scene.physics.add.group({ allowGravity: false, immovable: true, collideWorldBounds: true });
    this.obstacle = this.scene.physics.add.group({ allowGravity: false, immovable: true, collideWorldBounds: true });
    this.scene.UICamera?.ignore(this.floor)
    this.scene.UICamera?.ignore(this.gravityTile)
    this.scene.UICamera?.ignore(this.rotationTile)
    this.scene.UICamera?.ignore(this.fallingTile)
    this.scene.UICamera?.ignore(this.teleport)
    this.scene.UICamera?.ignore(this.obstacle)
    if (this.scene.physics.world.debugGraphic) {
      this.scene.UICamera?.ignore(this.scene.physics.world.debugGraphic);
    }
  }
  
  createBackgrounds(_backgroundsBack: Phaser.GameObjects.Image[], _backgroundsMiddle: Phaser.GameObjects.Image[], _backgroundsFront: Phaser.GameObjects.Image[]) {
    console.log("createBackgrounds", _backgroundsBack, _backgroundsMiddle, _backgroundsFront);
    this.backgroundsBack = _backgroundsBack;
    this.backgroundsMiddle = _backgroundsMiddle;
    this.backgroundsFront = _backgroundsFront;
    
    /*this.backContainer.list = backgroundsBack;
    this.middleContainer.list = backgroundsMiddle;
    this.frontContainer.list = backgroundsFront;*/
    
    //console.log("createBackgrounds-container", this.backContainer, this.middleContainer, this.frontContainer);
    
    this.backContainer.add(this.backgroundsBack);
    this.middleContainer.add(this.backgroundsMiddle);
    this.frontContainer.add(this.backgroundsFront).setDepth(9999999999999);

    this.scene.add.existing(this.backContainer);
    this.scene.add.existing(this.middleContainer);
    this.scene.add.existing(this.frontContainer);

    this.scene.UICamera?.ignore(this.backContainer);
    this.scene.cameras.getCamera('backgroundCamera')?.ignore(this.backContainer);
    this.scene.UICamera?.ignore(this.middleContainer);
    this.scene.UICamera?.ignore(this.frontContainer);
    this.scene.cameras.main.setScroll(0, 0);
  }

  createPlatforms(gameObjects: mapFloorConfig[]) {
    gameObjects.forEach((element) => {
      const tile: any = Factory(this.scene, element, this.floor!);
      this.mapGroup.add(tile);
    })
  }

  setInitialScroll(scrollX: number, scrollY: number) {
    this.scene.initialScroll = { x: scrollX, y: scrollY };
    console.log("setInitialScroll", scrollX, scrollY);
    // this.initialScroll = { x: scrollX, y: scrollY };
  }

   updatePositions = (
      images: Phaser.GameObjects.Container,
      camera: Phaser.Cameras.Scene2D.Camera,
      fixedPoint: { x: number; y: number },
      ponderation: { fixX: number; fixY: number }
    ) => {
      const offsetX = (camera.midPoint.x - fixedPoint.x) / ponderation.fixX;
      const offsetY = (camera.midPoint.y - fixedPoint.y) / ponderation.fixY;
      images.setPosition(
          (this.scene.player?.body?.x! - this.startingPoint.x),
          (this.scene.player?.body?.y! - this.startingPoint.y)
        );
    };
  
    animateBackground() {
      this.updatePositions(
        this.backContainer,
        this.scene.cameras.main,
        { x: this.startingPoint.x, y: this.worldSize.height },
        { fixX: 1.1, fixY: 1.1 }
      );
      // this.updatePositions(
      //   this.middleContainer,
      //   this.scene.cameras.main,
      //   { x: this.startingPoint.x, y: this.worldSize.height },
      //   { fixX: 2, fixY: 4 }
      // );
      // this.updatePositions(
      //   this.frontContainer,
      //   this.scene.cameras.main,
      //   { x: this.startingPoint.x, y: this.worldSize.height },
      //   { fixX: -20, fixY: -30 }
      // );
    };
  
  

  // animateBackground() {
  //   const camera = this.scene.cameras.main;
  //   this.updateParallaxLayer(this.backContainer, camera, 0.8, 0.8);   // Farthest, moves slowest
  //   this.updateParallaxLayer(this.middleContainer, camera, 0.3, 0.3); // Middle layer
  //   this.updateParallaxLayer(this.frontContainer, camera, 0, 0);  // Closest, moves faster
  // }
  
  // updateParallaxLayer(
  //   container: Phaser.GameObjects.Container,
  //   camera: Phaser.Cameras.Scene2D.Camera,
  //   parallaxFactorX: number,
  //   parallaxFactorY: number
  // ) {
  //   if (!container || !camera) return;
  //   const windowScaleX = window.innerWidth / this.ratioReference.width;
  //   const windowScaleY = window.innerHeight / this.ratioReference.height;
  //   console.log("windowScaleX", windowScaleX, windowScaleY);
  //   const offsetY = this.scene.player?.body?.height! - (this.scene.player?.body?.height! * camera.lerp.y * camera.followOffset.y);
  //   const maxScrollY = camera.getBounds().bottom - camera.height - offsetY;
  //   const worldBottomMargin = this.worldSize.height - this.cameraBounds.height - this.cameraBounds.y;
  //   console.log("maxScrollY", maxScrollY, camera.getBounds().bottom, camera.height * windowScaleY, offsetY);
  //    2560x1080	
  //   maxScrollY 2510 1700 1080 -1890
  //   1920x1080
  //   maxScrollY 908.6000518798828 1700 703.2000122070312 88.19993591308594
  //   container.setPosition(
  //     (camera.scrollX) * parallaxFactorX,
  //     (camera.scrollY - (maxScrollY)) * parallaxFactorY + 4 - (worldBottomMargin) // El 4 es por un microcorte quizas generado por excedentes en los assets
  //   );
  // }

  cameraIgnore () {
    this.scene.UICamera?.ignore(this.mapGroup);
    this.scene.cameras.getCamera('backgroundCamera')?.ignore(this.mapGroup);
    this.scene.cameras.getCamera('backgroundCamera')?.ignore(this.scene.player!);
  }


  addColliders() {
    if (this.scene.player) {

      if (this.floor)
        this.scene.physics.add.collider(
          this.scene.player,
          this.floor,
          this.scene.touch,
          // () => {
          //   if (this.scene.player?.withTank) {
          //     this.scene.player.tank.isCharging = this.scene.player.tank.chargeValue;
          //   }
          // },
          () => {
            // if (this.scene.player) 
            //   this.scene.player.touchedFloor = true;
            //   this.setInitialScroll(this.scene.cameras.main.scrollX, this.scene.cameras.main.scrollY);
          },
          this.scene
        );
      if (this.gravityTile)
        this.scene.physics.add.collider(
          this.scene.player,
          this.gravityTile,
          (a, b) => {
            this.scene.touch()
            if (
              this.scene.player?.touchingFeet(b as Phaser.Physics.Arcade.Sprite)
            ) {
              this.scene.changeGravity(true, 1000, 3);
            }
          },
          () => true,
          this.scene
        );
      if (this.rotationTile)
        this.scene.physics.add.collider(
          this.scene.player,
          this.rotationTile,
          (a, b) => {
            if (
              this.scene.player?.touchingFeet(b as Phaser.Physics.Arcade.Sprite)
            ) {
              this.scene.touch()
              //@ts-ignore
              this.scene.rotateCam(b.rotate, 10);
            }
          },
          () => true,
          this.scene
        );
        if (this.fallingTile)
          this.scene.physics.add.collider(
            this.scene.player,
            this.fallingTile,
            (a, b) => {
              if (
                this.scene.player?.touchingFeet(b as Phaser.Physics.Arcade.Sprite)
              ) {
                this.scene.touch()
                //@ts-ignore
                b.body.allowGravity = true;
              }
            },
            () => true,
            this.scene
          );
      if (this.coin)
        this.scene.physics.add.overlap(
          this.scene.player,
          this.coin,
          (a, b) => {
            this.scene.touchItem("coin");
            b.destroy();
            this.coinAura?.destroy();
          },
          () => true,
          this.scene
        );
        if (this.invincible) {
          this.scene.physics.add.overlap(
            this.scene.player,
            this.invincible,
            (a, b: any) => {
              if (!this.player?.invincible) {
                this.player?.setPlayerInvicinible(true);
                b?.turnTo(false);
                this.invincibilityTimer = this.scene.time.delayedCall(30000, () => {
                  this.player?.setPlayerInvicinible(false);
                  b?.turnTo(true);
                });
              }
            },
            () => true,
            this.scene
          );
        }
      if (this.portal)
        this.scene.physics.add.overlap(
          this.scene.player,
          this.portal,
          () => {
            this.scene.win();
          },
          () => true,
          this.scene
        );
      if (this.firegroup) {
        this.scene.physics.add.overlap(
          this.scene.player,
          this.firegroup,
          () => {
            if (!this.player?.invincible) {
              this.scene.touchItem("fireball");
              this.scene.player?.setVelocity(0);
            }
          },
          () => true,
          this.scene
        );
      }
      if (this.obstacle) {
        this.scene.physics.add.overlap(
          this.scene.player,
          this.obstacle,
          (a,b) => {
            //this.scene.touchItem("fireball");
            //this.scene.player?.setVelocity(0);
            const danger = b as Danger;
            danger.Attack();
          },
          () => true,
          this.scene
        );
      }
      if (this.teleport)
        this.scene.physics.add.collider(
          this.scene.player,
          this.teleport,
          (a, b) => {
            console.log("teleport");
            const tp = b as Teleport;
            tp.trigger();
          },
          () => true,
          this.scene
        );
    }
  }

  update() {
    /* Attach background anim */
    // // if (this.scene.player) this.animateBackground(this.scene.player);
    // if (this.player)
    //   this.animateBackground(this.scene.cameras.main.midPoint);
  }
}