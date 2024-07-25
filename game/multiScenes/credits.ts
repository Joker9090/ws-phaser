import Phaser from "phaser";

import MultiScene from "../MultiScene";
import TextBox from "../assets/TextBox";
import EventsCenter from "../EventsCenter";

export default class CreditsClass {
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

  scene: MultiScene;
  constructor(scene: MultiScene) {
    this.scene = scene
    this.preload()
    this.createContainer()
  }


  scaleBg() {
    if (this.scene.cameras.main.displayWidth > 2000 && this.background && this.background2 && this.background3 && this.background4 && this.background5 && this.background6) {
      this.background.displayHeight = this.scene.cameras.main.displayHeight * 1.6
      this.background.displayWidth = this.scene.cameras.main.displayWidth * 1.6
      this.background2.displayHeight = this.scene.cameras.main.displayHeight * 1.6
      this.background2.displayWidth = this.scene.cameras.main.displayWidth * 1.6
      this.background3.displayHeight = this.scene.cameras.main.displayHeight * 1.6
      this.background3.displayWidth = this.scene.cameras.main.displayWidth * 1.6
      this.background4.displayHeight = this.scene.cameras.main.displayHeight * 1.6
      this.background4.displayWidth = this.scene.cameras.main.displayWidth * 1.6
      this.background5.displayHeight = this.scene.cameras.main.displayHeight * 1.6
      this.background5.displayWidth = this.scene.cameras.main.displayWidth * 1.6
      this.background6.displayHeight = this.scene.cameras.main.displayHeight * 1.6
      this.background6.displayWidth = this.scene.cameras.main.displayWidth * 1.6

    }
  }
  preload() {
    this.scene.load.image("backgroundLevelMap", "game/backgroundLevelMap.png");
    this.scene.load.image("spaceship", "game/spaceship.png");
    this.scene.load.image("pictureBox", "game/pictureCredits.png");
    this.scene.load.image("ari", "game/ari.png");
    this.scene.load.image("flor", "game/flor.png");
    this.scene.load.image("barto", "game/barto.png");
    this.scene.load.image("j", "game/J.png");
    this.scene.load.image("textBox", "game/textBox.png");
  }


  createContainer() {
    /* Controls */
    this.background = this.scene.add
      .image(this.scene.cameras.main.displayWidth / 2, this.scene.cameras.main.displayHeight / 2, "newBg1")
      .setOrigin(0.5, 0.5).setScale(1);
    this.background2 = this.scene.add
      .image(this.scene.cameras.main.displayWidth / 2, this.scene.cameras.main.displayHeight / 2, "newBg2")
      .setOrigin(0.5, 0.5).setScale(1);
    this.background3 = this.scene.add
      .image(this.scene.cameras.main.displayWidth / 2, this.scene.cameras.main.displayHeight / 2, "newBg3")
      .setOrigin(0.5, 0.5).setScale(1);
    this.background4 = this.scene.add
      .image(this.scene.cameras.main.displayWidth / 2, this.scene.cameras.main.displayHeight / 2, "newBg4")
      .setOrigin(0.5, 0.5).setScale(1);
    this.background5 = this.scene.add
      .image(this.scene.cameras.main.displayWidth / 2, this.scene.cameras.main.displayHeight / 2, "newBg5")
      .setOrigin(0.5, 0.5).setScale(1);
    this.background6 = this.scene.add
      .image(this.scene.cameras.main.displayWidth / 2, this.scene.cameras.main.displayHeight / 2, "newBg6")
      .setOrigin(0.5, 0.5).setScale(1);
    this.scaleBg()
    this.scene.tweens.add({
      targets: this.background,
      yoyo: true,
      repeat: -1,
      x: "+=10",
      y: "-=10",
      duration: 3000
    }); this.scene.tweens.add({
      targets: this.background2,
      yoyo: true,
      repeat: -1,
      x: "+=3",
      y: "-=10",
      duration: 5000
    }); this.scene.tweens.add({
      targets: this.background3,
      yoyo: true,
      repeat: -1,
      x: "+=10",
      y: "-=10",
      duration: 3000
    }); this.scene.tweens.add({
      targets: this.background4,
      yoyo: true,
      repeat: -1,
      x: "+=10",
      y: "-=10",
      duration: 3000
    }); this.scene.tweens.add({
      targets: this.background,
      yoyo: true,
      repeat: -1,
      x: "+=10",
      y: "-=10",
      duration: 3000
    })
    this.EscKeyboard = this.scene.input.keyboard?.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC
    );
    const { width, height } = this.scene.cameras.main;
    this.picture1 = this.scene.add.sprite(width / 3.7, (height * 1.5) / 5.2, "personRing").setScale(1.5).setDepth(99)
    this.picture2 = this.scene.add.sprite(width / 3.1, (height * 1.5) / 2.1, "personRing").setScale(1.5).setDepth(99)
    this.picture3 = this.scene.add.sprite(width / 1.3 - 80, (height * 1.5) / 5.2, "personRing").setFlipX(true).setScale(1.5).setDepth(99)
    this.picture4 = this.scene.add.sprite(width / 1.5, (height * 1.5) / 2.1, "personRing").setFlipX(true).setScale(1.5).setDepth(99)

    this.person1 = this.scene.add.sprite(width / 4.8, (height * 1.5) / 5.2, "ari").setScale(0.8).setDepth(99)
    this.person2 = this.scene.add.sprite(width / 3.9, (height * 1.5) / 2.1, "flor").setScale(0.8).setDepth(99)
    this.person3 = this.scene.add.sprite(width / 1.28, (height * 1.5) / 5.2, "barto").setScale(0.8).setDepth(99)
    this.person4 = this.scene.add.sprite(width / 1.38, (height * 1.5) / 2.1, "j").setScale(0.8).setDepth(99)

    this.text1 = this.scene.add.text(width / 3.3, (height * 1.5) / 3.9 - 13, "Nano", {
      fontFamily: "Arcade",
      fontSize: "25px",
      // wordWrap: { width: widthText, useAdvancedWrap: true },
    }).setDepth(99)

    // this.text1 = this.scene.add.text(width / 3.3, (height * 1.5) / 3.9 - 13, "Nano", {
    //   fontFamily: "Arcade",
    //   fontSize: "25px",
    //   // wordWrap: { width: widthText, useAdvancedWrap: true },
    // })
    this.text2 = this.scene.add.text(width / 3.4, (height * 1.5) / 3.7 - 3, "Developer", {
      fontFamily: "Arcade",
      fontSize: "17px",
      lineSpacing: 5
      // wordWrap: { width: widthText, useAdvancedWrap: true },
    }).setDepth(99)

    this.text3 = this.scene.add.text(width / 2.8, (height * 1.5) / 1.9 + 8, "Flor", {
      fontFamily: "Arcade",
      fontSize: "25px",
      // wordWrap: { width: widthText, useAdvancedWrap: true },
    }).setDepth(99)

    this.text4 = this.scene.add.text(width / 2.9, (height * 1.5) / 1.8 - 6, "Graphic Designer", {
      fontFamily: "Arcade",
      fontSize: "15px",
      // wordWrap: { width: widthText, useAdvancedWrap: true },
    }).setDepth(99)
    this.text5 = this.scene.add.text(width / 1.5, (height * 1.5) / 3.9 - 9, "???", {
      fontFamily: "Arcade",
      fontSize: "25px",
      // wordWrap: { width: widthText, useAdvancedWrap: true },
    }).setDepth(99)
    this.text6 = this.scene.add.text(width / 1.5 - 10, (height * 1.5) / 3.7 - 4, "Developer", {
      fontFamily: "Arcade",
      fontSize: "15px",
      // wordWrap: { width: widthText, useAdvancedWrap: true },
    }).setDepth(99)

    this.text7 = this.scene.add.text(width / 1.6 - 8, (height * 1.5) / 1.9 + 8, "J", {
      fontFamily: "Arcade",
      fontSize: "25px",
      // wordWrap: { width: widthText, useAdvancedWrap: true },
    }).setDepth(99)
    this.text8 = this.scene.add.text(width / 1.6 - 48, (height * 1.5) / 1.8 - 7, "Developer", {
      fontFamily: "Arcade",
      fontSize: "15px",
      // wordWrap: { width: widthText, useAdvancedWrap: true },
    }).setDepth(99)
    const ringFrames = this.scene.anims.generateFrameNumbers("personRing", {
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
    this.scene.anims.create(ringConfig),
      this.scene.anims.create(ringConfig2),
      this.scene.anims.create(ringConfig3),
      this.scene.anims.create(ringConfig4),
      this.picture1.anims.play("ring")
    this.picture2.anims.play("ring2")
    this.picture3.anims.play("ring3")
    this.picture4.anims.play("ring4")


    this.scene.add
      .text(width / 2, height / 14, "CREDITS", {
        fontSize: "70px",
        fontFamily: "arcade",
        color: "#c3c5c3",
      })
      .setOrigin(0.5);
    this.scene.add
      .text(
        width / 2,
        height - height / 10,
        "Press SPACE or ESC to go to Menu",
        { fontSize: "22px", fontFamily: "arcade", color: "#c3c5c3" }
      )
      .setOrigin(0.5);
    this.spaceship = this.scene.add
      .image(-100, height + 100, "spaceship")
      .setDepth(9)
      .setRotation(0)
      .setScale(0.5)
      .setAlpha(0.5);

    this.scene.tweens.add({
      targets: [this.picture1, this.person1, this.text1, this.text2],
      y: "-=10",
      duration: 2000,
      repeat: -1,
      yoyo: true,
      delay: 150,
      // ease: 'back.in'
    });
    this.scene.tweens.add({
      targets: [this.picture2, this.person2, this.text3, this.text4],
      y: "-=10",
      duration: 2000,
      repeat: -1,
      yoyo: true,
      delay: 100,
      // ease: 'back.in'
    }); this.scene.tweens.add({
      targets: [this.picture3, this.person3, this.text5, this, this.text6],
      y: "-=10",
      duration: 2000,
      repeat: -1,
      yoyo: true,
      delay: 120,
      // ease: 'back.in'
    }); this.scene.tweens.add({
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
      if (this.spaceship.x == this.scene.cameras.main.width) {
        this.spaceship.x = -100;
        this.spaceship.y = this.scene.cameras.main.height + 100;
      }
    }
    if (this.EscKeyboard)
      this.EscKeyboard.on("down", () => {
        EventsCenter.emit("gameOver", true);
        this.scene.makeTransition("Menu", {});
        // this.scene.start("Menu");
      });
    if (this.cursors)
      this.cursors.space.on("down", () => {
        EventsCenter.emit("gameOver", true);
        this.scene.makeTransition("Menu", {});
        //this.scene.start("Menu");
      });
  }
}
