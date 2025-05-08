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
    this.add.text(240, 50, 'Tic-Tac', {
      fontSize: '42px',
      fontFamily: 'Verdana',
      color: 'purple',
      align: 'center',
    }).setOrigin(0.5);
    this.add.text(240, 600, 'X turn', {
      fontSize: '22px',
      fontFamily: 'Verdana',
      color: 'black',
      align: 'center',
    }).setOrigin(0.5);

    const graphics = this.add.graphics();
    let left = 170;
    let top = 120;
    let gap = 140
    graphics.lineStyle(12, 0x3e3e3e);
    for (let i = 0; i < 3; i++) {
      graphics.lineBetween(left + i*gap, top, left + i*gap, top + 2*gap);      
    }

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
