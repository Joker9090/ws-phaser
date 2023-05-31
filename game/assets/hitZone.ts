import Phaser from "phaser";

class hitZone extends Phaser.GameObjects.Rectangle {
    group: Phaser.Physics.Arcade.Group;
    constructor(scene:Phaser.Scene , x: number, y: number, width: number, height: number, fillColor: number, fillAlpha: number,group: Phaser.Physics.Arcade.Group) {
        super(scene,x,y,width,height,fillColor,fillAlpha);

        //this.scene.physics.add.existing(this);
        //this.scene.add(this);
        this.setActive(false);
        scene.add.existing(this)
        this.group = group;
        this.group.add(this);
        if(this.body) {
            const body = (this.body as Phaser.Physics.Arcade.Body)
            body.setImmovable(true);
        }
        
        //getBounds

    }


    moveBox(x:number,y:number,flipX:boolean, magicNumber?: number){
        flipX ? this.x = this.x - x : this.x = this.x + x;
        this.y = y;
    }

    disableBox() {
        this.setActive(false);
    }

    activeBox() {
        this.setActive(true);
    }


    attackBox(x:number,y:number,flipX:boolean, callbackFn?: Function,magicNumber?: number) {

        this.moveBox(x,y,flipX);
        this.activeBox();
        const actionDef = "Ataco";
        //callbackFn(actionDef);
        setTimeout(() => {
            this.disableBox();
        },200)
        
    }
}
export default hitZone;