import UIClass from "./assets/UIClass";
import resultContainer from "./containersMenu/resultContainer";
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
  loadKey?: SceneKeys[],
  startingPositionFromOtherScene?: {
    x: number,
    y: number
  }
}

export type CinematoDataType = {
  keyname: string
  lifes?: number
  loadKey?: SceneKeys[],
  code?:string
}

export type ContainerMenuConfigType = {
  x: number,
  y: number,
  dinamicPosition?: boolean,
  panToCredits?: {
    x: number,
    y:number
  },
  panToInitial?: {
    x: number,
    y:number
  },
  panToPlay?: {
    x: number,
    y:number
  },
  panToSettings?:{
    x:number,
    y:number
  }
  panToCode?:{
    x:number,
    y:number
  },
  changeContainer?:()=>void
}

export type resultContainerConfigType = {
  collText?:string,
  coinCount?:number,
  x:number,
  y:number,
  lifes?:number,
  victory:boolean,
  planeta:number,

}