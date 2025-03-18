import Phaser from "phaser";
import { loadAssets, LoadTypes, SceneKeys } from "./multiScenes/assetsLoader";

export default class LoaderScene extends Phaser.Scene {
  gameTitle: Phaser.GameObjects.Image | undefined;
  finished: boolean = false;
  firstLoad: boolean = true;
  progressBar: Phaser.GameObjects.Graphics | undefined;
  progressBox: Phaser.GameObjects.Graphics | undefined;
  player: Phaser.GameObjects.Sprite | undefined;
  loadKey: SceneKeys[] = ["BaseLoad", "Cinemato0", "Cinemato1", "Cinemato2", "Cinemato3", "GamePlay1", "GamePlay2", "GamePlay3"];
  alreadyLoaded: boolean = false;

  constructor() {
    super({ key: "LoaderScene" });
  }

  preload() {
    this.load.image("gameTitle", "/menu/initial/gameTitle.png");
    this.load.image("fondoCarga", "/menu/initial/fondoCarga.png");
    this.load.image("planetaLoader", "/menu/initial/planetaLoader.png");

    this.load.spritesheet("player", "/game/player/playerSpriteSheet.png", { frameWidth: 200, frameHeight: 200 });

    // Load additional assets
    const scenesTitles: Array<SceneKeys> = this.loadKey;
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

    this.checkAssetLoaded();
  }

  checkAssetLoaded() {
    this.time.delayedCall(100, () => {
      if (this.textures.exists("gameTitle") && this.textures.exists("fondoCarga") && this.textures.exists("player")) {
        this.runPreload(() => {
          this.scene.start("MultiScene");
        });
      } else {
        this.checkAssetLoaded();
      }
    }, [], this);
  }

  runPreload(callback?: Function) {
    if (!this.finished) {
      const width = this.cameras.main.width;
      const height = this.cameras.main.height;

      this.time.delayedCall(this.firstLoad ? 120 : 0, () => {
        // Create the loading elements
        let loadingText = this.make.text({
          x: width / 2,
          y: height - 200,
          text: "Loading...",
          style: {
            font: "30px monospace",
            color: "#ffffff",
          },
        }).setAlpha(0.1);

        loadingText.setOrigin(0.5, 0.5);

        this.tweens.add({
          targets: loadingText,
          alpha: 1,
          duration: 1000,
          loop: -1,
          yoyo: true,
        });

        const progressContainer = this.add.container(0, 0); // Create a container
        this.progressBar = this.add.graphics();
        this.progressBox = this.add.graphics();
        this.progressBox.fillStyle(0x222222, 0);
        this.progressBox.fillRoundedRect(-160, 100, 315, 60, 20); // Adjusted to be relative to the container
        this.progressBox.lineStyle(4, 0x00ffff, 1);
        this.progressBox.strokeRoundedRect(-160, 100, 315, 60, 10); // Adjusted to be relative to the container

        progressContainer.add([this.progressBox, this.progressBar]); // Add graphics to the container
        progressContainer.setPosition(width / 2, height / 2); // Position the container

        this.gameTitle = this.add.image(0, 0, "gameTitle");
        var background = this.add.image(0, 0, "fondoCarga");
        background.setPosition(width / 2, height / 2).setDepth(-1);
        this.gameTitle.setPosition(width / 2, height / 2 - 300).setDepth(999999999).setScale(0.5);

        this.anims.create({
          key: "loading",
          frameRate: 16,
          frames: this.anims.generateFrameNumbers("player", { frames: Array.from({ length: 12 }, (_, i) => i + 48) }),
          repeat: -1,
        });

        this.player = this.add.sprite(width / 2 - 152 + 275, height / 2, "player", 2).setDepth(999999999).setScale(0.8).setVisible(false);
        this.player.play("loading");

        this.load.on("progress", (value: number) => {
          this.progressBar?.clear();
          this.progressBar?.fillStyle(0xffffff, 1);
          const segmentWidth = 25;
          const segments = Math.floor((300 * value) / segmentWidth);
          for (let i = 0; i < segments; i++) {
            this.progressBar?.fillRoundedRect(-152 + i * segmentWidth, 110, segmentWidth - 2, 40, 5); // Adjusted to be relative to the container
            this.player?.setPosition(progressContainer.x - 152 + segments * segmentWidth, progressContainer.y).setVisible(true); // Adjusted to account for container position
          }
        });
      });

      this.load.once("complete", function (this: LoaderScene) {
        this.progressBar?.destroy();
        this.progressBox?.destroy();
        this.player?.destroy();
        this.finished = true;
        if (callback) callback();
      });

      // Automatically adjust elements on resize
      this.scale.on("resize", this.resizeElements, this);
    }
  }

  resizeElements() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (this.gameTitle) {
      this.gameTitle.setPosition(width / 2, height / 2 - 300).setScale(0.5);
    }

    const background = this.children.getByName("fondoCarga") as Phaser.GameObjects.Image;
    const progressContainer = this.children.getByName("progressContainer") as Phaser.GameObjects.Container;

    if (progressContainer) {
      progressContainer.setPosition(width / 2, height / 2);
    }

    if (background) {
      background.setPosition(width / 2, height / 2).setDisplaySize(width, height);
    }

    if (this.player) {
      this.player.setPosition(width / 2 - 152 + 275, height / 2);
    }
  }

  create() {
    console.log("LoaderScene created");

    // Resize elements when the scene is created
    this.resizeElements();
  }
}
