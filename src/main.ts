import Phaser from 'phaser';

const SPRITE_ASSET_KEY = 'SPRITE_ASSET_KEY';

class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
  }

  preload(): void {
    this.load.spritesheet('SPRITE_ASSET_KEY', 'assets/images/blocks.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  create(): void {
    this.add.image(50, 50, SPRITE_ASSET_KEY, 2);
  }
}

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.CANVAS,
  pixelArt: true,
  scale: {
    parent: 'game-container',
    width: 480,
    height: 640,
   //  autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  backgroundColor: '#d3d3d3',
  scene: [Game],
};

const game = new Phaser.Game(gameConfig);
