import Phaser from "phaser";
import AssetsLoader, { SceneKeys } from "./multiScenes/assetsLoader";

export enum BetweenScenesStatus {
  IDLE,
  PROCCESSING,
  WAITING,
}
export default class PreLoadScene extends Phaser.Scene {
  callback: Function
  keyLoad: SceneKeys[] | undefined
  
  constructor(keyLoad: SceneKeys[] | undefined, callback: Function) {
    super({ key: "PreLoadScene" });
    this.keyLoad = keyLoad
    this.callback = callback
  }

  preload(){
      const assetLoaderClass = new AssetsLoader(this, this.keyLoad, false)
      assetLoaderClass.runPreload(() => {
        this.callback()
        this.scene.stop()
      })
  }
}
