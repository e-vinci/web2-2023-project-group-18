const jwt = require('jsonwebtoken');
const { readOneUserFromUsername } = require('../models/users');

const authorize = async (req, res, next) => {
  const token = req.get('authorization');
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { username } = decoded;

    const existingUser = await readOneUserFromUsername(username);

    if (!existingUser) return res.sendStatus(401);

    req.user = existingUser;
    return next();
  } catch (err) {
    return res.sendStatus(401);
  }
};

module.exports = { authorize };
