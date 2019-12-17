import Player from "../objects/player";

export default class LevelScene extends Phaser.Scene {
	cursors: Phaser.Types.Input.Keyboard.CursorKeys;
	keyLeft: Phaser.Input.Keyboard.Key;
	player: Player;

	constructor() {
		super({ key: 'LevelScene' });
	}

	preload(): void {
		this.load.image('background', 'assets/img/room-1.png');
		this.load.image('pedestrian', 'assets/img/pedestrian.png');
		this.load.image('sprite', 'assets/img/sprite.jpg');
		this.load.image('thumb', 'assets/img/thumbs-up.png');
	}

	create(): void {
		const background = this.add.image(0, 0, 'background').setOrigin(0, 0);

		this.player = new Player({
			scene: this,
			x: this.sys.game.canvas.width / 2,
			y: this.sys.game.canvas.height / 2,
			key: 'pedestrian'
		});

		this.physics.world.enableBody(this.player, 0);
		this.physics.world.setBounds(80, 142 - this.player.height, this.sys.game.canvas.width - 80, this.sys.game.canvas.height - this.player.height, true, true, true, true);

		console.log(this.player);
	}

	update(): void {
		this.player.update();

		this.game.getTime();
	}
} 