import Phaser from 'phaser';
import playButton from '../../assets/playButtonNew.png';

const PLAY_BUTTON = 'play';

class StartMenuScene extends Phaser.Scene {
    constructor() {
      super('start-menu');
      this.playButton = undefined;
      this.backgroundMountain = undefined;
    }
  
    preload() {
      this.load.image(PLAY_BUTTON, playButton);
    }
  
    create() {
               const titleGame = this.add.text(this.scale.width / 2, 50, 'SANTA FALL', {
                 fontSize: '12vmin',
                 fontFamily: 'Arial, sans-serif',
                 color: '#ffffff',
               });
               titleGame.setOrigin(0.5);

               this.playButton = this.add.image(this.scale.width / 2, 300, PLAY_BUTTON);
               this.playButton.setOrigin(0.5);
               this.playButton.setInteractive({ useHandCursor: true });

               // Set up the pulsing animation
               this.tweens.add({
                 targets: this.playButton,
                 scaleX: 1.2, // Scale factor for X
                 scaleY: 1.2, // Scale factor for Y
                 duration: 800, // Duration in milliseconds
                 yoyo: true, // Make the animation reverse to its original state
                 repeat: -1, // Repeat indefinitely
               });

               this.playButton.on('pointerdown', () => {
                 this.startGame();
               });
               this.playButton.on('pointerover', () => {
                 this.playButton.setTint(0xfc7d7d);
               });
               this.playButton.on('pointerout', () => {
                 this.playButton.clearTint();
               });

               const textRules = this.add.text(
                 this.scale.width / 2,
                 480,
                 'Press to jump over obstacles and roll down the slope \n at full speed to earn as many coins as possible',
                 {
                   fontSize: '5vmin',
                   color: '#ffffff',
                   fontFamily: 'Arial, sans-serif',
                   justifyContent: 'center',
                   wordWrap: { width: this.scale.width * 0.8 }, // Utilise 80% de la largeur de l'écran
                 },
               );
               textRules.setOrigin(0.5);
               textRules.setAlign('center');

               // Mettez à jour la position du texte et la largeur de l'enveloppe de mots lorsque la taille de la fenêtre change
               this.scale.on('resize', (gameSize) => {
                 const { width } = gameSize;
                 textRules.x = width / 2;
                //  textRules.setWordWrapWidth(width * 0.8); // Met à jour la largeur de l'enveloppe de mots
               });
             }
  
    startGame() {
      this.scene.start('game-scene');
    }
  }
  export default StartMenuScene;