export default class Npc extends Phaser.Physics.Arcade.Image {
    constructor(params: any) {
        super(params.scene, params.x, params.y, params.key, params.frame);
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);

        this.setCollideWorldBounds(true);

        //@ts-ignore
        this.body.setBoundsRectangle(new Phaser.Geom.Rectangle(80, 20, this.scene.game.canvas.width - 160, this.scene.game.canvas.height - 120));

    }
}