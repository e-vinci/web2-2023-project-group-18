/* eslint-disable camelcase */
const express = require('express');
const { authorize } = require('../utils/auths');
const {
  getAllSkins, getUserSkins, addUserSkin, getAllThemes, getUserThemes, addUserTheme,
} = require('../models/shops');

const router = express.Router();

// ##################### SKINS ##################### //

router.get('/getskins', async (req, res) => {
  try {
    const skins = await getAllSkins();
    return res.json(skins.rows);
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
});

router.get('/getuserskins', authorize, async (req, res) => {
  const { id_user } = req.user;

  try {
    const skins = await getUserSkins(id_user);
    return res.json(skins.rows);
  } catch (error) {
    return res.sendStatus(404);
  }
});

router.put('/addskin', authorize, async (req, res) => {
  const { id_user } = req.user;
  const skin = req?.body?.item ? req.body.item : undefined;
  if (skin) {
    try {
      await addUserSkin(id_user, skin);
      return res.sendStatus(200);
    } catch (error) {
      return res.sendStatus(404);
    }
  }
  return res.sendStatus(400);
});

// ##################### THEMES ##################### //

router.get('/getthemes', async (req, res) => {
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

router.put('/addtheme', authorize, async (req, res) => {
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
