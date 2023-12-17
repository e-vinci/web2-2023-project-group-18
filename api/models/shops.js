const { queryExecute } = require('../utils/db');

// skins
function getAllSkins() {
  return queryExecute('SELECT * FROM projet.get_all_skins;');
}

function getUserSkins(user) {
  return queryExecute(`SELECT s.* FROM projet.skins s, projet.users_skins us WHERE us.id_user = ${user} AND s.id_skin = us.id_skin`);
}

function addUserSkin(user, skin) {
  return queryExecute(`SELECT projet.add_user_skin(${user}, ${skin})`);
}

// themes
function getAllThemes() {
  return queryExecute('SELECT * FROM projet.get_all_themes;');
}

function getUserThemes(user) {
  return queryExecute(`SELECT t.* FROM projet.themes t, projet.users_themes ut WHERE ut.id_user = ${user} AND t.id_theme = ut.id_theme`);
}

function addUserTheme(user, theme) {
  return queryExecute(`SELECT projet.add_user_theme(${user}, ${theme})`);
}

module.exports = {
  getAllSkins, getUserSkins, addUserSkin, getAllThemes, getUserThemes, addUserTheme,
};
