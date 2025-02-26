import Game from "../Game";
import Player from "./Player";

export type ZoneConfig = {
    x: number,
    y: number,
    width: number,
    height: number,
    color?: number,
    alpha?: number,
    depth?: number,
    detectOnTouch?: (player: Player, zone: MagicZone) => void,
    detectOnExit?: (player: Player, zone: MagicZone) => void,
    effect?: (zone: MagicZone) => void,
}

class MagicZone extends Phaser.GameObjects.Sprite {
    graphics: Phaser.GameObjects.Graphics;
    scene: Game;
    config: ZoneConfig;
    wasInside = false;
    constructor(scene: Game, config: ZoneConfig) {
        const { x, y, width, height } = config;
        super(scene,x, y,"");
        this.setAlpha(0)
        this.config = config;
        this.scene = scene;
        this.graphics = scene.add.graphics();
        this.graphics.fillStyle(config.color || 0x000000, config.alpha || 0.5);
        this.graphics.fillRect(x, y, width, height);
        this.graphics.setDepth(config.depth || 1000);
        if(this.config.detectOnTouch && this.scene.player) {
            const { x, y, width, height } = this.config;
    
                // add a body to the graphics
                const gravityGroup = this.scene.physics.add.group({ 
                    allowGravity:false,
                    customBoundsRectangle: new Phaser.Geom.Rectangle(x, y, width, height),
                    runChildUpdate:true,
                  });
                  gravityGroup.add(this.graphics); 
            }
    
            if(this.scene.UICamera) this.scene.UICamera.ignore(this.graphics);


        this.scene.events.on('update', this.update, this);

        if(this.config.effect) this.config.effect(this);

    }
    update() {

        if(this.config.detectOnTouch){
            // check if player x and y point is inside the rectangle 
            if(this.config.detectOnTouch && this.scene.player) {
                const { x, y, width, height } = this.config
                const point = new Phaser.Geom.Point(this.scene.player.x, this.scene.player.y);

                const rect = new Phaser.Geom.Rectangle(this.graphics.x + x, this.graphics.y + y, width, height);

                if(Phaser.Geom.Rectangle.ContainsPoint(rect, point)) {
                    this.wasInside = true;
                    this.config.detectOnTouch(this.scene.player,this);
                } else {
                    if(this.wasInside && this.config.detectOnExit){
                        this.config.detectOnExit(this.scene.player,this);
                    }
                    this.wasInside = false;
                    
                }
            }
            
            
        }
    }
}

export default MagicZone;