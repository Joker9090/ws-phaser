import Phaser from "phaser";
import ContainerCredits from "./containersMenu/containerCredits";
import containerInitial from "./containersMenu/containerInitial";
import containerPlay from "./containersMenu/containerPlay";
import containerSettings from "./containersMenu/containerSettings";
import containerCode from "./containersMenu/containerCode";
import MasterManager from "./MasterManager";
import containerAlbum from "./containersMenu/containerAlbum";


class MenuScene extends Phaser.Scene {
    width: number = window.innerWidth;
    height: number = window.innerHeight;
 
    constructor() {
        super({ key: "TestScene" });
    }


    create() {
        this.add.rectangle(this.width / 2, this.height / 2, this.width*.8, this.height*.8, 0xffffff, 1)
        this.add.text(0, 0, "SCALE BY OUTTER", { fontSize: '20px', color: '#ffffff' }).setInteractive().on('pointerdown', () => {
            this.scaleContainer(containerOuterContent, 'inner' ,containerinnerContent, { width: this.width*.8, height: this.height*.8 });
        });
        this.add.text(700, 0, "SCALE BY INNER", { fontSize: '20px', color: '#ffffff' }).setInteractive().on('pointerdown', () => {
            this.scaleContainer(containerOuterContent, 'outer' ,containerinnerContent, { width: this.width*.8, height: this.height*.8 });
        });
        const containerOuterContent = this.add.container(this.width / 2, this.height / 2);
        const rect1 = this.add.rectangle(0, 0, this.width*.7, this.height*.6, 0xff0000, 0.7).setOrigin(0.5, 0.5)
        containerOuterContent.add(rect1);
        const containerinnerContent = this.add.container(0,0);
        const rect2 = this.add.rectangle(0, 0, this.width*.6, this.height*.5, 0x0000ff, 0.7).setOrigin(0.5, 0.5)
        containerinnerContent.add(rect2);
        containerOuterContent.add(containerinnerContent);
        containerOuterContent.setSize(this.width*.7, this.height*.7);
        rect1
        rect2
    }

    scaleContainer(container: Phaser.GameObjects.Container, type: 'inner' | 'outer' = 'inner', scaleBy?: Phaser.GameObjects.Container, bounds?: { width: number, height: number }) {
        console.log("ENTRO ACA")
        if (scaleBy){
            this.setSizeContainer(scaleBy);
        } else {
            this.setSizeContainer(container);
        }
        if (!container.height || !container.width) return
        const gameObjectScaler = {
            x: (bounds ? bounds.width : window.innerWidth)/container.width,
            y: (bounds ? bounds.height : window.innerHeight)/container.height,
        };
        let scaleFactor = 0
        if (type === 'inner') {
            scaleFactor = gameObjectScaler.x > gameObjectScaler.y ? gameObjectScaler.x : gameObjectScaler.y
        } else {
            scaleFactor = gameObjectScaler.x > gameObjectScaler.y ? gameObjectScaler.y : gameObjectScaler.x
        }
        container.setScale(scaleFactor);
    }

    setSizeContainer(con: Phaser.GameObjects.Container) {
        var top = 0;
        var bottom = 0;
        var left = 0;
        var right = 0;
        con.list.forEach((child: any) => {
            var childX = child.x;
            var childY = child.y;
            var childW = child.displayWidth;
            var childH = child.displayHeight;
            var childTop = childY - (childH * child.originY);
            var childBottom = childY + (childH * (1 - child.originY));
            var childLeft = childX - (childW * child.originX);
            var childRight = childX + (childW * (1 - child.originY));
            if (childBottom > bottom) {
                bottom = childBottom;
            }
            if (childTop < top) {
                top = childTop;
            }
            if (childLeft < left) {
                left = childLeft;
            }
            if (childRight > right) {
                right = childRight;
            }
        });
        var h = Math.abs(top - bottom);
        var w = Math.abs(right - left);    
        con.setSize(w, h);
    }
}

export default MenuScene;
