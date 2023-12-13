import Phaser from 'phaser';
import replayButton from '../../assets/replayButton.png';
import cartShopButton from '../../assets/cartShop.png';
import settings from '../../utils/settings';
import settingsButton from '../../assets/settingsAssest.png';
import Navigate from '../Router/Navigate';

const REPLAY_BUTTON = 'replay';
const SHOP_BUTTON = 'home';
const SETTINGS_ASSET = 'settings';

class GameOverScene extends Phaser.Scene {
  constructor() {
    super('game-over');
    this.replayButton = undefined;
    this.cartShopButton = undefined;
    this.settingsButton = undefined;
    this.scoreTxt = undefined;
    this.score = undefined;
  }

  // eslint-disable-next-line class-methods-use-this
  init(data) {
    this.score = data.score
    console.log(data.score);
  }

  preload() {
    this.load.image(REPLAY_BUTTON, replayButton);
    this.load.image(SHOP_BUTTON, cartShopButton);
    this.load.image(SETTINGS_ASSET, settingsButton);
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

    const title = this.add.text(this.scale.width / 2, this.scale.height / 2 - 200, 'GAME OVER !', {
      fontFamily: 'roboto',
      fontSize: '100px',
    });
    title.setOrigin(0.5);

    const tryAgainMessage = this.add.text(
      this.scale.width / 2,
      this.scale.height / 2 - 100,
      "Nice try, maybe you'll win next time !",
      {
        fontFamily: 'roboto',
        fontSize: '40px',
        color: '#ffffff',
      },
    );
    tryAgainMessage.setOrigin(0.5);

    this.cartShopButton = this.add.image(
      this.scale.width / 2 + 100,
      this.scale.height / 2 + 100,
      SHOP_BUTTON,
    );
    this.cartShopButton.setInteractive({ useHandCursor: true });
    this.cartShopButton.on('pointerdown', () => {
      this.goShop();
    });

    this.replayButton = this.add.image(
      this.scale.width / 2 - 100,
      this.scale.height / 2 + 100,
      REPLAY_BUTTON,
    );
    this.replayButton.setInteractive({ useHandCursor: true });
    this.replayButton.on('pointerdown', () => {
      this.replayGame();
    });

    this.settingsButton = this.add.image(
      this.scale.width -75,
      this.scale.height - 40,
      SETTINGS_ASSET,
    );
    this.settingsButton.setInteractive({ useHandCursor: true });
    this.settingsButton.on('pointerdown', () => {
      settings.openSettings();
    });

    this.scene.get('game-scene').events.on(
      'game-over',
      () => {
        this.handleGameOverEvent();
      },
      this,
    );

    this.scoreText = this.add.text(
      this.scale.width / 2,
      this.scale.height / 2,
      `Score: ${this.score}`,
      {
        fontFamily: 'roboto',
        fontSize: '40px',
        fill: '#fff',
      },
    );
    this.scoreText.setOrigin(0.5);

    // Emit a custom event when creation is complete
    this.events.emit('create-complete');
  }

  handleGameOverEvent(score) {
    this.score = score;
    console.log(`score : ${score}`);
    this.scoreText.setText(`Score: ${this.score}`);
  }

  goShop() {
    this.scene.stop('game-over');
    this.game.destroy(true);
    Navigate('/shop');
  }

  replayGame() {
       this.scene.resume('pause-menu');
       this.scene.remove('pause-score');
       this.scene.start('game-scene');
  }
}

export default GameOverScene;