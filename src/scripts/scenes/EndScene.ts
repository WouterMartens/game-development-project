export default class EndScene extends Phaser.Scene {
    private startOverKey: Phaser.Input.Keyboard.Key;
    private endText: Phaser.GameObjects.BitmapText;
    private endSceneSound: any;
    private lastBlinkTime: number;
    
    constructor() {
        super({ key: 'EndScene' });
    }

    public init(): void {
        // Initializer for keyboard input (S key)
        this.startOverKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.S);
        this.startOverKey.isDown = false;

        // Default the blinking text
        this.lastBlinkTime = 0;
    }

    public preload(): void {
        // Background
        this.load.image("background", "assets/img/startBackground.png");

        // Ghost
        this.load.image("ghost", "assets/img/snapghost.png");

        // Custom font
        this.load.bitmapFont("dungeonFont", "assets/font/TheDungeonFont.png", "assets/font/TheDungeonFont.fnt");

        // Audio
        this.load.audio("endTheme", "assets/audio/bossTheme.mp3")
    }

    public create(): void {
        this.add.image(this.sys.game.canvas.width / 2, 0, "background").setOrigin(0.5, 0); // background image

        this.endText = this.add.bitmapText(this.sys.game.canvas.width / 2, 280, "dungeonFont", "EINDE", 80).setOrigin(0.5, 0); 
        this.endText = this.add.bitmapText(this.sys.game.canvas.width / 2, 400, "dungeonFont", "Je hebt Ghost verslagen!", 30).setOrigin(0.5, 0); 
        this.endText = this.add.bitmapText(this.sys.game.canvas.width / 2, 450, "dungeonFont", "druk op S om opnieuw te beginnen", 20).setOrigin(0.5, 0); // Subtitle with custom font

        const ghostLeft = this.add.image(350, 300, "ghost").setOrigin(0.5, 0); // the image for the ghost emoji
        ghostLeft.setScale(0.2); // resize ghost emoji
        const ghostRight = this.add.image(950, 300, "ghost").setOrigin(0.5, 0); // the image for the ghost emoji
        ghostRight.setScale(0.2); // resize ghost emoji

        // Tweens animation for ghost emoji to move up and down
        this.tweens.add({
            targets: ghostLeft,
            y: 250,
            ease: "Sine.easeInOut",
            yoyo: true,
            repeat: -1,
            duration: 2000,
            alpha: 0,
        });

        // Tweens animation for ghost emoji to fade in and out
        this.tweens.add({
            targets: ghostLeft,
            ease: "Linear",
            yoyo: true,
            repeat: -1,
            duration: 5000,
            alpha: 0
        })

        // Tweens animation for ghost emoji to move up and down
        this.tweens.add({
            targets: ghostRight,
            y: 250,
            ease: "Sine.easeInOut",
            yoyo: true,
            repeat: -1,
            duration: 2000,
            alpha: 0,
        });

        // Tweens animation for ghost emoji to fade in and out
        this.tweens.add({
            targets: ghostRight,
            ease: "Linear",
            yoyo: true,
            repeat: -1,
            duration: 5000,
            alpha: 0
        })

        // Adds and plays the music
        this.endSceneSound = this.sound.add("endTheme");
        this.endSceneSound.play();
    }

    public update(): void {
        // Push S to start playing again
        if (this.startOverKey.isDown) {
            this.scene.start("StartScene");
            // Stops the music on the next scene
            this.endSceneSound.stop();
        }

        // To make the start text blink
        if (this.game.getTime() > this.lastBlinkTime + 700) {
            this.endText.setVisible(!this.endText.visible);
            this.lastBlinkTime = this.game.getTime();
        }         
    }
}
