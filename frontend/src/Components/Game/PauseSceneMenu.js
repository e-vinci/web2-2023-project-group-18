import Phaser from 'phaser';
import replayButton from '../../assets/replayButton.png';
import homeButton from '../../assets/homeButton.png';
import restartButton from '../../assets/restartButton.png';
import settings from '../../utils/settings';
import settingsButton from '../../assets/settingsAssest.png'
import Navigate from '../Router/Navigate';

const REPLAY_BUTTON = 'replay';
const HOME_BUTTON = 'home';
const RESTART_BUTTON = 'restart';
const SETTINGS_ASSET = 'settings';


class PauseMenuScene extends Phaser.Scene {
    constructor() {
        super('pause-menu');
        this.replayButton = undefined;
        this.homeButton = undefined;
        this.restartButton = undefined;
        this.settingsButton = undefined;
    }

    preload () {
        this.load.image(REPLAY_BUTTON, replayButton);
        this.load.image(HOME_BUTTON, homeButton);
        this.load.image(RESTART_BUTTON, restartButton);
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

              //  const title = this.add.text(this.scale.width / 2, 50, 'SANTA FALL', {
              //    fontFamily: 'roboto',
              //    fontSize: '80px',
              //  });
              //  title.setOrigin(0.5);

               const textPause = this.add.text(this.scale.width / 2, 200, 'PAUSE', {
                 fontFamily: 'roboto',
                 fontSize: '60px',
               });
               textPause.setOrigin(0.5);

               this.restartButton = this.add.image(this.scale.width / 2 - 100, 350, RESTART_BUTTON);
               this.restartButton.setInteractive({ useHandCursor: true });
               this.restartButton.on('pointerdown', () => {
                 this.restartGame();
               });

               this.homeButton = this.add.image(this.scale.width / 2, 350, HOME_BUTTON);
               this.homeButton.setInteractive({ useHandCursor: true });
               this.homeButton.on('pointerdown', () => {
                 this.goHome();
               });

               this.replayButton = this.add.image(this.scale.width / 2 + 100, 350, REPLAY_BUTTON);
               this.replayButton.setInteractive({ useHandCursor: true });
               this.replayButton.on('pointerdown', () => {
                 
                 this.replayGame();
               });

               this.settingsButton = this.add.image(this.scale.width - 75, this.scale.height - 40, SETTINGS_ASSET);
               this.settingsButton.setInteractive({ useHandCursor: true});
               this.settingsButton.on('pointerdown', () => {
                settings.openSettings();
               })
        
             }

    restartGame() {
      this.scene.stop('pause-menu');
      localStorage.setItem('resume', true);
      this.scene.resume('pause-score');
      this.scene.resume('game-scene');
    }

    goHome() {
      this.scene.stop('pause-menu');
      this.game.destroy(true);
      Navigate('/');
    }

  replayGame() {
       this.scene.remove('pause-menu');
       this.scene.remove('game-over');
       this.scene.remove('pause-score');
       this.scene.start('game-scene');
  }

}

export default PauseMenuScene;
