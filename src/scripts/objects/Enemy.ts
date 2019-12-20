export default class Enemy extends Phaser.Physics.Arcade.Image {
    private health: number;

    constructor(params: any) {
        super(params.scene, params.x, params.y, params.key, params.frame);
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);

        //@ts-ignore
        this.body.setBoundsRectangle(new Phaser.Geom.Rectangle(80, 20, this.scene.game.canvas.width - 160, this.scene.game.canvas.height - 120));

        this.setCollideWorldBounds(true)
            .setBounce(0.2, 0.2)
            .setDrag(0.9)
            .setDamping(true);

        this.health = 100;
    }

    public static hit(projectile: any, enemy: any) {
        projectile.destroy();
        enemy.health -= 20;
        console.log('hit');
        if (enemy.health <= 0) {
            enemy.destroy();
            console.log('destroy');
        }
    }
}