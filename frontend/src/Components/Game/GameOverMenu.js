import Phaser from 'phaser';
import replayButton from '../../assets/replayButton.png';
import homeButton from '../../assets/homeButton.png';
import Navigate from '../Router/Navigate';

const REPLAY_BUTTON = 'replay';
const HOME_BUTTON = 'home';

class GameOverScene extends Phaser.Scene {
  constructor() {
    super('game-over');
    this.replayButton = undefined;
    this.homeButton = undefined;
    this.restartButton = undefined;
  }

  preload() {
    this.load.image(REPLAY_BUTTON, replayButton);
    this.load.image(HOME_BUTTON, homeButton);
  }

  create() {
    const backgroundShadow = this.add.rectangle(
      0,
      0,
      window.innerWidth,
      window.innerHeight,
      0x000000,
      0.7,
    );
    backgroundShadow.setOrigin(0);

    const title = this.add.text(this.scale.width / 2, 50, 'SANTA FALL', {
      fontFamily: 'roboto',
      fontSize: '80px',
    });
    title.setOrigin(0.5);

    const textPause = this.add.text(this.scale.width / 2, 200, 'GAME OVER', {
      fontFamily: 'roboto',
      fontSize: '60px',
    });
    textPause.setOrigin(0.5);


    this.homeButton = this.add.image(this.scale.width/2-100, 350, HOME_BUTTON);
    this.homeButton.setInteractive({ useHandCursor: true });
    this.homeButton.on('pointerdown', () => {
      this.goHome();
    });

    this.replayButton = this.add.image(this.scale.width / 2 + 100, 350, REPLAY_BUTTON);
    this.replayButton.setInteractive({ useHandCursor: true });
    this.replayButton.on('pointerdown', () => {
      this.replayGame();
    });

    // Emit a custom event when creation is complete
    this.events.emit('create-complete');
  }


  goHome() {
    this.game.resume('game-scene');
    Navigate('/');
  }

  replayGame() {
      this.scene.remove('pause-menu');
      this.scene.start('game-scene')
   }
}

export default GameOverScene;
