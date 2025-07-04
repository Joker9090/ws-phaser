import Phaser from "phaser";
import AssetsLoader, { SceneKeys } from "./multiScenes/assetsLoader";
import PreLoadScene from "./PreLoadScene";
import { CinematoDataType, GamePlayDataType } from "./Types";

export enum BetweenScenesStatus {
  IDLE,
  PROCCESSING,
  WAITING,
}
export default class BetweenScenesScene extends Phaser.Scene {
  status: BetweenScenesStatus;
  blocks?: Phaser.GameObjects.Group;
  newSceneName?: string;
  newSceneWith?: any;
  firstRender: boolean = true
  planeta?: Phaser.GameObjects.Image;

  startTime: number = 0
  constructor() {
    super({ key: "BetweenScenes" });
    this.status = BetweenScenesStatus.IDLE;
  }

  changeSceneTo(sceneName: string, data: CinematoDataType | GamePlayDataType | undefined) {
    if (this.status == BetweenScenesStatus.IDLE) {
      this.newSceneName = sceneName;
      this.newSceneWith = data;
      this.status = BetweenScenesStatus.PROCCESSING;
      this.scene.launch(this);
    }
  }

  loadNewScene() {
    if (this.status == BetweenScenesStatus.PROCCESSING) {
      this.status = BetweenScenesStatus.WAITING;
      if (this.newSceneName) {
        this.scene.launch(this.newSceneName, this.newSceneWith);
        this.scene.bringToTop();
      }
      this.turnOff();
    }
  }

  finishLogic() {
    this.newSceneName = undefined;
    this.newSceneWith = undefined;
    this.status = BetweenScenesStatus.IDLE;
    this.scene.remove('PreLoadScene')
    this.scene.remove('MultiScene')
    this.scene.stop();
  }

  turnOff() {
    this.planeta?.setVisible(false);

    const self = this;
    let i = 0;
    let ii = 0;

    //@ts-ignore
    this.blocks.children.iterate((c) => {
      const child = c as Phaser.GameObjects.GameObject;
      this.tweens.add({
        targets: child,
        // scale: 0,
        // angle: 180,
        alpha: 0,
        ease: "Expo.easeIn",
        duration: 1000,
        delay: i * 50,
        repeat: 0,
        yoyo: false,
        hold: 200,
        //  onCompleteParams: self,
        onComplete: ii == 107 ? self.finishLogic.bind(self) : () => { },
      });

      i++;
      ii++;

      if (i % 12 === 0) {
        i = 0;
      }
    });
  }
  
  onTurnOnComplete() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    this.planeta = this.add.image(width/2, height/2, "planetaLoader").setScale(0.6).setOrigin(0.5).setVisible(true);
    this.tweens.add({
      targets:this.planeta,
      alpha: 0.5,
      yoyo: true,
      repeat: -1,
      duration: 700,
    });
    // start PreLoadScene to load the next scene
    const preloadScene = new PreLoadScene(this.newSceneWith && this.newSceneWith.loadKey ? this.newSceneWith.loadKey : undefined, () => {
      // set this.turnOff() after 2 seconds
      this.time.delayedCall(2000, () => {
        this.loadNewScene()
        this.turnOff();
      }, [], this);
    });

    const scene = this.scene.add("PreLoadScene", preloadScene, true);
    this.game.scene.start("PreLoadScene").bringToTop("PreLoadScene");

  }
  turnOn() {
    const self = this;
    let i = 0;
    let ii = 0;
    //@ts-ignore
    this.blocks.children.iterate((c) => {
      const child = c as Phaser.GameObjects.GameObject;
      const { width, height } = this.cameras.main;
      const scale = Math.max(width / 20, height / 15);
      this.tweens.add({
        targets: child,
        // scale: scale,
        // angle: 180,
        alpha: 1,
        ease: "Expo.easeIn",
        duration: 1000,
        delay: i * 50,
        repeat: 0,
        yoyo: false,
        hold: 200,
        onComplete: ii == 107 ? this.onTurnOnComplete.bind(self) : () => { },
      });
      i++;
      ii++;

      if (i % 12 === 0) {
        i = 0;
      }
    });
  }

  create() {
    this.firstRender = true
    // this.blocks = this.add.group({
    //   key: "block",
    //   repeat: 107,
    //   setScale: { x: 0, y: 0 },
    // });

    // const { width, height } = this.cameras.main;
    // Phaser.Actions.GridAlign(this.blocks.getChildren(), {
    //   width: 12,
    //   height: 9,
    //   cellWidth: width / 12,
    //   cellHeight: height / 9,
    //   x: 0,
    //   y: 0,
    // });
    // setTimeout(() => {
    //   this.turnOn();
    // }, 1000)

    this.blocks = this.add.group({
      key: "block",
      repeat: (12 * 9) - 1,
      setScale: { x: 0, y: 0 },
    });

    const { width, height } = this.cameras.main;

    //@ts-ignore
    this.blocks.getChildren().forEach((child: Phaser.GameObjects.Sprite, i) => {
      child.setOrigin(0.5, 0.5);
      child.displayWidth = Math.ceil(width / 12) ;
      child.displayHeight = Math.ceil(height / 9);
      child.setAlpha(0);
      child.setTint(0x000000);
    })

    console.log(width, height);
    Phaser.Actions.GridAlign(this.blocks.getChildren(), {
      width: 12,
      height: 9,
      cellWidth: Math.ceil(width / 12),
      cellHeight: Math.ceil(height / 9),
      x: 0,
      y: 0,
      position: Phaser.Display.Align.CENTER,
    });

  }

  update(time: number) {
    if (this.startTime == 0) {
      this.startTime = time
    }


    if (this.firstRender && time - this.startTime >980) {
      this.firstRender = false
      this.turnOn();
      
    }
  }
}
