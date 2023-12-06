import Phaser from 'phaser';
import CoinLabel from './CoinLabel';
import BombSpawner from './BombSpawner';
import platformAsset from '../../assets/platform.png';
import coinAsset from '../../assets/coin.png';
import coinHudAsset from '../../assets/hudcoin.png';
import bombAsset from '../../assets/bomb.png';
import dudeAsset from '../../assets/dude.png';
import pauseButton from '../../assets/pauseButton.png';
import Settings from '../../utils/settings';

const GROUND_KEY = 'ground';
const DUDE_KEY = 'dude';
const COIN_KEY = 'coin';
const HUD_COIN_KEY = 'hudcoin';
const BOMB_KEY = 'bomb';
const PAUSE_BUTTON  = 'pause';

class GameScene extends Phaser.Scene {
  constructor() {
    super('game-scene');
    this.player = undefined;
    this.cursors = undefined;
    this.coinLabel = undefined;
    this.coins = undefined;
    this.bombSpawner = undefined;
    this.gameOver = false;
    this.pauseButton = undefined;
  }

  preload() {
    this.load.image(GROUND_KEY, platformAsset);
    
    this.load.image(BOMB_KEY, bombAsset);

    this.load.spritesheet(DUDE_KEY, dudeAsset, {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.image(PAUSE_BUTTON, pauseButton);

    // coins
    this.load.image(HUD_COIN_KEY, coinHudAsset);
    this.load.image(COIN_KEY, coinAsset);
  }

  create() {
    const platforms = this.createPlatforms();
    this.player = this.createPlayer();
    this.coins = this.createCoins();

    // hud coin
    this.add.image(20, 38, HUD_COIN_KEY);
    this.createCoinLabel(30, 20).then((coinLabel) => {
      this.coinLabel = coinLabel;
    });
     
    

    this.bombSpawner = new BombSpawner(this, BOMB_KEY);
    const bombsGroup = this.bombSpawner.group;
    this.physics.add.collider(this.coins, platforms);
    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(bombsGroup, platforms);
    this.physics.add.collider(this.player, bombsGroup, this.hitBomb, null, this);
    this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.key = this.input.keyboard.addKey('SPACE');

    // pause btn
    this.pauseButton = this.add.image((this.scale.width-75),50,PAUSE_BUTTON);
    this.pauseButton.setInteractive({useHandCursor: true});
    this.pauseButton.setScale(0.8);
    this.pauseButton.on('pointerdown', () => {
      this.pauseGame();
    }); 

    /* The Collider takes two objects and tests for collision and performs separation against them.
    Note that we could call a callback in case of collision... */
  }

  update() {
    if (this.gameOver) {
      return;
    }

    const key = Settings.getKey();
    if (Phaser.Input.Keyboard.KeyCodes[key] !== this.key.keyCode) {
      this.key.destroy();
      this.key = this.input.keyboard.addKey(key);
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }

    if (this.key.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }

  createPlatforms() {
    const platforms = this.physics.add.staticGroup();
    
    platforms
      .create(400, 568, GROUND_KEY)
      .setScale(2)
      .refreshBody();

    platforms.create(600, 400, GROUND_KEY);
    platforms.create(50, 250, GROUND_KEY);
    platforms.create(750, 220, GROUND_KEY);
    return platforms;
  }

  createPlayer() {
    const player = this.physics.add.sprite(100, 450, DUDE_KEY);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    /* The 'left' animation uses frames 0, 1, 2 and 3 and runs at 10 frames per second.
    The 'repeat -1' value tells the animation to loop.
    */
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: DUDE_KEY, frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    return player;
  }

  createCoins() {
    const coins = this.physics.add.group({
      key: COIN_KEY,
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    // coins.children.iterate((child) => {
    //   child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    // });

    return coins;
  }

  collectCoin(player, coin) {
    coin.disableBody(true, true);
    this.coinLabel.add(10)
  
    if (this.coins.countActive(true) === 0) {
      this.coins.children.iterate((child) => {
        child.enableBody(true, child.x, 0, true, true);
      });
    }

    // this.bombSpawner.spawn(player.x);
  }
  
  async createCoinLabel(x, y) {
    // Attendez la valeur asynchrone
    const coin = 100;// await this.getDBCoinValue();

    const style = { fontSize: '32px', fill: '#ffffff', fontFamily: 'Arial, sans-serif' };
    const label = new CoinLabel(this, x, y, coin, style);
    this.add.existing(label);
    
    return label;
  }

  // eslint-disable-next-line class-methods-use-this
  async getDBCoinValue() {
    const token = localStorage.getItem('token');
    const options = {
      method: 'GET',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(`${process.env.API_BASE_URL}/collectibles/`, options);
    const data = await response;
    return data.coin;  
  }



  async updateDBCoins() {
    const coin = this.coinLabel.getCoin(); 
    console.log(`you have ${coin}`);
    // const token = localStorage.getItem('token');
    // const options = {
    //   method: 'PUT',
    //   body: JSON.stringify({
    //     coin,
    //   }),
    //   headers: {
    //     Authorization: token,
    //     'Content-Type': 'application/json',
    //   },
    // };
    // await fetch(`${process.env.API_BASE_URL}/collectibles/`, options);
  }


  hitBomb(player) {
    this.coinLabel.setText(`GAME OVER : ( \nYour Coins = ${this.coinLabel.coin}`);
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');
    this.updateDBCoins();
    this.gameOver = true;
  }

  pauseGame() {
    this.scene.pause();
    this.scene.launch('pause-menu');
  }
}

export default GameScene;
