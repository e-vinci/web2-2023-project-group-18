import Phaser from 'phaser';
import replayButton from '../../assets/replayButton.png';
import homeButton from '../../assets/homeButton.png';
import restartButton from '../../assets/restartButton.png';
import parametersButton from '../../assets/parametersButton.png';


const REPLAY_BUTTON = 'replay';
const HOME_BUTTON = 'home';
const RESTART_BUTTON = 'restart';
const PARAMETERS_BUTTON = 'parameters';


class PauseMenuScene extends Phaser.Scene {
    constructor() {
        super('pause-menu');
        this.replayButton = undefined;
        this.homeButton = undefined;
        this.restartButton = undefined;
        this.parametersButton = undefined;
    }

    preload () {
        this.load.image(REPLAY_BUTTON, replayButton);
        this.load.image(HOME_BUTTON, homeButton);
        this.load.image(RESTART_BUTTON, restartButton);
        this.load.image(PARAMETERS_BUTTON, parametersButton);
    }

    create() {
        const backgroundShadow = this.add.rectangle(768,315,1536,660,0x000000,0.7);
        backgroundShadow.setOrigin(0.5);

        const title = this.add.text(768,50,'SANTA FALL', {
            fontFamily: 'roboto',
            fontSize: '80px'
        });
        title.setOrigin(0.5);

        const textPause = this.add.text(768,200,'PAUSE', {
            fontFamily: 'roboto',
            fontSize: '60px',
        });
        textPause.setOrigin(0.5);

        this.restartButton = this.add.image(512,350,RESTART_BUTTON);
        this.restartButton.setInteractive({useHandCursor: true});
        this.restartButton.on('pointerdown', () => {
            this.restartGame();
        })

        this.homeButton = this.add.image(1024,350, HOME_BUTTON);
        this.homeButton.setInteractive({useHandCursor: true});
        this.homeButton.on('pointerdown', () => {
            this.goHome();
        })

        this.replayButton = this.add.image(760,350, REPLAY_BUTTON);
        this.replayButton.setInteractive({useHandCursor: true});
        this.replayButton.on('pointerdown', () => {
            this.replayGame();
        })

        this.parametersButton = this.add.image(1500,600, PARAMETERS_BUTTON);
        this.parametersButton.setScale(0.7);
        this.parametersButton.setInteractive({useHandCursor: true});
        this.parametersButton.on('pointerdown', () => {
            this.goParameters();
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
