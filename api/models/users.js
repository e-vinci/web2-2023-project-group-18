const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { queryExecute } = require('../utils/db');

const lifetimeJwt = 24 * 60 * 60 * 1000; // in ms : 24 * 60 * 60 * 1000 = 24h

const saltRounds = 10;

function genToken(username) {
  return jwt.sign(
    { username }, // payload
    process.env.JWT_SECRET, // signature
    { expiresIn: lifetimeJwt }, // lifetime
  );
}

async function login(username, password) {
  const userFound = await readOneUserFromUsername(username);
  if (!userFound) return undefined;

  const dbPassword = userFound.password;

  const passwordMatch = await bcrypt.compare(password, dbPassword);
  if (!passwordMatch) return undefined;

  const token = genToken(username);

  const authenticatedUser = {
    username,
    token,
  };

  return authenticatedUser;
}

async function register(username, password) {
  const userFound = await readOneUserFromUsername(username);
  if (userFound) return undefined;
  await createOneUser(username, password);

  const token = genToken(username);

  const authenticatedUser = {
    username,
    token,
  };

  return authenticatedUser;
}

async function readOneUserFromUsername(username) {
  const response = await queryExecute(`SELECT * FROM projet.users u WHERE u.username = '${username}';`);
  if (response.rowCount < 0) return undefined;
  return response.rows[0];
}

async function createOneUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  await queryExecute(`INSERT INTO projet.users (username, password) VALUES ('${username}', '${hashedPassword}');`);

  const user = await readOneUserFromUsername(username);

  const createdUser = {
    id: user.id_user,
    username: user.username,
    password: hashedPassword,
  };

  return createdUser;
}

module.exports = {
  login,
  register,
  readOneUserFromUsername,
};
