export default class StartScene extends Phaser.Scene {
    private startKey: Phaser.Input.Keyboard.Key;
    private timer: number;
    private startText: Phaser.GameObjects.BitmapText;
    private lastBlinkTime: number;
    private startSceneSound: any;

    constructor() {
        super({ key: 'StartScene' });
    }

    init(): void {
        // Initializer for keyboard input (S key)
        this.startKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.S);
        this.startKey.isDown = false;

        // Default the blinking text
        this.lastBlinkTime = 0;
    }

    preload(): void {

        // Ghost
        this.load.image("ghost", "assets/img/snapghost.png");

        // Background
        this.load.image("background", "assets/img/startBackground.png");

        // Custom font
        this.load.bitmapFont("dungeonFont", "assets/font/TheDungeonFont.png", "assets/font/TheDungeonFont.fnt");

        // Torches animation
        this.load.spritesheet('torchFrontSprite', 'assets/img/torch-front-spritesheet.png', { frameWidth: 80, frameHeight: 130, margin: 10, spacing: 10 });
        this.load.spritesheet('torchSideSprite', 'assets/img/torch-side-spritesheet.png', { frameWidth: 60, frameHeight: 130, margin: 10, spacing: 10 });
        
        // Audio
        this.load.audio("startTheme", "assets/audio/bossTheme.mp3")
    }

    create(): void {
        this.add.image(this.sys.game.canvas.width / 2, 0, "background").setOrigin(0.5, 0); // background image
        this.startText = this.add.bitmapText(this.sys.game.canvas.width / 2, 50, "dungeonFont", "Emoji Dungeon", 60).setOrigin(0.5, 0); // Title with custom font 
        this.startText = this.add.bitmapText(this.sys.game.canvas.width / 2, 550, "dungeonFont", "druk op S om te beginnen", 30).setOrigin(0.5, 0); // Subtitle with custom font
        const ghost = this.add.image(this.sys.game.canvas.width / 2, 150, "ghost").setOrigin(0.5, 0); // the image for the ghost emoji
        ghost.setScale(0.4); // resize ghost emoji

        // Tweens animation for ghost emoji to move up and down
        this.tweens.add({
            targets: ghost,
            y: 250,
            ease: "Sine.easeInOut",
            yoyo: true,
            repeat: -1,
            duration: 2000,
            alpha: 0,
        });

        // Tweens animation for ghost emoji to fade in and out
        this.tweens.add({
            targets: ghost,
            ease: "Linear",
            yoyo: true,
            repeat: -1,
            duration: 5000,
            alpha: 0
        })

        // Animation for torches
        const keys: string[] = ['Front', 'Front'];
        keys.forEach((key, i) => {
            const config = {
                key: 'torch' + key,
                frames: this.anims.generateFrameNumbers('torch' + key + 'Sprite', { start: 0, end: 3 }),
                frameRate: 5,
                repeat: -1
            };

            this.anims.create(config);

            let x = 0;
            let start = 0;
            if (i === 0) {
                x = 200;
            } else {
                x = this.sys.game.canvas.width - 200;
                start = 2;
            }
            const flame = this.add.sprite(x, 300, 'torch' + key + 'Sprite');
            flame.anims.play('torch' + key, true, start);
        });

        // Adds and plays the music
        this.startSceneSound = this.sound.add("startTheme");
        this.startSceneSound.play();
    }

    update(): void {
        // Push S to start playing
        if (this.startKey.isDown) {
            this.scene.start("LevelScene");
            // Stops the music on the next scene
            this.startSceneSound.stop();
        }

        // To make the start text blink
        if (this.game.getTime() > this.lastBlinkTime + 500) {
            this.startText.setVisible(!this.startText.visible);
            this.lastBlinkTime = this.game.getTime();
        }         
    }
}
