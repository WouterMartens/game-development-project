export default class StartScene extends Phaser.Scene {
    private startKey: Phaser.Input.Keyboard.Key;
    private timer: number;
    private startText: Phaser.GameObjects.BitmapText;
    private lastBlinkTime: number;

    constructor() {
        super({ key: 'StartScene' });
    }

    init(): void {
        // Initializer for keyboard input (S key)
        this.startKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.S
        );
        this.startKey.isDown = false;

        this.timer = 0;

        this.lastBlinkTime = 0;
    }

    preload(): void {
        // Loads image for ghost
        this.load.image("ghost", "assets/img/snapghost.png");

        // Loads image for title text
        this.load.image("title", "assets/img/title.png");

        // Loads image for background
        this.load.image("background", "assets/img/please.png"); //the background image for the scene

        // Loads custom bitmap font
        this.load.bitmapFont("dungeonFont", "assets/font/TheDungeonFont.png", "assets/font/TheDungeonFont.fnt");

        // Loads the torches spritesheets
        this.load.spritesheet('torchFrontSprite', 'assets/img/torch-front-spritesheet.png', { frameWidth: 80, frameHeight: 130, margin: 10, spacing: 10 });
        this.load.spritesheet('torchSideSprite', 'assets/img/torch-side-spritesheet.png', { frameWidth: 60, frameHeight: 130, margin: 10, spacing: 10 });
    }

    create(): void {
        // Brick wall background
        const background = this.add.image(this.sys.game.canvas.width / 2, 0, "background")
            .setOrigin(0.5, 0);

        // Title image
        const title = this.add.image(this.sys.game.canvas.width / 2, 50, "title")
            .setOrigin(0.5, 0);
    
        // Subtitle
        this.startText = this.add.bitmapText(this.sys.game.canvas.width / 2, 600, "dungeonFont", "druk op S om te beginnen", 30)
            .setOrigin(0.5, 0);

        // Add ghost image
        const ghost = this.add.image(this.sys.game.canvas.width / 2, 200, "ghost")
            .setOrigin(0.5, 0);
        ghost.setScale(0.4);

        // Torches
        //const keys: string[] = ['Front', 'Side'];
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
                x = 400;
            } else {
                x = this.sys.game.canvas.width - 400;
                start = 2;
            }
            const boom = this.add.sprite(x, 300, 'torch' + key + 'Sprite');
            boom.anims.play('torch' + key, true, start);
        });


        
    }

    update(): void {
        // Push S to start playing
        if (this.startKey.isDown) {
            this.scene.start("LevelScene");
        }

        // To make the start text blink
        if (this.game.getTime() > this.lastBlinkTime + 500) {
            this.startText.setVisible(!this.startText.visible);
            this.lastBlinkTime = this.game.getTime();
        }         
             
        
    }
    }
