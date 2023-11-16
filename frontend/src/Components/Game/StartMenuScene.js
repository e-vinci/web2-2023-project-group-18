import Phaser from 'phaser';
import playButton from '../../assets/playButtonNew.png';
import backgroundMountain from '../../assets/backgroundV2.png'

const PLAY_BUTTON = 'play';
const BACKGROUND_MOUNTAIN = 'back';

class StartMenuScene extends Phaser.Scene {
    constructor() {
      super('start-menu');
      this.playButton = undefined;
      this.backgroundMountain = undefined;
    }
  
    preload() {
      this.load.image(PLAY_BUTTON, playButton);
      this.load.image(BACKGROUND_MOUNTAIN, backgroundMountain);
    }
  
    create() {
    this.backgroundMountain = this.add.image(400,300, BACKGROUND_MOUNTAIN);
    // Rezise background image
    const newWidth = 800; 
    const newHeight = 600; 

    // Create a canvas 
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = newWidth;
    canvas.height = newHeight;

    // Draw the image on the canvas
    context.drawImage(this.textures.get(BACKGROUND_MOUNTAIN).getSourceImage(), 0, 0, newWidth, newHeight);

    // Create a new texture with the image
    this.textures.addImage(BACKGROUND_MOUNTAIN, canvas);

    // Resized image
    this.backgroundMountain.setTexture(BACKGROUND_MOUNTAIN);
    this.backgroundMountain.setDisplaySize(newWidth, newHeight);

    const backgroundShadow = this.add.rectangle(400, 300, 800, 600, 0x000000, 0.5);
    backgroundShadow.setOrigin(0.5);

    const titleGame = this.add.text(400,50,'SANTA FALL', {
      fontSize: '50px',
      fontFamily: 'Roboto',
      color: '#ffffff'
    })
    titleGame.setOrigin(0.5); 

    this.playButton = this.add.image(400, 300, PLAY_BUTTON);
    this.playButton.setScale(0.7);
    this.playButton.setOrigin(0.5);
    this.playButton.setInteractive({ useHandCursor: true }); 

    // Set up the pulsing animation
    this.tweens.add({
      targets: this.playButton,
      scaleX: 0.9, // Scale factor for X
      scaleY: 0.9, // Scale factor for Y
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

    const textRules = this.add.text(400,410,'Press space to jump over obstacles and roll down the slope \n at full speed to earn as many coins as possible',{
      fontSize: '23px',
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