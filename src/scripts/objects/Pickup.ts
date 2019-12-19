export default class Pickup extends Phaser.Physics.Arcade.Image {
    constructor(params: any) {
        super(params.scene, params.x, params.y, params.key, params.frame);
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);
    }
}