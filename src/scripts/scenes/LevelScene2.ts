import Player from '../objects/Player';
import Projectile from '../objects/ThumbsUp';
import Door from '../objects/Door';
import Enemy from '../objects/Enemy';

export default class LevelScene2 extends Phaser.Scene {
	private player: Player;
	public enemies: Phaser.GameObjects.Group;
	private door: Door;
	public hitDoor: boolean;

	private levelSceneSound: any;
 
	constructor() {
		super({ key: 'LevelScene2' });
	}

	init(): void {
		this.enemies = this.add.group({ classType: Enemy, runChildUpdate: true });

	}

	preload(): void {
		// Rooms
		this.load.image('room1', 'assets/img/room-1.png'); // the (background) image of the dungeon room
		this.load.image('door', 'assets/img/door.png');	// the image of the door

		// Player
		this.load.image('pedestrian', 'assets/img/pedestrian.png');  // the image of the player 

		// Projectiles
		this.load.image('thumb', 'assets/img/thumbs-up.png'); // the image of the thumbs up

		// Enemies
		this.load.image('happy', 'assets/img/happy.png'); // the image of the enemy emoji
		this.load.image('smile', 'assets/img/slightlysmilingface.png'); // the image of the enemy emoji
		this.load.image('neutral', 'assets/img/neutral.png'); // the image of the enemy emoji
		this.load.image('frowning', 'assets/img/frowning.png'); // the image of the enemy emoji
		this.load.image('angry', 'assets/img/angry.png'); // the image of the enemy emoji
		this.load.image('pouting', 'assets/img/pouting.png'); // the image of the enemy emoji
		
		// Audio
		this.load.audio("mainTheme", "assets/audio/mainTheme.mp3"); // the song playing in this scene
	}

	create(): void {
		// Adds background image
		const room1 = this.add.image(0, 0, 'room1').setOrigin(0, 0);		

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

		const callback = () => {
			// console.log('hit the door');
			this.hitDoor = true;
		}

		this.physics.add.collider(this.player, this.enemies, this.player.hit);
		this.physics.add.overlap(this.player, this.door, callback);
		this.physics.add.collider(this.player.bullets, this.enemies, Enemy.hit);

		this.physics.world.on('worldbounds', this.onWorldBounds);

		// Adds and plays music
		this.levelSceneSound = this.sound.add("mainTheme");
        this.levelSceneSound.play();
	}

	update(): void {
		this.player.update();

		if (this.hitDoor && this.enemies.children.size === 0) {
			this.hitDoor = false;
			this.scene.start("BossScene");
			this.levelSceneSound.stop();
		}
	}

	onWorldBounds(body: any) {
		if (body.gameObject instanceof Projectile) {
			body.gameObject.destroy(true);
		}
	}
} 