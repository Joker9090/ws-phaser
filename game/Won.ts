import Phaser from 'phaser';
import MusicManager from "./MusicManager";
import BetweenScenes from './BetweenScenes';

export default class WonScene extends Phaser.Scene {
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    container?: Phaser.GameObjects.Container;
    constructor() {
        super({ key: 'Won' });

    };

    init() {
        this.cursors = this.input.keyboard?.createCursorKeys();
    };

    /*Debug
    preload() {
        this.load.image("background", "game/background.png");
    };
    */

    create(this: WonScene, data: { text: string }) {
        /* Audio */
        const getMusicManagerScene = this.game.scene.getScene("MusicManager") as MusicManager;
        if (!getMusicManagerScene.scene.isActive()) this.scene.launch("MusicManager").sendToBack();
        else { getMusicManagerScene.playMusic("songWon"); };

        this.container = this.add.container(0,0).setDepth(999)

        this.physics.world.setBounds(0, 0, 5000, 2500);
        this.add.image(900, 500, "background").setScale(.7);
        const text1 = this.add.text(0,0, data.text, { fontSize: '35px' })
        .setOrigin(0.5)
        .setScale(1);
        const text2 = this.add.text(0,200, "Press SPACE to go to Menu", { fontSize: '22px' })
        .setOrigin(0.5)
        .setScale(1);
        this.container?.add([text1,text2]);
    };
    makeTransition(sceneName: string, data: any) {
        const getBetweenScenesScene = this.game.scene.getScene("BetweenScenes") as BetweenScenes
        if (getBetweenScenesScene) getBetweenScenesScene.changeSceneTo(sceneName, data)
        else this.scene.start(sceneName, data);
        this.time.delayedCall(1000,()=>{
            this.scene.stop()
          })
      }
    update() {
        if (this.container) {
            if (this.cameras.main) {
               this.container.setPosition(this.cameras.main.width/2 ,this.cameras.main.height/3);
               if(this.cameras.main.width < this.cameras.main.height){
                   this.container.setScale(this.cameras.main.width / this.cameras.main.height)
               }
            }
        }
        if (this.cursors) {
            const space = this.cursors.space;
            /*Space*/
            space.on('down', () => {
                this.scene.start("Menu");
            });
        };
    };
};

