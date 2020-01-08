import Player from '../objects/Player';
import Npc from '../objects/Npc';
import Item from '../objects/Pickup';
import Projectile from '../objects/ThumbsUp';
import Enemy from '../objects/Enemy';
import Door from '../objects/Door';

export default class LevelScene extends Phaser.Scene {
	private player: Player;
	private npc: any;
	private items: Phaser.GameObjects.Group;
	private door: Door;
	private levelSceneSound: any; 

	public projectiles: Phaser.GameObjects.Group;
	public enemies: Phaser.GameObjects.Group;

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
		this.load.image('room1', 'assets/img/room-1.png'); // the (background) image of the dungeon room
		this.load.image('pedestrian', 'assets/img/pedestrian.png');  // the image of the player 
		this.load.image('thumb', 'assets/img/thumbs-up.png'); // the image of the thumbs up
		this.load.image('health', 'assets/img/candy.png');	// the image of the candy pickup
		this.load.image('happy', 'assets/img/happy.png'); // the image of the enemy emoji
		this.load.image('door', 'assets/img/door.png');	// the image of the door
		this.load.image("businessMan", "assets/img/businessMan.png") // the image of the NPC
		this.load.audio("mainTheme", "assets/audio/mainTheme.mp3"); // the song playing in this scene
	}

	create(): void {
		// Adds background image
		const room1 = this.add.image(0, 0, 'room1').setOrigin(0, 0);

		// Adds item to scene
		this.items.add(new Item({
			scene: this,
			x: 200,
			y: 500,
			key: 'health'
		}));

		// Adds enemy to scene
		this.enemies.add(new Enemy({
			scene: this,
			x: 500,
			y: 200,
			key: 'happy'
		}));

		// Adds door to scene
		this.door = new Door({
			scene: this,
			x: this.game.canvas.width / 2 + 8,
			y: this.game.canvas.height / 4 - 110,
			key: 'door',
		})
		//Change the hitbox size of the door
		this.door.setSize(10, 3).setOffset(this.door.width/2 - 5 , this.door.height/4 - 8)
	
		// Adds player to scene
		this.player = new Player({
			scene: this,
			x: this.game.canvas.width / 2,
			y: this.game.canvas.height / 2,
			key: 'pedestrian'
		});

		// Adds NPC to scene as statis body
		this.npc = this.physics.add.staticImage(1125, 525, "businessMan");
		this.npc.setScale(0.9); // resize NPC image

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

		// Adds and plays music
		this.levelSceneSound = this.sound.add("mainTheme");
        this.levelSceneSound.play();
	}

	update(): void {
		this.player.update();
		
		// Sets collision for player and NPC
		this.physics.world.collide(this.player, [this.npc]);
	}

	onWorldBounds(body: any) {
		if (body.gameObject instanceof Projectile) {
			body.destroy(true);
		}
	}
} 