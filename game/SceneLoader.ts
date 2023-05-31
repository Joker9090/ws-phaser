import Phaser from "phaser";
import Scene1 from "./Scene1";

const loadAssets = {
  "Scene1": {
    assets: [
      ["image", "plataformaA", "/game/plataformaVioleta.png"],
      ["image", "plataformaB", "/game/base2.png"],
      ["image", "background", "/game/sky1.png"],
      /*
      ["image", "mountain1", "/game/mountain1.png"],
      ["image", "mountain2", "/game/mountain2.png"],
      ["image", "mountain3", "/game/mountain4.png"],
      */
      ["image", "sun", "/game/sun.png"],
      ["image", "nube", "/game/nube.png"],
      ["image", "templo", "/game/templo.png"],
      ["image", "cuevaArriba", "/game/cuevaArriba.png"],
      ["image", "wave1", "/game/wave1.png"],
      ["image", "wave2", "/game/wave2.png"],
      ["image", "wave3", "/game/wave3.png"],
      ["image", "heartsFull", "/game/heartsFull.png"],
      ["image", "heartsEmpty", "/game/heartsEmpty.png"],
      ["image", "stars", "/game/stars.png"],
      ["image", "sea", "/game/sea.png"],
      ["image", "sea", "/game/sea.png"],
      ["spritesheet", "character", "/game/whiteMonster.png", { frameWidth: 100, frameHeight: 100 }],
      ["spritesheet", "firework", "/game/firework.png", { frameWidth: 256, frameHeight: 256 }]
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
    loadAssets["Scene1"].assets.map(([type, name, src, config]: any) => {
      // @ts-checkts-ignore
      if (config) this.load[type](name, src, config);
      else this.load[type](name, src);


    })
  }

  create(this: SceneLoader, { level }: any) {
    this.scene.start("Scene1", { "data": 1 })
  }

  update(this: SceneLoader) {

  }
}

export default SceneLoader 