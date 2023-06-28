import Phaser from "phaser";
import Scene4 from "./Scene4";
import StartMenu from "./StartMenu";
import { type } from "os";

export type SceneKeys = "StartMenu" | "Game" | "Music";
export type LoadTypes = "image" | "spritesheet" | "audio" | "font"


const loadAssets = {
    "StartMenu": {
        assets: [
            ["image", "menu", "/game/menu.png"],
            ["image", "menuButton", "/game/menuButton.png"],
            ["image", "iconBG", "/game/iconBG.png"],
        ]
    },
    "Game": {
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
            ['image', 'flare', 'game/flare.png'],
            ['image', 'logo', 'game/logo.png']

        ]
    },
    "Music": {
        assets: [
            ["audio", "BGmusic", "/game/BGmusic.wav"],
            ["audio", "CoinPickUp", "/game/coinSound.mp3"],
            ["audio", "Damage", "/game/damage.mp3"],
            ["audio", "GameOver", "/game/gameOver.mp3"]


        ]
    }
}

// Scene in class
class SceneLoader extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneLoader' });
    };
    preload(this: Phaser.Scene) {

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                color: '#141452'
            }
        });
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(141452, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 + 100, 320, 50);

        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                color: '#141452'
            }
        });

        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                color: '#141452'
            }
        });

        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value: number) {
            percentText.setText(Number(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xff0000, 1);
            progressBar.fillRect(width / 2 - 160, height / 2 + 100, 300 * value, 30);
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
        const scenesTitles: Array<SceneKeys> = ["StartMenu", "Game", "Music"];
        for (let i = 0; i < scenesTitles.length; i++) {
            const assets = loadAssets[scenesTitles[i]].assets
            assets.map((sceneAssetConfig: any) => {
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
        // Load Fonts
        const ArcadeFont = this.add.text(0, 0, 'PRUEBA TEXTO', { fontFamily: 'Guardians', })
    };

    create(this: SceneLoader, { level }: any) {
        //this.scene.start("Sandbox", { "data": 1 });
        this.scene.start("StartMenu", { "data": 1 });

    };

    update(this: SceneLoader) {
    };
};

export default SceneLoader 