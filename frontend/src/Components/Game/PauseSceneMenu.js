import Phaser from 'phaser';


class PauseMenuScene extends Phaser.Scene {
    constructor() {
        super('pause-menu');
    }

    create() {
        const backgroundShadow = this.add.rectangle(400,300,800,600,0x000000,0.7);
        backgroundShadow.setOrigin(0.5);

        const textPause = this.add.text(400,150,'PAUSE', {
            fontFamily: 'roboto',
            fontSize: '40px',
        });
        textPause.setOrigin(0.5);
    }

}

export default PauseMenuScene;
