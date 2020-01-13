export default class Enemy extends Phaser.Physics.Arcade.Image {
    protected health: number;
    private states: string[];
    protected isBoss: boolean;
    protected isHit: boolean;

    constructor(params: any) {
        super(params.scene, params.x, params.y, params.key, params.frame);
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);

        //@ts-ignore
        this.body.setBoundsRectangle(new Phaser.Geom.Rectangle(80, 20, this.scene.game.canvas.width - 160, this.scene.game.canvas.height - 120));

        this.setCollideWorldBounds(true)
            .setBounce(0.2, 0.2)
            .setDrag(0.9)
            .setDamping(true)
            .setMass(1);

        this.health = 120;
        this.states = ['happy', 'smile', 'neutral', 'frowning', 'angry', 'pouting'];
        this.isBoss = false;
        this.isHit = false;
    }

    public create(): void {
        
    }

    public update(): void {
        //const fr: number = 100 / this.states.length;
        if (!this.isBoss) {
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
                speed = 75;
            } else if (this.health <= fr * 5) {
                this.setTexture(this.states[1]);
                speed = 50;
            }
        }

        if (this.isHit && this.body.velocity.x < 1 && this.body.velocity.y < 1) {
            this.isHit = false;
        }
        if (!this.isHit) {
            //@ts-ignore
            this.scene.physics.moveToObject(this, this.scene.player, speed);
        }

        // console.log(this.body.velocity, this.isHit);
    }

    public static hit(projectile: any, enemy: any) {
        // console.log('hit', enemy.health, projectile, enemy);
        projectile.destroy();
        enemy.isHit = true;
        enemy.health -= 20;

        if (enemy.health <= 0) {
            enemy.destroy();
            // console.log('destroy');
        }
    }
}