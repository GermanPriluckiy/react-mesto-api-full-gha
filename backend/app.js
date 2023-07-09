const allowedCors = [
  'https://mesto-pgk.nomoredomains.work',
  'http://mesto-pgk.nomoredomains.work',
  'http://localhost:3001',
  'http://localhost:3000',
];

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const errorHandler = require('./middlewares/error');
const NotFoundError = require('./errors/NotFoundError');
const cors = require('cors');

const app = express();

const corsOptions = {
  credentials: true,
  origin: allowedCors,
};

app.use(cors(corsOptions));

mongoose.connect('mongodb://0.0.0.0:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.use(router);

app.use((req, res, next) => {
  next(new NotFoundError('Путь не найден'));
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Слушаю порт 3000');
});
