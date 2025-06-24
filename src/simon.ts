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
      // todo
   }

   public checkPlayerMove(x: number) {
      // todo
   }

   #initializeGame() {
      this.#currentSequence = [];
      this.#playerMoves = [];
   }
}
