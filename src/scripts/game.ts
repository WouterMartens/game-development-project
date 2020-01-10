import 'phaser';
import PreloadScene from './scenes/preloadScene';
import StartScene from './scenes/StartScene';
import LevelScene from './scenes/LevelScene';
import LevelScene2 from './scenes/LevelScene2';
import EndScene from './scenes/EndScene';
import BossScene from './scenes/BossScene';
import GameOverScene from './scenes/GameOverScene';


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
	scene: [StartScene, LevelScene, LevelScene2, BossScene, GameOverScene],
	// scene: [GameOverScene, StartScene],
	physics: {
		default: 'arcade',
		arcade: {
			debug: false,
			// gravity: { y: 400 }
		}
	}
};

window.addEventListener('load', () => {
	let game = new Phaser.Game(config);
});