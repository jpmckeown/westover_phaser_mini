import Phaser from 'phaser';
import TicTac from './tictac';

const SPRITE_ASSET_KEY = 'SPRITE_ASSET_KEY';

export class TicTacGame extends Phaser.Scene {
   #tictac!: TicTac;
   #playerTurnTextGO!: Phaser.GameObjects.Text;

   private left: number = 30;
   private top: number = 90;
   private gap: number = 140;
   private pieceMagnify: number = 7;

   constructor() {
      super({ key: 'TicTacGame' });
   }

   preload(): void {
      this.load.spritesheet(SPRITE_ASSET_KEY, 'assets/images/blocks.png', {
         frameWidth: 16,
         frameHeight: 16,
      });
   }

   create(): void {
      //const tictac = new TicTac();
      this.#tictac = new TicTac();

      const backButton = this.add.text(20, 20, '< Menu', {
         fontSize: '18px',
         fontFamily: 'Arial',
         color: '#000000',
         backgroundColor: '#cccccc',
         padding: { x: 10, y: 5 }
      })
         .setInteractive({ useHandCursor: true })
         .on('pointerdown', () => this.returnToMenu());

      // Game title
      this.add.text(240, 40, 'Tic-Tac', {
         fontSize: '42px',
         fontFamily: 'Verdana',
         color: 'purple',
         align: 'center',
      }).setOrigin(0.5);

      // Turn indicator text
      this.#playerTurnTextGO = this.add.text(240, 600, 'X turn', {
         fontSize: '22px',
         fontFamily: 'Verdana',
         color: 'black',
         align: 'center',
      }).setOrigin(0.5);

      // Draw the grid
      const graphics = this.add.graphics();
      graphics.lineStyle(12, 0x3e3e3e);
      for (let i = 1; i < 3; i++) {
         graphics.lineBetween(this.left + i * this.gap, this.top, this.left + i * this.gap, this.top + 3 * this.gap);
         graphics.lineBetween(this.left, this.top + this.gap * i, this.left + 3 * this.gap, this.top + this.gap * i);
      }

      // add game pieces
      this.#addGamePiece(0, 0);
      this.#addGamePiece(0, 1);
      this.#addGamePiece(0, 2);
      this.#addGamePiece(1, 0);
      this.#addGamePiece(1, 1);
      this.#addGamePiece(1, 2);
      this.#addGamePiece(2, 0);
      this.#addGamePiece(2, 1);
      this.#addGamePiece(2, 2);
   }

   #addGamePiece(x: number, y: number): void {
      const xPos = this.left + 15 + this.gap * y;
      const yPos = this.top + 15 + this.gap * x;
      const piece = this.add.image(xPos, yPos, SPRITE_ASSET_KEY, 2)
         .setScale(this.pieceMagnify)
         .setOrigin(0)
         .setInteractive();

      piece.once(Phaser.Input.Events.POINTER_DOWN as string, () => {
         console.log(x, y);
         if (this.#tictac.isGameOver) {
            return;
         }
         const currentPlayer = this.#tictac.currentPlayerTurn;
         this.#tictac.makeMove(x, y);

         if (currentPlayer === 'X') {
            piece.setFrame(0);
         } else {
            piece.setFrame(1);
         }

         if (this.#tictac.isGameOver && this.#tictac.winner !== 'Draw') {
            this.#playerTurnTextGO.setText(`${currentPlayer} wins!`);
            return;
         }
         if (this.#tictac.isGameOver) {
            this.#playerTurnTextGO.setText(this.#tictac.winner as string);
            return;
         }
         this.#playerTurnTextGO.setText(`${this.#tictac.currentPlayerTurn} turn`);
      });
   }

   private returnToMenu(): void {
      this.scene.start('MainMenu');
   }
}
