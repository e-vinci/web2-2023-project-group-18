/* eslint-disable camelcase */
const express = require('express');
const { authorize } = require('../utils/auths');
const { getAllThemes, getUserThemes, addUserTheme } = require('../models/themes');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const themes = await getAllThemes();
    return res.json(themes.rows);
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
});

router.get('/getuserthemes', authorize, async (req, res) => {
  const { id_user } = req.user;

  try {
    const themes = await getUserThemes(id_user);
    return res.json(themes.rows);
  } catch (error) {
    return res.sendStatus(404);
  }
});

router.put('/', authorize, async (req, res) => {
  const { id_user } = req.user;
  const theme = req?.body?.item ? req.body.item : undefined;

  if (theme) {
    try {
      await addUserTheme(id_user, theme);
      return res.sendStatus(200);
    } catch (error) {
      return res.sendStatus(404);
    }
  }
  return res.sendStatus(400);
});

module.exports = router;
