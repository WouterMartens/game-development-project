import Player from '../objects/Player';
import Npc from '../objects/Npc';
import Item from '../objects/Pickup';
import Projectile from '../objects/ThumbsUp';
import Enemy from '../objects/Enemy';
import Door from '../objects/Door';

export default class LevelScene extends Phaser.Scene {
	public player: Player;
	private npc: any;
	private items: Phaser.GameObjects.Group;
	// public projectiles: Phaser.GameObjects.Group;
	public enemies: Phaser.GameObjects.Group;
	private popupBox: any;
	private nextKey: Phaser.Input.Keyboard.Key;

	private door: Door;
	public hitDoor: boolean;
	private levelSceneSound: any;
	private lastBlinkTime: number;
	private nextText: any;
 
	constructor() {
		super({ key: 'LevelScene' });
	}

	init(): void {
		this.items = this.add.group({ classType: Item });

		// this.enemies = this.add.group({ classType: Enemy });

		this.nextKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.nextKey.isDown = false;
		// this.projectiles = this.add.group({
		// 	classType: Projectile,
		// 	maxSize: 2,
		// 	runChildUpdate: true
		// });
		this.enemies = this.add.group({ classType: Enemy, runChildUpdate: true });

		// Default the blinking text
		this.lastBlinkTime = 0;

	}

	preload(): void {
		// Rooms
		this.load.image('room1', 'assets/img/room-1.png');
		this.load.image('door', 'assets/img/door.png');

		// Player
		this.load.image('pedestrian', 'assets/img/pedestrian.png');  // the image of the player 

		// Projectiles
		this.load.image('thumb', 'assets/img/thumbs-up.png');

		// Ground items
		this.load.image('health', 'assets/img/candy.png');

		// Enemies
		this.load.image('happy', 'assets/img/happy.png');
		this.load.image('smile', 'assets/img/slightlysmilingface.png');
		this.load.image('neutral', 'assets/img/neutral.png');
		this.load.image('frowning', 'assets/img/frowning.png');
		this.load.image('angry', 'assets/img/angry.png');
		this.load.image('pouting', 'assets/img/pouting.png');

		// NPCs
		this.load.image("businessMan", "assets/img/businessMan.png") // the image of the NPC

		// Dialogue images
		this.load.image("businessManTextBox1", "assets/img/businessManTextBox1.png") // the 1st image of the NPC's text box
		this.load.image("businessManTextBox2", "assets/img/businessManTextBox2.png") // the 2nd image of the NPC's text box
		
		// Audio
		this.load.audio("mainTheme", "assets/audio/mainTheme.mp3");

		// Custom font
		this.load.bitmapFont("dungeonFont", "assets/font/TheDungeonFont.png", "assets/font/TheDungeonFont.fnt");

	}

	create(): void {
		// Adds background image
		const room1 = this.add.image(0, 0, 'room1').setOrigin(0, 0);

		// Adds door to scene
		this.door = new Door({
			scene: this,
			x: this.game.canvas.width / 2 + 8,
			y: this.game.canvas.height / 4 - 110,
			key: 'door',
		})
		
		// Set the state of hitDoor to false on level start
		this.hitDoor = false;

		// Change the hitbox size of the door
		this.door.setSize(10, 3).setOffset(this.door.width/2 - 5 , this.door.height/4 - 8)
	
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

		const callback = () => {
			// console.log('hit the door');
			if (this.enemies.children.size === 0) {
				this.hitDoor = true;
			}
		}
		this.physics.add.overlap(this.player, this.items, this.player.gainHealth);
		this.physics.add.overlap(this.player, this.door, callback);

		this.physics.add.collider(this.player, this.enemies, this.player.hit);
		this.physics.add.collider(this.player.bullets, this.enemies, Enemy.hit);

		this.physics.world.on('worldbounds', this.onWorldBounds);

		// Adds and plays music
		this.levelSceneSound = this.sound.add("mainTheme");
		this.levelSceneSound.play();
	}

	update(): void {
		this.player.update();
		
		// Sets collision for player and NPC
		if(this.physics.world.collide(this.player, [this.npc])){
			this.nextText = this.add.bitmapText(this.sys.game.canvas.width / 2, 460, "dungeonFont", "druk op ENTER", 20).setOrigin(0.5, 0);
			this.popupBox = this.physics.add.staticImage(this.sys.game.canvas.width / 2, this.sys.game.canvas.height /2, "businessManTextBox1")
			// console.log(this.popupBox.texture.key);

		};
		if (this.nextKey.isDown) {
			this.nextText.destroy(true);
			this.popupBox = this.physics.add.staticImage(this.sys.game.canvas.width / 2, this.sys.game.canvas.height /2, "businessManTextBox2")
		}

		// if (this.nextKey.isDown && this.popupBox.texture.key === "businessManTextBox2") {
		// 	this.popupBox.setVisible(false);
		// }
		
		
		// Starts the next scene
		if (this.hitDoor && this.enemies.children.size === 0) {
			this.hitDoor = false;
			this.scene.start("LevelScene2");
		}
	}

	onWorldBounds(body: any) {
		if (body.gameObject instanceof Projectile) {
			body.gameObject.destroy(true);
		}
	}
} 