import Phaser from 'phaser';

interface GameMenuItem {
   key: string;
   title: string;
   description: string;
}

export class MainMenu extends Phaser.Scene {
   private gameList: GameMenuItem[] = [
      {
         key: 'TicTacGame',
         title: 'Tic-Tac',
         description: 'Noughts and crosses in 3x3 grid'
      },
      {
         key: 'SimonGame',
         title: 'Simon',
         description: 'Audio and colour square buttons'
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
      this.input.keyboard.on('keydown-UP', () => this.changeSelection(-1));
      this.input.keyboard.on('keydown-DOWN', () => this.changeSelection(1));
      this.input.keyboard.on('keydown-ENTER', () => this.startGame());
      this.input.keyboard.on('keydown-SPACE', () => this.startGame());
   }

   private createMenu(): void {
      const startY = 150;
      const spacing = 50;

      // Clear existing menu items
      this.menuItems.forEach(item => item.destroy());
      this.menuItems = [];

      // make menu items
      this.gameList.forEach((game, index) => {
         const y = startY + index * spacing;

         // Menu selection rectangle for the current selection
         if (index === this.selectedIndex) {
            this.add.rectangle(
               this.scale.width / 2,
               y,
               300,
               40,
               0x6666ff,
               0.2
            ).setOrigin(0.5);
         }

         // Game title text
         const menuItem = this.add.text(
            this.scale.width / 2,
            y,
            game.title,
            {
               fontFamily: 'Arial',
               fontSize: '20px',
               color: index === this.selectedIndex ? '#000088' : '#000000',
               align: 'center'
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

         this.menuItems.push(menuItem);
      });

      this.add.text(
         this.scale.width / 2,
         startY + this.gameList.length * spacing + 30,
         this.gameList[this.selectedIndex].description,
         {
            fontFamily: 'Arial',
            fontSize: '16px',
            color: '#555555',
            align: 'center'
         }
      ).setOrigin(0.5);
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
      this.scene.start(selectedGame.key);
   }
}
