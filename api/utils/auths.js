const jwt = require('jsonwebtoken');
const { readOneUserFromUsername } = require('../models/users');

const authorize = async (req, res, next) => {
  const token = req.get('authorization');
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decoded', decoded);
    const { username } = decoded;

    const existingUser = await readOneUserFromUsername(username);

    if (!existingUser) return res.sendStatus(401);

    req.user = existingUser; // request.user object is available in all other middleware functions
    return next();
  } catch (err) {
    console.error('authorize: ', err);
    return res.sendStatus(401);
  }
};

// const isAdmin = (req, res, next) => {
//   const { username } = req.user;

//   if (username !== 'admin') return res.sendStatus(403);
//   return next();
// };

module.exports = { authorize };
