
import Phaser from "phaser";


// Scene in class
class PictureCredits extends Phaser.GameObjects.Container {
    pictureBox?: Phaser.GameObjects.Sprite;
    picture?: Phaser.GameObjects.Sprite;
    scaleBox?: number;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture , textureBox: string | Phaser.Textures.Texture, scaleBox: number) {
        super(scene);
        this.scene = scene;
        this.scaleBox = scaleBox
        this.pictureBox = this.scene.add.sprite(0,0,textureBox).setOrigin(0.5).setScale(scaleBox);
        this.picture = this.scene.add.sprite(0,0,texture).setOrigin(0.5);
        this.add([this.picture, this.pictureBox]);
        scene.add.existing(this);
        this.setPosition(x, y);
    };
}
export default PictureCredits;
