const express = require('express');
const { getCollectible, addCollectible, suppCollectible } = require('../models/collectibles');

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const countCollectible = await getCollectible(req.params.id);

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

router.post('/addCollectible/:id', async (req, res) => {
  const collectible = req?.body?.collectible ? req.body.collectible : undefined;
  if (collectible) {
    try {
      const id = await addCollectible(req.params.id, collectible);
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

router.post('/suppCollectible/:id', async (req, res) => {
  const collectible = req?.body?.collectible ? req.body.collectible : undefined;
  if (collectible) {
    try {
      await suppCollectible(req.params.id, collectible);
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
