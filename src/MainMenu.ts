import Phaser from 'phaser';

interface GameMenuItem {
   key: string;
   title: string;
   description: string;
   width?: number;  // Optional custom width
   height?: number; // Optional custom height
}

export class MainMenu extends Phaser.Scene {
   private gameList: GameMenuItem[] = [
      {
         key: 'TicTacGame',
         title: 'Tic-Tac',
         description: 'Noughts and crosses in 3x3 grid',
         width: 480,
         height: 640
      },
      {
         key: 'SimonGame',
         title: 'Simon',
         description: 'Audio and colour square buttons',
         width: 450,  // Different size for Simon
         height: 480   // extra space for return to Menu button above
      },
   ];

   private menuItems: Phaser.GameObjects.Text[] = [];
   private selectedIndex: number = 0;

   constructor() {
      super({ key: 'MainMenu' });
   }

   preload(): void {
   }

   create(): void {
      // Ensure menu uses standard size
      this.scale.resize(480, 640);

      const width = this.scale.width;
      const height = this.scale.height;

      this.add.text(
         width / 2,
         50,
         'Game Collection',
         {
            fontFamily: 'Arial',
            fontSize: '28px',
            color: '#000000',
            fontStyle: 'bold'
         }
      ).setOrigin(0.5);

      // Add subtitle
      this.add.text(
         width / 2,
         90,
         'Select a game to play',
         {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#333333'
         }
      ).setOrigin(0.5);

      // Create menu items
      this.createMenu();

      // Add keyboard input
      this.input.keyboard?.on('keydown-UP', () => this.changeSelection(-1));
      this.input.keyboard?.on('keydown-DOWN', () => this.changeSelection(1));
      this.input.keyboard?.on('keydown-ENTER', () => this.startGame());
      this.input.keyboard?.on('keydown-SPACE', () => this.startGame());
   }

   private createMenu(): void {
      const startY = 150;
      const spacing = 70;

      // Clear existing menu items
      this.menuItems.forEach(item => item.destroy());
      this.menuItems = [];

      // Clear existing graphics
      this.children.list
         .filter(child => child instanceof Phaser.GameObjects.Rectangle)
         .forEach(rect => rect.destroy());

      // make menu items
      this.gameList.forEach((game, index) => {
         const y = startY + index * spacing;

         // Menu selection rectangle for the current selection
         if (index === this.selectedIndex) {
            this.add.rectangle(
               this.scale.width / 2,
               y - 10,
               350,
               60,
               0x6666ff,
               0.2
            ).setOrigin(0.5);
         }

         // Game title text
         const menuItem = this.add.text(
            this.scale.width / 2,
            y - 20,
            game.title,
            {
               fontFamily: 'Arial',
               fontSize: '24px',
               color: index === this.selectedIndex ? '#000088' : '#000000',
               align: 'center',
               fontStyle: 'bold'
            }
         )
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
               this.selectedIndex = index;
               this.startGame();
            })
            .on('pointerover', () => {
               this.selectedIndex = index;
               this.refreshMenu();
            });

         // Game description
         const description = this.add.text(
            this.scale.width / 2,
            y + 5,
            game.description,
            {
               fontFamily: 'Arial',
               fontSize: '14px',
               color: '#666666',
               align: 'center'
            }
         ).setOrigin(0.5);

         // Canvas size info
         const sizeInfo = this.add.text(
            this.scale.width / 2,
            y + 25,
            `Canvas: ${game.width || 480} x ${game.height || 640}`,
            {
               fontFamily: 'Arial',
               fontSize: '12px',
               color: '#888888',
               align: 'center'
            }
         ).setOrigin(0.5);

         this.menuItems.push(menuItem);
      });
   }

   private changeSelection(direction: number): void {
      // Update the selected index with wrapping
      this.selectedIndex = (this.selectedIndex + direction + this.gameList.length) % this.gameList.length;
      this.refreshMenu();
   }

   private refreshMenu(): void {
      this.createMenu();
   }

   private startGame(): void {
      const selectedGame = this.gameList[this.selectedIndex];

      // Resize canvas if the game specifies custom dimensions
      if (selectedGame.width && selectedGame.height) {
         this.scale.resize(selectedGame.width, selectedGame.height);
      }

      this.scene.start(selectedGame.key);
   }
}
