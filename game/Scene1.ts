
import Phaser, { LEFT } from "phaser";
import Player from "./assets/Player";
import Map0 from "./maps/Map0";
import Map2 from "./maps/Map2";
import Enemy, { PatrolConfig } from "./assets/Enemy";
import CloudGenerator from "./assets/CloudGenerator";
import Antorcha from "./assets/Antorcha";
import GameUI from "./assets/GameUI";
import UiModel from "./assets/UIModel";
import hitZone from "./assets/hitZone";

// Scene in class
class Scene1 extends Phaser.Scene {
  monchi?: Player;
  skeleton?: Enemy;
  map?: Map2;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  attackZone?: Phaser.GameObjects.Zone;
  lightOnPlayer?:Phaser.GameObjects.Light;
  swordHitBox!: hitZone;
  //UIGame?: Phaser.GameObjects.Container;
  UIGame?: Phaser.GameObjects.Image;
  constructor() {
    super({key: 'Scene1'})
  }
 

  preload(this: Scene1) {
    this.load.spritesheet("character", "/game/character.png", { frameWidth: 220, frameHeight: 162 });
    this.load.spritesheet("knight", "/game/Knight.png", { frameWidth: 86, frameHeight: 86});
    this.load.spritesheet("skeleton", "/game/skeleton.png", { frameWidth: 86, frameHeight: 86});
    this.load.spritesheet("antorcha", "/game/Antorcha.png", { frameWidth: 128, frameHeight: 128});
    this.load.spritesheet("heartFullUI", "/game/UI/heart.png", { frameWidth: 32, frameHeight: 32});
    //this.load.image("plataformaA", "/game/platform1.png");
    //this.load.image("plataformaB", "/game/platform1B.png");
    //this.load.image("particleFire", "/game/particleFire.png");
    //this.load.image("islandA", "/game/islandA.png");
    //this.load.image("islandB", "/game/islandB.png");
    //this.load.image("islandC", "/game/islandC.png");
    //this.load.image("lava1", "/game/lava1.png");
    //this.load.image("lava2", "/game/lava2.png");
    //this.load.image("tile1", "/game/tile1.png");
    //this.load.image("tile3", "/game/tile3.png");
    //this.load.image("sky", "/game/background.png");
    //this.load.image("nubee","/game/nube.png");
    //this.load.image("neblina","/game/myst.png");
    //this.load.image("crystal" ,"/game/Yellow_crystal1.png");
    //this.load.image("tree","/game/tree.png");
    //this.load.image("pisoA","/game/pisoA.png");
    //this.load.image("this.player.setVelocityY(-330);plataformaB", "/game/platform1B.png");
  }


  create(this: Scene1) {



    //this.scene.run('gameUI');
    this.map = new Map2(this);
    
    
    const floor = this.map.createMap()
    this.monchi = new Player(this, 100, 950, "knight", 2);
    this.skeleton = new Enemy(this, 250, 950, "skeleton",1);




    /**Darkness implementation */
    this.lights.enable().setAmbientColor(0x000000); //333333 gray
    this.lightOnPlayer = this.lights.addLight(this.monchi.x, this.monchi.y, 190).setColor(0xffffff).setIntensity(1.2); // cambiar luces en bbase a la dificultad elegida

    const UIConfig = {
      textureA: "healthBarWithAlpha",
      sceneWidth: Number(this.game.config.width) / 2,
      sceneHeight: Number(this.game.config.height) / 2,
    }


    

    const checkFloor = (a: Player,b: Phaser.Physics.Arcade.Sprite ) => {
      //if(b.hasForce) a.setPosition(b.x,a.y);
     
    }

    const hitPlayer = () => {
      //console.log("Player colision con enemigo");
      console.log("Player espada colision con enemigo");
      this.skeleton?.receiveDamage();
      this.swordHitBox.x = 0;
      this.swordHitBox.y = 0;
      this.swordHitBox.setActive(false);
      console.log("state skeleton: " + this.skeleton?.Onstate);
      if(this.skeleton && this.skeleton.Onstate !== "dead") {
        this.time.delayedCall(1200, this.skeleton.idle, [], this.skeleton);
      }else if (this.skeleton?.Onstate === "dead") {
        this.time.delayedCall(1200, this.skeleton.corposeStay, [], this.skeleton);
        //this.skeleton.destroy();
      }
    }

    this.cameras.main.setBounds(0, 0, 3000, 1048);//tamaño del esceneario para poner limites
    //this.physics.world.setBounds(0, 0, 3000, 1048);
    this.cameras.main.startFollow(this.monchi,true,0.5,0.5);//seguimiento del personaje, apartir de q pixeles alrededor
    this.cameras.main.setZoom(2);//zoom en la escene sobre lo que este apuntando la camara 3 , 0.5

    this.cursors = this.input.keyboard?.createCursorKeys()
    //const keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);



    const win = () => {
      //this.scene.start("SceneLoader",{level: actualLevel})
    }


    const lose = () => {
      this.scene.restart()
    }

    this.physics.world.on('worldbounds', (body: Phaser.Physics.Arcade.Sprite,top: boolean,down: boolean,left: boolean,right: boolean) => {
      if(down) lose()
    },this);

    this.swordHitBox = new hitZone(this,100,100,32,64,0xffffff,0.5); //as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    //this.physics.add.existing(this.swordHitBox);
    
    //if(this.swordHitBox.body)this.swordHitBox.body.setAllowGravity(false);
    if(this.map.lifeBar)this.map.lifeBar.updateBar(this,-20);
    

    const skeletonOnePatrol: PatrolConfig = {
      x : 160,
      delay: 1200,
      enemyDetect: true,

    }

    // @ts-ignore
    this.physics.add.collider(this.monchi, floor, checkFloor);
    this.physics.add.collider(this.skeleton, floor);
    this.physics.add.overlap(this.swordHitBox,this.skeleton, hitPlayer);// overlaps de grupos de enemigos??

    this.skeleton.patrolConfig = skeletonOnePatrol;
    this.skeleton.patrol(skeletonOnePatrol);
    //this.physics.add.collider(this.monchi,this.skeleton, hitPlayer); // colision entre el player y el esqueleto

    /*     this.attackZone = this.add.zone(this.monchi.x, this.monchi.y, 20, 40);

        this.monchi.on("knightAttackFrames", (anim:string, frame:any, sprite:string, frameKey:string) => {
          const that = this;
          if(this.attackZone && this.monchi) {
              if(frame.index == 1) {
                this.physics.world.disable(this.attackZone);
                this.attackZone.x = this.monchi.x
                this.attackZone.y = this.monchi.y
              }
              if(frame.index == 2) {
                this.physics.world.enable(this.attackZone);
                this.attackZone.x = this.monchi.x + 50
                this.attackZone.y = this.monchi.y - 20
                //this.attackZone.body.height = 84
              }
              if(frame.index == 3) {
                this.attackZone.x = this.monchi.x + 20
                this.attackZone.y = this.monchi.y - 30
                //this.attackZone.body.height = 32
              }
              
          }
        }); */
        
  }

  update(this: Scene1) {
    if (this.monchi) {
      if(this.lightOnPlayer){
        this.lightOnPlayer.x= this.monchi.x
        this.lightOnPlayer.y= this.monchi.y
      }
      this.monchi.checkMove(this.cursors)
      if(this.monchi.isAttacking) { // esta atacando? apreto espacio ?
        //this.monchi.on(Phaser.Animations.Events.ANIMATION_UPDATE, (anim:Phaser.Animations.Animation, frame:Phaser.Animations.AnimationFrame) => {
        //  
        //})
        //if(this.monchi.flipX) { // esta girado?
          //this.swordHitBox.x = this.monchi.x - this.monchi.width * 0.25;
          //this.swordHitBox.setActive(false);  
        //}else {
          //this.swordHitBox.x = this.monchi.x + this.monchi.width * 0.25;
          //this.swordHitBox.y = this.monchi.y;
          //this.swordHitBox.setActive(false);
        //}
        this.swordHitBox.attackBox((this.monchi.x +10),(this.monchi.y),this.monchi.flipX)
      }

      
      
    }
    if(this.skeleton && this.monchi && this.skeleton.Onstate !== "dead") {
      //console.log("skeleton update");
      this.skeleton.enemyAround(this.monchi,50);
      if(!this.skeleton.isEnemyInFront && !this.skeleton.isPatrol && this.skeleton.patrolConfig && this.skeleton.patrolConfig != null && this.skeleton.patrolConfig != undefined) {
        this.skeleton.patrol(this.skeleton.patrolConfig);
      }
    }
  }

}

export default Scene1 