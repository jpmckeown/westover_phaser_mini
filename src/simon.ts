function getRandomIntInclusive(min: number, max: number): number {
   return Math.floor(Math.random() * (max - min + 1) + min);
}

enum SimonError {
   INVALID_GAME_OVER = "Game already over, please reset game state"
}

export default class Simon {
   #currentSequence: number[] = [];
   #playerMoves: number[] = [];
   #isGameOver: boolean = false;

   constructor() {
      this.#initializeGame();
   }

   get sequence(): number[] {
      return [...this.#currentSequence];
   }

   get isGameOver(): boolean {
      return this.#isGameOver;
   }

   get isPlayerSequenceComplete(): boolean {
      return this.#playerMoves.length === this.#currentSequence.length;
   }

   public resetGame(): void {
      this.#initializeGame();
   }

   public generateNextSequenceElement() {
      if (this.#isGameOver) {
         throw new Error(SimonError.INVALID_GAME_OVER);
      }
      this.#currentSequence.push(getRandomIntInclusive(0, 3));
      this.#playerMoves = [];
      console.log(this.#currentSequence);
   }

   public checkPlayerMove(x: number) {
      let lastMoveValue: number;
      let elementAtSameIndex: number;
      let lastMoveIndex: number;

      if (this.#isGameOver) {
         throw new Error(SimonError.INVALID_GAME_OVER);
      }
      this.#playerMoves.push(x);
      let movesCount = this.#playerMoves.length;

      if (movesCount === this.#currentSequence.length) return;
      // why not here setting #isGameOver = true  ?

      lastMoveIndex = movesCount - 1;
      lastMoveValue = this.#playerMoves[this.#playerMoves.length - 1];
      elementAtSameIndex = this.#currentSequence[this.#playerMoves.length - 1];

   }

   #initializeGame() {
      this.#currentSequence = [];
      this.#playerMoves = [];
   }
}
