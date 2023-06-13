
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
import LifeBar from "./assets/LifeBar";
import Map3 from "./maps/Map3";

// Scene in class
class Scene1 extends Phaser.Scene {
  monchi?: Player;
  skeleton?: Enemy;
  map?: Map2;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  attackZone?: Phaser.GameObjects.Zone;
  lightOnPlayer?:Phaser.GameObjects.Light;
  //swordHitBox!: hitZone;
  checkPoint!:{x:number, y:number}
  //UIGame?: Phaser.GameObjects.Container;
  hitZoneGroup?: Phaser.Physics.Arcade.Group;
  UIGame?: Phaser.GameObjects.Image;
  lifePlayer?: LifeBar;
  constructor() {
    super({key: 'Scene1'})

    //console.log("data de la escena ");
  }
 

  preload(this: Scene1) {
    //this.load.spritesheet("character", "/game/character.png", { frameWidth: 220, frameHeight: 162 });
    //this.load.spritesheet("knight", "/game/Knight.png", { frameWidth: 86, frameHeight: 86});
    //this.load.spritesheet("skeleton", "/game/skeleton.png", { frameWidth: 86, frameHeight: 86});
    //this.load.spritesheet("antorcha", "/game/Antorcha.png", { frameWidth: 128, frameHeight: 128});
    //this.load.spritesheet("heartFullUI", "/game/UI/heart.png", { frameWidth: 32, frameHeight: 32});
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

  hitPlayer = (monchi: Player, skeleton: Enemy, scene:Phaser.Scene) => {
    //console.log("Player colision con enemigo");
    console.log("Player espada colision con enemigo");
    skeleton?.receiveDamage();
    if (monchi && monchi.swordHitBox){
      monchi.swordHitBox.x = 0;
      monchi.swordHitBox.y = 0;
      monchi.swordHitBox.setActive(false);

    }
    console.log("state skeleton: " + skeleton?.Onstate);
    if(skeleton && skeleton.Onstate !== "dead") {
      scene.time.delayedCall(1200, skeleton.idle, [], skeleton);
    }else if (skeleton?.Onstate === "dead") {
      scene.time.delayedCall(1200, skeleton.corposeStay, [], skeleton);
      //this.skeleton.destroy();
    }
  }


  create(this: Scene1) {



    //this.scene.run('gameUI');
    this.map = new Map3(this);
    this.lifePlayer = this.map.lifeBar;
    
    const floor = this.map.createMap()
    //Map2
    //this.monchi = new Player(this, 100, 950, "knight", 2);
    //this.skeleton = new Enemy(this, 250, 950, "skeleton",1);
    //this.checkPoint = {x:100,y:950};

    //Map3
    this.monchi = new Player(this, 100, 650, "knight", 2);
    this.skeleton = new Enemy(this, 250, 650, "skeleton",1);
    this.checkPoint = {x:100,y:650};



    /**Darkness implementation */
    this.lights.enable().setAmbientColor(0x000000); //333333 gray
    this.lightOnPlayer = this.lights.addLight(this.monchi.x, this.monchi.y, 190).setColor(0xffffff).setIntensity(1.2); // cambiar luces en bbase a la dificultad elegida

    //const UIConfig = {
    //  textureA: "healthBarWithAlpha",
    //  sceneWidth: Number(this.game.config.width) / 2,
    //  sceneHeight: Number(this.game.config.height) / 2,
    //}


    

    const checkFloor = (a: Player,b: Phaser.Physics.Arcade.Sprite ) => {
      //if(b.hasForce) a.setPosition(b.x,a.y);
     
    }

/*     const hitPlayer = (monchi: Player, skeleton: Enemy) => {
      //console.log("Player colision con enemigo");
      console.log("Player espada colision con enemigo");
      this.skeleton?.receiveDamage();
      if (this.monchi && this.monchi.swordHitBox){
        this.monchi.swordHitBox.x = 0;
        this.monchi.swordHitBox.y = 0;
        this.monchi.swordHitBox.setActive(false);

      }
      console.log("state skeleton: " + this.skeleton?.Onstate);
      if(this.skeleton && this.skeleton.Onstate !== "dead") {
        this.time.delayedCall(1200, this.skeleton.idle, [], this.skeleton);
      }else if (this.skeleton?.Onstate === "dead") {
        this.time.delayedCall(1200, this.skeleton.corposeStay, [], this.skeleton);
        //this.skeleton.destroy();
      }
    } */

    //Map2
    //this.cameras.main.setBounds(0, 0, 1850, 1054);//tamaño del esceneario para poner limites
    //this.physics.world.setBounds(0, 0, 1850, 1030);
    //Map3 boss fight
    this.cameras.main.setBounds(0, 0, 950, 800);
    this.physics.world.setBounds(0, 0, 950, 800);
    this.cameras.main.startFollow(this.monchi,true,0.5,0.5);//seguimiento del personaje, apartir de q pixeles alrededor
    this.cameras.main.setZoom(2);//zoom en la escene sobre lo que este apuntando la camara 3 , 0.5

    this.cursors = this.input.keyboard?.createCursorKeys()
    //const keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);



    const win = () => {
      //this.scene.start("SceneLoader",{level: actualLevel})
    }

    const checkPoint = (player: Player) => {
      player.x = this.checkPoint.x;
      player.y = this.checkPoint.y;
    }


    const lose = () => {
      this.scene.restart()
    }

    const takeHealth = () => {
      console.log("entro takeHealth");
      if(this.map?.lifeBar){
        this.monchi?.takeLife(this.map.lifeBar);
        console.log("entro takeHealth");
        this.map.healths?.setInteractive(false);
        this.map.healths?.setActive(false);
        this.map.healths?.destroy();
        //this.map.lifeBar.updateBar(this,10);
      }
    }

    const changeMap = () => {
      console.log("Entro en door cambia de level");
      //this.scene.start("SceneLoader",{level: 3})
    }

    this.physics.world.on('worldbounds', (body: Phaser.Physics.Arcade.Sprite,top: boolean,down: boolean,left: boolean,right: boolean) => {
      //if(down) lose()
      if(down && this.monchi && this.map && this.map.lifeBar) {
        this.monchi.receivedDamage(50);
        this.map.lifeBar.updateBar(this,-35);
        if(this.monchi.life <= 0) lose();
        else checkPoint(this.monchi);
      }
    },this);
    //const hitZoneGroup = this.add.group() as Phaser.Physics.Arcade.Group;
    //this.swordHitBox = new hitZone(this,100,100,32,64,0xffffff,0.5,hitZoneGroup); //as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    //this.swordHitBox = this.physics.add.existing(this.swordHitBox);
    //this.matter.add.gameObject(this.swordHitBox);
    //if(this.swordHitBox.body) {
    //  this.swordHitBox.body.setImmovable(true);
    //  this.swordHitBox.body.allowGravity = false;
    //}
    //this.physics.add.existing(this.swordHitBox);
    
    //if(this.swordHitBox.body)this.swordHitBox.body.setAllowGravity(false);
    //if(this.map.lifeBar)this.map.lifeBar.updateBar(this,-20);
    

    const skeletonOnePatrol: PatrolConfig = {
      x : 160,
      delay: 1200,
      enemyDetect: true,

    }

    // @ts-ignore
    this.physics.add.collider(this.monchi, floor, checkFloor);
    this.physics.add.collider(this.skeleton, floor);
    //this.physics.add.overlap(this.monchi.swordHitBox,this.skeleton, hitPlayer);// overlaps de grupos de enemigos??
    //if(this.map.healths)this.physics.add.collider(this.monchi, this.map.healths, takeHealth);
    if(this.map.healths) {
      //this.physics.add.collider(this.map.healths, this.monchi);
      this.physics.add.overlap(this.monchi, this.map.healths, takeHealth);

    }
    if(this.map.door) {
      this.physics.add.overlap(this.monchi, this.map.door, changeMap);
    }

    
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
      if(this.monchi.isAttacking && this.skeleton) {
        if (Phaser.Geom.Rectangle.Overlaps(this.monchi.swordHitBox.getBounds(), this.skeleton?.getBounds()))
            {
                //this.graphics.strokeRectShape(this.rectangles[i]);
                this.hitPlayer(this.monchi,this.skeleton,this);
            }
      }
      
      
    }
    if(this.skeleton && this.monchi && this.skeleton.Onstate !== "dead") {
      if(this.lifePlayer &&this.skeleton.isAttacking && this.monchi && Phaser.Geom.Rectangle.Overlaps(this.skeleton.newHitBox.getBounds(), this.monchi?.getBounds())){
        this.monchi.receivedDamage(50);
        this.lifePlayer.updateBar(this,-35);
        if(this.monchi.life <= 0) this.scene.restart();

      }
      //console.log("skeleton update");
      this.skeleton.enemyAround(this.monchi,50);
      if(!this.skeleton.isEnemyInFront && !this.skeleton.isPatrol && this.skeleton.patrolConfig && this.skeleton.patrolConfig != null && this.skeleton.patrolConfig != undefined) {
        this.skeleton.patrol(this.skeleton.patrolConfig);
      }
    }
  }

}

export default Scene1 