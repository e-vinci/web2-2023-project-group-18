const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:8080', 'https://e-baron.github.io', 'https://e-vinci.github.io'],
};

const collectiblesRouter = require('./routes/collectibles');
const scoresRouter = require('./routes/scores');
const shopRouter = require('./routes/shops');
const authsRouter = require('./routes/auths');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors(corsOptions));

app.use('/collectibles', collectiblesRouter);
app.use('/auths', authsRouter);
app.use('/scores', scoresRouter);
app.use('/shop', shopRouter);

module.exports = app;
