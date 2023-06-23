import Phaser from 'phaser';

export default class WonScene extends Phaser.Scene {
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    container?: Phaser.GameObjects.Container;
    bloque1?: Phaser.GameObjects.Rectangle;
    bloque2?: Phaser.GameObjects.Rectangle;

    constructor() {
        super({ key: 'Sandbox' });

    };

    init() {
        this.cursors = this.input.keyboard?.createCursorKeys();
    };


    create(this: WonScene, data: { text: string }) {
        
        
        this.bloque2 = this.physics.add.existing(this.add.rectangle(100,100,200,200,Phaser.Display.Color.GetColor(255, 177, 230)))
        this.bloque1 = this.physics.add.existing(this.add.rectangle(100,100,200,200,Phaser.Display.Color.GetColor(255, 177, 0)))
        
        
        
        this.physics.world.OVERLAP_BIAS = 4;



    };

    update() {
        if (this.cursors){
            if(this.cursors.left){
              
            }
        }
    };
};

