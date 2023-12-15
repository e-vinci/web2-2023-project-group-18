/* eslint-disable no-irregular-whitespace */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const escape = require('escape-html');
const { queryExecute } = require('../utils/db');

const lifetimeJwt = 24 * 60 * 60 * 1000; // in ms : 24 * 60 * 60 * 1000 = 24h

const saltRounds = 10;

/** *************************************************************************************
* Title: genToken
*  Author: JS Teacher
* Date: 11/12/2023
*    Code version: 1.0
*  Availability: https://github.com/e-vinci/jwt-api-boilerplate/blob/main/models/users.js
*
************************************************************************************** */
function genToken(username) {
  return jwt.sign(
    { username }, // payload
    process.env.JWT_SECRET, // signature
    { expiresIn: lifetimeJwt }, // lifetime
  );
}

/** *************************************************************************************
* Title: login
*  Author: JS Teacher
* Date: 11/12/2023
*    Code version: 1.0
*  Availability: https://github.com/e-vinci/jwt-api-boilerplate/blob/main/models/users.js
*
************************************************************************************** */
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

/** *************************************************************************************
* Title: register
*  Author: JS Teacher
* Date: 11/12/2023
*    Code version: 1.0
*  Availability: https://github.com/e-vinci/jwt-api-boilerplate/blob/main/models/users.js
*
************************************************************************************** */
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

/** *************************************************************************************
* Title: regisreadOneUserFromUsernameter
*  Author: JS Teacher
* Date: 11/12/2023
*    Code version: 2.0
*  Availability: https://github.com/e-vinci/jwt-api-boilerplate/blob/main/models/users.js
*
************************************************************************************** */
async function readOneUserFromUsername(username) {
  const response = await queryExecute(`SELECT * FROM projet.users u WHERE u.username = '${username}';`);
  if (response.rowCount < 0) return undefined;
  return response.rows[0];
}

/** *************************************************************************************
* Title: createOneUser
*  Author: JS Teacher
* Date: 11/12/2023
*    Code version: 2.0
*  Availability: https://github.com/e-vinci/jwt-api-boilerplate/blob/main/models/users.js
*
************************************************************************************** */
async function createOneUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const cUsername = escape(username);
  await queryExecute(`SELECT projet.insert_user('${cUsername}', '${hashedPassword}')`);

  const user = await readOneUserFromUsername(cUsername);

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
