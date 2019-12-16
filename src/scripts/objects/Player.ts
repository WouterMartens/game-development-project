export default class Player extends Phaser.GameObjects.Image {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private keyLeft: Phaser.Input.Keyboard.Key;
    private keyRight: Phaser.Input.Keyboard.Key;
    private keyUp: Phaser.Input.Keyboard.Key;
    private keyDown: Phaser.Input.Keyboard.Key;
    
    constructor(params: any) {
        super(params.scene, params.x, params.y, params.key, params.frame);

        this.initScene();
        this.scene.add.existing(this);
    }

    update(): void {
        this.inputListener();
    }

    private initScene() {
		this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.keyUp = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyLeft = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyDown = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyRight = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

	private inputListener() {
		if (this.keyLeft.isDown || this.cursors.left?.isDown) {
            this.x -= 6;
        }

        if (this.keyRight.isDown || this.cursors.right?.isDown) {
            this.x += 6;
        }

        if (this.keyUp.isDown || this.cursors.up?.isDown) {
            this.y -= 6;
        }

        if (this.keyDown.isDown || this.cursors.down?.isDown) {
            this.y += 6;
        }
	}
}