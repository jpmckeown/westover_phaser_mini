import Phaser from 'phaser';

const SPRITE_ASSET_KEY = 'SPRITE_ASSET_KEY';

class Game extends Phaser.Scene {
   private left: number = 30;
   private top: number = 90;
   private gap: number = 140;

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
      this.add.image(this.left, this.top, SPRITE_ASSET_KEY, 2).setScale(6).setOrigin(0);

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
         graphics.lineBetween(this.left + i * this.gap, this.top, this.left + i * this.gap, this.top + 3 * this.gap);
         graphics.lineBetween(this.left, this.top + this.gap * i, this.left + 3 * this.gap, this.top + this.gap * i);
      }

      this.#addGamePiece(0, 0);
   }

   #addGamePiece(x: number, y: number): void {
      const pieceSize = 96;
      const xPos = this.left + (pieceSize + pieceSize / 2) * x;
      const yPos = this.top + (pieceSize + pieceSize / 2) * y;
      this.add.image(xPos, yPos, SPRITE_ASSET_KEY, 2).setScale(6).setOrigin(0);
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
