import Phaser from "phaser";
import Scene4 from "./Scene4";
import StartMenu from "./StartMenu";

const loadAssets = { 
    "game": {
        assets: [
            ["image", "plataforma1", "/game/platform1.png"],
            ["image", "plataforma2", "/game/platform2.png"],
            ["image", "plataforma3", "/game/platform1B.png"],
            ["image", "saw", "/game/sierra5.png"],
            ["image", "background", "/game/background.png"],
            ["image", "diamond", "/game/diamante2.png"],
            ["image", "life", "/game/life.png"],
            ["image", "lifeFilling", "/game/lifeRelleno.png"],
            ["image", "close", "/game/close.png"],
            ["image", "spikes", "/game/spikes.png"],
            ["spritesheet", "run", "/game/Run.png", { frameWidth: 128, frameHeight: 128 }],
            ["image", "emptyHeart", "/game/ui_heart_empty.png"],
            ["image", "fullHeart", "/game/ui_heart_full.png"],
            ["image", "menu", "/game/menu.png"],
            ["image", "menuButton", "/game/menuButton.png"],
            ["image", "iconBG", "/game/iconBG.png"],
            // ["font","rollBox","/css/RollboxRegular-jE2lv.ttf"]
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

        loadAssets["game"].assets.map(([type, name, src, config]: any) => {
            // @ts-checkts-ignore
            if (config) this.load[type](name, src, config);
            else this.load[type](name, src);
        })

    }

    create(this: SceneLoader, { level }: any) {
        this.scene.start("StartMenu", { "data": 1 })
    }

    update(this: SceneLoader) {

    }
}

export default SceneLoader 