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
   #isGameOver: boolean = false;

   constructor() {
      this.#initializeBoard();
      console.log(this.#board);
   }

   public makeMove(x: number, y: number): void {
      if (this.#board[x][y] !== '') {
         return;
      }

      if (this.#currentPlayerTurn === Player.X) {
         this.#board[x][y] = 'X';
      } else {
         this.#board[x][y] = 'O';
      }

      if (this.#currentPlayerTurn === Player.X) {
         this.#currentPlayerTurn = Player.O;
      } else {
         this.#currentPlayerTurn = Player.X;
      }

      this.#checkForGameOver();
   }

   #checkForGameOver(): void {
      // rows check
      if (this.#board[0][0] !== '' && this.#board[0][0] === this.#board[0][1] &&
         this.#board[0][0] === this.#board[0][2]) {
         this.#winner = this.#board[0][0];
      } else if (this.#board[1][0] != '' && this.#board[1][0] === this.#board[1][1] &&
         this.#board[1][0] === this.#board[1][2]) {
         this.#winner = this.#board[1][0];
      } else if (this.#board[2][0] != '' && this.#board[2][0] === this.#board[2][1] &&
         this.#board[2][0] === this.#board[2][2]) {
         this.#winner = this.#board[2][0];
      }
      // columns check
      if (this.#board[0][0] !== '' && this.#board[0][0] === this.#board[1][0] &&
         this.#board[0][0] === this.#board[2][0]) {
         this.#winner = this.#board[0][0];
      } else if (this.#board[0][1] != '' && this.#board[0][1] === this.#board[1][1] &&
         this.#board[0][1] === this.#board[1][2]) {
         this.#winner = this.#board[0][1];
      } else if (this.#board[0][2] != '' && this.#board[0][2] === this.#board[1][2] &&
         this.#board[0][2] === this.#board[2][2]) {
         this.#winner = this.#board[0][2];
      }
      // diagonals check
      if (this.#board[0][0] !== '' && this.#board[0][0] === this.#board[1][1] &&
         this.#board[0][0] === this.#board[2][2]) {
         this.#winner = this.#board[0][0];
      } else if (this.#board[0][2] != '' && this.#board[0][2] === this.#board[1][1] &&
         this.#board[0][2] === this.#board[2][0]) {
         this.#winner = this.#board[0][2];
      }

      if (this.#winner !== undefined) {
         this.#isGameOver = true;
         return;
      }

      const isBoardFull = this.#board.every(row => row.every(cell => cell !== ''));
      if (isBoardFull) {
         this.#winner = 'Draw';
         this.#isGameOver = true;
         return;
      }
   }

   #initializeBoard(): void {
      this.#currentPlayerTurn = Player.X;
      this.#winner = undefined;
      this.#winningCells = undefined;
      this.#board = [];
      this.#isGameOver = false;

      //console.log(this.#board);
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
   };
};

export function testTicTac() {
   const game = new TicTac();

   // Use the class method that has access to private fields
   // game.logSimple();

   // Store instance for later use
   (window as any).gameInstance = game;

   // Return nothing to avoid showing the object in console
   return undefined;
}

// Make it accessible from window for browser console testing
(window as any).testTicTac = testTicTac;
