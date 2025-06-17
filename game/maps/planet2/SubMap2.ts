import MapCreator, { mapFloorConfig } from "../sandbox/MapCreator";
import Player from "@/game/assets/Player";
import { GamePlayDataType } from "@/game/Types";
import Game from "@/game/Game";
import { group } from "console";
import colors from "@/game/assets/PlatformColors";

export default class SubMap2 extends MapCreator {
  constructor(scene: Game, player: Player, data?: GamePlayDataType) {
    super(scene, player, data);
    this.scene = scene;
    this.player = player;

    this.worldSize = {
      width: 5300,
      height: 1800,
    };
    this.cameraBounds = {
      x: 200,
      y: 200,
      width: 4900,
      height: 1400,
    };

    this.scene.physics.world.setBounds(
        0,
        0,
        this.worldSize.width,
        this.worldSize.height
      );
    this.scene.cameras.main.setBounds(
        this.cameraBounds.x,
        this.cameraBounds.y,
        this.cameraBounds.width,
        this.cameraBounds.height
    );
    this.startingPoint = {
      x: 400,
      y: this.cameraBounds.height/2,
    };
    this.loseConfig = [
      {
        positions: {
          x: this.startingPoint.x,
          y: this.startingPoint.y,
        },
        cameraDirection: "NORMAL",
        PlayerDirection: "NORMAL",
        gravityDown: true
      }
    ]

    //this.player.setPlayerWithTank(true);
    //this.player.isFlying = true;
    this.player.setPlayerFlying(true);
    this.defineItems();
  }
  
  defineItems() {
    const ObstacleFloorConf = {
        textureA: "top_v1",
        textureB: ["middle_v1", "middle_v1_2"],
        textureC: "bottom_v1",
        // width: {
        //   textureA: 340,
        //   textureB: 340,
        //   textureC: 340,
        // },
        width: 340,
        height: 180,
        scale: { width: 0.7, height: 0.7 },
        type: "obstacleFloor",
        group: this.obstacleFloor,
      };

      const baseCristalConf = {
        type: "collectable",
        texture: "comida",
        scale: { width: 0.7, height: 0.7 },
        width: 140,
        height: 180,
        fix: 10,
        group: this.coin,
        aura: 'auraTuto',
        auraColor: 0xff9600,
      }

      const basePlatformsConfig = {
        withTextureToAbove: false,
        texture: "plataformaNuevaA",
        scale: { width: 0.7, height: 0.7 },
        rotated: false,
        type: "floor",
        width: 140,
        height: 40
    }
    const backToLvl1Conf: GamePlayDataType = {
      level: 6,
      lifes: this.scene.lifes ? this.scene.lifes : 3,
      loadKey: ["Postales", "Cinemato1", "Cinemato2"],
      startingPositionFromOtherScene: {
          x: 7700,
          y: 1600,
      },
  }
      const bottomLimit = this.cameraBounds.height + this.cameraBounds.y;
      const topLimit = this.cameraBounds.y;

     const mapPlatforms: mapFloorConfig[] | any[] = [
      // {...basePlatformsConfig, pos: {x: this.startingPoint.x, y: this.startingPoint.y + 100}},
      {...ObstacleFloorConf, pos: {x: 800, y: topLimit}, large: 4},
      {...ObstacleFloorConf, pos: {x: 1200, y: (bottomLimit - (4 * ObstacleFloorConf.height * 0.7))}, large: 4},
      {...baseCristalConf, pos: {x: 1300, y: (bottomLimit - (4 * ObstacleFloorConf.height * 0.7)) - 200}},
      {...ObstacleFloorConf, pos: {x: 1600, y: topLimit}, large: 4},
      {...ObstacleFloorConf, pos: {x: 2000, y: (bottomLimit - (3 * ObstacleFloorConf.height * 0.7))}, large: 3},
      {...ObstacleFloorConf, pos: {x: 2400, y: topLimit}, large: 5},
      {...baseCristalConf, pos: {x: 2100, y: 300}},
      {...baseCristalConf, pos: {x: 2100, y: 500}},
      {...baseCristalConf, pos: {x: 2500, y: topLimit + 200 + (ObstacleFloorConf.height * 0.7 * 5)}},
      {...ObstacleFloorConf, pos: {x: 2800, y: topLimit}, large: 3},
      {...ObstacleFloorConf, pos: {x: 2800, y: (bottomLimit - (6 * ObstacleFloorConf.height * 0.7))}, large: 6},
      {...baseCristalConf, pos: {x: 3100, y: 300}},
      {...ObstacleFloorConf, pos: {x: 3200, y: topLimit}, large: 4},
      {...ObstacleFloorConf, pos: {x: 3200, y: (bottomLimit - (5 * ObstacleFloorConf.height * 0.7))}, large: 5},
      {...ObstacleFloorConf, pos: {x: 3600, y: topLimit}, large: 5},
      {...ObstacleFloorConf, pos: {x: 3600, y: (bottomLimit - (4 * ObstacleFloorConf.height * 0.7))}, large: 4},
      {...ObstacleFloorConf, pos: {x: 4000, y: topLimit}, large: 6},
      {...ObstacleFloorConf, pos: {x: 4000, y: (bottomLimit - (3 * ObstacleFloorConf.height * 0.7))}, large: 3},
      {...ObstacleFloorConf, pos: {x: 4400, y: topLimit}, large: 5},
      {...ObstacleFloorConf, pos: {x: 4400, y: (bottomLimit - (4 * ObstacleFloorConf.height * 0.7))}, large: 4},
      {...ObstacleFloorConf, pos: {x: 4800, y: topLimit}, large: 6},
      { type: "subPortal",  x: 4800, y:  this.cameraBounds.height-100, version: 1, sameScene: false, group: this.teleport, otherSceneConf: backToLvl1Conf },
      // { type: "subPortal",  x: 500, y:  this.cameraBounds.height-100, version: 1, sameScene: false, group: this.teleport, otherSceneConf: backToLvl1Conf },


      // {...ObstacleFloorConf, pos: {x: 800, y: topLimit}, large: 4},
      // {...ObstacleFloorConf, pos: {x: 800, y: topLimit}, large: 4},

     ]
    this.preCreateItems = mapPlatforms;
  }

    createMap(data: { level: number; lifes: number }) {
      const { width, height } = this.ratioReference;
    const { width: farWidth, height: farHeight } = this.farBackgroundReference;
    const downScaledMiddleWidth = width * 0.7;
    const downScaledFrontWidth = width * 0.5;
    this.loseConfig=[
      { positions: { x: this.startingPoint.x , y: this.startingPoint.y },
        cameraDirection: "NORMAL",
        PlayerDirection: "NORMAL",
        gravityDown: true
        ,
      },
    ]
      

    this.backgroundsBack = [
      // this.scene.add.image((this.scene.cameras.getCamera("backgroundCamera")?.width ?? 0) / 2, (this.scene.cameras.getCamera("backgroundCamera")?.height ?? 0) / 2, "backComboSub").setOrigin(0.5).setScale(0.6),
    //   this.scene.add.image(0, 0, "stars").setOrigin(0.5),
    //   this.scene.add.image(0, 0, "curvedVector").setOrigin(0.5),
    ]
    
    this.backgroundsMiddle = this.createBgRow(200, this.worldSize.height/2, ["backComboSub"], width, 1.3, 0.5),
    
    this.backgroundsFront = [
        ...this.createBgRow(200, this.cameraBounds.height+200, ["front_bottom", "front_bottom2", "front_bottom3", "front_bottom4"], width, 1.2),
        ...this.createBgRow(200, 200, ["front_top", "front_top2", "front_top3", "front_top4"], width, 1.2, 0),

    //   this.scene.add.image(-this.startingPoint.x, this.cameraBounds.height+200, "frontCombo").setOrigin(0, 1).setScale(0.5),
    //   this.scene.add.image(-this.startingPoint.x + downScaledFrontWidth, this.cameraBounds.height+200, "frontCombo2").setOrigin(0, 1).setScale(0.5),
    //   this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 2), this.cameraBounds.height+200, "frontCombo3").setOrigin(0, 1).setScale(0.5),
    //   this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 3), this.cameraBounds.height+200, "frontCombo4").setOrigin(0, 1).setScale(0.5),
    //   this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 4), this.cameraBounds.height+200, "frontCombo2").setOrigin(0, 1).setScale(0.5),
    //   this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 5), this.cameraBounds.height+200, "frontCombo2").setOrigin(0, 1).setScale(0.5),
    ]
    
    this.createBackgrounds(this.backgroundsBack, this.backgroundsMiddle, this.backgroundsFront);
    
    const bgContainer = this.scene.add.container(0, 0, this.backgroundsBack);
    this.scene.UICamera?.ignore(bgContainer);
    // this.scene.UICamera?.ignore(this.backgroundsBack[0]);
    this.scene.cameras.main.ignore(bgContainer);
    // this.scene.cameras.main.ignore(this.backgroundsBack[0]);

  
      // this.scene.UICamera?.ignore(this.mapContainer);
      this.scene.UICamera?.ignore(this.frontContainer);
      this.scene.player?.setDepth(999);

      

      this.createPlatforms(this.preCreateItems)
      this.cameraIgnore()
    }

    update() {
      
    //   if (this.scene.player)
    //     this.animateBackground();
    }
}