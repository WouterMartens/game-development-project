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
		// this.physics.start

		// this.add.image(400, 300, 'sprite');
		this.player = new Player({
			scene: this,
			x: 0,
			y: 0,
			key: 'sprite'
		});

		// this.player.body.collideWorldBounds = true;
	}

	update(): void {
		this.player.update();
	}
} 