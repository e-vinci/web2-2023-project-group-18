// eslint-disable-next-line max-classes-per-file
import Phaser from 'phaser';
// eslint-disable-next-line import/no-extraneous-dependencies
import simplify from 'simplify-js';
import dudeAsset from '../../assets/santa.png'
import CoinLabel from './CoinLabel';
import coinAsset from '../../assets/coin.png';
import coinHudAsset from '../../assets/hudcoin.png';
import pauseButton from '../../assets/pauseButton.png';
import Settings from '../../utils/settings';
import MeterLabel from './MeterLabel';
import dudeAssetJSON from '../../assets/santa.json';
import pineSapling from '../../assets/winterTiles/pineSapling.png'

const COIN_KEY = 'coin';
const HUD_COIN_KEY = 'hudcoin';
const PAUSE_BUTTON = 'pause';


const gameOptions = {
  amplitude: 300,
  slopeLength: [300, 600],
  slicesAmount: 3,
  slopesPerSlice: 5,
  terrainSpeed: 200,
  // rocks ratio, in %
  pineRatio: 5,
  amountCoin: 10
};


class GameScene extends Phaser.Scene {
  santa = Phaser.Physics.Matter.Sprite;

  pineSapling = Phaser.Physics.Matter.Sprite;

  constructor() {
    super('game-scene');
    this.player = undefined;
    this.cursors = undefined;
    this.stars = undefined;
    this.meterLabel = undefined;
    this.coinLabel = undefined;
    this.coins = [];
    this.gameOver = false;
    this.scorePauseScene = undefined;
  }

  init() {

    this.cursors = this.input.keyboard.createCursorKeys();
    // eslint-disable-next-line no-use-before-define
    this.scorePauseScene = this.scene.add('pause-score', ScorePauseScene, true);
  }

  preload() {
    this.load.atlas('santa', dudeAsset, dudeAssetJSON);
    this.load.image('pineSapling', pineSapling);
  }

  create() {
    this.createDudeAnimations();

    this.pinesPool = [];

     // Generating Ground and its Collision
     this.bodyPool = [];
     this.bodyPoolId = [];
     this.slopeGraphics = [];
     this.sliceStart = new Phaser.Math.Vector2(0, 2);
     for(let i = 0; i < gameOptions.slicesAmount; i+=1){
       this.slopeGraphics[i] = this.add.graphics();
       this.sliceStart = this.createSlope(this.slopeGraphics[i], this.sliceStart);
     }


    this.santa = this.matter.add
            .sprite(700, 450, 'santa')
            .play('player-idle')
            .setFixedRotation();

    this.santa.setOnCollide(() => {
      this.isTouchingGround = true;
    });

    this.cameras.main.startFollow(this.santa);


    this.key = this.input.keyboard.addKey(localStorage.getItem('selectedKey'));


}

  createSlope(graphics, sliceStart){
    const slopePoints = [];
    let slopes = 0;
    let slopeStart = 0;
    let slopeStartHeight = sliceStart.y;
    let currentSlopeLength = Phaser.Math.Between(gameOptions.slopeLength[0], gameOptions.slopeLength[1]);
    let slopeEnd = slopeStart + currentSlopeLength;
    let slopeEndHeight = slopeStartHeight + Math.random();
    let currentPoint = 0;
    while(slopes < gameOptions.slopesPerSlice){
      let y;
        if(currentPoint === slopeEnd){
            slopes +=1;
            slopeStartHeight = slopeEndHeight;
            slopeEndHeight = slopeStartHeight + Math.random();
            y = slopeStartHeight * gameOptions.amplitude;
            slopeStart = currentPoint;
            currentSlopeLength = Phaser.Math.Between(gameOptions.slopeLength[0], gameOptions.slopeLength[1]);
            slopeEnd += currentSlopeLength;
        }
        else{
            y = this.interpolate(slopeStartHeight, slopeEndHeight, (currentPoint - slopeStart) / (slopeEnd - slopeStart)) * gameOptions.amplitude;
        }
        slopePoints.push(new Phaser.Math.Vector2(currentPoint, y))
        currentPoint +=1;
    }
    // simplify the slope
    const simpleSlope = simplify(slopePoints, 1, true);

    // eslint-disable-next-line no-param-reassign
    graphics.x = sliceStart.x;
    // draw the ground
    graphics.clear();
    graphics.moveTo(0, 1000);
    graphics.fillStyle(0xdefbff);
    graphics.beginPath();
    simpleSlope.forEach(point => {
      graphics.lineTo(point.x, point.y);
  });
    graphics.lineTo(currentPoint, sliceStart.y *  1500);
    graphics.lineTo(0, sliceStart.y * 1500);
    graphics.closePath();
    graphics.fillPath();

    // draw the snow
    graphics.lineStyle(16, 0xc9edf0);
    graphics.beginPath();
    simpleSlope.forEach(point => {
      graphics.lineTo(point.x, point.y);
  });
    graphics.strokePath();

// loop through all simpleSlope points starting from the second
        for(let i = 1; i < simpleSlope.length; i+=1){
            // define a line between previous and current simpleSlope points
            const line = new Phaser.Geom.Line(simpleSlope[i - 1].x, simpleSlope[i - 1].y, simpleSlope[i].x, simpleSlope[i].y);
            // calculate line length, which is the distance between the two points
            const distance = Phaser.Geom.Line.Length(line);
            // calculate the center of the line
            const center = Phaser.Geom.Line.GetPoint(line, 0.5);
            // calculate line angle
            const angle1 = Phaser.Geom.Line.Angle(line);

            // if the pool is empty...
            if(this.bodyPool.length === 0){

                // create a new rectangle body
                this.matter.add.rectangle(center.x + sliceStart.x, center.y, distance, 10, {
                    isStatic: true,
                    angle: angle1,
                    friction: 1,
                    restitution: 0
                });
            }

            // if the pool is not empty...
            else{

                // get the body from the pool
                const body = this.bodyPool.shift();
                this.bodyPoolId.shift();

                // reset, reshape and move the body to its new position
                this.matter.body.setPosition(body, {
                    x: center.x + sliceStart.x,
                    y: center.y
                });
                const length = body.area / 10;
                this.matter.body.setAngle(body, 0)
                this.matter.body.scale(body, 1 / length, 1);
                this.matter.body.scale(body, distance, 1);
                this.matter.body.setAngle(body, angle1);
            }

        // random coin
        if(Phaser.Math.Between(0, 100) < 80 && (sliceStart.x > 0 || i !== 1)){
          const x = center.x + sliceStart.x + Phaser.Math.Between(20, 50);
          const y = center.y + sliceStart.y + (-50);
          this.addCoin(x, y);
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
    const santa1 = this.santa;

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
      this.santa.setVelocityY(-10);
      this.santa.setVelocityX(2);
      this.isTouchingGround = false;
    }

    const key = Settings.getKey();
    if (Phaser.Input.Keyboard.KeyCodes[key] !== this.key.keyCode) {
      this.key.destroy();
      this.key = this.input.keyboard.addKey(key);
    }

    // loop through all mountains
    this.slopeGraphics.forEach((item) =>{
 
      // if the mountain leaves the screen to the left...
      if(this.cameras.main.scrollX > item.x + item.width + 5000){

          // reuse the mountain
          this.sliceStart = this.createSlope(item, this.sliceStart)
      }
    });

     // get all bodies
     const {bodies} = this.matter.world.localWorld;

     // loop through all bodies
     bodies.forEach((body) =>{
         // if the body is out of camera view to the left side and is not yet in the pool..
         if(this.cameras.main.scrollX > body.position.x + 200 && this.bodyPoolId.indexOf(body.id) === -1){
             // ...add the body to the pool
             this.bodyPool.push(body);
             this.bodyPoolId.push(body.id);
         }
     });

    // Collect coin
    this.matter.world.on("collisionstart", (event, bodyA, bodyB) => this.collectCoin(bodyA, bodyB) , this);
    this.matter.world.on("collisionactive", (event, bodyA, bodyB) => this.collectCoin(bodyA, bodyB) , this);
    this.matter.world.on("collisionend", (event, bodyA, bodyB) => this.collectCoin(bodyA, bodyB) , this);
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

    this.scene.stop('pause-score');
    this.scene.stop('game-scene');
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
      // eslint-disable-next-line no-console
      console.log(response.status);
      throw new Error();
    }
  }



  addCoin(x, y) {
    const coin = this.matter.add.image(x, y, COIN_KEY, null);
    // Set hit box bigger
    // const coinRadius = 30;
    // coin.setCircle(coinRadius, {
    //   isSensor: true,
    //   label: COIN_KEY,
    // });
    coin.setCircle();
    coin.setStatic(true);
    coin.body.isSensor = true;
    coin.body.label = COIN_KEY;


    this.coins.push(coin);
  }

  collectCoin(a, b) {

    if (a.label === COIN_KEY && a.gameObject !== null && a.gameObject !== undefined) {
      a.gameObject.destroy();
      this.scorePauseScene.coinLabel.add(gameOptions.amountCoin);
    }

    if (b.label === COIN_KEY && b.gameObject !== null && b.gameObject !== undefined) {
        b.gameObject.destroy();
        this.scorePauseScene.coinLabel.add(gameOptions.amountCoin);
    }
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


  async updateDBCoins() {
    const coin = this.coinLabel.getCoin();
    // eslint-disable-next-line no-console
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
export default GameScene;

