const { queryExecute } = require('../utils/db');

function getAllScores() {
  return queryExecute('SELECT * FROM projet.display_scores;');
}

function updateScore(user, newScore) {
  return queryExecute(`SELECT projet.user_change_score('${user}', ${newScore})`);
}

module.exports = { getAllScores, updateScore };
