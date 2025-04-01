import Player from "@/game/assets/Player";
import { GamePlayDataType, loseConfigFromMapType } from "@/game/Types";
import Game from "@/game/Game";
import Teleport from "@/game/assets/Teleport";


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
    nextScene: string | undefined = "postal1_planeta1";
    postalCode: string | undefined = "adjns";
    UIItemToGrab: string = "cristal3";
    UIItemScale?: number;
    collected: Boolean = false;
    rotate?: boolean = true;
    mapContainer?: Phaser.GameObjects.Container;
    frontContainer?: Phaser.GameObjects.Container;
      floor?: Phaser.Physics.Arcade.Group;
     pisosBack?: Phaser.Physics.Arcade.Group;
      gravityTile?: Phaser.Physics.Arcade.Group;
      rotationTile?: Phaser.Physics.Arcade.Group;
      coin?: Phaser.Physics.Arcade.Group;
      coinAura?: Phaser.GameObjects.Sprite;
      invencible?: Phaser.Physics.Arcade.Group;
      portal?: Phaser.Physics.Arcade.Group;
      teleport?: Phaser.Physics.Arcade.Group;
      aura?: Phaser.Physics.Arcade.Group;
      movingFloor?: Phaser.Physics.Arcade.Group;
      movingFloorRot?: Phaser.Physics.Arcade.Group;
      flyingPiso?: Phaser.Physics.Arcade.Group;
        firegroup?: Phaser.Physics.Arcade.Group;
      
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
        this.createMapGroups();
    }

    // createMap() {
    //     // Logic to create a new map
    // }

    animateBackground(midPoint: Phaser.Math.Vector2) {
        // Logic to save the current map using midPoint
    }

    createMapGroups() {
        this.floor = this.scene.physics.add.group({ allowGravity: false, immovable: true, collideWorldBounds: true });
        this.gravityTile = this.scene.physics.add.group({ allowGravity: false, immovable: true, collideWorldBounds: true });
        this.rotationTile = this.scene.physics.add.group({ allowGravity: false, immovable: true, collideWorldBounds: true });
    
        this.scene.UICamera?.ignore(this.floor)
        this.scene.UICamera?.ignore(this.gravityTile)
        this.scene.UICamera?.ignore(this.rotationTile)
        this.scene.UICamera?.ignore(this.scene.physics.world.debugGraphic);
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
          if (this.invencible) {
            this.scene.physics.add.overlap(
              this.scene.player,
              this.invencible,
              () => {
                if (!this.player?.invincible) {
                  this.player?.setPlayerInvicinible(true);
                  this.invencible?.setVisible(false);
                  this.scene.time.delayedCall(20000, () => {
                    this.player?.setPlayerInvicinible(false);
                    this.invencible?.setVisible(true);
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
        // if (this.scene.player) this.animateBackground(this.scene.player);
        if (this.player)
          this.animateBackground(this.scene.cameras.main.midPoint);
      }
}