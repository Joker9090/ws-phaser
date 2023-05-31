import Phaser from "phaser";
import Scene4 from "./Scene1";

const loadAssets = {
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
    loadAssets["Scene1"].assets.map(([type, name, src]: any) => {
      // @ts-checkts-ignore
      this.load[type](name, src);
    })
  }

  create(this: SceneLoader, { level }: any) {
    //this.scene.start("Scene"+level);
    this.scene.start("Scene1", { "data": 1 })
  }

  update(this: SceneLoader) {

  }
}

export default SceneLoader 