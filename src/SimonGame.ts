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

   private returnToMenu(): void {
      this.scene.start('MainMenu');
   }
}
