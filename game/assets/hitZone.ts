import Phaser from "phaser";

class hitZone extends Phaser.GameObjects.Rectangle {
    //group: Phaser.Physics.Arcade.Group;
    constructor(scene:Phaser.Scene , x: number, y: number, width: number, height: number, fillColor: number, fillAlpha: number) {
        super(scene,x,y,width,height,fillColor,fillAlpha);

        //static body igual q rectangulo del mismo tamaño o chequear si matchea el overlap, eliminar para q no golpee tantas veces
        //this.scene.add(this);
        this.setActive(false);
        scene.add.existing(this)
        this.scene.physics.add.existing(this,true);
        //this.group = group;
        //this.group.add(this);
        //if(this.body) {
        //    const body = (this.body as Phaser.Physics.Arcade.Body)
        //    body.setImmovable(true);
        //}
        
        //getBounds

    }


    moveBox(x:number,y:number,flipX:boolean, magicNumber: number){
        console.log("entro bartoo movebox");
        if(flipX) {
            this.x = x - magicNumber;
        } else {
            this.x = x + magicNumber;
        }
        //this.x = x;//flipX ? this.x + x : this.x + x;
        this.y = y;
    }

    disableBox() {
        this.setActive(false);
    }

    activeBox() {
        this.setActive(true);
    }


    attackBox(x:number,y:number,flipX:boolean,magicNumber: number ,callbackFn?: Function) {

        this.moveBox(x,y,flipX,magicNumber);
        this.activeBox();
        const actionDef = "Ataco";
        //callbackFn(actionDef);
        setTimeout(() => {
            this.disableBox();
        },200)
        
    }
}
export default hitZone;