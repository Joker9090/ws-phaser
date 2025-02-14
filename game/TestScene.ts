import Phaser from "phaser";
import ContainerCredits from "./containersMenu/containerCredits";
import containerInitial from "./containersMenu/containerInitial";
import containerPlay from "./containersMenu/containerPlay";
import containerSettings from "./containersMenu/containerSettings";
import containerCode from "./containersMenu/containerCode";
import MasterManager from "./MasterManager";
import containerAlbum from "./containersMenu/containerAlbum";


class TestScene extends Phaser.Scene {

    constructor() {
        super({ key: "TestScene" });
    }

    preload() {
        this.load.image("logo", "/menu/initial/logoNoswar.png");
        this.load.image("titulo", "/menu/initial/gameTitle.png");
        this.load.image("botoncito", "/menu/settings/settingsCross.png");
    }

    create() {
        const rect1 = this.add.rectangle(window.innerWidth / 2, window.innerHeight / 2, 1800, 900, 0x6666ff, 0.6);
        const cont = this.add.container(window.innerWidth / 2, window.innerHeight / 2)
        const cont2 = this.add.container(window.innerWidth / 2, window.innerHeight / 2)
        const rect2 = this.add.rectangle(0, 0, 960, 300, 0x66ffaa, 0.7).setVisible(false);
        const rect3 = this.add.rectangle(0, 0, 960, 300, 0x66ffaa, 0.7).setVisible(false);
        const imagenTest = this.add.image(0, 0, "logo");
        const imagenTest2 = this.add.image(-200, 0, "logo");
        const imagenTest3 = this.add.image(200, 0, "logo");
        const imagenTestTitle = this.add.image(0, -100, "titulo").setScale(0.2);
        const imagenTestButtoncito = this.add.image(window.innerWidth - 100, window.innerHeight - 100, "botoncito").setScale(0.6);
        // const scaladorX = 1500 / 960
        // const scaladorY = 700 / 300
        console.log("tamaño del contenerdor", cont.width, cont.height)



        const bounds = cont.getBounds();
        console.log("BOUNDS", bounds)

        cont.add([
            rect2,
            imagenTest,
            imagenTest2,
            imagenTest3,
            // imagenTestButtoncito
        ])

        cont2.add([
            rect3,  
            imagenTestTitle
        ])
        // imagenTestButtoncito.setScale(scaladorY);
        // cont.setScale(scaladorX);
        // cont.setScale(scaladorX, scaladorY);    
        // this.tweens.add({
        //     targets: cont.list,
        //     x: () => Phaser.Math.Between(-100, 100),
        //     y: () => Phaser.Math.Between(-100, 100),
        //     duration: 3000,
        //     delay: 200,
        //     ease: 'Sine.inOut',
        //     yoyo: true,
        //     repeat: -1
        //   });

        const g = this.add.graphics({
            lineStyle: { color: 0x00ff00, width: 2 }
        });

        const setSizeOfContainerForTheWOrkshop = (container: Phaser.GameObjects.Container, width: number = window.innerWidth, height: number = window.innerHeight, scaleBy: 'x' | 'y' = 'x') => {
            const bounds = container.getBounds()
            const scaler = {
                x: width / bounds.width,
                y: height / bounds.height,
            }
            if (scaleBy === 'x') {
                container.setScale(scaler.x);
            } else {
                container.setScale(scaler.y);
            }
        }   

        const bounds2 = cont.getBounds()
        const bounds3 = cont2.getBounds()
        console.log("BOUNDS", bounds2)
        console.log(window.innerWidth / 2, window.innerHeight / 2)
        const scaladorX = 1800 / bounds2.width
        const scaladorY = 900 / bounds2.height
        setSizeOfContainerForTheWOrkshop(cont, 1800, 900, 'x')
        // cont.setScale(scaladorX);
        cont2.setScale(scaladorY);
        cont.x = window.innerWidth / 2
        cont.y = window.innerHeight / 2
        g.strokeRectShape(cont.getBounds());
        g.strokeRectShape(cont2.getBounds());


        // this.events.once("prerender", () => {
        //     const bounds = cont.getBounds()
        //     console.log("BOUNDS", bounds)
        //     const scaladorX = 1500 / bounds.width
        //     const scaladorY = 700 / bounds.height
        //     console.log(window.innerWidth / 2, window.innerHeight / 2)
        //     cont.setScale(scaladorY);
        //     g.strokeRectShape(cont.getBounds());
        // });

    }

    update() {
    }
}

// export const scaleBy = (isBackground: boolean = false) => {
//     const gameObjectScaler = {
//         x: window.innerWidth / 1920,
//         y: window.innerHeight / 1080,
//     };
//     if (window.innerWidth > 1920 && !isBackground) {
//         return (
//             gameObjectScaler.x > gameObjectScaler.y
//                 ? gameObjectScaler.y
//                 : gameObjectScaler.x
//         )
//     } else {
//         return (
//             gameObjectScaler.x < gameObjectScaler.y
//                 ? gameObjectScaler.y
//                 : gameObjectScaler.x
//         )
//     }
// }

export default TestScene;
