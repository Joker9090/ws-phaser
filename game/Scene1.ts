
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
import Boss from "./assets/Boss";

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
  dataLevel: any;
  lifePlayer?: LifeBar;
  backgroundMusic?: Phaser.Sound.BaseSound;
  backgroundMusic2?: Phaser.Sound.BaseSound;
  swordHit?: Phaser.Sound.BaseSound;
  swordAir?: Phaser.Sound.BaseSound;
  playerHurt?: Phaser.Sound.BaseSound;
  constructor() {
    super({key: 'Scene1'})

    //console.log("data de la escena ");

    
  }
  init(this:Scene1, {dataLevel}: any)
  {
    this.dataLevel = dataLevel;
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
    this.skeleton?.destroy();

    this.map = new Map3(this);

    this.cameras.main.setBounds(0, 0, this.map.config.w, this.map.config.h)
		this.physics.world.setBounds(0, 0, this.map.config.w, this.map.config.h)
    
    this.lifePlayer = this.map.lifeBar;


    const floor = this.map.createMap()
    
    this.monchi = new Player(this, 650, 650, "knight", 2);


    /**Darkness implementation */
    this.lights.enable().setAmbientColor(0x000000); //333333 gray
    this.lightOnPlayer = this.lights.addLight(this.monchi.x, this.monchi.y, 140).setColor(0xffffff).setIntensity(1.2); // cambiar luces en bbase a la dificultad elegida

    const checkFloor = (a: Player,b: Phaser.Physics.Arcade.Sprite ) => {
      //if(b.hasForce) a.setPosition(b.x,a.y);
     
    }


    this.cameras.main.startFollow(this.monchi,true,0.5,0.5, -0, 20);//seguimiento del personaje, apartir de q pixeles alrededor
    this.cameras.main.setZoom(4);//zoom en la escene sobre lo que este apuntando la camara 3 , 0.5

    this.cursors = this.input.keyboard?.createCursorKeys()


    const checkPoint = (player: Player) => {
      player.x = this.checkPoint.x;
      player.y = this.checkPoint.y;
    }

    const restartScene = () => {
      this.scene.restart()
    }

    const lose = () => {
      
      if(this.monchi){
        //this.monchi.dead();
        //this.time.delayedCall(1000, restartScene);
        restartScene();
      }
    }

    this.physics.world.on('worldbounds', (body: Phaser.Physics.Arcade.Sprite,top: boolean,down: boolean,left: boolean,right: boolean) => {
      //if(down) lose()
      if(down && this.monchi && this.map && this.map.lifeBar) {
        this.monchi.receivedDamage(50);
        this.playerHurt?.play();
        this.map.lifeBar.updateBar(this,-35);
        if(this.monchi.life <= 0) lose();
        // else checkPoint(this.monchi);
      }
    },this);
   
    // @ts-ignore
    this.physics.add.collider(this.monchi, floor, checkFloor);
    

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
                this.swordHit?.play()
                this.hitPlayer(this.monchi,this.skeleton,this);
        }else {
          this.swordAir?.play();
        }
      }
    }

   
  }

}

export default Scene1 