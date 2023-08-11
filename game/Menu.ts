import Phaser from "phaser";
import BetweenScenes, { BetweenScenesStatus } from "./BetweenScenes";
//import MusicManager from "./MusicManager";

export default class Menu extends Phaser.Scene {
  noswarText?: Phaser.GameObjects.Text;
  spaceText?: Phaser.GameObjects.Text;
  studiosText?: Phaser.GameObjects.Text;
  noswarLogo?: Phaser.GameObjects.Image;
  container?: Phaser.GameObjects.Container;
  progressParam: number = 0;
  cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  finishIntro: boolean = false;

  part1?: Phaser.GameObjects.Image;
  part2?: Phaser.GameObjects.Image;
  part3?: Phaser.GameObjects.Image;
  part4?: Phaser.GameObjects.Image;
  part5?: Phaser.GameObjects.Image;
  part6?: Phaser.GameObjects.Image;

  pj?: Phaser.GameObjects.Sprite;
  e1?: Phaser.GameObjects.Sprite;
  e2?: Phaser.GameObjects.Sprite;
  e3?: Phaser.GameObjects.Sprite;

  gameTitle?: Phaser.GameObjects.Image;



  constructor() {
    super({ key: "Menu" });
  }

  init() {
    this.cursors = this.input.keyboard?.createCursorKeys();
  }
  /*
      preload() {
          this.load.image("logoNoswar", "game/logo.png");
      };
  */

  create() {
    this.cameras.main.setBackgroundColor(
      Phaser.Display.Color.GetColor(30, 30, 30)
    );
    /* Audio */
    //const getMusicManagerScene = this.game.scene.getScene(
      "MusicManager"
    //) as MusicManager;
    //if (!getMusicManagerScene.scene.isActive())
    //  this.scene.launch("MusicManager").sendToBack();
    //else {
    //  getMusicManagerScene.playMusic("songMenu");
    //}


    //ANIMS
    const Enemy2FlyIdleFrames = this.anims.generateFrameNumbers("Enemy2",{start:0 , end: 5});
    const Enemy2FlyIdleFramesConfig = {
      key: `Enemy2IdleFrames`,
      frames: Enemy2FlyIdleFrames,
      frameRate: 10,
      repeat: -1,
    }
    this.anims.create(Enemy2FlyIdleFramesConfig);

    const Enemy4FlyIdleFrames = this.anims.generateFrameNumbers("Enemy4",{start:0 , end: 5});
    const Enemy4FlyIdleFramesConfig = {
      key: `Enemy4IdleFrames`,
      frames: Enemy4FlyIdleFrames,
      frameRate: 10,
      repeat: -1,
    }
    this.anims.create(Enemy4FlyIdleFramesConfig);

    const Enemy3FlyIdleFrames = this.anims.generateFrameNumbers("Enemy3",{start:0 , end: 5});
    const Enemy3FlyIdleFramesConfig = {
      key: `Enemy3IdleFrames`,
      frames: Enemy3FlyIdleFrames,
      frameRate: 10,
      repeat: -1,
    }
    this.anims.create(Enemy3FlyIdleFramesConfig);

    const pjIdleFrames = this.anims.generateFrameNumbers("playerNew",{start:37 , end: 41});
    const pjIdleFramesConfig = {
      key: `pjIdleFrames`,
      frames: pjIdleFrames,
      frameRate: 8,
      repeat: -1,
    }
    this.anims.create(pjIdleFramesConfig);




    //
    const { width, height } = this.cameras.main;
    this.container = this.add.container(width / 2, height / 2).setDepth(999);

    this.part1 = this.add.image(0,0,"bg").setScale(0.7);
    //this.part3 = this.add.image(0,0,"sombraPersonaje").setScale(0.2);
    this.e1 = this.add.sprite(0 + 150,0 + 20,"Enemy2").play("Enemy2IdleFrames").setScale(0.3);
    this.e2 = this.add.sprite(0  ,0+ 40,"Enemy4").play("Enemy4IdleFrames").setScale(0.3);
    this.e3 = this.add.sprite(0+ 150,0 + 140,"Enemy3").play("Enemy3IdleFrames").setScale(0.3);
    this.pj = this.add.sprite(0 , 0 + 140, "playerNew").play("pjIdleFrames").setScale(0.4);
    this.part4 = this.add.image(0,0 + 200,"hojas").setScale(0.445,0.3);
    this.part2 = this.add.image(0,0,"borde").setScale(0.45,0.58);
    this.spaceText = this.add.text(0 - 200, 0 - 300, "Press SPACE to START",{fontFamily: "Enchanted Land"}).setOrigin(0.5).setAlpha(0);

    this.gameTitle = this.add.image(0 - 200, 0 - 150, "titulo").setScale(0.4);

    //this.container.setPosition(0, height + this.container.height + 10);

    this.container.add([
      this.part1,
      this.part2,
      //this.part3,
      this.e1,
      this.e2,
      this.e3,
      this.pj,
      this.part4,
      this.gameTitle,
      this.spaceText,
    ])



    /* TWEEN SPACE TO CONTINUE */
    this.tweens.addCounter({
      from: -1,
      to: 1,
      duration: 6500,
      ease: window.Phaser.Math.Easing.Linear,
      yoyo: true,
      repeat: -1,
    });
  

  }



  pressAnim() {
    this.tweens.addCounter({
      from: 1,
      to: 0.2,
      duration: 2000,
      ease: window.Phaser.Math.Easing.Linear,
      yoyo: true,
      repeat: -1,
      onUpdate: (tween) => {
        const value = tween.getValue();
        this.spaceText?.setAlpha(value);
      },
    });
  }

  makeTransition(sceneName: string, data: any) {
    const getBetweenScenesScene = this.game.scene.getScene(
      "BetweenScenes"
    ) as BetweenScenes;
    if (getBetweenScenesScene) {
      if (getBetweenScenesScene.status != BetweenScenesStatus.IDLE)
        return false;
      getBetweenScenesScene.changeSceneTo(sceneName, data);
      this.time.delayedCall(1000, () => {
        this.scene.stop();
      });
    } else {
      this.scene.start(sceneName, data);
      this.time.delayedCall(1000, () => {
        this.scene.stop();
      });
    }
  }

  update() {
    if (this.spaceText)
      this.spaceText?.setPosition(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2 + 200
      );
    if (this.cursors) {
      if (this.cursors.space.isDown) {
        this.makeTransition("Scene1", { data: 1 });
      }
    }
  }
}

