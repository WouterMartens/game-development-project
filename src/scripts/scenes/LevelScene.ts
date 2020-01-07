import Player from '../objects/Player';
import Item from '../objects/Pickup';
import Projectile from '../objects/ThumbsUp';
import Enemy from '../objects/Enemy';
import Door from '../objects/Door';

export default class LevelScene extends Phaser.Scene {
	private player: Player;

	private items: Phaser.GameObjects.Group;
	public projectiles: Phaser.GameObjects.Group;
	public enemies: Phaser.GameObjects.Group;

	private door: Door;

	constructor() {
		super({ key: 'LevelScene' });
	}

	init(): void {
		this.items = this.add.group({ classType: Item });
		this.projectiles = this.add.group({
			classType: Projectile,
			maxSize: 2,
			runChildUpdate: true
		});
		this.enemies = this.add.group({ classType: Enemy });
	}

	preload(): void {
		this.load.image('room1', 'assets/img/room-1.png');
		this.load.image('pedestrian', 'assets/img/pedestrian.png');
		this.load.image('sprite', 'assets/img/sprite.jpg');
		this.load.image('thumb', 'assets/img/thumbs-up.png');
		this.load.image('health', 'assets/img/candy.png');
		this.load.image('happy', 'assets/img/happy.png');
		this.load.image('door', 'assets/img/door.png');
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

		this.door = new Door({
			scene: this,
			x: this.game.canvas.width / 2 + 8,
			y: this.game.canvas.height / 4 - 110,
			key: 'door',
		})
		//Change the hitbox size of the door
		this.door.setSize(10, 3).setOffset(this.door.width/2 - 5 , this.door.height/4 - 8)
	

		this.player = new Player({
			scene: this,
			x: this.game.canvas.width / 2,
			y: this.game.canvas.height / 2,
			key: 'pedestrian'
		});

		// this.physics.world.enableBody(this.player, 0);
		this.physics.world.setBounds(80, 142 - this.player.height, this.sys.game.canvas.width - 80, this.sys.game.canvas.height - this.player.height, true, true, true, true);

		const callback = function(){
			console.log('hit the door');
		}
		this.physics.add.overlap(this.player, this.items, this.player.gainHealth);

		this.physics.add.overlap(this.player, this.door, callback);

		this.physics.add.collider(this.player, this.enemies, this.player.hit);
		this.physics.add.collider(this.projectiles, this.enemies, Enemy.hit);

		this.physics.world.on('worldbounds', this.onWorldBounds);
	}

	update(): void {
		this.player.update();
	}

	onWorldBounds(body: any) {
		if (body.gameObject instanceof Projectile) {
			body.destroy(true);
		}
	}
} 