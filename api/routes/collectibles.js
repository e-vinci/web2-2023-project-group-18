const express = require('express');
const { getCollectible, addCollectible, suppCollectible } = require('../models/collectibles');
const { authorize } = require('../utils/auths');

const router = express.Router();

router.get('/', authorize, async (req, res) => {
  const { username } = req.user;
  console.log(username);
  try {
    const countCollectible = await getCollectible(username);
    console.log(countCollectible);

    // Assuming getCollectible directly returns the result you want
    const nbreCollectible = countCollectible.rows[0]?.get_collectible;
    console.log(nbreCollectible);

    // Check if nbreCollectible is defined before sending the response
    res.json({ nbre_collectible: nbreCollectible });
  } catch (error) {
    // Handle errors
    console.error('Error in request handling:', error);

    // Check if the error is due to no user found (404)
    if (error.message.includes('Not Found')) {
      res.status(404).json({ error: 'Not Found' });
    } else {
      // Handle other errors with a 500 status
      res.status(500).send('Internal Server Error');
    }
  }
});

router.put('/add', authorize, async (req, res) => {
  const { username } = req.user;
  console.log(username);
  const collectible = req?.body?.collectible ? req.body.collectible : undefined;
  if (collectible) {
    try {
      await addCollectible(username, collectible);
      res.sendStatus(200);
    } catch (error) {
      console.error(`Erreur lors de l'ajout de la collectible : ${error}`);
      if (error.code === '23505') {
        res.status(400).json({ error: 'Cette collectible existe déjà.' });
      } else {
        res.status(500).json({ error: 'Erreur interne du serveur.' });
      }
    }
  } else {
    res.sendStatus(400);
  }
});

router.put('/supp', authorize, async (req, res) => {
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
