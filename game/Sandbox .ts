import Phaser from 'phaser';
import EventsCenter from './EventsCenter';
import BetweenScenes from './BetweenScenes';




export default class Sandbox extends Phaser.Scene {
    /* map */
    background?: Phaser.GameObjects.Image;
    /* controls */
    EscKeyboard?: Phaser.Input.Keyboard.Key;
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    /* EXTRAS */
    


    constructor() {
        super({ key: 'Sandbox' });
    };

    init() {
        this.cursors = this.input.keyboard?.createCursorKeys();
    };

    preload() {
        this.load.image("backgroundLevelMap", "game/backgroundLevelMap.png");
        
    };


    create() {
        /* Controls */
        this.background = this.add.image(1000, 500, "backgroundLevelMap").setScale(1.3);
        this.EscKeyboard = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.physics.world.setBounds(0, 0, 5000, 2500);
        const { width, height } = this.cameras.main;

        
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
        if (this.EscKeyboard) this.EscKeyboard.on("down", () => {
            EventsCenter.emit('gameOver', true)
            this.makeTransition("Menu", {});
        });
        if (this.cursors) this.cursors.space.on("down", () => {
            EventsCenter.emit('gameOver', true)
            this.makeTransition("Menu", {});
        });
    };
};
