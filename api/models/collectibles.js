const { queryExecute } = require('../utils/db');

function getCollectible(user) {
  return queryExecute(`SELECT projet.get_collectible('${user}')`);
}

function addCollectible(user, newCollectible) {
  return queryExecute(`SELECT projet.add_collectible('${user}', ${newCollectible})`);
}

function suppCollectible(user, newCollectible) {
  return queryExecute(`SELECT projet.supp_collectible('${user}', ${newCollectible})`);
}

module.exports = { getCollectible, addCollectible, suppCollectible };
