import Player from '../objects/Player';
import Item from '../objects/Pickup';
import Projectile from '../objects/ThumbsUp';
import Enemy from '../objects/Enemy';

export default class LevelScene extends Phaser.Scene {
	private player: Player;

	private items: Phaser.GameObjects.Group;
	public projectiles: Phaser.GameObjects.Group;
	public enemies: Phaser.GameObjects.Group;

	constructor() {
		super({ key: 'LevelScene' });
	}

	init(): void {
		this.items = this.add.group({ classType: Item });
		this.projectiles = this.add.group( { classType: Projectile });
		this.enemies = this.add.group({ classType: Enemy });
	}

	preload(): void {
		this.load.image('room1', 'assets/img/room-1.png');
		this.load.image('pedestrian', 'assets/img/pedestrian.png');
		this.load.image('sprite', 'assets/img/sprite.jpg');
		this.load.image('thumb', 'assets/img/thumbs-up.png');
		this.load.image('health', 'assets/img/candy.png');
		this.load.image('happy', 'assets/img/happy.png');
	}

	create(): void {
		const room1 = this.add.image(0, 0, 'room1').setOrigin(0, 0);

		this.items.add(new Item({
			scene: this,
			x: 200,
			y: 500,
			key: 'health'
		}));

		this.enemies.add(new Enemy({
			scene: this,
			x: 500,
			y: 200,
			key: 'happy'
		}));

		this.player = new Player({
			scene: this,
			x: this.sys.game.canvas.width / 2,
			y: this.sys.game.canvas.height / 2,
			key: 'pedestrian'
		});

		// this.physics.world.enableBody(this.player, 0);
		this.physics.world.setBounds(80, 142 - this.player.height, this.sys.game.canvas.width - 80, this.sys.game.canvas.height - this.player.height, true, true, true, true);

		this.physics.add.overlap(this.player, this.items, this.player.gainHealth);
		this.physics.add.collider(this.player, this.enemies, this.player.hit);
		this.physics.add.collider(this.projectiles, this.enemies, Enemy.hit);
	}

	update(): void {
		this.player.update();
		this.projectiles.children.each(child => {
			child.update();
		});
	}
} 