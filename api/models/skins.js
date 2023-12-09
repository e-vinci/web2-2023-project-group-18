const { queryExecute } = require('../utils/db');

function getAllSkins() {
  return queryExecute('SELECT * FROM projet.get_all_skins;');
}

function getUserSkins(user) {
  return queryExecute(`SELECT * FROM projet.skins s, projet.users_skins us WHERE us.id_user = ${user} AND s.id_skin = us.id_skin`);
}

function addUserSkin(user, skin) {
  return queryExecute(`SELECT projet.add_user_skin(${user}, ${skin})`);
}

module.exports = { getAllSkins, getUserSkins, addUserSkin };
