import Phaser from 'phaser'
import { GameScene } from './scenes/game';

window.onload = () => {
  const gameConfig = {
    width: window.innerWidth,
    height: window.innerHeight,
    type: Phaser.AUTO,
    scene: GameScene
  };
  var game = new Phaser.Game(gameConfig);
}