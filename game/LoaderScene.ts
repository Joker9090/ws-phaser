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
  background:  Phaser.GameObjects.Image | undefined;
  scaledContainer: Phaser.GameObjects.Container | undefined;

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

      const midPoint = {
        x: width / 2,
        y: height / 2,
      }

      this.time.delayedCall(this.firstLoad ? 120 : 0, () => {
        // Create the loading elements
        let loadingText = this.make.text({
          x: 0,
          y: 200,
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

        const progressContainer = this.add.container(0,0); // Create a container
        this.progressBar = this.add.graphics();
        this.progressBox = this.add.graphics();
        this.progressBox.fillStyle(0x222222, 0);
        this.progressBox.fillRoundedRect(-160, 100, 315, 60, 20); // Adjusted to be relative to the container
        this.progressBox.lineStyle(4, 0x00ffff, 1);
        this.progressBox.strokeRoundedRect(-160, 100, 315, 60, 10); // Adjusted to be relative to the container

        progressContainer.add([this.progressBox, this.progressBar]); // Add graphics to the container

        this.background = this.add.image(0, 0, "fondoCarga");
        this.background.setPosition(midPoint.x, midPoint.y).setDepth(-1);


        

        this.gameTitle = this.add.image(0, -midPoint.y, "gameTitle").setScale(0.4).setOrigin(0.5,-0.1)

       

        this.scaledContainer = this.add.container(midPoint.x, midPoint.y).setSize(window.innerWidth, window.innerHeight);
        this.scaledContainer.add(this.gameTitle);
        this.scaledContainer.add(progressContainer);
        this.scaledContainer.add(loadingText)


        // add black background to container
    
        // this.scaledContainer.add(this.add.image(midPoint.x, midPoint.y, "planetaLoader").setOrigin(0.5, 0.5));
    


        // this.gameTitle.setPosition(midPoint.x, midpoint.y - 300).setDepth(999999999);

        this.anims.create({
          key: "loading",
          frameRate: 16,
          frames: this.anims.generateFrameNumbers("player", { frames: Array.from({ length: 12 }, (_, i) => i + 48) }),
          repeat: -1,
        });

        this.player = this.add.sprite(-152, 0, "player", 2).setDepth(999999999).setScale(0.8).setVisible(false);
        this.scaledContainer?.add(this.player!)

        this.player.play("loading");

        this.load.on("progress", (value: number) => {
          this.progressBar?.clear();
          this.progressBar?.fillStyle(0xffffff, 1);
          const segmentWidth = 25;
          const segments = Math.floor((300 * value) / segmentWidth);
          for (let i = 0; i < segments; i++) {
            this.progressBar?.fillRoundedRect(-152 + i * segmentWidth, 110, segmentWidth - 2, 40, 5); // Adjusted to be relative to the container
            this.player?.setPosition(-152 + (segments * segmentWidth),0).setVisible(true); // Adjusted to account for container position
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
      this.resizeElements.bind(this)()
    }
    // this.cameras.main.setZoom(0.)
    
  }

  resizeElements() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const midPoint = {
      x: width / 2,
      y: height / 2,
    }
    
    const proportionWidth = 1024
    const proportionHeight = 768

    // scale scaledContainer to fit in width and height. scale proportional

    let newScaleX = width / proportionWidth
    let newScaleY = height / proportionHeight
    if(!this.scaledContainer) return
    let finalScale = (newScaleX > newScaleY) ? newScaleY : newScaleX
    this.scaledContainer!.setScale(finalScale).setPosition(midPoint.x,midPoint.y)

    this.background?.setPosition(midPoint.x, midPoint.y).setScale(finalScale)
    // re pos scaledContainer in the middle
  }

  create() {
    console.log("LoaderScene created");

    // Resize elements when the scene is created
  
    this.resizeElements();
  }
}
