import Player from "../objects/player";

export default class LevelScene extends Phaser.Scene {
	cursors: Phaser.Types.Input.Keyboard.CursorKeys;
	keyLeft: Phaser.Input.Keyboard.Key;
	player: Player;

	constructor() {
		super({ key: 'LevelScene' });
	}

	preload(): void {
		this.load.image('sprite', 'assets/img/sprite.jpg');
	}

	create(): void {
		// this.physics.world.setBounds(0, 0, this.sys.game.canvas.width, this.sys.game.canvas.height, true, true, true, true);

		// this.add.image(400, 300, 'sprite');
		this.player = new Player({
			scene: this,
			x: 0,
			y: 0,
			key: 'sprite'
		});

		this.physics.world.enableBody(this.player, 0);

		console.log(this.player);
	}

	update(): void {
		this.player.update();
	}
} 