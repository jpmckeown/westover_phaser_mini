import Phaser from 'phaser';

const ASSET_KEYS = {
   SOUND1: 'SOUND1',
   SOUND2: 'SOUND2',
   SOUND3: 'SOUND3',
   SOUND4: 'SOUND4'
} as const;

export class SimonGame extends Phaser.Scene {

   constructor() {
      super({ key: 'SimonGame' });
   }

   preload(): void {
      this.load.audio(ASSET_KEYS.SOUND1, 'assets/audio/simonSound1.mp3');
      this.load.audio(ASSET_KEYS.SOUND2, 'assets/audio/simonSound2.mp3');
      this.load.audio(ASSET_KEYS.SOUND3, 'assets/audio/simonSound3.mp3');
      this.load.audio(ASSET_KEYS.SOUND4, 'assets/audio/simonSound4.mp3');
   }

   create(): void {
      const button = this.#makeButton(20, 80, 0xdb0a8b);
      //this.add.rectangle(20, 80, 200, 200, 0xdb0a8b).setOrigin(0);

      const backButton = this.add.text(20, 20, '< Menu', {
         fontSize: '18px',
         fontFamily: 'Arial',
         color: '#000000',
         backgroundColor: '#cccccc',
         padding: { x: 10, y: 5 }
      })
         .setInteractive({ useHandCursor: true })
         .on('pointerdown', () => this.returnToMenu());
   }

   #makeButton(x: number, y: number, color: number): Phaser.GameObjects.Rectangle {
      const button = this.add.rectangle(x, y, 200, 200, color).setOrigin(0);
      button.setInteractive({ useHandCursor: true });
      return button;
   }

   private returnToMenu(): void {
      this.scene.start('MainMenu');
   }
}
