import 'phaser';
import DemoScene from './scenes/mainScene';
import PreloadScene from './scenes/preloadScene';
import StartScene from './scenes/StartScene';
import LevelScene from './scenes/LevelScene';
import EndScene from './scenes/EndScene';

const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;

// @ts-ignore https://github.com/photonstorm/phaser/issues/4522
// still not working in 3.18.1 :/
const config: GameConfig = {
	backgroundColor: '#ffffff',
	scale: {
		parent: 'game',
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: DEFAULT_WIDTH,
		height: DEFAULT_HEIGHT
	},
	//scene: [PreloadScene, DemoScene, StartScene, LevelScene, EndScene],
	//scene: [StartScene, LevelScene],
	scene: [LevelScene],
	physics: {
		default: 'arcade',
		arcade: {
			debug: true,
			// gravity: { y: 400 }
		}
	}
};

window.addEventListener('load', () => {
	let game = new Phaser.Game(config);
});