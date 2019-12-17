export default class StartScene extends Phaser.Scene {
    private startKey: Phaser.Input.Keyboard.Key;
    constructor() {
        super({ key: 'StartScene' });
    }

    init(): void {

        // Initializer for keyboard input (S key)
        this.startKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.S
        );
        this.startKey.isDown = false;
    }
 
    preload(): void {

        // Loads image for ghost
        this.load.image("ghost", "assets/img/snapghost.png");

        // Loads image for title text
        this.load.image("title", "assets/img/title.png");

        // Loads image for background
        this.load.image("background", "assets/img/please.png"); //the background image for the scene

        // Loads custom bitmap font
        this.load.bitmapFont("dungeonFont", "assets/font/TheDungeonFont.png", "assets/font/TheDungeonFont.fnt");
        
    }

    create(): void {
        // Brick wall background
        const background = this.add.image(this.sys.game.canvas.width / 2, 0, "background")
        .setOrigin(0.5, 0);

        // Title image
        const title = this.add.image(this.sys.game.canvas.width / 2, 50, "title")
        .setOrigin(0.5, 0);

        // Subtitle
        const buttonText = this.add.bitmapText(this.sys.game.canvas.width / 2, 600, "dungeonFont", "druk op S om te beginnen", 30)
        .setOrigin(0.5, 0);

        // Add ghost image
        const ghost = this.add.image(this.sys.game.canvas.width / 2, 200, "ghost")
        .setOrigin(0.5, 0);
        ghost.setScale(0.4);
      }

      update(): void {
          // Push S to start playing
          if (this.startKey.isDown) {
              this.scene.start("LevelScene");
          }
      }
}
