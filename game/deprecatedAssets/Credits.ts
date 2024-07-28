import Phaser from "phaser";
import PictureCredits from "../assets/PictureCredits";
import EventsCenter from "../EventsCenter";
import TextBox from "../assets/TextBox";
import BetweenScenes, { BetweenScenesStatus } from "../BetweenScenes";

export default class Credits extends Phaser.Scene {
  /* map */
  // background?: Phaser.GameObjects.Image;
  picture1?: Phaser.GameObjects.Sprite;
  picture2?: Phaser.GameObjects.Sprite;
  picture3?: Phaser.GameObjects.Sprite;
  picture4?: Phaser.GameObjects.Sprite;

  person1?: Phaser.GameObjects.Sprite;
  person2?: Phaser.GameObjects.Sprite;
  person3?: Phaser.GameObjects.Sprite;
  person4?: Phaser.GameObjects.Sprite;

  text1?: Phaser.GameObjects.Text
  text2?: Phaser.GameObjects.Text
  text3?: Phaser.GameObjects.Text
  text4?: Phaser.GameObjects.Text

  text5?: Phaser.GameObjects.Text
  text6?: Phaser.GameObjects.Text
  text7?: Phaser.GameObjects.Text
  text8?: Phaser.GameObjects.Text
  spaceship?: Phaser.GameObjects.Image;
  /* controls */
  EscKeyboard?: Phaser.Input.Keyboard.Key;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  personTextBox1?: TextBox;
  personTextBox2?: TextBox;
  personTextBox3?: TextBox;
  personTextBox4?: TextBox;
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
    this.load.image("j", "game/J.png");
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
      x: "+=3",
      y: "-=10",
      duration: 5000
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
    this.picture1 = this.add.sprite(width / 3.7, (height * 1.5) / 5.2, "personRing").setScale(1.5).setDepth(99)
    this.picture2 = this.add.sprite(width / 3.1, (height * 1.5) / 2.1, "personRing").setScale(1.5).setDepth(99)
    this.picture3 = this.add.sprite(width / 1.3 - 80, (height * 1.5) / 5.2, "personRing").setFlipX(true).setScale(1.5).setDepth(99)
    this.picture4 = this.add.sprite(width / 1.5, (height * 1.5) / 2.1, "personRing").setFlipX(true).setScale(1.5).setDepth(99)

    this.person1 = this.add.sprite(width / 4.8, (height * 1.5) / 5.2, "ari").setScale(0.8).setDepth(99)
    this.person2 = this.add.sprite(width / 3.9, (height * 1.5) / 2.1, "flor").setScale(0.8).setDepth(99)
    this.person3 = this.add.sprite(width / 1.28, (height * 1.5) / 5.2, "barto").setScale(0.8).setDepth(99)
    this.person4 = this.add.sprite(width / 1.38, (height * 1.5) / 2.1, "j").setScale(0.8).setDepth(99)

    this.text1 = this.add.text(width / 3.3, (height * 1.5) / 3.9 - 13, "Nano", {
      fontFamily: "Arcade",
      fontSize: "25px",
      // wordWrap: { width: widthText, useAdvancedWrap: true },
    }).setDepth(99)

    // this.text1 = this.add.text(width / 3.3, (height * 1.5) / 3.9 - 13, "Nano", {
    //   fontFamily: "Arcade",
    //   fontSize: "25px",
    //   // wordWrap: { width: widthText, useAdvancedWrap: true },
    // })
    this.text2 = this.add.text(width / 3.4, (height * 1.5) / 3.7 - 3, "Developer", {
      fontFamily: "Arcade",
      fontSize: "17px",
      lineSpacing: 5
      // wordWrap: { width: widthText, useAdvancedWrap: true },
    }).setDepth(99)

    this.text3 = this.add.text(width / 2.8, (height * 1.5) / 1.9 + 8, "Flor", {
      fontFamily: "Arcade",
      fontSize: "25px",
      // wordWrap: { width: widthText, useAdvancedWrap: true },
    }).setDepth(99)

    this.text4 = this.add.text(width / 2.9, (height * 1.5) / 1.8 - 6, "Graphic Designer", {
      fontFamily: "Arcade",
      fontSize: "15px",
      // wordWrap: { width: widthText, useAdvancedWrap: true },
    }).setDepth(99)
    this.text5 = this.add.text(width / 1.5, (height * 1.5) / 3.9 - 9, "???", {
      fontFamily: "Arcade",
      fontSize: "25px",
      // wordWrap: { width: widthText, useAdvancedWrap: true },
    }).setDepth(99)
    this.text6 = this.add.text(width / 1.5 - 10, (height * 1.5) / 3.7 - 4, "Developer", {
      fontFamily: "Arcade",
      fontSize: "15px",
      // wordWrap: { width: widthText, useAdvancedWrap: true },
    }).setDepth(99)

    this.text7 = this.add.text(width / 1.6 - 8, (height * 1.5) / 1.9 + 8, "J", {
      fontFamily: "Arcade",
      fontSize: "25px",
      // wordWrap: { width: widthText, useAdvancedWrap: true },
    }).setDepth(99)
    this.text8 = this.add.text(width / 1.6 - 48, (height * 1.5) / 1.8 - 7, "Developer", {
      fontFamily: "Arcade",
      fontSize: "15px",
      // wordWrap: { width: widthText, useAdvancedWrap: true },
    }).setDepth(99)
    const ringFrames = this.anims.generateFrameNumbers("personRing", {
      frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39]
    })
    const ringConfig = {
      key: "ring",
      frames: ringFrames,
      frameRate: 25,
      repeat: -1,
    };
    const ringConfig2 = {
      key: "ring2",
      frames: ringFrames,
      frameRate: 23,
      repeat: -1,
    };
    const ringConfig3 = {
      key: "ring3",
      frames: ringFrames,
      frameRate: 20,
      repeat: -1,
    };
    const ringConfig4 = {
      key: "ring4",
      frames: ringFrames,
      frameRate: 24,
      repeat: -1,
    }
    this.anims.create(ringConfig),
      this.anims.create(ringConfig2),
      this.anims.create(ringConfig3),
      this.anims.create(ringConfig4),
      this.picture1.anims.play("ring")
    this.picture2.anims.play("ring2")
    this.picture3.anims.play("ring3")
    this.picture4.anims.play("ring4")

    // this.picture1 = new PictureCredits(
    //   this,
    //   width / 6.3,
    //   (height * 1.5) / 5.2,
    //   "ari",
    //   "pictureBox",
    //   0.15
    // ).setDepth(99);
    // this.picture2 = new PictureCredits(
    //   this,
    //   width / 6.3,
    //   (height * 1.5) / 2,
    //   "flor",
    //   "pictureBox",
    //   0.15,
    // ).setDepth(99);
    // this.picture3 = new PictureCredits(
    //   this,
    //   width / 1.2,
    //   (height * 1.5) / 5.2,
    //   "barto",
    //   "pictureBox",
    //   0.15,
    //   { x: -15, y: 0 }
    // ).setDepth(99);

    // this.picture4 = new PictureCredits(
    //   this,
    //   width / 1.2,
    //   (height * 1.5) / 2,
    //   "J",
    //   "pictureBox",
    //   0.15,
    //   { x: -15, y: 0 }
    // ).setDepth(99);


    // this.personTextBox1 = new TextBox(
    //   this,
    //   width / 2.9,
    //   (height) / 3.4,
    //   "textBox",
    //   400
    // )
    //   .setDepth(99)
    //   .setVisible(true).setScale(0.7);
    // this.personTextBox1.setTextBox("Nano - Developer");
    // this.personTextBox2 = new TextBox(
    //   this,
    //   width / 2.9,
    //   (height * 3) / 4,
    //   "textBox",
    //   400
    // )
    //   .setDepth(99)
    //   .setVisible(true).setScale(0.7);
    // this.personTextBox2.setTextBox("Flor - Graphics Designer");

    // this.personTextBox3 = new TextBox(
    //   this,
    //   width / 1.6,
    //   (height) / 3.4,
    //   "textBox",
    //   400
    // )
    //   .setDepth(99)
    //   .setVisible(true).setScale(0.7);
    // this.personTextBox3.setTextBox("???? - Developer");

    // this.personTextBox4 = new TextBox(
    //   this,
    //   width / 1.6,
    //   (height * 3) / 4,
    //   "textBox",
    //   400
    // )
    //   .setDepth(99)
    //   .setVisible(true).setScale(0.7);
    // this.personTextBox4.setTextBox("J - Developer");

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

    this.tweens.add({
      targets: [this.picture1, this.person1, this.text1, this.text2],
      y: "-=10",
      duration: 2000,
      repeat: -1,
      yoyo: true,
      delay: 150,
      // ease: 'back.in'
    });
    this.tweens.add({
      targets: [this.picture2, this.person2, this.text3, this.text4],
      y: "-=10",
      duration: 2000,
      repeat: -1,
      yoyo: true,
      delay: 100,
      // ease: 'back.in'
    }); this.tweens.add({
      targets: [this.picture3, this.person3, this.text5, this, this.text6],
      y: "-=10",
      duration: 2000,
      repeat: -1,
      yoyo: true,
      delay: 120,
      // ease: 'back.in'
    }); this.tweens.add({
      targets: [this.picture4, this.person4, this.text7, this.text8],
      y: "-=10",
      duration: 2000,
      repeat: -1,
      yoyo: true,
      delay: 130,
      // ease: 'back.in'
    });
  }

  update() {
    this.picture1?.update();
    this.picture2?.update();
    this.picture3?.update();
    this.picture4?.update();
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
