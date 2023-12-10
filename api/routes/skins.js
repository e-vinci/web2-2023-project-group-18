const express = require('express');
const { getAllSkins, getUserSkins, addUserSkin } = require('../models/skins');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const skins = await getAllSkins();
    return res.json(skins.rows);
  } catch (error) {
    console.error('Error in request handling:', error);
    return res.status(500).send('Internal Server Error');
  }
});

router.get('/:id', async (req, res) => {
  const skin = req?.params?.id >= 0 ? req.params.id : undefined;

  if (skin) {
    try {
      const skins = await getUserSkins(skin);
      return res.json(skins.rows);
    } catch (error) {
      return res.sendStatus(404);
    }
  } else {
    return res.sendStatus(400);
  }
});

router.put('/:id', async (req, res) => {
  const user = req?.params?.id >= 0 ? req.params.id : undefined;
  const skin = req?.body?.skin ? req.body.skin : undefined;
  if (user && skin) {
    try {
      await addUserSkin(user, skin);
      return res.sendStatus(200);
    } catch (error) {
      return res.sendStatus(404);
    }
  } else {
    return res.sendStatus(400);
  }
});

module.exports = router;
