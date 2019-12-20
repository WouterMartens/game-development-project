import ThumbsUp from './ThumbsUp';
// import Pickup from './Pickup';

export default class Player extends Phaser.Physics.Arcade.Image {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private keyLeft: Phaser.Input.Keyboard.Key;
    private keyRight: Phaser.Input.Keyboard.Key;
    private keyUp: Phaser.Input.Keyboard.Key;
    private keyDown: Phaser.Input.Keyboard.Key;

    private moveVelocity: number;
    private justBounced: boolean;
    private lastShotTime: number;

    private health: number;

    /**
     * Passes the given parameters to the super class and creates the player
     * @param params Phaser.Physics.Arcade.Image config object
     */
    constructor(params: any) {
        // Not sure about params.key since it's an Arcade.Image object now (as opposed to GameObject.Image)
        super(params.scene, params.x, params.y, params.key, params.frame);

        this.initScene();

        this.scene.add.existing(this);

        this.scene.physics.world.enableBody(this, 0);
        this.setCollideWorldBounds(true)
            .setBounce(0.5, 0.5)
            .setDrag(0.95)
            .setDamping(true);

        // Read-only and doesn't have a setter
        //@ts-ignore
        this.body.onWorldBounds = true;

        this.moveVelocity = 200;
        this.justBounced = false;
        this.lastShotTime = -1;

        this.health = 100;
    }

    update(): void {
        this.inputListener();

        const callback = () => {
            this.setJustBounced(true);
            const timedEvent = this.scene.time.delayedCall(200, this.setJustBounced, [false], this);
        }
        this.scene.physics.world.on('worldbounds', callback);
    }

    /**
     * Creates the required input listeners for the game
     */
    private initScene() {
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.keyUp = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyLeft = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyDown = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyRight = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    /**
     * Listens to the required inputs for the game
     */
    private inputListener(): void {
        if (!this.justBounced) {
            if (this.keyLeft.isDown) {
                this.setVelocityX(-this.moveVelocity);
                this.setFlipX(false);
            }

            if (this.keyRight.isDown) {
                this.setVelocityX(this.moveVelocity);
                this.setFlipX(true);
            }

            if (this.keyUp.isDown) {
                this.setVelocityY(-this.moveVelocity);
            }

            if (this.keyDown.isDown) {
                this.setVelocityY(this.moveVelocity);
            }

            const left: boolean | undefined = this.cursors.left?.isDown;
            const right: boolean | undefined = this.cursors.right?.isDown;
            const up: boolean | undefined = this.cursors.up?.isDown;
            const down: boolean | undefined = this.cursors.down?.isDown;
            
            let rotation = 0;
            if (left && up) {
                rotation = 180 + 45;
            } else if (right && up) {
                rotation = -45;
            } else if (right && down) {
                rotation = 45
            } else if (left && down) {
                rotation = 180 - 45;
            } else if (left) {
                rotation = 180;
            } else if (right) {
                rotation = 0;
            } else if (up) {
                rotation = 270;
            } else if (down) {
                rotation = 90;
            }

            if (this.cursors.left?.isDown || this.cursors.right?.isDown || this.cursors.up?.isDown || this.cursors.down?.isDown) {
                this.shoot(rotation);
            }
        }
    }

    /**
     * Shoots a projectile from the player
     * @param rotation Angle the projectile needs to be shot in/to
     */
    private shoot(rotation: number) {
        if (this.scene.game.getTime() > this.lastShotTime + 250) {
            const bullet = new ThumbsUp({
                scene: this.scene,
                x: this.x,
                y: this.y,
                key: 'thumb'
            }, rotation).setScale(0.3).setAngle(rotation);

            // projectiles does not exist on type Scene (it does on LevelScene)
            //@ts-ignore
            this.scene.projectiles.add(bullet);
            //@ts-ignore
            //console.log(this.scene.projectiles);

            this.lastShotTime = this.scene.game.getTime();
        }
    }

    /**
     * Handles the player when hit
     */
    public hit(player: any, enemy: any) {
        player.health -= 20;
        console.log(player.health);
    }

    /**
     * Gains 20 health when picking up an item, then destroys the item
     * @param player Player object colliding with
     * @param item object out of items
     */
    public gainHealth(player: any, item: any) {
        player.health += 20;
        item.destroy();
        console.log(player.health);
    }

    /**
     * Checks if the player just bounced
     * @param value Did the player just bounce from something
     */
    private setJustBounced(value: boolean) {
        this.justBounced = value;
    }
}