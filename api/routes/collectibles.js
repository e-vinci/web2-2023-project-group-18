const express = require('express');
const { getCollectible, addCollectible, suppCollectible } = require('../models/collectibles');
const { authorize } = require('../utils/auths');

const router = express.Router();

router.get('/', authorize, async (req, res) => {
  const { username } = req.user;
  try {
    const countCollectible = await getCollectible(username);

    // Assuming getCollectible directly returns the result you want
    const nbreCollectible = countCollectible.rows[0]?.nbre_collectible;

    // Check if nbreCollectible is defined before sending the response
    if (nbreCollectible !== undefined) {
      res.json({ nbre_collectible: nbreCollectible });
    } else {
      res.status(404).json({ error: 'Not Found' });
    }
  } catch (error) {
    // server error
    console.error('Error in request handling:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/', authorize, async (req, res) => {
  const { username } = req.user;
  const collectible = req?.body?.collectible ? req.body.collectible : undefined;
  if (collectible) {
    try {
      await addCollectible(username, collectible);
      res.sendStatus(200);
    } catch (error) {
      console.log(`Erreur type: ${error.detail}`);
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(400);
  }
});

router.put('/supp/', authorize, async (req, res) => {
  const { username } = req.user;
  const collectible = req?.body?.collectible ? req.body.collectible : undefined;
  if (collectible) {
    try {
      await suppCollectible(username, collectible);
      res.sendStatus(200);
      // await res.sendStatus(200);
    } catch (error) {
      // console.error('Error in request');
      // user doesn't exist or bad user index
      res.sendStatus(404);
    }
  } else {
    // bad parmeter
    res.sendStatus(400);
  }
});

module.exports = router;
