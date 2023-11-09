import Phaser from 'phaser';
import playButton from '../../assets/playButton.png';

const PLAY_BUTTON = 'play';

class StartMenuScene extends Phaser.Scene {
    constructor() {
      super('start-menu');
      this.playButton = undefined;
    }
  
    preload() {
      this.load.image(PLAY_BUTTON, playButton);
    }
  
    create() {
    this.input.keyboard.on('keydown-SPACE', this.startGame, this);

    this.playButton = this.add
        .image(400, 300, PLAY_BUTTON)
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.startGame());
  
      // You can add more UI elements, title, or background here
    }
  
    startGame() {
      this.scene.start('game-scene');
    }
  }
  export default StartMenuScene;