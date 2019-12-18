import Player from '../objects/Player';
import Item from '../objects/Pickup';

export default class LevelScene extends Phaser.Scene {
	private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
	private keyLeft: Phaser.Input.Keyboard.Key;
	private player: Player;
	private items: Phaser.GameObjects.Group;

	constructor() {
		super({ key: 'LevelScene' });

		// this.items = this.add.group({ classType: Item });
	}

	preload(): void {
		this.load.image('room1', 'assets/img/room-1.png');
		this.load.image('pedestrian', 'assets/img/pedestrian.png');
		this.load.image('sprite', 'assets/img/sprite.jpg');
		this.load.image('thumb', 'assets/img/thumbs-up.png');
		this.load.image('health', 'assets/img/candy.png');
	}

	create(): void {
		const room1 = this.add.image(0, 0, 'room1').setOrigin(0, 0);

		// this.items.add(new Item({
		// 	scene: this,
		// 	x: 200,
		// 	y: 500,
		// 	key: 'health'
		// }));

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
		// this.items.forEach(item => {
		// 	item.update();
		// });
		this.player.update();


		this.game.getTime();
	}
} 