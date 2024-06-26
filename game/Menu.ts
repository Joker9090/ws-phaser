import Phaser from "phaser";
import BetweenScenes, { BetweenScenesStatus } from "./BetweenScenes";
import MusicManager from "./MusicManager";
import DataManager from "./DataManager";

export default class MainMenuScene extends Phaser.Scene {
  dataManager?: DataManager;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  buttons: Phaser.GameObjects.Image[] = [];
  selectedButtonIndex: number = 0;
  buttonSelector!: Phaser.GameObjects.Image;
  monchi?: Phaser.GameObjects.Sprite;
  progress: number = 0;
  play?: Phaser.GameObjects.Image;
  credits?: Phaser.GameObjects.Image;
  exit?: Phaser.GameObjects.Image;
  title?: Phaser.GameObjects.Image;
  textTut?: Phaser.GameObjects.Text;
  textLvl1?: Phaser.GameObjects.Text;
  textLvl2?: Phaser.GameObjects.Text;
  container?: Phaser.GameObjects.Container;
  canChangeScene: boolean = false;
  offsetButton: number = 10;
  planet2?: Phaser.GameObjects.Image
  background1?: Phaser.GameObjects.Image
  background2?: Phaser.GameObjects.Image
  background3?: Phaser.GameObjects.Image
  background4?: Phaser.GameObjects.Image
  stagePoint?: number = 0
  startingPoint = {
    x: 600, //600
    y: 1800, //1800
  };
  constructor() {
    super({ key: "Menu" });
  }

  init({ stagePoint }: any) {
    this.cursors = this.input.keyboard?.createCursorKeys();
    this.dataManager = this.game.scene.getScene("DataManager") as DataManager;
    if (this.stagePoint != undefined && stagePoint != undefined) {
      this.stagePoint = stagePoint
    }
  }

  /* Debug 
    preload() {
        this.load.image("background", "game/background.png");
        this.load.image("glass", "game/glass.png");
        this.load.image("cursor", "game/cursor.png");
        this.load.spritesheet("monchi", "game/character.png", { frameWidth: 220, frameHeight: 162 });
    };
    */

  button1() {
    if (!this.dataManager?.menuAnim) {
      this.tweens.addCounter({
        from: 2000,
        to: 0,
        duration: 4000,
        ease: window.Phaser.Math.Easing.Bounce.InOut,
        yoyo: false,
        repeat: 0,
        onUpdate: (tween) => {
          const value = tween.getValue();
          if (this.buttonSelector && this.play)
            this.buttonSelector.setPosition(
              this.play.x + this.play.displayWidth * 0.5,
              this.play.y + 10
            );
          if (this.play) this.play.setPosition(value, 100);
          if (this.textTut) this.textTut.setPosition(value, 100);
          if (this.play) {
            if (this.credits)
              this.credits.setPosition(
                value * 2,
                this.play.y + this.play.displayHeight + this.offsetButton
              );
            if (this.textLvl1)
              this.textLvl1.setPosition(
                value * 2,
                this.play.y + this.play.displayHeight + this.offsetButton
              );
          }
          if (this.credits) {
            if (this.exit)
              this.exit.setPosition(
                value * 3,
                this.credits.y + this.credits.displayHeight + this.offsetButton
              );
            if (this.textLvl2)
              this.textLvl2.setPosition(
                value * 3,
                this.credits.y + this.credits.displayHeight + this.offsetButton
              );
          }
        },
        onComplete: () => {
          this.canChangeScene = true;
        },
      });
    } else {
      this.play?.setPosition(0, 100);
      this.textTut?.setPosition(0, 100);
      if (this.play)
        this.credits?.setPosition(
          0,
          this.play.y + this.play.displayHeight + this.offsetButton
        );
      if (this.play)
        this.textLvl1?.setPosition(
          0,
          this.play.y + this.play.displayHeight + this.offsetButton
        );
      if (this.credits)
        this.exit?.setPosition(
          0,
          this.credits.y + this.credits.displayHeight + this.offsetButton
        );
      if (this.credits)
        this.textLvl2?.setPosition(
          0,
          this.credits.y + this.credits.displayHeight + this.offsetButton
        );
      if (this.play)
        this.buttonSelector?.setPosition(
          this.play.x + this.play.displayWidth * 0.5,
          this.play.y + 10
        );
    }
  }

  hoverTitle() {
    this.tweens.addCounter({
      from: -100,
      to: -120,
      duration: 4000,
      ease: window.Phaser.Math.Easing.Linear,
      yoyo: true,
      repeat: -1,
      onUpdate: (tween) => {
        const value = tween.getValue();
        if (this.title) {
          this.title.setPosition(0, value);
        }
      },
    });
  }

  titleAnim() {
    if (!this.dataManager?.menuAnim) {
      this.tweens.addCounter({
        from: -1500,
        to: -100,
        duration: 4000,
        ease: window.Phaser.Math.Easing.Bounce.InOut,
        yoyo: false,
        repeat: 0,
        onUpdate: (tween) => {
          const value = tween.getValue();
          if (this.title) {
            this.title.setPosition(0, value);
          }
        },
        onComplete: () => {
          this.hoverTitle();
        },
      });
    } else {
      this.title?.setPosition(0, -100);
      this.hoverTitle();
    }
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
      this.time.delayedCall(800, () => {
        this.scene.stop();
      });
    }
  }
  scaleBg(background: Phaser.GameObjects.Image) {
    background.displayHeight = this.cameras.main.displayHeight
    background.displayWidth = this.cameras.main.displayWidth
    background.y = this.cameras.main.displayHeight / 2
    background.x = this.cameras.main.displayWidth / 2
  }
  create() {
    this.background1 = this.add.image(900, 500, "background")
    this.background2 = this.add.image(900, 500, "background2").setScale(1.3)
    this.background3 = this.add.image(900, 500, "background3").setScale(1.3);
    this.background4 = this.add.image(900, 500, "background5")
    const asteroids = this.add.image(-200, -200, "menuAsteroids").setScale(1.3).setDepth(1);
    this.add.image(this.cameras.main.width - 1700, 900, "planeta1").setScale(0.9);
    this.add.image(this.cameras.main.width - 1700, 600, "astronauta").setScale(0.6);
    this.add.image(this.cameras.main.width - 1700, 160, "nube5").setScale(0.7);
    this.scaleBg(this.background1)
    this.scaleBg(this.background4)
    this.tweens.add({
      targets: [this.background2, this.background3],
      x: "-=5",
      y: "+=5",
      duration: 3000,
      yoyo: true,
      loop: -1
    });
    this.tweens.add({
      targets: this.add.image(this.cameras.main.width - 150, 150, "planeta2"),
      x: "+=10",
      y: "-=15",
      duration: 5000,
      yoyo: true,
      loop: -1
    });
    this.tweens.add({
      targets: [
        this.add.image(this.cameras.main.width - 1750, 800, "nube1"),
        this.add.image(this.cameras.main.width - 80, 400, "nube2"),
      ],
      x: "-=15",
      y: "+=5",
      duration: 4000,
      yoyo: true,
      loop: -1
    });

    this.tweens.add({
      targets: this.add.image(this.cameras.main.width - 1800, 60, "nube4"),
      x: "+=12",
      y: "-=14",
      yoyo: true,
      loop: -1,
      duration: 4000,
    })


    /* Audio */
    const getMusicManagerScene = this.game.scene.getScene(
      "MusicManager"
    ) as MusicManager;
    if (!getMusicManagerScene.scene.isActive())
      this.scene.launch("MusicManager").sendToBack();
    else {
      if (getMusicManagerScene.music?.key !== "songMenu") {
        getMusicManagerScene.stopMusic()
        getMusicManagerScene.playMusic("songMenu")
      }
    }

    this.scene.bringToTop().resume();
    //window.scene = this


    /* Main Scene Menu */
    //this.container = this.add.container(this.game.canvas.getBoundingClientRect().width/2 ,this.game.canvas.getBoundingClientRect().height/3).setDepth(999)
    this.container = this.add.container(0, 0).setDepth(999);
    this.physics.world.setBounds(0, 0, 5000, 2500);


    const targetX = this.cameras.main.width; // Adjust the value to control the horizontal movement
    const targetY = this.cameras.main.height; // Adjust the value to control the vertical movement

    // Create a tween for diagonal movement
    this.tweens.add({
      targets: asteroids,
      x: targetX + 200,
      y: targetY + 200,
      delay: 2000,
      duration: 8000, // Duration of the tween in milliseconds
      ease: 'Linear',
      repeat: -1,
    }) // Easing function
    const asteroidsSmall = this.add.image(-200, 0, "menuAsteroidsSmall").setScale(1.3).setDepth(1);
    this.tweens.add({
      targets: asteroidsSmall,
      x: targetX + 300,
      y: targetY + 300,
      delay: 1300,
      duration: 10000, // Duration of the tween in milliseconds
      ease: 'Linear',
      repeat: -1,
    })



    // this.add.image(900, 500, "planeta2");

    // this.monchi = this.add.sprite(100, 700, "character", 1).setScale(0.5);
    let { width, height } = this.scale;
    if (this.game.config.canvas) {
      const size = this.game.config.canvas.getBoundingClientRect();
      width = size.width;
      height = size.height;
    }

    const [widthButton, heightButton] = [250, 100];
    // this.title = this.add
    //   .text(0, -100, "COSMIC WANDERER", {
    //     fontSize: "80px",
    //     fontFamily: "arcade",
    //     color: "#c3c5c3",
    //   })
    //   .setOrigin(0.5);
    this.title = this.add.image(0, -100, "menuLogo").setOrigin(0.5).setScale(0.8)
    // play button
    this.play = this.add
      .image(2000, 100, "glass")
      .setDisplaySize(widthButton, heightButton);
    //window.play = play
    this.textTut = this.add
      .text(this.play.x, this.play.y, "Play", { fontFamily: "arcade" })
      .setOrigin(0.5);

    // Play level 1 button
    this.credits = this.add
      .image(this.play.x, this.play.y + this.play.displayHeight + 10, "glass")
      .setDisplaySize(widthButton, heightButton);
    this.textLvl1 = this.add
      .text(this.credits.x, this.credits.y, "Credits", { fontFamily: "arcade" })
      .setOrigin(0.5);

    // Play level 2 button
    this.exit = this.add
      .image(
        this.credits.x,
        this.credits.y + this.credits.displayHeight + 10,
        "glass"
      )
      .setDisplaySize(widthButton, heightButton);
    this.textLvl2 = this.add
      .text(this.exit.x, this.exit.y, "Exit", { fontFamily: "arcade" })
      .setOrigin(0.5);

    this.buttons = [this.play, this.credits, this.exit];
    this.buttonSelector = this.add
      .image(
        this.play.x + this.play.displayWidth * 0.5,
        this.play.y + 10,
        "cursor"
      )
      .setScale(0.1)
      .setRotation(-1);
    this.selectButton(0);

    this.container.add([
      this.play,
      this.credits,
      this.exit,
      this.textLvl1,
      this.textLvl1,
      this.textLvl2,
      this.textTut,
      this.buttonSelector,
      this.title,
    ]);

    this.play.on("selected", () => {
      this.makeTransition("LevelMap", { stagePoint: this.stagePoint })
      this.selectedButtonIndex = 0;
    });
    this.credits.on("selected", () => {
      this.makeTransition("Credits", { data: 1 });
      this.selectedButtonIndex = 0;
    });
    this.exit.on("selected", () => {
      this.makeTransition("Intro", { data: 1 });
      this.selectedButtonIndex = 0;
    });
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.credits?.off("selected");
    });
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.exit?.off("selected");
    });
    this.button1();
    this.titleAnim();
  }

  selectButton(index: number) {
    const currentButton = this.buttons[this.selectedButtonIndex];
    // set the current selected button to a white tint
    currentButton.setTexture("glass");
    const button = this.buttons[index];
    // set the newly selected button to a green tint
    button.setTexture("hover");
    // move the hand cursor to the right edge
    this.buttonSelector.x = button.x + button.displayWidth * 0.5;
    this.buttonSelector.y = button.y + 10;
    // store the new selected index
    this.selectedButtonIndex = index;
  }

  selectNextButton(change = 1) {
    let index = this.selectedButtonIndex + change;
    // wrap the index to the front or end of array
    if (index >= this.buttons.length) {
      index = 0;
    } else if (index < 0) {
      index = this.buttons.length - 1;
    }
    this.selectButton(index);
  }

  confirmSelection() {
    // get the currently selected button
    const button = this.buttons[this.selectedButtonIndex];
    // emit the 'selected' event
    button.setTexture("click")
    button.emit("selected");
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
        } else {
          this.container.setScale(1);
        }
      }
    }

    //window.play.setPosition(this.cameras.main.width/2,this.cameras.main.height/2);
    if (this.monchi) {
      this.progress = this.progress + 0.0031415;
      this.monchi.x = this.monchi.x + 0.5;
      this.monchi.y = this.monchi.y - 0.25;
      this.monchi.setRotation(this.progress);
    }
    if (this.cursors) {
      const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up);
      const downJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.down);
      const spaceJustPressed = Phaser.Input.Keyboard.JustDown(
        this.cursors.space
      );

      if (upJustPressed) {
        this.selectNextButton(-1);
      } else if (downJustPressed) {
        this.selectNextButton(1);
      } else if (spaceJustPressed) {
        if (this.canChangeScene) this.confirmSelection();
      }
    }
  }
}
