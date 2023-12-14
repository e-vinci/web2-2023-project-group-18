import Phaser from "phaser";
import MeterLabel from './MeterLabel';
import pauseButton from '../../assets/pauseButton.png';
import CoinLabel from './CoinLabel';
import coinAsset from '../../assets/coin.png';
import coinHudAsset from '../../assets/hudcoin.png';

const PAUSE_BUTTON = 'pause';
const HUD_COIN_KEY = 'hudcoin';
const COIN_KEY = 'coin';

class ScorePauseScene extends Phaser.Scene {
      constructor() {
         super('pause-score');
         this.meterLabel = undefined;
         this.pauseButton = undefined;
         this.coinLabel = undefined;
       }

       preload() {
         this.load.image(PAUSE_BUTTON, pauseButton);
     
         // coins
         this.load.image(HUD_COIN_KEY, coinHudAsset);
         this.load.image(COIN_KEY, coinAsset);
       }

       create() {
         this.meterLabel = this.createMeterLabel(20, 20);
         this.meterLabel.setColor('#ffffff');
     
         // pause btn
         this.pauseButton = this.add.image(this.scale.width - 75, 50, PAUSE_BUTTON);
         this.pauseButton.setInteractive({ useHandCursor: true });
         this.pauseButton.setScale(0.8);
     
         this.pauseButton.on('pointerdown', () => {
           this.pauseGame();
         });
     
         // coins
         this.add.image(30, 88, HUD_COIN_KEY);
         this.coinLabel = this.createCoinLabel(45, 70);
         this.add.existing(this.coinLabel);
       }

    
       createMeterLabel(x, y) {
         const label = new MeterLabel(this, x, y);
         this.add.existing(label);
     
         return label;
       }

       pauseGame() {
         this.meterLabel.pauseMeter();
         this.scene.pause('game-over');
         this.scene.pause('pause-score');
         this.scene.pause('game-scene');
         this.scene.run('pause-menu');
       }

       createCoinLabel(x, y) {
         const style = { fontSize: '32px', fill: '#ffffff', fontFamily: 'Arial, sans-serif' };
         const label = new CoinLabel(this, x, y, 0, style);
         return label;
       }

}

export default ScorePauseScene;