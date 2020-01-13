export default class ThumbsUp extends Phaser.Physics.Arcade.Image {
    constructor(scene: Phaser.Scene, x: number, y: number, angle: number) {
        super(scene, x, y, 'thumb');
        
        this.scene.add.existing(this);
        // this.scene.physics.add.image(x, y, 'thumb');
        // Phaser.GameObjects.Image.call(this, scene, 0, 0, 'thumb');

        this.scene.physics.world.enableBody(this, 0);
        this.setCollideWorldBounds(true);

        // Read-only and doesn't have a setter
        //@ts-ignore
        this.body.onWorldBounds = true;
        //@ts-ignore
        this.body.setBoundsRectangle(new Phaser.Geom.Rectangle(80, 20, this.scene.game.canvas.width - 160, this.scene.game.canvas.height - 120));

        this.scene.physics.velocityFromAngle(angle, 60, this.body.velocity);
        this.body.velocity.x *= 8;
        this.body.velocity.y *= 8;

        // this.body.checkCollision(true);
        // this.body.onCollide = true;

        this.flip(angle);
    }

    public flip(rotation: number): void {
        switch(rotation) {
            case 135:
            case 180:
                this.setFlipY(true);
                break;
            case 225:
                this.setFlip(false, true);
                break;
        }
    }

    // fire (x: number, y:  number) {
    //     this.body.reset(x, y);

    //     this.setActive(true);
    //     this.setVisible(true);

    //     this.setVelocityX(300);
    // }

    // update (time: any, delta: any) {
    //     if (this.x > 1200) {
    //         this.setActive(false);
    //         this.setVisible(false);
    //     }
    // }
}