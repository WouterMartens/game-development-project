export default class Torch extends Phaser.Physics.Arcade.Image {
    public key: string;
    public startFrame: number;

    constructor(params: any, startFrame: number) {
        super(params.scene, params.x, params.y, params.key, params.frame);
        this.scene.add.existing(this);

        this.key = params.key;
        this.startFrame = startFrame;
    }

    public preload(): void {
        if (this.key === "torchFrontSprite")  {
            this.scene.load.spritesheet('torchFrontSprite', 'assets/img/torch-front-spritesheet.png',
            { frameWidth: 80, frameHeight: 130, margin: 10, spacing: 10 });
        } else if (this.key === "torchSideSprite") {
            this.scene.load.spritesheet('torchSideSprite', 'assets/img/torch-side-spritesheet.png',
            { frameWidth: 60, frameHeight: 130, margin: 10, spacing: 10 });
        }
    }

    public create(): void {
        const config = {
            key: this.key,
            frames: this.scene.anims.generateFrameNumbers(this.key, { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        }
        this.scene.anims.create(config);

        const torchAnimation = this.scene.add.sprite(this.x, this.y, this.key);
        torchAnimation.anims.play(this.key, true, this.startFrame);    
        
    }
}