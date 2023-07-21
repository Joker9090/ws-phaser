import Phaser from "phaser";
import LargeFloor, { LargeFloorConfig } from "../assets/LargeFloor";
import CloudGenerator from "../assets/CloudGenerator";
import LargeFloorIsland from "../assets/LargeFloorIsland";
import Antorcha, { AntorchaConfig } from "../assets/Antorcha";
import Health from "../assets/Health";
import UiModel from "../assets/UIModel";
import LifeBar from "../assets/LifeBar";
import Door from "../assets/Door";
import Enemy, { PatrolConfig } from "../assets/Enemy";
import EnemyFly from "../assets/EnemyFly";
import EnemyBoss from "../assets/EnemyBoss";

class Map3 {
  scene: Phaser.Scene;
  mapElements?: Phaser.Physics.Arcade.Group;
  lifeBar?: LifeBar;
  healths?: Health;
  door?: Door;
  enemies: Enemy[] = [];
  //debugGraphics: Phaser.GameObjects.Graphics
  config: {
    w: number,
    h: number
  } = {
      w: 2900,
      h: 1000
    }
  constructor(scene: Phaser.Scene) {
    this.scene = scene


    this.scene.physics.world.setBounds(0, 0, this.config.w, this.config.h)

    /* Debug */
    //this.debugGraphics = this.scene.add.graphics();
    //this.debugGraphics.fillStyle(0x00ff, 0.5);
    //this.debugGraphics.fillRect(0, 0, this.config.w, this.config.h);
    /* Debug */

  }

  createMap() {
    const background = this.scene.add.image(0, 0, "BackgroundNew").setOrigin(0, 0).setScale(0.2,0.2);
    // Based on your game size, it may "stretch" and distort.
    background.displayWidth = this.config.w;
    background.displayHeight = this.config.h + 10;


    //const nube1 = this.scene.add.image(200,200,"nubee").setScale(0.6).setOrigin(0.5,0.5);

    //const nube2 = this.scene.add.image(1200,180,"nubee");
    //const tree = this.scene.add.image(1830,300,"tree").setOrigin(0.5,0.5).setScale(0.7);
    //const crystal = this.scene.add.image(1730,350,"crystal").setOrigin(0.5,0.5).setScale(0.7);

    this.mapElements = this.scene.physics.add.group({ allowGravity: false, immovable: true });


    const LargeFloorConfigg: LargeFloorConfig = {
      textureA: "tile1",
      textureB: "tile3",
      large: 123,
      //width:576,
      //height:324, 
      pos: { x: 20, y: 800 },
      //scale: {width: 1,height: 1,},
      //fix:-9,

    }

    const LargeFloorIslandConfig = {
      textureA: "islandA",
      textureB: "islandB",
      textureC: "islandC",
      large: 2,
      //width:576,
      //height:324, 
      pos: { x: 460, y: 610 },
      //scale: {width: 1,height: 1,},
      //fix:-9,

    }

    const LargeFloorIslandConfig2 = {
      textureA: "islandA",
      textureB: "islandB",
      textureC: "islandC",
      large: 2,
      //width:576,
      //height:324, 
      pos: { x: 800, y: 610 },
      //scale: {width: 1,height: 1,},
      //fix:-9,

    }

    const LargeFloorIslandConfig3 = {
      textureA: "islandA",
      textureB: "islandB",
      textureC: "islandC",
      large: 2,
      //width:576,
      //height:324, 
      pos: { x: 633, y: 500 },
      //scale: {width: 1,height: 1,},
      //fix:-9,
    }


    const CloudGeneratorConfig1 = {
      texture: "neblina",
      x: 10,
      y: 350,
      delayed: 1,
      direction: 1,
      randomnes: 0,
      startWith: 1,
    }

    //const AntorchaConfig: AntorchaConfig = {
    //  x:110,
    //  y:800,
    //  sprite:"antorcha",
    //}

    const AntorchaConfig = {
      x: 100,
      y: 680,
      sprite: "antorcha",
    }
    const AntorchaConfig2 = {
      x: 650,
      y: 470,
      sprite: "antorcha",
    }

    const AntorchaConfig3 = {
      x: 1150,
      y: 680,
      sprite: "antorcha",
    }

    const HealthConfig = {
      x: 1650,
      y: 760,
      sprite: "heartFullUI",
      quantity: 3,
    }

    const UIConfig = {
      textureA: "heartFullUI",
      sceneWidth: 800,
      sceneHeight: 600,
      large: 3,
    }

    const LifeConfig = {
      x: this.scene.cameras.main.width / 2,
      y: this.scene.cameras.main.height / 2,
      sprite: "greenBar",
      spriteContainer: "healthBarWithAlpha",
    }
    //const newAntorcha = new Antorcha(this.scene, AntorchaConfig);
    //const newAntorcha2 = new Antorcha(this.scene, AntorchaConfig2);
    //const newAntorcha3 = new Antorcha(this.scene, AntorchaConfig3);
    //const lightOnAntorcha = this.scene.lights.addLight(newAntorcha.x, newAntorcha.y, 200).setColor(0xdc9e7c).setIntensity(1);
    //const lightOnAntorcha2 = this.scene.lights.addLight(newAntorcha2.x, newAntorcha2.y, 200).setColor(0xdc9e7c).setIntensity(1);
    //const lightOnAntorcha3 = this.scene.lights.addLight(newAntorcha3.x, newAntorcha3.y, 200).setColor(0xdc9e7c).setIntensity(1);


    //const newDoor = new Door(this.scene, 1750, 985, "doorCueva", true);
    //const lightOnDoor = this.scene.lights.addLight(newDoor.x, newDoor.y, 200).setColor(0xdc9e7c).setIntensity(0.7);

    //const healths = new Health(this.scene, HealthConfig);
    //this.mapElements.add(healths);
    //this.healths = healths;
    //this.door = newDoor;

    //this.lifeBar = new LifeBar(this.scene, LifeConfig);
    //if(this.lifeBar && this.lifeBar.body)this.lifeBar.body.immovable= true;

    //const UI = new UiModel(this.scene,UIConfig,this.mapElements);
    //const nubes = new CloudGenerator(this.scene, CloudGeneratorConfig1);
    //nubes.start();
    //const newIsland2 = new LargeFloorIsland(this.scene, LargeFloorIslandConfig2, this.mapElements)
    //const newIsland = new LargeFloorIsland(this.scene, LargeFloorIslandConfig, this.mapElements)
    const newFloor = new LargeFloor(this.scene, LargeFloorConfigg, this.mapElements);
    //const newIsland3 = new LargeFloorIsland(this.scene, LargeFloorIslandConfig3, this.mapElements)





    //const newAntorcha = new Antorcha(this.scene,AntorchaConfig,this.mapElements);
    //const p1 = this.scene.physics.add.sprite(100, 470, "plataformaA").setScale(0.7);
    //const p2 = this.scene.physics.add.sprite(400, 470, "plataformaA").setScale(0.3);
    //const p3 = this.scene.physics.add.sprite(700, 500, "plataformaA").setScale(0.3);
    //const p4 = this.scene.physics.add.sprite(1200, 500, "plataformaA").setScale(0.3);
    //const p5 = this.scene.physics.add.sprite(950, 300, "plataformaA").setScale(0.7);
    //const p6 = this.scene.physics.add.sprite(200, 400, "plataformaA").setScale(0.3);
    //const p7 = this.scene.physics.add.sprite(1750, 400, "plataformaA").setScale(0.7);



    /*     this.scene.tweens.add({
          targets: p3,
          y: 300,
          duration: 2000,
          repeat: -1,
          hold: 500,
          yoyo:true,
          repeatDelay: 500,
          ease: 'linear'
        });
    
        this.scene.tweens.add({
          targets: p4,
          y: 300,
          duration: 1500,
          repeat: -1,
          hold: 500,
          yoyo:true,
          repeatDelay: 500,
          ease: 'linear'
        });
    
        this.scene.tweens.add({
          targets: p6,
          x: "+=300",
          duration: 2000,
          repeat: -1,
          hold: 800,
          yoyo:true,
          repeatDelay: 500,
          ease: 'linear'
        });
    
        p6.hasForce = true; */

    /**Darknes implementation */ //Darkness implementation
    //background.setPipeline('Light2D');


    //OLD SKELETON
    /*
    const onCreateEnemy1 = (key: string, index: number, sprite: Enemy) => {
      this.enemies.push(sprite)
      if (key == "skeleton") {
        const skeletonOnePatrol: PatrolConfig = {
          x: 160,
          delay: 7000,
          enemyDetect: true,
          flip: true
        }
        sprite.patrol(skeletonOnePatrol);
      }
    }

    const enemyMaker1Config = {
      delay: 300,
      max: 3,
      enemies: [
        // "archimago",
        "skeleton",
        "skeleton",
        "skeleton"
      ],
      EnemyClass: Enemy,
      colliders: [newFloor],
      onCreate: onCreateEnemy1
    }

    const enemyMaker1 = new EnemyMaker(this.scene, { x: 1200, y: 600 }, enemyMaker1Config)
    enemyMaker1.start()


    const onCreateEnemy2 = (key: string, index: number, sprite: Enemy) => {
      this.enemies.push(sprite)
      if (key == "skeleton") {
        const skeletonOnePatrol: PatrolConfig = {
          x: 160,
          delay: 7000,
          enemyDetect: true,
          flip: false
        }
        sprite.patrol(skeletonOnePatrol);
      }
    }

    const enemyMaker2Config = {
      delay: 300,
      max: 3,
      enemies: [
        // "archimago",
        "skeleton",
        "skeleton",
        "skeleton"
      ],
      EnemyClass: Enemy,
      colliders: [newFloor],
      onCreate: onCreateEnemy2
    }

    const enemyMaker2 = new EnemyMaker(this.scene, { x: 50, y: 600 }, enemyMaker2Config)
    enemyMaker2.start()*/

    /** NEW ENEMYS */
    const onCreateEnemy1 = (key: string, index: number, sprite: Enemy) => {
      this.enemies.push(sprite)
      if (key == "Enemy1" || key == "Enemy2" || key == "Enemy3" || key == "Enemy4" || key == "Enemy5" || key == "Enemy6") {
        const skeletonOnePatrol: PatrolConfig = {
          x: 160,
          delay: 7000,
          enemyDetect: true,
          flip: true
        }
        sprite.patrol(skeletonOnePatrol);
      }
    }

    const enemyMaker1Config = {
      delay: 600,
      max: 1,
      enemies: [
        // "archimago",
        "Enemy1",
        "Enemy2",
        "Enemy3",
        "Enemy4",
        "Enemy5",
        "Enemy6",
      ],
      EnemyClass: EnemyFly,
      colliders: [newFloor],
      onCreate: onCreateEnemy1
    }

    const enemyMaker1 = new EnemyMaker(this.scene, { x: 150, y: 600 }, enemyMaker1Config)
    enemyMaker1.start()



    const onCreateEnemy2 = (key: string, index: number, sprite: Enemy) => {
      this.enemies.push(sprite)
      if (key == "Boss1" || key == "Boss2" || key == "Boss3" || key == "Boss4" || key == "Boss5" || key == "Boss6") {
        const skeletonOnePatrol2: PatrolConfig = {
          x: 160,
          delay: 7000,
          enemyDetect: true,
          flip: false
        }
        sprite.patrol(skeletonOnePatrol2);
      }
    }

    const enemyMaker2Config = {
      delay: 600,
      max: 6,
      enemies: [
        // "archimago",
        "Boss1",
        "Boss2",
        "Boss3",
        "Boss4",
      ],
      EnemyClass: EnemyBoss,
      colliders: [newFloor],
      onCreate: onCreateEnemy2
    }

    const enemyMaker2 = new EnemyMaker(this.scene, { x: 1250, y: 600 }, enemyMaker2Config)
    enemyMaker2.start()


    this.mapElements.addMultiple([newFloor])

    return this.mapElements;

  }

}

export default Map3;


export enum EnemyMakerStatusEnum { IDLE, ACTIVE, INACTIVE }

export type EnemyMakerConfig = {
  delay: number,
  max?: number,
  enemies: string[],
  EnemyClass: typeof Enemy | typeof EnemyFly | typeof EnemyBoss// Cambiar a la clase del enemigo
  colliders: any[],
  onCreate?: (key: string, index: number, sprite: Enemy) => void
}

export type EnemyMakerProgress = {
  enemyCreated: number
}

export class EnemyMaker {
  scene: Phaser.Scene;
  pos: { x: number, y: number };
  status: EnemyMakerStatusEnum = EnemyMakerStatusEnum.IDLE;
  config: EnemyMakerConfig;
  progress: EnemyMakerProgress = { enemyCreated: 0 }

  constructor(scene: Phaser.Scene, pos: { x: number, y: number }, config: EnemyMakerConfig) {
    this.scene = scene;
    this.pos = pos;
    this.config = config
  }

  changeConfig(config: EnemyMakerConfig) {
    this.config = config
  }

  start() {
    if (this.status == EnemyMakerStatusEnum.IDLE) {
      this.status = EnemyMakerStatusEnum.ACTIVE
      this.startLoop();
    }
  }

  stop() {
    if (this.status == EnemyMakerStatusEnum.ACTIVE) {
      this.status = EnemyMakerStatusEnum.IDLE
      // APAGA el creador
    }
  }

  destroy() {
    if (this.status == EnemyMakerStatusEnum.ACTIVE) {
      this.status = EnemyMakerStatusEnum.INACTIVE
      // MATA TODO
    }
  }

  startLoop() {
    if (this.config.max && this.progress.enemyCreated >= this.config.max) {
      this.stop();
    } else {
      this.instanceEnemy();
      setTimeout(this.startLoop.bind(this), this.config.delay)
    }
  }

  purgeEnemyCreated() {
    this.progress.enemyCreated = 0;
  }

  instanceEnemy() {
    const { enemies, EnemyClass, colliders, onCreate } = this.config
    const { x, y } = this.pos
    const grabEnemyFromList = Phaser.Utils.Array.GetRandom(enemies)

    const enemy = new EnemyClass(this.scene, x, y, grabEnemyFromList, 0)

    colliders.forEach(collider => {
      this.scene.physics.add.collider(collider, enemy);
    });

    if (onCreate) onCreate(grabEnemyFromList, this.progress.enemyCreated, enemy)
    this.progress.enemyCreated++;
    // Crea un enemigo
  }


}