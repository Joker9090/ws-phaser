import MapCreator from "../sandbox/MapCreator";
import Player from "@/game/assets/Player";
import { GamePlayDataType } from "@/game/Types";
import Game from "@/game/Game";
import { group } from "console";

export default class Map3 extends MapCreator {
  constructor(scene: Game, player: Player, data?: GamePlayDataType) {
    super(scene, player, data);
    this.scene = scene;
    this.player = player;

    this.worldSize = {
      width: 5000,
      height: 3000,
    };
    this.cameraBounds = {
      x: 0,
      y: 0,
      width: 4800,
      height: 2800,
    };

    this.scene.physics.world.setBounds(
        0,
        0,
        5000,
        3000
      );
    this.scene.cameras.main.setBounds(
        100,
        100,
        4800,
        2800
    );

    this.player.setPlayerWithTank(true);
  }

    createBgRow(x: number, y: number, texture: string, assetWidth: number, scale: number) {
        const scaledWidth: number = assetWidth * scale;
        return Array(Math.ceil(this.worldSize.width / scaledWidth)).fill(0).map((_, index) => {
            return this.scene.add.image(x + index * scaledWidth, y, texture).setOrigin(0, 1).setScale(scale);
        });
    }

    createMap(data: { level: number; lifes: number }) {
      const { width, height } = this.ratioReference;
      const { width: farWidth, height: farHeight } = this.farBackgroundReference;
      const downScaledMiddleWidth = width * 0.7;
      const downScaledFrontWidth = width * 0.5;
  
      // this.backgroundsBack = [
      //     ...this.createBgRow(this.cameraBounds.x-200, this.worldSize.height, "gradient", farWidth, 1),
      //     ...this.createBgRow(this.cameraBounds.x-200, this.worldSize.height, "stars", farWidth, 1),
      //     ...this.createBgRow(this.cameraBounds.x-200, this.worldSize.height, "curvedVector2", farWidth, 0.6),
      //   // this.scene.add.image(this.cameraBounds.x-200 + farWidth, this.worldSize.height, "curvedVector2").setOrigin(0, 1).setScale(0.7),
      // ]

      const bgContainerArr = [
        this.scene.add.image(0, 0, "gradient").setOrigin(0.5),
        this.scene.add.image(0, 0, "stars").setOrigin(0.5),
        this.scene.add.image(0, 300, "curvedVector").setOrigin(0.5),
      ]
      const bgContainer = this.scene.add.container(0, 0, bgContainerArr);
      this.scene.UICamera?.ignore(bgContainer);
      const newMainCamera = this.scene.cameras.add(0, 0, window.innerWidth, window.innerHeight, true, "mainCamera");
      // this.scene.children.sendToBack(bgContainer);
      this.scene.cameras.main.ignore(bgContainer);
  
      this.backgroundsMiddle = [
        ...this.createBgRow(this.cameraBounds.x-200, this.worldSize.height, "middleCombo", width, 0.7),
      ]
  
      this.backgroundsFront = [
          this.scene.add.image(-this.startingPoint.x, this.worldSize.height, "frontCombo").setOrigin(0, 1).setScale(0.5),
          this.scene.add.image(-this.startingPoint.x + downScaledFrontWidth, this.worldSize.height, "frontCombo2").setOrigin(0, 1).setScale(0.5),
          this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 2), this.worldSize.height, "frontCombo3").setOrigin(0, 1).setScale(0.5),
          this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 3), this.worldSize.height, "frontCombo4").setOrigin(0, 1).setScale(0.5),
          this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 4), this.worldSize.height, "frontCombo2").setOrigin(0, 1).setScale(0.5),
          this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 5), this.worldSize.height, "frontCombo2").setOrigin(0, 1).setScale(0.5),
      ]
  
      this.createBackgrounds(this.backgroundsBack, this.backgroundsMiddle, this.backgroundsFront);
  
      // this.scene.UICamera?.ignore(this.mapContainer);
      this.scene.UICamera?.ignore(this.frontContainer);
      this.scene.player?.setDepth(999);
      
  
      const basePlatformsConfig = {
        texture: "plataformaNuevaA",
        scale: { width: 0.7, height: 0.7 },
        rotated: false,
        type: "floor",
        width: 140,
        height: 40,
        group: this.floor,
      }
  
      const baseLargePlatformsConf = {
        withTextureToAbove: true,
        texture: "plataformaNuevaA",
        textureA: "platform_izq",
        textureB: "platform_center",
        textureC: "platform_der",
        textureFill: ["fill_texture", "fill_texture2", "fill_texture3", "fill_texture4"],
        width: {
          textureA: 96,
          textureB: 96,
          textureC: 96,
        },
        height: 96,
        scale: { width: 1, height: 1 },
        rotated: false,
        type: "largeFloor",
        group: this.floor
      };

      const mapFloor =  this.cameraBounds.height; 
      const mapLeft = this.cameraBounds.x;
  
      const mapPlatforms = [
        {
          ...baseLargePlatformsConf,
          pos: { x: mapLeft, y: mapFloor - 100 },
          large: 15,
          group: this.floor
        },
        {
          ...basePlatformsConfig, pos: { x: 1000, y: mapFloor-400 }, animation: {
            xAxis: {
              xDistance: 1000,
              xVel: 100
            }
          }
        },
        {
          ...basePlatformsConfig, pos: { x: 1000, y: mapFloor-500 }, animation: {
            yAxis: {
              yDistance: 1000,
              yVel: 100
            }
          }
        },
        { ...basePlatformsConfig, pos: { x: 1400, y: mapFloor-600 } },
        { ...basePlatformsConfig, pos: { x: 1800, y: mapFloor-600 } },
        { ...basePlatformsConfig, pos: { x: 2200, y: mapFloor-600 } },
        {
          ...baseLargePlatformsConf,
          pos: { x: 3000, y: mapFloor - 100 },
          large: 15,
          group: this.floor
        },
        { ...basePlatformsConfig, pos: { x: 3400, y: mapFloor-100 } },
        { ...basePlatformsConfig, pos: { x: 3700, y: mapFloor-400 } },
        { ...basePlatformsConfig, pos: { x: 4000, y: mapFloor-600 } },
        { ...basePlatformsConfig, pos: { x: 4300, y: mapFloor-800 } },
        { ...basePlatformsConfig, pos: { x: 4600, y: mapFloor-1200 } },
        { ...basePlatformsConfig, pos: { x: 4900, y: mapFloor-1200 } },
        { ...basePlatformsConfig, pos: { x: 5200, y: mapFloor-1200 } },
        { ...basePlatformsConfig, pos: { x: 5500, y: mapFloor-1200 } },
        {
          ...baseLargePlatformsConf,
          pos: { x: 6000, y: mapFloor - 1200 },
          large: 10,
          group: this.floor,
          withTextureToAbove: false,
        },
      ]

      this.createPlatforms(mapPlatforms)
      this.cameraIgnore()
    }

    update() {
      if (this.scene.player)
        this.animateBackground();
    }
}