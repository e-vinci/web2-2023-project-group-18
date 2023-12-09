import Phaser from 'phaser';
// import dudeAsset from '../../assets/penguin.png';
import dudeAsset from '../../assets/santa.png'
import pauseButton from '../../assets/pauseButton.png';
import Settings from '../../utils/settings';
import MeterLabel from './MeterLabel';
// import dudeAssetJSON from '../../assets/penguin.json';
import dudeAssetJSON from '../../assets/santa.json';
import sheet from '../../assets/sheet.png'
import mapSheet from '../../assets/map.json'

const PAUSE_BUTTON  = 'pause';

class GameScene extends Phaser.Scene {
  santa = Phaser.Physics.Matter.Sprite;

  constructor() {
    super('game-scene');
    this.player = undefined;
    this.cursors = undefined;
    this.meterLabel = undefined;
    this.stars = undefined;
    this.bombSpawner = undefined;
    this.gameOver = false;
    this.pauseButton = undefined;
    this.ground = undefined;
    this.obstacles = undefined;
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload() {
    this.load.atlas('santa', dudeAsset, dudeAssetJSON);
    this.load.image('tiles', sheet);
    this.load.tilemapTiledJSON('tileMap', mapSheet);

    this.load.image(PAUSE_BUTTON, pauseButton);
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

    this.matter.world.convertTilemapLayer(this.ground);

    this.meterLabel = this.createMeterLabel(20, 20);
    this.meterLabel.setColor('#ffffff');

    this.key = this.input.keyboard.addKey(localStorage.getItem('selectedKey'));

    // pause btn
    this.pauseButton = this.add.image(this.scale.width - 75, 50, PAUSE_BUTTON);
    this.pauseButton.setInteractive({ useHandCursor: true });
    this.pauseButton.setScale(0.8);

    this.pauseButton.on('pointerdown', () => {
      this.pauseGame();
    });
  }

  update() {
    const santa1 = this.santa;
    const groundLayer = this.ground;

    santa1.x += 2;
    santa1.play('player-run', true);
    const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space);

    if (spaceJustPressed && this.isTouchingGround) {
      this.santa.play('player-jump', true);
      this.santa.setVelocityY(-17);
      this.isTouchingGround = false;
    }

    while (this.cursors.down.isDown) santa1.play('player-slide', true);
    while (this.cursors.right.isDown) santa1.play('', true);

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

  // eslint-disable-next-line class-methods-use-this
  //   async updateScore(score) {
  //     const token = localStorage.getItem('token');

  //     const options = {
  //       method: 'PUT',
  //       body: JSON.stringify({
  //         score,
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: token,
  //       },
  //     };
  //     await fetch(`${process.env.API_BASE_URL}/scores/`, options);
  //   }

  createDudeAnimations() {
    this.anims.create({
      key: 'player-idle',
      frames: [{ key: 'santa', frame: 'Idle (1).png' }],
    });

    // run animation
    this.anims.create({
      key: 'player-run',
      frameRate: 10,
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
      frameRate: 10,
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
      frameRate: 10,
      frames: this.anims.generateFrameNames('santa', {
        start: 1,
        end: 8,
        prefix: 'Jump (',
        suffix: ').png',
      }),
      repeat: -1,
    });
  }

  createMeterLabel(x, y) {
    const label = new MeterLabel(this, x, y);
    this.add.existing(label);
    return label;
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

  hitObstacle(player) {
    this.scene.pause();
    this.meterLabel.pauseMeter();
    this.meterLabel.setText(
      `GAME OVER :  \nYour Score is ${this.formatDistance(this.meterLabel.timeElapsed)}`,
    );
    localStorage.setItem('score', this.formatDistance(this.meterLabel.timeElapsed));

    // if (localStorage.getItem('token')) {
    //   this.updateScore(this.formatDistance(this.meterLabel.timeElapsed));
    // }

    this.matter.pause();
    player.setTint(0xff0000);

    this.scene.pause();
    this.scene.launch('game-over');

  }

  pauseGame() {
    this.meterLabel.pauseMeter();
    this.scene.pause();
    this.scene.launch('pause-menu');
  }
}
export default GameScene;
