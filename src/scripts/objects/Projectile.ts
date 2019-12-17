export default class Projectile extends Phaser.Physics.Arcade.Image {
    constructor(params: any, angle: number) {
        super(params.scene, params.x, params.y, params.key, params.frame);

        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);
        this.setCollideWorldBounds(false);

        this.scene.physics.velocityFromAngle(angle, 60, this.body.velocity);

        this.body.velocity.x *= 8;
        this.body.velocity.y *= 8;
    }
}