/* eslint-disable no-underscore-dangle */
import Phaser from 'phaser';

export default class PineSpawner {
  /**
   * @param {Phaser.Scene} scene
   */
  constructor(scene, pinekey = 'pineSpawning') {
    this.scene = scene;
    this.key = pinekey;
    this._group = this.scene.physics.add.group();
    this.lastSpawnX = 400;

    this.spawnTimer = this.setupRandomSpawnTimer();
  }

  get group() {
    return this._group;
  }

  setupRandomSpawnTimer() {
    const minSpawnInterval = 2000; // 2 secondes
    const maxSpawnInterval = 4500; // 4.5 secondes

    // Fonction pour générer un intervalle aléatoire
    const getRandomSpawnInterval = () => Phaser.Math.Between(minSpawnInterval, maxSpawnInterval);

    // Fonction de spawn qui met en place un nouveau timer à chaque appel
    const spawnFunction = () => {
      this.spawn();
      this.spawnTimer = setTimeout(spawnFunction, getRandomSpawnInterval());
    };

    // Démarrage du premier spawn après un intervalle initial aléatoire
    this.spawnTimer = setTimeout(spawnFunction, getRandomSpawnInterval());

    return this.spawnTimer;
  }

  spawn() {
    const playerX = this.scene.player.x;
    const respawnDistance = Phaser.Math.Between(200, 400); // Ajustez cette plage au besoin

    const x = playerX + respawnDistance;

    const pine = this._group.create(x, 630, this.key);
    pine.setCollideWorldBounds(true);
    pine.setVelocity(Phaser.Math.Between(-200, -100), 10);

    return pine;
  }

  removePine(pine) {
    // Remove the pine from the group
    this._group.remove(pine,true,true);
  }

  stopSpawning() {
    // Arrêtez l'intervalle lorsque vous n'en avez plus besoin (par exemple, à la fin du jeu)
    clearInterval(this.spawnTimer);
  }
}
