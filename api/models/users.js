// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const path = require('node:path');
const { queryExecute } = require('../utils/db');

// const { parse } = require('../utils/json');
// const { SourceTextModule } = require('node:vm');

// const jwtSecret = 'ilovemypizza!';
// const lifetimeJwt = 24 * 60 * 60 * 1000; // in ms : 24 * 60 * 60 * 1000 = 24h

const saltRounds = 10;

// const jsonDbPath = path.join(__dirname, '/../data/users.json');

// const defaultUsers = [
//   {
//     id: 1,
//     username: 'admin',
//     password: bcrypt.hashSync('admin', saltRounds),
//   },
// ];

// eslint-disable-next-line consistent-return, no-unused-vars
async function login(username, password) {
  const userFound = await readOneUserFromUsername(username);
  if (!userFound) return undefined;

  const db_username = userFound.username;
  const db_password = userFound.password;

  const passwordMatch = await bcrypt.compare(password, db_password);
  if (!passwordMatch) return undefined;

  // const token = jwt.sign(
  //   { username }, // session data added to the payload (payload : part 2 of a JWT)
  //   jwtSecret, // secret used for the signature (signature part 3 of a JWT)
  //   { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
  // );

  // const authenticatedUser = {
  //   username,
  //   token,
  // };

  // return authenticatedUser;
}

async function register(username, password) {
  console.log('called');
  const userFound = readOneUserFromUsername(username);
  if (userFound) return undefined;

  await createOneUser(username, password);
  return 1;
  // const token = jwt.sign(
  //   { username }, // session data added to the payload (payload : part 2 of a JWT)
  //   jwtSecret, // secret used for the signature (signature part 3 of a JWT)
  //   { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
  // );

  // const authenticatedUser = {
  //   username,
  //   token,
  // };

  // return authenticatedUser;
}

async function readOneUserFromUsername(username) {
  try {
    const response = await queryExecute(`SELECT * FROM projet.users u WHERE u.username = '${username}';`);
    if (response.rowCount < 0) return undefined;
    return response.rows[0];
  } catch (error) {
    console.error('Erreur lors de l\'insertion :', error);
  }
  return 1;// fix
}

async function createOneUser(username, password) {
  // const users = parse(jsonDbPath, defaultUsers);
  const hashedPassword = password;// await bcrypt.hash(password, saltRounds);
  try {
    await queryExecute(`INSERT INTO projet.users (username, password) VALUES ('${username}', ${hashedPassword});`);
  } catch (error) {
    console.error('Erreur lors de l\'insertion :', error);
  }
  // const createdUser = {
  //   id: getNextId(),
  //   username,
  //   password: hashedPassword,
  // };

  // users.push(createdUser);

  // serialize(jsonDbPath, users);

  // return createdUser;
}

// function getNextId() {
//   const users = parse(jsonDbPath, defaultUsers);
//   const lastItemIndex = users?.length !== 0 ? users.length - 1 : undefined;
//   if (lastItemIndex === undefined) return 1;
//   const lastId = users[lastItemIndex]?.id;
//   const nextId = lastId + 1;
//   return nextId;
// }

module.exports = {
  login,
  register,
  readOneUserFromUsername,
};
