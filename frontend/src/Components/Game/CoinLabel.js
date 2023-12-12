import Phaser from 'phaser';

const formatCoin = (coin) => ` :${coin}`;

export default class CoinLabel extends Phaser.GameObjects.Text {
  constructor(scene, x, y, coin, style) {
    super(scene, x, y, formatCoin(coin), style);
    this.coin = coin;
  }

  setCoin(coin) {
    this.coin = coin;
    this.updateCoinText();
  }

  add(points) {
    this.setCoin(this.coin + points);
  }

  updateCoinText() {
    this.setText(formatCoin(this.coin));
  }

  getCoin(){
    return this.coin;
  }

  async updateCoinDb() {

    const token = localStorage.getItem('token');
    const options = {
      method: 'PUT',
      body: JSON.stringify({
        collectible: this.coin,
      }),
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };
    await fetch(`${process.env.API_BASE_URL}/collectibles/add`, options);
  }

}
