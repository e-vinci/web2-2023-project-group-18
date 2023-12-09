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
import MeterLabel from './MeterLabel';

const DUDE_KEY = 'dude';
const COIN_KEY = 'coin';
const HUD_COIN_KEY = 'hudcoin';
const BOMB_KEY = 'bomb';
const PAUSE_BUTTON  = 'pause';

const gameOptions = {
  amplitude: 300,
  slopeLength: [200, 500],
  slicesAmount: 3,
  slopesPerSlice: 5,
  terrainSpeed: 200
};

class GameScene extends Phaser.Scene {
  constructor() {
    super('game-scene');
    this.player = undefined;
    this.cursors = undefined;
    // this.scoreLabel = undefined;
    this.meterLabel = undefined;
    this.stars = undefined;
    this.coinLabel = undefined;
    this.coins = undefined;
    this.bombSpawner = undefined;
    this.gameOver = false;
    this.pauseButton = undefined;
    this.slopeGraphics = [];
    this.sliceStart = undefined;
  }

  preload() {
    this.load.image(STAR_KEY, starAsset);
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
    this.slopeGraphics = [];
    this.sliceStart = new Phaser.Math.Vector2(0, 2);
    for (let i = 0; i < gameOptions.slicesAmount; i += 1) {
      this.slopeGraphics[i] = this.add.graphics();
      this.sliceStart = this.createSlope(this.slopeGraphics[i], this.sliceStart);
    }

    this.player = this.createPlayer();
    this.coins = this.createCoins();

    // hud coin
    this.add.image(20, 38, HUD_COIN_KEY);
    this.createCoinLabel(30, 20).then((coinLabel) => {
      this.coinLabel = coinLabel;
    });
     
    

    this.stars = this.createStars();
    // this.scoreLabel = this.createScoreLabel(20, 20, 0);
    this.meterLabel = this.createMeterLabel(20, 20);
    // this.scoreLabel.setColor('#ffffff');
    this.meterLabel.setColor('#ffffff');

    this.bombSpawner = new BombSpawner(this, BOMB_KEY);
    const bombsGroup = this.bombSpawner.group;
    this.physics.add.collider(this.stars, platforms);
    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(bombsGroup, platforms);
    this.physics.add.collider(this.player, bombsGroup, this.hitBomb, null, this);
    this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.key = this.input.keyboard.addKey(localStorage.getItem('selectedKey'));

    // pause btn
    this.pauseButton = this.add.image(this.scale.width - 75, 50, PAUSE_BUTTON);
    this.pauseButton.setInteractive({ useHandCursor: true });
    this.pauseButton.setScale(0.8);

    this.pauseButton.on('pointerdown', () => {
      this.pauseGame();
    });

    /* The Collider takes two objects and tests for collision and performs separation against them.
    Note that we could call a callback in case of collision... */
  }

  createSlope(graphics, sliceStart) {
    const slopePoints = [];
    let slopes = 0;
    let slopeStart = 0;
    let slopeStartHeight = sliceStart.y;
    let currentSlopeLength = Phaser.Math.Between(
      gameOptions.slopeLength[0],
      gameOptions.slopeLength[1],
    );
    let slopeEnd = slopeStart + currentSlopeLength;
    let slopeEndHeight = slopeStartHeight + Math.random();
    let currentPoint = 0;
    while (slopes < gameOptions.slopesPerSlice) {
      let y;
      if (currentPoint === slopeEnd) {
        slopes += 1;
        slopeStartHeight = slopeEndHeight;
        slopeEndHeight = slopeStartHeight + Math.random();
        y = slopeStartHeight * gameOptions.amplitude;
        slopeStart = currentPoint;
        currentSlopeLength = Phaser.Math.Between(
          gameOptions.slopeLength[0],
          gameOptions.slopeLength[1],
        );
        slopeEnd += currentSlopeLength;
      } else {
        y =
          this.interpolate(
            slopeStartHeight,
            slopeEndHeight,
            (currentPoint - slopeStart) / (slopeEnd - slopeStart),
          ) * gameOptions.amplitude;
      }
      slopePoints.push(new Phaser.Math.Vector2(currentPoint, y));
      currentPoint += 1;
    }
    // eslint-disable-next-line no-param-reassign
    graphics.x = sliceStart.x;
    graphics.clear();
    graphics.moveTo(0, 1000);
    graphics.fillStyle(0xdefbff);
    graphics.beginPath();
    slopePoints.forEach((point) => {
      graphics.lineTo(point.x, point.y);
    });
    graphics.lineTo(currentPoint, sliceStart.y * 1000);
    graphics.lineTo(0, sliceStart.y * 1000);
    graphics.closePath();
    graphics.fillPath();
    graphics.lineStyle(16, 0xc9edf0);
    graphics.beginPath();
    slopePoints.forEach((point) => {
      graphics.lineTo(point.x, point.y);
    });
    graphics.strokePath();
    // eslint-disable-next-line no-param-reassign
    graphics.width = (currentPoint - 1) * -1;
    return new Phaser.Math.Vector2(graphics.x + currentPoint - 1, slopeStartHeight);
  }

  // eslint-disable-next-line class-methods-use-this
  interpolate(vFrom, vTo, delta) {
    const interpolation = (1 - Math.cos(delta * Math.PI)) * 0.5;
    return vFrom * (1 - interpolation) + vTo * interpolation;
  }

  update(t, dt) {
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

    const offset = (dt / 1000) * gameOptions.terrainSpeed;
    const verticalOffset = offset * 0.5;
    this.sliceStart.x -= offset;
    this.slopeGraphics.forEach((item) => {
      // eslint-disable-next-line no-param-reassign
      item.x -= offset;
      // eslint-disable-next-line no-param-reassign
      item.y -= verticalOffset;
      if (item.x < item.width) {
        this.sliceStart = this.createSlope(item, this.sliceStart);
      }
    });
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
    const player = this.physics.add.sprite(30, 30, DUDE_KEY);
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

  collectStar(player, star) {
    star.disableBody(true, true);
    // this.scoreLabel.add(10);
    if (this.stars.countActive(true) === 0) {
      //  A new batch of stars to collect
      this.stars.children.iterate((child) => {
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

    // createScoreLabel(x, y, score) {
    //   const style = { fontSize: '32px', fill: '#000', position: 'absolute',right : '0',top: '0', margin : '1em'};
    //   const label = new ScoreLabel(this, x, y, score, style);

    //   return label;
    // }

    createMeterLabel(x, y) {
      const label = new MeterLabel(this, x, y);
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
      this.scoreLabel.setText(`GAME OVER : ( \nYour Score = ${this.scoreLabel.score}`);
      this.physics.pause();

      player.setTint(0xff0000);

      player.anims.play('turn');
      this.updateDBCoins();
      this.gameOver = true;
      this.meterLabel.destroy();
      this.gameOver = false;
      this.scene.launch('game-over');
    }

    // eslint-disable-next-line class-methods-use-this
     formatDistance(distance) {
      // Assuming distance is in meters
      // const kilometers = Math.floor(distance / 1000);
      const meters = distance % 1000;

      // const formattedKilometers = String(kilometers).padStart(3, '0');
      const formattedMeters = String(meters).padStart(3, '0');

      return `${formattedMeters} m`;
    }

  async pauseGame() {
      this.meterLabel.pauseMeter();
      this.scene.pause();
      await this.scene.launch('pause-menu');

      setTimeout(() => {
        this.scene.get('pause-menu').events.on(
          'shutdown',
          () => {
            if (localStorage.getItem('replay')) {
              this.meterLabel.destroy();
              return;
            }
            this.meterLabel.resumeMeter();
          },
          this,
        );
      }, 100);

      this.gameOver = false;
    }

  // eslint-disable-next-line class-methods-use-this
  async updateScore(score) {
      const token = localStorage.getItem('token');

      const options = {
        method: 'PUT',
        body: JSON.stringify({
          score,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      };
      await fetch(`${process.env.API_BASE_URL}/scores/`, options);
    }
  }
}
export default GameScene;
