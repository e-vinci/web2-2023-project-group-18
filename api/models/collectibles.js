const { queryExecute } = require('../utils/db');

function getCollectible(user) {
  return queryExecute(`SELECT c.nbre_collectible FROM projet.collectibles c, projet.users u WHERE c.user_id = u.id_user AND u.username = '${user}'`);
}

function addCollectible(user, newCollectible) {
  return queryExecute(`SELECT projet.add_collectible('${user}', '${newCollectible}')`);
}

function suppCollectible(user, newCollectible) {
  return queryExecute(`SELECT projet.supp_collectible('${user}', '${newCollectible}')`);
}

module.exports = { getCollectible, addCollectible, suppCollectible };
