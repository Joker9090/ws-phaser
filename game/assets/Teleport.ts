import Game from "../Game";
import { GamePlayDataType } from "../Types";

export type TeleportConfig = {
    x: number,
    y: number,
    version: number,
    sameScene?: boolean,
    sceneKey?: string,
    width?: number,
    height?: number,
    group?: Phaser.Physics.Arcade.Group
    otherSceneConf?: GamePlayDataType
}

class Teleport extends Phaser.GameObjects.Sprite {
    scene: Game;
    config: TeleportConfig;
    version: number;
    objType: string = 'teleport';
    
    constructor(scene: Game, config: TeleportConfig) {
        console.log("teleport constructor", config);
        const { x, y, version, sameScene, sceneKey } = config;
        super(scene, x, y, ``);
        this.config = config;
        this.scene = scene;
        this.version = version ?? 1;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.config.group?.add(this);
        this.setOrigin(0.5, 0.5);
        this.setDepth(999)   
        this.setScale(1.3);
        this.create();
    }

    create() {
        const animTexture = this.scene.textures.get(`teleport_${this.version}`) as Phaser.Textures.Texture;

        this.scene.anims.create({
            key: `teleport_anim_${this.version}`,
            frames: this.anims.generateFrameNumbers(`teleport_${this.version}`, { start: 0, end: animTexture.frameTotal - 1 }),
            frameRate: 9,
            repeat: -1
        });
        this.play(`teleport_anim_${this.version}`);
        const body = this.body as Phaser.Physics.Arcade.Body;
        if (body) {
            const frame = animTexture.get(0) as Phaser.Textures.Frame;
            body.setSize(frame.width, frame.height, true);
            body.immovable = true;
        }
        console.log("teleport created");
    }

    trigger() {
        if (this.config.sameScene) {
            const otherTp = this.scene.children.list.find((child) => (child.objType === 'teleport' && child.config.sameScene && (child.body.position.x !== this.body.position.x || child.body.position.y !== this.body.position.y))) as Teleport;
            if (otherTp) this.scene.player.setPosition(otherTp.body.position.x, otherTp.body.position.y)
        } else if (this.config.otherSceneConf) {
            this.scene.changeScene(this.config.otherSceneConf) // data
        }

    }
}

export default Teleport;