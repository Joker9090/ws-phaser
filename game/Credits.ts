import Phaser from "phaser";
import PictureCredits from "./assets/PictureCredits";
import EventsCenter from "./EventsCenter";
import TextBox from "./assets/TextBox";
import BetweenScenes, { BetweenScenesStatus } from "./BetweenScenes";

export default class Credits extends Phaser.Scene {
  /* map */
  // background?: Phaser.GameObjects.Image;
  picture1?: Phaser.GameObjects.Container;
  picture2?: Phaser.GameObjects.Container;
  picture3?: Phaser.GameObjects.Container;
  spaceship?: Phaser.GameObjects.Image;
  /* controls */
  EscKeyboard?: Phaser.Input.Keyboard.Key;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  personTextBox1?: TextBox;
  personTextBox2?: TextBox;
  personTextBox3?: TextBox;
  background?: Phaser.GameObjects.Image;
  background2?: Phaser.GameObjects.Image;
  background3?: Phaser.GameObjects.Image;
  background4?: Phaser.GameObjects.Image;
  background5?: Phaser.GameObjects.Image;
  background6?: Phaser.GameObjects.Image;
  constructor() {
    super({ key: "Credits" });



  }

  init() {
    this.cursors = this.input.keyboard?.createCursorKeys();
  }
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
  preload() {
    this.load.image("backgroundLevelMap", "game/backgroundLevelMap.png");
    this.load.image("spaceship", "game/spaceship.png");
    this.load.image("pictureBox", "game/pictureCredits.png");
    this.load.image("ari", "game/ari.png");
    this.load.image("flor", "game/flor.png");
    this.load.image("barto", "game/barto.png");
    this.load.image("textBox", "game/textBox.png");
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

  create() {
    /* Controls */
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
    this.scaleBg()
    this.tweens.add({
      targets: this.background,
      yoyo: true,
      repeat: -1,
      x: "+=10",
      y: "-=10",
      duration: 3000
    }); this.tweens.add({
      targets: this.background2,
      yoyo: true,
      repeat: -1,
      x: "+=10",
      y: "-=10",
      duration: 3000
    }); this.tweens.add({
      targets: this.background3,
      yoyo: true,
      repeat: -1,
      x: "+=10",
      y: "-=10",
      duration: 3000
    }); this.tweens.add({
      targets: this.background4,
      yoyo: true,
      repeat: -1,
      x: "+=10",
      y: "-=10",
      duration: 3000
    }); this.tweens.add({
      targets: this.background,
      yoyo: true,
      repeat: -1,
      x: "+=10",
      y: "-=10",
      duration: 3000
    })
    this.EscKeyboard = this.input.keyboard?.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC
    );
    const { width, height } = this.cameras.main;

    this.picture1 = new PictureCredits(
      this,
      width / 5,
      (height * 1.5) / 4,
      "ari",
      "pictureBox",
      0.15
    ).setDepth(99);
    this.picture2 = new PictureCredits(
      this,
      width / 2,
      (height * 1.5) / 4,
      "flor",
      "pictureBox",
      0.15
    ).setDepth(99);
    this.picture3 = new PictureCredits(
      this,
      (width * 4) / 5,
      (height * 1.5) / 4,
      "barto",
      "pictureBox",
      0.15
    ).setDepth(99);

    this.personTextBox1 = new TextBox(
      this,
      width / 5,
      (height * 3) / 4,
      "textBox",
      400
    )
      .setDepth(99)
      .setVisible(true);
    this.personTextBox1.setTextBox("Nano - Developer");
    this.personTextBox2 = new TextBox(
      this,
      width / 2,
      (height * 3) / 4,
      "textBox",
      400
    )
      .setDepth(99)
      .setVisible(true);
    this.personTextBox2.setTextBox("Flor - Graphics Designer");
    this.personTextBox3 = new TextBox(
      this,
      (width * 4) / 5,
      (height * 3) / 4,
      "textBox",
      400
    )
      .setDepth(99)
      .setVisible(true);
    this.personTextBox3.setTextBox("???? - Developer");

    this.physics.world.setBounds(0, 0, 5000, 2500);
    this.add
      .text(width / 2, height / 14, "CREDITS", {
        fontSize: "70px",
        fontFamily: "arcade",
        color: "#c3c5c3",
      })
      .setOrigin(0.5);
    this.add
      .text(
        width / 2,
        height - height / 10,
        "Press SPACE or ESC to go to Menu",
        { fontSize: "22px", fontFamily: "arcade", color: "#c3c5c3" }
      )
      .setOrigin(0.5);
    this.spaceship = this.add
      .image(-100, height + 100, "spaceship")
      .setDepth(9)
      .setRotation(0)
      .setScale(0.5)
      .setAlpha(0.5);
  }

  update() {
    this.picture1?.update();
    this.picture2?.update();
    this.picture3?.update();
    if (this.spaceship) {
      this.spaceship.x = this.spaceship.x + 0.8;
      this.spaceship.y = this.spaceship.y - 0.3;
      if (this.spaceship.x == this.cameras.main.width) {
        this.spaceship.x = -100;
        this.spaceship.y = this.cameras.main.height + 100;
      }
    }
    if (this.EscKeyboard)
      this.EscKeyboard.on("down", () => {
        EventsCenter.emit("gameOver", true);
        this.makeTransition("Menu", {});
        // this.scene.start("Menu");
      });
    if (this.cursors)
      this.cursors.space.on("down", () => {
        EventsCenter.emit("gameOver", true);
        this.makeTransition("Menu", {});
        //this.scene.start("Menu");
      });
  }
}
