import 'phaser';

import { TankTest } from './scenes/tank-test';

const gameConfig = {
    type: Phaser.AUTO,
    width: 1280,
    height: 600,
    backgroundColor: '#f3cca3',
    physics: {
        default: 'arcade',
        arcade: {
            // gravity: { y: 300 },
            debug: false
        }
    },
    scene: TankTest
};

new Phaser.Game(gameConfig);
