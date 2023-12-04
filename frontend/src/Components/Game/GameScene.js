import Phaser from 'phaser';
// import ScoreLabel from './ScoreLabel';
import BombSpawner from './BombSpawner';
import platformAsset from '../../assets/platform.png';
import starAsset from '../../assets/star.png';
import bombAsset from '../../assets/bomb.png';
import dudeAsset from '../../assets/dude.png';
import pauseButton from '../../assets/pauseButton.png';
import Settings from '../../utils/settings';
import TimeLabel from './TimeLabel';

const GROUND_KEY = 'ground';
const DUDE_KEY = 'dude';
const STAR_KEY = 'star';
const BOMB_KEY = 'bomb';
const PAUSE_BUTTON  = 'pause';

class GameScene extends Phaser.Scene {
  constructor() {
    super('game-scene');
    this.player = undefined;
    this.cursors = undefined;
    // this.scoreLabel = undefined;
    this.timeLabel = undefined;
    this.stars = undefined;
    this.bombSpawner = undefined;
    this.gameOver = false;
    this.pauseButton = undefined;
  }

  preload() {
    this.load.image(GROUND_KEY, platformAsset);
    this.load.image(STAR_KEY, starAsset);
    this.load.image(BOMB_KEY, bombAsset);

    this.load.spritesheet(DUDE_KEY, dudeAsset, {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.image(PAUSE_BUTTON, pauseButton);
  }

  create() {
    const platforms = this.createPlatforms();
    this.player = this.createPlayer();
    this.stars = this.createStars();
    // this.scoreLabel = this.createScoreLabel(20, 20, 0);
    this.timeLabel = this.createTimeLabel(20,20);
    // this.scoreLabel.setColor('#ffffff');
    this.timeLabel.setColor('#ffffff');

    this.bombSpawner = new BombSpawner(this, BOMB_KEY);
    const bombsGroup = this.bombSpawner.group;
    this.physics.add.collider(this.stars, platforms);
    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(bombsGroup, platforms);
    this.physics.add.collider(this.player, bombsGroup, this.hitBomb, null, this);
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.key = this.input.keyboard.addKey('SPACE');

    // pause btn
    this.pauseButton = this.add.image((this.scale.width-75),50,PAUSE_BUTTON);
    this.pauseButton.setInteractive({useHandCursor: true});
    this.pauseButton.setScale(0.8);
    this.pauseButton.on('pointerdown', () => {
      this.timeLabel.pauseOrResumeTimer();
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

  createStars() {
    const stars = this.physics.add.group({
      key: STAR_KEY,
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    stars.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    return stars;
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

    this.bombSpawner.spawn(player.x);
  }

  // createScoreLabel(x, y, score) {
  //   const style = { fontSize: '32px', fill: '#000', position: 'absolute',right : '0',top: '0', margin : '1em'};
  //   const label = new ScoreLabel(this, x, y, score, style);
    

  //   return label;
  // }

  createTimeLabel(x, y) {
    
    const label = new TimeLabel(this, x, y);
    this.add.existing(label);

    return label;
  };

  hitBomb(player) {
    this.timeLabel.pauseOrResumeTimer();
    this.timeLabel.setText(`GAME OVER :  \nYour Score was ${this.timeFormat(this.timeLabel.timeElapsed)}`);
    localStorage.setItem('score', this.timeFormat(this.timeLabel.timeElapsed));
    if (localStorage.getItem('token')) {
      this.updateScore(this.timeFormat(this.timeLabel.timeElapsed));
    }
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    this.gameOver = true;

  }

  // eslint-disable-next-line class-methods-use-this
  timeFormat(timeElapsed){
  const minutes = `0${Math.floor(timeElapsed / 60)}`.slice(-2);
  const seconds = `0${Math.floor(timeElapsed % 60)}`.slice(-2);
  return `${minutes}:${seconds}`;
};

  pauseGame() {
    this.scene.pause();
    this.scene.launch('pause-menu');
    this.gameOver = false;
  }

  // eslint-disable-next-line class-methods-use-this
  async updateScore(score) {

    const user = localStorage.getItem('username') ;

    const options = {
      method: 'PUT',
      body: JSON.stringify({
        user,
        score,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(`${process.env.API_BASE_URL}/scores/`, options);
    
    if (!response.ok) {
      throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    } 
  }
}

export default GameScene;
