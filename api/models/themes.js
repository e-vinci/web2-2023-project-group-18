const { queryExecute } = require('../utils/db');

function getAllThemes() {
  return queryExecute('SELECT * FROM projet.get_all_themes;');
}

function getUserThemes(user) {
  return queryExecute(`SELECT * FROM projet.themes t, projet.users_themes ut WHERE ut.id_user = ${user} AND t.id_theme = ut.id_theme`);
}

function addUserTheme(user, theme) {
  return queryExecute(`SELECT projet.add_user_theme(${user}, ${theme})`);
}

module.exports = { getAllThemes, getUserThemes, addUserTheme };
