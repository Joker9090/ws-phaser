import Phaser from "phaser";

export type SceneKeys =
  | "Menu"
  | "Scenes"
  | "Tutorial"
  | "Music"
  | "Intro"
  | "LevelMap"
  | "Sandbox"
  | "BetweenScenes";

export type LoadTypes = "image" | "spritesheet" | "audio";

const loadAssets = {
  Menu: {
    assets: [
      ["image", "glass", "/game/glass.png"],
      ["image", "hover", "/game/hover.png"],
      ["image", "click", "/game/click.png"],
      ["image", "background", "/game/menuBg1.png"],
      ["image", "background2", "/game/menuBg2.png"],
      ["image", "background3", "/game/menuBg3.png"],
      ["image", "background5", "/game/menuBg4.png"],
      ["image", "astronauta", "/game/astronauta.png"],
      ["image", "nube4", "/game/nube4.png"],
      ["image", "nube5", "/game/nube5.png"],
      ["image", "nube2", "/game/nube2.png"],
      ["image", "nube1", "/game/nube1.png"],
      ["image", "menuAsteroids", "/game/meteoritos2.png"],
      ["image", "menuAsteroidsSmall", "/game/meteoritos1.png"],

      ["image", "planeta1", "/game/planeta1.png"],
      ["image", "planeta2", "/game/planeta2.png"],
      ["image", "menuLogo", "/game/menuLogo.png"],
      ["image", "cursor", "/game/cursor.png"],
      [
        "spritesheet",
        "character",
        "/game/character.png",
        { frameWidth: 330, frameHeight: 450 },
      ],
    ],
  },
  Intro: {
    assets: [["image", "logoNoswar", "/game/logo.png"]],
  },
  Sandbox: {
    assets: [["image", "logoNoswar", "/game/logo.png"]],
  },
  LevelMap: {
    assets: [
      ["image", "backgroundLevelMap", "/game/backgroundLevelMap.png"],
      ["image", "sun", "/game/sun.png"],
      ["image", "planetTutorial", "/game/planetTutorialSprite.png"],
      ["image", "planetLevel1", "/game/planetlvl1.png"],
      ["image", "planetLevel2", "/game/planetlvl2.png"],
      [
        "spritesheet",
        "tutorial",
        "/game/tutorial.png",
        { frameWidth: 150, frameHeight: 150 },
      ],
      [
        "spritesheet",
        "lvl1",
        "/game/lvl1.png",
        { frameWidth: 150, frameHeight: 150 },
      ],
      [
        "spritesheet",
        "lvl2",
        "/game/lvl2.png",
        { frameWidth: 150, frameHeight: 150 },
      ],
    ],
  },
  Scenes: {
    assets: [

      ["image", "plataformaA", "/game/plataforma.png"],
      ["image", "plataformaB", "/game/plataforma2.png"],
      ["image", "plataformaLarga", "/game/plataformaLarga.png"],
      ["image", "plataformaLarga2", "/game/plataformalarga2.png"],
      ["image", "platformA", "/game/platform1.png"],
      ["image", "platformB", "/game/platform1B.png"],
      ["image", "plataformaCorta", "/game/plataformaCorta1.png"],
      ["image", "plataformaCorta2", "/game/plataformaCorta2.png"],
      ["image", "fallingGuy", "/game/fallingGuy.png"],
      ["image", "asteroid", "/game/asteroid.png"],
      ["image", "asteroid2", "/game/asteroid2.png"],
      ["image", "coin", "/game/cristal.png"],
      ["image", "auraTuto", "/game/auraCristalTuto.png"],
      ["image", "portal", "/game/portal.png"],
      ["image", "heart", "/game/heart.png"],
      ["image", "arrow", "/game/arrow.png"],
      ["image", "uiFull", "/game/uiLifeFull.png"],
      ["image", "uiEmpty", "/game/uiLifeEmpty.png"],
      ["image", "uiLifeSection", "/game/uiLifeSection.png"],
      ["image", "uiLifeSectionEmpty", "/game/uiLifeSectionEmpty.png"],
      ["image", "uiGravity", "/game/uiGravityIndicator.png"],
      ["image", "lvl1bg1", "/game/lvl1bg1.png"],
      ["image", "lvl1bg2", "/game/lvl1bg2.png"],
      ["image", "lvl1bg3", "/game/lvl1bg3.png"],
      ["image", "lvl1bg4", "/game/lvl1bg4.png"],
      ["image", "lvl1bg5", "/game/lvl1bg5.png"],
      ["image", "lvl1bg6", "/game/lvl1bg6.png"],
      ["image", "lvl1bg7", "/game/lvl1bg7.png"],
      ["image", "lvl1bg8", "/game/lvl1bg8.png"],

      ["image", "newBg1", "/game/bg1.png"],
      ["image", "newBg2", "/game/bg2.png"],
      ["image", "newBg3", "/game/bg3.png"],
      ["image", "newBg4", "/game/bg4.png"],
      ["image", "newBg5", "/game/bg5.png"],
      ["image", "newBg6", "/game/bg6.png"],
    ],
  },

  Tutorial: {
    assets: [
      ["image", "fireball", "/game/fireball.png"],
      ["image", "textBox", "/game/textBox.png"],
    ],
  },
  BetweenScenes: {
    assets: [["image", "block", "/game/50x50.png"]],
  },
  Music: {
    assets: [
      ["audio", "songTutorial", "/sounds/tutorial.mp3"],
      ["audio", "songLevel1", "/sounds/monchiSpace.mp3"],
      ["audio", "songLevel2", "/sounds/level2.mp3"],
      ["audio", "songWon", "/sounds/won.mp3"],
      ["audio", "songLose", "/sounds/lose.mp3"],
      ["audio", "songMenu", "/sounds/menu.mp3"],
    ],
  },
};

// Scene in class
class SceneLoader extends Phaser.Scene {
  constructor() {
    super({ key: "SceneLoader" });
  }
  preload(this: Phaser.Scene) {
    this.cameras.main.setBackgroundColor(
      Phaser.Display.Color.GetColor(30, 30, 30)
    );
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        color: "#ff0000",
      },
    });
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2 + 100, 320, 50);

    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: "0%",
      style: {
        font: "18px monospace",
        color: "#ff0000",
      },
    });

    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: "",
      style: {
        font: "18px monospace",
        color: "#ff0000",
      },
    });

    assetText.setOrigin(0.5, 0.5);

    this.load.on("progress", function (value: number) {
      percentText.setText(Math.floor(Number(value * 100)) + "%");
      progressBar.clear();
      progressBar.fillStyle(0xff0000, 1);
      progressBar.fillRect(width / 2 - 160, height / 2 + 100, 300 * value, 30);
    });

    this.load.on("fileprogress", function (file: any) {
      assetText.setText("Loading asset: " + file.key);
    });

    this.load.on("complete", function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });
    const scenesTitles: Array<SceneKeys> = [
      "Menu",
      "Scenes",
      "Tutorial",
      "Music",
      "Intro",
      "LevelMap",
      "BetweenScenes",
      "Sandbox",
    ];
    for (let i = 0; i < scenesTitles.length; i++) {
      loadAssets[scenesTitles[i]].assets.map((sceneAssetConfig) => {
        const type = sceneAssetConfig[0] as LoadTypes;
        const name = sceneAssetConfig[1] as string;
        const src = sceneAssetConfig[2] as string;
        const config = sceneAssetConfig[3] as any;
        if (config) {
          this.load[type](name, src, config);
        } else {
          this.load[type](name, src);
        }
      });
    }
    /*Load Fonts*/
    const ArcadeFont = this.add.text(0, 0, ":)", { fontFamily: "Arcade" });
  }

  create(this: SceneLoader, { level }: any) {
    // this.scene.start("Sandbox", { data: 1 });
    // this.scene.start("Menu", { data: 1 });  
    this.scene.start("Game", { level: 1, lifes: 3 });
  }

  update(this: SceneLoader) {
    console.log(this.game.scene.scenes)
  }
}

export default SceneLoader;
