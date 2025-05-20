import Phaser from 'phaser';
import { MainMenu } from './MainMenu';
import { TicTacGame } from './TicTacGame';
import { SimonGame } from './SimonGame';
// Import other games here as you create them
// import { SnakeGame } from './SnakeGame';

import TicTac, { testTicTac } from './tictac';
// Make testTicTac available globally for console access
(window as any).testTicTac = testTicTac;

// The game configuration
const gameConfig: Phaser.Types.Core.GameConfig = {
   type: Phaser.AUTO,
   pixelArt: true,
   scale: {
      parent: 'game-container',
      width: 480,
      height: 640,
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
   },
   backgroundColor: '#d3d3d3',
   scene: [
      MainMenu,
      TicTacGame,
      SimonGame
      // PongGame,
      // SnakeGame,
   ]
};

// Initialize the game
new Phaser.Game(gameConfig);
