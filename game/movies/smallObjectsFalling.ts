import Phaser from "phaser";

export type smallObjectsConfig = {
    texture: string[];
    scale: number;
    velocity: number;
    alpha: number;
};

class SmallObjects {
    smallObjectsGroup: Phaser.GameObjects.Group;
    scene: Phaser.Scene;
    config?: smallObjectsConfig;

    constructor(scene: Phaser.Scene, config?: smallObjectsConfig) {
        this.scene = scene;
        if (config) this.config = config;
        this.smallObjectsGroup = this.scene.add.group();


    }

    createPaths(qty: number) {
        const width = window.innerWidth;  // Width of the screen
        const height = window.innerHeight; // Height of the screen
        const numPaths = qty; // Number of paths
        const spacing = width / (numPaths + 1); // Spacing between paths

        // Array to hold the points for each path
        const paths = [];

        // Generate points for each path
        for (let i = 0; i < numPaths; i++) {
            const startX = spacing * (i + 1);

            const points = [
                new Phaser.Math.Vector2( startX,  -100 ),
                new Phaser.Math.Vector2( startX + (Math.random() * 100 - 50),  200 ),
                new Phaser.Math.Vector2( startX + (Math.random() * 100 - 50),  400 ),
                new Phaser.Math.Vector2( startX,  height + 100 ),
            ];

            paths.push(points);
        }

        return paths
    }

    createFallingItems() {
        // Create an object (e.g., a sprite) to follow the path
        const follower = this.scene.add.image(600, 400, "Piedra1").setScale(1); // A simple red circle as an example
        // Create a smooth path using Phaser.Curves.Spline
        const pathsPoints = this.createPaths(20)
        const path = new Phaser.Curves.Spline(pathsPoints[Phaser.Math.Between(0, 19)]);
        // Create a graphics object to visualize the path
        const graphics = this.scene.add.graphics();
        graphics.lineStyle(2, 0xffffff, 1);

        // Tween to make the object follow the path
        this.scene.tweens.add({
            targets: follower,
            duration: 7000,
            ease: 'Linear',
            repeat: 0,
            yoyo: false,
        });
    }


    randomProp() {
        return Phaser.Math.Between(0, 3);
    }

    randomTime() {
        const delayedTime = 1000 + this.randomProp() * 1000;
        return delayedTime;
    }

    run() {
        this.createFallingItems();
        this.scene.time.delayedCall(this.randomTime(), this.run, [], this);
    }


    start() {
        this.run();
    }
}

export default SmallObjects;
