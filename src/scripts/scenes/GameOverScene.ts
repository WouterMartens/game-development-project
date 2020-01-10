export default class StartScene extends Phaser.Scene {
    private startOverKey: Phaser.Input.Keyboard.Key;
    private gameOverText: Phaser.GameObjects.BitmapText;
    private gameOverSceneSound: any;
    private lastBlinkTime: number;
    
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(): void {
        // Initializer for keyboard input (S key)
        this.startOverKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.S);
        this.startOverKey.isDown = false;

        // Default the blinking text
        this.lastBlinkTime = 0;
    }

    preload(): void {
        // Background
        this.load.image("background", "assets/img/startBackground.png");

        // Ghost
        this.load.image("ghost", "assets/img/snapghost.png");

        // Custom font
        this.load.bitmapFont("dungeonFont", "assets/font/TheDungeonFont.png", "assets/font/TheDungeonFont.fnt");

        // Audio
        this.load.audio("gameOverTheme", "assets/audio/bossTheme.mp3")

        // this.load.spritesheet('snapghostEvil1', 'assets/img/snapghostEvil1.png', { frameWidth: 80, frameHeight: 130, margin: 10, spacing: 10 });
        // this.load.spritesheet('snapghostEvil2', 'assets/img/snapghostEvil2.png', { frameWidth: 60, frameHeight: 130, margin: 10, spacing: 10 });
        // this.load.spritesheet('snapghostEvil3', 'assets/img/snapghostEvil3.png', { frameWidth: 80, frameHeight: 130, margin: 10, spacing: 10 });
        // this.load.spritesheet('snapghostEvil4', 'assets/img/snapghostEvil4.png', { frameWidth: 80, frameHeight: 130, margin: 10, spacing: 10 });
    }

    create(): void {
        this.add.image(this.sys.game.canvas.width / 2, 0, "background").setOrigin(0.5, 0); // background image
        this.gameOverText = this.add.bitmapText(this.sys.game.canvas.width / 2, 280, "dungeonFont", "GAME", 80).setOrigin(0.5, 0); 
        this.gameOverText = this.add.bitmapText(this.sys.game.canvas.width / 2, 370, "dungeonFont", "OVER", 80).setOrigin(0.5, 0); 
        this.gameOverText = this.add.bitmapText(this.sys.game.canvas.width / 2, 500, "dungeonFont", "druk op S om opnieuw te beginnen", 20).setOrigin(0.5, 0); // Subtitle with custom font

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
        this.gameOverSceneSound = this.sound.add("gameOverTheme");
        this.gameOverSceneSound.play();

        // const keys: string[] = ['1', '2', '3', '4'];
        // keys.forEach((key, i) => {
        //     const config = {
        //         key: 'snapghostEvil' + key,
        //         frames: this.anims.generateFrameNumbers('snapghostEvil' + key, { start: 0, end: 4 }),
        //         frameRate: 5,
        //         repeat: -1
        //     };

        //     this.anims.create(config);

        //     let start = 0;
        //     const evilGhost = this.add.sprite(300, 300, 'snapghostEvil' + key);
        //     evilGhost.anims.play('snapghostEvil' + key, true, start);
        // });

    }

    update(): void {
        // Push S to start playing again
        if (this.startOverKey.isDown) {
            this.scene.start("StartScene");
            // Stops the music on the next scene
            this.gameOverSceneSound.stop();
        }

        // To make the start text blink
        if (this.game.getTime() > this.lastBlinkTime + 700) {
            this.gameOverText.setVisible(!this.gameOverText.visible);
            this.lastBlinkTime = this.game.getTime();
        }         
    }
}
