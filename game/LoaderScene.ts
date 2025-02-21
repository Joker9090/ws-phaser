import Phaser from "phaser";
import { loadAssets, LoadTypes, SceneKeys } from "./multiScenes/assetsLoader";

export default class LoaderScene extends Phaser.Scene {
 
  finished: boolean = false
  firstLoad: boolean = true
  progressBar: Phaser.GameObjects.Graphics | undefined
  progressBox: Phaser.GameObjects.Graphics | undefined
  monchi: Phaser.GameObjects.Sprite | undefined
  loadKey: SceneKeys[] = ["BaseLoad","Cinemato0", "Cinemato1", "Cinemato2", "Cinemato3","GamePlay1", "GamePlay2", "GamePlay3"]
  alreadyLoaded: boolean = false
  constructor() {
    super({ key: "LoaderScene" });
  }


  preload() {

    

    this.load.image("gameTitle", "/menu/initial/gameTitle.png");
    this.load.image("fondoCarga", "/menu/initial/fondoCarga.png");
    
    this.load.spritesheet("player",  "/game/player/playerSpriteSheet.png",  { frameWidth: 200, frameHeight: 200 });
    
    // check if gameTitle, fondoCarga, player are loaded and callback the runPreload FN
    
    const scenesTitles: Array<SceneKeys> = this.loadKey
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
   

    this.checkAssetLoaded()
   
  }

  checkAssetLoaded() {
    this.time.delayedCall(100, () => {
     if (this.textures.exists("gameTitle") && this.textures.exists("fondoCarga") && this.textures.exists("player")) {
        this.runPreload(() => {
          this.scene.start("MultiScene");
        })
      } else {
        this.checkAssetLoaded()
      }
    }, [], this)
  }

   runPreload(callback?: Function) {
      if (!this.finished) {
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        // this.monchi?.moveOnLoader();
        this.time.delayedCall(this.firstLoad ? 120 : 0, () => {
          var loadingText = this.make.text({
            x: width / 2,
            y: height -200,
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
            })
          
            this.progressBar = this.add.graphics();
            this.progressBox = this.add.graphics();
            this.progressBox.fillStyle(0x222222, 0);
            this.progressBox.fillRoundedRect(width / 2 - 160, height / 2 + 100, 315, 60, 20);
            this.progressBox.lineStyle(4, 0x00ffff, 1);
            this.progressBox.strokeRoundedRect(width / 2 - 160, height / 2 + 100, 315, 60, 10);
            var gameTitle = this.add.image(0, 0, "gameTitle");
            var background = this.add.image(0, 0, "fondoCarga");
            background.setPosition(width / 2, height / 2).setDepth(-1);
            gameTitle.setPosition(width / 2, height / 2 -300).setDepth(999999999).setScale(0.5);       
            this.anims.create({
              key: "loading",
              frameRate:16,
              frames: this.anims.generateFrameNumbers("player", {frames: Array.from({ length: 12 }, (_, i) => i + 48)}),
              repeat: -1,
            })   
            this.monchi = this.add.sprite(width / 2 -152 +275, height / 2, "player", 2).setDepth(999999999).setScale(0.8).setVisible(false);
            this.monchi.play("loading");
          
            this.load.on("progress", (value: number) => {
              // percentText.setText(Math.floor(Number(value * 100)) + "%");
              console.log(value, "VALUE"),
              this.progressBar?.clear();
              this.progressBar?.fillStyle(0xff0000, 1);
              const segmentWidth = 25;
              this.progressBar?.fillStyle(0xffffff, 1);
              const segments = Math.floor((300 * value) / segmentWidth);
              this.monchi?.setDepth(999999999);
              for (let i = 0; i < segments; i++) {
              
                this.progressBar?.fillRoundedRect(width / 2 - 152 + i * segmentWidth, height / 2 + 110,segmentWidth - 2,40,5);
                this.monchi?.setPosition(width / 2 - 152 + i * segmentWidth, height / 2).setVisible(true);
      
              }
          })
       
       
        });
  
        this.load.once("complete", function (this: LoaderScene) {
          this.progressBar?.destroy();
          this.progressBox?.destroy();
          // loadingText.destroy();
          // percentText.destroy();
          // assetText.destroy();
          this.monchi?.destroy();
          this.finished = true;
          if (callback) callback()
        });
  
  
        
        const ArcadeFont = this.add.text(0, 0, " .", {
          fontFamily: "Arcade",
        });
        
      }
    }
  
  

  create() {
    console.log("ENTRO ACA CREATE DE LOADER SCENE");
  }
}
