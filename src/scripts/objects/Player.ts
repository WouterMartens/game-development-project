export default class Player extends Phaser.Physics.Arcade.Image {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private keyLeft: Phaser.Input.Keyboard.Key;
    private keyRight: Phaser.Input.Keyboard.Key;
    private keyUp: Phaser.Input.Keyboard.Key;
    private keyDown: Phaser.Input.Keyboard.Key;

    private moveVelocity: number;
    
    constructor(params: any) {
        // Not sure about params.key since it's an Arcade.Image object now (as opposed to GameObject.Image)
        super(params.scene, params.x, params.y, params.key, params.frame);

        this.initScene();

        this.scene.add.existing(this);

        this.scene.physics.world.enableBody(this, 0);
        this.setCollideWorldBounds(true)
            .setBounce(2, 2)
            .setDrag(0.95)
            .setDamping(true);

        // Read-only and doesn't have a setter
        //@ts-ignore
        this.body.onWorldBounds = true;
        // Add an event listener for the worldbounds event (that the line above is supposed to emit)


        this.moveVelocity = 200;
    }

    update(): void {
        this.inputListener();

        // console.log(this.x, this.y, this.width, this.height);

        const callback = () => {
            console.log('hi');
        }
        this.scene.physics.world.on('worldbounds', callback);
    }

    private initScene() {
		this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.keyUp = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyLeft = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyDown = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyRight = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

	private inputListener() {
        // if velocity < something && justbouncted
		if (this.keyLeft.isDown || this.cursors.left?.isDown) {
            this.setVelocityX(-this.moveVelocity);
        }

        if (this.keyRight.isDown || this.cursors.right?.isDown) {
            this.setVelocityX(this.moveVelocity);
        }

        if (this.keyUp.isDown || this.cursors.up?.isDown) {
            this.setVelocityY(-this.moveVelocity);
        }

        if (this.keyDown.isDown || this.cursors.down?.isDown) {
            this.setVelocityY(this.moveVelocity);
        }

        // if (this.x - this.width / 2 < 0) {
        //     this.x = this.width / 2;
        // }
	}
}