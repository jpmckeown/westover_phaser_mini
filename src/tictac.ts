type Cell = 'X' | 'O' | '';
enum Player {
   X = 'X',
   O = 'O',
}
type GameWinner = undefined | 'X' | 'O' | 'Draw';
type WinningCells = number[][] | undefined;

export default class TicTac {
   #board: Cell[][] = [];
   #currentPlayerTurn: Player = Player.X;
   #winner: GameWinner = undefined;
   #winningCells: WinningCells = undefined;

   constructor() {
      this.#initializeBoard();
   }

   #initializeBoard(): void {
      this.#currentPlayerTurn = Player.X;
      this.#winner = undefined;
      this.#winningCells = undefined;
      this.#board = [];
      for (let i = 0; i < 3; i++) {
         this.#board.push([]);
         for (let j = 0; j < 3; j++) {
            this.#board[i].push('');
         }
      }
   }

   // Testing - current board state
   getBoard(): Cell[][] {
      return this.#board;
   }
   getCurrentPlayer(): Player {
      return this.#currentPlayerTurn;
   }
   logSimple(): void {
      console.log("Board state:");
      console.log(this.#board[0]);
      console.log(this.#board[1]);
      console.log(this.#board[2]);
      console.log("Current player:", this.#currentPlayerTurn);
   }
}

export function testTicTac() {
   const game = new TicTac();

   // Use the class method that has access to private fields
   game.logSimple();

   // Store the instance for later use
   (window as any).gameInstance = game;

   // Return nothing to avoid showing the object in console
   return undefined;
}

// Make it accessible from window for browser console testing
(window as any).testTicTac = testTicTac;
