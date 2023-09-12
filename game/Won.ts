import Phaser from "phaser";
import MusicManager from "./MusicManager";
import BetweenScenes, { BetweenScenesStatus } from "./BetweenScenes";

export default class WonScene extends Phaser.Scene {
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  container?: Phaser.GameObjects.Container;
  background?: Phaser.GameObjects.Image;
  background2?: Phaser.GameObjects.Image;
  background3?: Phaser.GameObjects.Image;
  background4?: Phaser.GameObjects.Image;
  background5?: Phaser.GameObjects.Image;
  background6?: Phaser.GameObjects.Image;
  constructor() {
    super({ key: "Won" });
  }

  init() {
    this.cursors = this.input.keyboard?.createCursorKeys();
  }

  /*Debug
    preload() {
        this.load.image("background", "game/background.png");
    };
    */

  scaleBg() {
    if (this.cameras.main.displayWidth > 2000 && this.background && this.background2 && this.background3 && this.background4 && this.background5 && this.background6) {
      this.background.displayHeight = this.cameras.main.displayHeight * 1.6
      this.background.displayWidth = this.cameras.main.displayWidth * 1.6
      this.background2.displayHeight = this.cameras.main.displayHeight * 1.6
      this.background2.displayWidth = this.cameras.main.displayWidth * 1.6
      this.background3.displayHeight = this.cameras.main.displayHeight * 1.6
      this.background3.displayWidth = this.cameras.main.displayWidth * 1.6
      this.background4.displayHeight = this.cameras.main.displayHeight * 1.6
      this.background4.displayWidth = this.cameras.main.displayWidth * 1.6
      this.background5.displayHeight = this.cameras.main.displayHeight * 1.6
      this.background5.displayWidth = this.cameras.main.displayWidth * 1.6
      this.background6.displayHeight = this.cameras.main.displayHeight * 1.6
      this.background6.displayWidth = this.cameras.main.displayWidth * 1.6

    }
  }

  create(this: WonScene, data: { text: string }) {
    /* Audio */
    const getMusicManagerScene = this.game.scene.getScene(
      "MusicManager"
    ) as MusicManager;
    if (!getMusicManagerScene.scene.isActive())
      this.scene.launch("MusicManager").sendToBack();
    else {
      getMusicManagerScene.playMusic("songWon");
    }
    this.scaleBg()
    this.container = this.add.container(0, 0).setDepth(999);

    this.physics.world.setBounds(0, 0, 5000, 2500);
    this.background = this.add
      .image(this.cameras.main.displayWidth / 2, this.cameras.main.displayHeight / 2, "newBg1")
      .setOrigin(0.5, 0.5).setScale(1);
    this.background2 = this.add
      .image(this.cameras.main.displayWidth / 2, this.cameras.main.displayHeight / 2, "newBg2")
      .setOrigin(0.5, 0.5).setScale(1);
    this.background3 = this.add
      .image(this.cameras.main.displayWidth / 2, this.cameras.main.displayHeight / 2, "newBg3")
      .setOrigin(0.5, 0.5).setScale(1);
    this.background4 = this.add
      .image(this.cameras.main.displayWidth / 2, this.cameras.main.displayHeight / 2, "newBg4")
      .setOrigin(0.5, 0.5).setScale(1);
    this.background5 = this.add
      .image(this.cameras.main.displayWidth / 2, this.cameras.main.displayHeight / 2, "newBg5")
      .setOrigin(0.5, 0.5).setScale(1);
    this.background6 = this.add
      .image(this.cameras.main.displayWidth / 2, this.cameras.main.displayHeight / 2, "newBg6")
      .setOrigin(0.5, 0.5).setScale(1);
    const text1 = this.add
      .text(0, 0, data.text, { fontSize: "35px" })
      .setOrigin(0.5)
      .setScale(1);
    const text2 = this.add
      .text(0, 200, "Press SPACE to go to Menu", { fontSize: "22px" })
      .setOrigin(0.5)
      .setScale(1);
    this.container?.add([text1, text2]);
  }
  makeTransition(sceneName: string, data: any) {
    const getBetweenScenesScene = this.game.scene.getScene(
      "BetweenScenes"
    ) as BetweenScenes;
    if (getBetweenScenesScene) {
      if (getBetweenScenesScene.status != BetweenScenesStatus.IDLE)
        return false;
      getBetweenScenesScene.changeSceneTo(sceneName, data);
      this.time.delayedCall(1000, () => {
        this.scene.stop();
      });
    } else {
      this.scene.start(sceneName, data);
      this.time.delayedCall(1000, () => {
        this.scene.stop();
      });
    }
  }
  update() {
    if (this.container) {
      if (this.cameras.main) {
        this.container.setPosition(
          this.cameras.main.width / 2,
          this.cameras.main.height / 3
        );
        if (this.cameras.main.width < this.cameras.main.height) {
          this.container.setScale(
            this.cameras.main.width / this.cameras.main.height
          );
        }
      }
    }
    if (this.cursors) {
      const space = this.cursors.space;
      /*Space*/
      space.on("down", () => {
        this.makeTransition("Menu", {});
      });
    }
  }
}
