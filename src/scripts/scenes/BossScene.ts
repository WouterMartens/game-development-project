import Player from '../objects/Player';
import Projectile from '../objects/ThumbsUp';
import Boss from '../objects/Boss';
import Item from '../objects/Pickup';


export default class BossScene extends Phaser.Scene {
	private player: Player;
	private boss: Boss;
	public enemies: Phaser.GameObjects.Group;
	private items: Phaser.GameObjects.Group;

	public healthBar: Phaser.Physics.Arcade.StaticGroup;

	private levelSceneSound: any;
 
	constructor() {
		super({ key: 'BossScene' });
	}

	public init(): void {
		this.enemies = this.add.group({ classType: Boss, runChildUpdate: true });
		this.items = this.add.group({ classType: Item });
	}

	public preload(): void {
		// Rooms
        this.load.image("background", "assets/img/startBackground.png"); // the background image for the scene

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

		this.load.image('ghost', 'assets/img/snapghost.png'); // boss image

		// NPCs
		this.load.image("businessMan", "assets/img/businessMan.png") // the image of the NPC
		
		// Audio
		this.load.audio("bossTheme", "assets/audio/bossTheme.mp3"); // the song playing in this scene
	}

	public create(): void {
		// Adds background image
		const bossScene = this.add.image(0, 0, 'background').setOrigin(0, 0);

		// Adds player to scene
		this.player = new Player({
			scene: this,
			x: this.game.canvas.width / 2,
			y: this.game.canvas.height / 8 * 7,
			key: 'pedestrian'
		});

		// Health bar
		this.healthBar = this.physics.add.staticGroup({
			key: 'heart',
			frameQuantity: 5,
			'setScale.x': 0.5,
			'setScale.y': 0.5
		});

		// Adds an item to the scene
		this.items.add(new Item({
			scene: this,
			x: 200,
			y: 500,
			key: 'health'
		}));

		Phaser.Actions.PlaceOnLine(this.healthBar.getChildren(), new Phaser.Geom.Line(120, 75, 450, 75));
		this.healthBar.refresh();

		this.boss = new Boss({
			scene: this,
			x: 300,
			y: 300,
			key: 'ghost'
		});
		this.enemies.add(this.boss);

		// this.physics.world.enableBody(this.player, 0);
		this.physics.world.setBounds(80, 142 - this.player.height, this.sys.game.canvas.width - 80, this.sys.game.canvas.height - this.player.height, true, true, true, true);
		// this.physics.add.collider(this.player, this.enemies, this.player.hit);

		this.physics.add.overlap(this.player, this.items, this.player.gainHealth);

		this.physics.add.collider(this.player, this.boss, this.player.hit);
		this.physics.add.collider(this.player.bullets, this.enemies, Boss.hit);

		this.physics.world.on('worldbounds', this.onWorldBounds);

		// Adds and plays music
		this.levelSceneSound = this.sound.add("bossTheme");
        this.levelSceneSound.play();
	}

	public update(): void {
		this.player.update();

		if (this.player.alive === false) {
			this.scene.start("GameOverScene");
			this.levelSceneSound.stop();
		}

		if (this.enemies.children.size === 0) {
			this.scene.start("EndScene");
			this.levelSceneSound.stop();
		}
	}

	public onWorldBounds(body: any): void {
		if (body.gameObject instanceof Projectile) {
			body.gameObject.destroy(true);
		}
	}
} 