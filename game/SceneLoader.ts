import Phaser from "phaser";
import Scene4 from "./Scene1";

export type SceneKeys = "Menu" | "Scene1" | "UIScene";

export type LoadTypes = "image" | "audio" | "spritesheet";

const loadAssets = {
  "Menu": {
    assets: [

    ]
  },
  "Scene1": {
    assets: [
      ["image", "plataformaA", "/game/platform1.png"],
      ["image", "plataformaB", "/game/platform1B.png"],
      ["image", "particleFire", "/game/particleFire.png"],
      ["image", "islandA", "/game/islandA.png"],
      ["image", "islandB", "/game/islandB.png"],
      ["image", "islandC", "/game/islandC.png"],
      ["image", "lava1", "/game/lava1.png"],
      ["image", "lava2", "/game/lava2.png"],
      ["image", "tile1", "/game/tile1.png"],
      ["image", "tile3", "/game/tile3.png"],
      ["image", "sky", "/game/background.png"],
      ["image", "nubee", "/game/nube.png"],
      ["image", "neblina", "/game/myst.png"],
      ["image", "crystal", "/game/Yellow_crystal1.png"],
      ["image", "tree", "/game/tree.png"],
      ["image", "pisoA", "/game/pisoA.png"],
      ["image", "healthBarWithAlpha", "/game/UI/healthBarWithAlpha.png"],
      ["image", "greenBar", "/game/UI/greenBar.png"],
      ["image", "doorCueva", "/game/doorCueva.png"],
      ["image", "BackgroundNew", "/game/BackgroundNew.png"],
      ["spritesheet", "character", "/game/character.png", { frameWidth: 220, frameHeight: 162}],
      ["spritesheet", "knight", "/game/Knight.png", { frameWidth: 86, frameHeight: 86}],
      ["spritesheet", "playerNew", "/game/playerNew.png", { frameWidth: 800, frameHeight: 800}],
      ["spritesheet", "Enemy1", "/game/newAssets/Enemy1.png", { frameWidth: 500, frameHeight: 500}],
      ["spritesheet", "Enemy2", "/game/newAssets/Enemy2.png", { frameWidth: 500, frameHeight: 500}],
      ["spritesheet", "Enemy3", "/game/newAssets/Enemy3.png", { frameWidth: 500, frameHeight: 500}],
      ["spritesheet", "Enemy4", "/game/newAssets/Enemy4.png", { frameWidth: 500, frameHeight: 500}],
      ["spritesheet", "Enemy5", "/game/newAssets/Enemy5.png", { frameWidth: 500, frameHeight: 500}],
      ["spritesheet", "Enemy6", "/game/newAssets/Enemy6.png", { frameWidth: 500, frameHeight: 500}],
      ["spritesheet", "Boss1", "/game/newAssets/Boss1.png", { frameWidth: 600, frameHeight: 600}],
      ["spritesheet", "Boss2", "/game/newAssets/Boss2.png", { frameWidth: 600, frameHeight: 600}],
      ["spritesheet", "Boss3", "/game/newAssets/Boss3.png", { frameWidth: 600, frameHeight: 600}],
      ["spritesheet", "Boss4", "/game/newAssets/Boss4.png", { frameWidth: 600, frameHeight: 600}],
      ["image", "Heroe1", "/game/newAssets/Heroe.png"],
      ["spritesheet", "skeleton", "/game/skeleton.png", { frameWidth: 86, frameHeight: 86}],
      ["spritesheet", "archimago", "/game/archimago.png", { frameWidth: 128, frameHeight: 128}],
      ["spritesheet", "antorcha", "/game/Antorcha.png", { frameWidth: 128, frameHeight: 128}],
      ["spritesheet", "heartFullUI", "/game/UI/heart.png", { frameWidth: 32, frameHeight: 32}],
      ["audio","backgroundSound", "/game/sounds/a_dungeon_ambience_loop-79423.mp3"],
      ["audio","backgroundSoundBossBattleStart", "/game/sounds/heroic-intro-21468.mp3"],
      ["audio","backgroundSoundBossBattle", "/game/sounds/exiting-spicatos-16208.mp3"],
      ["audio","swordHit", "/game/sounds/sword-hit-7160.mp3"],
      ["audio","swordAir", "/game/sounds/sword-sound-2-36274.mp3"],
      ["audio","playerWalk", "/game/sounds/running-sounds-6003.mp3"],
      ["audio","playerHurt", "/game/sounds/umph-47201.mp3"],
      ["audio","archimagoFire", "/game/sounds/magic-spell-6005.mp3"],
    ]
  },
  "UIScene": {
    assets: [
      ["image", "ContenedorBarra", "/game/newUI/ContenedorBarra.png"],
      ["image", "ContadorEnemigos", "/game/newUI/ContadorEnemigos.png"],
      ["image", "InsigniaPoder", "/game/newUI/InsigniaPoder.png"],
      ["image", "SettingsButton", "/game/newUI/SettingsButton.png"],
      ["image", "CloseButton", "/game/newUI/CloseButton.png"],
      ["image", "BarraPoder", "/game/newUI/BarraPoder.png"],
      ["image", "BarraVida", "/game/newUI/BarraVida.png"],
      ["image", "ContenedorBarraPoder", "/game/newUI/ContenedorBarraPoder.png"],
      ["image", "FondoBarraVida", "/game/newUI/FondoBarraVida.png"],
      ["image", "ProgresoBorde", "/game/newUI/ProgresoBorde.png"],
      ["image", "ProgresoRellenop", "/game/newUI/ProgresoRellenop.png"],
    ]
  }
}

// Scene in class
class SceneLoader extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneLoader' })
  }
  preload(this: Phaser.Scene) {
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        color: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        color: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        color: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', function (value: number) {
      percentText.setText(Number(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', function (file: any) {
      assetText.setText('Loading asset: ' + file.key);
    });
    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

    const sceneTitles: Array <SceneKeys> = ["Menu","Scene1","UIScene"];
    for (let i = 0; i < sceneTitles.length; i++) {
          //loadAssets["Scene1"].assets.map(([type, name, src,config]: any) => {
      loadAssets[sceneTitles[i]].assets.map((sceneAssetConfig) => {
        const type = sceneAssetConfig[0] as LoadTypes;
        const name = sceneAssetConfig[1] as string;
        const src = sceneAssetConfig[2] as string;
        const config = sceneAssetConfig[3] as any;
        if (config) {
          this.load[type](name, src, config);
        }
        else {
          this.load[type](name, src);
        }
      });
    };

  }

  create(this: SceneLoader, { dataLevel }: any) {
    //this.scene.start("Scene"+level);
    console.log("dataaaaa sceneloader ",dataLevel);
    this.scene.start("Scene1", { "dataLevel": 2 })
    this.scene.start("UIScene",{ "dataLevel": 2 });
  }

  update(this: SceneLoader) {

  }
}

export default SceneLoader 