import Phaser from 'phaser';
import replayButton from '../../assets/replayButton.png';
import homeButton from '../../assets/homeButton.png';
import settings from '../../utils/settings';
import settingsButton from '../../assets/settingsAssest.png';
import Navigate from '../Router/Navigate';

const REPLAY_BUTTON = 'replay';
const HOME_BUTTON = 'home';
const SETTINGS_ASSET = 'settings';

class GameOverScene extends Phaser.Scene {
  constructor() {
    super('game-over');
    this.replayButton = undefined;
    this.homeButton = undefined;
    this.settingsButton = undefined;
    this.scoreTxt = undefined;
  }

  preload() {
    this.load.image(REPLAY_BUTTON, replayButton);
    this.load.image(HOME_BUTTON, homeButton);
    this.load.image(SETTINGS_ASSET, settingsButton);
  }

  create(score) {
    const backgroundShadow = this.add.rectangle(
      0,
      0,
      window.innerWidth,
      window.innerHeight,
      0x000000,
      0.7
    );
    backgroundShadow.setOrigin(0);

    const title = this.add.text(this.scale.width / 2, 100, 'SANTA FALL', {
      fontFamily: 'roboto',
      fontSize: '80px',
    });
    title.setOrigin(0.5);

    const tryAgainMessage = this.add.text(
      this.scale.width / 2,
      this.scale.height / 2 - 225,
      'Nice try! Maybe next time you will win',
      {
        fontFamily: 'roboto',
        fontSize: '40px',
        color: '#ffffff',
      }
    );
    tryAgainMessage.setOrigin(0.5);

    this.homeButton = this.add.image(this.scale.width / 2 - 100, this.scale.height / 2 , HOME_BUTTON);
    this.homeButton.setInteractive({ useHandCursor: true });
    this.homeButton.on('pointerdown', () => {
      this.goHome();
    });

    this.replayButton = this.add.image(this.scale.width / 2 + 100, this.scale.height / 2 , REPLAY_BUTTON);
    this.replayButton.setInteractive({ useHandCursor: true });
    this.replayButton.on('pointerdown', () => {
      this.replayGame();
    });

    this.settingsButton = this.add.image(this.scale.width / 2 + 700, this.scale.height - 40 , SETTINGS_ASSET);
    this.settingsButton.setInteractive({ useHandCursor: true });
    this.settingsButton.on('pointerdown', () => {
      settings.openSettings();
    });

    this.scoreText = this.add.text(this.scale.width / 2, this.scale.height / 2 - 150 , `Score: ${score}`, {
        fontFamily: 'roboto',
        fontSize: '40px',
        fill: '#fff',
      });
      this.scoreText.setOrigin(0.5);

    // Emit a custom event when creation is complete
    this.events.emit('create-complete');

  }

  goHome() {
    this.scene.stop('game-over');
    this.game.destroy(true);
    Navigate('/');
  }

  replayGame() {
    this.scene.stop('game-over');
    this.events.emit('restart-game');
  }
}

export default GameOverScene;