// import Phaser from 'phaser'
// import { GameState } from './state/game';

// window.onload = () => {
//   const gameConfig = {
//     width: window.innerWidth,
//     height: window.innerHeight,
//     type: Phaser.AUTO,
//     scene: GameState
//   };
//   var game = new Phaser.Game(gameConfig);
// }

//this is 1 at the end of createOnConnection

import Phaser from 'phaser';


import config from './config';
import GameState from './state/game';

class Game extends Phaser.Game{
	constructor(){
		super(config.width,config.height,Phaser.AUTO);
		this.state.add('GameState', GameState);
		this.state.start('GameState');
	}
}

const newgame = new Game();