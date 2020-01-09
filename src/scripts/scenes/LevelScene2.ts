import Player from '../objects/Player';
import Npc from '../objects/Npc';
import Item from '../objects/Pickup';
import Projectile from '../objects/ThumbsUp';
import Enemy from '../objects/Enemy';

export default class LevelScene2 extends Phaser.Scene {
	private player: Player;
	private npc: any;
	private items: Phaser.GameObjects.Group;
	// public projectiles: Phaser.GameObjects.Group;
	public enemies: Phaser.GameObjects.Group;

	private levelSceneSound: any;
 
	constructor() {
		super({ key: 'LevelScene2' });
	}

	init(): void {
		this.items = this.add.group({ classType: Item });
		// this.projectiles = this.add.group({
		// 	classType: Projectile,
		// 	maxSize: 2,
		// 	runChildUpdate: true
		// });
		this.enemies = this.add.group({ classType: Enemy });
	}

	preload(): void {
		// Rooms
		this.load.image('room1', 'assets/img/room-1.png'); // the (background) image of the dungeon room
		this.load.image('door', 'assets/img/door.png');	// the image of the door

		// Player
		this.load.image('pedestrian', 'assets/img/pedestrian.png');  // the image of the player 

		// Projectiles
		this.load.image('thumb', 'assets/img/thumbs-up.png'); // the image of the thumbs up

		// Ground items
		this.load.image('health', 'assets/img/candy.png');	// the image of the candy pickup

		// Enemies
		this.load.image('happy', 'assets/img/happy.png'); // the image of the enemy emoji
		this.load.image('smile', 'assets/img/slightlysmilingface.png'); // the image of the enemy emoji
		this.load.image('neutral', 'assets/img/neutral.png'); // the image of the enemy emoji
		this.load.image('frowning', 'assets/img/frowning.png'); // the image of the enemy emoji
		this.load.image('angry', 'assets/img/angry.png'); // the image of the enemy emoji
		this.load.image('pouting', 'assets/img/pouting.png'); // the image of the enemy emoji

		// NPCs
		this.load.image("businessMan", "assets/img/businessMan.png") // the image of the NPC
		
		// Audio
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

		this.physics.add.overlap(this.player, this.items, this.player.gainHealth);

		const callback = function(){
			console.log('hit the door');
		}
		this.physics.add.overlap(this.player, this.items, this.player.gainHealth);

		this.physics.add.collider(this.player, this.enemies, this.player.hit);
		// this.physics.add.collider(this.projectiles, this.enemies, Enemy.hit);
		this.physics.add.collider(this.player.bullets, this.enemies, Enemy.hit);

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
			body.gameObject.destroy(true);
		}
	}
} 