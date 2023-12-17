const { queryExecute } = require('../utils/db');

// skins
function getAllSkins() {
  return queryExecute('SELECT * FROM projet.get_all_skins;');
}

function getUserSkins(user) {
  return queryExecute('SELECT s.* FROM projet.skins s, projet.users_skins us WHERE us.id_user = $1 AND s.id_skin = us.id_skin', [user]);
}

function addUserSkin(user, skin) {
  return queryExecute('SELECT projet.add_user_skin($1, $2)', [user, skin]);
}

// themes
function getAllThemes() {
  return queryExecute('SELECT * FROM projet.get_all_themes;');
}

function getUserThemes(user) {
  return queryExecute('SELECT t.* FROM projet.themes t, projet.users_themes ut WHERE ut.id_user = $1 AND t.id_theme = ut.id_theme', [user]);
}

function addUserTheme(user, theme) {
  return queryExecute('SELECT projet.add_user_theme($1, $2)', [user, theme]);
}

module.exports = {
  getAllSkins, getUserSkins, addUserSkin, getAllThemes, getUserThemes, addUserTheme,
};
