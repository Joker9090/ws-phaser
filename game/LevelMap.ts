import Phaser from 'phaser';
import EventsCenter from './EventsCenter';
import BetweenScenes from './BetweenScenes';



export default class LevelMap extends Phaser.Scene {
    /* map */
    background?: Phaser.GameObjects.Image;
    container?: Phaser.GameObjects.Container;
    /* controls */
    EscKeyboard?: Phaser.Input.Keyboard.Key;
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    /* planets */
    sun?: Phaser.GameObjects.Sprite;
    planetTutorial?: Phaser.GameObjects.Sprite;
    planetLevel1?: Phaser.GameObjects.Sprite;
    planetLevel2?: Phaser.GameObjects.Sprite;
    sunText?: Phaser.GameObjects.Text;
    tutorialText?: Phaser.GameObjects.Text;
    level1Text?: Phaser.GameObjects.Text;
    level2Text?: Phaser.GameObjects.Text;
    sunCon?: Phaser.GameObjects.Container;
    planetTutCon?: Phaser.GameObjects.Container;
    planet1Con?: Phaser.GameObjects.Container;
    planet2Con?: Phaser.GameObjects.Container;
    /* planet selector */
    planets: Phaser.GameObjects.Sprite[] = [];
    planetSelector!: Phaser.GameObjects.Image;
    selectedPlanetIndex: number = 0;
    /* progress */
    progress: number = 3;
    /* monchi */
    monchi?: Phaser.GameObjects.Sprite;
    constructor() {
        super({ key: 'LevelMap' });
    };

    init() {
        this.cursors = this.input.keyboard?.createCursorKeys();
    };
/*
    preload() {
        this.load.spritesheet("monchi", "game/character.png", { frameWidth: 220, frameHeight: 162 });
        this.load.image("backgroundLevelMap", "game/backgroundLevelMap.png");
        this.load.image("sun", "game/sun.png");
        this.load.image("planetTutorial", "game/planetaTutorial.png");
        this.load.image("planetLevel1", "game/planetaLevel1.png");
        this.load.image("planetLevel2", "game/planetaLevel2.png");
    };
*/
    upDownAnim(planet: Phaser.GameObjects.Sprite | Phaser.GameObjects.Image | Phaser.GameObjects.Text, ypos: number, offset: number, dur: number) {
        this.tweens.addCounter({
            from: 0,
            to: offset,
            duration: dur,
            ease: window.Phaser.Math.Easing.Linear,
            yoyo: true,
            repeat: -1,
            onUpdate: (tween) => {
                const value = tween.getValue();
                planet.setY(value + ypos);
            }
        });
    };

    selectPlanet(index: number) {
        const planet = this.planets[index];
        // move the hand cursor to the right edge
        let fix = 0;
        if (index == 0 || index == 1){
            fix = 0.5;
        } else if (index == 2 || index == 3){
            fix = 0.7
        } else { fix = 0.6 }
        this.planetSelector.x = planet.x + planet.displayWidth * fix;
        this.planetSelector.y = planet.y + 30;
        // store the new selected index
        this.selectedPlanetIndex = index;
    };

    selectNextPlanet(change = 1) {
        let index = this.selectedPlanetIndex + change;
        // wrap the index to the front or end of array
        if (index >= this.planets.length) {
            index = 0;
        }
        else if (index < 0) {
            index = this.planets.length - 1;
        };
        this.selectPlanet(index);
    };

    confirmSelection() {
        // get the currently selected button
        const button = this.planets[this.selectedPlanetIndex];
        // emit the 'selected' event
        button.emit('selected');
    };

    create() {
        /* Controls */
        this.EscKeyboard = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);


        const { width, height } = this.cameras.main
        this.container = this.add.container(0, 0).setDepth(999)
        this.physics.world.setBounds(0, 0, 5000, 2500);


        this.background = this.add.image(1000, 500, "backgroundLevelMap").setScale(1.3);


        this.sun = this.add.sprite(width - width / 8, height - height / 4.7, "sun").setScale(0.08).setTint(Phaser.Display.Color.GetColor(5, 5, 5));
        this.sunText = this.add.text(this.sun.x, this.sun.y + this.sun.displayHeight / 1.5, "COMING SOON").setOrigin(0.5).setScale(1.2).setVisible(true);

        this.planetLevel2 = this.add.sprite(width - width / 2.8, height - height / 2.8, "planetLevel2").setScale(0.15).setTint(Phaser.Display.Color.GetColor(5, 5, 5));
        this.level2Text = this.add.text(this.planetLevel2.x, this.planetLevel2.y + this.planetLevel2.displayHeight / 1.5, "COMING SOON").setOrigin(0.5).setScale(1.2).setVisible(true);
   
        this.planetLevel1 = this.add.sprite(width - width / 1.7, height - height / 1.77, "planetLevel1").setScale(0.35).setTint(Phaser.Display.Color.GetColor(5, 5, 5));
        this.level1Text = this.add.text(this.planetLevel1.x, this.planetLevel1.y + this.planetLevel1.displayHeight / 1.8, "COMING SOON").setOrigin(0.5).setScale(1.2).setVisible(true);
   
        this.planetTutorial = this.add.sprite(width - width / 1.2, 200, "planetTutorial").setScale(0.15);
        this.tutorialText = this.add.text(this.planetTutorial.x, this.planetTutorial.y + this.planetTutorial.displayHeight / 1.8, "Tutorial").setOrigin(0.5).setScale(1.2);
       
        this.container.add([this.sun, this.planetTutorial, this.planetLevel1, this.planetLevel2]);
        this.monchi = this.add.sprite(width + 100, 150, "character", 1).setScale(.5).setDepth(9);

        if (this.progress == 0){
            this.planets = [this.planetTutorial];
        } else if (this.progress == 1){
            this.planets = [this.planetTutorial, this.planetLevel1];
        } else if (this.progress == 2){
            this.planets = [this.planetTutorial, this.planetLevel1, this.planetLevel2];
        } else if (this.progress == 3){
            this.planets = [this.planetTutorial, this.planetLevel1, this.planetLevel2, this.sun];
        } else {this.planets = [this.planetTutorial, this.planetLevel1, this.planetLevel2, this.sun];};

        this.planetSelector = this.add.image(0, 0, 'cursor').setScale(.1).setRotation(-0.7);
        this.selectPlanet(0);

        this.upDownAnim(this.sun, this.sun.y, 13, 2000);
        this.upDownAnim(this.sunText, this.sunText.y, 13, 2000);
        this.upDownAnim(this.planetTutorial, this.planetTutorial.y, 5, 2500);
        this.upDownAnim(this.tutorialText, this.tutorialText.y, 5, 2500);
        this.upDownAnim(this.planetLevel1, this.planetLevel1.y, 16, 2300);
        this.upDownAnim(this.level1Text, this.level1Text.y, 16, 2300);
        this.upDownAnim(this.planetLevel2, this.planetLevel2.y, 0, 2100);
        this.upDownAnim(this.level2Text, this.level2Text.y, 0, 2100);
        this.upDownAnim(this.background, 500, 10, 6000);

        this.planetTutorial.on('selected', () => {
            this.makeTransition("Game", { level: 0, lifes: 3 });
            //this.scene.start("Game", { level: 0, lifes: 3 });
            this.selectedPlanetIndex = 0
        });

        this.planetLevel1.on('selected', () => {
            this.makeTransition("Game", { level: 1, lifes: 3 });
            //this.scene.start("Game", { level: 1, lifes: 3 });
            this.selectedPlanetIndex = 0
        });

        this.planetLevel2.on('selected', () => {
            this.makeTransition("Game", { level: 2, lifes: 3 });
            //this.scene.start("Game", { level: 2, lifes: 3 });
            this.selectedPlanetIndex = 0
        });

        this.sun.on('selected', () => {
            this.makeTransition("Game", { level: 3, lifes: 3 });
            //this.scene.start("Game", { level: 3, lifes: 3 });
            this.selectedPlanetIndex = 0
        });

    };

    makeTransition(sceneName: string, data: any) {
        const getBetweenScenesScene = this.game.scene.getScene("BetweenScenes") as BetweenScenes
        if (getBetweenScenesScene) getBetweenScenesScene.changeSceneTo(sceneName, data)
        else this.scene.start(sceneName, data);
        this.time.delayedCall(1000,()=>{
            this.scene.stop()
          })
      }

    showPlanets(level: number) {
        if (level == 0) {
            this.planetTutorial?.clearTint();
            this.tutorialText?.setVisible(true);
        } else if (level == 1) {
            this.planetTutorial?.clearTint();
            this.tutorialText?.setVisible(true);
            this.planetLevel1?.clearTint();
            this.level1Text?.setVisible(true);
        } else if (level == 2) {
            this.planetTutorial?.clearTint();
            this.tutorialText?.setVisible(true);
            this.planetLevel1?.clearTint();
            this.level1Text?.setVisible(true);
            this.planetLevel2?.clearTint();
            this.level2Text?.setVisible(true);
        } else if (level == 3) {
            this.planetTutorial?.clearTint();
            this.tutorialText?.setVisible(true);
            this.planetLevel1?.clearTint();
            this.level1Text?.setVisible(true);
            this.planetLevel2?.clearTint();
            this.level2Text?.setVisible(true);
            this.sun?.clearTint();
            this.sunText?.setVisible(true);
        }
    }


    update() {

        if (this.monchi) {
            this.progress = this.progress + .0031415;
            this.monchi.x = this.monchi.x - .8;
            this.monchi.y = this.monchi.y + .30;
            this.monchi.setRotation(this.progress);
            if(this.monchi.x == -150){
                this.monchi.x = this.cameras.main.width + 100
                this.monchi.y = 150
            }
        };

        this.showPlanets(this.progress);

        if (this.EscKeyboard) this.EscKeyboard.on("down", () => {
            EventsCenter.emit('gameOver', true)
            this.makeTransition("Menu", {});
            //this.scene.start("Menu");
        })

        if (this.cursors) {
            const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.left);
            const downJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.right);
            const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space);

            if (upJustPressed) {
                this.selectNextPlanet(-1);
            }
            else if (downJustPressed) {
                this.selectNextPlanet(1);
            }
            else if (spaceJustPressed) {
                this.confirmSelection();
            };
        };
    };
};

