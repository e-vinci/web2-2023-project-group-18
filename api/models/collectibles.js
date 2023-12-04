const { queryExecute } = require('../utils/db');

function getCollectible(user) {
  return queryExecute(`SELECT c.nbre_collectible FROM projet.collectibles c WHERE c.user_id = ${user}`);
}

function addCollectible(user, collectible) {
  return queryExecute(`SELECT projet.add_collectible(${user}, ${collectible})`);
}

function suppCollectible(user, collectible) {
  return queryExecute(`SELECT projet.supp_collectible(${user}, ${collectible})`);
}

module.exports = { getCollectible, addCollectible, suppCollectible };
