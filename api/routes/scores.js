const express = require('express');
const { getAllScores, updateScore } = require('../models/scores');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const scores = await getAllScores();
        res.json(scores.rows);
    } catch (error) {
    // server error
        console.error('Error in request handling:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.put('/:id', async (req, res) => {
    const score = req?.body?.score ? req.body.score : undefined;
    if (score) {
        try {
            await updateScore(req.params.id, score);
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
