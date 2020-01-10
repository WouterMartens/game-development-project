import Player from '../objects/Player';
import Projectile from '../objects/ThumbsUp';
import Door from '../objects/Door';
import Enemy from '../objects/Enemy';
import Item from '../objects/Pickup';


export default class LevelScene2 extends Phaser.Scene {
	private player: Player;
	public enemies: Enemy;
	private door: Door;
	public hitDoor: boolean;
	private items: Item;

	public healthBar: Phaser.Physics.Arcade.StaticGroup;

	private levelSceneSound: any;
 
	constructor() {
		super({ key: 'LevelScene2' });
	}

	init(): void {
	}

	preload(): void {
		// Rooms
		this.load.image('room1', 'assets/img/room-1.png'); // the (background) image of the dungeon room
		this.load.image('door', 'assets/img/door.png');	// the image of the door

		// Player
		this.load.image('pedestrian', 'assets/img/pedestrian.png');  // the image of the player 
		this.load.image('heart', 'assets/img/heart.png'); // health bar heart

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

		// Adds an item to the scene
		this.items = new Item({
			scene: this,
			x: 200,
			y: 500,
			key: 'health'
		});

		this.enemies = new Enemy({
			scene: this,
			x: 500,
			y: 200,
			key: 'happy'
		});

		// Health bar
		this.healthBar = this.physics.add.staticGroup({
			key: 'heart',
			frameQuantity: 5,
			'setScale.x': 0.5,
			'setScale.y': 0.5
		});

		Phaser.Actions.PlaceOnLine(this.healthBar.getChildren(), new Phaser.Geom.Line(120, 75, 450, 75));
		this.healthBar.refresh();

		// Adds door to scene
		this.door = new Door({
			scene: this,
			x: this.game.canvas.width / 2 + 8,
			y: this.game.canvas.height / 4 - 110,
			key: 'door'
		})
		
		// Set the state of hitDoor to false on level start
		this.hitDoor = false;

		//Change the hitbox size of the door
		this.door.setSize(10, 3).setOffset(this.door.width/2 - 5 , this.door.height/4 - 8)
		
		// Adds player to scene
		this.player = new Player({
			scene: this,
			x: this.game.canvas.width / 2,
			y: this.game.canvas.height / 8 * 7,
			key: 'pedestrian'
		});

		// this.physics.world.enableBody(this.player, 0);
		this.physics.world.setBounds(80, 142 - this.player.height, this.sys.game.canvas.width - 80, this.sys.game.canvas.height - this.player.height, true, true, true, true);

		this.physics.add.overlap(this.player, this.items, this.player.gainHealth);

		const callback = () => {
			console.log('hit the door');
			this.hitDoor = true;
		}

		this.physics.add.overlap(this.player, this.items, this.player.gainHealth);

		this.physics.add.collider(this.player, this.enemies, this.player.hit);
		this.physics.add.overlap(this.player, this.door, callback);

		this.physics.world.on('worldbounds', this.onWorldBounds);

		// Adds and plays music
		this.levelSceneSound = this.sound.add("mainTheme");
        this.levelSceneSound.play();
	}

	update(): void {
		this.player.update();

		if (this.hitDoor) {
			this.scene.start("BossScene");
		}
	}

	onWorldBounds(body: any) {
		if (body.gameObject instanceof Projectile) {
			body.gameObject.destroy(true);
		}
	}
} 