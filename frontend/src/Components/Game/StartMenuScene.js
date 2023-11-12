import Phaser from 'phaser';
import playButton from '../../assets/playButtonNew.png';
import backgroundMountain from '../../assets/backgroundMoutain.png'
// import GameScene from './GameScene';

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

    this.playButton = this.add.image(400, 300, PLAY_BUTTON);
    this.playButton.setOrigin(0.5);
    this.playButton.setInteractive({ useHandCursor: true }); 
    this.playButton.on('pointerdown', () => {
      this.startGame();
    });    

    const textRules = this.add.text(400,400,'Press space to jump over obstacles and roll down the slope \n at full speed to earn as many coins as possible');
    textRules.setOrigin(0.5);
    textRules.setAlign('center');

    }
  
    startGame() {
      this.scene.start('game-scene');
    }
  }
  export default StartMenuScene;