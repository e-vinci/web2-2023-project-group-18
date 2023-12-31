const express = require('express');
const { getCollectible, addCollectible } = require('../models/collectibles');
const { authorize } = require('../utils/auths');

const router = express.Router();

router.get('/', authorize, async (req, res) => {
  const { username } = req.user;
  try {
    const countCollectible = await getCollectible(username);
    const nbreCollectible = countCollectible.rows[0]?.get_collectible;

    // Check if nbreCollectible is defined before sending the response
    return res.json(nbreCollectible);
  } catch (error) {
    if (error.message.includes('Not Found')) {
      return res.sendStatus(404);
    }
    return res.sendStatus(500);
  }
});

router.put('/add', authorize, async (req, res) => {
  const { username } = req.user;
  const collectible = req?.body?.collectible ? req.body.collectible : undefined;
  if (collectible) {
    try {
      await addCollectible(username, collectible);
      return res.sendStatus(200);
    } catch (error) {
      if (error.code === '23505') {
        return res.status(400).json({ error: 'This collectible already exist.' });
      }
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(400);
});

module.exports = router;
