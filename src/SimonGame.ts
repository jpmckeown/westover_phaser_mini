import Phaser from 'phaser';
import Simon from './simon';
import { sleep } from './utils';

const BTN_ALPHA_INITIAL = 0.3;

const ASSET_KEYS = {
   SOUND1: 'SOUND1',
   SOUND2: 'SOUND2',
   SOUND3: 'SOUND3',
   SOUND4: 'SOUND4'
} as const;

type GameState = keyof typeof GAME_STATE;

const GAME_STATE = {
   INITIAL: 'INITIAL',
   PLAYING: 'PLAYING',
   WAITING: 'WAITING',
   DONE: 'DONE'
} as const;

export class SimonGame extends Phaser.Scene {
   #buttons!: Phaser.GameObjects.Rectangle[];
   #gameState!: GameState;
   #simonGame!: Simon;

   constructor() {
      super({ key: 'SimonGame' });
   }

   init(): void {
      this.scale.resize(450, 450);
      this.#buttons = [];
      this.#gameState = GAME_STATE.INITIAL;
      this.#simonGame = new Simon();
   };

   preload(): void {
      this.load.audio(ASSET_KEYS.SOUND1, 'assets/audio/simonSound1.mp3');
      this.load.audio(ASSET_KEYS.SOUND2, 'assets/audio/simonSound2.mp3');
      this.load.audio(ASSET_KEYS.SOUND3, 'assets/audio/simonSound3.mp3');
      this.load.audio(ASSET_KEYS.SOUND4, 'assets/audio/simonSound4.mp3');
   };

   create(): void {
      const button1 = this.#makeButton(20, 50, 0xdb0a8b);
      const button2 = this.#makeButton(230, 50, 0x08c418);
      const button3 = this.#makeButton(20, 260, 0xe6e600);
      const button4 = this.#makeButton(230, 260, 0x0066cc);
      this.#buttons = [button1, button2, button3, button4];

      const backButton = this.add.text(20, 20, '< Menu', {
         fontSize: '18px',
         fontFamily: 'Arial',
         color: '#000000',
         backgroundColor: '#cccccc',
         padding: { x: 10, y: 5 }
      })
         .setInteractive({ useHandCursor: true })
         .on('pointerdown', () => this.returnToMenu());

      this.#playSequence();
   };

   #makeButton(x: number, y: number, color: number): Phaser.GameObjects.Rectangle {
      const button = this.add.rectangle(x, y, 200, 200, color);
      button.setOrigin(0);
      button.setAlpha(BTN_ALPHA_INITIAL);
      button.setInteractive(); //({ useHandCursor: true });
      button.on(Phaser.Input.Events.POINTER_OVER as string, () => {
         button.setAlpha(1);
         console.log('mouse is over button');
      });
      button.on(Phaser.Input.Events.POINTER_OUT as string, () => {
         button.setAlpha(BTN_ALPHA_INITIAL);
         console.log('mouse out');
      });
      button.on(Phaser.Input.Events.POINTER_DOWN as string, () => {
         console.log('mouse click on button');
      });
      return button;
   }

   async #playSequence(): Promise<void> {
      await sleep(700);
      const currentSequence = this.#simonGame.sequence;
      console.log("seq" + currentSequence);
      for (const num of currentSequence) {
         this.#buttons[num].setAlpha(1);
         // todo play audio
         console.log("play sound " + num);
         await sleep(1000);
         this.#buttons[num].setAlpha(BTN_ALPHA_INITIAL);
      }
      console.log("sleep 1 second");
   }

   private returnToMenu(): void {
      this.scale.resize(480, 640);
      this.scene.start('MainMenu');
   }
}
