const { queryExecute } = require('../utils/db');

function getCollectible(user) {
  return queryExecute('SELECT projet.get_collectible($1)', [user]);
}

function addCollectible(user, newCollectible) {
  return queryExecute('SELECT projet.add_collectible($1, $2)', [user, newCollectible]);
}

module.exports = { getCollectible, addCollectible };
