import Phaser from "phaser";

export enum SceneKeys { Menu = "Menu" /*, Scene = "Scenes", Tutorial = "Tutorial", Music = "Music" */}
export type LoadTypes = "image" | "spritesheet" | "audio";

const loadAssets = {
    "Menu": {
        assets: [
            ["image","background","/game/background.png"],
            ["image","arrow","/game/arrow.png"],
            ["audio", "songMenu", '/sounds/menu.mp3'],
            ["audio", "songLevel2", '/sounds/level2.mp3'],

        ]
    },
    /*
    "Scenes": {
        assets: [
            ["image", "background", "/game/background.png"],
            ["image", "plataformaA", "/game/platform1.png"],
            ["image", "plataformaB", "/game/platform1B.png"],
            ["image", "plataforma2", "/game/platform2.png"],
            ["image", "asteroid", "/game/asteroid.png"],
            ["image", "asteroid2", "/game/asteroid2.png"],
            ["image", "coin", "/game/coin.png"],
            ["image", "portal", "/game/portal.png"],
            ["image", "heart", "/game/heart.png"],
            ["image", "arrow", "/game/arrow.png"],
        ]
    },

    "Tutorial": {
        assets: [
            ["audio", "song", '/sounds/tutorial.mp3'],
            ["image", "fireball", "/game/fireball.png"],
        ]
    },
    "Music": {
        assets: [
            ["audio", "songTutorial", '/sounds/tutorial.mp3'],
            ["audio", "songLevel1", '/sounds/monchiSpace.mp3'],
            ["audio", "songLevel2", '/sounds/level2.mp3'],
            ["audio", "songWon", '/sounds/won.mp3'],
            ["audio", "songLose", '/sounds/lose.mp3'],
            ["audio", "songMenu", '/sounds/menu.mp3'],

        ]
    },
    */
};

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
                color: '#ff0000'
            }
        });
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 + 100, 320, 50);

        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                color: '#ff0000'
            }
        });

        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                color: '#ff0000'
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

        const scenesTitles: Array<SceneKeys> = Object.values(SceneKeys)
        for (let i = 0; i < scenesTitles.length; i++) {
            loadAssets[scenesTitles[i]].assets.map((sceneAssetConfig) => {
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
    };

    create(this: SceneLoader, { level }: any) {
        this.scene.start("Menu", { "data": 1 });
    };

    update(this: SceneLoader) {
    };
};

export default SceneLoader;