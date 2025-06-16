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
  x?: number,
  y?: number,
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
  mapItems: Phaser.GameObjects.GameObject[] = [];
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
  timerText?:string
  startingPoint = {
    x: 500, //500
    y: 800, //800
  };
  loseConfig: loseConfigFromMapType = [
    {
      positions: { x: this.startingPoint.x , y: this.startingPoint.y },
      cameraDirection: "NORMAL",
      PlayerDirection: "NORMAL",
      gravityDown: true
      ,
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
  // nextScene: string | undefined = "postal1_planeta1";
  nextScene: string | undefined;
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
  cloudsGroup?: Phaser.Physics.Arcade.Group;
  obstacle?: Phaser.Physics.Arcade.Group;
  obstacleFloor?: Phaser.Physics.Arcade.Group;
  invincibilityTimer?: Time.TimerEvent
  endPortal?: Phaser.Physics.Arcade.Group;
  ratioReference: { width: number; height: number } = { width: 1920, height: 1080 };
  farBackgroundReference: { width: number; height: number } = { width: 3840, height: 2160 };
  savePoint?: {x: number; y: number};
  initialScroll:  { x: number; y: number } = { x: 0, y: 0 };

  totalCoins?:number
  constructor(scene: Game, player: Player, data?: GamePlayDataType) {
    this.scene = scene;

    if (this.scene.input.keyboard) {
      this.scene.input.keyboard.enabled = true;
    }
    this.player = player;
    // this.mapGroup = scene.physics.add.group({
    //   allowGravity: false,
    //   immovable: true,
    //   collideWorldBounds: true,
    // });
    /*this.startingPoint = {
      x: 500, //500
      y: this.worldSize.height-600, //800
    };*/
    this.scene.physics.world.setBounds(
      0,
      0,
      this.worldSize.width,
      this.worldSize.height
    );
    this.loseConfig=[
      { positions: { x: this.startingPoint.x , y: this.startingPoint.y },
        cameraDirection: "NORMAL",
        PlayerDirection: "NORMAL",
        gravityDown: true
        ,
      },
    ]
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
    this.fallingTile = this.scene.physics.add.group({ allowGravity: false, immovable: true, collideWorldBounds: false });
    this.teleport = this.scene.physics.add.group({ allowGravity: false, immovable: true, collideWorldBounds: true });
    this.obstacle = this.scene.physics.add.group({ allowGravity: false, immovable: true, collideWorldBounds: true });
    this.obstacleFloor = this.scene.physics.add.group({ allowGravity: false, immovable: true, collideWorldBounds: false });
    this.firegroup = this.scene.physics.add.group({ allowGravity: false, immovable: true, collideWorldBounds: true });
    this.cloudsGroup= this.scene.physics.add.group({ allowGravity: false});
    this.portal = this.scene.physics.add.group({ allowGravity: false });
    this.coin = this.scene.physics.add.group({ allowGravity: false });
    this.invincible = this.scene.physics.add.group({ allowGravity: false, collideWorldBounds: true });
    this.scene.UICamera?.ignore(this.floor)
    this.scene.UICamera?.ignore(this.gravityTile)
    this.scene.UICamera?.ignore(this.rotationTile)
    this.scene.UICamera?.ignore(this.fallingTile)
    this.scene.UICamera?.ignore(this.teleport)
    this.scene.UICamera?.ignore(this.obstacle)
    this.scene.UICamera?.ignore(this.obstacleFloor)
    this.scene.UICamera?.ignore(this.firegroup)
    this.scene.UICamera?.ignore(this.cloudsGroup)
    this.scene.UICamera?.ignore(this.portal)
    this.scene.UICamera?.ignore(this.coin)
    this.scene.UICamera?.ignore(this.invincible)
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

    this.scene.cameras.getCamera('backgroundCamera')?.ignore(this.backContainer);
    this.scene.UICamera?.ignore(this.backContainer);
    this.scene.UICamera?.ignore(this.middleContainer);
    this.scene.UICamera?.ignore(this.frontContainer);
    this.scene.UICamera?.ignore(this.scene.player!);
    this.scene.cameras.main.setScroll(0, 0);
  }

  /*createPlatforms(gameObjects: mapFloorConfig[]) {
   
    gameObjects.forEach((element) => {
      const tile: any = Factory(this.scene, element, this.floor!);
      // this.mapGroup.add(tile);
      this.mapItems.push(tile);
    })

    this.totalCoins =  this.coin?.getChildren().length
  }*/
  createPlatforms(gameObjects: mapFloorConfig[]) {
    gameObjects.forEach((element) => {
      const tile: any = Factory(this.scene, element, this.floor!);
      // this.mapGroup.add(tile);
      if (Array.isArray(tile)) {
        this.mapItems.push(...tile);
      } else {
        this.mapItems.push(tile);
      }
    });
    this.totalCoins =  this.coin?.getChildren().length
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
      // this.updatePositions(
      //   this.backContainer,
      //   this.scene.cameras.main,
      //   { x: this.startingPoint.x, y: this.worldSize.height },
      //   { fixX: 1.1, fixY: 1.1 }
      // );
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
    const bgCamera = this.scene.cameras.getCamera('backgroundCamera')
    this.mapItems.forEach((item) => {
      this.scene.UICamera?.ignore(item);
      this.scene.cameras.getCamera('backgroundCamera')?.ignore(item);
    })
    const bgItems = this.backgroundsBack.concat(this.backgroundsMiddle, this.backgroundsFront);
    bgItems.forEach((item) => {
      this.scene.UICamera?.ignore(item);
      // this.scene.cameras.getCamera('backgroundCamera')?.ignore(item);
    })
    const bgItems2 = this.backgroundsFront.concat(this.backgroundsMiddle);
    bgItems2.forEach((item) => {
      this.scene.cameras.getCamera('backgroundCamera')?.ignore(item);
    })
    this.backgroundsBack.forEach((item) => {
      this.scene.cameras.main?.ignore(item);
    }
    )
    this.scene.cameras.main?.ignore(this.backContainer);
    // this.scene.UICamera?.ignore(this.mapGroup);
    // this.scene.cameras.getCamera('backgroundCamera')?.ignore(this.mapGroup);
    this.scene.cameras.getCamera('backgroundCamera')?.ignore(this.scene.player!);
    this.scene.cameras.getCamera('backgroundCamera')?.ignore(this.scene.UIClass?.container!);
    this.scene.cameras.getCamera('backgroundCamera')?.ignore(this.middleContainer);
    // this.scene.cameras.getCamera('backgroundCamera')?.ignore(this.backContainer);
    console.log("cameraIgnore", this.scene.cameras);
    this.scene.cameras.cameras.find((cam) => cam.id === 1)?.setAlpha(0);
    this.scene.UICamera?.ignore(this.scene.player!);
    this.scene.UICamera?.ignore(this.backContainer);
    // this.scene.UICamera?.ignore(this.backgroundsFront[0]);
    this.scene.UICamera?.ignore(this.backgroundsMiddle);
    // this.scene.UICamera?.ignore(this.backgroundsBack[0]);
    if (this.scene.resultModal) bgCamera?.ignore(this.scene.resultModal)
    if (this.scene.resultModal && this.scene.resultModal.modal) {
      this.scene.resultModal.container?.list.forEach((item) => {
        this.scene.cameras.main.ignore(item);
        bgCamera?.ignore(item)
      })
      this.scene.cameras.main.ignore(this.scene.resultModal.modal);
      bgCamera?.ignore(this.scene.resultModal.modal)
      this.scene.cameras.main.ignore(this.scene.resultModal);
      // this.scene.cameras.main.ignore(this.middleContainer);
      // this.scene.cameras.main.ignore(this.frontContainer);
    }
  }

  resetMap() {
    //console.log("resetMap", this.mapItems, 'inside');
    this.fallingTile?.getChildren().forEach((tile) => {
      const fallingTile = tile as Phaser.Physics.Arcade.Sprite;
      if (fallingTile.body) {
        //@ts-ignore
        fallingTile.body.allowGravity = false;
        //@ts-ignore
        fallingTile.body.reset(fallingTile.config.pos.x, fallingTile.config.pos.y);
      }
    });
  }

  createBgRow(x: number, y: number, textures: string[], assetWidth: number, scale: number, origin?: number, xOffset: number = 0, yOffset: number = 0): Phaser.GameObjects.Image[] {
    const scaledWidth: number = assetWidth * scale;
    return Array(Math.ceil(this.worldSize.width / scaledWidth)).fill(0).map((_, index) => {
      const randomTexture = textures[Math.floor(Math.random() * textures.length)];
      const image = this.scene.add.image(x + index * scaledWidth + xOffset, y + yOffset, randomTexture).setOrigin(0, 1).setScale(scale);
      if (origin || origin === 0) {
        image.setOrigin(origin);
      }
      return image;
    });
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
              if (!this.scene.sound.get('cameraFlip')?.isPlaying) {
                this.scene.sound.play('cameraFlip', {
                    volume: 0.7 * (this.scene.masterManagerScene?.volumeSound ?? 1),
                    loop: false,
                  });
              }
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
              this.scene.canRot = true
              this.scene.touch()
              if (!this.scene.sound.get('cameraFlip')?.isPlaying) {
                this.scene.sound.play('cameraFlip', {
                    volume: 0.7 * (this.scene.masterManagerScene?.volumeSound ?? 1),
                    loop: false,
                  });
              }
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
                if (!this.scene.sound.get('fallingTile')?.isPlaying) {
                  this.scene.sound.play('fallingTile', {
                    volume: 0.4 * (this.scene.masterManagerScene?.volumeSound ?? 1),
                    loop: false,
                  });
                  // this.scene.masterManagerScene?.playSound('fallingTile', false, 0.4);
                }
                //@ts-ignore
                b.setCollideWorldBounds(false);
                //@ts-ignore
                b.body.allowGravity = true;
                //@ts-ignore
                this.scene.time.delayedCall(
                  5000,
                  () => {
                    //@ts-ignore
                    b.body.allowGravity = false;
                    //@ts-ignore
                    b.body.setVelocity(0);
                  }
                );
              }
            },
            () => true,
            this.scene
          );
      if (this.coin)
        this.scene.physics.add.overlap(
          this.scene.player,
          this.coin,
          (a, b: any) => {
            this.scene.touchItem("coin");
            this.scene.masterManagerScene?.playSound(b.soundKey)
            if (b.destroyItem) b.destroyItem();
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
              console.log("TOCO invincible");
              this.scene.masterManagerScene?.playSound(b.soundKey)
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
            console.log("portal", this.portal);
            this.scene.masterManagerScene?.playSound('win')
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
              this.scene.masterManagerScene?.playSound('damage')
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
          (a, b) => {
            //this.scene.touchItem("fireball");
            //this.scene.player?.setVelocity(0);
            const danger = b as Danger;
            danger.DoDamage();
          },
          () => true,
          this.scene
        );
      }
      if (this.obstacleFloor) {
        this.scene.physics.add.overlap(
          this.scene.player,
          this.obstacleFloor,
          (a, b) => {
            //this.scene.touchItem("fireball");
            //this.scene.player?.setVelocity(0);
            this.scene.masterManagerScene?.playSound('damage')
            const danger = b as Danger;
            danger.DoDamage();
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