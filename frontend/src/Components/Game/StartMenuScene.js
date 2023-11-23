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

    const titleGame = this.add.text(768,50,'SANTA FALL', {
      fontSize: '80px',
      fontFamily: 'Roboto',
      color: '#ffffff'
    })
    titleGame.setOrigin(0.5); 

    this.playButton = this.add.image(768, 300, PLAY_BUTTON);
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
    this.playButton.on('pointerover',() => {
      this.playButton.setTint(0xfc7d7d);
    }) 
    this.playButton.on('pointerout', () => {
      this.playButton.clearTint();
    })

    const textRules = this.add.text(768,480,'Press space to jump over obstacles and roll down the slope \n at full speed to earn as many coins as possible',{
      fontSize: '30px',
      color: '#ffffff',
      fontFamily: 'Roboto'
    });
    textRules.setOrigin(0.5);
    textRules.setAlign('center');

    }
  
    startGame() {
      this.scene.start('game-scene');
    }
  }
  export default StartMenuScene;