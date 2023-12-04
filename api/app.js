const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:8080', 'https://e-baron.github.io', 'https://e-vinci.github.io'],
};

const collectiblesRouter = require('./routes/collectibles');
const scoresRouter = require('./routes/scores');
const authsRouter = require('./routes/auths');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors(corsOptions));
app.use('/collectibles', cors(corsOptions), collectiblesRouter);
app.use('/auths', cors(corsOptions), authsRouter);
app.use('/scores', cors(corsOptions), scoresRouter);

module.exports = app;
