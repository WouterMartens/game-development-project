export default class StartScene extends Phaser.Scene {
    private startKey: Phaser.Input.Keyboard.Key;
    constructor() {
        super({ key: 'LevelScene' });
    }

    init(): void {
        this.startKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.S
        );
        this.startKey.isDown = false;
    }

    preload(): void {
        this.load.image("ghost", "assets/img/snapghost.png");
        this.load.image("background", "assets/img/please.png"); //the background image for the scene

    }

    create(): void {
        const background = this.add.image(this.sys.game.canvas.width / 2, 0, "background")
        .setOrigin(0.5, 0);

        // Hoe centeren?
        const titleText = this.add.text(this.sys.game.canvas.width / 2, 50, "T.B.D. Dungeon",
        {
        fill: "white",
        font: "100px candara",
        })
        .setOrigin(0.5, 0);

        // Hoe centeren?
        const buttonText = this.add.text(this.sys.game.canvas.width / 2, 600, "Klik op S om te beginnen",
        {
        fill: "white",
        font: "30px candara"
        })
        .setOrigin(0.5, 0);

        // Add ghost image/button
        const ghost = this.add.image(this.sys.game.canvas.width / 2, 200, "ghost")
        .setOrigin(0.5, 0);
        ghost.setScale(0.4);
      }

      update(): void {
          if (this.startKey.isDown) {
              this.scene.start("LevelScene");
          }
      }
}
