
import Phaser from "phaser";


// Scene in class
class PictureCredits extends Phaser.GameObjects.Container {
    pictureBox?: Phaser.GameObjects.Sprite;
    picture?: Phaser.GameObjects.Sprite;
    scaleBox?: number;
    randomNumber: number = .3;
    progress: number = 0;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, textureBox: string | Phaser.Textures.Texture, scaleBox: number) {
        super(scene);
        this.scene = scene;
        this.progress = 0;
        this.scaleBox = scaleBox;
        this.randomNumber = this.randomProp()
        this.pictureBox = this.scene.add.sprite(0, 0, textureBox).setOrigin(0.5).setScale(scaleBox).setRotation(this.randomNumber);
        this.picture = this.scene.add.sprite(0, 0, texture).setOrigin(0.5);
        this.add([this.picture, this.pictureBox]);
        scene.add.existing(this);
        this.setPosition(x, y);
    };

    update() {
        if (this.pictureBox) {
            if(this.randomNumber){
                    console.log("aca")
                    this.progress += Math.PI / 1000 * this.randomNumber
                    this.pictureBox.setRotation(this.progress)          
            };
        };
    };

    randomProp() {
        return window.Phaser.Math.Between(6, 9) / 10;
    };
}
export default PictureCredits;
