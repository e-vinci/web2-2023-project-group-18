import Phaser from 'phaser';

function formatDistance(distance) {
  // Assuming distance is in meters
  // const kilometers = Math.floor(distance / 1000);
  const meters = distance % 1000;

  // const formattedKilometers = String(kilometers).padStart(3, '0');
  const formattedMeters = String(meters).padStart(3, '0');

  return `${formattedMeters} m`;
}

export default class MeterLabel extends Phaser.GameObjects.Text {
  constructor(scene, x, y) {
    super(scene, x, y, '00 m', {
      fontSize: '32px',
      fill: '#000',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
    });
    this.timeElapsed = 0;
    console.log('inside class', this.timeElapsed);
    this.startMeter();
  }

  startMeter() {
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.timeElapsed += 1;
        this.updateDistanceText();
      }, 900);
    }
  }

  async updateDistanceText() {
    this.setText(formatDistance(this.timeElapsed)); // Update the text content
  }

  pauseMeter() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.updateDistanceText();
    }
  }

  resumeMeter() {
    if (!this.interval) {
      this.startMeter();
    }
  }

  destroyMeter() {
    clearInterval(this.interval);
    this.interval = null;
    this.timeElapsed = 0;
    this.updateDistanceText();
  }
}