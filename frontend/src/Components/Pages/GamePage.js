import Phaser from 'phaser';
import GameScene from '../Game/GameScene';
import PauseSceneMenu from '../Game/PauseSceneMenu';
import StartMenuScene from '../Game/StartMenuScene';

let game;

const GamePage = () => {
  const phaserGame = `
<div id="gameDiv" class="d-flex justify-content-center"> </div>`;

  const main = document.querySelector('main');
  main.innerHTML = phaserGame;

  const config = {
    type: Phaser.AUTO,
    width: 1536,
    height: 650,
    transparent: true,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: false,
      },
    },

    scene: [StartMenuScene, GameScene,PauseSceneMenu],

    //  parent DOM element into which the canvas created by the renderer will be injected.
    parent: 'gameDiv',
  };

  // there could be issues when a game was quit (events no longer working)
  // therefore destroy any started game prior to recreate it
  if (game) game.destroy(true);
  game = new Phaser.Game(config);
};

export default GamePage;
