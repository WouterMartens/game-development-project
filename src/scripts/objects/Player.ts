import Projectile from '../objects/projectile'

export default class Player extends Phaser.Physics.Arcade.Image {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private keyLeft: Phaser.Input.Keyboard.Key;
    private keyRight: Phaser.Input.Keyboard.Key;
    private keyUp: Phaser.Input.Keyboard.Key;
    private keyDown: Phaser.Input.Keyboard.Key;

    private moveVelocity: number;
    private justBounced: boolean;
    private lastShotTime: number;

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
    }

    update(): void {
        this.inputListener();

        const callback = () => {
            // console.log('hi');
            this.setJustBounced(true);
            const timedEvent = this.scene.time.delayedCall(200, this.setJustBounced, [false], this);
        }
        this.scene.physics.world.on('worldbounds', callback);
        // console.log(this.justBounced); 
    }

    private initScene() {
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.keyUp = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyLeft = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyDown = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyRight = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

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

    private shoot(rotation: number) {
        if (this.scene.game.getTime() > this.lastShotTime + 250) {
            const bullet = new Projectile({
                scene: this.scene,
                x: this.x,
                y: this.y,
                key: 'thumb'
            }, rotation).setScale(0.3).setAngle(rotation);

            this.lastShotTime = this.scene.game.getTime();

            // projectiles = this.physics.add.group({ // this.scene.physics?
            //     classType: Projectile,
            //     maxSize: 30,
            //     runChildUpdate: true
            // });
        }
    }

    private setJustBounced(value: boolean) {
        this.justBounced = value;
    }

    private getJustBounced(): boolean {
        return this.justBounced;
    }
}