import Phaser from 'phaser';
import replayButton from '../../assets/replayButton.png';
import homeButton from '../../assets/homeButton.png';
import restartButton from '../../assets/restartButton.png';
// import HomePage from '../Pages/HomePage';


const REPLAY_BUTTON = 'replay';
const HOME_BUTTON = 'home';
const RESTART_BUTTON = 'restart';


class PauseMenuScene extends Phaser.Scene {
    constructor() {
        super('pause-menu');
        this.replayButton = undefined;
        this.homeButton = undefined;
        this.restartButton = undefined;
    }

    preload () {
        this.load.image(REPLAY_BUTTON, replayButton);
        this.load.image(HOME_BUTTON, homeButton);
        this.load.image(RESTART_BUTTON, restartButton);
    }

    create() {
        const backgroundShadow = this.add.rectangle(400,300,800,600,0x000000,0.7);
        backgroundShadow.setOrigin(0.5);

        const title = this.add.text(400,50,'SANTA FALL', {
            fontFamily: 'roboto',
            fontSize: '50px'
        });
        title.setOrigin(0.5);

        const textPause = this.add.text(400,150,'PAUSE', {
            fontFamily: 'roboto',
            fontSize: '40px',
        });
        textPause.setOrigin(0.5);

        this.restartButton = this.add.image(300,300,RESTART_BUTTON);
        this.restartButton.setScale(0.7);
        this.restartButton.setInteractive({useHandCursor: true});
        this.restartButton.on('pointerdown', () => {
            this.restartGame();
        })

        this.homeButton = this.add.image(500,300, HOME_BUTTON);
        this.homeButton.setScale(0.7);
        this.homeButton.setInteractive({useHandCursor: true});
        this.homeButton.on('pointerdown', () => {
            this.goHome();
        })

        this.replayButton = this.add.image(400,400, REPLAY_BUTTON);
        this.replayButton.setScale(0.7);
        this.replayButton.setInteractive({useHandCursor: true});
        this.replayButton.on('pointerdown', () => {
            this.replayGame();
        })
    }

    restartGame() {
        this.scene.stop('pause-menu');
        this.scene.resume('game-scene');
    }

    goHome() {
        this.scene.stop('pause-menu');
        window.location.href = '../Pages/HomePage.js';
    }

    replayGame() {
        this.scene.stop('pause-menu');
        this.scene.launch('game-scene');
    }

}

export default PauseMenuScene;
