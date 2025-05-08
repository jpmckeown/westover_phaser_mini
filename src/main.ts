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
   let left = 30;
   let top = 90;
   let gap = 140
    this.add.image(left, top, SPRITE_ASSET_KEY, 2).setScale(6).setOrigin(0);

    this.add.text(240, 40, 'Tic-Tac', {
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
    graphics.lineStyle(12, 0x3e3e3e);
    for (let i = 1; i < 3; i++) {
      graphics.lineBetween(left+i*gap, top, left + i*gap, top+3*gap);
      graphics.lineBetween(left, top+gap*i, left+3*gap, top+gap*i);         
    }
  }

  #addGamePiece(): void {
    // this.add.image(left, top, SPRITE_ASSET_KEY, 2).setScale(6).setOrigin(0);
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
