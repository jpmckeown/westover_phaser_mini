export default class Simon {
   #currentSequence: number[] = [];
   #playerMoves: number[] = [];
   #isGameOver: boolean = false;

   constructor() {
      this.#initializeGame();
   }

   public generateNextSequenceElement() {
      // todo
   }

   #initializeGame() {
      this.#currentSequence = [];
      this.#playerMoves = [];
   }
}
