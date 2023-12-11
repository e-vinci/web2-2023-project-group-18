// eslint-disable-next-line max-classes-per-file
import Phaser from 'phaser';

import santaAsset from '../../assets/santa.png';
import redhatboyAsset from '../../assets/redhatboy.png';
import santaAssetJSON from '../../assets/santa.json';
import redhatboyAssetJSON from '../../assets/redhatboy.json';

import CoinLabel from './CoinLabel';
import coinAsset from '../../assets/coin.png';
import coinHudAsset from '../../assets/hudcoin.png';
import bombAsset from '../../assets/bomb.png';
import pauseButton from '../../assets/pauseButton.png';
import Settings from '../../utils/settings';
import MeterLabel from './MeterLabel';
import sheet from '../../assets/sheet.png';
import mapSheet from '../../assets/map.json';

const COIN_KEY = 'coin';
const HUD_COIN_KEY = 'hudcoin';
const BOMB_KEY = 'bomb';
const PAUSE_BUTTON = 'pause';

let dudeAsset = santaAsset;
let dudeAssetJSON = santaAssetJSON;

const gameOptions = {
  amplitude: 300,
  slopeLength: [200, 500],
  slicesAmount: 3,
  slopesPerSlice: 5,
  terrainSpeed: 200,
};

class GameScene extends Phaser.Scene {
  santa = Phaser.Physics.Matter.Sprite;

  constructor() {
    super('game-scene');
    this.player = undefined;
    this.cursors = undefined;
    this.stars = undefined;
    this.meterLabel = undefined;

    this.coinLabel = undefined;
    this.coins = undefined;

    this.bombSpawner = undefined;
    this.gameOver = false;
    this.ground = undefined;
    this.obstacles = undefined;
    this.scorePauseScene = undefined;
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
    // eslint-disable-next-line no-use-before-define
    this.scorePauseScene = this.scene.add('pause-score', ScorePauseScene, true);
  }

  preload() {
    changeSkin();
    this.load.atlas('santa', dudeAsset, dudeAssetJSON);
    this.load.image('tiles', sheet);
    this.load.tilemapTiledJSON('tileMap', mapSheet);
    this.load.image(BOMB_KEY, bombAsset);
  }

  create() {
    this.createDudeAnimations();

    const map = this.make.tilemap({ key: 'tileMap' });
    const tileset = map.addTilesetImage('iceworld', 'tiles');
    this.ground = map.createLayer('ground', tileset);
    this.ground.setCollisionByProperty({ collides: true });

    const objectLayer = map.getObjectLayer('objects');

    objectLayer.objects.forEach((objData) => {
      const { x, y, name } = objData;

      // eslint-disable-next-line default-case
      switch (name) {
        case 'player-spawn': {
          this.santa = this.matter.add
            .sprite(x, y, 'santa')
            .play('player-idle')
            .setFixedRotation();

          this.santa.setOnCollide(() => {
            this.isTouchingGround = true;
          });

          this.cameras.main.startFollow(this.santa);
          break;
        }
      }
    });

    // this.physics.add.overlap(this.santa, this.coins, this.collectCoin, null, this);

    this.matter.world.convertTilemapLayer(this.ground);

    this.key = this.input.keyboard.addKey(localStorage.getItem('selectedKey'));

    this.scorePauseScene.pauseButton.on('pointerdown', () => {
      this.scene.run('pause-menu');
    });
  }

  update() {
    const santa1 = this.santa;
    const groundLayer = this.ground;

    santa1.x += 2;
    santa1.play('player-slide', true);
    const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space);

    const scorePauseScene = this.scene.get('pause-score');

    if (localStorage.getItem('resume')) {
      scorePauseScene.meterLabel.resumeMeter();
      localStorage.removeItem('resume');
    }

    if (this.cursors.space.isDown) this.santa.play('player-jump', true);

    if (this.isTouchingGround && spaceJustPressed) {
      this.santa.play('player-jump', true);
      this.santa.setVelocityY(-15);
      this.santa.setVelocityX(2);
      this.isTouchingGround = false;
    }

    const key = Settings.getKey();
    if (Phaser.Input.Keyboard.KeyCodes[key] !== this.key.keyCode) {
      this.key.destroy();
      this.key = this.input.keyboard.addKey(key);
    }

    // Check if the penguin and groundLayer are defined
    if (santa1 && groundLayer) {
      // Filter tiles with the 'obstacles' property
      const obstacleTiles = groundLayer.filterTiles(
        (tile) => tile.properties && tile.properties.obstacles,
      );

      // Check if the penguin and its body are defined
      if (santa1.body) {
        // Check if the penguin overlaps with any obstacle tiles
        const overlappingTiles = obstacleTiles.filter((tile) => {
          const tileBounds = tile.getBounds();
          return (
            tileBounds &&
            Phaser.Geom.Intersects.RectangleToRectangle(santa1.getBounds(), tileBounds)
          );
        });

        // If there are overlapping tiles, set gameOver to true
        if (overlappingTiles.length > 0) {
          this.hitObstacle(this.santa);
        }
      }
    }
  }

  createDudeAnimations() {
    this.anims.create({
      key: 'player-idle',
      frames: [{ key: 'santa', frame: 'Idle (1).png' }],
    });

    // run animation
    this.anims.create({
      key: 'player-run',
      frameRate: 5,
      frames: this.anims.generateFrameNames('santa', {
        start: 1,
        end: 4,
        prefix: 'Run (',
        suffix: ').png',
      }),
      repeat: -1,
    });

    // slide animaion

    this.anims.create({
      key: 'player-slide',
      frameRate: 5,
      frames: this.anims.generateFrameNames('santa', {
        start: 1,
        end: 5,
        prefix: 'Slide (',
        suffix: ').png',
      }),
      repeat: -1,
    });

    // jump animation

    this.anims.create({
      key: 'player-jump',
      frameRate: 5,
      frames: this.anims.generateFrameNames('santa', {
        start: 1,
        end: 8,
        prefix: 'Jump (',
        suffix: ').png',
      }),
      repeat: -1,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  formatDistance(distance) {
    const meters = distance % 1000;
    const formattedMeters = String(meters).padStart(3, '0');
    return `${formattedMeters} m`;
  }

  hitObstacle(player) {
    this.scorePauseScene.meterLabel.pauseMeter();
    this.scene.pause();
    this.scorePauseScene.meterLabel.setText(
      `GAME OVER :  \nYour Score is ${this.formatDistance(
        this.scorePauseScene.meterLabel.timeElapsed,
      )}`,
    );
    localStorage.setItem('score', this.formatDistance(this.meterLabel));

    if (localStorage.getItem('token')) {
      this.updateScore(this.scorePauseScene.meterLabel.timeElapsed);
    }

    this.matter.pause();
    player.setTint(0xff0000);

    this.scene.remove('pause-score');
    this.scene.pause('game-scene');
    this.scene.run('game-over');
  }

  // eslint-disable-next-line class-methods-use-this
  async updateScore(newScore) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user')

    const options = {
      method: 'PUT',
      body: JSON.stringify({
        user,
        score: newScore
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await fetch(`${process.env.API_BASE_URL}/scores/`, options);

    if (!response.ok) {
      console.log(response.status);
      throw new Error();
    }
  }

  pauseGame() {
    this.meterLabel.pauseMeter();
    this.scene.pause();
    this.scene.run('pause-menu');
  }

  addCoin(x, slopeStartHeight) {
    const y = slopeStartHeight * gameOptions.amplitude;
    const coin = this.physics.add.image(x, y + 20, COIN_KEY);
    coin.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    this.coins.add(coin);
  }

  collectCoin(player, coin) {
    coin.disableBody(true, true);
    this.coinLabel.add(10);

    if (this.coins.countActive(true) === 0) {
      this.coins.children.iterate((child) => {
        child.enableBody(true, child.x, 0, true, true);
      });
    }

    if (this.pointCounter % 300 === 0) {
      this.addCoin(this.sliceStart.x, this.sliceStart.y * gameOptions.amplitude);
    }
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
}

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
    this.scene.pause('pause-score');
    this.scene.pause('game-scene');
    this.scene.run('pause-menu');
  }

  createCoinLabel(x, y) {
    const coin = 100; // await this.getDBCoinValue();
    const style = { fontSize: '32px', fill: '#ffffff', fontFamily: 'Arial, sans-serif' };
    const label = new CoinLabel(this, x, y, coin, style);
    return label;
  }
}

function changeSkin() {
  const skinName = localStorage.getItem("skin");

  if (skinName) {
    switch (skinName) {

      case "red hat":
        dudeAsset = redhatboyAsset;
        dudeAssetJSON = redhatboyAssetJSON;
        return;

      default:
        dudeAsset = santaAsset;
        dudeAssetJSON = santaAssetJSON;
        break;
    }
  }
}

export default GameScene;

