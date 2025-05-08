import Phaser from 'phaser';
import { MainMenu } from './MainMenu';
import { TicTacGame } from './TicTacGame';
// Import other games here as you create them
// import { PongGame } from './PongGame';
// import { SnakeGame } from './SnakeGame';

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
      // Add other game scenes here
      // PongGame,
      // SnakeGame,
   ]
};

// Initialize the game
new Phaser.Game(gameConfig);
