import Phaser from "phaser";
import MeterLabel from './MeterLabel';
import pauseButton from '../../assets/pauseButton.png';


const PAUSE_BUTTON = 'pause';

// eslint-disable-next-line import/prefer-default-export
export class ScorePauseScene extends Phaser.Scene {
   constructor() {
      super('pause-score');
      this.meterLabel = undefined;
      this.pauseButton = undefined;
   }

   preload() {
      this.load.image(PAUSE_BUTTON, pauseButton);
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
   }

   createMeterLabel(x, y) {
      const label = new MeterLabel(this, x, y);
      this.add.existing(label);
      return label;
   }

   pauseGame() {
      this.meterLabel.pauseMeter();
      this.scene.pause();
      this.scene.launch('pause-menu');
   }

   

}

