
import Phaser from "phaser";
import Player from "./assets/Player";
import Map0 from "./maps/Map0";
import Map2 from "./maps/Map2";
import Enemy from "./assets/Enemy";
// Scene in class
class Scene1 extends Phaser.Scene {
  monchi?: Player;
  skeleton?: Enemy;
  map?: Map0;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  attackZone?: Phaser.GameObjects.Zone;
  swordHitBox!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
 

  preload(this: Scene1) {
    this.load.spritesheet("character", "/game/character.png", { frameWidth: 220, frameHeight: 162 });
    this.load.spritesheet("knight", "/game/Knight.png", { frameWidth: 86, frameHeight: 86});
    this.load.spritesheet("skeleton", "/game/skeleton.png", { frameWidth: 86, frameHeight: 86});
    this.load.image("plataformaA", "/game/platform1.png");
    this.load.image("plataformaB", "/game/platform1B.png");
    this.load.image("sky", "/game/background.png");
    this.load.image("nubee","/game/nube.png");
    this.load.image("crystal" ,"/game/Yellow_crystal1.png");
    this.load.image("tree","/game/tree.png");
    this.load.image("pisoA","/game/pisoA.png");
    //this.load.image("this.player.setVelocityY(-330);plataformaB", "/game/platform1B.png");
  }


  create(this: Scene1) {

    this.map = new Map2(this);
    
    const floor = this.map.createMap()
    this.monchi = new Player(this, 100, 100, "knight", 2);
    this.skeleton = new Enemy(this, 250, 100, "skeleton",1);

    const checkFloor = (a: Player,b: Phaser.Physics.Arcade.Sprite ) => {
      if(b.hasForce) a.setPosition(b.x,a.y);
     
    }

    const hitPlayer = () => {
      //console.log("Player colision con enemigo");
      console.log("Player espada colision con enemigo");
      this.skeleton?.play("skeletonDeadFrames");
      this.swordHitBox.x = 0;
      this.swordHitBox.y = 0;
      if(this.skeleton) this.time.delayedCall(600, this.skeleton.idle, [], this.skeleton);
    }


    this.cameras.main.startFollow(this.monchi)

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

    // @ts-ignore
    this.physics.add.collider(this.monchi, floor, checkFloor);
    this.physics.add.collider(this.skeleton, floor);
    this.physics.add.overlap(this.swordHitBox,this.skeleton, hitPlayer);
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
  }

}

export default Scene1 