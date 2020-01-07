export default class ThumbsUp extends Phaser.Physics.Arcade.Image {
    key: any;

    constructor(params: any, angle: number) {
        super(params.scene, params.x, params.y, params.key, params.frame);
        this.key = params.key;
        this.scene.add.existing(this);
        // this.scene.physics.world.add(this.body);
        // this.scene.physics.world.enableBody(this, 0);
        // this.setCollideWorldBounds(true);
        //Read-only and doesn't have a setter
        //@ts-ignore
        // this.body.onWorldBounds = true;
        //@ts-ignore
        // this.body.setBoundsRectangle(new Phaser.Geom.Rectangle(80, 20, this.scene.game.canvas.width - 160, this.scene.game.canvas.height - 120));

        // this.scene.physics.velocityFromAngle(angle, 60, this.body.velocity);

        // this.body.velocity.x *= 8;
        // this.body.velocity.y *= 8;
    }

    init(): void {
    }

    create() {
        // const onWorldBounds = function(body: any) { 
        //     console.log(body);
        //     body.destroy();
        // };
        // this.scene.physics.world.on('worldbounds', onWorldBounds);
    }

    update(): void {
        // console.log('joe');
    }
}