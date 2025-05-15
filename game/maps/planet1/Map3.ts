import MapCreator from "../sandbox/MapCreator";
import Player from "@/game/assets/Player";
import { GamePlayDataType } from "@/game/Types";
import Game from "@/game/Game";
import { group } from "console";
import colors from "@/game/assets/PlatformColors";

export default class Map3 extends MapCreator {
  constructor(scene: Game, player: Player, data?: GamePlayDataType) {
    super(scene, player, data);
    this.scene = scene;
    this.player = player;

    this.worldSize = {
      width: 12400,
      height: 3000,
    };
    this.cameraBounds = {
      x: 200,
      y: 200,
      width: 12000,
      height: 2600,
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
      y: this.cameraBounds.height - 600,
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

    this.player.setPlayerWithTank(true);
    this.nextScene="cine_movie_1";
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
      this.scene.add.image(0, 0, "gradient").setOrigin(0.5),
      this.scene.add.image(0, 0, "stars").setOrigin(0.5),
      this.scene.add.image(0, 300, "curvedVector").setOrigin(0.5),
    ]
    
    this.backgroundsMiddle = this.createBgRow(200, this.cameraBounds.height+200, ["middleCombo", "middleCombo2", "middleCombo3", "middleCombo4"], width, 0.7),
    
    this.backgroundsFront = [
      this.scene.add.image(-this.startingPoint.x, this.cameraBounds.height+200, "frontCombo").setOrigin(0, 1).setScale(0.5),
      this.scene.add.image(-this.startingPoint.x + downScaledFrontWidth, this.cameraBounds.height+200, "frontCombo2").setOrigin(0, 1).setScale(0.5),
      this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 2), this.cameraBounds.height+200, "frontCombo3").setOrigin(0, 1).setScale(0.5),
      this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 3), this.cameraBounds.height+200, "frontCombo4").setOrigin(0, 1).setScale(0.5),
      this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 4), this.cameraBounds.height+200, "frontCombo2").setOrigin(0, 1).setScale(0.5),
      this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 5), this.cameraBounds.height+200, "frontCombo2").setOrigin(0, 1).setScale(0.5),
    ]
    
    this.createBackgrounds(this.backgroundsBack, this.backgroundsMiddle, this.backgroundsFront);
    
    const bgContainer = this.scene.add.container(0, 0, this.backgroundsBack);
    this.scene.UICamera?.ignore(bgContainer);
    this.scene.cameras.main.ignore(bgContainer);
  
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

      const baseDangerConf = {
        type: "danger",
        texture: "Enemy",
        scale: { width: 0.6, height: 0.6 },
        width: 170,
        height: 170,
        attackSpriteSheet: "EnemyAttack",
        particleSpriteSheet: "EnemyParticles",
        group: this.obstacle,
        color: 0x00feff,
      }

      const baseFireballConf = {
        type: "fireball",
        spriteSheet: "meteorito",
        texture: "meteorito",
        width: 100,
        height: 100,
        group: this.firegroup,
        scale: { width: 0.5, height: 0.5 },
      }

      const baseCristalConf = {
        type: "collectable",
        texture: "cristal3",
        scale: { width: 0.7, height: 0.7 },
        width: 140,
        height: 180,
        fix: 10,
        group: this.coin,
        aura: 'auraTuto',
        auraColor:0x00feff,
      }

      const mapFloor =  (this.cameraBounds.height + this.cameraBounds.y); 
      const mapLeft = this.cameraBounds.x;
  
      const mapPlatforms = [
        {
          ...baseLargePlatformsConf,
          pos: { x: mapLeft, y: mapFloor - 100 },
          large: 10,
          group: this.floor
        },
        { ...baseCristalConf, pos: { x: 1300, y: mapFloor - 600 }},
        {
          ...basePlatformsConfig, pos: { x: 1300, y: mapFloor - 400 }, animation: {
            xAxis: {
              xDistance: 400,
              xVel: 100
            }
          }
        },
        { ...basePlatformsConfig, pos: { x: 1900, y: mapFloor - 600 } },
        { ...basePlatformsConfig, pos: { x: 2300, y: mapFloor - 600 }, group: this.fallingTile, colors: [colors.falling],  },
        {
          ...baseDangerConf, pos: { x: 2700, y: mapFloor - 600 }, patrol: {
            patrolType: "LinealY",
            distance: 100,
            speed: 200,
            attackInterval: 2,
          }
        },
        { ...baseCristalConf, pos: { x: 2800, y: mapFloor - 400 }},
        {
          ...baseLargePlatformsConf,
          pos: { x: 2800, y: mapFloor - 200 },
          large: 8,
          group: this.floor
        },
        { ...baseFireballConf, pos: { x: 3900, y:  0 }, tween: { duration: 3000, repeat: -1, y: "+=3000"}, rotated: false },
        { ...basePlatformsConfig, pos: { x: 4200, y: mapFloor-200 } },
        { ...baseFireballConf, pos: { x: 4500, y:  0 }, tween: { duration: 3000, repeat: -1, y: "+=3000"}, rotated: false },
        { ...basePlatformsConfig, pos: { x: 4800, y: mapFloor-600 }, animation: {
          yAxis: {
            yDistance: 300,
            yVel: 100
          }
        } },
        { ...baseCristalConf, pos: { x: 4950, y: mapFloor - 800 }},
        { ...basePlatformsConfig, pos: { x: 5100, y: mapFloor-1000 }, animation: {
          yAxis: {
            yDistance: 300,
            yVel: 100
          }
        } },
        { ...baseCristalConf, pos: { x: 5250, y: mapFloor - 1200 }},
        { ...basePlatformsConfig, pos: { x: 5400, y: mapFloor-1400 }, animation: {
          yAxis: {
            yDistance: 300,
            yVel: 100
          }
        } },
        { ...baseCristalConf, pos: { x: 5700, y: mapFloor-1600 }},
        { ...basePlatformsConfig, pos: { x: 5700, y: mapFloor-1400 } },
        { ...basePlatformsConfig, pos: { x: 6000, y: mapFloor-1400 }, group: this.fallingTile, colors: [colors.falling],  },
        { ...baseCristalConf, pos: { x: 6150, y: mapFloor-1600 }},
        { ...basePlatformsConfig, pos: { x: 6300, y: mapFloor-1400 }, group: this.fallingTile, colors: [colors.falling],  },
        { ...baseCristalConf, pos: { x: 6450, y: mapFloor-1600 }},
        { ...basePlatformsConfig, pos: { x: 6600, y: mapFloor-1400 }, group: this.fallingTile, colors: [colors.falling],  },
        {
          ...baseLargePlatformsConf,
          pos: { x: 6900, y: mapFloor - 1400 },
          large: 5,
          group: this.floor,
          withTextureToAbove: false,
        },
        {
          ...baseDangerConf, pos: { x: 7600, y: mapFloor - 1300 }, patrol: {
            patrolType: "LinealY",
            distance: 400,
            speed: 300,
          }
        },
        {
          ...baseDangerConf, pos: { x: 7900, y: mapFloor - 1300 }, patrol: {
            patrolType: "LinealY",
            distance: 400,
            speed: 300,
          }
        },
        { ...basePlatformsConfig, pos: { x: 8200, y: mapFloor - 1000 }, animation: {
          yAxis: {
            yDistance: 300,
            yVel: 100
          }
        } },
        { ...baseCristalConf, pos: { x: 8300, y: mapFloor - 800 }},
        {
          ...baseLargePlatformsConf,
          pos: { x: 8400, y: mapFloor - 600 },
          large: 7,
          group: this.floor,
        },
        { ...basePlatformsConfig, pos: { x: 9300, y: mapFloor - 600 }, group: this.fallingTile, colors: [colors.falling],  },
        {
          ...baseDangerConf, pos: { x: 9500, y: mapFloor - 600 }, patrol: {
            patrolType: "LinealY",
            distance: 100,
            speed: 200,
            attackInterval: 2,
          }
        },
        { ...basePlatformsConfig, pos: { x: 9700, y: mapFloor - 600 }, group: this.fallingTile, colors: [colors.falling],  },
        {
          ...baseDangerConf, pos: { x: 9900, y: mapFloor - 600 }, patrol: {
            patrolType: "LinealY",
            distance: 100,
            speed: 200,
            attackInterval: 2,
          }
        },
        { ...basePlatformsConfig, pos: { x: 10100, y: mapFloor - 600 }, group: this.fallingTile, colors: [colors.falling],  },
        { ...basePlatformsConfig, pos: { x: 10500, y: mapFloor - 600 } },
        { ...basePlatformsConfig, pos: { x: 11100, y: mapFloor - 600 }, animation: {
          xAxis: {
            xDistance: 500,
            xVel: 100
          }
        } },
        { ...baseCristalConf, pos: { x: 11400, y: mapFloor - 700 }},
        {
          ...baseLargePlatformsConf,
          pos: { x: 11600, y: mapFloor - 500 },
          large: 8,
          group: this.floor,
        },
        { type: "finalPortal", pos: { x: 12100, y: (this.cameraBounds.height + this.cameraBounds.y) - 670 }, texture: "plataformaFinalP1", width: 100, height: 100, group: this.portal }
      ]

      this.createPlatforms(mapPlatforms)
      this.cameraIgnore()
    }

    update() {
      if (this.scene.player)
        this.animateBackground();
    }
}