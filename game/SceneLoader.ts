import Phaser from "phaser"
import Scene1 from "./Scene1"
import Menu from "./Menu"

const loadAssets = {
    "Menu": {
        assets: [
            ["image", "background", "game/background.png"],
            ["image", "glass", "game/glass.png"],
            ["image", "cursor", "game/cursor.png"],
            ["spritesheet", "monchi", "game/character.png", { frameWidth: 220, frameHeight: 162 }],
        ]
    },
    "Scene1": {
        assets: [
            ["image", "background", "/game/background.png"],
            ["image", "plataformaA", "/game/platform1.png"],
            ["image", "plataformaB", "/game/platform1B.png"],
            ["image", "plataforma2", "/game/platform2.png"],
            ["image", "asteroid", "/game/asteroid.png"],
            ["image", "asteroid2", "/game/asteroid2.png"],
            ["image", "coin", "/game/coin.png"],
            ["image", "portal", "/game/portal.png"],
            ["spritesheet", "character", "/game/character.png", { frameWidth: 220, frameHeight: 162 }],
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

        loadAssets["Scene1"].assets.map(([type, name, src, config]:any) => {
            // @ts-checkts-ignore
            if (config) {
                this.load[type](name, src, config)
            }
            else {
                this.load[type](name, src)
            }
      
      
          })
    }

    create(this: SceneLoader, { level }: any) {
        this.scene.start("Scene1", { "data": 1 })
    }

    update(this: SceneLoader) {

    }
}

export default SceneLoader 