import Phaser from "phaser";
import Game from "../Game";
import { Tweens } from "phaser";
import { TURBO_TRACE_DEFAULT_MEMORY_LIMIT } from "next/dist/shared/lib/constants";
import { Console } from "console";

export type DangerTween =
  | Phaser.Tweens.Tween
  | Phaser.Types.Tweens.TweenBuilderConfig
  | Phaser.Types.Tweens.TweenChainBuilderConfig
  | Phaser.Tweens.TweenChain;
export type DangerConfig = {
  texture: string | Phaser.Textures.Texture;
  width?: number;
  height?: number;
  pos: {
    x: number;
    y: number;
  };
  scale?: {
    width: number;
    height: number;
  };
  
  attackSpriteSheet?: string;
  particleSpriteSheet?: string;
  particleFrames?: number[]
  color?:number;
  patrol?:{
    patrolType: "LinealX"|"LinealY"|"Sine",
    distance: number,
    distanceOrt?:number,
    speed?: number,
    attackInterval?: number,
  }
};
class Danger extends Phaser.Physics.Arcade.Sprite {
    scene: Game;
    group: Phaser.Physics.Arcade.Group;
    particleSprite?: Phaser.GameObjects.Sprite;
    config: DangerConfig;
    preBurstPos:{
      x:number,
      y:number,
    } = {
      x:0,y:0
    };
    
    currentState: 'none'|'patrol'|'attack' = 'none';
    
    patrol:{
      patrolType: string,
      distance: number,
      distanceOrt?:number,
      speed: number,
      attackInteval: number,
    }={
      patrolType: "LinealX",
      distance: 0,
      speed: 1,
      attackInteval:0,
    }
    patrolTween:Phaser.Tweens.Tween|undefined;
    constructor( scene: Game, config: DangerConfig, group: Phaser.Physics.Arcade.Group){
        super(scene, config.pos.x, config.pos.y, config.texture, 0);
        this.scene = scene;
        this.group = group;
        this.config = config;
        const width = config.width ?? 170;
        const height = config.height ?? 170;
        if (config.scale) {
            this.setScale(config.scale.width, config.scale.height);
        }
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.setDepth(10);
        if(config.scale) this.body?.setSize(config.width! * config.scale.width, config.height! * config.scale.height);
        this.body?.setOffset(40, 40);
        this.setBounce(0);
        this.group?.add(this);
        this.setImmovable(true);
        this.setCollideWorldBounds(true);
        this.preBurstPos={
          x:config.pos.x,
          y:config.pos.y,
        }
        if(this.config.color)this.setTint(this.config.color);
        if (config.attackSpriteSheet) {
            const portFrames = this.scene.anims.generateFrameNumbers(config.attackSpriteSheet, 
                {start:0 , end: this.scene.textures.get(config.attackSpriteSheet).frameTotal - 2});
            
            const otherFrames = this.scene.anims.generateFrameNumbers(config.attackSpriteSheet, 
                {start:this.scene.textures.get(config.attackSpriteSheet).frameTotal - 2 , end:0 });
            
            const portAnimConfig = {
                key: "Attack",
                frames: portFrames,
                frameRate: 48,
            }
            const otherAnimConfig = {
                key: "Attack-",
                frames: otherFrames,
                frameRate: 48,
            }
            this.anims.create(portAnimConfig);
            this.anims.create(otherAnimConfig);
            this.setTexture(config.attackSpriteSheet);
            if(this.config.color) this.setTint(this.config.color);
            this.setFrame(0);
        }
        if (config.particleSpriteSheet) {
            this.particleSprite = scene.add.sprite(config.pos.x, config.pos.y, config.particleSpriteSheet);
            this.particleSprite.setVisible(true);
            this.particleSprite.setDepth(11);
            if(this.config.color) this.particleSprite.setTint(this.config.color);
            if (config.scale) this.particleSprite.setScale(config.scale.width, config.scale.height);
            this.scene.add.existing(this.particleSprite);
            const partFrames= scene.anims.generateFrameNumbers(config.particleSpriteSheet, {
                start:1 , end: this.scene.textures.get(config.particleSpriteSheet).frameTotal - 2});
            const partAnimConfig = {
                key: "particleSpriteSheet",
                frames: partFrames,
                frameRate: 24,
                repeat:-1,
                yoyo:true
            }
            this.particleSprite.anims.create(partAnimConfig);
            this.particleSprite.anims.play("particleSpriteSheet");
            this.particleSprite.on("animationupdate",() => {
                this.particleSprite!.setPosition(this.x, this.y);
            })
        }
        if(config.patrol){
          this.patrol={
            patrolType:  config.patrol.patrolType,
            distance: config.patrol.distance,
            distanceOrt: config.patrol.distanceOrt ?? 0,  
            speed: config.patrol.speed ?? 1,
            attackInteval: config.patrol.attackInterval ?? 0,
          };
          if(this.patrol.patrolType==="LinealX"){
            //console.log("[Danger] patrol lineal x:"+this.patrol.distance);
              this.patrolTween = this.scene.tweens.add({
                  targets:this,
                  props:{
                    x: this.x + this.patrol.distance,
                  },
                  duration: (this.patrol.distance / this.patrol.speed)*1000,
                  ease: 'Bounce.easeIn',
                  yoyo:true,
                  repeat: -1,
                });
          }else if(this.patrol.patrolType==='LinealY'){
            //console.log("[Danger] patrol lineal y:"+this.patrol.distance);
              this.patrolTween = this.scene.tweens.add({
                  targets:this,
                  props:{
                    y: this.y - this.patrol.distance,
                  },
                  duration: (this.patrol.distance / this.patrol.speed)*1000,
                  ease: 'Bounce.easeIn',
                  yoyo:true,
                  repeat: -1,
                });
          }
          this.PatrolState();
        }

    }
    startInterruption() {
      if(this.currentState==="patrol"){
        var timer;

        if(this.patrol.attackInteval > 0){
          timer = this.patrol.attackInteval*1000;
          this.scene.time.delayedCall(timer, () => {
            //console.log("[Danger] Interruption started");
            this.patrolTween?.pause();
            this.AttackState();
          });
        }
      }
    }
   
    DoDamage(){
      if(this.config.attackSpriteSheet && this.scene.player?.isDead===false){
        //console.log("[Danger] DoDamage animation started");
        this.scene.player!.isDead = true;
        this.anims.play("Attack",true);
        this.scene.time.delayedCall(200, () => {
          this.scene.player!.isDead = false;
          this.scene.touchItem("fireball");
          this.setTexture(this.config.attackSpriteSheet!);
          this.setFrame(0);
        });
      }
    }

    PatrolState(){
      this.currentState = "patrol";
      //console.log("[Danger] PatrolState");
      this.patrolTween?.play()
      this.startInterruption();
    }
    AttackState(){
      this.currentState = "attack";
      if(this.config.attackSpriteSheet){
       // console.log("[Danger] AttackState");
        this.anims.play("Attack",true);
        this.scene.time.delayedCall(500,()=>{
          this.anims.stop();
          this.anims.play("Attack-",true);
          this.scene.time.delayedCall(500, ()=>{
            this.PatrolState();
          });
          //this.setTexture(this.config.attackSpriteSheet!);
          //this.setFrame(0);
        });
      }
    }
}
export default Danger;