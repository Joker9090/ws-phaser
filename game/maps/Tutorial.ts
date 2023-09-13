import Phaser from "phaser";
import Floor, { FloorConfig } from "../assets/Floor";
import LargeFloor, { LargeFloorConfig } from "../assets/LargeFloor";
import UIScene from "../UIScene";
import Game from "../Game";

// Scene in class
class Tutorial {
  isJumping = false;
  debugGraphics: Phaser.GameObjects.Graphics;
  scene: Game;
  worldSize = {
    width: 5000,
    height: 2500,
  };
  pisos?: Phaser.Physics.Arcade.Group;
  fireballTextActivator?: Floor;
  pisos2?: Phaser.Physics.Arcade.Group;
  pisos3?: Phaser.Physics.Arcade.Group;
  coin?: Phaser.Physics.Arcade.Group;
  aura?: Phaser.Physics.Arcade.Group;
  portal?: Phaser.Physics.Arcade.Group;
  lifesGroup?: Phaser.GameObjects.Group;
  fireballAct?: Phaser.Physics.Arcade.Group;
  changer?: Phaser.GameObjects.Image;
  portalInit?: Phaser.Physics.Arcade.Group;
  fireballGroup?: Phaser.Physics.Arcade.Group;
  lifesQty?: number;
  startingPoint = {
    x: 600, //600
    y: 1800, //1800
  };
  checkPointPos = {
    x: 600,
    y: 1800,
  };
  background: Phaser.GameObjects.Image;
  background2: Phaser.GameObjects.Image;
  background3: Phaser.GameObjects.Image;
  background4: Phaser.GameObjects.Image;
  background5: Phaser.GameObjects.Image;
  background6: Phaser.GameObjects.Image;
  // background7: Phaser.GameObjects.Image;
  // background8: Phaser.GameObjects.Image;

  sideGrav: boolean = false;
  UIScene: UIScene;
  tutorialState: number = 1;
  timedEvent?: Phaser.Time.TimerEvent;
  previewCamara?: Phaser.Cameras.Scene2D.Camera;
  pisoFloat?: Floor;
  pisoCoin?: Floor;
  pisoNoFloat?: Floor;

  constructor(scene: Game) {
    this.scene = scene;
    this.UIScene = this.scene.game.scene.getScene("UIScene") as UIScene;
    /* World size*/
    this.scene.physics.world.setBounds(
      0,
      0,
      this.worldSize.width,
      this.worldSize.height
    );

    /* Debug */
    this.debugGraphics = this.scene.add.graphics();
    this.debugGraphics.fillStyle(0x00ff00, 0.5);
    this.debugGraphics.fillRect(
      0,
      0,
      this.worldSize.width,
      this.worldSize.height
    );
    /* Debug */

    this.background = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "newBg1")
      .setOrigin(0.5, 0.5).setScale(1.8);
    this.background2 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "newBg2")
      .setOrigin(0.5, 0.5).setScale(1.8);
    this.background3 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "newBg3")
      .setOrigin(0.5, 0.5).setScale(1.8);
    this.background4 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "newBg4")
      .setOrigin(0.5, 0.5).setScale(1.8);
    this.background5 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "newBg5")
      .setOrigin(0.5, 0.5).setScale(1.8);
    this.background6 = this.scene.add
      .image(this.startingPoint.x, this.startingPoint.y, "newBg6")
      .setOrigin(0.5, 0.5).setScale(1.8);
  }
  // scaleBg() {
  //   if (this.scene.cameras.main.displayWidth > 2000) {
  //     this.background.displayHeight = this.scene.cameras.main.displayHeight * 1.6
  //     this.background.displayWidth = this.scene.cameras.main.displayWidth * 1.6
  //     this.background2.displayHeight = this.scene.cameras.main.displayHeight * 1.6
  //     this.background2.displayWidth = this.scene.cameras.main.displayWidth * 1.6
  //     this.background3.displayHeight = this.scene.cameras.main.displayHeight * 1.6
  //     this.background3.displayWidth = this.scene.cameras.main.displayWidth * 1.6
  //     this.background4.displayHeight = this.scene.cameras.main.displayHeight * 1.6
  //     this.background4.displayWidth = this.scene.cameras.main.displayWidth * 1.6
  //     this.background5.displayHeight = this.scene.cameras.main.displayHeight * 1.6
  //     this.background5.displayWidth = this.scene.cameras.main.displayWidth * 1.6
  //     this.background6.displayHeight = this.scene.cameras.main.displayHeight * 1.6
  //     this.background6.displayWidth = this.scene.cameras.main.displayWidth * 1.6

  //   }
  // }
  animateBackground(player: Phaser.GameObjects.Sprite) {
    const { x, y } = this.startingPoint;
    const { x: x2, y: y2 } = player;
    const calcDiffX = (x2 - x) / 1//mas grande menos movimiento
    const calcDiffY = (y2 - y - this.scene.cameras.main.displayHeight / 6) / 1.3;
    this.background.setPosition(x + calcDiffX, y + calcDiffY);
    this.background2.setPosition(x + calcDiffX, y + calcDiffY);
    this.background3.setPosition(x + calcDiffX, y + calcDiffY);
    this.background4.setPosition(x + calcDiffX, y + calcDiffY);
    this.background5.setPosition(x + calcDiffX, y + calcDiffY);
    this.background6.setPosition(x + calcDiffX, y + calcDiffY);
    // this.background7.setPosition(x + calcDiffX, y + calcDiffY);
    // this.background8.setPosition(x + calcDiffX, y + calcDiffY);
  }

  createMap(data: { level: number; lifes: number }) {
    this.pisos = this.scene.physics.add.group({ allowGravity: false });
    this.pisos2 = this.scene.physics.add.group({ allowGravity: false });
    this.pisos3 = this.scene.physics.add.group({ allowGravity: false });
    this.coin = this.scene.physics.add.group({ allowGravity: false });
    this.aura = this.scene.physics.add.group({ allowGravity: false, immovable: true })
    this.portal = this.scene.physics.add.group({ allowGravity: false });
    this.fireballGroup = this.scene.physics.add.group({ allowGravity: false });
    this.portalInit = this.scene.physics.add.group({ allowGravity: false });
    this.fireballAct = this.scene.physics.add.group({ allowGravity: false });
    const aura = this.scene.add.sprite(1500, 450, "auraTuto").setScale(0.6)
    this.aura.add(aura)
    this.scene.tweens.add({
      targets: aura,
      alpha: 0.4,
      duration: 1000,
      yoyo: true,
      repeat: -1
    })
    /* Platforms */
    const p0Config: LargeFloorConfig = {
      textureA: "plataformaLarga2",
      textureB: "plataformaLarga2",
      large: 10,
      pos: { x: 500, y: 2000 },
      scale: { width: 0.7, height: 0.7 },
      rotated: false,
      gap: 0,
      fix: 0,
    };
    const p0 = new LargeFloor(this.scene, p0Config, this.pisos);
    /*
    const debugConfig: LargeFloorConfig = {
      textureA: "plataformaA",
      textureB: "plataformaB",
      large: 1,
      pos: { x: 800, y: 1970, },
      scale: { width: 0.7, height: 0.7, },
      rotated: false
    };
    const debug = new LargeFloor(this.scene, debugConfig, this.pisos);
    */
    const p1Config: LargeFloorConfig = {
      textureA: "plataformaLarga2",
      textureB: "plataformaLarga2",
      large: 1,
      pos: { x: 1000, y: 1820 },
      scale: { width: 0.7, height: 0.7 },
      rotated: false,
      gap: 0,
      fix: 0
    };
    const p1 = new LargeFloor(this.scene, p1Config, this.pisos);

    const p2Config: LargeFloorConfig = {
      textureA: "plataformaLarga2",
      textureB: "plataformaLarga2",
      large: 2,
      pos: { x: 1300, y: 1700 },
      scale: { width: 0.7, height: 0.7 },
      rotated: false,
      gap: 0,
      fix: 0,
    };
    const p2 = new LargeFloor(this.scene, p2Config, this.pisos);

    const p3Config: FloorConfig = {
      texture: "plataformaB",
      pos: { x: 1940, y: 1580 },
      scale: { width: 0.9, height: 0.7 },
    };
    this.pisoFloat = new Floor(this.scene, p3Config, this.pisos2).setTint(
      Phaser.Display.Color.GetColor(255, 101, 0)
    );
    this.pisoFloat.hasEvent = "Show_Tutorial_Text_1";

    const p4Config: LargeFloorConfig = {
      textureA: "plataformaLarga2",
      textureB: "plataformaLarga2",
      large: 2,
      pos: { x: 1600, y: 400 },
      scale: { width: 0.7, height: 0.7 },
      rotated: false,
      gap: 0,
      fix: 0,
    };
    const p4 = new LargeFloor(this.scene, p4Config, this.pisos);

    const p5Config: FloorConfig = {
      texture: "plataformaB",
      pos: { x: 2250, y: 250 },
      scale: { width: 0.7, height: 0.7 },
    };
    this.pisoNoFloat = new Floor(this.scene, p5Config, this.pisos3).setTint(
      Phaser.Display.Color.GetColor(255, 101, 0)
    );
    this.pisoNoFloat.hasEvent = "Show_Tutorial_Text_3";

    /* Portal, Coin, Fireball and Asteroids */

    const portalConfig: FloorConfig = {
      texture: "portal",
      pos: { x: 3250, y: 1875 },
      scale: { width: 0.1, height: 0.1 },
      width: 1000,
      height: 1500,
    };

    const port = new Floor(this.scene, portalConfig, this.portal).setSize(
      800,
      1400
    );

    const fireballConfig: FloorConfig = {
      texture: "fireball",
      pos: { x: 2850, y: 1875 }, // 500 1580
      scale: { width: 0.2, height: 0.2 },
      width: 400,
      height: 400,
      fix: 250,
      tween: {
        duration: 800,
        paused: false,
        yoyo: true,
        repeat: -1,
        y: "-=200",
      },
    };
    const fireball = new Floor(this.scene, fireballConfig, this.fireballGroup)
      .setAngularVelocity(30)
      .setOffset(220, 100);

    const coinConfig: FloorConfig = {
      texture: "coin",
      pos: { x: 1500, y: 450 },
      scale: { width: 0.15, height: 0.15 },
      width: 10,
      height: 18,
      fix: 10,
    };
    this.pisoCoin = new Floor(this.scene, coinConfig, this.coin).setBodySize(140, 180);
    this.pisoCoin.hasEvent = "Show_Tutorial_Text_2";

    const fireballTextConfig: FloorConfig = {
      texture: "coin",
      pos: { x: 2750, y: 1885 },
      scale: { width: 0.1, height: 0.1 },
      width: 450,
      height: 600,
      fix: 100,
    };
    this.fireballTextActivator = new Floor(
      this.scene,
      fireballTextConfig,
      this.fireballAct
    ).setVisible(false);
    this.fireballTextActivator.hasEvent = "Show_Tutorial_Text_4";
  }

  fireballActFunction() { }

  addColliders() {
    if (this.scene.monchi) {
      if (this.fireballGroup && this.scene.loseLevelTutorial)
        this.scene.physics.add.collider(
          this.scene.monchi,
          this.fireballGroup,
          this.scene.loseLevelTutorial,
          () => true,
          this.scene
        );
      if (this.portal) this.portal.setTint(0xff0000);
      if (this.fireballAct && this.scene.fireballActFun)
        this.scene.physics.add.overlap(
          this.scene.monchi,
          this.fireballAct,
          this.scene.fireballActFun,
          () => true,
          this.scene
        );
      if (this.pisos && this.scene.touch)
        this.scene.physics.add.collider(
          this.scene.monchi,
          this.pisos,
          this.scene.touch,
          () => true,
          this.scene
        );
      if (this.pisos2 && this.scene.float)
        this.scene.physics.add.collider(
          this.scene.monchi,
          this.pisos2,
          (a, b) => this.scene.float(a, b, 500),
          () => true,
          this.scene
        );
      if (this.pisos3 && this.scene.noFloatTutorial)
        this.scene.physics.add.collider(
          this.scene.monchi,
          this.pisos3,
          this.scene.noFloatTutorial,
          () => true,
          this.scene
        );
      if (this.coin && this.scene.coinCollected)
        this.scene.physics.add.overlap(
          this.scene.monchi,
          this.coin,
          this.scene.coinCollected,
          () => true,
          this.scene
        );
      if (this.portal && this.scene.winTutorial)
        this.scene.physics.add.overlap(
          this.scene.monchi,
          this.portal,
          this.scene.winTutorial,
          () => true,
          this.scene
        );
    }
  }

  showMap() {
    if (this.tutorialState == 0) {
      this.scene.cameras.main.pan(
        2500,
        1800,
        5000,
        "Linear",
        false,
        (camera, progress) => {
          this.background.scrollFactorX = 0.2;
          if (progress == 1) {
            this.tutorialState += 1;
            this.background.scrollFactorX = 1;
          }
        },
        this.scene
      );
    }
  }

  update() {
    this.showMap();
    // if (this) this.scaleBg()
    if (this.tutorialState == 1) {
      if (this) {
        if (this.scene.monchi) {
          this.scene.monchi.checkMove(this.scene.cursors);
          if (this) this.animateBackground(this.scene.monchi);

        }
      }
    }
  }
}

export default Tutorial;
