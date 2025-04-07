import Player from "@/game/assets/Player";
import { GamePlayDataType, loseConfigFromMapType } from "@/game/Types";
import Game from "@/game/Game";
import Teleport from "@/game/assets/Teleport";
import { Time } from "phaser";
import Floor, { FloorConfig } from "@/game/assets/Floor";
import LargeFloorIsland from "@/game/assets/LargeFloorIsland";

export type mapFloorConfig = {
  pos: { x: number; y: number };
  rotate?: boolean;
  flipY?: boolean;
  group?: Phaser.Physics.Arcade.Group;
  colors?: number[];
  width?: number;
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
    height: 1300,
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
  middleSize: { width: number; height: number } = { width: 0, height: 0 };
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
  invincibilityTimer?: Time.TimerEvent

  constructor(scene: Game, player: Player, data?: GamePlayDataType) {
    this.scene = scene;
    this.player = player;
    this.mapGroup = scene.physics.add.group({
      allowGravity: false,
      immovable: true,
      collideWorldBounds: true,
    });
    this.scene.physics.world.setBounds(
      0,
      0,
      this.worldSize.width,
      this.worldSize.height
    );

    this.player.setPlayerWithTank(true);

    this.backContainer = this.scene.add.container();
    this.middleContainer = this.scene.add.container();
    // this.mapContainer = this.middleContainer;
    this.frontContainer = this.scene.add.container();

    const originPoint = { x: 0, y: 0 };//{ x: 0, y: this.worldSize.height };
    this.backContainer.setPosition(originPoint.x, originPoint.y);
    this.middleContainer.setPosition(originPoint.x, originPoint.y);
    this.frontContainer.setPosition(originPoint.x, originPoint.y);

    this.createMapGroups();
  }

  // createMap() {
  //     // Logic to create a new map
  // }

  createMapGroups() {
    this.floor = this.scene.physics.add.group({ allowGravity: false, immovable: true, collideWorldBounds: true });
    this.gravityTile = this.scene.physics.add.group({ allowGravity: false, immovable: true, collideWorldBounds: true });
    this.rotationTile = this.scene.physics.add.group({ allowGravity: false, immovable: true, collideWorldBounds: true });

    this.scene.UICamera?.ignore(this.floor)
    this.scene.UICamera?.ignore(this.gravityTile)
    this.scene.UICamera?.ignore(this.rotationTile)
    this.scene.UICamera?.ignore(this.scene.physics.world.debugGraphic);
  }
  createPlatforms(floors:mapFloorConfig[], largeFloors:mapLargeFloorConfig[]) {

    const globalPlatformsConfig = {
      withTextureToAbove: true,
      texture: "plataformaNuevaA",
      textureA: "plataformaNuevaLargaA",
      textureB: "plataformaNuevaLargaB",
      textureC: "plataformaNuevaLargaC",
      scale: { width: 0.7, height: 0.7 },
      rotated: false,
    };


    floors.forEach((element) => {
      const config: any = {
        ...element,
        ...globalPlatformsConfig
      };
      const floor = new Floor(this.scene, config, element.group ?? this.floor!);
      if (element.flipY) floor.setFlipY(true)
      if (element.colors) floor.setTint(element.colors[0], element.colors[1], element.colors[2], element.colors[3])
      floor.setBodySize(140, 20)
      floor.setFlipY(element.flipY ?? false)
      // this.floor?.add(floor);
    });

    largeFloors.forEach((element) => {
      const config: any = {
        ...element,
        ...globalPlatformsConfig,
      };

      const largeFloor = new LargeFloorIsland(this.scene,config,element.group ?? this.floor!
      );
    });



  }

  createBackgrounds(backgroundsBack: Phaser.GameObjects.Image[], backgroundsMiddle: Phaser.GameObjects.Image[], backgroundsFront: Phaser.GameObjects.Image[]) {
    console.log("createBackgrounds", backgroundsBack, backgroundsMiddle, backgroundsFront);
    this.backgroundsBack = backgroundsBack;
    this.backgroundsMiddle = backgroundsMiddle;
    this.backgroundsFront = backgroundsFront;
    
    this.backContainer.list = backgroundsBack;
    this.middleContainer.list = backgroundsMiddle;
    this.frontContainer.list = backgroundsFront;
    
    console.log("createBackgrounds-container", this.backContainer, this.middleContainer, this.frontContainer);
    // Add mapContainer and frontContainer to the scene
    this.scene.add.existing(this.backContainer);
    this.scene.add.existing(this.middleContainer);
    this.scene.add.existing(this.frontContainer);
  }

  animateBackground(player: Phaser.GameObjects.Sprite | Phaser.Math.Vector2) {
    // console.log("animateBackground");
    this.updateContainerPositionRelativeToCamera(
      this.backContainer,
      this.scene.cameras.main,
      { x: -this.backSize.width * 2, y: -this.backSize.height * 2 },
      { fixX: 1.1, fixY: 1.1 }
    );
    this.updateContainerPositionRelativeToCamera(
      this.middleContainer,
      this.scene.cameras.main,
      { x: -this.middleSize.width * 0.5, y: -this.middleSize.height * 1.75 },
      { fixX: 2, fixY: 2 }
    );

    this.updateContainerPositionRelativeToCamera(
      this.frontContainer,
      this.scene.cameras.main,
      { x: 0, y: 0 },
      { fixX: -20, fixY: -30 }
    );

  }
  updateContainerPositionRelativeToCamera(
    container: Phaser.GameObjects.Container,
    camera: Phaser.Cameras.Scene2D.Camera,
    fixedPoint: { x: number; y: number },
    ponderation: { fixX: number; fixY: number }
  ) {
    // console.log("updateContainerPositionRelativeToCamera", container, camera, fixedPoint, ponderation);
    const offsetX = (camera.scrollX - fixedPoint.x) / ponderation.fixX;
    const offsetY = (camera.scrollY - fixedPoint.y) / ponderation.fixY;
    // Update the container's position
    container?.setPosition(fixedPoint.x + offsetX, fixedPoint.y + offsetY, 0, 0);
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
          () => true,
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

      if (this.coin)
        this.scene.physics.add.overlap(
          this.scene.player,
          this.coin,
          (a, b) => {
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
            () => {
              if (!this.player?.invincible) {
                this.player?.setPlayerInvicinible(true);
                this.invincible?.setVisible(false);
                this.invincibilityTimer = this.scene.time.delayedCall(30000, () => {
                  this.player?.setPlayerInvicinible(false);
                  this.invincible?.setVisible(true);
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