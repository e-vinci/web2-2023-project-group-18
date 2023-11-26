import Phaser from 'phaser';
import ScoreLabel from './ScoreLabel';
import BombSpawner from './BombSpawner';
import starAsset from '../../assets/star.png';
import bombAsset from '../../assets/bomb.png';
import dudeAsset from '../../assets/dude.png';
import pauseButton from '../../assets/pauseButton.png';
import Settings from '../../utils/settings';
import slope1Asset from '../../assets/winterTiles/tundraHillRight.png';
import slope2Asset from '../../assets/winterTiles/tundraHillRight2.png';
import groundAsset from '../../assets/winterTiles/tundraCenter.png';

const SLOPE1_KEY = 'slope1';
const SLOPE2_KEY = 'slope2';
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
    this.scoreLabel = undefined;
    this.stars = undefined;
    this.bombSpawner = undefined;
    this.gameOver = false;
    this.pauseButton = undefined;
  }

  preload() {
    this.load.image(SLOPE1_KEY, slope1Asset);
    this.load.image(SLOPE2_KEY, slope2Asset);
    this.load.image(GROUND_KEY, groundAsset);
    this.load.image(STAR_KEY, starAsset);
    this.load.image(BOMB_KEY, bombAsset);

    this.load.spritesheet(DUDE_KEY, dudeAsset, {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.image(PAUSE_BUTTON, pauseButton);
  }

  create() {
    const slope = this.createSlope();
    this.player = this.createPlayer();
    this.stars = this.createStars();
    this.scoreLabel = this.createScoreLabel(20, 20, 0);
    this.scoreLabel.setColor('#ffffff');
    this.bombSpawner = new BombSpawner(this, BOMB_KEY);
    const bombsGroup = this.bombSpawner.group;
    this.physics.add.collider(this.stars, slope);
    this.physics.add.collider(this.player, slope);
    this.physics.add.collider(bombsGroup, slope);
    this.physics.add.collider(this.player, bombsGroup, this.hitBomb, null, this);
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.key = this.input.keyboard.addKey('SPACE');
    this.pauseButton = this.add.image(1480,50,PAUSE_BUTTON);
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

  createSlope() {
    const platforms = this.physics.add.staticGroup();

    const tileWidth = 70; // Largeur de la tuile en pixels
    const tileHeight = 70; // Hauteur de la tuile en pixels
    const numColumns = 10; // Nombre de colonnes pour l'escalier

    const x = 0; // Position horizontale initiale
    let y = 800 - tileHeight; // Position verticale initiale

    for (let i = numColumns; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            let key = GROUND_KEY;

            if (j === i - 2) {
                key = SLOPE2_KEY;
            } else if (j === i - 1) {
                key = SLOPE1_KEY;
            }

            const platform = platforms.create(x + j * tileWidth, y, key);
            platform.setOrigin(0, 0); // Ajuste l'origine de chaque tuile
        }
        y -= tileHeight; // Déplace la position verticale vers le haut pour la prochaine colonne
    }

    return platforms; // Renvoie le groupe de plateformes (escalier)
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
    this.scoreLabel.add(10);
    if (this.stars.countActive(true) === 0) {
      //  A new batch of stars to collect
      this.stars.children.iterate((child) => {
        child.enableBody(true, child.x, 0, true, true);
      });
    }

    this.bombSpawner.spawn(player.x);
  }

  createScoreLabel(x, y, score) {
    const style = { fontSize: '32px', fill: '#000' };
    const label = new ScoreLabel(this, x, y, score, style);
    this.add.existing(label);

    return label;
  }

  hitBomb(player) {
    this.scoreLabel.setText(`GAME OVER : ( \nYour Score = ${this.scoreLabel.score}`);
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    this.gameOver = true;
  }

  pauseGame() {
    this.scene.pause();
    this.scene.launch('pause-menu');
  }
}

export default GameScene;
