const express = require('express');
const { getAllScores, updateScore } = require('../models/scores');
const { authorize } = require('../utils/auths');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const scores = await getAllScores();
    return res.json(scores.rows);
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
});

router.put('/', authorize, async (req, res) => {
  const { username } = req.user;
  const score = req?.body?.score ? req.body.score : undefined;
  if (score) {
    try {
      await updateScore(username, score);
      return res.sendStatus(200);
    } catch (error) {
      if (error.message.includes('The score cannot be lower than the current score')) {
        return res.sendStatus(422);
      }
      return res.sendStatus(404);
    }
  }
  return res.sendStatus(400);
});

module.exports = router;
