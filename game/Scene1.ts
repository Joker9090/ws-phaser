
import Phaser, { LEFT } from "phaser";
import Player from "./assets/Player";
import Map0 from "./maps/Map0";
import Map2 from "./maps/Map2";
import Enemy, { PatrolConfig } from "./assets/Enemy";
import CloudGenerator from "./assets/CloudGenerator";
import Antorcha from "./assets/Antorcha";
// Scene in class
class Scene1 extends Phaser.Scene {
  monchi?: Player;
  skeleton?: Enemy;
  map?: Map0;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  attackZone?: Phaser.GameObjects.Zone;
  lightOnPlayer?:Phaser.GameObjects.Light;
  swordHitBox!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
 

  preload(this: Scene1) {
    this.load.spritesheet("character", "/game/character.png", { frameWidth: 220, frameHeight: 162 });
    this.load.spritesheet("knight", "/game/Knight.png", { frameWidth: 86, frameHeight: 86});
    this.load.spritesheet("skeleton", "/game/skeleton.png", { frameWidth: 86, frameHeight: 86});
    this.load.spritesheet("antorcha", "/game/Antorcha.png", { frameWidth: 128, frameHeight: 128});
    this.load.image("plataformaA", "/game/platform1.png");
    this.load.image("plataformaB", "/game/platform1B.png");
    this.load.image("islandA", "/game/islandA.png");
    this.load.image("islandB", "/game/islandB.png");
    this.load.image("islandC", "/game/islandC.png");
    this.load.image("lava1", "/game/lava1.png");
    this.load.image("lava2", "/game/lava2.png");
    this.load.image("tile1", "/game/tile1.png");
    this.load.image("tile3", "/game/tile3.png");
    this.load.image("sky", "/game/background.png");
    this.load.image("nubee","/game/nube.png");
    this.load.image("neblina","/game/myst.png");
    this.load.image("crystal" ,"/game/Yellow_crystal1.png");
    this.load.image("tree","/game/tree.png");
    this.load.image("pisoA","/game/pisoA.png");
    //this.load.image("this.player.setVelocityY(-330);plataformaB", "/game/platform1B.png");
  }


  create(this: Scene1) {


    this.map = new Map2(this);
    
    
    const floor = this.map.createMap()
    this.monchi = new Player(this, 100, 950, "knight", 2);
    this.skeleton = new Enemy(this, 250, 950, "skeleton",1);
    const AntorchaConfig = {
      x:110,
      y:800,
      sprite:"antorcha",
    }
    const AntorchaConfig2 = {
      x:700,
      y:650,
      sprite:"antorcha",
    }
    const newAntorcha = new Antorcha(this,AntorchaConfig);
    const newAntorcha2 = new Antorcha(this,AntorchaConfig2);

    /**Darkness implementation */
    this.lights.enable().setAmbientColor(0x333333);
    this.lightOnPlayer = this.lights.addLight(this.monchi.x, this.monchi.y, 200).setColor(0xffffff).setIntensity(1);
    const lightOnAntorcha = this.lights.addLight(newAntorcha.x,newAntorcha.y,200).setColor(0xdc9e7c).setIntensity(0.9);
    const lightOnAntorcha2 = this.lights.addLight(newAntorcha2.x,newAntorcha2.y,100).setColor(0xdc9e7c).setIntensity(0.9);


    const checkFloor = (a: Player,b: Phaser.Physics.Arcade.Sprite ) => {
      //if(b.hasForce) a.setPosition(b.x,a.y);
     
    }

    const hitPlayer = () => {
      //console.log("Player colision con enemigo");
      console.log("Player espada colision con enemigo");
      this.skeleton?.play("skeletonDeadFrames");
      this.swordHitBox.x = 0;
      this.swordHitBox.y = 0;
      if(this.skeleton) this.time.delayedCall(1200, this.skeleton.idle, [], this.skeleton);
    }


    this.cameras.main.startFollow(this.monchi);
    this.cameras.main.setZoom(1.5);

    this.cursors = this.input.keyboard?.createCursorKeys()
    //const keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


    const lose = () => {
      this.scene.restart()
    }

    this.physics.world.on('worldbounds', (body: Phaser.Physics.Arcade.Sprite,top: boolean,down: boolean,left: boolean,right: boolean) => {
      if(down) lose()
    },this);

    this.swordHitBox = this.add.rectangle(100,100,32,64,0xffffff,0.5) as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    this.physics.add.existing(this.swordHitBox);
    this.swordHitBox.body.setAllowGravity(false);
    
    console.log(this.swordHitBox.body);

    const skeletonOnePatrol: PatrolConfig = {
      x : 160,
      delay: 1200,
      enemyDetect: true,

    }

    // @ts-ignore
    this.physics.add.collider(this.monchi, floor, checkFloor);
    this.physics.add.collider(this.skeleton, floor);
    this.physics.add.overlap(this.swordHitBox,this.skeleton, hitPlayer);

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
        if(this.monchi.flipX) { // esta girado?
          this.swordHitBox.x = this.monchi.x - this.monchi.width * 0.25;  
        }else this.swordHitBox.x = this.monchi.x + this.monchi.width * 0.25;
        this.swordHitBox.y = this.monchi.y;
      }

      
      
    }
    if(this.skeleton && this.monchi) {
      this.skeleton.enemyAround(this.monchi,50);
      if(!this.skeleton.isEnemyInFront && !this.skeleton.isPatrol && this.skeleton.patrolConfig && this.skeleton.patrolConfig != null && this.skeleton.patrolConfig != undefined) {
        this.skeleton.patrol(this.skeleton.patrolConfig);
      }
    }
  }

}

export default Scene1 