import Phaser from 'phaser';

export class SimonGame extends Phaser.Scene {

   constructor() {
      super({ key: 'SimonGame' });
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
