const express = require('express');
const { getAllThemes, getUserThemes, addUserTheme } = require('../models/themes');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const themes = await getAllThemes();
    return res.json(themes.rows);
  } catch (error) {
    console.error('Error in request handling:', error);
    return res.status(500).send('Internal Server Error');
  }
});

router.get('/:id', async (req, res) => {
  const theme = req?.params?.id >= 0 ? req.params.id : undefined;

  if (theme) {
    try {
      const themes = await getUserThemes(theme);
      return res.json(themes.rows);
    } catch (error) {
      return res.sendStatus(404);
    }
  } else {
    return res.sendStatus(400);
  }
});

router.put('/:id', async (req, res) => {
  const user = req?.params?.id >= 0 ? req.params.id : undefined;
  const theme = req?.body?.theme ? req.body.theme : undefined;
  if (user && theme) {
    try {
      await addUserTheme(user, theme);
      return res.sendStatus(200);
    } catch (error) {
      return res.sendStatus(404);
    }
  } else {
    return res.sendStatus(400);
  }
});

module.exports = router;
