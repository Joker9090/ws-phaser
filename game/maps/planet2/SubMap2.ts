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
      width: 10000,
      height: 1500,
    };
    this.cameraBounds = {
      x: 100,
      y: 100,
      width: 9800,
      height: 1300,
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

    this.player.setPlayerWithTank(true);
    this.player.isFlying = true;
  }

    createMap(data: { level: number; lifes: number }) {
      const { width, height } = this.ratioReference;
    const { width: farWidth, height: farHeight } = this.farBackgroundReference;
    const downScaledMiddleWidth = width * 0.7;
    const downScaledFrontWidth = width * 0.5;

      

    this.backgroundsBack = [
      // this.scene.add.image((this.scene.cameras.getCamera("backgroundCamera")?.width ?? 0) / 2, (this.scene.cameras.getCamera("backgroundCamera")?.height ?? 0) / 2, "backComboSub").setOrigin(0.5).setScale(0.6),
    //   this.scene.add.image(0, 0, "stars").setOrigin(0.5),
    //   this.scene.add.image(0, 300, "curvedVector").setOrigin(0.5),
    ]
    
    this.backgroundsMiddle = this.createBgRow(100, this.worldSize.height/2, ["backComboSub"], width, 0.8, 0.5),
    
    this.backgroundsFront = [
        ...this.createBgRow(100, this.cameraBounds.height+100, ["front_bottom", "front_bottom2", "front_bottom3", "front_bottom4"], width, 1.2),
        ...this.createBgRow(100, 100, ["front_top", "front_top2", "front_top3", "front_top4"], width, 1.2, 0),

    //   this.scene.add.image(-this.startingPoint.x, this.cameraBounds.height+100, "frontCombo").setOrigin(0, 1).setScale(0.5),
    //   this.scene.add.image(-this.startingPoint.x + downScaledFrontWidth, this.cameraBounds.height+100, "frontCombo2").setOrigin(0, 1).setScale(0.5),
    //   this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 2), this.cameraBounds.height+100, "frontCombo3").setOrigin(0, 1).setScale(0.5),
    //   this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 3), this.cameraBounds.height+100, "frontCombo4").setOrigin(0, 1).setScale(0.5),
    //   this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 4), this.cameraBounds.height+100, "frontCombo2").setOrigin(0, 1).setScale(0.5),
    //   this.scene.add.image(-this.startingPoint.x + (downScaledFrontWidth * 5), this.cameraBounds.height+100, "frontCombo2").setOrigin(0, 1).setScale(0.5),
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
     const mapPlatforms: mapFloorConfig[] = []

      this.createPlatforms(mapPlatforms)
      this.cameraIgnore()
    }

    update() {
    //   if (this.scene.player)
    //     this.animateBackground();
    }
}