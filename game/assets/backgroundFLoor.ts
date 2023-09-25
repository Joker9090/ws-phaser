import Phaser from "phaser";
import Game from "../Game";
export type bgFloorConfig = {
    texture: string,
    screenWidth?: number,
    pngWidth?: number,
    pos: { x: number, y: number },
    scene: Game
}
class backgroundFloor extends Phaser.GameObjects.Container {
    texture: string
    constructor(
        config: bgFloorConfig,
    ) {
        super(config.scene, config.pos.x, config.pos.y)
        this.texture = config.texture
    }

    create() {

    }

}