const express = require('express');
const db = require('../utils/db');

const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res) => {
    res.json(await db.queryExecute('SELECT * FROM projet.users'));
});

module.exports = router;
