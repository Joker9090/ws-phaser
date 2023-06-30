import Phaser from "phaser";
import Tutorial from "./maps/Tutorial";
import Player from "./assets/Player";




export default class Sandbox2 extends Phaser.Scene {

    mapa?: Tutorial;
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    monchi = undefined;
    loseLevelTutorial = undefined;
    constructor() {
        super({ key: 'Menu' });
    };

    init() {
       this.cursors = 
    };


   

    create() {
         
        this.mapa = new Tutorial(this.scene)
    };



    update() {
 
    };
};



