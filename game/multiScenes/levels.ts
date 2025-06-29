import Phaser from "phaser";

import { World } from "matter";
import MultiScene from "../MultiScene";

export default class LevelClass {
  /* map */
  background?: Phaser.GameObjects.Image;
  container?: Phaser.GameObjects.Container;
  /* controls */
  EscKeyboard?: Phaser.Input.Keyboard.Key;
  /* planets */
  sun?: Phaser.GameObjects.Sprite;
  planetTutorial?: Phaser.GameObjects.Sprite;
  planetLevel1?: Phaser.GameObjects.Sprite;
  planetLevel2?: Phaser.GameObjects.Sprite;
  sunText?: Phaser.GameObjects.Text;
  tutorialText?: Phaser.GameObjects.Text;
  level1Text?: Phaser.GameObjects.Text;
  level2Text?: Phaser.GameObjects.Text;
  sunCon?: Phaser.GameObjects.Container;
  planetTutCon?: Phaser.GameObjects.Container;
  planet1Con?: Phaser.GameObjects.Container;
  planet2Con?: Phaser.GameObjects.Container;
  /* planet selector */
  planets: Phaser.GameObjects.Sprite[] = [];
  planetSelector!: Phaser.GameObjects.Image;
  selectedPlanetIndex: number = 0;
  planetsShown: number = 3;
  graphic1?: Phaser.GameObjects.Graphics;
  graphic2?: Phaser.GameObjects.Graphics;
  graphic3?: Phaser.GameObjects.Graphics;
  dist1?: number;
  dist2?: number;
  dist3?: number;
  /* progress */
  progress: number = 0;
  /* player */
  player?: Phaser.GameObjects.Sprite;
  scene: MultiScene;
  constructor(scene: MultiScene) {
    this.scene = scene
    this.createContainer()
  }

  init(this: LevelClass, { stagePoint }: any) {
    this.planetsShown = stagePoint;
  }


  upDownAnim(
    planet:
      | Phaser.GameObjects.Sprite
      | Phaser.GameObjects.Image
      | Phaser.GameObjects.Text,
    ypos: number,
    offset: number,
    dur: number
  ) {
    this.scene.tweens.addCounter({
      from: 0,
      to: offset,
      duration: dur,
      ease: window.Phaser.Math.Easing.Linear,
      yoyo: true,
      repeat: -1,
      onUpdate: (tween) => {
        const value = tween.getValue();
        planet.setY(value + ypos);
      },
    });
  }

  selectPlanet(index: number) {
    const planet = this.planets[index];
    // move the hand cursor to the right edge
    let fix = 0;
    if (index == 0 || index == 1) {
      fix = 0.5;
    } else if (index == 2 || index == 3) {
      fix = 0.7;
    } else {
      fix = 0.6;
    }
    this.planetSelector.x = planet.x + planet.displayWidth * fix;
    this.planetSelector.y = planet.y + 30;
    // store the new selected index
    this.selectedPlanetIndex = index;
  }

  selectNextPlanet(change = 1) {
    let index = this.selectedPlanetIndex + change;
    // wrap the index to the front or end of array
    if (index >= this.planets.length) {
      index = 0;
    } else if (index < 0) {
      index = this.planets.length - 1;
    }
    this.selectPlanet(index);
  }

  confirmSelection() {
    // get the currently selected button
    const button = this.planets[this.selectedPlanetIndex];
    // emit the 'selected' event
    button.emit("selected");
  }

  setPlanetsShown() {

  }

  createContainer() {
    /* Controls */
    this.EscKeyboard = this.scene.input.keyboard?.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC
    );

    const { width, height } = this.scene.cameras.main;
    this.container = this.scene.add.container(0, 0).setDepth(10);

    this.background = this.scene.add.image(1000, 500, "background").setScale(1.3);
    this.scene.tweens.add({
      targets: this.background = this.scene.add.image(1000, 500, "background3"),
      x: "-=30",
      duration: 10000,
      yoyo: true,
      repeat: -1
    })
    this.scene.tweens.add({
      targets: this.background = this.scene.add.image(1000, 500, "background2"),
      y: "-=30",
      duration: 10000,
      yoyo: true,
      repeat: -1
    })
    this.scene.tweens.add({
      targets: this.scene.add.image(this.scene.cameras.main.width - 1750, 800, "nube1"),
      y: "-=30",
      duration: 10000,
      yoyo: true,
      repeat: -1
    })
    this.scene.tweens.add({
      targets: this.scene.add.image(this.scene.cameras.main.width - 30, 400, "nube2").setScale(0.7).setRotation(-0.5),
      y: "-=30",
      duration: 10000,
      yoyo: true,
      repeat: -1
    })
    this.scene.tweens.add({
      targets: this.scene.add.image(this.scene.cameras.main.width - 30, 400, "nube2").setScale(0.7).setRotation(-0.5),
      y: "-=30",
      duration: 10000,
      yoyo: true,
      repeat: -1
    })
    this.scene.tweens.add({
      targets: this.scene.add.image(this.scene.cameras.main.width - 1800, 60, "nube4").setRotation(0.4),
      y: "-=30",
      duration: 10000,
      yoyo: true,
      repeat: -1
    })

    this.scene.add.image(this.scene.cameras.main.width - 1700, 360, "nube5").setScale(0.7);



    this.planetLevel2 = this.scene.add
      .sprite(width - width / 2.8, height - height / 2.8, "lvl2", 1)
      .setScale(0.95)
      .setTint(0, 0, 0);

    const lvl2frames = this.scene.anims.generateFrameNumbers("lvl2", {
      frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
    });
    const lvl2Config = {
      key: "lvl2",
      frames: lvl2frames,
      frameRate: 12,
      repeat: -1,
    };
    this.scene.anims.create(lvl2Config);
    this.planetLevel2.anims.play("lvl2");
    this.level2Text = this.scene.add
      .text(
        this.planetLevel2.x,
        this.planetLevel2.y + this.planetLevel2.displayHeight / 1.5,
        "candyLand"
      )
      .setOrigin(0.5)
      .setScale(1.2)
      .setVisible(true);

    this.sun = this.scene.add
      .sprite(width - width / 12, height - height / 9.7, "sun", 1)
      .setScale(2.5)
      .setTint(Phaser.Display.Color.GetColor(5, 5, 5));
    const sunFrames = this.scene.anims.generateFrameNumbers("sun", { 
      frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39] });
    const sunConfig = {
      key: "sunAnim",
      frames: sunFrames,
      frameRate: 12,
      repeat: -1,
    };
    this.scene.anims.create(sunConfig);
    this.sun.anims.play("sunAnim");

    this.sunText = this.scene.add
      .text(
        this.sun.x,
        this.sun.y + this.sun.displayHeight / 1.5,
        "CandyLand"
      )
      .setOrigin(0.5)
      .setScale(1.2)
      .setVisible(true);
    this.planetLevel1 = this.scene.add
      .sprite(width - width / 1.7, height - height / 1.77, "lvl1", 1)
      .setScale(1.3)
      .setTint(Phaser.Display.Color.GetColor(5, 5, 5));

    const lvl1Frames = this.scene.anims.generateFrameNumbers("lvl1", { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39] });
    const lvl1Config = {
      key: "lvl1",
      frames: lvl1Frames,
      frameRate: 12,
      repeat: -1,
    };
    this.scene.anims.create(lvl1Config);
    this.planetLevel1.anims.play("lvl1")
    this.level1Text = this.scene.add
      .text(
        this.planetLevel1.x,
        this.planetLevel1.y + this.planetLevel1.displayHeight / 1.8,
        "The swamps"
      )
      .setOrigin(0.5)
      .setScale(1.2)
      .setVisible(true);


    this.planetTutorial = this.scene.add.sprite(width - width / 1.2, 200, "Tutorial", 1).setScale(1);
    const planetTutorialFrames = this.scene.anims.generateFrameNumbers("tutorial", { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39] });
    const planetTutorialConfig = {
      key: "planetTutorial",
      frames: planetTutorialFrames,
      frameRate: 12,
      repeat: -1,
    };
    this.scene.anims.create(planetTutorialConfig);
    this.planetTutorial.anims.play("planetTutorial");


    this.tutorialText = this.scene.add
      .text(
        this.planetTutorial.x,
        this.planetTutorial.y + this.planetTutorial.displayHeight / 1.8,
        "Tutorialand"
      )
      .setOrigin(0.5)
      .setScale(1.2);

    this.container.add([
      this.sun,
      this.planetTutorial,
      this.planetLevel1,
      this.planetLevel2,
    ]);
    this.player = this.scene.add
      .sprite(width - 100, 150, "character", 20)
      .setScale(0.5)
      .setDepth(99);
    if (this.planetsShown == 0) {
      this.planets = [this.planetTutorial];
    } else if (this.planetsShown == 1) {
      this.planets = [this.planetTutorial, this.planetLevel1];
    } else if (this.planetsShown == 2) {
      this.planets = [
        this.planetTutorial,
        this.planetLevel1,
        this.planetLevel2,
      ];
    } else if (this.planetsShown == 3) {
      this.planets = [
        this.planetTutorial,
        this.planetLevel1,
        this.planetLevel2,
        this.sun,
      ];
    } else {
      this.planets = [
        this.planetTutorial,
        this.planetLevel1,
        this.planetLevel2,
        this.sun,
      ];
    }

    this.upDownAnim(this.sun, this.sun.y, 13, 2000);
    this.upDownAnim(this.sunText, this.sunText.y, 13, 2000);
    this.upDownAnim(this.planetTutorial, this.planetTutorial.y, 5, 2500);
    this.upDownAnim(this.tutorialText, this.tutorialText.y, 5, 2500);
    this.upDownAnim(this.planetLevel1, this.planetLevel1.y, 16, 2300);
    this.upDownAnim(this.level1Text, this.level1Text.y, 16, 2300);
    this.upDownAnim(this.planetLevel2, this.planetLevel2.y, 0, 2100);
    this.upDownAnim(this.level2Text, this.level2Text.y, 0, 2100);
    this.upDownAnim(this.background, 500, 10, 6000);

    this.planetTutorial.on("selected", () => {

      // this.scene.makeTransition("Game", { level: 1, lifes: 3 });
      //this.scene.start("Game", { level: 0, lifes: 3 });
      this.selectedPlanetIndex = 0;
    });

    this.planetLevel1.on("selected", () => {

      // this.scene.makeTransition("Game", { level: 3, lifes: 3 });
      //this.scene.start("Game", { level: 1, lifes: 3 });
      this.selectedPlanetIndex = 0;
    });

    this.planetLevel2.on("selected", () => {

      // this.scene.makeTransition("Game", { level: 6, lifes: 3 });

      //this.scene.start("Game", { level: 2, lifes: 3 });
      this.selectedPlanetIndex = 0;
    });

    this.sun.on("selected", () => {

      // this.scene.makeTransition("Game", { level: 9, lifes: 3 });
      //this.scene.start("Game", { level: 3, lifes: 3 });
      this.selectedPlanetIndex = 0;
    });

    this.planetSelector = this.scene.add
      .image(0, 0, "cursor")
      .setScale(0.1)
      .setRotation(-0.7)
      .setDepth(10); // Set a higher depth value to bring it to the front

    this.selectPlanet(0)



    this.graphic1 = this.scene.add.graphics({ lineStyle: { color: 0x00ffff } }).setAlpha(0.15);
    this.graphic2 = this.scene.add.graphics({ lineStyle: { color: 0x00ffff } }).setAlpha(0.15);
    this.graphic3 = this.scene.add.graphics({ lineStyle: { color: 0x00ffff } }).setAlpha(0.15);
    this.dist1 = Phaser.Math.Distance.BetweenPoints(this.planetTutorial, this.sun);
    this.dist2 = Phaser.Math.Distance.BetweenPoints(this.planetLevel1, this.sun);
    this.dist3 = Phaser.Math.Distance.BetweenPoints(this.planetLevel2, this.sun);
  }


  showPlanets(level: number) {
    if (level == 0) {
      this.planetTutorial?.clearTint();
      this.tutorialText?.setVisible(true);
    } else if (level == 1) {
      this.planetTutorial?.clearTint();
      this.tutorialText?.setVisible(true);
      this.planetLevel1?.clearTint();
      this.level1Text?.setVisible(true);
    } else if (level == 2) {
      this.planetTutorial?.clearTint();
      this.tutorialText?.setVisible(true);
      this.planetLevel1?.clearTint();
      this.level1Text?.setVisible(true);
      this.planetLevel2?.clearTint();
      this.level2Text?.setVisible(true);
    } else if (level == 3) {
      this.planetTutorial?.clearTint();
      this.tutorialText?.setVisible(true);
      this.planetLevel1?.clearTint();
      this.level1Text?.setVisible(true);
      this.planetLevel2?.clearTint();
      this.level2Text?.setVisible(true);
      this.sun?.clearTint();
      this.sunText?.setVisible(true);
    }
  }

  update() {
    if (this.graphic1) {
      if (this.dist1) {
        if (this.planetTutorial && this.sun) {
          this.dist1 = Phaser.Math.Distance.BetweenPoints(this.planetTutorial, this.sun);
          this.graphic1.clear().strokeCircle(this.sun.x, this.sun.y, this.dist1);
        };
      };
    };
    if (this.graphic2) {
      if (this.dist2) {
        if (this.planetLevel1 && this.sun) {
          this.dist1 = Phaser.Math.Distance.BetweenPoints(this.planetLevel1, this.sun);
          this.graphic2.clear().strokeCircle(this.sun.x, this.sun.y, this.dist2);
        };
      };
    };
    if (this.graphic3) {
      if (this.dist3) {
        if (this.planetLevel2 && this.sun) {
          this.dist1 = Phaser.Math.Distance.BetweenPoints(this.planetLevel2, this.sun);
          this.graphic3.clear().strokeCircle(this.sun.x, this.sun.y, this.dist3);
        };
      };
    };



    if (this.player) {
      this.progress = this.progress + 0.0031415;
      this.player.x = this.player.x - 8;
      this.player.y = this.player.y + 0.3;
      this.player.setRotation(this.progress);
      if (this.player.x == 10) {
        this.player.x = 100
      }
    }

    this.showPlanets(this.planetsShown);

    if (this.EscKeyboard)
      this.EscKeyboard.on("down", () => {
    alert(222)
        // this.scene.makeTransition("MultiScene", { text: "menu" });

        this.scene.scene.restart({text: "menu"})
      });

    if (this.scene.cursors) {
      const upJustPressed = Phaser.Input.Keyboard.JustDown(this.scene.cursors.left);
      const downJustPressed = Phaser.Input.Keyboard.JustDown(
        this.scene.cursors.right
      );
      const spaceJustPressed = Phaser.Input.Keyboard.JustDown(
        this.scene.cursors.space
      );

      if (upJustPressed) {
        this.selectNextPlanet(-1);
      } else if (downJustPressed) {
        this.selectNextPlanet(1);
      } else if (spaceJustPressed) {
        this.confirmSelection();
      }
    }
  }
}
