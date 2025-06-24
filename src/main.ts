import Phaser from 'phaser';
import { MainMenu } from './MainMenu';
import { TicTacGame } from './TicTacGame';
import { SimonGame } from './SimonGame';
// Import other games here as you create them
// import { SnakeGame } from './SnakeGame';

import TicTac, { testTicTac } from './tictac';
// Make testTicTac available globally for console access
(window as any).testTicTac = testTicTac;

const SKIP_TO_DEV = true;

// The game configuration
const gameConfig: Phaser.Types.Core.GameConfig = {
   type: Phaser.WEBGL,
   pixelArt: true,
   canvasStyle: 'will-read-frequently: true;',
   scale: {
      parent: 'game-container',
      width: 480,
      height: 640,
      mode: Phaser.Scale.NONE,
      autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
   },
   backgroundColor: '#d3d3d3',
   scene: [
      SimonGame,
      MainMenu,
      TicTacGame,
      // PongGame,
      // SnakeGame,
   ]
};

// Initialize the game
new Phaser.Game(gameConfig);
