export default class Enemy extends Phaser.Physics.Arcade.Image {
    private health: number;
    private states: string[];

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

        this.health = 120;
        this.states = ['happy', 'smile', 'neutral', 'frowning', 'angry', 'pouting'];
    }

    create(): void {
        // if (this.enemies.getFirstAlive.health < 120) {
            //@ts-ignore
            this.scene.physics.moveToObject(this, this.scene.player, 200);
    }

    update(): void {
        //const fr: number = 100 / this.states.length;
        const fr: number = 20;
        let speed: number = 0;

        if (this.health <= fr * 1) {
            this.setTexture(this.states[5]);
            speed = 200;
        } else if (this.health <= fr * 2) {
            this.setTexture(this.states[4]);
            speed = 150;
        } else if (this.health <= fr * 3) {
            this.setTexture(this.states[3]);
            speed = 100;
        } else if (this.health <= fr * 4) {
            this.setTexture(this.states[2]);
            speed = 50;
        } else if (this.health <= fr * 5) {
            this.setTexture(this.states[1]);
            speed = 25;
        }

        if (this.health < 120) {
            //@ts-ignore
            this.scene.physics.moveToObject(this, this.scene.player, speed);
        }
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