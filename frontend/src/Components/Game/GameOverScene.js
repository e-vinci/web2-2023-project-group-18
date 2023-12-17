import Phaser from 'phaser';
import replayButton from '../../assets/replayButton.png';
import cartShopButton from '../../assets/cartShop.png';
import settingsButton from '../../assets/settingsAssest.png';
import homeButton from '../../assets/homeButton.png';
import Navigate from '../Router/Navigate';
import { openSettings } from '../../utils/settings';

const REPLAY_BUTTON = 'replay';
const SHOP_BUTTON = 'shop';
const SETTINGS_ASSET = 'settings';
const HOME_BUTTON = 'homeUnconnected';

class GameOverScene extends Phaser.Scene {
  constructor() {
    super('game-over');
    this.replayButton = undefined;
    this.cartShopButton = undefined;
    this.settingsButton = undefined;
    this.scoreTxt = undefined;
    this.score = undefined;
    this.homeButton = undefined;
  }

  // eslint-disable-next-line class-methods-use-this
  init(data) {
    this.score = data.score
    // eslint-disable-next-line no-console
    console.log(data.score);
  }

  preload() {
    this.load.image(REPLAY_BUTTON, replayButton);
    this.load.image(SHOP_BUTTON, cartShopButton);
    this.load.image(SETTINGS_ASSET, settingsButton);
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

    const title = this.add.text(this.scale.width / 2, this.scale.height / 2 - 200, 'GAME OVER !', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '10vmin',
    });
    title.setOrigin(0.5);

    const tryAgainMessage = this.add.text(
      this.scale.width / 2,
      this.scale.height / 2 - 100,
      "Nice try, maybe you'll win next time !",
      {
        fontFamily: 'Arial, sans-serif',
        fontSize: '5vmin',
        color: '#ffffff',
        wordWrap: { width: this.scale.width * 0.8 },
      },
    );
    tryAgainMessage.setOrigin(0.5);



    const token = localStorage.getItem('token');
    if(token) {


      this.cartShopButton = this.add.image(
      this.scale.width / 2 + 100,
      this.scale.height / 2 + 100,
      SHOP_BUTTON,
      );
      this.cartShopButton.setInteractive({ useHandCursor: true });
      this.cartShopButton.on('pointerdown', () => {
        this.goShop();
      });
    }else {
      this.homeButton = this.add.image(
        this.scale.width/2 + 100,
        this.scale.height/2 + 100,
        HOME_BUTTON,
      );
      this.homeButton.setInteractive({useHandCursor: true});
      this.homeButton.on('pointerdown', () => {
        this.goHome();
      });
    }
    this.replayButton = this.add.image(
    this.scale.width / 2 - 100,
    this.scale.height / 2 + 100,
    REPLAY_BUTTON,    
    );
    this.replayButton.setInteractive({ useHandCursor: true });
    this.replayButton.on('pointerdown', () => {
      this.replayGame();
    });

    // only setting for computer user
    this.isMobile = this.sys.game.device.input.touch;
    if (!this.isMobile) {
      this.settingsButton = this.add.image(
        this.scale.width - 75,
        this.scale.height - 40,
        SETTINGS_ASSET,
      );
      this.settingsButton.setInteractive({ useHandCursor: true });
      this.settingsButton.on('pointerdown', () => {
        openSettings();
      });
    }

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
        fontFamily: 'Arial, sans-serif',
        fontSize: '6vmin',
        fill: '#fff',
      },
    );
    this.scoreText.setOrigin(0.5);

    // Emit a custom event when creation is complete
    this.events.emit('create-complete');
  }

  handleGameOverEvent() {
    // eslint-disable-next-line no-console
    console.log(`score : ${this.score}`);
    this.scoreText.setText(`Score: ${this.score}`);
  }

  goShop() {
    this.scene.stop('game-over');
    this.game.destroy(true);
    Navigate('/shop');
  }

  goHome() {
    this.scene.stop('gam-over');
    this.game.destroy(true);
    Navigate('/');
  }

  replayGame() {
    this.scene.stop('pause-menu');
    this.scene.remove('pause-score');
    this.scene.start('game-scene');
  }
}

export default GameOverScene;