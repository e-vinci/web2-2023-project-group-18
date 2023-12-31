import Phaser from 'phaser';
// eslint-disable-next-line import/no-named-as-default
import GameScene from '../Game/GameScene';
import PauseSceneMenu from '../Game/PauseSceneMenu';
import StartMenuScene from '../Game/StartMenuScene';
import GameOverScene from '../Game/GameOverScene';
import { clearPage } from '../../utils/render';

let game;

const GamePage = () => {
clearPage();
const phaserGame = `
<div id="gameDiv" class="d-flex justify-content-center"> </div>`;

  const main = document.querySelector('main');
  main.innerHTML = phaserGame;

  const config = {
    type: Phaser.AUTO,
    height: '100%',
    width: '100%',
    transparent: true,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: 'GamePage',
    },
    physics: {
      default: 'matter',
      matter: {
        debug: false,
        gravity: {
          y: 1
      },
      },
    },

    scene: [StartMenuScene, GameScene, PauseSceneMenu, GameOverScene],

    //  parent DOM element into which the canvas created by the renderer will be injected.
    parent: 'gameDiv',
  };

  // there could be issues when a game was quit (events no longer working)
  // therefore destroy any started game prior to recreate it
  if (game) game.destroy(true);
  game = new Phaser.Game(config);
  window.focus();

};

export default GamePage;