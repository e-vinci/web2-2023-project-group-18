import Phaser from 'phaser';

const formatCoins = (coins) => `Coins: ${coins}`;

export default class CoinLabel extends Phaser.GameObjects.Text {
   constructor(scene, x, y, coins, style) {
    super(scene, x, y, formatCoins(coins), style);
    this.coins = coins;
  }

  setScore(coins) {
    this.coins = coins;
    this.updateScoreText();
  }

  add(points) {
    this.setCoins(this.coins + points);
  }

  updateScoreText() {
    this.setText(formatCoins(this.score));
  }
}