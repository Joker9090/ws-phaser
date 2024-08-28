
export type loseConfigFromMapType = {
    positions: {
      x: number,
      y: number,
    }
    cameraDirection: 'NORMAL' | 'ROTATED' 
    PlayerDirection: 'NORMAL' | 'ROTATED' 
    gravityDown: boolean
}[];