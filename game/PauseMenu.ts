class PauseMenu {
    scene: Phaser.Scene
    overlayRect: any
    text: any
    resumeButton: any
    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.overlayRect = null;
        this.text = null;
        this.resumeButton = null;
    }

    create() {
        // Create a semi-transparent overlay rectangle
        this.overlayRect = this.scene.add.rectangle(
            this.scene.cameras.main.centerX,
            this.scene.cameras.main.centerY,
            this.scene.cameras.main.width,
            this.scene.cameras.main.height,
            0x000000,
            0.5
        );
        this.overlayRect.setDepth(1);

        // Create the text for the pause message
        this.text = this.scene.add.text(
            this.scene.cameras.main.centerX,
            this.scene.cameras.main.centerY - 50,
            'Game Paused',
            {
                font: '32px Arial',
            }
        );
        this.text.setOrigin(0.5);
        this.text.setDepth(2);

        this.resumeButton = this.scene.add.text(
            this.scene.cameras.main.centerX,
            this.scene.cameras.main.centerY + 50,
            'Resume',
            {
                font: '24px Arial',
            }
        );
        this.resumeButton.setOrigin(0.5);
        this.resumeButton.setDepth(2);
        this.resumeButton.setInteractive();

        this.resumeButton.on('pointerdown', () => {
            this.close();
        });
    }

    open() {
        this.scene.scene.pause();
        this.create();
    }

    close() {
        this.scene.scene.resume();
        this.overlayRect.destroy();
        this.text.destroy();
        this.resumeButton.destroy();
         
        console.log("resume")
    }
}

export default PauseMenu