
import Phaser, { LEFT } from "phaser";
import Player from "./assets/Player";
import Map0 from "./maps/Map0";
import Map2 from "./maps/Map2";
import Enemy, { PatrolConfig } from "./assets/Enemy";
import CloudGenerator from "./assets/CloudGenerator";
import Antorcha from "./assets/Antorcha";
import UiModel from "./assets/UIModel";
import hitZone from "./assets/hitZone";
import LifeBar from "./assets/LifeBar";
import Map3 from "./maps/Map3";
import Boss from "./assets/Boss";
import EnemyFly from "./assets/EnemyFly";

// Scene in class
class Scene1 extends Phaser.Scene {
  monchi?: Player;
  // skeleton?: Enemy;
  map?: Map3;
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

  hitPlayer = (monchi: Player, skeleton: Enemy| EnemyFly, scene:Phaser.Scene) => {
    const weapon = monchi.weapon;
    console.log("Player espada colision con enemigo");
    skeleton.corposeStay()
  }


  create(this: Scene1) {
    // this.skeleton?.destroy();

    this.map = new Map3(this);

    this.cameras.main.setBounds(0, 0, this.map.config.w, this.map.config.h)
		this.physics.world.setBounds(0, 0, this.map.config.w, this.map.config.h)
    
    this.lifePlayer = this.map.lifeBar;


    const floor = this.map.createMap()
    
    //this.monchi = new Player(this, 650, 650, "knight", 2);
    this.monchi = new Player(this, 650, 650, "playerNew", 2);

    

    const UIScene = this.game.scene.getScene("UIScene");
    this.scene.launch(UIScene, { ...this.dataLevel, game: this });

    //const UIScene = this.game.scene.getScene("UIScene");
    
    //if (!UIScene.scene.isActive()) this.scene.launch(UIScene, { ...this.dataLevel, game: this });



    /* Audio NEW*/
    /*const getMusicManagerScene = this.game.scene.getScene("MusicManager") as MusicManager;
    if (!getMusicManagerScene.scene.isActive()) this.scene.launch("MusicManager").sendToBack();
    else if (this.dataLevel == 0) {
      getMusicManagerScene.playMusic("songTutorial");
    } else if (this.dataLevel == 1) {
      getMusicManagerScene.playMusic("songLevel1");
    } else if (this.dataLevel == 2) {
      getMusicManagerScene.playMusic("songLevel2");
    }
    */

    /**Darkness implementation */
    //this.lights.enable().setAmbientColor(0x000000); //333333 gray
    this.lightOnPlayer = this.lights.addLight(this.monchi.x, this.monchi.y, 140).setColor(0xffffff).setIntensity(1.2); // cambiar luces en bbase a la dificultad elegida

    const checkFloor = (a: Player,b: Phaser.Physics.Arcade.Sprite ) => {
      //if(b.hasForce) a.setPosition(b.x,a.y);
     
    }


    this.cameras.main.startFollow(this.monchi,true,0.5,0.5, -0, 20);//seguimiento del personaje, apartir de q pixeles alrededor
    this.cameras.main.setZoom(0.9);//zoom en la escene sobre lo que este apuntando la camara 3 , 0.5 // ultimo 4 // ultimo ok 1.3

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
        this.map.lifeBar.updateBar(-35);
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
      if(this.map) {
        if(this.monchi.weapon) {
          if(this.monchi.weapon.hitboxes.length > 0) {
            for (let i = 0; i < this.map.enemies.length; i++) {
              const enemy = this.map.enemies[i];
              for (let k = 0; k < this.monchi.weapon.hitboxes.length; k++) {
                const hitbox = this.monchi.weapon.hitboxes[k];
                
                if (Phaser.Geom.Rectangle.Overlaps(hitbox.getBounds(), enemy.getBounds())){
                  this.hitPlayer(this.monchi,enemy,this);
                }
              }
            }
          }
        }
      }
    }
  }
}

export default Scene1 
