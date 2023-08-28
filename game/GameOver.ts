import Phaser from "phaser";

import MusicManager from "./MusicManager";
import BetweenScenes, { BetweenScenesStatus } from "./BetweenScenes";

export default class GameOver extends Phaser.Scene {
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  container?: Phaser.GameObjects.Container;
  background?: Phaser.GameObjects.Image
  constructor() {
    super({ key: "GameOver" });
  }

  init() {
    this.cursors = this.input.keyboard?.createCursorKeys();
  }

  /*Debug
    preload() {
        this.load.image("background", "game/background.png");
    };
    */

  create(this: GameOver) {
    /* Audio */
    const getMusicManagerScene = this.game.scene.getScene(
      "MusicManager"
    ) as MusicManager;
    if (!getMusicManagerScene.scene.isActive())
      this.scene.launch("MusicManager").sendToBack();
    else {
      getMusicManagerScene.playMusic("songLose");
    }
    this.container = this.add.container(0, 0).setDepth(999);
    this.physics.world.setBounds(0, 0, 5000, 2500);
    this.add.image(900, 500, "background").setScale(0.7);
    const text1 = this.add
      .text(0, 0, "You've lost! Try again!", { fontSize: "32px" })
      .setOrigin(0.5)
      .setScale(1);
    const text2 = this.add
      .text(0, 200, "Press SPACE to play again", { fontSize: "22px" })
      .setOrigin(0.5)
      .setScale(1);
    this.container.add([text1, text2]);



    this.background = this.add
      .image(500, 800, "lvl1bg1")
      .setOrigin(0.5, 0.5)
      .setScale(8, 8);
    this.background = this.add
      .image(500, 800, "lvl1bg2")
      .setOrigin(0.5, 0.5)
      .setScale(8, 8);
    this.background = this.add
      .image(500, 800, "lvl1bg3")
      .setOrigin(0.5, 0.5)
      .setScale(8, 8);
    this.background = this.add
      .image(500, 800, "lvl1bg4")
      .setOrigin(0.5, 0.5)
      .setScale(8, 8);
    this.background = this.add
      .image(500, 800, "lvl1bg5")
      .setOrigin(0.5, 0.5)
      .setScale(8, 8);
    this.background = this.add
      .image(500, 800, "lvl1bg6")
      .setOrigin(0.5, 0.5)
      .setScale(8, 8);
    this.background = this.add
      .image(500, 800, "lvl1bg7")
      .setOrigin(0.5, 0.5)
      .setScale(8, 8);
    this.background = this.add
      .image(500, 800, "lvl1bg8")
      .setOrigin(0.5, 0.5)
      .setScale(8, 8);

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
        //this.scene.start("Menu");
        this.makeTransition("Menu", {});
      });
    }
  }
}
