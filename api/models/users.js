const { queryExecute } = require('../utils/db');

function insertNewUser(username, password) {
  return queryExecute(`SELECT projet.insert_user('${username}', '${password}');`);
}

function getSpecifiqueUser(id) {
  return queryExecute(`SELECT u.username, u.password FROM projet.users u WHERE u.id_user = ${id}`);
}

module.exports = { getSpecifiqueUser, insertNewUser };
