import { SceneKeys } from "./multiScenes/assetsLoader";

export type loseConfigFromMapType = {
    positions: {
      x: number,
      y: number,
    }
    cameraDirection: 'NORMAL' | 'ROTATED' 
    PlayerDirection: 'NORMAL' | 'ROTATED' 
    gravityDown: boolean
}[];

export type GamePlayDataType = {
  level: number
  lifes: number
  loadKey?: SceneKeys
}

export type CinematoDataType = {
  keyname: string
  lifes?: number
  loadKey?: SceneKeys
}