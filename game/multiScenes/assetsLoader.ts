import Phaser from "phaser";
import MultiScene from "../MultiScene";
import BetweenScenes, { BetweenScenesStatus } from "../BetweenScenes";

export type SceneKeys =
  | "Menu"
  | "Scenes"
  | "Tutorial"
  | "Music"
  | "Intro"
  | "LevelMap"
  | "Sandbox"
  | "BetweenScenes"
  | "Postales";

export type LoadTypes = "image" | "spritesheet" | "audio" | "svg";

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
      [
        "spritesheet",
        "player",
        "/game/player/playerSpriteSheet.png",
        { frameWidth: 200, frameHeight: 200 },
      ],
    ],
  },
  Intro: {
    assets: [
      ["image", "logoNoswar", "/game/logo.png"]
    ],
  },
  Sandbox: {
    assets: [
      ["image", "logoNoswar", "/game/logo.png"]
    ],
  },
  LevelMap: {
    assets: [
      // ["image", "backgroundLevelMap", "/game/backgroundLevelMap.png"],
      // ["image", "sun", "/game/sun.png"],
      // ["image", "planetTutorial", "/game/planetTutorialSprite.png"],
      // ["image", "planetLevel1", "/game/planetlvl1.png"],
      // ["image", "planetLevel2", "/game/planetlvl2.png"],
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
      [
        "spritesheet",
        "sun",
        "/game/sun.png",
        { frameWidth: 150, frameHeight: 150 },
      ],
      [
        "spritesheet",
        "portal1",
        "/game/portal1.png",
        { frameWidth: 100, frameHeight: 150 },
      ], [
        "spritesheet",
        "portal2",
        "/game/portal2.png",
        { frameWidth: 100, frameHeight: 150 },
      ], [
        "spritesheet",
        "portal3",
        "/game/portal3.png",
        { frameWidth: 100, frameHeight: 150 },
      ], [
        "spritesheet",
        "portal4",
        "/game/portal4.png",
        { frameWidth: 100, frameHeight: 150 },
      ], [
        "spritesheet",
        "meteorito",
        "/game/planeta1/meteoritoSpriteVerde.png",
        { frameWidth: 140, frameHeight: 300 },
      ], [
        "spritesheet",
        "personRing",
        "/game/personRing.png",
        { frameWidth: 400, frameHeight: 252 },
      ]
    ],
  },
  Scenes: {
    assets: [
      //planeta 1
      ["image", "plataformaNuevaA", "/game/planeta1/platforms/plataformaNuevaA.png"],
      ["image", "plataformaNuevaLargaA", "/game/planeta1/platforms/newPlatA.png"],
      ["image", "plataformaNuevaLargaB", "/game/planeta1/platforms/newPlatB.png"],
      ["image", "plataformaNuevaLargaC", "/game/planeta1/platforms/newPlatC.png"],
      ["image", "plataformaFinalP1", "/game/planeta1/platforms/plataformaFinal.png"],

      [
        "svg",
        "background0P1",
        "/game/planeta1/backgrounds/background0P1.svg",
        { scale: 1.8 }
      ],
      [
        "svg",
        "background1P1",
        "/game/planeta1/backgrounds/background1P1.svg",
        { scale: 1.8 }
      ],
      [
        "svg",
        "backgroundStars",
        "/game/planeta1/backgrounds/backgroundStars.svg",
        { scale: 1.8 }
      ],
      [
        "svg",
        "montañaEnd",
        "/game/planeta1/backgrounds/montañaEnd.svg",
        { scale: 3 }
      ],
      ["image", "frontGround1", "/game/planeta1/backgrounds/frontGround1.png"],
      ["image", "frontGround2", "/game/planeta1/backgrounds/frontGround2.png"],
      ["image", "cristal1", "/game/planeta1/cristal1.png"],
      ["image", "cristal2", "/game/planeta1/cristal2.png"],
      ["image", "cristal3", "/game/planeta1/cristal3.png"],
      ["image", "montaña1", "/game/planeta1/backgrounds/montaña1.png"],
      ["image", "montaña2", "/game/planeta1/backgrounds/montaña2.png"],
      ["image", "montaña3", "/game/planeta1/backgrounds/montaña3.png"],
      ["image", "montaña4", "/game/planeta1/backgrounds/montaña4.png"],
      ["image", "montaña5", "/game/planeta1/backgrounds/montaña5.png"],
      ["image", "nube1", "/game/planeta1/backgrounds/nube1.png"],
      ["image", "nube2", "/game/planeta1/backgrounds/nube2.png"],
      ["image", "nube3", "/game/planeta1/backgrounds/nube3.png"],
      ["image", "nube4", "/game/planeta1/backgrounds/nube4.png"],
      ["image", "nube5", "/game/planeta1/backgrounds/nube5.png"],


      ["image", "plataformaA", "/game/plataforma.png"],
      ["image", "plataformaB", "/game/plataforma2.png"],
      ["image", "plataformaLarga", "/game/plataformalarga.png"],
      ["image", "plataformaLarga2", "/game/plataformaLarga2.png"],
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

      ["image", "newBg1", "/game/bg1.png"],
      ["image", "newBg2", "/game/bg2.png"],
      ["image", "newBg3", "/game/bg3.png"],
      ["image", "newBg4", "/game/bg4.png"],
      ["image", "newBg5", "/game/bg5.png"],
      ["image", "newBg6", "/game/bg6.png"],


      ["image", "bg1Lvl1", "/game/lvl1/background/bg1.png"],
      ["image", "bg2Lvl1", "/game/lvl1/background/bg2.png"],
      ["image", "bg3Lvl1", "/game/lvl1/background/bg3.png"],
      ["image", "bg4Lvl1", "/game/lvl1/background/bg4.png"],
      ["image", "bg5Lvl1", "/game/lvl1/background/bg5.png"],
      ["image", "bg6Lvl1", "/game/lvl1/background/bg6.png"],
      ["image", "bg7Lvl1", "/game/lvl1/background/bg7.png"],
      ["image", "filtroFondo", "/game/lvl1/background/filtroFondo.png"],
      ["image", "filtroPiso", "/game/lvl1/background/filtroPiso.png"],
      ["image", "texturaPiso", "/game/lvl1/background/texturaPiso.png"],
      ["image", "piedras", "/game/lvl1/background/piedras.png"],
      ["image", "auraLvl1", "/game/lvl1/auraCristalLvl1.png"],
      ["image", "cristalLvl1", "/game/lvl1/cristalLvl1.png"],

      ["image", "plataformaLvl1", "/game/lvl1/plataformas/plataforma.png"],
      ["image", "plataformaInicioLvl1", "/game/lvl1/plataformas/plataformaInicio.png"],
      ["image", "plataformaMedioLvl1", "/game/lvl1/plataformas/plataformaMedio.png"],
      ["image", "plataformaFinLvl1", "/game/lvl1/plataformas/plataformaFin.png"],


      ["image", "piedra1", "/game/lvl1/plataformas/plataformaMedio.png"],
      ["image", "piedra2", "/game/lvl1/plataformas/plataformaMedio.png"],
      ["image", "piedra3", "/game/lvl1/plataformas/plataformaMedio.png"],

      // planeta2
      ["image", "bg", "/game/lvl2/background/bg.png"],
      ["image", "nube1", "/game/lvl2/background/nube1.png"],
      ["image", "nube2", "/game/lvl2/background/nube2.png"],
      ["image", "nube3", "/game/lvl2/background/nube3.png"],
      ["image", "nube4", "/game/lvl2/background/nube4.png"],
      ["image", "nube5", "/game/lvl2/background/nube5.png"],
      ["image", "nube6", "/game/lvl2/background/nube6.png"],
      ["image", "arbol", "/game/lvl2/background/arbol.png"],
      ["image", "arbol2", "/game/lvl2/background/arbol2.png"],
      ["image", "pisoLvl2", "/game/lvl2/background/piso_2.png"],
      ["image", "plataformaLvl2", "/game/lvl2/plataforma/plataforma.png"],
      ["image", "auraLvl2", "/game/lvl2/auraCristalLvl2.png"],
      ["image", "cristalLvl2", "/game/lvl2/cristalLvl2.png"],

      ["image", "plataformaInicioLvl2", "/game/lvl2/plataforma/plataformaInicio.png"],
      ["image", "plataformaMedioLvl2", "/game/lvl2/plataforma/plataformaMedio.png"],
      ["image", "plataformaFinLvl2", "/game/lvl2/plataforma/plataformaFin.png"],

      ["image", "starsLvl2", "/game/lvl2/background/stars.png"],
      ["image", "stars2Lvl2", "/game/lvl2/background/stars2.png"],
      ["image", "stars3Lvl2", "/game/lvl2/background/stars3.png"],
      ["image", "stars4Lvl2", "/game/lvl2/background/stars4.png"],

      // sun

      ["image", "bgSun1", "/game/lvl3/background/bg1.png"],
      ["image", "bgSun2", "/game/lvl3/background/bg2.png"],
      ["image", "bgSun3", "/game/lvl3/background/bg3.png"],
      ["image", "bgSun4", "/game/lvl3/background/bg4.png"],
      ["image", "bgSun5", "/game/lvl3/background/bg5.png"],

      ["image", "planetaSun1", "/game/lvl3/background/planet1.png"],
      ["image", "planetaSun2", "/game/lvl3/background/planet2.png"],
      ["image", "planetaSun3", "/game/lvl3/background/planet3.png"],
      ["image", "planetaSun4", "/game/lvl3/background/planet4.png"],

      ["image", "sol", "/game/lvl3/background/sol.png"],
      ["image", "brilloSol", "/game/lvl3/background/solBrillo.png"],
      ["image", "plataformaSun", "/game/lvl3/plataforma.png"],
      ["image", "plataformaInicioSun", "/game/lvl3/plataformaInicioSun.png"],
      ["image", "plataformaMedioSun", "/game/lvl3/plataformaMedioSun.png"],
      ["image", "plataformaFinSun", "/game/lvl3/plataformaFinSun.png"],
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
  Postales: {
    assets: [
      ["image", "postal1Planeta1", "/postals/planet1/postal1Planet1.png"],
      ["image", "postal2Planeta1", "/postals/planet1/postal2Planet1.png"],
      // ["image", "cine_capsula", "/game/cine_2.png"],
    ],
  },
};

// Scene in class
class AssetsLoader {
  scene: MultiScene;
  finished: boolean = false;
  constructor(scene: MultiScene) {
    // super({ key: "SceneLoader" });
    this.scene = scene
  }

  runPreload(this: AssetsLoader) {
    if (!this.finished) {

      this.scene.cameras.main.setBackgroundColor(
        Phaser.Display.Color.GetColor(30, 30, 30)
      );
      var width = this.scene.cameras.main.width;
      var height = this.scene.cameras.main.height;
      var loadingText = this.scene.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: "Loading...",
        style: {
          font: "20px monospace",
          color: "#ff0000",
        },
      });
      var progressBar = this.scene.add.graphics();
      var progressBox = this.scene.add.graphics();
      progressBox.fillStyle(0x222222, 0.8);
      progressBox.fillRect(width / 2 - 160, height / 2 + 100, 320, 50);

      loadingText.setOrigin(0.5, 0.5);

      var percentText = this.scene.make.text({
        x: width / 2,
        y: height / 2 - 5,
        text: "0%",
        style: {
          font: "18px monospace",
          color: "#ff0000",
        },
      });

      percentText.setOrigin(0.5, 0.5);

      var assetText = this.scene.make.text({
        x: width / 2,
        y: height / 2 + 50,
        text: "",
        style: {
          font: "18px monospace",
          color: "#ff0000",
        },
      });

      assetText.setOrigin(0.5, 0.5);

      this.scene.load.on("progress", function (value: number) {
        percentText.setText(Math.floor(Number(value * 100)) + "%");
        progressBar.clear();
        progressBar.fillStyle(0xff0000, 1);
        progressBar.fillRect(width / 2 - 160, height / 2 + 100, 300 * value, 30);
      });

      this.scene.load.on("fileprogress", function (file: any) {
        assetText.setText("Loading asset: " + file.key);
      });

      this.scene.load.once("complete", function (this: AssetsLoader) {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        assetText.destroy();
        this.finished = true
        // this.scene.scene.restart({text:"menu"})
        this.scene.makeTransition("Game", { level: 0, lifes: 3 });
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
        "Postales",
      ];
      for (let i = 0; i < scenesTitles.length; i++) {
        loadAssets[scenesTitles[i]].assets.map((sceneAssetConfig) => {
          const type = sceneAssetConfig[0] as LoadTypes;
          const name = sceneAssetConfig[1] as string;
          const src = sceneAssetConfig[2] as string;
          const config = sceneAssetConfig[3] as any;
          if (config) {
            this.scene.load[type](name, src, config);
          } else {
            this.scene.load[type](name, src);
          }
        });
      }
      /*Load Fonts*/
      const ArcadeFont = this.scene.add.text(0, 0, ":)", { fontFamily: "Arcade" });
    }
  }

  // función para developer
  makeTransition(sceneName: string, data: any) {
    const getBetweenScenesScene = this.scene.game.scene.getScene(
      "BetweenScenes"
    ) as BetweenScenes;
    if (getBetweenScenesScene) {
      if (getBetweenScenesScene.status != BetweenScenesStatus.IDLE)
        return false;
      getBetweenScenesScene.changeSceneTo(sceneName, data);
      this.scene.time.delayedCall(1000, () => {
        this.scene.scene.stop();
      });
    } else {
      this.scene.scene.start(sceneName, data);
      this.scene.time.delayedCall(1000, () => {
        this.scene.scene.stop();
      });
    }
  }

  update() {
  }
}

export default AssetsLoader;
