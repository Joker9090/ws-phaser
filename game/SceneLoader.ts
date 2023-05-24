
import Phaser from "phaser";
import Scene4 from "./Scene4";

const loadAssets = {
  "Scene4": {
    assets: [
      ["image", "car", "/game/carSide1.png"],
      ["image", "carEnemy", "/game/carSide2.png"],
      ["image", "roadSide", "/game/roadSide.png"],
      ["image", "cloud", "/game/cloud.png"],
      ["image", "powerBarFull", "/game/powerBarFull.png"],
      ["image", "powerBarEmpty", "/game/powerBarEmpty.png"],
      ["image", "nightSky", "/game/nightSky.png"],
      ["image", "nightSkyTop", "/game/nightSkyTop.png"],
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
    loadAssets["Scene4"].assets.map(([type, name, src]: any) => {
      // @ts-ignore
      this.load[type](name, src);
    })
  }

  create(this: SceneLoader) {
    this.scene.start("Scene4", { "data": 1 })
  }

  update(this: SceneLoader) {

  }
}

export default SceneLoader 