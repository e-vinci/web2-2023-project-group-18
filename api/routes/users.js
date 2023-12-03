const express = require('express');
const { getSpecifiqueUser, insertNewUser } = require('../models/users');

const router = express.Router();

/* GET users listing. */
// router.get('/', (req, res) => {
//   res.json({ users: [{ name: 'e-baron' }] });
// });

router.get('/:id', async (req, res) => {
  const id = req?.params?.id >= 0 ? req.params.id : undefined;

  if (id) {
    try {
      const user = await getSpecifiqueUser(id);
      console.log(`user: ${user.rows[0]}`);
      return res.json(user.rows[0]);
    } catch (error) {
      console.log(`Erreur type: ${error.detail}`);
      return res.sendStatus(404);
    }
  } else {
    return res.sendStatus(400);
  }
});

router.post('/', async (req, res) => {
  const username = req?.body?.username ? req?.body?.username : undefined;
  const password = req?.body?.password ? req?.body?.password : undefined;

  if (username && password) {
    // bcrypt password

    try {
      const id = await insertNewUser(username, password);
      console.log(`Id user ${id.rows.id}`);
      res.sendStatus(200);
    } catch (error) {
      console.log(`Erreur type: ${error.detail}`);
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
