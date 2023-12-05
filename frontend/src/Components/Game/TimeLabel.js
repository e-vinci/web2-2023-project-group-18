import Phaser from 'phaser';

const formatTimer = (timeElapsed) => {
  const minutes = `0${Math.floor(timeElapsed / 60)}`.slice(-2);
  const seconds = `0${Math.floor(timeElapsed % 60)}`.slice(-2);
  return `${minutes}:${seconds}`;
};

export default class TimeLabel extends Phaser.GameObjects.Text {

  constructor(scene, x, y) {
    super(scene, x, y, "00:00", { fontSize: '32px', fill: '#000' });
    this.timeElapsed = 0;
    this.startTimer();
    console.log('inside class', this.timeElapsed);
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.timeElapsed += 1;
      this.updateTimerText();
    }, 1000);
  }

  updateTimerText() {
    this.setText(formatTimer(this.timeElapsed));
  }

  pauseOrResumeTimer() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
      this.updateTimerText();
    }
    else {
      this.startTimer();
    }
  }
}