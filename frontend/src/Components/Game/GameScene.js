import Phaser from 'phaser';
import simplify from 'simplify-js';

import Skin from '../../utils/skins';
import obstacleSmall from '../../assets/winterTheme/caneRedSmall.png'; // TODO import la classe de biome et extraire les 3 obstacles
import obstacleMedium from '../../assets/winterTheme/pineSapling.png'; // TODO import la classe de biome et extraire les 3 obstacles
import obstacleFlat from '../../assets/winterTheme/spikesBottomAlt.png'; // TODO import la classe de biome et extraire les 3 obstacles
import coinAsset from '../../assets/coin.png';

import Settings from '../../utils/settings';
import ScorePauseScene from './ScorePauseScene';

const GROUND_KEY = 'groundLabel';
const COIN_KEY = 'coinLabel';
const OBSTACLE_KEY = 'obstacleLabel';
const OBSTACLE_SMALL_KEY = 'obstacleSmall';
const OBSTACLE_MEDIUM_KEY = 'obstacleMedium';
const OBSTACLE_FLAT_KEY = 'obstacleFlat';

const GROUND_COLOR = 0xdefbff; // TODO import from la classe de biome
const GROUND_TOP_LAYER_COLOR = 0xc9edf0; // TODO import from la classe de biome

const DUDE_KEY = 'dude';
const DUDE_ASSET_WIDTH = 25;
const DUDE_ASSET_HEIGHT = 40;

const gameOptions = {
  amplitude: 300,
  slopeLength: [300, 800], 
  slicesAmount: 3,
  slopesPerSlice: 5,
  obstacleRatio: 10,
  coinRatio: 20,
  amountCoin: 10 
};

class GameScene extends Phaser.Scene {
  dude = Phaser.Physics.Matter.Sprite;

  obstacleSmall = Phaser.Physics.Matter.Sprite;

  obstacleMedium = Phaser.Physics.Matter.Sprite;

  obstacleFlat = Phaser.Physics.Matter.Sprite;

  constructor() {
    super('game-scene');
    this.player = undefined;
    this.caracterSpeed = undefined;
    this.cursors = undefined;
    this.meterLabel = undefined;
    this.coinLabel = undefined;
    this.coins = [];
    this.scorePauseScene = undefined;
    this.gameOver = false;
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.scorePauseScene = this.scene.add('pause-score', ScorePauseScene, true);
  }

  preload() {
    this.load.atlas(DUDE_KEY, Skin.getSkinPicture(), Skin.getSkinJSON());

    this.load.image(COIN_KEY, coinAsset);
    this.load.image(OBSTACLE_SMALL_KEY, obstacleSmall);
    this.load.image(OBSTACLE_MEDIUM_KEY, obstacleMedium);
    this.load.image(OBSTACLE_FLAT_KEY, obstacleFlat);
  }

  create() {
    // Generating Ground and its Collision
    this.bodyPool = [];
    this.bodyPoolId = [];
    this.obstaclePool = [];
    this.obstaclePoolId = [];
    this.slopeGraphics = [];
    this.sliceStart = new Phaser.Math.Vector2(0, 2);
    for (let i = 0; i < gameOptions.slicesAmount; i += 1) {
      this.slopeGraphics[i] = this.add.graphics();
      this.sliceStart = this.createSlope(this.slopeGraphics[i], this.sliceStart);
    }

    this.dude = this.matter.add
      .sprite(1500, 500, DUDE_KEY, null, {
        shape: { type: 'rectangle', width: DUDE_ASSET_WIDTH, height: DUDE_ASSET_HEIGHT },
      })
      .play('player-idle')
      .setFixedRotation();

    this.dude.setOnCollide(() => {
      this.isTouchingGround = true;
    });

    // CheckCollision
    this.matter.world.on(
      'collisionstart',
      (event, bodyA, bodyB) => this.checkCollision(bodyA, bodyB),
      this,
    );
    this.matter.world.on(
      'collisionactive',
      (event, bodyA, bodyB) => this.checkCollision(bodyA, bodyB),
      this,
    );
    this.matter.world.on(
      'collisionend',
      (event, bodyA, bodyB) => this.checkCollision(bodyA, bodyB),
      this,
    );

    this.createDudeAnimations();

    this.cameras.main.startFollow(this.dude);
    this.updateCameraZoom();

    window.addEventListener('resize', () => {
      this.updateCameraZoom();
    });

    this.key = this.input.keyboard.addKey(localStorage.getItem('selectedKey'));

    this.caracterSpeed = 5;
    setInterval(() => {
      this.caracterSpeed += Math.log(2) / 100;
    }, 2000);
  }

  updateCameraZoom() {
    const zoom = this.scale.width / 800; // Ajustez le nombre en fonction de nos besoins
    this.cameras.main.setZoom(zoom);
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
    // simplify the slope
    const simpleSlope = simplify(slopePoints, 1, true);

    // eslint-disable-next-line no-param-reassign
    graphics.x = sliceStart.x;
    // draw the ground
    graphics.clear();
    graphics.moveTo(0, 1000);
    graphics.fillStyle(GROUND_COLOR);
    graphics.beginPath();
    simpleSlope.forEach((point) => {
      graphics.lineTo(point.x, point.y);
    });
    graphics.lineTo(currentPoint, sliceStart.y * 1500);
    graphics.lineTo(0, sliceStart.y * 1500);
    graphics.closePath();
    graphics.fillPath();

    // draw the top layer
    graphics.lineStyle(16, GROUND_TOP_LAYER_COLOR);
    graphics.beginPath();
    simpleSlope.forEach((point) => {
      graphics.lineTo(point.x, point.y);
    });
    graphics.strokePath();

    // loop through all simpleSlope points starting from the second
    for (let i = 1; i < simpleSlope.length; i += 1) {
      // define a line between previous and current simpleSlope points
      const line = new Phaser.Geom.Line(
        simpleSlope[i - 1].x,
        simpleSlope[i - 1].y,
        simpleSlope[i].x,
        simpleSlope[i].y,
      );
      // calculate line length, which is the distance between the two points
      const distance = Phaser.Geom.Line.Length(line);
      // calculate the center of the line
      const center = Phaser.Geom.Line.GetPoint(line, 0.5);
      // calculate line angle
      const angle1 = Phaser.Geom.Line.Angle(line);

      // if the pool is empty...
      if (this.bodyPool.length === 0) {
        // create a new rectangle body
        this.matter.add.rectangle(center.x + sliceStart.x, center.y, distance, 10, {
          isStatic: true,
          angle: angle1,
          friction: 1,
          restitution: 0,
          label: GROUND_KEY,
        });
      }
      // if the pool is not empty...
      else {
        // get the body from the pool
        const body = this.bodyPool.shift();
        this.bodyPoolId.shift();

        // reset, reshape and move the body to its new position
        this.matter.body.setPosition(body, {
          x: center.x + sliceStart.x,
          y: center.y,
        });
        const length = body.area / 10;
        this.matter.body.setAngle(body, 0);
        this.matter.body.scale(body, 1 / length, 1);
        this.matter.body.scale(body, distance, 1);
        this.matter.body.setAngle(body, angle1);
      }

      // Generate objects
      if (this.scorePauseScene.meterLabel.timeElapsed > 1) {
        // spawn at 20m
        const centerX = center.x + sliceStart.x;
        const centerY = center.y;

        // add an obstacle
        if (i % 3 === 0 && Phaser.Math.Between(0, 100) < gameOptions.obstacleRatio) {
          // draw the obstacle
          graphics.fillRect(center.x, center.y, 5, 5);
          this.addObstacle(centerX, centerY);
        }
        // add a coin
        else if (i % 3 === 0 && Phaser.Math.Between(0, 100) < gameOptions.coinRatio) {
          this.addCoin(centerX, centerY);
        }
      }
    }

    // eslint-disable-next-line no-param-reassign
    graphics.width = (currentPoint - 1) * -1;
    return new Phaser.Math.Vector2(graphics.x + currentPoint - 1, slopeStartHeight);
  }

  // eslint-disable-next-line class-methods-use-this
  interpolate(vFrom, vTo, delta) {
    const interpolation = (1 - Math.cos(delta * Math.PI)) * 0.5;
    return vFrom * (1 - interpolation) + vTo * interpolation;
  }

  update() {
    const dude1 = this.dude;

    dude1.x += this.caracterSpeed;
    dude1.play('player-slide', true);
    const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space);

    if (localStorage.getItem('resume')) {
      this.scorePauseScene.meterLabel.resumeMeter();
      localStorage.removeItem('resume');
    }

    if (this.cursors.space.isDown) this.dude.play('player-jump', true);

    if (this.isTouchingGround && spaceJustPressed) {
      this.dude.setVelocityY(-10);
      this.dude.setVelocityX(this.caracterSpeed);
      this.isTouchingGround = false;
    }

    if (this.cursors.right.isDown) {
      this.dude.play('player-run', true);
    }

    const key = Settings.getKey();
    if (Phaser.Input.Keyboard.KeyCodes[key] !== this.key.keyCode) {
      this.key.destroy();
      this.key = this.input.keyboard.addKey(key);
    }

    // loop through all mountains
    this.slopeGraphics.forEach((item) => {
      // if the mountain leaves the screen to the left...
      if (this.cameras.main.scrollX > item.x + item.width + 7000) {
        // reuse the mountain
        this.sliceStart = this.createSlope(item, this.sliceStart);
      }
    });

    // get all bodies
    const { bodies } = this.matter.world.localWorld;

    // loop through all bodies
    bodies.forEach((body) => {
      // if the body is out of camera view to the left side && it's not in the current ground pool && it's a ground body
      if (
        this.cameras.main.scrollX > body.position.x + 200 &&
        this.bodyPoolId.indexOf(body.id) === -1 &&
        body.label === GROUND_KEY
      ) {
        // add the body to the ground pool
        this.bodyPool.push(body);
        this.bodyPoolId.push(body.id);
      }
      // if the body is out of camera view to the left side && it's not in the current obstacle pool && it's an obstacle body
      else if (
        this.cameras.main.scrollX > body.position.x + 200 &&
        this.obstaclePoolId.indexOf(body.id) === -1 &&
        body.label === OBSTACLE_KEY
      ) {
        // add the body to the pines pool
        this.obstaclePool.push(body);
        this.obstaclePoolId.push(body.id);
      }
      // if the body is out of camera view to the left side && it's a coin body
      else if (this.cameras.main.scrollX > body.position.x && body.label === COIN_KEY) {
        // Delete the coin body
        body.gameObject.destroy();
      }
    });

    if (!this.scene.isActive('pause-menu')) {
      this.scene.setActive(true, 'pause-menu');
    }
  }

  createDudeAnimations() {
    this.anims.create({
      key: 'player-idle',
      frames: [{ key: DUDE_KEY, frame: 'idle_1.png' }],
    });

    // run animation
    this.anims.create({
      key: 'player-run',
      frameRate: 5,
      frames: this.anims.generateFrameNames(DUDE_KEY, {
        start: 1,
        end: 4,
        prefix: 'run_',
        suffix: '.png',
      }),
      repeat: -1,
    });

    // slide animaion
    this.anims.create({
      key: 'player-slide',
      frameRate: 5,
      frames: this.anims.generateFrameNames(DUDE_KEY, {
        start: 1,
        end: 5,
        prefix: 'slide_',
        suffix: '.png',
      }),
      repeat: -1,
    });

    // jump animation
    this.anims.create({
      key: 'player-jump',
      frameRate: 5,
      frames: this.anims.generateFrameNames(DUDE_KEY, {
        start: 1,
        end: 8,
        prefix: 'jump_',
        suffix: '.png',
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
    this.scene.stop();
    this.scorePauseScene.meterLabel.setText(
      `GAME OVER :  \nYour Score is ${this.formatDistance(
        this.scorePauseScene.meterLabel.timeElapsed,
      )}`,
    );

    if (localStorage.getItem('token')) {
      this.updateScore(this.scorePauseScene.meterLabel.timeElapsed);
      this.scorePauseScene.coinLabel.updateCoinDb();
    }

    this.matter.pause();
    player.setTint(0xff0000);

    this.scene.stop('game-scene');
    this.scene.stop('pause-score');
    this.scene.run('game-over', {
      score: this.formatDistance(this.scorePauseScene.meterLabel.timeElapsed),
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async updateScore(newScore) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    const options = {
      method: 'PUT',
      body: JSON.stringify({
        user,
        score: newScore,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    await fetch(`${process.env.API_BASE_URL}/scores`, options);
  }

  addCoin(coinX, coinY) {
    const coin = this.matter.add.image(coinX + 20, coinY - 55, COIN_KEY, null);
    coin.setCircle();
    coin.setStatic(true);
    coin.body.label = COIN_KEY;
    this.coins.push(coin);
  }

  addObstacle(obstacleX, centerY) {
    const obstacleY = centerY - 30;
    // if the pool is empty...
    if (this.obstaclePool.length === 0) {
      // choose which obstacle to add
      let obstacle;
      switch (Math.floor(Math.random() * 3)) {
        case 0:
          obstacle = OBSTACLE_SMALL_KEY;
          break;
        case 1:
          obstacle = OBSTACLE_MEDIUM_KEY;
          break;
        case 2:
          obstacle = OBSTACLE_FLAT_KEY;
          break;
        default:
          obstacle = OBSTACLE_MEDIUM_KEY;
      }

      // create a new obstacle body
      this.matter.add.image(obstacleX, obstacleY, obstacle, null, {
        isStatic: true,
        friction: 1,
        restitution: 0,
        collisionFilter: {
          category: 2,
        },
        label: OBSTACLE_KEY,
      });
    }
    // ...else get the obstacle from the pool
    else {
      const obstacleBody = this.obstaclePool.shift();
      this.obstaclePoolId.shift();

      // move the obstacle body to its new position
      this.matter.body.setPosition(obstacleBody, {
        x: obstacleX,
        y: obstacleY,
        isStatic: true,
        friction: 1,
        restitution: 0,
      });
    }
  }

  checkCollision(a, b) {
    if (a.label === COIN_KEY && a.gameObject !== null && a.gameObject !== undefined) {
      a.gameObject.destroy();
      this.scorePauseScene.coinLabel.add(gameOptions.amountCoin);
    }

    if (b.label === COIN_KEY && b.gameObject !== null && b.gameObject !== undefined) {
      b.gameObject.destroy();
      this.scorePauseScene.coinLabel.add(gameOptions.amountCoin);
    }
    if (a.label === OBSTACLE_KEY && a.gameObject !== null && a.gameObject !== undefined) {
      this.hitObstacle(this.dude);
    }

    if (b.label === OBSTACLE_KEY && b.gameObject !== null && b.gameObject !== undefined) {
      this.hitObstacle(this.dude);
    }
  }
}

export default GameScene;